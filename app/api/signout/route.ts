import { cookies } from "next/headers";

export const GET = () => {
  try {
    const response: any = {
      message: "User logged out successfully",
    };
    cookies().delete("userToken");
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
