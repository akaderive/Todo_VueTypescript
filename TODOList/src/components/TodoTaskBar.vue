<template>
<div>
  <b-button-group>
    <b-button @click="taskDone" class="successButton" />
    <b-button @click="taskDetails" v-b-modal="'modal-' + this.task.id" class="detailsButton" />
    <b-button @click="taskDelete" class="deleteButton" />
  </b-button-group>

  <b-modal :id="'modal-' + this.task.id" :title="task.name" header-bg-variant="primary" centered cancel-disabled ok-only>
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

@Component
export default class TodoTaskBar extends Vue {
  @Prop() task!: Task;
  private isModalVisible: boolean = false;

  constructor() {
      super();
  }

  taskDone() {
    this.$parent.$emit("taskDone", this.$parent);
  }

  taskDetails() {
    this.isModalVisible = true;
  }

  closeTaskDetails() {
    this.isModalVisible = false;
  }

  taskDelete() {
    this.$parent.$emit("taskDelete", this.$parent);
  }

  getCreationDateFormated() {
    let date: Date = new Date(this.task.creationDate);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
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