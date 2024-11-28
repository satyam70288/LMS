import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

const HeroSection = () => {
    return (
        <div className='relative bg-gradient-to-r from-blue-500 to-blue-700 dark:from-gray-800 dark:to-gray-900 py-16 px-4 text-center'>
            <div className='max-w-3xl mx-auto'>
                <h1 className="text-white text-4xl font-bold mb-4">
                    Find the Best Courses for You
                </h1>
                <p className="text-gray-200 dark:text-gray-400 mb-8">
                    Discover, Learn, and Upskill with our wide range of courses
                </p>
                <form action="" className='flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6' >
                    <Input
                        type="text"
                        placeholder="Search for courses"
                        className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <Button className="bg-blue-600 dark:bg-gray-700 text-white px-6 py-3 rounded-full shadow-lg ml-2 hover:bg-blue-800 dark:hover:bg-gray-800">
                        search
                    </Button>
                </form> 
                <Button className="bg-white dark:bg-gray-800 text-blue-600 dark:text-gray-200 px-6 py-4 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-gray-700">Explore courses</Button>
            </div>
        </div>
    )
}

export default HeroSection