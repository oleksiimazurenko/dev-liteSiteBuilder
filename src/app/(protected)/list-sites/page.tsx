import { DataTable, Site, columns } from "@/features/list-sites";

async function getData(): Promise<Site[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
    {
      id: "728ed52f",
      status: false,
      name: "Example Site",
      views: 100,
      email: "newiqa@gmail.com",
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="dark:bg-color-d2 bg-color-w2 container p-5 shadow-lg">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
