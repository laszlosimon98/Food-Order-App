/*
  Warnings:

  - The primary key for the `Reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `reviews_id` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reviews" (
    "reviews_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "food_id" INTEGER,
    "user_id" INTEGER,
    CONSTRAINT "Reviews_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food" ("food_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Reviews" ("createdAt", "food_id", "message", "rating", "updatedAt") SELECT "createdAt", "food_id", "message", "rating", "updatedAt" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
