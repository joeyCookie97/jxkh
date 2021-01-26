<template>
  <div class="main-content">
    <Table :tableData="tableData" />
  </div>
</template>

<script>
import Table from "./components/table.vue";
export default {
  components: {
    Table
  },
  data() {
    return {
      tableData: [
        {
          name: "张三",
          zbx: '指标项',
          score: 80,
          startTime: '2021-01-25',
          updateTime: '2021-01-25',
          cycle: '1年',
          enabled: true,
          scopedSlots: { title: "title" },
        }
      ]
    }
  }
}
</script>