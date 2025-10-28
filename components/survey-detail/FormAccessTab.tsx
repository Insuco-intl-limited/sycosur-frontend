"use client";

import React from "react";

interface FormAccessTabProps {
  projectId: string | number;
}


export function FormAccessTab({ projectId }: FormAccessTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Form Access Matrix</h2>
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          Save Changes
        </button>
      </div>
        
    </div>
  );
}