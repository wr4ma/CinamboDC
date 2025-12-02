const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwmSsE_HDv4uIrGShRh85DuGn0wftRab6JNG3DxvTw_-ePQyMuosP2Jn6bSCCLQwxlFgA/exec";

const form = document.getElementById('opnameForm');
const submitButton = document.getElementById('submitButton');
const statusDiv = document.getElementById('status');
const fileInput = document.getElementById('fotoAsset');
const jenisAssetSelect = document.getElementById('jenisAsset');
const jenisAssetLainnyaDiv = document.getElementById('jenisAssetLainnyaDiv');
const jenisAssetLainnyaInput = document.getElementById('jenisAssetLainnya');

const modal = document.getElementById("guideModal");
const btn = document.getElementById("guideBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
    modal.classList.remove("hide");
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("hide");
    }, 300);
}

span.onclick = closeModal;

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

jenisAssetSelect.addEventListener('change', function() {
    if (this.value === 'Lainnya') {
        jenisAssetLainnyaDiv.style.display = 'block';
        jenisAssetLainnyaInput.required = true;
    } else {
        jenisAssetLainnyaDiv.style.display = 'none';
        jenisAssetLainnyaInput.required = false;
        jenisAssetLainnyaInput.value = '';
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const serialNumber = document.getElementById('serialNumber').value;
    const deviceId = document.getElementById('deviceId').value;
    if (!serialNumber.trim() || !deviceId.trim()) {
        alert("Serial Number dan Device ID tidak boleh kosong.");
        return;
    }

    if (jenisAssetSelect.value === 'Lainnya' && !jenisAssetLainnyaInput.value.trim()) {
        alert("Silakan isi Jenis Asset Lainnya.");
        return;
    }

    const file = fileInput.files[0];
    if (!file) {
        alert('Silakan ambil foto aset terlebih dahulu.');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Mencari Lokasi...';
    statusDiv.style.display = 'none';

    getLocationAndProcess(file);
});

function getLocationAndProcess(file) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=id`)
                    .then(response => response.json())
                    .then(data => {
                        const address = data.display_name || `Lat: ${lat}, Lon: ${lon}`;
                        addTimestampAndUpload(file, address);
                    })
                    .catch(err => {
                        console.error("Gagal mendapatkan alamat:", err);
                        addTimestampAndUpload(file, `Lat: ${lat}, Lon: ${lon} (Gagal memuat alamat)`);
                    });
            },
            (error) => {
                console.error("Gagal mendapatkan GPS:", error);
                addTimestampAndUpload(file, "Lokasi tidak ditemukan (Pastikan GPS aktif)");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    } else {
        addTimestampAndUpload(file, "Browser tidak mendukung GPS");
    }
}

function addTimestampAndUpload(file, locationText) {
    submitButton.textContent = 'Mengompres Gambar...';
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const MAX_WIDTH = 1000;
            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const dateObj = new Date();
            
            const hours = String(dateObj.getHours()).padStart(2, '0');
            const minutes = String(dateObj.getMinutes()).padStart(2, '0');
            
            const day = String(dateObj.getDate()).padStart(2, '0'); 
            const monthNamesIndo = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            const month = monthNamesIndo[dateObj.getMonth()];
            const year = dateObj.getFullYear();

            const timestamp = `${hours}:${minutes} | ${day} ${month} ${year}`;
            
            const fontSize = Math.max(28, canvas.width * 0.04); 
            ctx.font = `bold ${fontSize}px Arial, sans-serif`;
            ctx.fillStyle = "white"; 
            ctx.textAlign = "left";
            ctx.textBaseline = "bottom";
            
            ctx.shadowColor = 'black';
            ctx.shadowBlur = 6;
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'black';

            const x = 20;
            let y = canvas.height - 25; 

            const addressFontSize = fontSize * 0.7; 
            ctx.font = `bold ${addressFontSize}px Arial, sans-serif`;
            
            const lineHeight = addressFontSize * 1.4;

            function wrapText(text, x, y, maxWidth, lineHeight) {
                const words = text.split(' ');
                let line = '';
                let lines = [];

                for(let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    const metrics = ctx.measureText(testLine);
                    const testWidth = metrics.width;
                    if (testWidth > maxWidth && n > 0) {
                        lines.push(line);
                        line = words[n] + ' ';
                    } else {
                        line = testLine;
                    }
                }
                lines.push(line);

                for (let k = lines.length - 1; k >= 0; k--) {
                    ctx.strokeText(lines[k], x, y);
                    ctx.fillText(lines[k], x, y);
                    y -= lineHeight;
                }
                return y;
            }

            const maxWidth = (canvas.width * 0.5) - 40;
            y = wrapText(locationText, x, y, maxWidth, lineHeight);

            y -= 10;
            ctx.font = `bold ${fontSize}px Arial, sans-serif`;
            ctx.strokeText(timestamp, x, y);
            ctx.fillText(timestamp, x, y);

            const monthNamesShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const dayStr = String(dateObj.getDate()).padStart(2, '0');
            const monthStr = monthNamesShort[dateObj.getMonth()];
            const formattedDateFilename = `${dayStr}-${monthStr}-${year}`;

            let jenisAsset = jenisAssetSelect.value;
            if (jenisAsset === 'Lainnya') {
                jenisAsset = jenisAssetLainnyaInput.value;
            }

            const serialNumber = document.getElementById('serialNumber').value;
            const customFileName = `STO-CinamboDC_${jenisAsset}-${serialNumber}-${formattedDateFilename}_wr4ma-.jpg`;
            
            const base64Data = canvas.toDataURL('image/jpeg', 0.7);
            
            const formData = {
                jenisAsset: jenisAsset,
                serialNumber: serialNumber,
                deviceId: document.getElementById('deviceId').value,
                kondisi: document.getElementById('kondisi').value,
                fileData: base64Data,
                mimeType: 'image/jpeg',
                fileName: customFileName
            };

            submitButton.textContent = 'Mengirim data...';

            fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "text/plain"
                }
            })
            .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    statusDiv.textContent = data.message;
                    statusDiv.className = 'success';
                    form.reset();
                    jenisAssetLainnyaDiv.style.display = 'none';
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                console.error('Error detail:', error);
                statusDiv.textContent = 'Gagal mengirim: ' + error.message + '. Coba refresh halaman.';
                statusDiv.className = 'error';
            })
            .finally(() => {
                statusDiv.style.display = 'block';
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            });
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
}