(function(){
    setInterval(onTrigger, 3000);

    function onTrigger() {
        $('div#lightbox-footer-right a.btn').click();
    }
})();