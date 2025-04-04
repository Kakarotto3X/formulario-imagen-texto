function updateImages() {
    const file1 = document.getElementById("file-1").files[0];
    const file2 = document.getElementById("file-2").files[0];
    const desc1 = document.getElementById("desc-1").value;
    const desc2 = document.getElementById("desc-2").value;

    if (file1 && file2) {
        const reader1 = new FileReader();
        const reader2 = new FileReader();

        reader1.onload = function (e) {
            document.getElementById("img-1").src = e.target.result;
        };
        reader2.onload = function (e) {
            document.getElementById("img-2").src = e.target.result;
        };

        reader1.readAsDataURL(file1);
        reader2.readAsDataURL(file2);

        // Actualiza las descripciones
        document.getElementById("desc-1").value = desc1;
        document.getElementById("desc-2").value = desc2;

        alert("¡Datos actualizados exitosamente!");
    } else {
        alert("Por favor, selecciona ambas imágenes.");
    }
}
