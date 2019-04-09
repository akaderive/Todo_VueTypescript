<template>
<div>
    <b-jumbotron :header='this.title' lead="Vue, Typescript et Bootstrap">
       <img alt="Todo logo" src="@/assets/logo_Todo.png">
    </b-jumbotron>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TodoHeader extends Vue {
  private title: string;

  constructor() {
      super();
      this.title = 'TODO List';
  }
}
</script>
