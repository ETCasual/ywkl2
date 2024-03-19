/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCGM } from "@/stores/useCGM";
import { type Discipleship } from "@prisma/client";
import { useEffect, useState, type FunctionComponent } from "react";
import { Rings } from "react-loader-spinner";

export const DispicleshipDataDialog: FunctionComponent<{ cgmId: string }> = ({
  cgmId,
}) => {
  const [discipleshipData, setDiscipleshipData] = useState<Discipleship[]>();

  const { cgm } = useCGM();

  useEffect(() => {
    void (async () =>
      await fetch(`/api/discipleship?cgmId=${cgmId}`, { method: "GET" }).then(
        async (res) =>
          await res
            .json()
            .then((response: Discipleship[]) => setDiscipleshipData(response)),
      ))();
  }, [cgmId]);

  return (
    <dialog
      id="discipleship-data"
      className="modal focus-within:outline-none focus-visible:outline-none"
    >
      <div className="modal-box flex flex-col items-center justify-center bg-[#31925a]">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        {cgm.length > 0 && (
          <h1 className="pb-4 text-center font-made text-2xl text-[#e1f255] shadow-black text-shadow-sm">
            {cgm?.find((a) => a.id === cgmId)?.name}
          </h1>
        )}
        {discipleshipData ? (
          <table className="table table-pin-rows table-xs"></table>
        ) : (
          <Rings
            visible={true}
            height="200"
            width="200"
            color="#e1f255"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </div>
    </dialog>
  );
};
