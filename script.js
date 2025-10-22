document.addEventListener('DOMContentLoaded', function() {
    const authWrapper = document.getElementById('authWrapper');
    const websiteContent = document.getElementById('websiteContent');
    const loginFormCard = document.getElementById('loginForm');
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


    let isLoggedIn = false;
    let currentUserType = null;

    const validUsers = {
        student: { 'siswa1': 'kelasips' }, // Objek untuk menyimpan banyak akun siswa
        teacher: { 'Manda': 'MANDA123' },
        admin:   { 'Ghery': 'GHERY0987' }
    };

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

        welcomeAnimationText.style.display = 'none';
        defaultWelcomeText.classList.remove('hidden');

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
        } else {
            createStudentAccountBtn.style.display = 'none';
            createTeacherAccountBtn.style.display = 'none';
            customizeWebsiteBtn.style.display = 'none';
            viewAccessLogBtn.style.display = 'none';
        }

        if (backgroundMusic) {
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {}).catch(error => {
                    console.log("Autoplay dicegah. Pengguna perlu berinteraksi untuk memutar musik.", error);
                });
            }
        }
    }

    loadSettings();
    showAuthScreen();


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
            }
            
            if (isAuthenticated) {
                alert(`Login Berhasil sebagai ${selectedUserType.replace('student', 'Anggota Kelas').replace('teacher', 'Wali Kelas').replace('admin', 'Peluncur Website')}! Selamat datang!`);
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

            const newGalleryItem = document.createElement('div');
            newGalleryItem.classList.add('gallery-item');
            newGalleryItem.innerHTML = `
                <img src="${imageUrl}" alt="${photoCaption}">
                <p>${photoCaption}</p>
            `;
            galleryGrid.prepend(newGalleryItem);

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
        console.log("Akun siswa baru dibuat:", newStudentUsername, newStudentPassword);
        console.log("Daftar siswa terbaru:", validUsers.student);

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
        console.log("Daftar wali kelas terbaru:", validUsers.teacher);

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
            } else if (backgroundMusic.src && backgroundMusic.src !== 'none' && !backgroundMusic.src.startsWith('data:')) { // Cek bukan data:url
                musicSourceSelect.value = 'none';
            } else if (backgroundMusic.src && backgroundMusic.src.startsWith('data:')) { // Musik dari upload file
                 // Biarkan sebagai 'none' atau tambahkan opsi "Uploaded Music"
                 musicSourceSelect.value = 'none'; // Untuk saat ini, default ke 'none'
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
});

