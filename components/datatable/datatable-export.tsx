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
import { exportToCSV, exportToExcel, exportToJSON } from "@/utils/export";

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

export function DataTableExport({
	data,
	formats = defaultFormats,
	filename = "export",
}: DataTableExportProps) {
	const handleExport = (format: ExportFormat["type"]) => {
		switch (format) {
			case "csv":
				exportToCSV(data, `${filename}.csv`);
				break;
			case "json":
				exportToJSON(data, `${filename}.json`);
				break;
			case "excel":
				exportToExcel(data, `${filename}.xlsx`);
				break;
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm">
					<Download className="h-4 w-4 mr-2" />
					Exporter
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{formats.map((format) => (
					<DropdownMenuItem
						key={format.type}
						onClick={() => handleExport(format.type)}
					>
						{format.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
