document.addEventListener("DOMContentLoaded", function () {
     
    const submitForm = document.getElementById("inputBookform");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        masukanBuku();
        closeformaddbuku()
    });

    document.getElementById('addBuku').onclick = showformaddbuku
    document.getElementById('gobackbtn').onclick = closeformaddbuku
});