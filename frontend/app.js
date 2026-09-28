const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const uploadContent = document.getElementById("uploadContent");
const detectBtn = document.getElementById("detectBtn");
const result = document.getElementById("result");

const diseaseName = document.getElementById("diseaseName");
const confidence = document.getElementById("confidence");
const suggestion = document.getElementById("suggestion");

let selectedImage = null;

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    selectedImage = file;

    const reader = new FileReader();

    reader.onload = function (event) {
        preview.src = event.target.result;
        preview.style.display = "block";
        uploadContent.style.display = "none";
        result.style.display = "none";
    };

    reader.readAsDataURL(file);
});

detectBtn.addEventListener("click", function () {

    if (!selectedImage) {
        alert("Please upload a crop image first.");
        return;
    }

    detectBtn.textContent = "🔄 Analyzing...";
    detectBtn.disabled = true;

    setTimeout(function () {

        /*
         * Demo result.
         *
         * Later this section can be connected
         * to your Machine Learning / Python API.
         */

        diseaseName.textContent = "Leaf Disease Detected";
        confidence.textContent = "92%";

        suggestion.textContent =
            "The crop may be affected by a leaf disease. " +
            "Check the affected area regularly and consult " +
            "an agricultural expert for suitable treatment.";

        result.style.display = "block";

        detectBtn.textContent = "🔍 Detect Disease";
        detectBtn.disabled = false;

    }, 1500);
});