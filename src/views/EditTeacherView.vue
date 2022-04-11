<template>
  <AdminHeader />
  <h1>Editer Enseignant</h1>
  <EditTeacherForm />
</template>
<script>
import AdminHeader from "@/components/AdminHeader.vue";
import EditTeacherForm from "@/components/EditTeacherForm.vue";
export default {
  components: {
    AdminHeader,
    EditTeacherForm,
  },
};
</script>
