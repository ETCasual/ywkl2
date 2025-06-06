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
import type { Cg, CGMs } from "@prisma/client";

export const Table: FunctionComponent<{
  showCluster?: boolean;
  state: "loading" | "done" | null;
  setCGMId: Dispatch<SetStateAction<string>>;
  setCGMLookupId: Dispatch<SetStateAction<string>>;
}> = ({ setCGMId, state, setCGMLookupId }) => {
  const { cgm } = useCGM();
  const { user } = useUser();
  const [sorter] = useState("cg_rank");

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
      return (a: CGMs & { Cg: Cg }, b: CGMs & { Cg: Cg }) => {
        // if (a.cgId < b.cgId) {
        //   return -1;
        // }
        // if (a.cgId > b.cgId) {
        //   return 1;
        // }
        // return 0;

        if (a.Cg?.clusterId < b.Cg?.clusterId) {
          return -1;
        }
        if (a.Cg?.clusterId > b.Cg?.clusterId) {
          return 1;
        }
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
    if (sorter === "cg_rank")
      return (a: CGMs & { Cg: Cg }, b: CGMs & { Cg: Cg }) => {
        const rankWeights: Record<string, number> = {
          TL_Pastor: 7,
          Coach: 6,
          CGL: 5,
          SGL: 4,
          OM: 3,
          NB: 2,
          RNF: 1,
          NF: 0,
        };

        if (a.cgId < b.cgId) {
          return -1;
        }
        if (a.cgId > b.cgId) {
          return 1;
        }
        const rankA = rankWeights[a.rank] ?? 0;
        const rankB = rankWeights[b.rank] ?? 0;
        return rankB - rankA;
      };
  }, [sorter]);

  return (
    user?.rank !== "SGL" && (
      <div
        className={`max-h-[50vh] min-h-[50vh] w-full overflow-y-scroll rounded-lg bg-white/50${cgm.length > 0 ? "" : " flex flex-col items-center justify-center"}`}
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
            // <table
            //   // style={{ background: "none" }}
            //   className="table table-pin-rows table-xs w-full border-black"
            // >
            //   <thead className="sticky top-0 z-10 bg-[white_!important] text-black">
            //     <tr className="text-black/60">
            //       <th
            //         className={`cursor-pointer${sorter === "name" ? " text-primary" : ""}`}
            //         onClick={() => {
            //           setSorter("name");
            //         }}
            //       >
            //         Name
            //       </th>
            //       {user?.superuser && showCluster && (
            //         <th
            //           className={`cursor-pointer text-end`}
            //           // onClick={() => {
            //           //   setSorter("position");
            //           // }}
            //         >
            //           Cluster
            //         </th>
            //       )}
            //       <th
            //         className={`cursor-pointer text-end${sorter === "position" ? " text-primary" : ""}`}
            //         onClick={() => {
            //           setSorter("position");
            //         }}
            //       >
            //         Position
            //       </th>

            //       <th
            //         onClick={() => {
            //           setSorter("status");
            //         }}
            //         className={`cursor-pointer text-end${sorter === "status" ? " text-primary" : ""}`}
            //       >
            //         Status
            //       </th>
            //       {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
            //       {user?.superuser ||
            //       user?.rank === "Coach" ||
            //       user?.rank === "TL_Pastor" ? (
            //         <th
            //           className={`cursor-pointer text-end${sorter === "cg" ? " text-primary" : ""}`}
            //           onClick={() => {
            //             setSorter("cg");
            //           }}
            //         >
            //           CG
            //         </th>
            //       ) : null}
            //       <th className="text-end">Discipleship</th>
            //     </tr>
            //   </thead>
            //   <tbody>
            //     {cgm
            //       .filter(
            //         (a) =>
            //           a.userId !== user?.id &&
            //           (user?.superuser ? true : a.rank !== "Coach"),
            //       )
            //       .sort(sortFn)
            //       .map((item, i) => (
            //         <tr key={i}>
            //           <td>
            //             <div className="text-xs font-bold text-neutral-800">
            //               {item.name}
            //             </div>
            //           </td>
            //           {user?.superuser && showCluster && (
            //             <td>
            //               <div className="text-end text-xs font-bold capitalize text-neutral-800">
            //                 {item.Cg?.clusterId}
            //               </div>
            //             </td>
            //           )}
            //           <td>
            //             <div className="text-end text-xs font-bold text-neutral-800">
            //               {item.rank}
            //             </div>
            //           </td>

            //           <td>
            //             <div className="flex justify-end gap-1 text-neutral-800">
            //               {item.status === "Healthy" ? (
            //                 <TiTick className="h-5 w-5 text-green-400" />
            //               ) : item.status === "Warning" ? (
            //                 <TiWarning className="h-5 w-5 text-red-400" />
            //               ) : (
            //                 <>
            //                   <TbUrgent className="h-5 w-5 text-red-600" />
            //                   <TiWarning className="h-5 w-5 text-red-400" />
            //                 </>
            //               )}
            //             </div>
            //           </td>
            //           {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
            //           {user?.superuser ||
            //           user?.rank === "Coach" ||
            //           user?.rank === "TL_Pastor" ? (
            //             <td>
            //               <div className="text-end text-xs font-bold text-neutral-800">
            //                 {item.cgId}
            //               </div>
            //             </td>
            //           ) : null}
            //           <td>
            //             <div className="flex h-full flex-row items-center justify-end">
            //               <TiClipboard
            //                 onClick={() => {
            //                   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            //                   setCGMId(item.id);
            //                   (
            //                     document.getElementById(
            //                       "discipleship-data",
            //                     ) as HTMLDialogElement
            //                   ).showModal();
            //                 }}
            //                 className="h-5 w-5 cursor-pointer text-neutral-800"
            //               />
            //             </div>
            //           </td>
            //         </tr>
            //       ))}
            //   </tbody>
            // </table>

            <div className="flex w-full flex-col gap-1.5 p-3">
              {cgm.sort(sortFn).map((item) => (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setCGMId(item.id);
                    (
                      document.getElementById(
                        "discipleship-data",
                      ) as HTMLDialogElement
                    ).showModal();
                  }}
                  key={item.id}
                  className="flex w-full flex-row items-center justify-between gap-1.5 rounded-md bg-white p-2"
                >
                  <div className="rounded-md px-2 text-black">
                    <p
                      title={item.name}
                      className="max-w-[150px] truncate text-sm font-bold"
                    >
                      {item.name}
                    </p>
                    <div className="text-xs text-black/70">
                      {item.rank} | {item.cgId} | {item.Cg?.clusterId}
                    </div>
                  </div>
                  <div className="">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setCGMLookupId(item.id);
                        (
                          document.getElementById(
                            "edit_cgm_profile",
                          ) as HTMLDialogElement
                        ).showModal();
                      }}
                      className="flex flex-row items-center gap-0.5 rounded-md bg-purple-400 px-2 py-1 text-black"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-black">No Data Found.</p>
          )
        ) : null}
      </div>
    )
  );
};
