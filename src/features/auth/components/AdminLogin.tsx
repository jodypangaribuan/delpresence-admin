"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Copy, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Import utility to save tokens directly
import { saveTokens, saveUserInfo } from "@/lib/auth";

interface AdminUser {
  user_id: number;
  username: string;
  email: string;
  role: string;
  status: number;
  access_level: string;
  position: string;
  department: string;
  jabatan: Array<{ struktur_jabatan_id: number; jabatan: string }>;
}

interface AdminLoginResponse {
  result: boolean;
  error: string;
  success: string;
  user: AdminUser;
  token: string;
  refresh_token: string;
}

// API URL untuk backend
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export default function AdminLogin() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdminLogin = async () => {
    try {
      setIsLoading(true);
      setError("");

      if (!username || !password) {
        throw new Error("Username dan password wajib diisi");
      }

      // Kirim request login ke API
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data: AdminLoginResponse = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(
          data.error || "Login gagal, periksa username dan password Anda"
        );
      }

      // Simpan token dan informasi user
      saveTokens({
        token: data.token,
        refresh_token: data.refresh_token,
      });

      saveUserInfo(data.user);

      // Redirect ke dashboard
      router.push("/dashboard");
      setOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fill default admin credentials for easy testing
  const useDefaultCredentials = () => {
    setUsername("admin");
    setPassword("delpresence");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
        >
          Login sebagai Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Login Administrator</DialogTitle>
        </DialogHeader>

        <Card className="p-4 bg-blue-50 border-blue-200 mb-4">
          <p className="text-sm text-blue-800">
            <strong>Login Administrator</strong>
          </p>
          <p className="mt-1 text-sm text-blue-700">
            Halaman ini khusus untuk administrator sistem. Gunakan kredensial
            admin Anda untuk masuk ke sistem.
          </p>
          <div className="mt-2 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300"
              onClick={useDefaultCredentials}
            >
              <Copy className="h-3 w-3 mr-1" />
              Gunakan Admin Default
            </Button>
          </div>
        </Card>

        {error && (
          <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded mb-4">
            <p className="font-medium">Error</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username admin"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            disabled={isLoading}
            onClick={handleAdminLogin}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
