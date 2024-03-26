/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  type FunctionComponent,
  useState,
} from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import { IoCloseOutline } from "react-icons/io5";
import { base64ToUint8Array } from "@/utils/helpers";
import { env } from "@/env.mjs";
import { toast } from "react-toastify";
import { useUser } from "@/stores/useUser";
import { useCGM } from "@/stores/useCGM";

interface DrawerProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  installPrompt?: Event;
  setInstallPrompt: Dispatch<SetStateAction<Event | undefined>>;
  registration?: ServiceWorkerRegistration;
  // setRegistration: Dispatch<
  //   SetStateAction<ServiceWorkerRegistration | undefined>
  // >;
  subscription?: PushSubscription;
  setSubscription: Dispatch<SetStateAction<PushSubscription | undefined>>;
  isSubscribed: boolean;
  setIsSubscribed: Dispatch<SetStateAction<boolean>>;
}
export const Drawer: FunctionComponent<DrawerProps> = ({
  open,
  onClose,
  installPrompt,
  setInstallPrompt,
  // subscription,
  registration,
  setSubscription,
  setIsSubscribed,
}) => {
  const [enabled, setEnabled] = useState(
    localStorage.getItem("ywkl-allow-notification") === "true",
  );

  const { clear: clearUser } = useUser();
  const { clear: clearCGM } = useCGM();

  const logout = () => {
    clearCGM();
    clearUser();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
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
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
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
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none"
                        onClick={() => onClose(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <IoCloseOutline
                          className="h-6 w-6 outline-none"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full w-full flex-col overflow-y-scroll bg-[#191919] px-4 py-6 shadow-xl sm:px-6">
                    <div className="flex flex-col">
                      <Dialog.Title className="text-2xl font-extrabold text-[#39FF14]">
                        Options
                      </Dialog.Title>
                    </div>
                    <div className="relative flex h-full flex-col justify-between pt-6">
                      {/* <div className="relative flex flex-col gap-5">
                        <div
                          className="flex cursor-pointer flex-row items-center justify-between"
                          onClick={async (event) => {
                            if (!enabled) {
                              await Notification.requestPermission().then(
                                async (res) => {
                                  if (res === "granted") {
                                    event.preventDefault();
                                    const sub =
                                      await registration?.pushManager.subscribe(
                                        {
                                          userVisibleOnly: true,
                                          applicationServerKey:
                                            base64ToUint8Array(
                                              env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
                                            ),
                                        },
                                      );
                                    setSubscription(sub);
                                    setIsSubscribed(true);
                                    toast("Subscribed to notifications!", {
                                      autoClose: 2000,
                                      theme: "colored",
                                      type: "success",
                                    });
                                    console.log("web push subscribed!", sub);

                                    localStorage.setItem(
                                      "ywkl-allow-notification",
                                      "true",
                                    );
                                    setEnabled(true);
                                  } else {
                                    localStorage.setItem(
                                      "ywkl-allow-notification",
                                      "false",
                                    );
                                    setEnabled(false);
                                  }
                                },
                              );
                            } else {
                              if (enabled) {
                                localStorage.setItem(
                                  "ywkl-allow-notification",
                                  "false",
                                );
                                setEnabled(false);
                              }
                            }
                          }}
                        >
                          <p className="font-bold text-white">
                            Allow Notifications
                          </p>
                          <Switch
                            checked={enabled}
                            className={`${
                              enabled ? "bg-[#44ae32]" : "bg-gray-400"
                            }
          relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={`${
                                enabled ? "translate-x-5" : "translate-x-0"
                              }
            pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                          </Switch>
                        </div>
                        {installPrompt && (
                          <button
                            style={{
                              boxShadow: "#8bda02 0 0 10px 1px",
                            }}
                            className="w-full rounded-md bg-[#8bda02] bg-opacity-100 px-5 py-2 font-sans font-bold transition hover:bg-opacity-70 hover:shadow-none"
                            onClick={async () => {
                              //@ts-ignore
                              const res = await installPrompt.prompt();
                              if (res.outcome !== "dismissed")
                                setInstallPrompt(undefined);

                              // await fetch("/api/notification", {
                              //   method: "POST",
                              //   headers: {
                              //     "Content-Type": "application/json",
                              //   },
                              //   body: JSON.stringify({
                              //     subscription: subscription,
                              //     data: {
                              //       title: "Hi",
                              //       message: "Hello",
                              //       url: "/connect-camp",
                              //     },
                              //   }),
                              // });
                            }}
                          >
                            Download as App
                          </button>
                        )}
                      </div> */}
                      <button
                        onClick={() => {
                          logout();
                        }}
                        className="absolute bottom-0 w-full rounded-md border-2 border-[#8bda02] px-5 py-2 text-center font-sans font-bold transition hover:border-[1px]"
                      >
                        Log Out
                      </button>
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
