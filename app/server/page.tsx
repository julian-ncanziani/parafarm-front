import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";



export default async function Server() {

    const session = await getServerSession(authOptions);

    return (
      <>
      {'server session: ' + session?.user.name + ' ' + session?.user.rol}
      </>
    );
}