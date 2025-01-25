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
import folder from "../assets/Images/folder.png";
import { useDispatch, useSelector } from "react-redux";
import { base_URL, SINGLE_POST } from "../Utility/Utility";
const CreatePost = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState("");
  const [postText, setPostText] = useState("");
  const { token } = useSelector((state) => state.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const createNewPost = async () => {
    if (!postText && files.length == 0) {
      toast({
        title: "No Image and Text",
        description: `Please Select image and text.`,
        status: "error",
        duration: 1000,
        isClosable: true
      });
      return;
    }
    if (files.length == 0) {
      toast({
        title: "No Image",
        description: `Please Select image.`,
        status: "error",
        duration: 1000,
        isClosable: true
      });
      return;
    }
    if (!postText) {
      toast({
        title: "No Post Text",
        description: `Please Enter post Text.`,
        status: "error",
        duration: 1000,
        isClosable: true
      });
      return;
    }

    const formData = new FormData();
    formData.append("postText", postText);
    formData.append("image", files);

    try {
      const response = await axios.post(`${base_URL}/post/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`
        }
      });
      const { status, error, newPost } = response.data;
      if (status) {
        toast({
          title: "Success",
          description: `Post Created Successfully.`,
          status: "success",
          duration: 1000,
          isClosable: true
        });
        console.log("response.data", response.data);
        dispatch({ type: SINGLE_POST, payload: newPost });
        onClose();
        setPostText("");
        setFiles("");
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
            New post
          </ModalHeader>
          <ModalCloseButton borderRadius="50%" backgroundColor="#F5F5F5" />
          <ModalBody>
            <textarea
              className="bg-[#D9D9D99C] resize-none overflow-y-auto max-h-[250px] min-h-[250px] w-full p-2 border rounded "
              placeholder="What’s on your mind?"
              value={postText}
              onChange={(e) => {
                setPostText(e.target.value);
              }}
              sx={{ "::-webkit-scrollbar": { display: "none" } }}
            />
            <div className="mt-4 flex m-auto">
              <div className="bg-[#3182ce] text-black w-full rounded-[50px] mr-3 p-2">
                <label htmlFor="fileInput" className="m-auto w-fit block">
                  <div className="flex items-center gap-[10px]">
                    <img className="h-[16px] w-[16px]" src={folder} />
                    <span className="cursor-pointer text-[14px] font-bold align-left">
                      Choose the file
                    </span>
                  </div>
                  {/* <Button colorScheme="cyan"></Button>
                  <Button colorScheme="teal"></Button> */}
                  <input
                    onChange={(e) => {
                      if (e.target.files) {
                        setFiles(e.target.files[0]);
                        // setFiles((prevFiles) => [
                        //   ...prevFiles,
                        //   ...Array.from(e.target.files)
                        // ]);
                      }
                    }}
                    className="hidden"
                    id="fileInput"
                    type="file"
                    accept="image/*"
                  />
                </label>
              </div>
              {/* <label htmlFor="fileInput" className="w-1/2">
                <div className="flex items-center gap-[10px]">
                  <img className="h-[16px] w-[16px]" src={folder} />
                  <span className="cursor-pointer text-[14px] font-bold align-left">
                    Choose the file
                  </span>
                </div>
                <input
                  onChange={(e) => {
                    if (e.target.files) {
                      // setFiles([...files, ...Array.from(e.target.files)]);
                      setFiles((prevFiles) => [
                        ...prevFiles,
                        ...Array.from(e.target.files)
                      ]);
                    }
                  }}
                  className="hidden"
                  id="fileInput"
                  type="file"
                  multiple
                  accept="image/*"
                />
              </label> */}
              {/* <div className="bg-[#0BC5EA] text-black w-full rounded-[50px] mr-3 p-2">
                <label htmlFor="camera" className="m-auto w-fit block">
                  <div className="flex items-center gap-[10px]">
                    <img
                      className="h-[16px] w-[16px]"
                      src={camera}
                      alt="camera icon"
                    />
                    <span className="cursor-pointer text-[14px] font-bold align-left">
                      Camera
                    </span>
                  </div>
                  <input
                    id="camera"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                  />
                </label>
              </div> */}
              {/* <label htmlFor="fileInput">
                <div className="flex items-center gap-[10px]">
                  <img
                    className="h-[16px] w-[16px]"
                    src={camera}
                    alt="camera icon"
                  />
                  <span className="cursor-pointer text-[14px] font-bold align-left">
                    Camera
                  </span>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />
              </label> */}
            </div>
            <div className="mt-4">
              {/* <label htmlFor="fileInput">
                <div className="flex items-center gap-[10px]">
                  <img
                    className="h-[16px] w-[16px]"
                    src={camera}
                    alt="camera icon"
                  />
                  <span className="cursor-pointer text-[14px] font-bold align-left">
                    Camera
                  </span>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />
              </label> */}
            </div>
            <div className="flex m-auto w-full items-start gap-[10px]">
              {/* {files.map((file, index) => (
                <div
                  className="flex h-fit justify-between items-center bg-[#f5f5f5] p-[10px] rounded-[8px] relative"
                  key={index}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="max-w-[120px]"
                  />
                  <button
                    className="rounded-[50%] bg-[#f5f5f5] absolute text-black w-[2rem] h-[2rem] top-0 right-0 "
                    onClick={() => {
                      setFiles(files.filter((_, i) => i !== index));
                    }}
                  >
                    X
                  </button>
                </div>
              ))} */}
              <div className="flex h-fit justify-between items-center bg-[#f5f5f5] p-[10px] rounded-[8px] relative">
                {files && (
                  <>
                    <img
                      src={URL.createObjectURL(files)}
                      alt="image"
                      className="max-w-[250px] min-h-[120px] "
                    />
                    <button
                      className="rounded-[50%] bg-[#f5f5f5] absolute text-black w-[2rem] h-[2rem] top-0 right-0 "
                      onClick={() => {
                        setFiles("");
                      }}
                    >
                      X
                    </button>
                  </>
                )}
              </div>
            </div>
          </ModalBody>

          <ModalFooter style={{ paddingTop: "0" }}>
            <button
              className="bg-black text-white w-full rounded-[50px] mr-3 p-2 hover:bg-gray-500 hover:text-black "
              onClick={createNewPost}
            >
              Create
            </button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreatePost;
