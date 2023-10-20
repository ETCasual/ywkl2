import { env } from "@/env.mjs";
import { useState, type FunctionComponent, useEffect } from "react";
import { LinkWrapper } from "../Wrappers/Link";

interface EventsCardProps {
  id: string;
  title: string;
  imgSrc?: string;
  startTime: EpochTimeStamp;
}

export const EventsCard: FunctionComponent<EventsCardProps> = ({
  id,
  title,
  imgSrc,
  startTime,
}) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (env.NEXT_PUBLIC_IS_STAGING === "1") {
        setDisabled(false);
        return;
      }
      if (!disabled) return;
      const now = Date.now();
      setDisabled(now < startTime);
    }, 3000);

    return () => clearInterval(interval);
  }, [disabled, startTime]);

  return (
    <LinkWrapper
      disabled={disabled}
      style={{
        background: !disabled && imgSrc ? `url(/${imgSrc})` : "",
      }}
      className={`${
        imgSrc ? "bg-cover bg-center " : ""
      }flex relative h-[180px] w-[320px] flex-col gap-4 rounded-xl bg-white/10 p-3 text-white hover:bg-white/20`}
      href={id}
    >
      <div
        className={`absolute${
          disabled ? " bottom-1/2 translate-y-1/2" : " bottom-2"
        } w-[calc(100%-0.75rem)]`}
      >
        <h3 className={`${disabled ? "" : "truncate "}text-lg font-bold`}>
          {disabled ? "Something is coming! Stay tuned!" : title}
        </h3>
      </div>
      {/* <div className="text-lg">
        Just the basics - Everything you need to know to set up your database
        and authentication.
      </div> */}
    </LinkWrapper>
  );
};
