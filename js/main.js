'use strict'

function init() {
	if (!localStorage.getItem('books')|| localStorage.getItem('books') === '[]') {
		createBooksDef()
	} else gBooks = loadFromStorage('books')
	renderFilterByQueryStringParams()
	gBooks.sort(_sortBooks)
	renderBooks()
}
function renderBooks() {
	saveToStorage('books', gBooks) //save last rendered state to localStorage
	var books = getFilteredBooks()
	if (gIsBookmark) books = getBookmarked(books)
	if (books.length > MAX_TABLE_SIZE) {
		//handle pages
		books = getPage(books)
		renderPageBtns()
	} else {
		gPageCount = 0 //just to remove the btn in single page
		renderPageBtns()
	}
	const headers = ['Id', 'Title', 'Price', 'Actions']
	var headStr = '<tr>'
	headers.forEach((header) => {
		
		if (header === 'Title') {
			var headerVal = 'title' //value to sort by for buttons
			// template strings are static so you have to generate a new one each time
			return (headStr += `<th>${header} ${getBtnTemplate(headerVal)}</th>`)
		}
		if (header === 'Price') {
			var headerVal = 'price'
			return (headStr += `<th>${header} ${getBtnTemplate(headerVal)}</th>`)
		}
		return (headStr += `<th>${header}</th>`)
	})
	headStr += '</tr>'

	var bodyStr = ''
	for (var book of books) {
		const actions = `<button onclick="onRead('${book.id}')" class="$read">Read</button><button onclick="onUpdateBook('${book.id}')" class="$update">Update</button><button onclick="onDelete('${book.id}')" class="$delete">Delete</button>`
		bodyStr += `<tr><td>${book.id}</td><td class ="title">${book.title} </td><td>${book.price}</td><td>${actions}</td></tr>`
	}
	const tableHead = document.querySelector('.book-table thead')
	const tableBody = document.querySelector('.book-table tbody')
	tableHead.innerHTML = headStr
	tableBody.innerHTML = bodyStr
}

function renderPageBtns() {
	const elBtnContainer = document.querySelector('.page-btn-container')
	elBtnContainer.innerHTML = ''
	for (var i = 1; i <= gPageCount; i++) {
		var btnStr = `<button onclick="onSetPage(${i})">${i}</button>`
		if (i === gCurrPage + 1)
			btnStr = `<button class="curr-page" onclick="onSetPage(${i})">${i}</button>`
		elBtnContainer.innerHTML += btnStr
	}
}

function handleKeyDown(ev) {
	if (ev.code === 'Enter') {
		const book = getInputValue()
		if (gIsUpdate) {
			updateBook(book.title, book.price)
			gBooks.sort(_sortBooks)
			renderBooks()
			gIsUpdate = false
			resetInputDisplay()
		} else {
			createBook(book.title, book.price)
			gBooks.sort(_sortBooks)
			renderBooks()
			resetInputDisplay()
		}
	}
}
function onGetInput() {
	const book = getInputValue()
	if (gIsUpdate) {
		updateBook(gCurrBook.id, book.title, book.price)
		gBooks.sort(_sortBooks)
		renderBooks()
		gIsUpdate = false
		resetInputDisplay()
	} else {
		createBook(book.title, book.price)
		gBooks.sort(_sortBooks)
		renderBooks()
		resetInputDisplay()
	}
}

function onDelete(id) {
	removeBook(id)
}

function onUpdateBook(bookId) {
	const elTitle = document.querySelector('[name=add-book-title]')
	const elPrice = document.querySelector('[name=add-book-price]')
	gCurrBook = getBook(bookId)
	elTitle.value = ''
	elPrice.value = ''
	elTitle.placeholder = gCurrBook.title
	elPrice.placeholder = gCurrBook.price
	gIsUpdate = true
}

