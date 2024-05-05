import { getUserById } from "@/lib/UserActions/getUser";
import { redirect } from "next/navigation";
import revalidateUserdata from "../../../lib/revalidateCookiesUserState";
import { cookies } from "next/headers";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const user = cookieStore.get("userData");
  if (user) {
    const userData = JSON.parse(user.value) as userSlice;
    if (userData.isLogged) {
      return <>{children}</>;
    } else {
      redirect("/forbidden");
    }
  } else {
    redirect("/forbidden");
  }
}
