"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import guruLogo from "../../public/meu-guru.svg";
import { Button } from "./ui/button";
export default function Header() {
  const { push } = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("GURU_TOKEN");
    push("/")
  }

  return (
    <div className="w-full flex justify-between bg-white p-6">
      <Image src={guruLogo} alt="guru logo" />
      <Button className="bg-purple-700 hover:bg-purple-900 w-20" onClick={handleLogout}>Sair</Button>
    </div>
  );
}
