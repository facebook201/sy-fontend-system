

# HTTP

## HTTP介绍

HTTP（超文本传输协议）是应用层上的一种客户端/服务端模型的通信协议,它由请求和响应构成，且是无状态的。
* 协议
  规定了通信双方必须遵循的数据传输格式，这样通信双方按照约定的格式才能准确的通信。
* 无状态
  两次连接通信之间是没有任何关系的，每次都是一个新的连接，服务端不会记录前后的请求信息。

**URL的构成**
http://www.xx.com/index.html?name=zhangsan
http: 协议
www.xx.xom: 主机
index.html: 路径
和参数

**协议内容**
请求( request )
客户端发送一个HTTP请求到服务端的格式：
- 请求行
- 请求头
- 请求体

### 响应（Response）

服务端响应客户端格式：

- 状态行
- 响应头
- 响应体


## HTTP状态码

**403 Forbidden**

该状态码表明对请求资源的访问被服务器拒绝了，资源不可用，服务器没有必要给出详细理由。如果想做说明可以在实体的主体部分对原因
进行描述。下面的403的一些原因

* IP 列入黑名单
* 一时间访问很多次网址 被拒绝
* 没有执行权限
* DNS解析错误

<br />

### GET 和 POST 的区别

HTTP最早是被用作浏览器和服务器之间交互HTML和表单的通讯协议，后来被广泛扩从到接口格式的定义。所以讨论POST 和 GET之前，要先确定是浏览器使用的还是HTTP作为接口传输协议的场景。



### 浏览器的GET 和 POST

浏览器用GET请求来获取一个html页面的静态资源， 用POST来提交一个 form表单，得到一个结果的网页。



**副作用是指对服务器上的资源做改变，搜索是无副作用的，注册是副作用的。**

**幂等指的是发送M和N次请求（两者不相同都大于1），服务器上资源的状态一致，比如注册10个和11个账号是不幂等的，对文章进行更改10次和11次是幂等的。**

**GET多用于无副作用，幂等的场景，例如搜索关键字。POST多用于副作用，不幂等的场景 例如注册**



#### GET
读取一个资源， 比如get到一个html文件，反复读取不应该对访问的数据有副作用。比如 get一下，用户就下单了，返回订单受理。没有副作用称为 **幂等** 因为GET因为是读取，就可以对GET请求的数据做缓存，这个缓存可以做到浏览器本身上 也可以做到代理上，或者做到server端（用Etag，至少可以减少带宽消耗）。

#### POST

在页面里form 标签会定义一个表单，点击其中的submit元素会发出一个POST请求让服务器做一件事。这件事往往是有副作用的 不幂等的。



GET 和POST携带的数据格式也有区别。当浏览器发出一个GET请求，意味着用户自己要么在浏览器的地址输入，要么就是点击了a标签的href的url。**所以并不是GET只能用URL，而是浏览器直接发出的GET只能由一个url触发，所以GET上要在url上之外带一些参数就只能依靠url上附带queryString. 但是HTTP协议本身没有这个限制。**



 浏览器的POST请求都来自表单提交，每次提交，表单的数据被浏览器用编码到HTTP请求的Body里。浏览器发出的POST请求的Body主要有两种格式，一种是application/x-www-form-urlencoded 用来传输数据，**大概就是key=value&key1=value1这种格式，另一种是传文件，会采用form-data格式。采用后者是因为前面的那种的编码方式对于文件这种二进制的数据非常低效。**



一般说 GET请求没有body，只有url，请求数据放在url的queryString中，POST请求的数据在body中。但是这种的情况仅限于浏览器发请求的场景



### 接口中的GET和POST

通过浏览器的Ajax api， postman之类的工具发出来的GET和POST请求。此时 GET/POST不能光用在前端和后端的交互中。尽管RPC有很多协议，但是http本身已经有大量的现成的支持工具可以使用，并且对人类很友好。容易debug。HTTP协议在微服务中的使用是相当普遍的。



当用HTTP实现接口发送请求，就没有浏览器中那么多限制，只要符合HTTP格式的就可以发。

```
<METHOD> <URL> HTTP/1.1
<Header1>:
<Header2>: 
<BODY Data....>
```

