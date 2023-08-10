import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Tooltip, Avatar } from "@material-tailwind/react";
import {
  getMessages,
  getUsersChat,
  sendMessage,
} from "../../../api/userAuth/userApis";
import {
  CompleteMessageInterface,
  CompleteRegisteredChatInterface,
} from "../../../types/userInterface";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../../config/chatLogics";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";
import io from "socket.io-client";
import config from "../../../config/envConfig";

const ENDPOINT = config.BASE_URL;
let socket: any, selectedChatCompare: CompleteRegisteredChatInterface;

const ChatBox = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        size="sm"
        variant="text"
        className="w-28 text-gray-500 flex items-center"
        onClick={() => setOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
          />
        </svg>
        Inbox
      </Button>
      {open && <Inbox open={open} setOpen={setOpen} />}
    </>
  );
};

export default ChatBox;

type InboxProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Inbox: React.FC<InboxProps> = ({ open, setOpen }) => {
  const [chats, setChats] = useState<CompleteRegisteredChatInterface[]>();
  const [selectedChat, setSelectedChat] =
    useState<CompleteRegisteredChatInterface>();
  // const [socketConnection, setSocketConnection] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    fetchChats();
  }, []);
  const fetchChats = async () => {
    const data = await getUsersChat();
    setChats(data?.data.data);
  };

  const handleSelectedChat = (chat: CompleteRegisteredChatInterface) => {
    setSelectedChat(chat);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => {
      // setSocketConnection(true));
      console.log("socket connected");
    });
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-4xl">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-xl md:text-2xl font-semibold leading-6 text-gray-900">
                        Your messages
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6 overflow-y-hidden">
                      <div className="flex w-full h-screen pb-28 ">
                        <div className="flex flex-col items-center w-2/12 md:w-5/12 bg-blue-gray-50 px-2 rounded-xl">
                          {chats &&
                            chats.map((item) => {
                              return (
                                <div
                                  onClick={() => handleSelectedChat(item)}
                                  key={item._id}
                                  className="flex px-1 md:px-3 py-1 mt-2 mb-2 w-max sm:w-full rounded-full bg-white items-center shadow-md hover:cursor-pointer"
                                >
                                  <img
                                    className="w-9 h-9 md:w-14 md:h-14 rounded-full  "
                                    src={
                                      item.logo
                                        ? item.logo
                                        : "https://img.freepik.com/free-icon/user_318-159711.jpg"
                                    }
                                  ></img>
                                  <p className="text-lg ml-2 hidden md:block">
                                    {item.orgName}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                        <div className="flex flex-col w-10/12 md:w-7/12 pl-2">
                          {selectedChat && (
                            <Messages selectedChat={selectedChat} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

interface MessagesProps {
  selectedChat: CompleteRegisteredChatInterface;
}

const Messages: React.FC<MessagesProps> = ({ selectedChat }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<CompleteMessageInterface[]>();
  const [selectedChatDetails, setSelectedChatDetails] =
    useState<CompleteRegisteredChatInterface>();

  useEffect(() => {
    setSelectedChatDetails(selectedChat);
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  +useEffect(() => {
    fetchMessages();
  }, [selectedChatDetails]);

  const fetchMessages = async () => {
    if (selectedChatDetails) {
      const data = await getMessages(selectedChatDetails?._id);
      setMessages(data?.data.data);
      socket.emit("join chat", selectedChatDetails._id);
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage && selectedChatDetails) {
      const data = await sendMessage(selectedChatDetails?._id, newMessage);
      socket.emit("new message", data?.data.response);
      setMessages((messages) => [...(messages ?? []), data?.data.response]);
      setNewMessage("");
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    const handleMessageUpdate = (
      newMessageReceived: CompleteMessageInterface
    ) => {
      console.log(newMessageReceived);
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //notification logic
      } else {
        // setMessageFromSocket(newMessageReceived)
        if (messages)
          setMessages((messages) => [...(messages ?? []), newMessageReceived]);
      }
    };
    // socket.on("message received", (newMessageReceived: CompleteMessageInterface) => {
    //   console.log(newMessageReceived)
    //   setMessageFromSocket(newMessageReceived)
    //   if (
    //     !selectedChatCompare || // if chat is not selected or doesn't match current chat
    //     selectedChatCompare._id !== newMessageReceived.chat._id
    //   ) {  //notification logic
    //   } else {
    //     // setMessageFromSocket(newMessageReceived)
    //    if(messages && messageFromSocket ) setMessages((messages)=>[...(messages ?? []), messageFromSocket]);
    //   }
    // });

    socket.on("message received", handleMessageUpdate);
    return () => {
      socket.off("message received", handleMessageUpdate);
    };
  });

  // useEffect(() => {
  //   setMessages((messages)=>[...(messages ?? []),messageFromSocket])
  // },[messageFromSocket])

  return (
    <>
      <div className="w-full h-full bg-blue-gray-50 p-2 rounded-xl">
        <div className="w-full h-full object-contain rounded-xl bg-white flex flex-col-reverse p-2">
          <form className="mt-2" onSubmit={handleSendMessage}>
            <input
              onChange={handleTyping}
              value={newMessage}
              className="w-full border-2 h-10 rounded-lg px-1"
              placeholder="enter a message"
            ></input>
          </form>
          {messages && <ScrollableChat messages={messages} />}
          <div className="flex justify-center">
            <h3 className="text-xl font-semibold">
              {selectedChatDetails?.orgName}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

interface ScrollableChatProps {
  messages: CompleteMessageInterface[];
}

const ScrollableChat: React.FC<ScrollableChatProps> = ({ messages }) => {
  const user = useSelector(selectUser);

  return (
    <ScrollableFeed
    // className="no-scrollbar"
    >
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                content={m.sender.firstName}
                placement="bottom-start"
                // hasArrow
              >
                <Avatar
                  className="mt-7 mr-1 hover:cursor-pointer"
                  size="sm"
                  // name={m.sender.firstName}
                  src={m.sender.profileImage}
                />
              </Tooltip>
            )}
            <span
              className="h-min"
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};
