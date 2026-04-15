/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CreateZoneDTO,
  DivisionsResponseDTO,
} from "../../../types/main-location-configuration";
import { EFormMode } from "../../../assets/enums";
import Modal from "../../../components/modal";
import FormProvider from "../../../components/hook-form/form-provider";
import { LocationConfigurationService } from "../../../lib/LocationConfiguration";
import { IOption } from "../../../assets/enums/constants/property";
import ZonesForm, { zonesSchema } from "./ZonesForm";
import { Spinner } from "../../../components/spinner";
import { yupResolver } from "@hookform/resolvers/yup";

interface ZonesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: DivisionsResponseDTO | null;
  onSave: () => void;
  formMode?: EFormMode | null;
}

const ZonesModal = (props: ZonesModalProps) => {
  const { open, onOpenChange, defaultValues, onSave, formMode } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<IOption[]>([]);

  const fetchCitiesList = async () => {
    try {
      setIsLoading(true);
      const res = await LocationConfigurationService.getCities();
      setCities(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCitiesList();
  }, []);

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
    let res = null;

    try {
      res = await LocationConfigurationService.addZone(data);

      if (res.result) {
        onSave();
        // enqueueSnackbar({
        //   variant: "success",
        //   message: `Payment type was ${
        //     updatedCall ? "updated" : "saved"
        //   } successfully`,
        // });
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
      title={"Add new division"}
      description="Configure new division"
      disabledSubmitButton={!isDirty}
    >
      {isLoading ? (
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
