<template>
  <div class="main-content">
    <Tree class="tree-content" :directoryData="directoryData" />
    <Table class="table-content" :directoryData="directoryData" />
  </div>
</template>

<script>
import Tree from "./components/tree.vue";
import Table from "./components/table.vue";
export default {
  data() {
    return {
      directoryData: [
        {
          title: "基础考核",
          key: "基础考核",
          score: 60,
          disabled: false,
          scopedSlots: { title: "title" },
        },
        {
          title: "附加考核",
          key: "附加考核",
          score: 60,
          disabled: false,
          scopedSlots: { title: "title" },
        },
        {
          title: "加分项",
          key: "加分项",
          score: 28,
          disabled: false,
          scopedSlots: { title: "title" },
        },
        {
          title: "减分项",
          key: "减分项",
          score: 60,
          disabled: false,
          scopedSlots: { title: "title" },
        },
        {
          title: "区县考核",
          key: "区县考核",
          score: 60,
          disabled: false,
          scopedSlots: { title: "title" },
        },
        {
          title: "部门考核",
          key: "部门考核",
          score: 40,
          disabled: false,
          scopedSlots: { title: "title" },
        }
      ],
    };
  },
  components: {
    Tree,
    Table,
  },
};
</script>