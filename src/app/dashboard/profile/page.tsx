import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <UserProfile routing="hash" />
    </div>
  );
}
