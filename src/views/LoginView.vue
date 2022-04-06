<template>
  <div>
    <LoginForm @handleSubmit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import Connexion from "../components/LoginForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();

async function handleSubmit(user) {
  let response = await fetch("http://127.0.0.1:8000/api/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((r) => {
      return r.json();
    })
    .catch();

  if (response.token && response.refresh_token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("refresh_token", response.refresh_token);

    // pour rediriger plus tard sur une page   router.push("home");
  }
}
</script>
