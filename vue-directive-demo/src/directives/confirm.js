let origin = {};
let target = {};
let needConfirm = false;

function watcher() {
  return !_.isEqual(origin, target);
}

export default {
  name: "confirm-data",
  bind(el, binding, vnode) {
    console.log("confirm data bind origin value = ", binding.value);
    origin = Object.assign({}, binding.value);
  },
  update(el, binding, vnode) {
    console.log("confirm data update ", binding.value);
    target = Object.assign({}, binding.value);
    needConfirm = watcher();
  },
  unbind() {
    needConfirm = false;
  },
};

export { needConfirm };
