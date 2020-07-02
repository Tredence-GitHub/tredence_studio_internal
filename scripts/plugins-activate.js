(function($jq) {
  $jq(document).ready(function() {
    $jq(".studio-banner-wrap .each-tab").click(function(){
  		var dis = $(this), 
          dataTarget = dis.data("target")
          dis.addClass("active").siblings(".each-tab").removeClass("active");
          $(".studio-banner-wrap .each-tab-content").hide();
          $(dataTarget).show();
  	});
    $jq("#WhyTredence .each-tab").click(function(){
      var dis = $(this), 
          dataTarget = dis.data("target")
          dis.addClass("active").siblings(".each-tab").removeClass("active");
          $("#WhyTredence .each-tab-content").hide();
          $(dataTarget).show();
    });

    //smooth scroll
    $jq(".smooth-scroll").click(function() { 
      console.log("smooth-scroll clicked")
      var dis = $jq(this),
        target = dis.data("target"),
        offset = parseInt($jq(target).offset().top - $jq("#Header").outerHeight());
      console.log(target);
      $jq('html,body').stop().animate({ scrollTop: offset }, 200);
    });
    //Sticky Header
    function stickyHeader() {
      var cScrollVal = $jq(document).scrollTop(),
        body = $jq("body"),
        header = $jq("#Header"),
        hHeight = header.outerHeight(),
        hClass = "is-sticky";
      if (cScrollVal >= (hHeight / 2)) {
        if (!body.hasClass(hClass)) { body.addClass(hClass); }
      } else {
        if (body.hasClass(hClass)) { body.removeClass(hClass); }
      }
    }
    var prop_scrol_time = "";
    if ($(window).width() >= 1200) {
      $(window).scroll(function() {
        stickyHeader();
      })
    } else {
      $(window).scroll(function() {
        //stickyHeader();
      })
    }
    $(window).scroll(function() {
    var scroll = $(window).scrollTop();
        $("#return-to-top").toggleClass("active",(scroll >= 150));
      });
      //scroll body to 0px on click
      $('.to-header').click(function() {
        $('body,html').animate({
          scrollTop: 0
        }, 800);
        return false;
      });
    
    /*------------------------------
      https://codepen.io/ccallen001/pen/bEYByd
        Album Cover Slider 
      --------------------------------*/
      //start added by Chase
      var a = document.getElementsByClassName(".showcase");
      var cfImg = document.getElementsByClassName("coverflow__image")

      var scaleI = 0;
      for (scaleI; scaleI < a.length; scaleI++) {
        if (scaleI === 3) {
          continue;
        } else {
          a[scaleI].style.cursor = "default";
          a[scaleI].addEventListener("click", prevDef);
        }
      }

      function prevDef(e) {
        e.preventDefault();
      }

      function forScale(coverflowPos) {
        for (scaleI = 0; scaleI < a.length; scaleI++) {
          a[scaleI].style.cursor = "default";
          a[scaleI].addEventListener("click", prevDef);
        }
        for (scaleI = 0; scaleI < cfImg.length; scaleI++) {
          if (cfImg[scaleI].getAttribute("data-coverflow-index") == coverflowPos) {
            cfImg[scaleI].parentElement.style.cursor = "pointer";
            cfImg[scaleI].parentElement.removeEventListener("click", prevDef);
          }
        }
      }
      //end added by Chase

      function setupCoverflow(coverflowContainer) {
        var coverflowContainers;

        if (typeof coverflowContainer !== "undefined") {
          if (Array.isArray(coverflowContainer)) {
            coverflowContainers = coverflowContainer;
          } else {
            coverflowContainers = [coverflowContainer];
          }
        } else {
          coverflowContainers = Array.prototype.slice.apply(document.getElementsByClassName('coverflow'));
        }

        coverflowContainers.forEach(function(containerElement) {
          var coverflow = {};
          var prevArrows, nextArrows;

          //capture coverflow elements
          coverflow.container = containerElement;
          coverflow.images = Array.prototype.slice.apply(containerElement.getElementsByClassName('coverflow__image'));
          coverflow.position = Math.floor(coverflow.images.length / 2) + 1;

          //set indicies on images
          coverflow.images.forEach(function(coverflowImage, i) {
            coverflowImage.dataset.coverflowIndex = i + 1;
          });

          //set initial position
          coverflow.container.dataset.coverflowPosition = coverflow.position;

          //get prev/next arrows
          prevArrows = Array.prototype.slice.apply(coverflow.container.getElementsByClassName("prev-arrow"));
          nextArrows = Array.prototype.slice.apply(coverflow.container.getElementsByClassName("next-arrow"));

          //add event handlers
          function setPrevImage() {
            coverflow.position = Math.max(1, coverflow.position - 1);
            coverflow.container.dataset.coverflowPosition = coverflow.position;
            //call the functin forScale added
            forScale(coverflow.position);
          }

          function setNextImage() {
            coverflow.position = Math.min(coverflow.images.length, coverflow.position + 1);
            coverflow.container.dataset.coverflowPosition = coverflow.position;
            //call the function Chase added
            forScale(coverflow.position);
          }

          function jumpToImage(evt) {
            coverflow.position = Math.min(coverflow.images.length, Math.max(1, evt.target.dataset.coverflowIndex));
            coverflow.container.dataset.coverflowPosition = coverflow.position;
            //start added by Chase
            setTimeout(function() {
              forScale(coverflow.position);
            }, 1);
            //end added by Chase
          }

          function onKeyPress(evt) {
            switch (evt.which) {
              case 37: //left arrow
                setPrevImage();
                break;
              case 39: //right arrow
                setNextImage();
                break;
            }
          }
          prevArrows.forEach(function(prevArrow) {
            prevArrow.addEventListener('click', setPrevImage);
          });
          nextArrows.forEach(function(nextArrow) {
            nextArrow.addEventListener('click', setNextImage);
          });
          coverflow.images.forEach(function(image) {
            image.addEventListener('click', jumpToImage);
          });
          window.addEventListener('keyup', onKeyPress);
        });
      }

      setupCoverflow();
  });
})(jQuery)