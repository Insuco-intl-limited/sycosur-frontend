"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { DataTableSearch } from "./datatable-search"
import { DataTableFilters } from "./datatable-filters"
import { DataTableExport } from "./datatable-export"
import { DataTablePagination } from "./datatable-pagination"
import { DataTableActions } from "./datatable-actions"
import { useDataTable } from "../hooks/use-datatable"
import type { DataTableProps } from "../types/datatable"
import { cn } from "@/lib/utils"

export function DataTable<T>({
  data,
  columns,
  actions,
  searchable = true,
  searchPlaceholder,
  paginated = true,
  pageSize: initialPageSize = 10,
  exportable = true,
  exportFormats,
  filterable = true,
  sortable = true,
  className,
}: DataTableProps<T>) {
  const {
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
    totalItems,
  } = useDataTable(data, columns)

  const displayData = paginated ? paginatedData : filteredAndSortedData
  const hasActions = actions && actions.length > 0

  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Barre d'outils */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {searchable && (
            <DataTableSearch value={searchTerm} onChange={setSearchTerm} placeholder={searchPlaceholder} />
          )}
        </div>
        <div className="flex items-center space-x-2">
          {filterable && (
            <DataTableFilters
              columns={columns}
              filters={filters}
              onAddFilter={addFilter}
              onRemoveFilter={removeFilter}
            />
          )}
          {exportable && <DataTableExport data={filteredAndSortedData} formats={exportFormats} />}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* Colonne Actions */}
              {hasActions && (
                <TableHead className="w-[50px]">
                  <span className="sr-only">Actions</span>
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  style={{ width: column.width }}
                  className={column.sortable !== false && sortable ? "cursor-pointer select-none" : ""}
                >
                  {column.sortable !== false && sortable ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(column.key)}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      {column.header}
                      {getSortIcon(column.key)}
                    </Button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.length ? (
              displayData.map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                  {/* Cellule Actions */}
                  {hasActions && (
                    <TableCell>
                      <DataTableActions item={item} actions={actions} />
                    </TableCell>
                  )}
                  {columns.map((column) => {
                    const value = column.accessor ? column.accessor(item) : (item as any)[column.key]

                    return (
                      <TableCell key={column.key}>
                        {column.render ? column.render(value, item) : String(value)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (hasActions ? 1 : 0)} className="h-24 text-center">
                  Aucun résultat trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {paginated && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  )
}
