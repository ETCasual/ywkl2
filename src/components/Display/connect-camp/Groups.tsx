/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState, type FunctionComponent } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

type GroupsProps = {
  groups: Record<string, Record<number, string[]>>;
  bg: string;
  leaders: Record<string, string>;
};

export const Groups: FunctionComponent<GroupsProps> = ({
  groups,
  bg,
  leaders,
}) => {
  const [searchString, setSearchString] = useState("");

  const router = useRouter();

  return (
    <div
      className="flex min-h-screen w-screen flex-grow flex-col justify-start bg-cover bg-center text-black"
      style={{ backgroundImage: `url(/${bg})` }}
    >
      <div className="sticky top-0 z-10 flex flex-col items-center border-b-4 border-black bg-white font-made">
        <div className="flex w-full flex-row-reverse items-center justify-between border-b-2 border-black bg-[#96ec00]">
          <div className="flex flex-row-reverse items-center justify-center">
            <img
              src="/assets/Sticker_1.png"
              className="h-[60px] bg-black object-cover p-2.5"
              alt="Warning_Rules"
            />
            <h2 className="mr-3 text-xl font-bold">营会小组 Groups</h2>
          </div>
          <div
            className="flex cursor-pointer flex-row items-center"
            onClick={() => router.push("/connect-camp")}
          >
            <div className="flex flex-col pl-3">
              <div
                className="z-10 flex h-[40px] w-[40px] items-center justify-center bg-[#ff6511]"
                style={{
                  clipPath: "polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)",
                }}
              >
                <FaChevronLeft />
              </div>
              <div
                className="absolute top-[0.825rem] h-[40px] w-[40px] bg-black"
                style={{
                  clipPath: "polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)",
                }}
              />
            </div>
            <p className="pl-2 font-made text-xl">Back</p>
          </div>
        </div>

        <div className="flex w-[320px] flex-col py-3">
          <div className="flex w-full flex-row border-2 border-solid border-black">
            <div className="min-w-[80px] border-r-2 border-black bg-[#ff6511]">
              <label className="pl-2 font-made text-xs" htmlFor={"name"}>
                Name
              </label>
            </div>
            <input
              onChange={(e) => setSearchString(e.currentTarget.value)}
              value={searchString}
              placeholder="Bruce Lee.."
              name="name"
              type="text"
              className="w-full bg-white px-2 outline-none"
            />
            <button
              onClick={() => setSearchString("")}
              className="flex w-[50px] items-center justify-center border-l-2 border-black bg-[rgba(220,38,38,0.3)]"
            >
              <FaTrashAlt color="rgb(220, 38, 38)" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-[calc(100dvh-118px)] w-full flex-col items-center gap-7 overflow-y-scroll p-7">
        {Object.entries(groups)
          .filter(([, groupMembers]) => {
            const matchingMembers = Object.values(groupMembers)
              .flat()
              .filter((members) =>
                members.toLowerCase().includes(searchString.toLowerCase()),
              );

            return matchingMembers.flat().length > 0;
          })
          .map(([clan, groupMembers], i) => (
            <div
              key={i}
              className="relative w-[320px] border-x-4 border-b-[10px] border-t-4 border-black bg-white"
            >
              <div className="absolute -top-[20px] left-1/2 flex -translate-x-1/2 flex-col items-center justify-center">
                <div
                  className="z-[5] flex h-[30px] w-[125px] flex-col items-center justify-center bg-[#96ec00] font-made text-lg font-bold uppercase"
                  style={{
                    clipPath:
                      "polygon(0% 50%, 15px 0%, 110px 0, 100% 50%, 30px 110px, 15px 30px)",
                  }}
                >
                  {clan}
                </div>
                <div
                  className="absolute top-[0.25rem] h-[30px] w-[125px] bg-black"
                  style={{
                    clipPath:
                      "polygon(0% 50%, 15px 0%, 110px 0, 100% 50%, 30px 110px, 15px 30px)",
                  }}
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-3 p-5">
                {/* <p className="font-noto text-2xl font-bold">{rule.chi}</p>
                <p className="font-made text-lg">{rule.en}</p> */}
                <p className="w-full text-center text-xl font-bold">
                  Leader: {leaders[clan]}
                </p>
                {Object.entries(groupMembers)
                  .filter(([, gm]) => {
                    // console.log(gm);
                    const matchingMembers = gm.filter((members) =>
                      members
                        .toLowerCase()
                        .includes(searchString.toLowerCase()),
                    );
                    return matchingMembers.length > 0;
                  })
                  .map(([no, gm], idx) => (
                    // <p key={no} className="font-made text-lg">
                    //   {gm}
                    // </p>
                    // <div key={i} className="flex w-[320px] flex-col bg-white">
                    <div
                      className="w-full border-2 border-b-[6px] border-black"
                      key={idx}
                    >
                      <div className="w-full border-2 border-black bg-[#ff6511] font-made text-sm">
                        <p className="px-5 py-2 text-lg font-bold capitalize">
                          {clan}{" "}
                          {no.length === 1
                            ? `00${no}`
                            : no.length == 2
                              ? `0${no}`
                              : no}
                        </p>
                      </div>
                      <div className="flex w-full flex-col border-2 border-t-0 border-black">
                        {gm.map((go) => (
                          <div
                            key={`${i}-${go}`}
                            className={`py-1 text-lg px-5${
                              go.includes("(L)")
                                ? " bg-[#96ec00] font-bold"
                                : ""
                            }`}
                          >
                            {go}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
