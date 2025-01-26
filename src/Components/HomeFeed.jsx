import { useDispatch, useSelector } from "react-redux";
import { base_URL, POSTS } from "../Utility/Utility";
import { useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const HomeFeed = () => {
  const { feedData } = useSelector((state) => state.app);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${base_URL}/post/`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        const { posts, status, error } = response.data;
        if (status) {
          dispatch({ type: POSTS, payload: [...posts] });
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
        console.error("Error fetching posts:", error);
      }
    };

    if (token) fetchPosts();
  }, []);
  return (
    <>
      <p className="text-2xl font-semibold text-gray-800 mb-4">Feed</p>
      {feedData && feedData.length > 0
        ? feedData.map((feed, key) => {
            console.log(feed);
            return (
              <div
                key={key}
                className="w-9/10 p-4 m-4 bg-white shadow-md rounded-lg"
              >
                <p className="font-medium text-2xl text-gray-900">
                  {feed.userName}
                </p>
                <p className="text-xs text-gray-500 mt-1">{feed.createdDate}</p>
                <p className="font-medium text-2xl text-gray-900">
                  {feed.text}
                </p>
                <p className="text-xl text-gray-600 mt-1">{feed.caption}</p>
                <img
                  className="max-h-[80%] mt-2 rounded-lg"
                  src={feed.image}
                  alt="feed-image"
                />
              </div>
            );
          })
        : "Please Start posting to see the feed"}
    </>
  );
  return (
    <>
      <p>Feed</p>
      {feedData &&
        feedData.map((feed, key) => {
          return (
            <div key={key} className="w-[75%] h-[20rem] p-2 m-1">
              <p>{feed.name}</p>
              <p>{feed.caption}</p>
              <p>{feed.time}</p>
              <img className="max-h-[80%]" src={feed.image} />
            </div>
          );
        })}
    </>
  );
};

export default HomeFeed;
