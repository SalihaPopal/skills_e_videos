import Link from 'next/link'
import React from 'react'

export default function f1() {
  return (
    <>
     <h1>f1 page</h1>
        <div>
     <Link href="/f1/f2" >f2link</Link>
    </div>
    </>

  )
}
