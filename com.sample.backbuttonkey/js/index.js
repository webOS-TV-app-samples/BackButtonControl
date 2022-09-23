var component = (function () {
  var cutomHistory = [];
  var webOSversion = 6;
  var itemArray = document.getElementsByTagName("a");
  var _initState = function () {
    var expectedResult = document.getElementById("expected_result");
    document.getElementById("curr_page").innerText = "Main";
    if (webOSversion <= 5) {
      expectedResult.innerText =
        "The home launcher is launched and the app goes into the background.";
    } else {
      expectedResult.innerText =
        "A pop-up window will appear asking if you want to exit. If you click exit, the app will be closed";
    }
    document.getElementById("page_depth").innerText = 1;
    _disableLink();
  };
  var _addBreadCream = function (text) {
    var ul = document.getElementsByClassName("breadcrumb")[0];
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
    document.getElementById("page_depth").innerText =
      ul.getElementsByTagName("li").length;
    _getPreviousPage();
    _getCurrentPage();
  };
  var _removeBreadCream = function () {
    var ul = document.getElementsByClassName("breadcrumb")[0];
    ul.removeChild(ul.lastElementChild);
    document.getElementById("page_depth").innerText =
      ul.getElementsByTagName("li").length;
    if (ul.getElementsByTagName("li").length === 1) {
      _initState();
    } else {
      _getPreviousPage();
      _getCurrentPage();
    }
  };
  var _pushPages = function (page) {
    var curr_page = document.getElementById("curr_page");
    curr_page.innerText = page;
    _addBreadCream(page);
  };
  var _getPreviousPage = function () {
    var ul = document.getElementsByClassName("breadcrumb")[0];
    var length = ul.getElementsByTagName("li").length;
    if (length > 1) {
      document.getElementById("expected_result").innerText =
        "Move to the previous page";
    }
  };
  var _getCurrentPage = function () {
    var ul = document.getElementsByClassName("breadcrumb")[0];
    var length = ul.getElementsByTagName("li").length;
    if (length > 0) {
      var curr_page = ul.getElementsByTagName("li")[length - 1].innerText;
      document.getElementById("curr_page").innerText = curr_page;
      setTimeout(function () {
        _disableLink(curr_page);
      }, 100); // this delay is needed to show the select effect in using OK button on the remote
    }
  };
  var _disableLink = function (curr_page) {
    console.log("_disableLink:" + curr_page);
    for (var i = 0; i < itemArray.length; i++) {
      var item = itemArray[i];
      if (item.innerText === curr_page) {
        item.classList.add("link_disable");
        item.setAttribute("disabled", true);
        item.focus();
      } else {
        item.classList.remove("link_disable");
        item.removeAttribute("disabled");
        item.blur();
      }
    }
  };
  var _keyDownHandler = function (event) {
    if (window.event) {
      keycode = event.keyCode;
    } else if (event.which) {
      keycode = event.which;
    }
    console.log(keycode);
    if (keycode === 461) {
      _popstate(cutomHistory.pop());
    }
  };
  var _getDeviceInfo = function () {
    webOS.deviceInfo(function (device) {
      if (device && device.sdkVersion) {
        var majorVersion = parseInt(device.sdkVersion.split(".")[0]);
        if (!isNaN(majorVersion)) {
          webOSversion = majorVersion;
          _initState();
        } else {
          _initState();
        }
      }
    });
  };
  var _popstate = function (data) {
    if (data) {
      var curr_page = document.getElementById("curr_page");
      curr_page.innerText = data.state;
      _removeBreadCream();
    } else {
      webOS.platformBack();
    }
  };
  var pageClickHandler = function (event) {
    var insert = true;
    if (
      cutomHistory.length > 0 &&
      cutomHistory[cutomHistory.length - 1].state === event.target.innerHTML
    ) {
      insert = false;
    }
    if (event.target.nodeName == "A" && insert) {
      stackElement = event.target.innerHTML;
      cutomHistory.push({
        state: stackElement,
        url: event.target.href,
      });
      _pushPages(stackElement);
    }
  };
  var addEventListeners = function () {
    window.addEventListener("keydown", _keyDownHandler);
    _getDeviceInfo();
  };
  return {
    addEventListeners,
    pageClickHandler,
  };
})();

window.addEventListener("load", function () {
  SpatialNavigation.init();
  SpatialNavigation.add({
    selector: ".item",
  });
  SpatialNavigation.makeFocusable();
  component.addEventListeners();
  navigationSupport.addEventListeners(component);
});
