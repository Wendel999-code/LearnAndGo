import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle } from "lucide-react";

interface Course {
  id: string;
  level: string;
  title: string;
  desc: string;
  rating: number;
  features: string[];
  price: number;
}

interface CourseCardProps {
  course: Course;
  isSelected?: boolean;
  onSelect?: () => void;
  onEnroll?: boolean;
}

function CoursesCard({
  course,
  isSelected,
  onSelect,
  onEnroll,
}: CourseCardProps) {
  return (
    <Card
      className={`shadow-lg rounded-xl transition-all duration-300 border cursor-pointer ${
        isSelected ? "ring-2 ring-yellow-500 scale-[1.02]" : "hover:shadow-xl"
      }`}
      onClick={onSelect}
    >
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge className="">{course.level}</Badge>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-300">{course.rating}</span>
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-yellow-500">
          {course.title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          {course.desc}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {course.features.map((feat, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm"
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6">
          <span
            className={`text-2xl font-bold  ${
              onEnroll ? "md:ml-18 ml-0" : ""
            } `}
          >
            ₱ {course.price}
          </span>
          {onEnroll ? (
            ""
          ) : (
            <>
              <Button
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Enroll Now
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default CoursesCard;
