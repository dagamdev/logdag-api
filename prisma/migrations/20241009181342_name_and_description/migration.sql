/*
  Warnings:

  - Added the required column `name` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" RENAME COLUMN  "content" TO "name";
ALTER TABLE "Log" ADD COLUMN     "content" TEXT;
