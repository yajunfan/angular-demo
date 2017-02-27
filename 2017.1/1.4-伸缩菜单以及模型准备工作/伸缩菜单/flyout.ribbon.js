
(function($) {
    $.fn.FlyoutRibbon = function(options) {

        var defaults = {
            speed: 500
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
            $ribbon = $(this);
            $ribbon.prepend('<a class="ribbon-toggle"><span class="arrow"></span></a>');
            var toggleWidth = $ribbon.css('width');
            $ribbon.find('a.ribbon-toggle').toggle(function() {
                $(this).addClass('on');
                $ribbon.css('width', '100%');
                $ribbon.find('ul').animate({ marginLeft: '0%' }, options.speed);
            },
            function() {
                $ribbonToggle = $(this);
                $ribbon.find('ul').animate({ marginLeft: '100%' }, options.speed, function() { $ribbonToggle.removeClass('on'); $ribbon.css('width', toggleWidth); });
            });
        });
    };
})(jQuery); 
