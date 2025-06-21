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
            <div className="flex w-full flex-col gap-1.5 p-3">
              {(() => {
                const filteredItems = cgm.filter(
                  (item) => item.userId !== user?.id,
                );
                const uniqueCgIds = [
                  ...new Set(filteredItems.map((item) => item.cgId)),
                ];
                const showCgId = uniqueCgIds.length > 1;

                return filteredItems.sort(sortFn).map((item) => (
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
                    className="flex w-full flex-row items-center justify-between gap-1.5 rounded-md bg-white p-1.5"
                  >
                    <div className="flex flex-col gap-0.5 rounded-md px-2 text-black">
                      <p
                        title={item.name}
                        className="max-w-[160px] truncate text-xs font-bold"
                      >
                        {item.name}
                      </p>
                      <div className="flex flex-row items-center gap-0.5">
                        {item.rank === "TL_Pastor" ? (
                          <div className="inline-flex items-center rounded-full bg-purple-100 px-1.5 py-0 text-[10px] font-light text-purple-800">
                            Core Leader
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            <div className="inline-flex items-center rounded-full bg-blue-100 px-1.5 py-0 text-[10px] font-light text-blue-800">
                              {item.rank}
                            </div>
                            {showCgId && (
                              <div className="inline-flex items-center rounded-full bg-green-100 px-1.5 py-0 text-[10px] font-light text-green-800">
                                {item.cgId}
                              </div>
                            )}
                            <div className="inline-flex items-center rounded-full bg-yellow-100 px-1.5 py-0 text-[10px] font-light text-yellow-800">
                              {item.Cg?.clusterId}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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
                      className="flex flex-row items-center rounded-md bg-purple-400 px-2 py-1 text-xs text-black"
                    >
                      Edit Profile
                    </button>
                  </div>
                ));
              })()}
            </div>
          ) : (
            <p className="text-black">No Data Found.</p>
          )
        ) : null}
      </div>
    )
  );
};
