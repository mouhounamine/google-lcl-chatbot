import { TransitionLink } from "@/components/auth/LinkTransition";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function MenuComponent() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed left-1 top-1 text-black z-10" variant="link">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className=" bg-white border-0 p-0 -0">
        <div className="flex flex-col w-full h-full ">
          <div className="w-full h-full ">
            <Button className="rounded-none border-none w-full h-full text-6xl remboy hover:bg-slate-800 hover:underline transition">
              <TransitionLink href="/">Home</TransitionLink>
            </Button>
          </div>
          <SheetFooter className="remboy text-red-500 self-center">
            Amine Mouhoun, ®Portfolio 2024
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
