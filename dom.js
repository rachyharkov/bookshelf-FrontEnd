const BELUM_DIBACA = "incompleteBookshelfList";
const SUDAH_DIBACA = "completeBookshelfList";
const BUKU_ITEMID = "id";

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
    bookOperationElement.append(buatTombolGantiStatusBuku(dimana),buatTombolBuangBuku())

    textContainerElement.append(a,b,c, bookOperationElement);
    rakBuku.append(textContainerElement)

    const bookObject = composeBooksObject(a.innerText,b.innerText,c.innerText,d.innerText);
    textContainerElement[BUKU_ITEMID] = bookObject.id;
    //console.log(textContainerElement[BUKU_ITEMID])
    updateDataToStorage();

    return textContainerElement
}

function masukanBuku() {
    const judulBukuTextElement = document.createElement("h3");
    const judulBukuText = document.getElementById('inputBookTitle').value   
    judulBukuTextElement.innerHTML = judulBukuText;
 
    const authorTextElement = document.createElement("p");
    const authorText = document.getElementById('inputBookAuthor').value
    authorTextElement.innerHTML = 'Penulis: <span>' + authorText + '</span>'

    const yearTextElement = document.createElement("p");
    const yearText = document.getElementById('inputBookYear').value
    yearTextElement.innerHTML = 'Tahun: <span>' + yearText + '</span>'

    const selesaiDibacaStatus = document.getElementById('inputBookIsComplete').checked
    if(selesaiDibacaStatus === false) {
        simpanBuku(BELUM_DIBACA,judulBukuTextElement,authorTextElement,yearTextElement,selesaiDibacaStatus)
    } else {
        simpanBuku(SUDAH_DIBACA,judulBukuTextElement,authorTextElement,yearTextElement,selesaiDibacaStatus)
    }
    const bookObject = composeBooksObject(judulBukuText,authorText,yearText,selesaiDibacaStatus);
    books.push(bookObject);
}

function buatTombolBuangBuku() {
    return createButton("red", "Belum Dibaca", function (event) {
        buangBuku(event.target.parentElement);
    });
}

function buatTombolGantiStatusBuku(rak) {
    if(rak == 'completeBookshelfList'){
        return createButton("green", "Belum Dibaca", function (event) {
            gantiStatus(event.target.parentElement.parentElement, false);
        });
    } else {
        return createButton("green", "Sudah Dibaca", function (event) {
            gantiStatus(event.target.parentElement.parentElement, true);
        });
    }
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

function buangBuku(bookElement) {
    const posisiBuku = findBukuIndex(taskElement[TODO_ITEMID]);
    books.splice(posisiBuku, 1);

    bookElement.remove();
    updateDataToStorage();
}

function gantiStatus(bookElement, status) {

    const judulBuku = bookElement.querySelector('.book_item > h3')
    const authorBuku = bookElement.querySelector('.book_item > p:nth-child(2)')
    const yearBuku = bookElement.querySelector('.book_item > p:nth-child(3)')
    console.log(judulBuku)
    if(status === true) {
        const listSudahDibaca = document.getElementById(SUDAH_DIBACA);
        const newBook = simpanBuku(SUDAH_DIBACA,judulBuku, authorBuku, yearBuku, true);
    
        const book = findBook(bookElement[BUKU_ITEMID]);
        book.isComplete = true;
        newBook[BUKU_ITEMID] = book.id;
        listSudahDibaca.append(newBook);
        bookElement.remove();
        updateDataToStorage();
    } else {
        const listBelumDibaca = document.getElementById(BELUM_DIBACA);
        const newBook = simpanBuku(BELUM_DIBACA,judulBuku, authorBuku, yearBuku, false);
    
        const book = findBook(bookElement[BUKU_ITEMID]);
        book.isComplete = false;
        newBook[BUKU_ITEMID] = book.id;
        listBelumDibaca.append(newBook);
        bookElement.remove();
        updateDataToStorage();
    }
}