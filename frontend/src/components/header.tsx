import Image from "next/image";
import guruLogo from "../../public/meu-guru.svg";
export default function Header() {
  return (
    <div className="w-full flex justify-around bg-white p-6">
      <Image src={guruLogo} alt="guru logo" />
    </div>
  );
}
