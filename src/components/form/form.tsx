import * as React from "react";

import s from "./form.module.css";

export type FormProps = {
  onSubmit: (e: React.FormEvent) => void;
  onReset?: () => void;
  actions?: React.ReactNode;
};

export const Form: React.FC<React.PropsWithChildren<FormProps>> = ({
  actions,
  children,
  onSubmit,
  onReset
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(e);
  };

  return (
    <form className={s.form} onReset={onReset} onSubmit={handleSubmit}>
      {children}

      {actions && <div className={s.actions}>{actions}</div>}
    </form>
  );
};

export default Form;
