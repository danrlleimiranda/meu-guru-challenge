import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import closeEye from "../../public/closed-eye.svg";
import openEye from "../../public/open-eye.svg";
type EyePasswordProps = {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>
}

export default function EyePassword({ isVisible, setIsVisible }: EyePasswordProps) {
  return (
    <label htmlFor="password-checkbox" className="absolute top-1 right-3 cursor-pointer">
    <Image
      src={isVisible ? closeEye : openEye}
      alt="visibilidade da senha"
    />
    <input
      id="password-checkbox"
      type="checkbox"
      className="hidden"
      onChange={() => setIsVisible(!isVisible)}
    />
  </label>
  )
}
