-- CreateTable
CREATE TABLE "Address" (
    "add_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "add_updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "add_id" TEXT NOT NULL,
    "add_bairro" TEXT NOT NULL,
    "add_cidade" TEXT NOT NULL,
    "add_uf" TEXT NOT NULL,
    "add_cep" TEXT NOT NULL,
    "add_number" TEXT NOT NULL,
    "add_rua" TEXT NOT NULL,
    "add_comp" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("add_id")
);

-- CreateTable
CREATE TABLE "Congregation" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "con_id" TEXT NOT NULL,
    "con_name" TEXT NOT NULL,
    "end_id" TEXT NOT NULL,

    CONSTRAINT "Congregation_pkey" PRIMARY KEY ("con_id")
);

-- CreateTable
CREATE TABLE "User" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_data_nasc" TIMESTAMP(3) NOT NULL,
    "user_bio" TEXT NOT NULL,
    "end_id" TEXT NOT NULL,
    "user_cpf" TEXT NOT NULL,
    "user_foto_url" TEXT,
    "user_email" TEXT NOT NULL,
    "user_tel" TEXT NOT NULL,
    "user_senha" TEXT NOT NULL,
    "con_id" TEXT NOT NULL,
    "user_tipo" TEXT NOT NULL,
    "user_point" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "News" (
    "new_id" TEXT NOT NULL,
    "new_title" TEXT NOT NULL,
    "new_content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "new_icon" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("new_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "eve_id" TEXT NOT NULL,
    "eve_name" TEXT NOT NULL,
    "eve_date" TIMESTAMP(3) NOT NULL,
    "eve_desc" TEXT NOT NULL,
    "eve_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "eve_point" INTEGER NOT NULL DEFAULT 0,
    "eve_start" TIMESTAMP(3) NOT NULL,
    "eve_participants" INTEGER NOT NULL DEFAULT 0,
    "eve_max_participants" INTEGER NOT NULL,
    "eve_icon" TEXT NOT NULL,
    "end_id" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eve_id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "reg_id" TEXT NOT NULL,
    "eve_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reg_remain_value" DOUBLE PRECISION NOT NULL,
    "reg_term_url" TEXT NOT NULL,
    "reg_is_valid" BOOLEAN NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("reg_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_cpf_key" ON "User"("user_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_tel_key" ON "User"("user_tel");

-- AddForeignKey
ALTER TABLE "Congregation" ADD CONSTRAINT "Congregation_end_id_fkey" FOREIGN KEY ("end_id") REFERENCES "Address"("add_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_end_id_fkey" FOREIGN KEY ("end_id") REFERENCES "Address"("add_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_con_id_fkey" FOREIGN KEY ("con_id") REFERENCES "Congregation"("con_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_end_id_fkey" FOREIGN KEY ("end_id") REFERENCES "Address"("add_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_eve_id_fkey" FOREIGN KEY ("eve_id") REFERENCES "Event"("eve_id") ON DELETE CASCADE ON UPDATE CASCADE;
