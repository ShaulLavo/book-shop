var gTrans = {
	title: {
		en: 'Welcome to my bookshop',
		es: 'Bienvenida a mi librería',
		he: 'ברוכים הבאים לחנות שלי'
	},
	id: {
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
	actions: {
		en: 'Actions',
		es: 'accións',
		he: 'פעולות'
	},
	read: {
		en: 'Read',
		es: 'Leer',
		he: 'לקרוא'
	},
	update: {
		en: 'Update',
		es: 'actualizar',
		he: 'עדכון'
	},
	submit: {
		en: 'submit',
		es: 'enviar',
		he: 'שלח'
	},
	'create-new-book': {
		en: 'Create new book',
		es: 'Estas Seguru?',
		he: 'בטוח נשמה?'
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
	'max-price': {
		en: 'Max Price',
		es: 'Precio máximo',
		he: 'מחיר מקסימלי'
	},
	'min-rate': {
		en: 'Min Rate',
		es: 'calificar mínima',
		he: 'ציון מינימלי'
	},
	'enter-title-placeholder': {
		en: 'Enter Book title',
		es: 'Ingrese el título del libro',
		he: 'הזן את שם הספר'
	},
	'enter-price-placeholder': {
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
			el.setAttribute('placeholder', txt)
			// el.placeholder = txt
		} else el.innerText = txt
	})
}

function setLang(lang) {
	gCurrLang = lang // he
}

function formatNumOlder(num) {
	return num.toLocaleString('es')
}

function formatNum(num) {
	return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
	return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}

function formatDate(time) {
	var options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	}

	return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

function kmToMiles(km) {
	return km / 1.609
}
