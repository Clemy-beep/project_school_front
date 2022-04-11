<template>
  <div id="teach-form">
    <form method="post" @submit.prevent="handleSubmit">
      <label for="firstname">Prénom</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        v-model="teacher.firstname"
      />
      <label for="lastname">Nom</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        v-model="teacher.lastname"
      />
      <label for="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="teacher.password"
      />
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="teacher.email" />
      <label for="age">Âge</label>
      <input type="number" name="age" id="age" min="18" v-model="teacher.age" />
      <label for="salary">Salaire</label>
      <input
        type="number"
        name="salary"
        id="salary"
        min="1200"
        v-model="teacher.salary"
      />
      <label for="seniority">Ancienneté</label>
      <input
        type="number"
        name="seniority"
        id="seniority"
        min="0"
        v-model="teacher.seniority"
      />
      <input type="submit" value="Ajouter un professeur" />
    </form>
    <span id="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "AddTeacherForm",
  data() {
    return {
      teacher: {},
      error: "",
    };
  },
  methods: {
    handleSubmit: function () {
      if (
        this.teacher.firstname === null ||
        this.teacher.lastname === null ||
        this.teacher.email === null ||
        this.teacher.age === null ||
        this.teacher.salary === null ||
        this.teacher.seniority === null
      ) {
        this.error = "Merci de renseigner tous les champs";
        return;
      }
      if (this.teacher.age < 18 || this.teacher.age > 90) {
        this.error = "Merci de renseigner un âge valide";
        return;
      }
      if (this.teacher.password.length < 8) {
        this.error = "Le mot de passe doit contenir au moins 8 caractères";
        return;
      }
      if (this.teacher.salary < 1200) {
        this.error = "Merci de renseigner un salaire légal";
        return;
      }
      if (
        this.teacher.seniority < 0 ||
        this.teacher.seniority > this.teacher.age - 18
      ) {
        this.error = "Merci de renseigner une ancienneté valide";
        return;
      }
      this.teacher.username =
        this.teacher.lastname.toLowerCase() +
        "_" +
        this.teacher.firstname.charAt(0).toLowerCase();
      this.addTeacher();
    },
    addTeacher: async function () {
      let response = await fetch("http://127.0.0.1:8000/api/teachers", {
        method: "POST",
        body: JSON.stringify(this.teacher),
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
        let conf = confirm("Professeur ajouté avec succès");
        if (conf) this.$router.push("/admin/teachers");
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
</style>
