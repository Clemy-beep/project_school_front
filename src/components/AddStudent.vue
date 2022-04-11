<template>
  <div id="ajout">
    <h1>Ajouter un élève</h1>
    <form @submit.prevent="StudentSubmit">
      <input
        type="text"
        name="firstname"
        id="firstname"
        placeholder="Prénom de l'élève"
        v-model="student.firstname"
      />

      <input
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Nom de l'élève"
        v-model="student.lastname"
      />

      <input
        type="text"
        name="gender"
        id="gender"
        placeholder="Genre"
        v-model="student.gender"
      />

      <input
        type="mail"
        name="mail"
        id="mail"
        placeholder="Mail d'un parent"
        v-model="student.mail"
      />
      <input
        type="username"
        name="username"
        id="username"
        placeholder="Username de l'élève"
        v-model="student.username"
      />

      <input type="submit" value="Ajouter un élève" id="add-button" />
    </form>
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
        mail: "",
        username: "",
      },
    };
  },
  methods: {
    StudentSubmit: async function () {
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
      let response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "POST",
        body: JSON.stringify(this.user),
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((r) => {
          return r.json();
        })
        .catch((e) => {
          this.error = e.toString();
          console.log(e);
        });
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
  width: 33%;
  color: hsla(160, 100%, 37%, 1);
  padding: 10px;
  cursor: pointer;
  background-color: #000000;
  font-weight: bold;
}
#co-button:hover {
  background-color: #181818;
}
#ajout {
  background-color: #181818;
  width: 33%;
  margin: auto;
  padding: 5%;
  border-radius: 20px;
}
</style>
