<template>
  <div class="card" :id="id">
    <router-link :to="route"></router-link>
  </div>
</template>

<script>
export default {
  name: "AdminCard",
};
</script>