但是也不能太自由的使用，所以有了一些接口规范，REST。 GET、POST、PUT、DELETE。获取 创建 替换 删除。同时还推荐使用json格式，这样就通过看method就知道是什么意思。解析格式也得到统一了。

* Json 可以有嵌套结构
* 可以支持更丰富的数据类型 json可以直接被服务器代码映射为业务实体用起来方便
* 如果接口支持上传文件 那么还是form-data 格式更合适



###  REST里面的GET 和 POST

GET 在 资源定位符被用于获取资源或者资源列表。

```
GET http://foo.com/books
GET http://foo.com/books/:bookId
```



> REST 的 POST 和 PUT的区别，PUT的语法实际上是替换 replace。 REST规范里提到PUT的请求体应该是完整的资源，包括id在内。这样服务器就可以根据id去查找，如果存在对应的id元素，就用请求中的数据整体替换已经存在的资源，如果没有就用 把这个id对应的资源从空替换为请求数据，这个看起来就像是 创建。
 


> 至于到底用PUT还是POST，完全看是不是可以提前知道资源所有的数据，尤其是id。对于那些id是自动生成的场景 POST更加合适。如果提前知道某个id是什么，PUT更加合适。



### 安全性

无论是GET还是POST，都不够安全，因为HTTP本身就是明文协议。每个请求和返回的每个byte都在网络上传播。所以避免传输中数据被窃取，**必须从客户端到服务端的端对端加密，就是https。利用SSL协议协商出的密钥加密明文的http数据。这个加密的协议和HTTP协议本身相互独立。**



安全是一个很大的主题，由很多细节组成的一个完备体系。比如返回私密数据的mask，XSS，CSRF，跨域安全，前端加密，钓鱼，salt。POST和GET在安全这件事是个很小的角色。所以单独讨论没有什么意义。一般私密数据传输用 POST + body；

```javascript
POST http://foo.com/user/login

{
  "username": "duihua",
  "password" : "1230oiss"
}
```



### 编码

URL只能使用英文字母、阿拉伯数字和某些标点符号、不能使用其他文字和符号。

**GET和POST方法的编码使用的是网页的编码。例如百度是GB2321，谷歌使用的是UTF-8**

由于有很多编码，很混乱，所以JavaScript会将其都编码成 unicode字符。



#### encodeURI

对真正的URL编码的函数。着眼于对整个URL进行编码。 对应的解码函数是 decodeURI。



#### encodeURIComponent

与上面的区别是 对URL的组成部分进行个别编码，能对某些不编码的符号进行编码。对应的解码是decodeURIComponent

```javascript
encodeURIComponent('mail@example.com');
// mail%40example.com

encodeURI('mail@example.com');
// main@example.com
``` 

## HTTP 之 Content-Type
Content—Type 是用来指定请求或响应的内容类型，告诉浏览器或者相关设备如何显示或处理加载的数据，此属性的值可以查看MIME的类型。

* text/html 是请求的media-type，他分为两个部分type和subtype，以"/" 进行分割; 常见的type有：

  ```css
  Text：用于标准化地表示的文本信息，文本消息可以是多种字符集和或者多种格式的；
  Multipart：用于连接消息体的多个部分构成一个消息，这些部分可以是不同类型的数据；
  Application：用于传输应用程序数据或者二进制数据；
  Message：用于包装一个E-mail消息；
  Image：用于传输静态图片数据；
  Audio：用于传输音频或者音声数据；
  Video：用于传输动态影像数据，可以是与音频编辑在一起的视频数据格式。
  ```

* 常见的 media-type 有：

  ```css
  text/html
  application/x-www-form-urlencoded
  application/json
  multipart/form-data
  application/xml
  text/plain
  text/css
  text/javascript
  ```

  boundary：多用于上传文件时使用，用于分割数据；

### 常见的Content-Type

* **application/x-www-form-urlencoded**

  主要用于表单形式的 POST请求，普通的表单提交，js发包 默认都是这种方式。


* multipart / form-data 是使用 POST请求上传文件，如果上传照片，文件等。


## POST 几种提交数据的方式

HTTP请求方法有 OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT 这几种。**HTTP协议是 以ASCII码传输，建立在 TCP/IP 协议之上的应用层规范。** 规范把HTTP请求分为三部分: 状态行、请求头、消息主体。



