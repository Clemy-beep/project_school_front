<template>
  <div id="ajout">
    <h1>Ajouter un élève</h1>
    <form @submit.prevent="handleSubmit">
      <input
        type="text"
        name="firstname"
        id="firstname"
        placeholder="Prénom de l'élève"
        v-model="student.firstname"
        required
      />

      <input
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Nom de l'élève"
        v-model="student.lastname"
        required
      />

      <input
        type="text"
        name="gender"
        id="gender"
        placeholder="Genre"
        v-model="student.gender"
        required
      />

      <input
        type="email"
        name="email"
        id="email"
        placeholder="Mail d'un parent"
        v-model="student.email"
        required
      />
      <input
        type="username"
        name="username"
        id="username"
        placeholder="Username de l'élève"
        v-model="student.username"
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="mot de passe de l'élève"
        v-model="student.password"
        required
      />

      <input type="submit" value="Ajouter un élève" id="add-button" />
    </form>
    <span v-if="succes !== ''" id="succes">{{ succes }} </span>
    <span id="errors">{{ errors }} </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: {
        firstname: "",
        lastname: "",
        sexe: "",
        email: "",
        username: "",
        password: "",
      },
      succes: "",
      error: "",
    };
  },
  methods: {
    handleSubmit: async function () {
      if (this.student.firstname === "") {
        this.errors.push("Il faut ajouter un prénom !");
        return;
      }
      if (this.student.lastname === "") {
        this.errors.push("Il faut ajouter un nom !");
        return;
      }
      if (this.student.gender === "") {
        this.errors.push("Il faut ajouter un genre !");
        return;
      }
      if (this.student.mail === "") {
        this.errors.push("Il faut ajouter le mail des parents !");
        return;
      }
      let response = await fetch("http://127.0.0.1:8000/api/students", {
        method: "POST",
        body: JSON.stringify(this.student),
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((r) => {
          return r.json();
        })
        .catch((e) => {
          this.succes = e.toString();
          console.log(e);
        });

      this.succes = "Elève ajouté avec succès";
    },
  },
};
</script>

<style scoped>
h1 {
  color: white;
  margin-top: 5%;
  margin-bottom: 3%;
  display: flex;
  justify-content: center;
}
form {
  display: flex;
  flex-direction: column;
}
form input,
textarea,
h2 {
  width: 60%;
  margin: auto;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border-color: hsla(160, 100%, 37%, 1);
  color: white;
  background-color: #181818;
  margin-top: 2%;
  display: flex;
  justify-content: center;
}
label {
  margin: auto;
  color: hsla(160, 100%, 37%, 1);
}

#add-button {
  margin-top: 2%;
  color: hsla(160, 100%, 37%, 1);
  padding: 10px;
  cursor: pointer;
  background-color: #000000;
  font-weight: bold;
}
#add-button:hover {
  background-color: #181818;
}
#ajout {
  background-color: #181818;
  width: 33%;
  margin: auto;
  padding: 5%;
  border-radius: 20px;
  margin-top: 5%;
}
#succes {
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 2%;
  padding: 3%;
  background-color: green;
}
</style>
