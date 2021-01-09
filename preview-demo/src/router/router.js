import index from "../views/index.vue";
const router = [
  {
    path: "/",
    name: "/",
    redirect: {
      name: "index"
    }
  },
  {
    path: "/index",
    name: "index",
    component: index
  },
  {
    path: "/demo/keyboard",
    name: "keyboard",
    component: resolve => require(["../views/demo/keyboard.vue"], resolve)
  }
];

export default router;
