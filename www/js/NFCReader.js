var reader = {
    /*
    Application constructor
    */
    initialize: function() {
        //reader.display("reader initialized");
        reader.bindEvents();
    },
    /*
    bind any events that are required on startup to listeners:
    */
    bindEvents: function() {
        document.addEventListener('deviceready', reader.onDeviceReady, false);
        
    },
    onDeviceReady: function() {
        //reader.display('bindEvents start');
        nfc.addTagDiscoveredListener(
            reader.onNfc, // tag successfully scanned
            function (status) { // listener successfully initialized
                reader.display("Tap a tag to read its id number.");
            },
            function (error) { // listener fails to initialize
                reader.display("NFC reader failed to initialize " +
                JSON.stringify(error));
            }
        );
    },
    onNfc: function(nfcEvent) {
        var tag = nfcEvent.tag;
        reader.display("Read tag: " + nfc.bytesToHexString(tag.id));
        /*
        *
        * Hier na inlezen van tag
        *
        */
        var url = 'https://my-tablebooker.be/pos/validate.php?cid=' + nfc.bytesToHexString(tag.id);
        //ref = window.location.replace(url);
        //ref = window.location.replace(url, '_self', 'location=no,hidden=no');
        ref = cordova.InAppBrowser.open(url, '_self', 'location=no,hidden=no,zoom=no');
        app.addEventListeners();
        //reader.display("id location opened");
    },
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