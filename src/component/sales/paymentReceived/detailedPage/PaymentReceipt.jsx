import { useLocation, useNavigate } from "react-router-dom";
import CommonButton from "../../../CommonUI/buttons/CommonButton";
import { ArrowLeft } from 'lucide-react';
import { useRef } from "react";
import PaymentTable from "./PaymentTable";
import JournalInvoicePayment from "./JournalInvoicePayment";
export default function PaymentReceipt() {
    const location = useLocation();
    const navigate = useNavigate();
    const paymentData = location.state?.paymentData;
    const title = location.state?.title || "Quote";
    const backToPath = location.state?.backToPath ;
    const editForm = location.state?.editForm;

      const printRef = useRef();
    
      const handlePrint = () => {
        window.print();
      };
      const handleDownloadPDF = () => {
        const element = printRef.current;
        const opt = {
          margin: 0.5,
          filename: `${title}_${quoteData?.quoteNumber || 'Quote'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
      };
    
    return (
   // PaymentReceiptFullPage.jsx

    <div className="bg-white text-sm text-black p-6 max-w-6xl mx-auto font-sans">


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
          onClick={()=>navigate(editForm)}
        />
        <CommonButton onClick={handleDownloadPDF}  label="PDF" className="bg-gray-200 rounded-md px-5 py-2 text-gray-900 hover:bg-gray-300"/>
        <CommonButton onClick={handlePrint} label="Print" className="bg-gray-200 rounded-md px-5 py-2 text-gray-900 hover:bg-gray-300"/>

      </header>
      {/* Header */}
      <div className=" p-6 rounded-sm shadow-xl">
        <div className="mb-6">
          <h2 className="font-bold text-lg text-gray-950">{paymentData.customerName}</h2>
          <p className="text-gray-500 mt-6 leading-loose">
            Office 304 GT Tower<br />
            Dubai Silicon Oasis<br />
            Dubai, UAE<br />
            TRN: 100072000000003<br />
            +971505979587<br />
            accounts@ambc.ae
          </p>
        </div>

        <hr className="my-4 text-gray-200" />

        <h3 className="text-center text-lg font-semibold mb-6">{title}</h3>

        {/* Receipt Details */}
        <div className="grid grid-cols-2 mb-6">
          <div className="space-y-2 ">
            <p className="flex mb-2">
                <span className="text-gray-500 w-48">Payment Date:</span>
                <span>{paymentData.date}</span>
            </p>
            <p className="flex mb-2">
                <span className="text-gray-500 w-48">Reference Number:</span>
                <span>{paymentData.referenceNumber}</span>
            </p>  
            <p className="flex mb-2">
                <span className="text-gray-500 w-48">Payment Mode:</span>
                <span>{paymentData.mode}</span>
            </p>
            
          </div>
          <div className="text-right">
            <p className="font-semibold">Amount Received</p>
            <p className="bg-green-600 text-white px-4 py-1 inline-block mt-1 font-semibold">{paymentData.amount}</p>
          </div>
        </div>
            <p className="flex mb-2">
                <span className="text-gray-500 w-48">Received From:</span>
                <span>{paymentData.customerName}</span>
            </p>

        {/* Invoice Table */}
        <div className="mt-10">
            <PaymentTable  paymentData = {paymentData}/>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-xs text-gray-500 mt-6">PDF Template: Title Template Change</div>

      {/* Journal Section */}
      <hr className="my-6" />
      <h3 className="text-xl font-normal mb-5 text-gray-900 ">More Information</h3>
      <p className="mb-4 "><span className="text-gray-500">Deposited To:</span> <span className="font-semibold">{paymentData.mode}</span></p>

          <JournalInvoicePayment paymentData = {paymentData}/>
    </div>
  );
}
