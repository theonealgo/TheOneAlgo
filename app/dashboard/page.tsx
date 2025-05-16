// app/dashboard/page.tsx
import DashboardClient from "./DashboardClient";

// no "useSession" or hooks in here — it stays a pure server component
export default function Page() {
  return <DashboardClient />;
}
