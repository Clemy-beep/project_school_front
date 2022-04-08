<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <LoginForm />
  </div>
</template>

<script lang="ts">
import LoginForm from "../components/LoginForm.vue";
export default {
  components: {
    LoginForm,
  },
  mounted() {
    sessionStorage.clear();
  },
};
</script>
