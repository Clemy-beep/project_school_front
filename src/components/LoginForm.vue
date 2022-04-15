<template>
  <h1>Bienvenue sur le site du groupe scolaire Augustin</h1>
  <div id="login">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <input
        type="text"
        name="username"
        v-model="user.username"
        placeholder="Votre identifiant"
        required
      />
      <input
        type="password"
        name="password"
        v-model="user.password"
        placeholder="Votre mot de passe"
        required
      />
      <input value="Connexion" type="submit" id="co-button" />
    </form>
    <span id="error">{{ error }} </span>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    handleSubmit: async function () {
      if (this.user.username != "" && this.user.password != "") {
        let response = await fetch("http://127.0.0.1:8000/api/login_check", {
          method: "POST",
          body: JSON.stringify(this.user),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((r) => {
            this.error =
              r.status === 401 ? "Identifiant ou mot de passe incorrect" : "";
            return r.json();
          })
          .catch((e) => {
            this.error = e.message.toString();
            console.lgo(e);
          });
        if (response.message === "Invalid credentials") {
          this.error = "Mot de passe ou identifiant incorrect.";
          return;
        }
        if (response.token) {
          sessionStorage.setItem("token", response.token);

          let decoded = jwt_decode(response.token);
          let role = decoded.roles;

          if (role.indexOf("ROLE_TEACHER") >= 0) {
            sessionStorage.setItem("role", "teacher");
            sessionStorage.setItem("id", decoded.id);
          } else if (role.indexOf("ROLE_ADMIN") >= 0) {
            sessionStorage.setItem("role", "admin");
          } else {
            sessionStorage.setItem("role", "student");
            sessionStorage.setItem("id", decoded.id);
          }
          this.redirect();
        }
      }

      // pour rediriger plus tard sur une page   router.push("home");
      else {
        this.error = "Merci de remplir tous les champs";
      }
    },
    redirect: function () {
      let role = sessionStorage.getItem("role");
      if (role === "admin") this.$router.push("/admin");
      else if (role === "teacher") this.$router.push("/teacher");
      else this.$router.push("/student");
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
#error {
  color: #ee2020;
}
</style>
