"use client";

import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/shared/Spinner";
import { PublicLinksList } from "@/components/lists/PublicLinksList";
import { PublicLinkFormModal } from "@/components/forms/odk/PublicLinkFormModal";
import { toast } from "react-toastify";
import { extractErrorMessage } from "@/utils";
import { useGetProjectFormsQuery, useAddPublicLinkMutation } from "@/lib/redux/features/surveys/surveyApiSlice";
import type { TPublicLinkSchema } from "@/lib/validationSchemas";

export default function WebPublicAccessPage() {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = Number(params.id as string);
  const urlFormId = searchParams.get("formId");

  const { data: formsData, isLoading, isError, error } = useGetProjectFormsQuery(projectId, {
    skip: Number.isNaN(projectId),
  });

  const forms = formsData?.project_forms?.forms ?? [];

  const [selectedFormId, setSelectedFormId] = React.useState<string | undefined>(
    () => urlFormId || forms[0]?.xmlFormId
  );

  React.useEffect(() => {
    if (urlFormId && forms.length > 0) {
      // If URL has formId, use it (if valid)
      const formExists = forms.some(f => f.xmlFormId === urlFormId);
      if (formExists) {
        setSelectedFormId(urlFormId);
      }
    } else if (!selectedFormId && forms.length > 0) {
      // Otherwise, use default first form
      setSelectedFormId(forms[0].xmlFormId);
    }
  }, [forms, selectedFormId, urlFormId]);

  const [addPublicLink, { isLoading: isCreating }] = useAddPublicLinkMutation();

  const handleFormChange = (formId: string) => {
    setSelectedFormId(formId);
    const locale = (params as any).locale || 'en';
    router.push(`/${locale}/dashboard/projects/${projectId}/surveys/links?formId=${formId}`);
  };

  const handleCreatePublicLink = async (data: TPublicLinkSchema) => {
    if (!selectedFormId) return;
    try {
      await addPublicLink({
        projectId,
        formId: selectedFormId,
        displayName: data.displayName,
        once: data.once,
      }).unwrap();
      toast.success(t("toast.success.publicLinkCreated"));

    } catch (e) {
      const msg = extractErrorMessage(e);
      toast.error("Error creating public link" + (msg ? `: ${msg}` : ""));
      throw e;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border p-4 text-center text-red-600">
        <p>{(error as any)?.data?.message || "Failed to load forms for this project."}</p>
      </div>
    );
  }

  if (!forms.length) {
    return (
      <div className="rounded-md border p-6 text-center text-muted-foreground">
        {t("forms.empty", { default: "No forms available in this project." })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="mb-10 text-2xl font-bold">{/*{t("publicAccess.title", { default: "Public Access" })}*/} Public links management</h1>
      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-3">
          <div>
            <Label htmlFor="form-select" className="font-normal my-10 text-md">
              {t("forms.labels.selectSurveys")}
            </Label>
            <Select
              value={selectedFormId}
              onValueChange={handleFormChange}
            >
              <SelectTrigger id="form-select" className="w-[320px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {forms.map((f) => (
                  <SelectItem key={f.xmlFormId} value={f.xmlFormId}>
                    {f.name || f.xmlFormId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Badge variant="secondary">{forms.length}</Badge>
        </div>

        <div>
          <PublicLinkFormModal
            onSubmitAction={handleCreatePublicLink}
            title={t("forms.buttons.newPl")}
            buttonText={t("forms.buttons.newPl")}
          />
        </div>
      </div>

      {selectedFormId && (
        <PublicLinksList formId={selectedFormId} projectId={projectId} />
      )}
    </div>
  );
}
