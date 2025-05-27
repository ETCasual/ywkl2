import { Field as FormikField, useFormikContext } from "formik";

interface FieldProps<T> {
  label: string;
  formikKey: keyof T;
  disabled: boolean;
  as?: string;
  options?: { label: string; value: string }[];
  type?: HTMLInputElement["type"];
}

export const Field = <T,>({
  label,
  formikKey,
  disabled,
  as,
  options,
  type = "text",
}: FieldProps<T>) => {
  const { errors } = useFormikContext<T>();
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-2">
        <div className="min-w-[130px]">
          <label
            className="pl-2 font-mono text-base font-semibold"
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
          type={type}
          className={`w-full rounded-md px-2 outline-none${as === "select" ? " select select-bordered select-secondary select-sm" : " input input-bordered input-secondary input-sm"}`}
        >
          {options?.map((s, i) => (
            <option key={i} value={s.value ?? s.label}>
              {s.label}
            </option>
          ))}
        </FormikField>
      </div>

      <div className="min-h-[24px] w-full py-1 pr-2 text-right font-made text-xs text-red-600">
        {errors[formikKey] && String(errors[formikKey])}
      </div>
    </div>
  );
};
