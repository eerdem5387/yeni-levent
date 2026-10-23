import {
  CalendarDays,
  Images,
  LayoutDashboard,
  Mail,
  MapPinned,
  Settings,
  Trophy,
  Users,
} from "lucide-react";
import type { AdminNavIcon as IconName } from "@/lib/admin-nav";

const icons = {
  layout: LayoutDashboard,
  calendar: CalendarDays,
  users: Users,
  images: Images,
  mail: Mail,
  trophy: Trophy,
  map: MapPinned,
  settings: Settings,
} as const;

export function AdminNavIcon({
  name,
  className = "h-4 w-4",
}: {
  name: IconName;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden />;
}
