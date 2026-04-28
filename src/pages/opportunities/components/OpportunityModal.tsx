import { useState } from "react";
import Modal from "../../../components/modal";
import { useLocationConfigBase } from "../../../hooks/useLocationConfiguration";
import { useForm } from "react-hook-form";
import { AddOpportunityDTO } from "../../../types/opportunities";
import { OpportunitieService } from "../../../lib/Opportunity";
import { enqueueSnackbar } from "notistack";
import FormProvider from "../../../components/hook-form/form-provider";
import { Spinner } from "../../../components/spinner";
import OpportunityForm from "./OpportunityForm";

interface IOpportunityOwnerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

const ModalOpportunity = (props: IOpportunityOwnerDrawerProps) => {
  const { open, onOpenChange, onSave } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { propertyOwners, loadingPropertyOwners } = useLocationConfigBase({
    open: open,
    fetch: {
      propertyOwners: true,
    },
  });

  const methods = useForm<AddOpportunityDTO>({
    // resolver: yupResolver(propertyOwnerchema),
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
      const res = await OpportunitieService.createOpportunity(data);
      if (res.result) {
        onSave();
        enqueueSnackbar({
          variant: "success",
          message: `New opportunity was added`,
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
    <Modal
      open={open}
      onClose={handleClose}
      onOpenChange={onOpenChange}
      description={`Specify the opportunity details`}
      title="Add Owner"
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
