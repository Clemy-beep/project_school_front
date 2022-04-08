<template>
  <div id="teacher">
    <AdminHeader></AdminHeader>
    <TeacherItem></TeacherItem>
  </div>
</template>
<script>
import AdminHeader from "@/components/AdminHeader.vue";
import TeacherItem from "@/components/TeacherItem.vue";
export default {
  components: {
    AdminHeader,
    TeacherItem,
  },
};
</script>
