import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, HelpCircle, AlertTriangle, Search } from 'lucide-react'

const Support = () => {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="mx-auto max-w-[1440px] px-4 container">
        {/* Orange accent bar */}
        <div className="mb-8">
          <div className="border-l-8 pl-4  mb-6 border-brand-orange">
            <h2 className="text-4xl font-bold text-brand mb-4">Support & Questions</h2>
          </div>
          <p className="text-lg text-gray-600 font-medium max-w-2xl">
            Have a question or need help? Find support here
          </p>
        </div>

        {/* Support cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FAQ Card */}
          <Card className="bg-[#9CB340] text-white hover:bg-[#8BA238] transition-colors cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className=" p-3 rounded-full">
                  <HelpCircle className="h-10 w-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white">FAQ</CardTitle>
                  <CardDescription className="text-white/90">Connect with experts</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Enquiry Card */}
          <Card className="bg-[#9CB340] text-white hover:bg-[#8BA238] transition-colors cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className=" p-3 rounded-full">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white">Enquiry</CardTitle>
                  <CardDescription className="text-white/90">Ask us a question</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Report Issue Card */}
          <Card className="bg-[#9CB340] text-white hover:bg-[#8BA238] transition-colors cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className=" p-3 rounded-full">
                  <AlertTriangle className="h-10 w-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white">Report Issue</CardTitle>
                  <CardDescription className="text-white/90">Tell us more</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Support
