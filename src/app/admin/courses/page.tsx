"use client";

import { useState } from "react";
import { courses as initialCourses } from "@/lib/utils/courses";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function Courses() {
  const [courses, setCourses] = useState(initialCourses);
  const [open, setOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    id: "",
    level: "",
    title: "",
    desc: "",
    rating: 0,
    features: [] as string[],
    price: 0,
  });

  const handleAddCourse = () => {
    setCourses([...courses, { ...newCourse, id: Date.now().toString() }]);
    setNewCourse({
      id: "",
      level: "",
      title: "",
      desc: "",
      rating: 0,
      features: [],
      price: 0,
    });
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <div className="flex items-center justify-between w-full max-w-5xl">
        <h1 className="text-3xl font-bold">Driving Courses</h1>
        <Button onClick={() => setOpen(true)}>Add Course</Button>
      </div>

      <div className="w-full max-w-5xl">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {/* <CoursesCard course={course}  /> */}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add Course Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Course Level (e.g., TDC, PDC)"
                value={newCourse.level}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, level: e.target.value })
                }
              />
              <Input
                placeholder="Title"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
              />
              <Input
                placeholder="Description"
                value={newCourse.desc}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, desc: e.target.value })
                }
              />
              <Input
                placeholder="Features (comma separated)"
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    features: e.target.value.split(","),
                  })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={newCourse.price}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    price: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddCourse}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Save
              </Button>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
