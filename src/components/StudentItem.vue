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
    <div id="student-grades" v-if="student.grades && student.grades.length > 0">
      <p>Moyennes :</p>
      <ul>
        <li v-if="historyMean >= 0">Histoire: {{ historyMean }}</li>
        <li v-if="frenchMean >= 0">Français : {{ frenchMean }}</li>
        <li v-if="scienceMean >= 0">Science : {{ scienceMean }}</li>
        <li v-if="sportMean >= 0">Sport : {{ sportMean }}</li>
        <li v-if="mathsMean >= 0">Maths: {{ mathsMean }}</li>
      </ul>
      <p
        style="text-decoration: underline"
        id="general-mean"
        v-if="
          historyMean >= 0 &&
          frenchMean >= 0 &&
          mathsMean >= 0 &&
          scienceMean >= 0 &&
          sportMean >= 0
        "
      >
        Moyenne générale : {{ generalMean }}
      </p>
    </div>
    <p
      v-if="student.grades && student.grades.length === 0"
      style="color: #ee2020"
    >
      Aucune note à afficher
    </p>
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
      historyMean: Number,
      scienceMean: Number,
      frenchMean: Number,
      mathsMean: Number,
      sportMean: Number,
      generalMean: Number,
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
      if (s.code === 401) this.$router.push("/");
      if (s.id) {
        this.student = s;
        this.getMeans();
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
    getCourseGradesArray(course) {
      return Array.from(this.student.grades)
        .filter((grade) => grade.course.name === course)
        .map((grade) => parseInt(grade.grade));
    },
    calculateAverage: function (array) {
      var total = 0;
      var count = 0;

      array.forEach(function (item) {
        total += item;
        count++;
      });

      return (total / count).toFixed(2);
    },
    getMeans: function () {
      this.historyMean = parseInt(
        this.calculateAverage(this.getCourseGradesArray("Histoire"))
      );
      this.frenchMean = parseInt(
        this.calculateAverage(this.getCourseGradesArray("Français"))
      );
      this.scienceMean = parseInt(
        this.calculateAverage(this.getCourseGradesArray("Science"))
      );
      this.mathsMean = parseInt(
        this.calculateAverage(this.getCourseGradesArray("Math"))
      );
      this.sportMean = parseInt(
        this.calculateAverage(this.getCourseGradesArray("Sport"))
      );
      let allMeans = [
        this.frenchMean,
        this.historyMean,
        this.mathsMean,
        this.scienceMean,
        this.sportMean,
      ];
      this.generalMean = this.calculateAverage(allMeans);
    },
  },
};
</script>

<style scoped>
ul {
  color: white;
}
button {
  border: 1px solid white;
  color: white;
  padding: 0.5em;
  height: 44px;
  cursor: pointer;
}

#general-mean {
  font-weight: 600;
}
</style>
