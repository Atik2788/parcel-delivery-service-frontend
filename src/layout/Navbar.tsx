import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggler";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, type TypedUseSelectorHook } from "react-redux";
import type { RootState } from "@/app/store";
import { logOut } from "@/features/auth/authSlice";


const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  
  // typed selector
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

  const dispatch = useDispatch();
const user = useTypedSelector((state) => state.auth.user);
  console.log(user)
  

  const handleLogout = () => {
    // Redux state clear
    dispatch(logOut());
  };

  return (
    <header className="border-b">
      <div className="flex container mx-auto px-4 h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                {/* Hamburger icon */}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild className="py-1.5">
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary hover:text-primary/90">
              <Link to="/">Parcel Delivery</Link>
            </a>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">


  {user ? (
    <>
      <span className="text-sm font-medium text-muted-foreground p-2 rounded-md">
        {user.name}
      </span>

      {/* Role-based Dashboard Link */}
      
        <Link
        className="text-sm "
          to={
            user.role === "ADMIN" || user.role === "SUPER_ADMIN"
              ? "/dashboard/admin"
              : user.role === "SENDER"
              ? "/dashboard/sender"
              : user.role === "RECEIVER"
              ? "/dashboard/receiver"
              : "/dashboard" // fallback
          }
        >
          Dashboard
        </Link>

      <ModeToggle />

      <Button onClick={handleLogout} className="text-sm">
        LogOut
      </Button>
    </>
  ) : (
    <Button asChild className="text-sm">
      <Link to="/login">Login</Link>
    </Button>
  )}
</div>

      </div>
    </header>
  );
}
