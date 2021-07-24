function showformaddbuku() {
    document.getElementById('formbuku').classList.add('tampil')
}

function closeformaddbuku() {
    document.getElementById('formbuku').classList.remove('tampil')
}

function insertToLocalStorage(a ,b ,c ,d) {
    const newUserData = {
        id: +new Date(),
        title: a,
        author: b,
        year: c,
        isComplete: d,
    }
}

function simpanBuku(dimana) {
    const incompleteBookshelfListElement = document.getElementById(dimana)
    
    const textContainerElement = document.createElement("article");
    textContainerElement.classList.add('book_item')
    
    const bookOperationElement = document.createElement("div");
    bookOperationElement.classList.add('action')
    const buttons = "<button class='green'>Selesai dibaca</button><button class='red'>Hapus buku</button>"
    bookOperationElement.innerHTML = buttons

    textContainerElement.append(judulBukuTextElement, authorTextElement, bookOperationElement);
    incompleteBookshelfListElement.append(textContainerElement)
    
    

    insertToLocalStorage(judulBukuText,authorText,yearText, selesaiDibaca)
    
 
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
    if(selesaiDibacaStatus === true) {
        simpanBuku('incompleteBookshelfList')
    } else {
        simpanBuku('completeBookshelfList')
    }
    insertToLocalStorage()
}