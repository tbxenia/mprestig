document.addEventListener("DOMContentLoaded", () => {
	const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const accordion = item.parentElement;
      
      // Закрываем остальные открытые секции (опционально)
      const activeItems = accordion.querySelectorAll('.accordion-item.active');
      activeItems.forEach(activeItem => {
        if (activeItem !== item) {
          activeItem.classList.remove('active');
        }
      });

      // Переключаем текущую секцию
      item.classList.toggle('active');
    });
  });

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

	if (window.innerWidth <= 767) {
		const container = document.querySelector('.footer__menu');
		if(container) {
			const lists = container.querySelectorAll('ul.only-desktop');

			const combinedList = document.createElement('ul');
			combinedList.classList.add('mobile-menu');

			if(lists) {
				lists.forEach(list => {
				combinedList.append(...list.querySelectorAll('li'));
				list.remove();
				});
			}

			container.appendChild(combinedList);
		}
	}

	const articlesBlock = document.querySelector('.articles__list');

	if(articlesBlock) {
		const articlesSlider = new Swiper(".articles__list.swiper", {
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
				nextEl: '.articles__list .slider__next',
				prevEl: '.articles__list .slider__prev',
			},
			pagination: false,
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

	const productsSliderBlock = document.querySelector('.products__slider');
	if(productsSliderBlock) {
		const productsSlider = new Swiper(".products__slider.swiper", {
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
				nextEl: '.products__nav .slider__next',
				prevEl: '.products__nav .slider__prev',
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
				992: {
					slidesPerView: 4,
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
});