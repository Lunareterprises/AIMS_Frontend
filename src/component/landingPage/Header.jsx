"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/NavigationMenu";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", active: true },
  { name: "Books", active: false },
  { name: "Inventory", active: false },
  { name: "Payroll", active: false },
  { name: "Attendance", active: false },
  { name: "Billing", active: false },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 md:px-20 bg-black">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center h-[30px]">
          <img
            className="h-[50px] md:h-[70px] ml-2"
            alt="Logo"
            src="/Images/landingPage/zeluna logo.png"
          />
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex max-w-none justify-center">
          <NavigationMenuList className="flex gap-10">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  className={`flex items-center py-4 text-[13.8px] text-white font-inter ${
                    item.active ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-5 pl-6">
          <div className="font-semibold text-white text-xs font-inter whitespace-nowrap">
            SIGN IN
          </div>
          <Button className="bg-[#4462ff] rounded-[1515px] px-6 py-2 h-auto">
            <span className="font-semibold text-white text-sm font-inter">
              SIGN UP NOW
            </span>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? (
              <X className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 px-2 flex flex-col gap-4 text-white">
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`text-sm ${item.active ? "font-bold" : "font-normal"}`}
            >
              {item.name}
            </div>
          ))}
          <div className="border-t border-white mt-4 pt-4 flex flex-col gap-3">
            <div className="text-xs font-semibold">SIGN IN</div>
            <Button className="bg-[#4462ff] rounded-[1515px] px-6 py-2 h-auto">
              <span className="text-white text-sm font-semibold">
                SIGN UP NOW
              </span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
