// example
// import { Payment, columns } from "./columns";
// import { DataTable } from "./data-table";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       ativo: "m@example.com",
//     },
//     // ...
//   ]
// };

export default async function DemoPage() {
//   const data = await getData();

  return (
    <h1>Example table demo page</h1>
//     <div className="container mx-auto py-10">
//       <DataTable columns={columns} data={data} />
//     </div>
  )
};