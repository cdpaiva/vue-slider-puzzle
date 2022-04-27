<template>
  <div class="container">
    <h2>Swap the Panes to Rebuild the Image</h2>
    <div class="buttons">
      <button @click="start" id="start-button">Start Game</button>
      <button @click="stop" id="quit-button">Quit</button>
    </div>
    <p class="timer">Elapsed Time: {{ elapsedTime }}</p>

    <div class="board">
      <div class="win-message" v-if="isWinning">
        <h3>You won!!</h3>
        <h5>Total game time: {{ gameTime }}</h5>
      </div>

      <div class="board-overlay" v-if="isWinning"></div>

      <div class="row">
        <div
          class="column"
          v-for="(s, index) of shuffledPuzzleArray"
          :key="s"
          @click="swap(index)"
        >
          <img :src="require(`../assets/${puzzle}/${s}`)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

const correctPuzzleArray = [
  "image_part_001.jpg",
  "image_part_002.jpg",
  "image_part_003.jpg",
  "image_part_004.jpg",
  "image_part_005.jpg",
  "image_part_006.jpg",
  "image_part_007.jpg",
  "image_part_008.jpg",
  "image_part_009.jpg",
];

export default {
  name: "SliderPuzzle",
  props: {
    puzzle: {
      type: String,
      default: "bird",
    },
  },
  emits: ["updateLeaderboard"],
  data() {
    return {
      correctPuzzleArray,
      shuffledPuzzleArray: this.shuffle(correctPuzzleArray),
      indexesToSwap: [],
      timer: undefined,
      startDateTime: new Date(),
      currentDateTime: new Date(),
      isGameOn: false,
      gameTime: "",
    };
  },
  computed: {
    isWinning() {
      return this.areEqualArrays(this.correctPuzzleArray, this.shuffledPuzzleArray)
    },
    elapsedDiff() {
      const currentDateTime = moment(this.currentDateTime);
      const startDateTime = moment(this.startDateTime);
      return currentDateTime.diff(startDateTime);
    },
    elapsedTime() {
      return moment.utc(this.elapsedDiff).format("HH:mm:ss");
    },
  },
  methods: {
    swap(index) {
      if (!this.timer) {
        return;
      }
      if (this.indexesToSwap.length < 2) {
        this.indexesToSwap.push(index);
      }
      if (this.indexesToSwap.length === 2) {
        const [index1, index2] = this.indexesToSwap;
        [this.shuffledPuzzleArray[index1], this.shuffledPuzzleArray[index2]] = [
          this.shuffledPuzzleArray[index2],
          this.shuffledPuzzleArray[index1],
        ];
        this.indexesToSwap = [];
      }
    },
    start() {
      if (this.isGameOn) {
        return;
      }
      this.isGameOn = true;
      this.resetTime();
      this.shuffledPuzzleArray = this.shuffle(correctPuzzleArray);
      this.indexesToSwap = [];
      this.timer = setInterval(() => {
        this.currentDateTime = new Date();
        if (this.isWinning) {
          this.gameTime = this.elapsedTime;
          this.recordSpeedRecords();
          this.stop();
          this.isGameOn = false;
        }
      }, 1000);
    },
    shuffle(puzzle) {
      let shuffled = [...puzzle].sort(() => Math.random() - 0.5);
      if (this.areEqualArrays(puzzle, shuffled)) {
        this.shuffle(puzzle);
      }
      return shuffled;
    },
    areEqualArrays(arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false;
      }
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    },
    stop() {
      this.resetTime();
      clearInterval(this.timer);
      this.timer = undefined;
      this.isGameOn = false;
    },
    resetTime() {
      this.startDateTime = new Date();
      this.currentDateTime = new Date();
    },
    recordSpeedRecords() {
      let records = JSON.parse(localStorage.getItem("records")) || [];
      const { elapsedTime, elapsedDiff } = this;
      records.push({ elapsedTime, elapsedDiff });
      const sortedRecords = records
        .sort((a, b) => a.elapsedDiff - b.elapsedDiff)
        .slice(0, 5);
      const stringifiedRecords = JSON.stringify(sortedRecords);
      localStorage.setItem("records", stringifiedRecords);
      this.$emit("updateLeaderboard");
    },
  },
  watch: {
    puzzle() {
      this.indexesToSwap = [];
      this.resetTime();
      this.stop();
      this.shuffledPuzzleArray = this.shuffle(correctPuzzleArray);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
.buttons button {
  margin-left: 2em;
  padding: 0.25em;
  font-size: 1.15em;
}
.timer {
  font-size: 1.5em;
}
.board {
  position: relative;
  border: 1px solid black;
  max-width: 726px;
  max-height: 726px;
  text-align: center;
}
.board-overlay {
  position: absolute;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  background-color: black;
}
.win-message {
  font-size: 1.5em;
  font-weight: 900;
  position: absolute;
  top: 37%;
  left: 30%;
  color: azure;
  z-index: 1;
  margin: 0;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.column {
  height: 242px;
}
.column img {
  border: 1px solid black;
}
</style>