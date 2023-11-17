/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";
import { FaChevronLeft } from "react-icons/fa6";

type RulesProps = {
  rules: Record<number, { chi: string; en: string }>;
  bg: string;
};

export const Rules: FunctionComponent<RulesProps> = ({ rules, bg }) => {
  const router = useRouter();
  return (
    <div
      className="flex min-h-screen w-screen flex-grow flex-col justify-start bg-cover bg-center"
      style={{ backgroundImage: `url(/${bg})` }}
    >
      <div className="sticky top-0 z-10 flex flex-row-reverse items-center justify-between border-b-4 border-black bg-[#96ec00] font-made">
        <div className="flex flex-row-reverse items-center justify-center">
          <img
            src="/assets/Element_Warning.png"
            className="h-[60px] bg-black object-cover p-2.5"
            alt="Warning_Rules"
          />
          <h2 className="mr-3 text-xl font-bold">营会规则 Rules</h2>
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
      <div className="flex h-[calc(100dvh-70px)] w-full flex-col items-center gap-7 overflow-y-scroll p-7">
        {Object.entries(rules).map(([num, rule]) => (
          // <div key={num} className={`flex border-b-2 border-black`}>
          //   <div
          //     className={`flex w-[50px] flex-col items-center justify-center border-x-2 border-black bg-[#ff6511] font-made text-2xl font-bold`}
          //   >
          //     {num}
          //   </div>
          //   <div className="flex w-[calc(100%-50px)] flex-col justify-start p-2">
          //     <p className="font-made text-base">{rule.en}</p>
          //     <p className="pt-1 font-noto text-lg">{rule.chi}</p>
          //   </div>
          // </div>

          <div
            key={num}
            className="relative max-w-[300px] border-x-4 border-b-[10px] border-t-4 border-black bg-white"
          >
            <div className="absolute -left-7 -top-[30px] flex flex-col items-center justify-center">
              <div
                className="z-[5] flex h-[50px] w-[50px] flex-col items-center justify-center bg-[#96ec00] font-made text-lg"
                style={{
                  clipPath: "polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)",
                }}
              >
                {num}
              </div>
              <div
                className="absolute top-[0.25rem] h-[50px] w-[50px] bg-black"
                style={{
                  clipPath: "polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)",
                }}
              />
            </div>
            <div className="flex flex-col items-center justify-center p-3">
              <p className="font-noto text-2xl font-bold">{rule.chi}</p>
              <p className="font-made text-lg">{rule.en}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
