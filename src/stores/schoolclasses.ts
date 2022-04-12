import { defineStore } from "pinia";

export const useClassesStore = defineStore({
  id: "schoolClasses",
  state: () => ({
    schoolClasses: [],
    schoolClass: {},
  }),
  getters: {
    getList: (state) => state.schoolClasses,
    getOne: (state) => state.schoolClass,
  },
  actions: {},
});
