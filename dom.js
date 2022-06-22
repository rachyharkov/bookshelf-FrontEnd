const BELUM_DIBACA = "incompleteBookshelfList";
const SUDAH_DIBACA = "completeBookshelfList";
const BUKU_ITEMID = "id";

function tampilkanFormBuku() {
    document.getElementById('formbuku').classList.add('tampil')
}

function tutupFormBuku() {
    document.getElementById('formbuku').classList.remove('tampil')
}

function simpanBuku(a, b, c, d) {
    const rakBuku = document.getElementById('bookshelfList')
    
    const textContainerElement = document.createElement("article");
    textContainerElement.classList.add('book_item')
    
    const actionBookElement = document.createElement("div");
    actionBookElement.classList.add('action')
    actionBookElement.append(buatTombolGantiStatusBuku(d),buatTombolBuangBuku())

    textContainerElement.append(a,b,c, actionBookElement);
    rakBuku.append(textContainerElement)

    const bookObject = composeObjectBuku(a.innerText,b.innerText,c.innerText,d.innerText);
    textContainerElement[BUKU_ITEMID] = bookObject.id;
    updateDataToStorage();

    return textContainerElement
}

function cleanSearchTextbox() {
    document.getElementById('searchBookTitle').value = '';
}

function refreshDataFromLocalstorage() {

    const bookshelfSelect = document.getElementById('bookshelf-selection').value

    const listWrapper = document.getElementById('bookshelfList');

    listWrapper.innerHTML = '';

    let count = 0;

    
    for(book of books){

        const statusbaca = book.telahDibaca ? SUDAH_DIBACA : BELUM_DIBACA;
        
        if(statusbaca == bookshelfSelect) {
            const newBook = tampilkanBukudariStorage(book.judulBuku, book.authorBuku, book.yearBuku, book.telahDibaca);
            newBook[BUKU_ITEMID] = book.id;
            listWrapper.append(newBook);
            count++;
        }
    }

    const statusbacanya = bookshelfSelect == SUDAH_DIBACA ? "Sudah Dibaca disini, mulai tandakan buku yang belum anda baca sebagai 'Sudah Dibaca' atau tambah baru." : "Belum Dibaca, mulai tambahkan buku pada tombol 'tambah'.";

    if(count <= 0) {
        listWrapper.innerHTML = `<div class="alert bg-red">
            <p style="color: white; font-size: 11px;">
                <b>Oops!</b> Tidak ada buku yang ${statusbacanya}
            </p>
        </div>`;
    }  
}

function masukanBuku() {
    let judulBukuText = document.getElementById('inputBookTitle').value
 
    let authorText = document.getElementById('inputBookAuthor').value

    let yearText = document.getElementById('inputBookYear').value

    let selesaiDibacaStatus = document.getElementById('inputBookIsComplete').checked
    
    
    tambahBukuAction(judulBukuText, authorText, yearText, selesaiDibacaStatus);
    
    refreshDataFromLocalstorage();

    document.getElementById('inputBookTitle').value = '';
    document.getElementById('inputBookAuthor').value = '';
    document.getElementById('inputBookYear').value = '';
    document.getElementById('inputBookIsComplete').checked = false;
}

function tampilkanBukudariStorage(a, b, c, d) {
    const judulBukuTextElement = document.createElement("h3");
    judulBukuTextElement.classList.add('editing-state')
    judulBukuTextElement.innerHTML = a;
 
    const authorTextElement = document.createElement("p");
    authorTextElement.innerHTML = 'Penulis: <span class="editing-state">' + b + '</span>'

    const yearTextElement = document.createElement("p");
    yearTextElement.innerHTML = 'Tahun: <span class="editing-state">' + c + '</span>'

    const selesaiDibacaStatus = d

    if(selesaiDibacaStatus) {
        const textContainerElement = document.createElement("article");
        textContainerElement.classList.add('book_item')
        
        const actionBookElement = document.createElement("div");
        actionBookElement.classList.add('action')
        actionBookElement.append(buatTombolGantiStatusBuku(false),buatTombolEditBuku(),buatTombolBuangBuku())

        textContainerElement.append(judulBukuTextElement, authorTextElement, yearTextElement, actionBookElement);

        return textContainerElement
    } else {
        const textContainerElement = document.createElement("article");
        textContainerElement.classList.add('book_item')
        
        const actionBookElement = document.createElement("div");
        actionBookElement.classList.add('action')
        actionBookElement.append(buatTombolGantiStatusBuku(true),buatTombolEditBuku(),buatTombolBuangBuku())

        textContainerElement.append(judulBukuTextElement, authorTextElement, yearTextElement, actionBookElement);
        return textContainerElement
    }
}

