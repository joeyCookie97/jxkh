<template>
  <div style="width: 100%">
    <div class="tableTop">
      <a-space>
        <a-button
          icon="plus"
          type="primary"
          @click="targetClick({}, 'add')"
        >
          新增数据源
        </a-button>
        <a-button
          icon="reload"
          type="default"
          @click="targetClick({}, 'add')"
        >
          刷新
        </a-button>
      </a-space>

      <a-space :size="20">
        <span style="color: #3cb371">正常： 4</span>
        <span style="color: #ff0000">故障： 2</span>
        <a-input-search
          placeholder="请输入数据源名称、IP搜索"
          style="width: 500px"
          @search="onSearch"
        />
      </a-space>
    </div>

    <a-table
      :columns="columns"
      row-key="id"
      :loading="tableLoading"
      :data-source="directoryData"
      bordered
    >
      <template v-slot:operation="text, record">
        <a-space>
          <a-button
            style="padding: 0"
            type="link"
            @click="targetClick(record, 'detail')"
          >
            查看
          </a-button>
          <a-button
            style="padding: 0"
            type="link"
            @click="targetClick(record, 'update')"
          >
            修改
          </a-button>
          <a-popconfirm
            title="确定删除吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="targetClick(record, 'del')"
          >
            <a-button
              style="padding: 0"
              type="link"
            >
              删除
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>
      <template v-slot:name="text">
        <a-button
          type="link"
        >
          <a-icon
            :style="{ color: '#FFB90F' }"
            type="file-text"
          />{{
            text
          }}
        </a-button>
      </template>
      <template v-slot:state="text">
        <span
          v-if="text == '正常'"
          style="color: #3cb371"
        ><a-icon type="check-circle" />{{ text }}</span>
        <span
          v-else
          style="color: #ff0000"
        ><a-icon type="exclamation-circle" />{{ text }}</span>
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
              label="描述"
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
              label="类型"
              prop="dataType"
            >
              <a-input
                v-model="form.dataType"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="IP"
              prop="ip"
            >
              <a-input
                v-model="form.ip"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="端口"
              prop="port"
            >
              <a-input
                v-model="form.port"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="库名"
              prop="libName"
            >
              <a-input
                v-model="form.libName"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="用户名"
              prop="username"
            >
              <a-input
                v-model="form.username"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="密码"
              prop="password"
            >
              <a-input
                v-model="form.password"
                :disabled="formDisabled"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              label="所属文件夹"
              prop="parent"
            >
              <a-input
                v-model="form.parent"
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
import form from '@/form/form.js'
import table from '@/table/table.js'
export default {
  props: ["directoryData"],
  data() {
    return {
      form: form.form.dataSource,
      rules: form.rules.dataSource,
      columns: table.columns.dataSource,
      tableLoading: false,
      // modal框
      visible: false,
      modalTitle: "",
      formDisabled: false,
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
    // table搜索
    onSearch(value) {
      // ajax search interface
      console.log(value);
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
        this.formDisabled = true;
        this.modalTitle = "数据源详情";
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
