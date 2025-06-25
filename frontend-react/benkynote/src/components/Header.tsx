import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import ErrorPage from "./ErrorPage";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ModeToggle } from "./mode-toggle";

export default function Header({ user, isLoading }) {

  function show() {
    console.log(user)
  }

  return (
    <header className="bg-white shadow py-4 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <Image
            src="/images/benky-logo.png" // replace with your image path
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-xl font-bold text-[#eba9bf]">BENKYNOTE</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-5">
          <div className="relative mx-4">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full h-7 pl-10 pr-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <MagnifyingGlassIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Profile info with Img */}
        {isLoading ? '' :
          <div className="flex items-center space-x-3" onClick={show}>
            <img src={user?.picture} alt="Profile Picture" className="w-[40px] h-[40px] rounded-full"></img>
            <div>
              <p className="text-sm font-medium">{user?.nickname}</p>
              <p className="text-xs text-gray-500">{user?.["https://Benkynote/roles"][0]}</p>
            </div>
          </div>
        }
        <div className="p-3 dark:bg-transparent">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
