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
    useExportSubmissionsDataMutation
} from "@/lib/redux/features/surveys/surveyApiSlice";
import {downloadFile} from "@/utils";
import {useTranslations} from "next-intl";
import { useWebSubmissionLink } from "@/hooks";
interface SubmissionsTabProps {
    formId: string;
    projectId: string;
}

export function SubmissionsTab({formId, projectId}: SubmissionsTabProps) {
    const {data: submissionsData} = useGetFormSubmissionsQuery({
        projectId: Number(projectId),
        formId
    });

    const { openWebSubmission } = useWebSubmissionLink({ projectId, formId });
    const [exportSubmissionsData, {isLoading: isExporting,  error:exportError}] = useExportSubmissionsDataMutation();
    const t = useTranslations();

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
                    <h2 className="text-xl font-semibold">{t("sections.submissions")}</h2>
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
                    <Button onClick={openWebSubmission} className="gap-2">
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