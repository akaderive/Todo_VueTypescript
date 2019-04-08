<template>
<div>
  <label><h1>{{title}}</h1></label>
  <img alt="Vue logo" src="./../assets/logo_vue.png" style="max-height: 50px; max-width: 50px;">
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TodoHeader extends Vue {
  private title: string;

  constructor() {
      super();
      this.title = 'TODOs avec VueJS et Typescript';
  }
}
</script>
