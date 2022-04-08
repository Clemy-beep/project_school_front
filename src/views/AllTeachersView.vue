<template>
  <AdminHeader></AdminHeader>
  <h1>Tous les enseignants</h1>
  <TeachersList></TeachersList>
</template>

<script>
import AdminHeader from "@/components/AdminHeader.vue";
import TeachersList from "@/components/TeachersList.vue";
export default {
  components: {
    AdminHeader,
    TeachersList,
  },
};
</script>
