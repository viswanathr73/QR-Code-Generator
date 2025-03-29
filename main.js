const input = document.getElementById("qrCodeUrl");
const button = document.getElementById("qrCodeGenerate");
const image = document.getElementById("qrCodeImage");
const sizeSelect = document.getElementById("qrSize");
const colorInput = document.getElementById("qrColor");
const downloadButton = document.getElementById("downloadQR");
const errorMessage = document.getElementById("errorMessage");

button.addEventListener("click", async () => {
    // Reset previous state
    errorMessage.textContent = "";
    image.style.display = "none";
    downloadButton.style.display = "none";

    const url = input.value.trim();
    
    // Basic validation
    if (!url) {
        errorMessage.textContent = "Please enter a URL or text";
        return;
    }

    try {
        // Generate QR Code
        const size = parseInt(sizeSelect.value);
        const color = colorInput.value;

        const dataUrl = await QRCode.toDataURL(url, {
            width: size,
            height: size,
            colorDark: color,
            colorLight: "#ffffff"
        });

        // Display QR Code
        image.src = dataUrl;
        image.style.display = "block";
        downloadButton.style.display = "block";
    } catch (error) {
        errorMessage.textContent = "Failed to generate QR Code. Please try again.";
        console.error(error);
    }
});

// Download functionality
downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "qr_code.png";
    link.href = image.src;
    link.click();
});