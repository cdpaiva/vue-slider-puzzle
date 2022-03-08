<template>
  <div class="container">
    <table>
      <caption>
        Leaderboard
      </caption>
      <thead>
        <th>Pos</th>
        <th>Time</th>
      </thead>
      <tbody>
        <tr v-for="(r, idx) of records" :key="idx">
          <td>{{ idx + 1 }}</td>
          <td>{{ r.elapsedTime }}</td>
        </tr>
      </tbody>
    </table>

    <button @click="getRecords">Update Leaderboard</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      records: [],
    };
  },
  created() {
    this.getRecords();
  },
  methods: {
    getRecords() {
      this.records = JSON.parse(localStorage.getItem("records")) || [];
    },
  },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
button {
  margin: 0.5em;
  padding: 0.25em;
  font-size: 1.15em;
}
table {
  border-collapse: collapse;
  border: 2px solid black;
}
caption {
    font-size: 2em;
}
td,
th {
  border: 1px solid black;
  padding: 10px 20px;
}
td {
  text-align: center;
}
</style>