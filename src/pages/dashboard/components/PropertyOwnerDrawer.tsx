import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import BaseDrawer from "../../../components/base-drawer";
import FormProvider from "../../../components/hook-form/form-provider";
import { Spinner } from "../../../components/spinner";

import PropertyOwnerForm, { propertyOwnerchema } from "./propertyOwnerForm";

import { PropertiesService } from "../../../lib/Properties";
import { useLocationConfigBase } from "../../../hooks/useLocationConfiguration";

import {
  CreateUpdatePropertyOwnerDTO,
  ProperyOwnerDTO,
} from "../../../types/properties/propertyOwner";
import { EFormMode } from "../../../assets/enums";

interface IPropertyOwnerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  formMode: EFormMode;
  defaultValues?: ProperyOwnerDTO | null;
}

const PropertyOwnerDrawer = ({
  open,
  onOpenChange,
  onSave,
  formMode,
  defaultValues,
}: IPropertyOwnerDrawerProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { agents, loadingAgents } = useLocationConfigBase({
    open,
    fetch: {
      agents: true,
    },
  });

  const methods = useForm<CreateUpdatePropertyOwnerDTO>({
    resolver: yupResolver(propertyOwnerchema),
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (open) {
      reset(defaultValues ?? {});
    }
  }, [open, defaultValues, reset]);

  const handleClose = () => {
    onOpenChange(false);
    reset({});
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      const res =
        formMode === EFormMode.Create
          ? await PropertiesService.createPropertyOwner(data)
          : await PropertiesService.updatePropertyOwner(
              defaultValues!.id,
              data,
            );

      if (res.result) {
        onSave();

        enqueueSnackbar({
          variant: "success",
          message:
            formMode === EFormMode.Create
              ? "Owner contact was added"
              : "Owner contact was updated",
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
      description="Specify the property owner's details"
      title={formMode === EFormMode.Create ? "Add Owner" : "Edit Owner"}
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
