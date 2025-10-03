(function($) {
    ("use strict");
    // Page loading
    $(window).on("load", function () {
        $("#preloader-active").fadeOut("slow");
    });
    
    // Mobile navigation CSS fixes
    function addMobileNavCSS() {
        var css = `
            /* Mobile navigation fixes */
            .burger-icon {
                cursor: pointer !important;
                z-index: 9999 !important;
            }
            
            .mobile-header-active {
                z-index: 9998 !important;
            }
            
            .body-overlay-1 {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 9997;
                display: none;
            }
            
            .mobile-menu-active .body-overlay-1 {
                display: block;
            }
            
            .sidebar-visible {
                transform: translateX(0) !important;
            }
            
            .burger-close {
                background-color: #333 !important;
            }
        `;
        
        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style);
    }
    
    // Initialize CSS fixes
    addMobileNavCSS();
    
    // Final comprehensive mobile nav check
    $(window).on('load resize', function() {
        console.log("Window resized - checking mobile nav");
        
        // Check if we're in mobile view
        if ($(window).width() < 768) {
            console.log("Mobile view detected");
            
            // Ensure burger icon exists and is visible
            var burgerIcon = $(".burger-icon");
            if (burgerIcon.length === 0) {
                console.log("Creating burger icon for mobile view");
                $("header").prepend('<div class="burger-icon"><span></span><span></span><span></span></div>');
            }
            
            // Ensure mobile menu exists
            var mobileMenu = $(".mobile-header-active");
            if (mobileMenu.length === 0) {
                console.log("Creating mobile menu container");
                $("body").append('<div class="mobile-header-active"><div class="mobile-menu-close">×</div><nav class="mobile-menu"><ul><li><a href="index.html">Home</a></li><li><a href="booking-vehicle.html">Book Now</a></li><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li></ul></nav></div>');
            }
            
            // Commented out the automatic opening of mobile menu
            // This was causing the menu to open automatically on page load
            /*
            setTimeout(function() {
                $(".burger-icon").trigger('click');
                setTimeout(function() {
                    $(".mobile-menu-close").trigger('click');
                    console.log("Mobile navigation test completed");
                }, 500);
            }, 1000);
            */
        }
    });
    
    // Log when page is ready
    console.log("Mobile navigation enhancements loaded!");
    /*-----------------
        Menu Stick
    -----------------*/
    var header = $(".sticky-bar");
    var win = $(window);
    win.on("scroll", function () {
        var scroll = win.scrollTop();
        if (scroll < 200) {
            header.removeClass("stick");
            $(".header-style-2 .categories-dropdown-active-large").removeClass("open");
            $(".header-style-2 .categories-button-active").removeClass("open");
        } else {
            header.addClass("stick");
        }
    });

    /*-----------------
        Sidebar Sticky
    -----------------*/
    var sidebar = $(".sidebar-left");
    var win = $(window);
    win.on("scroll", function () {
        var scroll = win.scrollTop();
        if (scroll < 760) {
            sidebar.removeClass("stick");
        } else {
            sidebar.addClass("stick");
        }
    });
    /*------ ScrollUp -------- */
    // $.scrollUp({
    //     scrollText: '<i class="fi-rr-arrow-small-up"></i>',
    //     easingType: "linear",
    //     scrollSpeed: 900,
    //     animation: "fade"
    // });
    /*------ Wow Active ----*/
    // $(".wow").attr("data-wow-delay","0.2s");
    new WOW({
        offset: 50
    }).init();
    //sidebar sticky
    if ($(".sticky-sidebar").length) {
        $(".sticky-sidebar").theiaStickySidebar();
    }
    /*----------------------------
        Category toggle function
    ------------------------------*/
    if ($(".categories-button-active").length) {
        var searchToggle = $(".categories-button-active");
        searchToggle.on("click", function (e) {
            e.preventDefault();
            if ($(this).hasClass("open")) {
                $(this).removeClass("open");
                $(this).siblings(".categories-dropdown-active-large").removeClass("open");
            } else {
                $(this).addClass("open");
                $(this).siblings(".categories-dropdown-active-large").addClass("open");
            }
        });
    }
    /*---------------------
        Select active
    --------------------- */
    if ($(".select-active").length) {
        $(".select-active").select2();
    }
    /*---- CounterUp ----*/
    if ($(".count").length) {
        $(".count").counterUp({
            delay: 10,
            time: 600
        });
    }
    // Isotope active
    if ($(".grid").length) {
        $(".grid").imagesLoaded(function () {
            // init Isotope
            var $grid = $(".grid").isotope({
                itemSelector: ".grid-item",
                percentPosition: true,
                layoutMode: "masonry",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: ".grid-item"
                }
            });
        });
    }
    /*====== SidebarSearch ======*/
    function sidebarSearch() {
        var searchTrigger = $(".search-active"),
            endTriggersearch = $(".search-close"),
            container = $(".main-search-active");
        searchTrigger.on("click", function (e) {
            e.preventDefault();
            container.addClass("search-visible");
        });
        endTriggersearch.on("click", function () {
            container.removeClass("search-visible");
        });
    }
    sidebarSearch();
    /*====== Sidebar menu Active ======*/
    function mobileHeaderActive() {
        var navbarTrigger = $(".burger-icon"),
            endTrigger = $(".mobile-menu-close"),
            container = $(".mobile-header-active"),
            wrapper4 = $("body");
        
        // Debug: Check if elements exist
        console.log("Burger icon found:", navbarTrigger.length);
        console.log("Mobile menu close found:", endTrigger.length);
        console.log("Mobile header active found:", container.length);
        
        // Only add body-overlay-1 if it doesn't already exist
        if ($('.body-overlay-1').length === 0) {
            wrapper4.prepend('<div class="body-overlay-1"></div>');
        }
        navbarTrigger.on("click", function (e) {
            e.preventDefault();
            console.log("Burger icon clicked!");
            navbarTrigger.toggleClass("burger-close");
            container.toggleClass("sidebar-visible");
            wrapper4.toggleClass("mobile-menu-active");
            window.scrollTo(0, 0);
        });
        endTrigger.on("click", function () {
            container.removeClass("sidebar-visible");
            wrapper4.removeClass("mobile-menu-active");
        });
        $(".body-overlay-1").on("click", function () {
            container.removeClass("sidebar-visible");
            wrapper4.removeClass("mobile-menu-active");
            navbarTrigger.removeClass("burger-close");
        });
    }
    mobileHeaderActive();
    
    // Immediate mobile navigation fix
    (function() {
        // Check if mobile navigation elements exist
        function checkMobileNav() {
            var burgerIcon = $(".burger-icon");
            var mobileMenu = $(".mobile-header-active");
            
            // Only create burger icon if it doesn't exist
            if (burgerIcon.length === 0) {
                console.warn("Burger icon not found! Creating one...");
                // Create burger icon if it doesn't exist
                $("header").prepend('<div class="burger-icon"><span></span><span></span><span></span></div>');
                burgerIcon = $(".burger-icon");
            }
            
            // Only create mobile menu if it doesn't exist
            if (mobileMenu.length === 0) {
                console.warn("Mobile menu container not found! Creating one...");
                // Create mobile menu container if it doesn't exist
                $("body").append('<div class="mobile-header-active"><div class="mobile-menu-close">×</div><nav class="mobile-menu"></nav></div>');
                mobileMenu = $(".mobile-header-active");
            }
            
            return { burgerIcon: burgerIcon, mobileMenu: mobileMenu };
        }
        
        // Initialize mobile navigation with retry mechanism
        function initMobileNav() {
            var elements = checkMobileNav();
            
            if (elements.burgerIcon.length > 0 && elements.mobileMenu.length > 0) {
                console.log("Mobile navigation elements found and initialized!");
                
                // Force immediate event binding
                elements.burgerIcon.off('click').on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Mobile nav clicked - toggling menu!");
                    
                    $(this).toggleClass("burger-close");
                    elements.mobileMenu.toggleClass("sidebar-visible");
                    $("body").toggleClass("mobile-menu-active");
                    
                    // Ensure overlay exists only if it doesn't already exist
                    if ($(".body-overlay-1").length === 0) {
                        $("body").prepend('<div class="body-overlay-1"></div>');
                    }
                });
                
                // Close button functionality
                $(".mobile-menu-close").off('click').on('click', function() {
                    console.log("Mobile menu close clicked!");
                    elements.mobileMenu.removeClass("sidebar-visible");
                    $("body").removeClass("mobile-menu-active");
                    elements.burgerIcon.removeClass("burger-close");
                });
                
                // Overlay click to close
                $(document).off('click', '.body-overlay-1').on('click', '.body-overlay-1', function() {
                    console.log("Overlay clicked - closing menu!");
                    elements.mobileMenu.removeClass("sidebar-visible");
                    $("body").removeClass("mobile-menu-active");
                    elements.burgerIcon.removeClass("burger-close");
                });
                
            } else {
                console.error("Mobile navigation elements still not found!");
            }
        }
        
        // Initialize immediately and with delay
        initMobileNav();
        setTimeout(initMobileNav, 1000); // Retry after 1 second
        
        // Also initialize when DOM is fully loaded
        $(document).ready(function() {
            initMobileNav();
        });
        
        // Additional initialization on window load
        $(window).on('load', function() {
            setTimeout(initMobileNav, 500);
        });
        
    })();
    
    // Fallback mobile navigation handler
    $(document).ready(function() {
        // Ensure mobile navigation works even if elements are added dynamically
        $(document).on('click', '.burger-icon', function(e) {
            e.preventDefault();
            console.log("Fallback burger icon clicked!");
            var container = $(".mobile-header-active");
            var wrapper4 = $("body");
            
            $(this).toggleClass("burger-close");
            container.toggleClass("sidebar-visible");
            wrapper4.toggleClass("mobile-menu-active");
            window.scrollTo(0, 0);
        });
        
        // Close mobile menu when clicking close button
        $(document).on('click', '.mobile-menu-close', function() {
            console.log("Mobile menu close clicked!");
            $(".mobile-header-active").removeClass("sidebar-visible");
            $("body").removeClass("mobile-menu-active");
            $(".burger-icon").removeClass("burger-close");
        });
        
        // Close mobile menu when clicking overlay
        $(document).on('click', '.body-overlay-1', function() {
            console.log("Body overlay clicked!");
            $(".mobile-header-active").removeClass("sidebar-visible");
            $("body").removeClass("mobile-menu-active");
            $(".burger-icon").removeClass("burger-close");
        });
    });
    /*---------------------
        Mobile menu active
    ------------------------ */
    var $offCanvasNav = $(".mobile-menu"),
        $offCanvasNavSubMenu = $offCanvasNav.find(".sub-menu");
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><svg class="w-6 h-6 icon-16" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7911 1.0474C15.5023 0.741097 15.0192 0.729691 14.7145 1.01768L7.99961 7.37897L1.28555 1.01772C0.980773 0.728941 0.498472 0.741128 0.208947 1.04743C-0.080577 1.35296 -0.0676398 1.83526 0.237916 2.12478L7.47618 8.98209C7.62246 9.12077 7.81143 9.19087 7.99961 9.19087C8.18779 9.19087 8.37751 9.12077 8.52382 8.98209L15.7621 2.12478C16.0676 1.83523 16.0806 1.35296 15.7911 1.0474Z" fill="#181A1F"/></svg></span>');
    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on("click", "li a, li .menu-expand", function (e) {
        var $this = $(this);
        if (
            $this
                .parent()
                .attr("class")
                .match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
            ($this.attr("href") === "#" || $this.hasClass("menu-expand"))
        ) {
            e.preventDefault();
            if ($this.siblings("ul:visible").length) {
                $this.parent("li").removeClass("active");
                $this.siblings("ul").slideUp();
            } else {
                $this.parent("li").addClass("active");
                $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
                $this.closest("li").siblings("li").find("ul:visible").slideUp();
                $this.siblings("ul").slideDown();
            }
        }
    });
    /*--- language currency active ----*/
    $(".mobile-language-active").on("click", function (e) {
        e.preventDefault();
        $(".lang-dropdown-active").slideToggle(900);
    });
    /*--- categories-button-active-2 ----*/
    $(".categories-button-active-2").on("click", function (e) {
        e.preventDefault();
        $(".categori-dropdown-active-small").slideToggle(900);
    });
    /*--- Mobile demo active ----*/
    var demo = $(".tm-demo-options-wrapper");
    $(".view-demo-btn-active").on("click", function (e) {
        e.preventDefault();
        demo.toggleClass("demo-open");
    });
    /*-----More Menu Open----*/
    $(".more_slide_open").slideUp();
    $(".more_categories").on("click", function () {
        $(this).toggleClass("show");
        $(".more_slide_open").slideToggle();
    });
    /* --- SwiperJS --- */
    $(".swiper-banner-1").each(function () {
        var swiper_1_items = new Swiper(this, {
            slidesPerView: 1,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next-banner",
                prevEl: ".swiper-button-prev-banner"
            },
            pagination: {
                el: ".swiper-pagination",
                // clickable: true,
                type: "fraction"
            },
            autoplay: {
                delay: 10000
            }
        });
    });
    $(".swiper-group-auto").each(function () {
        var swiper_1_items = new Swiper(this, {
            slidesPerView: "auto",
            spaceBetween: 70,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next-group-auto",
                prevEl: ".swiper-button-prev-group-auto"
            },
            pagination: {
                el: ".swiper-pagination-group-auto",
                clickable: true
            },
            autoplay: {
                delay: 1000000
            },
            on: {
                beforeInit: function () {
                    // set padding left slide fleet
                    var leftTitle = 0;

                    var titleFleet = $(".title-fleet");
                    if (titleFleet.length > 0) {
                        leftTitle = titleFleet.offset().left;
                    }
                    if ($(".box-slide-fleet").length > 0) {
                        $(".box-slide-fleet").css("padding-left", leftTitle + "px");
                    }
                }
            }
        });
    });
    $(".swiper-banner-2").each(function () {
        var swiper_1_items = new Swiper(this, {
            slidesPerView: 1,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next-banner-2",
                prevEl: ".swiper-button-prev-banner-2"
            },
            pagination: {
                el: ".swiper-pagination-banner-2",
                clickable: true
            },
            autoplay: {
                delay: 10000
            }
        });
    });
    $(".swiper-group-1").each(function () {
        var swiper_1_items = new Swiper(this, {
            slidesPerView: 1,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next-group-1",
                prevEl: ".swiper-button-prev-group-1"
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 10000
            }
        });
    });
    $(".swiper-group-1-number").each(function () {
        var swiper_1_items = new Swiper(this, {
            slidesPerView: 1,
            loop: false,
            direction: "vertical",
            speed: 1000,
            mousewheelControl: true,
            watchSlidesProgress: true,
            mousewheel: {
                releaseOnEdges: true
            },
            // onAny(eventName, ...args) {
            //     console.log("Event: ", eventName);
            //     console.log("Event data: ", args);
            // },
            autoHeight: 1,
            height: 945,
            preventInteractionOnTransition: 1,
            navigation: {
                nextEl: ".swiper-button-next-group-1-number",
                prevEl: ".swiper-button-prev-group-1-number"
            },
            pagination: {
                el: ".swiper-pagination-number",
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + "</span>";
                }
            },
            autoplay: {
                delay: 10000
            }
        });
    });

    $(".swiper-group-4").each(function () {
        var swiper_4_fleet_2 = new Swiper(this, {
            spaceBetween: 30,
            slidesPerView: 4,
            slidesPerGroup: 1,
            // initialSlide: 1,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next-fleet-4",
                prevEl: ".swiper-button-prev-fleet-4"
            },
            pagination: {
                el: ".swiper-pagination-fleet-4",
                clickable: true
            },
            autoplay: {
                delay: 10000
            },
            breakpoints: {
                1399: {
                    slidesPerView: 4
                },
                800: {
                    slidesPerView: 3
                },
                500: {
                    slidesPerView: 2
                },
                400: {
                    slidesPerView: 1
                },
                350: {
                    slidesPerView: 1
                },
                150: {
                    slidesPerView: 1
                }
            }
        });
    });
    // datepicker
    $(".datepicker").each(function(){
        $(this)
            .datepicker({
                dateFormat: "D, M dd, yy",
                beforeShow: function (input, inst) {
                    if ($(window).width() > 1200) {
                        inst.dpDiv.css({
                            marginTop: "40px",
                            marginLeft: "-90px"
                        });
                    } else {
                        inst.dpDiv.css({
                            marginTop: "20px",
                            marginLeft: "0px"
                        });
                    }
                }
            })
            .attr("readonly", "readonly");
    });
    $(".datepicker-2").each(function () {
        $(this)
            .datepicker({
                dateFormat: "D, M dd, yy",
                beforeShow: function (input, inst) {
                    if ($(window).width() > 1200) {
                        inst.dpDiv.css({
                            marginTop: "40px",
                            marginLeft: "-90px"
                        });
                    } else {
                        inst.dpDiv.css({
                            marginTop: "20px",
                            marginLeft: "-28px"
                        });
                    }
                }
            })
            .attr("readonly", "readonly");
    });
    $('.timepicker').each(function(){
        $(this).timepicker({
                timeFormat: "hh p : mm",
                interval: 10,
                minTime: "0",
                maxTime: "23:59pm",
                defaultTime: "08",
                startTime: "00:00",
                dynamic: false,
                dropdown: true,
                scrollbar: false,
                zindex: 99
            }).attr("readonly", "readonly");
    });

    // dropdown location
    $(".dropdown-location").on("click", function(e){
        $(".box-dropdown-location").fadeOut();
        var _parent = $(this).parents('.search-inputs');
        var _dropdownLocation = _parent.find(".box-dropdown-location");
        if (_dropdownLocation.css('display') == 'none') {
            _dropdownLocation.fadeIn();
        }
    });
    $(".item-location").on("click", function(){
        var title = $(this).find(".title-location").html();
        var _parent = $(this).parents(".search-inputs");
        _parent.find(".dropdown-location").val(title);
    });

    //Dropdown selected item
    $(".dropdown-menu > li a").on("click", function (e) {
        e.preventDefault();
        $(this)
            .parents(".dropdown")
            .find(".btn span")
            .html($(this).html() + "");
        $(this).parents(".dropdown").find(".btn").val($(this).data("value"));
    });

    // Video popup
    if ($(".popup-youtube").length) {
        $(".popup-youtube").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    /*------ Timer Countdown ----*/
    $("[data-countdown]").each(function () {
        var $this = $(this),
            finalDate = $(this).data("countdown");
        $this.countdown(finalDate, function (event) {
            $(this).html(event.strftime("" + '<span class="countdown-section"><span class="countdown-amount font-sm-bold lh-16">%D</span><span class="countdown-period lh-14 font-xs"> days </span></span>' + '<span class="countdown-section"><span class="countdown-amount font-sm-bold lh-16">%H</span><span class="countdown-period font-xs lh-14"> hour </span></span>' + '<span class="countdown-section"><span class="countdown-amount font-sm-bold lh-16">%M</span><span class="countdown-period font-xs lh-14"> min </span></span>' + '<span class="countdown-section"><span class="countdown-amount font-sm-bold lh-16">%S</span><span class="countdown-period font-xs lh-14"> sec </span></span>'));
        });
    });

    //Mobile left sideba
    function mobileLeftSidebar() {
        var width = $(window).width();
        if (width < 992) {
            $(".menu-texts li.has-children > a").removeAttr("href");
            $(".menu-texts li.has-children > a").on("click", function (e) {
                $(this).parent().toggleClass("submenu-open");
                $(this).parent().siblings().removeClass("submenu-open");
            });
        }
    }
    mobileLeftSidebar();


    // init var swiper
    var swiper_1 = null;

    $(document).on("click", function (event) {
        var $trigger = $(".box-dropdown-cart");
        var $triggerSearch = $(".box-search-top");
        if ($triggerSearch !== event.target && !$triggerSearch.has(event.target).length) {
            $(".form-search-top").slideUp();
        }
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $(".dropdown-account").removeClass("dropdown-open");
            $(".dropdown-cart").removeClass("dropdown-open");
        }
        var location = $(".dropdown-location");
        if (!location.is(event.target) && location.has(event.target).length === 0) {
            $(".box-dropdown-location").fadeOut();
        }
    });

    $(".icon-account").on("click", function () {
        $(".dropdown-account").toggleClass("dropdown-open");
    });

    $(".icon-cart").on("click", function () {
        $(".dropdown-cart").toggleClass("dropdown-open");
    });

    // SLick
    $(".main-image-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: 0,
        fade: false,
        draggable: false,
        // asNavFor: ".slider-nav-thumbnails"
    });

    $(".slider-nav-thumbnails").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".main-image-slider",
        dots: false,
        arrows: false,
        focusOnSelect: true,
        vertical: true,
        infinite: 0,
        prevArrow: '<button type="button" class="slick-prev"><svg class="w-6 h-6 icon-16" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg class="w-6 h-6 icon-16" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></button>'
    });

    $(".list-terms li a").on("click", function(e){
        e.preventDefault();
        var id = $(this).attr("href");
        var _top = $(id).offset().top - 90;
        $("html,body").animate({scrollTop: _top}, 500);
    });

    $(window).scroll(function(){
        var _top = $(document).scrollTop();
        var _width = $(window).width();
        if (_width > 992) {
            if (_top < 850) {
                var _rs = _top / 30;
                var _rs2 = _rs - 10;
                $(".banner-7-img-1").css("transform", "translate3d(0px, -" + _rs + "%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)");
                $(".banner-7-img-2").css("transform", "translate3d(0px, " + _rs2 + "%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)");
            }
        }
    }).scroll();

    // init swiper fleet 3 item
    initSwiperFleet3Item();

    $(".form-comment input, .form-comment textarea, .form-comment select").focus(function () {
        $(this).parents(".form-group").addClass("focused");
    });

    $(".form-comment input, .form-comment textarea, .form-comment select").blur(function () {
        var inputValue = $(this).val();
        if (inputValue == "") {
            $(this).removeClass("filled");
            $(this).parents(".form-group").removeClass("focused");
        } else {
            $(this).addClass("filled");
        }
    });
    $(".form-comment input, .form-comment textarea, .form-comment select").each(function () {
        if (this.value) {
            $(this).parents(".form-group").addClass("focused");
            $(this).addClass("filled");
        }
    });
    $(window).resize(function () {
        var height_screen = $(window).height();
        $(".box-comingsoon").height(height_screen);
    }).resize();

    $(".extra-quantity .minus").on("click", function(){
        var _parent = $(this).parents(".extra-quantity");
        var _val = _parent.find("input").val();
        _val = parseInt(_val);
        var _input = _parent.find("input");
        if (_val > 0) {
            _input.val(_val - 1);
        }
    });
    $(".extra-quantity .plus").on("click", function () {
        var _parent = $(this).parents(".extra-quantity");
        var _val = _parent.find("input").val();
        _val = parseInt(_val);
        var _input = _parent.find("input");
        _input.val(_val + 1);
    });
})(jQuery);

