"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import {useTranslations} from "next-intl";


interface PublishDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (version?: string) => Promise<void>;
  isLoading?: boolean;
}

export function PublishDraftModal({
  isOpen,
  onClose,
  onPublish,
  isLoading = false,
}: PublishDraftModalProps) {
  const [version, setVersion] = useState("");
  const t = useTranslations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onPublish(version.trim() || undefined);
      setVersion("");
      onClose();

    } catch (error) {
      console.log("Error publishing draft:", error);
    }
  };

  const handleClose = () => {
    setVersion("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-mediumGreen" />
              {t("sections.publishDraft")}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="version">{t("sections.versionLabel")}</Label>
              <Input
                id="version"
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder={t("sections.versionPlaceholder")}
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                {t("sections.versionHelp")}
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-md p-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{t("sections.noteLabel")}</span> {t("sections.publishWarning")}
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isLoading}
            >
              {t("forms.buttons.cancel")}
            </Button>
            <Button 
              type="submit" 
              className="bg-mediumGreen hover:bg-mediumGreen/90"
              disabled={isLoading}
            >
              {isLoading ? t("sections.publishing") : t("forms.buttons.save")}
              {isLoading && (
                <span className="ml-2 loading loading-spinner loading-xs"></span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}