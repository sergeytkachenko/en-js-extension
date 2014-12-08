// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
    var context = "selection";
    var title = "add word(s) to DB";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
        "id": "context" + context});
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);
// The onClicked callback function.
function onClickHandler(info, tab) {
    var words = info.selectionText;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (data) {
        if(data.currentTarget.response) {
            console.log(data);
        }
    }; // Implemented elsewhere.
    var userID = localStorage.getItem('userID');
    xhr.open("GET", 'http://english.stkachenko.org.ua/words/add.json?words='+words+'&userID='+userID);
    xhr.send();
};