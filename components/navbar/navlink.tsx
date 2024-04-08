"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface LinkItem {
  title: string
  path: string
}

export function NavLink({ item }: { item: LinkItem }) {
  const pathName = usePathname()

  return (
    <Link
      href={item.path}
      className={`p-1 px-2 sm:p-2 sm:px-3 rounded-2xl font-semibold text-center flex ${
        pathName === item.path ? "bg-orange-600 text-slate-300" : ""
      }`}
    >
      {item.title}
    </Link>
  )
}
