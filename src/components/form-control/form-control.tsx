import * as React from "react";

import cn from "classnames";

import s from "./form-control.module.css";
import { Field, FormValues } from "../../hooks/use-form/use-form";

export type FormControlProps = Field<FormValues, keyof FormValues> & {
  label?: string;
  inline?: boolean;
  optional?: boolean;
};

const FieldContext = React.createContext<
  Field<FormValues, keyof FormValues> | undefined
>(undefined);

export const useField = () =>
  React.useContext(FieldContext) ?? ({} as Field<FormValues, keyof FormValues>);

export const FormControl: React.FC<React.PropsWithChildren<
  FormControlProps
>> = ({ children, inline, label, optional, ...field }) => {
  const { error } = field;
  const wrapperClasses = cn("form-control", s.formControl, {
    [s.inline]: inline,
    [s.error]: error
  });

  const labelClasses = cn("label", s.label);

  return (
    <FieldContext.Provider value={field}>
      <div className={wrapperClasses}>
        <label className={labelClasses}>
          {label}
          {optional && <span className={s.optional}>(optional)</span>}
        </label>
        {children}

        {error && <p className={s.hint}>This field is required.</p>}
      </div>
    </FieldContext.Provider>
  );
};

export default FormControl;
