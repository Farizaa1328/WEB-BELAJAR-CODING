/* =====================================================
    SAFE GLOBAL INITIALIZER
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const hamburger = document.querySelector(".hamburger");
    const sideMenu = document.querySelector(".side-menu");
    const themeBtn = document.querySelector(".theme-btn");

    /* =====================================================
        PAGE FADE TRANSITION (SUPER FIXED)
    ===================================================== */
    body.style.opacity = "1";

    document.querySelectorAll("a[href]").forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");

            // 🔒 ABAIKAN LINK TIDAK VALID
            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("javascript") ||
                href.startsWith("mailto") ||
                href.startsWith("http")
            ) return;

            // 🔥 PAKAI URL ABSOLUTE (ANTI SALAH HALAMAN)
            const targetURL = new URL(href, window.location.href).href;

            e.preventDefault();
            body.style.opacity = "0";

            setTimeout(() => {
                window.location.href = targetURL;
            }, 300);
        });
    });

    /* =====================================================
        NAVBAR + SIDE MENU
    ===================================================== */
    hamburger?.addEventListener("click", e => {
        e.stopPropagation();
        sideMenu?.classList.toggle("active");
    });

    document.querySelectorAll(".side-menu a").forEach(link => {
        link.addEventListener("click", () => {
            sideMenu?.classList.remove("active");
        });
    });

    document.addEventListener("click", e => {
        if (
            sideMenu &&
            hamburger &&
            !sideMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            sideMenu.classList.remove("active");
        }
    });

    /* =====================================================
        THEME TOGGLE + SAVE
    ===================================================== */
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        body.classList.add("light-mode");
        themeBtn && (themeBtn.innerHTML = "🌙");
    } else {
        body.classList.remove("light-mode");
        themeBtn && (themeBtn.innerHTML = "☀️");
    }

    themeBtn?.addEventListener("click", () => {
        body.classList.toggle("light-mode");

        if (body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeBtn.innerHTML = "🌙";
        } else {
            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = "☀️";
        }
    });

    /* =====================================================
        SCROLL REVEAL ANIMATION
    ===================================================== */
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < windowHeight - 120) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    /* =====================================================
        FIX FEATURE CARD DARK MODE
    ===================================================== */
    const fixFeatureCardTheme = () => {
        document.querySelectorAll(".feature-card, .team-card, .card").forEach(card => {
            if (card.id === 'magicCard') return;
            if (body.classList.contains("light-mode")) {
                card.style.background = "#ffffff";
                card.style.color = "#1e293b";
            } else {
                card.style.background = "rgba(255,255,255,0.05)";
                card.style.color = "#f5f5f4";
            }
        });
    };

    fixFeatureCardTheme();
    themeBtn?.addEventListener("click", fixFeatureCardTheme);

    /* =====================================================
        SUCCESS PAGE LOGIC (AMAN)
    ===================================================== */
    const nameElement = document.getElementById("userName");

    if (nameElement) {
        const isLogin = localStorage.getItem("isLogin");
        const loginName = localStorage.getItem("loginName") || "User";

        if (isLogin !== "true") {
            window.location.href = "login.html";
            return;
        }

        nameElement.textContent = loginName;

        setTimeout(() => {
            body.style.opacity = "0";
            setTimeout(() => {
                window.location.href = "home.html";
            }, 300);
        }, 3000);
    }

    /* =====================================================
        BAB 6: FORM & VALIDASI
    ===================================================== */
    const btnToggleJsCode = document.getElementById('btnToggleJsCode');
    const jsCodeBlock = document.getElementById('jsCodeBlock');
    if (btnToggleJsCode && jsCodeBlock) {
        btnToggleJsCode.addEventListener('click', () => {
            if (jsCodeBlock.style.display === "none" || jsCodeBlock.style.display === "") {
                jsCodeBlock.style.display = "block";
            } else {
                jsCodeBlock.style.display = "none";
            }
        });
    }

    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pass = document.getElementById('passInput').value;
            const confirm = document.getElementById('passConfirm').value;
            
            if (pass.length < 6) {
                alert("Password minimal 6 karakter!");
                return;
            }
            if (pass !== confirm) {
                alert("Password tidak cocok!");
                return;
            }
            alert("Registrasi Berhasil! (Simulasi)");
        });
    }

    /* =====================================================
        GENERIC CODE TOGGLE (BAB 2-8)
        Menangani tombol: btnShowCode28, btnShowCode37, dst.
    ===================================================== */
    const toggleMap = {
        'btnShowCode28': 'code28', // Bab 2.8
        'btnShowCode37': 'code37', // Bab 3.7
        'btnShowCode45': 'code45', // Bab 4.5
        'btnShowCode56': 'code56', // Bab 5.6
        'btnShowCode57': 'code57', // Bab 5.7
        'btnShowCode82': 'code82'  // Bab 8.2
    };

    Object.keys(toggleMap).forEach(btnId => {
        const btn = document.getElementById(btnId);
        const content = document.getElementById(toggleMap[btnId]);
        
        if (btn && content) {
            btn.addEventListener('click', () => {
                const isHidden = content.style.display === "none" || content.style.display === "";
                content.style.display = isHidden ? "block" : "none";
                
                if (btn.innerHTML.toLowerCase().includes('lihat')) {
                    btn.innerHTML = 'Sembunyikan Kode <i class="fas fa-chevron-up"></i>';
                } else {
                    btn.innerHTML = 'Lihat Contoh Kode <i class="fas fa-chevron-down"></i>';
                }
            });
        }
    });

    /* =====================================================
        BAB 5.6: EVENT HANDLING DEMO
    ===================================================== */
    const btnUbahPesan = document.getElementById('btnUbahPesan');
    const btnResetPesan = document.getElementById('btnResetPesan');
    const demoText = document.getElementById('demoText');

    if (btnUbahPesan && btnResetPesan && demoText) {
        btnUbahPesan.addEventListener('click', () => {
            demoText.textContent = "Teks Berhasil Diubah! 🎉";
            demoText.style.color = "#f5d76e";
        });

        btnResetPesan.addEventListener('click', () => {
            demoText.textContent = "Klik tombol di bawah!";
            demoText.style.color = "#fff";
        });
    }

    /* =====================================================
        BAB 5.7: PRAKTIKUM SIMULATION
    ===================================================== */
    const simBtn = document.getElementById('simBtn');
    const simCard = document.getElementById('simCard');

    if (simBtn && simCard) {
        simBtn.addEventListener('click', () => {
            simCard.classList.toggle('sim-dark');
            simBtn.textContent = simCard.classList.contains('sim-dark') 
                ? "☀️ Matikan Dark Mode" 
                : "🌙 Aktifkan Dark Mode";
        });
    }

    /* =====================================================
        BAB 8.2: BLOG DEMO
    ===================================================== */
    const btnBlogDemo = document.getElementById('btnBlogDemo');
    const blogDemo = document.getElementById('blogDemo');

    if (btnBlogDemo && blogDemo) {
        btnBlogDemo.addEventListener('click', () => {
            const isHidden = blogDemo.style.display === "none" || blogDemo.style.display === "";
            blogDemo.style.display = isHidden ? "block" : "none";
            btnBlogDemo.innerHTML = isHidden 
                ? '<span>⏹</span> Tutup Demo Blog' 
                : '<span>▶</span> Jalankan Demo Blog';
        });
    }

    /* =====================================================
        BAB 7: INTEGRASI (MAGIC COLOR)
    ===================================================== */
    const btnMagicColor = document.getElementById('btnMagicColor');
    const magicCard = document.getElementById('magicCard');
    const btnMagicCode = document.getElementById('btnMagicCode');
    const magicCode = document.getElementById('magicCode');

    if (btnMagicColor && magicCard) {
        btnMagicColor.addEventListener('click', () => {
            const colors = [
                'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
                'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
                'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
                'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(120deg, #4facfe 0%, #00f2fe 100%)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            magicCard.style.background = randomColor;
        });
    }

    if (btnMagicCode && magicCode) {
        btnMagicCode.addEventListener('click', () => {
            const isHidden = magicCode.style.display === "none" || magicCode.style.display === "";
            magicCode.style.display = isHidden ? "block" : "none";
            btnMagicCode.textContent = isHidden ? "Sembunyikan Kode" : "Lihat Kode Lengkap";
        });
    }

    /* =====================================================
        PROFIL PAGE LOGIC
    ===================================================== */
    const btnLogoutProfile = document.getElementById('btnLogoutProfile');
    if (btnLogoutProfile) {
        btnLogoutProfile.addEventListener('click', () => {
            if (confirm('Apakah Anda yakin ingin keluar?')) {
                window.location.href = 'login.html';
            }
        });
    }

    const btnLearnMore = document.getElementById('btnLearnMore');
    if (btnLearnMore) {
        btnLearnMore.addEventListener('click', () => {
            window.location.href = 'materi/bab1.html';
        });
    }

    const editProfileBtn = document.getElementById('editProfileBtn');
    const profileForm = document.getElementById('profileForm');
    
    if (editProfileBtn && profileForm) {
        const inputs = profileForm.querySelectorAll('input');
        const saveBtn = profileForm.querySelector('.save-btn');

        editProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isDisabled = inputs[0].disabled;
            inputs.forEach(input => input.disabled = !isDisabled);
            saveBtn.style.display = isDisabled ? 'block' : 'none';
            editProfileBtn.textContent = isDisabled ? 'Batal Edit' : 'Edit Profil';
        });
    }
});

