"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { ExportFormat } from "@/types/datatable";
import { exportToCSV, exportToJSON } from "@/utils/export";
import { useTranslations } from "next-intl";

interface DataTableExportProps {
	data: any[];
	formats?: ExportFormat[];
	filename?: string;
}

const defaultFormats: ExportFormat[] = [
	{ type: "csv", label: "CSV" },
	{ type: "json", label: "JSON" },
	{ type: "excel", label: "Excel" },
];

// We'll use the translated labels when the component is rendered

export function DataTableExport({
	data,
	formats = defaultFormats,
	filename = "export",
}: DataTableExportProps) {
	const t = useTranslations("datatable.export");
	const handleExport = (format: ExportFormat["type"]) => {
		switch (format) {
			case "csv":
				exportToCSV(data, `${filename}.csv`);
				break;
			case "json":
				exportToJSON(data, `${filename}.json`);
				break;
			// case "excel":
			// 	exportToExcel(data, `${filename}.xlsx`);
			// 	break;
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm">
					<Download className="h-4 w-4 mr-2" />
					{t("exportButton")}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{formats.map((format) => (
					<DropdownMenuItem
						key={format.type}
						onClick={() => handleExport(format.type)}
					>
						{t(`format.${format.type}`)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
