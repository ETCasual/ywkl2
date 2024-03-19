import { Field as FormikField, useFormikContext } from "formik";

interface FieldProps<T> {
  label: string;
  formikKey: keyof T;
  disabled: boolean;
  as?: string;
  options?: string[];
}

export const DiscipleshipField = <T,>({
  label,
  formikKey,
  disabled,
  as,
  options,
}: FieldProps<T>) => {
  const { errors } = useFormikContext<T>();
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row items-center gap-2 rounded-lg bg-[#45c178]">
        {/* <div className="min-w-[130px]">
          <label
            className="pl-2 font-sans font-bold"
            htmlFor={String(formikKey)}
          >
            {label}
          </label>
        </div> */}

        <FormikField
          as={as ?? "input"}
          id={formikKey}
          name={String(formikKey)}
          disabled={disabled}
          placeholder={label ?? formikKey}
          className={`w-full rounded-md border-none bg-transparent px-2 outline-none${as === "select" ? " select select-secondary select-sm" : " input input-secondary input-sm placeholder:italic placeholder:text-white/70"}`}
        >
          {options?.map((s, i) => (
            <option className="text-black" key={i}>
              {s}
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
