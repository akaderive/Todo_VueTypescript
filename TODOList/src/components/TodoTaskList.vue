<template>
<div id="taskList">
  <div class="taskDiv" v-for="(task, index) in tasks"  :key="task.index">
    <TodoTask :index="index" :task="task"
    @taskSaveEvent="taskSaveEvent($event)" @taskDelete="taskDeleteEvent($event)" @taskDone="taskDoneEvent($event)"
    :isEditable.sync="task.isEditable"></TodoTask>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import TodoTask from '@/components/TodoTask.vue';
import {Task} from '@/interfaces/task';
import {TaskService} from '@/services/TaskService';
import { AxiosResponse} from 'axios';

@Component({
  components: {
    TodoTask
  },
})
export default class TodoTaskList extends Vue {
  private tasks: Task[] = [];

  constructor() {
      super();
      TaskService.getTasks().then(response => this.handleTasksResponse(response));
  }

  handleTasksResponse(response: AxiosResponse<Task[]>) {
      this.tasks = response.data;
  }

  taskDeleteEvent(event: TodoTask) {
    let taskToDelete: Task = this.tasks[event.index];
    if (taskToDelete.id !== undefined) {
      TaskService.deleteTask(this.tasks[event.index]);
    }
    this.tasks.splice(event.index, 1);
  }

  taskDoneEvent(event: TodoTask) {
      this.tasks[event.index].isDone = !this.tasks[event.index].isDone;
      this.saveOrUpdateTask(this.tasks[event.index]);
  }

  addTask() {
    this.tasks.push({name:'', isDone: false, isEditable: true, creationDate: new Date()});
  }

  taskSaveEvent(index: number) {
    this.saveOrUpdateTask(this.tasks[index]);
  }

  private saveOrUpdateTask(task: Task) {
    if (task.id === null || task.id === undefined) {
      TaskService.postTask(task).then( (response) => this.onPostTaskResponse(task, response));
    } else {
      TaskService.putTask(task);
    }
  }

  private onPostTaskResponse(task: Task, response: AxiosResponse<Task>) {
    task.id = response.data.id
    this.$forceUpdate(); // Reload pour que la liste soit rechargée avec le nouvel id généré
  }
}
</script>

<style>
#taskList {
  margin: auto;
  width: 50%;
}

div.taskDiv {
  text-align: left;
  margin: 6px;
}
</style>
