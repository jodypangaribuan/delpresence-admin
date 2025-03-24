"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

// Sample data for demonstration
const courses = [
  {
    id: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    credit: 3,
    semester: "Fall 2023",
    active: true,
  },
  {
    id: "MTH201",
    name: "Linear Algebra",
    department: "Mathematics",
    credit: 4,
    semester: "Spring 2023",
    active: true,
  },
  {
    id: "PHY101",
    name: "Physics I",
    department: "Physics",
    credit: 4,
    semester: "Fall 2023",
    active: false,
  },
  {
    id: "ENG105",
    name: "Academic Writing",
    department: "English",
    credit: 3,
    semester: "Spring 2023",
    active: true,
  },
  {
    id: "CS201",
    name: "Data Structures and Algorithms",
    department: "Computer Science",
    credit: 4,
    semester: "Fall 2023",
    active: true,
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#002A5C]">Courses</h1>
        <Link
          href="/dashboard/courses/add"
          className="inline-flex items-center justify-center rounded-lg bg-[#0687C9] px-4 py-2 text-sm font-medium text-white hover:bg-[#0568a1] focus:outline-none focus:ring-2 focus:ring-[#0687C9] focus:ring-offset-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Link>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-md items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by ID, name, or department..."
              className="w-full rounded-lg border border-neutral-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#0687C9] focus:ring-1 focus:ring-[#0687C9]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-shrink-0 gap-2">
            <button className="inline-flex items-center justify-center rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-[#E6F3FB] focus:outline-none focus:ring-2 focus:ring-[#0687C9] focus:ring-offset-1">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-neutral-200">
            <thead className="bg-[#E6F3FB]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#002A5C] uppercase tracking-wider">
                  Course ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#002A5C] uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#002A5C] uppercase tracking-wider">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#002A5C] uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#002A5C] uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#002A5C] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#002A5C] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {filteredCourses.map((course) => (
                <tr
                  key={course.id}
                  className="transition-colors hover:bg-[#E6F3FB]"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-neutral-900">
                    {course.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-800">
                    {course.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {course.department}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {course.credit}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {course.semester}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        course.active
                          ? "bg-green-100 text-green-700"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {course.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/dashboard/courses/${course.id}`}
                        className="rounded p-1 text-neutral-600 hover:bg-[#E6F3FB] hover:text-[#0687C9]"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/courses/${course.id}/edit`}
                        className="rounded p-1 text-neutral-600 hover:bg-[#E6F3FB] hover:text-[#0687C9]"
                      >
                        Edit
                      </Link>
                      <button className="rounded p-1 text-neutral-600 hover:bg-[#E6F3FB]">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-3">
          <div className="text-sm text-neutral-500">
            Showing{" "}
            <span className="font-medium">{filteredCourses.length}</span> of{" "}
            <span className="font-medium">{courses.length}</span> courses
          </div>
          <div className="flex space-x-2">
            <button className="rounded-md border border-neutral-200 px-3 py-1 text-sm hover:bg-[#E6F3FB]">
              Previous
            </button>
            <button className="rounded-md border border-neutral-200 px-3 py-1 text-sm hover:bg-[#E6F3FB]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
