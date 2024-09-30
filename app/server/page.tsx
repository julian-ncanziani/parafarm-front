import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Loading from "../loading";


export default async function Server() {

    const session = await getServerSession(authOptions);

    return (
      <>
      {'server session: ' + session?.user.name + ' ' + session?.user.rol}
      <Loading></Loading>
      </>
    );
}