// Add essential mobile navigation CSS
function addMobileNavStyles() {
    var css = `
        /* Essential mobile navigation styles */
        .burger-icon {
            display: block;
            width: 30px;
            height: 25px;
            position: relative;
            cursor: pointer !important;
            z-index: 9999;
            background: none;
            border: none;
            padding: 0;
        }
        
        .burger-icon span {
            display: block;
            width: 100%;
            height: 3px;
            background: #333;
            margin-bottom: 5px;
            transition: all 0.3s ease;
        }
        
        .burger-icon span:last-child {
            margin-bottom: 0;
        }
        
        .burger-close span:nth-child(1) {
            transform: rotate(45deg) translate(8px, 8px);
        }
        
        .burger-close span:nth-child(2) {
            opacity: 0;
        }
        
        .burger-close span:nth-child(3) {
            transform: rotate(-45deg) translate(8px, -8px);
        }
        
        .mobile-header-active {
            position: fixed;
            top: 0;
            left: -300px;
            width: 300px;
            height: 100vh;
            background: #fff;
            z-index: 9998;
            transition: left 0.3s ease;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }
        
        .mobile-header-active.sidebar-visible {
            left: 0;
        }
        
        .mobile-menu-close {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 30px;
            cursor: pointer;
            z-index: 9999;
        }
        
        .body-overlay-1 {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9997;
            display: none;
            cursor: pointer;
        }
        
        .mobile-menu-active .body-overlay-1 {
            display: block;
        }
        
        .mobile-menu-active {
            overflow: hidden;
        }
        
        @media (min-width: 768px) {
            .burger-icon {
                display: none;
            }
        }
    `;
    
    // Add CSS to head
    if (!$('#mobile-nav-styles').length) {
        $('<style id="mobile-nav-styles">' + css + '</style>').appendTo('head');
    }
}

