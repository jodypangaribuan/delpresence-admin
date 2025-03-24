"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AddCoursePage() {
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    department: "",
    credits: "",
    semester: "",
    active: true,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send this data to your API
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/courses"
          className="rounded-full p-2 hover:bg-[#E6F3FB] text-neutral-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-[#002A5C]">Add New Course</h1>
      </div>

      <div className="rounded-lg border border-neutral-100 bg-white shadow-sm">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="courseCode"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Course Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="courseCode"
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-200 p-2.5 text-sm outline-none focus:border-[#0687C9] focus:ring-1 focus:ring-[#0687C9]"
                  placeholder="e.g., CS101"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="courseName"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Course Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-200 p-2.5 text-sm outline-none focus:border-[#0687C9] focus:ring-1 focus:ring-[#0687C9]"
                  placeholder="e.g., Introduction to Computer Science"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-200 p-2.5 text-sm outline-none focus:border-[#0687C9] focus:ring-1 focus:ring-[#0687C9]"
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="English">English</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="credits"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Credits <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="credits"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                  required
                  min="1"
                  max="6"
                  className="w-full rounded-lg border border-neutral-200 p-2.5 text-sm outline-none focus:border-[#0687C9] focus:ring-1 focus:ring-[#0687C9]"
                  placeholder="e.g., 3"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="semester"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Semester <span className="text-red-500">*</span>
                </label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-200 p-2.5 text-sm outline-none focus:border-[#0687C9] focus:ring-1 focus:ring-[#0687C9]"
                >
                  <option value="">Select Semester</option>
                  <option value="Fall 2023">Fall 2023</option>
                  <option value="Spring 2024">Spring 2024</option>
                  <option value="Summer 2024">Summer 2024</option>
                  <option value="Fall 2024">Fall 2024</option>
                </select>
              </div>

              <div className="flex items-center">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-neutral-300 text-[#0687C9] focus:ring-[#0687C9]"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="active"
                    className="font-medium text-neutral-700"
                  >
                    Active Course
                  </label>
                  <p className="text-neutral-500">
                    Indicates if the course is currently active and open for
                    enrollment
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-neutral-700"
              >
                Course Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-neutral-200 p-2.5 text-sm outline-none focus:border-[#0687C9] focus:ring-1 focus:ring-[#0687C9]"
                placeholder="Enter course description..."
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="/dashboard/courses"
                className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#0687C9] focus:ring-offset-2"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-lg bg-[#0687C9] px-4 py-2 text-sm font-medium text-white hover:bg-[#0568a1] focus:outline-none focus:ring-2 focus:ring-[#0687C9] focus:ring-offset-2"
              >
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
