var gTrans = {
	'header-title': {
		en: 'Welcome to my bookshop',
		es: 'Bienvenida a mi librería',
		he: 'ברוכים הבאים לחנות שלי'
	},
	Id: {
		en: 'Id',
		es: 'Id',
		he: 'ת.ז'
	},
	title: {
		en: 'Title',
		es: 'Título',
		he: 'שם'
	},
	price: {
		en: 'Price',
		es: 'Precio',
		he: 'מחיר'
	},
	Actions: {
		en: 'Actions',
		es: 'accións',
		he: 'פעולות'
	},
	Read: {
		en: 'Read',
		es: 'Leer',
		he: 'לקרוא'
	},
	Update: {
		en: 'Update',
		es: 'actualizar',
		he: 'עדכון'
	},
	Delete: {
		en: 'Delete',
		es: 'Borrar',
		he: 'למחוק'
	},
	submit: {
		en: 'submit',
		es: 'enviar',
		he: 'שלח'
	},
	'create-new-book': {
		en: 'Create new book:',
		es: 'Crear nuevo libro:',
		he: ':צור ספר חדש'
	},
	descending: {
		en: 'descending',
		es: 'descendiendo',
		he: 'סדר יורד?'
	},
	'sort-by': {
		en: 'Sort by',
		es: 'Ordenar por',
		he: 'מיין לפי'
	},
	rate: {
		en: 'Rate',
		es: 'Velocidad',
		he: 'ציון'
	},
	language: {
		en: 'language:',
		es: 'Velocidad:',
		he: ':שפה'
	},
	'dark-mode': {
		en: 'dark mode:',
		es: 'modo oscuro:',
		he: ':מצב כהה'
	},
	'max-price': {
		en: 'Max Price:',
		es: 'Precio máximo:',
		he: ':מחיר מקסימלי'
	},
	'min-rate': {
		en: 'Min Rate:',
		es: 'calificar mínima:',
		he: ':ציון מינימלי'
	},
	'title-placeholder': {
		en: 'Enter Book title',
		es: 'Ingrese el título del libro',
		he: 'הזן את שם הספר'
	},
	'price-placeholder': {
		en: 'Enter Book Price',
		es: 'Ingrese el precio del libro',
		he: 'הזן את מחיר הספר'
	}
}

var gCurrLang = 'en'

function getTrans(transKey) {
	var keyTrans = gTrans[transKey]
	if (!keyTrans) return 'UNKNOWN'

	var txt = keyTrans[gCurrLang] // he
	if (!txt) txt = keyTrans.en

	return txt
}

function doTrans() {
	var els = document.querySelectorAll('[data-trans]')
	els.forEach((el) => {
		var transKey = el.dataset.trans
		var txt = getTrans(transKey)
		if (el.localName === 'input') {
			el.placeholder = txt
		} else el.innerText = txt
	})
}

function setLang(lang) {
	gCurrLang = lang // he
}

function formatCurrency(num) {
	return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}
