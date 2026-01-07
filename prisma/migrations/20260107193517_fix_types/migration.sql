/*
  Warnings:

  - The values [TEXT,LONG_TEXT,EMAIL,NUMBER,RADIO,CHECKBOX,DROPDOWN,DATE] on the enum `FormFieldType` will be removed. If these variants are still used in the database, this will fail.
  - The `options` column on the `FormField` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FormFieldType_new" AS ENUM ('text', 'longtext', 'email', 'number', 'radio', 'checkbox', 'dropdown', 'date');
ALTER TABLE "FormField" ALTER COLUMN "type" TYPE "FormFieldType_new" USING ("type"::text::"FormFieldType_new");
ALTER TYPE "FormFieldType" RENAME TO "FormFieldType_old";
ALTER TYPE "FormFieldType_new" RENAME TO "FormFieldType";
DROP TYPE "public"."FormFieldType_old";
COMMIT;

-- AlterTable
ALTER TABLE "FormField" DROP COLUMN "options",
ADD COLUMN     "options" TEXT[];
