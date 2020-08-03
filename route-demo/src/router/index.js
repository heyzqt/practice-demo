import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: {
        name: "pagea",
      },
    },
    {
      path: "/pagea",
      name: "pagea",
      component: (resolve) => require(["../views/pagea.vue"], resolve),
      beforeEnter: (to, from, next) => {
        console.log("pagea beforeEnter");
        next();
      },
      beforeEach: (to, from, next) => {
        console.log("pagea beforeEach");
        next();
      },
      beforeResolve: (to, from, next) => {
        console.log("pagea beforeResolve");
        next();
      },
    },
    {
      path: "/pageb",
      name: "pageb",
      component: (resolve) => require(["../views/pageb.vue"], resolve),
    },
    {
      path: "/pagec",
      name: "pagec",
      component: (resolve) => require(["../views/pagec.vue"], resolve),
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log("router beforeEach");
  next();
});

router.beforeResolve((to, from, next) => {
  console.log("router beforeResolve");
  next();
});

router.afterEach((to, next) => {
  console.log("router afterEach");
});

export default router;
