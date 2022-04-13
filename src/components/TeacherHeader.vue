<template>
  <nav>
    <div id="school-header">
      <img src="../assets/Untitled.png" alt="school-logo" />
      <p>Groupe scolaire Augustin</p>
    </div>
    <router-link to="/teacher"><span>Accueil</span></router-link>
    <router-link to="/"><span>Déconnexion</span></router-link>
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

@media (max-width: 500px) {
  span {
    font-size: 14px;
  }
  p {
    display: none;
  }
  img {
    width: 54px;
  }
}
</style>
