"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import { useGetMyShedule } from "@/hooks/use-schedule";
import { Input } from "@/components/ui/input";
import { Search, Inbox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDebounce } from "use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { formattedDate } from "@/lib/utils/date";

function Page() {
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("searchEmail");
    if (storedEmail) {
      setSearchEmail(storedEmail);
    }
  }, []);

  const [value] = useDebounce(searchEmail, 2000);

  useEffect(() => {
    if (searchEmail) {
      localStorage.setItem("searchEmail", searchEmail);
    } else {
      localStorage.removeItem("searchEmail");
    }
  }, [searchEmail]);

  // const { data: mySchedule, isLoading, isError } = useGetMyShedule(value);

  // return (
  //   // <div className="min-h-screen px-4 md:px-10 bg-theme py-12 shadow-sm transition-colors duration-500">
  //   //   <Card className="border-2 border-yellow-400 shadow-lg">
  //   //     <CardHeader className="text-center">
  //   //       <CardTitle>
  //   //         <motion.h1
  //   //           initial={{ opacity: 0, y: -20 }}
  //   //           animate={{ opacity: 1, y: 0 }}
  //   //           transition={{ duration: 0.6 }}
  //   //           className="text-4xl md:text-5xl font-extrabold text-yellow-400 tracking-tight"
  //   //         >
  //   //           Hi, "Student"!
  //   //         </motion.h1>
  //   //       </CardTitle>
  //   //       <CardDescription className="text-gray-300">
  //   //         Find your schedule here
  //   //       </CardDescription>

  //   //       <div className="relative w-full mt-6 max-w-md mx-auto">
  //   //         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
  //   //         <Input
  //   //           type="text"
  //   //           placeholder="Search by email used for registration..."
  //   //           onChange={(e) => setSearchEmail(e.target.value)}
  //   //           className="placeholder:text-xs pl-10 border-yellow-400 focus-visible:ring-yellow-400"
  //   //         />
  //   //       </div>
  //   //     </CardHeader>

  //   //     {/* Loading */}
  //   //     {/* {isLoading ? (
  //   //       <div className="p-4 space-y-4">
  //   //         {[1, 2, 3].map((item) => (
  //   //           <div key={item} className="flex items-center space-x-4">
  //   //             <div className="flex-1 space-y-6">
  //   //               <Skeleton className="h-4 w-3/4" />
  //   //               <Skeleton className="h-4 w-1/2" />
  //   //             </div>
  //   //             <Skeleton className="h-9 w-9" />
  //   //           </div>
  //   //         ))}
  //   //       </div>
  //   //     ) : isError ? (
  //   //       <div className="p-6 text-center text-gray-500">
  //   //         <h1>Getting you on the road</h1>
  //   //       </div>
  //   //     ) : mySchedule ? ( */}
  //   //       <>
  //   //         {/* <CardContent className="text-center space-y-2">
  //   //           <div className="text-lg font-semibold dark:text-white">
  //   //             Fullname – {mySchedule.first_name} {mySchedule.last_name}
  //   //           </div>
  //   //           {mySchedule.invoices?.length > 0 && (
  //   //             <div className="text-md ">
  //   //               Course – {mySchedule.invoices[0].courseTitle}
  //   //             </div>
  //   //           )}
  //   //         </CardContent>

  //   //         <CardFooter className="flex justify-center">
  //   //           {mySchedule.schedule?.length ? (
  //   //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
  //   //               {mySchedule.schedule.map((session, index) => (
  //   //                 <div
  //   //                   key={index}
  //   //                   className="flex flex-col items-center bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow"
  //   //                 >
  //   //                   <Badge
  //   //                     className={`mb-3 px-3 py-1 text-sm font-bold rounded-full text-black ${
  //   //                       index === 0
  //   //                         ? "bg-green-300"
  //   //                         : index === 1
  //   //                         ? "bg-yellow-300"
  //   //                         : "bg-sky-300"
  //   //                     }`}
  //   //                   >
  //   //                     {session.sessionNo} Session
  //   //                   </Badge>
  //   //                   <h4 className="text-white">
  //   //                     Date – {formattedDate(session.startDayTime)}
  //   //                   </h4>
  //   //                   <h4 className="text-gray-300 text-sm">
  //   //                     Time –{" "}
  //   //                     {new Date(session.startDayTime).toLocaleTimeString([], {
  //   //                       hour: "2-digit",
  //   //                       minute: "2-digit",
  //   //                     })}
  //   //                   </h4>
  //   //                 </div>
  //   //               ))}
  //   //             </div>
  //   //           ) : (
  //   //             <div className="text-gray-500 text-center">
  //   //               No sessions available.
  //   //             </div>
  //   //           )}
  //   //         </CardFooter> */}
  //   //       </>
  //   //     {/* ) : (
  //   //       <div className="flex flex-col items-center justify-center p-12 text-gray-500">
  //   //         <Inbox className="w-16 h-16 mb-4" />
  //   //         No schedule found.
  //   //       </div>
  //   //     )}
  //   //   </Card> */}
  //   // </div>
  // );
}

export default Page;
