"use client";

import { Monitor, Tablet, Smartphone, ChevronDown, Palette } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 w-full bg-card/80 backdrop-blur-sm border-b">
      <div className="container flex h-14 items-center px-4">
        <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-bold tracking-tight">
            Modern Weebly Clone
            </h1>
        </div>

        <div className="flex flex-1 items-center justify-center gap-2">
            <div className="hidden md:flex items-center gap-1 p-1 rounded-lg border bg-background">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary bg-primary/20">
                            <Monitor className="h-5 w-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Desktop View</TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Tablet className="h-5 w-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Tablet View</TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Smartphone className="h-5 w-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Mobile View</TooltipContent>
                </Tooltip>
            </div>
        </div>

        <div className="flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hidden md:inline-flex">
                        <Palette className="h-4 w-4 mr-2" />
                        Theme
                        <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Modern Light</DropdownMenuItem>
                    <DropdownMenuItem>Sleek Dark</DropdownMenuItem>
                    <DropdownMenuItem>Minimalist</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Publish</Button>
        </div>
      </div>
    </header>
  );
}
