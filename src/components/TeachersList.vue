<template>
  <div id="teachers">
    <div class="teacher" v-for="teacher in teachers" :key="teacher.id">
      <span>{{ teacher.firstname }} {{ teacher.lastname }}</span>
      <button>
        <router-link :to="{ path: `/teacher/${teacher.id}` }"
          >Voir la fiche</router-link
        >
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapWritableState } from "pinia";
import { useTeachersStore } from "../stores/teachers";
export default {
  data() {
    return {
      teachers: [],
    };
  },

  computed: {
    ...mapState(useTeachersStore, {
      getTeachers: "teachers",
    }),
    ...mapWritableState(useTeachersStore, {
      setTeachers: "teachers",
    }),
    currentTeachers() {
      return this.getTeachers;
    },
  },
  mounted() {
    this.checkStore();
  },
  methods: {
    checkStore: function () {
      this.teachers =
        this.currentTeachers.length > 0
          ? this.currentTeachers
          : this.fetchTeachers();
    },
    fetchTeachers: async function () {
      let response = await fetch("http://127.0.0.1:8000/api/teachers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((r) => r.json())
        .catch((e) => {
          return e;
        });
      console.log(response);
      if (response.code === 401) this.$router.push("/");
      if (response["hydra:member"]) this.setTeachers = response["hydra:member"];
      this.teachers = this.currentTeachers;
    },
  },
};
</script>
<style scoped>
span,
button {
  color: white;
}

#teachers {
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
</style>
