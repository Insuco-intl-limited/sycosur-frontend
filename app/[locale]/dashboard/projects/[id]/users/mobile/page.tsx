import { AppUsersTab } from "@/components/survey-detail/AppUsersTab";
import { FormAccessTab } from "@/components/survey-detail/FormAccessTab";

export default function MobileProjectUsersPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const projectId = params.id;

  return (
    <div className="flex flex-col h-full p-4 gap-6">
      <FormAccessTab projectId={parseInt(projectId)} />
      {/* Separator between contexts */}
      <hr className="border-t border-dotted border-accentBlue" />

      <AppUsersTab projectId={projectId} />

    </div>
  );
}
