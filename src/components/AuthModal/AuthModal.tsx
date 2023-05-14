import { useContext } from "react";
import {
  CloseIcon,
  GithubIcon,
  GoogleIcon,
} from "../../../public/assets/icons";
import { GlobalContext } from "@/context/globalContext";

export default function AuthModal() {
  const { AuthModalOpen } = useContext(GlobalContext);
  const [, setAuthModalOpenState] = AuthModalOpen!;
  const closeModal = () => {
    setAuthModalOpenState(false);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex flex-col items-center">
      <div className="relative max-w-xs top-32 px-4 py-3 rounded-xl bg-white">
        <div className="absolute top-2 right-2 active:scale-90 cursor-pointer">
          <CloseIcon onClick={closeModal} className="cursor-pointer" />
        </div>
        <div className="mt-4 flex justify-center">
          <p className="text-xl font-semibold">Login/Signup</p>
        </div>
        <div className="w-full mt-4 flex flex-col justify-center items-center gap-2">
          <button className="bg-blue-500 rounded-lg text-white px-3 py-2 flex items-center gap-2 active:scale-95">
            <GoogleIcon className="h-6 w-6" />
            Sign in with Google
          </button>
          <button className="bg-neutral-800 rounded-lg text-white px-3 py-2 flex items-center gap-2 active:scale-95">
            <GithubIcon className="h-6 w-6" />
            Sign in with Github
          </button>
        </div>
      </div>
    </div>
  );
}
