<template>
    <div>
        <h1>Records</h1>
        <button @click="getRecords">Refresh</button>
        <div v-for="(r, idx) of records" :key="idx">
            {{idx+1}} - {{r.elapsedTime}}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            records: []
        }
    },
    created() {
        this.getRecords();
    },
    methods: {
        getRecords() {
            this.records = JSON.parse(localStorage.getItem("records")) || []
        }
    }
}
</script>