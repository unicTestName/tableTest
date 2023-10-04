import { useMemo } from 'react';
// !!TODO useMemo  
export const UserTableHeader = [
  {
    accessorKey: "name",
    header: "Name",
    enableColumnActions: false,
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
    enableColumnActions: false,
  },
  {
    accessorKey: "address",
    header: "Address",
    enableSorting: true,
    enableColumnActions: false,
  },
  {
    accessorKey: "companyName",
    header: "Company",
    enableSorting: true,
    enableColumnActions: false,
  },
];
