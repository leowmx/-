//import QRCode from 'qrcode-generator';
//import { get_code } from "./spider.py";

// import { Builder, By, Key } from 'selenium-webdriver';
// import chrome_s from 'selenium-webdriver/chrome';
// import chromedriver from 'chromedriver';
// import cheerio from 'cheerio';



var page_url = "";
window.bgCommunicationPort = chrome.runtime.connect();
function get_code_url(project_url) {
    var pid = project_url.split("&")[1].split("&")[0].slice(4);

    let code_url = "请打开一个学而思编程社区作品";
    if (project_url.includes("python") || project_url.includes("cpp") || project_url.includes("webpy")) {
        code_url = "https://code.xueersi.com/ide/code/" + pid;

        var is_py=project_url.includes("python")||project_url.includes("webpy");
        async function fetchJson(url) {
            const response = await fetch(url);
          
            if (!response.ok) {
              throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
            }
          
            return response.json();
          }
          
          // 使用示例
          fetchJson("http://leibeibei.cn/api/get_code?url="+code_url)
            .then(data => {
                console.log(data.content);
                $("#download-btn").attr("disabled",false);
                $("#download-loading").hide();
                $("#download-btn").on("click", function () {
                    let code = data.content;
                    if(is_py){
                        var blob = new Blob([code], { type: 'text/python;charset=utf-8' });
                    }else{
                        var blob = new Blob([code], { type: 'text/cpp;charset=utf-8' });
                    }
                    const objectUrl = URL.createObjectURL(blob);
                   
                    if(is_py){
                        chrome.downloads.download({ url: objectUrl, saveAs: true, filename: 'code.py'}, function(downloadId) {
                        if (chrome.runtime.lastError) {
                            console.error('Download failed:', chrome.runtime.lastError.message);
                        } else {
                            console.log('Download started with ID:', downloadId);
                        }
                        });
                    }else{
                        chrome.downloads.download({ url: objectUrl, saveAs: true, filename: 'code.cpp'}, function(downloadId) {
                        if (chrome.runtime.lastError) {
                            console.error('Download failed:', chrome.runtime.lastError.message);
                        } else {
                            console.log('Download started with ID:', downloadId);
                        }
                        });
                    };
                });
            })
            .catch(error => console.error(error));
    }
    if (project_url.includes("scratch")) {
        code_url = "https://code.xueersi.com/scratch3/index.html?pid=" + pid + "&version=3.0&env=community";
    }

    //console.log(get_code(code_url));

    return code_url;

}
function get_URL(page_url, homepage_div, result_div, code_url_label, get_url_btn, open_website_btn) {
    let code_url = get_code_url(page_url);

    if (page_url.includes("code.xueersi.com") && page_url.includes("project")) {
        result_div.style.display = "block";
        homepage_div.style.display = "none";
    }

    $("#result-url").append("<i>" + code_url + "</i>");
    //window.open(code_url);
    open_website_btn.onclick = function () {
        window.open(code_url);
    };
}

