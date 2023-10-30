-- CreateTable
CREATE TABLE "Libro" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "autor" VARCHAR(50) NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "edicion" VARCHAR(50) NOT NULL,
    "fechaLanzamiento" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Libro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Almacen" (
    "id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Almacen_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Almacen" ADD CONSTRAINT "Almacen_id_fkey" FOREIGN KEY ("id") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