// Add styles immediately
addMobileNavStyles();
// Check billed
function switchBilled() {
    var checkBox = $("#cb_billed_type");
    var forMonth = $(".for-month");
    var forYear = $(".for-year");
    var billMonth = $(".text-billed-month");
    var billYear = $(".text-billed-year");
    for (var i = 0; i < forMonth.length; i++) {
        if (checkBox.is(":checked")) {
            forYear.eq(i).addClass("display-year");
            billYear.addClass("active");
            billMonth.removeClass("active");
            forMonth.eq(i).removeClass("display-month");
        } else {
            forYear.eq(i).removeClass("display-year");
            billMonth.addClass("active");
            billYear.removeClass("active");
            forMonth.eq(i).addClass("display-month");
        }
    }
}
var swiper_4_fleet = null;
var swiper_4_service = null;
var swiper_5_cities = null;
var swiper_2_fleet_single = null;
function initSwiper2IemSingle() {
    if (swiper_2_fleet_single) {
        swiper_2_fleet_single.destroy();
    }
    swiper_2_fleet_single = new Swiper(".swiper-group-2-single-fleet", {
        spaceBetween: 30,
        slidesPerView: 4,
        slidesPerGroup: 1,
        // initialSlide: 1,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next-fleet",
            prevEl: ".swiper-button-prev-fleet"
        },
        pagination: {
            el: ".swiper-pagination-fleet",
            clickable: true
        },
        autoplay: {
            delay: 10000
        },
        on: {
            beforeInit: function () {
                // set padding left slide fleet
                var leftTitle = 0;

                var titleFleet = $(".title-fleet");
                if (titleFleet.length > 0) {
                    leftTitle = titleFleet.offset().left;
                }
                if ($(".box-slide-fleet").length > 0) {
                    $(".box-slide-fleet").css("padding-left", leftTitle + "px");
                }
            }
        },
        breakpoints: {
            1399: {
                slidesPerView: 2
            },
            1100: {
                slidesPerView: 2
            },
            670: {
                slidesPerView: 2
            },
            575: {
                slidesPerView: 1
            },
            400: {
                slidesPerView: 1
            },
            350: {
                slidesPerView: 1
            },
            150: {
                slidesPerView: 1
            }
        }
    });
}
function initSwiperFleet() {
    if (swiper_4_fleet) {
        swiper_4_fleet.destroy();
    }
    swiper_4_fleet = new Swiper(".swiper-group-4-fleet", {
        spaceBetween: 30,
        slidesPerView: 4,
        slidesPerGroup: 1,
        // initialSlide: 1,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next-fleet",
            prevEl: ".swiper-button-prev-fleet"
        },
        pagination: {
            el: ".swiper-pagination-fleet",
            clickable: true
        },
        autoplay: {
            delay: 10000
        },
        on: {
            beforeInit: function () {
                // set padding left slide fleet
                var leftTitle = 0;

                var titleFleet = $(".title-fleet");
                if (titleFleet.length > 0) {
                    leftTitle = titleFleet.offset().left;
                }
                if ($(".box-slide-fleet").length > 0) {
                    $(".box-slide-fleet").css("padding-left", leftTitle + "px");
                }
            }
        },
        breakpoints: {
            1399: {
                slidesPerView: 4
            },
            1100: {
                slidesPerView: 3
            },
            670: {
                slidesPerView: 2
            },
            575: {
                slidesPerView: 1
            },
            400: {
                slidesPerView: 1
            },
            350: {
                slidesPerView: 1
            },
            150: {
                slidesPerView: 1
            }
        }
    });
}
function initSwiperFleet3Item() {
    var swiper_3_fleet = new Swiper(".swiper-group-3-fleet", {
        spaceBetween: 30,
        slidesPerView: 3,
        slidesPerGroup: 1,
        // initialSlide: 1,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next-fleet",
            prevEl: ".swiper-button-prev-fleet"
        },
        pagination: {
            el: ".swiper-pagination-fleet",
            clickable: true
        },
        autoplay: {
            delay: 10000
        },
        breakpoints: {
            1399: {
                slidesPerView: 3
            },
            1100: {
                slidesPerView: 3
            },
            670: {
                slidesPerView: 2
            },
            575: {
                slidesPerView: 1
            },
            400: {
                slidesPerView: 1
            },
            350: {
                slidesPerView: 1
            },
            150: {
                slidesPerView: 1
            }
        }
    });
}
function initSwiper1Iem(id_class, button_next_class, button_prev_class, pagination, type = "bullets") {
    console.log(type);
    var swiper_1_items = new Swiper(id_class, {
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: button_next_class,
            prevEl: button_prev_class
        },
        pagination: {
            el: pagination,
            clickable: true,
            type: type
        },
        autoplay: {
            delay: 10000
        }
    });
}
function initSwiperTestimonials(id_class, button_next_class, button_prev_class, pagination, type = "bullets") {
    var swiper_1_items = new Swiper(id_class, {
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: button_next_class,
            prevEl: button_prev_class
        },
        pagination: {
            el: pagination,
            clickable: true,
            type: type
        },
        autoplay: {
            delay: 10000
        },
        on: {
            beforeInit: function (swiper) {
                var slides_count = $(id_class).find(".swiper-slide");
                var lastNumber = slides_count.length;
                if (lastNumber > 0) {
                    $(".firstNumber").html("01");
                }
                if (lastNumber > 0) {
                    if (lastNumber < 10) {
                        lastNumber = "0" + lastNumber;
                    }
                    $(".lastNumber").html(lastNumber);
                }
            }
        },
        onAny(eventName, ...args) {
            if (eventName == "slidePrevTransitionEnd" || eventName == "slideNextTransitionEnd") {
                var activeNum = args[0].realIndex + 1;
                if (activeNum > 0) {
                    if (activeNum < 10) {
                        activeNum = "0" + activeNum;
                    }
                    $(id_class).find(".firstNumber").html(activeNum);
                }
            }
        }
    });
}
function initSwiperService() {
    if (swiper_4_service) {
        swiper_4_service.destroy();
    }
    swiper_4_service = new Swiper(".swiper-group-4-service", {
        spaceBetween: 30,
        slidesPerView: 4,
        slidesPerGroup: 1,
        // initialSlide: 1,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next-fleet",
            prevEl: ".swiper-button-prev-fleet"
        },
        pagination: {
            el: ".swiper-pagination-fleet",
            clickable: true
        },
        autoplay: {
            delay: 10000
        },
        on: {
            beforeInit: function () {
                // set padding left slide fleet
                var titleFleet = $(".title-fleet");
                var leftTitle = titleFleet.offset().left;
                $(".box-slide-fleet").css("padding-left", leftTitle + "px");
            }
        },
        breakpoints: {
            1399: {
                slidesPerView: 4
            },
            1100: {
                slidesPerView: 3
            },
            600: {
                slidesPerView: 2
            },
            500: {
                slidesPerView: 1
            },
            350: {
                slidesPerView: 1
            },
            150: {
                slidesPerView: 1
            }
        }
    });
}
function initSwiperCities() {
    if (swiper_5_cities) {
        swiper_5_cities.destroy();
    }
    swiper_5_cities = new Swiper(".swiper-group-5-cities", {
        spaceBetween: 30,
        slidesPerView: 5,
        slidesPerGroup: 1,
        // initialSlide: 1,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next-fleet",
            prevEl: ".swiper-button-prev-fleet"
        },
        pagination: {
            el: ".swiper-pagination-fleet",
            clickable: true
        },
        autoplay: {
            delay: 10000
        },
        on: {
            beforeInit: function () {
                // set padding left slide fleet
                var titleFleet = $(".title-fleet");
                var leftTitle = titleFleet.offset().left;
                $(".box-slide-fleet").css("padding-left", leftTitle + "px");
            }
        },
        breakpoints: {
            1399: {
                slidesPerView: 5
            },
            1100: {
                slidesPerView: 4
            },
            600: {
                slidesPerView: 3
            },
            450: {
                slidesPerView: 2
            },
            350: {
                slidesPerView: 1
            },
            150: {
                slidesPerView: 1
            }
        }
    });
}

