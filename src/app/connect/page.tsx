import { redirect } from "next/navigation";

export const metadata = {
  title: "Connect | 22nd Avenue",
  description: "Get in touch with 22nd Avenue for artist management, careers, or business enquiries.",
};

export default function ConnectPage() {
  redirect("/");
}
