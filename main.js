document.addEventListener("DOMContentLoaded", function () {
     
    const submitForm = document.getElementById("inputBookform");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        masukanBuku();
        tutupFormBuku()
    });

    document.getElementById('addBuku').onclick = tampilkanFormBuku
    document.getElementById('gobackbtn').onclick = tutupFormBuku
    
    document.getElementById('bookshelf-selection').onchange = (() => {
        refreshDataFromLocalstorage();

        cleanSearchTextbox();
    })

    document.getElementById('searchBookTitle').oninput = cariBuku

    

    if(isStorageExist()){
        loadDataFromStorage();
    }

});

document.addEventListener("ondatasaved", () => {
    console.log("data saved")
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromLocalstorage()
});


