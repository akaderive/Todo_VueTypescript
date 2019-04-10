<template>
<div v-if="!this.task.isEditable" class="nonEditableTask">
  <label  :class="{done: this.task.isDone}" @click="clickLabelEvent()"><b>{{task.name}}</b></label> <div class="taskBar">
    <TodoTaskBar :task="task" :index="index" @taskDone="taskDoneEvent($event)"></TodoTaskBar></div>
</div>
<div v-else class="editableTask">
  <input class="editableField" :value=task.name placeholder="TODO ?" @blur="editDoneEvent($event.srcElement.value)"> 
  <div class="taskBar">
    <TodoTaskBar :task="task"></TodoTaskBar>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import TodoTaskBar from '@/components/TodoTaskBar.vue';
import { TaskService } from '@/services/TaskService';
import {Task} from '@/interfaces/task';

@Component({
  components: {
    TodoTaskBar,
  },
})
export default class TodoTask extends Vue {
  @Prop() public task!: Task;
  @Prop() public index!: number;

  constructor() {
      super();
  }

  private clickLabelEvent() {
    this.$emit('update:isEditable', !this.task.isEditable);
  }

  private editDoneEvent(value: string) {
    if (value && value.trim() !== '') {
      this.task.name = value;
      this.task.isEditable = false;
      this.$emit('taskSaveEvent', this.index);
    }
  }

  private taskDoneEvent() {
    this.$emit('taskDone', this);
  }
}
</script>

<style>
label {
  display: inline-block;
  width: calc(50% + 4px); /* 4px correspondant à la larger des border du champs editable pour garder l'alignement*/
}

label.done {
  text-decoration: line-through;
  color: rgb(126, 126, 126);
}

div.nonEditableTask {
  width: 100%;
  display: inline-block;
}

div.editableTask {
  text-align: left;
  margin-top: 5px;
  margin-bottom: 5px;
}

input.editableField {
  display: inline-block;
  width: 50%;
  border-width: 2px;
}

div.taskBar {
  width: 20%;
  float: right;
}
</style>
