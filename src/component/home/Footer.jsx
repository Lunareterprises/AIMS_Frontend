
import React from "react";
import { Phone } from "lucide-react";
import { footerData } from "./footerData"; // adjust path if needed

export default function Footer() {
  const { accountSection, helpSupport, quickLinks, accreditation, contact } =
    footerData;

  return (
    <footer className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Account Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {accountSection.title}
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {accountSection.description}
            </p>
            {/* <a
              href={accountSection.learnMoreLink}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Learn More →
            </a> */}
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
              {helpSupport.title}
            </h3>
            <ul className="space-y-3">
              {helpSupport.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
              {quickLinks.title}
            </h3>
            <ul className="space-y-3">
              {quickLinks.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accreditation & Contact */}
        <div className="flex justify-end">
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-yellow-200 rounded-lg px-4 py-2 inline-block mb-6">
              <span className="text-gray-800 font-semibold text-sm">
                {accreditation}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-700 text-sm">
                  You can directly talk to us every{" "}
                  <span className="font-semibold">{contact.days}</span>
                </p>
                <p className="text-gray-700 text-sm">
                  zeluna Helpline:{" "}
                  <span className="font-bold">{contact.helpline}</span> (Toll
                  Free)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

