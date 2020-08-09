import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import confirm_data from "./directives/confirm";
import lodash from "lodash";

Vue.config.productionTip = false;
Vue.prototype._ = lodash;

Vue.directive('confirm-data', confirm_data);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
