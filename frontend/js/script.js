const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const uploadContent = document.getElementById("uploadContent");
const uploadBox = document.getElementById("uploadBox");

const cropSelect = document.getElementById("cropSelect");
const detectBtn = document.getElementById("detectBtn");
const resetBtn = document.getElementById("resetBtn");

const resultPlaceholder = document.getElementById("resultPlaceholder");
const resultContent = document.getElementById("resultContent");

const diseaseName = document.getElementById("diseaseName");
const confidenceValue = document.getElementById("confidenceValue");
const progressBar = document.getElementById("progressBar");
const resultCrop = document.getElementById("resultCrop");
const recommendation = document.getElementById("recommendation");

const errorMessage = document.getElementById("errorMessage");

let selectedImage = null;

imageInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        showError("Please select a valid image file.");
        return;
    }

    selectedImage = file;
    errorMessage.textContent = "";

    const imageURL = URL.createObjectURL(file);

    previewImage.src = imageURL;
    previewImage.style.display = "block";
    uploadContent.style.display = "none";
});

uploadBox.addEventListener("dragover", function (event) {
    event.preventDefault();
    uploadBox.style.background = "#eef9f1";
});

uploadBox.addEventListener("dragleave", function () {
    uploadBox.style.background = "#fbfefb";
});

uploadBox.addEventListener("drop", function (event) {
    event.preventDefault();

    uploadBox.style.background = "#fbfefb";

    const file = event.dataTransfer.files[0];

    if (!file || !file.type.startsWith("image/")) {
        showError("Please drop a valid image file.");
        return;
    }

    selectedImage = file;
    imageInput.files = event.dataTransfer.files;

    const imageURL = URL.createObjectURL(file);

    previewImage.src = imageURL;
    previewImage.style.display = "block";
    uploadContent.style.display = "none";

    errorMessage.textContent = "";
});

detectBtn.addEventListener("click", function () {

    const crop = cropSelect.value;

    if (!crop) {
        showError("Please select a crop.");
        return;
    }

    if (!selectedImage) {
        showError("Please upload a leaf image.");
        return;
    }

    errorMessage.textContent = "";

    detectBtn.disabled = true;
    detectBtn.textContent = "🔄 Analyzing...";

    setTimeout(function () {

        const result = getDemoPrediction(crop);

        diseaseName.textContent = result.disease;
        confidenceValue.textContent = result.confidence + "%";
        resultCrop.textContent = crop;
        recommendation.textContent = result.recommendation;

        resultPlaceholder.style.display = "none";
        resultContent.style.display = "block";

        progressBar.style.width = "0%";

        setTimeout(function () {
            progressBar.style.width = result.confidence + "%";
        }, 100);

        detectBtn.disabled = false;
        detectBtn.textContent = "🔍 Detect Disease";

    }, 1200);
});

resetBtn.addEventListener("click", function () {

    selectedImage = null;

    imageInput.value = "";
    cropSelect.value = "";

    previewImage.src = "";
    previewImage.style.display = "none";
    uploadContent.style.display = "block";

    resultContent.style.display = "none";
    resultPlaceholder.style.display = "block";

    progressBar.style.width = "0%";

    errorMessage.textContent = "";

    window.scrollTo({
        top: document.getElementById("detect").offsetTop - 70,
        behavior: "smooth"
    });
});

function showError(message) {
    errorMessage.textContent = message;
}

function getDemoPrediction(crop) {

    const predictions = {

        Tomato: {
            disease: "Tomato Leaf Disease",
            confidence: 92,
            recommendation:
                "Remove affected leaves, improve air circulation, and monitor the plant regularly."
        },

        Potato: {
            disease: "Potato Leaf Disease",
            confidence: 89,
            recommendation:
                "Remove infected leaves and maintain proper watering and field hygiene."
        },

        Corn: {
            disease: "Corn Leaf Disease",
            confidence: 87,
            recommendation:
                "Monitor infected areas and maintain good crop sanitation."
        },

        Rice: {
            disease: "Rice Leaf Disease",
            confidence: 90,
            recommendation:
                "Inspect nearby plants and maintain suitable field water management."
        },

        Wheat: {
            disease: "Wheat Leaf Disease",
            confidence: 88,
            recommendation:
                "Remove severely affected plant material and monitor disease spread."
        },

        Apple: {
            disease: "Apple Leaf Disease",
            confidence: 91,
            recommendation:
                "Remove affected leaves and maintain proper orchard sanitation."
        }
    };

    return predictions[crop] || {
        disease: "Disease Detected",
        confidence: 85,
        recommendation:
            "Please consult an agricultural expert for further diagnosis."
    };
}