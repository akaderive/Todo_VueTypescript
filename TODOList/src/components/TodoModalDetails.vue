<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <span :class="{done: task.isDone}">{{this.task.name}}</span>

            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal">
              x
            </button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
             <b>Date de creation : </b> {{this.creationDateFormatted}}
             <h3 v-if="this.task.isDone">Travail Terminé ! 👌</h3>
             <h3 v-else>Du travail, encore du travail 😩</h3>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import {Task} from '@/interfaces/task';
import {TaskService} from '@/services/TaskService';
import { AxiosPromise, AxiosResponse } from 'axios';

@Component
export default class TodoModalDetails extends Vue {
  @Prop() idTask!: number;
  public task: Task = new Task('Tâche inconnue', false, false, new Date());
  private creationDateFormatted: string = "";

  constructor() {
      super();
  }

  getTaskFromServer () {
    if (this.idTask !== undefined) {
        TaskService.getTask(this.idTask).then((response) => this.getTaskResponse(response));
      }
  }

  getTaskResponse(response: AxiosResponse<Task>) {
    this.task = response.data;
    let date = new Date(this.task.creationDate);
    this.creationDateFormatted = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
  }

  close() {
    this.$emit('close');
  }
}
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header{
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: rgb(20, 136, 115);
    justify-content: space-between;
    font-weight: bold;
    background: rgb(221, 221, 223);
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 0px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

span.done {
  text-decoration: line-through;
}
</style>