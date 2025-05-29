"use client";
import React, { useState } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi"; // Icons for hamburger menu
import { Link } from "react-router-dom";
import CommonButton from "../CommonUI/buttons/CommonButton";

const MENU_ITEMS = [
  { id: 1, name: "Inventory", link: "#" },
  { id: 2, name: "CRM", link: "#" },
  { id: 3, name: "Projects", link: "#" },
  { id:4, name: "Expense", link: "#" },
  { id: 5, name: "Billing", link: "#" },

];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="shadow-none bg-white sticky top-0 z-20 w-full">
        <div className="py-4 px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex gap-4 justify-center items-center">
            <img
              src="/Images/landingPage/logo1.png"
              alt="Company_Logo"
              
            />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex">
                <ul className="flex items-center gap-4">
                {MENU_ITEMS.map((item) => (
                    <li key={item.id} className="px-4 py-2 cursor-pointer">
                        <Link href={item.link} className="hover:text-[#2872AF] transition text-sm tracking-wide md:text-base">
                            {item.name}
                        </Link>
                    </li>
                ))}
                
                </ul>
            </nav>
          </div>

          <div className="flex justify-between items-center w-1/6">
            <div><FiSearch /></div>
            <div>
                <CommonButton label="Sign In" onClick={() => alert('Button clicked!')} className="text-[#e42527] font-semibold" />
            </div>
            <div>
                <CommonButton label="Sign Up Now" onClick={() => alert('Button clicked!')} className=" bg-[#e42527]  text-white py-2 px-4" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#2872AF] text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Navigation (Dropdown) */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden absolute top-16 left-0 w-full bg-[#F5F5F5] shadow-md`}
        >
          <ul className="flex flex-col items-center py-4">
            {MENU_ITEMS.map((item) => (
              <li key={item.id} className="py-2">
                <Link
                  href={item.link}
                  className="text-[#2872AF] hover:text-[#004B87] text-lg font-medium"
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  {item.name}
                </Link>
              </li>
            ))}
           
          </ul>
        </div>
      </header>

      {/* CONTACT MODAL */}
      {/* <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </>
  );
};

export default Header;
