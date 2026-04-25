import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateStreetDTO } from "../../../types/location-configuration";
import { EFormMode } from "../../../assets/enums";
import Modal from "../../../components/modal";
import FormProvider from "../../../components/hook-form/form-provider";
import { LocationConfigurationService } from "../../../lib/ListConfiguration";
import { Spinner } from "../../../components/spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";
import { IOption } from "../../../types";
import StreetsForm, { streetsSchema } from "./StreetsForm";

interface StreetsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  formMode?: EFormMode | null;
}

const StreetsModal = (props: StreetsModalProps) => {
  const { open, onOpenChange, onSave } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [zones, setZones] = useState<IOption<number>[]>([]);

  const fetchZonesList = async () => {
    try {
      setIsLoading(true);
      const res = await LocationConfigurationService.getZones();
      setZones(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchZonesList();
  }, [open]);

  const methods = useForm<CreateStreetDTO>({
    resolver: yupResolver(streetsSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      const res = await LocationConfigurationService.addStreet(data);

      if (res.result) {
        onSave();
        enqueueSnackbar({
          variant: "success",
          message: `Street added`,
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
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <FormProvider methods={methods}>
          <StreetsForm zones={zones} />
        </FormProvider>
      )}
    </Modal>
  );
};

export default StreetsModal;
