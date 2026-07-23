import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";

import Modal from "../../../components/modal";
import FormProvider from "../../../components/hook-form/form-provider";
import { Spinner } from "../../../components/spinner";

import OpportunityForm from "./OpportunityForm";

import { useLocationConfigBase } from "../../../hooks/useLocationConfiguration";
import { OpportunitieService } from "../../../lib/Opportunity";

import {
  AddUpdateOpportunityDTO,
  OpportunityResponseDTO,
} from "../../../types/opportunities";

import { EFormMode } from "../../../assets/enums";

interface IOpportunityOwnerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  formMode: EFormMode;
  defaultValues?: OpportunityResponseDTO | null;
}

const ModalOpportunity = ({
  open,
  onOpenChange,
  onSave,
  formMode,
  defaultValues,
}: IOpportunityOwnerDrawerProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { propertyOwners, loadingPropertyOwners } = useLocationConfigBase({
    open,
    fetch: {
      propertyOwners: true,
    },
  });

  const methods = useForm<AddUpdateOpportunityDTO>({
    defaultValues: { ...defaultValues },
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
  }, [defaultValues, open, reset]);

  const handleClose = () => {
    onOpenChange(false);
    reset({});
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      const res =
        formMode === EFormMode.Create
          ? await OpportunitieService.createOpportunity(data)
          : await OpportunitieService.updateOpportunity(
              defaultValues!.id,
              data,
            );

      if (res.result) {
        onSave();

        enqueueSnackbar({
          variant: "success",
          message:
            formMode === EFormMode.Create
              ? "New opportunity was added"
              : "Opportunity was updated",
        });
      }
    } finally {
      setIsSubmitting(false);
      handleClose();
    }
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onOpenChange={onOpenChange}
      description="Specify the opportunity details"
      title={
        formMode === EFormMode.Create ? "Add Opportunity" : "Edit Opportunity"
      }
      onSave={onSubmit}
      isSubmitLoading={isSubmitting}
      disabledSubmitButton={!isDirty}
    >
      {loadingPropertyOwners ? (
        <Spinner />
      ) : (
        <FormProvider methods={methods}>
          <OpportunityForm propertyOwners={propertyOwners} />
        </FormProvider>
      )}
    </Modal>
  );
};

export default ModalOpportunity;
