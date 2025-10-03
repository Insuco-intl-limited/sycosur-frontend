"use client";

import React from "react";
import { DevicePhoneMobileIcon, ComputerDesktopIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { DataTable } from "@/components/datatable/datatable";
import type { Column } from "@/types/datatable";
import type { Submission } from "@/types/odk";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


interface DraftFormContentProps {
  formId: string;
  projectId: string;
}

export function DraftFormContent({ formId: _formId, projectId: _projectId }: DraftFormContentProps) {
  // Columns for draft test submissions placeholder
  const columns: Column<Submission>[] = [
    { key: "instanceId", header: "Instance ID", sortable: true },
    { key: "submitter", header: "Submitter", accessor: (s) => s.submitter?.displayName ?? "", sortable: true },
    { key: "submitterType", header: "Type", accessor: (s) => s.submitter?.type ?? "", sortable: true },
    { key: "createdAt", header: "Submitted", sortable: true },
    { key: "reviewState", header: "Review State", sortable: true },
  ];
  const data: Submission[] = [];

  return (
    <div className="space-y-4">
      {/* Top sections side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Test this Draft Section */}
        <div className="rounded-md border p-4">
          <h3 className="text-lg font-semibold mb-3">Test this Draft</h3>

          <div className="bg-muted/50 rounded-md p-3 mb-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Important:</span> Submissions made here will be deleted when you publish this Draft!
            </p>
          </div>

          {/* Test Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-accentBlue hover:bg-accentBlue/90 text-white rounded-md transition-colors font-medium"
              onClick={() => { /* TODO: Implement device test */ }}
            >
              <DevicePhoneMobileIcon className="w-4 h-4" />
              Test on device
            </button>

            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-mediumGreen hover:bg-mediumGreen/90 text-white rounded-md transition-colors font-medium"
              onClick={() => { /* TODO: Implement browser test */ }}
            >
              <ComputerDesktopIcon className="w-4 h-4" />
              Test in browser
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-600/80 text-white rounded-md transition-colors font-medium"
              onClick={() => { /* TODO: Implement browser test */ }}
            >
              <EyeIcon className="w-4 h-4" />
              Preview draft
            </button>
          </div>

        </div>

        {/* Publish Actions Section */}
        <div className="rounded-md border p-4">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircleIcon className="w-5 h-5 text-mediumGreen flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-3">Ready to publish</h3>

              {/* Clear, actionable description */}
              <Alert className="mb-4">
                <AlertTitle>What will happen?</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Publishing this draft will replace the currently published version of the form.</li>
                    <li>Deleting the draft does not impact the published version; only the working draft is removed.</li>
                  </ul>
                </AlertDescription>
              </Alert>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
                  onClick={() => { /* TODO: Implement delete draft */ }}
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete Draft
                </button>

                <button
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-mediumGreen hover:bg-mediumGreen/90 text-white rounded-md transition-colors font-medium"
                  onClick={() => { /* TODO: Implement publish draft */ }}
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  Publish Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width bottom section with DataTable for draft test data */}
      <div className="rounded-md border p-4">
        <h3 className="text-lg font-semibold mb-3">Draft Test Data</h3>
        <p className="text-sm text-muted-foreground mb-4">This table displays submissions created while testing this draft.</p>
        <DataTable
          data={data}
          columns={columns}
          searchable
          paginated
          pageSize={5}
          exportable={false}
          filterable={false}
        />
      </div>
    </div>
  );
}