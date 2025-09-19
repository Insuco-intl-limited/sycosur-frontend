"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import Spinner from "@/components/shared/Spinner";

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
  const [file, setFile] = useState<File | null>(null);
  const [formId, setFormId] = useState<string>("");
  const [ignoreWarnings, setIgnoreWarnings] = useState(false);
  const [publish, setPublish] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please select a file to upload");
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
      console.error("Error uploading file:", error);
      setError("An error occurred while uploading the file");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="form-id">Form ID (optional)</Label>
          <Input
            id="form-id"
            type="text"
            value={formId}
            onChange={(e) => setFormId(e.target.value)}
            disabled={isLoading}
            placeholder="Custom form ID (leave empty to use default)"
          />
          <p className="text-xs text-muted-foreground">
            Provide a custom xmlFormId or leave empty to use the ID from the form file
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file-upload">Form File</Label>
          <Input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            disabled={isLoading}
            accept=".xml,.xls,.xlsx"
          />
          {file && (
            <p className="text-sm text-muted-foreground">
              Selected file: {file.name}
            </p>
          )}
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
            Ignore warnings
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
            Publish form after upload
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
            Cancel
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
              <span>Uploading...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Upload Form</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}