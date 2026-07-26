import { useState } from "react";
import { useForm } from "react-hook-form";
import PropertyForm, { PropertyValidationSchema } from "./PropertyForm";
import FormProvider from "../../../components/hook-form/form-provider";
import Modal from "../../../components/modal";
import {
  AddUpdatePropertyDTO,
  PropertyResponseDTO,
} from "../../../types/properties";
import { PropertiesService } from "../../../lib/Properties";
import { enqueueSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import { EFormMode } from "../../../assets/enums";

interface IModalPropertyProp {
  open: boolean;
  onSave: () => void;
  formMode?: EFormMode | null;
  defaultValues: PropertyResponseDTO | null;
  onOpenChange: (open: boolean) => void;
}

const ModalProperty = (props: IModalPropertyProp) => {
  const { open, onSave, formMode, defaultValues, onOpenChange } = props;
  const isEdit = formMode === EFormMode.Edit;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const methods = useForm<AddUpdatePropertyDTO>({
    resolver: yupResolver(PropertyValidationSchema),
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
        ? await PropertiesService.updateProperty(defaultValues!.id, data)
        : await PropertiesService.createProperty(data);

      if (res.result) {
        enqueueSnackbar({
          variant: "success",
          message: isEdit ? "Property updated!" : "Property added!",
        });
        onSave();
      }
    } finally {
      setIsSubmitting(false);
      reset({});
      onOpenChange(false);
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
      title={isEdit ? "Edit Property" : "Add Property"}
      onOpenChange={onOpenChange}
      fitContentHeight={false}
      description={
        isEdit ? "Update the property details" : "Specify the property details"
      }
      isSubmitLoading={isSubmitting}
      onSave={onSubmit}
      disabledSubmitButton={!isDirty}
    >
      <FormProvider methods={methods}>
        <PropertyForm />
      </FormProvider>
    </Modal>
  );
};

export default ModalProperty;
