"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const initialInstructors = [
  {
    id: 1,
    name: "John Doe",
    subject: "PDC",
    background: "10 years of teaching experience.",
    image: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    subject: "TDC",
    background: "Researcher and educator.",
    image: "https://github.com/shadcn.png",
  },
  {
    id: 3,
    name: "Robert Brown",
    subject: "Web Development",
    background: "Specialist in web development.",
    image: "https://github.com/shadcn.png",
  },
];

export default function Instructor() {
  const [instructors, setInstructors] = useState(initialInstructors);
  const [open, setOpen] = useState(false);
  const [newInstructor, setNewInstructor] = useState({
    name: "",
    subject: "",
    background: "",
    image: "",
  });

  const handleAdd = () => {
    setInstructors([
      ...instructors,
      { ...newInstructor, id: Date.now() || Math.random() },
    ]);
    setNewInstructor({ name: "", subject: "", background: "", image: "" });
    setOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Instructors</h2>
        <Button onClick={() => setOpen(true)}>Add Instructor</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {instructors.map((inst) => (
          <motion.div
            key={inst.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="rounded-2xl shadow-lg overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={inst.image}
                    alt={inst.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle>{inst.name}</CardTitle>
                    <p className="text-sm text-gray-500">{inst.subject}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{inst.background}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Instructor</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Name"
              value={newInstructor.name}
              onChange={(e) =>
                setNewInstructor({ ...newInstructor, name: e.target.value })
              }
            />
            <Input
              placeholder="Subject"
              value={newInstructor.subject}
              onChange={(e) =>
                setNewInstructor({ ...newInstructor, subject: e.target.value })
              }
            />
            <Input
              placeholder="Background"
              value={newInstructor.background}
              onChange={(e) =>
                setNewInstructor({
                  ...newInstructor,
                  background: e.target.value,
                })
              }
            />
            <Input
              placeholder="Image URL"
              value={newInstructor.image}
              onChange={(e) =>
                setNewInstructor({ ...newInstructor, image: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
