<template>
  <a-modal
    width="1000px"
    title="新增指标"
    :visible="addVisible"
    keyboard
    @ok="addSubmit"
    @cancel="addCancel"
  >
    <a-form class="ant-advanced-search-form" :labelCol="{ span: 7 }">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="编号">
            <a-input disabled placeholder="系统自动生成" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="编码">
            <a-input placeholder="编码" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="名称">
            <a-input placeholder="名称" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="详细描述">
            <a-input placeholder="详细描述" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="计算公式">
            <a-input placeholder="计算公式" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="初始分值">
            <a-input placeholder="初始分值" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="最高分值">
            <a-input placeholder="最高分值" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="分值">
            <a-input placeholder="分值" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="加减分类型">
            <a-select default-value="a1">
              <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                {{ (i + 9).toString(36) + i }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="计分方式">
            <a-select default-value="系统自动">
              <a-select-option value="系统自动">系统自动</a-select-option>
              <a-select-option value="手动填报">手动填报</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="适用对象">
            <a-select mode="multiple" placeholder="请选择部门">
              <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                {{ (i + 9).toString(36) + i }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="是否启用">
            <a-radio-group default-value="是">
              <a-radio value="是"> 是 </a-radio>
              <a-radio value="否"> 否 </a-radio>
            </a-radio-group>
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