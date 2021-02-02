<template>
  <div class="main-content">
    <Table :table-data="tableData" />
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
          id: "001",
          name: "元数据001",
          initScore: 60,
          addAndSubType: '固定值',
          integralWay: '累积',
          applicableObjects: '全体',
          enabled: true,
          scopedSlots: { title: "title" },
        },
        {
          id: "002",
          name: "元数据002",
          initScore: 60,
          addAndSubType: '固定值',
          integralWay: '累积',
          applicableObjects: '全体',
          enabled: true,
          scopedSlots: { title: "title" },
        }
      ]
    }
  }
}
</script>