<template>
  <form @submit.prevent="$emit('handleSubmit')">
    <div v-if="teacher.username">
      <label for="username">Identifiant</label>
      <input
        type="text"
        name="username"
        id="username"
        v-model="teacher.username"
        required
      />
    </div>
    <label for="firstname">Prénom</label>
    <input
      type="text"
      name="firstname"
      id="firstname"
      v-model="teacher.firstname"
      required
    />

    <label for="lastname">Nom</label>
    <input
      type="text"
      name="lastname"
      id="lastname"
      v-model="teacher.lastname"
      required
    />
    <label for="password">Mot de passe</label>
    <input
      type="password"
      name="password"
      id="password"
      v-model="teacher.password"
      required
    />
    <label for="email">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      v-model="teacher.email"
      required
    />
    <label for="age">Âge</label>
    <input
      type="number"
      name="age"
      id="age"
      min="18"
      v-model="teacher.age"
      required
    />
    <label for="salary">Salaire</label>
    <input
      type="number"
      name="salary"
      id="salary"
      min="1200"
      v-model="teacher.salary"
      required
    />
    <label for="seniority">Ancienneté</label>
    <input
      type="number"
      name="seniority"
      id="seniority"
      min="0"
      v-model="teacher.seniority"
      required
    />
    <label for="schoolclass">Classe</label>
    <select
      v-if="schoolClasses"
      v-model="teacher.schoolClass"
      name="schoolclass"
      required
    >
      <option
        v-for="schoolClass in schoolClasses"
        :key="schoolClass['@id']"
        :value="schoolClass['@id']"
      >
        {{ schoolClass.level }}
      </option>
    </select>
    <input type="submit" value="Ajouter un professeur" />
  </form>
</template>

<script>
export default {
  props: {
    t: {},
    s: Array,
  },
  data() {
    return {
      teacher: this.t,
      schoolClasses: this.s,
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
input,
select {
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
