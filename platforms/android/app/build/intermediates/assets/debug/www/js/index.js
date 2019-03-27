var ref;
var app = {
    /*
    Application constructor
    */
    initialize: function() {
        this.bindEvents();
    },
    /*
    bind any events that are required on startup to listeners:
    */
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    /*
    this runs when the device is ready for user interaction:
    */
    onDeviceReady: function() {
        window.open = cordova.InAppBrowser.open;
        ref = window.open('https://my-tablebooker.be/pos/login.php', '_blank', 'location=no,hidden=no');

        app.addEventListeners();
    },
    addEventListeners: function() {
        ref.addEventListener( "loadstart", function(event) {
            var lin = event.url;
            /*
            *
            * Luisteren naar welke link?
            *
            */
            //if(event.url == 'https://my-tablebooker.be/pos/index.php'){
            if(event.url == 'https://my-tablebooker.be/open/NFC'){
                app.payNFC();
            }
            if(event.url == 'https://my-tablebooker.be/pos/close/NFC'){
                ref = window.location.replace("index.html");
            }
            if(event.url == 'close.html'){
                ref.close();
            }
        });
        ref.addEventListener('loadstop', function(event) {});
        ref.addEventListener('loaderror', function(event) {});
        ref.addEventListener('exit', function(event) {});
    },
    payNFC: function() {
        ref = window.location.replace('NFCReader.html');
    },
    /*
    appends @message to the message div:
    */
    display: function(message) {
    var label = document.createTextNode(message),
    lineBreak = document.createElement("br");
    messageDiv.appendChild(lineBreak); // add a line break
    messageDiv.appendChild(label); // add the text
    },
    /*
    clears the message div:
    */
    clear: function() {
    messageDiv.innerHTML = "";
    }
}; // end of app
