"use client";

import React from "react";
import {useRouter, useParams} from "next/navigation";
import {FileUploadFormModal} from "@/components/forms/odk/FileUploadFormModal";
import {useGetProjectFormsQuery} from "@/lib/redux/features/surveys/surveyApiSlice";
import {Form} from "@/types/odk";
import {EyeIcon, PencilIcon} from "@heroicons/react/24/solid";
import {useFormDraft} from "@/hooks";
import {Badge} from "@/components/ui/badge";
import {useTranslations} from "next-intl";

interface FormsTabProps {
    projectId: string | number;
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
    projectId: string | number;
}

function FormsList({forms, isLoading, isError, error, projectId}: FormsListProps) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isError) {
        return <div
            className="text-center text-red-500">{error?.data?.message || 'An error occurred while loading forms, this project may not be related to ODK'}</div>;
    }

    if (forms.length === 0) {
        return <div className="text-center text-muted-foreground">No forms available for this project.</div>;
    }

    return (
        <ul className="space-y-2">
            {forms.map((form) => (
                <FormItem key={form.xmlFormId} form={form} projectId={projectId}/>
            ))}
        </ul>
    );
}

interface FormItemProps {
    form: Form;
    projectId: string | number;
}

function FormItem({form, projectId}: FormItemProps) {
    const router = useRouter();
    const params = useParams();
    const formName = form.name || form.xmlFormId || "Untitled form";
    const formVersion = String(form.version ?? "-");
    const isPublished = form.publish === true;

    // Check if form has a draft
    const {hasDraft, isLoading: isDraftLoading, draft} = useFormDraft({
        projectId,
        formId: form.xmlFormId
    });

    const handleEditDraft = () => {
        const locale = params.locale || 'en';
        router.push(`/${locale}/dashboard/projects/${projectId}/surveys/forms/${form.xmlFormId}?tab=edit-form`);
    };

    return (
        <li className="rounded border">
            <div className="flex items-center justify-between px-3 py-2">
                <div>
                    <div className="font-medium text-accentBlue hover:text-mediumGreen">{formName}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Version: {formVersion}</span>
                        <div className={`px-2 py-1 rounded-md ${
                            isPublished
                                ? 'bg-mediumGreen text-white'
                                : 'bg-yellow-400 text-black'
                        }`}>
                            {isPublished ? 'published' : 'draft'}
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => {
                            const locale = params.locale || 'en';
                            router.push(`/${locale}/dashboard/projects/${projectId}/surveys/forms/${form.xmlFormId}`);
                        }}
                        className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                        title="View form details"
                    >
                        <EyeIcon className="w-4 h-4 text-gray-600"/>
                    </button>
                </div>
            </div>

            {/* Draft edit component */}
            {isPublished && !isDraftLoading && hasDraft && (
                <div className="ml-8 px-3 py-2 bg-blue-50 border-t border-blue-100">
                    <div className="flex items-center gap-4 justify-end">
                        <span className="text-xs text-blue-400 font-medium">draft version: {draft?.version}</span>
                        <button
                            // onClick={handleEditDraft}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            title="Edit draft"
                        >
                            <PencilIcon className="w-3 h-3"/>

                        </button>
                    </div>
                </div>
            )}
        </li>
    );
}