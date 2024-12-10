import { useEffect, useState } from "react";
import { columns, AtivoType } from "../components/ui/ativos/columns";
import { DataTable } from "../components/ui/ativos/data-table";
import useSocket from "../hooks/useSocket";

async function getData(): Promise<AtivoType[]> {
  // Fetch data from your API here.
  return [
    {
      id: "0",
      ativo: "",
      precoporacao: 0,
      qtd: 1, // editavel
      abertura: parseFloat("0"), // R$
      ibov: parseFloat("0"), // %
      variacao: parseFloat("0"),
      variacao12m: parseFloat("0"), // -num%
      lotemin: 0,
      melhorcompra: parseFloat("0"), // R$
      melhorvenda: parseFloat("0"),
      precototal: parseFloat("0"), // calc total
    },
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

    const onMessage = (event: any) => {
      let eventData = JSON.parse(event.data);
      let rowIndex = data.findIndex((item: any) => item.ativo == eventData.ticker);

      if (rowIndex !== -1) {
        const newData = [...data];

        const newRow: AtivoType = {
          id: eventData.ticker,
          ativo: eventData.ticker,
          precoporacao: eventData.preco,
          qtd: data[rowIndex].qtd,
          abertura: eventData.preco_abertura,
          ibov: eventData.ibov,
          variacao: eventData.variacao,
          variacao12m: eventData.variacao_12m,
          lotemin: eventData.lote_minimo,
          melhorcompra: eventData.compra,
          melhorvenda: eventData.venda,
          precototal: data[rowIndex].qtd * eventData.preco,
        };
    
        newData[rowIndex] = newRow;
  
        console.log(newData)
        setData(newData);
      }
    }

    let socket = useSocket(onMessage);
    
    useEffect(() => {
        fetchData()
    }, []);

  return (
    <>
      <DataTable columns={columns} data={data} setData={setData} />
    </>
  )
};

export default CotacaoAtivos;