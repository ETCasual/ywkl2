/* eslint-disable @next/next/no-img-element */
import type { FunctionComponent } from "react";

type RulesProps = {
  rules: Record<number, { chi: string; en: string }>;
};

export const Rules: FunctionComponent<RulesProps> = ({ rules }) => {
  return (
    <>
      <div className="sticky top-0 flex flex-row items-center border-y-4 border-black bg-[#96ec00] font-made">
        <img
          src="/assets/Element_Warning.png"
          className="h-[50px] bg-black object-cover p-2.5"
          alt="Warning_Rules"
        />
        <h2 className="ml-3 font-bold">营会规则 Rules</h2>
      </div>
      {Object.entries(rules).map(([num, rule], i) => (
        <div
          key={num}
          className={`flex border-b-2 border-black ${
            i % 2 ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <div
            className={`flex w-[50px] flex-col items-center justify-center font-made text-2xl font-bold ${
              i % 2 ? "border-r-2" : "border-l-2"
            } border-black bg-[#ff6511]`}
          >
            {num}
          </div>
          <div className="flex w-[calc(100%-50px)] flex-col justify-start p-2">
            <p className="font-made text-xs">{rule.en}</p>
            <p className="font-noto pt-1">{rule.chi}</p>
          </div>
        </div>
      ))}
    </>
  );
};
