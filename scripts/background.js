chrome.extension.onConnect.addListener(function(port) {
    var setIntervalId;
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

        if(msg.status=='start' && !setIntervalId ){
            setIntervalId=setInterval(function () {
                main();
            },1000*60*msg.init);
            localStorage.setItem('setIntervalId', setIntervalId);
        }
        if(msg.status=='stop'){
            setIntervalId=localStorage.getItem('setIntervalId');
            console.log('setIntervalId=',setIntervalId);
            clearInterval(setIntervalId);
            setIntervalId=null;
            localStorage.removeItem('setIntervalId');

        }

        /**
         * отправляем сообщение
         */
        port.postMessage("Hi Popup.js");
    });
});