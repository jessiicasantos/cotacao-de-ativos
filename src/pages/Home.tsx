import { useEffect, useState } from "react";
import { columns, Payment } from "../components/ui/payments/columns";
import { DataTable } from "../components/ui/payments/data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "234546df",
      amount: 200,
      status: "pending",
      email: "mdaf@example.com.br",
    }
    // ...
  ]
};

const Home = () => {
    const [data, setData] = useState<any>([]);

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
    </>
  )
};

export default Home;