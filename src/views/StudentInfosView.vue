<template>
  <div id="student">
    <AdminHeader></AdminHeader>
    <StudentItem></StudentItem>
  </div>
</template>
<script>
import AdminHeader from "../components/AdminHeader.vue";
import StudentItem from "../components/StudentItem.vue";
export default {
  components: {
    AdminHeader,
    StudentItem,
  },
};
</script>