var timer;
var timer2;
var timer3;
var timer4;

window.addEventListener("resize", function () {
    if (timer) {
        clearTimeout(timer);
    }
    if (timer2) {
        clearTimeout(timer2);
    }
    if (timer3) {
        clearTimeout(timer3);
    }
    if (timer4) {
        clearTimeout(timer4);
    }
    if ($(".swiper-group-4-fleet").length > 0) {
        timer = setTimeout(initSwiperFleet, 400);
    }
    if ($(".swiper-group-4-service").length > 0) {
        timer2 = setTimeout(initSwiperService, 400);
    }
    if ($(".swiper-group-5-cities").length > 0) {
        timer3 = setTimeout(initSwiperCities, 400);
    }
    if ($(".swiper-group-2-single-fleet").length > 0) {
        timer4 = setTimeout(initSwiper2IemSingle, 400);
    }
});

if ($(".swiper-group-4-fleet").length > 0) {
    initSwiperFleet();
}
if ($(".swiper-group-4-service").length > 0) {
    initSwiperService();
}
if ($(".swiper-group-5-cities").length > 0) {
    initSwiperCities();
}
if ($(".swiper-group-testimonials").length > 0) {
    initSwiperTestimonials(".swiper-group-testimonials", ".swiper-button-next-testimonials", ".swiper-button-prev-testimonials", ".swiper-pagination-testimonials");
}
if ($(".swiper-group-testimonials-2").length > 0) {
    initSwiper1Iem(".swiper-group-testimonials-2", ".swiper-button-next-testimonials-2", ".swiper-button-prev-testimonials-2", ".swiper-pagination-testimonials-2", "fraction");
}
if ($(".swiper-group-testimonials-fraction").length > 0) {
    initSwiper1Iem(".swiper-group-testimonials-fraction", ".swiper-button-next-testimonials-fraction", ".swiper-button-prev-testimonials-fraction", ".swiper-pagination-testimonials-fraction", "fraction");
}
if ($(".swiper-group-2-single-fleet").length > 0) {
    initSwiper2IemSingle();
}
    function initSwiperTab(idx) {
        if ($(".swiper-tab-" + idx + "").length == 0) {
            return;
        }
        return new Swiper(".swiper-tab-" + idx + "", {
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next-tab-" + idx,
                prevEl: ".swiper-button-prev-tab-" + idx
            },
            autoplay: {
                delay: 10000
            }
        });
    }

