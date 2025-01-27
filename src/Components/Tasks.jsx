import { useSelector } from "react-redux";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import {
  base_URL,
  colorScheme,
  DELETETASK,
  ITEM_TYPE,
  priorityColor,
  priorityColorOpaque,
  TASKS,
  taskStatus,
  TASKSTATUS
} from "../Utility/Utility";
import { useDisclosure, useToast } from "@chakra-ui/react";
import ViewTask from "./ViewTask";
import { useEffect, useState } from "react";
import axios from "axios";

const TaskCard = ({ task }) => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    isOpen: isOpenTask,
    onOpen: onOpenTask,
    onClose: onCloseTask
  } = useDisclosure();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));
  const deleteTask = async (id) => {
    const response = await axios.delete(`${base_URL}/tasks/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`
      }
    });
    const { error, status } = response.data;
    if (status) {
      dispatch({ type: DELETETASK, payload: { id } });
      toast({
        title: "task Deleted Successfuly",
        status: "success",
        duration: 1000,
        isClosable: true
      });
    } else {
      toast({
        title: "There was some error",
        description: error || "",
        status: "error",
        duration: 1000,
        isClosable: true
      });
    }
    onCloseTask();
  };
  return (
    <>
      <div
        ref={drag}
        className={`p-4 bg-white border rounded shadow cursor-pointer ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
        style={{
          backgroundColor: colorScheme[task.status],
          borderColor: colorScheme[task.status]
        }}
      >
        <div className="flex gap-30px ">
          <p className="font-semibold w-[75%]">{task.name}</p>
          <div
            className="text-red-600 bg-white h-fit rounded-[5px] px-[5px]"
            onClick={onOpenTask}
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
            }}
          >
            Delete
          </div>
          {/* {task.status !== taskStatus.deleted ? (
            <div
              className="text-red-600 bg-white h-fit rounded-[5px] px-[5px]"
              onClick={onOpenTask}
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
              }}
            >
              Delete
            </div>
          ) : (
            <div
              className="text-green-600 bg-white h-fit rounded-[5px] px-[5px]"
              onClick={() => {
                dispatch({ type: UNDO, payload: { task } });
              }}
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
              }}
            >
              Undo
            </div>
          )} */}
        </div>
        <div className="text-sm flex flex-col text-black pt-[10px] ">
          <div
            className="flex h-fit w-fit"
            style={{
              border: "1px solid white",
              borderRadius: "3-px"
            }}
          >
            <div
              style={{
                backgroundColor: priorityColor[task.priority],
                border: `1px solid ${priorityColor[task.priority]}`
              }}
              className="min-w-[5px]"
            ></div>
            <div style={{ border: "1px solid white" }}></div>
            <span
              style={{
                backgroundColor: priorityColorOpaque[task.priority],
                borderColor: `${priorityColor[task.priority]}`
              }}
              className="px-[4px]"
            >
              {task.priority}
            </span>
          </div>
          <span className="pt-[10px]"> Due: {task.dueDate || "-"}</span>
        </div>
      </div>
      <ViewTask
        isOpen={isOpenTask}
        task={task}
        deleteTask={deleteTask}
        onClose={onCloseTask}
      />
    </>
  );
};

const TaskColumn = ({ status, tasks, moveTask }) => {
  const [, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item) => {
      if (item.status !== status) {
        moveTask(item.id, status);
      }
    }
  }));
  return (
    <div ref={drop} className="p-4 border rounded-lg bg-gray-100 space-y-2">
      <h3 className="font-bold mb-4">
        {status} | {tasks.length}
      </h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

const Tasks = () => {
  const { tasks } = useSelector((state) => state.app);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${base_URL}/tasks/`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        const { tasks, status, error } = response.data;
        if (status) {
          dispatch({ type: TASKS, payload: [...tasks] });
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast({
            title: "There was some error",
            description: error || "",
            status: "error",
            duration: 1000,
            isClosable: true
          });
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const toast = useToast();
  const dispatch = useDispatch();
  const moveTask = async (id, newStatus) => {
    const response = await axios.patch(
      `${base_URL}/tasks/${id}`,
      { id, status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const { status } = response.data;
    const statusCode = {
      [taskStatus.completed]: "success",
      [taskStatus.pending]: "error",
      [taskStatus.done]: "info"
    };
    if (status) {
      dispatch({ type: TASKSTATUS, payload: { id, newStatus } });
      toast({
        title: newStatus,
        description: `Task has been moved to ${newStatus}.`,
        status: statusCode[newStatus] || "info",
        variant: "left-accent",
        duration: 1000,
        isClosable: true
      });
    } else {
      toast({
        title: "Error!",
        description: `There was an error while updating task`,
        status: "error",
        duration: 1000,
        isClosable: true
      });
    }
  };
  const priorityCode = { Low: 0, Medium: 1, High: 2 };
  const deletedTasks = tasks.filter(
    (task) => task.status === taskStatus.deleted
  );
  const taskGroups = tasks
    .filter((task) => task.status !== taskStatus.deleted)
    .sort(
      (taskA, taskB) =>
        priorityCode[taskB.priority] - priorityCode[taskA.priority]
    )
    .reduce(
      (acc, task) => {
        if (!acc[task.status]) acc[task.status] = [];
        acc[task.status].push(task);
        return acc;
      },
      {
        [taskStatus.pending]: [],
        [taskStatus.completed]: [],
        [taskStatus.done]: []
      }
    );
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <p className="text-2xl font-semibold text-gray-800 mb-4">Tasks</p>
      <div className="grid grid-cols-3 gap-[20px]">
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <>
            {tasks.length > 0 ? (
              <>
                {Object.keys(taskGroups).map((status) => (
                  <TaskColumn
                    key={status}
                    status={status}
                    tasks={taskGroups[status]}
                    moveTask={moveTask}
                  />
                ))}
                {deletedTasks.length > 0 && (
                  <TaskColumn
                    status={deletedTasks?.[0]?.status}
                    tasks={deletedTasks}
                    moveTask={moveTask}
                  />
                )}
              </>
            ) : (
              <p className="text-xs text-gray-800 mb-4">No Tasks</p>
            )}
          </>
        )}
      </div>
    </DndProvider>
  );
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <div className="flex h-[200vh] flex-wrap gap-[20px]"> */}
      <div className="grid grid-cols-3 gap-[20px]">
        {Object.keys(sortedObject).map(
          (status) =>
            sortedObject[status].length > 0 && (
              <TaskColumn
                key={status}
                status={status}
                tasks={sortedObject[status]}
                moveTask={moveTask}
              />
            )
        )}
      </div>
    </DndProvider>
  );
};

export default Tasks;
