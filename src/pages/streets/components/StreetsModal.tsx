import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import {
  CreateUpdateStreetDTO,
  StreetsResponseDTO,
} from "../../../types/location-configuration";
import { EFormMode } from "../../../assets/enums";
import Modal from "../../../components/modal";
import FormProvider from "../../../components/hook-form/form-provider";
import { LocationConfigurationService } from "../../../lib/ListConfiguration";
import { Spinner } from "../../../components/spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";
import StreetsForm, { streetsSchema } from "./StreetsForm";
import { useLocationConfigBase } from "../../../hooks/useLocationConfiguration";

interface StreetsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  formMode?: EFormMode | null;
  defaultValues: StreetsResponseDTO | null;
}

const StreetsModal = (props: StreetsModalProps) => {
  const { open, onOpenChange, onSave, formMode, defaultValues } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isEdit = formMode === EFormMode.Edit;

  const { zones, loadingZones } = useLocationConfigBase({
    open: open,
    fetch: {
      zones: true,
    },
  });

  const methods = useForm<CreateUpdateStreetDTO>({
    resolver: yupResolver(streetsSchema) as Resolver<CreateUpdateStreetDTO>,
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
        ? await LocationConfigurationService.updateStreet(
            defaultValues!.id,
            data,
          )
        : await LocationConfigurationService.addStreet(data);

      if (res.result) {
        onSave();
        enqueueSnackbar({
          variant: "success",
          message: isEdit ? "Street updated" : "Street added",
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
      title={isEdit ? "Edit street" : "Add new street"}
      description={isEdit ? "Update street details" : "Configure new street"}
      disabledSubmitButton={!isDirty}
      size="2xl"
    >
      {loadingZones ? (
        <Spinner />
      ) : (
        <FormProvider methods={methods}>
          <StreetsForm zones={zones} />
        </FormProvider>
      )}
    </Modal>
  );
};

export default StreetsModal;
