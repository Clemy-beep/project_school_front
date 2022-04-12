<template>
  <div id="name">
    <h1>{{ teacher.firstname }} {{ teacher.lastname }}</h1>
    <button @click="redirect">Editer</button>
    <button id="delete-teacher" @click="deleteTeacher">Exclure</button>
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
import { mapState } from "pinia";
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
      getTeachers: "teachers",
    }),
    currentTeachers() {
      return this.getTeachers;
    },
  },
  mounted() {
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
    deleteTeacher: async function () {
      let conf = confirm(
        "Êtes vous sûr de vouloir exclure cet enseignant ? Cette opération est définitive."
      );
      if (!conf) {
        return;
      }
      let response = await fetch(
        `http://127.0.0.1:8000/api/teachers/${this.$route.params.id}`,
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
      alert("Professeur supprimé avec succès !");
      useTeachersStore().$reset();
      this.$router.push("/admin/teachers");
    },
    redirect: function () {
      this.$router.push(`/admin/edit-teacher/${this.$route.params.id}`);
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
