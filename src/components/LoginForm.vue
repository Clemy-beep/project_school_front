<template>
  <h1>Bienvenue sur le site du groupe scolaire Augustin</h1>
  <div id="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input
        type="text"
        name="username"
        v-model="user.username"
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        v-model="user.password"
        placeholder="Password"
      />
      <input value="Ajouter" type="submit" id="co-button" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    connexion() {
      if (this.user.username != "" && this.user.password != "") {
        if (
          this.user.username == this.user.username &&
          this.user.password == this.user.password
        ) {
          this.$emit("HandleSubmit", this.user);
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    },
  },
};
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
}
form input,
textarea,
h1 {
  width: 50%;
  margin: auto;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border-color: hsla(160, 100%, 37%, 1);
  color: white;
  background-color: #181818;
  margin-top: 2%;
}
label {
  margin: auto;
  color: hsla(160, 100%, 37%, 1);
}

#co-button {
  margin-top: 2%;
  width: 20%;
  color: hsla(160, 100%, 37%, 1);
  padding: 10px;
  cursor: pointer;
  background-color: #000000;
}
#co-button:hover {
  background-color: #181818;
}
</style>
