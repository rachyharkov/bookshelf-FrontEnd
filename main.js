document.addEventListener("DOMContentLoaded", function () {
     
    const submitForm = document.getElementById("inputBookform");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        masukanBuku();
        tutupFormBuku()
    });

    document.getElementById('addBuku').onclick = tampilkanFormBuku
    document.getElementById('gobackbtn').onclick = tutupFormBuku

    // kustom aja
    // detect bookshelf-selection changed value
    document.getElementById('bookshelf-selection').onchange = refreshDataFromLocalstorage

    document.getElementById('searchBookTitle').oninput = cariBuku

    if(isStorageExist()){
        loadDataFromStorage();
    }

});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    console.log('test')
    refreshDataFromLocalstorage()
});


