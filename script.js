/* gettingstarted static */
// site module, s declared at same level so all sub functions will have access to settings
var s,
    BashWindow = {
        // default settings and helper selectors
        settings: {
            line_height: 15,
            line_width: 7,
            bash: $('#bash'),
            term_start: $("#terminal_start"),
            lines: $('.term_para'),
            sh: $('#sh'),
            ta: $('.text_area'),
            window: $(window),
            menu: $('#menu_bar_container'),
            modal: $('#modal'),
            redbutton: $('.red'),
            yellowbutton: $('.yellow'),
            greenbutton: $('.green'),
            date: $('#datetime'),
            bW: $('.big_window'),
            bashIcon: $('.bash_icon')
        },

        // s is pointer to settings and calls bind and start up functions
        init: function () {
            s = this.settings;
            this.modalBindings();
            this.tipoftheday();
            this.renderDate();
        },

        modalBindings: function () {
            // function to get size of window using getcoords function. 
            var getsize = function () {
                s.bash.html(BashWindow.getCoords(s.line_height, s.line_width, s.ta));
            };

            // helper to toggle bash Icon 
            var toggleBashIcon = function() {
                s.bashIcon.toggleClass("hidden");
            };

            // helper to toggle menu modal
            var toggleMenuModal = function() {
                s.modal.toggleClass("hidden");
                s.menu.toggleClass("change");
            };

            // helper to toggle modal while hiding bash icon if visible.
            var toggleMenu = function() {
                toggleMenuModal();
                    if (s.bashIcon.is(':visible')) {
                        toggleBashIcon();
                    }
                    getsize();
            };

            // binds menu icon to animate and show modal. calls size to populate window size.
            s.menu.on("click",
                function () {
                    toggleMenu();
                });
            
            // binds toggle when bash icon clicked
            s.bashIcon.on("click",
                function () {
                    toggleMenu();
                });

            // adds toggles to redbutton on modal window.
            s.redbutton.on("click",
                function () {
                    toggleMenuModal();
                });
            
            // adds functionality to greenbutton on modal window
            s.greenbutton.on("click",
                function(){
                    s.bW.toggleClass("text_area_large");
                    getsize();
                });

            // adds functionality to yellow button to display an icon
            s.yellowbutton.on("click",
                function() {
                    toggleBashIcon();
                    toggleMenuModal();
                });

            // updates size every time window is resized
            s.window.on('resize', getsize);

        },

        // Renders and formats datetime
        renderDate: function() {
            // creates date object and converts to string
            dateObj = new Date().toString();
            // splits date object by Month Day Year to mimick terminal date
            mdy = dateObj.substring(0, 10);
            // splits date object by hour min sec to mimick terminal
            hms = dateObj.substring(15, 24);
            // inserts date into HTML ID
            s.date.html(mdy + hms);
        },

        // selects random tip from top of day list
        tipoftheday: function () {
            var tipOfTheDayList = [
                "Make sure to add an alt attribute to your images!",
                "Create backups of work often!",
                "Rotate your tires for winter!",
                "When Dan Gilbert posted a letter about Lebron James leaving he used Comic Sans font",
                "Instead of using if one == None or two == None use if None in (one, two)"
            ]

            $("<p class='term_para'>Tip of the day: " + BashWindow.getRandom(tipOfTheDayList) + "</p>").insertAfter("#sh");
        },

        // helpers

        // takes height(x) and width(y) for text area(z)
        getCoords: function (x, y, z) {
            // checks if argument is a number between 1 and 500 and a real number, else uses default value
            var checkVal = function (val1, defaultval) {
                if (typeof val1 == 'number' && val1 <= 500 && val1 > 0 && val1 != NaN) {
                    val1 = val1
                } else {
                    val1 = defaultval
                }; return val1;
            };
            // takes height makes sure it is a valid number converts to string and slices
            window_height = (z.height() / checkVal(x, 15)).toString().substring(0, 2);
            window_width = (z.width() / checkVal(y, 7)).toString();
            // determines if number is 2 or 3 digits to use whole numbers
            bash_x = ((z.width() / y) > 100) ? window_width.substring(0, 3) : window_width.substring(0, 2);
            // returns a string to be used representing the column and line size
            return (bash_x + "x" + window_height)
        },

        // random number generator by list length
        getRandom: function (list) {
            return list[Math.floor(Math.random() * list.length)]
        },

    };// end bashwindow controller

// starts app by calling init function
(function () {
    BashWindow.init();
})();
