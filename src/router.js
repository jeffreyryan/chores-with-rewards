import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignUp from "./views/SignUp.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "crib",
      component: () =>
         import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/home",
      name: "home",
      // component: Home
      component: () =>
         import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/SignUp",
      name: "SignUp",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "signUp" */ "./views/SignUp.vue")
    },
    {
      path: "/Family",
      name: "Family",
      component: () =>
        import(/* webpackChunkName: "kids" */ "./views/Family.vue")
    },
    {
      path: "/Chores",
      name: "Chores",
      component: () =>
        import(/* webpackChunkName: "add" */ "./views/Chores.vue")
    },
    {
      path: "/Rewards",
      name: "Rewards",
      component: () =>
        import(/* webpackChunkName: "add" */ "./views/Rewards.vue")
    },
  ]
});
