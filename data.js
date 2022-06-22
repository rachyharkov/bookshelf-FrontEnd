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

function updateBukuAction(bookId, judulBuku, authorBuku, yearBuku) {
    let index = findBukuIndex(bookId);
    if(index >= 0){
        books[index].judulBuku = judulBuku;
        books[index].authorBuku = authorBuku;
        books[index].yearBuku = yearBuku;

        updateDataToStorage()
    }
}

function tambahBukuAction(judulBuku, authorBuku, yearBuku, telahDibaca) {
    const bookObject = composeObjectBuku(judulBuku, authorBuku, yearBuku, telahDibaca);
    books.push(bookObject);
    updateDataToStorage();
}

function composeObjectBuku(judulBuku, authorBuku, yearBuku, telahDibaca) {
    return {
        id: +new Date(),
        judulBuku,
        authorBuku,
        yearBuku,
        telahDibaca
    };
}

function findBuku(idBuku) {
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