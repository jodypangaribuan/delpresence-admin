"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface RoomData {
  id?: string;
  code: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  type: string;
}

interface RoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<RoomData, "id">) => void;
  initialData?: RoomData;
}

export function RoomDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: RoomDialogProps) {
  const [formData, setFormData] = useState<Omit<RoomData, "id">>({
    code: initialData?.code || "",
    name: initialData?.name || "",
    building: initialData?.building || "",
    floor: initialData?.floor || 1,
    capacity: initialData?.capacity || 30,
    type: initialData?.type || "CLASSROOM",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "floor" || name === "capacity" ? parseInt(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "floor" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Ruangan" : "Tambah Ruangan Baru"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Kode Ruangan</Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="Mis. R101"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nama Ruangan</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Mis. Ruang Kuliah 101"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="building">Gedung</Label>
                <Input
                  id="building"
                  name="building"
                  placeholder="Mis. Gedung Timur"
                  value={formData.building}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor">Lantai</Label>
                <Select
                  name="floor"
                  value={formData.floor.toString()}
                  onValueChange={(value) => handleSelectChange("floor", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Lantai" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((floor) => (
                      <SelectItem key={floor} value={floor.toString()}>
                        Lantai {floor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Kapasitas</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  placeholder="Kapasitas ruangan"
                  value={formData.capacity}
                  onChange={handleChange}
                  min={1}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipe Ruangan</Label>
                <Select
                  name="type"
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLASSROOM">Kelas</SelectItem>
                    <SelectItem value="LABORATORY">Laboratorium</SelectItem>
                    <SelectItem value="HALL">Aula</SelectItem>
                    <SelectItem value="MEETING_ROOM">Ruang Rapat</SelectItem>
                    <SelectItem value="OTHER">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit">{initialData ? "Simpan" : "Tambah"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
