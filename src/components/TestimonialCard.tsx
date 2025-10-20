import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Helper function for Avatar fallback
const getInitials = (name: any) => {
  return name
    .split(" ")
    .map((n:any) => n[0])
    .join("");
};

export function TestimonialCard({ post }: { post: any }) {
  return (
    <Card className="w-[380px] flex-shrink-0 md:w-[420px]">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={post.profileImage} alt={post.name} />
          <AvatarFallback>{getInitials(post.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="font-semibold">{post.name}</p>
          <p className="text-sm text-muted-foreground">{post.course}</p>
        </div>
        <div className="text-sm text-yellow-500">
          {"⭐".repeat(post.rating)}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <img
          src={post.journeyImage}
          alt={`Journey image from ${post.name}`}
          className="aspect-video w-full rounded-md object-cover mb-4"
        />
        <p className="text-muted-foreground italic">"{post.text}"</p>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <span>{post.location}</span>
        <span>{post.date}</span>
      </CardFooter>
    </Card>
  );
}
