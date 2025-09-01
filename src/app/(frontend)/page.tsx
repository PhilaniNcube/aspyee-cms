import { redirect } from 'next/navigation'
import Hero from './knowledge-centre/_components/hero'

export default async function HomePage() {
  redirect('/knowledge-centre')

  return (
    <div>
      <Hero />
    </div>
  )
}
