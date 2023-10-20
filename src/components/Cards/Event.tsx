import Link from "next/link";
import { type FunctionComponent } from "react";

interface EventsCardProps {
  id: string;
  title: string;
}

export const EventsCard: FunctionComponent<EventsCardProps> = ({
  id,
  title,
}) => {
  return (
    <Link
      className="flex h-[135px] w-[240px] flex-col gap-4 rounded-xl bg-white/10 p-3 text-white hover:bg-white/20 sm:h-[180px] sm:w-[320px]"
      href={id}
    >
      <h3 className="text-lg font-bold lg:text-2xl">{title}</h3>
      {/* <div className="text-lg">
        Just the basics - Everything you need to know to set up your database
        and authentication.
      </div> */}
    </Link>
  );
};
