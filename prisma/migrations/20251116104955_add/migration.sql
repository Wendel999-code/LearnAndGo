/*
  Warnings:

  - You are about to drop the column `instructor_id` on the `Schedule` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CertificateStatus" AS ENUM ('NULL', 'PENDING', 'GENERATED');

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "instructor_id";

-- CreateTable
CREATE TABLE "Certicate" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "school_admintrator" TEXT,
    "status" "CertificateStatus" NOT NULL DEFAULT 'NULL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certicate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Certicate_student_id_key" ON "Certicate"("student_id");

-- AddForeignKey
ALTER TABLE "Certicate" ADD CONSTRAINT "Certicate_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
