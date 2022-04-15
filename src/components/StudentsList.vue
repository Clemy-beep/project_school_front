<template>
  <div id="students">
    <div class="student" v-for="student in students" :key="student.id">
      <span id="exclusion" v-if="student.isExcluded === true"> EXCLU </span>
      <span>{{ student.firstname }} {{ student.lastname }}</span>
      <button>
        <router-link :to="{ path: `/admin/student/${student.id}` }"
          >Voir la fiche</router-link
        >
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapWritableState } from "pinia";
import { useStudentsStore } from "../stores/student.ts";

export default {
  name: "StudentList",
  data() {
    return {
      students: [],
    };
  },
  computed: {
    ...mapState(useStudentsStore, {
      getStudents: "students",
    }),
    ...mapWritableState(useStudentsStore, {
      setStudents: "students",
    }),
    currentStudents() {
      return this.getStudents;
    },
  },
  mounted() {
    this.checkStore();
  },
  methods: {
    checkStore: function () {
      if (this.currentStudents.length > 0) this.students = this.currentStudents;
      else this.fetchStudents();
    },

    fetchStudents: async function () {
      let response = await fetch("http://127.0.0.1:8000/api/students", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((r) => r.json())
        .catch((e) => {
          console.log(e);
          if (e.message === "Invalid JWT Token") this.$router.push("/");
        });
      if (
        response.message === "Invalid JWT Token" ||
        response.message === "Expired JWT Token"
      )
        this.$router.push("/");
      if (response["hydra:member"] && response["hydra:member"].length > 0) {
        this.students = response["hydra:member"];
        this.setStudents = this.students;
        console.log(this.students);
      }
    },
  },
};
</script>

<style scoped>
span,
button {
  color: white;
}

#students {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
}

button {
  border: 1px solid white;
  margin: 0.5em;
  cursor: pointer;
}

#exclusion {
  color: #ee2020;
}
</style>
