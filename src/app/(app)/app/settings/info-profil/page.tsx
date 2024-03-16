import { UserInfo } from "@/features/auth";
import { currentUser } from "@/shared/lib/auth/actions/get/auth";

export default async function InfoProfil() {
  const user = await currentUser();

  return (
    <div className='h-full flex justify-center items-center '>
      <UserInfo label="💻 Info profil" user={user} />
    </div>
  )
}
