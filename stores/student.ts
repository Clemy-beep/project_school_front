import { defineStore } from "pinia";

export const AllStudent = defineStore({
    id: "student",
    state: () => ({
        list: [],
    }),
    persist: true,
    getters: {
        getList: (state) => state.list,
    },
    actions: {
        increment() {
        },
    },
});