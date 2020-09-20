<template>
  <div class="energetice-junior">
    <div class="energetice-things">
      <ul>
        <router-link
          @click.native="getProduct(index,$event)"
          to="/store/product"
          tag="li"
          v-for="(product,index) in page"
        >
          <div class="things-img">
            <img :src="product.Img" alt="这是一张商品图片" />
          </div>
          <div class="things-content">
            <p>{{product.name}}</p>
            <p>${{product.dollar}}</p>
          </div>
        </router-link>
      </ul>
    </div>
    <div class="energetice-footer">
      <Page
        @on-page-size-change="getSizeChange"
        @on-change="getChange"
        :total="pageTotal"
        :page-size-opts="pageSizeOpts"
        :page-size="pageSize"
        size="small"
        show-elevator
        show-sizer
      />
    </div>
  </div>
</template>

<script>
import Axios from "axios";
const qs = require("qs");
export default {
  name: "EnergeticeJunior",
  data() {
    return {
      pageTotal: 32,
      pageSize: 8,
      pageSizeOpts: [8, 16, 24, 32],
      page: ""
    };
  },
  methods: {
    getChange(value) {
      let self = this;
      Axios.post(
        "http://127.0.0.1:3000" + "/pageOne",
        qs.stringify({
          page: value
        })
      )
        .then(function(res) {
          let err_code = res.data.err_code;
          if (err_code == 500) {
            window.alert("服务器繁忙，请稍后再试");
          } else if (err_code == 0) {
            self.page = res.data.page;
          }
        })
        .catch(function(error) {
          if (error) {
            console.log(error);
          }
        });
    },
    getSizeChange(value) {
      let self = this;
      Axios.post(
        "http://127.0.0.1:3000" + "/pageOneSize",
        qs.stringify({
          pageSize: value
        })
      )
        .then(function(res) {
          let err_code = res.data.err_code;
          if (err_code == 500) {
            window.alert("服务器繁忙，请稍后再试");
          } else if (err_code == 0) {
            self.page = res.data.page;
          }
        })
        .catch(function(error) {
          if (error) {
            console.log(error);
          }
        });
    },
    getProduct(index, event) {
      window.localStorage.setItem("product", JSON.stringify(this.page[index]));
      location.reload();
    }
  },
  created() {
    let self = this;
    Axios.post(
      "http://127.0.0.1:3000" + "/pageOne",
      qs.stringify({
        page: 1
      })
    )
      .then(function(res) {
        let err_code = res.data.err_code;
        if (err_code == 500) {
          window.alert("服务器繁忙，请稍后再试");
        } else if (err_code == 0) {
          self.page = res.data.page;
        }
      })
      .catch(function(error) {
        if (error) {
          console.log(error);
        }
      });
  }
};
</script>

<style lang="less" scoped>
.energetice-junior {
  width: 100%;
  height: 520px;
  margin-bottom: 20px;
}
.energetice-things {
  width: 100%;
  height: 460px;
  padding: 0 20px;
  padding-top: 20px;
  overflow-x: hidden;
  overflow-y: auto;
}
.energetice-things::-webkit-scrollbar {
  width: 5px;
  height: 200px;
  background: #fff;
}
.energetice-things::-webkit-scrollbar-thumb {
  background: #dcdee2;
  border-radius: 5px;
}
.energetice-footer {
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  height: 50px;
  padding: 0 35px;
}
.energetice-things > ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.energetice-things li {
  width: 22%;
  height: 46%;
  margin: 0 10px;
  cursor: pointer;
}
.things-img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
}
.things-img > img {
  width: 70px;
  height: 70px;
  transition: all 0.3s ease;
}
.things-img:hover img {
  transform: translateY(-10px);
}
.things-content {
  height: 40%;
  background: #eff2f7;
  padding: 10px 20px;
  text-align: center;
}
.things-content > p:first-child {
  margin-top: 5px;
  font-size: 16px;
}
.things-content > p:last-child {
  margin-top: 15px;
  font-size: 14px;
  color: #e66761;
}
</style>