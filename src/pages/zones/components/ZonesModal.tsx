import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CreateZoneDTO,
  DivisionsResponseDTO,
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
  defaultValues: DivisionsResponseDTO | null;
  onSave: () => void;
  formMode?: EFormMode | null;
}

const ZonesModal = (props: ZonesModalProps) => {
  const { open, onOpenChange, onSave } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { cities, loadingCities } = useLocationConfigBase({
    open: open,
    fetch: {
      cities: true,
    },
  });

  const methods = useForm<CreateZoneDTO>({
    resolver: yupResolver(zonesSchema),
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
      const res = await LocationConfigurationService.addZone(data);

      if (res.result) {
        onSave();
        enqueueSnackbar({
          variant: "success",
          message: `Zone added`,
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
      title={"Add new zone"}
      description="Configure new zone"
      disabledSubmitButton={!isDirty}
      size="2xl"
    >
      {loadingCities ? (
        <>
          <Spinner />
        </>
      ) : (
        <FormProvider methods={methods}>
          <ZonesForm cities={cities} />
        </FormProvider>
      )}
    </Modal>
  );
};

export default ZonesModal;
