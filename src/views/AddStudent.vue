<template>
    <form @submit.prevent="add(student)">
        <h1>Ajouter un élève</h1>

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

        <input type="texr" name="sexe" id="sexe" placeholder="Sexe" v-model="student.sexe" />

        <input
            type="mail"
            name="mail"
            id="mail"
            placeholder="Mail d'un parent"
            v-model="student.mail"
        />

        <input type="submit" value="Ajouter un élève" id="submit" />
    </form>
    <AddStudent />
</template>

<script>

import { mapState, mapWritableState } from "pinia";
import { Allstudent } from "../stores/student";
import { useRouter, useRoute } from "vue-router";


export default {
    data() {
        return {
            student: {
                firstname: "",
                lastname: "",
                sexe: "",
                mail: "",
            },
        };
    },

    components: {
        AddStudent,
    },
    computed: {
        ...mapWritableState(AllStudent, ["list"]),
    },
    methods: {
        add() {
            if (this.student.firstname === "") {
                this.errors.push("Il faut ajouter un prénom !");
                return;
            }
            if (this.student.lastname === "") {
                this.errors.push("Il faut ajouter un nom !");
                return;
            }
            if (this.student.sexe === "") {
                this.errors.push("Il faut ajouter un sexe !");
                return;
            }
            if (this.student.mail === "") {
                this.errors.push("Il faut ajouter le mail des parents !");
                return;
            }

        },
    },
};
</script>


<style>
</style>
