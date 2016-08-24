(function () {

    // No need for jquery dependency.

    var header  = {
        toggle : document.getElementById('js-toggle'),
        header: document.getElementById('js-header-mobile'),
        open: false,
        init: function () {
            var that = this;

            that.toggle.addEventListener('click', function () {
                that.toggle_header();
            }, false);
        },
        toggle_header: function () {
            this.open = !this.open;
            if(this.open) {
                this.open_header();
            } else {
                this.close_header();
            }
        },
        open_header: function () {
            this.toggle.classList.add('toggle--close');
            this.header.classList.add('header--open');
        },
        close_header:function () {
            this.toggle.classList.remove('toggle--close');
            this.header.classList.remove('header--open');
        }
    };

    header.init();
})();