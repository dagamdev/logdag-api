-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_groupId_fkey";

-- AlterTable
ALTER TABLE "Log" ALTER COLUMN "groupId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
