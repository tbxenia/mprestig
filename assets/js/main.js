function mobileFooterMenu() {
   if (window.innerWidth <= 767) {
		const container = document.querySelector('.footer__menu');
		if(container) {
			const lists = container.querySelectorAll('ul.only-desktop');

			const combinedList = document.createElement('ul');
			combinedList.classList.add('mobile-menu');

			if(lists) {
				lists.forEach(list => {
				const items = Array.from(list.querySelectorAll('li')).map(li => li.cloneNode(true));
				combinedList.append(...items);
				});
			}
			
			if(!container.querySelector('.mobile-menu')) {
				container.appendChild(combinedList);
			}
		}
	}
}

window.addEventListener('load', mobileFooterMenu);

window.addEventListener('resize', mobileFooterMenu);

document.addEventListener("DOMContentLoaded", () => {
	const originalFilter = document.getElementById('filter');
	if(originalFilter) {
		const clonedFilter = originalFilter.cloneNode(true);
		clonedFilter.id = 'mobile-filter';
		document.querySelector('.mobile-filter__inner').appendChild(clonedFilter);
	}

	const numberSlider = document.querySelectorAll('.number__slider');
	if(numberSlider) {
		numberSlider.forEach((item) => {
			const parentSlider = item.closest('.number-slider__wrapper')
			const priceInputMin  = parentSlider.querySelector('.min-input');
			const priceInputMax = parentSlider.querySelector('.max-input');
			const priceInputs = [priceInputMin, priceInputMax]; 

			if (item && priceInputs) {
				noUiSlider.create(item, {
					start: [parseInt(priceInputMin.value), parseInt(priceInputMax.value)],
					connect: true,
					range: {
						'min': parseInt(priceInputMin.dataset.limit),
						'max': parseInt(priceInputMax.dataset.limit)
					}
				});
				item.noUiSlider.on('update', function (values, handle) {
					priceInputs[handle].value = parseInt(values[handle]);
				});
				priceInputs.forEach(function (input, handle) {
					input.addEventListener('change', function () {
						item.noUiSlider.setHandle(handle, this.value);
					});
				});	
			}
		});
	}

	const liHasChildren = document.querySelectorAll('.has-children');
	if(liHasChildren) {
		liHasChildren.forEach((item, index) => {
			const accButton = document.createElement('button');
			accButton.className = 'acc-button';
			item.appendChild(accButton)
			item.addEventListener('click', () => {
				item.classList.toggle('active');
			});
		});
	}


	const tabsMain = document.querySelectorAll('.tabs');
	if(tabsMain) {
		tabsMain.forEach(main => {
			const tabButtons = main.querySelectorAll('.tab-item');
			const tabContents = main.querySelectorAll('.tab-content');

			tabButtons.forEach(button => {
				button.addEventListener('click', () => {
					// Убираем active со всех кнопок и контента
					tabButtons.forEach(btn => btn.classList.remove('active'));
					tabContents.forEach(content => content.classList.remove('active'));

					// Добавляем active на нажатую кнопку и соответствующий контент
					button.classList.add('active');
					const tabNumber = button.getAttribute('data-tab');
					document.querySelector(`.tab-content[data-tab="${tabNumber}"]`).classList.add('active');
				});
			});
		});
	}

	/* burger */
	
	const burgerButton = document.getElementById('burger');

	if(burgerButton) {
		
		const menu = document.querySelector('.mobile-burger');
		const overlay = document.querySelector('.overlay');
		const body = document.querySelector('body');
		const close = document.querySelector('.close');

		function addMenu() {
			menu.classList.add('active');
			overlay.classList.add('active');
			body.classList.add('fixed');
		}
		
		function removeMenu() {
			menu.classList.remove('active');
			overlay.classList.remove('active');
			body.classList.remove('fixed');
		}

		burgerButton.addEventListener('click', function(event) {
			event.preventDefault();
			addMenu();
		});

		document.addEventListener('click', (event) => {
			if (!menu.contains(event.target) && !burgerButton.contains(event.target)) {
				removeMenu();
			}
		});

		close.addEventListener('click', (event) => {
			removeMenu();
		});

	}

	const filterButton = document.getElementById('filter-button');

	if(filterButton) {
		
		const filterBlock = document.querySelector('.mobile-filter');
		const overlay = document.querySelector('.overlay');
		const body = document.querySelector('body');
		const close = document.querySelector('.mobile-filter .close');

		function addFilter() {
			filterBlock.classList.add('active');
			overlay.classList.add('active');
			body.classList.add('fixed');
		}
		
		function removeFilter() {
			filterBlock.classList.remove('active');
			overlay.classList.remove('active');
			body.classList.remove('fixed');
		}

		filterButton.addEventListener('click', function(event) {
			event.preventDefault();
			addFilter();
		});

		document.addEventListener('click', (event) => {
			if (!menu.contains(event.target) && !filterButton.contains(event.target)) {
				removeFilter();
			}
		});

		close.addEventListener('click', (event) => {
			removeFilter();
		});

	}
	
	const headers = document.querySelectorAll('.accordion-header');

	if(headers) {
		headers.forEach(header => {
			header.addEventListener('click', () => {
			const item = header.parentElement;
			const accordion = item.parentElement;

			accordion.scrollIntoView({ 
				behavior: 'smooth', 
				block: 'start' // выравнивание элемента по верхнему краю
			});
			

			if(!item.classList.contains('filter-panel')) {
				// Закрываем остальные открытые секции (опционально)
				const activeItems = accordion.querySelectorAll('.accordion-item.active');
				activeItems.forEach(activeItem => {
					activeItem.classList.remove('active');
				});
			}

			// Переключаем текущую секцию
			if(item.classList.contains('filter-panel')) {
				item.classList.toggle('active');
			} else {
				item.classList.add('active');
			}
			});
		});
	}

	const fancyBoxElements = document.querySelectorAll("[data-fancybox]");

	if (fancyBoxElements.length > 0) {
		Fancybox.bind("[data-fancybox]", {});
	}

	const faqBlock = document.querySelector('.faq');

	if(faqBlock) {
		document.querySelectorAll('.faq__item').forEach(faq => {
			faq.addEventListener('click', () => {
				const faqItemParent = faq.parentElement;

				const faqAllItems = faqItemParent.querySelectorAll('.faq__item');
				faqAllItems.forEach(item => {
					if (item !== faq) {
						item.classList.remove('active');
					}
				});
				faq.classList.toggle('active');
			});
		});
	}

	const equipmentBlock = document.querySelector('.equipment');
	if(equipmentBlock) {
		const equipmentSlider = new Swiper('.equipment__list', {
			slidesPerView: 'auto',
			spaceBetween: 15,
			breakpoints: {
				768: {
					enabled: false,
					spaceBetween: 0,
				},
			}
		});
	}

	const articlesBlock = document.querySelector('.articles__list');

	if(articlesBlock) {
		const articlesSlider = new Swiper(".articles__list.swiper", {
			slidesPerView: 4,
			slidesPerGroup: 1,
			loop: false,
			speed: 1200,
			pagination: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.articles__nav .slider__next',
				prevEl: '.articles__nav .slider__prev',
			},
			pagination: {
				el: ".articles .slider-pagination",
				type: 'progressbar',
			},
			autoplay: false,
			/*autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},*/
			spaceBetween: 10,
			breakpoints: {
				0: {
					slidesPerView: 'auto',
				},
				577: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 4,
				},
			}
		});
	}

	const popularProductsSliderBlock = document.querySelector('.popular .products__slider');
	if(popularProductsSliderBlock) {
		const popularProductsSlider = new Swiper(".popular .products__slider.swiper", {
			slidesPerView: 4,
			slidesPerGroup: 1,
			loop: true,
			speed: 1200,
			pagination: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.popular .products__nav .slider__next',
				prevEl: '.popular .products__nav .slider__prev',
			},
			pagination: {
				el: ".popular .slider-pagination",
				type: 'progressbar',
			},
			/*autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},*/
			autoplay: false,
			spaceBetween: 10,
			breakpoints: {
				0: {
					slidesPerView: 'auto',
				},
				577: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 4,
				},
			}
		});
	}

	const recommendProductsSliderBlock = document.querySelector('.recommend .products__slider');
	if(recommendProductsSliderBlock) {
		const recommendProductsSlider = new Swiper(".recommend .products__slider.swiper", {
			slidesPerView: 3,
			slidesPerGroup: 1,
			loop: true,
			speed: 1200,
			pagination: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.recommend .products__nav .slider__next',
				prevEl: '.recommend .products__nav .slider__prev',
			},
			pagination: false,
			/*autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},*/
			autoplay: false,
			spaceBetween: 10,
			breakpoints: {
				0: {
					slidesPerView: 'auto',
				},
				577: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
			}
		});
	}

	const gallerySliderInit = document.querySelector('.gallery.swiper');

	if(gallerySliderInit) {
		const gallerySlider = new Swiper(".gallery.swiper", {
			slidesPerView: 4,
			slidesPerGroup: 1,
			loop: false,
			speed: 1200,
			pagination: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.gallery__nav .slider__next',
				prevEl: '.gallery__nav .slider__prev',
			},
			autoplay: false,
			spaceBetween: 10,
			pagination: {
				el: ".slider-pagination",
				type: 'progressbar',
			},
			/*autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},*/
			breakpoints: {
				0: {
					slidesPerView: 'auto',
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 4,
				},
			}
		});

		gallerySlider.on("slideChange afterInit init", function () {
			let currentSlide = this.activeIndex + 1;
			document.querySelector('.slider-counter').innerHTML = `
			<span class="counter__current">
				${currentSlide}
			</span> 
			из 
			<span class="counter__total">
				${this.snapGrid.length}
			</span>`;
		});

		gallerySlider.emit("init");

	}

	/* banner video */

	const buttonPlay = document.querySelector('.banner .button-play');
	const bannerContent = document.querySelector('.banner__inner');
	const bannerVideo = document.getElementById('banner-video');

	if(bannerVideo) {
		buttonPlay.addEventListener('click', () => {
			buttonPlay.classList.add('hidden');
			bannerContent.classList.add('hidden');
			bannerVideo.play().catch(error => {
				console.error("Ошибка автовоспроизведения:", error);
			});
		});
	}


	const galleries = document.querySelectorAll('.gallery-thumb');

	galleries.forEach(sliderBlock => {
		if (sliderBlock) {
			let thumbsTParams = {
				spaceBetween: 11,
				slidesPerView: 4,
				slidesPerGroup: 1,
				freeMode: true,
				watchSlidesProgress: true,
				breakpoints: {
					0: {
						spaceBetween: 4,
					},
					768: {
						spaceBetween: 11,
					},
				}
			};

			let thumbsT = new Swiper(sliderBlock.querySelector(".gallery-thumbs .swiper-container"), thumbsTParams);

			let sliderTParams = {
				slidesPerView: 1,
				watchOverflow: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
				preventInteractionOnTransition: true,
				spaceBetween: 10,
				navigation: {
					nextEl: sliderBlock.querySelector('.slider__next'),
					prevEl: sliderBlock.querySelector('.slider__prev'),
				},
				thumbs: {
					swiper: thumbsT,
				},
			};

			let sliderT = new Swiper(sliderBlock.querySelector('.gallery-slider'), sliderTParams);	
		}
	});

	const selectCity = document.querySelector('.objects__select');

	if(selectCity) {
		selectCity.querySelector('.objects__select-item').addEventListener('click', function(event) {
			document.querySelector('.objects__select-list').classList.add('show');
		});

		document.addEventListener('click', function(event) {
			const isClickInside = selectCity.contains(event.target);

			if (!isClickInside) {
				document.querySelector('.objects__select-list').classList.remove('show');
			}
		});
	}

	const openCity = document.querySelectorAll('.city-open');

	openCity.forEach((item) => {
		if(item) {
			item.addEventListener('click', function(event) {
				item.querySelector('.cities').classList.add('show');
			});

			document.addEventListener('click', function(event) {
				const isClickInside = item.contains(event.target);

				if (!isClickInside) {
					item.querySelector('.cities').classList.remove('show');
				}
			});
		}
	});

	const articleBody = document.getElementById('article');

	if(articleBody) {
	const headers = Array.from(articleBody.querySelectorAll('*')).filter(
		el => el.tagName === 'H2' || el.tagName === 'H3'
	);

	const olList = document.createElement('ol');
	let currentH2Item = null; 

	headers.forEach(header => {
		let headerId = header.id;
		if (!headerId) {
		headerId = header.textContent.trim().toLowerCase().replace(/\s+/g, '-');
		header.id = headerId;
		}

		const li = document.createElement('li');

		const link = document.createElement('a');
		link.href = `#${headerId}`;
		link.textContent = header.textContent;

		li.appendChild(link);

		if (header.tagName === 'H2') {
		olList.appendChild(li);
		currentH2Item = li;
		} else if (header.tagName === 'H3' && currentH2Item) {
		let nestedUl = currentH2Item.querySelector('ul');
		if (!nestedUl) {
			nestedUl = document.createElement('ul');
			currentH2Item.appendChild(nestedUl);
		}
		nestedUl.appendChild(li);
		}
	});

	document.querySelector('.article__headtitle-nav').appendChild(olList);
	}
});