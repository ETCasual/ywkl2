import Link from "next/link";
import { type FunctionComponent } from "react";

interface EventsCardProps {
  id: string;
  title: string;
  imgSrc?: string;
}

export const EventsCard: FunctionComponent<EventsCardProps> = ({
  id,
  title,
  imgSrc,
}) => {
  return (
    <Link
      style={{
        background: imgSrc ? `url(/${imgSrc})` : "",
      }}
      className={`${
        imgSrc ? "bg-cover bg-center " : ""
      }flex relative h-[180px] w-[320px] flex-col gap-4 rounded-xl bg-white/10 p-3 text-white hover:bg-white/20`}
      href={id}
    >
      <div className="absolute bottom-2 w-[calc(100%-0.75rem)]">
        <h3 className="truncate text-lg font-bold">{title}</h3>
      </div>
      {/* <div className="text-lg">
        Just the basics - Everything you need to know to set up your database
        and authentication.
      </div> */}
    </Link>
  );
};
