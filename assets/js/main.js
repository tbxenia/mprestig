document.addEventListener("DOMContentLoaded", () => {
	Fancybox.bind("[data-fancybox]", {
		
	});

	if (window.innerWidth <= 767) {
		const container = document.querySelector('.footer__menu'); 
		const lists = container.querySelectorAll('ul.only-desktop');

		const combinedList = document.createElement('ul');
		combinedList.classList.add('mobile-menu');

		lists.forEach(list => {
		combinedList.append(...list.querySelectorAll('li'));
		list.remove();
		});

		container.appendChild(combinedList);
	}

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
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		spaceBetween: 10,
	});

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
	});

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

	/* banner video */

	const buttonPlay = document.querySelector('.banner .button-play');
	const bannerContent = document.querySelector('.banner__inner');
	const bannerVideo = document.getElementById('banner-video');

	buttonPlay.addEventListener('click', () => {
		buttonPlay.classList.add('hidden');
		bannerContent.classList.add('hidden');
		bannerVideo.play().catch(error => {
			console.error("Ошибка автовоспроизведения:", error);
		});
	});


	const gallery = document.querySelector('.gallery-slider');
	if (gallery) {
		
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

		let thumbsT = new Swiper(".gallery-thumbs .swiper-container", thumbsTParams);

		let sliderTParams = {
			slidesPerView: 1,
			watchOverflow: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			preventInteractionOnTransition: true,
			spaceBetween: 10,
			navigation: {
				nextEl: ".gallery-thumb__nav .slider__next",
				prevEl: ".gallery-thumb__nav .slider__prev",
			},
			thumbs: {
				swiper: thumbsT,
			},
		};

		let sliderT = new Swiper(".gallery-slider", sliderTParams);	
	}
});