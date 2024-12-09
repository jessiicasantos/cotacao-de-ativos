import { useEffect, useState } from "react";
import { columns, AtivoType } from "../components/ui/ativos/columns";
import { DataTable } from "../components/ui/ativos/data-table";
import WebsocketsDemo from "../components/WebsocketsDemo";

async function getData(): Promise<AtivoType[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      ativo: "PRIO3",
      precoporacao: 100,
      qtd: 0, // editavel
      abertura: parseFloat("41.19"), // R$
      ibov: parseFloat("1.546"), // %
      variacao: parseFloat("1.26"),
      variacao12m: parseFloat("-14.39"), // -14.39%
      lotemin: 100,
      melhorcompra: parseFloat("42.15"), // R$
      melhorvenda: parseFloat("44.18"),
      precototal: parseFloat("172.720"), // calc total
    },
    {
      id: "234546df",
      ativo: "HYPE3",
      precoporacao: 200,
      qtd: 600,
      abertura: parseFloat("25.33"), // ...
      ibov: parseFloat("1.525"), // %
      variacao: parseFloat("2.89"),
      variacao12m: parseFloat("-14.15"), // -14.39%
      lotemin: 100,
      melhorcompra: parseFloat("24.42"), // R$
      melhorvenda: parseFloat("26.22"),
      precototal: parseFloat("16.854"), // calc total
    }
    // ...
  ]
};

const CotacaoAtivos = () => {
    const [data, setData] = useState<AtivoType[]>([]);

    async function fetchData() {
        try {
          let response = await getData();

          setData(response);
        } catch(error) {
            console.error(`Errooo!!!\n ${error}`)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

  return (
    <>
      <DataTable columns={columns} data={data} />

      <div>
        testando websockets
        <WebsocketsDemo />
      </div>
    </>
  )
};

export default CotacaoAtivos;