"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, X } from "lucide-react";
import type { Column, FilterOption } from "@/types/datatable";
import { useTranslations } from "next-intl";

interface DataTableFiltersProps<T> {
	columns: Column<T>[];
	filters: FilterOption[];
	onAddFilter: (filter: FilterOption) => void;
	onRemoveFilter: (column: string) => void;
}

export function DataTableFilters<T>({
	columns,
	filters,
	onAddFilter,
	onRemoveFilter,
}: DataTableFiltersProps<T>) {
	const t = useTranslations("datatable.filters");
	const [selectedColumn, setSelectedColumn] = useState("");
	const [filterValue, setFilterValue] = useState("");
	const [operator, setOperator] =
		useState<FilterOption["operator"]>("contains");

	const filterableColumns = columns.filter((col) => col.filterable !== false);

	const handleAddFilter = () => {
		if (selectedColumn && filterValue) {
			onAddFilter({
				column: selectedColumn,
				value: filterValue,
				operator,
			});
			setSelectedColumn("");
			setFilterValue("");
		}
	};

	return (
		<div className="flex flex-wrap items-center gap-2">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" size="sm">
						<Filter className="h-4 w-4 mr-2" />
						{t("filterButton")}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-80">
					<div className="space-y-4">
						<div>
							<label className="text-sm font-medium">{t("columnLabel")}</label>
							<Select value={selectedColumn} onValueChange={setSelectedColumn}>
								<SelectTrigger>
									<SelectValue placeholder={t("selectColumnPlaceholder")} />
								</SelectTrigger>
								<SelectContent>
									{filterableColumns.map((column) => (
										<SelectItem key={column.key} value={column.key}>
											{column.header}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div>
							<label className="text-sm font-medium">{t("operatorLabel")}</label>
							<Select
								value={operator}
								onValueChange={(value: FilterOption["operator"]) =>
									setOperator(value)
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="contains">{t("operators.contains")}</SelectItem>
									<SelectItem value="equals">{t("operators.equals")}</SelectItem>
									<SelectItem value="startsWith">{t("operators.startsWith")}</SelectItem>
									<SelectItem value="endsWith">{t("operators.endsWith")}</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<label className="text-sm font-medium">{t("valueLabel")}</label>
							<Input
								value={filterValue}
								onChange={(e) => setFilterValue(e.target.value)}
								placeholder={t("filterValuePlaceholder")}
							/>
						</div>
						<Button onClick={handleAddFilter} className="w-full">
							{t("addFilterButton")}
						</Button>
					</div>
				</PopoverContent>
			</Popover>

			{filters.map((filter) => {
				const column = columns.find((col) => col.key === filter.column);
				return (
					<Badge key={filter.column} variant="secondary" className="gap-1">
						{column?.header}: {filter.value}
						<Button
							variant="ghost"
							size="sm"
							className="h-auto p-0 text-muted-foreground hover:text-foreground"
							onClick={() => onRemoveFilter(filter.column)}
						>
							<X className="h-3 w-3" />
						</Button>
					</Badge>
				);
			})}
		</div>
	);
}
