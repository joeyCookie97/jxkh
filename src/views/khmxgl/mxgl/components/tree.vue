<template>
  <div>
    <a-space>
      <a-input-search
        placeholder="请输入内容查询"
        @change="onChange"
      />
      <a-icon
        style="font-size: 28px; color: #1890ff; cursor: pointer"
        type="folder-add"
      />
    </a-space>
    <a-tree
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="gData"
      :show-icon="true"
      @expand="onExpand"
    >
      <template v-slot:title="item">
        <a-space>
          <a-icon
            v-if="item.title == '默认文件夹' || item.children"
            class="folderStyle"
            type="folder-open"
          />
          <a-icon
            v-else
            class="folderStyle"
            type="folder"
          />

          <a-space v-if="searchValue">
            <span v-if="item.title.indexOf(searchValue) > -1">
              {{ item.title.substr(0, item.title.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{
                item.title.substr(
                  item.title.indexOf(searchValue) + searchValue.length
                )
              }}
            </span>
            <span v-else>{{ item.title }}</span>
          </a-space>

          <a-space v-else>
            <span v-if="switchInput !== item.id">{{ item.title }}</span>
            <a-input
              v-else
              ref="ipt"
              v-model="item.title"
              style="width: 100px"
              size="small"
              @blur="onBlur"
              @pressEnter="onBlur"
            />
          </a-space>
        </a-space>
        <a-space
          v-if="item.title !== '默认文件夹'"
          style="margin-left: 10px"
        >
          <a-icon
            style="color: #1890ff"
            type="edit"
            @click.stop="showIpt(item)"
          />
          <a-icon
            style="color: rgb(255, 0, 0)"
            type="delete"
            @click="delFolder(item)"
          />
        </a-space>
      </template>
    </a-tree>
  </div>
</template>

<script>
import Bus from "@/bus/bus.js";
export default {
  props: ["directoryData"],
  data() {
    return {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      gData: [],
      treeParent: {
        title: "默认文件夹",
        key: "默认文件夹",
        scopedSlots: { title: "title" },
        children: [],
      },
      dataList: [],
      switchInput: null,
    };
  },
  mounted() {
    this.treeParent.children = this.directoryData;
    this.gData.push(this.treeParent);
    this.expandedKeys.push("默认文件夹");
    this.generateList(this.gData);

    Bus.$on("switchState", (record) => {
      this.treeParent.children.map((item) => {
        if (item.key == record.key) {
          item.disabled = !item.disabled;
        }
      });
    });
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    generateList(data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        this.dataList.push({ key, title: key });
        if (node.children) {
          this.generateList(node.children);
        }
      }
    },
    getParentKey(key, tree) {
      let parentKey;
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
          if (node.children.some((item) => item.key === key)) {
            parentKey = node.key;
          } else if (this.getParentKey(key, node.children)) {
            parentKey = this.getParentKey(key, node.children);
          }
        }
      }
      return parentKey;
    },
    // 搜索
    onChange(e) {
      this.expandedKeys = ["默认文件夹"];
      let expandedKeys = this.expandedKeys;
      const value = e.target.value;

      if (!value) {
        this.expandedKeys = ["默认文件夹"];
        Object.assign(this, {
          expandedKeys,
          searchValue: "",
        });
      } else {
        this.getTreeKeys(this.directoryData, value);
        Object.assign(this, {
          expandedKeys,
          searchValue: value,
          autoExpandParent: true,
        });
      }
    },
    // 修改文件夹名字
    showIpt(item) {
      this.switchInput = item.id;
      this.$nextTick(() => {
        // this.$refs.ipt.focus()
        this.$refs.ipt.select()
      })
      
    },
    // 删除文件夹
    delFolder(item) {
      console.log(item);
    },
    // 获取树的父亲节点
    getTreeKeys(data, value) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].title.indexOf(value) > -1) {
          let pKey = this.getParentKey(data[i].key, this.directoryData);
          if (pKey) {
            // console.log(`我是${data[i].title}的${value},我父亲节点是:${pKey}`);
            this.expandedKeys.push(pKey);
          }
        }
        if (data[i].children) {
          this.getTreeKeys(data[i].children, value);
        }
      }
    },
    onBlur() {
      if (this.switchInput) {
        // ajax edit folder name
        this.switchInput = null;
      }
    }
  },
};
</script>
<style lang="less" scoped>
.folderStyle {
  color: #1890ff;
  font-size: 16px;
}
</style>