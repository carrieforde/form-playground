import * as React from "react";
import cn from "classnames";

import { Field, FormValues } from "../../hooks/use-form/use-form";

import s from "./input.module.css";
import { useField } from "../form-control/form-control";

export type InputProps = {} & Field<FormValues, keyof FormValues> &
  React.HTMLProps<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { setValue, touched, isDirty, error, ...field } = useField();
    const inputClasses = cn("input", s.input, {
      [s.error]: error
    });

    return <input {...props} {...field} className={inputClasses} ref={ref} />;
  }
);

export default Input;
