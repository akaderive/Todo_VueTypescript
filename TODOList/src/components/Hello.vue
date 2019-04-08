<template>
    <button @click="onClick">Click!</button>
</template>

<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class MyComponent extends Vue {
  message: string = 'Hello!'

  onClick (): void {
    window.alert(this.message)
  }
}
</script>

<style>
button {
    color: blue;
}
</style>