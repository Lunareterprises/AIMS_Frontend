import EmailComposerComponent from "../../EmailComposerComponent";

const QuotesMailPage = () => {
  const generateDefaultContent = ({
    recipientName,
    quoteNumber,
    quoteAmount,
    quoteDate,
    senderName,
    companyName,
    quoteLink,
  }) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="background-color: #2563eb; color: white; padding: 12px 0; text-align: center;">
          Quote #${quoteNumber}
        </h2>

        <p>Dear <strong>${recipientName}</strong>,</p>
        <p>
          Thank you for contacting us. Your quote can be viewed, printed, and
          downloaded as a PDF from the link below.
        </p>

        <div style="background-color: #fef3c7; border: 1px solid #fde68a; padding: 12px; margin: 20px 0; text-align: center;">
          <div style="font-size: 13px; color: #374151;">QUOTE AMOUNT</div>
          <div style="font-size: 20px; font-weight: bold; color: #dc2626;">${quoteAmount}</div>
        </div>

        <div style="background-color: #fef3c7; border: 1px solid #fde68a; padding: 16px; text-align: center; margin-bottom: 20px;">
          <p><strong>Quote No:</strong> ${quoteNumber}</p>
          <p><strong>Quote Date:</strong> ${quoteDate}</p>
          <a href="${quoteLink}" target="_blank" style="display: inline-block; margin-top: 12px; padding: 10px 20px; background-color: #22c55e; color: white; text-decoration: none; border-radius: 4px;">
            VIEW QUOTE
          </a>
        </div>

        <p>Regards,</p>
        <p><strong>${senderName}</strong><br><span style="font-size: 12px; color: #6b7280;">${companyName}</span></p>
      </div>
    `;
  };

  return (
    <div className="p-4">
      <EmailComposerComponent
        recipientName="2070 VACATION HOME"
        senderName="accounts"
        senderEmail="accounts@aim-bc.com"
        subject="Quote - QT-000005 is awaiting your approval"
        emailTitle="Email"
        attachments={[
          {
            name: "Quote PDF",
            fileName: "QT-000005",
            size: 1024000,
            type: "application/pdf",
          },
        ]}
        defaultContent={generateDefaultContent({
          recipientName: "2070 VACATION HOME",
          quoteNumber: "QT-000005",
          quoteAmount: "₹25,000",
          quoteDate: "25 Jul 2025",
          senderName: "accounts",
          companyName: "AIM Business Consultants",
          quoteLink: "https://yourdomain.com/quote/QT-000005",
        })}
      />
    </div>
  );
};

export default QuotesMailPage;
