String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
}

function clear (s1) {
  s1 = s1.replace(new RegExp("\\\\r", "gm"), '');
  s1 = s1.replace(new RegExp("\\\\n", "gm"), '');
  s1 = s1.replace(new RegExp("\\\"", "gm"), '"');
  return s1
}

var issafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

function decode(s) {
  return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'));
}  

var Tool = {
    wow:{
        isMillisecondStamp:function(num){if(num.length===10){return num*1000;}else if(num.length===13) {return num;}else {console.log(num+"不是一个标准的时间戳！");return false;}},
        ifStringGetElementById:function(target){if(typeof target==="string") {return document.getElementById(target);}else {return target;}},
    },
    text: {
        //分割字符串
        cutString:function(original,before,after,index){index = index || 0;if (typeof index === "number") {var P = original.indexOf(before, index);if (P > -1) {if (after) {var f = original.indexOf(after, P + 1);return (f>-1)? original.slice(P + before.toString().length, f):console.error("Tool [在文本中找不到 参数三 "+after+"]");} else {return original.slice(P + before.toString().length);}} else {console.error("Tool [在文本中找不到 参数一 " + before + "]");return}} else {console.error("Tool [sizeTransition:" + index + "不是一个整数!]");}},
        //根据一个基点分割字符串  实例：//myweb-10017157.cos.myqcloud.com/20161212/%E7%BB%83%E4%B9%A0.zip
        cutStringPoint:function (original,str, before, after,order, index) {index = index || 0;if (typeof index === "number") {var O = original.indexOf(str, index);var P = (order[0]==="1")?original.lastIndexOf(before, O):original.indexOf(before, O);if (P > -1) {if (after) {var f ;switch (order[1]){case "1":f = original.indexOf(after, P + 1);break;case "2":f = original.indexOf(after, O + 1);break;case "3":f = original.lastIndexOf(after, O + 1);break;}return (f>-1)? original.slice(P + before.toString().length, f):console.error("Tool [在文本中找不到 参数三 "+after+"]");}else {return original.slice(P + before.toString().length);}}else {console.error("Tool [在文本中找不到 参数一 " + before + "]");}} else {console.error("Tool [sizeTransition:" + index + "不是一个整数!]");}},
        //分割字符串组
        cutStringArray:function(original,before,after,index){var aa=[],ab=0;while(original.indexOf(before,index)>0){aa[ab]=Tool.text.cutString(original,before,after,index);index=original.indexOf(before,index)+1;ab++;}return aa;},
        randomString:function(n){var str = 'abcdefghijklmnopqrstuvwxyz9876543210';var tmp = '',i = 0,l = str.length;for (i = 0; i < n; i++) {tmp += str.charAt(Math.floor(Math.random() * l));}return tmp;},
    },
}
function randomString(e) {  
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
  a = t.length,
  n = "";
  for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n
}
// document.querySelector('.paper-box').oncontextmenu=function(e){
//   //取消默认的浏览器自带右键 很重要！！
  
//   e.preventDefault();
//   //获取我们自定义的右键菜单
//   var menu=document.querySelector("#menu");
//   //根据事件对象中鼠标点击的位置，进行定位
//   menu.style.left=e.clientX+'px';
//   menu.style.top=e.clientY+'px';
//   //改变自定义菜单的高宽，让它显示出来
//   menu.style.height='125px';
// }
//关闭右键菜单，很简单
// window.onclick=function(e){
//   // 用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
//   document.querySelector('#menu').style.height = 0;
// }
function etSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.selection) {
    return document.selection.createRange().text;
  }
  return ''
}

window.onhashchange = function(ev) {
  var temp = location.hash.replace('#', '')
  getData(temp)
}
var userID = 1
var activePart = ''
function getData (part) {
  activePart = part
  
  $.ajax({"url": "//service-b39yklt6-1256763111.gz.apigw.tencentcs.com/release/getAll/" + userID + "/" + part,"method": "GET","timeout": 0,}).done(function (response) {
    if (response.indexOf('404 Not Found') > 0) {
      alert('当前日期暂无内容！')
      return
    }
    document.querySelector('.home').innerHTML = response
    setTimeout(function () {
      owo.script.page.initPaper()
    }, 0);
  });
}

