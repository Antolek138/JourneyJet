const body = document.querySelector('body')
const bars = document.querySelector('.nav__bars')
const menu = document.querySelector('.nav__menu')
const allNavItems = document.querySelectorAll('.nav__menu-link')

const nav = document.querySelector('.nav')
const logo = document.querySelector('.nav__logo')
const menuLink = document.querySelectorAll('.nav__menu-link')
const barsLine = document.querySelectorAll('.nav__bars-line')
const tripsCards = document.querySelectorAll('.trips__card')

const newsletterButton = document.querySelector('.newsletter__btn--two')
const newsletterInput = document.querySelector('input')

const infoValueDisplays = document.querySelectorAll('.info__card-number')
let infoInterval = 5000

const footerYear = document.querySelector('.footer__year')

const showMenu = () => {
	menu.classList.toggle('nav__menu--active')
	bars.classList.toggle('nav__bars--active')

	allNavItems.forEach(item =>
		item.addEventListener('click', () => {
			menu.classList.remove('nav__menu--active')
			bars.classList.remove('nav__bars--active')
			lockedMenu()
		})
	)
}

const handleNav = () => {
	if (scrollY > 50) {
		nav.classList.add('nav--active')
		logo.style.color = '#323031'
		barsLine.forEach(line => (line.style.backgroundColor = '#323031'))
	} else {
		nav.classList.remove('nav--active')
		logo.style.color = '#fffdf7'
		barsLine.forEach(line => (line.style.backgroundColor = '#fffdf7'))
	}

	if (window.innerWidth >= 768 && scrollY > 50) {
		menuLink.forEach(link => (link.style.color = '#323031'))
	} else {
		menuLink.forEach(link => (link.style.color = '#fffdf7'))
	}

	if (
		window.matchMedia('(max-width: 576px)').matches &&
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	) {
		window.addEventListener('scroll', function () {
			if (window.scrollY > 50) {
				menu.style.backgroundColor = '#fffdf7'
				menuLink.forEach(link => (link.style.color = '#323031'))
			} else {
				menu.style.backgroundColor = '#242323'
				menuLink.forEach(link => (link.style.color = '#fffdf7'))
			}
		})
	}
}

const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 1,
}

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.intersectionRatio >= 0.5) {
			entry.target.classList.add('trips__card--active')
		}
	})
}, observerOptions)

tripsCards.forEach(card => {
	observer.observe(card)
})

function handleInfoSection(entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			infoValueDisplays.forEach(valueDisplay => {
				let startValue = 0
				let endValue = parseInt(valueDisplay.getAttribute('data-val'))
				let duration = Math.floor(infoInterval / endValue)
				let counter = setInterval(() => {
					startValue += 1
					valueDisplay.textContent = startValue
					if (startValue === endValue) {
						clearInterval(counter)
					}
				}, duration)
			})
			observer.unobserve(entry.target)
		}
	})
}

let infoObserver = new IntersectionObserver(handleInfoSection, { threshold: 0.5 })

let infoSection = document.querySelector('.info__container')
infoObserver.observe(infoSection)

const handleYear = () => {
	const date = new Date().getFullYear()
	footerYear.textContent = date
}

const lockedMenu = () => {
	if (body.classList.contains('unlocked')) {
		body.classList.remove('unlocked')
		body.classList.add('locked')
	} else {
		body.classList.remove('locked')
		body.classList.add('unlocked')
	}
}

const logoClose = () => {
	menu.classList.remove('nav__menu--active')
	bars.classList.remove('nav__bars--active')
	body.classList.remove('locked')
	body.classList.add('unlocked')
}

const handleNewsletter = () => {
	if (!(newsletterInput.value == '')) {
		newsletterInput.value = ''
		newsletterButton.textContent = 'Wysłano!'
		newsletterButton.style.backgroundColor = '#fffdf7'
		newsletterButton.style.color = '#242323'

		setTimeout(() => {
			newsletterButton.style.backgroundColor = '#04724d'
			newsletterButton.style.color = '#fffdf7'
		}, 5000)

		setTimeout(() => {
			newsletterButton.textContent = 'Zapisz się'
		}, 4900)
	}
}

handleYear()
bars.addEventListener('click', () => {
	showMenu(), lockedMenu()
})
logo.addEventListener('click', logoClose)
document.addEventListener('scroll', handleNav)
newsletterButton.addEventListener('click', handleNewsletter)
