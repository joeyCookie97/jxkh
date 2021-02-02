<template>
  <div>
    <a-input-search
      placeholder="请输入内容查询"
      @change="onChange"
    />
    <a-tree
      :expanded-keys="expandedKeys"
      :tree-data="gData"
      :auto-expand-parent="autoExpandParent"
      :show-icon="true"
      @expand="onExpand"
    >
      <template v-slot:title="item">
        <a-icon
          :style="{ color: '#1890ff' }"
          type="folder-open"
        />
        <span v-if="(item.score ? `${item.title}(${item.score})分` : `${item.title}`).indexOf(searchValue) > -1">
          {{ (item.score ? `${item.title}(${item.score})分` : `${item.title}`).substr(0, (item.score ? `${item.title}(${item.score})分` : `${item.title}`).indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ (item.score ? `${item.title}(${item.score})分` : `${item.title}`).substr((item.score ? `${item.title}(${item.score})分` : `${item.title}`).indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ item.score ? `${item.title}(${item.score})分` : `${item.title}` }}</span>
      </template>
    </a-tree>
  </div>
</template>

<script>
import Bus from '@/bus/bus.js'
export default {
  props: ["directoryData"],
  data() {
    return {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      gData: [],
      treeParent: {
        title: "考核规则",
        key: "考核规则",
        scopedSlots: { title: "title" },
        children: [],
      },
      dataList: [],
    };
  },
  mounted() {
    this.treeParent.children = this.directoryData;
    this.gData.push(this.treeParent)
    this.expandedKeys.push('考核规则')
    this.generateList(this.gData);

    Bus.$on('switchState', record => {
      this.treeParent.children.map(item => {
        if(item.key == record.key){
          item.disabled = !item.disabled
        }
      })
    })
  },
  methods: {
    // 展开回调
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
      this.expandedKeys = ["考核规则"];
      let expandedKeys = this.expandedKeys;
      const value = e.target.value;

      if (!value) {
        this.expandedKeys = ["考核规则"];
        Object.assign(this, {
          expandedKeys,
          searchValue: '',
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
  },
};
</script>