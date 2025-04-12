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
import { RoomDialog, RoomData } from "./components/room-dialog";

interface Room extends RoomData {
  id: string;
  createdAt: string;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await apiFunctions.rooms.getRooms();
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async (data: Omit<RoomData, "id">) => {
    try {
      await apiFunctions.rooms.createRoom(data);
      fetchRooms();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleEditRoom = async (data: Omit<RoomData, "id">) => {
    if (!selectedRoom) return;
    try {
      await apiFunctions.rooms.updateRoom(selectedRoom.id, data);
      fetchRooms();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const handleDeleteRoom = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus ruangan ini?")) return;
    try {
      await apiFunctions.rooms.deleteRoom(id);
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const getRoomTypeName = (type: string) => {
    const types: Record<string, string> = {
      CLASSROOM: "Kelas",
      LABORATORY: "Laboratorium",
      HALL: "Aula",
      MEETING_ROOM: "Ruang Rapat",
      OTHER: "Lainnya",
    };
    return types[type] || type;
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.building.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manajemen Ruangan</h1>
        <Button
          onClick={() => {
            setSelectedRoom(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Ruangan
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari ruangan..."
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
              <TableHead>Nama Ruangan</TableHead>
              <TableHead>Gedung</TableHead>
              <TableHead>Lantai</TableHead>
              <TableHead>Kapasitas</TableHead>
              <TableHead>Tipe</TableHead>
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
            ) : filteredRooms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.code}</TableCell>
                  <TableCell>{room.name}</TableCell>
                  <TableCell>{room.building}</TableCell>
                  <TableCell>{room.floor}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell>{getRoomTypeName(room.type)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedRoom(room);
                        setDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteRoom(room.id)}
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

      <RoomDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={selectedRoom ? handleEditRoom : handleAddRoom}
        initialData={selectedRoom || undefined}
      />
    </div>
  );
}
