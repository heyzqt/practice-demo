<template>
  <div>
    <h1>pageb</h1>
  </div>
</template>
<script>
export default {
  mounted() {
    //此处添加500毫秒延迟，目的是等待历史记录变化之后再添加空地址，使空地址能准确添加到栈顶，防止出错
    setTimeout(() => {
      if (!(history.state && history.state.target == "Final")) {
        window.history.pushState(
          { target: "MeanSure", random: Math.random() },
          "",
          location.href
        );
        window.history.pushState(
          { target: "Final", random: Math.random() },
          "",
          location.href
        );
      }
      window.addEventListener(
        "popstate",
        function(e) {
            console.log('popstate');
          if (e.state && e.state.target == "MeanSure") {
            //此处可调用一些自定义的操作，例如弹窗提示之类的，最后根据实际需要可调用上面三个函数中的任何一个，用于决定当前自定义操作完成之后，需要停留在本页面，还是回退，还是跳转到其他页面
            // doSomething();
            //stay();如此操作会停留在本页面
            //back();如此操作会无副作用回退到上一级
            //toUrl（'http://www.baidu.com'）;如此操作会执行完之定义操作之后跳转到百度
          }
        },
        false
      );
    }, 500);
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log("pageb component beforeRouteEnter");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log("pageb beforeRouteUpdate");
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log("pageb beforeRouteLeave");

    // if (to.fullPath === "/pagec") {
    //   next();
    // } else {
    //   next({ name: "pagec" });
    // }
    next();
  },
  beforeDestroy() {
    // this.$router.push({ name: "pagec" });
  },
};
</script>
