'use strict'

var gBooks = []
var gCurrBook
var gSortBy = 'title'
var gFilterBy = { maxPrice: Infinity, minRate: 0 }
var gIsFiltered = false
var gIsBookmark = false
var gIsUpdate = false
var gIsAsc = true
var gCurrPage = 0
var gPageCount = 1
const MAX_TABLE_SIZE = 5

function createBooksDef() {
	createBook('Clean Code', 10.15)
	createBook('Structure and Interpretation of Computer Programs', 25)
	createBook('The Pragmatic Programmer', 9.5)
	createBook('Critique of Pure Reason', 999)
	createBook('Harry Potter and the Deathly Hallows', 154)
	createBook('Harry Potter and the Goblet of Fire', 255)
}

function getFilteredBooks() {
	var books = gBooks.filter(
		(book) => parseInt(book.price) <= gFilterBy.maxPrice && book.rate >= gFilterBy.minRate
	)
	return books
}
function getBookIdx(bookId) {
	return gBooks.findIndex((book) => book.id === bookId)
}

function getBook(bookId) {
	return gBooks.find((book) => book.id === bookId)
}

function removeBook(bookId) {
	gBooks.splice(getBookIdx(bookId), 1)
	renderBooks()
}

function getBookmarked(books) {
	return books.filter((book) => book.isBookmarked)
}

function updateBook(title, price) {
	if (isNaN(price)) price = 0
	if (price > 1000) return alert('max price is 1000$')
	gCurrBook.title = title

	gCurrBook.price = price + '$'
}

function changeRate(x) {
	return (gCurrBook.rate += x)
}

function setBookFilter(filterBy = {}) {
	if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
	if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
	return gFilterBy
}
function toggleBookmark() {
	if (gCurrBook.isBookmarked) return (gCurrBook.isBookmarked = false)
	return (gCurrBook.isBookmarked = true)
}
function getBtnTemplate(headerVal) {
	return `<span class="sort-btn-container"><button value="${headerVal}" onclick="onSortAsc(this)">🔼</button><button value="${headerVal}" onclick="onSortDesc(this)">🔽</button></span>`
}
function getPage(books) {
	books = _getPages(books)
	gPageCount = books.length
	return books[gCurrPage]
}

function getActionBtnStr(id) {
	const actions = ['Read', 'Update', 'Delete']
	var str = ''
	for (const action of actions) {
		str += `<button onclick="on${action}('${id}')" data-trans="${action}" class="${action}">${action}</button>`
	}
	return str
}

function createBook(title, price) {
	if (isNaN(price)) price = 0
	if (price > 1000) {
		alert('max price is 1000$')
		price = 999
	}
	const book = { id: makeId(), title, price: price + '$', rate: 0, isBookmarked: false }
	gBooks.push(book)
	return book
}

function _sortBooks(a, b) {
	if (gSortBy === 'title') {
		if (a[gSortBy].toLowerCase() < b[gSortBy].toLowerCase()) return -1
		if (a[gSortBy].toLowerCase() > b[gSortBy].toLowerCase()) return 1
		return 0
	} else if (gSortBy === 'rate') return b[gSortBy] - a[gSortBy]
	else return b[gSortBy].replace(/[^\d.-]/g, '') - a[gSortBy].replace(/[^\d.-]/g, '') //regex to remove anything but int and '.'
}

function sortBooksAsc() {
	return gBooks.sort(_sortBooks)
}
function sortBooksDesc() {
	return gBooks.sort(_sortBooks).reverse()
}

function _getPages(books) {
	return books.reduce((pages, page, idx) => {
		const pageIdx = Math.floor(idx / MAX_TABLE_SIZE)
		if (!pages[pageIdx]) pages[pageIdx] = [] // start a new page
		pages[pageIdx].push(page)
		return pages
	}, [])
}
