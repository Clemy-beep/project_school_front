import { defineStore } from "pinia";

export const useStudentsStore = defineStore({
  id: "students",
  state: () => ({
    students: [],
    student: {},
  }),
  getters: {
    getList: (state) => state.students,
  },
  actions: {},
});
