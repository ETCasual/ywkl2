/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCGM } from "@/stores/useCGM";
import { useUser } from "@/stores/useUser";
import type { DiscipleshipStatus } from "@prisma/client";
import { Form, Formik } from "formik";
import { useEffect, useState, type FunctionComponent } from "react";
import { Rings } from "react-loader-spinner";
import { DiscipleshipField } from "./Field";
import * as Yup from "yup";
import { TiTick, TiWarning } from "react-icons/ti";
import { TbUrgent } from "react-icons/tb";
import { toast } from "react-toastify";

type ReturnedDiscipleshipData = {
  created_at: Date;
  meet_by: { display_name: string; name: string };
  note: string;
  assigned_status: DiscipleshipStatus;
};

export const DispicleshipDataDialog: FunctionComponent<{ cgmId: string }> = ({
  cgmId,
}) => {
  const [discipleshipData, setDiscipleshipData] = useState<
    ReturnedDiscipleshipData[] | undefined
  >(undefined);

  const { cgm } = useCGM();

  useEffect(() => {
    if (!cgmId) return;
    void (async () =>
      await fetch(`/api/discipleship?cgmId=${cgmId}`, { method: "GET" }).then(
        async (res) =>
          await res.json().then((response: ReturnedDiscipleshipData[]) => {
            setDiscipleshipData(response);
            console.log(response);
          }),
      ))();
  }, [cgmId]);

  return (
    <dialog
      id="discipleship-data"
      className="modal focus-within:outline-none focus-visible:outline-none"
    >
      <div className="modal-box flex max-h-[50vh] flex-col items-center justify-center overflow-y-auto bg-[#31925a]">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            onClick={() => setDiscipleshipData(undefined)}
            className="btn btn-circle btn-ghost btn-sm fixed right-2 top-2"
          >
            ✕
          </button>
        </form>
        {cgm.length > 0 && (
          <h1 className="pb-4 text-center font-made text-2xl text-[#e1f255] shadow-black text-shadow-sm">
            {cgm?.find((a) => a.id === cgmId)?.name}
          </h1>
        )}
        {typeof discipleshipData === "undefined" ? (
          <Rings
            visible={true}
            height="200"
            width="200"
            color="#e1f255"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : discipleshipData.length === 0 ? (
          <div className="flex w-full flex-col p-4 text-center">
            No Discipleship Data Found.
          </div>
        ) : (
          <div className="flex max-h-[400px] w-full flex-col gap-2 overflow-y-auto p-4">
            {discipleshipData.map((d, i) => (
              <DiscipleshipData
                key={i}
                by={d.meet_by.display_name ?? d.meet_by.name}
                date={String(d.created_at)}
                note={d.note}
                status={d.assigned_status}
              />
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
};

interface DiscipleshipDataProps {
  by: string;
  date: string;
  note: string;
  status: DiscipleshipStatus;
}
const DiscipleshipData: FunctionComponent<DiscipleshipDataProps> = ({
  by,
  date,
  note,
  status,
}) => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-white/30 p-3">
      <div className="flex flex-col justify-between pb-2 md:flex-row md:items-center">
        <div className="flex flex-row items-center">
          <p className="pr-2 font-sans font-bold">By: {by} </p>
          {status === "Healthy" ? (
            <TiTick className="h-5 w-5 text-green-400" />
          ) : status === "Warning" ? (
            <TiWarning className="h-5 w-5 text-red-400" />
          ) : (
            <>
              <TbUrgent className="h-5 w-5 text-red-600" />
              <TiWarning className="h-5 w-5 text-red-400" />
            </>
          )}
        </div>
        <p className="text-xs italic">
          {new Date(date).toLocaleDateString("en-GB", { dateStyle: "long" })}
        </p>
      </div>
      <p className="max-h-[110px] overflow-y-auto text-justify md:max-h-[70px]">
        {note}
      </p>
    </div>
  );
};

export type SubmitDiscipleshipForm = {
  by: string;
  cgmId: string;
  note: string;
  status: DiscipleshipStatus;
};

export const SubmitDiscipleshipDialog = () => {
  const { user } = useUser();
  const { cgm } = useCGM();

  return (
    <dialog
      id="submit-discipleship"
      className="modal focus-within:outline-none focus-visible:outline-none"
    >
      <div className="modal-box flex flex-col items-center justify-center bg-[#31925a]">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h1 className="pb-4 text-center font-made text-2xl text-[#e1f255] shadow-black text-shadow-sm">
          Submit Discipleship
        </h1>

        <div className="flex w-full flex-col p-4">
          <Formik<SubmitDiscipleshipForm>
            initialValues={{
              by: user?.id ?? "",
              cgmId: String(
                cgm
                  .filter((a) => a.userId !== user?.id)
                  .flatMap((cg) => {
                    return { label: cg.name, value: cg.id };
                  })[0]?.value,
              ),
              note: "",
              status: "Healthy",
            }}
            onSubmit={async (values, actions) => {
              const tst = toast.loading("Updating Profile");
              const res = await fetch("/api/discipleship", {
                method: "POST",
                body: JSON.stringify(values),
              });

              if (res.ok) {
                actions.resetForm();
                toast.update(tst, {
                  autoClose: 2000,
                  isLoading: false,
                  type: "success",
                  render: () => "Uploaded!",
                });
              }

              if (!res.ok) {
                toast.update(tst, {
                  isLoading: false,
                  type: "error",
                  autoClose: 1500,
                  render: () => "Something Unexpected Happened..",
                });
              }

              actions.setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
              cgmId: Yup.string().required("Required."),
              note: Yup.string().required("Required."),
            })}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-full flex-col gap-2">
                <DiscipleshipField<SubmitDiscipleshipForm>
                  disabled={isSubmitting}
                  formikKey="cgmId"
                  label="CGM"
                  as="select"
                  options={cgm
                    .filter((a) => a.userId !== user?.id)
                    .flatMap((cg) => {
                      return { label: cg.name, value: cg.id };
                    })}
                />
                <DiscipleshipField<SubmitDiscipleshipForm>
                  disabled={isSubmitting}
                  formikKey="status"
                  label="status"
                  as="select"
                  options={[
                    { label: "Healthy", value: "Healthy" },
                    { label: "Alert", value: "Alert" },
                    { label: "Warning", value: "Warning" },
                  ]}
                />
                <DiscipleshipField<SubmitDiscipleshipForm>
                  disabled={isSubmitting}
                  formikKey="note"
                  label="Note"
                  as="textarea"
                />
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-xl bg-[#45c178] px-1 py-2 font-made text-lg text-white"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </dialog>
  );
};
