import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CreateUpdateZoneDTO,
  ZonesResponseDTO,
} from "../../../types/location-configuration";
import { EFormMode } from "../../../assets/enums";
import Modal from "../../../components/modal";
import FormProvider from "../../../components/hook-form/form-provider";
import { LocationConfigurationService } from "../../../lib/ListConfiguration";
import ZonesForm, { zonesSchema } from "./ZonesForm";
import { Spinner } from "../../../components/spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";
import { useLocationConfigBase } from "../../../hooks/useLocationConfiguration";

interface ZonesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: ZonesResponseDTO | null; // ✅ fixed — was DivisionsResponseDTO
  onSave: () => void;
  formMode?: EFormMode | null;
}

const ZonesModal = (props: ZonesModalProps) => {
  const { open, onOpenChange, onSave, formMode, defaultValues } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isEdit = formMode === EFormMode.Edit;

  const { cities, loadingCities } = useLocationConfigBase({
    open: open,
    fetch: {
      cities: true,
    },
  });

  const methods = useForm<CreateUpdateZoneDTO>({
    resolver: yupResolver(zonesSchema),
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
        ? await LocationConfigurationService.updateZone(defaultValues!.id, data)
        : await LocationConfigurationService.addZone(data);

      if (res.result) {
        onSave();
        enqueueSnackbar({
          variant: "success",
          message: isEdit ? "Zone updated" : "Zone added",
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
      title={isEdit ? "Edit zone" : "Add new zone"}
      description={isEdit ? "Update zone details" : "Configure new zone"}
      disabledSubmitButton={!isDirty}
      size="2xl"
    >
      {loadingCities ? (
        <Spinner />
      ) : (
        <FormProvider methods={methods}>
          <ZonesForm cities={cities} />
        </FormProvider>
      )}
    </Modal>
  );
};

export default ZonesModal;
