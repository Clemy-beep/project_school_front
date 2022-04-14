<template>
  <ShowStudent />
</template>

<script>
import { useRouter } from "vue-router";
import ShowStudent from "../components/ShowStudent.vue";

const router = useRouter();
export default {
  components: {
    ShowStudent,
  },
};
</script>
