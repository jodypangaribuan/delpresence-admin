"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Building,
  Save,
  AlertCircle,
  CheckCircle,
  Upload,
  Shield,
  GraduationCap,
  Briefcase,
  Phone,
  Settings,
  RefreshCw,
  Download,
  Award,
  School,
  FileText,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUser } from "@/services/auth";
import { Badge } from "@/components/ui/badge";
import {
  getLecturerProfile,
  syncLecturerProfile,
  updateLecturerProfile,
  LecturerDetails,
} from "@/services/lecturer";
import {
  getAssistantProfile,
  syncAssistantProfile,
  updateAssistantProfile,
  AssistantDetails,
} from "@/services/assistant";
import { isLecturer, isAssistant } from "@/services/auth";

interface AccountSettingsModalProps {
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AccountSettingsModal({
  trigger,
  defaultOpen = false,
  open,
  onOpenChange,
}: AccountSettingsModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lecturerProfile, setLecturerProfile] =
    useState<LecturerDetails | null>(null);
  const [assistantProfile, setAssistantProfile] =
    useState<AssistantDetails | null>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  // Control open state either from external prop or internal state
  const dialogOpen = open !== undefined ? open : internalOpen;

  // Load data on initial render if the modal is open
  useEffect(() => {
    if (dialogOpen) {
      loadUserData();
    }
  }, [dialogOpen]);

