import { TiClipboard, TiWarning, TiTick } from "react-icons/ti";
import { TbUrgent } from "react-icons/tb";

type Status = "warning" | "danger" | "done";

type TableInfo = {
  name: string;
  status: Status;
  by: string;
  remark: string;
  position: string;
};
function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    // @ts-expect-error unable to know what type is passed for now
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
const test = new Array<TableInfo>(25)
  .fill(
    {
      name: "Alice",
      status: "danger",
      by: "John",
      remark: "Require leaders attention",
      position: "NF",
    },
    0,
    8,
  )
  .fill(
    {
      name: "John",
      status: "done",
      by: "Maggie",
      remark: "Teachable",
      position: "OM",
    },
    8,
    17,
  )
  .fill(
    {
      name: "Maggie",
      status: "warning",
      by: "Ah Mao",
      remark: "2 months no meet up",
      position: "NB",
    },
    17,
  );
export const Table = () => {
  return (
    <div className="max-h-[50vh] w-full overflow-x-hidden overflow-y-scroll rounded-lg bg-white/50">
      <table
        // style={{ background: "none" }}
        className="table-xs table-pin-rows table w-full border-black"
      >
        <thead className="sticky top-0 z-10 bg-[white_!important] text-black">
          <tr className="text-black/60">
            <th>Name</th>
            <th className="text-end">Position</th>
            <th className="text-end">Status</th>
            <th className="text-end">By</th>
            <th className="text-end">Note</th>
          </tr>
        </thead>
        <tbody>
          {shuffle(test).map((item, i) => (
            <tr key={i}>
              <td>
                <div className="text-xs font-bold text-neutral-800">
                  {item.name}
                </div>
              </td>
              <td>
                <div className="text-xs font-bold text-neutral-800">
                  {item.position}
                </div>
              </td>
              <td>
                <div className="flex justify-end gap-1 text-neutral-800">
                  {item.status === "done" ? (
                    <TiTick className="h-5 w-5 text-green-400" />
                  ) : item.status === "warning" ? (
                    <TiWarning className="h-5 w-5 text-red-400" />
                  ) : (
                    <>
                      <TbUrgent className="h-5 w-5 text-red-600" />
                      <TiWarning className="h-5 w-5 text-red-400" />
                    </>
                  )}
                </div>
              </td>
              <td>
                <div className="text-end text-xs font-bold text-neutral-800">
                  {item.by}
                </div>
              </td>
              <td className="flex justify-end">
                <div className="tooltip tooltip-left" data-tip={item.remark}>
                  <TiClipboard className="h-5 w-5 text-neutral-800" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
