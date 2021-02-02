<template>
  <div style="width: 100%">
    <div class="tableTop">
      <a-space>
        <a-button
          icon="plus"
          type="primary"
          @click="targetClick({}, 'add')"
        >
          新增页面
        </a-button>
        <a-button
          icon="reload"
          type="default"
          @click="targetClick({}, 'add')"
        >
          刷新
        </a-button>
      </a-space>
      <a-input-search
        placeholder="请输入搜索"
        style="width: 500px"
        @search="onSearch"
      />
    </div>

    <a-table
      :columns="columns"
      row-key="path"
      :loading="tableLoading"
      :data-source="this.$store.state.menuData"
    >
      <template v-slot:name="text, record">
        <a-button
          type="link"
          @click="targetClick(record, 'detail')"
        >
          {{
            text
          }}
        </a-button>
      </template>
      <template v-slot:operation="text, record">
        <a-space>
          <a-button
            style="padding:0"
            type="link"
            @click="targetClick(record, 'update')"
          >
            修改
          </a-button><a-button
            style="padding:0"
            type="link"
            @click="targetClick(record, 'update')"
          >
            删除
          </a-button>
        </a-space>
      </template>
    </a-table>
    <!-- 新增modal -->
    <a-modal
      :title="modalTitle"
      width="1000px"
      :visible="visible"
      :after-close="afterClose"
      ok-text="确定"
      cancel-text="取消"
      @ok="addSubmit"
      @cancel="closeModal"
    >
      <a-form-model
        ref="ruleForm"
        class="ant-advanced-search-form"
        :label-col="{ span: 7 }"
        :model="form"
        :rules="rules"
      >
        <a-row :gutter="24">
          <!-- <a-col :span="8">
            <a-form-model-item label="编号" prop="id">
              <a-input :disabled="formDisabled" v-model="form.id" />
            </a-form-model-item>
          </a-col> -->
          <a-col :span="8">
            <a-form-model-item
              label="页面名称"
              prop="name"
            >
              <a-input
                v-model="form.name"
                placeholder="页面名称"
              />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item
              label="页面地址"
              prop="path"
            >
              <a-input
                v-model="form.path"
                placeholder="页面地址"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="页面描述"
              prop="des"
            >
              <a-input
                v-model="form.des"
                placeholder="页面描述"
              />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item
              label="上级页面"
              prop="parent"
            >
              <a-input
                v-model="form.parent"
                placeholder="上级页面"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import form from "@/form/form.js";
import table from "@/table/table.js";
export default {
  data() {
    return {
      form: form.form.permission,
      rules: form.rules.permission,
      columns: table.columns.permission,
      tableLoading: false,
      // modal框
      visible: false,
      modalTitle: "",
      formDisabled: false,
    };
  },
  mounted() {
    console.log(this.$store.state.menuData);
  },
  methods: {
    // 修改状态
    isEnabled(checked) {
      // ajax 修改状态
      console.log(checked);
    },
    // modal提交按钮
    addSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(valid);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // table搜索
    onSearch(value) {
      // ajax search interface
      console.log(value);
    },

    // 打开modal框
    targetClick(record, type) {
      if (type == "update") {
        this.modalTitle = "修改元数据";
        this.form = record;
        this.visible = true;
      } else if (type == "add") {
        this.modalTitle = "新增元数据";
        this.visible = true;
      } else if (type == "detail") {
        this.form = record;
        this.formDisabled = true;
        this.modalTitle = "元数据详情";
        this.visible = true;
      } else {
        // ajax del interface
        this.$message.success("删除成功");
      }
    },
    // 关闭modal
    closeModal() {
      this.visible = false;
    },
    // modal完全关闭回调
    afterClose() {
      this.form = {
        title: "",
        des: "",
        dataType: "",
        ip: "",
        port: "",
        libName: "",
        username: "",
        password: "",
      };
      this.formDisabled = false;
    },
  },
};
</script>