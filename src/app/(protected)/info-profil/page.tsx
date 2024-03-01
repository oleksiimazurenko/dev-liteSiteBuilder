import { UserInfo } from "@/features/auth/ui/user-info";
import { currentUser } from "@/shared/lib/auth/actions/get/auth";

export default async function InfoProfil() {
  const user = await currentUser();

  return <UserInfo label="💻 Info profil" user={user} />;
}