function onRead(bookId) {
	const elInfoModal = document.querySelector('.book-info')
	const elModalTitle = elInfoModal.querySelector('h1')
	const elModalTxt = elInfoModal.querySelector('.txt')
	const elModalPrice = elInfoModal.querySelector('.price')
	const elModalBookmark = elInfoModal.querySelector('.bookmark')
	const elCurrRate = elInfoModal.querySelector('.rating')
	const book = getBook(bookId)
	gCurrBook = book
	if (book.isBookmarked) elModalBookmark.innerText = '🧡'
	else elModalBookmark.innerText = '🖤'
	elModalTitle.innerText = book.title
	elModalTxt.innerText = makeLorem()
	elModalPrice.innerText = book.price
	elInfoModal.style.display = 'block'
	elCurrRate.innerText = gCurrBook.rate
}

function onCloseModal(elModal) {
	elModal.style.display = 'none'
}
function onReduceRate(elModal) {
	const elRate = elModal.querySelector('.rating')
	if (gCurrBook.rate > 0) {
		elRate.innerText--
		changeRate(-1)
	}
}

function onIncreaseRate(elModal) {
	const elRate = elModal.querySelector('.rating')
	if (gCurrBook.rate < 10) {
		elRate.innerText++
		changeRate(1)
	}
}

function onSortBy(val = gSortBy, isAsc = gIsAsc) {
	gSortBy = val
	if (!isAsc) sortBooksDesc()
	else sortBooksAsc()
	gCurrPage = 0 //return to first page after after sort
	renderBooks()
}

function onSetFilterBy(filterBy) {
	filterBy = setBookFilter(filterBy)
	renderBooks()

	const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}`
	const newUrl =
		window.location.protocol +
		'//' +
		window.location.host +
		window.location.pathname +
		queryStringParams
	window.history.pushState({ path: newUrl }, '', newUrl)
}

function onBookmark(el) {
	if (toggleBookmark()) el.innerText = '🧡'
	else el.innerText = '🖤'
}

function renderFilterByQueryStringParams() {
	// Retrieve data from the current query-params
	const queryStringParams = new URLSearchParams(window.location.search)

	const filterBy = {
		maxPrice: queryStringParams.get('maxPrice') || '',
		minRate: +queryStringParams.get('minRate') || 0
	}

	if (!filterBy.maxPrice && !filterBy.minRate) return

	document.querySelector('.filter-price-range').value = filterBy.maxPrice
	document.querySelector('.filter-rate-range').value = filterBy.minRate
	setBookFilter(filterBy)
}
function onFilterBookmark() {
	gIsBookmark = !gIsBookmark
	if (gIsBookmark) setBookmarkUrl()
	else onSetFilterBy()
	renderBooks()
}

function setBookmarkUrl() {
	//sets href to bookmark
	const newUrl =
		window.location.protocol + '//' + window.location.host + window.location.pathname + '?bookmarks'
	window.history.pushState({ path: newUrl }, '', newUrl)
}

function getInputValue() {
	const title = document.querySelector('[name=add-book-title]').value
	const price = +document.querySelector('[name=add-book-price]').value
	return { title, price }
}

function resetInputDisplay() {
	const elTitle = document.querySelector('[name=add-book-title]')
	const elPrice = document.querySelector('[name=add-book-price]')
	elTitle.value = ''
	elPrice.value = ''
	elTitle.placeholder = 'Enter Book title'
	elPrice.placeholder = 'Enter Book price'
}

function onSortAsc(el) {
	onSortBy(el.value, true)
}
function onSortDesc(el) {
	onSortBy(el.value, false)
}
function onSetDescSort() {
	gIsAsc = !gIsAsc
	onSortBy(gSortBy)
}

function onSetPage(page) {
	gCurrPage = page - 1
	renderBooks()
}

function onPrevPage() {
	if (gCurrPage === 0) return
	gCurrPage--
	renderBooks()
}
function onNextPage() {
	if (gCurrPage === gPageCount - 1) return
	gCurrPage++
	renderBooks()
}
