<template>
  <div id="name">
    <h1>Bienvenue {{ teacher.firstname }} {{ teacher.lastname }}</h1>
  </div>

  <div id="teacher-infos">
    <h2>Email</h2>
    <p>{{ teacher.email }}</p>
    <h2>Âge</h2>
    <p>{{ teacher.age }} ans</p>
    <h2>Salaire</h2>
    <p>{{ teacher.salary }} €</p>
    <h2>Ancienneté</h2>
    <p>{{ teacher.seniority }} ans</p>
  </div>
  <span v-if="error !== ''">{{ error }}</span>
</template>
<script>
import { mapState, mapWritableState } from "pinia";
import { useTeachersStore } from "@/stores/teachers";

export default {
  data() {
    return {
      teacher: {},
      error: "",
    };
  },
  computed: {
    ...mapState(useTeachersStore, {
      getTeacher: "teacher",
    }),
    ...mapWritableState(useTeachersStore, {
      setTeacher: "teacher",
    }),
    currentTeacher() {
      return this.getTeacher;
    },
  },
  mounted() {
    this.checkStore();
  },
  methods: {
    checkStore: function () {
      // eslint-disable-next-line no-prototype-builtins
      this.teacher = this.currentTeacher.hasOwnProperty(
        this.currentTeacher.firstname
      )
        ? this.currentTeacher
        : this.fetchTeacher();
    },
    fetchTeacher: async function () {
      let t = await fetch(
        `http://127.0.0.1:8000/api/teachers/${sessionStorage.getItem("id")}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
        .then((r) => r.json())
        .catch((e) => {
          console.log(e);
        });
      if (t.code === 401) this.$router.push("/");
      this.teacher = t;
      console.log(t);
      this.setTeacher = this.teacher;
    },
  },
};
</script>

<style scoped>
h2 {
  color: white;
}

#teacher-infos {
  display: block;
  width: fit-content;
  margin: 0 auto;
}

button {
  border: 1px solid white;
  color: white;
  padding: 0.5em;
  height: 44px;
  cursor: pointer;
}
#name {
  display: flex;
  align-items: center;
  gap: 1em;
}
</style>
