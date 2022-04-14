<template>
  <fetchStudent />
</template>
<script>
import { useRouter } from "vue-router";
import fetchStudent from "../components/ModifyStudent.vue";

const router = useRouter();
export default {
  components: {
    fetchStudent,
  },
};
</script>
