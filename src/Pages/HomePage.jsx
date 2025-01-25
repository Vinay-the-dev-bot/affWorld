import { useDisclosure } from "@chakra-ui/react";
import CreatePost from "../Components/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import HomeFeed from "../Components/homeFeed";
import { useEffect, useState } from "react";
import Tasks from "../Components/Tasks";
import CreateTask from "../Components/CreateTask";
import { useNavigate } from "react-router-dom";
import { LOGOUT, tabs } from "../Utility/Utility";

const HomePage = () => {
  const { name, isLoggedIn } = useSelector((state) => state.user);
  const {
    isOpen: isOpenPost,
    onOpen: onOpenPost,
    onClose: onClosePost
  } = useDisclosure();
  const {
    isOpen: isOpenTask,
    onOpen: onOpenTask,
    onClose: onCloseTask
  } = useDisclosure();
  const [currPage, setCurrPage] = useState(tabs && tabs[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pages = {
    Feed: <HomeFeed />,
    Tasks: <Tasks />
  };
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className="w-full flex">
        <div className="min-h-screen w-[25%] border-r-[1px] border-gray-300 bg-gray-50">
          <p className="p-4 text-3xl font-bold text-gray-800">{name}</p>
          <div className="flex flex-col px-4">
            {tabs.map((tab, key) => (
              <p
                key={key}
                onClick={() => setCurrPage(tab)}
                className={`cursor-pointer px-4 py-2 rounded-lg mt-[15px] text-sm font-medium transition-all duration-200 ${
                  currPage === tab
                    ? "bg-[#0C21C1] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
              >
                {tab}
              </p>
            ))}
            <p
              className={`cursor-pointer bg-red-600 px-4 py-2 rounded-lg mt-[15px] text-sm font-medium transition-all duration-200 `}
              style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
              onClick={() => {
                dispatch({ type: LOGOUT });
                localStorage.setItem("taskConnectToken", "");
                navigate("/login");
              }}
            >
              LOGOUT
            </p>
          </div>
        </div>

        <div className="flex-1 min-h-screen bg-white p-6">
          {pages[currPage] || (
            <div className="text-center text-gray-500 text-lg">
              Page Not Found
            </div>
          )}
        </div>
      </div>

      <CreatePost isOpen={isOpenPost} onClose={onClosePost} />
      <CreateTask isOpen={isOpenTask} onClose={onCloseTask} />
      <div
        className="fixed right-[50px] bottom-[50px] w-[50px] h-[50px] bg-black text-white rounded-full flex items-center justify-center text-[33px] cursor-pointer z-10 "
        onClick={currPage === "Tasks" ? onOpenTask : onOpenPost}
      >
        +
      </div>
    </>
  );
};

export default HomePage;
