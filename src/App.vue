<template>
    <div class="content">
      <Puzzles @puzzle-changed="updatePuzzle" />
      <SliderPuzzle :puzzle="selectedPuzzle" />
      <Records />
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
    };
  },
  methods: {
    updatePuzzle(puzzle) {
      this.selectedPuzzle = puzzle;
    },
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
