import todoappService from "@/services/todoappService";
import { computed } from "@vue/reactivity";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, watch } from "vue";

export const useTodoappStore = defineStore("todoapp", () => {
  // todoapp.vue
  const taskGroupList = ref([]);
  const selectedTaskGroup = ref(null);
  const selectedTask = ref(null);

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
    if (selectedTaskGroup.value === null) {
      selectedTaskGroup.value = taskGroup;
      return;
    }

    if (taskGroup == selectedTaskGroup.value) {
      selectedTaskGroup.value = null;
      return;
    }

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
    if (newVal === null) {
      selectedTask.value = null;
      console.log("selectedTask nullified");
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

      console.log(
        "localStorage =>",
        JSON.parse(localStorage.getItem("todoapp"))
      );
    },
    { deep: true }
  );

  function restoreStates() {
    const storedState = JSON.parse(localStorage.getItem("todoapp"));
    console.log("storedState =>", storedState);
    if (storedState == null) return console.log("no storedState for todoapp");

    taskGroupList.value = storedState.taskGroupList ?? [];
    // console.log("taskGroupList =>", taskGroupList.value);

    if (taskGroupList.value.length < 1) return;

    if (!storedState.selectedTaskGroup) return;

    const storedTaskGroupIndex = todoappService.getTaskGroupIndex(
      storedState.selectedTaskGroup
    );
    selectedTaskGroup.value = taskGroupList.value[storedTaskGroupIndex];
    // console.log("selectedTaskGroup =>", selectedTaskGroup.value);

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
    console.log("selectedTask =>", selectedTask.value);
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
    deleteTask,

    states,
    restoreStates,
  };
});

// enable HMR update
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoappStore, import.meta.hot));
}
