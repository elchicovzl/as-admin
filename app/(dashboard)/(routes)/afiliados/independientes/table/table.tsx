'use client';

import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor,
    Divider
  } from "@nextui-org/react";
import { User as IUser } from "lucide-react";

import {
    PlusIcon,
    VerticalDotsIcon,
    ChevronDownIcon,
    SearchIcon
} from "@/components/tableIcons";
import clsx from "clsx";
import {columns, statusOptions} from "./data";
import {capitalize} from "@/utils/utils";

import { Users2 } from "lucide-react";
import { SafeAddress, SafeAffiliate, SafeContributorType, SafePhones } from "@/app/types";
import { Affiliate } from "@prisma/client";

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["documentIdentity", "fullName", "email","statusProcess","status","actions"];

interface AffiliatesDataProps {
    ditems: [
      SafeAffiliate & {
        contributorType : SafeContributorType;
        address: SafeAddress;
        phones: SafePhones;
      }
    ];
}

const TableData : React.FC<AffiliatesDataProps> = ({ ditems }) => {

    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });

    const [page, setPage] = React.useState(1);

    const pages = Math.ceil(ditems.length / rowsPerPage);
    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
    
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...ditems];
    
        if (hasSearchFilter) {
          filteredUsers = filteredUsers.filter((item) =>
            item.fullName.toLowerCase().includes(filterValue.toLowerCase()),
          );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
          /* filteredUsers = filteredUsers.filter((user) =>
            Array.from(statusFilter).includes(user.status),
          ); */
        }
    
        return filteredUsers;
    }, [ditems, filterValue, statusFilter]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Affiliate, b: Affiliate) => {
          const first = a[sortDescriptor.column as keyof Affiliate] as number;
          const second = b[sortDescriptor.column as keyof Affiliate] as number;
          const cmp = first < second ? -1 : first > second ? 1 : 0;
    
          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((item: SafeAffiliate, columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof SafeAffiliate];

        switch (columnKey) {
            case "documentIdentity":
                return (
                    <div>
                        <Chip className="text-xs p-0 mr-1" color="default" variant="bordered" radius="sm">{item.documentType}</Chip> 
                         {cellValue}
                    </div>
                   
                );
            case "fullName":
                return (
                    <div className="flex text-center">
                        <IUser className="mr-2 h-4 w-4 mt-[1px]" />
                        {cellValue}
                    </div>
                );
            case "email":
                return (
                    <div>{cellValue}</div>
                );
            case "statusProcess":
                return (
                    <div>{cellValue}</div>
                );
            case "status":
                return (
                    <Chip
                    className="capitalize border-none gap-1 text-default-600"
                    color="warning"
                    size="sm"
                    variant="dot"
                    >
                        Pendiente
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                        <DropdownTrigger>
                            <Button isIconOnly radius="full" size="sm" variant="light">
                            <VerticalDotsIcon className="text-default-400" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem>View</DropdownItem>
                            <DropdownItem>Edit</DropdownItem>
                            <DropdownItem>Delete</DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);
    
    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                classNames={{
                  base: "w-full sm:max-w-[44%]",
                  inputWrapper: "border-1",
                }}
                placeholder="Search by name..."
                size="sm"
                startContent={<SearchIcon className="text-default-300" />}
                value={filterValue}
                variant="bordered"
                onClear={() => setFilterValue("")}
                onValueChange={onSearchChange}
              />
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button
                      endContent={<ChevronDownIcon className="text-small" />}
                      size="sm"
                      variant="flat"
                    >
                      Status
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={setStatusFilter}
                  >
                    {statusOptions.map((status) => (
                      <DropdownItem key={status.uid} className="capitalize">
                        {capitalize(status.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button
                      endContent={<ChevronDownIcon className="text-small" />}
                      size="sm"
                      variant="flat"
                    >
                      Columns
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns}
                  >
                    {columns.map((column) => (
                      <DropdownItem key={column.uid} className="capitalize">
                        {capitalize(column.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Button
                  className="bg-foreground text-background"
                  endContent={<PlusIcon />}
                  size="sm"
                >
                  Nuevo
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">Total {ditems.length} Afiliados</span>
              <label className="flex items-center text-default-400 text-small">
                Afiliados por pagina:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </label>
            </div>
          </div>
        );
      }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        ditems.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
          <div className="py-2 px-2 flex justify-between items-center">
            <Pagination
              showControls
              classNames={{
                cursor: "bg-foreground text-background",
              }}
              color="default"
              isDisabled={hasSearchFilter}
              page={page}
              total={pages}
              variant="light"
              onChange={setPage}
            />
            <span className="text-small text-default-400">
              {selectedKeys === "all"
                ? "All items selected"
                : `${selectedKeys.size} of ${items.length} selected`}
            </span>
          </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    const classNames = React.useMemo(
        () => ({
          wrapper: ["max-h-[382px]", "max-w-3xl"],
          th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
          td: [
            // changing the rows border radius
            // first
            "group-data-[first=true]:first:before:rounded-none",
            "group-data-[first=true]:last:before:rounded-none",
            // middle
            "group-data-[middle=true]:before:rounded-none",
            // last
            "group-data-[last=true]:first:before:rounded-none",
            "group-data-[last=true]:last:before:rounded-none",
          ],
        }),
        [],
    );


    return (
        <>
        <div className="flex items-start">
            <Users2 className={clsx("h-5 w-5 md:h-8 md:w-8 mr-3 mt-1")} />
            <h2 className="mb-10 md:mb-20 text-sm md:text-2xl font-bold tracking-tight underline underline-offset-4">Listado de afiliados independientes</h2>
        </div>
            
        <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full  md:max-h-full">
            <Table
                isCompact
                removeWrapper
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                checkboxesProps={{
                    classNames: {
                    wrapper: "after:bg-foreground after:text-background text-background",
                    },
                }}
                classNames={classNames}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No se encontraron afiliados"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
            
        </>
        
    );
}

export default TableData;
