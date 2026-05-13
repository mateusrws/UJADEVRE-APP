/*
  Warnings:

  - You are about to drop the column `user_desc` on the `User` table. All the data in the column will be lost.
  - Added the required column `reg_is_valid` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_bio` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "reg_is_valid" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_desc",
ADD COLUMN     "user_bio" TEXT NOT NULL;
