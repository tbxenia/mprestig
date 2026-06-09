document.addEventListener("DOMContentLoaded", () => {
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
});