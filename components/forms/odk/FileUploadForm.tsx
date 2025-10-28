"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import Spinner from "@/components/shared/Spinner";
import { useTranslations } from "next-intl";

interface FileUploadFormProps {
  onSubmit: (data: {
    file: File | null;
    ignoreWarnings: boolean;
    publish: boolean;
    formId?: string;
  }) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function FileUploadForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: FileUploadFormProps) {
  const t = useTranslations();
  const [file, setFile] = useState<File | null>(null);
  const [formId, setFormId] = useState<string>("");
  const [ignoreWarnings, setIgnoreWarnings] = useState(false);
  const [publish, setPublish] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError(t("forms.upload.errors.noFile"));
      return;
    }

    try {
      await onSubmit({
        file,
        ignoreWarnings,
        publish,
        formId: formId.trim() || undefined,
      });
      
      // Reset form after successful submission
      setFile(null);
      setFormId("");
      setIgnoreWarnings(false);
      setPublish(false);
      setError(null);
    } catch (error) {
      setError(t("forms.upload.errors.generic"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="form-id">{t("forms.labels.formIdLabel")}</Label>
          <Input
            id="form-id"
            type="text"
            value={formId}
            onChange={(e) => setFormId(e.target.value)}
            disabled={isLoading}
            placeholder={t("forms.placeholders.formIdPlaceholder")}
          />
          <p className="text-xs text-muted-foreground">
            {t("forms.upload.formIdHelp")}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file-upload">{t("forms.labels.fileLabel")}</Label>
          {/* Hidden native input; we trigger it via the button below */}
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            disabled={isLoading}
            accept=".xml,.xls,.xlsx"
            className="sr-only"
          />
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              <span>{t("forms.buttons.chooseFile")}</span>
            </Button>
            <span className="text-sm text-muted-foreground">
              {file
                ? t("forms.upload.selectedFile", { fileName: file.name })
                : t("forms.upload.noFileSelected")}
            </span>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="ignore-warnings"
            checked={ignoreWarnings}
            onCheckedChange={(checked) => setIgnoreWarnings(checked === true)}
            disabled={isLoading}
          />
          <Label
            htmlFor="ignore-warnings"
            className="text-sm font-normal cursor-pointer"
          >
            {t("forms.upload.ignoreWarnings")}
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="publish"
            checked={publish}
            onCheckedChange={(checked) => setPublish(checked === true)}
            disabled={isLoading}
          />
          <Label
            htmlFor="publish"
            className="text-sm font-normal cursor-pointer"
          >
            {t("forms.upload.publishAfter")}
          </Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            {t("forms.buttons.cancel")}
          </Button>
        )}
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span>{t("forms.buttons.uploading")}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>{t("forms.buttons.uploadForm")}</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}