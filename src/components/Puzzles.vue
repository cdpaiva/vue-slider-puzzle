<template>
  <h1>Choose the picture:</h1>
  <div class="container">
    <div v-for="p of puzzles" :key="p.id" class="col">
      <div class="">
        <img @click="$emit('puzzle-changed', p.title)" :src="require(`../assets/${p.image}`)" alt="p.title" />
      </div>
      <div>
        <h3>{{ p.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  emits: ["puzzle-changed"],
  data() {
    return {
      puzzles: [
        { id: 1, image: "mandala.jpg", title: "mandala" },
        { id: 2, image: "cliff.jpg", title: "cliff" },
        { id: 3, image: "stork.jpg", title: "stork" },
      ],
    };
  },
};
</script>

<style>
.container {
  display: flex;
  max-width: 95%;
  justify-content: center;
  gap: 2%;
}
.col {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.col img {
  width: 150px;
  height: 150px;
  border: 2px white solid;
}

.col img:hover {
  border: 2px goldenrod solid;

}
</style>