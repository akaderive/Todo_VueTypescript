<template>
<div>
  <b-button-group>
    <b-button @click="taskDone" class="successButton" />
    <b-button @click="showModal" class="detailsButton" />
    <b-button @click="taskDelete" class="deleteButton" />
  </b-button-group>

  <b-modal :ref="'modal-' + this.index" :title="task.name" header-bg-variant="primary" centered cancel-disabled ok-only>
    <b>Date de creation :</b> {{this.getCreationDateFormated()}}
    <div style="text-align:center; margin-top:20px;">
    <h4>
      <span v-if="this.task.isDone">Travail Terminé ! 👌</span>
      <span v-else>Du travail, encore du travail 😩</span>
    </h4>
    </div>
  </b-modal>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import {Task} from '@/interfaces/task';
import { Modal } from 'bootstrap-vue';

@Component
export default class TodoTaskBar extends Vue {
  @Prop() public task!: Task;
  @Prop() public index!: number;

  constructor() {
      super();
  }

  private taskDone() {
    this.$emit('taskDone');
  }

  private taskDelete() {
    this.$emit('taskDelete');
  }

  private showModal() {
    (this.$refs['modal-' + this.index] as Modal).show();
  }

  private getCreationDateFormated() {
    const date: Date = new Date(this.task.creationDate);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
      + ' ' + date.getHours() + ':' + date.getMinutes();
  }
}
</script>

<style>
button.successButton{
  background: url(./../assets/icons/documents-clipboard-success-30px.png); 
  height:32px; 
  width:30px;
}

button.detailsButton{
  background: url(./../assets/icons/documents-clipboard-details-30px.png); 
  height:32px; 
  width:30px;
}

button.deleteButton{
  background: url(./../assets/icons/documents-clipboard-close-30px.png); 
  height:32px; 
  width:30px;
}
</style>