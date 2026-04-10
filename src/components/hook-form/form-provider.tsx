import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider as Form,
  UseFormReturn,
} from "react-hook-form";
import React from "react";

type TFormProviderProps<T extends FieldValues> = {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void>;
};

const FormProvider = <T extends FieldValues>(
  props: TFormProviderProps<T>,
): React.ReactElement => {
  const { children, methods, onSubmit } = props;
  return (
    <Form {...methods}>
      <form style={{ height: "100%", width: "100%" }} onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  );
};
export default FormProvider;
