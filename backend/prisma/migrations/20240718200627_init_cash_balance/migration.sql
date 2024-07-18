-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_assetId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "assetId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cashBalance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
