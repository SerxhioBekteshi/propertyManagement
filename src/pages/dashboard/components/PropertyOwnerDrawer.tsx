import { enqueueSnackbar } from "notistack";
import { PropertiesService } from "../../../lib/Properties";
import { CreatePropertyOwnerDTO } from "../../../types/properties";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { IOption } from "../../../types";
import PropertyOwnerForm, { propertyOwnerchema } from "./propertyOwnerForm";
import BaseDrawer from "../../../components/base-drawer";
import FormProvider from "../../../components/hook-form/form-provider";
import { LocationConfigurationService } from "../../../lib/ListConfiguration";
import { Spinner } from "../../../components/spinner";

interface IPropertyOwnerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

const PropertyOwnerDrawer = (props: IPropertyOwnerDrawerProps) => {
  const { open, onOpenChange, onSave } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [agents, setAgents] = useState<IOption<number>[]>([]);

  const fetchAgents = async () => {
    try {
      const res = await LocationConfigurationService.getAgents();
      if (res.result) {
        setAgents(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

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
      {loading ? (
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
