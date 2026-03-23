import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import Hero from './_components/Hero'
import Navbar from './_components/Navbar'
import { Footer } from './_components/Footer'
import CitizenSection from './_components/CitizenSection'
import AuthoritySection from './_components/AuthoritySection'
import { RoleOfAi } from './_components/RoleOfAi'
import { FaqsSection } from './_components/FaqsSection'
import { CallToAction } from './_components/cta'
import HowItWorks from './_components/HowItWorks'
// import { FaqsSection } from './_components/FaqsSection'

const page = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role === "citizen") {
    redirect("/citizen/dashboard");
  } else if (session?.user.role === "authority") {
    redirect("/authority/dashboard");
  }

  return (
    <div>
      <Navbar />
      <Hero />
      <CitizenSection />
      <AuthoritySection />
      <RoleOfAi />
      <HowItWorks />
      <FaqsSection />
      <CallToAction />
      <Footer />
    </div>

  )
}

export default page
