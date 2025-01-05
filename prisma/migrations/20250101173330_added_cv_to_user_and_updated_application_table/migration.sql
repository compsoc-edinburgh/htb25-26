/*
  Warnings:

  - Added the required column `cv_url` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `first_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `university_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `university_year` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_team_id_fkey";

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "team_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cv_url" TEXT NOT NULL,
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "last_name" SET NOT NULL,
ALTER COLUMN "university_name" SET NOT NULL,
ALTER COLUMN "university_year" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
