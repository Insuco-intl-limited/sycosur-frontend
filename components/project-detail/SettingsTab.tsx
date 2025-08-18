"use client";

import React from "react";

interface SettingsTabProps {
  projectId: string | number;
}

export function SettingsTab({ projectId }: SettingsTabProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Settings</h2>
      <p className="text-muted-foreground">
        Configure settings for project ID: {projectId}
      </p>
      
      {/* This would be replaced with actual settings UI */}
      <div className="rounded-md border p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">General Settings</h3>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span>Project Visibility</span>
                <select className="rounded-md border px-3 py-1">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Team Only</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Enable Notifications</span>
                <input type="checkbox" className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Advanced Settings</h3>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span>Archive Project</span>
                <button className="rounded-md bg-yellow-500 px-3 py-1 text-white">Archive</button>
              </div>
              <div className="flex items-center justify-between">
                <span>Delete Project</span>
                <button className="rounded-md bg-red-500 px-3 py-1 text-white">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}