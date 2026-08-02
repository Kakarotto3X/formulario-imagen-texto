const MAX_FILE_SIZE_MB = 5;

const slots = [1, 2].map((n) => ({
    id: n,
    fileInput: document.getElementById(`file-${n}`),
    img: document.getElementById(`img-${n}`),
    placeholder: document.getElementById(`placeholder-${n}`),
    desc: document.getElementById(`desc-${n}`),
    counter: document.getElementById(`counter-${n}`),
    clearBtn: document.getElementById(`clear-${n}`),
}));

const feedback = document.getElementById("feedback-msg");
const updateBtn = document.getElementById("update-btn");

function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback-msg ${type}`;
}

function isValidImage(file) {
    if (!file.type.startsWith("image/")) return false;
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > MAX_FILE_SIZE_MB) return false;
    return true;
}

// Previsualiza cada imagen apenas se selecciona, de forma independiente
// (antes era obligatorio elegir AMBAS imágenes para que cualquiera se mostrara).
slots.forEach((slot) => {
    slot.fileInput.addEventListener("change", () => {
        const file = slot.fileInput.files[0];
        if (!file) return;

        if (!isValidImage(file)) {
            showFeedback(
                `"${file.name}" no es válida. Usa una imagen de máximo ${MAX_FILE_SIZE_MB}MB.`,
                "error"
            );
            slot.fileInput.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            slot.img.src = e.target.result;
            slot.img.hidden = false;
            slot.placeholder.hidden = true;
            updateAltText(slot);
        };
        reader.readAsDataURL(file);
    });
});

// Mantiene el "alt" de la imagen sincronizado con la descripción escrita,
// para que quien use un lector de pantalla reciba el mismo contexto.
function updateAltText(slot) {
    const text = slot.desc.value.trim();
    slot.img.alt = text ? `Imagen ${slot.id}: ${text}` : `Vista previa de la imagen ${slot.id}`;
}

// Contador de caracteres en vivo para cada descripción (límite de 200).
slots.forEach((slot) => {
    const maxLength = Number(slot.desc.getAttribute("maxlength")) || 200;

    const refreshCounter = () => {
        const length = slot.desc.value.length;
        slot.counter.textContent = `${length}/${maxLength}`;
        slot.counter.classList.toggle("limit-close", length >= maxLength - 20);
    };

    slot.desc.addEventListener("input", () => {
        refreshCounter();
        updateAltText(slot);
    });

    refreshCounter();
});

// Botón "Limpiar": borra la imagen y la descripción de ese espacio en particular.
slots.forEach((slot) => {
    slot.clearBtn.addEventListener("click", () => {
        slot.fileInput.value = "";
        slot.img.src = "";
        slot.img.hidden = true;
        slot.img.alt = `Vista previa de la imagen ${slot.id}`;
        slot.placeholder.hidden = false;
        slot.desc.value = "";
        slot.counter.textContent = `0/${slot.desc.getAttribute("maxlength") || 200}`;
        slot.counter.classList.remove("limit-close");
        showFeedback(`Espacio ${slot.id} limpiado.`, "success");
    });
});

function updateImages() {
    const hasAtLeastOneImage = slots.some((slot) => slot.img.src && !slot.img.hidden);

    if (!hasAtLeastOneImage) {
        showFeedback("Selecciona al menos una imagen antes de actualizar.", "error");
        return;
    }

    // Las descripciones ya se actualizan en vivo mientras se escriben;
    // aquí solo confirmamos el guardado al usuario.
    showFeedback("¡Datos actualizados correctamente!", "success");
}

updateBtn.addEventListener("click", updateImages);
