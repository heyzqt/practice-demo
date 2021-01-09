import Vue from "vue";
import router from "./router";
import utils from "./utils";
import "./css/common.scss";

Vue.prototype.$utils = utils;

Vue.config.productionTip = false;

const vm = new Vue({
  el: "#app",
  router,
  render: h => h(require("./views/App.vue").default)
});

Vue.use({ vm });
