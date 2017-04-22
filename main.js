
// Make sure we are accessing over https, if not redirect
if ((!location.port || location.port === "80") && location.protocol !== "https:" && location.host !== "localhost") {
    location.protocol = "https:";
}

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('service-worker.js').then(function (registration) {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
    }).catch(function (error) {
        console.log('ServiceWorker registration failed:', errror);
    });
}


//Notification Alert

$(document).ready(function () {
    window.setInterval(function () {
        //showNotifications();
        var Variable = "1";
        $.ajax({
            type: "POST",
            url: "/WebServices/Alert.asmx/GetNewVehicleNotifi",
            data: '{"ID" : ' + Variable + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (jsonData) {
                if (jsonData.d != "") {
                    if (jsonData.d != "")
                    {
                        showNotifications(jsonData.d);
                    }
                }
            }
        });

    }, 60000);

});
//navigator.serviceWorker.register('../sw.js');
function showNotifications(Message) {
    Notification.requestPermission(function (result) {
        if (result === 'granted') {
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification('Vehicle Alert', {
                    //actions: [
                    //    { action: 'like', title: 'Like', icon: 'https://cdn4.iconfinder.com/data/icons/basic-ui-elements/700/011_yes-128.png' },
                    //    { action: 'reply', title: 'Reply', icon: 'https://cdn4.iconfinder.com/data/icons/basic-ui-elements/700/011_yes-128.png' }],
                    body: Message,
                    icon: '../192x192.png',
                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                    requireInteraction: true,
                    tag: 'no-require-interaction'
                });
            });
        }
    });
}
