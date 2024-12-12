/*
  Warnings:

  - Added the required column `image` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Made the column `food_id` on table `Reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Food" (
    "food_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "is_spice" BOOLEAN NOT NULL DEFAULT false,
    "is_vegetarian" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "category_id" INTEGER NOT NULL,
    "isSpecialOffer" BOOLEAN NOT NULL,
    "specialPrice" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    CONSTRAINT "Food_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Food" ("category_id", "createdAt", "description", "food_id", "isSpecialOffer", "is_spice", "is_vegetarian", "name", "price", "specialPrice", "updatedAt") SELECT "category_id", "createdAt", "description", "food_id", "isSpecialOffer", "is_spice", "is_vegetarian", "name", "price", "specialPrice", "updatedAt" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");
CREATE TABLE "new_Reviews" (
    "reviews_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "food_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Reviews_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food" ("food_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reviews" ("createdAt", "food_id", "message", "rating", "reviews_id", "updatedAt", "user_id") SELECT "createdAt", "food_id", "message", "rating", "reviews_id", "updatedAt", "user_id" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
