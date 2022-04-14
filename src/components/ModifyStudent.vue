<template>
  <form>
    <input id="schoolClass" name="schoolClass" value=" " />
    <input
      id="firstname"
      name="firstname"
      v-model="students.firstname"
      placeholder="{{ students.firstname }} "
    />
    <input id="lastname" name="lastname" value=" {{ students.lastname }} " />
    <p></p>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const route = useRoute();
const students = ref([{ firstname: "" }]);
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
