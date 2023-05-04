import todoappService from "@/services/todoappService";
import { computed } from "@vue/reactivity";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, watch } from "vue";

export const useTodoappStore = defineStore("todoapp", () => {
  // todoapp.vue
  const username = ref(null);

  const taskGroupList = ref([]);
  const selectedTaskGroup = ref(null);
  const isViewingTaskGroup = ref(false);
  const selectedTask = ref(null);

  const showDeleteDialog = ref(false);

  const currentTaskList = computed(() => {
    if (!selectedTaskGroup.value) return null;

    return selectedTaskGroup.value.taskList;
  });

  const currentTaskGroupColor = computed(() => {
    if (!selectedTaskGroup.value) return null;

    return selectedTaskGroup.value.color;
  });

  const selectedTaskGroupIndex = computed(() => {
    if (!selectedTaskGroup.value) return null;

    return todoappService.getTaskGroupIndex(selectedTaskGroup.value);
  });

  // ======== TaskGroup functions
  function newTaskGroup() {
    const newTaskGroup = {
      id: crypto.randomUUID(),
      color: "#747474",
      name: `New taskgroup`,
      taskList: [],
      priority: "Normal",
    };

    taskGroupList.value.push(newTaskGroup);

    selectedTaskGroup.value = null;
    isViewingTaskGroup.value = true;
    setTimeout(() => {
      selectedTaskGroup.value = newTaskGroup;
    }, 100);
  }

  function toggleSelectedTaskGroup(taskGroup) {
    if (selectedTaskGroup.value === null) {
      selectedTaskGroup.value = taskGroup;
      isViewingTaskGroup.value = true;
      return;
    }

    if (taskGroup == selectedTaskGroup.value) {
      selectedTaskGroup.value = null;
      setTimeout(() => (isViewingTaskGroup.value = false), 200);

      return;
    }

    isViewingTaskGroup.value = true;
    selectedTaskGroup.value = null;
    setTimeout(() => (selectedTaskGroup.value = taskGroup), 100);
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

  function clearCompletedTask() {
    let taskList = currentTaskList.value;
    let clearedTaskList = taskList.filter((task) => task.isDone == false);

    const taskGroupIndex = selectedTaskGroupIndex.value;
    taskGroupList.value[taskGroupIndex].taskList = clearedTaskList;
  }

  // ============= tasklist.vue

  function addTask(newTask) {
    const taskGroupIndex = selectedTaskGroupIndex.value;
    taskGroupList.value[taskGroupIndex].taskList.push(newTask);
  }

  // ============= taskDetail.vue
  const deleteTaskConfirmation = ref(false);

  watch(selectedTaskGroup, (newVal) => {
    if (newVal === null) {
      selectedTask.value = null;
    }
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
    const storedState = JSON.parse(localStorage.getItem("todoapp"));
    if (storedState == null) return console.log("no storedState for todoapp");

    taskGroupList.value = storedState.taskGroupList ?? [];

    if (taskGroupList.value.length < 1) return;

    if (!storedState.selectedTaskGroup) return;

    const storedTaskGroupIndex = todoappService.getTaskGroupIndex(
      storedState.selectedTaskGroup
    );
    selectedTaskGroup.value = taskGroupList.value[storedTaskGroupIndex];

    const selectedTaskListLength = selectedTaskGroup.value.taskList.length;
    if (selectedTaskListLength < 1) {
      console.log("this taskGroup has zero task on tasklist");
      return;
    }

    if (!storedState.selectedTask) {
      console.log("no stored selectedTask");
      return;
    }

    const selectedTaskIndex = selectedTaskGroup.value.taskList.findIndex(
      (task) => task.id == storedState.selectedTask.id
    );
    selectedTask.value = selectedTaskGroup.value.taskList[selectedTaskIndex];
  }

  // +=+=+=+=+=+=+=+=+=+=+=+= return the options (?)
  return {
    username,
    taskGroupList,
    selectedTaskGroup,
    isViewingTaskGroup,
    selectedTask,
    showDeleteDialog,

    // taskgroup functions
    newTaskGroup,
    toggleSelectedTaskGroup,
    deleteTaskGroup,

    // tasklist functions
    addTask,
    toggleSelectedTask,
    toggleTaskDone,
    deleteTask,
    clearCompletedTask,

    currentTaskGroupColor,
    states,
    restoreStates,
  };
});

// enable HMR update
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoappStore, import.meta.hot));
}
