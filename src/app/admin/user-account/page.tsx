"use client";

import React, { useState, useMemo } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { MoreHorizontal, Trash2, ShieldAlert, ShieldCheck } from "lucide-react";



// types/user.ts
export type UserRole = 'admin' | 'student' | 'instructor';
export type UserStatus = 'active' | 'blocked';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export const MOCK_USERS: User[] = Array.from({ length: 25 }, (_, i) => ({
  id: `USR-${1000 + i}`,
  name: ["Alex Rivera", "Maria Chen", "Sam Wilson", "Jordan Abu"][i % 4] + ` ${i}`,
  email: `user${i}@learnandgo.com`,
  role: i % 5 === 0 ? 'admin' : i % 3 === 0 ? 'instructor' : 'student',
  status: i % 7 === 0 ? 'blocked' : 'active',
}));
export default function UserAdminDashboard() {
  const [data, setData] = useState<User[]>(MOCK_USERS);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // --- Actions ---
  const updateStatus = (ids: string[], status: 'active' | 'blocked') => {
    setData(prev => prev.map(u => ids.includes(u.id) ? { ...u, status } : u));
  };

  const deleteUsers = (ids: string[]) => {
    setData(prev => prev.filter(u => !ids.includes(u.id)));
    setRowSelection({});
  };

  // --- Table Columns ---
  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value:any) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value:any) => row.toggleSelected(!!value)}
        />
      ),
    },
    { accessorKey: "id", header: "User ID" },
    { accessorKey: "name", header: "Full Name" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role ;
        const styles : any = {
          admin: "bg-yellow-400 text-black hover:bg-yellow-500",
          instructor: "bg-purple-100 text-purple-700 border-purple-200",
          student: "bg-gray-100 text-gray-700",
        };
        return <Badge className={`capitalize ${styles[role]}`}>{role}</Badge>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className={row.original.status === 'active' 
          ? "text-green-600 border-green-200 bg-green-50" 
          : "text-red-600 border-red-200 bg-red-50"}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {row.original.status === 'active' ? (
              <DropdownMenuItem onClick={() => updateStatus([row.original.id], 'blocked')}>
                <ShieldAlert className="mr-2 h-4 w-4" /> Block
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => updateStatus([row.original.id], 'active')}>
                <ShieldCheck className="mr-2 h-4 w-4" /> Unblock
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-red-600" onClick={() => deleteUsers([row.original.id])}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection, columnFilters },
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const selectedIds = table.getSelectedRowModel().rows.map(r => r.original.id);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Accounts</h1>
          <p className="text-gray-500">Manage Learn & Go platform members.</p>
        </div>
        
        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-2">
            <Button variant="outline" size="sm" onClick={() => updateStatus(selectedIds, 'active')}>Unblock</Button>
            <Button variant="outline" size="sm" onClick={() => updateStatus(selectedIds, 'blocked')}>Block</Button>
            <Button variant="destructive" size="sm" onClick={() => deleteUsers(selectedIds)}>Delete ({selectedIds.length})</Button>
          </div>
        )}
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search name or email..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          className="max-w-sm border-gray-300"
        />
        <Select
          onValueChange={(val) => table.getColumn("role")?.setFilterValue(val === "all" ? "" : val)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="instructor">Instructor</SelectItem>
            <SelectItem value="student">Student</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table Content */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="text-xs font-bold uppercase text-gray-600">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">No users found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-500">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
        </div>
      </div>
    </div>
  );
}