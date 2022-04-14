<template>
  <table>
    <thead>
      <tr>
        <th class="table_head">Nom</th>
        <th class="table_head">Prénom</th>
        <th class="table_head">Voir élève</th>
        <th class="table_head">modifier l'élève</th>

        <th class="table_head">Supprimer l'élève</th>
      </tr>
    </thead>
    <tbody>
      <!-- boucle pour chaque élève -->
      <tr v-for="student in students" :key="student">
        <th>{{ student.firstname }}</th>
        <th>{{ student.lastname }}</th>
        <th>
          <router-link
            :to="{ name: 'selectedstudent', params: { id: student.id } }"
          >
            <span id="icons" class="material-icons"> badge </span></router-link
          >
        </th>
        <th>
          <router-link
            :to="{ name: 'modifystudent', params: { id: student.id } }"
          >
            <span id="icons" class="material-icons"> build </span></router-link
          >
        </th>
        <th>
          <button @click="deleteStudent(student)">supprimer</button>
        </th>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import router from "@/router";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import { useRoute } from "vue-router";
const students = ref([]);
const route = useRoute();
onMounted(() => {
  fetchStudents();
});

async function fetchStudents() {
  let response = await fetch("http://127.0.0.1:8000/api/students", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/ld+json",
    },
  })
    .then((r) => r.json())
    .catch((e) => {
      console.log(e);
    });
  console.log(response);
  if (response["hydra:member"]) {
    students.value = response["hydra:member"];
  }
}

async function deleteStudent(student) {
  let response = await fetch(
    `http://127.0.0.1:8000/api/students/${student.id}`,
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
  console.log(response);
  alert(
    "Supression effectuée avec succès , veuillez rafraîchir la page pour voir la modification"
  );
}
</script>

<style scoped>
table {
  margin: auto;
  margin-top: 5%;
}

.table_head {
  background-color: black;
  color: white;
}
#icons {
  color: black;
}
#icons_del {
  color: red;
}
</style>
