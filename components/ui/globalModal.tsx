import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";

interface IGlobalModalProps {
  isDesktop: boolean;
  header: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  isRTL: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side: "left" | "right" | "top" | "bottom";
  classname?: string;
}

export default function GlobalModal({
  isDesktop,
  header,
  description,
  children,
  isRTL,
  open,
  onOpenChange,
  side,
  classname,
}: IGlobalModalProps) {
  return isDesktop ? (
    <ModalView
      header={header}
      description={description}
      isRTL={isRTL}
      open={open}
      onOpenChange={onOpenChange}
      isDesktop={isDesktop}
      side={side}
      classname={classname}
    >
      {children}
    </ModalView>
  ) : (
    <SheetView
      header={header}
      description={description}
      isRTL={isRTL}
      open={open}
      onOpenChange={onOpenChange}
      side={side}
      isDesktop={isDesktop}
      classname={classname}
    >
      {children}
    </SheetView>
  );
}

const ModalView = ({
  header,
  description,
  children,
  isRTL,
  open,
  onOpenChange,
}: IGlobalModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-5xl! text-center"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

const SheetView = ({
  header,
  description,
  children,
  isRTL,
  open,
  onOpenChange,
  side,
}: IGlobalModalProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="text-center"
        dir={isRTL ? "rtl" : "ltr"}
        side={side}
      >
        <SheetHeader>
          <SheetTitle>{header}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};
