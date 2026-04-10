import { ReactNode } from "react";
import {
  FieldValues,
  UseFormReturn,
  FormProvider as RHFFormProvider,
  SubmitHandler,
} from "react-hook-form";

type TFormProviderProps<T extends FieldValues> = {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
};

const FormProvider = <T extends FieldValues>(
  props: TFormProviderProps<T>,
): React.ReactElement => {
  const { children, methods, onSubmit } = props;

  return (
    <RHFFormProvider {...methods}>
      <form
        style={{ height: "100%", width: "100%" }}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </RHFFormProvider>
  );
};

export default FormProvider;
