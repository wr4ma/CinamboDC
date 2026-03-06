## 📦 Fast STO Webform

```text
├── 📄 index.html      # Struktur utama halaman web & form UI
├── 🎨 style.css       # Desain, layout responsif, dan animasi
├── ⚙️ script.js       # Logika aplikasi (kamera, GPS, barcode, kompresi)
├── 🚀 README.md       # Dokumentasi panduan dan informasi project
└── 📂 backend/        # (Opsional) Folder untuk menyimpan backup kode server
    └── 📜 Code.gs     # Script Google Apps Script (GAS) untuk catch backend


## 🛠️ Framework & Tech Stack

Frontend (Client-Side)
├── 🌐 Core UI & Logic
│   ├── HTML5 (Semantic & Mobile Camera Capture)
│   ├── CSS3 (Vanilla, CSS Variables, Flexbox, Animations)
│   └── Vanilla JavaScript (ES6+, DOM Manipulation)
│
├── 📦 Libraries & Assets
│   ├── HTML5-QRCode (In-browser Barcode/QR Scanner)
│   ├── Google Fonts (Roboto Mono)
│   └── Inline SVG Icons (Viewfinder)
│
└── 🔌 Native Web APIs (Browser Features)
    ├── Geolocation API (GPS coordinate tracking)
    ├── Canvas API (Client-side image compression & Watermarking)
    ├── File API / FileReader (Media handling)
    └── Fetch API (Asynchronous HTTP requests)

External Services & APIs
└── 🗺️ Nominatim OpenStreetMap API (Reverse Geocoding / Lat-Long to Address)

Backend & Storage (Serverless Architecture)
├── ⚙️ Logic / Server
│   └── Google Apps Script (GAS) API Endpoint
│
└── 🗄️ Database & File Storage
    ├── Google Sheets (Data logging & inventory records)
    └── Google Drive (Image & Video file storage)

Deployment & Hosting
└── 🚀 GitHub Pages (Static web hosting)
