import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import {
  colorScheme,
  priorityColor,
  priorityColorOpaque
} from "../Utility/Utility";
const ViewTask = ({ isOpen, onClose, task, deleteTask }) => {
  return (
    <>
      <Modal size="xs" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="20px" fontWeight="800" lineHeight="25px">
            {task.name}
          </ModalHeader>
          <ModalCloseButton borderRadius="50%" backgroundColor="#F5F5F5" />
          <ModalBody>
            <div className="mb-4 p-4 bg-gray-100 rounded-md shadow-md">
              <div className="text-lg font-semibold mb-4">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Yes
                </button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
  return (
    <>
      <Modal size="md" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="20px" fontWeight="800" lineHeight="25px">
            {task.name}
          </ModalHeader>
          <ModalCloseButton borderRadius="50%" backgroundColor="#F5F5F5" />
          <ModalBody>
            <div
              className={`p-4 bg-white border rounded shadow cursor-pointer `}
              style={{
                backgroundColor: colorScheme[task.status],
                borderColor: colorScheme[task.status]
              }}
            >
              <div className="text-sm   pt-[5px] flex text-black">
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
                <span className="pl-[5px]"> priority </span>
              </div>
              <p className="font-semibold pt-[5px]">
                <span>Status :</span>
                <span className="font-normal">{task.status}</span>
              </p>
              <p className="font-semibold pt-[5px]">
                <span>Description :</span>
                <span className="font-normal">{task.description}</span>
              </p>
              <p className="flex items-baseline font-semibold pt-[5px]">
                <span>Created Date :</span>
                <span className="font-normal">{task.createdDate}</span>
              </p>
              <p className="font-semibold pt-[5px]">
                <span>Due Date :</span>
                <span className="font-normal">{task.dueDate}</span>
              </p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewTask;
