import { Field as FormikField, useFormikContext } from "formik";

interface FieldProps<T> {
  label: string;
  formikKey: keyof T;
  disabled: boolean;
  as?: string;
  options?: string[];
}

export const Field = <T,>({
  label,
  formikKey,
  disabled,
  as,
  options,
}: FieldProps<T>) => {
  const { errors } = useFormikContext<T>();
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-col gap-2">
        <div className="min-w-[130px]">
          <label
            className="pl-2 font-made text-base"
            htmlFor={String(formikKey)}
          >
            {label}
          </label>
        </div>

        <FormikField
          as={as ?? "input"}
          id={formikKey}
          name={String(formikKey)}
          disabled={disabled}
          className={`w-full rounded-md px-2 py-1 outline-none${as === "select" ? " select select-bordered select-secondary select-md" : " input input-bordered input-secondary input-md"}`}
        >
          {options?.map((s, i) => <option key={i}>{s}</option>)}
        </FormikField>
      </div>

      {errors[formikKey] && (
        <div className="w-full py-1 pr-2 text-right font-made text-xs text-red-600">
          {String(errors[formikKey])}
        </div>
      )}
    </div>
  );
};
