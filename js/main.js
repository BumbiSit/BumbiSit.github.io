/**
 * Created by Silvestrs on 9/26/2015.
 */

// !README!
// Sākumā tika paredzēts, ka template mapē stāvēs katras lapas HTML,
// bet lokāli taisot tas nav iespējams, jo pārlūks neļauj lādēt lokālos
// failus ar JS. Tādēļ es saturu no template failiem saliku index failā
// template tagos.

var timeInit=false;
var timeTick=0;
var canClick=true;
$(document).ready(function(){
    loadPage("news"); // Pēc noklusējuma ielādēs "news" saturu

    $("#menu ul li a").click(function () {
        if ($(this).hasClass("active") || !canClick) return 0;
        $("#main").css("max-height","0px");
        canClick=false;
        $("#menu ul li a.active").removeClass("active");
        $(this).addClass("active");
        var _this = this;
        setTimeout(function(){loadPage($(_this).data("saturs"));},800);
    });

    setInterval(updateTime,1000); //Uzsākam atkārtoto taimeri, kurš atjaunos laiku

    //Validācija
    
});
// Funkcija, kas ielādēs html no failiem (nu jau <template> elementiem) un ieliks to content elementē.
function loadPage(pageName){
    $("#main > #content").html($("template[name="+pageName+"]").html());
    $("#main").css("max-height","1000px"); // Pieņemsim, ka šis elements nekad nebūs garāks par 1000px. P.S. Vajag anim?cijas ;)
    canClick=true;
}
// Funkcija, kas darbina menu laiku
function updateTime(){
    //Pirmajā taimera notikšanā, anim?t pulsteni uz redzamu
    if (!timeInit){
        timeInit=true;
        $("li#time").css("opacity",1);
    }
    var date = new Date(); //Date objekts, ar kuru var dabūt laiku
    var h = date.getHours();
    var m = date.getMinutes();
    m = (m < 10 ? '0'+m : m); //Minūtēm pieliekam klāt 0, ja vienskaitlī
    $("li#time").html(h+(timeTick == 0 ? ":" : " ")+m); // kols mirgos katru sekundi
    if (timeTick==0) timeTick=1;
    else timeTick=0;
}
