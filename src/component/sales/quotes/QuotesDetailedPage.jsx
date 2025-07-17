import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CommonButton from "../../CommonUI/buttons/CommonButton";
import html2pdf from "html2pdf.js";

export default function QuotesDetailedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const quoteData = location.state?.quoteData;
  const title = location.state?.title || "Quote";
  const backToPath = location.state?.backToPath;
  const editForm = location.state?.editForm;

  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      const element = printRef.current;

      if (!element) {
        console.error("Element not found for PDF generation");
        alert("Error: Unable to generate PDF. Please try again.");
        return;
      }

      // Show loading state (optional)
      const button = document.querySelector("[data-pdf-button]");
      if (button) {
        button.textContent = "Generating...";
        button.disabled = true;
      }

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${title}_${quoteData?.quoteNumber || "Quote"}.pdf`,
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
          allowTaint: true,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: {
          mode: ["avoid-all", "css", "legacy"],
        },
      };

      await html2pdf().set(opt).from(element).save();

      console.log("PDF generated successfully");

      // Reset button state
      if (button) {
        button.textContent = "PDF";
        button.disabled = false;
      }
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");

      // Reset button state
      const button = document.querySelector("[data-pdf-button]");
      if (button) {
        button.textContent = "PDF";
        button.disabled = false;
      }
    }
  };

  // Handle case where no data is passed (direct URL access)
  if (!quoteData) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quote Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The quote data could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="flex items-center justify-start mb-10 gap-3">
        <div>
          <CommonButton
            label={
              <>
                <ArrowLeft size={16} className="mr-2" />
                Back to Quotes
              </>
            }
            onClick={() => navigate(backToPath)}
            className="hover:text-blue-600 text-blue-500 px-4 py-2 rounded flex items-center cursor-pointer"
          />
        </div>

        <CommonButton
          label="Edit"
          className="bg-gray-200 rounded-md px-5 py-2 text-gray-900 hover:bg-gray-300"
          onClick={() => navigate(editForm)}
        />
        <CommonButton
          onClick={handleDownloadPDF}
          label="PDF"
          className="bg-gray-200 rounded-md px-5 py-2 text-gray-900 hover:bg-gray-300"
          data-pdf-button="true"
        />
        <CommonButton
          onClick={handlePrint}
          label="Print"
          className="bg-gray-200 rounded-md px-5 py-2 text-gray-900 hover:bg-gray-300"
        />
      </header>

      <div
        ref={printRef}
        className="max-w-4xl mx-auto bg-white p-8 shadow-lg"
        style={{
          fontFamily: "Arial, sans-serif",
          color: "#000",
          backgroundColor: "#fff",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-start">
            {/* Company Info */}
            <div className="ml-8">
              <h2
                className="text-lg font-bold text-gray-800"
                style={{ color: "#000" }}
              >
                {quoteData.companyName}
              </h2>
              <p className="text-sm text-gray-600" style={{ color: "#666" }}>
                Office 316 5th Tower
              </p>
              <p className="text-sm text-gray-600" style={{ color: "#666" }}>
                Dubai Silicon Oasis
              </p>
              <p className="text-sm text-gray-600" style={{ color: "#666" }}>
                Dubai Dubai
              </p>
              <p className="text-sm text-gray-600" style={{ color: "#666" }}>
                UAE
              </p>
              <p className="text-sm text-gray-600" style={{ color: "#666" }}>
                TRN 104175163400003
              </p>
              <p className="text-sm text-gray-600" style={{ color: "#666" }}>
                7702380367
              </p>
              <p className="text-sm text-blue-600" style={{ color: "#0066cc" }}>
                accounts@aim-bc.com
              </p>
            </div>
          </div>

          {/* Quote Header */}
          <div className="text-right">
            <h1
              className="text-4xl font-bold text-gray-800 mb-2"
              style={{ color: "#000" }}
            >
              {title}
            </h1>
            <p className="text-sm text-gray-600" style={{ color: "#666" }}>
              # {quoteData.quoteNumber}
            </p>
            <p className="text-sm text-gray-600" style={{ color: "#666" }}>
              Ref: {quoteData.referenceNumber}
            </p>
          </div>
        </div>

        {/* Quote Details Section */}
        <div
          className="grid grid-cols-2 gap-8 mb-8 p-6 bg-gray-50 rounded-lg"
          style={{ backgroundColor: "#f8f9fa", border: "1px solid #e9ecef" }}
        >
          <div>
            <h3
              className="font-semibold text-gray-800 mb-4"
              style={{ color: "#000" }}
            >
              {title} Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600" style={{ color: "#666" }}>
                  Date:
                </span>
                <span className="font-medium" style={{ color: "#000" }}>
                  {quoteData.date}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600" style={{ color: "#666" }}>
                  Expiry Date:
                </span>
                <span className="font-medium" style={{ color: "#000" }}>
                  {quoteData.expiryDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600" style={{ color: "#666" }}>
                  Sales Person:
                </span>
                <span className="font-medium" style={{ color: "#000" }}>
                  {quoteData.salesPerson}
                </span>
              </div>
              {quoteData.acceptedDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600" style={{ color: "#666" }}>
                    Accepted Date:
                  </span>
                  <span
                    className="font-medium text-green-600"
                    style={{ color: "#28a745" }}
                  >
                    {quoteData.acceptedDate}
                  </span>
                </div>
              )}
              {quoteData.declinedDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600" style={{ color: "#666" }}>
                    Declined Date:
                  </span>
                  <span
                    className="font-medium text-red-600"
                    style={{ color: "#dc3545" }}
                  >
                    {quoteData.declinedDate}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3
              className="font-semibold text-gray-800 mb-4"
              style={{ color: "#000" }}
            >
              Amount Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600" style={{ color: "#666" }}>
                  Sub Total:
                </span>
                <span className="font-medium" style={{ color: "#000" }}>
                  {quoteData.subTotal}
                </span>
              </div>
              <div
                className="flex justify-between border-t pt-2"
                style={{ borderTop: "1px solid #dee2e6" }}
              >
                <span
                  className="text-gray-800 font-semibold"
                  style={{ color: "#000" }}
                >
                  Total Amount:
                </span>
                <span className="font-bold text-lg" style={{ color: "#000" }}>
                  {quoteData.amount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="mb-8">
          <div className="flex justify-between">
            <div>
              <h3
                className="font-semibold text-gray-800 mb-2"
                style={{ color: "#000" }}
              >
                Bill To
              </h3>
              <p
                className="text-blue-600 font-medium"
                style={{ color: "#0066cc" }}
              >
                {quoteData.customerName}
              </p>
              <p className="text-gray-600" style={{ color: "#666" }}>
                {quoteData.companyName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600" style={{ color: "#666" }}>
                {title} Date: {quoteData.date}
              </p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table
            className="w-full"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr
                className="bg-gray-800 text-white"
                style={{ backgroundColor: "#343a40", color: "#fff" }}
              >
                <th
                  className="text-left py-3 px-4 font-semibold"
                  style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  #
                </th>
                <th
                  className="text-left py-3 px-4 font-semibold"
                  style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  Item & Description
                </th>
                <th
                  className="text-center py-3 px-4 font-semibold"
                  style={{
                    textAlign: "center",
                    padding: "12px 16px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  Qty
                </th>
                <th
                  className="text-right py-3 px-4 font-semibold"
                  style={{
                    textAlign: "right",
                    padding: "12px 16px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  Rate
                </th>
                <th
                  className="text-right py-3 px-4 font-semibold"
                  style={{
                    textAlign: "right",
                    padding: "12px 16px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                className="border-b"
                style={{ borderBottom: "1px solid #dee2e6" }}
              >
                <td
                  className="py-3 px-4"
                  style={{ padding: "12px 16px", border: "1px solid #dee2e6" }}
                >
                  1
                </td>
                <td
                  className="py-3 px-4"
                  style={{ padding: "12px 16px", border: "1px solid #dee2e6" }}
                >
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: "#000", fontWeight: "500" }}
                    >
                      Service Item
                    </p>
                    <p
                      className="text-sm text-gray-600"
                      style={{ color: "#666", fontSize: "14px" }}
                    >
                      Professional services
                    </p>
                  </div>
                </td>
                <td
                  className="text-center py-3 px-4"
                  style={{
                    textAlign: "center",
                    padding: "12px 16px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <div>
                    <p style={{ color: "#000" }}>1.00</p>
                    <p
                      className="text-sm text-gray-600"
                      style={{ color: "#666", fontSize: "14px" }}
                    >
                      Unit
                    </p>
                  </div>
                </td>
                <td
                  className="text-right py-3 px-4"
                  style={{
                    textAlign: "right",
                    padding: "12px 16px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <div>
                    <p style={{ color: "#000" }}>{quoteData.subTotal}</p>
                    <p
                      className="text-sm text-gray-600"
                      style={{ color: "#666", fontSize: "14px" }}
                    >
                      5.00%
                    </p>
                  </div>
                </td>
                <td
                  className="text-right py-3 px-4"
                  style={{
                    textAlign: "right",
                    padding: "12px 16px",
                    border: "1px solid #dee2e6",
                    color: "#000",
                  }}
                >
                  {quoteData.amount}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Subtotal */}
          <div className="flex justify-end mt-4">
            <div className="w-64" style={{ width: "256px" }}>
              <div
                className="flex justify-between py-2"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                }}
              >
                <span
                  className="font-medium"
                  style={{ color: "#000", fontWeight: "500" }}
                >
                  Sub Total
                </span>
                <span style={{ color: "#000" }}>{quoteData.subTotal}</span>
              </div>
              <div
                className="flex justify-between py-2 border-t"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderTop: "1px solid #dee2e6",
                }}
              >
                <span
                  className="font-bold"
                  style={{ color: "#000", fontWeight: "bold" }}
                >
                  Total
                </span>
                <span
                  className="font-bold"
                  style={{ color: "#000", fontWeight: "bold" }}
                >
                  {quoteData.amount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div
              className={`px-6 py-3 rounded-full text-white font-semibold`}
              style={{
                padding: "12px 24px",
                borderRadius: "50px",
                color: "#fff",
                fontWeight: "600",
                backgroundColor:
                  quoteData.status === "Open"
                    ? "#007bff"
                    : quoteData.status === "Accepted"
                    ? "#28a745"
                    : quoteData.status === "Sent"
                    ? "#ffc107"
                    : quoteData.status === "Declined"
                    ? "#dc3545"
                    : "#6c757d",
              }}
            >
              Status: {quoteData.status}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-8">
          <h3
            className="font-semibold text-gray-800 mb-2"
            style={{ color: "#000", fontWeight: "600" }}
          >
            Notes
          </h3>
          <p
            className="text-sm text-gray-600"
            style={{ color: "#666", fontSize: "14px" }}
          >
            Looking forward for your business.
          </p>
        </div>

        {/* Footer */}
        <div
          className="text-center text-sm text-gray-500 border-t pt-4"
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#6c757d",
            borderTop: "1px solid #dee2e6",
            paddingTop: "16px",
          }}
        >
          <span
            className="text-blue-600 cursor-pointer"
            style={{ color: "#0066cc" }}
          >
            PDF Template
          </span>
          <span className="mx-1">·</span>
          <span
            className="text-blue-600 cursor-pointer"
            style={{ color: "#0066cc" }}
          >
            Standard Template
          </span>
          <span className="mx-1">·</span>
          <span
            className="text-blue-600 cursor-pointer"
            style={{ color: "#0066cc" }}
          >
            Change
          </span>
        </div>
      </div>
    </div>
  );
}
