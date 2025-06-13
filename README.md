
# PusQue

📌 **PusQue** PusQue (Patient Queue System) adalah aplikasi sistem antrean pasien berbasis web/mobile yang dikembangkan sebagai proyek Capstone oleh Team CC25‑CF249. Sistem ini mendukung registrasi pasien, pemrosesan antrean di poli, dan prediksi waktu pelayanan menggunakan machine learning.
PusQue dikembangkan untuk mengatasi permasalahan dalam proses pendaftaran pasien di puskesmas. Berdasarkan wawancara dengan tenaga medis di beberapa puskesmas, ditemukan bahwa pendaftaran pasien untuk layanan poli masih dilakukan secara manual. Hal ini menyebabkan antrean yang panjang, ketidakjelasan waktu pelayanan, serta beban administratif yang tinggi bagi petugas puskesmas.
Untuk mengatasi masalah tersebut, kami merancang PusQue, sebuah sistem berbasis web yang memungkinkan pasien untuk mendaftar secara daring tanpa perlu datang langsung ke puskesmas. Sistem ini memberikan estimasi waktu antrean, memberi gambaran jelas kepada pasien mengenai waktu pemeriksaan. Selain itu, PusQue dilengkapi dengan fitur pemantauan antrian secara real-time dan chatbot sederhana yang siap menjawab pertanyaan dasar mengenai layanan puskesmas. 
---

## 🚀 Daftar Isi

