import React, { useState } from "react";
import { X, MoreVertical } from "lucide-react";

const initialContact = {
  salutation: "",
  firstName: "",
  lastName: "",
  email: "",
  workPhone: "",
  mobile: "",
  skype: "",
  designation: "",
  department: "",
  showMore: false, // controls visibility of extra fields
};

export default function ContactPersonsTab() {
  const [contacts, setContacts] = useState([{ ...initialContact }]);

  const addContact = () => {
    setContacts([...contacts, { ...initialContact }]);
  };

  const removeContact = (index) => {
    const updated = [...contacts];
    updated.splice(index, 1);
    setContacts(updated);
  };

  const handleChange = (index, key, value) => {
    const updated = [...contacts];
    updated[index][key] = value;
    setContacts(updated);
  };

  const toggleMoreFields = (index) => {
    const updated = [...contacts];
    updated[index].showMore = !updated[index].showMore;
    setContacts(updated);
  };

  return (  
    <div className="space-y-4 ">
      <div className="border border-gray-200 rounded">
        <div
          className={`grid ${
            contacts.some((c) => c.showMore)
              ? "grid-cols-10"
              : "grid-cols-7"
          } bg-gray-100 text-xs font-semibold px-4 py-2`}
        >
          <div>SALUTATION</div>
          <div>FIRST NAME</div>
          <div>LAST NAME</div>
          <div>EMAIL ADDRESS</div>
          <div>WORK PHONE</div>
          <div>MOBILE</div>
          {contacts.some((c) => c.showMore) && (
            <>
              <div>SKYPE NAME/NUMBER</div>
              <div>DESIGNATION</div>
              <div>DEPARTMENT</div>
            </>
          )}
          <div></div>
        </div>

        {contacts.map((contact, index) => (
          <div
            key={index}
            className={`grid ${
              contact.showMore ? "grid-cols-10" : "grid-cols-7"
            } items-center border-t border-gray-200 px-4 py-2 gap-2 `}
          >
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={contact.salutation}
              onChange={(e) => handleChange(index, "salutation", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
            </select>

            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={contact.firstName}
              onChange={(e) => handleChange(index, "firstName", e.target.value)}
            />
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={contact.lastName}
              onChange={(e) => handleChange(index, "lastName", e.target.value)}
            />
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={contact.email}
              onChange={(e) => handleChange(index, "email", e.target.value)}
            />
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={contact.workPhone}
              onChange={(e) => handleChange(index, "workPhone", e.target.value)}
            />
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={contact.mobile}
              onChange={(e) => handleChange(index, "mobile", e.target.value)}
            />

            {contact.showMore && (
              <>
                <input
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={contact.skype}
                  onChange={(e) => handleChange(index, "skype", e.target.value)}
                />
                <input
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={contact.designation}
                  onChange={(e) =>
                    handleChange(index, "designation", e.target.value)
                  }
                />
                <input
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={contact.department}
                  onChange={(e) =>
                    handleChange(index, "department", e.target.value)
                  }
                />
              </>
            )}

            <div className="flex items-center space-x-2">
              <button type="button" onClick={() => toggleMoreFields(index)}>
                <MoreVertical className="text-gray-500" size={18} />
              </button>
              <button type="button" onClick={() => removeContact(index)}>
                <X className="text-red-500" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addContact}
        className="flex items-center space-x-2 border border-gray-300 px-3 py-1.5 text-sm rounded bg-white hover:bg-gray-50"
      >
        <span className="text-lg text-blue-500">＋</span>
        <span className="text-blue-500">Add Contact Person</span>
      </button>
    </div>
  );
}
