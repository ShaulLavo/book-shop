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
	sure: {
		en: 'Are you sure?',
		es: 'Estas Seguru?',
		he: 'בטוח נשמה?'
	},
	'add-todo-placeholder': {
		en: 'What needs to be done?',
		es: 'Que te tienes que hacer?',
		he: 'מה יש לעשות?'
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
