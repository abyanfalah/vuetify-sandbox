import { useTodoappStore } from "@/stores/TodoappStore";

const priorityColor = {
  urgent: "red",
  high: "orange",
  normal: "white",
  low: "blue",
};

export default {
  getColorByPriority(priority) {
    return priorityColor[priority.toLowerCase()];
  },

  getTaskGroupIndex(taskGroupToFind) {
    const store = useTodoappStore();
    const taskGroupIndex = store.taskGroupList.findIndex(
      (tg) => tg.id == taskGroupToFind.id
    );

    return taskGroupIndex;
  },
};
