const STORAGE_KEY = "BOOKSHELF_APP";

let books = [];
function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    } 
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

function updatebook(bookId, judulBuku, authorBuku, yearBuku) {
    let index = findBukuIndex(bookId);
    if(index >= 0){

        console.log(books[index])

        // update data
        books[index].judulBuku = judulBuku;
        books[index].authorBuku = authorBuku;
        books[index].yearBuku = yearBuku;

        console.log(books[index])

        updateDataToStorage()
    }
}

function composeBooksObject(judulBuku, authorBuku, yearBuku, telahDibaca) {
    return {
        id: +new Date(),
        judulBuku,
        authorBuku,
        yearBuku,
        telahDibaca
    };
}

function findBook(idBuku) {
    for(book of books){
        if(book.id === idBuku)
            return book;   
    }
    return null;
}

function findBukuIndex(bookId) {
    let index = 0
    for (book of books) {
        if(book.id == bookId)
            return index;

        index++;
    }
    return -1;
}