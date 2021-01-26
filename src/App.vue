<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang='less'>
html, body {
  overflow: hidden;
}
.main-content {
    min-height: 800px;
    display: flex;
    justify-content: space-between;
    .tree-content {
        min-width: 12vw;
      }
      .table-content {
        width: 85vw;
        margin-left: 20px;
        
      }
}
.tableTop {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }
  // ant vue table style start
.ant-modal-body {
    padding: 10px;
    background: #fbfbfb;
}

.ant-advanced-search-form .ant-form-item {
    display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
}
// ant vue table style end
</style>