String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
}

function clear (s1) {
  s1 = s1.replace(new RegExp(`\\\\r`, "gm"), '');
  s1 = s1.replace(new RegExp("\\\\n", "gm"), '');
  s1 = s1.replace(new RegExp("\\\"", "gm"), '"');
  return s1
}


function decode(s) {
  return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'));
}  

const Tool = {
    wow:{
        isMillisecondStamp:function(num){if(num.length===10){return num*1000;}else if(num.length===13) {return num;}else {console.log(num+"不是一个标准的时间戳！");return false;}},
        ifStringGetElementById:function(target){if(typeof target==="string") {return document.getElementById(target);}else {return target;}},
    },
    text: {
        //分割字符串
        cutString:function(original,before,after,index){index = index || 0;if (typeof index === "number") {const P = original.indexOf(before, index);if (P > -1) {if (after) {const f = original.indexOf(after, P + 1);return (f>-1)? original.slice(P + before.toString().length, f):console.error("Tool [在文本中找不到 参数三 "+after+"]");} else {return original.slice(P + before.toString().length);}} else {console.error("Tool [在文本中找不到 参数一 " + before + "]");return}} else {console.error("Tool [sizeTransition:" + index + "不是一个整数!]");}},
        //根据一个基点分割字符串  实例：http://myweb-10017157.cos.myqcloud.com/20161212/%E7%BB%83%E4%B9%A0.zip
        cutStringPoint:function (original,str, before, after,order, index) {index = index || 0;if (typeof index === "number") {const O = original.indexOf(str, index);const P = (order[0]==="1")?original.lastIndexOf(before, O):original.indexOf(before, O);if (P > -1) {if (after) {let f ;switch (order[1]){case "1":f = original.indexOf(after, P + 1);break;case "2":f = original.indexOf(after, O + 1);break;case "3":f = original.lastIndexOf(after, O + 1);break;}return (f>-1)? original.slice(P + before.toString().length, f):console.error("Tool [在文本中找不到 参数三 "+after+"]");}else {return original.slice(P + before.toString().length);}}else {console.error("Tool [在文本中找不到 参数一 " + before + "]");}} else {console.error("Tool [sizeTransition:" + index + "不是一个整数!]");}},
        //分割字符串组
        cutStringArray:function(original,before,after,index){var aa=[],ab=0;while(original.indexOf(before,index)>0){aa[ab]=Tool.text.cutString(original,before,after,index);index=original.indexOf(before,index)+1;ab++;}return aa;},
        randomString:function(n){const str = 'abcdefghijklmnopqrstuvwxyz9876543210';let tmp = '',i = 0,l = str.length;for (i = 0; i < n; i++) {tmp += str.charAt(Math.floor(Math.random() * l));}return tmp;},
    },
}
document.querySelector('.paper-box').oncontextmenu=function(e){
  //取消默认的浏览器自带右键 很重要！！
  
  e.preventDefault();
  //获取我们自定义的右键菜单
  var menu=document.querySelector("#menu");
  //根据事件对象中鼠标点击的位置，进行定位
  menu.style.left=e.clientX+'px';
  menu.style.top=e.clientY+'px';
  //改变自定义菜单的高宽，让它显示出来
  menu.style.height='125px';
}
//关闭右键菜单，很简单
window.onclick=function(e){
  // 用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
  document.querySelector('#menu').style.height = 0;
}
function etSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.selection) {
    return document.selection.createRange().text;
  }
  return ''
}

window.onhashchange = function(ev) {
  const temp = location.hash.replace('#', '')
  fetch(`http://service-b39yklt6-1256763111.gz.apigw.tencentcs.com/release/getPaper/${temp}`)
  .then(response => response.text())
  .then(result => {
    console.log(result)
    document.querySelector('.paper-box').innerHTML = result
  })
  .catch(error => console.log('error', error))
}