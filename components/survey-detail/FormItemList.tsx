"use client";
import React, { useState } from "react";
import {useFormDraft, useWebSubmissionLink, useHasSubmissions} from "@/hooks";
import {useRouter, useParams} from "next/navigation";
import {Form} from "@/types/odk";
import { ActionButtons, ActionItem } from "@/components/shared/ActionButtons";
import { BiSolidDownload, BiSolidPencil, BiSolidLayer, BiSolidLayerPlus, BiLink, BiTrash} from "react-icons/bi";
import { BsGridFill } from "react-icons/bs";
import {useTranslations} from "next-intl";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SubmissionsTab } from "@/components/form-detail";

import { downloadFile } from "@/utils/download";
import {useLazyDownloadFormQuery} from "@/lib/redux/features/surveys/surveyApiSlice";
import Spinner from "@/components/shared/Spinner";

interface FormItemProps {
    form: Form;
    projectId:number;
}

export function FormItem({form, projectId}: FormItemProps) {
    const router = useRouter();
    const params = useParams();
    const formName = form.name || form.xmlFormId || "Untitled form";
    const formVersion = String(form.version ?? "-");
    const isPublished = form.publish === true;
    const t = useTranslations();
    const {has, data} = useHasSubmissions({projectId, formId: form.xmlFormId});

    const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);

    // Check if form has a draft
    // const {hasDraft, isLoading: isDraftLoading, draft} = useFormDraft({
    //     projectId,
    //     formId: form.xmlFormId
    // });

    // DRY: use reusable hook to open web submission
    const { openWebSubmission } = useWebSubmissionLink({ projectId, formId: form.xmlFormId });

    // Prepare lazy download hook (no initial request until triggered)
    const [triggerDownload, { isFetching: isDownloading }] = useLazyDownloadFormQuery();

    const handleDownload = async () => {
        try {
            const payload = await triggerDownload({ projectId, formId: form.xmlFormId }).unwrap();
            if (!payload || !payload.data) return;
            const blob: Blob = payload.data as Blob;
            const filename = payload.filename || `${form.xmlFormId || "form"}.xlsx`;
            downloadFile({ blob, filename });
        } catch (e) {
            console.error("Failed to download form", e);
        }
    };

    const locale = (params as any).locale || 'en';
    const actions: ActionItem[] = [
        {
            title: t("alt.manageWebUsers"),
            icon: <BiLink className="w-4 h-4" />,
            className: "bg-gray-100 hover:bg-gray-200 text-gray-900",
            onClick: () => {
                const locale = (params as any).locale || 'en';
                router.push(`/${locale}/dashboard/projects/${projectId}/surveys/links?formId=${form.xmlFormId}`);
            },
            disabled: !isPublished,
        },
        {
           title: t("alt.surveyors"),
           icon: <BsGridFill  className="w-5 h-5" />,
           className: "bg-gray-100 hover:bg-gray-200 text-gray-900",
            onClick: () => {
                const locale = (params as any).locale || 'en';
                router.push(`/${locale}/dashboard/projects/${projectId}/users/mobile`);
            },
            disabled: !isPublished,
        },
        {
           title: t("alt.newWebSubmission"),
           icon: <BiSolidLayerPlus  className="w-5 h-5" />,
           className: "bg-gray-100 hover:bg-gray-200 text-gray-900",
           onClick: openWebSubmission,
            disabled: !isPublished,
        },
        {
           title: t("alt.viewSubmissions"),
           icon: <BiSolidLayer  className="w-4 h-4" />,
           className: "bg-gray-100 hover:bg-gray-200 text-gray-900",
           onClick: () => setIsSubmissionsOpen(true),
            disabled: !isPublished,
        },
        {
            url: `/${locale}/dashboard/projects/${projectId}/surveys/forms/${form.xmlFormId}`,
            title: t("alt.editForm"),
            icon: <BiSolidPencil  className="w-4 h-4" />,
            className: "bg-grey-100 hover:bg-gray-200 text-gray-900",
        },
        {
           title: t("alt.downloadForm"),
           icon: isDownloading? <Spinner size="xs" /> :<BiSolidDownload  className="w-4 h-4" />,
           className: "bg-gray-100 hover:bg-gray-200 text-gray-900",
           onClick: handleDownload,
           disabled: isDownloading || !isPublished ,
        },
        // {
        //    title: t("alt.deleteForm"),
        //    icon: <BiTrash  className="w-4 h-4" />,
        //    className: "bg-gray-100 hover:bg-gray-200 text-gray-900",
        //    onClick: ()=>{},
        //    disabled: has ,
        // },
    ];

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
                            {isPublished ? t("badge.published") : t('badge.draft')}
                        </div>
                    </div>
                </div>
                <div>
                    <ActionButtons actions={actions} className="justify-end" size="sm" />
                </div>
            </div>

        {/* Submissions Modal */}
        <Dialog open={isSubmissionsOpen} onOpenChange={setIsSubmissionsOpen}>
            <DialogContent className="sm:max-w-[1280px] w-[100vw]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-auto">
                    <SubmissionsTab formId={form.xmlFormId} projectId={String(projectId)} />
                </div>
            </DialogContent>
        </Dialog>
        </li>
    );
}