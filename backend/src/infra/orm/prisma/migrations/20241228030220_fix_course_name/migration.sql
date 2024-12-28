/*
  Warnings:

  - The values [AEROESPACE] on the enum `Course` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Course_new" AS ENUM ('ENG', 'SOFTWARE', 'AEROSPACE', 'ENERGY', 'AUTOMOTIVE', 'ELETRONIC');
ALTER TABLE "students" ALTER COLUMN "course" TYPE "Course_new" USING ("course"::text::"Course_new");
ALTER TYPE "Course" RENAME TO "Course_old";
ALTER TYPE "Course_new" RENAME TO "Course";
DROP TYPE "Course_old";
COMMIT;
