import type { CGMs } from "@prisma/client";
import { Form, Formik, Field } from "formik";
import { useEffect, useState, type FunctionComponent } from "react";
import { Rings } from "react-loader-spinner";
import * as Yup from "yup";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export const EditCGMProfileDialog: FunctionComponent<{
  cgmLookupId: string;
  reloadCG: () => Promise<void>;
  resetCGMLookupId: () => void;
}> = ({ cgmLookupId, reloadCG, resetCGMLookupId }) => {
  const [cgmData, setCGMData] = useState<CGMs | undefined>(undefined);

  useEffect(() => {
    if (!cgmLookupId) return;
    void (async () =>
      await fetch(`/api/get_cgm_by_id?cgmId=${cgmLookupId}`, {
        method: "GET",
      }).then(
        async (res) =>
          await res.json().then((response: CGMs) => {
            setCGMData(response);
          }),
      ))();
  }, [cgmLookupId]);

  return (
    <dialog
      id="edit_cgm_profile"
      className="modal focus-within:outline-none focus-visible:outline-none"
    >
      <div className="modal-box flex max-h-[50vh] flex-col items-center justify-center overflow-y-auto bg-[#31925a]">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            onClick={() => setCGMData(undefined)}
            className="btn btn-circle btn-ghost btn-sm fixed right-2 top-2"
          >
            ✕
          </button>
        </form>
        {cgmData && (
          <h1 className="pb-4 text-center font-made text-2xl text-[#e1f255] shadow-black text-shadow-sm">
            {cgmData?.name}
          </h1>
        )}
        {typeof cgmData === "undefined" ? (
          <Rings
            visible={true}
            height="200"
            width="200"
            color="#e1f255"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <div className="flex max-h-[400px] w-full flex-col gap-2 overflow-y-auto p-4">
            <DataEditSection
              cgm={cgmData}
              reloadCG={reloadCG}
              resetDialog={() => {
                setCGMData(undefined);
                resetCGMLookupId();
              }}
            />
          </div>
        )}
      </div>
    </dialog>
  );
};

interface DataEditSectionProps {
  cgm: CGMs;
  reloadCG: () => Promise<void>;
  resetDialog: () => void;
}
const DataEditSection: FunctionComponent<DataEditSectionProps> = ({
  cgm,
  resetDialog,
  reloadCG,
}) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    rank: Yup.string().required("Rank is required."),
  });

  return (
    <Formik
      initialValues={{
        name: cgm.name,
        rank: cgm.rank,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        const tst = toast.loading("Updating...");
        const res = await fetch("/api/update_cgm_profile", {
          method: "PUT",
          body: JSON.stringify({ ...values, cgmid: cgm.id }),
        });

        if (res.ok) {
          await reloadCG();
          toast.update(tst, {
            autoClose: 2000,
            isLoading: false,
            type: "success",
            render: () => "Submitted!",
          });
          (
            document.getElementById("edit_cgm_profile") as HTMLDialogElement
          ).close();
          resetDialog();
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
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-1 text-sm  font-bold text-white"
            >
              Name
            </label>
            <Field
              name="name"
              type="text"
              disabled={isSubmitting}
              className="input input-secondary input-sm w-full rounded-md border-none bg-[#45c178] outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="rank" className="mb-1 text-sm font-bold text-white">
              Status
            </label>
            <Field
              as="select"
              name="rank"
              disabled={isSubmitting}
              className="select select-secondary select-sm w-full rounded-md border-none bg-[#45c178] outline-none"
            >
              <option value="TL_Pastor">TL_Pastor</option>
              <option value="Coach">Coach</option>
              <option value="CGL">CGL</option>
              <option value="SGL">SGL</option>
              <option value="OM">OM</option>
              <option value="NB">NB</option>
              <option value="RNF">RNF</option>
              <option value="NF">NF</option>
            </Field>
          </div>

          <button
            type="submit"
            className="mt-4 rounded-xl bg-[#45c178] px-1 py-2 font-made text-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <PulseLoader color={"yellow"} speedMultiplier={0.5} size={10} />
            ) : (
              "Submit"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};
