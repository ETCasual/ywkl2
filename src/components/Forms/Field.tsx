/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Field as FormikField, useFormikContext } from "formik";
import { useEffect, type FunctionComponent } from "react";
import type { RegistrationFormData } from "./Registration";
import { structureData } from "@/data";

interface FieldProps {
  name: string;
  label: string;
  secondaryColor: string;
  primaryColor: string;
  editable: boolean;
}

export const Field: FunctionComponent<FieldProps> = ({
  label,
  name,
  secondaryColor: labelColor,
  primaryColor,
  editable,
}) => {
  const { setFieldValue, values, errors } =
    useFormikContext<RegistrationFormData>();
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-row border-2 border-solid border-black">
        <div
          className="min-w-[130px] border-r-2 border-black"
          style={{ background: labelColor ?? "#FFF" }}
        >
          <label className="font-made pl-2 text-xs" htmlFor={name}>
            {label}
          </label>
        </div>
        {
          //   name === "age" ? (
          //     <div className="flex w-full flex-row">
          //       <button
          //         style={{ background: primaryColor }}
          //         type="button"
          //         className="flex w-[35px] items-center justify-center text-white"
          //         onClick={() =>
          //           setFieldValue(
          //             "age",
          //             values.age !== 0 ? Number(values.age) - 1 : 0,
          //           )
          //         }
          //       >
          //         -
          //       </button>
          //       <FormikField
          //         name={name}
          //         type="number"
          //         className="w-full border-x-2 border-black text-center font-bold outline-none"
          //       />
          //       <button
          //         type="button"
          //         style={{ background: primaryColor }}
          //         className="flex w-[35px] items-center justify-center text-white"
          //         onClick={() =>
          //           setFieldValue(
          //             "age",
          //             values.age !== 99 ? Number(values.age) + 1 : 99,
          //           )
          //         }
          //       >
          //         +
          //       </button>
          //     </div>
          //   ) :
          name === "gender" ? (
            <div className="flex w-full flex-row">
              <button
                type="button"
                disabled={!editable}
                style={{
                  background: values.gender === "male" ? primaryColor : "",
                }}
                className={`border-r-2 border-black transition-all w-1/2${
                  values.gender === "male" ? " font-bold text-white" : ""
                }`}
                onClick={() => setFieldValue("gender", "male")}
              >
                Male
              </button>
              <button
                type="button"
                disabled={!editable}
                style={{
                  background: values.gender === "female" ? primaryColor : "",
                }}
                className={`transition-all w-1/2${
                  values.gender === "female" ? " font-bold text-white" : ""
                }`}
                onClick={() => setFieldValue("gender", "female")}
              >
                Female
              </button>
            </div>
          ) : (
            <FormikField
              name={name}
              disabled={!editable}
              type={
                name === "dob"
                  ? "date"
                  : name === "contact_number"
                  ? "tel"
                  : "text"
              }
              className={`w-full px-2 outline-none${
                name === "dob" ? " font-bold" : ""
              }`}
            />
          )
        }
      </div>
      {/* @ts-ignore */}
      {errors[name] && (
        <div className="font-made w-full border-x-2 border-b-2 border-black bg-red-600/30 py-1 pr-2 text-right text-xs text-red-600">
          {/* @ts-ignore */}
          {errors[name]}
        </div>
      )}
    </div>
  );
};

