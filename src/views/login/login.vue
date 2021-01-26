<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [{ required: true, message: 'Please input your username!' }],
          },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: 'Please input your Password!' }],
          },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
      >
        Remember me
      </a-checkbox>
      <a class="login-form-forgot" href=""> Forgot password </a>
      <a-button type="primary" html-type="submit" class="login-form-button">
        Log in
      </a-button>
      Or
      <a href=""> register now! </a>
    </a-form-item>
  </a-form>
</template>

<script>
import { asyncRouterMap } from "@/router";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      sidrbar: []
    }
  },
  created() {
    // console.log(asyncRouterMap[0].children);
    const arm = asyncRouterMap[0].children;
    for (let i = 0; i < arm.length; i++) {
      let obj = {};
      if (arm[i].meta.parent) {
        if (arm[i].meta.parent.parent) {
          console.log("二级菜单", arm[i].meta.parent.name);
        } else {
          let cobj = {};
          cobj.key = arm[i].meta.title;
          cobj.title = arm[i].meta.title;
          cobj.path = arm[i].path;
          cobj.icon = arm[i].meta.icon;

          const isExit = this.sidrbar.some(item => { return item.key == arm[i].meta.parent.name })
          if (this.sidrbar && isExit) {
            this.sidrbar.map( item => {
              if(item.key == arm[i].meta.parent.name) {
                item.children.push(cobj)
              }
            })
          } else {
            obj.key = arm[i].meta.parent.name;
            obj.title = arm[i].meta.parent.name;
            obj.icon = arm[i].meta.icon;
            obj.children = [];
            obj.children.push(cobj);
            this.sidrbar.push(obj);
          }

          console.log("一级菜单", arm[i].meta.parent.name);
        }
      } else {
        obj.key = arm[i].meta.title;
        obj.title = arm[i].meta.title;
        obj.icon = arm[i].meta.icon;
        obj.path = arm[i].path;
        this.sidrbar.push(obj);
        console.log("这个没有子菜单", arm[i].meta.title);
      }
    }

    console.log("生成的菜单导航", this.sidrbar);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$store.commit('addMenuList',this.sidrbar)
          console.log('添加到vuex里面的导航信息',this.$store.state.menuList);
          this.$router.addRoutes(asyncRouterMap);
          this.$router.push("/");
        }
      });
    },
  },
};
</script>
<style>
#components-form-demo-normal-login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>