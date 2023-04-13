# Mini Project CRUD Product

# Deskripsi Program
Program ini adalah sebuah aplikasi CRUD sederhana yang digunakan untuk mengelola data produk. Aplikasi ini dibuat menggunakan bahasa pemrograman JavaScript dengan menggunakan framework Express dan database MySQL.

# Fitur
Program ini memiliki beberapa fitur utama, antara lain:

# Menampilkan seluruh data produk
- Menambahkan data produk
- Mengubah data produk
- Menghapus data produk

# Berikut adalah langkah-langkah untuk menggunakan program ini:

# . Pastikan sudah terinstall Node.js dan MySQL
# . Clone repository ini atau download source code program ini
# . Buka terminal atau command prompt, kemudian masuk ke direktori program yang sudah di-clone/download
# . Jalankan perintah npm install untuk menginstall semua package yang dibutuhkan
# . Pastikan MySQL sudah berjalan, kemudian buatlah sebuah database dengan nama mini_project dengan perintah create database mini_project;
# . Pada database mini_project, buatlah sebuah tabel merchant dengan perintah berikut:
  <!-- CREATE TABLE `merchant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(20) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `join_date` date DEFAULT NULL,
  `phone_number` bigint(14) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ; -->
# . Modifikasi kolom name pada tabel merchant menjadi UNIQUE dengan perintah berikut:
<!-- ALTER TABLE `merchant`
# . MODIFY COLUMN `name` VARCHAR(45) DEFAULT NULL UNIQUE; -->
# . Modifikasi kolom phone_number pada tabel merchant menjadi NULL dengan perintah berikut:
sql
<!-- ALTER TABLE `merchant`
MODIFY COLUMN `phone_number` VARCHAR(30)  NULL; -->
# . Pada database mini_project, buatlah sebuah tabel Product dengan perintah berikut:
<!-- CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `Price` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
); -->
# . Modifikasi kolom name pada tabel Product menjadi UNIQUE dengan perintah berikut:
<!-- ALTER TABLE `product`
# . MODIFY COLUMN `name` VARCHAR(45) DEFAULT NULL UNIQUE; -->
# . Modifikasi kolom quantity pada tabel Product menjadi VARCHAR(35) dengan perintah berikut:
<!-- ALTER TABLE `product` MODIFY COLUMN `quantity` varchar(35); -->
# . Konfigurasikan koneksi database pada file config.js
# . Jalankan program dengan perintah npm start
# . Program siap digunakan

# . API Endpoint
GET /: Untuk mendapatkan daftar produk yang ada
POST /upload: Untuk menambahkan produk baru
PUT /upload/edit/:id: Untuk mengedit produk yang sudah ada
DELETE /upload/delete/:id: Untuk menghapus produk

# . Middlewares
auth: Middleware untuk memeriksa otorisasi pengguna. Hanya pengguna yang memiliki hak akses sebagai merchant yang bisa menggunakan API ini.
logs: Middleware untuk mencatat setiap request yang masuk ke dalam sebuah file log dengan format .log.
