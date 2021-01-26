const form = {
    rules: {
        targetSystem: {
            title: [{ required: true,message: "名称必填", },{
                min: 3,
                max: 5,
                message: "Length should be 3 to 5",
                trigger: "blur",
              },]
        },
        dataSource: {
            title: [{ required: true,message: "名称必填", }]
        },
        targetMetaData: {
            title: [{ required: true,message: "名称必填", }]
        }
    },
    form: {
        targetSystem: {
            title: "",
            id: "",
            key: "",
            parent: "",
            score: "",
        },
        dataSource: {
            title: "",
            des: "",
            dataType: "",
            ip: "",
            port: "",
            libName: "",
            username: "",
            password: "",
        },
        targetMetaData: {
            id: "",
            code: "",
            title: "",
            des: "",
            jsgs: "",
            initScore: "",
            highScore: "",
            score: "",
            addAndSubType: "",
            scoreType: "",
            applicableObjects: "",
            enabled: '',
        }
    }
}

export default form