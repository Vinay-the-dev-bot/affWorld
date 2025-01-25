export const TASKSTATUS = "TASKSTATUS";
export const PROFILE = "PROFILE";
export const SUGGESTIONS = "SUGGESTIONS";
export const LOGOUT = "LOGOUT";
export const DELETETASK = "DELETETASK";
export const ITEM_TYPE = "TASK";
export const UNDO = "UNDO";
export const TASKS = "TASKS";
export const POSTS = "POSTS";
export const SINGLE_POST = "SINGLE_POST";
export const SINGLE_TASK = "SINGLE_TASK";
export const base_URL = "http://localhost:4500";
export const tabs = ["Feed", "Tasks"];
export const taskStatus = {
  inProgress: "In Progress",
  pending: "Pending",
  completed: "Completed",
  done: "Done",
  onHold: "On Hold",
  overDue: "OverDue",
  delete: "Delete",
  deleted: "Deleted"
};
const olor = ["#71BC78", "#EE82EE", "#DDA0DD", "#E6E6FA", "#800080"];

export const colorScheme = {
  [taskStatus.pending]: "rgb(250 204 21)",
  [taskStatus.deleted]: "rgb(242, 0, 60)",
  [taskStatus.completed]: "rgb(34 197 94)",
  [taskStatus.done]: "rgb(59 130 246)",
  [taskStatus.inProgress]: "rgb(59 130 246)",
  [taskStatus.onHold]: "rgb(238, 130, 238)",
  [taskStatus.overDue]: "rgb(239 68 68)",
  [taskStatus.delete]: "rgb(185 28 28)"
};
export const taskPriority = { Low: "Low", Medium: "Medium", High: "High" };

export const priorityColor = {
  High: "#FF0000",
  Medium: "#007FFF",
  Low: "#367c2b"
};
export const priorityColorOpaque = {
  High: "#FA8072",
  Medium: "#89CFF0",
  Low: "#71BC78"
};
