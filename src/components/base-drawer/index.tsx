import { useIsMobile } from "../../hooks/useBreakpoint";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { X } from "lucide-react";

interface BaseDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  description?: string;
  onSave?: () => void;
  isSubmitLoading?: boolean;
  onOpenChange: (open: boolean) => void;
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
  direction?: "top" | "bottom" | "left" | "right";
  width?: number;
}

const BaseDrawer = (props: BaseDrawerProps) => {
  const {
    open,
    onClose,
    children,
    title,
    description,
    onSave,
    isSubmitLoading,
    onOpenChange,
    footerActions,
    removeDefaultActions = false,
    submitTitle = "Submit",
    submitVariant = "default",
    disabledSubmitButton,
    direction = "right",
    width = 450,
  } = props;

  const isMobile = useIsMobile();

  return (
    <Drawer
      direction={direction}
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          onClose();
        }
        onOpenChange(val);
      }}
    >
      <DrawerContent
        direction={direction}
        style={
          direction === "left" || direction === "right"
            ? { width: isMobile ? "100%" : `${width}px` }
            : undefined
        }
        className="flex flex-col h-full overflow-hidden" // 👈 overflow-hidden
      >
        <DrawerHeader className="px-4 relative shrink-0">
          {" "}
          {/* 👈 shrink-0 */}
          <div>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </div>
          <div
            onClick={() => onClose()}
            className="absolute right-5 bottom-6 hover:cursor-pointer hover:text-red-500"
          >
            <X width={20} height={20} />
          </div>
        </DrawerHeader>

        {/* Scrollable content */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
          {children}
        </div>

        {/* Sticky footer */}
        <DrawerFooter className="flex flex-row justify-end gap-2 shrink-0 bg-white border-t border-slate-100 px-6 py-4">
          {footerActions}
          {!removeDefaultActions && (
            <>
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
                variant={submitVariant}
                className="w-fit"
                onClick={() => onSave?.()}
              >
                {isSubmitLoading ? "Saving..." : submitTitle}
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BaseDrawer;
