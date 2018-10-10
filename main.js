if ('serviceWorker' in navigator) {
    console.log("Serviceworker activados");

    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('serviceworker cargado', res))
        .catch(err => console.log('serviceworker no se ha podido registrar', err));

} else {
    console.log("No estan activados los serviceworker");
}

$(document).ready(function() {
    $("#menu a").click(function(e) {
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });

        return false;
    });
});