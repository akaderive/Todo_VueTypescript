<template>
<div v-if="!isEditable" class="nonEditableTask">
  <label  :class="{done: isDone}" @click="clickLabelEvent()"><b>{{name}}</b></label> <div class="taskBar"><TodoTaskBar :idTask=this.idTask></TodoTaskBar></div>
</div>
<div v-else class="editableTask">
  <input class="editableField" :value=name placeholder="TODO ?" @blur="editDoneEvent($event.srcElement.value)"> 
  <div class="taskBar">
    <TodoTaskBar :idTask=this.idTask></TodoTaskBar>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import TodoTaskBar from '@/components/TodoTaskBar.vue';
import { TaskService } from '@/services/TaskService';

@Component({
  components: {
    TodoTaskBar
  },
})
export default class TodoTask extends Vue {
  @Prop() index!: number;
  @Prop() idTask!: number;
  @Prop() name!: string;
  @Prop() isDone!: boolean;
  @Prop() isEditable!: boolean;

  constructor() {
      super();
  }

  clickLabelEvent() {
    this.$emit("update:isEditable", !this.isEditable);
  }

  editDoneEvent(value: string) {
    if (value && value.trim() !== "") {
      this.$emit("update:name", value);
      this.$emit("update:isEditable", false);
      this.$emit("taskSaveEvent", this.index);
    }
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
