📦 Fast-STO-Webform
├── 📄 index.html      # Struktur utama halaman web &amp; form UI
├── 🎨 style.css       # Desain, layout responsif, dan animasi
├── ⚙️ script.js       # Logika aplikasi (kamera, GPS, barcode, kompresi)
├── 🚀 README.md       # Dokumentasi panduan dan informasi project
└── 📂 backend/        # (Opsional) Folder untuk menyimpan backup kode server
    └── 📜 Code.gs     # Script Google Apps Script (GAS) untuk catch backend


## 🛠️ Framework &amp; Tech Stack

Frontend (Client-Side)
├── 🌐 Core UI &amp; Logic
│   ├── HTML5 (Semantic &amp; Mobile Camera Capture)
│   ├── CSS3 (Vanilla, CSS Variables, Flexbox, Animations)
│   └── Vanilla JavaScript (ES6+, DOM Manipulation)
│
├── 📦 Libraries &amp; Assets
│   ├── HTML5-QRCode (In-browser Barcode/QR Scanner)
│   ├── Google Fonts (Roboto Mono)
│   └── Inline SVG Icons (Viewfinder)
│
└── 🔌 Native Web APIs (Browser Features)
    ├── Geolocation API (GPS coordinate tracking)
    ├── Canvas API (Client-side image compression &amp; Watermarking)
    ├── File API / FileReader (Media handling)
    └── Fetch API (Asynchronous HTTP requests)

External Services &amp; APIs
└── 🗺️ Nominatim OpenStreetMap API (Reverse Geocoding / Lat-Long to Address)

Backend &amp; Storage (Serverless Architecture)
├── ⚙️ Logic / Server
│   └── Google Apps Script (GAS) API Endpoint
│
└── 🗄️ Database &amp; File Storage
    ├── Google Sheets (Data logging &amp; inventory records)
    └── Google Drive (Image &amp; Video file storage)

Deployment &amp; Hosting
└── 🚀 GitHub Pages (Static web hosting)
