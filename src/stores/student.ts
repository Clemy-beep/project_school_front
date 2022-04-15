import { defineStore } from "pinia";

export const useStudentsStore = defineStore({
  id: "students",
  state: () => ({
    students: [],
    student: {},
  }),
  getters: {
    getStudents: (state) => state.students,
    getStudent: (state) => state.student,
  },
  actions: {},
});