/* =====================================================
    LOGIN FUNCTION
===================================================== */
function loginUser() {
    const username = document.getElementById("username")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!username || !password) {
        alert("Username dan password wajib diisi!");
        return false;
    }

    if (
        username === localStorage.getItem("username") &&
        password === localStorage.getItem("password")
    ) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem(
            "loginName",
            localStorage.getItem("fullname") || "User"
        );

        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = "success.html";
        }, 300);
    } else {
        alert("Username atau password salah!");
    }
    return false;
}

/* =====================================================
    REGISTER FUNCTION
===================================================== */
function registerUser() {
    const fullname = document.getElementById("fullname")?.value.trim();
    const username = document.getElementById("reg-username")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("reg-password")?.value.trim();
    const confirm = document.getElementById("confirm-password")?.value.trim();

    if (!fullname || !username || !email || !password || !confirm) {
        alert("Semua field wajib diisi!");
        return false;
    }

    if (password.length < 6) {
        alert("Password minimal 6 karakter!");
        return false;
    }

    if (password !== confirm) {
        alert("Konfirmasi password tidak sama!");
        return false;
    }

    localStorage.setItem("fullname", fullname);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Registrasi berhasil! Silakan login.");

    document.body.style.opacity = "0";
    setTimeout(() => {
        window.location.href = "login.html";
    }, 300);

    return false;
}

/* ================= SIDE DROPDOWN LOGIC ================= */
document.querySelectorAll(".side-dropdown-title").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        btn.parentElement.classList.toggle("active");
    });
});
