/*
  Warnings:

  - Added the required column `status` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED');

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "status" "Status" NOT NULL;
