import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function Server() {

    const session = await getServerSession(authOptions);

    return (
      <>
      {'server session: ' + session?.user.name + ' ' + session?.user.rol}
      </>
    );
}