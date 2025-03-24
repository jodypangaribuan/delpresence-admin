import { redirect } from "next/navigation";

export default function LogoutPage() {
  // In a real app, you would handle clearing cookies/tokens here
  redirect("/login");
}
