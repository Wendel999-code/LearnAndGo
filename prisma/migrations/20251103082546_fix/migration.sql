-- DropForeignKey
ALTER TABLE "public"."Schedule" DROP CONSTRAINT "intructor_id_fkey";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "first_instructor_id" TEXT,
ADD COLUMN     "second_instructor_id" TEXT,
ADD COLUMN     "third_instructor_id" TEXT;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_first_instructor_id_fkey" FOREIGN KEY ("first_instructor_id") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_second_instructor_id_fkey" FOREIGN KEY ("second_instructor_id") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_third_instructor_id_fkey" FOREIGN KEY ("third_instructor_id") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
