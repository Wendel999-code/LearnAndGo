"use client";

import * as React from "react";
import {
  Download,
  Search,
  CheckCircle2,
  RefreshCw,
  FileText,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// 1. Dummy Data
const certificateData = [
  {
    id: "S1001",
    name: "Wendel Clark",
    course: "Practical Driving Course",
    completionDate: "2025-10-28",
    status: "Generated",
  },
  {
    id: "S1002",
    name: "Jane Smith",
    course: "Theoretical Driving Course",
    completionDate: "2025-10-27",
    status: "Generated",
  },
  {
    id: "S1003",
    name: "Michael Chen",
    course: "Practical Driving Course",
    completionDate: "2025-11-01",
    status: "Pending",
  },
  {
    id: "S1004",
    name: "Emily White",
    course: "Theoretical Driving Course",
    completionDate: "2025-10-30",
    status: "Generated",
  },
  {
    id: "S1005",
    name: "David Lee",
    course: "Practical Driving Course",
    completionDate: "2025-11-02",
    status: "Pending",
  },
  {
    id: "S1006",
    name: "Sarah Brown",
    course: "Theoretical Driving Course",
    completionDate: "2025-11-03",
    status: "Pending",
  },
  {
    id: "S1001f",
    name: "Wendel Clark",
    course: "Practical Driving Course",
    completionDate: "2025-10-28",
    status: "Generated",
  },
  {
    id: "S1002ewf",
    name: "Jane Smith",
    course: "Theoretical Driving Course",
    completionDate: "2025-10-27",
    status: "Generated",
  },
  {
    id: "S10ewfgw03",
    name: "Michael Chen",
    course: "Practical Driving Course",
    completionDate: "2025-11-01",
    status: "Pending",
  },
  {
    id: "S1gerw004",
    name: "Emily White",
    course: "Theoretical Driving Course",
    completionDate: "2025-10-30",
    status: "Generated",
  },
  {
    id: "S10egewq05",
    name: "David Lee",
    course: "Practical Driving Course",
    completionDate: "2025-11-02",
    status: "Pending",
  },
  {
    id: "S10efwe06",
    name: "Sarah Brown",
    course: "Theoretical Driving Course",
    completionDate: "2025-11-03",
    status: "Pending",
  },
];



// Main Component
function Certificates() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [courseFilter, setCourseFilter] = React.useState("all");

  // Memoized filter logic for performance
  const filteredData = React.useMemo(() => {
    return certificateData
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item) =>
        courseFilter === "all" ? true : item.course === courseFilter
      );
  }, [searchTerm, courseFilter]);

  // Framer Motion variants for animations
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className=""
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="shadow-lg border-none bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Certificate Generation
          </CardTitle>
          <CardDescription>
            Filter, manage, and generate student driving certificates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 3. Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                placeholder="Search by student name..."
                className="pl-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full md:w-[240px] h-10">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="Practical Driving Course">
                  Practical Driving
                </SelectItem>
                <SelectItem value="Theoretical Driving Course">
                  Theoretical Driving
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 4. Certificate Table */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[10px]">#</TableHead>
                  <TableHead className="w-[200px]">Student Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Completion Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <motion.tbody
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
                initial="hidden"
                animate="visible"
              >
                {filteredData.length > 0 ? (
                  filteredData.map((item, i) => (
                    <motion.tr
                      key={item.id}
                      variants={tableRowVariants}
                      className="hover:bg-muted/30"
                    >
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.course.startsWith("Practical")
                              ? "default"
                              : "secondary"
                          }
                          className={
                            item.course.startsWith("Practical")
                              ? "bg-blue-600/90 text-blue-50"
                              : "bg-purple-600/90 text-purple-50"
                          }
                        >
                          {item.course}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.completionDate}</TableCell>
                      <TableCell>
                        {item.status === "Generated" ? (
                          <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <CheckCircle2 className="h-4 w-4" /> Generated
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                            <RefreshCw className="h-4 w-4 animate-spin" />{" "}
                            Pending
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.status === "Generated" ? (
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Generate
                          </Button>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center h-24 text-muted-foreground"
                    >
                      No matching students found.
                    </TableCell>
                  </TableRow>
                )}
              </motion.tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Certificates;
