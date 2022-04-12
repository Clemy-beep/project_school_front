<template>
  <div id="student-file">
    <h1>
      {{ student.firstname }} {{ student.lastname }}
      <button id="delete-teacher" @click="deleteStudent">
        Exclusion définitive
      </button>
      <button @click="excludeStudent">Exclusion temporaire</button>
    </h1>
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
      <p v-if="student.grades && student.grades.length === 0">
        Aucune note à afficher
      </p>
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
    deleteStudent: async function () {
      let conf = confirm(
        "Êtes vous sûr de vouloir exclure cet enseignant ? Cette opération est définitive."
      );
      if (!conf) {
        return;
      }
      let response = await fetch(
        `http://127.0.0.1:8000/api/students/${this.$route.params.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
        .then((r) => r.json())
        .catch((e) => {
          console.log(e);
        });
      if (response.code === 401) this.$router.push("/");
      if (response) {
        this.error = "Une erreur s'est produite, suppression impossible.";
        return;
      }
      alert("Elève supprimé avec succès !");
      useStudentsStore().$reset();
      this.$router.push("/admin/all-students");
    },
    excludeStudent: async function () {
      let conf = confirm(
        "Êtes vous sûr de vouloir exclure temporairement cet élève ?"
      );
      if (conf) {
        this.student.isExcluded = true;
        let response = await fetch(
          `http://127.0.0.1:8000/api/students/${this.$route.params.id}`,
          {
            method: "PATCH",
            headers: {
              Accept: "application/ld+json",
              "Content-Type": "application/merge-patch+json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              id: this.$route.params.id,
              firstname: this.student.firstname,
              lastname: this.student.lastname,
              email: this.student.email,
              gender: this.student.gender,
              isExcluded: true,
              password: this.student.password,
              schoolClass: this.student.schoolClass["@id"],
            }),
          }
        )
          .then((r) => r.json())
          .catch((e) => {
            console.log(e);
          });
        if (response.code === 401) this.$router.push("/");
        if (response) {
          this.error = "Une erreur s'est produite, exclusion impossible.";
          return;
        }
        alert("Elève temporairement exclu avec succès !");
        useStudentsStore().$reset();
        this.$router.push("/admin/all-students");
      }
    },
  },
};
</script>

<style scoped>
button {
  border: 1px solid white;
  color: white;
  padding: 0.5em;
  height: 44px;
  cursor: pointer;
}
</style>
