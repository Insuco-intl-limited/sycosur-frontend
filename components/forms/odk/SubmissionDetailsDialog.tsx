"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Submission } from "@/types/odk";
import { formatDate } from "@/utils/formatDate";

export interface SubmissionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission: Submission | null;
}

export function SubmissionDetailsDialog({ open, onOpenChange, submission }: SubmissionDetailsDialogProps) {
  const reviewBadge = (value?: string | null) => {
    if (!value) return <Badge variant="outline">None</Badge>;
    const variant = value === "approved" ? "default" :
                  value === "rejected" ? "destructive" :
                  value === "hasIssues" ? "secondary" : "outline";
    return <Badge variant={variant}>{value}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submission Details</DialogTitle>
          {submission && (
            <DialogDescription>
              Instance ID: <span className="font-mono">{submission.instanceId}</span>
            </DialogDescription>
          )}
        </DialogHeader>

        {submission && (
          <div className="space-y-6">
            {/* Meta info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs uppercase text-muted-foreground">Submitted</div>
                <div>{formatDate(submission.createdAt)}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground">Updated</div>
                <div>{submission.updatedAt ? formatDate(submission.updatedAt) : "—"}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground">Review State</div>
                <div>{reviewBadge(submission.reviewState)}</div>
              </div>
            </div>

            {/* Submitter */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs uppercase text-muted-foreground">Submitter</div>
                <div>{submission.submitter?.displayName || "—"}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground">Type</div>
                <div><Badge variant="outline">{submission.submitter?.type || "—"}</Badge></div>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground">Submitter ID</div>
                <div className="font-mono text-sm">{submission.submitterId}</div>
              </div>
            </div>

            {/* Device / Agent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase text-muted-foreground">Device ID</div>
                <div className="font-mono text-sm">{submission.deviceId ?? "—"}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground">User Agent</div>
                <div className="text-sm break-words">
                  {submission.userAgent || "—"}
                </div>
              </div>
            </div>

            {/* Current Version (no instanceId as requested) */}
            <div className="space-y-2">
              <div className="text-sm font-semibold">Current Version</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs uppercase text-muted-foreground">Instance Name</div>
                  <div className="font-mono text-sm">{submission.currentVersion?.instanceName || "—"}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-muted-foreground">Created</div>
                  <div>{submission.currentVersion?.createdAt ? formatDate(submission.currentVersion.createdAt) : "—"}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-muted-foreground">Submitter</div>
                  <div>
                    {submission.currentVersion?.submitter?.displayName || "—"}
                    {submission.currentVersion?.submitter?.type ? (
                      <Badge variant="outline" className="ml-2">{submission.currentVersion.submitter.type}</Badge>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <button
                className="ml-auto inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:opacity-90"
                onClick={() => onOpenChange(false)}
              >
                Close
              </button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SubmissionDetailsDialog;