export const PastoralTeamField: FunctionComponent<FieldProps> = ({
  label,
  name,
  secondaryColor,
  editable,
}) => {
  //   const { setFieldValue, values } = useFormikContext<RegistrationFormData>();

  return (
    <div className="flex w-full flex-row border-2 border-solid border-black">
      <div
        className="min-w-[130px] border-r-2 border-black"
        style={{ background: secondaryColor ?? "#FFF" }}
      >
        <label className="font-made pl-2 text-xs" htmlFor={name}>
          {label}
        </label>
      </div>
      <FormikField
        className="w-full px-2 font-bold outline-none"
        name={name}
        as="select"
        disabled={!editable}
      >
        {Object.keys(structureData).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </FormikField>
    </div>
  );
};

export const SmallTeamField: FunctionComponent<FieldProps> = ({
  label,
  name,
  secondaryColor,
  editable,
}) => {
  const { setFieldValue, values } = useFormikContext<RegistrationFormData>();
  useEffect(() => {
    void setFieldValue(
      "small_team",
      Object.keys(structureData[values.pastoral_team])[0],
    );
    void setFieldValue("cg", "");
  }, [setFieldValue, values.pastoral_team]);
  return (
    <div className="flex w-full flex-row border-2 border-solid border-black">
      <div
        className="min-w-[130px] border-r-2 border-black"
        style={{ background: secondaryColor ?? "#FFF" }}
      >
        <label className="font-made pl-2 text-xs" htmlFor={name}>
          {label}
        </label>
      </div>
      <FormikField
        className="w-full px-2 font-bold outline-none"
        name={name}
        as="select"
        disabled={!editable}
      >
        {Object.keys(structureData[values.pastoral_team]).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </FormikField>
    </div>
  );
};

export const CGField: FunctionComponent<FieldProps> = ({
  label,
  name,
  secondaryColor,
  editable,
}) => {
  const { setFieldValue, values } = useFormikContext<RegistrationFormData>();
  useEffect(() => {
    void setFieldValue(
      "cg",
      structureData[values.pastoral_team]?.[values.small_team]?.[0],
    );
  }, [setFieldValue, values.pastoral_team, values.small_team]);
  return (
    <div className="flex w-full flex-row border-2 border-solid border-black">
      <div
        className="min-w-[130px] border-r-2 border-black"
        style={{ background: secondaryColor ?? "#FFF" }}
      >
        <label className="font-made pl-2 text-xs" htmlFor={name}>
          {label}
        </label>
      </div>
      <FormikField
        className="w-full px-2 font-bold outline-none"
        name={name}
        as="select"
        disabled={!editable}
      >
        {structureData[values.pastoral_team]?.[values.small_team]?.map(
          (value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ),
        )}
      </FormikField>
    </div>
  );
};

export const PastoralStatusField: FunctionComponent<FieldProps> = ({
  label,
  name,
  secondaryColor,
  editable,
}) => {
  const { setFieldValue, values } = useFormikContext<RegistrationFormData>();
  useEffect(() => {
    void setFieldValue(
      "cg",
      structureData[values.pastoral_team]?.[values.small_team]?.[0],
    );
  }, [setFieldValue, values.pastoral_team, values.small_team]);
  return (
    <div className="flex w-full flex-row border-2 border-solid border-black">
      <div
        className="min-w-[130px] border-r-2 border-black"
        style={{ background: secondaryColor ?? "#FFF" }}
      >
        <label className="font-made pl-2 text-xs" htmlFor={name}>
          {label}
        </label>
      </div>
      <FormikField
        className="w-full px-2 font-bold outline-none"
        name={name}
        as="select"
        disabled={!editable}
      >
        {["NF", "RNF", "NB", "OM", "SGL", "CGL", "Coach/TL/Pastor"].map(
          (value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ),
        )}
      </FormikField>
    </div>
  );
};

export const TShirtField: FunctionComponent<FieldProps> = ({
  label,
  name,
  secondaryColor,
  editable,
}) => {
  const { setFieldValue, values } = useFormikContext<RegistrationFormData>();
  useEffect(() => {
    void setFieldValue(
      "cg",
      structureData[values.pastoral_team]?.[values.small_team]?.[0],
    );
  }, [setFieldValue, values.pastoral_team, values.small_team]);
  return (
    <div className="flex w-full flex-row border-2 border-solid border-black">
      <div
        className="min-w-[130px] border-r-2 border-black"
        style={{ background: secondaryColor ?? "#FFF" }}
      >
        <label className="font-made pl-2 text-xs" htmlFor={name}>
          {label}
        </label>
      </div>
      <FormikField
        className="w-full px-2 font-bold outline-none"
        name={name}
        as="select"
        disabled={!editable}
      >
        {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </FormikField>
    </div>
  );
};
