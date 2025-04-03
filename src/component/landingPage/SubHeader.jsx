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

const SubHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="shadow-none bg-[#006fda]  w-full px-24">
        <div className="py-1 px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex gap-4 justify-center items-center">
            <img
              src="/Images/landingPage/logo.png"
              alt="Company_Logo"
              className="w-24 h-24"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
                <ul className="flex items-center gap-4">
                {MENU_ITEMS.map((item) => (
                    <li key={item.id} className="px-4 py-2 cursor-pointer">
                        <Link href={item.link} className="hover:text-[#2872AF] text-white transition text-sm tracking-wide md:text-base">
                            {item.name}
                        </Link>
                    </li>
                ))}
                
                </ul>
            </nav>

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

export default SubHeader;

