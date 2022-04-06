<!-- <template>
<header class="main-header">
<nav class="navbar">
      <div class="navbar__logo">
        <a href="#">
          <h1>Groupe Augustin</h1>
        </a>
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
          <a href="#"></a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style>
* {
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
</style> -->

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import login from "@/components/LoginForm.vue";
</script>
