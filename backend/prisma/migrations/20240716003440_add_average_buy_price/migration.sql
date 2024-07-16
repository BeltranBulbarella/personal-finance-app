/*
  Warnings:

  - Added the required column `averageBuyPrice` to the `Holding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Holding" ADD COLUMN     "averageBuyPrice" DOUBLE PRECISION NOT NULL;
