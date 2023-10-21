import { Form, Formik } from "formik";
import {
  CGField,
  Field,
  PastoralStatusField,
  PastoralTeamField,
  SmallTeamField,
  TShirtField,
} from "./Field";
import { PulseLoader } from "react-spinners";
import { type FunctionComponent } from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFirestore } from "reactfire";
import { doc, setDoc } from "firebase/firestore";
import { trimObjectValues } from "@/utils/helpers";

export type RegistrationFormData = {
  full_name: string;
  chi_name: string;
  gender: "male" | "female";
  //   age: number;
  nric_passport: string;
  contact_number: string;
  pastoral_status:
    | "NF"
    | "RNF"
    | "NB"
    | "OM"
    | "SGL"
    | "CGL"
    | "Coach/TL/Pastor";
  pastoral_team: "Voice" | "Heart" | "Move" | "Mind" | "Force";
  small_team: string;
  cg: string;
  tshirt_size: "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL";
  dob: EpochTimeStamp;
};

interface RegistrationFormProps {
  secondaryColor: string;
  primaryColor: string;
  id: string;
}

export const RegistrationForm: FunctionComponent<RegistrationFormProps> = ({
  secondaryColor,
  primaryColor,
  id,
}) => {
  const router = useRouter();

  const firestore = useFirestore();

  return (
    <Formik<RegistrationFormData>
      initialValues={{
        full_name: "",
        // age: 0,
        cg: "",
        chi_name: "",
        contact_number: "",
        gender: "male",
        nric_passport: "",
        pastoral_status: "NF",
        pastoral_team: "Move",
        small_team: "",
        tshirt_size: "S",
        dob: 0,
      }}
      validationSchema={Yup.object().shape({
        contact_number: Yup.string()
          .required("Required.")
          .matches(
            /^(\+?6?01)[0|1|2|3|4|6|7|8|9]-*[0-9]{7,8}$/,
            "Invalid format.",
          ),
      })}
      onSubmit={async (values, action) => {
        action.setSubmitting(true);
        const res = await fetch("/api/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trimObjectValues(values)),
        });

        if (res.ok) {
          await setDoc(
            doc(
              firestore,
              "leaderboard",
              `${values.nric_passport.trim()}|${values.full_name.trim()}`,
            ),
            {
              name: values.full_name.trim(),
              team: values.pastoral_team,
              timestamp: Date.now(),
            },
          ).then(() => {
            alert("Submitted successfully!");
            void router.push(
              `${id}/leaderboard/${values.nric_passport}|${values.full_name}`,
            );
          });

          router;
        } else {
          alert("Unknown Server Error");
          console.warn(res);
          //   action.resetForm();
          action.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-1 px-2 pb-3 pt-5">
          <Field
            label="Full Name (EN)"
            name="full_name"
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
            editable={!isSubmitting}
          />
          <Field
            label="Full Name (CHI)"
            name="chi_name"
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
            editable={!isSubmitting}
          />
          <Field
            label="Gender"
            name="gender"
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
            editable={!isSubmitting}
          />
          {/* <Field
            label="Age"
            name="age"
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
          /> */}
          <Field
            label="NRIC / Passport"
            name="nric_passport"
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
            editable={!isSubmitting}
          />
          <Field
            label="Contact No."
            name="contact_number"
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
            editable={!isSubmitting}
          />
          <Field
            label="Date Of Birth"
            name="dob"
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
            editable={!isSubmitting}
          />
          <PastoralTeamField
            label="Pastoral Team"
            name="pastoral_team"
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
            editable={!isSubmitting}
          />
          <SmallTeamField
            label="Small Team"
            name="small_team"
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
            editable={!isSubmitting}
          />
          <CGField
            label="CG"
            name="cg"
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
            editable={!isSubmitting}
          />
          <PastoralStatusField
            label="Pastoral Status"
            name="pastoral_status"
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
            editable={!isSubmitting}
          />
          <TShirtField
            label="T-Shirt Size"
            name="tshirt_size"
            secondaryColor={secondaryColor}
            primaryColor={primaryColor}
            editable={!isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ background: primaryColor }}
            className="mt-4 flex flex-row items-center justify-center border-2 border-b-[6px] border-black py-2 font-made font-bold active:mb-[6px] active:border active:bg-opacity-80"
          >
            {isSubmitting ? (
              <PulseLoader color={"#000"} speedMultiplier={0.5} />
            ) : (
              "Submit"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};
