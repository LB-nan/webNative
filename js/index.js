window.onload = function (){
    var oNav = $('nav');
    var oHeader =document.querySelector('header');
    var oArrow = $('arrow');
    var oContent = $('content');
    var oWorksContent = $('worksContent');
    var oList = document.getElementById('list');
    var aLiNav = oNav.getElementsByTagName('li');
    var aLiList = getByClass(oList,'liList');
    var aDivList = getByClass(oList,'divList');
    var aWorksContent2 = getByClass(oWorksContent,'worksContent2')[0];
    var iContentHeight = 0;
    var iNow = 0;
    var oHomeContent = $('homeContent');
    var oHomeContent1 = getByClass(oHomeContent,'homeContent1')[0];
    var oHomeContent2 = getByClass(oHomeContent,'homeContent2')[0];
    var oAboutContent = $('aboutContent');
    var oAboutContent3 = getByClass(oAboutContent,'aboutContent3')[0];
    var menu = $('menu');
    var menuLi = menu.getElementsByTagName('li');

    bindNav();
    contentAuto();
    iDivListAuto();
    mouseWheel();
    homeContent();
    // toMove(3);
    aboutContent()
    workContent();
    // view change image height auto
    window.onresize = fnResize;
    function fnResize(){
        contentAuto();
        iDivListAuto();
    }

    // bind event to nav
    function bindNav(){
        var oDiv = aLiNav[0].getElementsByTagName('div')[0];
        oDiv.style.width = '100%';
        oArrow.style.left = aLiNav[0].offsetLeft + aLiNav[0].offsetWidth/2 - oArrow.offsetWidth/2 + 'px';
        for (let i = 0; i < aLiNav.length; i++) {
            aLiNav[i].onmousedown = function (){
                aLiNav[i].index = i; 
                toMove(this.index);
                iNow = this.index;
            };
        }
        for (let i = 0; i < menuLi.length; i++) {
            menuLi[i].index = i;
            menuLi[i].onclick = function(){
                toMove(this.index);
                iNow = this.index;
            }
        }
    }

    // create works content
    function workContent(){  // aWorksContent2
        var data = [
            {img:'img/worksimg1.jpg', text:'测试文字啊啊啊啊啊啊啊阿'},
            {img:'img/worksimg2.jpg', text:'测试文字啊啊啊啊啊啊啊阿大'},
            {img:'img/worksimg3.jpg', text:'测试文字啊啊啊啊啊啊啊阿大声'},
            {img:'img/worksimg4.jpg', text:'测试文字啊啊啊啊啊啊啊阿大声道'}
        ];
        var strData = [];
        for (let i = 0; i < data.length; i++) {
           var str = `<div class="worksImgParent">
                        <img class="worksImg" src="${data[i].img}">
                        <div class="worksImgMark">
                            <span>${data[i].text}</span>
                            <div></div>
                        </div>
                     </div>`;
            strData.push(str);
        }
        aWorksContent2.innerHTML = strData;
    }


    // mouseWheel view change
    function mouseWheel(){
        var btn = true;
        var timer = null;
        //
        if(oContent.addEventListener){
            oContent.addEventListener('DOMMouseScroll',function(e){
                var e = e || window.event;
                clearTimeout(timer);
                timer = setTimeout(function(e){
                    toChange();
                },200)
            },false);
        }
        oContent.onmousewheel = function(e){
            var e = e || window.event;
            clearTimeout(timer);
            timer = setTimeout(function(){
                toChange(e);
            },200)
        };
        function toChange(e){
            // DOMMouseScroll对应的方法是e.detail  下是正数 上是负数
            // onmousewheel对应的方法是e.wheelDelta   下负数  上正数
            // alert(e.detail);
            if(e.detail){
                // btn ? down : up
                btn = e.detail > 0 ? true : false;
            }else{
                // btn ? up : down
                btn = e.wheelDelta > 0 ? false : true;
            }

            if(btn){ // up
                iNow++;
                if(iNow > aDivList.length-1){
                    iNow = aDivList.length-1;
                }
                toMove(iNow);
            } else { // down
                iNow--;
                if(iNow < 0){
                    iNow = 0;
                }
                toMove(iNow);
            }
            if(e.preventDefault){
                e.preventDefault();
            }else{
                return false;
            }
        };
    }

    // divList center
    function iDivListAuto(){
        var divAuto = (iContentHeight-520)/2;
        for (let i = 0; i < aDivList.length; i++) {
            aDivList[i].style.marginTop = divAuto + 'px';
        }
    }

    // set liList and content height
    function contentAuto(){
        iContentHeight = viewHeight() - oHeader.offsetHeight;
        oContent.style.height = iContentHeight + 'px';
        for (let i = 0; i < aLiList.length; i++) {
            aLiList[i].style.height = iContentHeight + 'px';
        }
        oList.style.top = -iNow * iContentHeight + 'px';
    }

    // change oArrow place
    function toMove(index){
            for (let i = 0; i < aLiNav.length; i++) {
                var oDiv = aLiNav[i].getElementsByTagName('div')[0];
                menuLi[i].className = '';
                oDiv.style.width = ''; 
            }
            menuLi[index].className = 'active';
            var oDiv = aLiNav[index].getElementsByTagName('div')[0];
            oDiv.style.width = '100%';
            oArrow.style.left = aLiNav[index].offsetLeft + aLiNav[index].offsetWidth/2 - oArrow.offsetWidth/2 + 'px';
            oList.style.top = -index * iContentHeight + 'px';
    }

    // 给第一屏的小圆点加点击事件
    function homeContent(){
        var aLi1 = oHomeContent1.getElementsByTagName('li');
        var aLi2 = oHomeContent2.getElementsByTagName('li');
        var oldIndex= 0;
        var iNowHome = 0;
        for (let i = 0; i < aLi2.length; i++) {
            aLi2[i].index = i;
            aLi2[i].onclick = function(){
                for (let i = 0; i < aLi2.length; i++){
                    aLi2[i].className = '';
                }
                this.className = 'active';
                if(oldIndex < this.index){ // 从左向右
                    aLi1[oldIndex].className = 'leftHide';
                    aLi1[this.index].className = 'rightShow';
                } else if(oldIndex > this.index){  // 从右向左
                    aLi1[oldIndex].className = 'rightHide';
                    aLi1[this.index].className = 'leftShow';
                }
                oldIndex = this.index; // 更新oldIndex
                iNowHome = this.index;
            }
        }
        // 自动播放
        var timer =  setInterval(change,3000);
        oHomeContent.onmouseover = function(){
            clearInterval(timer);
        }
        function change(){
            iNowHome++;
            if(iNowHome >= aLi2.length){
                iNowHome = 0;
            }
            for (let i = 0; i < aLi2.length; i++){
                aLi2[i].className = '';
            }
            aLi2[iNowHome].className = 'active';
            aLi1[oldIndex].className = 'leftHide';
            aLi1[iNowHome].className = 'rightShow';
            oldIndex = iNowHome;
        }
    }


    function aboutContent(){
        var aUl = oAboutContent3.getElementsByTagName('ul');
        var aSpan = oAboutContent3.getElementsByTagName('span');
        for (let i = 0; i < aUl.length; i++) {
            change(aUl[i]);
        }
        function change(ul){
            var w = ul.offsetWidth/2;
            var h = ul.offsetHeight/2;
            var src = ul.dataset.src;

            for(var i = 0; i < 4; i++){
                var oLi = document.createElement('li');
                oLi.style.width = w +'px';
                oLi.style.height = h +'px';
                var oImg = document.createElement('img');
                oImg.src = src;
                oImg.style.left = -i%2 * w +'px';
                oImg.style.top = -Math.floor(i/2) *h + 'px';
                oImg.oldleft = -i%2 * w ;
                oImg.oldtop = -Math.floor(i/2) *h;
                oLi.appendChild(oImg);
                ul.appendChild(oLi);
            }

            var data = [
                {name:'top', value : h},
                {name:'left', value : -w*2},
                {name:'left', value : w},
                {name:'top', value : -h*2}
            ]
            var aImg = ul.getElementsByTagName('img');
            ul.onmouseover = function(){
               for (let i = 0; i < aImg.length; i++) {
                aImg[i].style[data[i].name] = data[i].value + 'px';
               }
            }
            ul.onmouseout = function(){
                for (let i = 0; i < aImg.length; i++) {
                 aImg[i].style[data[i].name] = aImg[i]['old'+data[i].name] + 'px';
                }
             }
        }
    }

    // get element id
    function $(id){
        return document.getElementById(id);
    }
    // get view width
    function viewWidth(){
        return window.innerWidth || document.documentElement.clientWidth;
    }
    // get view height
    function viewHeight(){
        return window.innerHeight || document.documentElement.clientHeight;
    }

    // 通过父级获取class
    function getByClass(oParent, oClass){
        var aElem = oParent.getElementsByTagName('*');
        var arr = [];
        for (let i = 0; i < aElem.length; i++) {
            if( aElem[i].className == oClass ){
                arr.push(aElem[i]);
            }
            
        }
        return arr;
    }
}