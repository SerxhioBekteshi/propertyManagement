import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CreateUpdateDivisionDTO,
  DivisionsResponseDTO,
} from "../../../types/location-configuration";
import { EFormMode } from "../../../assets/enums";
import Modal from "../../../components/modal";
import FormProvider from "../../../components/hook-form/form-provider";
import DivisionsForm, { divionsSchema } from "./DivisionsForm";
import { LocationConfigurationService } from "../../../lib/ListConfiguration";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";

interface DivisionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: DivisionsResponseDTO | null;
  onSave: () => void;
  formMode?: EFormMode | null;
}

const DivisionsModal = (props: DivisionsModalProps) => {
  const { open, onOpenChange, onSave, formMode, defaultValues } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isEdit = formMode === EFormMode.Edit;

  const methods = useForm<CreateUpdateDivisionDTO>({
    resolver: yupResolver(divionsSchema),
    defaultValues: { ...defaultValues },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      const res = isEdit
        ? await LocationConfigurationService.updateDivision(
            defaultValues!.id,
            data,
          )
        : await LocationConfigurationService.addDivision(data);

      if (res.result) {
        onSave();
        enqueueSnackbar({
          variant: "success",
          message: isEdit ? "Division was updated" : "Division was added",
        });
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
      title={isEdit ? "Edit division" : "Add new division"}
      description={
        isEdit ? "Update division details" : "Configure new division"
      }
      disabledSubmitButton={!isDirty}
      size="2xl"
    >
      <FormProvider methods={methods}>
        <DivisionsForm />
      </FormProvider>
    </Modal>
  );
};

export default DivisionsModal;
