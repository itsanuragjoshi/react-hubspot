import React, { useState } from "react";
import { SinglelineInput } from "../components/ui/SinglelineInput";
import { Button } from "./ui/Button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FormAddContact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    firstname: "",
    lastname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleValidation = () => {
    const newErrors = { email: "", firstname: "", lastname: "" };
    let isValid = true;

    if (!formData.email) {
      isValid = false;
      newErrors.email = "Email is required.";
    }

    if (!formData.firstname) {
      isValid = false;
      newErrors.firstname = "First name is required.";
    }

    if (!formData.lastname) {
      isValid = false;
      newErrors.lastname = "Last name is required.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const response = await fetch("http://localhost:3000/api/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Failed to submit form");
        alert("Contact added successfully!");
        setFormData({ email: "", firstname: "", lastname: "" });
      } catch (error) {
        alert("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs flex items-center">
          Email <span className="text-red-600">*</span>
        </label>
        <SinglelineInput
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="johndoe@gmail.com"
        />
        {errors.email && (
          <span className="text-xs text-red-600">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="firstname" className="text-xs flex items-center">
          First Name <span className="text-red-600">*</span>
        </label>
        <SinglelineInput
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="John"
        />
        {errors.firstname && (
          <span className="text-xs text-red-600">{errors.firstname}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="lastname" className="text-xs flex items-center">
          Last Name <span className="text-red-600">*</span>
        </label>
        <SinglelineInput
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Doe"
        />
        {errors.lastname && (
          <span className="text-xs text-red-600">{errors.lastname}</span>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
          aria-label="Cancel"
          title="Cancel"
        >
          Cancel
        </Button>
        <Button
          icon={Plus}
          showIcon={false}
          showText={true}
          type="submit"
          aria-label="Save Contact"
          title="Save"
          className="min-w-20"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormAddContact;
