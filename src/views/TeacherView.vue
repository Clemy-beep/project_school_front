<template>
  <div id="admin">
    <TeacherHeader />
    <h1>Teacher view</h1>
    <TeacherProfile />
  </div>
</template>

<script>
import TeacherHeader from "../components/TeacherHeader.vue";
import TeacherProfile from "@/components/TeacherProfile.vue";
export default {
  components: {
    TeacherHeader,
    TeacherProfile,
  },
};
</script>
