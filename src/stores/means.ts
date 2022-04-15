import { defineStore } from "pinia";

export const useMeansStore = defineStore({
  id: "means",
  state: () => ({
    means: [],
  }),
  getters: {
    getList: (state) => state.means,
  },
  actions: {},
});
