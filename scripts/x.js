(function() {
    // Actual dimensions of a single character
    var actual_height, actual_width, client_x, client_y, scheduledAnimateFrame=false,
        space_elem, window_height, window_width;
    
    // Measure the dimensions of a character on window load
    document.addEventListener("DOMContentLoaded", function(event) { 
        var test_div = document.getElementById('measure');
        test_div.textContent = 'a';
        actual_width = test_div.clientWidth;
        actual_height = test_div.clientHeight;
        test_div.textContent = '';
        space_elem = document.getElementById("space");
        window_height = window.innerHeight;
        window_width = window.innerWidth;
        document.addEventListener("mousemove", mousemove_handler);

        // Set up touch events for mobile, etc
        document.addEventListener("touchstart", function (e) {
          var mousePos = getTouchPos(e);
          var mouseEvent = new MouseEvent("mousemove", mousePos);
          document.dispatchEvent(mouseEvent);
          e.preventDefault();
        }, false);
        document.addEventListener("touchend", function (e) {
          var mouseEvent = new MouseEvent("mouseup", {});
          document.dispatchEvent(mouseEvent);
          e.preventDefault();
        }, false);
        document.addEventListener("touchmove", function (e) {
          var mousePos = getTouchPos(e);
          var mouseEvent = new MouseEvent("mousemove", mousePos);
          document.dispatchEvent(mouseEvent);
          e.preventDefault();
        }, false);
    });

    window.addEventListener('resize', function(event){
         window_height = window.innerHeight;
         window_width = window.innerWidth;
    });

    function getTouchPos(event) {
        return event.touches[0];
    }

    function mousemove_handler (event) {
        // Only act if the last animation has completed.
        if (scheduledAnimateFrame === true) {
            return;
        }

        var dot, eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX === null && event.clientX !== null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        
        client_x = event.pageX;
        client_y = event.pageY;
        window.requestAnimationFrame(redraw); 
        scheduledAnimateFrame = true;
    }

    function redraw(timestamp) {
        // Insert spaces or X's into div#space based off x and y.
        
        var x = Math.ceil(client_x/actual_width),
            y = Math.ceil(client_y/actual_height),
            x_chars = Math.ceil(window_width/actual_width),
            y_chars = Math.ceil(window_height/actual_height),
            space_string = "";

        for (j=1; j<y_chars; j++) {
            for (i=1; i<x_chars; i++) {
                
               threshold = y;

                // If point is on "trail" between a top corner and (x, y), 
                // draw an X.
                
                // As i, j increase, the number of squares that fall within
                // an angle threshold increase. 
                
                // The closer x, y is to a corner, the wider the angle
                // threshold will become.

                if ( i*j*Math.abs(y/j - x/i) < threshold ||
           (x_chars-i)*j*Math.abs(y/j - (x_chars-x)/(x_chars-i)) < threshold) {
                    space_string += "x";
                }
                else {
                    space_string += " ";
                }
            }
            space_string += "\n";
        }
        space_elem.textContent = space_string;
        scheduledAnimateFrame = false;
    }
})();
