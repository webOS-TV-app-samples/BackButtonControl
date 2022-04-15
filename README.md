# Back Button Control

In current IT trends, various HTML based web apps are developed, and most web apps are operating under browsers. As you need to consider the UX for your app, you need to follow the rule of browsers if you want to launch web apps based on HTML. The essential UX scenario under browsers is a browser history to avoid unexpected exit situations and to provide a reliable page movement technique.

For webOS TV, a back button control function based on the browser history is supported through the use of the DOM's history object. Because the webOS TV provides an MRCU (Magic Remote Control Unit), the current app on the webOS TV screen can move to the home UI of webOS TV or previous page of the app with the back button of MRCU.

To understand the MRCU and its keycode usage, see [Remote Control](https://webostv.developer.lge.com/design/webos-tv-system-ui/remote-control).

## How to Use History Object: pushState() and popState Event

For back button control by MRCU, you can use the history object to push state (pushState) onto the history stack as below code:

```javascript
document.addEventListener(
  'click',
  function (event) {
    var title;

    clearPoppedData();
    event.preventDefault();

    if (event.target.nodeName == 'A') {
      stackElement = event.target.innerHTML;
      history.pushState(stackElement, '', event.target.href);
      pushData(stackElement);
    }
  },
  false
);
```

In the above code, the event.preventDefault() method is added because the default action of the event should not be triggered when this method is called. The pushState() method creates a new history entry and the new state.

Whenever the user navigates to the new state, the `popstate` event is fired, and the state property of the event contains a copy of the history entry's state object. It means that the webOS TV screen moves to the previous screen in the app when users press the back button. Otherwise, when the stack is empty, control passes to the Home screen.

You can add the addEventListener() method to handle the `popstate` event into the window object as below code:

```javascript
window.addEventListener(
  'popstate',
  function (event) {
    var data = event.state;
    if (data) {
      popData(data);
    } else {
      initResult();
    }
  },
  false
);
```

As you know, history.forward(), history.back(), and history.go() occur the `popState` event. However, we can not check out whether those methods were used on the onPopState event handler. In this sample code, onPopState event handler only handles the back button feature of Magic Remote.

## Result in the webOS TV Emulator

You can launch and see the sample app result in the webOS TV emulator as below image.

![The result image of the sample app](https://webostv.developer.lge.com/download_file/view_inline/2079/)

## Do’s and Don’ts

- **Do** push back button of MRCU after executing your app.

- **Do** test this sample app and compare the result in the PC browser, webOS TV emulator, and webOS TV.

- **Don’t** break the back button of MRCU with too many and hard pressing and pushing the key.
