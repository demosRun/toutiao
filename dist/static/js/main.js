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
if (navigator.userAgent.indexOf('Mac OS X 9') > 0 || navigator.userAgent.indexOf('Mac OS X 8') > 0 || navigator.userAgent.indexOf('Mac OS X 7') > 0 || navigator.userAgent.indexOf('Mac OS X 6') > 0) {
  issafariBrowser = true
}
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

function wodeStart () {
  wode()
  return
  var temp = location.hash.replace('#', '')
  location.hash = '#wode' + temp
}

window.onhashchange = function(ev) {
  var temp = location.hash.replace('#', '')
  if (temp.indexOf('wode') >= 0) {
    console.log('wode')
    wode()
    return
  }
  getData(temp)
}
var userID = 1
var activePart = ''
function getData (part) {
  activePart = part
  var temp = location.hash.split('_')
  window.nowDay = temp[1] + temp[2] + temp[3]
  console.log(window.nowDay)
  $.ajax({"url": "//service-b39yklt6-1256763111.gz.apigw.tencentcs.com/release/getAll/" + userID + "/" + part,"method": "GET","timeout": 0,}).done(function (response) {
    console.log(part)
    if (response.indexOf('404 Not Found') > 0) {
      layer.msg('当前日期暂无内容!');
      return
    }
    document.querySelector('.home').innerHTML = response
    setTimeout(function () {
      owo.script.page.initPaper()
    }, 0);
  });
}

var userConfig = {}
function wode (updata) {
  // if (!document.querySelector('.right-main .title')) {
  //   return
  // }
  // document.querySelector('.right-main .title').innerHTML = '我的空间'
  
  
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

      var fenlei = ["全部"]
      for (var index = 0; index < response.length; index++) {
        var element = response[index];
        var lable = userConfig[element.key] ? userConfig[element.key].lable : '全部'
        if (!lable) lable = '全部'
        if (fenlei.indexOf(lable) < 0) {
          fenlei.push(lable)
        }
        if (lable != "全部" && lable != "") {
          newhtml += "<li lable='" + lable + "'><span>·</span><a href=#" + element.key + ">" + element.titleStr + ' - ' + element.key.replace('.htm', '').replace(/_/g, '/') +'</a><i class="lable" onclick="biaoqian(\'' + element.key + '\')">' + lable +'</i><span class="tool dubao icon" onclick="biaoqian(\'' + element.key + '\')">&#xe602;</span><span class="tool qingli icon" onclick="shanchu(\'' + element.file + '\')">&#xe63c;</span></li>'
        } else {
          newhtml += "<li lable='" + lable + "'><span>·</span><a href=#" + element.key + ">" + element.titleStr + ' - ' + element.key.replace('.htm', '').replace(/_/g, '/') +'</a><span class="tool dubao icon" onclick="biaoqian(\'' + element.key + '\')">&#xe602;</span><span class="tool shanchu icon" onclick="shanchu(\'' + element.file + '\')">&#xe63c;</span></li>'
        }
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
      // if (document.querySelector('.article-box')) {
      //   document.querySelector('.article-box').outerHTML = '<div class="wode">' + fenleiHtml + newhtml + '</div>'
      // } else if (document.querySelector('.right-main .news')) {
      //   document.querySelector('.right-main .news').outerHTML = '<div class="wode">' + fenleiHtml + newhtml + '</div>'
      // } else {
      //   document.querySelector('.right-main .wode').outerHTML = '<div class="wode">' + fenleiHtml + newhtml + '</div>'
      // }
      if (updata) {
        document.querySelector('.wode').innerHTML = fenleiHtml + newhtml
        setTimeout(function() {
          document.querySelector('.fenlei-box li').classList.add('active')
        }, 0);
      } else {
        layer.open({
          type: 1,
          skin: 'layui-layer-rim', //加上边框
          area: ['620px', '440px'], //宽高
          title: "我的空间",
          content: '<div class="wode">' + fenleiHtml + newhtml + '</div>'
        });
        console.log(fenleiHtml)
        setTimeout(function() {
          document.querySelector('.fenlei-box li').classList.add('active')
        }, 0);
      }
      
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
  var temp = layer.confirm('确定要删除文章记录吗?', {
    btn: ['删除','放弃']
  }, function(){
    layer.close(temp)
    $.ajax({
      "url": "//service-b39yklt6-1256763111.gz.apigw.tencentcs.com/release/delete/" + userID + "/" + name + '.html',
      "method": "GET",
      "timeout": 0,
      "success": function (response) {
        
        owo.tool.toast('删除成功!')
        wode(true)
      }
    })
  });
}

function qingli (name) {
  layer.confirm('确定要清理这个标签吗?', {
    btn: ['删除','放弃']
  }, function(){
    layer.closeAll()
    $.ajax({
      "url": "//service-b39yklt6-1256763111.gz.apigw.tencentcs.com/release/saveConfig/" + userID,
      "method": "POST",
      "timeout": 0,
      "data": JSON.stringify(userConfig),
      "success": function (response) {
        owo.tool.toast('标签删除成功!')
        wode(true)
      }
    })
  });
}

function dateFormat(fmt, date) {
  var ret;
  date = date || new Date()
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
    var string = this
    while (string.length < targetLength) {
        string = padString + string
    }
    return string
  }
  for (var k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      // console.log(opt, k)
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
  var allh1 = document.querySelectorAll('.article p,.article h1,.article h2,.article h3')
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
    // console.log(startKey)
    $('em[key="' + startKey + '"]').addClass(classStr)
    document.querySelector('em[key="' + startKey + '"]').setAttribute("data-" + classStr, keyTemp)
    startKey++
  }
  document.querySelector('#menu').classList.add('no-show')
  window.getSelection().empty()
}


