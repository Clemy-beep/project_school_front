<template>
  <h1>{{ teacher.firstname }} {{ teacher.lastname }}</h1>

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
</template>
<script>
import { mapState } from "pinia";
import { useTeachersStore } from "@/stores/teachers";

export default {
  data() {
    return {
      teacher: {},
    };
  },
  computed: {
    ...mapState(useTeachersStore, {
      getTeachers: "teachers",
    }),
    currentTeachers() {
      return this.getTeachers;
    },
  },
  created() {
    this.teacher =
      this.currentTeachers.find(
        (teacher) => teacher.id === this.$route.params.id
      ) || this.fetchTeacher();
  },
  methods: {
    fetchTeacher: async function () {
      let t = await fetch(
        `http://127.0.0.1:8000/api/teachers/${this.$route.params.id}`,
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
</style>
