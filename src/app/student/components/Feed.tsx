"use client";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clapperboard, Ellipsis, Images, Video } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Feed() {
  return (
    <div className="flex flex-col items-center mt-10 ">
      {/* post  */}
      <div className="p-4 flex flex-col gap-3 dark:bg-gray-900 rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex items-center gap-3">
          {" "}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Input
            className="rounded-xl p-4 h-12 "
            type="text"
            placeholder="What's on your mind,  Sabayo?"
          />
        </div>
        <Separator orientation="horizontal" />

        <div className="grid grid-cols-3 gap-4 text-gray-500 h-12  mt-2">
          <div className="flex cursor-pointer hover:bg-gray-800 rounded-lg transition-colors ease-in-out items-center gap-2 justify-center">
            <Clapperboard className="text-yellow-600" />
            <span>Live Video</span>
          </div>
          <div className="flex cursor-pointer hover:bg-gray-800 rounded-lg transition-colors ease-in-out items-center gap-2 justify-center">
            <Images className="text-green-600" />
            <span>Photo/Video</span>
          </div>
          <div className="flex cursor-pointer hover:bg-gray-800 rounded-lg transition-colors ease-in-out items-center gap-2 justify-center">
            <Video className="text-red-600" />
            <span>Reel</span>
          </div>
        </div>
      </div>

      {/* feeds */}
      <div className="w-full max-w-2xl mt-10 space-y-6 overflow-x-auto shadow-md">
        {/* feed item */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg ">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                {" "}
                <h3 className="font-bold dark:text-gray-300">John Doe</h3>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>

            <div className="rounded-full ">
              <Ellipsis className="mb-6 dark:text-gray-400 w-6 h-6 cursor-pointer rounded-full  hover:bg-gray-800 " />
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quod?
          </p>

          <Image
            src="https://github.com/shadcn.png"
            alt="post"
            width={600}
            height={400}
            className="w-full h-auto mt-4 rounded-lg"
          />
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg ">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                {" "}
                <h3 className="font-bold dark:text-gray-300">John Doe</h3>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>

            <div className="rounded-full ">
              <Button className="rounded-full  hover:bg-gray-800">
                <Ellipsis className="mb-6 dark:text-gray-400 w-6 h-6  " />
              </Button>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quod?
          </p>

          <Image
            src="https://github.com/shadcn.png"
            alt="post"
            width={600}
            height={400}
            className="w-full h-auto mt-4 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Feed;
