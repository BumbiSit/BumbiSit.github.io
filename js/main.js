/**
 * Created by Silvestrs on 9/26/2015.
 */

// !README!
// S?kum? tika paredz?ts, ka template map? st?v?s katras lapas HTML,
// bet lok?li taisot tas nav iesp?jams, jo p?rl?ks ne?auj l?d?t lok?los
// failus ar JS. T?d?? es saturu no template failiem saliku index fail?
// template tagos.

var timeInit=false;
var timeTick=0;
var canClick=true;
$(document).ready(function(){
    loadPage("news"); // P?c noklus?juma iel?d?s "news" saturu

    $("#menu ul li a").click(function () {
        if ($(this).hasClass("active") || !canClick) return 0;
        $("#main").css("max-height","0px");
        canClick=false;
        $("#menu ul li a.active").removeClass("active");
        $(this).addClass("active");
        var _this = this;
        setTimeout(function(){loadPage($(_this).data("saturs"));},800);
    });

    setInterval(updateTime,1000); //Uzs?kam atk?rtoto taimeri, kurš atjaunos laiku
});
// Funkcija, kas iel?d?s html no failiem (nu jau <template> elementiem) un ieliks to content element?.
function loadPage(pageName){
    $("#main > #content").html($("template[name="+pageName+"]").html());
    $("#main").css("max-height","1000px"); // Pie?emsim, ka šis elements nekad neb?s gar?ks par 1000px. P.S. Vajag anim?cijas ;)
    canClick=true;
}
// Funkcija, kas darbina menu laiku
function updateTime(){
    //Pirmaj? taimera notikšan?, anim?t pulsteni uz redzamu
    if (!timeInit){
        timeInit=true;
        $("li#time").css("opacity",1);
    }
    var date = new Date(); //Date objekts, ar kuru var dab?t laiku
    var h = date.getHours();
    var m = date.getMinutes();
    m = (m < 10 ? '0'+m : m); //Min?t?m pieliekam kl?t 0, ja vienskaitl?
    $("li#time").html(h+(timeTick == 0 ? ":" : " ")+m); // kols mirgos katru sekundi
    if (timeTick==0) timeTick=1;
    else timeTick=0;
}
