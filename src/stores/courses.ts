import { defineStore } from "pinia";

export const useCoursesStore = defineStore({
  id: "courses",
  state: () => ({
    courses: [],
  }),
  getters: {
    getCourses: (state) => state.courses,
  },
  actions: {},
});
