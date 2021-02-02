<template>
  <div style="width: 100%">
    <div class="tableTop">
      <a-space>
        <a-button
          icon="plus"
          type="primary"
          @click="targetClick({}, 'add')"
        >
          新增
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
        placeholder="请输入填报人员、指标项、填报时间搜索"
        style="width: 500px"
        @search="onSearch"
      />
    </div>

    <a-table
      :columns="columns"
      row-key="id"
      :loading="tableLoading"
      :data-source="tableData"
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
        <a-button
          type="link"
          @click="targetClick(record, 'update')"
        >
          修改
        </a-button>
      </template>
      <template v-slot:enabled="enabled">
        <a-switch
          size="small"
          :default-checked="enabled"
          checked-children="已启用"
          un-checked-children="已停用"
          @change="isEnabled"
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
              label="编号"
              prop="id"
            >
              <a-input
                v-model="form.id"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="编码"
              prop="code"
            >
              <a-input
                v-model="form.code"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              ref="title"
              label="名称"
              prop="title"
            >
              <a-input
                v-model="form.title"
                :disabled="formDisabled"
                @blur="
                  () => {
                    $refs.title.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="详细描述"
              prop="des"
            >
              <a-input
                v-model="form.des"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="计算公式"
              prop="jsgs"
            >
              <a-input
                v-model="form.jsgs"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="初始分值"
              prop="initScore"
            >
              <a-input
                v-model="form.initScore"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="最高分值"
              prop="highScore"
            >
              <a-input
                v-model="form.highScore"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="分值"
              prop="score"
            >
              <a-input
                v-model="form.score"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="加减分类型"
              prop="addAndSubType"
            >
              <a-input
                v-model="form.addAndSubType"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="计分方式"
              prop="scoreType"
            >
              <a-input
                v-model="form.scoreType"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="适用对象"
              prop="applicableObjects"
            >
              <a-input
                v-model="form.applicableObjects"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="是否启用"
              prop="enabled"
            >
              <a-input
                v-model="form.enabled"
                :disabled="formDisabled"
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
  props: ["tableData"],
  data() {
    return {
      form: form.form.targetMetaData,
      rules: form.rules.targetMetaData,
      columns: table.columns.khtb,
      tableLoading: false,
      // modal框
      visible: false,
      modalTitle: "",
      formDisabled: false,
    };
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