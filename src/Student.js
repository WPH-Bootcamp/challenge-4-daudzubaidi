/**
 * Class Student
 * Representasi dari seorang siswa dengan data dan nilai-nilainya
 * 
 * TODO: Implementasikan class Student dengan:
 * - Constructor untuk inisialisasi properti (id, name, class, grades)
 * - Method addGrade(subject, score) untuk menambah nilai mata pelajaran
 * - Method getAverage() untuk menghitung rata-rata nilai
 * - Method getGradeStatus() untuk menentukan status Lulus/Tidak Lulus
 * - Method displayInfo() untuk menampilkan informasi siswa
 * 
 * Kriteria Lulus: rata-rata >= 75
 */

class Student {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - id: ID unik siswa
  // - name: Nama siswa
  // - class: Kelas siswa
  // - grades: Object untuk menyimpan nilai {subject: score}
  
  constructor(id, name, studentClass) {
    this.id = id;
    this.name = name;
    this.class = studentClass;
    this.grades = {}; // Object untuk menyimpan nilai {subject: score}
  }

  /**
   * Menambah atau update nilai mata pelajaran
   * @param {string} subject - Nama mata pelajaran
   * @param {number} score - Nilai (0-100)
   * TODO: Validasi bahwa score harus antara 0-100
   */
  addGrade(subject, score) {
    // Validasi score harus antara 0-100
    if (typeof score !== 'number' || score < 0 || score > 100) {
      throw new Error('Nilai harus berupa angka antara 0-100');
    }

    // Validasi subject tidak boleh kosong
    if (!subject || subject.trim() === '') {
      throw new Error('Nama mata pelajaran tidak boleh kosong');
    }

    this.grades[subject] = score;
  }

  /**
   * Menghitung rata-rata nilai dari semua mata pelajaran
   * @returns {number} Rata-rata nilai
   * TODO: Hitung total nilai dibagi jumlah mata pelajaran
   */
  getAverage() {
    const subjects = Object.keys(this.grades);

    // Jika tidak ada nilai, return 0
    if (subjects.length === 0) {
      return 0;
    }

    // Hitung total nilai
    const total = subjects.reduce((sum, subject) => sum + this.grades[subject], 0);

    // Return rata-rata dengan 2 desimal
    return parseFloat((total / subjects.length).toFixed(2));
  }

  /**
   * Menentukan status kelulusan siswa
   * @returns {string} "Lulus" atau "Tidak Lulus"
   * TODO: Return "Lulus" jika rata-rata >= 75, selain itu "Tidak Lulus"
   */
  getGradeStatus() {
    const average = this.getAverage();
    return average >= 75 ? 'Lulus' : 'Tidak Lulus';
  }

  /**
   * Menampilkan informasi lengkap siswa
   * TODO: Tampilkan ID, Nama, Kelas, semua nilai, rata-rata, dan status
   */
  displayInfo() {
    console.log(`\nID: ${this.id}`);
    console.log(`Nama: ${this.name}`);
    console.log(`Kelas: ${this.class}`);

    const subjects = Object.keys(this.grades);
    if (subjects.length > 0) {
      console.log('Mata Pelajaran:');
      subjects.forEach(subject => {
        console.log(`  - ${subject}: ${this.grades[subject]}`);
      });
      console.log(`Rata-rata: ${this.getAverage()}`);
      console.log(`Status: ${this.getGradeStatus()}`);
    } else {
      console.log('Belum ada nilai');
    }

    console.log('------------------------');
  }
}

export default Student;
