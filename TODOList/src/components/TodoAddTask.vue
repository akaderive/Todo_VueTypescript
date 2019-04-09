<template>
<div id="addTask">
  <b-button variant="outline-primary" @click="addTaskEvent">+</b-button>
</div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class TodoAddTask extends Vue {

  addTaskEvent() {
    this.$emit("addTaskEvent");
  }
}
</script>

<style>
div#addTask {
  display: inline;
  margin: auto;
  cursor: pointer;
}
</style>
