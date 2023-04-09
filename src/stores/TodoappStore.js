import todoappService from "@/services/todoappService";
import { computed } from "@vue/reactivity";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, watch } from "vue";

export const useTodoappStore = defineStore("todoapp", () => {
  // todoapp.vue
  const taskGroupList = ref([]);
  const selectedTaskGroup = ref();
  const selectedTask = ref();

  const showDeleteDialog = ref(false);

  // ======== TaskGroup functions
  function newTaskGroup() {
    const newTaskGroup = {
      id: crypto.randomUUID(),
      color: "white",
      name: `New taskgroup`,
      taskList: [],
      priority: "Normal",
    };

    taskGroupList.value.push(newTaskGroup);
    selectedTaskGroup.value = newTaskGroup;

    setTimeout(() => {});
  }

  function toggleSelectedTaskGroup(taskGroup) {
    if (taskGroup == selectedTaskGroup.value) {
      selectedTaskGroup.value = null;
      return;
    }

    selectedTaskGroup.value = null;
    setTimeout(() => (selectedTaskGroup.value = taskGroup), 200);
  }

  function deleteTaskGroup(taskGroupToDelete) {
    let tgList = taskGroupList.value;
    tgList = tgList.filter((tg) => tg.id !== taskGroupToDelete.id);

    taskGroupList.value = tgList;
    toggleSelectedTaskGroup(taskGroupToDelete);
    showDeleteDialog.value = false;
  }

  function toggleSelectedTask(task) {
    if (task == selectedTask.value) {
      selectedTask.value = null;
      return;
    }
    selectedTask.value = null;
    setTimeout(() => (selectedTask.value = task), 100);
  }

  function toggleTaskDone(task) {
    if (!task.isDone) {
      task.doneAt = Date.now();
      task.isDone = true;
    } else {
      task.doneAt = null;
      task.isDone = false;
    }
  }

  function deleteTask(taskToDelete) {
    const taskgroup = selectedTaskGroup.value;
    let taskList = taskgroup.taskList;

    taskList = taskList.filter((t) => t !== taskToDelete);
    selectedTaskGroup.value.taskList = taskList;

    selectedTask.value = null;
  }

  // ============= tasklist.vue
  const showColorPicker = ref(false);

  function changeColor() {
    alert("coming soon");
  }

  function addTask(newTask) {
    const taskGroupIndex = todoappService.getTaskGroupIndex(
      selectedTaskGroup.value
    );
    taskGroupList.value[taskGroupIndex].taskList.push(newTask);
  }

  // ============= taskDetail.vue
  const deleteTaskConfirmation = ref(false);

  watch(selectedTaskGroup, (newVal) => {
    if (newVal == null) selectedTask.value = null;
  });

  // ============= states retrieval
  const states = computed(() => {
    return {
      taskGroupList: taskGroupList.value,

      selectedTaskGroup: selectedTaskGroup.value,

      selectedTask: selectedTask.value,
    };
  });

  watch(
    () => states.value,
    (newState) => {
      newState = JSON.stringify(newState);
      localStorage.setItem("todoapp", newState);
    },
    { deep: true }
  );

  function restoreStates() {
    console.log("Todo app state restoring. . .");
    const storedState = JSON.parse(localStorage.getItem("todoapp"));
    if (storedState == null) return console.log("no storedState for todoapp");

    taskGroupList.value = storedState.taskGroupList ?? taskGroupList.value;

    selectedTaskGroup.value =
      storedState.selectedTaskGroup ?? selectedTaskGroup.value;

    selectedTask.value = storedState.selectedTask ?? selectedTask.value;

    // console.log(states.value);
    console.log("state restored");
  }

  // +=+=+=+=+=+=+=+=+=+=+=+= return the options (?)
  return {
    taskGroupList,
    selectedTaskGroup,
    selectedTask,
    showDeleteDialog,

    showColorPicker,

    // taskgroup functions
    newTaskGroup,
    toggleSelectedTaskGroup,
    deleteTaskGroup,

    // tasklist functions
    addTask,
    toggleSelectedTask,
    toggleTaskDone,

    restoreStates,
    states,
  };
});

// enable HMR update
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoappStore, import.meta.hot));
}
