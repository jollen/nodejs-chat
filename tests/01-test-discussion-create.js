var requestify = require('requestify'); 

requestify.post('http://localhost:3000/discussion/hello', {
    // POST 的 Request Body，例如：訊息夾帶的圖片。目前為空。
})
.then(function(response) {
    // 取得 Response Body
    response.getBody();
});