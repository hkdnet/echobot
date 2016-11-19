function doPost(e) {
  Logger.log(e);
  Logger.log("parse postData.contents");
  var json = JSON.parse(e.postData.contents);
  Logger.log("parsed...");
  Logger.log(json);
  var events = json.events;
  var handler = new EventHandler(events);
  handler.handleAll();
}

function EventHandler(events) {
  this.events = events;
  this.handleAll = function() {
    var len = this.events.length;
    for(var i = 0; i < len; i++) {
      var ev = this.events[i];
      this.handle(ev);
    }
  }
  this.handle = function(e) {
    reply(e);
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

function templateButtons(e) {
  var img = "https://pbs.twimg.com/media/CZzeZctUkAAqa3j.jpg";
  var actions = [
    { type: "message", "label": "はい", text: "みりあもやるー" },
    { type: "message", "label": "いいえ", text: "みりあやんないよ" },
  ];
  var messages = [
    {
      type: "template",
      altText: "LINEアプデしろ",
      template: {
        type: "buttons",
        // jpeg or png 縦横比 1:1.51 縦横最大1024px 最大1MB
        thumbnailImageUrl: img,
        // 40文字以内
        title: "test-title",
        // 画像もタイトルも指定しない場合：160文字以内 画像またはタイトルを指定する場合：60文字以内
        text: "test-text",
        actions: actions,
      }
    },
  ];
  sendReply(e.replyToken, messages);
}

function sendReply(replyToken, messages) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var token = "token";
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
