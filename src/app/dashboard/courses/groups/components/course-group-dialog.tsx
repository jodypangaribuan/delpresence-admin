"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CourseGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    code: string;
    department: string;
    semester: number;
    credits: number;
  }) => void;
  initialData?: {
    name: string;
    code: string;
    department: string;
    semester: number;
    credits: number;
  };
}

export function CourseGroupDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: CourseGroupDialogProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    code: initialData?.code || "",
    department: initialData?.department || "",
    semester: initialData?.semester || 1,
    credits: initialData?.credits || 2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData
              ? "Edit Kelompok Matakuliah"
              : "Tambah Kelompok Matakuliah"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Kode Kelompok</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              placeholder="Contoh: IF123"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nama Kelompok</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Contoh: Pemrograman Web"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Program Studi</Label>
            <Select
              value={formData.department}
              onValueChange={(value) =>
                setFormData({ ...formData, department: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Program Studi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IF">Teknik Informatika</SelectItem>
                <SelectItem value="SI">Sistem Informasi</SelectItem>
                <SelectItem value="TI">Teknologi Informasi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select
              value={formData.semester.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, semester: parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Semester" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <SelectItem key={sem} value={sem.toString()}>
                    Semester {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="credits">SKS</Label>
            <Select
              value={formData.credits.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, credits: parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih SKS" />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 6].map((credit) => (
                  <SelectItem key={credit} value={credit.toString()}>
                    {credit} SKS
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit">
              {initialData ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
