<template>
  <form @submit.prevent="handleSubmit">
    <label for="course">Matière</label>
    <select name="course" id="course" v-model="grade.course">
      <option v-for="course in courses" :key="course.id" :value="course['@id']">
        {{ course.name }}
      </option>
    </select>
    <label for="student">Elève</label>
    <select name="student" id="student" v-model="grade.student">
      <option
        v-for="student in students"
        :key="student.id"
        :value="student['@id']"
      >
        {{ student.firstname }} {{ student.lastname }}
      </option>
    </select>
    <label for="grade">Note</label>
    <input
      type="number"
      name="grade"
      id="grade"
      v-model="grade.grade"
      min="0"
      max="20"
    />
    <input type="submit" value="Noter cet élève" />
  </form>
  <span v-if="error !== ''"> {{ error }}</span>
</template>
<script>
import { useCoursesStore } from "@/stores/courses";
import { useStudentsStore } from "@/stores/student";
import { useTeachersStore } from "@/stores/teachers";
import { mapState, mapWritableState } from "pinia";

export default {
  data() {
    return {
      courses: [],
      grade: {},
      students: [],
      error: "",
    };
  },
  computed: {
    ...mapState(useCoursesStore, {
      getCourses: "courses",
    }),
    ...mapWritableState(useCoursesStore, {
      setCourses: "courses",
    }),
    ...mapState(useTeachersStore, {
      getTeacher: "teacher",
    }),
    ...mapState(useStudentsStore, {
      getStudents: "students",
    }),
    ...mapWritableState(useStudentsStore, {
      setStudents: "students",
    }),
    ...mapWritableState(useStudentsStore, {
      setStudents: "students",
    }),
    currentCourses() {
      return this.getCourses;
    },
  },
  mounted() {
    this.courses =
      this.currentCourses.length > 0
        ? this.currentCourses
        : this.fetchCourses();
    this.students =
      this.getTeacher.schoolClass.students.length > 0
        ? this.getTeacher.schoolClass.students
        : this.fetchStudents();
  },
  methods: {
    fetchStudents: async function () {
      let r = await fetch("http://127.0.0.1:8000/api/students", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .catch((e) => {
          console.log(e);
        });
      r = r["hydra:member"];
      this.students = r;
      this.students = Array.from(this.students).filter(
        (student) =>
          student.schoolClass.teacher.id.toString() ===
          sessionStorage.getItem("id")
      );
      this.setStudents = this.students;
    },
    fetchCourses: async function () {
      let courses = await fetch("http://127.0.0.1:8000/api/courses", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((r) => r.json())
        .catch((e) => {
          console.log(e);
        });
      console.log(courses);
      if (courses["hydra:member"]) {
        this.courses = courses["hydra:member"];
        this.setCourses = this.courses;
      }
    },
    handleSubmit: function () {
      if (this.grade.grade < 0 || this.grade.grade > 20) {
        this.error = "Note invalide";
        return;
      }
      this.addGrade();
    },
    addGrade: async function () {
      let res = await fetch("http://127.0.0.1:8000/api/grades", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.grade),
      })
        .then((r) => r.json())
        .catch((e) => {
          console.log(e);
        });
      if (res.code === 401) this.$router.push("/");
      alert("Note ajoutée avec succès !");
      this.$router.push("/teacher");
    },
  },
};
</script>
<style scoped>
form {
  display: block;
  margin: 0 auto;
  width: fit-content;
}
label,
input {
  display: block;
  color: white;
}
input {
  border: 1px solid white;
}
span {
  color: white;
  text-align: center;
}

select {
  color: white;
}
</style>
