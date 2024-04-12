"use client"

import { Card } from "@/components/card/card"
import { useLikeOrDislikeMovie } from "@/lib/useLikeOrDislikeMovie"

export default function LikedMovie() {
  const { likedMovies } = useLikeOrDislikeMovie()

  return (
    <div className="sm:px-2 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
      {likedMovies.map((like) => (
        <Card key={like.id} movie={like} />
      ))}
    </div>
  )
}
