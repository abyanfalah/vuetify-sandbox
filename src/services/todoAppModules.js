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
};
