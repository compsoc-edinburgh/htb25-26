"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit2,
  Settings2,
  Share,
} from "lucide-react";
import { CSVLink } from "react-csv";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Application } from "./columns";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { useState } from "react";

interface DataTableProps<TValue> {
  columns: ColumnDef<Application, TValue>[];
  data: Application[];
}

export function DataTable<TValue>({ columns, data }: DataTableProps<TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const [exportAllColumns, setExportAllColumns] = useState(true);

  const getExportData = () => {
    let columnsToExport;

    if (exportAllColumns) columnsToExport = table.getAllLeafColumns();
    else columnsToExport = table.getVisibleFlatColumns();

    columnsToExport = columnsToExport.filter(
      (column) => column.id !== "select" && column.id !== "actions",
    );

    let rowsToExport;
    if (table.getIsSomeRowsSelected())
      rowsToExport = table.getFilteredSelectedRowModel().rows;
    else rowsToExport = table.getFilteredRowModel().rows;

    return [
      columnsToExport.map((column) => column.columnDef.header),
      rowsToExport.map((row) =>
        columnsToExport.map((column) => {
          return row.getValue(column.id);
        }),
      ).flat(),
    ];
  };

  return (
    <div className="rounded-2xl border">
      <div className="flex w-full items-center gap-3 p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden lg:flex">
              <Settings2 />
              Columns
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px] rounded-xl">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide(),
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header?.toString()}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden lg:flex">
              <Share />
              Export {table.getIsSomeRowsSelected() ? "selected rows" : "all"}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-52 rounded-xl">
            <DropdownMenuLabel>Export</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="pointer-events-none cursor-pointer"
              asChild
              onClick={(e) => e.preventDefault()}
            >
              <Label
                htmlFor="all-columns"
                onClick={() => setExportAllColumns(!exportAllColumns)}
                className="pointer-events-auto w-full"
              >
                <span className="flex w-8 items-center">
                  <Switch
                    checked={exportAllColumns}
                    className="-translate-x-2 scale-75"
                  />{" "}
                </span>
                {exportAllColumns ? "All columns" : "Only visible columns"}
              </Label>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem className="cursor-pointer">
              <span className="w-8 text-xs">.xlsx</span>
              Excel
            </DropdownMenuItem> */}
            <DropdownMenuItem className="cursor-pointer">
              <CSVLink
                data={getExportData()}
                className="flex w-full items-center gap-2"
                filename={`HTB11 Applications ${new Date().toLocaleDateString()}`}
              >
                <span className="w-8 text-xs">.csv</span>
                Export to CSV
              </CSVLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="w-fit whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
