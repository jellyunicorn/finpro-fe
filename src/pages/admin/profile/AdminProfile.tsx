import { useUser } from "../../../store/auth.store";
import PageHeader from "../../../components/admin/common/PageHeader";
import Card from "../../../components/admin/ui/Card";
import Button from "../../../components/admin/ui/Button";
import StatusBadge from "../../../components/admin/ui/StatusBadge";

interface ProfileRowProps {
  label: string;
  value?: string | null;
  badge?: React.ReactNode;
}

function ProfileRow({ label, value, badge }: ProfileRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
      <div className="grid flex-1 grid-cols-2 gap-4">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        <span className="text-sm text-neutral-600">{value || "-"}</span>
      </div>
      {badge}
    </div>
  );
}

export default function AdminProfile() {
  const user = useUser();

  return (
    <div className="font-dmsans">
      <PageHeader title="My Profile" description="Detail profil admin Anda" />

      {/* Header dengan avatar - adapted dari User Profile Teru */}
      <div className="mb-6 flex items-center gap-4">
        <div className="size-20 rounded-full bg-[#BAD6F5]" />
        <div className="flex-1">
          <h2 className="text-2xl font-medium text-[#296FDA]">
            {user?.name || "Loading..."}
          </h2>
          <p className="text-sm italic text-neutral-500">
            {user?.role?.replace("_", " ")}
          </p>
        </div>
        <div className="rounded-full border border-[#BAD6F5] px-4 py-1 text-xs font-bold text-[#296FDA]">
          ID: {user?.id?.slice(0, 6).toUpperCase() || "------"}
        </div>
      </div>

      <Card>
        <h3 className="text-lg font-medium text-[#296FDA] mb-4">
          Personal Information
        </h3>

        <div className="space-y-4">
          <ProfileRow
            label="Email"
            value={user?.email}
            badge={
              !user?.isVerified && (
                <StatusBadge variant="coral">Email Unverified</StatusBadge>
              )
            }
          />
          <ProfileRow label="Role" value={user?.role} />
          <ProfileRow label="Outlet ID" value={user?.outletId || "-"} />
        </div>

        <div className="mt-6 flex justify-end">
          <Button>Edit Profile</Button>
        </div>
      </Card>
    </div>
  );
}
