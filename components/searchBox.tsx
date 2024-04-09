"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function SearchBox() {
  const [search, setSearch] = useState<string>("")

  const router = useRouter()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    router.push(`/search/${search}`)

    setSearch("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between max-w-7xl mx-auto my-3 px-3 gap-3"
    >
      <Input
        type="text"
        placeholder="Pesquisar obra..."
        value={search}
        className="w-full rounded-md placeholder-slate-600  bg-transparent border border-slate-800"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button disabled={!search}>Pesquisar</Button>
    </form>
  )
}
