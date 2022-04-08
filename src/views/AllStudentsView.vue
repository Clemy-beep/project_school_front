<template>
  <div id="all-students">
    <AdminHeader></AdminHeader>
    <h1>Tous les élèves</h1>
    <StudentList></StudentList>
  </div>
</template>

<script>
import StudentList from "../components/StudentsList.vue";
import AdminHeader from "../components/AdminHeader.vue";
export default {
  components: {
    StudentList,
    AdminHeader,
  },
};
</script>
