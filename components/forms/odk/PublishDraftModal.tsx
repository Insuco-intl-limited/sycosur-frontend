"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircleIcon } from "@heroicons/react/24/solid";


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
            Publish Draft
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="version">Version (optional)</Label>
              <Input
                id="version"
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="e.g., 1.1, v2.0, beta-1"
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                If left empty, a version will be automatically generated.
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-md p-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Note:</span> Publishing this draft will replace the currently published version of the form.
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
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-mediumGreen hover:bg-mediumGreen/90"
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Publish Draft"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}