<template>
  <form method="POST" @submit.prevent="handleSubmit">
    <label for="firstname">Prénom</label>
    <input
      type="text"
      name="firstname"
      id="firstname"
      placeholder="Prénom de l'élève"
      v-model="student.firstname"
    />
    <label for="lastname">Nom de famille</label>
    <input
      type="text"
      name="lastname"
      id="lastname"
      placeholder="Nom de l'élève"
      v-model="student.lastname"
    />
    <label for="password">Mot de passe</label>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="Mot de
    passe de l'élève"
      v-model="student.password"
    />
    <label for="gender">Genre</label>
    <select name="gender" id="gender" v-model="student.gender">
      <option value="Male">Garçon</option>
      <option value="Female">Fille</option>
      <option value="Non binary">Non binaire</option>
    </select>
    <label for="email">Email des parents</label>
    <input
      type="mail"
      name="mail"
      id="mail"
      placeholder="Mail d'un parent"
      v-model="student.email"
    />
    <label for="schoolclass">Classe</label>
    <select
      v-if="schoolClasses"
      v-model="student.schoolClass"
      name="schoolclass"
    >
      <option
        v-for="schoolClass in schoolClasses"
        :key="schoolClass['@id']"
        :value="schoolClass['@id']"
      >
        {{ schoolClass.level }}
      </option>
    </select>
    <input type="submit" value="Ajouter un élève" id="submit" />
  </form>
  <div id="error">{{ error }}</div>
</template>

<script>
import { useClassesStore } from "@/stores/schoolclasses";
import { useStudentsStore } from "@/stores/student";
import { mapState, mapWritableState } from "pinia";

export default {
  name: "AddStudentForm",
  data() {
    return {
      student: {},
      error: "",
      schoolClasses: [],
    };
  },

  computed: {
    ...mapState(useClassesStore, {
      getClasses: "schoolClasses",
    }),
    ...mapWritableState(useClassesStore, {
      setClasses: "schoolClasses",
    }),
    currentClasses() {
      return this.getClasses;
    },
  },

  mounted() {
    this.checkStore();
  },

  methods: {
    checkStore: function () {
      this.schoolClasses =
        this.schoolClasses.length > 0
          ? this.schoolClasses
          : this.fetchClasses();
    },
    fetchClasses: async function () {
      let response = await fetch("http://127.0.0.1:8000/api/school_classes", {
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
      if (response.message === "Invalid JWT Token") this.$router.push("/");
      if (response["hydra:member"] && response["hydra:member"].length > 0) {
        this.schoolClasses = response["hydra:member"];
        this.setClasses = this.schoolClasses;
        console.log(this.schoolClasses);
      }
    },
    handleSubmit: function () {
      if (this.student.firstname === "") {
        this.error = "Il faut ajouter un prénom !";
        return;
      }
      if (this.student.lastname === "") {
        this.error = "Il faut ajouter un nom !";
        return;
      }
      if (this.student.sexe === "") {
        this.error = "Il faut ajouter un sexe !";
        return;
      }
      if (this.student.mail === "") {
        this.error = "Il faut ajouter le mail des parents !";
        return;
      }
      if (this.student.password === "") {
        this.error = "Il faut ajouter le password !";
        return;
      }
      if (this.student.password.length < 8) {
        this.error = "Votre mot de passe doit contenir 8 caractères";
        return;
      }
      this.student.username =
        this.student.lastname.toLowerCase() +
        "_" +
        this.student.firstname.charAt(0).toLowerCase();
      console.log(this.student);
      this.addStudent();
    },
    addStudent: async function () {
      let response = await fetch("http://127.0.0.1:8000/api/students", {
        method: "POST",
        body: JSON.stringify(this.student),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((r) => r.json())
        .catch((e) => {
          console.log(e);
        });
      if (response.id) {
        useStudentsStore().$reset();
        let conf = confirm("Elève ajouté avec succès");
        if (conf) this.$router.push("/admin/all-students");
      }
      if (response.code === 401) this.$router.push("/");
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
