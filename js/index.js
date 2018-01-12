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
    console.log(aDivList.length)
    var iContentHeight = 0;
    var iNow = 0;
    bindNav();
    contentAuto();
    iDivListAuto();
    mouseWheel();
    toMove(2);
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
                oDiv.style.width = ''; 
            }
            var oDiv = aLiNav[index].getElementsByTagName('div')[0];
            oDiv.style.width = '100%';
            oArrow.style.left = aLiNav[index].offsetLeft + aLiNav[index].offsetWidth/2 - oArrow.offsetWidth/2 + 'px';
            oList.style.top = -index * iContentHeight + 'px';
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