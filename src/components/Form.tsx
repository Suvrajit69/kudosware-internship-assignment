"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  phone: string;
  resume: File | null;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });
  const router = useRouter()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
  
    if (name === "resume" && files) {
      const file = files[0];
      if (file && file.type === "application/pdf") {
        setFormData({ ...formData, resume: file });
      } else {
        alert("Please upload a PDF file.");
        e.target.value = "";
      }
    } else if (name === "phone") {
      
      const phoneNumber = value.replace(/\D/g, "");
      if (phoneNumber.length <= 10) {
        setFormData({ ...formData, phone: phoneNumber });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    if (formData.resume) {
      data.append("resume", formData.resume);
    }

    try {
      await axios.post("/api/users", data);
      setFormData({...formData, name: "", email: "", phone: "", resume: null });
      router.replace("/confirmation")
    } catch (error) {
      console.log(error);
      alert('An error occurred while submitting the form. Please check your email and phone.');
    }
  };

  return (
    <form
      className="bg-white p-6 rounded shadow-md w-full max-w-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Kudosware
      </h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-2 p-2 border rounded text-slate-600"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-2 p-2 border rounded text-slate-600"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Your Phone Number"
          maxLength={10}
          minLength={10}
          value={formData.phone}
          onChange={handleChange}
          className="w-full mt-2 p-2 border rounded text-slate-600"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="resume" className="block text-gray-700">
          Upload Resume(.pdf only)
        </label>
        <input
          type="file"
          name="resume"
          id="resume"
          accept="application/pdf"
          onChange={handleChange}
          className="w-full mt-2 p-2 border rounded text-slate-600"
          required
        />
      </div>
      <button
        type="submit"
        // disabled
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
