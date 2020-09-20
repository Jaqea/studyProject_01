<template>
  <div class="layout-content">
    <Card style="width:750px;" dis-hover>
      <p slot="title">Login</p>
      <Form :label-width="130" label-position="right">
        <FormItem label="E-Mail Address">
          <Input
            autocomplete="on"
            @on-keyup="test"
            v-model="userEmail"
            placeholder="Enter email..."
          ></Input>
          <span>{{emailTest}}</span>
        </FormItem>
        <FormItem label="Password">
          <Input
            type="password"
            @keyup.enter.native="login"
            @on-keyup="test"
            v-model="userPassword"
            placeholder="Enter password..."
          ></Input>
          <span>{{passwordTest}}</span>
        </FormItem>
        <FormItem>
          <CheckboxGroup v-model="single">
            <Checkbox label="Remember Me"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem>
          <Button
            :disabled="flag"
            @click.prevent="login"
            icon="md-arrow-forward"
            class="btn-login"
            type="primary"
            size="large"
          >LOGIN</Button>
          <router-link class="btn-login-link" to="/login/reset">FORGET YOUR PASSWORD?</router-link>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import axios from "axios";
const qs = require("qs");
export default {
  name: "logRegContent",
  data() {
    return {
      userEmail: "",
      userPassword: "",
      emailTest: "",
      passwordTest: "",
      single: []
    };
  },
  methods: {
    login: function() {
      let self = this;
      axios
        .post(
          "http://127.0.0.1:3000" + "/login",
          qs.stringify({
            userEmail: self.userEmail,
            userPassword: self.userPassword
          })
        )
        .then(function(res) {
          let err_code = res.data.err_code;
          if (err_code == 1) {
            window.alert("邮箱或者密码错误");
          } else if (err_code == 500) {
            window.alert("服务器忙，请稍后再试");
          } else if (err_code == 0) {
            sessionStorage.setItem("status", "logined");
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            if (self.single[0] == "Remember Me") {
              self.$cookies.set("userEmail", self.userEmail, 30 * 60);
              self.$cookies.set(
                "userPassword",
                Base64.encode(self.userPassword),
                30 * 60
              );
            } else {
              self.$cookies.remove("userEmail");
              self.$cookies.remove("userPassword");
            }
            window.location.href = "#/store";
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    test: function() {
      let self = this;
      const email = /^\w+@[0-9a-z]+\.[a-z]+$/i;
      const password = /^[0-9a-z]{6,20}$/i;
      if (email.test(self.userEmail) == false) {
        self.emailTest = "Format is error !";
      } else {
        self.emailTest = "";
      }
      if (password.test(self.userPassword) == false) {
        self.passwordTest = "6-20 Num or Alp !";
      } else {
        self.passwordTest = "";
      }
    }
  },
  computed: {
    flag: function() {
      if (this.emailTest == this.passwordTest) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    if (this.$cookies.isKey("userEmail")) {
      let userEmail = this.$cookies.get("userEmail");
      let userPassword = this.$cookies.get("userPassword");
      this.userEmail = userEmail;
      this.userPassword = Base64.decode(userPassword);
    }
  }
}
</script>

<style lang="less" scoped>
.layout-content {
  position: fixed;
  margin-top: 1px;
  width: 100%;
  height: 100%;
  background: #f5f3ef;
}
.ivu-card {
  top: 30px;
  margin: 0 auto;
}
.ivu-card-bordered {
  border-color: #e1dbd0;
}
.ivu-card-head p {
  font-weight: 300;
  font-size: 15px;
  text-align: left;
}
.ivu-form-item {
  width: 450px;
  height: 36px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.ivu-card.ivu-card-dis-hover.ivu-card-bordered:hover {
  border-color: #e1dbd0;
}
.ivu-checkbox-group .ivu-checkbox-default {
  width: auto;
  float: left;
}
.btn-login {
  float: left;
  background-color: #eb8581;
  color: #fff;
}
.btn-login:hover {
  background-color: #e66761;
}
.btn-login-link {
  display: inline-block;
  height: 36px;
  margin-left: 20px;
  line-height: 36px;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: #e66761;
  transition: color 0.2s;
}
.btn-login-link:hover {
  color: #d82a22;
  text-decoration: underline;
}
.ivu-form-item-content > span {
  display: inline-block;
  width: 100px;
  position: absolute;
  right: -110px;
  color: #eb8581;
}
</style>