import { format } from "date-fns";
import { Package, AlertCircle, TrendingUp, Users } from "lucide-react";
import { useUser, useIsSuperAdmin } from "../../../store/auth.store";
import MetricCard from "../../../components/admin/common/MetricCard";
import EmptyState from "../../../components/admin/common/EmptyState";
import Card from "../../../components/admin/ui/Card";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardHome() {
  const user = useUser();
  const isSuperAdmin = useIsSuperAdmin();
  const today = format(new Date(), "dd MMMM yyyy");
  const greeting = getGreeting();
  const firstName = user?.name?.split(" ")[0] || "Admin";

  return (
    <div className="space-y-6 font-dmsans">
      {/* Hero greeting - persis pattern "Good Morning Jane" Teru */}
      <Card>
        <div>
          <p className="text-center text-sm text-neutral-500">{today}</p>
          <h1 className="mt-2 text-center text-4xl font-medium text-[#296FDA]">
            {greeting}, {firstName} !
          </h1>
          <p className="mt-2 text-center text-sm text-neutral-500">
            {isSuperAdmin
              ? "You can see all outlets and operations"
              : "Manage your outlet here"}
          </p>
        </div>
      </Card>

      {/* Metrics grid - kayak "Ongoing Laundry 2" + "Pending Payments 2" */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Today's Orders" value="0" icon={Package} />
        <MetricCard label="Pending Bypass" value="0" icon={AlertCircle} />
        <MetricCard label="Today's Revenue" value="Rp 0" icon={TrendingUp} />
        <MetricCard
          label={isSuperAdmin ? "Total Outlets" : "Total Employees"}
          value="0"
          icon={Users}
        />
      </div>

      {/* Recent orders - placeholder */}
      <Card>
        <h3 className="text-lg font-medium text-[#296FDA] mb-4">Recent Orders</h3>
        <EmptyState
          title="Belum ada order"
          description="Order yang masuk akan tampil di sini"
        />
      </Card>
    </div>
  );
}
