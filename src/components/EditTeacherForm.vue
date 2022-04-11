<template>
  <TeacherForm
    v-if="teacher.firstname"
    :t="teacher"
    @handle-submit="handleSubmit"
  />
  <span id="error" v-if="error !== ''">{{ error }}</span>
  <span id="success" v-if="success !== ''">{{ success }}</span>
</template>

<script>
import { useTeachersStore } from "@/stores/teachers.ts";
import { mapState } from "pinia";
import TeacherForm from "@/components/TeacherForm.vue";
export default {
  components: {
    TeacherForm,
  },
  data() {
    return {
      error: "",
      success: "",
      teacher: {},
    };
  },
  computed: {
    ...mapState(useTeachersStore, {
      getTeachers: "teachers",
    }),
    currentTeachers() {
      return this.getTeachers;
    },
  },
  created() {
    this.teacher =
      this.currentTeachers.find(
        (teacher) => teacher.id === this.$route.params.id
      ) || this.fetchTeacher();
  },
  methods: {
    fetchTeacher: async function () {
      let t = await fetch(
        `http://127.0.0.1:8000/api/teachers/${this.$route.params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
        .then((r) => r.json())
        .catch((e) => {
          console.log(e);
        });
      if (t.code === 401) this.$router.push("/");
      this.teacher = t;
    },
    handleSubmit: async function () {
      let response = await fetch(
        `http://127.0.0.1:8000/api/teachers/${this.$route.params.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(this.teacher),
        }
      )
        .then((r) => r.json())
        .catch((e) => {
          console.log(e);
        });
      console.log(response);
    },
  },
};
</script>

<style scoped>
form {
  display: block;
  margin: 0 auto;
  width: fit-content;
}
label,
input {
  display: block;
  color: white;
}
input {
  border: 1px solid white;
}
span {
  color: white;
  text-align: center;
}
</style>