function BrowserInformation() {
    var browser = navigator.userAgent.toLowerCase();
    var browser_dict = {
        "chrome": browser.indexOf('chrome'),
        "firefox": browser.indexOf('firefox'),
        "safari": browser.indexOf('safari'),
        "edge": browser.indexOf('edg'),
        "ie": browser.indexOf('msie')
    };

    let maxValueAndKey = { value: -Infinity, key: null };
    for (let key in browser_dict) {
        if (browser_dict[key] > maxValueAndKey.value) {
            maxValueAndKey.value = browser_dict[key];
            maxValueAndKey.key = key;
        }
    }
    let browser_name = maxValueAndKey.key;

    var svg_icon = "";
    console.log(browser);
    if (browser_name == "chrome") {
        console.log('用户正在使用 Chrome 浏览器');
        svg_icon = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-browser-chrome' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'/></svg>";
    } else if (browser_name == "edge") {
        console.log('用户正在使用 Microsoft Edge 浏览器');
        svg_icon = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-browser-edge' viewBox='0 0 16 16'><path d='M9.482 9.341c-.069.062-.17.153-.17.309 0 .162.107.325.3.456.877.613 2.521.54 2.592.538h.002c.667 0 1.32-.18 1.894-.519A3.838 3.838 0 0 0 16 6.819c.018-1.316-.44-2.218-.666-2.664l-.04-.08C13.963 1.487 11.106 0 8 0A8 8 0 0 0 .473 5.29C1.488 4.048 3.183 3.262 5 3.262c2.83 0 5.01 1.885 5.01 4.797h-.004v.002c0 .338-.168.832-.487 1.244l.006-.006a.594.594 0 0 1-.043.041Z'/><path d='M.01 7.753a8.137 8.137 0 0 0 .753 3.641 8 8 0 0 0 6.495 4.564 5.21 5.21 0 0 1-.785-.377h-.01l-.12-.075a5.45 5.45 0 0 1-1.56-1.463A5.543 5.543 0 0 1 6.81 5.8l.01-.004.025-.012c.208-.098.62-.292 1.167-.285.129.001.257.012.384.033a4.037 4.037 0 0 0-.993-.698l-.01-.005C6.348 4.282 5.199 4.263 5 4.263c-2.44 0-4.824 1.634-4.99 3.49Zm10.263 7.912c.088-.027.177-.054.265-.084-.102.032-.204.06-.307.086l.042-.002Z'/><path d='M10.228 15.667a5.21 5.21 0 0 0 .303-.086l.082-.025a8.019 8.019 0 0 0 4.162-3.3.25.25 0 0 0-.331-.35c-.215.112-.436.21-.663.294a6.367 6.367 0 0 1-2.243.4c-2.957 0-5.532-2.031-5.532-4.644.002-.135.017-.268.046-.399a4.543 4.543 0 0 0-.46 5.898l.003.005c.315.441.707.821 1.158 1.121h.003l.144.09c.877.55 1.721 1.078 3.328.996Z'/></svg>";
    } else if (browser_name == "firefox") {
        console.log('用户正在使用 Firefox 浏览器');
        svg_icon = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-browser-firefox' viewBox='0 0 16 16'><path d='M13.384 3.408c.535.276 1.22 1.152 1.556 1.963a7.98 7.98 0 0 1 .503 3.897l-.009.077a8.533 8.533 0 0 1-.026.224A7.758 7.758 0 0 1 .006 8.257v-.04c.016-.363.055-.724.114-1.082.01-.074.075-.42.09-.489l.01-.051a6.551 6.551 0 0 1 1.041-2.35c.217-.31.46-.6.725-.87.233-.238.487-.456.758-.65a1.5 1.5 0 0 1 .26-.137c-.018.268-.04 1.553.268 1.943h.003a5.744 5.744 0 0 1 1.868-1.443 3.597 3.597 0 0 0 .021 1.896c.07.047.137.098.2.152.107.09.226.207.454.433l.068.066.009.009a1.933 1.933 0 0 0 .213.18c.383.287.943.563 1.306.741.201.1.342.168.359.193l.004.008c-.012.193-.695.858-.933.858-2.206 0-2.564 1.335-2.564 1.335.087.997.714 1.839 1.517 2.357a3.72 3.72 0 0 0 .439.241c.076.034.152.065.228.094.325.115.665.18 1.01.194 3.043.143 4.155-2.804 3.129-4.745v-.001a3.005 3.005 0 0 0-.731-.9 2.945 2.945 0 0 0-.571-.37l-.003-.002a2.679 2.679 0 0 1 1.87.454 3.915 3.915 0 0 0-3.396-1.983c-.078 0-.153.005-.23.01l-.042.003V4.31h-.002a3.882 3.882 0 0 0-.8.14 6.454 6.454 0 0 0-.333-.314 2.321 2.321 0 0 0-.2-.152 3.594 3.594 0 0 1-.088-.383 4.88 4.88 0 0 1 1.352-.289l.05-.003c.052-.004.125-.01.205-.012C7.996 2.212 8.733.843 10.17.002l-.003.005.003-.001.002-.002h.002l.002-.002a.028.028 0 0 1 .015 0 .02.02 0 0 1 .012.007 2.408 2.408 0 0 0 .206.48c.06.103.122.2.183.297.49.774 1.023 1.379 1.543 1.968.771.874 1.512 1.715 2.036 3.02l-.001-.013a8.06 8.06 0 0 0-.786-2.353Z'/></svg>";
    } else if (browser_name == "safari") {
        console.log('用户正在使用 Safari 浏览器');
        svg_icon = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-browser-safari' viewBox='0 0 16 16'><path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm.25-14.75v1.5a.25.25 0 0 1-.5 0v-1.5a.25.25 0 0 1 .5 0Zm0 12v1.5a.25.25 0 1 1-.5 0v-1.5a.25.25 0 1 1 .5 0ZM4.5 1.938a.25.25 0 0 1 .342.091l.75 1.3a.25.25 0 0 1-.434.25l-.75-1.3a.25.25 0 0 1 .092-.341Zm6 10.392a.25.25 0 0 1 .341.092l.75 1.299a.25.25 0 1 1-.432.25l-.75-1.3a.25.25 0 0 1 .091-.34ZM2.28 4.408l1.298.75a.25.25 0 0 1-.25.434l-1.299-.75a.25.25 0 0 1 .25-.434Zm10.392 6 1.299.75a.25.25 0 1 1-.25.434l-1.3-.75a.25.25 0 0 1 .25-.434ZM1 8a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 0 .5h-1.5A.25.25 0 0 1 1 8Zm12 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 1 1 0 .5h-1.5A.25.25 0 0 1 13 8ZM2.03 11.159l1.298-.75a.25.25 0 0 1 .25.432l-1.299.75a.25.25 0 0 1-.25-.432Zm10.392-6 1.299-.75a.25.25 0 1 1 .25.433l-1.3.75a.25.25 0 0 1-.25-.434ZM4.5 14.061a.25.25 0 0 1-.092-.341l.75-1.3a.25.25 0 0 1 .434.25l-.75 1.3a.25.25 0 0 1-.342.091Zm6-10.392a.25.25 0 0 1-.091-.342l.75-1.299a.25.25 0 1 1 .432.25l-.75 1.3a.25.25 0 0 1-.341.09ZM6.494 1.415l.13.483a.25.25 0 1 1-.483.13l-.13-.483a.25.25 0 0 1 .483-.13ZM9.86 13.972l.13.483a.25.25 0 1 1-.483.13l-.13-.483a.25.25 0 0 1 .483-.13ZM3.05 3.05a.25.25 0 0 1 .354 0l.353.354a.25.25 0 0 1-.353.353l-.354-.353a.25.25 0 0 1 0-.354Zm9.193 9.193a.25.25 0 0 1 .353 0l.354.353a.25.25 0 1 1-.354.354l-.353-.354a.25.25 0 0 1 0-.353ZM1.545 6.01l.483.13a.25.25 0 1 1-.13.483l-.483-.13a.25.25 0 1 1 .13-.482Zm12.557 3.365.483.13a.25.25 0 1 1-.13.483l-.483-.13a.25.25 0 1 1 .13-.483Zm-12.863.436a.25.25 0 0 1 .176-.306l.483-.13a.25.25 0 1 1 .13.483l-.483.13a.25.25 0 0 1-.306-.177Zm12.557-3.365a.25.25 0 0 1 .176-.306l.483-.13a.25.25 0 1 1 .13.483l-.483.13a.25.25 0 0 1-.306-.177ZM3.045 12.944a.299.299 0 0 1-.029-.376l3.898-5.592a.25.25 0 0 1 .062-.062l5.602-3.884a.278.278 0 0 1 .392.392L9.086 9.024a.25.25 0 0 1-.062.062l-5.592 3.898a.299.299 0 0 1-.382-.034l-.005-.006Zm3.143 1.817a.25.25 0 0 1-.176-.306l.129-.483a.25.25 0 0 1 .483.13l-.13.483a.25.25 0 0 1-.306.176ZM9.553 2.204a.25.25 0 0 1-.177-.306l.13-.483a.25.25 0 1 1 .483.13l-.13.483a.25.25 0 0 1-.306.176Z'/></svg>";
    } else if (browser_name == "ie") {
        console.log('用户正在使用 Internet Explorer 浏览器');
        svg_icon = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-browser-edge' viewBox='0 0 16 16'><path d='M9.482 9.341c-.069.062-.17.153-.17.309 0 .162.107.325.3.456.877.613 2.521.54 2.592.538h.002c.667 0 1.32-.18 1.894-.519A3.838 3.838 0 0 0 16 6.819c.018-1.316-.44-2.218-.666-2.664l-.04-.08C13.963 1.487 11.106 0 8 0A8 8 0 0 0 .473 5.29C1.488 4.048 3.183 3.262 5 3.262c2.83 0 5.01 1.885 5.01 4.797h-.004v.002c0 .338-.168.832-.487 1.244l.006-.006a.594.594 0 0 1-.043.041Z'/><path d='M.01 7.753a8.137 8.137 0 0 0 .753 3.641 8 8 0 0 0 6.495 4.564 5.21 5.21 0 0 1-.785-.377h-.01l-.12-.075a5.45 5.45 0 0 1-1.56-1.463A5.543 5.543 0 0 1 6.81 5.8l.01-.004.025-.012c.208-.098.62-.292 1.167-.285.129.001.257.012.384.033a4.037 4.037 0 0 0-.993-.698l-.01-.005C6.348 4.282 5.199 4.263 5 4.263c-2.44 0-4.824 1.634-4.99 3.49Zm10.263 7.912c.088-.027.177-.054.265-.084-.102.032-.204.06-.307.086l.042-.002Z'/><path d='M10.228 15.667a5.21 5.21 0 0 0 .303-.086l.082-.025a8.019 8.019 0 0 0 4.162-3.3.25.25 0 0 0-.331-.35c-.215.112-.436.21-.663.294a6.367 6.367 0 0 1-2.243.4c-2.957 0-5.532-2.031-5.532-4.644.002-.135.017-.268.046-.399a4.543 4.543 0 0 0-.46 5.898l.003.005c.315.441.707.821 1.158 1.121h.003l.144.09c.877.55 1.721 1.078 3.328.996Z'/></svg>";
    } else {
        console.log('无法确定用户正在使用的浏览器类型');
    }
    var Newchild = $(svg_icon);
    $("#open-community-btn").prepend(Newchild);
}

