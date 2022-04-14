<template>
  <SelectedStudent />
</template>
<script>
import { useRouter } from "vue-router";
import SelectedStudent from "../components/SelectedStudent.vue";

const router = useRouter();
export default {
  components: {
    SelectedStudent,
  },
};
</script>
