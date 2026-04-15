/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CreateDivionDTO,
  DivisionsResponseDTO,
} from "../../../types/main-location-configuration";
import { EFormMode } from "../../../assets/enums";
import Modal from "../../../components/modal";
import FormProvider from "../../../components/hook-form/form-provider";
import DivisionsForm, { divionsSchema } from "./DivisionsForm";
import { LocationConfigurationService } from "../../../lib/LocationConfiguration";
import { yupResolver } from "@hookform/resolvers/yup";

interface DivisionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: DivisionsResponseDTO | null;
  onSave: () => void;
  formMode?: EFormMode | null;
}

const DivisionsModal = (props: DivisionsModalProps) => {
  const { open, onOpenChange, defaultValues, onSave, formMode } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const methods = useForm<CreateDivionDTO>({
    resolver: yupResolver(divionsSchema),
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      const res = await LocationConfigurationService.addDivision(data);

      if (res.result) {
        onSave();
        // enqueueSnackbar({
        //   variant: "success",
        //   message: `Payment type was ${
        //     updatedCall ? "updated" : "saved"
        //   } successfully`,
        // });
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleClose = () => {
    onOpenChange(false);
    reset({});
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      fitContentHeight={true}
      onOpenChange={onOpenChange}
      isSubmitLoading={isSubmitting}
      onSave={onSubmit}
      title={"Add new division"}
      description="Configure new division"
      disabledSubmitButton={!isDirty}
    >
      <FormProvider methods={methods}>
        <DivisionsForm />
      </FormProvider>
    </Modal>
  );
};

export default DivisionsModal;
