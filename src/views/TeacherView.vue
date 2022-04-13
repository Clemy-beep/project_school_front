<template>
  <div id="admin">
    <TeacherHeader />
    <TeacherProfile />
    <button>
      <router-link to="/teacher/add-grade">Noter mes élèves</router-link>
    </button>
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

<style scoped>
button {
  height: 44px;
  border: 1px solid white;
  color: white;
  border-radius: 16px;
  padding: 0.5em;
  display: block;
  margin: 1em auto;
  cursor: pointer;
}
</style>
