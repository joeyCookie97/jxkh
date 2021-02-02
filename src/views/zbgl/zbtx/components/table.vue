<template>
  <div style="width: 100%">
    <div style="margin-bottom: 16px">
      <a-space>
        <a-button
          icon="plus"
          type="primary"
          @click="targetClick({}, 'add')"
        >
          新增目录
        </a-button>
        <a-button
          icon="reload"
          type="default"
          @click="targetClick({}, 'add')"
        >
          刷新
        </a-button>
      </a-space>
    </div>

    <a-table
      row-key="key"
      :columns="columns"
      :loading="tableLoading"
      :data-source="directoryData"
      bordered
    >
      <template v-slot:operation="text, record">
        <a-button
          type="link"
          @click="targetClick(record,'update')"
        >
          修改
        </a-button>
      </template>
      <template v-slot:disabled="text, record">
        <a-switch
          size="small"
          :default-checked="!text"
          checked-children="已启用"
          un-checked-children="已停用"
          @change="isEnabled(record)"
        />
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
          <a-col :span="8">
            <a-form-model-item
              label="目录编号"
              prop="id"
            >
              <a-input v-model="form.id" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="编码"
              prop="key"
            >
              <a-input v-model="form.key" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="目录名称"
              prop="title"
            >
              <a-input v-model="form.title" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="上级目录"
              prop="parent"
            >
              <a-input v-model="form.parent" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="目录总分"
              prop="score"
            >
              <a-input v-model="form.score" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import Bus from "@/bus/bus.js";
import form from '@/form/form.js'
import table from '@/table/table.js'
export default {
  props: ["directoryData"],
  data() {
    return {
      form: form.form.targetSystem,
      rules: form.rules.targetSystem,
      columns: table.columns.targetSystem,
      tableLoading: false,
      // modal框
      visible: false,
      modalTitle: "",
    };
  },
  methods: {
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
    // 打开modal框
    targetClick(record, type) {
      if (type == "update") {
        this.modalTitle = "修改数据源";
        this.form = record;
        this.visible = true;
      } else if (type == "add") {
        this.modalTitle = "新增数据源";
        this.visible = true;
      } else if (type == "detail") {
        this.form = record;
        this.modalTitle = "数据源详情";
        this.visible = true;
      } else {
        // ajax del interface
        this.$message.success("删除成功");
      }
    },
    // 修改状态
    isEnabled(record) {
      // ajax 修改状态
      Bus.$emit("switchState", record);
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
    },
  },
};
</script>