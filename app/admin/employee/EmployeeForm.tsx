import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface EmployeeFormProps {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
  defaultValues?: {
    id?: number;
    employee_id: string;
    first_name: string;
    last_name: string;
    email: string;
    department: string;
  };
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onSubmit,
  onClose,
  defaultValues,
}) => {
  const [employeeId, setEmployeeId] = useState(defaultValues?.employee_id || "");
  const [firstName, setFirstName] = useState(defaultValues?.first_name || "");
  const [lastName, setLastName] = useState(defaultValues?.last_name || "");
  const [email, setEmail] = useState(defaultValues?.email || "");
  const [department, setDepartment] = useState(defaultValues?.department || "");

  useEffect(() => {
    setEmployeeId(defaultValues?.employee_id || "");
    setFirstName(defaultValues?.first_name || "");
    setLastName(defaultValues?.last_name || "");
    setEmail(defaultValues?.email || "");
    setDepartment(defaultValues?.department || "");
  }, [defaultValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("employee_id", employeeId);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("department", department);

    try {
      if (defaultValues && defaultValues.id) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/employee/${defaultValues.id}?_method=PUT`,
          formData
        );
        toast.success("Employee updated successfully!");
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/employee`, formData);
        toast.success("Employee added successfully!");
      }

      onSubmit(formData);
      onClose();
    } catch (error) {
      toast.error(defaultValues ? "Failed to update employee." : "Failed to add employee.");
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block font-medium" htmlFor="employeeId">
          Employee ID
        </label>
        <input
          id="employeeId"
          required
          type="text"
          className="border border-gray-300 rounded p-2 w-full"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium" htmlFor="firstName">
          First Name
        </label>
        <input
          id="firstName"
          required
          type="text"
          className="border border-gray-300 rounded p-2 w-full"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium" htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          required
          type="text"
          className="border border-gray-300 rounded p-2 w-full"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          required
          type="email"
          className="border border-gray-300 rounded p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium" htmlFor="department">
          Department
        </label>
        <input
          id="department"
          required
          type="text"
          className="border border-gray-300 rounded p-2 w-full"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 mt-4 px-4 py-2 rounded text-white"
      >
        {defaultValues ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
