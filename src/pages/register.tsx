import { useUser } from "@/stores/useUser";
import { type User } from "@prisma/client";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import checkmark from "react-useanimations/lib/checkmark";
import * as Yup from "yup";

export type FormikRegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const { setUser, setRegistrationStatus } = useUser();
  const router = useRouter();

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-[#191919]"
      data-theme="dracula"
    >
      <div className="flex w-full max-w-[300px] flex-col items-center justify-center">
        <p className="pb-3 text-center font-made text-2xl uppercase tracking-wider">
          Register
        </p>
        <Formik<FormikRegisterForm>
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (values, actions) => {
            const res = await fetch("/api/register", {
              method: "POST",
              body: JSON.stringify(values),
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const response: User = await res.json();

            if (res.status === 302)
              toast.error("Email Already Exists!", {
                icon: () => "⚠️",
              });

            if (res.ok) {
              await toast
                .promise(new Promise((resolve) => setTimeout(resolve, 1200)), {
                  pending: {
                    render: () => "Registered successfully.",
                    icon: (
                      <UseAnimations
                        animation={checkmark}
                        pathCss="stroke: green; stroke-width: 5px;"
                      />
                    ),
                  },
                  success: {
                    render: () => "Logging You In...",

                    icon: () => <UseAnimations animation={activity} />,
                  },
                })
                .then(async () => {
                  setRegistrationStatus(false);
                  await setUser(response).then(
                    async () => await router.push("/"),
                  );
                });
            }
            actions.setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email("Invalid Format.").required("Required."),
            password: Yup.string()
              .required("Required.")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
              ),
            confirmPassword: Yup.string()
              .required("Required.")
              .oneOf([Yup.ref("password"), ""], "Passwords must match"),
          })}
        >
          {({ errors, isSubmitting }) => {
            return (
              <Form className="flex w-full flex-col gap-2">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-5 w-5 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <Field
                    name="email"
                    id="email"
                    type="text"
                    className="grow bg-transparent"
                    placeholder="Email"
                    disabled={isSubmitting}
                  />
                </label>
                <p className="w-full text-end font-serif text-xs italic text-red-500">
                  {errors.email}
                </p>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-5 w-5 opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </svg>
                  <Field
                    name="password"
                    id="password"
                    type="password"
                    className="grow bg-transparent"
                    placeholder="Password"
                    disabled={isSubmitting}
                  />
                </label>
                <p className="w-full text-end font-serif text-xs italic text-red-500">
                  {errors.password}
                </p>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-5 w-5 opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </svg>
                  <Field
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    className="grow bg-transparent"
                    placeholder="Retype Password"
                    disabled={isSubmitting}
                  />
                </label>
                <p className="w-full text-end font-serif text-xs italic text-red-500">
                  {errors.confirmPassword}
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-success mt-3 h-[2.5rem] min-h-[2.5rem] w-full"
                >
                  Register
                </button>
              </Form>
            );
          }}
        </Formik>
        <p className="w-full pt-2 text-end text-xs text-white">
          Already have an account?{" "}
          <Link href={"/login"} className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
