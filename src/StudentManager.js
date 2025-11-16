/**
 * Class StudentManager
 * Mengelola koleksi siswa dan operasi-operasi terkait
 * 
 * TODO: Implementasikan class StudentManager dengan:
 * - Constructor untuk inisialisasi array students
 * - Method addStudent(student) untuk menambah siswa
 * - Method removeStudent(id) untuk menghapus siswa
 * - Method findStudent(id) untuk mencari siswa
 * - Method updateStudent(id, data) untuk update data siswa
 * - Method getAllStudents() untuk mendapatkan semua siswa
 * - Method getTopStudents(n) untuk mendapatkan top n siswa
 * - Method displayAllStudents() untuk menampilkan semua siswa
 */

class StudentManager {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - students: Array untuk menyimpan semua siswa
  
  constructor() {
    this.students = []; // Array untuk menyimpan semua siswa
  }

  /**
   * Menambah siswa baru ke dalam sistem
   * @param {Student} student - Object Student yang akan ditambahkan
   * @returns {boolean} true jika berhasil, false jika ID sudah ada
   * TODO: Validasi bahwa ID belum digunakan
   */
  addStudent(student) {
    // Validasi bahwa ID belum digunakan
    const existingStudent = this.findStudent(student.id);
    if (existingStudent) {
      return false; // ID sudah ada
    }

    this.students.push(student);
    return true; // Berhasil ditambahkan
  }

  /**
   * Menghapus siswa berdasarkan ID
   * @param {string} id - ID siswa yang akan dihapus
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari dan hapus siswa dari array
   */
  removeStudent(id) {
    const initialLength = this.students.length;
    this.students = this.students.filter(student => student.id !== id);

    // Return true jika ada siswa yang dihapus
    return this.students.length < initialLength;
  }

  /**
   * Mencari siswa berdasarkan ID
   * @param {string} id - ID siswa yang dicari
   * @returns {Student|null} Object Student jika ditemukan, null jika tidak
   * TODO: Gunakan method array untuk mencari siswa
   */
  findStudent(id) {
    return this.students.find(student => student.id === id) || null;
  }

  /**
   * Update data siswa
   * @param {string} id - ID siswa yang akan diupdate
   * @param {object} data - Data baru (name, class, dll)
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari siswa dan update propertinya
   */
  updateStudent(id, data) {
    const student = this.findStudent(id);

    if (!student) {
      return false; // Siswa tidak ditemukan
    }

    // Update properti yang ada di data
    if (data.name !== undefined) student.name = data.name;
    if (data.class !== undefined) student.class = data.class;

    return true; // Berhasil diupdate
  }

  /**
   * Mendapatkan semua siswa
   * @returns {Array} Array berisi semua siswa
   */
  getAllStudents() {
    return this.students;
  }

  /**
   * Mendapatkan top n siswa berdasarkan rata-rata nilai
   * @param {number} n - Jumlah siswa yang ingin didapatkan
   * @returns {Array} Array berisi top n siswa
   * TODO: Sort siswa berdasarkan rata-rata (descending) dan ambil n teratas
   */
  getTopStudents(n) {
    // Sort siswa berdasarkan rata-rata (descending)
    return this.students
      .slice() // Copy array untuk tidak mengubah original
      .sort((a, b) => b.getAverage() - a.getAverage())
      .slice(0, n); // Ambil n teratas
  }

  /**
   * Menampilkan informasi semua siswa
   * TODO: Loop semua siswa dan panggil displayInfo() untuk masing-masing
   */
  displayAllStudents() {
    if (this.students.length === 0) {
      console.log('\nBelum ada siswa terdaftar.');
      return;
    }

    console.log(`\n=== DAFTAR SISWA (${this.students.length} siswa) ===`);
    this.students.forEach(student => {
      student.displayInfo();
    });
  }

  /**
   * BONUS: Mendapatkan siswa berdasarkan kelas
   * @param {string} className - Nama kelas
   * @returns {Array} Array siswa dalam kelas tersebut
   */
  getStudentsByClass(className) {
    return this.students.filter(student => student.class === className);
  }

  /**
   * BONUS: Mendapatkan statistik kelas
   * @param {string} className - Nama kelas
   * @returns {object} Object berisi statistik (jumlah siswa, rata-rata kelas, dll)
   */
  getClassStatistics(className) {
    const classStudents = this.getStudentsByClass(className);

    if (classStudents.length === 0) {
      return null;
    }

    const totalAverage = classStudents.reduce((sum, student) => sum + student.getAverage(), 0);
    const classAverage = totalAverage / classStudents.length;

    const passedCount = classStudents.filter(student => student.getGradeStatus() === 'Lulus').length;

    return {
      jumlahSiswa: classStudents.length,
      rataRataKelas: parseFloat(classAverage.toFixed(2)),
      jumlahLulus: passedCount,
      jumlahTidakLulus: classStudents.length - passedCount,
      persenLulus: parseFloat(((passedCount / classStudents.length) * 100).toFixed(2))
    };
  }
}

export default StudentManager;