协议规定 POST提交数据必须放在消息主体（entity-body）中, 但是协议并没有规定数据必须使用什么编码方式。只要发送过去的数据能够被服务端解析成功才有意义，服务端会根据请求头 (headers)中的 Content-Type 字段来获知请求中的消息主体是何种方式编码的，在对主体进行解析。所以 POST提交数据方案，包含了Content-Type 和消息主体编码方式两部分。



* application/x-www-form-urlencoded
这应该是最常见的 POST 提交数据的方式了。Content-Type 被指定为 application/x-www-form-urlencoded；其次，提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。

* multipart/form-data
表单上传文件时，必须让 form 表单的enctype 等于 multipart/form-data。

body内容如下
```
------WebKitFormBoundary18bktajg65CSIx4j
Content-Disposition: form-data; name="files"; filename="test1.txt"
Content-Type: text/plain

this is file1;
------WebKitFormBoundary18bktajg65CSIx4j
Content-Disposition: form-data; name="files"; filename="test2.txt"
Content-Type: text/plain

this is file2;
------WebKitFormBoundary18bktajg65CSIx4j--
```

* application/json
application/json是POST请求以JSON的格式向服务请求发起请求或者请求返回JSON格式的响应内容，服务端接受到数据后对JSON进行解析拿到所需要的参数，

```
{"comboId":" ","goodsList":[{"goodsId":1372308,"skuId":"1372308-228f0bba1bd1b7241353429cebd7c88b","isHuanGou":0,"selected":1,"count":2,"cartGoodsType":0,"activitySchemeId":111873,"goodsActivityGiftListTemp":[]}]}
```


## WebSocket

首先 WebSocket 是 HTML5的东西（协议），HTTP协议不支持长连接，是无状态的。在HTTP1.1中增加了一个 keep-alive，
是把多个请求合并为一个，但是WebScoket其实是一个新协议，跟 HTTP没有什么关系，只不过兼容了握手规范。


#### 协议内容

* HTTP协议是一个请求对应一个相应，及时是1.1 的 keep-alive，依然是一个请求对应一个响应。
* 所谓的轮询，long poll 都是被动的，都是客户端不断的建立 HTTP连接，等待服务端处理。

```
// 客户端请求
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://shiya.com
```

* Sec-WebSocket-Key 是一个Base64 encode的值，这个是浏览器随机生成的，告诉服务器验证身份。
* Sec_WebSocket-Protocol 是一个用户定义的字符串，用来区分同URL下，不同的服务所需要的协议
* Sec-WebSocket-Version 是告诉服务器所使用的Websocket Draft（协议版本）

```
// 服务端响应
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat // 最终协议
```

服务端返回之后，告诉客户端即将升级 WebScoket协议，


### 作用

WebScoket 在第一次建立连接确认之后，就升级为WebScoket协议，后面一旦服务端有消息 就会自动推送。
Websocket只需要一次HTTP握手，所以说整个通讯过程是建立在一次连接/状态中，也就避免了HTTP的非状态性，服务端会一直知道你的信息，直到你关闭请求，这样就解决了接线员要反复解析HTTP协议，还要查看identity info的信息。同时由客户主动询问，转换为服务器（推送）有信息的时候就发送（当然客户端还是等主动发送信息过来的。。），没有信息的时候就交给接线员（Nginx），不需要占用本身速度就慢的客服（Handler）了。


### 示例

WebSocket.OPENING (0)：正在建立连接。
WebSocket.OPEN (1)：已经建立连接。
WebSocket.CLOSING (2)：正在关闭连接。
WebSocket.CLOSE (3)：已经关闭连接。

```js
  const WSURL = 'wss://echo.websocket.org/';
  const dom = document.querySelector('output');

  function testWebSocket() {
    const websocket = new WebSocket(WSURL);
    /**
     * 
     */

    websocket.onopen = function(evt) {
      // 建立连接
      console.log('onopen');
      websocket.send('this is webscoket message');
    }

    websocket.onclose = function(ev) {
      console.log('close');
    }

    websocket.onmessage = function(ev) {
      console.log(ev);
    };
  }

  window.addEventListener('load', function(){
    testWebSocket();
  }, false);
```