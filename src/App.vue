<template>
    <div class="content">
      <Puzzles @puzzle-changed="updatePuzzle" />
      <SliderPuzzle :puzzle="selectedPuzzle" @updateLeaderboard="updateLeaderboard"/>
      <Records :records="records"/>
    </div>
</template>

<script>
import Puzzles from "./components/Puzzles.vue";
import SliderPuzzle from "./components/SliderPuzzle.vue";
import Records from "./components/Records.vue";

export default {
  name: "App",
  components: {
    Puzzles,
    SliderPuzzle,
    Records,
  },
  data() {
    return {
      selectedPuzzle: "bird",
      records: []
    };
  },
  methods: {
    updatePuzzle(puzzle) {
      this.selectedPuzzle = puzzle;
    },
    updateLeaderboard() {
      this.records = JSON.parse(localStorage.getItem("records")) || []
    }
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
