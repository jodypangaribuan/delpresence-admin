"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lecturer } from "@/types/lecturer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { RefreshCw, Search, Eye, Pencil } from "lucide-react";
import { getLecturers, syncLecturers } from "@/services/lecturer";
import React from "react";

export default function LecturersPage() {
  const router = useRouter();
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      setLoading(true);
      console.log("Fetching lecturers...");
      const data = await getLecturers();
      console.log("Lecturers data received:", data);
      setLecturers(data);
    } catch (error) {
      console.error("Failed to fetch lecturers:", error);
      alert("Failed to fetch lecturers from the server");
    } finally {
      setLoading(false);
    }
  };

  const handleSyncLecturers = async () => {
    try {
      setSyncing(true);
      console.log("Syncing lecturers with campus API...");
      const syncedLecturers = await syncLecturers();
      console.log("Sync completed. Received lecturers:", syncedLecturers);
      setLecturers(syncedLecturers);
      fetchLecturers(); // Fetch updated data after sync
      alert(`Successfully synced ${syncedLecturers.length} lecturers`);
    } catch (error) {
      console.error("Failed to sync lecturers:", error);
      alert("Failed to sync lecturers with campus API");
    } finally {
      setSyncing(false);
    }
  };

  const handleViewLecturer = (id: number) => {
    router.push(`/dashboard/academic/lecturers/${id}`);
  };

  const handleEditLecturer = (id: number) => {
    router.push(`/dashboard/academic/lecturers/${id}/edit`);
  };

  const filteredLecturers = lecturers.filter(
    (lecturer) =>
      lecturer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.identityNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lecturer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Lecturers</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => handleSyncLecturers()}
              disabled={syncing}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`}
              />
              {syncing ? "Syncing..." : "Sync with Campus API"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search lecturers..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Identity Number</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Academic Rank</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLecturers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        {searchTerm
                          ? "No lecturers match your search criteria"
                          : "No lecturers found. Sync with campus API to retrieve lecturer data."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLecturers.map((lecturer) => (
                      <TableRow key={lecturer.id}>
                        <TableCell>{lecturer.id}</TableCell>
                        <TableCell className="font-medium">
                          {lecturer.fullName}
                        </TableCell>
                        <TableCell>{lecturer.identityNumber}</TableCell>
                        <TableCell>{lecturer.department}</TableCell>
                        <TableCell>{lecturer.email}</TableCell>
                        <TableCell>
                          {lecturer.academicRankDesc ||
                            lecturer.academicRank ||
                            "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewLecturer(lecturer.id)}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditLecturer(lecturer.id)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
