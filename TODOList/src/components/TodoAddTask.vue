<template>
<div id="addTask">
  <img  alt="Add task logo" @mouseover="mouseOnIcon" @mouseleave="mouseOffIcon" @click="addTaskEvent"
  :src="iconSource" style="max-height: 50px; max-width: 50px;">
</div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class TodoAddTask extends Vue {
  private iconBlack: string = require('@/assets/icons/documents-document-black-add.png');
  private iconGray: string = require('@/assets/icons/documents-document-gray-add.png');
  private iconSource: string = this.iconGray;

  mouseOnIcon() {
    this.iconSource = this.iconBlack;
  }

  mouseOffIcon() {
    this.iconSource = this.iconGray;
  }

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
