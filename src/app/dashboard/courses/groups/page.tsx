"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { apiFunctions } from "@/lib/api";
import { CourseGroupDialog } from "./components/course-group-dialog";

interface CourseGroup {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
  createdAt: string;
}

export default function CourseGroupsPage() {
  const [courseGroups, setCourseGroups] = useState<CourseGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<CourseGroup | null>(null);

  useEffect(() => {
    fetchCourseGroups();
  }, []);

  const fetchCourseGroups = async () => {
    try {
      setLoading(true);
      const response = await apiFunctions.courses.getCourseGroups();
      setCourseGroups(response.data);
    } catch (error) {
      console.error("Error fetching course groups:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGroup = async (data: {
    name: string;
    code: string;
    department: string;
    semester: number;
    credits: number;
  }) => {
    try {
      await apiFunctions.courses.createCourseGroup(data);
      fetchCourseGroups();
    } catch (error) {
      console.error("Error creating course group:", error);
    }
  };

  const handleEditGroup = async (data: {
    name: string;
    code: string;
    department: string;
    semester: number;
    credits: number;
  }) => {
    if (!selectedGroup) return;
    try {
      await apiFunctions.courses.updateCourseGroup(selectedGroup.id, data);
      fetchCourseGroups();
    } catch (error) {
      console.error("Error updating course group:", error);
    }
  };

  const handleDeleteGroup = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kelompok matakuliah ini?"))
      return;
    try {
      await apiFunctions.courses.deleteCourseGroup(id);
      fetchCourseGroups();
    } catch (error) {
      console.error("Error deleting course group:", error);
    }
  };

  const filteredGroups = courseGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kelompok Matakuliah</h1>
        <Button
          onClick={() => {
            setSelectedGroup(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Kelompok
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari kelompok matakuliah..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Nama Kelompok</TableHead>
              <TableHead>Program Studi</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>SKS</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : filteredGroups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              filteredGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>{group.code}</TableCell>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.department}</TableCell>
                  <TableCell>{group.semester}</TableCell>
                  <TableCell>{group.credits}</TableCell>
                  <TableCell>
                    {new Date(group.createdAt).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedGroup(group);
                        setDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CourseGroupDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={selectedGroup ? handleEditGroup : handleAddGroup}
        initialData={selectedGroup || undefined}
      />
    </div>
  );
}
