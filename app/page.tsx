import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/citizen/dashboard');
  }

  return (
    <div className='flex items-center justify-center h-screen flex-col gap-4'>
      <h1>GroundUp Pulse</h1>
      <p>Aap kaun hain?</p>

      <Link href="/citizen/sign-up">
        <Button variant="outline" className='cursor-pointer'>
          👤 Citizen
        </Button>
      </Link>

      <Link href="/authority/department">
        <Button variant="outline" className='cursor-pointer'>
          🏛️ Authority
        </Button>
      </Link>
    </div>
  )
}

export default page
