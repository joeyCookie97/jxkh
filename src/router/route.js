const menuList = [
    {
        key: '首页',
        title: '首页',
        icon: 'bar-chart',
        path: '/dashboard',
    },
    {
        key: "指标管理",
        title: "指标管理",
        icon: 'bar-chart',
        children: [
            {
                key: "testP",
                title: "testP",
                icon: 'table',
                children: [
                    {
                        key: "test",
                        title: "test",
                        path: '/test/test',
                        icon: 'rise',
                    }
                ]
            },
            {
                key: "指标体系",
                title: "指标体系",
                path: '/targetManagement/targetSystem',
                icon: 'rise',
            },
            {
                key: "指标元数据",
                title: "指标元数据",
                path: '/targetManagement/targetMetadata',
                icon: 'rise',
            }
        ]
    },
    {
        key: "考核模型管理",
        title: "考核模型管理",
        icon: 'bar-chart',
        children: [
            {
                key: "数据源管理",
                title: "数据源管理",
                path: '/modelManagement/dataSource',
                icon: 'rise',
            },
            {
                key: "模型制定",
                title: "模型制定",
                path: '/modelManagement/modeFrmulation',
                icon: 'rise'
            },
            {
                key: "模型管理",
                title: "模型管理",
                path: '/modelManagement/dataSource',
                icon: 'rise',
            }
        ]
    },
    {
        key: "板块管理",
        title: "板块管理",
        icon: 'bar-chart',
        children: [
            {
                key: "展示管理",
                title: "展示管理",
                path: '/modelManagement/dataSource',
                icon: 'rise',
            },
            {
                key: "权限管理",
                title: "权限管理",
                path: '/modelManagement/dataSource',
                icon: 'rise',
            }
        ]
    },
    {
        key: "考核可视化",
        title: "考核可视化",
        icon: 'bar-chart',
        children: [
            {
                key: "考核填报",
                title: "考核填报",
                path: '/modelManagement/dataSource',
                icon: 'rise',
            },
            {
                key: "基础考核",
                title: "基础考核",
                path: '/modelManagement/dataSource',
                icon: 'rise',
            }
        ]
    }
]

export default menuList