/*
  Warnings:

  - You are about to drop the column `status` on the `Certicate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Certicate" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "certificateStatus" "CertificateStatus" NOT NULL DEFAULT 'NULL';
