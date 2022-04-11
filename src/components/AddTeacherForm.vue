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
        this.teacher.firstname.charAt(0);
      console.log(this.teacher);
    },
    //addTeacher: async function () {},
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
</style>