1. [Deskripsi Projek](#deskripsi-projek)  
2. [Fitur Utama](#fitur-utama)  
3. [Arsitektur & Struktur Repo](#arsitektur--struktur-repo)  
4. [Teknologi Digunakan](#teknologi-digunakan)  
5. [Instalasi & Setup](#instalasi--setup)  
    - Backend  
    - Frontend  
    - Model ML  
6. [Menjalankan Aplikasi](#menjalankan-aplikasi)  
7. [Endpoints API](#endpoints-api)  
8. [Menambahkan Fitur ML](#menambahkan-fitur-ml)  
9. [Contoh Penggunaan](#contoh-penggunaan)  
10. [Kontributor](#kontributor)  
11. [Lisensi](#lisensi)  

---

## Deskripsi Projek
PusQue - Sistem Antrian Digital dan Pemantauan Real-Time Puskesmas dengan Chatbot Sederhana
PusQue adalah aplikasi antrean pasien berbasis web/mobile yang dirancang untuk mempermudah pendaftaran pasien di puskesmas, mengurangi waktu tunggu, dan meningkatkan efisiensi proses antrean. Aplikasi ini terdiri dari beberapa komponen utama:
- UI Frontend untuk Staf dan Pasien: Antarmuka pengguna yang dirancang untuk mempermudah pendaftaran pasien, memonitor antrean, dan memberikan informasi terkait waktu estimasi pelayanan. Staf medis juga dapat mengelola antrean dan memantau status pasien secara real-time. Berikut merupakanrancangan UI yang dibuat di figma: [PusQue Figma](https://www.figma.com/design/rI6WuaNEoB631a76Kcx9tw/PusQue?node-id=0-1&t=SHnKT9SLAEBCirxQ-1)
- Backend API (Flask): Server yang menangani semua permintaan dari frontend, menyimpan data pasien, antrean, dan mengelola prediksi waktu pelayanan. API ini juga menyediakan berbagai endpoint untuk integrasi dan pengolahan data.
- Sistem Prediksi Waktu Pelayanan Poli menggunakan Machine Learning: Model prediksi yang menggunakan algoritma machine learning untuk menghitung estimasi waktu pelayanan pasien berdasarkan data historis. Ini membantu pasien untuk mengetahui kapan mereka akan dilayani dan memberikan perkiraan waktu yang lebih akurat.
Solusi ini dirancang untuk mengurangi waktu tunggu pasien dan memudahkan pengelompokan antrean di berbagai poli.

---

## Fitur Utama

- 📋 Registrasi Pasien dan Tambah Antrean
Halaman registrasi ini merupakan bagian penting dari aplikasi PusQue, di mana pengguna diminta untuk membuat akun. Pada halaman ini, pengguna akan mengisi beberapa informasi pribadi, seperti:
    - Nama lengkap
    - NIK (Nomor Induk Kependudukan)
    - Tanggal lahir
    - Domisili
    - Membuat password dan konfirmasi password
    - Mengunggah foto KTP
- 🏥 Kelola antrean per poli (e.g. Poliklinik Umum, Gigi, dll)  
Halaman ini menampilkan sistem antrean di puskesmas. Pasien yang telah terdaftar akan mendapatkan nomor antrean untuk masing-masing poli, seperti:
    - Poliklinik Umum: Poli yang menangani layanan kesehatan umum.
    - Poliklinik Gigi: Poli yang menangani perawatan dan pemeriksaan kesehatan gigi.
    - Poliklinik Anak: Poli yang menyediakan layanan kesehatan bagi anak-anak.
    - Poliklinik Kandungan: Poli yang menyediakan layanan kesehatan untuk ibu hamil dan perawatan kandungan.
- ⏱️ Prediksi estimasi waktu pelayanan pasien berbasis historis  
Sistem menggunakan data historis untuk memprediksi estimasi waktu pelayanan bagi pasien di puskesmas. Berdasarkan antrean sebelumnya dan waktu yang diperlukan untuk melayani pasien di berbagai poli, sistem ini memberikan perkiraan waktu yang lebih akurat.
Model prediksi ini dilatih menggunakan machine learning dengan pendekatan neural network menggunakan TensorFlow. Dengan menggunakan algoritma jaringan saraf tiruan (neural network), sistem dapat mengenali pola dalam data historis, seperti jumlah pasien, jenis pelayanan, waktu tunggu sebelumnya, dan faktor lainnya, untuk menghitung estimasi waktu yang lebih tepat.
TensorFlow, sebagai framework machine learning yang kuat, digunakan untuk melatih model dengan dataset yang berisi data historis dari berbagai poli. Model ini terus diperbarui dan ditingkatkan berdasarkan data yang masuk, sehingga kemampuan prediksi sistem semakin akurat dari waktu ke waktu.
- 🔁 API modular untuk integrasi frontend dan model ML 
API yang dikembangkan menggunakan Flask menyediakan endpoint untuk menghubungkan frontend aplikasi dengan sistem backend dan model machine learning. API ini dirancang untuk memastikan bahwa data yang diperlukan dari frontend (seperti data pasien dan antrean) dapat dengan mudah diproses dan digunakan untuk menghasilkan prediksi yang akurat melalui model machine learning yang telah dilatih.
- 🗄️ Penyimpanan data antrean dan histori di backend
Semua data pasien, antrean, dan histori pelayanan akan disimpan dengan aman di backend. Penyimpanan ini tidak hanya mencakup informasi dasar pasien, tetapi juga data antrean dan prediksi waktu yang digunakan untuk keperluan analisis dan perbaikan sistem. Dengan menyimpan histori data ini, PusQue dapat lebih mudah untuk memantau dan mengevaluasi kinerja sistem antrean dan memberikan wawasan yang berguna untuk pengambilan keputusan.
---

## Arsitektur & Struktur Repo

├── PusQue-PrediksiSelesaipoli_ML/   # File model ML dan dataset untuk prediksi antrean
├── PusQue_PrediksiWaktuMasuk/       # Foile model ML dan dataset prediksi waktu masuk pasien
├── backend/                        # API server (Flask)
├── flaskOCR/                       # Modul OCR tambahan (opsional)
├── frontend/                       # User interface (web/mobile)
├── model/                          # Dataset & artefak training untuk model ML
├── serverML/                       # Server khusus untuk menjalankan model ML (Flask)
└── reuest.rest                     # File untuk update database (nik, role, dll)

Penjelasan Folder:
- PusQue-PrediksiSelesaipoli_ML: Menyimpan file terkait prediksi untuk waktu selesai pasien berdasarkan model machine learning dan dataset yang digunakan.
- PusQue_PrediksiWaktuMasuk: Menyimpan file terkait prediksi  untuk waktu masuk pasien ke poli berdasarkan model machine learning dan dataset yang digunakan.
- backend/: Berisi API server yang menggunakan Flask untuk mengelola permintaan dari frontend dan menghubungkannya dengan backend serta model ML.
- flaskOCR/: Menyediakan modul tambahan untuk Optical Character Recognition (OCR), yang dapat digunakan untuk membaca data dari gambar, misalnya untuk membaca data KTP.
- frontend/: Antarmuka pengguna (UI) aplikasi berbasis web atau mobile untuk pasien dan staf medis.
- model/: Folder ini menyimpan dataset dan artefak pelatihan untuk model machine learning yang digunakan untuk prediksi.
- serverML/: Menyediakan server berbasis Flask yang bertanggung jawab menjalankan dan memberikan prediksi menggunakan model ML.
- reuest.rest: Berfungsi untuk memperbarui database, termasuk data terkait nomor induk kependudukan (nik), role pengguna, dan lainnya.
---
## Teknologi Digunakan
- **Backend/API**:
    - Python, Flask: Framework backend untuk membangun API yang menghubungkan frontend dengan model ML.
    - Node.js, Express.js: Digunakan untuk REST API, mengelola rute dan komunikasi antara frontend dan database.
    - Sequelize: ORM (Object-Relational Mapping) untuk database SQL, memungkinkan interaksi dengan database menggunakan model JavaScript.
    - Middleware:
        - dotenv: Digunakan untuk mengelola variabel lingkungan (environment variables).
        - cookie-parser: Untuk mem-parsing cookie di server.
       - cors: Untuk menangani CORS (Cross-Origin Resource Sharing), memungkinkan komunikasi lintas domain di aplikasi.

- **ML & Training**:
Prediksi Waktu Masuk & Keluar Pasien:
    - IPython: Digunakan untuk menjalankan notebook interaktif di lingkungan pengembangan.
    - pandas: Untuk manipulasi dan analisis data (misalnya, dataset pasien dan antrean).
    - numpy: Untuk komputasi numerik dan manipulasi array.
    - tensorflow: Untuk membangun dan melatih model neural network untuk prediksi waktu.
    - tensorflow.keras.models: Untuk memuat dan mengelola model deep learning.
    - tensorflow.keras.layers: Untuk mendefinisikan layer dalam model neural network.
    - tensorflow.keras.callbacks: Untuk menambahkan callback dalam training model (misalnya, early stopping).
    - sklearn.model_selection: Untuk melakukan pembagian data dan cross-validation.
    - sklearn.preprocessing: Untuk preprocessing data, seperti normalisasi dan encoding.
    - sklearn.metrics: Untuk mengevaluasi kinerja model (misalnya, akurasi, mean squared error).
    - matplotlib.pyplot & seaborn: Untuk visualisasi data dan hasil model.
    - google.colab.files: Untuk bekerja dengan file di Google Colab.
    - os, shutil, zipfile: Untuk manipulasi file dan direktori.
    - json: Untuk bekerja dengan data dalam format JSON.
    - joblib: Untuk menyimpan dan memuat model machine learning.
    - tensorflowjs: Untuk mengekspor model TensorFlow ke format yang dapat digunakan di aplikasi berbasis JavaScript.
- **Chatbot (ML)**:
    - flask: Framework untuk membangun API backend chatbot.
    - scikit-learn: Digunakan untuk membangun model machine learning yang digunakan dalam chatbot.
    - joblib: Untuk memuat dan menyimpan model yang digunakan oleh chatbot.
    - requests: Untuk melakukan permintaan HTTP (misalnya, mengambil data dari API eksternal).
    - cv2: Untuk memproses gambar (misalnya, deteksi wajah atau teks di gambar).
    - easyocr: Untuk mengenali teks dalam gambar menggunakan Optical Character Recognition (OCR).
    - difflib: Untuk membandingkan dan mencocokkan teks dalam percakapan dengan pengguna.
- **Frontend**:
    - HTML, CSS, JavaScript: Untuk membangun antarmuka pengguna (UI) aplikasi berbasis web atau mobile.
    - Node.js, Express.js: Digunakan untuk REST API, menangani permintaan HTTP dari frontend ke backend.
- **OCR (Opsional)**:
flaskOCR/: Modul OCR untuk memproses gambar dan mengenali teks (misalnya, untuk memverifikasi foto KTP yang diunggah oleh pasien). Fitur ini opsional, tetapi berguna jika aplikasi memerlukan pemrosesan dokumen.
- **Virtual Env**:
venv atau pipenv: Untuk membuat virtual environment dalam Python, memastikan bahwa proyek memiliki lingkungan yang terisolasi dengan dependensi yang sesuai, dan menghindari konflik dengan sistem Python global.
---

## Instalasi & Setup
Pastikan sudah install Python 3.8+ dan pip.
### 🧩 Backend API
- Masuk ke direktori backend:
```bash
cd backend
```
- Buat virtual environment:
``` bash 
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```
- Instal dependensi:
``` bash
pip install -r requirements.txt
```

### 🧩 Frontend
- Masuk ke direktori frontend:
```bash
cd frontend
```
- Instal dependensi frontend:
``` bash
npm install
``` 
- Jalankan frontend:
``` bash
npm run start
```

### 🧩 Model ML & Server
- Masuk ke direktori serverML:
```bash
cd serverML
```
- Buat virtual environment untuk server ML:
```bash
python3 -m venv venv
source venv/bin/activate
```
- Instal dependensi untuk model ML:
``` bash
pip install -r requirements.txt
```
- Unzip model prediksi:
``` bash
unzip ../PusQue_prediksi_masuk_poli.zip -d ./model
```
---
## Menjalankan Aplikasi
### 🧩 Jalankan Model ML
- Masuk ke direktori serverML:
```bash
cd serverML
```
- Aktifkan virtual environment:
```bash
source venv/bin/activate
```
- Jalankan model ML:
```bash
python serverML.py
```
### 🧩 Jalankan Backend API
- Masuk ke direktori backend:
```bash
cd backend
```
- Aktifkan virtual environment:
```bash
source venv/bin/activate
```
- Jalankan backend:
```bash
python app.py
```

### 🧩 Jalankan Frontend
- Masuk ke direktori frontend:
```bash
cd frontend
```
- Jalankan frontend:
```bash
npm start
```
---

## Endpoints API
### Backend (`/backend`)

| Method | Path            | Deskripsi                              |
|--------|------------------|----------------------------------------|
| GET    | /api/patients    | Daftar pasien & antrean               |
| POST   | /api/patient     | Tambah pasien/antrean baru            |
| GET    | /api/polyclinics | Daftar poli tersedia                  |
| POST   | /api/predict     | Prediksi estimasi waktu dari data     |

### ML Server (`/serverML`)

| Method | Path            | Deskripsi                              |
|--------|------------------|----------------------------------------|
| POST   | /predict_finish  | Input data pasien → output prediksi    |
| GET    | /health          | Cek server ML aktif                    |

---

## Menambahkan Fitur ML
1. Tambahkan dataset di \`model/data.csv\`  
2. Jalankan training:
```bash
cd model
python train_model.py
```

3. Simpan model ke \`model.pkl\` dan deploy ke \`serverML/model/\`  
4. Update endpoint \`/predict_finish\` jika perlu

---

## Contoh Penggunaan
- Admin mendaftarkan pasien setelah input data  
- Backend menyimpan dan panggil ML untuk estimasi waktu  
- Pasien diberi nomor antrean & estimasi waktu selesai  
- Staf poli melihat antrean via frontend dan memproses satu per satu

---

## Kontributor
Tim CC25‑CF249 :
- Audy Nadira Ramadanti – ML Engineer, Universitas Brawijaya
- Fika Saputri – ML Engineer, Universitas Halu Oleo
- Nira Ayuhana Nurlitha – ML Engineer, Politeknik Negeri Jember
- Muhammad Ilham Akbar – FEBE Engineer, UIN Sultan Syarif Kasim Riau
- Fiqhi Naura – FEBE Engineer, Politeknik Negeri Cilacap
- Akhmad Ramedhon – FEBE Engineer, Universitas Dian Nusantara
---
## Lisensi
[MIT](https://opensource.org/licenses/MIT) © 2025 Team CC25‑CF249