var userConfig = {}
function wode () {
  document.querySelector('.right-main .title').innerHTML = '我的空间'
  
  
  $.ajax({
    "url": "//service-b39yklt6-1256763111.gz.apigw.tencentcs.com/release/getUserInfo/" + userID,
    "method": "GET",
    "timeout": 0,
  }).done(function (response) {
    // 获取配置
    $.ajax({"url": "//service-b39yklt6-1256763111.gz.apigw.tencentcs.com/release/getConfig/" + userID,"method": "GET","timeout": 0,}).done(function (response2) {
      userConfig = JSON.parse(response2)
      console.log(userConfig)
      response = JSON.parse(response)
      console.log(response);
      var newhtml = '<div class="news-fenlei"><ul class="news-list">'

      var fenlei = ["未分类"]
      for (var index = 0; index < response.length; index++) {
        var element = response[index];
        var lable = userConfig[element.key] ? userConfig[element.key].lable : '未分类'
        if (fenlei.indexOf(lable) < 0) {
          fenlei.push(lable)
        }
        newhtml += "<li lable='" + lable + "'><span>·</span><a href=#" + element.key + ">" + element.titleStr +'</a><i class="lable">' + lable +'</i><span class="tool dubao icon" onclick="biaoqian(\'' + element.key + '\')">&#xe602;</span><span class="tool shanchu icon" onclick="shanchu(\'' + element.key + '\')">&#xe63c;</span></li>'
 
      }
      console.log(fenlei)
      newhtml += "</ul></div>"
      // 生成出分类html
      var fenleiHtml = '<ul class="fenlei-box clearfix">'
      for (var index = 0; index < fenlei.length; index++) {
        var element = fenlei[index];
        fenleiHtml += "<li onclick=\"fenlei(this, '" + element + "')\">" + element + "</li>"
      }
      fenleiHtml += '</ul>'
      if (document.querySelector('.article-box')) {
        document.querySelector('.article-box').outerHTML = fenleiHtml + newhtml
      } else {
        document.querySelector('.right-main .news').outerHTML = '<div class="wode">' + fenleiHtml + newhtml + '</div>'
      }
      console.log(fenleiHtml)
      setTimeout(function() {
        document.querySelector('.fenlei-box li').classList.add('active')
      }, 0);
    })
  });
}

function closeInput () {
  document.querySelector('.biji-box').style.display = 'none'
}

function showPhoneInput (callBack) {
  document.querySelector('.shouji-box').style.display = 'block'
  document.querySelector('.shouji-box .button').onclick = callBack
}

function showBijiInput (callBack) {
  document.querySelector('.biji-box').style.display = 'block'
  document.querySelector('.biji-box .button').onclick = callBack
}


function shanchu(name) {
  var r=confirm("确定要删除记录: " + name.split('-')[2] + ' 吗!');
  if (r==true) {
    $.ajax({
      "url": "//service-b39yklt6-1256763111.gz.apigw.tencentcs.com/release/saveConfig/" + userID,
      "method": "POST",
      "timeout": 0,
      "data": JSON.stringify(userConfig),
      "success": function (response) {
        owo.tool.toast('删除成功!')
        wode()
      }
    })
  }
  
}
function dateFormat(fmt, date) {
  var ret;
  var opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  String.prototype.zpadStart = function (targetLength, padString) {
    let string = this
    while (string.length < targetLength) {
        string = padString + string
    }
    return string
  }
  for (var k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      console.log(opt, k)
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].zpadStart(ret[1].length, "0")))
      };
  };
  return fmt;
}

if ((window.innerWidth / window.innerHeight) < 1) {
  window.location.href = 'http://demos.run/mreader/'
}

