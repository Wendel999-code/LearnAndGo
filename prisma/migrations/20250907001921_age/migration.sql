/*
  Warnings:

  - The values [pending,accepted,rejected] on the enum `InvoiceStatus` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `age` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."InvoiceStatus_new" AS ENUM ('PENDING', 'PAID');
ALTER TABLE "public"."Invoice" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Invoice" ALTER COLUMN "status" TYPE "public"."InvoiceStatus_new" USING ("status"::text::"public"."InvoiceStatus_new");
ALTER TYPE "public"."InvoiceStatus" RENAME TO "InvoiceStatus_old";
ALTER TYPE "public"."InvoiceStatus_new" RENAME TO "InvoiceStatus";
DROP TYPE "public"."InvoiceStatus_old";
ALTER TABLE "public"."Invoice" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Invoice" ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "paidAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Student" DROP COLUMN "age",
ADD COLUMN     "age" INTEGER NOT NULL;
