/* eslint-disable @next/next/no-img-element */
import { useState, type FunctionComponent } from "react";

type RoomsProps = {
  rooms: Record<number, string[]>;
};

export const Rooms: FunctionComponent<RoomsProps> = ({ rooms }) => {
  const [searchString, setSearchString] = useState("");

  return (
    <>
      <div className="sticky top-0 flex flex-col">
        <div className="flex flex-row-reverse items-center border-b-2 border-t-4 border-black bg-[#96ec00] font-made">
          <img
            src="/assets/Sticker_2.png"
            className="h-[55px] bg-black object-cover p-1"
            alt="Warning_Rules"
          />
          <h2 className="mr-3 font-bold">营会房间 Rooms</h2>
        </div>
        <div className="w-full border-b-4 border-black bg-white p-2">
          <div className="flex flex-col">
            <div className="flex w-full flex-row border-2 border-solid border-black">
              <div className="min-w-[130px] border-r-2 border-black bg-[#ff6511]">
                <label className="pl-2 font-made text-xs">Name</label>
              </div>
              <input
                className="w-full px-2 font-made text-sm tracking-wide outline-none"
                onChange={(e) => setSearchString(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 p-2">
        {Object.entries(rooms)
          .filter(([, roomOccupants]) => {
            const matchingOccupants = roomOccupants.filter((occupant) =>
              occupant.toLowerCase().includes(searchString.toLowerCase()),
            );
            return matchingOccupants.length > 0;
          })
          .map(([num, roomOccupants], i) => (
            <div key={i} className="flex flex-col">
              <div className="w-full border-2 border-black bg-[#ff6511] font-made text-sm">
                <p className="px-5 py-2">Room {num}</p>
              </div>
              <div className="flex w-full flex-col border-2 border-t-0 border-black">
                {roomOccupants.map((ro) => (
                  <div
                    key={`${i}-${ro}`}
                    className={`py-1 pl-5${
                      ro.includes("(RL)") ? " bg-[#96ec00] font-bold" : ""
                    }`}
                  >
                    {ro.includes("(RL)") ? ro.substring(0, ro.length - 5) : ro}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
