$.fn.slideshow = function(options) {
        var settings = $.extend({
           childElement: 'div.slide',
           firstSlide: 1,
           slideshow: this,
           count: 0,
           slideWidth: 960
        });

        //Mask Wrapper
        this.wrap('<div class="mask"></div>');

        this.after('<div class="opaque"></div>');
        this.after('<div class="opaque-right"></div>');

        var containerWidth = ($(this).find(settings.childElement).length + 1) * settings.slideWidth;
        var offset = offset($(window).width(), settings.slideWidth);
        this.width(containerWidth);
        $('.opaque, .opaque-right').css({
            width: offset + 'px',
            height: '600px'
        });


        $(document).delegate('a.next', 'click', function(e) {
            e.preventDefault();
            slideNext(settings.slideshow);
        });

        $(document).delegate('a.prev', 'click', function(e) {
            e.preventDefault();
            slidePrev(settings.slideshow);
        });

        function offset(window, slideWidth) {
            var offset = (window - slideWidth) / 2;
            $(settings.slideshow).css({'margin-left': -(-offset + slideWidth)+'px'});
            return offset;
        }

        function slideNext(slideshow) {


            settings.slideshow.find(settings.childElement).eq(0).animate({
                'margin-left': -settings.slideWidth + 'px'
            }, 600, function(){
                $(this).css('margin', '0px');
                $(settings.slideshow).find(settings.childElement).first().remove().appendTo(settings.slideshow);

            });

        }

        function slidePrev(slideshow) {

            $(settings.slideshow)
                .find(settings.childElement)
                .last()
                .css('margin-left', '-960px')
                .prependTo(settings.slideshow);

            settings.slideshow.find(settings.childElement).eq(0).animate({
                'margin-left': '0px'
            }, 600, function(){
                $(this).css('margin', '0px');
            });

        }

};
