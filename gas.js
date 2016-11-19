function doPost(e) {
  Logger.log(e);
  Logger.log("parse postData.contents");
  var json = JSON.parse(e.postData.contents);
  Logger.log("parsed...");
  Logger.log(json);
  var events = json.events;
  for(var i = 0, len = events.length; i < len; i++) {
    var ev = events[i];
    reply(ev);
    // debug(ev.replyToken, e.postData);
  }
}

function debug(replyToken, postData) {
  var messages = [
    { type: "text", text: JSON.stringify(postData) },
  ];
  sendReply(replyToken, messages);
}

function reply(e) {
  var messages = [
    { type: "text", text: "Always hello" },
  ];
  sendReply(e.replyToken, messages);
}

function sendReply(replyToken, messages) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var token = "aMnZOrrfxp5BGBaOtPxYoSL+RQNeVljrA7s5CG3QGB320IXQiKOji+zGjOD97W6Dou9rebOQMKqDUxkJL/z4GGpvmOtAmPJetXpR4yuwHMM3V1C9yYYgZlQSq9fc7P7wo06uIlfjsXyVGWb1ovpvGgdB04t89/1O/w1cDnyilFU=";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    "Authorization": "Bearer " + token,
  };
  var data = {
    "replyToken": replyToken,
    "messages": messages
  };
  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(data)
  };
  return UrlFetchApp.fetch(url, options);
}
