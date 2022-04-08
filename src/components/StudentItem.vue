<template>
  <div id="student-file">
    <h1>{{ student.firstname }} {{ student.lastname }}</h1>
    <p>Genre : {{ student.gender }}</p>
    <p v-if="student.schoolClass">
      Classe:
      {{ student.schoolClass.level }}
    </p>
    <p v-if="student.schoolClass">
      Enseignant : {{ student.schoolClass.teacher.firstname }}
      {{ student.schoolClass.teacher.lastname }}
    </p>
    <p>Contact du parent : {{ student.email }}</p>
    <div id="student-grades">
      <p>Notes :</p>
      <p v-for="grade in student.grades" :key="grade.id">{{ grade }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useStudentsStore } from "../stores/student";

export default {
  data() {
    return {
      student: {
        schoolClass: {
          level: "",
        },
      },
    };
  },
  computed: {
    ...mapState(useStudentsStore, {
      getStudents: "students",
    }),
  },
  created() {
    this.student =
      this.getStudents.find(
        (student) => student.id === this.$route.params.id
      ) || this.fetchStudent();
  },
  methods: {
    fetchStudent: async function () {
      let s = await fetch(
        `http://127.0.0.1:8000/api/students/${this.$route.params.id}`,
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
      console.log(s);
      if (s.code === 401) this.$router.push("/");
      if (s.id) {
        this.student = s;
      }
    },
  },
};
</script>
