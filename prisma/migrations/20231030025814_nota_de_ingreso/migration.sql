-- CreateTable
CREATE TABLE "NotaIngreso" (
    "id" SERIAL NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "proveedor" VARCHAR(50) NOT NULL,

    CONSTRAINT "NotaIngreso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetalleIngreso" (
    "libroId" INTEGER NOT NULL,
    "notaId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "DetalleIngreso_pkey" PRIMARY KEY ("libroId")
);

-- AddForeignKey
ALTER TABLE "DetalleIngreso" ADD CONSTRAINT "DetalleIngreso_libroId_fkey" FOREIGN KEY ("libroId") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleIngreso" ADD CONSTRAINT "DetalleIngreso_notaId_fkey" FOREIGN KEY ("notaId") REFERENCES "NotaIngreso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
