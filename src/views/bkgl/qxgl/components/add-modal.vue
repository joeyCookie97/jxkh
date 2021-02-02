<template>
  <a-modal
    width="1000px"
    title="新增指标"
    :visible="addVisible"
    keyboard
    @ok="addSubmit"
    @cancel="addCancel"
  >
    <a-form
      class="ant-advanced-search-form"
      :label-col="{ span: 7 }"
    >
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="页面编号">
            <a-input
              disabled
              placeholder="系统自动生成"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="页面名称">
            <a-input placeholder="页面名称" />
          </a-form-item>
        </a-col>
        
        <a-col :span="8">
          <a-form-item label="页面地址">
            <a-input placeholder="页面地址" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="页面描述">
            <a-input placeholder="页面描述" />
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item label="上级页面">
            <a-input placeholder="上级页面" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: ["addVisible"],

  methods: {
    addSubmit() {
      this.confirmLoading = true;
      setTimeout(() => {
        this.addVisible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    addCancel() {
      this.$emit("closeModal", false);
    },
  },
};
</script>