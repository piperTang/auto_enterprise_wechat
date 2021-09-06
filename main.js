device.wakeUp();
//获取今天的日期
let today = getNowFormatDate();
//获取今天工作日还是节假日
let dayInfo = getDayInfo();
log("今天日期类型(0 工作日 1 假日 2 节假日)：",dayInfo.type);
log("今日时间：",dayInfo.date);
//随机延时10秒
sleep(random(0, 8*1000));
//工作日
if(dayInfo.type == 0)
{
    //打开企业微信，解锁屏幕，停留一分钟，回到主页，一键锁屏
    log('今天是工作日，执行打卡操作');
    app.launchApp("企业微信");
    swipe(500,2000,500,1000,201);
    sleep(1*20*1000);
    home();
    app.launchApp("一键锁屏");
}
// 双休日
else if(dayInfo.type == 1)
{
    //周六，且是大周
    if(dayInfo.weekDay == 6 && dayInfo.weekOfYear%2 == 0)
    {
        log('今天是双休日，但是周六上班，执行打卡操作');
        //打开企业微信，解锁屏幕，停留一分钟，回到主页，一键锁屏
        app.launchApp("企业微信");
        swipe(500,2000,500,1000,201);
        sleep(1*20*1000);
        home();
        app.launchApp("一键锁屏");
    }
    else
    {
        log('双休日，不执行打卡操作');
    }
}
//节假日
else if(dayInfo.type == 2)
{
    log('节假日，不执行打卡操作');
}


// 获取当日节假日信息
function getDayInfo() {
    // 日期模拟
    //let jjrUrl = "https://www.mxnzp.com/api/holiday/single/20211030";
    let jjrUrl = "https://www.mxnzp.com/api/holiday/single/"+today;
    let res = http.get(jjrUrl, {
        headers: {
            'app_id': 'wqwxtfk1kqsxlllp',
            'app_secret': 'V0tSZW5DdzZhNUM3TEV5bVRFUDlNUT09'
        }
    });    
    if(res.statusCode != 200){
        toast("请求API失败: " + res.statusCode + " " + res.statusMessage);
    }else{
        let data = res.body.json();
        return data.data;
    }
}

//获取当日时间
function getNowFormatDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
    }
    let currentdate = year   + month  + strDate;
    return currentdate;
}
