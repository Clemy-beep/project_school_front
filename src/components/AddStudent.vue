<template>
    <table>
        <thead>
            <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Sexe</th>
                <th>Mail du parent</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="student in getList" :key="student">
                <th>{{ student.firstname }}</th>
                <th>{{ student.lastname }}</th>
                <th>{{ student.sexe }}</th>
                <th>{{ student.mail }}</th>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { Allstudent } from "../stores/student";
import { mapState, mapWritableState } from "pinia";

export default {
    computed: {
        ...mapState(AllStudent, ['getList'])
    },
};
</script>


<style scoped>
table {
    margin: 10px;
}
table,
th,
td {
    border: 1px solid;
}
td {
    width: 600px;
    padding: 10px;
}
</style>