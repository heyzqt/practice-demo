import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: {
        name: "index",
      },
    },
    {
      path: "/index",
      name: "index",
      component: (resolve) => require(["../views/index.vue"], resolve),
    },
    {
      path: "/pagea",
      name: "pagea",
      component: (resolve) => require(["../views/pagea.vue"], resolve),
    },
  ],
});

export default router;
