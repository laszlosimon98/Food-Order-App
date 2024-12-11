/*
  Warnings:

  - Added the required column `isSpecialOffer` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialPrice` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Reviews" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "food_id" INTEGER,
    CONSTRAINT "Reviews_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food" ("food_id") ON DELETE SET NULL ON UPDATE CASCADE
);

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
    CONSTRAINT "Food_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Food" ("category_id", "createdAt", "description", "food_id", "is_spice", "is_vegetarian", "name", "price", "updatedAt") SELECT "category_id", "createdAt", "description", "food_id", "is_spice", "is_vegetarian", "name", "price", "updatedAt" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
