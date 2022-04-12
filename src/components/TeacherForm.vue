<template>
  <form @submit.prevent="$emit('handleSubmit')">
    <div v-if="teacher.username">
      <label for="username">Identifiant</label>
      <input
        type="text"
        name="username"
        id="username"
        v-model="teacher.username"
      />
    </div>
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
</template>

<script>
export default {
  props: {
    t: {},
  },
  data() {
    return {
      teacher: this.t,
    };
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