function chackActive (classStr) {
  if (!startEl || !endEl) {
    return
  }
  startKey = parseInt(startEl.getAttribute("key"))
  endKey = parseInt(endEl.getAttribute("key"))
  if (endKey < startKey) {
    var temp = endKey
    endKey = startKey
    startKey = temp
  }
  // console.log(startKey, endKey)
  while (startKey <= endKey) {
    var nowTemp = document.querySelector('em[key="' + startKey++ + '"]')
    if ($(nowTemp).hasClass(classStr)) {
      return true
    }
  }
  return false
}

function biaoqian (key) {
  window.baocun = function () {
    var word = document.querySelector('.edit-box textarea').value
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
        layer.close(window.tempBQ)
        wode(true)
      }
    })
  }
  window.shanchuBQ = function () {
    userConfig[key] = {"lable":""}
    $.ajax({
      "url": "//service-b39yklt6-1256763111.gz.apigw.tencentcs.com/release/saveConfig/" + userID,
      "method": "POST",
      "timeout": 0,
      "data": JSON.stringify(userConfig),
      "success": function (response) {
        owo.tool.toast('标签删除成功!')
        layer.close(window.tempBQ)
        wode(true)
      }
    })
  }
  window.tempBQ = layer.open({
    type: 1,
    skin: 'biaoqian-box', //样式类名
    closeBtn: 0, //不显示关闭按钮
    anim: 2,
    title: "查看或编辑标签",
    shadeClose: true, //开启遮罩关闭
    content: '<div class="edit-box"><textarea>' + ((userConfig[key] && userConfig[key].lable) ? userConfig[key].lable : '') + '</textarea><div class="bottom-bar clear"><div class="button fl" style="background: #ccc;" onclick="layer.close(window.tempBQ)">取消</div><div class="button fl" style="background: #d03333;" onclick="window.shanchuBQ()">删除</div><div class="button fl" style="background: #1497fc;" onclick="window.baocun()">保存</div></div></div>'
  });
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
  $('.wode .news-list li').hide()
  if (name == '全部' || name == '') {
    $('.wode .news-list li').show()
  } else {
    $('.wode .news-list li[lable="' + name + '"]').show()
  }
  
  $('.fenlei-box li').removeClass('active');
  $(target).addClass('active');
}

function loginout () {
  
  layer.confirm('确定要退出吗?', {
    btn: ['确定','取消']
  }, function(){
    layer.closeAll()
    localStorage.removeItem("userInfo")
    location.reload();
  });
}



function jieduList () {
  $.ajax({
    "url": "http://154.8.196.163:5000/list",
    "method": "GET",
    "timeout": 0,
  }).done(function (response) {
    response = JSON.parse(response)
    var newhtml = '<div class="news-fenlei"><ul class="news-list">'
    for (var index = 0; index < response.data.length; index++) {
      var element = response.data[index];
      newhtml += '<li onclick="jiedu(\''+ element +'\')"><span>·</span>' + element + "</li>"
    }
    newhtml += "</ul></div>"
    layer.open({
      type: 1,
      skin: 'layui-layer-rim', //加上边框
      area: ['620px', '440px'], //宽高
      title: "文章解读",
      content: '<div class="wode">' + newhtml + '</div>'
    });
  })
  
}

function jiedu(name) {
  $.ajax({
    "url": "http://154.8.196.163:5000/file?name=" + name,
    "method": "GET",
    "timeout": 0,
  }).done(function (response) {
    var res = JSON.parse(response)
    if (res.data.length == 0) {
      layer.alert('当日暂无内容~', {
        time: 5*1000
        ,success: function(layero, index){
          var timeNum = this.time/1000, setText = function(start){
            layer.title((start ? timeNum : --timeNum) + ' 秒后关闭', index);
          };
          setText(!0);
          this.timer = setInterval(setText, 1000);
          if(timeNum <= 0) clearInterval(this.timer);
        }
        ,end: function(){
          clearInterval(this.timer);
        }
      });
      return
    }
    var photoList = []
    for (var index = 0; index < res.data.length; index++) {
      var element = res.data[index];
      photoList.push({
        "alt": "文章解读",
        "pid": index,
        "src": element,
        "thumb": ""
      })
    }
    layer.photos({
      photos: {
        "status": 1,
        "msg": "",
        "title": "文章解读",
        "id": 8,
        "start": 0,
        "data": photoList
      },
      anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机
    });
  });
  
}