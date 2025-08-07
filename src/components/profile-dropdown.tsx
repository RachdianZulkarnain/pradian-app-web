import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, ShoppingCart, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

const AccountMenu = ({
  email,
  points = 0,
}: {
  email?: string;
  points?: number;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="border-2 border-black bg-white p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-gray-100 rounded-md"
        >
          <Menu className="h-6 w-6 text-black" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 border-2 border-black bg-white text-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
      >
        <DropdownMenuLabel className="flex items-center justify-between font-semibold">
          <span>My Account</span>
          <Sun className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="border-t border-black" />

        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex w-full items-center gap-2 hover:bg-orange-100"
          >
            <Settings className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/orders"
            className="flex w-full items-center gap-2 hover:bg-orange-100"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="border-t border-black" />

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-2 text-red-600 hover:bg-red-100 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
