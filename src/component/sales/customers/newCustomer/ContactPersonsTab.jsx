import React, { useState } from "react";
import { X, MoreVertical } from "lucide-react";

export default function ContactPersonsTab() {
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
    <div className="p-6 max-w-full">
      <h2 className="text-xl font-semibold mb-4">Contact Persons</h2>

      <div className="space-y-4">
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salutation
                </th>
                <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Name
                </th>
                <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email Address
                </th>
                <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Work Phone
                </th>
                <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile
                </th>
                {hasMoreFieldsVisible && (
                  <>
                    <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skype Name/Number
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                  </>
                )}
                <th className="border border-gray-300 px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2">
                    <select
                      className="w-full border-none outline-none bg-transparent text-sm focus:ring-2 focus:ring-blue-500 rounded px-1 py-1"
                      value={contact.salutation}
                      onChange={(e) =>
                        handleChange(index, "salutation", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Dr.">Dr.</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent text-sm focus:ring-2 focus:ring-blue-500 rounded px-1 py-1"
                      placeholder="First Name"
                      value={contact.firstName}
                      onChange={(e) =>
                        handleChange(index, "firstName", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      className="w-full border-none outline-none bg-transparent text-sm focus:ring-2 focus:ring-blue-500 rounded px-1 py-1"
                      placeholder="Last Name"
                      value={contact.lastName}
                      onChange={(e) =>
                        handleChange(index, "lastName", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="email"
                      className="w-full border-none outline-none bg-transparent text-sm focus:ring-2 focus:ring-blue-500 rounded px-1 py-1"
                      placeholder="Email Address"
                      value={contact.email}
                      onChange={(e) =>
                        handleChange(index, "email", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="tel"
                      className="w-full border-none outline-none bg-transparent text-sm focus:ring-2 focus:ring-blue-500 rounded px-1 py-1"
                      placeholder="Work Phone"
                      value={contact.workPhone}
                      onChange={(e) =>
                        handleChange(index, "workPhone", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="tel"
                      className="w-full border-none outline-none bg-transparent text-sm focus:ring-2 focus:ring-blue-500 rounded px-1 py-1"
                      placeholder="Mobile"
                      value={contact.mobile}
                      onChange={(e) =>
                        handleChange(index, "mobile", e.target.value)
                      }
                    />
                  </td>
                  {hasMoreFieldsVisible && (
                    <>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          className="w-full border-none outline-none bg-transparent text-sm focus:ring-2 focus:ring-blue-500 rounded px-1 py-1"
                          placeholder="Skype Name/Number"
                          value={contact.skype}
                          onChange={(e) =>
                            handleChange(index, "skype", e.target.value)
                          }
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          className="w-full border-none outline-none bg-transparent text-sm focus:ring-2 focus:ring-blue-500 rounded px-1 py-1"
                          placeholder="Designation"
                          value={contact.designation}
                          onChange={(e) =>
                            handleChange(index, "designation", e.target.value)
                          }
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          className="w-full border-none outline-none bg-transparent text-sm focus:ring-2 focus:ring-blue-500 rounded px-1 py-1"
                          placeholder="Department"
                          value={contact.department}
                          onChange={(e) =>
                            handleChange(index, "department", e.target.value)
                          }
                        />
                      </td>
                    </>
                  )}
                  <td className="border border-gray-300 px-2 py-2">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleMoreFields(index)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                        title={
                          contact.showMore
                            ? "Hide additional fields"
                            : "Show additional fields"
                        }
                      >
                        <MoreVertical
                          className={`text-gray-500 hover:text-gray-700 transition-colors duration-200 ${
                            contact.showMore ? "text-blue-500" : ""
                          }`}
                          size={18}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeContact(index)}
                        className="p-1 hover:bg-red-100 rounded transition-colors duration-200"
                        title="Remove contact"
                      >
                        <X
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          size={18}
                        />
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
          className="inline-flex items-center space-x-2 border border-gray-300 px-4 py-2 text-sm rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        >
          <span className="text-lg text-blue-500 font-bold">+</span>
          <span className="text-blue-600 font-medium">Add Contact Person</span>
        </button>
      </div>
    </div>
  );
}
