/*
  Warnings:

  - The `status` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `reg_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "reg_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT[];

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_reg_id_fkey" FOREIGN KEY ("reg_id") REFERENCES "Registration"("reg_id") ON DELETE CASCADE ON UPDATE CASCADE;
