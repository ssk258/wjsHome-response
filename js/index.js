

$(window).ready(function () {
    //初始化提示
    $('[data-toggle="tooltip"]').tooltip();
    banner();
    onScreenChangeListener();

    banner_touch();
    tabScroll();
});


    //页签的标签滚动
function tabScroll() {
    var ulWidth=5;
    var $lis=$(".wjs_pro_tab ul li");
    var $wjs_pro_tab_container=$(".wjs_pro_tab_container");
    var $wjs_pro_tab=$(".wjs_pro_tab");
    $.each($lis,function (k,v) {
        console.log($(v).outerWidth());
        ulWidth+=$(v).outerWidth();
    });
    $wjs_pro_tab_container.width(ulWidth);
    new IScroll($wjs_pro_tab[0],{
        scrollX: true,
        scrollY: false,
        hScrollbar:false,
        vScrollbar : false,
        vScroll:false,
        hScroll: true,
        eventPassthrough: true,         ///水平滚动，也可以垂直滚动
    });
}

// 监听屏幕变化(设备转换时进行重新渲染)
function onScreenChangeListener() {
    var $window=$(window);
    var currentState;
    var state;
    if($window.width()>768)
        currentState="P";
    else
        currentState="M";
    $(window).on('resize',function () {
        if($window.width()>768)
            state="P";
        else
            state="M";
        if(currentState!==state){
            // 如果屏幕在移动端和PC端切换就重新渲染banner
            currentState=state;
            banner();
        }

    });
}

//渲染
function banner() {
    var $indicators=$(".carousel-indicators");
    var $carousel_imgs=$(".carousel-inner");
    var $window=$(window);
    var indicators_text="";
    var carousel_imgs_text="";

    var imgs=[
        {
            p_url:'img/wjs_banner01.png',
            m_url:'img/wjs_mob_banner01.png'
        },
        {
            p_url:'img/wjs_banner02.png',
            m_url:'img/wjs_mob_banner02.png'
        },
        {
            p_url:'img/wjs_banner03.png',
            m_url:'img/wjs_mob_banner03.png'
        }
    ];
    $.each(imgs,function (k,v) {
        indicators_text+='<li data-target="#carousel-example-generic" data-slide-to="'+(k)+'" '+(k===0? 'class="active"' :"")+' ></li>';
        carousel_imgs_text+='<div class="item '+(k===0 ? "active" : "")+'">';

        if($window.width()>768){
            carousel_imgs_text+='<a class="wjs_banner_img_pc" href="#" style="background-image: url('+(v.p_url)+') ;"></a>';
            carousel_imgs_text+='</div>';
        }else {
            carousel_imgs_text+='<a class="wjs_banner_img_mob" href="#" >';
            carousel_imgs_text+='<img src="'+(v.m_url)+'">';
            carousel_imgs_text+='</a>';
        }
        carousel_imgs_text+='</div>';
    })
    $indicators.html(indicators_text);
    $carousel_imgs.html(carousel_imgs_text);

}
//手势滚动
function banner_touch() {
    var disX=0,startX=0,endX=0;
    var ismoving=false;
    var $carousel=$(".carousel");
    $carousel.on("touchstart",function (e) {
        startX=e.originalEvent.touches[0].clientX;

    }).on("touchmove",function (e) {
        ismoving=true;
        endX=e.originalEvent.touches[0].clientX;
        disX=endX-startX;
        //右划
        if(disX>50){

            $carousel.carousel('prev')
        }else if(disX<-50){
            $carousel.carousel('next')
        }

    }).on("touchend",function (e) {
        disX=0;
        startX=0;
        endX=0;
        ismoving=false;
    });

}