import React, { useState } from "react";

import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const countries = [
  { name: "United States", flag: "/group-3.png" },
  { name: "Tajikistan", flag: "/vector-17.svg" },
  { name: "Brazil", flag: "/vector-18.svg" },
  { name: "South Africa", flag: "/clip-path-group-1.png" },
  { name: "Israel", flag: "/group-143725921.png" },
  { name: "Serbia", flag: "/clip-path-group-2.png" },
  { name: "Monaco", flag: "/group-22.png" },
];

const productResources = [
  {
    text: "All Features",
    url: "https://www.zoho.com/us/books/accounting-software-features/",
  },
  { text: "Pricing", url: "https://www.zoho.com/us/books/pricing/" },
  { text: "Customers", url: "https://www.zoho.com/us/books/customers/" },
  { text: "FAQs", url: "https://www.zoho.com/books/kb/invoices/" },
  { text: "Product Videos", url: "https://www.zoho.com/books/videos/general/" },
];

const otherResources = [
  {
    text: "Free Accounting Software",
    url: "https://www.zoho.com/books/free-accounting-software/",
  },
  {
    text: "Bookkeeping Software",
    url: "https://www.zoho.com/books/bookkeeping-software.html",
  },
  {
    text: "Accounting for Spreadsheet Users",
    url: "https://www.zoho.com/books/move-from-spreadsheet-accounting-to-zoho-books/",
  },
  {
    text: "CRM Accounting Software",
    url: "https://www.zoho.com/books/crm-integration/",
  },
  {
    text: "Construction Accounting Software",
    url: "https://www.zoho.com/us/books/industry/construction-accounting-software/",
  },
];

export default function Footer() {
  const [selectedCountry, setSelectedCountry] = useState("United States");

  return (
    <section className="w-full bg-black py-16">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Country + Contact Info */}
        <div className="space-y-10">
          {/* Country Dropdown */}
          <div>
            <p className="text-white text-xs tracking-wide mb-2">
              SELECT EDITION
            </p>
            <div className="relative w-40">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="appearance-none w-full bg-transparent border border-white text-white text-sm px-3 py-2 rounded focus:outline-none"
              >
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none">
                ▼
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-white text-xs mb-4">CONTACT US ON</p>

            {/* Phone */}
            <div className="flex items-start mb-4">
              <div className="border border-white rounded p-2">
                <img src="/call-icon-svg.svg" alt="Call" className="w-4 h-4" />
              </div>
              <div className="ml-4 text-white text-sm">
                <div className="flex items-center">
                  <span>Mon-Fri</span>
                  <span className="text-xs ml-1">(9:00AM to 9:00PM ET)</span>
                </div>
                <div className="text-xs">+1 564 4564 48</div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <div className="border border-white rounded p-2">
                <img src="/mail-icon-svg.svg" alt="Mail" className="w-4 h-4" />
              </div>
              <div className="ml-4 text-white text-sm">
                <div>Mail Us</div>
                <a
                  href="mailto:support.india@zeluna.com"
                  className="text-xs underline"
                >
                  support.india@zeluna.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Product Help & Resources */}
        <div className="md:col-span-2">
          {/* Product Resources */}
          <div className="mb-10">
            <div className="border-b border-white pb-2 mb-4 relative">
              <h3 className="text-white text-sm font-semibold">
                PRODUCT HELP & RESOURCES
              </h3>
              <div className="absolute bottom-0 left-0 h-[3px] w-12 bg-white"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {productResources.slice(0, 3).map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-xs hover:underline block"
                  >
                    {res.text}
                  </a>
                ))}
              </div>
              <div className="space-y-2">
                {productResources.slice(3).map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-xs hover:underline block"
                  >
                    {res.text}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Other Resources */}
          <div>
            <div className="border-b border-white pb-2 mb-4 relative">
              <h3 className="text-white text-sm font-semibold">
                OTHER RESOURCES
              </h3>
              <div className="absolute bottom-0 left-0 h-[3px] w-12 bg-white"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {otherResources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-xs hover:underline"
                >
                  {res.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
