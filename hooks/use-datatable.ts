"use client";

import { useState, useMemo, useEffect } from "react";
import type { FilterOption, SortConfig, Column } from "@/types/datatable";

export function useDataTable<T>(data: T[], columns: Column<T>[]) {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [filters, setFilters] = useState<FilterOption[]>([]);
	const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

	const filteredAndSortedData = useMemo(() => {
		let result = [...data];

		// Recherche globale
		if (searchTerm) {
			result = result.filter((item) =>
				columns.some((column) => {
					const value = column.accessor
						? column.accessor(item)
						: (item as any)[column.key];
					return String(value).toLowerCase().includes(searchTerm.toLowerCase());
				}),
			);
		}

		// Filtres par colonne
		filters.forEach((filter) => {
			result = result.filter((item) => {
				const column = columns.find((col) => col.key === filter.column);
				if (!column) return true;

				const value = column.accessor
					? column.accessor(item)
					: (item as any)[column.key];
				const stringValue = String(value).toLowerCase();
				const filterValue = filter.value.toLowerCase();

				switch (filter.operator) {
					case "equals":
						return stringValue === filterValue;
					case "contains":
						return stringValue.includes(filterValue);
					case "startsWith":
						return stringValue.startsWith(filterValue);
					case "endsWith":
						return stringValue.endsWith(filterValue);
					default:
						return true;
				}
			});
		});

		// Tri
		if (sortConfig) {
			result.sort((a, b) => {
				const column = columns.find((col) => col.key === sortConfig.key);
				if (!column) return 0;

				const aValue = column.accessor
					? column.accessor(a)
					: (a as any)[sortConfig.key];
				const bValue = column.accessor
					? column.accessor(b)
					: (b as any)[sortConfig.key];

				if (aValue < bValue) {
					return sortConfig.direction === "asc" ? -1 : 1;
				}
				if (aValue > bValue) {
					return sortConfig.direction === "asc" ? 1 : -1;
				}
				return 0;
			});
		}

		return result;
	}, [data, columns, searchTerm, filters, sortConfig]);

	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize;
		return filteredAndSortedData.slice(startIndex, startIndex + pageSize);
	}, [filteredAndSortedData, currentPage, pageSize]);

	const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

	// Réinitialiser la page si elle dépasse le nombre total de pages
	useEffect(() => {
		if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(1);
		}
	}, [currentPage, totalPages]);

	const handleSort = (key: string) => {
		setSortConfig((current) => {
			if (current?.key === key) {
				return current.direction === "asc" ? { key, direction: "desc" } : null;
			}
			return { key, direction: "asc" };
		});
	};

	const addFilter = (filter: FilterOption) => {
		setFilters((current) => {
			const existing = current.findIndex((f) => f.column === filter.column);
			if (existing >= 0) {
				const updated = [...current];
				updated[existing] = filter;
				return updated;
			}
			return [...current, filter];
		});
	};

	const removeFilter = (column: string) => {
		setFilters((current) => current.filter((f) => f.column !== column));
	};

	return {
		searchTerm,
		setSearchTerm,
		currentPage,
		setCurrentPage,
		pageSize,
		setPageSize,
		filters,
		addFilter,
		removeFilter,
		sortConfig,
		handleSort,
		filteredAndSortedData,
		paginatedData,
		totalPages,
		totalItems: filteredAndSortedData.length,
	};
}
