import { DiscipleshipField } from "@/components/Display/discipleship/Field";
import { DispicleshipDataDialog } from "@/components/Display/discipleship/dialog";
// import { Field } from "@/components/Display/general/Form/Field";
import { Table } from "@/components/Display/general/Table";
import { useCGM } from "@/stores/useCGM";
import { useUser } from "@/stores/useUser";
import type { DiscipleshipStatus, Rank, CGMs } from "@prisma/client";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export type AddCGMForm = {
  name: string;
  rank: Rank;
  discipleshipStatus: DiscipleshipStatus;
  cg: string;
};

const DiscipleshipIndexPage = () => {
  const router = useRouter();
  const { user } = useUser();

  const [mounted, setMounted] = useState(false);
  const [cgmId, setCGMId] = useState<string>("");
  const { setCGMs, reloadCG } = useCGM();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (!mounted) return;
      if (e.key !== "Escape") return;
      e.preventDefault();
    });

    return () => {
      document.removeEventListener("keydown", (e: KeyboardEvent) => {
        if (!mounted) return;
        if (e.key !== "Escape") return;
        e.preventDefault();
      });
    };
  }, [mounted]);

  useEffect(() => {
    if (!user) {
      void router.replace("/");
      return;
    }
    if (
      user.rank === "SGL" ||
      user.rank === "OM" ||
      user.rank === "NB" ||
      user.rank === "NF" ||
      !user.cgId
    ) {
      void router.replace("/");
      return;
    }

    void (async () =>
      await fetch(`/api/cgm?cgId=${user.superuser ? "all" : user.cgId}`, {
        method: "GET",
      }).then(
        async (res) =>
          await res.json().then((response: CGMs[]) => {
            void setCGMs(response);
          }),
      ))();
  }, [user, router, setCGMs]);

  return (
    <>
      <Head>
        <title>Discipleship | YWKL</title>
        <meta name="description" content="YWKL Discipleship Center" />
        <link rel="icon" href="/assets/YW_Logo.png" />
      </Head>
      <main
        data-theme="dracula"
        style={{
          background: `url("/assets/V24_BG_Vertical.jpg")`,
        }}
        className={`relative flex min-h-screen flex-col items-center bg-cover bg-center px-5 py-12`}
      >
        <dialog
          id="add-cgm"
          className="modal focus-within:outline-none focus-visible:outline-none"
        >
          <div className="modal-box bg-[#31925a]">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h1 className="pb-4 text-center font-made text-2xl tracking-tight text-[#e1f255] shadow-black text-shadow-sm">
              Add CGM
            </h1>
            <Formik<AddCGMForm>
              initialValues={{
                discipleshipStatus: "Healthy",
                name: "",
                rank: "OM",
                cg: user?.cgId ?? "",
              }}
              onSubmit={async (values, action) => {
                console.log(values);

                if (!values.cg) console.log("Invalid CG");

                const tst = toast.loading("Updating Profile");

                const res = await fetch("/api/cgm", {
                  method: "POST",
                  body: JSON.stringify(values),
                });

                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const response: { name: string } = await res.json();

                if (res.ok) {
                  toast.update(tst, {
                    autoClose: 2000,
                    isLoading: false,
                    type: "success",
                    render: () => `CGM ${response.name} added!`,
                  });
                  await reloadCG().then(() =>
                    (
                      document.getElementById("add-cgm") as HTMLDialogElement
                    ).close(),
                  );
                }

                if (!res.ok) {
                  toast.update(tst, {
                    isLoading: false,
                    autoClose: 1500,
                    type: "error",
                    render: () => "Something Unexpected Happened..",
                  });
                }

                action.setSubmitting(false);
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Required."),
              })}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-2">
                  <DiscipleshipField<AddCGMForm>
                    disabled={isSubmitting}
                    label={"CGM Name"}
                    formikKey={"name"}
                  />
                  <DiscipleshipField<AddCGMForm>
                    disabled={isSubmitting}
                    label={"Status"}
                    formikKey={"rank"}
                    as="select"
                    options={[
                      "NF",
                      "NB",
                      "OM",
                      "SGL",
                      "CGL",
                      "Coach",
                      "TL/Pastor",
                    ]}
                  />
                  <DiscipleshipField<AddCGMForm>
                    disabled={isSubmitting}
                    label={"Discipleship Status"}
                    formikKey={"discipleshipStatus"}
                    as="select"
                    options={["Healthy", "Warning", "Alert"]}
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
        </dialog>
        <DispicleshipDataDialog cgmId={cgmId} />
        <h1 className="w-full pb-5 text-center font-made text-3xl font-bold uppercase text-[#e1f255] shadow-black text-shadow-hard">
          Discipleship
        </h1>
        <Table cgId={String(user?.cgId)} setCGMId={setCGMId} />
        <div className="flex w-full flex-col items-center gap-2 pt-5">
          <button
            onClick={() => {
              (
                document.getElementById("add-cgm") as HTMLDialogElement
              ).showModal();
            }}
            className="flex w-full items-center justify-center rounded-xl bg-[#31925a] px-1 py-2 font-made text-lg text-white"
          >
            Add NB / NF / OM
          </button>
          <button className="flex w-full items-center justify-center rounded-xl bg-[#45c178] px-1 py-2 font-made text-lg text-white">
            Discipleship
          </button>
        </div>
      </main>
    </>
  );
};

export default DiscipleshipIndexPage;
