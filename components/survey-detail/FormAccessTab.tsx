"use client";
import React, { useState, useEffect } from "react";
import {
  useGetAppUsersQuery,
  useGetProjectFormsQuery,
  useAssignFormMutation,
  useUnassignFormMutation,
  useMatrixQuery
} from "@/lib/redux/features/surveys/surveyApiSlice";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { BsExclamationTriangleFill  } from "react-icons/bs";

interface FormAccessTabProps {
  projectId:number;
}

interface AssignmentState {
  [userId: string]: {
    [formId: string]: boolean;
  };
}

export function FormAccessTab({ projectId }: FormAccessTabProps) {
  const { data: appUsersData, isLoading: usersLoading } = useGetAppUsersQuery(projectId);
  const { data: formsData, isLoading: formsLoading } = useGetProjectFormsQuery(projectId);
  const { data: matrixData, isLoading: matrixLoading } = useMatrixQuery({ projectId });
  const [assignForm] = useAssignFormMutation();
  const [unassignForm] = useUnassignFormMutation();
  const t = useTranslations();

  const [assignments, setAssignments] = useState<AssignmentState>(matrixData || {});
  const [initialAssignments, setInitialAssignments] = useState<AssignmentState>(matrixData || {});
  /* Track changes on the initial state and make savings possible */
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const appUsers = appUsersData?.app_users?.results || [];
  const forms = formsData?.project_forms?.forms || [];

  useEffect(() => {
    if (matrixData) {
      setAssignments(matrixData);
      setInitialAssignments(matrixData);
      setHasUnsavedChanges(false);
    }
  }, [matrixData]);

  // Function to compare current assignments with initial assignments
  const compareAssignments = (current: AssignmentState, initial: AssignmentState): boolean => {
    const currentKeys = Object.keys(current);
    const initialKeys = Object.keys(initial);
    
    if (currentKeys.length !== initialKeys.length) {
      return true; // Different number of users
    }
    
    for (const userId of currentKeys) {
      if (!initial[userId]) {
        return true; // User exists in current but not in initial
      }
      
      const currentUserAssignments = current[userId];
      const initialUserAssignments = initial[userId];
      
      const currentFormKeys = Object.keys(currentUserAssignments);
      const initialFormKeys = Object.keys(initialUserAssignments);
      
      if (currentFormKeys.length !== initialFormKeys.length) {
        return true; // Different number of forms for this user
      }
      
      for (const formId of currentFormKeys) {
        if (currentUserAssignments[formId] !== initialUserAssignments[formId]) {
          return true; // Assignment value differs
        }
      }
    }
    return false; // No differences found
  };

  const handleAssignmentChange = (userId: string, formId: string, assigned: boolean) => {
    const newAssignments = {
      ...assignments,
      [userId]: {
        ...assignments[userId],
        [formId]: assigned
      }
    };
    
    setAssignments(newAssignments);
    setHasUnsavedChanges(compareAssignments(newAssignments, initialAssignments));
    console.log("Updated assignments:", newAssignments)};

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      /* Find assignments that changed from false to true */
      const assignmentsToAdd: Array<{userId: string, formId: string}> = [];
      /*TODO: Handle removals, not working yet*/
     /* const assignmentsToRemove: Array<{userId: string, formId: string}> = [];*/
      
      for (const userId of Object.keys(assignments)) {
        for (const formId of Object.keys(assignments[userId])) {
          const currentValue = assignments[userId][formId];
          const initialValue = initialAssignments[userId]?.[formId] || false;
          
          /* If changed from false to true, add to assignments list */
          if (!initialValue && currentValue) {
            assignmentsToAdd.push({ userId, formId });
          }
        }
      }
      /* Execute assignForm mutations for assignments that changed from false to true*/
      const assignPromises = assignmentsToAdd.map(({ userId, formId }) =>
        assignForm({
          projectId,
          formId,
          user_id: parseInt(userId)
        }).unwrap()
      );
      
      if (assignPromises.length > 0) {
        await Promise.all(assignPromises);
        console.log(`Successfully assigned ${assignPromises.length} form(s) to user(s)`);
      }
      
      setInitialAssignments(assignments);
      setHasUnsavedChanges(false);
      toast.success(t("toast.success.assignmentsSaved"));
    } catch (error) {
      toast.error(t("toast.error.assignmentsSaveFailed"));
    } finally {
      setSaving(false);
    }
  };

  const getFormCount = (formId: string) => {
    return Object.values(assignments || {}).filter(userAssignments => 
      userAssignments && userAssignments[formId]
    ).length;
  };

  if (usersLoading || formsLoading || matrixLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">{t("sections.formAccessMatrix")}</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (appUsers.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">{t("sections.formAccessMatrix")}</h2>
        </div>
        <div className="rounded-md border p-4 text-center text-muted-foreground">
            <BsExclamationTriangleFill  className="h-8 w-8 text-accentBlue mx-auto mb-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">{t("sections.formAccessMatrix")}</h2>
        {hasUnsavedChanges && (
          <button
            onClick={handleSaveChanges}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-accentBlue text-white rounded-md hover:bg-deepGreen transition-colors disabled:opacity-50"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            ) : (
              <CheckIcon className="h-4 w-4 bg-accentBlue" />
            )}
              {t("forms.buttons.save")}
          </button>
        )}
      </div>

      {hasUnsavedChanges && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-yellow-800">{t("msg.warning.saveChanges")}</span>
        </div>
      )}

      <div className="rounded-md border bg-white overflow-hidden">
        <p className="text-sm text-muted-foreground p-4 border-b">
            {t("msg.info.formAssignInfo")}
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-sm border-r">
                  <div className="flex items-center gap-2">
                    Surveyors
                    <Badge variant="destructive" className="bg-accentBlue">
                      {appUsers.filter(user => user.token != null).length} /{appUsers.length}
                    </Badge>
                  </div>
                </th>
                {forms.map((form) => (
                  <th key={form.xmlFormId} className="text-center p-3 font-medium text-sm border-r min-w-[100px] max-w-[200px]">
                    <div className="space-y-1">
                      <div className="font-medium">{form.name || form.xmlFormId}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appUsers.filter(user => user.token != null).map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border-r">
                    <div className="space-y-1">
                      <div className="font-medium">{user.displayName}</div>
                      <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                    </div>
                  </td>
                  {forms.map((form) => (
                    <td key={form.xmlFormId} className="text-center p-3 border-r">
                      <input
                        type="checkbox"
                        checked={assignments[String(user.id)]?.[form.xmlFormId] || false}
                        onChange={(e) => handleAssignmentChange(String(user.id), form.xmlFormId, e.target.checked)}
                        className="w-5 h-5 text-mediumGreen bg-accentBlue  rounded focus:ring-mediumGreen focus:ring-2"
                      />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t-2 border-gray-300 bg-gray-50 font-medium">
                <td className="p-3 border-r">{/* Place for total text */}</td>
                {forms.map((form) => (
                  <td key={form.xmlFormId} className="text-center p-3 border-r">
                    <Badge className="bg-mediumGreen text-white">
                      {getFormCount(form.xmlFormId)}
                    </Badge>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}