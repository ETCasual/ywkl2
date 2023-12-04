/* eslint-disable @next/next/no-img-element */
import type { FunctionComponent } from "react";

type MessageCardProps = {
  author: string;
  message: string;
  clanName: string;
  groupNo: string;
  image?: string;
};

export const MessageCard: FunctionComponent<MessageCardProps> = ({
  author,
  image,
  message,
  clanName,
  groupNo,
}) => {
  return (
    <div className="relative w-full border-x-4 border-b-[10px] border-t-4 border-black bg-white">
      <div className="absolute -top-[23px] left-1/2 flex -translate-x-1/2 flex-col items-center justify-center">
        <div
          className="z-[5] flex h-[40px] w-[225px] flex-col items-center justify-center bg-[#96ec00] font-noto text-lg font-extrabold uppercase"
          style={{
            clipPath:
              "polygon(0% 50%, 20px 0%, 205px 0, 100% 50%, 20px 205px, 20px 40px)",
          }}
        >
          {clanName}{" "}
          {clanName !== "Pillars" && clanName !== "Ministry" && groupNo}
        </div>
        <div
          className="absolute top-[0.25rem] h-[40px] w-[225px] bg-black"
          style={{
            clipPath:
              "polygon(0% 50%, 20px 0%, 205px 0, 100% 50%, 20px 205px, 20px 40px)",
          }}
        />
      </div>
      <div className="flex flex-col gap-4 px-3 pb-2 pt-7">
        <p className="font-noto text-xl font-semibold">{message}</p>
        {image && (
          <img
            src={image}
            alt={message}
            className="w-[280px] self-center object-cover"
          />
        )}
        <p className="w-full truncate text-ellipsis text-end font-noto text-base font-bold">
          - {author} -
        </p>
      </div>
    </div>
  );
};
