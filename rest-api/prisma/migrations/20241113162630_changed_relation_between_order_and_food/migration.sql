/*
  Warnings:

  - You are about to drop the column `order_id` on the `Food` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_FoodToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FoodToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Food" ("food_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FoodToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order" ("order_id") ON DELETE CASCADE ON UPDATE CASCADE
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
    CONSTRAINT "Food_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Food" ("category_id", "createdAt", "description", "food_id", "is_spice", "is_vegetarian", "name", "price", "updatedAt") SELECT "category_id", "createdAt", "description", "food_id", "is_spice", "is_vegetarian", "name", "price", "updatedAt" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToOrder_AB_unique" ON "_FoodToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToOrder_B_index" ON "_FoodToOrder"("B");
