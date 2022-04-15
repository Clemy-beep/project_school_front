<template>
  <div v-if="student.means">
    <p v-for="mean in student.means" :key="mean.id">
      {{ mean.course }} : {{ mean.mean }}
    </p>
  </div>
</template>

<script>
import { useStudentsStore } from "@/stores/student";
import { mapState, mapWritableState } from "pinia";
import { useMeansStore } from "@/stores/means";

export default {
  data() {
    return {
      student: {},
      means: [],
    };
  },
  computed: {
    ...mapState(useStudentsStore, {
      getStudent: "student",
    }),
    ...mapWritableState(useStudentsStore, {
      setStudent: "student",
    }),
    ...mapState(useMeansStore, {
      getMeans: "means",
    }),
    ...mapWritableState(useMeansStore, {
      setMeans: "means",
    }),
    currentStudent() {
      return this.getStudent;
    },
    currentMeans() {
      return this.getMeans;
    },
  },
  mounted() {
    // eslint-disable-next-line no-prototype-builtins
    this.student = this.currentStudent.hasOwnProperty(
      this.currentStudent.firstname
    )
      ? this.currentStudent
      : this.fetchStudent();
  },

  methods: {
    fetchStudent: async function () {
      if (!sessionStorage.getItem("token")) this.$router.push("/");
      let res = await fetch(
        `http://127.0.0.1:8000/api/students/${sessionStorage.getItem("id")}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((r) => r.json())
        .catch((e) => {
          console.log(e);
        });
      if (res.id) {
        this.student = res;
        this.student.means = this.calculMeans();
        this.setStudent = this.student;
        console.log(this.student);
      }
      if (res.code === 401) this.$router.push("/");
    },
    getCourseGradesArray: function (course) {
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

      return parseFloat((total / count).toFixed(2));
    },
    calculMeans: function () {
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
      let means = [
        { course: "Français", mean: this.frenchMean },
        { course: "Histoire", mean: this.historyMean },
        { course: "Math", mean: this.mathsMean },
        { course: "Science", mean: this.scienceMean },
        { course: "Sport", mean: this.sportMean },
      ];
      this.generalMean = {
        course: "Moyenne générale",
        mean: this.calculateAverage(means.map((mean) => parseInt(mean.mean))),
      };
      means.push(this.generalMean);
      return means;
    },
  },
};
</script>

<style scoped>
p,
div {
  display: block;
  margin: 0.5em auto;
  width: fit-content;
}
</style>
