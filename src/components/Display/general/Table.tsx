/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TiClipboard, TiWarning, TiTick } from "react-icons/ti";
import { TbUrgent } from "react-icons/tb";
import type { CGMs } from "@prisma/client";
import {
  type FunctionComponent,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { useCGM } from "@/stores/useCGM";
import { Rings } from "react-loader-spinner";

export const Table: FunctionComponent<{
  cgId: string;
  setCGMId: Dispatch<SetStateAction<string>>;
}> = ({ cgId, setCGMId }) => {
  const { cgm, setCGMs, setCG } = useCGM();

  useEffect(() => {
    void setCG(cgId);
    void (async () => {
      await fetch(`/api/cgm?v=${cgId}`, { method: "GET" }).then(
        async (res) =>
          await res.json().then((response: CGMs[]) => setCGMs(response)),
      );
    })();
  }, [cgId, setCG, setCGMs]);

  return (
    <div
      className={`max-h-[50vh] min-h-[50vh] w-full overflow-x-hidden overflow-y-scroll rounded-lg bg-white/50${cgm.length > 0 ? "" : " flex flex-col items-center justify-center"}`}
    >
      {cgm.length > 0 ? (
        <table
          // style={{ background: "none" }}
          className="table table-pin-rows table-xs w-full border-black"
        >
          <thead className="sticky top-0 z-10 bg-[white_!important] text-black">
            <tr className="text-black/60">
              <th>Name</th>
              <th className="text-end">Position</th>
              <th className="text-end">Status</th>
              <th className="text-end">Discipleship</th>
            </tr>
          </thead>
          <tbody>
            {cgm.map((item, i) => (
              <tr key={i}>
                <td>
                  <div className="text-xs font-bold text-neutral-800">
                    {item.name}
                  </div>
                </td>
                <td>
                  <div className="text-end text-xs font-bold text-neutral-800">
                    {item.rank}
                  </div>
                </td>
                <td>
                  <div className="flex justify-end gap-1 text-neutral-800">
                    {item.status === "Healthy" ? (
                      <TiTick className="h-5 w-5 text-green-400" />
                    ) : item.status === "Warning" ? (
                      <TiWarning className="h-5 w-5 text-red-400" />
                    ) : (
                      <>
                        <TbUrgent className="h-5 w-5 text-red-600" />
                        <TiWarning className="h-5 w-5 text-red-400" />
                      </>
                    )}
                  </div>
                </td>

                <td className="flex justify-end">
                  <TiClipboard
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                      setCGMId(item.id);
                      (
                        document.getElementById(
                          "discipleship-data",
                        ) as HTMLDialogElement
                      ).showModal();
                    }}
                    className="h-5 w-5 text-neutral-800"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Rings
          visible={true}
          height="200"
          width="200"
          color="purple"
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
    </div>
  );
};
