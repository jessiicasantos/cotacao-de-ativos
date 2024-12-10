import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { MoreHorizontal } from "lucide-react"

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Checkbox } from "../checkbox";
import { useState } from "react";
import useSocket from "../../../hooks/useSocket";

export type AtivoType = {
  id: string;
  precoporacao: number;
  qtd: number;
  abertura: number;
  ibov: number;
  variacao: number;
  variacao12m: number;
  lotemin: number;
  melhorcompra: number;
  melhorvenda: number;
  precototal: number;
  ativo: string;
};



const InputAtivo = ({ value, updateData, ...props }: any) => {
  const { sendMessage } = useSocket();
  const [internalValue, setInternalValue] = useState<string>(value);

  const handleChange = (e: any) => {
    setInternalValue(e.target.value);
    updateData(e.target.value);
    console.log(internalValue);
  }

  const blurChange = (e: any) => {
    if(internalValue) {
      sendMessage(`sqt ${internalValue}`, false)
    }
    console.log('blurChange internalValue: ', internalValue);
  }

  return (
    <input type="text" value={internalValue} 
      onChange={handleChange}
      onBlur={blurChange} 
      className="p-3 h-[90%] w-[90%] text-center font-medium border-2 border-slate-300" 
      {...props}  
    />
  )
}

const InputField = ({ value, updateData, ...props }: any) => {
  const [internalValue, setInternalValue] = useState<string>(value);

  const handleChange = (e: any) => {
    setInternalValue(e.target.value);
    updateData(e.target.value);
  }

  return (
    <input type="text" value={internalValue} onChange={handleChange} className="p-3 h-[90%] w-[90%] text-center font-medium border-2 border-slate-300" {...props}  />
  )
}

export const columns: ColumnDef<AtivoType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="text-left w-[50px]">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="text-left"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ativo",
    header: ({ column }) => {
      return (
        <div className="text-center w-[200px]">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ativo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const updateData = (value: any) => table.options.meta?.updateData(index, id, value);
      return (
        <div className="m-auto">
          <InputAtivo id="ativofield" name="ativofield" value={getValue} updateData={updateData} />
        </div>
      )
    }
  },
  {
    accessorKey: "precoporacao",
    header: () => <div className="text-center">Preço por ação</div>,
    cell: ({ row }) => {
      const precoporacao = parseFloat(row.getValue("precoporacao"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(precoporacao)
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "qtd",
    header: () => <div className="text-center">Quantidade</div>,
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const updateData = (value: any) => table.options.meta?.updateData(index, id, value);
      return (
        <div className="">
          <InputField id="qtdfield" name="qtdfield"  value={getValue} updateData={updateData} />
        </div>
      );
    }
  },
  {
    accessorKey: "abertura",
    header: () => <div className="text-center">Abertura</div>,
    cell: ({ row }) => {
      const abertura = parseFloat(row.getValue("abertura"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(abertura)
      
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "ibov",
    header: () => <div className="text-center">IBOV %</div>,
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2});
      const ibov = formatter.format(row.getValue("ibov"))
      
      return <div className="text-center font-medium">{ibov}</div>
    },
  },
  {
    accessorKey: "variacao",
    header: () => <div className="text-center">Variação (%)</div>,
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2});
      const variacao = formatter.format(row.getValue("variacao"))
      
      return <div className="text-center font-medium">{variacao}</div>
    },
  },
  {
    accessorKey: "variacao12m",
    header: () => <div className="text-center">Variação 12m (%)</div>,
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2});
      const variacao12m = formatter.format(row.getValue("variacao12m"))
      
      return <div className="text-center font-medium">{variacao12m}</div>
    },
  },
  {
    accessorKey: "lotemin",
    header: () => <div className="text-center font-medium">Lote mínimo</div>,
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 3 }).format(
        row.getValue("lotemin")
      );
      const lotemin = formatter;
      
      return <div className="text-center font-medium">{lotemin}</div>
    },
  },
  {
    accessorKey: "melhorcompra",
    header: () => <div className="text-center">Melhor compra</div>,
    cell: ({ row }) => {
      const melhorcompra = parseFloat(row.getValue("melhorcompra"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(melhorcompra)
      
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "melhorvenda",
    header: () => <div className="text-center">Melhor venda</div>,
    cell: ({ row }) => {
      const melhorvenda = parseFloat(row.getValue("melhorvenda"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(melhorvenda)
      
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "precototal",
    header: () => <div className="text-center">Preço total</div>,
    cell: ({ row }) => {
      const precototal = parseFloat(row.getValue("precototal"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(precototal)
      
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ativo = row.original
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(ativo.id)}
            >
              Copy ativo ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View ativo details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];