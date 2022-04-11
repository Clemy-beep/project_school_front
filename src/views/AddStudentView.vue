<template>
  <AddStudent @StudentSubmit="StudentSubmit" />
  <h1></h1>
</template>

<script>
import { useRouter } from "vue-router";
import AddStudent from "../components/AddStudent.vue";
const router = useRouter();
export default {
  components: {
    AddStudent,
  },
};
</script>