// function generateQrCode(url,typenum,ECL,size) {
//     const qr = QRCode(typenum || 4,ECL || 'M');
//     qr.addData(url);
//     qr.make();

//     const canvas = document.createElement('canvas');
//     canvas.width = size || 200;
//     canvas.height = size || 200;
//     const ctx = canvas.getContext('2d');
//     const img = qr.createImgTag(4, 0);
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//     return canvas;
// }

$(document).ready(function () {
    BrowserInformation();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var homepage_div = document.getElementById('homepage-div');
        var result_div = document.getElementById('result-div');
        var code_url_label = document.getElementById('result-url');
        var get_url_btn = document.getElementById('get-url-btn');
        var open_website_btn = document.getElementById('open-website-btn');
        var open_community_btn = document.getElementById('open-community-btn');
        var check_box = document.getElementById('warning-checkbox');

        bgCommunicationPort.postMessage({ fromPopup: 'getDB' });//向background发送消息
        bgCommunicationPort.onMessage.addListener(function (receivedPortMsg) {//监听background
            console.log(receivedPortMsg);//这是background发来的内容
            if (receivedPortMsg == true) {
                // get_url_btn.data-bs-toggle=null;
                // get_url_btn.data-bs-target=null;
                $(get_url_btn).attr("data-bs-toggle", null);
                $(get_url_btn).attr("data-bs-target", null);
            }else if(receivedPortMsg.fromBackground == 'refresh_time'){
                //let currentDate = receivedPortMsg.datetime;
                let currentDate = new Date();
                let year = currentDate.getFullYear();
                let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
                let day = ("0" + currentDate.getDate()).slice(-2);
                let hours = ("0" + currentDate.getHours()).slice(-2);
                let minutes = ("0" + currentDate.getMinutes()).slice(-2);
                let seconds = ("0" + currentDate.getSeconds()).slice(-2);

                let formattedDate = `${year}-${month}-${day}`;
                let formattedTime = `${hours}:${minutes}`;

                $("#date").append(formattedDate);
                $("#time").append(formattedTime);
            };
        });



        var tab = tabs[0];
        page_url = tab.url;
        if (page_url.includes("code.xueersi.com") && page_url.includes("project")) {
            get_url_btn.className = "btn btn-outline-primary";
            open_community_btn.className = "btn btn-outline-primary disabled";
        } else {
            get_url_btn.className = "btn btn-outline-primary disabled";
            open_community_btn.className = "btn btn-outline-primary";
        }

        get_url_btn.onclick = function () {
            get_URL(page_url, homepage_div, result_div, code_url_label, get_url_btn, open_website_btn);
        };

        open_community_btn.onclick = function () {
            window.open("https://code.xueersi.com/");
        };

        check_box.onclick = function () {
            bgCommunicationPort.postMessage({//发送到bg,键值可以自由设置
                Direct: this.id,//目标
                Content: check_box.checked,//内容
                step: 0//步骤
            });
        };

        $("#generateQrCode-btn").on("click", function () {
            // const qrCanvas = generateQrCode(get_code_url(page_url));
            // $("#result-div").append(qrCanvas);
            $("#result-div").append("</br></br><img src=\'https://api.qrserver.com/v1/create-qr-code?data=" + get_code_url(page_url) + "\'></img>");
            $("#generateQrCode_btn").attr("disabled", true);
        });
    });
        
});








