import { toast } from "react-toastify";
import { useAddPublicLinkMutation, useGetPublicLinksQuery } from "@/lib/redux/features/surveys/surveyApiSlice";
import { useCallback } from "react";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { selectUserFullName } from "@/lib/redux/features/users/userSlice";

/**
 * Reusable hook to open the web submission page for a form.
 * It will reuse the existing public link named with the user's full name if present,
 * otherwise it will create it and then open it in a new tab.
 */
export default function useWebSubmissionLink(params: { projectId: string | number; formId: string }) {
  const { projectId, formId } = params;
  const userFullName = useAppSelector(selectUserFullName);

  const [addPublicLink] = useAddPublicLinkMutation();
  const { data: publicLinksData, refetch } = useGetPublicLinksQuery({
    projectId: Number(projectId),
    formId,
  });

  const handleOpenWebSubmission = useCallback(async () => {
    try {
      const existingLinks = publicLinksData?.public_links?.results || [];
      const existingWebLink = existingLinks.find(
        (link: any) => link.displayName === userFullName && !link.deletedAt
      );

      let publicUrl: string;
      if (existingWebLink) {
        publicUrl = existingWebLink.public_url;
      } else {
        const result = await addPublicLink({
          projectId: parseInt(String(projectId)),
          formId,
          displayName: userFullName,
          once: false,
        }).unwrap();
        publicUrl = result.public_link.public_url;
        refetch();
      }

      if (typeof window !== "undefined") {
        window.open(publicUrl, "_blank");
      }
    } catch (error: any) {
      toast.error("Failed to create or access web submission link");
    }
  }, [publicLinksData?.public_links?.results, addPublicLink, projectId, formId, refetch, userFullName]);

  return { openWebSubmission: handleOpenWebSubmission };
}
