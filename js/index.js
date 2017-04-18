/**
 * Created by 123 on 2016/12/7.
 */
function $(id) {
    return document.getElementById(id);
}

window.onload = function () {
    // 1.实现瀑布流布局
    waterFall('main', 'box');
    // 3. 监听屏幕滚动
    window.onscroll = function () {
        if(checkWillScroll()){
            var json = [
                {src: '30.jpg'},
                {src: '31.jpg'},
                {src: '32.jpg'},
                {src: '33.jpg'},
                {src: '34.jpg'},
                {src: '35.jpg'},
                {src: '36.jpg'}
            ];
            for(var i=0; i<json.length; i++){
                var box = document.createElement('div');
                box.className = 'box';
                $('main').appendChild(box);

                var pic = document.createElement('div');
                pic.className = 'pic';
                box.appendChild(pic);

                var img = document.createElement('img');
                img.src = 'images/' + json[i].src;
                pic.appendChild(img);
            }
            waterFall('main', 'box');
        }
    }
}

function waterFall(parent, child) {
    // 父盒子居中
    var allBox = $(parent).children;
    var boxWidth = allBox[0].offsetWidth;
    var screenWidth = document.documentElement.clientWidth;
    var cols = parseInt(screenWidth / boxWidth);
     $(parent).style.width = cols * boxWidth + 'px';
     $(parent).style.margin = '0 auto';

    // 子盒子定位
    var heightArr = [];
    for(var i=0; i<allBox.length; i++){
        var boxHeight = allBox[i].offsetHeight;
        if(i < cols){
            heightArr.push(boxHeight);
        }else{
            var minBoxHeight = Math.min.apply(null, heightArr);
            var minBoxIndex = getMinBoxIndex(minBoxHeight, heightArr);
            allBox[i].style.position = 'absolute';
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';
            allBox[i].style.top = minBoxHeight + 'px';

            heightArr[minBoxIndex] += boxHeight;
            console.log(heightArr);

        }
    }
}

function getMinBoxIndex(val, arr) {
    for(var k in arr){
        if(arr[k] == val) return k;
    }
}

function checkWillScroll() {
    var allBox = $('main').children;
    var lastBox = allBox[allBox.length - 1];
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.scrollTop;
    var screenH =  document.body.clientHeight || document.documentElement.clientHeight;
    var scrollTop = scroll().top;
    return lastBoxDis < screenH + scrollTop;
}