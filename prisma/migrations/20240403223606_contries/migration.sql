-- CreateTable
CREATE TABLE "Contries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Contries_id_key" ON "Contries"("id");
