import { toast } from "react-toastify";
import { useAddPublicLinkMutation, useGetPublicLinksQuery } from "@/lib/redux/features/surveys/surveyApiSlice";
import { useCallback } from "react";

/**
 * Reusable hook to open the web submission page for a form.
 * It will reuse the existing public link named LINK_DISPLAY_NAME if present,
 * otherwise it will create it and then open it in a new tab.
 */
export default function useWebSubmissionLink(params: { projectId: string | number; formId: string }) {
  const { projectId, formId } = params;
  const LINK_DISPLAY_NAME = "For_Web_Submissions";

  const [addPublicLink] = useAddPublicLinkMutation();
  const { data: publicLinksData, refetch } = useGetPublicLinksQuery({
    projectId: Number(projectId),
    formId,
  });

  const handleOpenWebSubmission = useCallback(async () => {
    try {
      const existingLinks = publicLinksData?.public_links?.results || [];
      const existingWebLink = existingLinks.find(
        (link: any) => link.displayName === LINK_DISPLAY_NAME && !link.deletedAt
      );

      let publicUrl: string;
      if (existingWebLink) {
        publicUrl = existingWebLink.public_url;
      } else {
        const result = await addPublicLink({
          projectId: parseInt(String(projectId)),
          formId,
          displayName: LINK_DISPLAY_NAME,
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
  }, [publicLinksData?.public_links?.results, addPublicLink, projectId, formId, refetch]);

  return { openWebSubmission: handleOpenWebSubmission };
}
