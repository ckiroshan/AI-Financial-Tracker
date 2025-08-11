import React, { useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // To control sheet open/close
  const closeSheet = () => setIsSheetOpen(false); // To close Sheet (For mobile clicks)

  // Render navigation items (reused for desktop and mobile)
  const renderNavItems = (isMobile = false) => (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link to={{ pathname: "/", hash: "#home" }} className={navigationMenuTriggerStyle()}>
            Home {/* navigationMenuTriggerStyle -> Close sheet on mobile click */}
          </Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link to={{ pathname: "/", hash: "#about" }} className={navigationMenuTriggerStyle()}>
            About Us
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* Sign In & Get Started buttons */}
      <div className="ml-4 flex items-center gap-2">
        <Button variant="outline" className="mr-2" asChild>
          <Link to="/login">Sign In</Link>
        </Button>
        <Button asChild>
          <Link to="/register">Get Started</Link>
        </Button>
      </div>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-2 shadow-sm rounded-full mx-2 md:mx-20 lg:mx-30 my-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand/Logo */}
        <Link to={{ pathname: "/", hash: "#home" }} className="flex space-x-2 text-lg font-bold text-primary">
          <span className="text-lg md:text-xl font-black text-primary italic">AI Finance Tracker</span>
        </Link>

        {/* Desktop Navigation Menu (hidden on mobile) */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {renderNavItems(false)} {/* Render desktop nav items */}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation (Hamburger Menu) - (hidden on desktop) */}
        <div className="flex items-center lg:hidden">
          {/* Mobile menu trigger */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] flex flex-col">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 overflow-y-auto flex-grow">
                <Link to={{ pathname: "/", hash: "#home" }} className="px-4 py-2 md:text-lg font-medium text-foreground hover:bg-accent rounded-md" onClick={closeSheet}>
                  Home
                </Link>
                <Link to={{ pathname: "/", hash: "#about" }} className="px-4 py-2 md:text-lg font-medium text-foreground hover:bg-accent rounded-md" onClick={closeSheet}>
                  About Us
                </Link>

                {/* Mobile-specific Sign In / Get Started buttons */}
                <div className="flex flex-col gap-2 mt-6 px-4">
                  <Button variant="outline" asChild onClick={closeSheet}>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild onClick={closeSheet}>
                    <Link to="/register">Get Started</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
