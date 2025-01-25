import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  base_URL,
  SINGLE_TASK,
  taskPriority,
  taskStatus
} from "../Utility/Utility";
const CreateTask = ({ isOpen, onClose }) => {
  const { token } = useSelector((state) => state.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const tasktemplate = {
    name: "",
    status: "Pending",
    createdDate: "",
    dueDate: "",
    priority: "Medium",
    description: ""
  };
  const [task, setTask] = useState(tasktemplate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };
  const createNewTask = async (e) => {
    e.preventDefault();
    if (!task.name) {
      toast({
        title: "No Name!",
        description: "Please Enter Task Name",
        status: "error",
        duration: 1000,
        isClosable: true
      });
      return;
    }

    const formData = new FormData();
    formData.append("task", task);

    try {
      const response = await axios.post(
        `${base_URL}/tasks/new`,
        {
          name: task.name,
          status: task.status,
          createdDate: task.createdDate,
          dueDate: task.dueDate,
          priority: task.priority,
          description: task.description
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Response:", response.data);
      const { status, error, newTask } = response.data;
      if (status) {
        toast({
          title: "Success",
          description: `Task Created Successfully.`,
          status: "success",
          duration: 1000,
          isClosable: true
        });
        onClose();
        setTask(tasktemplate);
        dispatch({ type: SINGLE_TASK, payload: newTask });
      } else {
        toast({
          title: "There was some error",
          description: error || "",
          status: "error",
          duration: 1000,
          isClosable: true
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="20px" fontWeight="800" lineHeight="25px">
            New Task
          </ModalHeader>
          <ModalCloseButton borderRadius="50%" backgroundColor="#F5F5F5" />
          <ModalBody>
            <form
              onSubmit={createNewTask}
              className="w-full p-6 border border-gray-300 rounded-lg shadow-md bg-white"
            >
              <h2 className="text-xl font-bold mb-4 text-center">
                Add New Task
              </h2>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  Task Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={task.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  name="status"
                  value={task.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={taskStatus.pending}>Pending</option>
                  <option value={taskStatus.completed}>Completed</option>
                  <option value={taskStatus.done}>Done</option>
                  {/* <option value={taskStatus.inProgress}>In Progress</option>
                  <option value={taskStatus.overDue}>OverDue</option>
                  <option value={taskStatus.onHold}>On Hold</option>
                  <option value={taskStatus.delete}>Delete</option> */}
                </select>
              </div>
              <div className="hidden mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="createdDate"
                >
                  Created Date
                </label>
                <input
                  type="date"
                  name="createdDate"
                  value={task.createdDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="dueDate"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="priority"
                >
                  Priority
                </label>
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={taskPriority.Low}>Low</option>
                  <option value={taskPriority.Medium}>Medium</option>
                  <option value={taskPriority.High}>High</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  value={task.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Add Task
              </button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateTask;
