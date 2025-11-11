"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useGetXMLVersionQuery } from "@/lib/redux/features/surveys/surveyApiSlice";
import Spinner from "@/components/shared/Spinner";
import { toast } from "react-toastify";
import type { Form } from "@/types/odk";
import { XMLFormatter } from "./XMLFormatter";
import { useTranslations } from "next-intl";

/**
 * Props interface for XMLViewerModal component
 */
interface XMLViewerModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  version: Form | null;
  projectId: string | number;
  formId: string;
}

/**
 * XMLViewerModal Component
 * 
 * A modal dialog that displays XML content for a specific form version in a formatted, 
 * structured view. Provides functionality to copy or download the XML content.
 */
export function XMLViewerModal({
  isOpen,
  onCloseAction,
  version,
  projectId,
  formId,
}: XMLViewerModalProps) {
  const t = useTranslations();
  // Fetch XML data for the specified form version
  // The query is skipped when the modal is closed or no version is selected
  const { data: xmlData, isLoading, error } = useGetXMLVersionQuery(
    {
      projectId: Number(projectId),
      formId,
      versionId: version?.version || "",
    },
    {
      skip: !version || !isOpen, // Only fetch when modal is open and version is available
    }
  );

  // Debug logging for development and troubleshooting
  React.useEffect(() => {
    if (isOpen && version) {
      console.log("XMLViewerModal - Loading XML for:", {
        projectId: Number(projectId),
        formId,
        versionId: version?.version || 'unknown',
      });
    }
    if (error) {
      console.log("XMLViewerModal - Error:", error);
    }
    if (xmlData) {
      console.log("XMLViewerModal - XML loaded successfully, length:", xmlData.length);
    }
  }, [isOpen, version, error, xmlData, projectId, formId]);

  /**
   * Copies the XML content to the user's clipboard
   * Shows a success/error toast message based on the operation result
   */
  const handleCopyXML = () => {
    if (xmlData) {
      navigator.clipboard.writeText(xmlData).then(() => {
        toast.success(t("toast.success.xmlCopied"));
      }).catch(() => {
        toast.error(t("toast.error.xmlCopyFailed"));
      });
    }
  };

  /**
   * Downloads the XML content as a file
   * Creates a blob with XML content and triggers a download with a formatted filename
   */
  const handleDownloadXML = () => {
    if (xmlData && version) {
      const blob = new Blob([xmlData], { type: "application/xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const formId = version.xmlFormId || 'unknown_form';
      const versionNum = version.version || 'unknown';
      a.download = `${formId}_v${versionNum}.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(t("toast.success.xmlDownloaded"));
    }
  };

  if (!version) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-auto flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>XML Viewer - Version {version?.version || 'Unknown'}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {version?.name || 'Unnamed Form'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyXML}
                disabled={!xmlData}
              >
                <Copy className="h-4 w-4 mr-2" />

              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadXML}
                disabled={!xmlData}
              >
                <Download className="h-4 w-4 mr-2" />

              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <Spinner />
              <span className="ml-2">Loading XML...</span>
            </div>
          )}

          {error && (
            <div className="text-center text-red-600 p-4">
              <p>Error loading XML content</p>
              <p className="text-sm mt-2">
                {error && typeof error === 'object' && 'status' in error
                  ? `HTTP ${error.status}: ${error.data || 'Unknown error'}`
                  : 'Network or parsing error'}
              </p>
              <p className="text-xs mt-1 text-muted-foreground">
                Check console for details
              </p>
            </div>
          )}

          {xmlData && !isLoading && (
            <div className="h-full border rounded-md overflow-auto">
              <div className="h-full overflow-auto p-4 bg-muted/20">
                <XMLFormatter xmlString={xmlData} />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
