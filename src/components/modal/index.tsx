import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "full";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  title: string;
  children?: React.ReactNode;
  description?: string | React.ReactNode;
  descriptionUnderTitle?: boolean;
  onSave?: () => void;
  isSubmitLoading?: boolean;
  fitContentHeight?: boolean;
  footerActions?: React.ReactNode;
  removeDefaultActions?: boolean;
  submitTitle?: string;
  submitVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
  disabledSubmitButton?: boolean;
  isDeleteDialog?: boolean;

  size?: ModalSize; // ✅ NEW
}

const Modal = (props: ModalProps) => {
  const {
    open,
    onClose,
    children,
    title,
    description,
    descriptionUnderTitle = true,
    onSave,
    isSubmitLoading,
    onOpenChange,
    fitContentHeight = false,
    footerActions,
    removeDefaultActions = false,
    submitTitle = "Submit",
    submitVariant = "default",
    disabledSubmitButton,
    isDeleteDialog = false,
    size = "6xl", // ✅ default size
  } = props;

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          onClose();
        }
        onOpenChange(val);
      }}
    >
      <DialogContent
        size={size}
        className={`${
          fitContentHeight ? "" : "max-h-[90vh]"
        } flex flex-col p-0`}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {descriptionUnderTitle && description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
          {!descriptionUnderTitle && description ? description : children}
        </div>

        {/* Footer */}
        {!removeDefaultActions && (
          <div className="px-6 py-4 border-t backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <DialogFooter className="flex flex-row justify-end gap-2">
              {footerActions}

              <Button
                type="button"
                variant="outline"
                className="w-fit"
                onClick={onClose}
                disabled={isSubmitLoading}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitLoading || disabledSubmitButton}
                variant={isDeleteDialog ? "destructive" : submitVariant}
                className="w-fit"
                onClick={() => {
                  if (onSave) onSave();
                }}
              >
                {isSubmitLoading
                  ? isDeleteDialog
                    ? "Deleting..."
                    : "Saving..."
                  : isDeleteDialog
                    ? "Delete"
                    : submitTitle}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
