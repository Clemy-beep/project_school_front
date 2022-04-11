<template>
  <nav>
    <div id="school-header">
      <img src="../assets/Untitled.png" alt="school-logo" />
      <p>Groupe scolaire Augustin</p>
    </div>
    <router-link to="/admin">Accueil</router-link>
    <router-link to="/">Se déconnecter</router-link>
  </nav>
</template>

<style>
img {
  width: 84px;
}
#school-header {
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: center;
}
</style>
