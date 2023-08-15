"use client"

import React from "react";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { Logo } from "@/components/icons";
import { LayoutDashboard, Users2, Building2, User, Cross } from "lucide-react";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/react";


const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
        multiple: false,
        items: []
    },
    {
        label: "Afiliados",
        icon: Users2,
        multiple: true,
        href: "/",
        color: "text-sky-500",

        items: [
            {
                label: "Empresas",
                icon: Building2,
                href: "/afiliados/empresas",
                color: "text-sky-500",
            },
            {
                label: "Independientes",
                icon: User,
                href: "/afiliados/independientes",
                color: "text-sky-500",
            }
        ]
    },
    {
        label: "Incapacidades",
        icon: Cross,
        href: "/incapacidades",
        color: "text-sky-500",
        multiple: false,
        items: []
    },
]


const Sidebar = () => {
    return ( 
        <div className="space-y-4  flex flex-col h-full bg-blue-900 text-white">
            <div className=" flex-1">
            <NextUINavbar className="bg-blue-900" maxWidth="xl">
                <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                    <NavbarBrand as="li" className="gap-3 max-w-fit">
                        <NextLink className="flex justify-start items-center gap-1" href="/dashboard">
                            <Logo />
                            <p className="font-bold text-inherit ml-2">Afiliación Segura</p>
                        </NextLink>
                    </NavbarBrand>
                </NavbarContent>
            </NextUINavbar>

            <div className="space-y-1">
                {routes.map((route) => (
                    route.multiple ?
                        <Dropdown className="bg-blue-800">
                            <DropdownTrigger>
                                <div className="text-sm group flex p-3 w-full justify-start 
                                    font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition">
                                    <route.icon className={clsx("h-5 w-5 mr-3", route.color)} />
                                    <span className="text-white">{route.label}</span>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions" color="primary" variant="bordered" className="bg-blue-900 rounded-lg">
                                {route.items.map((item) => (
                                    <DropdownItem key={item.href} className="bg-blue-900 " >
                                        <Link href={item.href} key={item.href} className="text-sm group flex p-3 w-full justify-start 
                                            font-medium cursor-pointer rounded-lg transition">
                                            <div className="flex items-center flex-1 te">
                                                <item.icon className={clsx("h-5 w-5 mr-3", item.color)} />
                                                <span className="text-white">{item.label}</span>
                                            </div>
                                        </Link>
                                    </DropdownItem>
                                ))
                                }
                            </DropdownMenu>
                        </Dropdown>
                         : 
                        <Link href={route.href} key={route.href} className="text-sm group flex p-3 w-full justify-start 
                            font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition">
                            <div className="flex items-center flex-1 te">
                                <route.icon className={clsx("h-5 w-5 mr-3", route.color)} />
                                <span className="text-white">{route.label}</span>
                            </div>
                        </Link>
                      
                ))}

            </div>
            </div>
        </div>
     );
}
 
export default Sidebar;