<template>
  <div id="student">
    <StudentHeader />
    <h1>Mon carnet de notes</h1>
    <StudentGrades />
  </div>
</template>

<script>
import StudentHeader from "@/components/StudentHeader.vue";
import StudentGrades from "@/components/StudentGrades.vue";
export default { components: { StudentHeader, StudentGrades } };
</script>
