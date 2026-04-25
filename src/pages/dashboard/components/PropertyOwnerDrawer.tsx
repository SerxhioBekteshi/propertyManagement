import { enqueueSnackbar } from "notistack";
import { PropertiesService } from "../../../lib/Properties";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import PropertyOwnerForm, { propertyOwnerchema } from "./propertyOwnerForm";
import BaseDrawer from "../../../components/base-drawer";
import FormProvider from "../../../components/hook-form/form-provider";
import { Spinner } from "../../../components/spinner";
import { CreatePropertyOwnerDTO } from "../../../types/properties/propertyOwner";
import { useLocationConfigBase } from "../../../hooks/useLocationConfiguration";

interface IPropertyOwnerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

const PropertyOwnerDrawer = (props: IPropertyOwnerDrawerProps) => {
  const { open, onOpenChange, onSave } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { agents, loadingAgents } = useLocationConfigBase({
    open: open,
    fetch: {
      agents: true,
    },
  });

  const methods = useForm<CreatePropertyOwnerDTO>({
    resolver: yupResolver(propertyOwnerchema),
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
      const res = await PropertiesService.createPropertyOwner(data);
      if (res.result) {
        onSave();
        enqueueSnackbar({
          variant: "success",
          message: `Owner contact was added`,
        });
      }
    } finally {
      setIsSubmitting(false);
      handleClose();
    }
  });

  const handleClose = () => {
    onOpenChange(false);
    reset({});
  };

  return (
    <BaseDrawer
      open={open}
      onClose={handleClose}
      onOpenChange={onOpenChange}
      description={`Specify the property owner's details`}
      title="Add Owner"
      onSave={onSubmit}
      isSubmitLoading={isSubmitting}
      disabledSubmitButton={!isDirty}
    >
      {loadingAgents ? (
        <Spinner />
      ) : (
        <FormProvider methods={methods}>
          <PropertyOwnerForm assignes={agents} />
        </FormProvider>
      )}
    </BaseDrawer>
  );
};

export default PropertyOwnerDrawer;
