-- CreateTable
CREATE TABLE "public"."Veterinaria" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Veterinaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Veterinarios" (
    "id" SERIAL NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "especialidad" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verterinariaId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Veterinarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cliente" (
    "id" SERIAL NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Mascota" (
    "id" SERIAL NOT NULL,
    "nomber" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raza" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Mascota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Citas" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "motivo" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "mascotaId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Citas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CategoriaMedicamento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "CategoriaMedicamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Medicamento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "fechaCaducidad" TIMESTAMP(3) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "veterinariaId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "Medicamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MedicamentoPrecio" (
    "id" SERIAL NOT NULL,
    "precioCompra" DECIMAL(10,2) NOT NULL,
    "precioVenta" DECIMAL(10,2) NOT NULL,
    "vigente" BOOLEAN NOT NULL DEFAULT true,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medicamentoId" INTEGER NOT NULL,

    CONSTRAINT "MedicamentoPrecio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Receta" (
    "id" SERIAL NOT NULL,
    "citaId" INTEGER NOT NULL,
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Receta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecetaItem" (
    "id" SERIAL NOT NULL,
    "recetaId" INTEGER NOT NULL,
    "medicamentoId" INTEGER NOT NULL,
    "dosis" TEXT NOT NULL,
    "duracion" TEXT NOT NULL,
    "observaciones" TEXT,

    CONSTRAINT "RecetaItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaMedicamento_nombre_key" ON "public"."CategoriaMedicamento"("nombre");

-- AddForeignKey
ALTER TABLE "public"."Veterinaria" ADD CONSTRAINT "Veterinaria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Veterinarios" ADD CONSTRAINT "Veterinarios_verterinariaId_fkey" FOREIGN KEY ("verterinariaId") REFERENCES "public"."Veterinaria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Veterinarios" ADD CONSTRAINT "Veterinarios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cliente" ADD CONSTRAINT "Cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Mascota" ADD CONSTRAINT "Mascota_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Citas" ADD CONSTRAINT "Citas_mascotaId_fkey" FOREIGN KEY ("mascotaId") REFERENCES "public"."Mascota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Citas" ADD CONSTRAINT "Citas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Medicamento" ADD CONSTRAINT "Medicamento_veterinariaId_fkey" FOREIGN KEY ("veterinariaId") REFERENCES "public"."Veterinaria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Medicamento" ADD CONSTRAINT "Medicamento_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."CategoriaMedicamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MedicamentoPrecio" ADD CONSTRAINT "MedicamentoPrecio_medicamentoId_fkey" FOREIGN KEY ("medicamentoId") REFERENCES "public"."Medicamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Receta" ADD CONSTRAINT "Receta_citaId_fkey" FOREIGN KEY ("citaId") REFERENCES "public"."Citas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecetaItem" ADD CONSTRAINT "RecetaItem_recetaId_fkey" FOREIGN KEY ("recetaId") REFERENCES "public"."Receta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecetaItem" ADD CONSTRAINT "RecetaItem_medicamentoId_fkey" FOREIGN KEY ("medicamentoId") REFERENCES "public"."Medicamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
