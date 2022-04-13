<template>
  <TeacherHeader />
  <h1>Ajouter une note</h1>
  <AddGradeForm />
</template>
<script>
import TeacherHeader from "@/components/TeacherHeader.vue";
import AddGradeForm from "@/components/AddGradeForm.vue";
export default {
  components: {
    TeacherHeader,
    AddGradeForm,
  },
};
</script>

<style scoped>
@media (max-width: 500px) {
  h1 {
    text-align: center;
    font-size: 22px;
    margin: 0;
  }
}
</style>
