<template>
  <AdminHeader />
  <h1>Ajouter un élève</h1>
  <AddStudentForm></AddStudentForm>
</template>

<script>
import AddStudentForm from "@/components/AddStudentForm.vue";
import AdminHeader from "@/components/AdminHeader.vue";
export default {
  components: {
    AddStudentForm,
    AdminHeader,
  },
};
</script>

<style></style>
