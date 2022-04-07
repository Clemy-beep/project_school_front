<template>
  <router-view />
</template>
<script lang="ts">
export default {};
</script>
<style>
* {
  font-family: "Roboto", sans-serif;
  background-color: black;
}

/* HEADER */

.main-header {
  background-color: rgb(20, 20, 20);
  background-image: linear-gradient(rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0));
  color: rgb(255, 255, 255);
}

a {
  color: #ffffff;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
}

a:hover {
  color: #e5e5e5;
}

nav {
  min-height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
}

nav ul {
  display: flex;
  list-style: none;
}

nav li {
  padding-right: 30px;
}

h1 {
  color: #e50914;
  font-family: "american";
  width: 100%;
  align-items: center;
  display: flex;
  margin-left: 1%;
  font-size: 40px;
}
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>
