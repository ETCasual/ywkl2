import { type FunctionComponent } from "react";

export const MoreCard: FunctionComponent<{ full?: boolean }> = ({ full }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/40 bg-white/20 text-sm text-white/40 lg:text-lg ${
        full ? "m-4 flex-grow p-4" : "h-[180px] w-[320px]"
      }`}
    >
      More to come!
    </div>
  );
};
