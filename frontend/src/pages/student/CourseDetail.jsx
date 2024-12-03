import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React from 'react'

const CourseDetail = () => {
    return (
        <div className='mt-20 space-y-5'>
            <div className='bg-[#2D2F31] text-white'>
                <div className='max-w-7xl mx-auto py-8 px-4 flex flex-col gap-2'>
                    <h1 className='font-bold text-2xl md:text-3xl'>Course Title</h1>
                    <p className='text-base md:text-lg'>Course Sub-title</p>
                    <p>Create By {"user"} <span className='text-[#c0c4FC] underline italic'>satyam bharti</span></p>
                    <div className='flex item-center gap-2 text-sm '>
                        <BadgeInfo size={16} />
                        <p>Last updated 11-11-2024</p>

                    </div>
                    <p> Students enrolled :10</p>
                </div>
            </div>
            <div className='max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-center gap-10'>
                {/* fist div */}
                <div className='w-full lg:w-1/2 space-y-5'>
                    <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
                    <p className='text-sm'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit obcaecati quaerat commodi molestiae in, molestias velit tenetur magnam. Nesciunt perspiciatis ab excepturi quia aut quasi delectus vitae repellat nulla earum!
                    </p>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Course Content
                            </CardTitle>
                            <CardDescription> 4 lecture</CardDescription>

                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {
                                [1, 2, 3].map((lecture, idx) => (
                                    <div className='flex items-center gap-4' key={idx}>
                                        <span>
                                            {
                                                true ? (<PlayCircle size={14} />) : <Lock size={14} />
                                            }
                                        </span>
                                        <p>lecture title</p>
                                    </div>
                                ))
                            }
                        </CardContent>
                    </Card>

                </div>
                {/* second div */}
                <div className='w-full lg:w-1/3 '>
                   <Card  >
                    <CardContent className='p-4 flex flex-col'>
                      <div className='w-full aspect-video mb-4'>
                        video aayega
                      </div>
                      <h1>lecture</h1>
                      <Separator/>
                    </CardContent>
                   </Card>

                </div>
                    
            </div>

        </div>
    )
}

export default CourseDetail