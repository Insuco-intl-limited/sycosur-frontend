"use client";
import { BsSkipEndFill ,BsSkipStartFill, BsFillCaretLeftFill, BsFillCaretRightFill   } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface DataTablePaginationProps {
	currentPage: number;
	totalPages: number;
	pageSize: number;
	totalItems: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
}

export function DataTablePagination({
	currentPage,
	totalPages,
	pageSize,
	totalItems,
	onPageChange,
	onPageSizeChange,
}: DataTablePaginationProps) {
	const t = useTranslations("datatable.pagination");
	const startItem = (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(currentPage * pageSize, totalItems);

	return (
		<div className="flex items-center justify-between px-2">
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">{t("rowsPerPage")}</p>
					<Select
						value={`${pageSize}`}
						onValueChange={(value) => onPageSizeChange(Number(value))}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[5, 10, 20, 30, 40, 50].map((size) => (
								<SelectItem key={size} value={`${size}`}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
                <div className="text-sm text-muted-foreground">
					{t("itemsInfo", { startItem, endItem, totalItems })}
				</div>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					{t("pageInfo", { currentPage, totalPages })}
				</div>

			</div>
			<div className="flex items-center space-x-2">
				<Button
					variant="outline"
					className="hidden h-8 w-8 p-0 lg:flex"
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1}
				>
					<span className="sr-only">{t("goToFirstPage")}</span>
					<BsSkipStartFill className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					className="h-8 w-8 p-0"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<span className="sr-only">{t("goToPreviousPage")}</span>
					<BsFillCaretLeftFill className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					className="h-8 w-8 p-0"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					<span className="sr-only">{t("goToNextPage")}</span>
					<BsFillCaretRightFill className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					className="hidden h-8 w-8 p-0 lg:flex"
					onClick={() => onPageChange(totalPages)}
					disabled={currentPage === totalPages}
				>
					<span className="sr-only">{t("goToLastPage")}</span>
					<BsSkipEndFill className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
