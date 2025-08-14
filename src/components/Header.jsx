import { useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 border-2 shadow-sm rounded-full mx-2 md:mx-20 lg:mx-30 my-2 bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand/Logo */}
        <Link to="#" className="flex space-x-2 text-lg font-bold text-primary pr-5">
          <span className="text-lg md:text-xl font-black text-primary italic">AI Finance Tracker</span>
        </Link>

        {/* Desktop Navigation Menu (hidden on mobile) */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <SignedOut>
              {/* Show only Home link for logged out users */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to={{ pathname: "/", hash: "#about" }} className={navigationMenuTriggerStyle()}>
                    About Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </SignedOut>
            <SignedIn>
              {/* Show only Dashboard link for logged in users */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/user/dashboard" className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </SignedIn>
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Authentication Buttons/Widget for Desktop */}
        <div className="ml-auto hidden lg:flex items-center gap-2">
          <SignedOut>
            <Button variant="outline" asChild>
              <Link to="login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="register">Get Started</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Navigation (Hamburger Menu) - (hidden on desktop) */}
        <div className="flex items-center lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] flex flex-col">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 overflow-y-auto flex-grow">
                <SignedOut>
                  <Link to="/" className="px-4 py-2 md:text-lg font-medium text-foreground hover:bg-accent rounded-md" onClick={closeSheet}>
                    Home
                  </Link>
                  <Link to={{ pathname: "/", hash: "#about" }} className="px-4 py-2 md:text-lg font-medium text-foreground hover:bg-accent rounded-md" onClick={closeSheet}>
                    About Us
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link to="/user/dashboard" className="px-4 py-2 md:text-lg font-medium text-foreground hover:bg-accent rounded-md" onClick={closeSheet}>
                    Dashboard
                  </Link>
                </SignedIn>

                {/* User Authentication Buttons/Widget for Mobile */}
                <div className="flex flex-col gap-2 mt-6 px-4">
                  <SignedOut>
                    <Button variant="outline" asChild onClick={closeSheet}>
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button asChild onClick={closeSheet}>
                      <Link to="/register">Sign Up</Link>
                    </Button>
                  </SignedOut>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
