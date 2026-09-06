// ===== DATA PORTFOLIO =====
const portofolioData = [
    {
        id: 1,
        title: 'Website Sistem Infomasi Pelayanan Publik Desa',
        category: 'web',
        description: 'Saya membuat aplikasi sistem informasi pelayanan publik berbasis website untuk transparansi informasi kepada masyarakat mengenai kegiatan dan perkembangan desa secara real-time. Aplikasi ini dilengkapi fitur pengajuan surat online, sehingga warga dapat mengajukan permohonan surat tanpa harus datang langsung ke kantor desa. Setiap pengajuan dapat dipantau statusnya secara real-time, mulai dari diajukan, diproses, hingga selesai',
        image: 'assets/images/image.png',
        technologies: ['Golang', 'MySQL']
    },
    {
        id: 2,
        title: 'Website Kuliner',
        category: 'web',
        description: 'Saya membuat aplikasi tentang sistem manajemen data kuliner berbasis website yang terdapat halaman Home, Kuliner, dan Transaksi, yang menunjukkan kemampuan saya dalam pengembangan web, seperti pembuatan desain antarmuka, pengolahan data, dan integrasi dengan database. ',
        image: 'assets/images/kuliner.jpg',
        technologies: ['Laravel', 'MySQL']
    },
    {
        id: 3,
        title: 'Mobile E-Commerce App',
        category: 'mobile',
        description: 'Saya membuat aplikasi untuk pemesanan makanan, manajemen pesanan.',
        image: 'assets/images/aplikasi.png',
        technologies: ['Flutter', 'Firebase']
    },
    {
        id: 4,
        title: 'Game Design 2D',
        category: 'Game',
        description: 'Saya membuat game seperti Super Mario menggunakan Unity, sebuah platformer 2D di mana pemain mengendalikan karakter untuk melompat, menghindari rintangan, mengalahkan musuh, dan mengumpulkan koin.',
        image: 'assets/images/projekgame.jpg',
        technologies: ['Unity']
    },
    {
        id: 5,
        title: 'Website Apotek',
        category: 'web',
        description: 'Saya membuat website apotek untuk pencarian dan pembelian obat online. Website ini menawarkan informasi obat, pemesanan berbasis resep, serta opsi pembayaran dan pengiriman yang fleksibel. Dengan tampilan responsif, pengguna dapat dengan mudah mencari dan memesan obat. Admin memiliki dashboard untuk mengelola stok dan pesanan, serta integrasi Google Maps dan fitur unggah resep untuk memvalidasi pembelian obat khusus.',
        image: 'assets/images/apotek.jpg',
        technologies: ['Laravel', 'MySQL']
    },
    {
        id: 6,
        title: 'Pembayaran Tagihan Sekolah',
        category: 'web',
        description: 'Saya membuat aplikasi pembayaran tagihan sekolah dengan integrasi payment gateway',
        image: 'assets/images/sekolah.png',
        technologies: ['Codeigniter4', 'Node.js', 'MySQL']
    },
    {
        id: 7,
        title: 'Game Dinosaurus P5JS',
        category: 'Game',
        description: 'saya membuat game dinosaurus dengan p5.js. Pemain mengontrol dinosaurus untuk menghindari rintangan dan mengumpulkan skor. Proyek ini menunjukkan kemampuan saya dalam pemrograman JavaScript dan desain visual yang responsif. ',
        image: 'assets/images/dinosaurus.jpg',
        technologies: ['P5JS']
    },
    {
        id: 8,
        title: 'E-Commerce Toko Sepatu',
        category: 'web',
        description: 'Saya membuat website toko sepatu sederhana didalamnya terdapat fitur ubah produk, tambah produk, delete produk. Fitur-fitur ini memberikan kemudahan dalam mengelola produk sepatu di toko online, memungkinkan admin untuk memperbarui atau menghapus produk sesuai kebutuhan secara cepat dan efisien.',
        image: 'assets/images/sepatu.jpg',
        technologies: ['HTML', 'CSS', 'JavaScript']
    },

];

// ===== RENDER PORTFOLIO =====
function renderPortofolio(filter = 'all') {
    const portofolioGrid = document.getElementById('portofolioGrid');

    if (!portofolioGrid) return;

    portofolioGrid.innerHTML = '';

    const filteredData = filter === 'all'
        ? portofolioData
        : portofolioData.filter(item => item.category === filter);

    filteredData.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'portofolio-card';
        card.innerHTML = `
            <div class="portofolio-image">
                <img src="${item.image}" alt="${item.title}" class="lightbox-trigger" style="cursor: zoom-in;">
                <span class="portofolio-badge">${item.category.toUpperCase()}</span>
            </div>
            <div class="portofolio-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="portofolio-tech">
                    ${item.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;
        portofolioGrid.appendChild(card);
    });
}

// ===== FILTER BUTTONS =====
document.addEventListener('DOMContentLoaded', function () {
    // Render portofolio
    renderPortofolio('all');

    // Setup filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            renderPortofolio(filterValue);
        });
    });

    // Set active nav link
    setActiveNavLink();

    // Setup mobile nav
    setupMobileNav();

    // Setup lightbox foto sertifikat
    setupLightbox();
});

// ===== LIGHTBOX (POPUP FOTO SERTIFIKAT & FOTO PROYEK) =====
function setupLightbox() {
    const overlay = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');

    if (!overlay || !lightboxImg) return;

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || 'Preview';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event delegation: berlaku juga untuk gambar portofolio yang
    // di-render ulang setiap kali tombol filter diklik.
    document.addEventListener('click', function (e) {
        const trigger = e.target.closest('.lightbox-trigger');
        if (trigger) {
            openLightbox(trigger.src, trigger.alt);
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    // Klik di luar gambar (area overlay) untuk menutup
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
    });

    // Tekan Escape untuk menutup
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });
}

// ===== MOBILE NAV TOGGLE =====
function setupMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.getElementById('navOverlay');

    if (!navToggle || !navMenu) return;

    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMenu() {
        navToggle.classList.add('active');
        navMenu.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    navToggle.addEventListener('click', function () {
        const isActive = navMenu.classList.contains('active');
        isActive ? closeMenu() : openMenu();
    });

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Close menu whenever a link is tapped
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on resize back to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) closeMenu();
    });
}

// ===== SET ACTIVE NAV LINK =====
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop();

    // Map halaman ke file
    let activePage = 'home_index.html';
    if (currentFile.includes('about')) activePage = 'about_page.html';
    else if (currentFile.includes('portofolio')) activePage = 'portofolio_page.html';
    else if (currentFile.includes('contact')) activePage = 'contact_page.html';
    else if (currentFile === '') activePage = 'home_index.html';

    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Match link ke page
        if (
            (activePage === 'home_index.html' && href === 'index.html') ||
            (activePage === 'about_page.html' && href === 'about.html') ||
            (activePage === 'portofolio_page.html' && href === 'portofolio.html') ||
            (activePage === 'contact_page.html' && href === 'contact.html') ||
            (activePage === 'home_index.html' && href === 'index.html')
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (name && email && subject && message) {
            // Buat mailto link
            const mailtoLink = `mailto:khamilatulkhoiriyah10@gmail.com?subject=${encodeURIComponent(subject)}&body=Nama: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0APesan:%0A${encodeURIComponent(message)}`;

            // Buka email client
            window.location.href = mailtoLink;

            // Reset form
            contactForm.reset();

            // Tampilkan success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.remove('hidden');

                // Hilangkan setelah 5 detik
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            }
        }
    });
}
