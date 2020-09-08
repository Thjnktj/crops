
    (function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

function validateForm(){
    var type1 = document.getElementById("check-1").value;

    if(type1 == "" || type1 == null){
        document.getElementById("error-1").innerHTML = "*";
        return false;
    }

    var type2 = document.getElementById("check-2").value;

    if(type2 == "" || type2 == null){
        document.getElementById("error-2").innerHTML = "*";
        return false;
    }

    var type3 = document.getElementById("check-3").value;

    if(type3 == "" || type == null){
        document.getElementById("error-3").innerHTML = "*";
        return false;
    }

    var type4 = document.getElementById("check-4").value;

    if(type4 == "" || type4 == null){
        document.getElementById("error-4").innerHTML = "*";
        return false;
    }
    var type5 = document.getElementById("check-5").value;

    if(type5 == "" || type5 == null){
        document.getElementById("error-5").innerHTML = "*";
        return false;
    }
}
