var navigationSupport = (function () {
  var itemArray = document.getElementsByClassName("page_item");
  var mainComponent;
  var isEnter = false;
  var _onClickEvent = function (e) {
    e.preventDefault();
    if (!isEnter) {
      mainComponent.pageClickHandler(e);
    }
  };

  var _onMouseOverEvent = function (e) {
    for (var i = 0; i < itemArray.length; i++) {
      _removeFocus(itemArray[i]);
    }
    document.getElementById(e.target.id).focus();
  };
  var _removeFocus = function (item) {
    item.blur();
  };
  var _itemKeyDownHandler = function (e) {
    if (e.keyCode === 13) {
      isEnter = true;
      document.getElementById(e.target.id).classList.add("active");
    }
  };
  var _itemKeyUpHandler = function (e) {
    if (e.keyCode === 13) {
      document.getElementById(e.target.id).classList.remove("active");
      isEnter = false;
      mainComponent.pageClickHandler(e);
    }
  };
  var _itemMouseOutHandler = function (e) {
    _removeFocus(document.getElementById(e.target.id));
  };
  var addEventListeners = function (component) {
    mainComponent = component;
    for (var i = 0; i < itemArray.length; i++) {
      itemArray[i].addEventListener("mouseover", _onMouseOverEvent);
      itemArray[i].addEventListener("mouseout", _itemMouseOutHandler);
      itemArray[i].addEventListener("click", _onClickEvent);
      itemArray[i].addEventListener("keyup", _itemKeyUpHandler);
      itemArray[i].addEventListener("keydown", _itemKeyDownHandler);
    }
  };
  return {
    addEventListeners,
  };
})();
