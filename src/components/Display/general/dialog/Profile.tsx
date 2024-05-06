import { type CGData } from "@/pages";
import { useUser } from "@/stores/useUser";
import type { Rank } from "@prisma/client";
import { Form, Formik } from "formik";
import { useEffect, useState, type FunctionComponent } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field } from "../Form/Field";
import { Rings } from "react-loader-spinner";

export type FormikProfileForm = {
  name: string;
  cg: string;
  rank: Rank;
  email: string;
  id: string;
  displayName: string;
  cgmid: string;
};

interface ProfileDialogProps {
  cgs: CGData[];
}

export const ProfileDialog: FunctionComponent<ProfileDialogProps> = ({
  cgs,
}) => {
  const [stage, setStage] = useState(1);
  const { user, setRegistrationStatus, reloadUser } = useUser();

  return (
    <dialog
      id="register-user"
      className="modal focus-within:outline-none focus-visible:outline-none"
    >
      {cgs.length > 0 && user ? (
        <div className="modal-box">
          <h1 className="font-made text-xl tracking-tight text-primary underline underline-offset-4">
            Register Your Profile!
          </h1>
          <Formik<FormikProfileForm>
            initialValues={{
              displayName: user?.display_name ?? "",
              cg: `${cgs[0]?.id} - ${cgs[0]?.LeaderToCG.leader.name}`,
              email: user?.email,
              id: user?.id,
              name: user?.name ?? "",
              rank: user?.rank ?? "Others",
              cgmid: "nothing",
            }}
            validationSchema={Yup.object().shape({
              displayName: Yup.string(),
              name: Yup.string().required("Required."),
              email: Yup.string()
                .email("Invalid Format.")
                .required("Required."),
            })}
            onSubmit={async (values, action) => {
              const tst = toast.loading("Updating Profile");
              const cg = values.cg.split(" - ")[0];
              const rank = values.rank.replace("/", "_");
              alert(JSON.stringify(values, null, 2));
              const res = await fetch("/api/profile", {
                method: "POST",
                body: JSON.stringify({ ...values, rank: rank, cg: cg }),
              });
              if (res.ok) {
                setRegistrationStatus(true);
                await reloadUser();
                (
                  document.getElementById("register-user") as HTMLDialogElement
                ).close();
                toast.update(tst, {
                  autoClose: 2000,
                  isLoading: false,
                  type: "success",
                  render: () => "Profile Updated!",
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

              action.setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors, values }) => (
              <Form className="flex w-full flex-col gap-3 pt-3">
                {stage === 1 ? (
                  <>
                    <Field<FormikProfileForm>
                      disabled={isSubmitting}
                      formikKey="email"
                      label="Confirm Your Email"
                    />
                    <div className="flex w-full flex-col items-center gap-3 md:flex-row">
                      {/* <Field<FormikProfileForm>
                      disabled={isSubmitting}
                      formikKey="name"
                      label="Full Name"
                    /> */}
                      {/* <Field<FormikProfileForm>
                      disabled={isSubmitting}
                      formikKey="displayName"
                      label="Nickname"
                    /> */}
                    </div>
                    <div className="flex w-full flex-col items-center gap-3 md:flex-row">
                      <Field<FormikProfileForm>
                        disabled={isSubmitting}
                        formikKey="cg"
                        label="CG"
                        as="select"
                        options={cgs.map((cgd) => {
                          return {
                            label: `${cgd.id} - ${cgd.LeaderToCG.leader.name}`,
                            value: `${cgd.id} - ${cgd.LeaderToCG.leader.name}`,
                          };
                        })}
                      />
                      {/* <Field<FormikProfileForm>
                      disabled={isSubmitting}
                      formikKey="rank"
                      label="Status"
                      as="select"
                      options={[
                        { value: "Others", label: "Others" },
                        { value: "SGL", label: "SGL" },
                        { value: "CGL", label: "CGL" },
                        { value: "Coach", label: "Coach" },
                        { value: "TL/Pastor", label: "TL/Pastor" },
                      ]}
                    /> */}
                    </div>
                    <div className="h-1 w-full" />
                    <button
                      disabled={Object.keys(errors).length !== 0}
                      type="button"
                      className="btn btn-primary btn-md !h-[unset] !min-h-[unset] py-3"
                      onClick={() => setStage(2)}
                      // onClick={() => console.log(Object.keys(errors))}
                    >
                      Next
                    </button>
                  </>
                ) : stage === 2 ? (
                  <>
                    <CGMNamesSelect
                      cgId={String(values.cg.split(" - ")[0])}
                      disabled={isSubmitting}
                    />

                    <div className="flex w-full flex-row items-center gap-2">
                      <button
                        onClick={async () => {
                          //   await fetch("/api/cgm_profile?cgId=27T", {
                          //     method: "GET",
                          //   }).then(());
                          setStage(1);
                        }}
                        className="btn btn-primary btn-md !h-[unset] !min-h-[unset] py-3"
                        type="button"
                      >
                        Back
                      </button>
                      <button
                        className="btn btn-primary btn-md !h-[unset] !min-h-[unset] py-3"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </>
                ) : null}
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="modal-box flex flex-row items-center justify-center">
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
    </dialog>
  );
};

interface CGMNamesSelectProps {
  disabled: boolean;
  cgId: string;
}

const CGMNamesSelect: FunctionComponent<CGMNamesSelectProps> = ({
  disabled,
  cgId,
}) => {
  const [options, setOptions] = useState<
    { name: string; id: string }[] | undefined
  >();

  useEffect(() => {
    if (!cgId) return;

    const fetchCGMs = async () => {
      await fetch(`/api/cgm_profile?cgId=${cgId}`).then((res) =>
        res.json().then((js: { name: string; id: string }[]) => {
          setOptions(js);
        }),
      );
    };

    void fetchCGMs();
  }, [cgId]);

  return options === undefined ? (
    <div className="flex flex-row items-center justify-center">
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
  ) : options.length > 0 ? (
    <Field<FormikProfileForm>
      disabled={disabled}
      formikKey="cgmid"
      label="Select Your Name"
      as="select"
      options={options.map((o, i) => {
        return {
          selected: i === 0,
          label: o.name,
          value: o.id ? o.id : "nothing",
        };
      })}
    />
  ) : (
    <p className="text-white">No CGM Data in {cgId}</p>
  );
};
