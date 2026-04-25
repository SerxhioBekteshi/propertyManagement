import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CitiesResponseDTO,
  CreateCityDTO,
} from "../../../types/location-configuration";
import { EFormMode } from "../../../assets/enums";
import Modal from "../../../components/modal";
import FormProvider from "../../../components/hook-form/form-provider";
import { LocationConfigurationService } from "../../../lib/ListConfiguration";
import { Spinner } from "../../../components/spinner";
import CitiesForm, { citiesSchema } from "./CitiesForm";
import { enqueueSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocationConfigBase } from "../../../hooks/useLocationConfiguration";

interface CitiesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: CitiesResponseDTO | null;
  onSave: () => void;
  formMode?: EFormMode | null;
}

const CitiesModal = (props: CitiesModalProps) => {
  const { open, onOpenChange, onSave } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { divisions, loadingDivisions } = useLocationConfigBase({
    open: open,
    fetch: {
      zones: true,
    },
  });

  const methods = useForm<CreateCityDTO>({
    resolver: yupResolver(citiesSchema),
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
      const res = await LocationConfigurationService.addCity(data);
      if (res.result) {
        onSave();
        enqueueSnackbar({
          variant: "success",
          message: `City was added`,
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
      title={"Add new city"}
      description="Configure new city"
      disabledSubmitButton={!isDirty}
      size="2xl"
    >
      {loadingDivisions ? (
        <>
          <Spinner />
        </>
      ) : (
        <FormProvider methods={methods}>
          <CitiesForm divisions={divisions} />
        </FormProvider>
      )}
    </Modal>
  );
};

export default CitiesModal;
