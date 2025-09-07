import { motion } from "framer-motion";
import { Users, DollarSign, Car, Award, BarChart3 } from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      change: "+12%",
      icon: Users,
      trend: "up",
      bgClass: "bg-yellow-500 dark:bg-yellow-600",
    },
    {
      title: "Active Classes",
      value: "42",
      change: "+8%",
      icon: Car,
      trend: "up",
      bgClass: "bg-black dark:bg-gray-800",
    },
    {
      title: "Monthly Revenue",
      value: "$84,320",
      change: "+23%",
      icon: DollarSign,
      trend: "up",
      bgClass: "bg-yellow-500 dark:bg-yellow-600",
    },
    {
      title: "Pass Rate",
      value: "92%",
      change: "+5%",
      icon: Award,
      trend: "up",
      bgClass: "bg-black dark:bg-gray-800",
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      time: "09:00 AM",
      student: "Alice Cooper",
      type: "Practical",
      instructor: "John Instructor",
      duration: "2h",
    },
    {
      id: 2,
      time: "11:30 AM",
      student: "Bob Martin",
      type: "Theory",
      instructor: "Sarah Instructor",
      duration: "1.5h",
    },
    {
      id: 3,
      time: "02:00 PM",
      student: "Carol White",
      type: "Practical",
      instructor: "Mike Instructor",
      duration: "2h",
    },
    {
      id: 4,
      time: "04:30 PM",
      student: "Dan Green",
      type: "Test Prep",
      instructor: "Emma Instructor",
      duration: "1h",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 border rounded-md dark:bg-gray-900 transition-colors duration-300">
      <main className="p-6 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Page Title */}
          <motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard Overview
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back! Here’s what’s happening at your driving school.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgClass}`}>
                    <stat.icon
                      className={`w-6 h-6 ${
                        stat.bgClass.includes("yellow")
                          ? "text-black"
                          : "text-white"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.title}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Schedule */}
            <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Today’s Classes
                </h2>
                <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full">
                  {upcomingClasses.length} scheduled
                </span>
              </div>
              <div className="p-6 space-y-4">
                {upcomingClasses.map((class_) => (
                  <motion.div
                    key={class_.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-yellow-500 dark:hover:border-yellow-600 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {class_.time}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                        {class_.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {class_.student}
                    </p>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{class_.type}</span>
                      <span>{class_.instructor}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Student Progress */}
            <motion.div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Course Analytics
                </h2>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-6">
                {[
                  "Theory Classes",
                  "Practical Lessons",
                  "Mock Tests",
                  "Final Tests",
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {85 + index * 3}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${85 + index * 3}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-yellow-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default Dashboard;