  // Form states
  const [profileForm, setProfileForm] = useState({
    username: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    expertise: "",
    education: "",
    avatar: "",
    biography: "",
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (open === undefined) {
      setInternalOpen(newOpen);
    }

    if (onOpenChange) {
      onOpenChange(newOpen);
    }

    // Reset messages when modal is closed
    if (!newOpen) {
      setSuccessMessage("");
      setErrorMessage("");
    } else {
      // Load data when modal is opened
      loadUserData();
    }
  };

  // Load user data
  const loadUserData = async () => {
    setIsLoading(true);

    try {
      // Get basic user data from cookies
      const userData = getUser();

      if (userData) {
        setProfileForm({
          username: userData.username || "",
          email: userData.email || "",
          phone: "", // Will be updated from profile
          department: userData.department || "",
          position: userData.position || "",
          expertise: userData.expertise || "",
          education: userData.education || "",
          avatar: userData.avatar || "",
          biography: "", // Will be updated from profile
        });
      }

      // Try to get lecturer profile if user is a lecturer
      if (isLecturer()) {
        try {
          const profile = await getLecturerProfile();
          setLecturerProfile(profile);

          // Update form with lecturer data
          setProfileForm((prev) => ({
            ...prev,
            username: profile.readonly_fields.full_name || prev.username,
            email: profile.readonly_fields.email || prev.email,
            department: profile.readonly_fields.department || prev.department,
            position:
              profile.readonly_fields.academic_rank_desc || prev.position,
            phone: profile.editable_fields.phone_number || prev.phone,
            education:
              profile.readonly_fields.education_level || prev.education,
            expertise: profile.editable_fields.publications || prev.expertise,
            avatar: profile.editable_fields.avatar || prev.avatar,
            biography: profile.editable_fields.biography || prev.biography,
          }));
        } catch (error) {
          console.error("Failed to load lecturer profile:", error);
        }
      }

      // Try to get assistant profile if user is an assistant
      if (isAssistant()) {
        try {
          const profile = await getAssistantProfile();
          setAssistantProfile(profile);

          // Update form with assistant data
          setProfileForm((prev) => ({
            ...prev,
            username: profile.readonly_fields.full_name || prev.username,
            email: profile.readonly_fields.email || prev.email,
            department: profile.readonly_fields.department || prev.department,
            position: profile.readonly_fields.job_title || prev.position,
            phone: profile.editable_fields.phone_number || prev.phone,
            biography: profile.editable_fields.biography || prev.biography,
            avatar: profile.editable_fields.avatar || prev.avatar,
          }));
        } catch (error) {
          console.error("Failed to load assistant profile:", error);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Update lecturer profile if user is a lecturer
      if (isLecturer() && lecturerProfile) {
        await updateLecturerProfile({
          publications: profileForm.expertise,
          avatar: profileForm.avatar,
          biography: profileForm.biography,
          phone_number: profileForm.phone,
          address: "",
        });
      }

      // Update assistant profile if user is an assistant
      if (isAssistant() && assistantProfile) {
        await updateAssistantProfile({
          avatar: profileForm.avatar,
          biography: profileForm.biography,
          phone_number: profileForm.phone,
          address: "",
        });
      }

      setSuccessMessage("Profil berhasil diperbarui");
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Gagal memperbarui profil. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  // Sync data from campus API
  const handleSyncCampus = async () => {
    setIsSyncing(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (isLecturer()) {
        // Sync lecturer profile
        const updatedProfile = await syncLecturerProfile();
        setLecturerProfile(updatedProfile);

        // Update form with new data
        setProfileForm((prev) => ({
          ...prev,
          username: updatedProfile.readonly_fields.full_name || prev.username,
          email: updatedProfile.readonly_fields.email || prev.email,
          department:
            updatedProfile.readonly_fields.department || prev.department,
          position:
            updatedProfile.readonly_fields.academic_rank_desc || prev.position,
          expertise:
            updatedProfile.editable_fields.publications || prev.expertise,
          education:
            updatedProfile.readonly_fields.education_level || prev.education,
          phone: updatedProfile.editable_fields.phone_number || prev.phone,
          avatar: updatedProfile.editable_fields.avatar || prev.avatar,
          biography: updatedProfile.editable_fields.biography || prev.biography,
        }));
      } else if (isAssistant()) {
        // Sync assistant profile
        const updatedProfile = await syncAssistantProfile();
        setAssistantProfile(updatedProfile);

        // Update form with new data
        setProfileForm((prev) => ({
          ...prev,
          username: updatedProfile.readonly_fields.full_name || prev.username,
          email: updatedProfile.readonly_fields.email || prev.email,
          department:
            updatedProfile.readonly_fields.department || prev.department,
          position: updatedProfile.readonly_fields.job_title || prev.position,
          phone: updatedProfile.editable_fields.phone_number || prev.phone,
          avatar: updatedProfile.editable_fields.avatar || prev.avatar,
          biography: updatedProfile.editable_fields.biography || prev.biography,
        }));
      }

      setSuccessMessage("Data berhasil disinkronkan dengan sistem kampus");
    } catch (error) {
      console.error("Error syncing with campus:", error);
      setErrorMessage(
        "Gagal menyinkronkan data dengan sistem kampus. Silakan coba lagi."
      );
    } finally {
      setIsSyncing(false);
    }
  };

  // Handle avatar upload
  const handleAvatarChange = () => {
    // Implementation would be added when file upload is implemented
    alert("Fitur upload avatar akan segera tersedia");
  };

  // Format last sync time
  const formatLastSync = (dateString: string | undefined) => {
    if (!dateString) return "Belum pernah disinkronkan";

    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[90vw] md:max-w-[1200px] w-full h-[85vh] p-0 rounded-xl border shadow-lg bg-white overflow-hidden">
        <button
          onClick={() => handleOpenChange(false)}
          className="absolute right-4 top-4 z-20 rounded-full p-1.5 bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Tutup"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="sticky top-0 left-0 right-0 bg-white z-10 border-b shadow-sm">
          <DialogHeader className="p-4 md:p-5">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <DialogTitle className="text-xl font-bold">
                Pengaturan Akun
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-500">
              Perbarui informasi pribadi dan profesional Anda
            </DialogDescription>
          </DialogHeader>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-3"></div>
            <span className="text-gray-500 font-medium">Memuat data...</span>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row h-[calc(85vh-84px)] overflow-hidden">
            {/* Sidebar */}
            <div className="w-full lg:w-[380px] bg-gray-50 overflow-y-auto border-r border-gray-100 flex-shrink-0">
              <div className="p-5 md:p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-5 group">
                    <div className="relative rounded-full overflow-hidden w-28 h-28 border-4 border-white shadow-lg">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={profileForm.avatar || ""} />
                        <AvatarFallback className="bg-primary text-white text-3xl">
                          {profileForm.username?.charAt(0)?.toUpperCase() ||
                            "C"}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        onClick={handleAvatarChange}
                        className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <Upload className="h-6 w-6 text-white" />
                      </button>
                    </div>
                  </div>
                  <h2 className="font-bold text-lg text-center break-words max-w-full">
                    {isLecturer() && lecturerProfile
                      ? lecturerProfile.readonly_fields.full_name
                      : isAssistant() && assistantProfile
                      ? assistantProfile.readonly_fields.full_name
                      : profileForm.username}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 mb-2 text-center break-words max-w-full">
                    {isLecturer() && lecturerProfile
                      ? lecturerProfile.readonly_fields.email
                      : isAssistant() && assistantProfile
                      ? assistantProfile.readonly_fields.email
                      : profileForm.email}
                  </p>
                  <Badge
                    variant="outline"
                    className="px-3 py-1 bg-primary/5 text-primary border-primary/20"
                  >
                    {isLecturer() && lecturerProfile
                      ? lecturerProfile.readonly_fields.academic_rank_desc
                      : isAssistant() && assistantProfile
                      ? assistantProfile.readonly_fields.job_title
                      : profileForm.position}
                  </Badge>
                </div>

                <Separator className="my-5" />

                {/* Tampilan data lecturer */}
                {isLecturer() && lecturerProfile && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">
                          NIP
                        </p>
                        <p className="text-sm text-gray-800 break-words">
                          {lecturerProfile.readonly_fields.identity_number ||
                            "Tidak tersedia"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Hash className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">
                          NIDN
                        </p>
                        <p className="text-sm text-gray-800 break-words">
                          {lecturerProfile.readonly_fields.lecturer_number ||
                            "Tidak tersedia"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">
                          Departemen
                        </p>
                        <p className="text-sm text-gray-800 break-words">
                          {lecturerProfile.readonly_fields.department ||
                            profileForm.department ||
                            "Tidak tersedia"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">
                          Jabatan Akademik
                        </p>
                        <p className="text-sm text-gray-800 break-words">
                          {lecturerProfile.readonly_fields.academic_rank_desc ||
                            "Tidak tersedia"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <School className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">
                          Pendidikan
                        </p>
                        <p className="text-sm text-gray-800 break-words">
                          {lecturerProfile.readonly_fields.education_level ||
                            profileForm.education ||
                            "Tidak tersedia"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center gap-2 h-10"
                        onClick={handleSyncCampus}
                        disabled={isSyncing}
                      >
                        {isSyncing ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                        <span>
                          {isSyncing
                            ? "Menyinkronkan..."
                            : "Perbarui Data Kampus"}
                        </span>
                      </Button>

                      <div className="bg-primary/5 text-primary px-4 py-3 rounded-lg text-xs mt-3 flex items-start gap-2">
                        <Shield className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-0.5">
                            Status Sinkronisasi
                          </p>
                          <p>
                            {lecturerProfile
                              ? `${formatLastSync(
                                  lecturerProfile.last_sync_at
                                )}`
                              : "Data belum disinkronkan"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tampilan data asisten dosen */}
                {isAssistant() && assistantProfile && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">
                          NIP
                        </p>
                        <p className="text-sm text-gray-800 break-words">
                          {assistantProfile.readonly_fields.identity_number ||
                            "Tidak tersedia"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">
                          Username
                        </p>
                        <p className="text-sm text-gray-800 break-words">
                          {assistantProfile.readonly_fields.username ||
                            "Tidak tersedia"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">
                          Alias
                        </p>
                        <p className="text-sm text-gray-800 break-words">
                          {assistantProfile.readonly_fields.alias ||
                            "Tidak tersedia"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">
                          Institusi
                        </p>
                        <p className="text-sm text-gray-800 break-words">
                          {assistantProfile.readonly_fields.department ||
                            "Institut Teknologi Del"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">
                          Jabatan
                        </p>
                        <p className="text-sm text-gray-800 break-words">
                          {assistantProfile.readonly_fields.job_title ||
                            "Asisten Dosen"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Hash className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">
                          ID Pegawai
                        </p>
                        <p className="text-sm text-gray-800 break-words">
                          {assistantProfile.readonly_fields.employee_id ||
                            "Tidak tersedia"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">
                          Status Pegawai
                        </p>
                        <p className="text-sm text-gray-800 break-words">
                          {assistantProfile.readonly_fields
                            .employee_status_text ||
                            (assistantProfile.readonly_fields
                              .employee_status === "K"
                              ? "Keluar/Tidak aktif lagi"
                              : assistantProfile.readonly_fields
                                  .employee_status || "Tidak tersedia")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center gap-2 h-10"
                        onClick={handleSyncCampus}
                        disabled={isSyncing}
                      >
                        {isSyncing ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                        <span>
                          {isSyncing
                            ? "Menyinkronkan..."
                            : "Perbarui Data Kampus"}
                        </span>
                      </Button>

                      <div className="bg-primary/5 text-primary px-4 py-3 rounded-lg text-xs mt-3 flex items-start gap-2">
                        <Shield className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-0.5">
                            Status Sinkronisasi
                          </p>
                          <p>
                            {assistantProfile
                              ? `${formatLastSync(
                                  assistantProfile.last_sync_at
                                )}`
                              : "Data belum disinkronkan"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pesan data belum tersedia */}
                {((isLecturer() && !lecturerProfile) ||
                  (isAssistant() && !assistantProfile)) && (
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex flex-col items-center gap-3 mt-2">
                    <AlertCircle className="h-8 w-8 text-amber-500" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-amber-800">
                        Data Kampus Belum Tersedia
                      </p>
                      <p className="text-xs text-amber-700 mt-1 mb-3">
                        Klik tombol di bawah untuk mengambil data dari sistem
                        kampus
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-amber-200 bg-white/70 hover:bg-white"
                        onClick={handleSyncCampus}
                        disabled={isSyncing}
                      >
                        {isSyncing ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                        <span>
                          {isSyncing
                            ? "Mengambil Data..."
                            : "Ambil Data Kampus"}
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full h-full overflow-y-auto bg-white">
              <div className="p-5 md:p-8">
                {/* Success or error message */}
                {(successMessage || errorMessage) && (
                  <div
                    className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                      successMessage
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {successMessage ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium">
                        {successMessage || errorMessage}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {isLecturer()
                      ? "Profil Dosen"
                      : isAssistant()
                      ? "Profil Asisten Dosen"
                      : "Profil Pengguna"}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {isLecturer()
                      ? "Perbarui informasi kontak dan publikasi Anda untuk ditampilkan kepada pengguna lain."
                      : isAssistant()
                      ? "Perbarui informasi kontak dan biografi Anda sebagai asisten dosen."
                      : "Perbarui informasi profil Anda."}
                  </p>
                </div>

                {/* Profile Form */}
                <form
                  onSubmit={handleProfileSubmit}
                  className="space-y-6 max-w-4xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    <div>
                      <Label
                        htmlFor="username"
                        className="font-medium text-gray-700 block mb-1.5"
                      >
                        Nama Lengkap
                      </Label>
                      <div className="relative">
                        <Input
                          id="username"
                          name="username"
                          value={profileForm.username}
                          disabled={true}
                          className="pl-10 border-gray-200 bg-gray-50 text-base"
                        />
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5">
                        Nama otomatis diisi dari sistem kampus
                      </p>
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className="font-medium text-gray-700 block mb-1.5"
                      >
                        Email Institusi
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileForm.email}
                          disabled={true}
                          className="pl-10 border-gray-200 bg-gray-50 text-base"
                        />
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5">
                        Email otomatis diisi dari sistem kampus
                      </p>
                    </div>

                    <div>
                      <Label
                        htmlFor="phone"
                        className="font-medium text-gray-700 block mb-1.5"
                      >
                        Nomor Telepon
                      </Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          name="phone"
                          value={profileForm.phone}
                          onChange={handleProfileChange}
                          placeholder="Contoh: 081234567890"
                          className="pl-10 border-gray-200 focus:border-primary focus:ring-primary text-base"
                        />
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5">
                        Nomor telepon yang dapat dihubungi
                      </p>
                    </div>

                    {isLecturer() && (
                      <div>
                        <Label
                          htmlFor="education"
                          className="font-medium text-gray-700 block mb-1.5"
                        >
                          Detail Pendidikan
                        </Label>
                        <div className="relative">
                          <Input
                            id="education"
                            name="education"
                            value={profileForm.education}
                            disabled={true}
                            className="pl-10 border-gray-200 bg-gray-50 text-base"
                          />
                          <GraduationCap className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5">
                          Jenjang pendidikan otomatis diisi dari sistem kampus
                        </p>
                      </div>
                    )}
                  </div>

                  {isLecturer() && (
                    <div>
                      <Label
                        htmlFor="expertise"
                        className="font-medium text-gray-700 block mb-1.5"
                      >
                        Publikasi
                      </Label>
                      <div className="relative">
                        <textarea
                          id="expertise"
                          name="expertise"
                          value={profileForm.expertise}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              expertise: e.target.value,
                            })
                          }
                          placeholder="Masukkan daftar publikasi atau karya ilmiah Anda"
                          className="w-full min-h-[150px] pl-10 py-2 border border-gray-200 rounded-md focus:border-primary focus:ring-primary text-base"
                        />
                        <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5">
                        Daftar publikasi karya ilmiah atau proyek yang sudah
                        dibuat (gunakan format daftar dengan pemisah baris baru)
                      </p>
                    </div>
                  )}

                  <div>
                    <Label
                      htmlFor="biography"
                      className="font-medium text-gray-700 block mb-1.5"
                    >
                      Biografi
                    </Label>
                    <div className="relative">
                      <textarea
                        id="biography"
                        name="biography"
                        value={profileForm.biography}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            biography: e.target.value,
                          })
                        }
                        placeholder="Masukkan biografi Anda"
                        className="w-full min-h-[150px] pl-10 py-2 border border-gray-200 rounded-md focus:border-primary focus:ring-primary text-base"
                      />
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">
                      Ceritakan tentang diri Anda secara singkat
                    </p>
                  </div>
                </form>

                <DialogFooter className="pt-6 border-t mt-8 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOpenChange(false)}
                    className="h-10 px-5 text-base"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="h-10 px-5 bg-primary hover:bg-primary/90 flex gap-2 text-base"
                  >
                    {isSaving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>Simpan Perubahan</span>
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
