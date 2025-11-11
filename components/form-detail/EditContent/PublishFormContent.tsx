"use client";

import React from "react";
import { PencilSquareIcon, EyeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import {VersionsTab} from "@/components/form-detail";
import {useTranslations} from "next-intl";

interface PublishFormContentProps {
  formId: string;
  projectId: string;
}

export function PublishFormContent({ formId, projectId }: PublishFormContentProps) {
    const t = useTranslations();
    return (
    <div className="space-y-4">

      {/*<div className="grid grid-cols-2 gap-4">/!* Published Form Status *!/*/}
      {/*  <div className="rounded-md border p-4">*/}
      {/*    <div className="flex items-start gap-3 mb-4">*/}
      {/*      <CheckCircleIcon className="w-5 h-5 text-mediumGreen flex-shrink-0 mt-0.5"/>*/}
      {/*      <div className="flex-1">*/}
      {/*        <h3 className="text-lg font-semibold mb-2">{t("sections.formPublished")}</h3>*/}
      {/*          <div className="bg-muted/50 rounded-md p-3 mb-4">*/}
      {/*              <p className="text-sm text-muted-foreground">*/}
      {/*                {t("sections.formPublishedDescription")}*/}
      {/*              </p>*/}
      {/*          </div>*/}
      {/*        /!* View Actions *!/*/}
      {/*        <div className="flex flex-col sm:flex-row gap-3">*/}
      {/*          <button*/}
      {/*              className="flex items-center justify-center gap-2 px-4 py-2 bg-accentBlue hover:bg-accentBlue/90 text-white rounded-md transition-colors font-medium"*/}
      {/*              onClick={() => null}*/}
      {/*          >*/}
      {/*            <EyeIcon className="w-4 h-4"/>*/}
      {/*              {t("forms.buttons.previewForm")}*/}
      {/*          </button>*/}

      {/*        </div>*/}

      {/*      </div>*/}
      {/*    </div>*/}

      {/*  </div>*/}
      {/*  /!* Update Form Section *!/*/}
      {/*  <div className="rounded-md border p-4">*/}
      {/*    <h3 className="text-lg font-semibold mb-3">{t("sections.updateForm")}</h3>*/}

      {/*    <div className="bg-muted/50 rounded-md p-3 mb-4">*/}
      {/*      <p className="text-sm text-muted-foreground">*/}
      {/*        {t("sections.updateFormDescription")}*/}
      {/*      </p>*/}
      {/*    </div>*/}

      {/*    <button*/}
      {/*        className="flex items-center justify-center gap-2 px-4 py-2 bg-mediumGreen hover:bg-mediumGreen/90 text-white rounded-md transition-colors font-medium"*/}
      {/*        onClick={() => null
      {/*        }
      {/*    >*/}
      {/*      <PencilSquareIcon className="w-4 h-4"/>*/}
      {/*      {t("forms.buttons.uploadForm")}*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}

                           {/*Form Version Section */}
      <div className="rounded-md border p-4">
          <VersionsTab formId={formId} projectId={projectId} />
      </div>



    </div>
  );
}