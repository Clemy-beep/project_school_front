import { defineStore } from "pinia";

export const useTeachersStore = defineStore({
  id: "teachers",
  state: () => ({
    teachers: [],
    teacher: {},
  }),
  getters: {
    getTeachers: (state) => state.teachers,
  },
  actions: {},
});
