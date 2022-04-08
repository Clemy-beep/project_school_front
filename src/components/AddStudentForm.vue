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

    <select name="gender" id="gender">
      Genre
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
      v-model="student.mail"
    />

    <input type="submit" value="Ajouter un élève" id="submit" />
  </form>
  <div id="error">{{ error }}</div>
</template>

<script>
export default {
  name: "AddStudentForm",
  data() {
    return {
      student: {},
      error: "",
    };
  },
  methods: {
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
        this.errors.push("Il faut ajouter le mail des parents !");
        return;
      }
      this.addStudent();
    },

    addStudent: async function () {
      let response = await fetch();
      return true;
    },
  },
};
</script>

<style scoped>
table {
  margin: 10px;
}
table,
th,
td {
  border: 1px solid;
}
td {
  width: 600px;
  padding: 10px;
}
</style>