//Perfect Scrollbar
if ($(".mobile-header-wrapper-inner").length) {
    const ps = new PerfectScrollbar(".mobile-header-wrapper-inner");
}

// Main JavaScript file for FC Rides website

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link based on current page
    function setActiveNavLink() {
        // Get the current page filename
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Get all navigation links
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        // Remove active class from all links first
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to the matching link
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
                link.classList.add('active');
            }
        });
    }
    
    // Call the function to set active nav link
    setActiveNavLink();
    
    // Ensure Premium Client button always shows correct text
    function ensurePremiumClientText() {
        const premiumClientButtons = document.querySelectorAll('.nav-cta span');
        premiumClientButtons.forEach(button => {
            if (button.textContent.trim() !== 'Premium Client') {
                button.textContent = 'Premium Client';
            }
        });
    }

    // Run on page load
    ensurePremiumClientText();

    // Also run periodically to catch any dynamic changes
    setInterval(ensurePremiumClientText, 1000);

    const burgerIcon = document.querySelector('.burger-icon');
    const navMenu = document.querySelector('.nav-menu');
    
    if (burgerIcon && navMenu) {
        burgerIcon.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate burger icon
            const spans = burgerIcon.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Remove button border on click for all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.outline = 'none';
            this.style.border = 'none';
        });
        
        // Also remove focus outline for better UX
        button.addEventListener('focus', function() {
            this.style.outline = 'none';
        });
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = burgerIcon.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Accordion functionality for FAQ page
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            const accordionCollapse = this.nextElementSibling;
            const isOpen = accordionItem.classList.contains('open');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('open');
                item.querySelector('.accordion-collapse').style.display = 'none';
            });
            
            // If clicked item wasn't open, open it
            if (!isOpen) {
                accordionItem.classList.add('open');
                accordionCollapse.style.display = 'block';
            }
        });
    });
    
    // Open the first item in each category by default
    document.querySelectorAll('.accordion').forEach(accordion => {
        const firstItem = accordion.querySelector('.accordion-item');
        if (firstItem) {
            firstItem.classList.add('open');
            firstItem.querySelector('.accordion-collapse').style.display = 'block';
        }
    });
    
    // Add hover effects to fleet cards
    const fleetCards = document.querySelectorAll('.fleet-card');
    fleetCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(37, 150, 190, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'none';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.fleet-feature');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 35px rgba(37, 150, 190, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'none';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.hero-heading, .hero-description, .fleet-title, .fleet-description, .features-title, .fleet-feature, .fleet-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.hero-heading, .hero-description, .fleet-title, .fleet-description, .features-title, .fleet-feature, .fleet-card');
    animatedElements.forEach(element => {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });
    
    // Trigger initial animation check
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});
