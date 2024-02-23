import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface ConfirmationProps {
  buttonTrigger: React.ReactNode;
  variant?: "destructive" | "default";
  cancelText: string;
  confirmText: string;
  contentText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Confirmation({
  buttonTrigger,
  variant = "default",
  cancelText,
  confirmText,
  contentText,
  onCancel,
  onConfirm,
}: ConfirmationProps) {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Popover open={openPopover}>
      <PopoverTrigger onClick={() => setOpenPopover(true)}>
        {buttonTrigger}
      </PopoverTrigger>
      <PopoverContent>
        <div className="mb-6 text-sm">{contentText}</div>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setOpenPopover(false);
              onCancel();
            }}
            className="mr-2"
            variant="outline"
            size="sm"
          >
            {cancelText}
          </Button>

          <Button variant={variant} size="sm" onClick={() => onConfirm()}>
            {confirmText}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
