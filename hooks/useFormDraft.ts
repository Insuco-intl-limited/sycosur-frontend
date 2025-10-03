"use client";

import { useMemo } from "react";
import { useGetFormDraftQuery } from "@/lib/redux/features/surveys/surveyApiSlice";
import type { Form } from "@/types/odk";

interface UseFormDraftArgs {
  projectId?: number | string;
  formId?: string;
}

interface UseFormDraftResult {
  hasDraft: boolean;
  draft: Form | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

export function useFormDraft({ projectId, formId }: UseFormDraftArgs): UseFormDraftResult {
  const numericProjectId = typeof projectId === "string" ? Number(projectId) : projectId;
  const skip = !formId || numericProjectId === undefined || Number.isNaN(Number(numericProjectId));

  const { data, isLoading, isFetching, isError, error, refetch } = useGetFormDraftQuery(
    { projectId: Number(numericProjectId), formId: String(formId) },
    { skip }
  );

  const { hasDraft, draft } = useMemo(() => {
    if (skip) return { hasDraft: false, draft: null as Form | null };
    if (isError) {
      // On any error, consider there is no draft (safer default)
      return { hasDraft: false, draft: null as Form | null };
    }
    const d = data?.form_draft ?? null;
    return { hasDraft: !!d, draft: d };
  }, [skip, isError, error, data]);

  return {
    hasDraft,
    draft,
    isLoading,
    isFetching,
    isError,
    error,
    refetch: () => { void refetch(); },
  };
}

export default useFormDraft;
