import { useState } from "react";
import { useForm } from "react-hook-form";
import PropertyForm from "./PropertyForm";
import FormProvider from "../../../components/hook-form/form-provider";
import Modal from "../../../components/modal";
import { AddPropertyDTO, PropertyResponseDTO } from "../../../types/properties";

interface IModalPropertyProp {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSave: () => void;
  model: PropertyResponseDTO | null;
  onClose: () => void;
}
const ModalProperty = (props: IModalPropertyProp) => {
  const { open, setOpen, onSave, model, onClose } = props;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const methods = useForm<AddPropertyDTO>({
    // resolver: yupResolver(PropertyValidationSchema),
    defaultValues: {
      ...model,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    let res = null;
    let updatedCall: boolean = false;

    try {
      //   if (model?.id) {
      //     res = await AnnouncementsService.updateNews(model.id, data);
      //     updatedCall = true;
      //   } else {
      //     res = await AnnouncementsService.createNews(data);
      //   }
      //   if (res.isSuccess) {
      //     onSave();
      //     enqueueSnackbar({
      //       variant: "success",
      //       message: `Property was ${updatedCall ? "updated" : "saved"} successfully`,
      //     });
      // }
      console.log("awd");
    } finally {
      setIsSubmitting(false);
      reset({});
      onClose();
    }
  });

  //   const handleDelete = async () => {
  //     setIsSubmitting(true);
  //     try {
  //       const res = await AnnouncementsService.deleteNews(model?.id ?? "");
  //       if (res.value) {
  //         enqueueSnackbar({
  //           variant: "success",
  //           message: "News deleted.",
  //         });
  //       }
  //     } finally {
  //       setIsSubmitting(false);
  //       onSave();
  //       onClose();
  //     }
  //   };

  const handleClose = (innerOpen?: boolean) => {
    if (innerOpen == null || innerOpen == false) {
      reset({});
      onClose();
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        title={`Add Property`}
        onOpenChange={handleClose}
        fitContentHeight={false}
        description={`Specify the property details`}
        isSubmitLoading={isSubmitting}
        onSave={onSubmit}
        disabledSubmitButton={!isDirty}
      >
        <FormProvider methods={methods}>
          <PropertyForm />
        </FormProvider>
      </Modal>
      {/* <BaseDialog
        fitContentHeight={true}
        open={open.open && open.formMode == EFormMode.DELETE}
        onClose={handleClose}
        title={`Delete news`}
        onOpenChange={handleClose}
        isDeleteDialog={true}
        isSubmitLoading={isSubmitting}
        onSave={handleDelete}
      >
        Are you sure you want to delete this news
      </BaseDialog> */}
    </>
  );
};

export default ModalProperty;
