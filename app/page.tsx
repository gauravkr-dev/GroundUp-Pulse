import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Button className='bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer'>
        Hello World
      </Button>
    </div>
  )
}

export default page
