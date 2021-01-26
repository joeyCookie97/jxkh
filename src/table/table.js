const table = {
    columns: {
        dataSource: [
            {
                title: "数据源名称",
                dataIndex: "title",
                align: "center",
                scopedSlots: { customRender: "name" },
            },
            {
                title: "状态",
                dataIndex: "state",
                align: "center",
                scopedSlots: { customRender: "state" },
            },
            {
                title: "类型",
                dataIndex: "dataType",
                align: "center",
            },
            {
                title: "IP",
                dataIndex: "ip",
                align: "center",
            },
            {
                title: "端口号",
                dataIndex: "port",
                align: "center",
            },
            {
                title: "库名",
                dataIndex: "libName",
                align: "center",
            },
            {
                title: "操作",
                dataIndex: "operation",
                align: "center",
                width: "200px",
                scopedSlots: { customRender: "operation" },
            },
        ],
        targetSystem: [
            {
                title: "编码",
                dataIndex: "key",
                align: "center",
            },
            {
                title: "目录名称",
                dataIndex: "title",
                align: "center",
            },
            {
                title: "目录总分",
                dataIndex: "score",
                align: "center",
            },
            {
                title: "是否启用",
                dataIndex: "disabled",
                align: "center",
                scopedSlots: { customRender: "disabled" },
            },
            {
                title: "操作",
                dataIndex: "operation",
                align: "center",
                scopedSlots: { customRender: "operation" },
            },
        ],
        targetMetaData: [
            {
                title: "编号",
                dataIndex: "id",
                align: "center",
              },
              {
                title: "名称",
                dataIndex: "name",
                align: "center",
                scopedSlots: { customRender: "name" },
              },
              {
                title: "初始分值",
                dataIndex: "initScore",
                align: "center",
              },
              {
                title: "加减分类型",
                dataIndex: "addAndSubType",
                align: "center",
              },
              {
                title: "计分方式",
                dataIndex: "integralWay",
                align: "center",
              },
              {
                title: "适用对象",
                dataIndex: "applicableObjects",
                align: "center",
              },
              {
                title: "是否启用",
                dataIndex: "enabled",
                align: "center",
                scopedSlots: { customRender: "enabled" },
              },
              {
                title: "操作",
                dataIndex: "operation",
                align: "center",
                scopedSlots: { customRender: "operation" },
              },
        ],
    }
}

export default table