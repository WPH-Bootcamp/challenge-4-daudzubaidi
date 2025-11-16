/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 * 
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
  console.log('\n--- Tambah Siswa Baru ---');

  try {
    // Minta input dari user
    const id = readlineSync.question('Masukkan ID Siswa: ');

    // Validasi ID tidak boleh kosong
    if (!id || id.trim() === '') {
      console.log('Error: ID tidak boleh kosong!');
      return;
    }

    const name = readlineSync.question('Masukkan Nama Siswa: ');

    // Validasi nama tidak boleh kosong
    if (!name || name.trim() === '') {
      console.log('Error: Nama tidak boleh kosong!');
      return;
    }

    const studentClass = readlineSync.question('Masukkan Kelas: ');

    // Validasi kelas tidak boleh kosong
    if (!studentClass || studentClass.trim() === '') {
      console.log('Error: Kelas tidak boleh kosong!');
      return;
    }

    // Buat object Student baru
    const student = new Student(id, name, studentClass);

    // Tambahkan ke manager
    const success = manager.addStudent(student);

    if (success) {
      console.log('\nSiswa berhasil ditambahkan!');
    } else {
      console.log('\nError: ID sudah digunakan oleh siswa lain!');
    }
  } catch (error) {
    console.log(`\nError: ${error.message}`);
  }
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  console.log('\n--- Daftar Semua Siswa ---');
  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  console.log('\n--- Cari Siswa ---');

  const id = readlineSync.question('Masukkan ID Siswa yang dicari: ');

  const student = manager.findStudent(id);

  if (student) {
    console.log('\nSiswa ditemukan:');
    student.displayInfo();
  } else {
    console.log('\nSiswa dengan ID tersebut tidak ditemukan.');
  }
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  console.log('\n--- Update Data Siswa ---');

  const id = readlineSync.question('Masukkan ID Siswa yang akan diupdate: ');

  const student = manager.findStudent(id);

  if (!student) {
    console.log('\nSiswa dengan ID tersebut tidak ditemukan.');
    return;
  }

  console.log('\nData siswa saat ini:');
  student.displayInfo();

  console.log('\nMasukkan data baru (tekan Enter jika tidak ingin mengubah):');

  const newName = readlineSync.question(`Nama baru (${student.name}): `);
  const newClass = readlineSync.question(`Kelas baru (${student.class}): `);

  const updateData = {};

  if (newName && newName.trim() !== '') {
    updateData.name = newName;
  }

  if (newClass && newClass.trim() !== '') {
    updateData.class = newClass;
  }

  if (Object.keys(updateData).length === 0) {
    console.log('\nTidak ada perubahan data.');
    return;
  }

  const success = manager.updateStudent(id, updateData);

  if (success) {
    console.log('\nData siswa berhasil diupdate!');
  } else {
    console.log('\nGagal mengupdate data siswa.');
  }
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  console.log('\n--- Hapus Siswa ---');

  const id = readlineSync.question('Masukkan ID Siswa yang akan dihapus: ');

  const student = manager.findStudent(id);

  if (!student) {
    console.log('\nSiswa dengan ID tersebut tidak ditemukan.');
    return;
  }

  console.log('\nData siswa yang akan dihapus:');
  student.displayInfo();

  const confirm = readlineSync.question('\nApakah Anda yakin ingin menghapus siswa ini? (y/n): ');

  if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
    const success = manager.removeStudent(id);

    if (success) {
      console.log('\nSiswa berhasil dihapus!');
    } else {
      console.log('\nGagal menghapus siswa.');
    }
  } else {
    console.log('\nPenghapusan dibatalkan.');
  }
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  console.log('\n--- Tambah Nilai Siswa ---');

  const id = readlineSync.question('Masukkan ID Siswa: ');

  const student = manager.findStudent(id);

  if (!student) {
    console.log('\nSiswa dengan ID tersebut tidak ditemukan.');
    return;
  }

  console.log('\nData siswa:');
  student.displayInfo();

  try {
    const subject = readlineSync.question('\nMasukkan Mata Pelajaran: ');
    const scoreInput = readlineSync.question('Masukkan Nilai (0-100): ');

    // Konversi score ke number
    const score = parseFloat(scoreInput);

    // Validasi score adalah angka
    if (isNaN(score)) {
      console.log('\nError: Nilai harus berupa angka!');
      return;
    }

    // Tambahkan nilai
    student.addGrade(subject, score);

    console.log('\nNilai berhasil ditambahkan!');
    console.log('\nData siswa setelah update:');
    student.displayInfo();
  } catch (error) {
    console.log(`\nError: ${error.message}`);
  }
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  console.log('\n--- Top 3 Siswa ---');

  const topStudents = manager.getTopStudents(3);

  if (topStudents.length === 0) {
    console.log('\nBelum ada siswa terdaftar.');
    return;
  }

  console.log(`\nMenampilkan ${topStudents.length} siswa dengan rata-rata tertinggi:\n`);

  topStudents.forEach((student, index) => {
    console.log(`\n${index + 1}. Peringkat #${index + 1}`);
    student.displayInfo();
  });
}

/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');

  let running = true;

  while (running) {
    // Tampilkan menu
    displayMenu();

    // Baca pilihan user
    const choice = readlineSync.question('\nPilih menu (1-8): ');

    // Jalankan action sesuai pilihan
    switch (choice) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        running = false;
        break;
      default:
        console.log('\nPilihan tidak valid! Silakan pilih menu 1-8.');
    }

    // Pause sebelum kembali ke menu (kecuali pilih keluar)
    if (running && choice >= '1' && choice <= '7') {
      readlineSync.question('\nTekan Enter untuk kembali ke menu...');
    }
  }

  console.log('\nTerima kasih telah menggunakan aplikasi ini!');
}

// Jalankan aplikasi
main();
