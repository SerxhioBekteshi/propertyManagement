import { enqueueSnackbar } from "notistack";
import { PropertiesService } from "../../../lib/Properties";
import { CreatePropertyOwnerDTO } from "../../../types/properties";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { IOption } from "../../../types";
import PropertyOwnerForm, { propertyOwnerchema } from "./propertyOwnerForm";
import BaseDrawer from "../../../components/base-drawer";
import FormProvider from "../../../components/hook-form/form-provider";

interface IPropertyOwnerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  propertyOwners: IOption<number>[];
}

const PropertyOwnerDrawer = (props: IPropertyOwnerDrawerProps) => {
  const { open, onOpenChange, onSave, propertyOwners } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
      <FormProvider methods={methods}>
        <PropertyOwnerForm propertyOwners={propertyOwners} />
      </FormProvider>
    </BaseDrawer>
  );
};

export default PropertyOwnerDrawer;
