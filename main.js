device.wakeUp();
//获取今天的日期
let date  = new Date();
date.yyyymmdd();
log("今日时间：",date.yyyymmdd());
//获取今天工作日还是节假日
let dayInfo = getDayInfo();
log("今天日期类型：",dayInfo.info);
// 获取大小周
// let bsweek = getYearWeek(today);
log("本周六是否上班：",bsweek);
//随机延时10秒
sleep(random(0, 10*1000));
if(dayInfo.info == '工作日')
{
    //打开企业微信，解锁屏幕，停留一分钟，回到主页，一键锁屏
    log('今天是工作日，执行打卡操作');
    app.launchApp("企业微信");
    swipe(500,2000,500,1000,201);
    sleep(1*60*1000);
    home();
    app.launchApp("一键锁屏");
}
else if(dayInfo.info == '双休日')
{
    if(dayInfo.cnweekday == '星期六' && bsweek == '这周上班')
    {
        log('今天是双休日，但是周六上班，执行打卡操作');
        //打开企业微信，解锁屏幕，停留一分钟，回到主页，一键锁屏
        app.launchApp("企业微信");
        swipe(500,2000,500,1000,201);
        sleep(1*60*1000);
        home();
        app.launchApp("一键锁屏");
    }
    else
    {
        log('双休日，不执行打卡操作');
    }
}


// 获取当日信息
function getDayInfo() {
    let jjrUrl = "https://api.tianapi.com/txapi/jiejiari/index?key=90f0735f4b6189789328aefb88bf2e03&date="+today;
    var r = http.get("www.baidu.com", {
        headers: {
            'Accept-Language': 'zh-cn,zh;q=0.5',
            'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
        }
    });
    
    let res = http.get(jjrUrl);
    if(res.statusCode != 200){
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
    }else{
        let data = res.body.json();
        return data.newslist[0];
    }
}

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('');
  };