function changeP () {
  var key = 0
  var allP = document.querySelectorAll('.article p')
  console.log(allP.length)
  for (var index = 0; index < allP.length; index++) {
    var el = allP[index];
    console.log(el)
    if ($(el).find('em').length < 10) {
      // alert(el.innerText)
      el.classList.add('dubao')
      var newHtml = ''
      for (var index2 = 0; index2 < el.innerText.split('').length; index2++) {
        var element = el.innerText.split('')[index2];
        newHtml += '<em class="" key="' + key++ + '">' + element + '</em>' 
      }
      el.innerHTML = newHtml
    } else {
      for (var index2 = 0; index2 < $(el).find('em').length; index2++) {
        var element = $(el).find('em')[index2];
        element.setAttribute('key', key++)
      }
    }
  }
  var allh1 = document.querySelectorAll('.article h1')
  for (var index = 0; index < allh1.length; index++) {
    var el = allh1[index];
    if (!$(el).find('em')[0]) {
      el.classList.add('dubao')
      var newHtml = ''
      for (var index2 = 0; index2 < el.innerText.split('').length; index2++) {
        var element = el.innerText.split('')[index2];
        newHtml += '<em class="" key="' + key++ + '">' + element + '</em>' 
      }
      el.innerHTML = newHtml
    } else {
      for (var index2 = 0; index2 < $(el).find('em').length; index2++) {
        var element = $(el).find('em')[index2];
        element.setAttribute('key', key++)
      }
    }
  }

  var allh1 = document.querySelectorAll('.article h2')
  for (var index = 0; index < allh1.length; index++) {
    var el = allh1[index];
    if (!$(el).find('em')[0]) {
      el.classList.add('dubao')
      var newHtml = ''
      for (var index2 = 0; index2 < el.innerText.split('').length; index2++) {
        var element = el.innerText.split('')[index2];
        newHtml += '<em class="" key="' + key++ + '">' + element + '</em>' 
      }
      el.innerHTML = newHtml
    } else {
      for (var index2 = 0; index2 < $(el).find('em').length; index2++) {
        var element = $(el).find('em')[index2];
        element.setAttribute('key', key++)
      }
    }
  }

  var allh1 = document.querySelectorAll('.article h3')
  for (var index = 0; index < allh1.length; index++) {
    var el = allh1[index];
    if (!$(el).find('em')[0]) {
      el.classList.add('dubao')
      var newHtml = ''
      for (var index2 = 0; index2 < el.innerText.split('').length; index2++) {
        var element = el.innerText.split('')[index2];
        newHtml += '<em class="" key="' + key++ + '">' + element + '</em>' 
      }
      el.innerHTML = newHtml
    } else {
      for (var index2 = 0; index2 < $(el).find('em').length; index2++) {
        var element = $(el).find('em')[index2];
        element.setAttribute('key', key++)
      }
    }
  }
}

var startEl = null
var endEl = null


function biaoji (classStr) {
  startKey = parseInt(startEl.getAttribute("key"))
  endKey = parseInt(endEl.getAttribute("key"))
  if (endKey < startKey) {
    var temp = endKey
    endKey = startKey
    startKey = temp
  }
  if (issafariBrowser) {
    startKey = startKey + 1
  }
  var keyTemp = randomString(16)
  while (startKey <= endKey) {
    console.log(startKey)
    $('em[key="' + startKey + '"]').addClass(classStr)
    document.querySelector('em[key="' + startKey + '"]').setAttribute("key-" + classStr, keyTemp)
    startKey++
  }
  document.querySelector('#menu').classList.add('no-show')
}


function chackActive (classStr) {
  startKey = parseInt(startEl.getAttribute("key"))
  endKey = parseInt(endEl.getAttribute("key"))
  if (endKey < startKey) {
    var temp = endKey
    endKey = startKey
    startKey = temp
  }
  console.log(startKey, endKey)
  while (startKey <= endKey) {
    var nowTemp = document.querySelector('em[key="' + startKey++ + '"]')
    if ($(nowTemp).hasClass(classStr)) {
      return true
    }
  }
  return false
}

function biaoqian (key) {
  var word = prompt("请输入文章标签!","");
  if (word) {
    if (!userConfig[key]) {
      userConfig[key] = {}
    }
    userConfig[key]['lable'] = word
    $.ajax({
      "url": "//service-b39yklt6-1256763111.gz.apigw.tencentcs.com/release/saveConfig/" + userID,
      "method": "POST",
      "timeout": 0,
      "data": JSON.stringify(userConfig),
      "success": function (response) {
        owo.tool.toast('数据保存成功!')
        wode()
      }
    })
  }
}

var activeAnno = null
var activeKey = null
function showZhu (target, key) {
  activeAnno = target
  activeKey = key
  document.querySelector('.biji-box').style.display = 'block'
  document.querySelector('.biji-input textarea').value = unescape(target.getAttribute('data-val'))
  setTimeout(function () {
    document.querySelector('#menu').classList.add('no-show')
  }, 0);
  return
}


function fenlei (target, name) {
  $('.news .news-list li').hide()
  $('.news .news-list li[lable="' + name + '"]').show()
  $('.fenlei-box li').removeClass('active');
  $(target).addClass('active');
}