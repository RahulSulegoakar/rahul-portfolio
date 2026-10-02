"use client";

import { copyText } from "@/utils/copy";
import { useTiks } from "@rexa-developer/tiks/react";
import { ArrowUpRight } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { toast } from "@/components/ui/toast";

import { getMarkSVG, SiteMark } from "./site-mark";

export function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const { success } = useTiks();

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-fit">
        <ContextMenuItem render={<a href="/" target="_blank" />}>
          <ArrowUpRight />
          Open Link in New Tab
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem
          onClick={() => {
            copyText(getMarkSVG());
            toast.add({ type: "success", title: "Mark as SVG copied" });
            success();
          }}
        >
          <SiteMark />
          Copy Mark as SVG
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default BrandContextMenu;
