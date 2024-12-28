-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED');

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
