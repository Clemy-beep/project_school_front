<template>
  <div id="admin">
    <AdminHeader></AdminHeader>
    <h1>Admin</h1>
    <div id="cards">
      <router-link class="card student" to="/admin/all-students"
        >Voir les étudiants</router-link
      >
      <router-link class="card student" to="/admin/add-student"
        >Ajouter un étudiant</router-link
      >

      <router-link class="card teacher" to="/admin/teachers"
        >Voir les enseignants</router-link
      >
      <router-link class="card teacher" to="/"
        >Ajouter un enseignant</router-link
      >
    </div>
  </div>
</template>

<script>
import AdminHeader from "../components/AdminHeader.vue";
export default {
  components: {
    AdminHeader,
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.card {
  width: 200px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border-radius: 8px;
}

#cards {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 1em;
}

.student {
  background-color: lightslategray;
}

.teacher {
  background-color: lightgrey;
}
</style>
