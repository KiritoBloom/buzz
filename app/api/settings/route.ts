import getCurrentUser from "@/app/actions/getCurrectUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"

export async function POST(
    request: Request
) {
   try{
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
        name,
        image
    } =  body;

    if (!currentUser?.id) {
        return new NextResponse("Unauthorized", {status: 401})
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            image: image,
            name: name
        }
    })

    return NextResponse.json("Updated User")

   }
   catch(error:any) {
    console.log(error, "ERROR_SETTINGS_MESSAGE")
    return new NextResponse("Internal Error", {status: 500})
   }
}