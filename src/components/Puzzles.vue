<template>
  <div class="box">
    <h1 class="title">Choose a picture:</h1>
    <div class="container">
      <div v-for="p of puzzles" :key="p.id" class="col">
        <img
          @click="$emit('puzzle-changed', p.title)"
          :src="require(`../assets/${p.image}`)"
          alt="p.title"
        />
        <div>
          <h3>{{ p.title }}</h3>
        </div>
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
        { id: 1, image: "cats.jpg", title: "cats" },
        { id: 2, image: "bird.jpg", title: "bird" },
      ],
    };
  },
};
</script>

<style>
.box {
  border: 1px solid black;
  padding: 2rem;
}
.title {
  text-align: center;
}
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