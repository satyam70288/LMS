import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
    const categories = [
        "Next JS",
        "Data Science",
        "Frontend Development",
        "Fullstack Development",
        "MERN Stack Development",
        "Javascript",
        "Python",
        "Docker",
        "MongoDB",
        "HTML",
    ];

    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState(""); // Single state for editable input
    const [filteredCategories, setFilteredCategories] = useState(categories); // Filter dropdown options
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef(null); // Ref to handle outside click

    
    const [createCourse, { data, isLoading, error, isSuccess }] =
        useCreateCourseMutation();

    const navigate = useNavigate();

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);

        // Filter dropdown based on input
        const filtered = categories.filter((cat) =>
            cat.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCategories(filtered);
        setShowDropdown(true); // Show dropdown when typing
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setShowDropdown(false); // Hide dropdown after selection
    };

    // Handle click outside of dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const createCourseHandler = async () => {
        await createCourse({ courseTitle, category });
    };

    // Display success toast
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course created.");
            navigate("/admin/course");
        }
    }, [isSuccess, error]);

    return (
        <div className="flex-1 mx-10">
            <div className="mb-4">
                <h1 className="font-bold text-xl">
                    Let's add a course. Add some basic details for your new course.
                </h1>
                <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
                    laborum!
                </p>
            </div>
            <div className="space-y-4">
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="Your Course Name"
                    />
                </div>
                <div className="relative" ref={dropdownRef}>
                    <Label>Category</Label>
                    <Input
                    
                        type="text"
                        value={category}
                        onChange={handleCategoryChange}
                        placeholder="Type or select a category"
                        onFocus={() => setShowDropdown(true)} // Show dropdown on focus
                    />
                    {showDropdown && (
                        <div className="absolute bg-white border border-gray-300 rounded-md mt-1 shadow-md max-h-40 overflow-auto z-10 w-full">
                            {filteredCategories.map((cat) => (
                                <div
                                    key={cat}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleCategorySelect(cat)}
                                >
                                    {cat}
                                </div>
                            ))}
                            {filteredCategories.length === 0 && (
                                <div className="px-4 py-2 text-gray-500">No categories found</div>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => navigate("/admin/course")}>
                        Back
                    </Button>
                    <Button disabled={isLoading} onClick={createCourseHandler}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Create"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;
