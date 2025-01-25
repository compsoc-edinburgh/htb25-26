/*
  Warnings:

  - You are about to drop the column `subscribed` on the `MailingList` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `MailingList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MailingList" DROP COLUMN "subscribed",
DROP COLUMN "updated_at";
