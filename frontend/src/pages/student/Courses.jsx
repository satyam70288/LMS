import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import Course from './Course';

const Courses = () => {
    const isLoading = false;
    return (
        <div className='bg-gray-50'>
            <div className='max-w-7xl mx-auto p-6'>
                <h2 className='font-bold text-3xl text-center mb-10'>Our Courses</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {
                        isLoading ? (
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
                                <CourseSkeleton key={index} />
                            ))
                        ) : (<Course/>
                            // data?.courses && data.courses.map((course, index) => <Course key={index} course={course} />)
                        )}
                </div>

            </div>
        </div>
    )
}

export default Courses

const CourseSkeleton = () => {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
            <Skeleton className="w-full h-36" />
            <div className="px-5 py-4 space-y-3">
                <Skeleton className="h-6 w-full" />
                <div className="">
                    <div className="flex items-center justify-between gap-3 mb-4">
                        <Skeleton className="h-6 w-6 rounded-full " />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-4 w-1/4" />
            </div>
        </div>
    );
};