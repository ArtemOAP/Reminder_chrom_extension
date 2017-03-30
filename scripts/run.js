
var port = chrome.extension.connect({
    name: "Sample Communication"
});

var  run= document.querySelector('.js-start');
run.addEventListener('click',function (event) {
    var init=parseInt(document.querySelector('input[name=int]').value),
        text=document.querySelector('textarea').value;
    if(init<0 || text.length<5 ){
        this.style.background='red';
        console.log('Некорректные даные');
        return false;
    }
     this.style.background='green';

    /**
     * стартуем сообщение
     */
    port.postMessage({status:'start',init:init,text:text});
    document.querySelector('textarea').value=text;
    document.querySelector('input[name=int]').value=init;
});

var stop=document.querySelector('.js-stop');
stop.addEventListener('click',function (event) {
    document.querySelector('input[name=int]').value='';
    document.querySelector('textarea').value='';
    port.postMessage({status:'stop',init:10,text:'Стоп'});
});

/**
 * принимаем
 */
port.onMessage.addListener(function(msg) {
});