<template>
<div>
  <img class="task" alt="logo succès" @click="taskDone" src="@/assets/icons/documents-clipboard-success.png" style="max-height: 25px; max-width: 25px;">
  <img class="task" alt="logo voir"  @click="taskDetails" src="@/assets/icons/documents-clipboard-details.png" style="max-height: 25px; max-width: 25px;">
  <img class="task" alt="logo supprimer" @click="taskDelete" src="@/assets/icons/documents-clipboard-close.png" style="max-height: 25px; max-width: 25px;">
  <TodoModalDetails ref="modalDetails" v-show="isModalVisible" @close="closeTaskDetails" :idTask=this.idTask />
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import TodoModalDetails from '@/components/TodoModalDetails.vue';

@Component({
  components: {
    TodoModalDetails
  },
})
export default class TodoTaskBar extends Vue {
  @Prop() idTask!: number;
  private isModalVisible: boolean = false;

  constructor() {
      super();
  }

  taskDone() {
    this.$parent.$emit("taskDone", this.$parent);
  }

  taskDetails() {
    (this.$refs.modalDetails as TodoModalDetails).getTaskFromServer();
    this.isModalVisible = true;
  }

  closeTaskDetails() {
    this.isModalVisible = false;
  }

  taskDelete() {
    this.$parent.$emit("taskDelete", this.$parent);
  }
}
</script>

<style>
img.task{
  cursor: pointer;
}
</style>