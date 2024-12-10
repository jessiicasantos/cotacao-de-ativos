import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { Button } from "../button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "../dropdown-menu";
import { Input } from "../input";
import { useState } from "react";
import { ButtonGreen,  ButtonBorder } from "../../../components/Buttons";
import { ReactComponent as Plus } from "../../../assets/img/plus.svg";
import { ReactComponent as Trash } from "../../../assets/img/trash.svg";
import { AtivoType } from './columns';
import { RowData } from "@tanstack/react-table";

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setData: React.Dispatch<React.SetStateAction<AtivoType[]>>
};

export function DataTable<TData, TValue>({
  columns,
  data,
  setData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
  });

  const addRow = () => {
   var x = new Date().getTime();
    const newRow: AtivoType = {
      id: x.toString(),
      ativo: '',
      precoporacao: 0,
      qtd: 0,
      abertura: 0,
      ibov: 0,
      variacao: 0,
      variacao12m: 0,
      lotemin: 0,
      melhorcompra: 0,
      melhorvenda: 0,
      precototal: 0,
    };

    const setFunc = (old: AtivoType[]) => [...old, newRow];
    setData(setFunc);
  };

  const removeSelectedRows = (selectedRows: number[]) => {
    const setFilterFunc = (old: AtivoType[]) =>
      old.filter((_row, index) => !rowSelection.hasOwnProperty(index));

    setData(setFilterFunc);
    setRowSelection({});
  };

  return (
    <div className="flex-flex-col">
      <div className="flex align-center p-2.5 bg-slate-200">
        <ButtonGreen className="mx-5 py-2.5 px-7 flex items-center justify-center text-base" onClick={addRow}>
          <Plus className="mr-1 w-4 h-4" />
          Cotação
        </ButtonGreen>
        <ButtonBorder className="py-2.5 px-7 flex items-center justify-center text-base" onClick={removeSelectedRows}>
          <Trash  fill="#6A6A6A" stroke="white" strokeWidth="1" className="mr-1 w-4 h-4" />
          Excluir
        </ButtonBorder>
      </div>
      <div className="mx-auto">
          <div className="flex items-center py-4 px-5 bg-slate-50">
              <Input
                placeholder="Filtre por ativo..."
                value={(table.getColumn("ativo")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("ativo")?.setFilterValue(event.target.value)
                }
                className="max-w-sm bg-white"
              />
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="ml-auto">
                        Columns
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      {table
                      .getAllColumns()
                      .filter(
                          (column) => column.getCanHide()
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
                              {column.id}
                          </DropdownMenuCheckboxItem>
                          )
                      })}
                  </DropdownMenuContent>
              </DropdownMenu>
          </div>
          <div className="rounded-md border">
              <Table>
                  <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                <TableHead key={header.id} className="text-black bg-slate-50 px-2 first:pl-5 last:pr-5">
                                    {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                        )}
                                </TableHead>
                                )
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
                              className="even:bg-slate-50 odd:bg-gray"
                          >
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="px-2 first:pl-5 last:pr-5 border border-t-1 border-gray text-center">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                              ))}
                          </TableRow>
                          ))
                      ) : (
                          <TableRow>
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                              Sem resultados.
                          </TableCell>
                          </TableRow>
                      )}
                  </TableBody>
              </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4 mr-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
        </div>
      </div>
    </div>
  )
};