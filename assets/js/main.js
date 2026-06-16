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
	});

	gallerySlider.on("slideChange afterInit init", function () {
		let currentSlide = this.activeIndex + 1;
		document.querySelector('.slider-counter').innerHTML = `
		<span class="counter__current">
			${currentSlide}
		</span> 
		из 
		<span class="counter__total">
			${this.slides.length - 3}
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

	function t5() {
		clearSelection();
		let x =  document.querySelector('.div-5');
		if(this.classList.contains('active')){
			this.classList.remove('active')
		}
	else{
		this.classList.add('active')
	}
			

	}

	function clearSelection() {
		if (window.getSelection) {
		window.getSelection().removeAllRanges();
		} else { 
		document.selection.empty();
		}
	}

	document.querySelector('.div-5').ondblclick = t5;
});