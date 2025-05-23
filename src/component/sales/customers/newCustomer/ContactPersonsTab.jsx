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
  showMore: false,
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

  const hasMoreFieldsVisible = contacts.some((c) => c.showMore);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border border-gray-300 rounded">
        <table className="min-w-full text-sm border-collapse table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-1 py-1 font-medium">SALUTATION</th>
              <th className="border border-gray-300 px-1 py-1 font-medium">FIRST NAME</th>
              <th className="border border-gray-300 px-1 py-1 font-medium">LAST NAME</th>
              <th className="border border-gray-300 px-1 py-1 font-medium">EMAIL</th>
              <th className="border border-gray-300 px-1 py-1 font-medium">WORK PHONE</th>
              <th className="border border-gray-300 px-1 py-1 font-medium">MOBILE</th>
              {hasMoreFieldsVisible && (
                <>
                  <th className="border border-gray-300 px-1 py-1 font-medium">SKYPE</th>
                  <th className="border border-gray-300 px-1 py-1 font-medium">DESIGNATION</th>
                  <th className="border border-gray-300 px-1 py-1 font-medium">DEPARTMENT</th>
                </>
              )}
              <th className="border border-gray-300 px-1 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-1 py-1">
                  <select
                    className="w-full border-none outline-none bg-transparent"
                    value={contact.salutation}
                    onChange={(e) =>
                      handleChange(index, "salutation", e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <input
                    className="w-full border-none outline-none bg-transparent"
                    value={contact.firstName}
                    onChange={(e) =>
                      handleChange(index, "firstName", e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <input
                    className="w-full border-none outline-none bg-transparent"
                    value={contact.lastName}
                    onChange={(e) =>
                      handleChange(index, "lastName", e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <input
                    className="w-full border-none outline-none bg-transparent"
                    value={contact.email}
                    onChange={(e) =>
                      handleChange(index, "email", e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <input
                    className="w-full border-none outline-none bg-transparent"
                    value={contact.workPhone}
                    onChange={(e) =>
                      handleChange(index, "workPhone", e.target.value)
                    }
                  />
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <input
                    className="w-full border-none outline-none bg-transparent"
                    value={contact.mobile}
                    onChange={(e) =>
                      handleChange(index, "mobile", e.target.value)
                    }
                  />
                </td>
                {hasMoreFieldsVisible && (
                  <>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        className="w-full border-none outline-none bg-transparent"
                        value={contact.skype}
                        onChange={(e) =>
                          handleChange(index, "skype", e.target.value)
                        }
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        className="w-full border-none outline-none bg-transparent"
                        value={contact.designation}
                        onChange={(e) =>
                          handleChange(index, "designation", e.target.value)
                        }
                      />
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      <input
                        className="w-full border-none outline-none bg-transparent"
                        value={contact.department}
                        onChange={(e) =>
                          handleChange(index, "department", e.target.value)
                        }
                      />
                    </td>
                  </>
                )}
                <td className="border border-gray-300 px-1 py-1 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button type="button" onClick={() => toggleMoreFields(index)}>
                      <MoreVertical className="text-gray-500" size={18} />
                    </button>
                    <button type="button" onClick={() => removeContact(index)}>
                      <X className="text-red-500" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
