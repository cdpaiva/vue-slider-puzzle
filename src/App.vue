<template>
  <div>
    <Puzzles @puzzle-changed="updateName" />
    <SliderPuzzle :puzzleName="selectedPuzzleName"/>
    <Records/>
  </div>
</template>

<script>
import Puzzles from "./components/Puzzles.vue";
import SliderPuzzle from "./components/SliderPuzzle.vue"
import Records from "./components/Records.vue"

export default {
  name: "App",
  components: {
    Puzzles,
    SliderPuzzle,
    Records
  },
  data() {
    return {
      selectedPuzzleName: 'city',
    };
  },
  methods: {
    updateName(name){
      this.selectedPuzzleName = name
    }
  }
};
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
