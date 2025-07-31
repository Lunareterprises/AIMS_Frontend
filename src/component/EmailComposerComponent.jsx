import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Link,
  X,
  ChevronDown,
} from "lucide-react";

const EmailComposerComponent = ({
  defaultContent = "",
  recipientName = "",
  senderName = "",
  senderEmail = "",
  subject = "",
  emailTitle = "Compose Email",
  attachments: initialAttachments = [],
}) => {
  const [emailData, setEmailData] = useState({
    to: recipientName,
    cc: senderEmail,
    bcc: "",
    subject: subject,
    body: defaultContent,
  });

  const [showCC, setShowCC] = useState(true);
  const [showBCC, setShowBCC] = useState(false);
  const [showAttachmentDropdown, setShowAttachmentDropdown] = useState(false);
  const [attachments, setAttachments] = useState(
    initialAttachments.map((att) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: att.name || att.fileName,
      size: att.size,
      file: null,
      type: att.type,
      fileName: att.fileName,
    }))
  );
  const [isSending, setIsSending] = useState(false);
  const [fontSize, setFontSize] = useState("16 px");

  const fileInputRef = useRef(null);
  const desktopFileInputRef = useRef(null);
  const documentsFileInputRef = useRef(null);
  const bodyRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAttachmentDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (bodyRef.current && defaultContent) {
      bodyRef.current.innerHTML = defaultContent;
    }

    setEmailData((prev) => ({
      ...prev,
      to: recipientName,
      cc: senderEmail,
      subject: subject,
      body: defaultContent,
    }));
  }, [defaultContent, recipientName, subject, senderEmail]);

  const handleInputChange = (field, value) => {
    setEmailData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileAttachment = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      file: file,
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  // Add the missing functions
  const handleDesktopAttachment = (event) => {
    handleFileAttachment(event);
  };

  const handleDocumentsAttachment = (event) => {
    handleFileAttachment(event);
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const applyFormatting = (command, value = null) => {
    document.execCommand(command, false, value);
    bodyRef.current?.focus();
  };

  const handleSend = async () => {
    if (!emailData.to.trim()) {
      alert("Please enter at least one recipient");
      return;
    }

    setIsSending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Email sent successfully!");

      setEmailData({
        to: recipientName,
        cc: senderEmail,
        bcc: "",
        subject: subject,
        body: defaultContent,
      });
      setAttachments(
        initialAttachments.map((att) => ({
          id: Math.random().toString(36).substr(2, 9),
          name: att.name || att.fileName,
          size: att.size,
          file: null,
          type: att.type,
          fileName: att.fileName,
        }))
      );
      if (bodyRef.current) {
        bodyRef.current.innerHTML = defaultContent;
      }
    } catch (error) {
      alert("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleCancel = () => {
    if (
      confirm(
        "Are you sure you want to cancel? Any unsaved changes will be lost."
      )
    ) {
      setEmailData({
        to: recipientName,
        cc: senderEmail,
        bcc: "",
        subject: subject,
        body: defaultContent,
      });
      if (bodyRef.current) {
        bodyRef.current.innerHTML = defaultContent;
      }
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-md">
        <h3 className="text-lg font-medium text-gray-900">
          Email To {recipientName}
        </h3>
      </div>

      {/* Email Form */}
      <div className="p-4 space-y-3">
        {/* From Field */}
        <div className="flex items-center">
          <label className="w-16 text-sm text-gray-700 flex-shrink-0">
            From
          </label>
          <div className="flex-1 text-sm text-gray-600">
            {senderName} &lt;{senderEmail}&gt;
          </div>
        </div>

        {/* Send To Field */}
        <div className="flex items-center">
          <label className="w-16 text-sm text-gray-700 flex-shrink-0">
            Send To
          </label>
          <input
            type="email"
            value={emailData.to}
            onChange={(e) => handleInputChange("to", e.target.value)}
            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowBCC(!showBCC)}
            className="ml-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Bcc
          </button>
        </div>

        {/* CC Field */}
        {showCC && (
          <div className="flex items-center">
            <label className="w-16 text-sm text-gray-700 flex-shrink-0">
              Cc
            </label>
            <div className="flex-1 flex items-center">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 mr-2">
                A
              </span>
              <input
                type="email"
                value={emailData.cc}
                onChange={(e) => handleInputChange("cc", e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* BCC Field */}
        {showBCC && (
          <div className="flex items-center">
            <label className="w-16 text-sm text-gray-700 flex-shrink-0">
              Bcc
            </label>
            <input
              type="email"
              value={emailData.bcc}
              onChange={(e) => handleInputChange("bcc", e.target.value)}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        {/* Subject Field */}
        <div className="flex items-center">
          <label className="w-16 text-sm text-gray-700 flex-shrink-0">
            Subject
          </label>
          <input
            type="text"
            value={emailData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Formatting Toolbar */}
        <div className="border border-gray-300 rounded">
          <div className="px-3 py-2 bg-gray-50 border-b border-gray-300 flex items-center gap-1">
            <button
              type="button"
              onClick={() => applyFormatting("bold")}
              className="p-1.5 hover:bg-gray-200 rounded border border-transparent hover:border-gray-300"
              title="Bold"
            >
              <Bold className="w-4 h-4 text-gray-700" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting("italic")}
              className="p-1.5 hover:bg-gray-200 rounded border border-transparent hover:border-gray-300"
              title="Italic"
            >
              <Italic className="w-4 h-4 text-gray-700" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting("underline")}
              className="p-1.5 hover:bg-gray-200 rounded border border-transparent hover:border-gray-300"
              title="Underline"
            >
              <Underline className="w-4 h-4 text-gray-700" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting("strikeThrough")}
              className="p-1.5 hover:bg-gray-200 rounded border border-transparent hover:border-gray-300"
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4 text-gray-700" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            {/* Font Size Dropdown */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-1 px-2 py-1.5 hover:bg-gray-200 rounded border border-transparent hover:border-gray-300 text-sm"
              >
                {fontSize}
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            <button
              type="button"
              onClick={() => applyFormatting("insertUnorderedList")}
              className="p-1.5 hover:bg-gray-200 rounded border border-transparent hover:border-gray-300"
              title="Bullet List"
            >
              <List className="w-4 h-4 text-gray-700" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting("insertOrderedList")}
              className="p-1.5 hover:bg-gray-200 rounded border border-transparent hover:border-gray-300"
              title="Numbered List"
            >
              <span className="text-sm font-mono">1.</span>
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            <button
              type="button"
              onClick={() => applyFormatting("justifyLeft")}
              className="p-1.5 hover:bg-gray-200 rounded border border-transparent hover:border-gray-300"
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting("justifyCenter")}
              className="p-1.5 hover:bg-gray-200 rounded border border-transparent hover:border-gray-300"
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4 text-gray-700" />
            </button>
            <button
              type="button"
              onClick={() => applyFormatting("justifyRight")}
              className="p-1.5 hover:bg-gray-200 rounded border border-transparent hover:border-gray-300"
              title="Align Right"
            >
              <AlignRight className="w-4 h-4 text-gray-700" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            <button
              type="button"
              onClick={() => {
                const url = prompt("Enter URL:");
                if (url) applyFormatting("createLink", url);
              }}
              className="p-1.5 hover:bg-gray-200 rounded border border-transparent hover:border-gray-300"
              title="Insert Link"
            >
              <Link className="w-4 h-4 text-gray-700" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileAttachment}
              className="hidden"
            />

            {/* Hidden file inputs for different attachment sources */}
            <input
              ref={desktopFileInputRef}
              type="file"
              multiple
              onChange={handleDesktopAttachment}
              className="hidden"
              accept="*/*"
              title="Select files from Desktop"
            />

            <input
              ref={documentsFileInputRef}
              type="file"
              multiple
              onChange={handleDocumentsAttachment}
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
              title="Select documents"
            />
          </div>

          {/* Email Body */}
          <div
            ref={bodyRef}
            contentEditable
            onInput={(e) => handleInputChange("body", e.target.innerHTML)}
            className="min-h-[400px] p-4 focus:outline-none text-sm"
            style={{ lineHeight: "1.5" }}
          />
        </div>

        {/* Attach Quote PDF Section */}
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="attachQuotePdf"
            defaultChecked={true}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="attachQuotePdf" className="text-sm text-gray-700">
            Attach Quote PDF
          </label>
        </div>
        {/* Attachments Section */}
        <div>
          {/* Non-PDF Attachments */}
          {attachments.filter(
            (att) => !att.name?.toLowerCase().endsWith(".pdf")
          ).length > 0 && (
            <div className="mb-3">
              {attachments
                .filter((att) => !att.name?.toLowerCase().endsWith(".pdf"))
                .map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between bg-white p-2 rounded border"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">
                        {attachment.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({formatFileSize(attachment.size)})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(attachment.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
            </div>
          )}

          {/* Attachment Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowAttachmentDropdown(!showAttachmentDropdown)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
              Attachments
              <ChevronDown className="w-3 h-3" />
            </button>

            {showAttachmentDropdown && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <button
                  type="button"
                  onClick={() => {
                    desktopFileInputRef.current?.click();
                    setShowAttachmentDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Paperclip className="w-4 h-4" />
                  Attach From Desktop
                </button>
                <button
                  type="button"
                  onClick={() => {
                    documentsFileInputRef.current?.click();
                    setShowAttachmentDropdown(false);
                  }}
                  className="w-full text-nowrap px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Paperclip className="w-4 h-4" />
                  Attach From Documents
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4">
          <button
            type="button"
            onClick={handleSend}
            disabled={isSending}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            {isSending ? "Sending..." : "Send"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailComposerComponent;
