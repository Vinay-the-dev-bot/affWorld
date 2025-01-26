import { createStore, combineReducers } from "redux";
import {
  DELETETASK,
  LOGOUT,
  POSTS,
  PROFILE,
  SINGLE_POST,
  SINGLE_TASK,
  SUGGESTIONS,
  TASKS,
  taskStatus,
  TASKSTATUS,
  UNDO
} from "../Utility/Utility";

const feedData = [
  {
    text: "Vinay Meti",
    caption: "caption 1",
    createdDate: "22 Jan 2025, 12:11 PM",
    image:
      "https://images.pexels.com/photos/914929/pexels-photo-914929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    text: "Vinay Meti 2",
    caption: "caption 2",
    createdDate: "22 Jan 2025, 12:11 PM",
    image:
      "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    text: "Vinay Meti 3",
    caption: "caption 3",
    createdDate: "22 Jan 2025, 12:11 PM",
    image:
      "https://images.pexels.com/photos/413960/pexels-photo-413960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    text: "Vinay Meti 4",
    caption: "caption 4",
    createdDate: "22 Jan 2025, 12:11 PM",
    image:
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    text: "Vinay Meti 5",
    caption: "caption 5",
    createdDate: "22 Jan 2025, 12:11 PM",
    image:
      "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    text: "Vinay Meti 6",
    caption: "caption 6",
    createdDate: "22 Jan 2025, 12:11 PM",
    image:
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    text: "Vinay Meti 7",
    caption: "caption 7",
    createdDate: "22 Jan 2025, 12:11 PM",
    image:
      "https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    text: "Vinay Meti 8",
    caption: "caption 8",
    createdDate: "22 Jan 2025, 12:11 PM",
    image:
      "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    text: "Vinay Meti 9",
    caption: "caption 9",
    createdDate: "22 Jan 2025, 12:11 PM",
    image:
      "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];
const tasks = [
  {
    id: 1,
    text: "Complete project documentation",
    status: "Pending",
    createdDate: "2025-01-20",
    dueDate: "2025-01-25",
    priority: "High",
    description: "Write and finalize all project-related documentation."
  },
  {
    id: 2,
    text: "Team meeting for sprint planning",
    status: "Completed",
    createdDate: "2025-01-18",
    dueDate: "2025-01-19",
    priority: "Medium",
    description: "Discuss and plan tasks for the upcoming sprint."
  },
  {
    id: 3,
    text: "Fix login page bug",
    status: "Done",
    createdDate: "2025-01-19",
    dueDate: "2025-01-21",
    priority: "High",
    description: "Resolve the issue where users cannot log in with Google."
  },
  {
    id: 4,
    text: "Design new landing page",
    status: "Pending",
    createdDate: "2025-01-20",
    dueDate: "2025-01-30",
    priority: "High",
    description: "Create a modern and responsive design for the homepage."
  },
  {
    id: 5,
    text: "Code review for module X",
    status: "Completed",
    createdDate: "2025-01-21",
    dueDate: "2025-01-22",
    priority: "Medium",
    description: "Review and provide feedback on the newly developed module."
  },
  {
    id: 6,
    text: "Submit expense report",
    status: "Done",
    createdDate: "2025-01-20",
    dueDate: "2025-01-23",
    priority: "Low",
    description: "Submit the expense report for reimbursement."
  },
  {
    id: 7,
    text: "Prepare quarterly financial report",
    status: "Pending",
    createdDate: "2025-01-15",
    dueDate: "2025-01-28",
    priority: "High",
    description: "Compile and analyze financial data for the quarter."
  },
  {
    id: 8,
    text: "Update employee contact information",
    status: "Completed",
    createdDate: "2025-01-10",
    dueDate: "2025-01-11",
    priority: "Low",
    description: "Ensure all employee records are up-to-date."
  },
  {
    id: 9,
    text: "Organize team-building event",
    status: "Done",
    createdDate: "2025-01-20",
    dueDate: "2025-02-01",
    priority: "Medium",
    description: "Plan activities for team-building and bonding."
  },
  {
    id: 10,
    text: "Optimize database queries",
    status: "Pending",
    createdDate: "2025-01-22",
    dueDate: "2025-01-27",
    priority: "High",
    description: "Improve database performance by optimizing queries."
  },
  {
    id: 11,
    text: "Write blog post on company updates",
    status: "Completed",
    createdDate: "2025-01-14",
    dueDate: "2025-01-16",
    priority: "Medium",
    description: "Create a detailed blog post on recent company updates."
  },
  {
    id: 12,
    text: "Create marketing campaign",
    status: "Done",
    createdDate: "2025-01-20",
    dueDate: "2025-02-05",
    priority: "High",
    description: "Develop a strategy and content for the new campaign."
  },
  {
    id: 13,
    text: "Backup company data",
    status: "Pending",
    createdDate: "2025-01-12",
    dueDate: "2025-01-13",
    priority: "High",
    description: "Securely back up all company data."
  },
  {
    id: 14,
    text: "Conduct UX research",
    status: "Completed",
    createdDate: "2025-01-21",
    dueDate: "2025-01-30",
    priority: "Medium",
    description: "Gather feedback to improve user experience."
  },
  {
    id: 15,
    text: "Refactor old codebase",
    status: "Done",
    createdDate: "2025-01-19",
    dueDate: "2025-02-10",
    priority: "High",
    description: "Clean up and optimize legacy code for better maintainability."
  },
  {
    id: 16,
    text: "Prepare for client demo",
    status: "Pending",
    createdDate: "2025-01-23",
    dueDate: "2025-01-26",
    priority: "Medium",
    description: "Set up a demo environment for the client presentation."
  },
  {
    id: 17,
    text: "Onboard new hires",
    status: "Completed",
    createdDate: "2025-01-20",
    dueDate: "2025-01-25",
    priority: "Medium",
    description: "Train and guide new employees on company processes."
  },
  {
    id: 18,
    text: "Update website analytics tracking",
    status: "Done",
    createdDate: "2025-01-18",
    dueDate: "2025-01-19",
    priority: "Low",
    description: "Ensure proper tracking for all website activities."
  },
  {
    id: 19,
    text: "Prepare sales report",
    status: "Pending",
    createdDate: "2025-01-20",
    dueDate: "2025-01-27",
    priority: "High",
    description: "Summarize and analyze sales data for the month."
  },
  {
    id: 20,
    text: "Plan quarterly board meeting",
    status: "Completed",
    createdDate: "2025-01-22",
    dueDate: "2025-02-03",
    priority: "High",
    description: "Organize the agenda and logistics for the board meeting."
  },
  {
    id: 21,
    text: "Prepare for client demo",
    status: "Done",
    createdDate: "2025-01-22",
    dueDate: "2025-02-03",
    priority: "High",
    description: "Organize the agenda and logistics for the board meeting."
  }
];

const userToken = localStorage.getItem("taskConnectToken") || "";
const { name, email } =
  JSON.parse(localStorage.getItem("taskConnectUserData")) || {};
const initialAppState = { feedData: [], tasks: [] };
const initialUserState = {
  isLoggedIn: userToken ? true : false,
  text: "Vinay Meti",
  token: userToken,
  name: name || "",
  email: email || ""
};
const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case SUGGESTIONS:
      return {
        ...state,
        friendSuggestions: action.payload
      };
    case TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case SINGLE_POST:
      return {
        ...state,
        feedData: [...state.feedData, action.payload]
      };
    case SINGLE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case POSTS:
      return {
        ...state,
        feedData: action.payload
      };
    case TASKSTATUS:
      const { id, newStatus } = action.payload;
      const updatedTasks = state?.tasks?.map((task) =>
        task.id === id ? { ...task, status: newStatus } : { ...task }
      );
      return { ...state, tasks: updatedTasks };
    case DELETETASK:
      const { id: taskID } = action.payload;
      // const updatedTasksDeleted = state?.tasks?.map((task) => {
      //   if (taskID === task.id) {
      //     task.status = taskStatus.deleted;
      //   }
      //   return task;
      // });
      const updatedTasksDeleted = state?.tasks?.filter(
        (task) => taskID !== task.id
      );
      return { ...state, tasks: updatedTasksDeleted };
    case UNDO:
      const {
        task: { id: undoID }
      } = action.payload;
      const undoDeletedTask = state?.tasks?.map((task) => {
        if (undoID === task.id) {
          task.status = taskStatus.pending;
        }
        return task;
      });
      return { ...state, tasks: [...undoDeletedTask] };
    default:
      return state;
  }
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case PROFILE:
      return {
        ...state,
        ...action.payload
      };
    case LOGOUT:
      return {
        ...initialUserState
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
