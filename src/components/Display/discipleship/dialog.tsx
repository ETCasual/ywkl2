/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCGM } from "@/stores/useCGM";
import { useUser } from "@/stores/useUser";
import type { Cg, DiscipleshipStatus } from "@prisma/client";
import { Form, Formik } from "formik";
import type { CGMs } from "@prisma/client";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  type FunctionComponent,
} from "react";
import { Rings } from "react-loader-spinner";
import { DiscipleshipField } from "./Field";
import * as Yup from "yup";
import { TiTick, TiWarning } from "react-icons/ti";
import { TbUrgent } from "react-icons/tb";
import { toast } from "react-toastify";
import { type CGData } from "@/pages";
import { type AddCGMForm } from "@/pages/discipleship";
// import { Field } from "../general/Form/Field";

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
            console.log("discipleship", response);
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
  cg: string;
  note: string;
  status: DiscipleshipStatus;
};

export const SubmitDiscipleshipDialog = () => {
  const { user } = useUser();
  const { cgm } = useCGM();

  const eligible =
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    !user?.superuser ||
    (user?.rank === "TL_Pastor" && !user?.leaderToCluster && !user?.as_cgm);

  const [tempCGMs, setTempCGMs] = useState<CGMs[]>([]);
  const [cgs, setCGs] = useState<CGData[]>([]);

  // const [cgs, setCgs] = useState<CGData[]>([]);
  // const formikRef = useRef<FormikProps<ChangeViewForm>>(null);
  const [selectedCluster, setSelectedCluster] = useState("");

  // useEffect(() => {
  //   if (cgs.length > 0) return;
  //   void (async () => {
  //     await fetch("/api/cg", { method: "GET" }).then((s) =>
  //       s.json().then((res: CGData[]) => setCgs(res)),
  //     );
  //   })();
  // }, [cgs.length]);

  useEffect(() => {
    if (!eligible) return;

    const getTempCGMs = async () => {
      await fetch("/api/cgm?cgId=all", { method: "GET" }).then((res) =>
        res.json().then((r: (CGMs & { Cg: Cg })[]) => {
          setTempCGMs(r);
        }),
      );
    };

    void getTempCGMs();
  }, [eligible]);

  useEffect(() => {
    if (cgs.length > 0) return;
    void (async () => {
      await fetch("/api/cg", { method: "GET" }).then((s) =>
        s.json().then((res: CGData[]) => setCGs(res)),
      );
    })();
  }, [cgs.length]);

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
          {eligible ? (
            tempCGMs &&
            tempCGMs.length > 0 && (
              <>
                <Formik<SubmitDiscipleshipForm>
                  enableReinitialize
                  initialValues={{
                    by: user?.id ?? "",
                    cg: "",
                    cgmId: String(
                      tempCGMs
                        .filter((a) => a.userId !== user?.id)
                        .sort((a, b) => {
                          if (a.cgId < b.cgId) {
                            return -1;
                          }
                          if (a.cgId > b.cgId) {
                            return 1;
                          }
                          return 0;
                        })
                        .flatMap((t) => {
                          return {
                            label: `${t.name}`,
                            value: t.id,
                          };
                        })[0]?.value,
                    ),
                    note: "",
                    status: "Healthy",
                  }}
                  onSubmit={async (values, actions) => {
                    // console.log(values);
                    const tst = toast.loading("Updating...");
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
                      (
                        document.getElementById(
                          "submit-discipleship",
                        ) as HTMLDialogElement
                      ).close();
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
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="flex w-full flex-col gap-2">
                      {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
                      {(user?.superuser || user?.rank === "TL_Pastor") && (
                        <div className="flex w-full flex-col">
                          <div className="flex h-full w-full flex-row items-center">
                            <div className="h-full min-w-[66px] rounded-l-lg bg-[#e1f255] py-1.5 pl-2 pr-3 text-sm text-black">
                              Cluster:
                            </div>
                            <div className="flex w-full flex-row items-center gap-2 rounded-r-lg bg-[#45c178]">
                              <select
                                // as={as ?? "input"}
                                // id={formikKey}
                                // name={String(formikKey)}
                                // disabled={disabled}
                                // placeholder={label ?? formikKey}
                                onChange={async (e) => {
                                  // console.log(e.currentTarget.value);
                                  setSelectedCluster(e.currentTarget.value);
                                  const value = !e.currentTarget.value
                                    ? ""
                                    : cgm.filter((cg) => {
                                        if (!e.currentTarget.value) return true;
                                        return (
                                          cg.Cg.clusterId ===
                                          e.currentTarget.value
                                        );
                                      })[0]?.cgId;

                                  await setFieldValue("cg", value);

                                  // console.log(e.currentTarget?.value);
                                  // if (!e.currentTarget?.value)
                                  //   (
                                  //     document.getElementById(
                                  //       "change-view",
                                  //     ) as HTMLDialogElement
                                  //   ).close();
                                }}
                                className={`select select-secondary select-sm w-full rounded-md border-none bg-transparent px-2 outline-none`}
                              >
                                {[
                                  { label: "All Cluster", value: "" },
                                  ...cgm
                                    .map((cgd) => cgd.Cg.clusterId)
                                    .filter(
                                      (clusterId, i, self) =>
                                        self.indexOf(clusterId) === i,
                                    )
                                    .map((v) => ({
                                      label:
                                        v === "core_leaders"
                                          ? "Core Leaders"
                                          : v.charAt(0).toUpperCase() +
                                            v.slice(1),
                                      value: v,
                                    })),
                                ]?.map((s, i) => (
                                  <option
                                    className="text-black"
                                    key={i}
                                    value={s.value ?? s.label}
                                  >
                                    {s.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="min-h-[24px]" />
                        </div>
                      )}
                      {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
                      {(user?.superuser || user?.rank === "TL_Pastor") && (
                        <div className="flex w-full flex-col">
                          <div className="flex h-full w-full flex-row items-center">
                            <div className="h-full min-w-[66px] rounded-l-lg bg-[#e1f255] py-1.5 pl-2 pr-3 text-sm text-black">
                              CG:
                            </div>
                            <div className="flex w-full flex-row items-center gap-2 rounded-r-lg bg-[#45c178]">
                              <select
                                // as={as ?? "input"}
                                // id={formikKey}
                                // name={String(formikKey)}
                                // disabled={disabled}
                                // placeholder={label ?? formikKey}
                                onChange={async (e) => {
                                  // console.log(e.currentTarget.value);
                                  const value = !e.currentTarget.value
                                    ? ""
                                    : cgm.filter((cg) => {
                                        if (!e.currentTarget.value) return true;
                                        return (
                                          cg.Cg.id === e.currentTarget.value
                                        );
                                      })[0]?.cgId;

                                  await setFieldValue("cg", value);
                                  await setFieldValue(
                                    "cgmId",
                                    tempCGMs
                                      .filter(
                                        (a) =>
                                          a.userId !== user?.id &&
                                          a.cgId === value,
                                      )
                                      .sort((a, b) => {
                                        if (a.cgId < b.cgId) {
                                          return -1;
                                        }
                                        if (a.cgId > b.cgId) {
                                          return 1;
                                        }
                                        return 0;
                                      })[0]?.id,
                                  );
                                  // await setFieldValue("cg", null);

                                  // console.log(e.currentTarget?.value);
                                  // if (!e.currentTarget?.value)
                                  //   (
                                  //     document.getElementById(
                                  //       "change-view",
                                  //     ) as HTMLDialogElement
                                  //   ).close();
                                }}
                                className={`select select-secondary select-sm w-full rounded-md border-none bg-transparent px-2 outline-none`}
                              >
                                {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
                                {eligible ? (
                                  cgm
                                    .filter((cg) => {
                                      if (!selectedCluster) return true;
                                      return (
                                        cg.Cg.clusterId === selectedCluster
                                      );
                                    })
                                    .map((cg) => cg.Cg.id)
                                    .filter(
                                      (clusterId, i, self) =>
                                        self.indexOf(clusterId) === i,
                                    )
                                    .map((cgd) => {
                                      return (
                                        <option
                                          className="text-black"
                                          key={cgd}
                                          value={cgd}
                                        >
                                          {cgd === "core_leaders"
                                            ? "Core Leaders"
                                            : `${cgd.charAt(0).toUpperCase()}${cgd.slice(1)} - ${cgs.find((a) => a.id === cgd)?.LeaderToCG.leader.name}`}
                                        </option>
                                      );
                                    })
                                ) : user?.rank === "Coach" ? (
                                  user?.coaching_on?.map((co) => (
                                    <option
                                      className="text-black"
                                      key={co.id}
                                      value={co.id}
                                    >
                                      {co.id}
                                    </option>
                                  ))
                                ) : (
                                  <option
                                    className="text-black"
                                    value={String(user?.as_cgm?.cgId)}
                                  >
                                    {String(user?.as_cgm?.cgId)}
                                  </option>
                                )}
                              </select>
                            </div>
                          </div>
                          <div className="min-h-[24px]" />
                        </div>
                      )}
                      {/* <DiscipleshipField<SubmitDiscipleshipForm>
                        disabled={isSubmitting}
                        label={"CG"}
                        formikKey={"cg"}
                        as="select"
                        
                      /> */}

                      <div className="flex w-full flex-col">
                        <div className="flex w-full flex-row items-center gap-2 rounded-lg bg-[#45c178]">
                          <select
                            className={`select select-secondary select-sm w-full rounded-md border-none bg-transparent px-2 outline-none`}
                            onChange={async (e) => {
                              await setFieldValue(
                                "cgmId",
                                e.currentTarget.value,
                              );
                            }}
                          >
                            {tempCGMs
                              .filter(
                                (a) =>
                                  a.userId !== user?.id && a.cgId === values.cg,
                              )
                              .sort((a, b) => {
                                if (a.cgId < b.cgId) {
                                  return -1;
                                }
                                if (a.cgId > b.cgId) {
                                  return 1;
                                }
                                return 0;
                              })
                              .flatMap((cg) => {
                                return (
                                  <option className="text-black" value={cg.id}>
                                    {cg.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="min-h-[24px]" />
                      </div>

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
              </>
            )
          ) : (
            <Formik<SubmitDiscipleshipForm>
              initialValues={{
                cg: "",
                by: user?.id ?? "",
                cgmId: String(
                  cgm
                    .filter((a) => a.userId !== user?.id)
                    .flatMap((cg) => {
                      return { label: `${cg.name}`, value: cg.id };
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
                  (
                    document.getElementById(
                      "submit-discipleship",
                    ) as HTMLDialogElement
                  ).close();
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
                      .sort((a, b) => {
                        if (a.cgId < b.cgId) {
                          return -1;
                        }
                        if (a.cgId > b.cgId) {
                          return 1;
                        }
                        return 0;
                      })
                      .flatMap((cg) => {
                        return {
                          label: `${cg.cgId} - ${cg.name}`,
                          value: cg.id,
                        };
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
          )}
        </div>
      </div>
    </dialog>
  );
};

export type ChangeViewForm = {
  cgId: string;
  clusterId: string;
};

export const ChangeViewDialog: FunctionComponent<
  { cgId: string } & { setCGId: Dispatch<SetStateAction<string>> }
> = ({ cgId, setCGId }) => {
  // console.warn("cgid", cgId);
  const [cgs, setCgs] = useState<CGData[]>([]);
  // const formikRef = useRef<FormikProps<ChangeViewForm>>(null);
  const [selectedCluster, setSelectedCluster] = useState("");

  useEffect(() => {
    if (cgs.length > 0) return;
    void (async () => {
      await fetch("/api/cg", { method: "GET" }).then((s) =>
        s.json().then((res: CGData[]) => setCgs(res)),
      );
    })();
  }, [cgs.length]);

  // useEffect(() => {
  //   if (!formikRef.current) return;

  //   // void formikRef.current.setFieldValue(
  //   //   "cgId",
  //   console.log(
  //     cgs.filter((cg) => {
  //       if (!formikRef.current?.values.clusterId) return true;
  //       return cg.clusterId === formikRef.current?.values.clusterId;
  //     })[0]?.id,
  //   );
  //   // );
  // }, [cgs, formikRef.current?.values.clusterId]);

  return (
    <dialog
      id="change-view"
      className="modal focus-within:outline-none focus-visible:outline-none"
    >
      <div className="modal-box flex max-h-[50vh] flex-col items-center justify-center overflow-y-auto bg-[#31925a]">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-circle btn-ghost btn-sm fixed right-2 top-2">
            ✕
          </button>
        </form>
        <h1 className="pb-4 text-center font-made text-2xl text-[#e1f255] shadow-black text-shadow-sm">
          View As
        </h1>
        <div className="flex w-full flex-col p-4">
          {cgs.length > 0 ? (
            <Formik<ChangeViewForm>
              // innerRef={formikRef}
              initialValues={{
                cgId: cgId,
                clusterId: "",
              }}
              onSubmit={async (values) => {
                setCGId(values.cgId);
                (
                  document.getElementById("change-view") as HTMLDialogElement
                ).close();
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className="flex w-full flex-row items-center gap-2 rounded-lg bg-[#45c178]">
                    <select
                      // as={as ?? "input"}
                      // id={formikKey}
                      // name={String(formikKey)}
                      // disabled={disabled}
                      // placeholder={label ?? formikKey}
                      onChange={async (e) => {
                        const value = !e.currentTarget.value
                          ? ""
                          : cgs.filter((cg) => {
                              if (!e.currentTarget.value) return true;
                              return cg.clusterId === e.currentTarget.value;
                            })[0]?.id;
                        setSelectedCluster(e.currentTarget.value);

                        await setFieldValue("cgId", value);

                        // console.log(e.currentTarget?.value);
                        // if (!e.currentTarget?.value)
                        //   (
                        //     document.getElementById(
                        //       "change-view",
                        //     ) as HTMLDialogElement
                        //   ).close();
                      }}
                      className={`select select-secondary select-sm w-full rounded-md border-none bg-transparent px-2 outline-none`}
                    >
                      {[
                        { label: "Pastor", value: "" }, // Insert "Select..." as the first option
                        ...cgs
                          .map((cgd) => cgd.clusterId)
                          .filter(
                            (clusterId, i, self) =>
                              self.indexOf(clusterId) === i,
                          )
                          .map((v) => ({
                            label:
                              v === "core_leaders"
                                ? "Core Leaders"
                                : v.charAt(0).toUpperCase() + v.slice(1),
                            value: v,
                          })),
                      ]?.map((s, i) => (
                        <option
                          className="text-black"
                          key={i}
                          value={s.value ?? s.label}
                        >
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="min-h-[24px]" />
                  {/* <DiscipleshipField
                    disabled={isSubmitting}
                    formikKey="clusterId"
                    label="Cluster"
                    as="select"
                    options={[
                      { label: "Pastor", value: "" }, // Insert "Select..." as the first option
                      ...cgs
                        .map((cgd) => cgd.clusterId)
                        .filter(
                          (clusterId, i, self) => self.indexOf(clusterId) === i,
                        )
                        .map((v) => ({
                          label:
                            v === "core_leaders"
                              ? "Core Leaders"
                              : v.charAt(0).toUpperCase() + v.slice(1),
                          value: v,
                        })),
                    ]}
                  /> */}
                  {selectedCluster !== "" && (
                    <DiscipleshipField
                      disabled={isSubmitting}
                      formikKey="cgId"
                      label="CG"
                      as="select"
                      options={[
                        ...cgs
                          .filter((cg) => {
                            if (!selectedCluster) return true;
                            return cg.clusterId === selectedCluster;
                          })
                          .map((cgd) => ({
                            label: `${cgd.id === "core_leaders" ? "Core Leaders" : cgd.id} - ${cgd.LeaderToCG.leader.name}`,
                            value: `${cgd.id}`,
                          })),
                      ]}
                    />
                  )}
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-xl bg-[#45c178] px-1 py-2 font-made text-lg text-white"
                  >
                    Confirm
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="flex w-full flex-row items-center justify-center">
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
          )}
        </div>
      </div>
    </dialog>
  );
};

interface AddCGMDialogProps {
  selectedCGId: string;
}
export const AddCGMDialog: FunctionComponent<AddCGMDialogProps> = ({
  selectedCGId,
}) => {
  const { user } = useUser();
  const { reloadCG } = useCGM();

  const [cgs, setCgs] = useState<CGData[]>([]);
  // const formikRef = useRef<FormikProps<ChangeViewForm>>(null);
  const [selectedCluster, setSelectedCluster] = useState("");

  useEffect(() => {
    if (cgs.length > 0) return;
    void (async () => {
      await fetch("/api/cg", { method: "GET" }).then((s) =>
        s.json().then((res: CGData[]) => setCgs(res)),
      );
    })();
  }, [cgs.length]);

  return (
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
            rank: user?.rank ?? "OM",
            cg: user?.as_cgm?.cgId ?? "",
          }}
          onSubmit={async (values, action) => {
            if (!values.cg) console.log("Invalid CG");

            const tst = toast.loading("Updating Profile");
            const rank = values.rank.replace("/", "_");

            const res = await fetch("/api/cgm", {
              method: "POST",
              body: JSON.stringify({ ...values, rank: rank }),
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
              await reloadCG(
                selectedCGId
                  ? [selectedCGId]
                  : user?.superuser
                    ? ["all"]
                    : user?.rank === "TL_Pastor" && user?.leaderToCluster?.id
                      ? [user?.leaderToCluster?.id]
                      : user?.rank === "Coach"
                        ? user?.coaching_on?.map((co) => co.id)
                        : user?.rank === "CGL" && user.LeaderToCG
                          ? [user.LeaderToCG.cgId]
                          : [""],
              ).then(() =>
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
          {({ isSubmitting, setFieldValue }) => (
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
                  { value: "RNF", label: "RNF" },
                  { value: "NF", label: "NF" },
                  { value: "OM", label: "OM" },
                  { value: "NB", label: "NB" },
                  { value: "SGL", label: "SGL" },
                  { value: "CGL", label: "CGL" },
                  { value: "Coach", label: "Coach" },
                  { value: "TL/Pastor", label: "TL/Pastor" },
                ]}
              />
              {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
              {(user?.superuser || user?.rank === "TL_Pastor") && (
                <div className="flex w-full flex-col">
                  <div className="flex w-full flex-row items-center gap-2 rounded-lg bg-[#45c178]">
                    <select
                      // as={as ?? "input"}
                      // id={formikKey}
                      // name={String(formikKey)}
                      // disabled={disabled}
                      // placeholder={label ?? formikKey}
                      onChange={async (e) => {
                        const value = !e.currentTarget.value
                          ? ""
                          : cgs.filter((cg) => {
                              if (!e.currentTarget.value) return true;
                              return cg.clusterId === e.currentTarget.value;
                            })[0]?.id;
                        setSelectedCluster(e.currentTarget.value);

                        await setFieldValue("cg", value);

                        // console.log(e.currentTarget?.value);
                        // if (!e.currentTarget?.value)
                        //   (
                        //     document.getElementById(
                        //       "change-view",
                        //     ) as HTMLDialogElement
                        //   ).close();
                      }}
                      className={`select select-secondary select-sm w-full rounded-md border-none bg-transparent px-2 outline-none`}
                    >
                      {[
                        { label: "Pastor", value: "" }, // Insert "Select..." as the first option
                        ...cgs
                          .map((cgd) => cgd.clusterId)
                          .filter(
                            (clusterId, i, self) =>
                              self.indexOf(clusterId) === i,
                          )
                          .map((v) => ({
                            label:
                              v === "core_leaders"
                                ? "Core Leaders"
                                : v.charAt(0).toUpperCase() + v.slice(1),
                            value: v,
                          })),
                      ]?.map((s, i) => (
                        <option
                          className="text-black"
                          key={i}
                          value={s.value ?? s.label}
                        >
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="min-h-[24px]" />
                </div>
              )}
              <DiscipleshipField<AddCGMForm>
                disabled={isSubmitting}
                label={"CG"}
                formikKey={"cg"}
                as="select"
                options={
                  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                  user?.superuser || user?.rank === "TL_Pastor"
                    ? cgs
                        .filter((cg) => {
                          if (!selectedCluster) return true;
                          return cg.clusterId === selectedCluster;
                        })
                        .map((cgd) => ({
                          label: `${cgd.id === "core_leaders" ? "Core Leaders" : cgd.id} - ${cgd.LeaderToCG.leader.name}`,
                          value: `${cgd.id}`,
                        }))
                    : user?.rank === "Coach"
                      ? user?.coaching_on?.map((co) => ({
                          value: co.id,
                          label: co.id,
                        }))
                      : [
                          {
                            value: String(user?.as_cgm?.cgId),
                            label: String(user?.as_cgm?.cgId),
                          },
                        ]
                }
              />
              <DiscipleshipField<AddCGMForm>
                disabled={isSubmitting}
                label={"Discipleship Status"}
                formikKey={"discipleshipStatus"}
                as="select"
                options={[
                  { label: "Healthy", value: "Healthy" },
                  { label: "Alert", value: "Healthy" },
                  { label: "Warning", value: "Warning" },
                ]}
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
  );
};
