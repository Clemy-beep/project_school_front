<template>
  <div id="add-teacher">
    <AdminHeader />
    <h1>Ajouter un enseignant</h1>
    <AddTeacherForm />
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader.vue";
import AddTeacherForm from "@/components/AddTeacherForm.vue";
export default {
  components: {
    AdminHeader,
    AddTeacherForm,
  },
};
</script>
