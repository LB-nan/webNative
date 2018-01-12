window.onload = function (){
    var oNav = $('nav');
    var oHeader =document.querySelector('header');
    var oArrow = $('arrow');
    var oContent = $('content');
    var oList = document.getElementById('list');
    var aLiNav = oNav.getElementsByTagName('li');
    var aLiList = getByClass(oList,'liList');
    var iContentHeight = 0;
    var iNow = 0;
    bindNav();
    contentAuto()

    // view change image height auto
    window.onresize = fnResize;
    function fnResize(){
        contentAuto();
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