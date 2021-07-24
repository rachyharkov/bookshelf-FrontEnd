const BELUM_DIBACA = "incompleteBookshelfList";
const SUDAH_DIBACA = "completeBookshelfList";
const BUKU_ITEMID = "itemId";

function showformaddbuku() {
    document.getElementById('formbuku').classList.add('tampil')
}

function closeformaddbuku() {
    document.getElementById('formbuku').classList.remove('tampil')
}

function simpanBuku(dimana, a, b, c, d) {
    const rakBuku = document.getElementById(dimana)
    
    const textContainerElement = document.createElement("article");
    textContainerElement.classList.add('book_item')
    
    const bookOperationElement = document.createElement("div");
    bookOperationElement.classList.add('action')
    bookOperationElement.append(buatTombolGantiStatusBuku(),buatTombolBuangBuku())

    textContainerElement.append(a,b,c, bookOperationElement);
    rakBuku.append(textContainerElement)
    
    return textContainerElement;
}

function masukanBuku() {
    const judulBukuTextElement = document.createElement("h3");
    const judulBukuText = document.getElementById('inputBookTitle').value   
    judulBukuTextElement.innerText = judulBukuText;
 
    const authorTextElement = document.createElement("p");
    const authorText = document.getElementById('inputBookAuthor').value
    authorTextElement.innerText = 'Penulis: ' + authorText

    const yearTextElement = document.createElement("p");
    const yearText = document.getElementById('inputBookYear').value
    yearTextElement.innerText = 'Tahun: ' + yearText

    const selesaiDibacaStatus = document.getElementById('inputBookIsComplete').checked
    if(selesaiDibacaStatus === false) {
        const book = simpanBuku(BELUM_DIBACA,judulBukuTextElement,authorTextElement,yearTextElement,selesaiDibacaStatus)
    } else {
        const book = simpanBuku(SUDAH_DIBACA,judulBukuText,authorText,yearText,selesaiDibacaStatus)
    }

    const bookObject = composeBooksObject(judulBukuText,authorText,yearText,selesaiDibacaStatus);
    books.push(bookObject);
    updateDataToStorage();
}

function buatTombolBuangBuku() {
    return createButton("red", "Sudah Dibaca", function (event) {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function buatTombolGantiStatusBuku() {
    return createButton("green", "Belum Dibaca", function (event) {
        sudahDibaca(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, text , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerHTML = text
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function sudahDibaca(bookElement) {
    const listSudahDibaca = document.getElementById(SUDAH_DIBACA);
    const judulBuku = bookElement.querySelector(".inner > h2").innerText;
    const authorBuku = bookElement.querySelector(".inner > p:nth-child(2)").innerText;
    const yearBuku = bookElement.querySelector(".inner > p:nth-child(3)").innerText;

    const newBook = simpanBuku(listSudahDibaca,judulBuku, authorBuku, yearBuku, true);
     
    const book = findbook(bookElement[BUKU_ITEMID]);
    book.isComplete = true;
    newBook[BUKU_ITEMID] = book.id;

    listSudahDibaca.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}