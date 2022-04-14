import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },

  {
    path: "/addstudent",
    name: "addstudent",
    component: () =>
      import(
        /* webpackChunkName: "addstudent" */ "../views/AddStudentView.vue"
      ),
  },
  {
    path: "/showstudent",
    name: "showstudent",
    component: () =>
      import(
        /* webpackChunkName: "showstudent" */ "../views/ShowStudentView.vue"
      ),
  },
  {
    path: "/selectedstudent/:id",
    name: "selectedstudent",
    component: () =>
      import(
        /* webpackChunkName: "selectedstudent" */ "../views/SelectedStudentView.vue"
      ),
  },
  {
    path: "/modifystudent/:id",
    name: "modifystudent",
    component: () =>
      import(
        /* webpackChunkName: "modifystudent" */ "../views/ModifyStudentView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
