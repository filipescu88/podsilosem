jQuery( document ).ready( function( $ ) {
  var windowWidth = $( window ).width();
  var windowHeight = $( window ).height();
  var documentWidth = $( document ).width();
  var documentHeight = $( document ).height();

  // Modern Scroll Animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
      observer.observe(el);
    });
  }

  // Smooth Parallax Effect
  function initParallaxEffect() {
    $(window).on('scroll', function() {
      var scrolled = $(window).scrollTop();
      var parallax = $('.header-front-page');
      var speed = scrolled * 0.5;
      
      if (parallax.length) {
        parallax.css('transform', 'translateY(' + speed + 'px)');
      }
    });
  }

  // Enhanced Gallery Hover Effects
  function initGalleryEffects() {
    $('.modern-gallery-item').on('mouseenter', function() {
      $(this).find('.project-overlay i').addClass('fa-pulse');
    }).on('mouseleave', function() {
      $(this).find('.project-overlay i').removeClass('fa-pulse');
    });
  }

  // Smooth Counter Animation
  function initCounterAnimation() {
    $('.capacity-highlight').each(function() {
      var $this = $(this);
      var countTo = 14;
      
      $({ countNum: 0 }).animate({
        countNum: countTo
      }, {
        duration: 2000,
        easing: 'swing',
        step: function() {
          $this.find('strong').text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.find('strong').text(this.countNum);
        }
      });
    });
  }

  // Enhanced Button Interactions
  function initButtonEffects() {
    $('.modern-btn').on('mouseenter', function() {
      $(this).find('i').addClass('fa-bounce');
    }).on('mouseleave', function() {
      $(this).find('i').removeClass('fa-bounce');
    });
  }

  // Scroll Progress Indicator
  function initScrollProgress() {
    var progressBar = $('<div class="scroll-progress"></div>');
    progressBar.css({
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'width': '0%',
      'height': '3px',
      'background': 'linear-gradient(90deg, #f1d204, #e6c200)',
      'z-index': '9999',
      'transition': 'width 0.3s ease'
    });
    
    $('body').prepend(progressBar);
    
    $(window).on('scroll', function() {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = (scroll / height) * 100;
      progressBar.css('width', progress + '%');
    });
  }

  // Enhanced Mobile Menu
  function initMobileMenu() {
    $('.open-responsive-menu').on('click', function() {
      $(this).toggleClass('active');
      $('.responsive-menu').toggleClass('active');
      
      if ($(this).hasClass('active')) {
        $(this).html('<i class="fa fa-times"></i>');
      } else {
        $(this).html('<i class="fa fa-bars"></i>');
      }
    });
  }

  // Lazy Loading for Images
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            setTimeout(function() {
              img.style.opacity = '1';
            }, 100);
            
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('.modern-gallery-item').forEach(function(img) {
        imageObserver.observe(img);
      });
    }
  }

  // Enhanced Form Validation
  function initFormValidation() {
    $('form input, form textarea').on('blur', function() {
      var $this = $(this);
      if ($this.val().trim() === '' && $this.attr('required')) {
        $this.addClass('error');
      } else {
        $this.removeClass('error');
      }
    });
  }

  // Typing Effect for Hero Title
  function initTypingEffect() {
    const heroTitle = $('.hero-title');
    if (heroTitle.length) {
      const text = heroTitle.text();
      heroTitle.text('');
      
      let i = 0;
      const typeWriter = function() {
        if (i < text.length) {
          heroTitle.text(heroTitle.text() + text.charAt(i));
          i++;
          setTimeout(typeWriter, 50);
        }
      };
      
      setTimeout(typeWriter, 1000);
    }
  }

  // If is IOS
  function isIsIOS() {
    if ( iOS_check()) {
      $( '#counter' ).css( 'background-attachment', 'scroll' );
      $( '#testimonials' ).css( 'background-attachment', 'scroll' );
    }
  }

  // Smooth Scroll Anchors
  function smoothScrollAnchors() {
    $( 'body:not(.single-product) a[href*="#"]:not([href="#"])' ).on( 'click', function() {
      var target;
      if ( location.pathname.replace( /^\//, '' ) === this.pathname.replace( /^\//, '' ) && location.hostname === this.hostname ) {
        target = $( this.hash );
        target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );
        if ( target.length ) {
          $( 'html,body' ).animate( {
            scrollTop: target.offset().top - $( '#sticky-wrapper' ).outerHeight( true )
          }, 1000 );
          return false;
        }
      }
    } );
  }

  // Open Responsive Menu
  function openResponsiveMenu() {
    $( '.open-responsive-menu' ).on('click',function() {
      var top = $( '.top-header' ).outerHeight(),
          height = $( window ).height() - top;

      if ( $( '#header' ).hasClass( 'header-has-sticky-menu' ) ) {
        $( '.responsive-menu' ).css( { 'top': top, 'max-height': height } );
      }

      $( '.responsive-menu' ).toggle( 'slow', function() {
        $( this ).toggleClass( 'active' );
      } );
    } );
  }

  // Add Height To Front Page
  function addHeightToFrontPageProject() {
    var project = $( '#projects .project' );
    var projectWidth = $( project ).width();

    $( project ).css( 'height', projectWidth );
  }

  // Set Color on Front Page Service
  function setColorOnFrontPageService() {
    if ( $( '#services .section-content .service' ).length ) {
      $( '#services .section-content .service' ).each( function() {
        var service = $( this );
        var serviceIcon = $( service ).children( '.service-icon' );
        var serviceTitle = $( service ).children( '.service-title' );
        var dataServiceColor = $( service ).data( 'service-color' );

        $( serviceIcon ).css( 'color', dataServiceColor );
        $( serviceTitle ).css( 'color', dataServiceColor );
      } );
    }
  }

  // Set Color on Front Page Service
  function setColorOnFrontPagePerson() {
    if ( $( '#team .section-content .person' ).length ) {
      $( '#team .section-content .person' ).each( function() {
        var person = $( this );
        var dataPersonColor = $( person ).data( 'person-color' );
        var personPosition = $( person ).children( '.person-content' ).children( '.person-position' );
        var personContentSocial = $( person ).children( '.person-content' ).children( '.person-content-social.clearfix' ).children( 'li' ).children( 'a' );

        $( personPosition ).css( 'color', dataPersonColor );
        $( personContentSocial ).css( { 'border-color': dataPersonColor, 'color': dataPersonColor } );
      } );
    }
  }

  // Align Sub Sub Menu
  function alignSubSubMenu() {
    var subSubMenu;
    if ( $( '#header .top-header .header-navigation ul li.menu-item-has-children' ).length ) {
      subSubMenu = $( '#header .top-header .header-navigation ul li.menu-item-has-children ul' );

      $( subSubMenu ).each( function() {
        if ( ( windowWidth - $( this ).offset().left ) < 200 ) {
          $( this ).css( 'left', '-200px' );
        }
      } );
    }
  }

  // Scroll To Top
  function scrollToTop() {
    var item = $( '.illdy-top' );
    if ( item.length > 0 ) {
      item.on('click', function( event ) {
        event.preventDefault();
        $( 'html,body' ).animate( {
          scrollTop: 0
        }, 1000 );
      } );

      $( document ).on('scroll', function() {
        var y = window.scrollY;
        if ( y >= 300 ) {
          item.addClass( 'is-active' );
        } else {
          item.removeClass( 'is-active' );
        }
      } );

    }
  }

  // Called Functions
  $( function() {
    isIsIOS();
    smoothScrollAnchors();
    openResponsiveMenu();
    addHeightToFrontPageProject();
    setColorOnFrontPageService();
    setColorOnFrontPagePerson();
    alignSubSubMenu();
    scrollToTop();
    
    // Initialize new modern features
    initScrollAnimations();
    initParallaxEffect();
    initGalleryEffects();
    initCounterAnimation();
    initButtonEffects();
    initScrollProgress();
    initMobileMenu();
    initLazyLoading();
    initFormValidation();
    initTypingEffect();
  } );

  // Window Resize
  $( window ).resize( function() {

    // Called Functions
    $( function() {
      addHeightToFrontPageProject();
    } );
  } );

  // check operating system
  function iOS_check() {
    return [
             'iPad Simulator',
             'iPhone Simulator',
             'iPod Simulator',
             'iPad',
             'iPhone',
             'iPod'
           ].includes(navigator.platform)
           // iPad on iOS 13 detection
           || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

} );
