"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import type { ActionItem } from "@/types/datatable";
import { useTranslations } from "next-intl";

interface DataTableActionsProps<T> {
	item: T;
	actions: ActionItem<T>[];
}

export function DataTableActions<T>({
	item,
	actions,
}: DataTableActionsProps<T>) {
	const t = useTranslations("datatable.actions");
	if (!actions || actions.length === 0) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">{t("openMenu")}</span>
					<MoreVertical className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{actions.map((action, index) => {
					const isDisabled = action.disabled ? action.disabled(item) : false;
					const isDestructive = action.variant === "destructive";

					return (
						<div key={index}>
							<DropdownMenuItem
								onClick={() => !isDisabled && action.onClick(item)}
								disabled={isDisabled}
								className={
									isDestructive ? "text-destructive focus:text-destructive" : ""
								}
							>
								{action.icon && <span className="mr-2">{action.icon}</span>}
								{action.label}
							</DropdownMenuItem>
							{index < actions.length - 1 &&
								action.variant === "destructive" && <DropdownMenuSeparator />}
						</div>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
