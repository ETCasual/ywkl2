/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TiClipboard, TiWarning, TiTick } from "react-icons/ti";
import { TbUrgent } from "react-icons/tb";
import {
  type FunctionComponent,
  type Dispatch,
  type SetStateAction,
  useMemo,
  useState,
  // useEffect,
} from "react";
import { useCGM } from "@/stores/useCGM";
import { Rings } from "react-loader-spinner";
import { useUser } from "@/stores/useUser";
import type { CGMs } from "@prisma/client";

export const Table: FunctionComponent<{
  state: "loading" | "done" | null;
  setCGMId: Dispatch<SetStateAction<string>>;
}> = ({ setCGMId, state }) => {
  const { cgm } = useCGM();
  const { user } = useUser();
  const [sorter, setSorter] = useState("cg");

  // useEffect(() => {
  //   void setCG(cgId);
  //   void (async () => {
  //     await fetch(`/api/cgm?cgId=${cgId}`, { method: "GET" }).then(
  //       async (res) =>
  //         await res.json().then((response: CGMs[]) => setCGMs(response)),
  //     );
  //   })();
  // }, [cgId, setCG, setCGMs]);

  const sortFn = useMemo(() => {
    if (sorter === "cg")
      return (a: CGMs, b: CGMs) => {
        if (a.cgId < b.cgId) {
          return -1;
        }
        if (a.cgId > b.cgId) {
          return 1;
        }
        return 0;
      };

    if (sorter === "position")
      return (a: CGMs, b: CGMs) => {
        if (a.rank < b.rank) {
          return -1;
        }
        if (a.rank > b.rank) {
          return 1;
        }
        return 0;
      };
    if (sorter === "status")
      return (a: CGMs, b: CGMs) => {
        if (a.status < b.status) {
          return -1;
        }
        if (a.status > b.status) {
          return 1;
        }
        return 0;
      };
    if (sorter === "name")
      return (a: CGMs, b: CGMs) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      };
  }, [sorter]);

  return (
    <div
      className={`max-h-[50vh] min-h-[50vh] w-full overflow-x-hidden overflow-y-scroll rounded-lg bg-white/50${cgm.length > 0 ? "" : " flex flex-col items-center justify-center"}`}
    >
      {state == "loading" ? (
        <div className="flex min-h-[50vh] w-full flex-row items-center justify-center">
          <Rings
            visible={true}
            height="200"
            width="200"
            color="purple"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : state === "done" ? (
        cgm.length > 0 ? (
          <table
            // style={{ background: "none" }}
            className="table table-pin-rows table-xs w-full border-black"
          >
            <thead className="sticky top-0 z-10 bg-[white_!important] text-black">
              <tr className="text-black/60">
                <th
                  className={`cursor-pointer${sorter === "name" ? " text-primary" : ""}`}
                  onClick={() => {
                    setSorter("name");
                  }}
                >
                  Name
                </th>
                <th
                  className={`cursor-pointer text-end${sorter === "position" ? " text-primary" : ""}`}
                  onClick={() => {
                    setSorter("position");
                  }}
                >
                  Position
                </th>
                <th
                  onClick={() => {
                    setSorter("status");
                  }}
                  className={`cursor-pointer text-end${sorter === "status" ? " text-primary" : ""}`}
                >
                  Status
                </th>
                {user?.superuser ? (
                  <th
                    className={`cursor-pointer text-end${sorter === "cg" ? " text-primary" : ""}`}
                    onClick={() => {
                      setSorter("cg");
                    }}
                  >
                    From CG
                  </th>
                ) : null}
                <th className="text-end">Discipleship</th>
              </tr>
            </thead>
            <tbody>
              {cgm
                .filter(
                  (a) =>
                    a.userId !== user?.id &&
                    (user?.superuser ? true : a.rank !== "Coach"),
                )
                .sort(sortFn)
                .map((item, i) => (
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
                    {user?.superuser && (
                      <td>
                        <div className="text-end text-xs font-bold text-neutral-800">
                          {item.cgId}
                        </div>
                      </td>
                    )}
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
                        className="h-5 w-5 cursor-pointer text-neutral-800"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="text-black">No Data Found.</p>
        )
      ) : null}
    </div>
  );
};
