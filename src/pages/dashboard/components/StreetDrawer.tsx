import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";
import BaseDrawer from "../../../components/base-drawer";
import FormProvider from "../../../components/hook-form/form-provider";
import { Spinner } from "../../../components/spinner";
import { LocationConfigurationService } from "../../../lib/ListConfiguration";
import { useLocationConfigBase } from "../../../hooks/useLocationConfiguration";
import { CreateUpdateStreetDTO } from "../../../types/location-configuration";
import StreetsForm, {
  streetsSchema,
} from "../../streets/components/StreetsForm";

interface StreetDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

const StreetDrawer = ({ open, onOpenChange, onSave }: StreetDrawerProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { zones, loadingZones } = useLocationConfigBase({
    open,
    fetch: {
      zones: true,
    },
  });

  const methods = useForm<CreateUpdateStreetDTO>({
    resolver: yupResolver(streetsSchema) as Resolver<CreateUpdateStreetDTO>,
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const handleClose = () => {
    onOpenChange(false);
    reset({});
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      const res = await LocationConfigurationService.addStreet(data);
      if (res.result) {
        onSave();
        enqueueSnackbar({
          variant: "success",
          message: "Street added",
        });
      }
    } finally {
      setIsSubmitting(false);
      handleClose();
    }
  });

  return (
    <BaseDrawer
      open={open}
      onClose={handleClose}
      onOpenChange={onOpenChange}
      title="Add Street"
      description="Configure new street"
      onSave={onSubmit}
      isSubmitLoading={isSubmitting}
      disabledSubmitButton={!isDirty}
    >
      {loadingZones ? (
        <Spinner />
      ) : (
        <FormProvider methods={methods}>
          <StreetsForm zones={zones} />
        </FormProvider>
      )}
    </BaseDrawer>
  );
};

export default StreetDrawer;
