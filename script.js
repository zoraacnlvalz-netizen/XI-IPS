document.addEventListener('DOMContentLoaded', function() {
    const authWrapper = document.getElementById('authWrapper');
    const websiteContent = document.getElementById('websiteContent');
    const loginFormCard = document.getElementById('loginForm');
    const registerFormCard = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');

    const logoutButton = document.getElementById('logoutButton');
    const loginFormActual = document.getElementById('loginFormActual');
    const loginButton = document.getElementById('loginButton');
    const loadingText = document.getElementById('loadingText');
    
    const createAnnouncementBtn = document.getElementById('createAnnouncementBtn');
    const announcementsList = document.getElementById('announcementsList');
    // Elemen untuk Pengumuman (BARU)
    const announcementModal = document.getElementById('announcementModal');
    const closeAnnouncementModalBtn = announcementModal.querySelector('.close-button');
    const newAnnouncementForm = document.getElementById('newAnnouncementForm');
    const editAnnouncementModal = document.getElementById('editAnnouncementModal'); // BARU
    const closeEditAnnouncementModalBtn = editAnnouncementModal.querySelector('.close-button'); // BARU
    const editAnnouncementForm = document.getElementById('editAnnouncementForm'); // BARU
    const editAnnouncementIndex = document.getElementById('editAnnouncementIndex'); // BARU
    const editAnnouncementTitle = document.getElementById('editAnnouncementTitle'); // BARU
    const editAnnouncementContent = document.getElementById('editAnnouncementContent'); // BARU


    const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
    const uploadPhotoModal = document.getElementById('uploadPhotoModal');
    const closeUploadPhotoModalBtn = uploadPhotoModal.querySelector('.close-button');
    const newPhotoUploadForm = document.getElementById('newPhotoUploadForm');
    const galleryGrid = document.getElementById('galleryGrid');
    // Elemen untuk Galeri (BARU)
    const photoCategorySelect = document.getElementById('photoCategory');
    const addGalleryCategoryBtn = document.getElementById('addGalleryCategoryBtn');
    const addGalleryCategoryModal = document.getElementById('addGalleryCategoryModal');
    const closeAddGalleryCategoryModalBtn = addGalleryCategoryModal.querySelector('.close-button');
    const newGalleryCategoryForm = document.getElementById('newGalleryCategoryForm');
    const newCategoryNameInput = document.getElementById('newCategoryName');
    const galleryCategoryFilter = document.getElementById('galleryCategoryFilter');


    const backgroundMusic = document.getElementById('backgroundMusic');

    const createStudentAccountBtn = document.getElementById('createStudentAccountBtn');
    const createStudentAccountModal = document.getElementById('createStudentAccountModal');
    const closeCreateStudentAccountModalBtn = createStudentAccountModal.querySelector('.close-button');
    const newStudentAccountForm = document.getElementById('newStudentAccountForm');

    const createTeacherAccountBtn = document.getElementById('createTeacherAccountBtn');
    const createTeacherAccountModal = document.getElementById('createTeacherAccountModal');
    const closeCreateTeacherAccountModalBtn = createTeacherAccountModal.querySelector('.close-button');
    const newTeacherAccountForm = document.getElementById('newTeacherAccountForm');

    const customizeWebsiteBtn = document.getElementById('customizeWebsiteBtn');
    const customizeWebsiteModal = document.getElementById('customizeWebsiteModal');
    const closeCustomizeWebsiteModalBtn = customizeWebsiteModal.querySelector('.close-button');
    const backgroundColorInput = document.getElementById('backgroundColor');
    const applyBackgroundColorBtn = document.getElementById('applyBackgroundColor');
    const backgroundImageInput = document.getElementById('backgroundImage');
    const applyBackgroundImageBtn = document.getElementById('applyBackgroundImage');
    const resetBackgroundBtn = document.getElementById('resetBackground');
    const musicSourceSelect = document.getElementById('musicSourceSelect');
    const uploadMusicFileInput = document.getElementById('uploadMusicFile');
    const applyMusicChangesBtn = document.getElementById('applyMusicChanges');
    const toggleMuteMusicBtn = document.getElementById('toggleMuteMusic');


    const viewAccessLogBtn = document.getElementById('viewAccessLogBtn');
    const accessLogModal = document.getElementById('accessLogModal');
    const closeAccessLogModalBtn = accessLogModal.querySelector('.close-button');
    const accessLogContent = document.getElementById('accessLogContent');
    const clearAccessLogBtn = document.getElementById('clearAccessLogBtn');

    const welcomeAnimationText = document.getElementById('welcomeAnimationText');
    const defaultWelcomeText = document.querySelector('.default-welcome-text');

    const registerFormActual = document.getElementById('registerFormActual');

    const editScheduleBtn = document.getElementById('editScheduleBtn');
    const editScheduleModal = document.getElementById('editScheduleModal');
    const closeEditScheduleModalBtn = editScheduleModal.querySelector('.close-button');
    const scheduleEditForm = document.getElementById('scheduleEditForm');
    const selectDay = document.getElementById('selectDay');
    const scheduleTextarea = document.getElementById('scheduleTextarea');
    const currentScheduleGrid = document.getElementById('currentScheduleGrid');


    let isLoggedIn = false;
    let currentUserType = null;

    const validUsers = {
        student: { 'siswa1': 'kelasips' },
        teacher: { 'Manda': 'MANDA123' },
        admin:   { 'Ghery': 'GHERY0987' },
        guest:   { 'pengunjung': 'password' }
    };

    // Data jadwal default (akan dimuat dari localStorage jika ada)
    let classSchedule = {
        'Senin':    ['07:30 - 09:00 | Ekonomi', '09:00 - 10:30 | Geografi', '10:30 - 11:00 | Istirahat', '11:00 - 12:30 | Sosiologi', '12:30 - 14:00 | Bahasa Inggris'],
        'Selasa':   ['07:30 - 09:00 | Sejarah', '09:00 - 10:30 | Matematika', '10:30 - 11:00 | Istirahat', '11:00 - 12:30 | PKn', '12:30 - 14:00 | Seni Budaya'],
        'Rabu':     ['07:30 - 09:00 | Bahasa Indonesia', '09:00 - 10:30 | Penjaskes', '10:30 - 11:00 | Istirahat', '11:00 - 12:30 | Fisika (Lintas Minat)', '12:30 - 14:00 | Bimbingan Konseling'],
        'Kamis':    ['07:30 - 09:00 | Ekonomi', '09:00 - 10:30 | Geografi', '10:30 - 11:00 | Istirahat', '11:00 - 12:30 | Sosiologi', '12:30 - 14:00 | Bahasa Inggris'],
        'Jumat':    ['07:30 - 09:00 | Pendidikan Agama', '09:00 - 10:30 | Sejarah', '10:30 - 11:00 | Istirahat', '11:00 - 12:30 | Prakarya & KWU', '12:30 - 13:00 | Kebersihan Lingkungan']
    };

    // Data pengumuman default (akan dimuat dari localStorage jika ada)
    let announcements = [
        { title: 'Rapat Studi Tour', content: 'Akan diadakan rapat persiapan studi tour pada hari Jumat, 25 Oktober 2025 di ruang kelas.', date: '21 Oktober 2025' },
        { title: 'Jadwal Ujian Ganjil', content: 'Jadwal lengkap ujian semester ganjil dapat diunduh di bagian Dokumen Kelas.', date: '20 Oktober 2025' },
        { title: 'Lomba Kebersihan Kelas', content: 'Mari sukseskan lomba kebersihan antar kelas! Penilaian dimulai minggu depan.', date: '18 Oktober 2025' }
    ];

    // Kategori galeri default (akan dimuat dari localStorage jika ada)
    let galleryCategories = [
        'Momen Kebersamaan Saat Belajar',
        'Kegiatan Bakti Sosial',
        'Keseruan Saat Pentas Seni'
    ];

    // Data galeri default (akan dimuat dari localStorage jika ada)
    let galleryPhotos = [
        { src: 'https://via.placeholder.com/300x200/FFC107/FFFFFF?text=Momen+Kelas+1', caption: 'Momen kebersamaan saat belajar.', category: 'Momen Kebersamaan Saat Belajar' },
        { src: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Momen+Kelas+2', caption: 'Kegiatan bakti sosial.', category: 'Kegiatan Bakti Sosial' },
        { src: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Momen+Kelas+3', caption: 'Keseruan saat pentas seni.', category: 'Keseruan Saat Pentas Seni' }
    ];

    // --- Fungsi Bantuan ---
    function saveSettings() {
        const settings = {
            backgroundColor: document.body.style.backgroundColor,
            backgroundImage: document.body.style.backgroundImage,
            musicSrc: backgroundMusic ? backgroundMusic.src : 'none'
        };
        localStorage.setItem('websiteSettings', JSON.stringify(settings));
    }

    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('websiteSettings'));
        if (settings) {
            if (settings.backgroundColor) {
                document.body.style.backgroundColor = settings.backgroundColor;
            }
            if (settings.backgroundImage) {
                document.body.style.backgroundImage = settings.backgroundImage;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundAttachment = 'fixed';
            }
            if (backgroundMusic && settings.musicSrc && settings.musicSrc !== 'none') {
                if (backgroundMusic.src !== settings.musicSrc) {
                    backgroundMusic.src = settings.musicSrc;
                    backgroundMusic.load();
                }
            } else if (backgroundMusic && settings.musicSrc === 'none') {
                backgroundMusic.pause();
                backgroundMusic.src = '';
            }
        }
    }

    function logAccess(username, userType, status) {
        const timestamp = new Date().toLocaleString('id-ID');
        const logEntry = { timestamp, username, userType, status };
        let logs = JSON.parse(localStorage.getItem('accessLogs')) || [];
        logs.push(logEntry);
        localStorage.setItem('accessLogs', JSON.stringify(logs));
    }

    function displayAccessLogs() {
        const logs = JSON.parse(localStorage.getItem('accessLogs')) || [];
        if (logs.length === 0) {
            accessLogContent.innerHTML = '<p>Belum ada aktivitas login.</p>';
            return;
        }
        accessLogContent.innerHTML = logs.map(log => 
            `<p><strong>[${log.timestamp}]</strong> User: ${log.username} (${log.userType}) - Status: ${log.status}</p>`
        ).join('');
    }

    // --- Manajemen Jadwal ---
    function loadSchedule() {
        const storedSchedule = localStorage.getItem('classSchedule');
        if (storedSchedule) {
            classSchedule = JSON.parse(storedSchedule);
        }
        renderSchedule();
    }

    function renderSchedule() {
        currentScheduleGrid.innerHTML = '';
        for (const day in classSchedule) {
            const scheduleDayDiv = document.createElement('div');
            scheduleDayDiv.classList.add('schedule-day');
            scheduleDayDiv.innerHTML = `
                <h4>${day}</h4>
                <ul>
                    ${classSchedule[day].map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
            currentScheduleGrid.appendChild(scheduleDayDiv);
        }
    }

    // --- Manajemen Pengumuman ---
    function loadAnnouncements() {
        const storedAnnouncements = localStorage.getItem('announcements');
        if (storedAnnouncements) {
            announcements = JSON.parse(storedAnnouncements);
        }
        renderAnnouncements();
    }

    function renderAnnouncements() {
        announcementsList.innerHTML = '';
        if (announcements.length === 0) {
            announcementsList.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Belum ada pengumuman.</p>';
            return;
        }

        announcements.forEach((ann, index) => {
            const announcementCard = document.createElement('div');
            announcementCard.classList.add('card');
            announcementCard.innerHTML = `
                <h4>${ann.title}</h4>
                <p>${ann.content}</p>
                <span><i class="far fa-calendar-alt"></i> ${ann.date}</span>
                <div class="card-footer-buttons">
                    <button class="btn-edit-announcement" data-index="${index}" style="display: ${currentUserType === 'admin' || currentUserType === 'teacher' ? 'inline-block' : 'none'};"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn-remove-announcement" data-index="${index}" style="display: ${currentUserType === 'admin' || currentUserType === 'teacher' ? 'inline-block' : 'none'}; background-color: #dc3545; margin-left: 5px;"><i class="fas fa-trash"></i> Hapus</button>
                </div>
            `;
            announcementsList.prepend(announcementCard); // Tambahkan ke paling atas
        });

        // Event listener untuk tombol edit pengumuman (BARU)
        document.querySelectorAll('.btn-edit-announcement').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const annToEdit = announcements[index];
                editAnnouncementIndex.value = index;
                editAnnouncementTitle.value = annToEdit.title;
                editAnnouncementContent.value = annToEdit.content;
                editAnnouncementModal.style.display = 'block';
            });
        });
        // Event listener untuk tombol hapus pengumuman (BARU)
        document.querySelectorAll('.btn-remove-announcement').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                if (confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
                    announcements.splice(index, 1);
                    localStorage.setItem('announcements', JSON.stringify(announcements));
                    renderAnnouncements();
                    alert('Pengumuman berhasil dihapus!');
                }
            });
        });
    }


    // --- Manajemen Galeri ---
    function loadGalleryCategories() {
        const storedCategories = localStorage.getItem('galleryCategories');
        if (storedCategories) {
            galleryCategories = JSON.parse(storedCategories);
        }
        renderGalleryCategories();
    }

    function renderGalleryCategories() {
        // Render ke select di modal upload foto
        photoCategorySelect.innerHTML = '<option value="" disabled selected>Pilih Kategori</option>';
        galleryCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            photoCategorySelect.appendChild(option);
        });

        // Render ke select filter
        galleryCategoryFilter.innerHTML = '<option value="all">Semua Kategori</option>';
        galleryCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            galleryCategoryFilter.appendChild(option);
        });
        galleryCategoryFilter.value = 'all'; // Reset filter
    }

    function loadGallery() {
        const storedPhotos = localStorage.getItem('galleryPhotos');
        if (storedPhotos) {
            galleryPhotos = JSON.parse(storedPhotos);
        }
        renderGallery();
    }

    function renderGallery(filterCategory = 'all') {
        galleryGrid.innerHTML = '';
        const filteredPhotos = filterCategory === 'all'
            ? galleryPhotos
            : galleryPhotos.filter(photo => photo.category === filterCategory);

        if (filteredPhotos.length === 0) {
            galleryGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Belum ada foto di kategori ini.</p>';
            return;
        }

        filteredPhotos.forEach((photo, index) => {
            const galleryItemDiv = document.createElement('div');
            galleryItemDiv.classList.add('gallery-item');
            galleryItemDiv.innerHTML = `
                <img src="${photo.src}" alt="${photo.caption}">
                <p>${photo.caption} <span style="font-size: 0.8em; color: #888;">(${photo.category})</span></p>
                <button class="btn-remove-photo" data-index="${index}" style="display: ${currentUserType === 'admin' ? 'inline-block' : 'none'};"><i class="fas fa-trash"></i> Hapus</button>
            `;
            galleryGrid.appendChild(galleryItemDiv);
        });

        document.querySelectorAll('.btn-remove-photo').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
                    galleryPhotos.splice(index, 1);
                    localStorage.setItem('galleryPhotos', JSON.stringify(galleryPhotos));
                    renderGallery(galleryCategoryFilter.value); // Render ulang dengan filter aktif
                    alert('Foto berhasil dihapus!');
                }
            });
        });
    }

    // --- Manajemen Tampilan Utama ---
    function showAuthScreen() {
        authWrapper.style.display = 'flex';
        websiteContent.style.display = 'none';
        websiteContent.classList.remove('fade-in');
        isLoggedIn = false;
        currentUserType = null;
        createAnnouncementBtn.style.display = 'none';
        uploadPhotoBtn.style.display = 'none';
        createStudentAccountBtn.style.display = 'none';
        createTeacherAccountBtn.style.display = 'none';
        customizeWebsiteBtn.style.display = 'none';
        viewAccessLogBtn.style.display = 'none';
        editScheduleBtn.style.display = 'none';
        addGalleryCategoryBtn.style.display = 'none'; // Sembunyikan tombol

        welcomeAnimationText.style.display = 'none';
        defaultWelcomeText.classList.remove('hidden');

        loginFormCard.style.display = 'block';
        registerFormCard.style.display = 'none';

        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    }

    function showWebsiteContent() {
        authWrapper.style.display = 'none';
        websiteContent.style.display = 'block';
        websiteContent.classList.add('fade-in');

        defaultWelcomeText.classList.add('hidden');
        welcomeAnimationText.style.display = 'block';
        welcomeAnimationText.style.animation = 'none';
        welcomeAnimationText.offsetHeight;
        welcomeAnimationText.style.animation = '';

        // Tampilkan/sembunyikan tombol berdasarkan tipe user
        // Tombol Buat Pengumuman: Admin, Wali Kelas
        if (currentUserType === 'admin' || currentUserType === 'teacher') {
            createAnnouncementBtn.style.display = 'inline-flex';
        } else {
            createAnnouncementBtn.style.display = 'none';
        }
        // Tombol Upload Foto: Admin, Wali Kelas
        if (currentUserType === 'admin' || currentUserType === 'teacher') {
             uploadPhotoBtn.style.display = 'inline-flex';
        } else {
             uploadPhotoBtn.style.display = 'none';
        }

        // Tombol khusus Peluncur Website (Admin)
        if (currentUserType === 'admin') {
            createStudentAccountBtn.style.display = 'inline-flex';
            createTeacherAccountBtn.style.display = 'inline-flex';
            customizeWebsiteBtn.style.display = 'inline-flex';
            viewAccessLogBtn.style.display = 'inline-flex';
            editScheduleBtn.style.display = 'inline-flex';
            addGalleryCategoryBtn.style.display = 'inline-flex'; // Tampilkan tombol
        } else {
            createStudentAccountBtn.style.display = 'none';
            createTeacherAccountBtn.style.display = 'none';
            customizeWebsiteBtn.style.display = 'none';
            viewAccessLogBtn.style.display = 'none';
            editScheduleBtn.style.display = 'none';
            addGalleryCategoryBtn.style.display = 'none'; // Sembunyikan tombol
        }

        if (backgroundMusic) {
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {}).catch(error => {
                    console.log("Autoplay dicegah. Pengguna perlu berinteraksi untuk memutar musik.", error);
                });
            }
        }
        // Muat semua data yang bersifat permanen dari localStorage
        loadSchedule();
        loadAnnouncements();
        loadGalleryCategories(); // Muat kategori galeri
        loadGallery();           // Muat foto galeri
    }

    // --- Init ---
    loadSettings();
    showAuthScreen();

    // --- Event Listeners ---
    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginFormCard.style.display = 'none';
        registerFormCard.style.display = 'block';
    });

    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerFormCard.style.display = 'none';
        loginFormCard.style.display = 'block';
    });


    loginFormActual.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const selectedUserType = document.querySelector('input[name="userType"]:checked').value;

        loadingText.style.display = 'block';
        loadingText.classList.add('visible');
        loginButton.disabled = true;

        setTimeout(() => {
            loadingText.style.display = 'none';
            loadingText.classList.remove('visible');
            loginButton.disabled = false;

            let isAuthenticated = false;
            if (selectedUserType === 'student') {
                isAuthenticated = validUsers.student[username] === password;
            } else if (selectedUserType === 'teacher') {
                isAuthenticated = validUsers.teacher[username] === password;
            } else if (selectedUserType === 'admin') {
                isAuthenticated = validUsers.admin[username] === password;
            } else if (selectedUserType === 'guest') {
                isAuthenticated = (username === validUsers.guest.username && password === validUsers.guest.password);
            }
            
            if (isAuthenticated) {
                alert(`Login Berhasil sebagai ${selectedUserType.replace('student', 'Anggota Kelas').replace('teacher', 'Wali Kelas').replace('admin', 'Peluncur Website').replace('guest', 'Pengunjung')}! Selamat datang!`);
                isLoggedIn = true;
                currentUserType = selectedUserType;
                showWebsiteContent();
                logAccess(username, selectedUserType, 'Berhasil');
            } else {
                alert('Username atau password salah, atau tipe pengguna tidak sesuai.');
                logAccess(username, selectedUserType, 'Gagal');
            }
            this.reset();
            document.getElementById('userTypeStudent').checked = true;
        }, 1500);
    });

    registerFormActual.addEventListener('submit', function(e) {
        e.preventDefault();
        const regUsername = document.getElementById('regUsername').value;
        const regEmail = document.getElementById('regEmail').value;
        const regPassword = document.getElementById('regPassword').value;
        const regConfirmPassword = document.getElementById('regConfirmPassword').value;

        if (!regUsername || !regPassword || !regConfirmPassword) {
            alert('Semua field (Username, Password, Konfirmasi Password) harus diisi!');
            return;
        }

        if (regPassword !== regConfirmPassword) {
            alert('Konfirmasi password tidak cocok!');
            return;
        }
        
        if (validUsers.student[regUsername]) {
            alert(`Username '${regUsername}' sudah digunakan. Silakan pilih username lain.`);
            return;
        }

        validUsers.student[regUsername] = regPassword;
        console.log(`Akun anggota kelas baru (via register umum) dibuat: ${regUsername}, ${regPassword}`);
        logAccess(regUsername, 'student', 'Daftar & Login Otomatis');

        alert(`Pendaftaran berhasil! Anda akan otomatis login sebagai ${regUsername}.`);
        isLoggedIn = true;
        currentUserType = 'student';
        showWebsiteContent();
        registerFormActual.reset();
        loginFormActual.reset();

        document.getElementById('userTypeStudent').checked = true;
    });


    logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Anda telah logout.');
        showAuthScreen();
        loginFormCard.style.display = 'block';
    });

    // --- Pengumuman Event Listeners ---
    createAnnouncementBtn.addEventListener('click', function() {
        newAnnouncementForm.reset(); // Pastikan form kosong
        announcementModal.style.display = 'block';
    });

    closeAnnouncementModalBtn.addEventListener('click', function() {
        announcementModal.style.display = 'none';
        newAnnouncementForm.reset();
    });

    newAnnouncementForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('announcementTitle').value;
        const content = document.getElementById('announcementContent').value;
        
        if (!title || !content) {
            alert('Judul dan isi pengumuman tidak boleh kosong!');
            return;
        }

        const today = new Date();
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('id-ID', options);

        announcements.unshift({ title, content, date: formattedDate }); // Tambahkan ke awal
        localStorage.setItem('announcements', JSON.stringify(announcements));
        renderAnnouncements();

        alert('Pengumuman berhasil ditambahkan!');
        announcementModal.style.display = 'none';
        newAnnouncementForm.reset();
    });

    // Event Listeners untuk Edit Pengumuman (BARU)
    closeEditAnnouncementModalBtn.addEventListener('click', function() {
        editAnnouncementModal.style.display = 'none';
    });

    editAnnouncementForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const index = parseInt(editAnnouncementIndex.value);
        const newTitle = editAnnouncementTitle.value;
        const newContent = editAnnouncementContent.value;

        if (!newTitle || !newContent) {
            alert('Judul dan isi pengumuman tidak boleh kosong!');
            return;
        }

        announcements[index].title = newTitle;
        announcements[index].content = newContent;
        // Tanggal tidak diubah saat edit, bisa ditambahkan 'diedit: tanggal_sekarang' jika mau

        localStorage.setItem('announcements', JSON.stringify(announcements));
        renderAnnouncements(); // Render ulang daftar pengumuman

        alert('Pengumuman berhasil diubah!');
        editAnnouncementModal.style.display = 'none';
    });


    // --- Galeri Event Listeners ---
    uploadPhotoBtn.addEventListener('click', function() {
        photoCategorySelect.selectedIndex = 0; // Reset pilihan kategori
        newPhotoUploadForm.reset(); // Reset form
        uploadPhotoModal.style.display = 'block';
    });

    closeUploadPhotoModalBtn.addEventListener('click', function() {
        uploadPhotoModal.style.display = 'none';
        newPhotoUploadForm.reset();
    });

    newPhotoUploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const photoFile = document.getElementById('photoFile').files[0];
        const photoCaption = document.getElementById('photoCaption').value;
        const photoCategory = document.getElementById('photoCategory').value;

        if (!photoFile || !photoCaption || !photoCategory) {
            alert('Silakan pilih kategori, file foto, dan isi keterangan foto!');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;

            const newPhoto = { src: imageUrl, caption: photoCaption, category: photoCategory };
            galleryPhotos.unshift(newPhoto); // Tambahkan ke awal array
            localStorage.setItem('galleryPhotos', JSON.stringify(galleryPhotos)); // Simpan ke localStorage
            renderGallery(galleryCategoryFilter.value); // Render ulang galeri dengan filter aktif

            alert('Foto berhasil diupload!');
            uploadPhotoModal.style.display = 'none';
            newPhotoUploadForm.reset();
        };
        reader.readAsDataURL(photoFile);
    });

    // Event Listeners Tambah Kategori Galeri (BARU)
    addGalleryCategoryBtn.addEventListener('click', function() {
        newGalleryCategoryForm.reset();
        addGalleryCategoryModal.style.display = 'block';
    });

    closeAddGalleryCategoryModalBtn.addEventListener('click', function() {
        addGalleryCategoryModal.style.display = 'none';
    });

    newGalleryCategoryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newCategoryName = newCategoryNameInput.value.trim();

        if (!newCategoryName) {
            alert('Nama kategori tidak boleh kosong!');
            return;
        }
        if (galleryCategories.includes(newCategoryName)) {
            alert(`Kategori '${newCategoryName}' sudah ada!`);
            return;
        }

        galleryCategories.push(newCategoryName);
        localStorage.setItem('galleryCategories', JSON.stringify(galleryCategories));
        renderGalleryCategories(); // Update dropdowns

        alert(`Kategori '${newCategoryName}' berhasil ditambahkan!`);
        addGalleryCategoryModal.style.display = 'none';
        newGalleryCategoryForm.reset();
    });

    // Event Listener Filter Galeri (BARU)
    galleryCategoryFilter.addEventListener('change', function() {
        renderGallery(this.value);
    });


    // --- Modal Closing Umum ---
    window.addEventListener('click', function(event) {
        if (event.target == announcementModal) {
            announcementModal.style.display = 'none';
            newAnnouncementForm.reset();
        }
        if (event.target == editAnnouncementModal) { // BARU
            editAnnouncementModal.style.display = 'none';
        }
        if (event.target == uploadPhotoModal) {
            uploadPhotoModal.style.display = 'none';
            newPhotoUploadForm.reset();
        }
        if (event.target == addGalleryCategoryModal) { // BARU
            addGalleryCategoryModal.style.display = 'none';
            newGalleryCategoryForm.reset();
        }
        if (event.target == createStudentAccountModal) {
            createStudentAccountModal.style.display = 'none';
            newStudentAccountForm.reset();
        }
        if (event.target == createTeacherAccountModal) {
            createTeacherAccountModal.style.display = 'none';
            newTeacherAccountForm.reset();
        }
        if (event.target == customizeWebsiteModal) {
            customizeWebsiteModal.style.display = 'none';
        }
        if (event.target == accessLogModal) {
            accessLogModal.style.display = 'none';
        }
        if (event.target == editScheduleModal) {
            editScheduleModal.style.display = 'none';
        }
    });

    // --- Admin/Teacher Account Management ---
    createStudentAccountBtn.addEventListener('click', function() {
        createStudentAccountModal.style.display = 'block';
    });

    closeCreateStudentAccountModalBtn.addEventListener('click', function() {
        createStudentAccountModal.style.display = 'none';
        newStudentAccountForm.reset();
    });

    newStudentAccountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newStudentUsername = document.getElementById('newStudentUsername').value;
        const newStudentPassword = document.getElementById('newStudentPassword').value;
        const confirmNewStudentPassword = document.getElementById('confirmNewStudentPassword').value;

        if (!newStudentUsername || !newStudentPassword || !confirmNewStudentPassword) {
            alert('Semua field harus diisi!');
            return;
        }

        if (newStudentPassword !== confirmNewStudentPassword) {
            alert('Konfirmasi password tidak cocok!');
            return;
        }

        if (validUsers.student[newStudentUsername]) {
            alert(`Username '${newStudentUsername}' sudah digunakan. Silakan pilih username lain.`);
            return;
        }

        validUsers.student[newStudentUsername] = newStudentPassword;
        console.log("Akun siswa baru (oleh admin) dibuat:", newStudentUsername, newStudentPassword);
        logAccess(newStudentUsername, 'student', 'Akun dibuat oleh Admin');

        alert(`Akun anggota kelas '${newStudentUsername}' berhasil dibuat!`);
        createStudentAccountModal.style.display = 'none';
        newStudentAccountForm.reset();
    });

    createTeacherAccountBtn.addEventListener('click', function() {
        createTeacherAccountModal.style.display = 'block';
    });

    closeCreateTeacherAccountModalBtn.addEventListener('click', function() {
        createTeacherAccountModal.style.display = 'none';
        newTeacherAccountForm.reset();
    });

    newTeacherAccountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newTeacherUsername = document.getElementById('newTeacherUsername').value;
        const newTeacherPassword = document.getElementById('newTeacherPassword').value;
        const confirmNewTeacherPassword = document.getElementById('confirmNewTeacherPassword').value;

        if (!newTeacherUsername || !newTeacherPassword || !confirmNewTeacherPassword) {
            alert('Semua field harus diisi!');
            return;
        }

        if (newTeacherPassword !== confirmNewTeacherPassword) {
            alert('Konfirmasi password tidak cocok!');
            return;
        }

        if (validUsers.teacher[newTeacherUsername]) {
            alert(`Username '${newTeacherUsername}' sudah digunakan. Silakan pilih username lain.`);
            return;
        }

        validUsers.teacher[newTeacherUsername] = newTeacherPassword;
        console.log("Akun wali kelas baru dibuat:", newTeacherUsername, newTeacherPassword);
        logAccess(newTeacherUsername, 'teacher', 'Akun dibuat oleh Admin');

        alert(`Akun wali kelas '${newTeacherUsername}' berhasil dibuat!`);
        createTeacherAccountModal.style.display = 'none';
        newTeacherAccountForm.reset();
    });

    // --- Website Customization ---
    customizeWebsiteBtn.addEventListener('click', function() {
        backgroundColorInput.value = rgbToHex(document.body.style.backgroundColor) || '#f9f9f9';
        
        if (backgroundMusic && backgroundMusic.src) {
            const currentSrc = backgroundMusic.src.split('/').pop();
            const option = musicSourceSelect.querySelector(`option[value="${currentSrc}"]`);
            if (option) {
                musicSourceSelect.value = currentSrc;
            } else if (backgroundMusic.src && backgroundMusic.src !== 'none' && !backgroundMusic.src.startsWith('data:')) {
                musicSourceSelect.value = 'none';
            } else if (backgroundMusic.src && backgroundMusic.src.startsWith('data:')) {
                 musicSourceSelect.value = 'none';
            } else {
                 musicSourceSelect.value = 'none';
            }
        } else {
            musicSourceSelect.value = 'none';
        }

        customizeWebsiteModal.style.display = 'block';
    });

    closeCustomizeWebsiteModalBtn.addEventListener('click', function() {
        customizeWebsiteModal.style.display = 'none';
    });

    applyBackgroundColorBtn.addEventListener('click', function() {
        document.body.style.backgroundColor = backgroundColorInput.value;
        document.body.style.backgroundImage = 'none';
        saveSettings();
        alert('Warna latar belakang berhasil diterapkan!');
    });

    applyBackgroundImageBtn.addEventListener('click', function() {
        const file = backgroundImageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.body.style.backgroundImage = `url(${event.target.result})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundAttachment = 'fixed';
                document.body.style.backgroundColor = '';
                saveSettings();
                alert('Gambar latar belakang berhasil diterapkan!');
            };
            reader.readAsDataURL(file);
        } else {
            alert('Pilih file gambar terlebih dahulu!');
        }
    });

    resetBackgroundBtn.addEventListener('click', function() {
        document.body.style.backgroundColor = '';
        document.body.style.backgroundImage = 'none';
        saveSettings();
        alert('Latar belakang telah direset!');
    });

    applyMusicChangesBtn.addEventListener('click', function() {
        const selectedMusic = musicSourceSelect.value;
        const uploadedFile = uploadMusicFileInput.files[0];

        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                if (backgroundMusic) {
                    backgroundMusic.src = event.target.result;
                    backgroundMusic.load();
                    backgroundMusic.play();
                    backgroundMusic.muted = false;
                    saveSettings();
                    alert('Musik baru dari file Anda berhasil diterapkan!');
                }
            };
            reader.readAsDataURL(uploadedFile);
        } else if (selectedMusic !== 'none') {
            if (backgroundMusic) {
                backgroundMusic.src = selectedMusic;
                backgroundMusic.load();
                backgroundMusic.play();
                backgroundMusic.muted = false;
                saveSettings();
                alert('Musik berhasil diubah!');
            }
        } else {
            if (backgroundMusic) {
                backgroundMusic.pause();
                backgroundMusic.src = '';
                saveSettings();
                alert('Musik latar dimatikan.');
            }
        }
    });

    toggleMuteMusicBtn.addEventListener('click', function() {
        if (backgroundMusic) {
            backgroundMusic.muted = !backgroundMusic.muted;
            if (!backgroundMusic.paused && !backgroundMusic.muted) {
                backgroundMusic.play();
            } else if (!backgroundMusic.muted) {
                 backgroundMusic.play();
            }
            alert(`Musik sekarang ${backgroundMusic.muted ? 'di-mute' : 'aktif'}.`);
        }
    });

    function rgbToHex(rgb) {
        if (!rgb || rgb.startsWith('url')) return '';
        const rgbMatch = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!rgbMatch) return '';
        const hex = num => ('0' + parseInt(num).toString(16)).slice(-2);
        return "#" + hex(rgbMatch[1]) + hex(rgbMatch[2]) + hex(rgbMatch[3]);
    }

    // --- Access Log ---
    viewAccessLogBtn.addEventListener('click', function() {
        displayAccessLogs();
        accessLogModal.style.display = 'block';
    });

    closeAccessLogModalBtn.addEventListener('click', function() {
        accessLogModal.style.display = 'none';
    });

    clearAccessLogBtn.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin menghapus semua log akses?')) {
            localStorage.removeItem('accessLogs');
            displayAccessLogs();
            alert('Log akses telah dibersihkan.');
        }
    });

    // --- Edit Schedule ---
    editScheduleBtn.addEventListener('click', function() {
        selectDay.value = Object.keys(classSchedule)[0];
        scheduleTextarea.value = classSchedule[selectDay.value].join('\n');
        editScheduleModal.style.display = 'block';
    });

    closeEditScheduleModalBtn.addEventListener('click', function() {
        editScheduleModal.style.display = 'none';
    });

    selectDay.addEventListener('change', function() {
        scheduleTextarea.value = classSchedule[this.value].join('\n');
    });

    scheduleEditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const dayToEdit = selectDay.value;
        const newScheduleText = scheduleTextarea.value;
        const newScheduleArray = newScheduleText.split('\n').map(item => item.trim()).filter(item => item !== '');

        classSchedule[dayToEdit] = newScheduleArray;
        localStorage.setItem('classSchedule', JSON.stringify(classSchedule));
        renderSchedule();

        alert(`Jadwal hari ${dayToEdit} berhasil diperbarui!`);
        editScheduleModal.style.display = 'none';
    });
});

