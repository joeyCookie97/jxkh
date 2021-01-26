<template>
  <div style="width: 100%">
    <div class="tableTop">
      <a-space>
        <a-button icon="plus" type="primary" @click="targetClick({}, 'add')">
          新增
        </a-button>
        <a-button icon="reload" type="default" @click="targetClick({}, 'add')">
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
      rowKey="id"
      :loading="tableLoading"
      :data-source="tableData"
    >
      <template v-slot:name="text, record">
        <a-button @click="targetClick(record, 'detail')" type="link">{{
          text
        }}</a-button>
      </template>
      <template v-slot:operation="text, record">
        <a-button @click="targetClick(record, 'update')" type="link"
          >修改</a-button
        >
      </template>
      <template v-slot:enabled="enabled">
        <a-switch
          @change="isEnabled"
          size="small"
          :defaultChecked="enabled"
          checked-children="已启用"
          un-checked-children="已停用"
        />
      </template>
    </a-table>
    <!-- 新增modal -->
    <a-modal
      :title="modalTitle"
      width="1000px"
      :visible="visible"
      @ok="addSubmit"
      @cancel="closeModal"
      :afterClose="afterClose"
      okText="确定"
      cancelText="取消"
    >
      <a-form-model
        ref="ruleForm"
        class="ant-advanced-search-form"
        :labelCol="{ span: 7 }"
        :model="form"
        :rules="rules"
      >
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-model-item label="编号" prop="id">
              <a-input :disabled="formDisabled" v-model="form.id" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="编码" prop="code">
              <a-input :disabled="formDisabled" v-model="form.code" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item ref="title" label="名称" prop="title">
              <a-input
                :disabled="formDisabled"
                v-model="form.title"
                @blur="
                  () => {
                    $refs.title.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="详细描述" prop="des">
              <a-input :disabled="formDisabled" v-model="form.des" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="计算公式" prop="jsgs">
              <a-input :disabled="formDisabled" v-model="form.jsgs" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="初始分值" prop="initScore">
              <a-input :disabled="formDisabled" v-model="form.initScore" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="最高分值" prop="highScore">
              <a-input :disabled="formDisabled" v-model="form.highScore" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="分值" prop="score">
              <a-input :disabled="formDisabled" v-model="form.score" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="加减分类型" prop="addAndSubType">
              <a-input :disabled="formDisabled" v-model="form.addAndSubType" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="计分方式" prop="scoreType">
              <a-input :disabled="formDisabled" v-model="form.scoreType" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="适用对象" prop="applicableObjects">
              <a-input
                :disabled="formDisabled"
                v-model="form.applicableObjects"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="是否启用" prop="enabled">
              <a-input :disabled="formDisabled" v-model="form.enabled" />
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