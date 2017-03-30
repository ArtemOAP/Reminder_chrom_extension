chrome.extension.onConnect.addListener(function(port) {
    var timeoutID;
    port.onMessage.addListener(function(msg) {
        function main () {
            var date=new Date();
            var hour= date;
            var notification = new Notification('Success', {
                icon: 'icon/exclamation.png',
                body: "Напоминание: "+msg.text
            });
            setTimeout(notification.close.bind(notification), 1500);
        }

        if(msg.status=='start' && !timeoutID ){
            timeoutID=setInterval(function () {
                main();
            },1000*60*msg.init);
        }
        if(msg.status=='stop'){
            clearInterval(timeoutID);
            timeoutID=null;
        }

        /**
         * отправляем сообщение
         */
        port.postMessage("Hi Popup.js");
    });
});