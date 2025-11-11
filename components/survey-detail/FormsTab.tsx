"use client";

import React from "react";
import {FormItem} from "@/components/survey-detail/FormItemList"
import {FileUploadFormModal} from "@/components/forms/odk/FileUploadFormModal";
import {useGetProjectFormsQuery} from "@/lib/redux/features/surveys/surveyApiSlice";
import {Form} from "@/types/odk";
import { BsExclamationTriangleFill } from "react-icons/bs";
import {Badge} from "@/components/ui/badge";
import {useTranslations} from "next-intl";

interface FormsTabProps {
    projectId: number;
}

export function FormsTab({projectId}: FormsTabProps) {
    const {data, isLoading, isError, error} = useGetProjectFormsQuery(projectId);
    const forms = data?.project_forms?.forms || [];
     const t = useTranslations();
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                {/*{forms.length>0 &&*/}
                    <div className="flex items-center gap-2"><h2 className="text-xl font-semibold">{t("forms._self")}</h2>
                        <Badge variant="destructive" className="bg-accentBlue ml-2">
                            {forms.length}
                        </Badge>
                    </div>
                {/*}*/}

                <FileUploadFormModal
                    projectId={projectId}
                    title="Upload Form"
                />
            </div>
            <div className="rounded-md border p-4">
                <FormsList
                    forms={forms}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    projectId={projectId}
                />
            </div>
        </div>
    );
}
interface FormsListProps {
    forms: Form[];
    isLoading: boolean;
    isError: boolean;
    error: any;
    projectId: number;
}

function FormsList({forms, isLoading, isError, error, projectId}: FormsListProps) {
     const t = useTranslations();
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isError) {
        return <div className="text-center text-amber-600">
                    {error?.data?.message || t("notFound.form")}
               </div>;
    }

    if (forms.length === 0) {
        return <div className="text-center text-muted-foreground">No forms available for this project</div>;
    }

    return (
        <ul className="space-y-2">
            {forms.map((form) => (
                <FormItem key={form.xmlFormId} form={form} projectId={projectId}/>
            ))}
        </ul>
    );
}

