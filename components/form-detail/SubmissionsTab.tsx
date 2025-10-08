"use client";

import React from "react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Download, Plus} from "lucide-react";
import {toast} from "react-toastify";
import {SubmissionsList} from "@/components/lists/SubmissionsList";
import {
    useGetFormSubmissionsQuery,
    useLazyExportSubmissionsDataQuery,
    useAddPublicLinkMutation,
    useGetPublicLinksQuery
} from "@/lib/redux/features/surveys/surveyApiSlice";

interface SubmissionsTabProps {
    formId: string;
    projectId: string;
}

const LINK_DISPLAY_NAME = "For_Web_Submissions";

export function SubmissionsTab({formId, projectId}: SubmissionsTabProps) {
    const {data: submissionsData} = useGetFormSubmissionsQuery({
        projectId: Number(projectId),
        formId
    });
    const [triggerExport, {isFetching: isExporting}] = useLazyExportSubmissionsDataQuery();
    const [addPublicLink] = useAddPublicLinkMutation();
    const {data: publicLinksData, refetch} = useGetPublicLinksQuery({projectId: Number(projectId), formId});

    const handleNewSubmission = async () => {
        try {
            const existingLinks = publicLinksData?.public_links?.results || [];
            const existingWebLink = existingLinks.find(
                link => link.displayName === LINK_DISPLAY_NAME && !link.deletedAt
            );
            let publicUrl: string;

            if (existingWebLink) {
                publicUrl = existingWebLink.public_url;
            } else {
                const result = await addPublicLink({
                    projectId: parseInt(projectId),
                    formId,
                    displayName: LINK_DISPLAY_NAME,
                    once: false
                }).unwrap();

                publicUrl = result.public_link.public_url;
                refetch();
            }
            window.open(publicUrl, '_blank');

        } catch (error: any) {
            toast.error('Failed to create or access web submission link');
        }

    };

    const handleSubmissionsExport = async () => {
        try {
            const csvText = await triggerExport({projectId: Number(projectId), formId}).unwrap();
            const blob = new Blob([csvText], {type: "text/csv;charset=utf-8"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${formId}-submissions.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Failed to export submissions:", e);
        }
    };

    const submissions = submissionsData?.submissions?.results || [];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Submissions</h2>
                    <Badge variant="destructive" className="bg-accentBlue ml-2">
                        {submissions.length}
                    </Badge>
                </div>

                <div className="flex items-center gap-2">
                    <Button onClick={handleSubmissionsExport} className="gap-2"
                            disabled={isExporting || submissions.length === 0}>
                        <Download className="h-4 w-4"/>
                        {isExporting ? "Exporting..." : "Export to CSV"}
                    </Button>
                    <Button onClick={handleNewSubmission} className="gap-2">
                        <Plus className="h-4 w-4"/>
                        New Web Submission
                    </Button>
                </div>
            </div>

            <SubmissionsList
                formId={formId}
                projectId={projectId}
            />
        </div>
    );
}