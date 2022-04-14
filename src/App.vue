<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import login from "@/components/LoginForm.vue";
import AddStudent from "./components/AddStudent.vue";
</script>
<template>
  <header class="main-header">
    <nav class="navbar">
      <div class="navbar__logo">
        <router-link to="/login"> <img src="./assets/ecole.png" /></router-link>

        <router-link to="/login">Groupe Scolaire Augustin</router-link>
      </div>
      <ul>
        <li>
          <a href="/notes">
            Mes notes
            <span class="material-icons">grade</span>
          </a>
        </li>
        <li>
          <a href="#">
            Deconnexion
            <span class="material-icons">logout</span>
          </a>
        </li>
        <li>
          <router-link to="/addstudent">
            Ajouter un élève <span class="material-icons"> add </span>
          </router-link>
        </li>
        <li>
          <router-link to="/showstudent">
            Voir les élèves <span class="material-icons"> assignment_ind </span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <RouterView />
</template>

<style>
img {
  width: 150px;
  height: 100px;
  vertical-align: middle;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

body {
  padding: 0;
  margin: 0;
  min-height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
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
  justify-content: space-between;
  padding: 10px;
}

nav ul {
  display: flex;
  list-style: none;
}

nav li {
  padding-right: 30px;
}
</style>
