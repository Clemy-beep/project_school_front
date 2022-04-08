import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/AdminView.vue"),
  },
  {
    path: "/teacher",
    name: "teacher",
    component: () =>
      import(/* webpackChunkName: "teacher" */ "../views/TeacherView.vue"),
  },
  {
    path: "/student",
    name: "student",
    component: () =>
      import(/* webpackChunkName: "student" */ "../views/StudentView.vue"),
  },
  {
    path: "/admin/all-students",
    name: "all-students",
    component: () =>
      import(
        /* webpackChunkName: "all-students" */ "../views/AllStudentsView.vue"
      ),
  },
  {
    path: "/admin/teachers",
    name: "teachers",
    component: () =>
      import(
        /* webpackChunkName: "all-teachers" */ "../views/AllTeachersView.vue"
      ),
  },
  {
    path: "/admin/add-student",
    name: "add-student",
    component: () =>
      import(
        /* webpackChunkName: "add-students" */ "../views/AddStudentView.vue"
      ),
  },
  {
    path: "/student/:id",
    name: "student",
    component: () =>
      import(/* webpackChunkName: "student" */ "../views/StudentInfosView.vue"),
  },
  {
    path: "/teacher/:id",
    name: "teacher",
    component: () =>
      import(/* webpackChunkName: "teacher" */ "../views/TeacherInfosView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
