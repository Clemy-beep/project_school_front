<template>
  <div id="eleve" v-if="students.schoolClass">
    <h1>{{ students.lastname }} {{ students.firstname }}</h1>
    <p>{{ students.gender }}</p>
    <h2>{{ students.schoolClass.level }}</h2>
    <p></p>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";

console.log("tutu");
const route = useRoute();
const students = ref([]);
onMounted(() => {
  fetchStudent();
});

async function fetchStudent() {
  let reponse = await fetch(
    `http://127.0.0.1:8000/api/students/${route.params.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/ld+json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
  console.log(reponse);
  if (reponse.gender === "Male") {
    reponse.gender = "Homme";
  } else if (reponse.gender === "Female") {
    reponse.gender = "Femme";
  } else reponse.gender = "Non-Binaire";

  students.value = reponse;
}
</script>
<style scoped>
h1 {
  color: black;
  background-color: red;
  padding: 1%;
  border-radius: 15px;
  display: flex;
  width: 100%;
  justify-content: center;
}
#eleve {
  display: flex;
  margin-top: 10%;
  justify-content: center;
  background-color: black;
  width: 33%;
  margin-left: 33%;
  padding: 10%;
  border-radius: 20px;
}
p {
  color: white;
  align-items: center;
  display: flex;
  margin-left: 3%;
}
h2 {
  color: white;
}
</style>
