"use client";

import {
  Bell,
  Menu,
  Search,
  Calendar as CalendarIcon,
  HelpCircle,
  User as UserIcon,
  ChevronDown,
  LogOut,
  Settings,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useEffect, useState, useRef, memo } from "react";
import { useRouter } from "next/navigation";
import { logout, getUser, CampusUser } from "@/services/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { AccountSettingsModal } from "@/components/modals/AccountSettingsModal";

interface HeaderProps {
  onMenuClick: () => void;
}

// Holiday interface for Nager.Date API
interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

// Memisahkan komponen CalendarDisplay menjadi komponen terpisah untuk mencegah render ulang
const CalendarDisplay = memo(function CalendarDisplay() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isHolidaysLoading, setIsHolidaysLoading] = useState(false);
  const [holidaysLoaded, setHolidaysLoaded] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch holidays from Nager.Date API - only once after component mounts
  useEffect(() => {
    if (!isMounted || holidaysLoaded) return;

    const fetchHolidays = async () => {
      setIsHolidaysLoading(true);
      try {
        const currentYear = new Date().getFullYear();
        const response = await fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/ID`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch holidays");
        }

        const data = await response.json();
        setHolidays(data);
        setHolidaysLoaded(true);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      } finally {
        setIsHolidaysLoading(false);
      }
    };

    fetchHolidays();
  }, [isMounted, holidaysLoaded]);

  // Check if date is a holiday
  const isHoliday = (date: Date) => {
    if (holidays.length === 0) return false;

    const formattedDateToCheck = format(date, "yyyy-MM-dd");
    return holidays.some((holiday) => holiday.date === formattedDateToCheck);
  };

  // Check if date is Sunday
  const isSunday = (date: Date) => {
    return date.getDay() === 0; // 0 represents Sunday
  };

  // Get holiday name if applicable
  const getHolidayName = (date: Date) => {
    if (holidays.length === 0) return null;

    const formattedDateToCheck = format(date, "yyyy-MM-dd");
    const holiday = holidays.find((h) => h.date === formattedDateToCheck);
    return holiday ? holiday.localName : null;
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <button
          className="rounded-full p-2 hover:bg-[#E6F3FB] hidden md:flex items-center"
          title="Lihat Kalender"
        >
          <CalendarIcon className="h-5 w-5 text-[#0687C9]" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        {isHolidaysLoading ? (
          <div className="flex items-center justify-center p-4 space-x-2">
            <Loader2 className="h-4 w-4 animate-spin text-[#0687C9]" />
            <span className="text-sm text-neutral-500">
              Memuat data hari libur...
            </span>
          </div>
        ) : (
          <Calendar
            mode="single"
            initialFocus
            locale={id}
            className="border rounded-md"
            modifiers={{
              holiday: (date) => !!isHoliday(date),
              sunday: (date) => isSunday(date),
              today: (date) => isToday(date),
            }}
            modifiersStyles={{
              holiday: { color: "#ef4444", fontWeight: "bold" },
              sunday: { color: "#ef4444" },
              today: {
                backgroundColor: "#0687C9",
                color: "white",
                fontWeight: "bold",
                borderRadius: "4px",
              },
            }}
            components={{
              DayContent: (props) => {
                const holidayName = getHolidayName(props.date);
                return (
                  <div className="relative group">
                    <time dateTime={format(props.date, "yyyy-MM-dd")}>
                      {props.date.getDate()}
                    </time>
                    {holidayName && (
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 bg-red-100 px-1 py-0.5 rounded text-[8px] whitespace-nowrap border border-red-200 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        {holidayName}
                      </div>
                    )}
                  </div>
                );
              },
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  );
});

// Memisahkan komponen ProfileMenu menjadi komponen terpisah untuk mencegah render ulang
const ProfileMenu = memo(function ProfileMenu() {
  const [user, setUser] = useState<CampusUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Set mounted state to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get user information from cookie - only once after component mounts
  useEffect(() => {
    if (!isMounted || userLoaded) return;

    setIsUserLoading(true);
    const userData = getUser();
    if (userData) {
      setUser(userData);
    }

    const timer = setTimeout(() => {
      setIsUserLoading(false);
      setUserLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [isMounted, userLoaded]);

  // Close the profile menu when clicking outside
  useEffect(() => {
    if (!isMounted) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMounted]);

  // Get full name from user
  const getFullName = () => {
    if (!user) return "User";
    return user.username || "User";
  };

  // Get email from user
  const getEmail = () => {
    if (!user) return "user@example.com";
    return user.email || "user@example.com";
  };

  const handleLogoutClick = () => {
    setIsProfileMenuOpen(false);
    setShowLogoutDialog(true);
  };

  const handleLogout = () => {
    // Clear auth cookies/tokens
    logout();
    router.push("/login");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="relative" ref={profileMenuRef}>
        <button
          className="flex items-center gap-2 ml-2 pl-2 border-l border-neutral-200 hover:bg-[#E6F3FB] rounded-lg p-1.5 transition-all"
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        >
          <div className="hidden md:block text-right min-w-[120px]">
            {isUserLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-[#0687C9]" />
                <span className="text-sm text-neutral-500">Memuat...</span>
              </div>
            ) : (
              <>
                <div className="text-sm font-medium">{getFullName()}</div>
                <div className="text-xs text-neutral-500">{getEmail()}</div>
              </>
            )}
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E6F3FB] text-[#0687C9]">
            <UserIcon className="h-5 w-5" />
          </div>
          <ChevronDown className="h-4 w-4 text-neutral-400 hidden md:block" />
        </button>

        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-52 rounded-md bg-white shadow-lg border border-neutral-100 z-50">
            <div className="py-1">
              <div className="px-4 py-2 border-b border-neutral-100">
                {isUserLoading ? (
                  <div className="flex items-center space-x-2 py-1">
                    <Loader2 className="h-4 w-4 animate-spin text-[#0687C9]" />
                    <span className="text-sm text-neutral-500">
                      Memuat data...
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium">{getFullName()}</p>
                    <p className="text-xs text-neutral-500">{getEmail()}</p>
                  </>
                )}
              </div>
              <button
                className="px-4 py-2 text-sm text-neutral-700 hover:bg-[#E6F3FB] w-full text-left flex items-center"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  setShowSettingsModal(true);
                }}
              >
                <Settings className="mr-2 h-4 w-4 text-neutral-500" />
                Pengaturan akun
              </button>
              <button
                className="px-4 py-2 text-sm text-neutral-700 hover:bg-[#E6F3FB] w-full text-left flex items-center"
                onClick={handleLogoutClick}
              >
                <LogOut className="mr-2 h-4 w-4 text-neutral-500" />
                Keluar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <AccountSettingsModal
        open={showSettingsModal}
        onOpenChange={setShowSettingsModal}
      />

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#002A5C]">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Konfirmasi Keluar Sistem
            </DialogTitle>
            <DialogDescription>
              Anda akan keluar dari Sistem Manajemen Presensi Institut Teknologi
              Del. Apakah Anda yakin?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700"
            >
              Ya, Keluar Sistem
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

export function Header({ onMenuClick }: HeaderProps) {
  // Time related states
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update time every second, but only on the client
  useEffect(() => {
    if (!isMounted) return;

    // Initial set on client-side only
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now);

      // Format date in Indonesian
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setFormattedDate(now.toLocaleDateString("id-ID", options));

      // Format time
      setFormattedTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateDateTime();

    const timer = setInterval(updateDateTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isMounted]);

  // Avoid rendering time before the component is mounted to prevent hydration errors
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-white px-4 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 hover:bg-[#E6F3FB] md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:block">
            <Link href="/dashboard" className="group cursor-pointer">
              <h2 className="text-lg font-medium text-[#002A5C] group-hover:text-primary transition-colors">
                Selamat datang di DelPresence Management System
              </h2>
              <p className="text-sm text-neutral-500">
                {currentTime ? (
                  <>
                    {formattedDate} {formattedTime}
                  </>
                ) : (
                  "Loading..."
                )}
              </p>
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <div className="hidden lg:flex items-center relative mx-4 w-80">
            <Search className="absolute left-3 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Cari mata kuliah, mahasiswa, dosen..."
              className="w-full rounded-md border border-neutral-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#0687C9] focus:ring-1 focus:ring-[#0687C9] transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <CalendarDisplay />

            <button
              className="rounded-full p-2 hover:bg-[#E6F3FB] hidden md:flex"
              title="Bantuan"
            >
              <HelpCircle className="h-5 w-5 text-[#0687C9]" />
            </button>

            <button
              className="relative rounded-full p-2 hover:bg-[#E6F3FB]"
              title="Notifikasi"
            >
              <Bell className="h-5 w-5 text-[#0687C9]" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <ProfileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
