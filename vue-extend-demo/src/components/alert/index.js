import Vue from "vue";
import alert from "./alert";

const AlertConstructor = Vue.extend(alert);

let instance;
var Alert = function(options) {
  options = options || {};
  instance = new AlertConstructor({
    data: options
  });
  instance.vm = instance.$mount(); //如果Vue实例还没有el属性时，可以手动使用mount将实例挂载到Vue实例上面
  document.body.appendChild(instance.$el);
  instance.vm.$el.style.zIndex = "9999";
};

export default Alert;
