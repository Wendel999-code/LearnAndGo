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
import Generate from "./Generate";
import { useGetGraduatedStudents } from "@/hooks/use-student";
import { formatToMDY } from "@/lib/utils/date";
import { Skeleton } from "@/components/ui/skeleton";

const wendelTDCData = {
  recipientName: "SABAYO, WENDEL PARAY",
  courseName: "Theoretical Driving Course (TDC)",
  courseHours: 15,
  issuerName: "Learn and Go Driving School",
  issuerLocation: "Brgy. Sabang I, Allen, Northern Samar, Philippines, 6405",
  issueDate: "1st of February 2022",
  controlNumber: "DS-LAGS0803-A-2021-00000051",
  administratorName: "Wendel clark dawson",
};

// Main Component
function Certificates() {
  const { data: graduatedStudents, isLoading } = useGetGraduatedStudents();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [courseFilter, setCourseFilter] = React.useState("all");

  const [isGenerating, setIsGenerating] = React.useState(false);

  // Memoized filter logic for performance
  const filteredData = React.useMemo(() => {
    const data = graduatedStudents
      ?.filter((item: any) => {
        const fullName = `${item.firstName ?? ""} ${
          item.lastName ?? ""
        }`.trim();

        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .filter((item: any) =>
        courseFilter === "all"
          ? true
          : item.course?.courseTitle === courseFilter
      );

    return data;
  }, [graduatedStudents, searchTerm, courseFilter]);

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
    <>
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
                  <SelectItem value="Theoretical Driving Course">
                    Theoretical Driving
                  </SelectItem>
                  <SelectItem value="Practical Driving Course">
                    Practical Driving
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 4. Certificate Table */}
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[10px] text-gray-400">#</TableHead>
                    <TableHead className="w-[200px] text-gray-400">
                      Student Name
                    </TableHead>
                    <TableHead className="text-gray-400">Course</TableHead>
                    <TableHead className="text-gray-400">
                      Completion Date
                    </TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-right text-gray-400">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <motion.tbody
                  variants={{
                    visible: { transition: { staggerChildren: 0.05 } },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {isLoading &&
                    [...Array(5)].map((_, i) => (
                      <motion.tr
                        key={i}
                        variants={tableRowVariants}
                        className="hover:bg-muted/30"
                      >
                        <TableCell className="font-medium">
                          <Skeleton className="h-4 w-6 rounded-md animate-pulse bg-gray-300 dark:bg-gray-700" />
                        </TableCell>
                        <TableCell className="font-medium capitalize">
                          <Skeleton className="h-4 w-40 rounded-md animate-pulse bg-gray-300 dark:bg-gray-700" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-32 rounded-lg animate-pulse bg-gray-300 dark:bg-gray-700" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-24 rounded-md animate-pulse bg-gray-300 dark:bg-gray-700" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-24 rounded-md animate-pulse bg-gray-300 dark:bg-gray-700" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-24 rounded-md animate-pulse bg-gray-300 dark:bg-gray-700" />
                        </TableCell>
                      </motion.tr>
                    ))}

                  {!isLoading && (
                    <>
                      {(filteredData?.length ?? 0) > 0 ? (
                        filteredData?.map((student, i) => (
                          <motion.tr
                            key={student.id}
                            variants={tableRowVariants}
                            className="hover:bg-muted/30"
                          >
                            <TableCell className="font-medium">
                              {i + 1}
                            </TableCell>
                            <TableCell className="font-medium capitalize">
                              {student.firstName} {student.lastName}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  student.course?.courseTitle?.startsWith(
                                    "Practical"
                                  )
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  student.course?.courseTitle?.startsWith(
                                    "Practical"
                                  )
                                    ? "bg-blue-600/90 text-blue-50"
                                    : "bg-purple-600/90 text-purple-50"
                                }
                              >
                                {student.course?.courseTitle}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {formatToMDY(student.updatedAt)}
                            </TableCell>
                            <TableCell>
                              {/* //TODO ADD CERTIFICATE STATUS */}
                              {"Generated" !== "Generated" ? (
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
                              {"Generated" !== "Generated" ? (
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => setIsGenerating(true)}
                                  variant="outline"
                                  size="sm"
                                >
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
                    </>
                  )}
                </motion.tbody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {isGenerating && (
        <Generate
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          certificateData={wendelTDCData}
        />
      )}
    </>
  );
}

export default Certificates;
