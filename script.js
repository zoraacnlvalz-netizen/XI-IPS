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
    const announcementModal = document.getElementById('announcementModal');
    const closeAnnouncementModalBtn = announcementModal.querySelector('.close-button');
    const newAnnouncementForm = document.getElementById('newAnnouncementForm');
    const announcementsList = document.getElementById('announcementsList');

    const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
    const uploadPhotoModal = document.getElementById('uploadPhotoModal');
    const closeUploadPhotoModalBtn = uploadPhotoModal.querySelector('.close-button');
    const newPhotoUploadForm = document.getElementById('newPhotoUploadForm');
    const galleryGrid = document.getElementById('galleryGrid');

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

    // Elemen untuk Modifikasi Jadwal (BARU)
    const editScheduleBtn = document.getElementById('editScheduleBtn');
    const editScheduleModal = document.getElementById('editScheduleModal');
    const closeEditScheduleModalBtn = editScheduleModal.querySelector('.close-button');
    const scheduleEditForm = document.getElementById('scheduleEditForm');
    const selectDay = document.getElementById('selectDay');
    const scheduleTextarea = document.getElementById('scheduleTextarea');
    const currentScheduleGrid = document.getElementById('currentScheduleGrid');


    let isLoggedIn = false;
    let currentUserType = null;

    // Data user yang valid
    const validUsers = {
        student: { 'siswa1': 'kelasips' },
        teacher: { 'Manda': 'MANDA123' },
        admin:   { 'Ghery': 'GHERY0987' },
        guest:   { 'pengunjung': 'password' } // Akun default untuk pengunjung
    };

    // Data jadwal default (akan dimuat dari localStorage jika ada)
    let classSchedule = {
        'Senin':    ['07:30 - 09:00 | Ekonomi', '09:00 - 10:30 | Geografi', '10:30 - 11:00 | Istirahat', '11:00 - 12:30 | Sosiologi', '12:30 - 14:00 | Bahasa Inggris'],
        'Selasa':   ['07:30 - 09:00 | Sejarah', '09:00 - 10:30 | Matematika', '10:30 - 11:00 | Istirahat', '11:00 - 12:30 | PKn', '12:30 - 14:00 | Seni Budaya'],
        'Rabu':     ['07:30 - 09:00 | Bahasa Indonesia', '09:00 - 10:30 | Penjaskes', '10:30 - 11:00 | Istirahat', '11:00 - 12:30 | Fisika (Lintas Minat)', '12:30 - 14:00 | Bimbingan Konseling'],
        'Kamis':    ['07:30 - 09:00 | Ekonomi', '09:00 - 10:30 | Geografi', '10:30 - 11:00 | Istirahat', '11:00 - 12:30 | Sosiologi', '12:30 - 14:00 | Bahasa Inggris'],
        'Jumat':    ['07:30 - 09:00 | Pendidikan Agama', '09:00 - 10:30 | Sejarah', '10:30 - 11:00 | Istirahat', '11:00 - 12:30 | Prakarya & KWU', '12:30 - 13:00 | Kebersihan Lingkungan']
    };

    // Data galeri default (akan dimuat dari localStorage jika ada)
    let galleryPhotos = [
        { src: 'https://via.placeholder.com/300x200/FFC107/FFFFFF?text=Momen+Kelas+1', caption: 'Momen kebersamaan saat belajar.' },
        { src: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Momen+Kelas+2', caption: 'Kegiatan bakti sosial.' },
        { src: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Momen+Kelas+3', caption: 'Keseruan saat pentas seni.' }
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

    // Fungsi untuk memuat dan menampilkan jadwal (BARU)
    function loadSchedule() {
        const storedSchedule = localStorage.getItem('classSchedule');
        if (storedSchedule) {
            classSchedule = JSON.parse(storedSchedule);
        }
        renderSchedule();
    }

    // Fungsi untuk me-render jadwal ke DOM (BARU)
    function renderSchedule() {
        currentScheduleGrid.innerHTML = ''; // Kosongkan jadwal yang ada
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

    // Fungsi untuk memuat dan menampilkan galeri (BARU)
    function loadGallery() {
        const storedPhotos = localStorage.getItem('galleryPhotos');
        if (storedPhotos) {
            galleryPhotos = JSON.parse(storedPhotos);
        }
        renderGallery();
    }

    // Fungsi untuk me-render galeri ke DOM (BARU)
    function renderGallery() {
        galleryGrid.innerHTML = ''; // Kosongkan galeri yang ada
        if (galleryPhotos.length === 0) {
            galleryGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Belum ada foto di galeri. Klik "Upload Foto" untuk menambahkannya!</p>';
            return;
        }

        galleryPhotos.forEach((photo, index) => {
            const galleryItemDiv = document.createElement('div');
            galleryItemDiv.classList.add('gallery-item');
            galleryItemDiv.innerHTML = `
                <img src="${photo.src}" alt="${photo.caption}">
                <p>${photo.caption}</p>
                <button class="btn-remove-photo" data-index="${index}"><i class="fas fa-times-circle"></i> Hapus</button>
            `;
            galleryGrid.appendChild(galleryItemDiv);
        });

        // Tambahkan event listener untuk tombol hapus
        document.querySelectorAll('.btn-remove-photo').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
                    galleryPhotos.splice(index, 1); // Hapus foto dari array
                    localStorage.setItem('galleryPhotos', JSON.stringify(galleryPhotos)); // Simpan perubahan
                    renderGallery(); // Render ulang galeri
                    alert('Foto berhasil dihapus!');
                }
            });
        });
    }

    // --- Manajemen Tampilan ---
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
        editScheduleBtn.style.display = 'none'; // Sembunyikan tombol edit jadwal

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
        if (currentUserType === 'admin' || currentUserType === 'teacher') {
            createAnnouncementBtn.style.display = 'inline-flex';
            uploadPhotoBtn.style.display = 'inline-flex';
        } else {
            createAnnouncementBtn.style.display = 'none';
            uploadPhotoBtn.style.display = 'none';
        }

        if (currentUserType === 'admin') {
            createStudentAccountBtn.style.display = 'inline-flex';
            createTeacherAccountBtn.style.display = 'inline-flex';
            customizeWebsiteBtn.style.display = 'inline-flex';
            viewAccessLogBtn.style.display = 'inline-flex';
            editScheduleBtn.style.display = 'inline-flex'; // Tampilkan tombol edit jadwal
        } else {
            createStudentAccountBtn.style.display = 'none';
            createTeacherAccountBtn.style.display = 'none';
            customizeWebsiteBtn.style.display = 'none';
            viewAccessLogBtn.style.display = 'none';
            editScheduleBtn.style.display = 'none'; // Sembunyikan tombol edit jadwal
        }

        if (backgroundMusic) {
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {}).catch(error => {
                    console.log("Autoplay dicegah. Pengguna perlu berinteraksi untuk memutar musik.", error);
                });
            }
        }
        loadSchedule(); // Muat jadwal saat masuk website
        loadGallery();  // Muat galeri saat masuk website
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
            } else if (selectedUserType === 'guest') { // Login untuk Pengunjung (BARU)
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

    createAnnouncementBtn.addEventListener('click', function() {
        announcementModal.style.display = 'block';
    });

    closeAnnouncementModalBtn.addEventListener('click', function() {
        announcementModal.style.display = 'none';
        newAnnouncementForm.reset();
    });

    window.addEventListener('click', function(event) {
        if (event.target == announcementModal) {
            announcementModal.style.display = 'none';
            newAnnouncementForm.reset();
        }
        if (event.target == uploadPhotoModal) {
            uploadPhotoModal.style.display = 'none';
            newPhotoUploadForm.reset();
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
        if (event.target == editScheduleModal) { // Tambahkan ini untuk modal edit jadwal
            editScheduleModal.style.display = 'none';
        }
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

        const newAnnouncementCard = document.createElement('div');
        newAnnouncementCard.classList.add('card');
        newAnnouncementCard.innerHTML = `
            <h4>${title}</h4>
            <p>${content}</p>
            <span><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
        `;

        announcementsList.prepend(newAnnouncementCard);

        alert('Pengumuman berhasil ditambahkan!');
        announcementModal.style.display = 'none';
        newAnnouncementForm.reset();
    });

    uploadPhotoBtn.addEventListener('click', function() {
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

        if (!photoFile || !photoCaption) {
            alert('Silakan pilih file foto dan isi keterangan foto!');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;

            const newPhoto = { src: imageUrl, caption: photoCaption };
            galleryPhotos.unshift(newPhoto); // Tambahkan ke awal array
            localStorage.setItem('galleryPhotos', JSON.stringify(galleryPhotos)); // Simpan ke localStorage
            renderGallery(); // Render ulang galeri

            alert('Foto berhasil diupload!');
            uploadPhotoModal.style.display = 'none';
            newPhotoUploadForm.reset();
        };
        reader.readAsDataURL(photoFile);
    });

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

    // --- Logika untuk Edit Jadwal (BARU) ---
    editScheduleBtn.addEventListener('click', function() {
        // Muat jadwal untuk hari yang dipilih ke textarea
        selectDay.value = Object.keys(classSchedule)[0]; // Default ke hari pertama
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

        classSchedule[dayToEdit] = newScheduleArray; // Update jadwal di objek
        localStorage.setItem('classSchedule', JSON.stringify(classSchedule)); // Simpan ke localStorage
        renderSchedule(); // Render ulang jadwal di halaman utama

        alert(`Jadwal hari ${dayToEdit} berhasil diperbarui!`);
        editScheduleModal.style.display = 'none';
    });
});

