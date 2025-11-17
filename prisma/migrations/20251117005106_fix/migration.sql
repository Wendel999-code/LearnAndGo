/*
  Warnings:

  - The values [NULL] on the enum `CertificateStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[cert_control_no]` on the table `Certicate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cert_control_no` to the `Certicate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CertificateStatus_new" AS ENUM ('PENDING', 'GENERATED');
ALTER TABLE "public"."Student" ALTER COLUMN "certificateStatus" DROP DEFAULT;
ALTER TABLE "Student" ALTER COLUMN "certificateStatus" TYPE "CertificateStatus_new" USING ("certificateStatus"::text::"CertificateStatus_new");
ALTER TYPE "CertificateStatus" RENAME TO "CertificateStatus_old";
ALTER TYPE "CertificateStatus_new" RENAME TO "CertificateStatus";
DROP TYPE "public"."CertificateStatus_old";
ALTER TABLE "Student" ALTER COLUMN "certificateStatus" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Certicate" ADD COLUMN     "cert_control_no" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "certificateStatus" SET DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "Certicate_cert_control_no_key" ON "Certicate"("cert_control_no");
