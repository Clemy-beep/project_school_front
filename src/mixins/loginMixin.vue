<script>
export const loginCheckMixin = {
  created: function () {
    this.loginCheck();
  },
  methods: {
    loginCheck: function () {
      if (!sessionStorage.getItem("token")) {
        this.$router.push("/");
      }
    },
  },
};
</script>
