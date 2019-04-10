<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoTaskList ref="tasksList"></TodoTaskList>
    <div id="footer">
      <TodoAddTask @addTaskEvent="addTaskEvent"></TodoAddTask>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoHeader from '@/components/TodoHeader.vue';
import TodoTaskList from '@/components/TodoTaskList.vue';
import TodoAddTask from '@/components/TodoAddTask.vue';

@Component({
  components: {
    TodoHeader,
    TodoTaskList,
    TodoAddTask,
  },
})
export default class App extends Vue {
  private addTaskEvent() {
    (this.$refs.tasksList as TodoTaskList).addTask();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#footer {
  text-align: center;
  display: inline-block;
  width: 100%
}
</style>
