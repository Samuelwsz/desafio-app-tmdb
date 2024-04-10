import Link from "next/link"
import { ModeToggle } from "../darkmode/modetoggle"
import { NavLink } from "./navlink"

import Logo from "@/public/tmdblogo.png"
import Image from "next/image"

const links = [
  {
    title: "Melhores filmes",
    path: "/toprated",
  },
  {
    title: "Curtidos",
    path: "/likedMovie",
  },
  {
    title: "Não Curtidos",
    path: "/deslikeMovie",
  },
  {
    title: "Categorias",
    path: "/categorys",
  },
]

export function NavBar() {
  return (
    <header className="bg-slate-600/80 text-slate-100">
      <nav className="max-w-7xl m-auto py-3 px-2">
        {" "}
        <div className="block md:flex items-center sm:justify-between">
          <div className="flex items-center gap-5 justify-center">
            <Link href={"/"}>
              <Image alt="Logo tmdb" src={Logo} width={180} height={180} />{" "}
            </Link>

            <ModeToggle />
          </div>
          <div className="flex gap-3 justify-center">
            {links.map((link) => (
              <NavLink key={link.title} item={link} />
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
