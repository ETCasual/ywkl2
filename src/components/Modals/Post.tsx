/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Dialog, Transition } from "@headlessui/react";
import { Field as FormikField, Form, Formik } from "formik";
import { env } from "@/env.mjs";
import { type FunctionComponent, Fragment, useState } from "react";
import { PulseLoader } from "react-spinners";
import * as Yup from "yup";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

const clans = [
  "调查兵团",
  "宪兵团",
  "驻守兵团",
  "训练兵团",
  "Ministry",
  "Pillars",
];

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

type PostForm = {
  name: string;
  clan: string;
  message: string;
  groupNo: string;
  image?: string;
};

export const PostModal: FunctionComponent<ModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = env.NEXT_PUBLIC_AWS_S3_BUCKET;

    // S3 Region
    const REGION = env.NEXT_PUBLIC_AWS_REGION;

    // S3 Credentials
    AWS.config.update({
      accessKeyId: env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters
    const params = {
      Bucket: S3_BUCKET,
      Key: `${uuidv4()}.${file?.name.split(".")[1]}`,
      Body: file,
    };

    // Uploading file to s3

    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        return console.log(evt.loaded);
      })
      .promise();

    await upload
      .then(() => {
        console.log("File uploaded successfully to S3.");
      })
      .catch((err) => {
        console.error(err);
        alert("Server Error");
      });
    return params.Key || "";
  };

  const [file, setFile] = useState<File | undefined>();
  const firestore = useFirestore();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto font-made">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden border-4 border-b-[12px] border-black bg-white px-6 py-3 pb-1 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Share your story
                </Dialog.Title>
                <div className="mt-2">
                  <Formik<PostForm>
                    initialValues={{
                      name: "",
                      clan: "调查兵团",
                      message: "",
                      groupNo: "",
                    }}
                    validationSchema={Yup.object().shape({
                      name: Yup.string().required("Required."),
                      clan: Yup.string().required("Required."),
                      message: Yup.string()
                        .max(255, "Maximum 255 characters only.")
                        .required("Required."),
                      groupNo: Yup.string()
                        .min(3, "Must be 3 digits.")
                        .max(3, "Must be 3 digits.")
                        .required("Required."),
                    })}
                    onSubmit={async (values, action) => {
                      action.setSubmitting(true);
                      if (file) {
                        // console.log(file);
                        await uploadFile().then(async (data) => {
                          const now = Date.now();
                          await setDoc(
                            doc(
                              firestore,
                              "posts/socialMedia/postings",
                              `${values.clan.replaceAll(
                                "/",
                                "-",
                              )}${values.groupNo.replaceAll(
                                "/",
                                "-",
                              )}${values.name.replaceAll("/", "-")}${now}`,
                            ),
                            {
                              name: values.name,
                              clan: values.clan,
                              timestamp: now,
                              imageUrl: `https://ywkl-image-storage.s3.ap-southeast-1.amazonaws.com/${data}`,
                              message: values.message,
                              groupNo: values.groupNo,
                            },
                          )
                            .then(async () => {
                              await updateDoc(
                                doc(firestore, "posts/settings"),
                                {
                                  count: increment(1),
                                },
                              ).then(() => {
                                alert("Posted!");
                                closeModal();
                              });
                            })
                            .catch((err) => {
                              console.error(err);
                              action.setSubmitting(false);
                            });
                        });
                      } else {
                        const now = Date.now();
                        await setDoc(
                          doc(
                            firestore,
                            "posts/socialMedia/postings",
                            `${values.clan.replaceAll(
                              "/",
                              "-",
                            )}${values.groupNo.replaceAll(
                              "/",
                              "-",
                            )}${values.name.replaceAll("/", "-")}${now}`,
                          ),
                          {
                            name: values.name,
                            clan: values.clan,
                            timestamp: now,
                            imageUrl: "",
                            message: values.message,
                            groupNo: values.groupNo,
                          },
                        )
                          .then(async () => {
                            await updateDoc(doc(firestore, "posts/settings"), {
                              count: increment(1),
                            }).then(() => {
                              alert("Posted!");
                              closeModal();
                            });
                          })
                          .catch((err) => {
                            console.error(err);
                            action.setSubmitting(false);
                          });
                      }
                    }}
                  >
                    {({ isSubmitting, errors }) => (
                      <Form className="flex flex-grow flex-col justify-between pb-3 pt-2 text-black">
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-col">
                            <div className="flex w-full flex-row border-2 border-solid border-black">
                              <div className="flex min-w-[130px] flex-col justify-center border-r-2 border-black bg-[#ff6511]">
                                <label
                                  className="pl-2 align-middle font-made text-sm"
                                  htmlFor={"name"}
                                >
                                  {"Name"}
                                </label>
                              </div>
                              <FormikField
                                name={"name"}
                                disabled={isSubmitting}
                                type={"text"}
                                className={`w-full bg-white p-1 outline-none`}
                              />
                            </div>
                            {errors.name && (
                              <div className="w-full border-x-2 border-b-2 border-black bg-red-600/30 py-1 pr-2 text-right font-made text-xs text-red-600">
                                {errors.name}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex w-full flex-row border-2 border-solid border-black">
                              <div className="flex min-w-[130px] flex-col justify-center border-r-2 border-black bg-[#ff6511]">
                                <label
                                  className="pl-2 align-middle font-made text-sm"
                                  htmlFor={"clan"}
                                >
                                  {"Clan"}
                                </label>
                              </div>
                              <FormikField
                                name={"clan"}
                                as="select"
                                disabled={isSubmitting}
                                className={`w-full bg-white p-1 font-bold outline-none`}
                              >
                                {clans.map((clan) => (
                                  <option key={clan} value={clan}>
                                    {clan}
                                  </option>
                                ))}
                              </FormikField>
                            </div>
                            {errors.clan && (
                              <div className="w-full border-x-2 border-b-2 border-black bg-red-600/30 py-1 pr-2 text-right font-made text-xs text-red-600">
                                {errors.clan}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex w-full flex-row border-2 border-solid border-black">
                              <div className="flex min-w-[130px] flex-col justify-center border-r-2 border-black bg-[#ff6511]">
                                <label
                                  className="pl-2 align-middle font-made text-sm"
                                  htmlFor={"groupNo"}
                                >
                                  {"Group No."}
                                </label>
                              </div>
                              <FormikField
                                name={"groupNo"}
                                disabled={isSubmitting}
                                placeholder="001"
                                className={`w-full bg-white p-1 outline-none`}
                              />
                            </div>
                            {errors.groupNo && (
                              <div className="w-full border-x-2 border-b-2 border-black bg-red-600/30 py-1 pr-2 text-right font-made text-xs text-red-600">
                                {errors.groupNo}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex min-w-[130px] flex-col justify-center border-2 border-black bg-[#ff6511]">
                              <label
                                className="pl-2 align-middle font-made text-sm"
                                htmlFor={"message"}
                              >
                                {"What do you want to share?"}
                              </label>
                            </div>
                            <div className="flex w-full flex-row border-x-2 border-b-2 border-solid border-black">
                              <FormikField
                                name={"message"}
                                disabled={isSubmitting}
                                as="textarea"
                                className={`w-full resize-none bg-white p-1 outline-none`}
                              />
                            </div>
                            {errors.message && (
                              <div className="w-full border-x-2 border-b-2 border-black bg-red-600/30 py-1 pr-2 text-right font-made text-xs text-red-600">
                                {errors.message}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex w-full flex-row border-2 border-solid border-black">
                              <div className="flex min-w-[130px] flex-col justify-center border-r-2 border-black bg-[#ff6511]">
                                <label
                                  className="pl-2 align-middle font-made text-sm"
                                  htmlFor={"image"}
                                >
                                  Image{" "}
                                  <span className="font-noto text-xs font-normal italic">
                                    *Optional
                                  </span>
                                </label>
                              </div>
                              <input
                                name={"image"}
                                disabled={isSubmitting}
                                type="file"
                                onChange={(e) => setFile(e.target.files?.[0])}
                                className={`w-full bg-white p-1 text-xs text-black outline-none`}
                                accept="image/*"
                              />
                            </div>
                            {errors.image && (
                              <div className="w-full border-x-2 border-b-2 border-black bg-red-600/30 py-1 pr-2 text-right font-made text-xs text-red-600">
                                {errors.image}
                              </div>
                            )}
                          </div>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{ background: "#96ec00" }}
                            className="mt-4 flex flex-row items-center justify-center border-2 border-b-[6px] border-black py-3 font-made font-bold active:mb-[6px] active:border"
                          >
                            {isSubmitting ? (
                              <PulseLoader
                                color={"#000"}
                                speedMultiplier={0.5}
                              />
                            ) : (
                              "Submit"
                            )}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>

                <div className="mt-4">
                  {/* <button
                    type="button"
                    className="inline-flex justify-center border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
