import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"; import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';
import Course from './Course';

const Profile = () => {
    const isLoading = true
    const user = {
        enrolledCourses: [
            {
                courseId: "101",
                title: "JavaScript Essentials",
                description: "Learn the basics of JavaScript, including variables, functions, and DOM manipulation.",
                instructor: "John Doe",
                duration: "4 weeks",
                progress: 75, // Progress in percentage
                enrolledDate: "2024-11-01",
                isCompleted: false,
            },
            {
                courseId: "102",
                title: "React for Beginners",
                description: "A beginner-friendly course to master React and build interactive UIs.",
                instructor: "Jane Smith",
                duration: "6 weeks",
                progress: 40,
                enrolledDate: "2024-11-10",
                isCompleted: false,
            },
            {
                courseId: "103",
                title: "Advanced Node.js",
                description: "Deep dive into Node.js and build scalable backend applications.",
                instructor: "Alice Johnson",
                duration: "8 weeks",
                progress: 100,
                enrolledDate: "2024-09-15",
                isCompleted: true,
            },
        ],
    };

    console.log(user.enrolledCourses);

    const onChangeHandler = () => { }
    return (
        <div className='max-w-4xl mx-auto my-24 px-4'>
            <h1 className='font-bold text-2xl text-center md:text-left'> PROFILE</h1>
            <div className='flex flex-col md:flex-row  items-center md:items-start gap-8 mt-8'>
                <div className='flex flex-col items-center'>
                    <Avatar className='h-24 w-24  md:h-32 md:w-32 mb-4 overflow-hidden rounded-full'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-600 dark:text-gray-100'>
                            Name:<span className='font-normal text-gray-500 dark:text-gray-300 ml-2'>satyam Bharti</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-600 dark:text-gray-100'>
                            Email:<span className='font-normal text-gray-500 dark:text-gray-300 ml-2'>satyam@Bharti</span>
                        </h1>
                    </div><div className='mb-2'>
                        <h1 className='font-semibold text-gray-600 dark:text-gray-100'>
                            Role:<span className='font-normal text-gray-500 dark:text-gray-300 ml-2'>instructor</span>
                        </h1>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size='sm' className='mt-2'>Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="p-4 bg-white rounded-lg shadow-lg z-50">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>Make change to  your profile here click save where you are done</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label>Name</Label>
                                    <Input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label>Profile Photo</Label>
                                    <Input
                                        onChange={onChangeHandler}
                                        type="file"
                                        accept="image/*"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disable={isLoading}>
                                    {
                                        isLoading ? <Loader className='mr-2 h-4 w-4 animate-spin'>Please wait...</Loader> : "Save Changes"
                                    }
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div>
                <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
                    {user.enrolledCourses.length === 0 ? (
                        <h1>You haven't enrolled yet</h1>
                    ) : (
                        user.enrolledCourses.map((course) => (
                            <Course course={course} key={course._id} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile