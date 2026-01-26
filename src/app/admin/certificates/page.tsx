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
import { CertificateStatus } from "@prisma/client";
import DebouncedSearchInput from "@/lib/utils/use-debounce";

//TODO ADD REAL DATA HERE
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

// Main Component
function Certificates() {
  const [searchName, setSearchName] = React.useState("");
  const [courseFilter, setCourseFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState<
    CertificateStatus | "all"
  >("all");

  const { data: graduatedStudents, isLoading } = useGetGraduatedStudents({
    searchName,
    course: courseFilter,
    certificateStatus: statusFilter === "all" ? undefined : statusFilter,
  });

  const handleStatusChange = (value: string) => {
    if (value === "all") {
      setStatusFilter("all");
    } else if (value in CertificateStatus) {
      setStatusFilter(value as CertificateStatus);
    }
  };

  const renderCertificateStatus = (status: string) => {
    if (status === "GENERATED") {
      return (
        <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" /> Generated
        </span>
      );
    }

    return (
      <span className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
        <RefreshCw className="h-4 w-4 animate-spin" />
        Pending
      </span>
    );
  };

  const renderActionButton = (status: string) => {
    if (status === "GENERATED") {
      return (
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
          <span className="sr-only">Download</span>
        </Button>
      );
    }

    return (
      <Button
        size="sm"
        className="bg-green-600 hover:bg-green-700 text-white font-medium"
      >
        <FileText className="h-4 w-4 mr-2" />
        Generate
      </Button>
    );
  };

  const renderCourseBadge = (courseTitle?: string) => {
    const isPractical = courseTitle?.startsWith("Practical");

    return (
      <Badge
        variant={isPractical ? "default" : "secondary"}
        className={
          isPractical
            ? "bg-blue-600/90 text-blue-50"
            : "bg-purple-600/90 text-purple-50"
        }
      >
        {courseTitle}
      </Badge>
    );
  };

  const students = graduatedStudents ?? [];
  const hasData = students.length > 0;

  const SkeletonRows = () => (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.tr
          key={i}
          variants={tableRowVariants}
          className="hover:bg-muted/30"
        >
          {Array.from({ length: 6 }).map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton className="h-4 w-full rounded-md animate-pulse bg-gray-300 dark:bg-gray-700" />
            </TableCell>
          ))}
        </motion.tr>
      ))}
    </>
  );

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

                <DebouncedSearchInput
                  defaultValue={searchName}
                  searchUser={setSearchName}
                />
              </div>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-full md:w-[140px] h-10">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="TDC">Theoretical Driving</SelectItem>
                  <SelectItem value="PDC">Practical Driving</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full md:w-[140px] h-10">
                  <SelectValue placeholder="Filter by certificate status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="GENERATED">Generated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 4. Certificate Table */}
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-2.5 text-gray-400">#</TableHead>
                    <TableHead className="w-[200px] text-gray-400">
                      Student Name
                    </TableHead>
                    <TableHead className="text-gray-400">Course</TableHead>
                    <TableHead className="text-gray-400">
                      Completion Date
                    </TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-center text-gray-400">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <motion.tbody
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 1 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05 },
                    },
                  }}
                >
                  {isLoading && <SkeletonRows />}

                  {!isLoading && hasData && (
                    <>
                      {students.map((student, i) => (
                        <motion.tr
                          key={student.id}
                          className="hover:bg-muted/30"
                        >
                          <TableCell className="font-medium">{i + 1}</TableCell>

                          <TableCell className="font-medium capitalize">
                            {student.firstName} {student.lastName}
                          </TableCell>

                          <TableCell>
                            {renderCourseBadge(student.course?.courseTitle)}
                          </TableCell>

                          <TableCell>
                            {formatToMDY(student.updatedAt)}
                          </TableCell>

                          <TableCell>
                            {renderCertificateStatus(
                              student.certificateStatus as CertificateStatus,
                            )}
                          </TableCell>

                          <TableCell className="text-center">
                            {renderActionButton(
                              student.certificateStatus as CertificateStatus,
                            )}
                          </TableCell>
                        </motion.tr>
                      ))}
                    </>
                  )}

                  {!isLoading && !hasData && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
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

      {/* {isGenerating && (
        <Generate
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          certificateData={wendelTDCData}
        />
      )} */}
    </>
  );
}

export default Certificates;
