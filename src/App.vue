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
p {
  color: lightgray;
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
  color: white;
}
</style>

<script setup lang="ts"></script>
