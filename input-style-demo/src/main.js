import Vue from "vue";
import App from "./App.vue";
import label from "./components/label/index.vue";
import label1 from "./components/label1/index.vue";

Vue.config.productionTip = false;
Vue.component("t-label", label);
Vue.component("t-label1", label1);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