function editingBuku(bookElement) {
    
    const judulBukuTextElement = bookElement.childNodes[0];
    const authorTextElement = bookElement.childNodes[1].childNodes[1];
    const yearTextElement = bookElement.childNodes[2].childNodes[1];

    const actionBookElement = bookElement.childNodes[3];

    const judulBukuText = judulBukuTextElement.innerText
    const authorText = authorTextElement.innerText
    const yearText = yearTextElement.innerText
    
    const inputJudulBuku = document.createElement("input");
    inputJudulBuku.classList.add('editing-state')
    inputJudulBuku.setAttribute('type', 'text')
    inputJudulBuku.setAttribute('placeholder', 'Judul Buku')
    inputJudulBuku.value = judulBukuText
    
    const inputAuthor = document.createElement("input");
    inputAuthor.classList.add('editing-state')
    inputAuthor.setAttribute('type', 'text')
    inputAuthor.setAttribute('placeholder', 'Penulis')
    inputAuthor.value = authorText
    
    const inputYear = document.createElement("input");
    inputYear.classList.add('editing-state')
    inputYear.setAttribute('type', 'number')
    inputYear.setAttribute('placeholder', 'Tahun')
    inputYear.value = yearText
    
    judulBukuTextElement.replaceWith(inputJudulBuku);
    authorTextElement.replaceWith(inputAuthor);
    yearTextElement.replaceWith(inputYear);
    
    const tombolSimpanBuku = document.createElement("button");
    tombolSimpanBuku.classList.add('editing-state')
    tombolSimpanBuku.innerHTML = 'Simpan'
    tombolSimpanBuku.addEventListener('click', function() {
        updateBukuAction(bookElement.id, inputJudulBuku.value, inputAuthor.value, inputYear.value)
        alert('Buku berhasil diperbarui')
        refreshDataFromLocalstorage()

    })

    const tombolBatalEdit = document.createElement("button");
    tombolBatalEdit.classList.add('editing-state', 'red')
    tombolBatalEdit.innerHTML = 'Batal'
    tombolBatalEdit.addEventListener('click', function() {
        refreshDataFromLocalstorage()
    })

    actionBookElement.innerHTML = '';
    actionBookElement.append(tombolSimpanBuku);
    actionBookElement.append(tombolBatalEdit);
}

function buatTombolBuangBuku() {
    return createButton("red", "Hapus Buku", function (event) {
        buangBuku(event.target.parentElement.parentElement);
    });
}

function buatTombolEditBuku() {
    return createButton("green", "Edit", function (event) {        
        editingBuku(event.target.parentElement.parentElement);
    });
}

function buatTombolGantiStatusBuku(rak) {
    if(rak){
        return createButton("green", "Sudah Dibaca", function (event) {
            gantiStatus(event.target.parentElement.parentElement, true);
        });
    }
    
    return createButton("green", "Belum Dibaca", function (event) {
        gantiStatus(event.target.parentElement.parentElement, false);
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

function buangBuku(bookElement) {
    if (confirm("Yakin ingin menghapus buku ini?")) {
        const posisiBuku = findBukuIndex(bookElement.id);
        books.splice(posisiBuku, 1);

        bookElement.remove();
        updateDataToStorage();
        refreshDataFromLocalstorage()
        return
    }
    return
}

function gantiStatus(bookElement, status) {

    const judulBuku = bookElement.querySelector('.book_item > h3')
    const authorBuku = bookElement.querySelector('.book_item > p:nth-child(2)')
    const yearBuku = bookElement.querySelector('.book_item > p:nth-child(3)')

    if(status) {

        const newBook = simpanBuku(SUDAH_DIBACA,judulBuku, authorBuku, yearBuku, false);
        const book = findBuku(Number(bookElement[BUKU_ITEMID]));
        book.telahDibaca = true;
        newBook[BUKU_ITEMID] = book.id;
        bookElement.remove();
        updateDataToStorage();
    } else {
        const newBook = simpanBuku(BELUM_DIBACA,judulBuku, authorBuku, yearBuku, true);
        const book = findBuku(Number(bookElement[BUKU_ITEMID]));
        book.telahDibaca = false;
        newBook[BUKU_ITEMID] = book.id;
        bookElement.remove();
        updateDataToStorage();
    }

    refreshDataFromLocalstorage();
    
}

function cariBuku() {

    const cariBuku = document.getElementById('searchBookTitle').value;
    const listWrapper = document.getElementById('bookshelfList');
    listWrapper.innerHTML = '';

    if(cariBuku === '') {
        refreshDataFromLocalstorage();
        return
    }

    const bookshelfSelect = document.getElementById('bookshelf-selection').value

    const hasilCari = books.filter(function (book) {

        const statusbaca = book.telahDibaca ? SUDAH_DIBACA : BELUM_DIBACA;
        
        if(statusbaca === bookshelfSelect) {
            return book.judulBuku.toLowerCase().includes(cariBuku.toLowerCase())
        }
    })


    if(hasilCari.length === 0) {
        const notFound = document.createElement("h3");
        notFound.innerHTML = 'Tidak ditemukan buku dengan judul "' + cariBuku + '"'
        listWrapper.append(notFound);
        return
    }

    hasilCari.forEach(function (book) {
        const bookElement = tampilkanBukudariStorage(book.judulBuku, book.authorBuku, book.yearBuku, book.telahDibaca);
        bookElement[BUKU_ITEMID] = book.id;
        listWrapper.append(bookElement);
    })
}
