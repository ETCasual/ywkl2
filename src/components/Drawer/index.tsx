/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { Drawer, IconButton, Button, Switch } from "@material-tailwind/react";

export const RightDrawer = () => {
  const [installEvent, setInstallEvent] = useState<Event>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationAllowed, setNotificationAllowed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setInstallEvent(event);
    });
  }, []);
  useEffect(() => {
    void Notification.requestPermission().then((res) => {
      if (res !== "granted") {
        setNotificationAllowed(false);
      } else {
        setNotificationAllowed(true);
      }

      if (res === "denied") {
        setError("Notification permissions blocked by user.");
      } else setError("");
    });
  }, [notificationAllowed]);

  return (
    <Fragment>
      <img
        src="/assets/YW_Logo.png"
        alt="YW Logo"
        className="h-[40px] w-[40px] object-cover"
        onClick={() => setDrawerOpen(true)}
      />
      <Drawer
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="bg-[#191919] p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <h5 className="font-made text-lg font-bold text-[#39FF14] lg:text-xl">
            YW Events
          </h5>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setDrawerOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="flex w-full flex-col gap-2">
          {installEvent && (
            <Button
              size="lg"
              fullWidth
              className="bg-[#39FF14] bg-opacity-60 transition-opacity hover:bg-opacity-70"
              variant="filled"
              //   @ts-ignore
              onClick={async () => await installEvent?.prompt()}
            >
              Download as app
            </Button>
          )}

          <div className="flex w-full flex-col gap-1">
            <div
              onClick={() => setNotificationAllowed((prev) => !prev)}
              className="flex w-full cursor-pointer flex-row justify-between rounded-md px-3 py-3.5"
            >
              <label className="text-white">Notifications</label>
              <Switch
                id="notification"
                onChange={() => setNotificationAllowed((prev) => !prev)}
                checked={notificationAllowed}
                crossOrigin={null}
                className="checked:bg-[#39ff14]"
                circleProps={{
                  style: {
                    border: "none",
                  },
                }}
              />
            </div>
            {error && (
              <div className="w-full rounded-md bg-red-200 px-2 py-1 text-right text-sm text-red-700">
                {error}
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};
