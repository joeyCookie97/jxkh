<template>
  <div class="main-content">
    <Tree
      class="tree-content"
      :directory-data="directoryData"
    />
    <Table
      class="table-content"
      :directory-data="directoryData"
    />
  </div>
</template>

<script>
import Tree from "./components/tree.vue";
import Table from "./components/table.vue";
export default {
  components: {
    Tree,
    Table,
  },
  data() {
    return {
      directoryData: [
  {
    id: "1",
    key: "1",
    title: "李逵",
    state: "正常",
    dataType: "mysql",
    ip: "127.0.0.1",
    port: "8080",
    libName: "test-hb",
    des: "测试",
    parent: "默认文件夹",
    username: "admin",
    password: "123",
    scopedSlots: { title: "title" },
  },
  {
    id: "2",
    key: "2",
    title: "韩信",
    state: "正常",
    dataType: "mysql",
    ip: "127.0.0.1",
    port: "8080",
    libName: "test-hb",
    des: "测试",
    parent: "默认文件夹",
    username: "admin",
    password: "123",
    scopedSlots: { title: "title" },
  },
  {
    id: "3",
    key: "3",
    title: "项羽",
    state: "故障",
    dataType: "mysql",
    ip: "127.0.0.1",
    port: "8080",
    libName: "test-hb",
    des: "测试",
    parent: "默认文件夹",
    username: "admin",
    password: "123",
    scopedSlots: { title: "title" },
  },
  {
    id: "4",
    title: "huhanchi",
    key: "4",
    state: "正常",
    dataType: "mysql",
    ip: "127.0.0.1",
    port: "8080",
    libName: "test-hb",
    des: "测试",
    parent: "默认文件夹",
    username: "admin",
    password: "123",
    scopedSlots: { title: "title" },
    children: [
      {
        id: "4-1",
        key: "4-1",
        title: "ooooaasdasdas",
        state: "故障",
        dataType: "mysql",
        ip: "127.0.0.1",
        port: "8080",
        libName: "test-hb",
        des: "测试",
        parent: "默认文件夹",
        username: "admin",
        password: "123",
        scopedSlots: { title: "title" },
      },
    ],
  },
  {
    id: "5",
    key: "5",
    title: "林冲",
    state: "故障",
    dataType: "mysql",
    ip: "127.0.0.1",
    port: "8080",
    libName: "test-hb",
    des: "测试",
    parent: "默认文件夹",
    username: "admin",
    password: "123",
    scopedSlots: { title: "title" },
    children: [
      {
        id: "5-1",
        key: "5-1",
        title: "hello",
        state: "故障",
        dataType: "mysql",
        ip: "127.0.0.1",
        port: "8080",
        libName: "test-hb",
        des: "测试",
        parent: "默认文件夹",
        username: "admin",
        password: "123",
        scopedSlots: { title: "title" },
      },
    ],
  },
  {
    id: "6",
    key: "6",
    title: "张飞",
    state: "正常",
    dataType: "mysql",
    ip: "127.0.0.1",
    port: "8080",
    libName: "test-hb",
    des: "测试",
    parent: "默认文件夹",
    username: "admin",
    password: "123",
    scopedSlots: { title: "title" },
  },
],
    };
  },
};
</script>