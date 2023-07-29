import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { getUsersChat } from "../../../api/userAuth/userApis";
import { CompleteRegisteredChatInterface } from "../../../types/userInterface";

const ChatBox = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>open</Button>
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

  useEffect(() => {
    fetchChats();
  }, []);
  const fetchChats = async () => {
    const data = await getUsersChat();
    setChats(data?.data.data);
  };
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
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="flex w-full">
                        <div className="flex flex-col w-5/12 bg-blue-gray-50 px-2 rounded-xl">
                          {chats &&
                            chats.map((item) => {
                              return (
                                <div
                                  key={item._id}
                                  className="flex px-3 py-1 mt-2 mb-2 w-max sm:w-full rounded-full bg-white items-center shadow-md"
                                >
                                  <img
                                    className="w-14 h-14 rounded-full  "
                                    src={
                                      item.logo
                                        ? item.logo
                                        : "https://img.freepik.com/free-icon/user_318-159711.jpg"
                                    }
                                  ></img>
                                  <p className="text-lg ml-2 hidden sm:block">{item.orgName}</p>
                                </div>
                              );
                            })}
                        </div>
                        <div className="flex flex-col w-7/12">
                          <Messages />
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

const Messages: React.FC = () => {
  return <></>;
};
