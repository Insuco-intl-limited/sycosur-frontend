"use client";

import React from "react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Download, Plus} from "lucide-react";
import {toast} from "react-toastify";
import {SubmissionsList} from "@/components/lists/SubmissionsList";
import {
    useGetFormSubmissionsQuery,
    useAddPublicLinkMutation,
    useGetPublicLinksQuery,
    useExportSubmissionsDataMutation
} from "@/lib/redux/features/surveys/surveyApiSlice";
import {downloadFile} from "@/utils";
import {useTranslations} from "next-intl";
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

    const [addPublicLink] = useAddPublicLinkMutation();
    const {data: publicLinksData, refetch} = useGetPublicLinksQuery({projectId: Number(projectId), formId});
    const [exportSubmissionsData, {isLoading: isExporting,  error:exportError}] = useExportSubmissionsDataMutation();
    const t = useTranslations();
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

    const handleSubmissionsExport = async (format: "csv" | "xlsx") => {
        try {
            const response = await exportSubmissionsData({
                projectId: parseInt(projectId),
                formId,
                to: format
            }).unwrap();
            console.log("Export response:", response);
            const blob = response.data instanceof Blob
                ? response.data
                : new Blob([response.data], {type: response.contentType});

            downloadFile({ blob, filename: response.filename || `${formId}-submissions.${format}`});
        } catch (error) {
            toast.error(typeof error === 'string' ? error : "Failed to export submissions");
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="gap-2" disabled={isExporting || submissions.length === 0}>
                                <Download className="h-4 w-4"/>
                                {isExporting ? t("forms.buttons.exporting") : t("forms.buttons.export")}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => handleSubmissionsExport("csv")}
                                disabled={isExporting}
                            >
                             CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleSubmissionsExport("xlsx")}
                                disabled={isExporting}
                            >
                              EXCEL
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={handleNewSubmission} className="gap-2">
                        <Plus className="h-4 w-4"/>
                        {t("forms.buttons.newWebSubmission")}
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