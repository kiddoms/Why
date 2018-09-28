(function($) {
    "use strict";
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        var mobile_device = true;
    } else {
        var mobile_device = false;
    }
    var $window = jQuery(window);
    var is_RTL = jQuery('body').hasClass('rtl') ? true : false;
    jQuery("nav.nav ul li ul").parent("li").addClass("parent-list");
    jQuery(".parent-list").find("a:first").append(" <span class='menu-nav-arrow'><i class='icon-right-open-mini'></i></span>");
    jQuery("nav.nav ul a").removeAttr("title");
    jQuery("nav.nav ul ul").css({
        display: "none"
    });
    jQuery("nav.nav ul li").each(function() {
        var sub_menu = jQuery(this).find("ul:first");
        jQuery(this).hover(function() {
            sub_menu.stop().css({
                overflow: "hidden",
                height: "auto",
                display: "none",
                paddingTop: 0
            }).slideDown(200, function() {
                jQuery(this).css({
                    overflow: "visible",
                    height: "auto"
                });
            });
        }, function() {
            sub_menu.stop().slideUp(50, function() {
                jQuery(this).css({
                    overflow: "hidden",
                    display: "none"
                });
            });
        });
    });
    var fixed_enabled = jQuery("#wrap").hasClass("fixed-enabled");
    if (fixed_enabled && jQuery(".header").length) {
        var hidden_header = jQuery(".hidden-header").offset().top;
        if (hidden_header < 40) {
            var aboveHeight = -20;
        } else {
            var aboveHeight = hidden_header;
        }
        $window.scroll(function() {
            if ($window.scrollTop() > aboveHeight) {
                jQuery(".header").css({
                    "top": "0"
                }).addClass("fixed-nav");
            } else {
                jQuery(".header").css({
                    "top": "auto"
                }).removeClass("fixed-nav");
            }
        });
    } else {
        jQuery(".header").removeClass("fixed-nav");
    }
    jQuery("nav.nav > ul > li").clone().appendTo('.navigation_mobile > ul');
    if (jQuery(".call-action-style_1").length) {
        var action_button = jQuery(".call-action-button").outerHeight();
        var action_content = jQuery(".call-action-style_1 .discy-container").outerHeight();
        jQuery(".call-action-button").css({
            "margin-top": (action_content - action_button) / 2
        });
    }
    if (jQuery(".search-click").length) {
        jQuery(".search-click").on('touchstart click', function() {
            jQuery(".header-search").addClass("header-search-active");
            jQuery(".header-search input[type='search']").focus();
            jQuery(".search-click").hide();
            jQuery(".discy-content").on("click", function() {
                jQuery(".search-click").show();
                jQuery(".header-search").removeClass("header-search-active");
            });
        });
    }
    if (jQuery(".search_type.user_filter_active").length) {
        jQuery(".search_type.user_filter_active").change(function() {
            var ThisSelect = jQuery(this);
            if (ThisSelect.val() == "users") {
                jQuery(".post-search .row > .col").removeClass("col6").addClass("col4");
                ThisSelect.parent().parent().parent().find(".user-filter-div select").attr("name", "user_filter");
                jQuery(".user-filter-div").animate({
                    opacity: 'show',
                    height: 'show'
                }, 200, function() {
                    jQuery(".user-filter-div").removeClass('hide');
                });
            } else {
                jQuery(".user-filter-div").animate({
                    opacity: 'hide',
                    height: 'hide'
                }, 200, function() {
                    jQuery(".user-filter-div").addClass('hide');
                    jQuery(".post-search .row > .col").removeClass("col4").addClass("col6");
                    ThisSelect.parent().parent().parent().removeAttr("name");
                });
            }
        });
    }
    if (jQuery(".mobile-bar-search").length) {
        jQuery(".mobile-bar-search > a").click(function() {
            jQuery(".mobile-bar-search > form").animate({
                opacity: 'show',
                height: 'show'
            }, 100, function() {
                jQuery(".mobile-bar-search").addClass('mobile-bar-search-active');
            });
            return false;
        });
        jQuery(".mobile-bar-search form i").click(function() {
            jQuery(".mobile-bar-search > form").animate({
                opacity: 'hide',
                height: 'hide'
            }, 100, function() {
                jQuery(".mobile-bar-search").removeClass('mobile-bar-search-active');
            });
        });
    }
    if (jQuery(".user-click").length) {
        jQuery(".user-click").on("click", function() {
            jQuery(".user-notifications.user-notifications-seen").removeClass("user-notifications-seen").find(" > div").slideUp(200);
            jQuery(".user-messages > div").slideUp(200);
            jQuery(this).parent().toggleClass("user-click-open").find(" > ul").slideToggle(200);
        });
    }
    jQuery(".tooltip-n").tipsy({
        fade: true,
        gravity: "s"
    });
    jQuery(".tooltip-s").tipsy({
        fade: true,
        gravity: "n"
    });
    jQuery(".tooltip-nw").tipsy({
        fade: true,
        gravity: "nw"
    });
    jQuery(".tooltip-ne").tipsy({
        fade: true,
        gravity: "ne"
    });
    jQuery(".tooltip-w").tipsy({
        fade: true,
        gravity: "w"
    });
    jQuery(".tooltip-e").tipsy({
        fade: true,
        gravity: "e"
    });
    jQuery(".tooltip-sw").tipsy({
        fade: true,
        gravity: "sw"
    });
    jQuery(".tooltip-se").tipsy({
        fade: true,
        gravity: "se"
    });
    if (jQuery(".user-login-click").length) {
        var user_image = jQuery(".user-login-click .user-image");
        var user_image_h = user_image.outerHeight();
        var user_login = jQuery(".user-login-click .user-login");
        var user_login_h = user_login.outerHeight();
        user_login.css({
            "margin-top": (user_image_h - user_login_h) / 2
        });
        $window.bind("resize", function() {
            var user_image = jQuery(".user-login-click .user-image");
            var user_image_h = user_image.outerHeight();
            var user_login = jQuery(".user-login-click .user-login");
            var user_login_h = user_login.outerHeight();
            user_login.css({
                "margin-top": (user_image_h - user_login_h) / 2
            });
        });
    }
    if (jQuery(".nav_menu").length) {
        jQuery(".nav_menu > ul > li > a,.nav_menu > div > ul > li > a").on("click", function() {
            var li_menu = jQuery(this).parent();
            if (li_menu.find(" > ul").length) {
                if (li_menu.hasClass("nav_menu_open")) {
                    li_menu.find(" > ul").slideUp(200, function() {
                        li_menu.removeClass("nav_menu_open");
                    });
                } else {
                    li_menu.find(" > ul").slideDown(200, function() {
                        li_menu.addClass("nav_menu_open");
                    });
                }
                return false;
            }
        });
    }
    if (jQuery('.mobile-aside').length) {
        jQuery('.mobile-aside li.menu-item-has-children').append('<span class="mobile-arrows"><i class="icon-down-open"></i></span>');
        jQuery('.mobile-aside-close').on('touchstart click', function() {
            jQuery('.mobile-aside').removeClass('mobile-aside-open');
            return false;
        });
        jQuery('.mobile-menu-click').on('touchstart click', function() {
            jQuery('.mobile-menu-wrap').addClass('mobile-aside-open');
            return false;
        });
        if (jQuery('.mobile-aside ul.menu > li').length) {
            jQuery('.mobile-aside li.menu-item-has-children > a,.mobile-aside li.menu-item-has-children > .mobile-arrows').on("touchstart click", function() {
                jQuery(this).parent().find('ul:first').slideToggle(200);
                jQuery(this).parent().find('> .mobile-arrows').toggleClass('mobile-arrows-open');
                return false;
            });
        }
        jQuery('.mobile-aside-inner').mCustomScrollbar({
            axis: 'y'
        });
    }
    if (jQuery(".post-share").length) {
        var cssArea = (is_RTL == true ? "left" : "right");
        jQuery(".post-share").each(function() {
            var share_width = jQuery(this).find(" > ul").outerWidth() + 20;
            jQuery(this).find(" > ul").css(cssArea, "-" + share_width + "px");
        });
    }
    $window.scroll(function() {
        if (jQuery(this).scrollTop() > 100) {
            jQuery(".go-up").css("right", "20px");
        } else {
            jQuery(".go-up").css("right", "-60px");
        }
    });
    jQuery(".go-up").on("click", function() {
        jQuery("html,body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    if (jQuery(".widget ul.tabs").length) {
        jQuery(".widget ul.tabs").tabs(".widget .tab-inner-wrap", {
            effect: "slide",
            fadeInSpeed: 100
        });
    }
    if (jQuery("ul.tabs-box").length) {
        jQuery("ul.tabs-box").tabs(".tab-inner-wrap-box", {
            effect: "slide",
            fadeInSpeed: 100
        });
    }
    if (jQuery(".slider-owl").length) {
        jQuery(".slider-owl").each(function() {
            var $slider = jQuery(this);
            var $slider_item = $slider.find('.slider-item').length;
            $slider.find('.slider-item').css({
                "height": "auto"
            });
            if ($slider.find('img').length) {
                var $slider = jQuery(this).imagesLoaded(function() {
                    $slider.owlCarousel({
                        autoplay: 3000,
                        margin: 10,
                        responsive: {
                            0: {
                                items: 1
                            }
                        },
                        autoplayHoverPause: true,
                        navText: ["", ""],
                        nav: ($slider_item > 1) ? true : false,
                        rtl: is_RTL,
                        loop: ($slider_item > 1) ? true : false,
                    });
                });
            } else {
                $slider.owlCarousel({
                    autoplay: 3000,
                    margin: 10,
                    responsive: {
                        0: {
                            items: 1
                        }
                    },
                    autoplayHoverPause: true,
                    navText: ["", ""],
                    nav: ($slider_item > 1) ? true : false,
                    rtl: is_RTL == true,
                    loop: ($slider_item > 1) ? true : false,
                });
            }
        });
    }
    if (jQuery(".accordion").length) {
        jQuery(".accordion .accordion-title").each(function() {
            jQuery(this).on("click", function() {
                if (jQuery(this).parent().parent().hasClass("toggle-accordion")) {
                    jQuery(this).parent().find("li:first .accordion-title").addClass("active");
                    jQuery(this).parent().find("li:first .accordion-title").next(".accordion-inner").addClass("active");
                    jQuery(this).toggleClass("active");
                    jQuery(this).next(".accordion-inner").slideToggle(200).toggleClass("active");
                    jQuery(this).find("i").toggleClass("icon-minus").toggleClass("icon-plus");
                } else {
                    if (jQuery(this).next().is(":hidden")) {
                        jQuery(this).parent().parent().find(".accordion-title").removeClass("active").next().slideUp(200);
                        jQuery(this).parent().parent().find(".accordion-title").next().removeClass("active").slideUp(200);
                        jQuery(this).toggleClass("active").next().slideDown(200);
                        jQuery(this).next(".accordion-inner").toggleClass("active");
                        jQuery(this).parent().parent().find("i").removeClass("icon-plus").addClass("icon-minus");
                        jQuery(this).find("i").removeClass("icon-minus").addClass("icon-plus");
                    }
                }
                return false;
            });
        });
    }
    if (jQuery("ul.menu.flex").length) {
        jQuery('ul.menu.flex').flexMenu({
            threshold: 0,
            cutoff: 0,
            linkText: '<i class="icon-dot-3"></i>',
            linkTextAll: '<i class="icon-dot-3"></i>',
            linkTitle: '',
            linkTitleAll: '',
            showOnHover: ($window.width() > 991 ? true : false),
        });
        jQuery("ul.menu.flex .active-tab").parent().parent().addClass("active-menu");
    }
    if (jQuery("nav.nav ul").length) {
        jQuery('nav.nav ul').flexMenu({
            threshold: 0,
            cutoff: 0,
            linkText: '<i class="icon-dot-3"></i>',
            linkTextAll: '<i class="icon-dot-3"></i>',
            linkTitle: '',
            linkTitleAll: '',
            showOnHover: ($window.width() > 991 ? true : false),
        });
        jQuery("nav.nav ul .active-tab").parent().parent().addClass("active-menu");
    }
    if (jQuery(".show-answer-form").length) {
        jQuery(".show-answer-form").on("click", function() {
            jQuery(".show-answer-form").hide(10);
            jQuery(".comment-form-hide").animate({
                opacity: 'show',
                height: 'show'
            }, 400);
        });
    }
    if (jQuery(".profile-setting").length) {
        jQuery(".profile-setting a").on("click", function() {
            var profile = jQuery(this);
            if (!profile.hasClass("active-tab")) {
                jQuery(".profile-setting a").removeClass("active-tab");
                jQuery("#edit-profile,#change-password").slideUp(10);
                jQuery(profile.attr("href")).slideDown(200);
                jQuery("#profile_type").attr("value", profile.attr("data-type"));
                profile.addClass("active-tab");
            }
            return false;
        });
    }
    if (jQuery(".widget select").length) {
        jQuery(".widget select").wrap('<div class="styled-select"></div>');
    }
    if (jQuery(".home_categories").length) {
        jQuery(".home_categories").on("change", function() {
            var url = jQuery(this).val();
            if (url) {
                window.location = url;
            }
            return false;
        });
    }
    if (jQuery(".active-lightbox").length) {
        var lightboxArgs = {
            animation_speed: "fast",
            overlay_gallery: true,
            autoplay_slideshow: false,
            slideshow: 5000,
            theme: "pp_default",
            opacity: 0.8,
            show_title: false,
            social_tools: "",
            deeplinking: false,
            allow_resize: true,
            counter_separator_label: "/",
            default_width: 940,
            default_height: 529
        };
        jQuery("a[href$=jpg], a[href$=JPG], a[href$=jpeg], a[href$=JPEG], a[href$=png], a[href$=gif], a[href$=bmp]:has(img)").prettyPhoto(lightboxArgs);
        jQuery("a[class^='prettyPhoto'], a[rel^='prettyPhoto']").prettyPhoto(lightboxArgs);
    }
    jQuery(document).keyup(function(event) {
        if (event.which == '27') {
            jQuery.when(jQuery(".panel-pop").fadeOut(200)).done(function() {
                jQuery(this).css({
                    "top": "-100%",
                    "display": "none"
                });
                jQuery(".wrap-pop").remove();
            });
            jQuery('.mobile-aside').removeClass('mobile-aside-open');
            jQuery(".user-login-click").removeClass("user-click-open").find(" > ul").slideUp(200);
            jQuery(".user-login-area .user-notifications > div").slideUp(200);
            jQuery(".user-notifications-seen").removeClass("user-notifications-seen");
            jQuery(".user-messages > div").slideUp(200);
        }
    });
    $window.load(function() {
        jQuery(".loader").fadeOut(500);
        if (jQuery(".user-section-grid,.user-section-simple").length) {
            jQuery('.user-section-grid,.user-section-simple').each(function() {
                jQuery(this).find('> div > div').matchHeight();
            });
        }
        if (jQuery(".user-section-columns").length) {
            jQuery('.user-section-columns').each(function() {
                jQuery(this).find('.post-inner').matchHeight();
            });
        }
        if (jQuery(".badge-section,.tag-sections,.points-section ul .point-section").length) {
            jQuery(".badge-section > *,.tag-sections,.points-section ul .point-section").matchHeight();
        }
        var sticky_sidebar = jQuery(".single-question .question-sticky");
        if (sticky_sidebar.length && $window.width() > 480) {
            jQuery(".single-question .question-vote-sticky").css({
                "width": sticky_sidebar.outerWidth()
            });
            jQuery('.single-question .question-vote-sticky').theiaStickySidebar({
                additionalMarginTop: (jQuery("#wrap.fixed-enabled").length ? jQuery(".hidden-header").outerHeight() : 0) + 40,
                minWidth: sticky_sidebar.outerWidth()
            });
        }
        if (jQuery(".question-header-mobile").length) {
            $window.bind("resize", function() {
                if (jQuery(this).width() < 480) {
                    if (jQuery(".question-header-mobile").length) {
                        jQuery(".article-question").each(function() {
                            var question_mobile_h = jQuery(this).find(".question-header-mobile").outerHeight() - 20;
                            var author_image_h = jQuery(this).find(".author-image").outerHeight();
                            jQuery(this).find(".author-image").css({
                                "margin-top": (question_mobile_h - author_image_h) / 2
                            });
                        });
                    }
                } else {
                    jQuery(".article-question .author-image,.question-image-vote,.question-image-vote .theiaStickySidebar").removeAttr("style");
                    jQuery(".article-question .author-image").css({
                        "width": "46px"
                    });
                    if (sticky_sidebar.length) {
                        jQuery(".single-question .question-image-vote").css({
                            "width": sticky_sidebar.outerWidth()
                        });
                        jQuery('.single-question .question-image-vote').theiaStickySidebar({
                            additionalMarginTop: (jQuery("#wrap.fixed-enabled").length ? jQuery(".hidden-header").outerHeight() : 0) + 40,
                            minWidth: sticky_sidebar.outerWidth()
                        });
                    }
                }
            });
            if ($window.width() < 480) {
                if (jQuery(".question-header-mobile").length) {
                    jQuery(".article-question").each(function() {
                        var question_mobile_h = jQuery(this).find(".question-header-mobile").outerHeight() - 20;
                        var author_image_h = jQuery(this).find(".author-image").outerHeight();
                        jQuery(this).find(".author-image").css({
                            "margin-top": (question_mobile_h - author_image_h) / 2
                        });
                    });
                }
            }
        }
    });
}
)(jQuery);
jQuery.noConflict()(function discy_sidebar() {
    var main_wrap_h = jQuery(".discy-main-wrap").outerHeight();
    var main_sidebar_h = jQuery(".inner-sidebar").outerHeight();
    var nav_menu_h = jQuery(".nav_menu").outerHeight();
    if (jQuery('.menu_left').length && nav_menu_h > main_wrap_h) {
        jQuery('.discy-main-inner,.nav_menu').matchHeight();
    } else if ((main_wrap_h > nav_menu_h && jQuery(".fixed_nav_menu").length) || (main_wrap_h > main_sidebar_h && jQuery(".fixed-sidebar").length)) {
        if (jQuery(".fixed_nav_menu").length) {
            jQuery('.discy-main-wrap,.fixed_nav_menu').theiaStickySidebar({
                additionalMarginTop: (jQuery("#wrap.fixed-enabled").length ? jQuery(".hidden-header").outerHeight() : 0) + jQuery(".admin-bar #wpadminbar").outerHeight() + 30
            });
        }
        if (jQuery(".fixed-sidebar").length) {
            jQuery('.discy-main-wrap,.fixed-sidebar').theiaStickySidebar({
                additionalMarginTop: (jQuery("#wrap.fixed-enabled").length ? jQuery(".hidden-header").outerHeight() : 0) + jQuery(".admin-bar #wpadminbar").outerHeight()
            });
        }
    }
});
;var addComment = {
    moveForm: function(a, b, c, d) {
        var e, f, g, h, i = this, j = i.I(a), k = i.I(c), l = i.I("cancel-comment-reply-link"), m = i.I("comment_parent"), n = i.I("comment_post_ID"), o = k.getElementsByTagName("form")[0];
        if (j && k && l && m && o) {
            i.respondId = c,
            d = d || !1,
            i.I("wp-temp-form-div") || (e = document.createElement("div"),
            e.id = "wp-temp-form-div",
            e.style.display = "none",
            k.parentNode.insertBefore(e, k)),
            j.parentNode.insertBefore(k, j.nextSibling),
            n && d && (n.value = d),
            m.value = b,
            l.style.display = "",
            l.onclick = function() {
                var a = addComment
                  , b = a.I("wp-temp-form-div")
                  , c = a.I(a.respondId);
                if (b && c)
                    return a.I("comment_parent").value = "0",
                    b.parentNode.insertBefore(c, b),
                    b.parentNode.removeChild(b),
                    this.style.display = "none",
                    this.onclick = null,
                    !1
            }
            ;
            try {
                for (var p = 0; p < o.elements.length; p++)
                    if (f = o.elements[p],
                    h = !1,
                    "getComputedStyle"in window ? g = window.getComputedStyle(f) : document.documentElement.currentStyle && (g = f.currentStyle),
                    (f.offsetWidth <= 0 && f.offsetHeight <= 0 || "hidden" === g.visibility) && (h = !0),
                    "hidden" !== f.type && !f.disabled && !h) {
                        f.focus();
                        break
                    }
            } catch (q) {}
            return !1
        }
    },
    I: function(a) {
        return document.getElementById(a)
    }
};
;!function(a, b) {
    "use strict";
    function c() {
        if (!e) {
            e = !0;
            var a, c, d, f, g = -1 !== navigator.appVersion.indexOf("MSIE 10"), h = !!navigator.userAgent.match(/Trident.*rv:11\./), i = b.querySelectorAll("iframe.wp-embedded-content");
            for (c = 0; c < i.length; c++) {
                if (d = i[c],
                !d.getAttribute("data-secret"))
                    f = Math.random().toString(36).substr(2, 10),
                    d.src += "#?secret=" + f,
                    d.setAttribute("data-secret", f);
                if (g || h)
                    a = d.cloneNode(!0),
                    a.removeAttribute("security"),
                    d.parentNode.replaceChild(a, d)
            }
        }
    }
    var d = !1
      , e = !1;
    if (b.querySelector)
        if (a.addEventListener)
            d = !0;
    if (a.wp = a.wp || {},
    !a.wp.receiveEmbedMessage)
        if (a.wp.receiveEmbedMessage = function(c) {
            var d = c.data;
            if (d.secret || d.message || d.value)
                if (!/[^a-zA-Z0-9]/.test(d.secret)) {
                    var e, f, g, h, i, j = b.querySelectorAll('iframe[data-secret="' + d.secret + '"]'), k = b.querySelectorAll('blockquote[data-secret="' + d.secret + '"]');
                    for (e = 0; e < k.length; e++)
                        k[e].style.display = "none";
                    for (e = 0; e < j.length; e++)
                        if (f = j[e],
                        c.source === f.contentWindow) {
                            if (f.removeAttribute("style"),
                            "height" === d.message) {
                                if (g = parseInt(d.value, 10),
                                g > 1e3)
                                    g = 1e3;
                                else if (~~g < 200)
                                    g = 200;
                                f.height = g
                            }
                            if ("link" === d.message)
                                if (h = b.createElement("a"),
                                i = b.createElement("a"),
                                h.href = f.getAttribute("src"),
                                i.href = d.value,
                                i.host === h.host)
                                    if (b.activeElement === f)
                                        a.top.location.href = d.value
                        } else
                            ;
                }
        }
        ,
        d)
            a.addEventListener("message", a.wp.receiveEmbedMessage, !1),
            b.addEventListener("DOMContentLoaded", c, !1),
            a.addEventListener("load", c, !1)
}(window, document);
;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function() {
    function n(n) {
        function t(t, r, e, u, i, o) {
            for (; i >= 0 && o > i; i += n) {
                var a = u ? u[i] : i;
                e = r(e, t[a], a, t)
            }
            return e
        }
        return function(r, e, u, i) {
            e = b(e, i, 4);
            var o = !k(r) && m.keys(r)
              , a = (o || r).length
              , c = n > 0 ? 0 : a - 1;
            return arguments.length < 3 && (u = r[o ? o[c] : c],
            c += n),
            t(r, e, u, o, c, a)
        }
    }
    function t(n) {
        return function(t, r, e) {
            r = x(r, e);
            for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)
                if (r(t[i], i, t))
                    return i;
            return -1
        }
    }
    function r(n, t, r) {
        return function(e, u, i) {
            var o = 0
              , a = O(e);
            if ("number" == typeof i)
                n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1;
            else if (r && i && a)
                return i = r(e, u),
                e[i] === u ? i : -1;
            if (u !== u)
                return i = t(l.call(e, o, a), m.isNaN),
                i >= 0 ? i + o : -1;
            for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n)
                if (e[i] === u)
                    return i;
            return -1
        }
    }
    function e(n, t) {
        var r = I.length
          , e = n.constructor
          , u = m.isFunction(e) && e.prototype || a
          , i = "constructor";
        for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--; )
            i = I[r],
            i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
    }
    var u = this
      , i = u._
      , o = Array.prototype
      , a = Object.prototype
      , c = Function.prototype
      , f = o.push
      , l = o.slice
      , s = a.toString
      , p = a.hasOwnProperty
      , h = Array.isArray
      , v = Object.keys
      , g = c.bind
      , y = Object.create
      , d = function() {}
      , m = function(n) {
        return n instanceof m ? n : this instanceof m ? void (this._wrapped = n) : new m(n)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m),
    exports._ = m) : u._ = m,
    m.VERSION = "1.8.3";
    var b = function(n, t, r) {
        if (t === void 0)
            return n;
        switch (null == r ? 3 : r) {
        case 1:
            return function(r) {
                return n.call(t, r)
            }
            ;
        case 2:
            return function(r, e) {
                return n.call(t, r, e)
            }
            ;
        case 3:
            return function(r, e, u) {
                return n.call(t, r, e, u)
            }
            ;
        case 4:
            return function(r, e, u, i) {
                return n.call(t, r, e, u, i)
            }
        }
        return function() {
            return n.apply(t, arguments)
        }
    }
      , x = function(n, t, r) {
        return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)
    };
    m.iteratee = function(n, t) {
        return x(n, t, 1 / 0)
    }
    ;
    var _ = function(n, t) {
        return function(r) {
            var e = arguments.length;
            if (2 > e || null == r)
                return r;
            for (var u = 1; e > u; u++)
                for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
                    var f = o[c];
                    t && r[f] !== void 0 || (r[f] = i[f])
                }
            return r
        }
    }
      , j = function(n) {
        if (!m.isObject(n))
            return {};
        if (y)
            return y(n);
        d.prototype = n;
        var t = new d;
        return d.prototype = null,
        t
    }
      , w = function(n) {
        return function(t) {
            return null == t ? void 0 : t[n]
        }
    }
      , A = Math.pow(2, 53) - 1
      , O = w("length")
      , k = function(n) {
        var t = O(n);
        return "number" == typeof t && t >= 0 && A >= t
    };
    m.each = m.forEach = function(n, t, r) {
        t = b(t, r);
        var e, u;
        if (k(n))
            for (e = 0,
            u = n.length; u > e; e++)
                t(n[e], e, n);
        else {
            var i = m.keys(n);
            for (e = 0,
            u = i.length; u > e; e++)
                t(n[i[e]], i[e], n)
        }
        return n
    }
    ,
    m.map = m.collect = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
            var a = e ? e[o] : o;
            i[o] = t(n[a], a, n)
        }
        return i
    }
    ,
    m.reduce = m.foldl = m.inject = n(1),
    m.reduceRight = m.foldr = n(-1),
    m.find = m.detect = function(n, t, r) {
        var e;
        return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r),
        e !== void 0 && e !== -1 ? n[e] : void 0
    }
    ,
    m.filter = m.select = function(n, t, r) {
        var e = [];
        return t = x(t, r),
        m.each(n, function(n, r, u) {
            t(n, r, u) && e.push(n)
        }),
        e
    }
    ,
    m.reject = function(n, t, r) {
        return m.filter(n, m.negate(x(t)), r)
    }
    ,
    m.every = m.all = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (!t(n[o], o, n))
                return !1
        }
        return !0
    }
    ,
    m.some = m.any = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (t(n[o], o, n))
                return !0
        }
        return !1
    }
    ,
    m.contains = m.includes = m.include = function(n, t, r, e) {
        return k(n) || (n = m.values(n)),
        ("number" != typeof r || e) && (r = 0),
        m.indexOf(n, t, r) >= 0
    }
    ,
    m.invoke = function(n, t) {
        var r = l.call(arguments, 2)
          , e = m.isFunction(t);
        return m.map(n, function(n) {
            var u = e ? t : n[t];
            return null == u ? u : u.apply(n, r)
        })
    }
    ,
    m.pluck = function(n, t) {
        return m.map(n, m.property(t))
    }
    ,
    m.where = function(n, t) {
        return m.filter(n, m.matcher(t))
    }
    ,
    m.findWhere = function(n, t) {
        return m.find(n, m.matcher(t))
    }
    ,
    m.max = function(n, t, r) {
        var e, u, i = -1 / 0, o = -1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++)
                e = n[a],
                e > i && (i = e)
        } else
            t = x(t, r),
            m.each(n, function(n, r, e) {
                u = t(n, r, e),
                (u > o || u === -1 / 0 && i === -1 / 0) && (i = n,
                o = u)
            });
        return i
    }
    ,
    m.min = function(n, t, r) {
        var e, u, i = 1 / 0, o = 1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++)
                e = n[a],
                i > e && (i = e)
        } else
            t = x(t, r),
            m.each(n, function(n, r, e) {
                u = t(n, r, e),
                (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n,
                o = u)
            });
        return i
    }
    ,
    m.shuffle = function(n) {
        for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++)
            t = m.random(0, i),
            t !== i && (u[i] = u[t]),
            u[t] = r[i];
        return u
    }
    ,
    m.sample = function(n, t, r) {
        return null == t || r ? (k(n) || (n = m.values(n)),
        n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))
    }
    ,
    m.sortBy = function(n, t, r) {
        return t = x(t, r),
        m.pluck(m.map(n, function(n, r, e) {
            return {
                value: n,
                index: r,
                criteria: t(n, r, e)
            }
        }).sort(function(n, t) {
            var r = n.criteria
              , e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0)
                    return 1;
                if (e > r || e === void 0)
                    return -1
            }
            return n.index - t.index
        }), "value")
    }
    ;
    var F = function(n) {
        return function(t, r, e) {
            var u = {};
            return r = x(r, e),
            m.each(t, function(e, i) {
                var o = r(e, i, t);
                n(u, e, o)
            }),
            u
        }
    };
    m.groupBy = F(function(n, t, r) {
        m.has(n, r) ? n[r].push(t) : n[r] = [t]
    }),
    m.indexBy = F(function(n, t, r) {
        n[r] = t
    }),
    m.countBy = F(function(n, t, r) {
        m.has(n, r) ? n[r]++ : n[r] = 1
    }),
    m.toArray = function(n) {
        return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : []
    }
    ,
    m.size = function(n) {
        return null == n ? 0 : k(n) ? n.length : m.keys(n).length
    }
    ,
    m.partition = function(n, t, r) {
        t = x(t, r);
        var e = []
          , u = [];
        return m.each(n, function(n, r, i) {
            (t(n, r, i) ? e : u).push(n)
        }),
        [e, u]
    }
    ,
    m.first = m.head = m.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)
    }
    ,
    m.initial = function(n, t, r) {
        return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
    }
    ,
    m.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))
    }
    ,
    m.rest = m.tail = m.drop = function(n, t, r) {
        return l.call(n, null == t || r ? 1 : t)
    }
    ,
    m.compact = function(n) {
        return m.filter(n, m.identity)
    }
    ;
    var S = function(n, t, r, e) {
        for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
            var c = n[o];
            if (k(c) && (m.isArray(c) || m.isArguments(c))) {
                t || (c = S(c, t, r));
                var f = 0
                  , l = c.length;
                for (u.length += l; l > f; )
                    u[i++] = c[f++]
            } else
                r || (u[i++] = c)
        }
        return u
    };
    m.flatten = function(n, t) {
        return S(n, t, !1)
    }
    ,
    m.without = function(n) {
        return m.difference(n, l.call(arguments, 1))
    }
    ,
    m.uniq = m.unique = function(n, t, r, e) {
        m.isBoolean(t) || (e = r,
        r = t,
        t = !1),
        null != r && (r = x(r, e));
        for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
            var c = n[o]
              , f = r ? r(c, o, n) : c;
            t ? (o && i === f || u.push(c),
            i = f) : r ? m.contains(i, f) || (i.push(f),
            u.push(c)) : m.contains(u, c) || u.push(c)
        }
        return u
    }
    ,
    m.union = function() {
        return m.uniq(S(arguments, !0, !0))
    }
    ,
    m.intersection = function(n) {
        for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
            var i = n[e];
            if (!m.contains(t, i)) {
                for (var o = 1; r > o && m.contains(arguments[o], i); o++)
                    ;
                o === r && t.push(i)
            }
        }
        return t
    }
    ,
    m.difference = function(n) {
        var t = S(arguments, !0, !0, 1);
        return m.filter(n, function(n) {
            return !m.contains(t, n)
        })
    }
    ,
    m.zip = function() {
        return m.unzip(arguments)
    }
    ,
    m.unzip = function(n) {
        for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++)
            r[e] = m.pluck(n, e);
        return r
    }
    ,
    m.object = function(n, t) {
        for (var r = {}, e = 0, u = O(n); u > e; e++)
            t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }
    ,
    m.findIndex = t(1),
    m.findLastIndex = t(-1),
    m.sortedIndex = function(n, t, r, e) {
        r = x(r, e, 1);
        for (var u = r(t), i = 0, o = O(n); o > i; ) {
            var a = Math.floor((i + o) / 2);
            r(n[a]) < u ? i = a + 1 : o = a
        }
        return i
    }
    ,
    m.indexOf = r(1, m.findIndex, m.sortedIndex),
    m.lastIndexOf = r(-1, m.findLastIndex),
    m.range = function(n, t, r) {
        null == t && (t = n || 0,
        n = 0),
        r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++,
        n += r)
            u[i] = n;
        return u
    }
    ;
    var E = function(n, t, r, e, u) {
        if (!(e instanceof t))
            return n.apply(r, u);
        var i = j(n.prototype)
          , o = n.apply(i, u);
        return m.isObject(o) ? o : i
    };
    m.bind = function(n, t) {
        if (g && n.bind === g)
            return g.apply(n, l.call(arguments, 1));
        if (!m.isFunction(n))
            throw new TypeError("Bind must be called on a function");
        var r = l.call(arguments, 2)
          , e = function() {
            return E(n, e, t, this, r.concat(l.call(arguments)))
        };
        return e
    }
    ,
    m.partial = function(n) {
        var t = l.call(arguments, 1)
          , r = function() {
            for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++)
                i[o] = t[o] === m ? arguments[e++] : t[o];
            for (; e < arguments.length; )
                i.push(arguments[e++]);
            return E(n, r, this, this, i)
        };
        return r
    }
    ,
    m.bindAll = function(n) {
        var t, r, e = arguments.length;
        if (1 >= e)
            throw new Error("bindAll must be passed function names");
        for (t = 1; e > t; t++)
            r = arguments[t],
            n[r] = m.bind(n[r], n);
        return n
    }
    ,
    m.memoize = function(n, t) {
        var r = function(e) {
            var u = r.cache
              , i = "" + (t ? t.apply(this, arguments) : e);
            return m.has(u, i) || (u[i] = n.apply(this, arguments)),
            u[i]
        };
        return r.cache = {},
        r
    }
    ,
    m.delay = function(n, t) {
        var r = l.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, t)
    }
    ,
    m.defer = m.partial(m.delay, m, 1),
    m.throttle = function(n, t, r) {
        var e, u, i, o = null, a = 0;
        r || (r = {});
        var c = function() {
            a = r.leading === !1 ? 0 : m.now(),
            o = null,
            i = n.apply(e, u),
            o || (e = u = null)
        };
        return function() {
            var f = m.now();
            a || r.leading !== !1 || (a = f);
            var l = t - (f - a);
            return e = this,
            u = arguments,
            0 >= l || l > t ? (o && (clearTimeout(o),
            o = null),
            a = f,
            i = n.apply(e, u),
            o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, l)),
            i
        }
    }
    ,
    m.debounce = function(n, t, r) {
        var e, u, i, o, a, c = function() {
            var f = m.now() - o;
            t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null,
            r || (a = n.apply(i, u),
            e || (i = u = null)))
        };
        return function() {
            i = this,
            u = arguments,
            o = m.now();
            var f = r && !e;
            return e || (e = setTimeout(c, t)),
            f && (a = n.apply(i, u),
            i = u = null),
            a
        }
    }
    ,
    m.wrap = function(n, t) {
        return m.partial(t, n)
    }
    ,
    m.negate = function(n) {
        return function() {
            return !n.apply(this, arguments)
        }
    }
    ,
    m.compose = function() {
        var n = arguments
          , t = n.length - 1;
        return function() {
            for (var r = t, e = n[t].apply(this, arguments); r--; )
                e = n[r].call(this, e);
            return e
        }
    }
    ,
    m.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }
    ,
    m.before = function(n, t) {
        var r;
        return function() {
            return --n > 0 && (r = t.apply(this, arguments)),
            1 >= n && (t = null),
            r
        }
    }
    ,
    m.once = m.partial(m.before, 2);
    var M = !{
        toString: null
    }.propertyIsEnumerable("toString")
      , I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    m.keys = function(n) {
        if (!m.isObject(n))
            return [];
        if (v)
            return v(n);
        var t = [];
        for (var r in n)
            m.has(n, r) && t.push(r);
        return M && e(n, t),
        t
    }
    ,
    m.allKeys = function(n) {
        if (!m.isObject(n))
            return [];
        var t = [];
        for (var r in n)
            t.push(r);
        return M && e(n, t),
        t
    }
    ,
    m.values = function(n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)
            e[u] = n[t[u]];
        return e
    }
    ,
    m.mapObject = function(n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++)
            e = u[a],
            o[e] = t(n[e], e, n);
        return o
    }
    ,
    m.pairs = function(n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)
            e[u] = [t[u], n[t[u]]];
        return e
    }
    ,
    m.invert = function(n) {
        for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++)
            t[n[r[e]]] = r[e];
        return t
    }
    ,
    m.functions = m.methods = function(n) {
        var t = [];
        for (var r in n)
            m.isFunction(n[r]) && t.push(r);
        return t.sort()
    }
    ,
    m.extend = _(m.allKeys),
    m.extendOwn = m.assign = _(m.keys),
    m.findKey = function(n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)
            if (e = u[i],
            t(n[e], e, n))
                return e
    }
    ,
    m.pick = function(n, t, r) {
        var e, u, i = {}, o = n;
        if (null == o)
            return i;
        m.isFunction(t) ? (u = m.allKeys(o),
        e = b(t, r)) : (u = S(arguments, !1, !1, 1),
        e = function(n, t, r) {
            return t in r
        }
        ,
        o = Object(o));
        for (var a = 0, c = u.length; c > a; a++) {
            var f = u[a]
              , l = o[f];
            e(l, f, o) && (i[f] = l)
        }
        return i
    }
    ,
    m.omit = function(n, t, r) {
        if (m.isFunction(t))
            t = m.negate(t);
        else {
            var e = m.map(S(arguments, !1, !1, 1), String);
            t = function(n, t) {
                return !m.contains(e, t)
            }
        }
        return m.pick(n, t, r)
    }
    ,
    m.defaults = _(m.allKeys, !0),
    m.create = function(n, t) {
        var r = j(n);
        return t && m.extendOwn(r, t),
        r
    }
    ,
    m.clone = function(n) {
        return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n
    }
    ,
    m.tap = function(n, t) {
        return t(n),
        n
    }
    ,
    m.isMatch = function(n, t) {
        var r = m.keys(t)
          , e = r.length;
        if (null == n)
            return !e;
        for (var u = Object(n), i = 0; e > i; i++) {
            var o = r[i];
            if (t[o] !== u[o] || !(o in u))
                return !1
        }
        return !0
    }
    ;
    var N = function(n, t, r, e) {
        if (n === t)
            return 0 !== n || 1 / n === 1 / t;
        if (null == n || null == t)
            return n === t;
        n instanceof m && (n = n._wrapped),
        t instanceof m && (t = t._wrapped);
        var u = s.call(n);
        if (u !== s.call(t))
            return !1;
        switch (u) {
        case "[object RegExp]":
        case "[object String]":
            return "" + n == "" + t;
        case "[object Number]":
            return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
        case "[object Date]":
        case "[object Boolean]":
            return +n === +t
        }
        var i = "[object Array]" === u;
        if (!i) {
            if ("object" != typeof n || "object" != typeof t)
                return !1;
            var o = n.constructor
              , a = t.constructor;
            if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor"in n && "constructor"in t)
                return !1
        }
        r = r || [],
        e = e || [];
        for (var c = r.length; c--; )
            if (r[c] === n)
                return e[c] === t;
        if (r.push(n),
        e.push(t),
        i) {
            if (c = n.length,
            c !== t.length)
                return !1;
            for (; c--; )
                if (!N(n[c], t[c], r, e))
                    return !1
        } else {
            var f, l = m.keys(n);
            if (c = l.length,
            m.keys(t).length !== c)
                return !1;
            for (; c--; )
                if (f = l[c],
                !m.has(t, f) || !N(n[f], t[f], r, e))
                    return !1
        }
        return r.pop(),
        e.pop(),
        !0
    };
    m.isEqual = function(n, t) {
        return N(n, t)
    }
    ,
    m.isEmpty = function(n) {
        return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length
    }
    ,
    m.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }
    ,
    m.isArray = h || function(n) {
        return "[object Array]" === s.call(n)
    }
    ,
    m.isObject = function(n) {
        var t = typeof n;
        return "function" === t || "object" === t && !!n
    }
    ,
    m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(n) {
        m["is" + n] = function(t) {
            return s.call(t) === "[object " + n + "]"
        }
    }),
    m.isArguments(arguments) || (m.isArguments = function(n) {
        return m.has(n, "callee")
    }
    ),
    "function" != typeof /./ && "object" != typeof Int8Array && (m.isFunction = function(n) {
        return "function" == typeof n || !1
    }
    ),
    m.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }
    ,
    m.isNaN = function(n) {
        return m.isNumber(n) && n !== +n
    }
    ,
    m.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" === s.call(n)
    }
    ,
    m.isNull = function(n) {
        return null === n
    }
    ,
    m.isUndefined = function(n) {
        return n === void 0
    }
    ,
    m.has = function(n, t) {
        return null != n && p.call(n, t)
    }
    ,
    m.noConflict = function() {
        return u._ = i,
        this
    }
    ,
    m.identity = function(n) {
        return n
    }
    ,
    m.constant = function(n) {
        return function() {
            return n
        }
    }
    ,
    m.noop = function() {}
    ,
    m.property = w,
    m.propertyOf = function(n) {
        return null == n ? function() {}
        : function(t) {
            return n[t]
        }
    }
    ,
    m.matcher = m.matches = function(n) {
        return n = m.extendOwn({}, n),
        function(t) {
            return m.isMatch(t, n)
        }
    }
    ,
    m.times = function(n, t, r) {
        var e = Array(Math.max(0, n));
        t = b(t, r, 1);
        for (var u = 0; n > u; u++)
            e[u] = t(u);
        return e
    }
    ,
    m.random = function(n, t) {
        return null == t && (t = n,
        n = 0),
        n + Math.floor(Math.random() * (t - n + 1))
    }
    ,
    m.now = Date.now || function() {
        return (new Date).getTime()
    }
    ;
    var B = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }
      , T = m.invert(B)
      , R = function(n) {
        var t = function(t) {
            return n[t]
        }
          , r = "(?:" + m.keys(n).join("|") + ")"
          , e = RegExp(r)
          , u = RegExp(r, "g");
        return function(n) {
            return n = null == n ? "" : "" + n,
            e.test(n) ? n.replace(u, t) : n
        }
    };
    m.escape = R(B),
    m.unescape = R(T),
    m.result = function(n, t, r) {
        var e = null == n ? void 0 : n[t];
        return e === void 0 && (e = r),
        m.isFunction(e) ? e.call(n) : e
    }
    ;
    var q = 0;
    m.uniqueId = function(n) {
        var t = ++q + "";
        return n ? n + t : t
    }
    ,
    m.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var K = /(.)^/
      , z = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }
      , D = /\\|'|\r|\n|\u2028|\u2029/g
      , L = function(n) {
        return "\\" + z[n]
    };
    m.template = function(n, t, r) {
        !t && r && (t = r),
        t = m.defaults({}, t, m.templateSettings);
        var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g")
          , u = 0
          , i = "__p+='";
        n.replace(e, function(t, r, e, o, a) {
            return i += n.slice(u, a).replace(D, L),
            u = a + t.length,
            r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"),
            t
        }),
        i += "';\n",
        t.variable || (i = "with(obj||{}){\n" + i + "}\n"),
        i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var o = new Function(t.variable || "obj","_",i)
        } catch (a) {
            throw a.source = i,
            a
        }
        var c = function(n) {
            return o.call(this, n, m)
        }
          , f = t.variable || "obj";
        return c.source = "function(" + f + "){\n" + i + "}",
        c
    }
    ,
    m.chain = function(n) {
        var t = m(n);
        return t._chain = !0,
        t
    }
    ;
    var P = function(n, t) {
        return n._chain ? m(t).chain() : t
    };
    m.mixin = function(n) {
        m.each(m.functions(n), function(t) {
            var r = m[t] = n[t];
            m.prototype[t] = function() {
                var n = [this._wrapped];
                return f.apply(n, arguments),
                P(this, r.apply(m, n))
            }
        })
    }
    ,
    m.mixin(m),
    m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = o[n];
        m.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments),
            "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0],
            P(this, r)
        }
    }),
    m.each(["concat", "join", "slice"], function(n) {
        var t = o[n];
        m.prototype[n] = function() {
            return P(this, t.apply(this._wrapped, arguments))
        }
    }),
    m.prototype.value = function() {
        return this._wrapped
    }
    ,
    m.prototype.valueOf = m.prototype.toJSON = m.prototype.value,
    m.prototype.toString = function() {
        return "" + this._wrapped
    }
    ,
    "function" == typeof define && define.amd && define("underscore", [], function() {
        return m
    })
}
).call(this);

;window.wp = window.wp || {},
function() {
    wp.shortcode = {
        next: function(a, b, c) {
            var d, e, f = wp.shortcode.regexp(a);
            if (f.lastIndex = c || 0,
            d = f.exec(b))
                return "[" === d[1] && "]" === d[7] ? wp.shortcode.next(a, b, f.lastIndex) : (e = {
                    index: d.index,
                    content: d[0],
                    shortcode: wp.shortcode.fromMatch(d)
                },
                d[1] && (e.content = e.content.slice(1),
                e.index++),
                d[7] && (e.content = e.content.slice(0, -1)),
                e)
        },
        replace: function(a, b, c) {
            return b.replace(wp.shortcode.regexp(a), function(a, b, d, e, f, g, h, i) {
                if ("[" === b && "]" === i)
                    return a;
                var j = c(wp.shortcode.fromMatch(arguments));
                return j ? b + j + i : a
            })
        },
        string: function(a) {
            return new wp.shortcode(a).string()
        },
        regexp: _.memoize(function(a) {
            return new RegExp("\\[(\\[?)(" + a + ")(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)","g")
        }),
        attrs: _.memoize(function(a) {
            var b, c, d = {}, e = [];
            for (b = /([\w-]+)\s*=\s*"([^"]*)"(?:\s|$)|([\w-]+)\s*=\s*'([^']*)'(?:\s|$)|([\w-]+)\s*=\s*([^\s'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|'([^']*)'(?:\s|$)|(\S+)(?:\s|$)/g,
            a = a.replace(/[\u00a0\u200b]/g, " "); c = b.exec(a); )
                c[1] ? d[c[1].toLowerCase()] = c[2] : c[3] ? d[c[3].toLowerCase()] = c[4] : c[5] ? d[c[5].toLowerCase()] = c[6] : c[7] ? e.push(c[7]) : c[8] ? e.push(c[8]) : c[9] && e.push(c[9]);
            return {
                named: d,
                numeric: e
            }
        }),
        fromMatch: function(a) {
            var b;
            return b = a[4] ? "self-closing" : a[6] ? "closed" : "single",
            new wp.shortcode({
                tag: a[2],
                attrs: a[3],
                type: b,
                content: a[5]
            })
        }
    },
    wp.shortcode = _.extend(function(a) {
        _.extend(this, _.pick(a || {}, "tag", "attrs", "type", "content"));
        var b = this.attrs;
        this.attrs = {
            named: {},
            numeric: []
        },
        b && (_.isString(b) ? this.attrs = wp.shortcode.attrs(b) : _.isEqual(_.keys(b), ["named", "numeric"]) ? this.attrs = b : _.each(a.attrs, function(a, b) {
            this.set(b, a)
        }, this))
    }, wp.shortcode),
    _.extend(wp.shortcode.prototype, {
        get: function(a) {
            return this.attrs[_.isNumber(a) ? "numeric" : "named"][a]
        },
        set: function(a, b) {
            return this.attrs[_.isNumber(a) ? "numeric" : "named"][a] = b,
            this
        },
        string: function() {
            var a = "[" + this.tag;
            return _.each(this.attrs.numeric, function(b) {
                a += /\s/.test(b) ? ' "' + b + '"' : " " + b
            }),
            _.each(this.attrs.named, function(b, c) {
                a += " " + c + '="' + b + '"'
            }),
            "single" === this.type ? a + "]" : "self-closing" === this.type ? a + " /]" : (a += "]",
            this.content && (a += this.content),
            a + "[/" + this.tag + "]")
        }
    })
}(),
function() {
    wp.html = _.extend(wp.html || {}, {
        attrs: function(a) {
            var b, c;
            return "/" === a[a.length - 1] && (a = a.slice(0, -1)),
            b = wp.shortcode.attrs(a),
            c = b.named,
            _.each(b.numeric, function(a) {
                /\s/.test(a) || (c[a] = "")
            }),
            c
        },
        string: function(a) {
            var b = "<" + a.tag
              , c = a.content || "";
            return _.each(a.attrs, function(a, c) {
                b += " " + c,
                _.isBoolean(a) && (a = a ? "true" : "false"),
                b += '="' + a + '"'
            }),
            a.single ? b + " />" : (b += ">",
            b += _.isObject(c) ? wp.html.string(c) : c,
            b + "</" + a.tag + ">")
        }
    })
}();
;function getUserSetting(a, b) {
    var c = getAllUserSettings();
    return c.hasOwnProperty(a) ? c[a] : "undefined" != typeof b ? b : ""
}
function setUserSetting(a, b, c) {
    if ("object" != typeof userSettings)
        return !1;
    var d = userSettings.uid
      , e = wpCookies.getHash("wp-settings-" + d)
      , f = userSettings.url
      , g = !!userSettings.secure;
    return a = a.toString().replace(/[^A-Za-z0-9_-]/g, ""),
    b = "number" == typeof b ? parseInt(b, 10) : b.toString().replace(/[^A-Za-z0-9_-]/g, ""),
    e = e || {},
    c ? delete e[a] : e[a] = b,
    wpCookies.setHash("wp-settings-" + d, e, 31536e3, f, "", g),
    wpCookies.set("wp-settings-time-" + d, userSettings.time, 31536e3, f, "", g),
    a
}
function deleteUserSetting(a) {
    return setUserSetting(a, "", 1)
}
function getAllUserSettings() {
    return "object" != typeof userSettings ? {} : wpCookies.getHash("wp-settings-" + userSettings.uid) || {}
}
var wpCookies = {
    each: function(a, b, c) {
        var d, e;
        if (!a)
            return 0;
        if (c = c || a,
        "undefined" != typeof a.length) {
            for (d = 0,
            e = a.length; d < e; d++)
                if (b.call(c, a[d], d, a) === !1)
                    return 0
        } else
            for (d in a)
                if (a.hasOwnProperty(d) && b.call(c, a[d], d, a) === !1)
                    return 0;
        return 1
    },
    getHash: function(a) {
        var b, c = this.get(a);
        return c && this.each(c.split("&"), function(a) {
            a = a.split("="),
            b = b || {},
            b[a[0]] = a[1]
        }),
        b
    },
    setHash: function(a, b, c, d, e, f) {
        var g = "";
        this.each(b, function(a, b) {
            g += (g ? "&" : "") + b + "=" + a
        }),
        this.set(a, g, c, d, e, f)
    },
    get: function(a) {
        var b, c, d = document.cookie, e = a + "=";
        if (d) {
            if (c = d.indexOf("; " + e),
            c === -1) {
                if (c = d.indexOf(e),
                0 !== c)
                    return null
            } else
                c += 2;
            return b = d.indexOf(";", c),
            b === -1 && (b = d.length),
            decodeURIComponent(d.substring(c + e.length, b))
        }
    },
    set: function(a, b, c, d, e, f) {
        var g = new Date;
        "object" == typeof c && c.toGMTString ? c = c.toGMTString() : parseInt(c, 10) ? (g.setTime(g.getTime() + 1e3 * parseInt(c, 10)),
        c = g.toGMTString()) : c = "",
        document.cookie = a + "=" + encodeURIComponent(b) + (c ? "; expires=" + c : "") + (d ? "; path=" + d : "") + (e ? "; domain=" + e : "") + (f ? "; secure" : "")
    },
    remove: function(a, b, c, d) {
        this.set(a, "", -1e3, b, c, d)
    }
};
;(function(t) {
    var e = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global;
    if (typeof define === "function" && define.amd) {
        define(["underscore", "jquery", "exports"], function(i, r, n) {
            e.Backbone = t(e, n, i, r)
        })
    } else if (typeof exports !== "undefined") {
        var i = require("underscore"), r;
        try {
            r = require("jquery")
        } catch (n) {}
        t(e, exports, i, r)
    } else {
        e.Backbone = t(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$)
    }
}
)(function(t, e, i, r) {
    var n = t.Backbone;
    var s = Array.prototype.slice;
    e.VERSION = "1.3.3";
    e.$ = r;
    e.noConflict = function() {
        t.Backbone = n;
        return this
    }
    ;
    e.emulateHTTP = false;
    e.emulateJSON = false;
    var a = function(t, e, r) {
        switch (t) {
        case 1:
            return function() {
                return i[e](this[r])
            }
            ;
        case 2:
            return function(t) {
                return i[e](this[r], t)
            }
            ;
        case 3:
            return function(t, n) {
                return i[e](this[r], o(t, this), n)
            }
            ;
        case 4:
            return function(t, n, s) {
                return i[e](this[r], o(t, this), n, s)
            }
            ;
        default:
            return function() {
                var t = s.call(arguments);
                t.unshift(this[r]);
                return i[e].apply(i, t)
            }
        }
    };
    var h = function(t, e, r) {
        i.each(e, function(e, n) {
            if (i[n])
                t.prototype[n] = a(e, n, r)
        })
    };
    var o = function(t, e) {
        if (i.isFunction(t))
            return t;
        if (i.isObject(t) && !e._isModel(t))
            return l(t);
        if (i.isString(t))
            return function(e) {
                return e.get(t)
            }
            ;
        return t
    };
    var l = function(t) {
        var e = i.matches(t);
        return function(t) {
            return e(t.attributes)
        }
    };
    var u = e.Events = {};
    var c = /\s+/;
    var f = function(t, e, r, n, s) {
        var a = 0, h;
        if (r && typeof r === "object") {
            if (n !== void 0 && "context"in s && s.context === void 0)
                s.context = n;
            for (h = i.keys(r); a < h.length; a++) {
                e = f(t, e, h[a], r[h[a]], s)
            }
        } else if (r && c.test(r)) {
            for (h = r.split(c); a < h.length; a++) {
                e = t(e, h[a], n, s)
            }
        } else {
            e = t(e, r, n, s)
        }
        return e
    };
    u.on = function(t, e, i) {
        return d(this, t, e, i)
    }
    ;
    var d = function(t, e, i, r, n) {
        t._events = f(v, t._events || {}, e, i, {
            context: r,
            ctx: t,
            listening: n
        });
        if (n) {
            var s = t._listeners || (t._listeners = {});
            s[n.id] = n
        }
        return t
    };
    u.listenTo = function(t, e, r) {
        if (!t)
            return this;
        var n = t._listenId || (t._listenId = i.uniqueId("l"));
        var s = this._listeningTo || (this._listeningTo = {});
        var a = s[n];
        if (!a) {
            var h = this._listenId || (this._listenId = i.uniqueId("l"));
            a = s[n] = {
                obj: t,
                objId: n,
                id: h,
                listeningTo: s,
                count: 0
            }
        }
        d(t, e, r, this, a);
        return this
    }
    ;
    var v = function(t, e, i, r) {
        if (i) {
            var n = t[e] || (t[e] = []);
            var s = r.context
              , a = r.ctx
              , h = r.listening;
            if (h)
                h.count++;
            n.push({
                callback: i,
                context: s,
                ctx: s || a,
                listening: h
            })
        }
        return t
    };
    u.off = function(t, e, i) {
        if (!this._events)
            return this;
        this._events = f(g, this._events, t, e, {
            context: i,
            listeners: this._listeners
        });
        return this
    }
    ;
    u.stopListening = function(t, e, r) {
        var n = this._listeningTo;
        if (!n)
            return this;
        var s = t ? [t._listenId] : i.keys(n);
        for (var a = 0; a < s.length; a++) {
            var h = n[s[a]];
            if (!h)
                break;
            h.obj.off(e, r, this)
        }
        return this
    }
    ;
    var g = function(t, e, r, n) {
        if (!t)
            return;
        var s = 0, a;
        var h = n.context
          , o = n.listeners;
        if (!e && !r && !h) {
            var l = i.keys(o);
            for (; s < l.length; s++) {
                a = o[l[s]];
                delete o[a.id];
                delete a.listeningTo[a.objId]
            }
            return
        }
        var u = e ? [e] : i.keys(t);
        for (; s < u.length; s++) {
            e = u[s];
            var c = t[e];
            if (!c)
                break;
            var f = [];
            for (var d = 0; d < c.length; d++) {
                var v = c[d];
                if (r && r !== v.callback && r !== v.callback._callback || h && h !== v.context) {
                    f.push(v)
                } else {
                    a = v.listening;
                    if (a && --a.count === 0) {
                        delete o[a.id];
                        delete a.listeningTo[a.objId]
                    }
                }
            }
            if (f.length) {
                t[e] = f
            } else {
                delete t[e]
            }
        }
        return t
    };
    u.once = function(t, e, r) {
        var n = f(p, {}, t, e, i.bind(this.off, this));
        if (typeof t === "string" && r == null)
            e = void 0;
        return this.on(n, e, r)
    }
    ;
    u.listenToOnce = function(t, e, r) {
        var n = f(p, {}, e, r, i.bind(this.stopListening, this, t));
        return this.listenTo(t, n)
    }
    ;
    var p = function(t, e, r, n) {
        if (r) {
            var s = t[e] = i.once(function() {
                n(e, s);
                r.apply(this, arguments)
            });
            s._callback = r
        }
        return t
    };
    u.trigger = function(t) {
        if (!this._events)
            return this;
        var e = Math.max(0, arguments.length - 1);
        var i = Array(e);
        for (var r = 0; r < e; r++)
            i[r] = arguments[r + 1];
        f(m, this._events, t, void 0, i);
        return this
    }
    ;
    var m = function(t, e, i, r) {
        if (t) {
            var n = t[e];
            var s = t.all;
            if (n && s)
                s = s.slice();
            if (n)
                _(n, r);
            if (s)
                _(s, [e].concat(r))
        }
        return t
    };
    var _ = function(t, e) {
        var i, r = -1, n = t.length, s = e[0], a = e[1], h = e[2];
        switch (e.length) {
        case 0:
            while (++r < n)
                (i = t[r]).callback.call(i.ctx);
            return;
        case 1:
            while (++r < n)
                (i = t[r]).callback.call(i.ctx, s);
            return;
        case 2:
            while (++r < n)
                (i = t[r]).callback.call(i.ctx, s, a);
            return;
        case 3:
            while (++r < n)
                (i = t[r]).callback.call(i.ctx, s, a, h);
            return;
        default:
            while (++r < n)
                (i = t[r]).callback.apply(i.ctx, e);
            return
        }
    };
    u.bind = u.on;
    u.unbind = u.off;
    i.extend(e, u);
    var y = e.Model = function(t, e) {
        var r = t || {};
        e || (e = {});
        this.cid = i.uniqueId(this.cidPrefix);
        this.attributes = {};
        if (e.collection)
            this.collection = e.collection;
        if (e.parse)
            r = this.parse(r, e) || {};
        var n = i.result(this, "defaults");
        r = i.defaults(i.extend({}, n, r), n);
        this.set(r, e);
        this.changed = {};
        this.initialize.apply(this, arguments)
    }
    ;
    i.extend(y.prototype, u, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        cidPrefix: "c",
        initialize: function() {},
        toJSON: function(t) {
            return i.clone(this.attributes)
        },
        sync: function() {
            return e.sync.apply(this, arguments)
        },
        get: function(t) {
            return this.attributes[t]
        },
        escape: function(t) {
            return i.escape(this.get(t))
        },
        has: function(t) {
            return this.get(t) != null
        },
        matches: function(t) {
            return !!i.iteratee(t, this)(this.attributes)
        },
        set: function(t, e, r) {
            if (t == null)
                return this;
            var n;
            if (typeof t === "object") {
                n = t;
                r = e
            } else {
                (n = {})[t] = e
            }
            r || (r = {});
            if (!this._validate(n, r))
                return false;
            var s = r.unset;
            var a = r.silent;
            var h = [];
            var o = this._changing;
            this._changing = true;
            if (!o) {
                this._previousAttributes = i.clone(this.attributes);
                this.changed = {}
            }
            var l = this.attributes;
            var u = this.changed;
            var c = this._previousAttributes;
            for (var f in n) {
                e = n[f];
                if (!i.isEqual(l[f], e))
                    h.push(f);
                if (!i.isEqual(c[f], e)) {
                    u[f] = e
                } else {
                    delete u[f]
                }
                s ? delete l[f] : l[f] = e
            }
            if (this.idAttribute in n)
                this.id = this.get(this.idAttribute);
            if (!a) {
                if (h.length)
                    this._pending = r;
                for (var d = 0; d < h.length; d++) {
                    this.trigger("change:" + h[d], this, l[h[d]], r)
                }
            }
            if (o)
                return this;
            if (!a) {
                while (this._pending) {
                    r = this._pending;
                    this._pending = false;
                    this.trigger("change", this, r)
                }
            }
            this._pending = false;
            this._changing = false;
            return this
        },
        unset: function(t, e) {
            return this.set(t, void 0, i.extend({}, e, {
                unset: true
            }))
        },
        clear: function(t) {
            var e = {};
            for (var r in this.attributes)
                e[r] = void 0;
            return this.set(e, i.extend({}, t, {
                unset: true
            }))
        },
        hasChanged: function(t) {
            if (t == null)
                return !i.isEmpty(this.changed);
            return i.has(this.changed, t)
        },
        changedAttributes: function(t) {
            if (!t)
                return this.hasChanged() ? i.clone(this.changed) : false;
            var e = this._changing ? this._previousAttributes : this.attributes;
            var r = {};
            for (var n in t) {
                var s = t[n];
                if (i.isEqual(e[n], s))
                    continue;
                r[n] = s
            }
            return i.size(r) ? r : false
        },
        previous: function(t) {
            if (t == null || !this._previousAttributes)
                return null;
            return this._previousAttributes[t]
        },
        previousAttributes: function() {
            return i.clone(this._previousAttributes)
        },
        fetch: function(t) {
            t = i.extend({
                parse: true
            }, t);
            var e = this;
            var r = t.success;
            t.success = function(i) {
                var n = t.parse ? e.parse(i, t) : i;
                if (!e.set(n, t))
                    return false;
                if (r)
                    r.call(t.context, e, i, t);
                e.trigger("sync", e, i, t)
            }
            ;
            B(this, t);
            return this.sync("read", this, t)
        },
        save: function(t, e, r) {
            var n;
            if (t == null || typeof t === "object") {
                n = t;
                r = e
            } else {
                (n = {})[t] = e
            }
            r = i.extend({
                validate: true,
                parse: true
            }, r);
            var s = r.wait;
            if (n && !s) {
                if (!this.set(n, r))
                    return false
            } else if (!this._validate(n, r)) {
                return false
            }
            var a = this;
            var h = r.success;
            var o = this.attributes;
            r.success = function(t) {
                a.attributes = o;
                var e = r.parse ? a.parse(t, r) : t;
                if (s)
                    e = i.extend({}, n, e);
                if (e && !a.set(e, r))
                    return false;
                if (h)
                    h.call(r.context, a, t, r);
                a.trigger("sync", a, t, r)
            }
            ;
            B(this, r);
            if (n && s)
                this.attributes = i.extend({}, o, n);
            var l = this.isNew() ? "create" : r.patch ? "patch" : "update";
            if (l === "patch" && !r.attrs)
                r.attrs = n;
            var u = this.sync(l, this, r);
            this.attributes = o;
            return u
        },
        destroy: function(t) {
            t = t ? i.clone(t) : {};
            var e = this;
            var r = t.success;
            var n = t.wait;
            var s = function() {
                e.stopListening();
                e.trigger("destroy", e, e.collection, t)
            };
            t.success = function(i) {
                if (n)
                    s();
                if (r)
                    r.call(t.context, e, i, t);
                if (!e.isNew())
                    e.trigger("sync", e, i, t)
            }
            ;
            var a = false;
            if (this.isNew()) {
                i.defer(t.success)
            } else {
                B(this, t);
                a = this.sync("delete", this, t)
            }
            if (!n)
                s();
            return a
        },
        url: function() {
            var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || F();
            if (this.isNew())
                return t;
            var e = this.get(this.idAttribute);
            return t.replace(/[^\/]$/, "$&/") + encodeURIComponent(e)
        },
        parse: function(t, e) {
            return t
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return !this.has(this.idAttribute)
        },
        isValid: function(t) {
            return this._validate({}, i.extend({}, t, {
                validate: true
            }))
        },
        _validate: function(t, e) {
            if (!e.validate || !this.validate)
                return true;
            t = i.extend({}, this.attributes, t);
            var r = this.validationError = this.validate(t, e) || null;
            if (!r)
                return true;
            this.trigger("invalid", this, r, i.extend(e, {
                validationError: r
            }));
            return false
        }
    });
    var b = {
        keys: 1,
        values: 1,
        pairs: 1,
        invert: 1,
        pick: 0,
        omit: 0,
        chain: 1,
        isEmpty: 1
    };
    h(y, b, "attributes");
    var x = e.Collection = function(t, e) {
        e || (e = {});
        if (e.model)
            this.model = e.model;
        if (e.comparator !== void 0)
            this.comparator = e.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (t)
            this.reset(t, i.extend({
                silent: true
            }, e))
    }
    ;
    var w = {
        add: true,
        remove: true,
        merge: true
    };
    var E = {
        add: true,
        remove: false
    };
    var I = function(t, e, i) {
        i = Math.min(Math.max(i, 0), t.length);
        var r = Array(t.length - i);
        var n = e.length;
        var s;
        for (s = 0; s < r.length; s++)
            r[s] = t[s + i];
        for (s = 0; s < n; s++)
            t[s + i] = e[s];
        for (s = 0; s < r.length; s++)
            t[s + n + i] = r[s]
    };
    i.extend(x.prototype, u, {
        model: y,
        initialize: function() {},
        toJSON: function(t) {
            return this.map(function(e) {
                return e.toJSON(t)
            })
        },
        sync: function() {
            return e.sync.apply(this, arguments)
        },
        add: function(t, e) {
            return this.set(t, i.extend({
                merge: false
            }, e, E))
        },
        remove: function(t, e) {
            e = i.extend({}, e);
            var r = !i.isArray(t);
            t = r ? [t] : t.slice();
            var n = this._removeModels(t, e);
            if (!e.silent && n.length) {
                e.changes = {
                    added: [],
                    merged: [],
                    removed: n
                };
                this.trigger("update", this, e)
            }
            return r ? n[0] : n
        },
        set: function(t, e) {
            if (t == null)
                return;
            e = i.extend({}, w, e);
            if (e.parse && !this._isModel(t)) {
                t = this.parse(t, e) || []
            }
            var r = !i.isArray(t);
            t = r ? [t] : t.slice();
            var n = e.at;
            if (n != null)
                n = +n;
            if (n > this.length)
                n = this.length;
            if (n < 0)
                n += this.length + 1;
            var s = [];
            var a = [];
            var h = [];
            var o = [];
            var l = {};
            var u = e.add;
            var c = e.merge;
            var f = e.remove;
            var d = false;
            var v = this.comparator && n == null && e.sort !== false;
            var g = i.isString(this.comparator) ? this.comparator : null;
            var p, m;
            for (m = 0; m < t.length; m++) {
                p = t[m];
                var _ = this.get(p);
                if (_) {
                    if (c && p !== _) {
                        var y = this._isModel(p) ? p.attributes : p;
                        if (e.parse)
                            y = _.parse(y, e);
                        _.set(y, e);
                        h.push(_);
                        if (v && !d)
                            d = _.hasChanged(g)
                    }
                    if (!l[_.cid]) {
                        l[_.cid] = true;
                        s.push(_)
                    }
                    t[m] = _
                } else if (u) {
                    p = t[m] = this._prepareModel(p, e);
                    if (p) {
                        a.push(p);
                        this._addReference(p, e);
                        l[p.cid] = true;
                        s.push(p)
                    }
                }
            }
            if (f) {
                for (m = 0; m < this.length; m++) {
                    p = this.models[m];
                    if (!l[p.cid])
                        o.push(p)
                }
                if (o.length)
                    this._removeModels(o, e)
            }
            var b = false;
            var x = !v && u && f;
            if (s.length && x) {
                b = this.length !== s.length || i.some(this.models, function(t, e) {
                    return t !== s[e]
                });
                this.models.length = 0;
                I(this.models, s, 0);
                this.length = this.models.length
            } else if (a.length) {
                if (v)
                    d = true;
                I(this.models, a, n == null ? this.length : n);
                this.length = this.models.length
            }
            if (d)
                this.sort({
                    silent: true
                });
            if (!e.silent) {
                for (m = 0; m < a.length; m++) {
                    if (n != null)
                        e.index = n + m;
                    p = a[m];
                    p.trigger("add", p, this, e)
                }
                if (d || b)
                    this.trigger("sort", this, e);
                if (a.length || o.length || h.length) {
                    e.changes = {
                        added: a,
                        removed: o,
                        merged: h
                    };
                    this.trigger("update", this, e)
                }
            }
            return r ? t[0] : t
        },
        reset: function(t, e) {
            e = e ? i.clone(e) : {};
            for (var r = 0; r < this.models.length; r++) {
                this._removeReference(this.models[r], e)
            }
            e.previousModels = this.models;
            this._reset();
            t = this.add(t, i.extend({
                silent: true
            }, e));
            if (!e.silent)
                this.trigger("reset", this, e);
            return t
        },
        push: function(t, e) {
            return this.add(t, i.extend({
                at: this.length
            }, e))
        },
        pop: function(t) {
            var e = this.at(this.length - 1);
            return this.remove(e, t)
        },
        unshift: function(t, e) {
            return this.add(t, i.extend({
                at: 0
            }, e))
        },
        shift: function(t) {
            var e = this.at(0);
            return this.remove(e, t)
        },
        slice: function() {
            return s.apply(this.models, arguments)
        },
        get: function(t) {
            if (t == null)
                return void 0;
            return this._byId[t] || this._byId[this.modelId(t.attributes || t)] || t.cid && this._byId[t.cid]
        },
        has: function(t) {
            return this.get(t) != null
        },
        at: function(t) {
            if (t < 0)
                t += this.length;
            return this.models[t]
        },
        where: function(t, e) {
            return this[e ? "find" : "filter"](t)
        },
        findWhere: function(t) {
            return this.where(t, true)
        },
        sort: function(t) {
            var e = this.comparator;
            if (!e)
                throw new Error("Cannot sort a set without a comparator");
            t || (t = {});
            var r = e.length;
            if (i.isFunction(e))
                e = i.bind(e, this);
            if (r === 1 || i.isString(e)) {
                this.models = this.sortBy(e)
            } else {
                this.models.sort(e)
            }
            if (!t.silent)
                this.trigger("sort", this, t);
            return this
        },
        pluck: function(t) {
            return this.map(t + "")
        },
        fetch: function(t) {
            t = i.extend({
                parse: true
            }, t);
            var e = t.success;
            var r = this;
            t.success = function(i) {
                var n = t.reset ? "reset" : "set";
                r[n](i, t);
                if (e)
                    e.call(t.context, r, i, t);
                r.trigger("sync", r, i, t)
            }
            ;
            B(this, t);
            return this.sync("read", this, t)
        },
        create: function(t, e) {
            e = e ? i.clone(e) : {};
            var r = e.wait;
            t = this._prepareModel(t, e);
            if (!t)
                return false;
            if (!r)
                this.add(t, e);
            var n = this;
            var s = e.success;
            e.success = function(t, e, i) {
                if (r)
                    n.add(t, i);
                if (s)
                    s.call(i.context, t, e, i)
            }
            ;
            t.save(null, e);
            return t
        },
        parse: function(t, e) {
            return t
        },
        clone: function() {
            return new this.constructor(this.models,{
                model: this.model,
                comparator: this.comparator
            })
        },
        modelId: function(t) {
            return t[this.model.prototype.idAttribute || "id"]
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {}
        },
        _prepareModel: function(t, e) {
            if (this._isModel(t)) {
                if (!t.collection)
                    t.collection = this;
                return t
            }
            e = e ? i.clone(e) : {};
            e.collection = this;
            var r = new this.model(t,e);
            if (!r.validationError)
                return r;
            this.trigger("invalid", this, r.validationError, e);
            return false
        },
        _removeModels: function(t, e) {
            var i = [];
            for (var r = 0; r < t.length; r++) {
                var n = this.get(t[r]);
                if (!n)
                    continue;
                var s = this.indexOf(n);
                this.models.splice(s, 1);
                this.length--;
                delete this._byId[n.cid];
                var a = this.modelId(n.attributes);
                if (a != null)
                    delete this._byId[a];
                if (!e.silent) {
                    e.index = s;
                    n.trigger("remove", n, this, e)
                }
                i.push(n);
                this._removeReference(n, e)
            }
            return i
        },
        _isModel: function(t) {
            return t instanceof y
        },
        _addReference: function(t, e) {
            this._byId[t.cid] = t;
            var i = this.modelId(t.attributes);
            if (i != null)
                this._byId[i] = t;
            t.on("all", this._onModelEvent, this)
        },
        _removeReference: function(t, e) {
            delete this._byId[t.cid];
            var i = this.modelId(t.attributes);
            if (i != null)
                delete this._byId[i];
            if (this === t.collection)
                delete t.collection;
            t.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(t, e, i, r) {
            if (e) {
                if ((t === "add" || t === "remove") && i !== this)
                    return;
                if (t === "destroy")
                    this.remove(e, r);
                if (t === "change") {
                    var n = this.modelId(e.previousAttributes());
                    var s = this.modelId(e.attributes);
                    if (n !== s) {
                        if (n != null)
                            delete this._byId[n];
                        if (s != null)
                            this._byId[s] = e
                    }
                }
            }
            this.trigger.apply(this, arguments)
        }
    });
    var S = {
        forEach: 3,
        each: 3,
        map: 3,
        collect: 3,
        reduce: 0,
        foldl: 0,
        inject: 0,
        reduceRight: 0,
        foldr: 0,
        find: 3,
        detect: 3,
        filter: 3,
        select: 3,
        reject: 3,
        every: 3,
        all: 3,
        some: 3,
        any: 3,
        include: 3,
        includes: 3,
        contains: 3,
        invoke: 0,
        max: 3,
        min: 3,
        toArray: 1,
        size: 1,
        first: 3,
        head: 3,
        take: 3,
        initial: 3,
        rest: 3,
        tail: 3,
        drop: 3,
        last: 3,
        without: 0,
        difference: 0,
        indexOf: 3,
        shuffle: 1,
        lastIndexOf: 3,
        isEmpty: 1,
        chain: 1,
        sample: 3,
        partition: 3,
        groupBy: 3,
        countBy: 3,
        sortBy: 3,
        indexBy: 3,
        findIndex: 3,
        findLastIndex: 3
    };
    h(x, S, "models");
    var k = e.View = function(t) {
        this.cid = i.uniqueId("view");
        i.extend(this, i.pick(t, P));
        this._ensureElement();
        this.initialize.apply(this, arguments)
    }
    ;
    var T = /^(\S+)\s*(.*)$/;
    var P = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    i.extend(k.prototype, u, {
        tagName: "div",
        $: function(t) {
            return this.$el.find(t)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            this._removeElement();
            this.stopListening();
            return this
        },
        _removeElement: function() {
            this.$el.remove()
        },
        setElement: function(t) {
            this.undelegateEvents();
            this._setElement(t);
            this.delegateEvents();
            return this
        },
        _setElement: function(t) {
            this.$el = t instanceof e.$ ? t : e.$(t);
            this.el = this.$el[0]
        },
        delegateEvents: function(t) {
            t || (t = i.result(this, "events"));
            if (!t)
                return this;
            this.undelegateEvents();
            for (var e in t) {
                var r = t[e];
                if (!i.isFunction(r))
                    r = this[r];
                if (!r)
                    continue;
                var n = e.match(T);
                this.delegate(n[1], n[2], i.bind(r, this))
            }
            return this
        },
        delegate: function(t, e, i) {
            this.$el.on(t + ".delegateEvents" + this.cid, e, i);
            return this
        },
        undelegateEvents: function() {
            if (this.$el)
                this.$el.off(".delegateEvents" + this.cid);
            return this
        },
        undelegate: function(t, e, i) {
            this.$el.off(t + ".delegateEvents" + this.cid, e, i);
            return this
        },
        _createElement: function(t) {
            return document.createElement(t)
        },
        _ensureElement: function() {
            if (!this.el) {
                var t = i.extend({}, i.result(this, "attributes"));
                if (this.id)
                    t.id = i.result(this, "id");
                if (this.className)
                    t["class"] = i.result(this, "className");
                this.setElement(this._createElement(i.result(this, "tagName")));
                this._setAttributes(t)
            } else {
                this.setElement(i.result(this, "el"))
            }
        },
        _setAttributes: function(t) {
            this.$el.attr(t)
        }
    });
    e.sync = function(t, r, n) {
        var s = H[t];
        i.defaults(n || (n = {}), {
            emulateHTTP: e.emulateHTTP,
            emulateJSON: e.emulateJSON
        });
        var a = {
            type: s,
            dataType: "json"
        };
        if (!n.url) {
            a.url = i.result(r, "url") || F()
        }
        if (n.data == null && r && (t === "create" || t === "update" || t === "patch")) {
            a.contentType = "application/json";
            a.data = JSON.stringify(n.attrs || r.toJSON(n))
        }
        if (n.emulateJSON) {
            a.contentType = "application/x-www-form-urlencoded";
            a.data = a.data ? {
                model: a.data
            } : {}
        }
        if (n.emulateHTTP && (s === "PUT" || s === "DELETE" || s === "PATCH")) {
            a.type = "POST";
            if (n.emulateJSON)
                a.data._method = s;
            var h = n.beforeSend;
            n.beforeSend = function(t) {
                t.setRequestHeader("X-HTTP-Method-Override", s);
                if (h)
                    return h.apply(this, arguments)
            }
        }
        if (a.type !== "GET" && !n.emulateJSON) {
            a.processData = false
        }
        var o = n.error;
        n.error = function(t, e, i) {
            n.textStatus = e;
            n.errorThrown = i;
            if (o)
                o.call(n.context, t, e, i)
        }
        ;
        var l = n.xhr = e.ajax(i.extend(a, n));
        r.trigger("request", r, l, n);
        return l
    }
    ;
    var H = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    e.ajax = function() {
        return e.$.ajax.apply(e.$, arguments)
    }
    ;
    var $ = e.Router = function(t) {
        t || (t = {});
        if (t.routes)
            this.routes = t.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    }
    ;
    var A = /\((.*?)\)/g;
    var C = /(\(\?)?:\w+/g;
    var R = /\*\w+/g;
    var j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    i.extend($.prototype, u, {
        initialize: function() {},
        route: function(t, r, n) {
            if (!i.isRegExp(t))
                t = this._routeToRegExp(t);
            if (i.isFunction(r)) {
                n = r;
                r = ""
            }
            if (!n)
                n = this[r];
            var s = this;
            e.history.route(t, function(i) {
                var a = s._extractParameters(t, i);
                if (s.execute(n, a, r) !== false) {
                    s.trigger.apply(s, ["route:" + r].concat(a));
                    s.trigger("route", r, a);
                    e.history.trigger("route", s, r, a)
                }
            });
            return this
        },
        execute: function(t, e, i) {
            if (t)
                t.apply(this, e)
        },
        navigate: function(t, i) {
            e.history.navigate(t, i);
            return this
        },
        _bindRoutes: function() {
            if (!this.routes)
                return;
            this.routes = i.result(this, "routes");
            var t, e = i.keys(this.routes);
            while ((t = e.pop()) != null) {
                this.route(t, this.routes[t])
            }
        },
        _routeToRegExp: function(t) {
            t = t.replace(j, "\\$&").replace(A, "(?:$1)?").replace(C, function(t, e) {
                return e ? t : "([^/?]+)"
            }).replace(R, "([^?]*?)");
            return new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
        },
        _extractParameters: function(t, e) {
            var r = t.exec(e).slice(1);
            return i.map(r, function(t, e) {
                if (e === r.length - 1)
                    return t || null;
                return t ? decodeURIComponent(t) : null
            })
        }
    });
    var N = e.History = function() {
        this.handlers = [];
        this.checkUrl = i.bind(this.checkUrl, this);
        if (typeof window !== "undefined") {
            this.location = window.location;
            this.history = window.history
        }
    }
    ;
    var M = /^[#\/]|\s+$/g;
    var O = /^\/+|\/+$/g;
    var U = /#.*$/;
    N.started = false;
    i.extend(N.prototype, u, {
        interval: 50,
        atRoot: function() {
            var t = this.location.pathname.replace(/[^\/]$/, "$&/");
            return t === this.root && !this.getSearch()
        },
        matchRoot: function() {
            var t = this.decodeFragment(this.location.pathname);
            var e = t.slice(0, this.root.length - 1) + "/";
            return e === this.root
        },
        decodeFragment: function(t) {
            return decodeURI(t.replace(/%25/g, "%2525"))
        },
        getSearch: function() {
            var t = this.location.href.replace(/#.*/, "").match(/\?.+/);
            return t ? t[0] : ""
        },
        getHash: function(t) {
            var e = (t || this).location.href.match(/#(.*)$/);
            return e ? e[1] : ""
        },
        getPath: function() {
            var t = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
            return t.charAt(0) === "/" ? t.slice(1) : t
        },
        getFragment: function(t) {
            if (t == null) {
                if (this._usePushState || !this._wantsHashChange) {
                    t = this.getPath()
                } else {
                    t = this.getHash()
                }
            }
            return t.replace(M, "")
        },
        start: function(t) {
            if (N.started)
                throw new Error("Backbone.history has already been started");
            N.started = true;
            this.options = i.extend({
                root: "/"
            }, this.options, t);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._hasHashChange = "onhashchange"in window && (document.documentMode === void 0 || document.documentMode > 7);
            this._useHashChange = this._wantsHashChange && this._hasHashChange;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.history && this.history.pushState);
            this._usePushState = this._wantsPushState && this._hasPushState;
            this.fragment = this.getFragment();
            this.root = ("/" + this.root + "/").replace(O, "/");
            if (this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !this.atRoot()) {
                    var e = this.root.slice(0, -1) || "/";
                    this.location.replace(e + "#" + this.getPath());
                    return true
                } else if (this._hasPushState && this.atRoot()) {
                    this.navigate(this.getHash(), {
                        replace: true
                    })
                }
            }
            if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
                this.iframe = document.createElement("iframe");
                this.iframe.src = "javascript:0";
                this.iframe.style.display = "none";
                this.iframe.tabIndex = -1;
                var r = document.body;
                var n = r.insertBefore(this.iframe, r.firstChild).contentWindow;
                n.document.open();
                n.document.close();
                n.location.hash = "#" + this.fragment
            }
            var s = window.addEventListener || function(t, e) {
                return attachEvent("on" + t, e)
            }
            ;
            if (this._usePushState) {
                s("popstate", this.checkUrl, false)
            } else if (this._useHashChange && !this.iframe) {
                s("hashchange", this.checkUrl, false)
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval)
            }
            if (!this.options.silent)
                return this.loadUrl()
        },
        stop: function() {
            var t = window.removeEventListener || function(t, e) {
                return detachEvent("on" + t, e)
            }
            ;
            if (this._usePushState) {
                t("popstate", this.checkUrl, false)
            } else if (this._useHashChange && !this.iframe) {
                t("hashchange", this.checkUrl, false)
            }
            if (this.iframe) {
                document.body.removeChild(this.iframe);
                this.iframe = null
            }
            if (this._checkUrlInterval)
                clearInterval(this._checkUrlInterval);
            N.started = false
        },
        route: function(t, e) {
            this.handlers.unshift({
                route: t,
                callback: e
            })
        },
        checkUrl: function(t) {
            var e = this.getFragment();
            if (e === this.fragment && this.iframe) {
                e = this.getHash(this.iframe.contentWindow)
            }
            if (e === this.fragment)
                return false;
            if (this.iframe)
                this.navigate(e);
            this.loadUrl()
        },
        loadUrl: function(t) {
            if (!this.matchRoot())
                return false;
            t = this.fragment = this.getFragment(t);
            return i.some(this.handlers, function(e) {
                if (e.route.test(t)) {
                    e.callback(t);
                    return true
                }
            })
        },
        navigate: function(t, e) {
            if (!N.started)
                return false;
            if (!e || e === true)
                e = {
                    trigger: !!e
                };
            t = this.getFragment(t || "");
            var i = this.root;
            if (t === "" || t.charAt(0) === "?") {
                i = i.slice(0, -1) || "/"
            }
            var r = i + t;
            t = this.decodeFragment(t.replace(U, ""));
            if (this.fragment === t)
                return;
            this.fragment = t;
            if (this._usePushState) {
                this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, r)
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, t, e.replace);
                if (this.iframe && t !== this.getHash(this.iframe.contentWindow)) {
                    var n = this.iframe.contentWindow;
                    if (!e.replace) {
                        n.document.open();
                        n.document.close()
                    }
                    this._updateHash(n.location, t, e.replace)
                }
            } else {
                return this.location.assign(r)
            }
            if (e.trigger)
                return this.loadUrl(t)
        },
        _updateHash: function(t, e, i) {
            if (i) {
                var r = t.href.replace(/(javascript:|#).*$/, "");
                t.replace(r + "#" + e)
            } else {
                t.hash = "#" + e
            }
        }
    });
    e.history = new N;
    var q = function(t, e) {
        var r = this;
        var n;
        if (t && i.has(t, "constructor")) {
            n = t.constructor
        } else {
            n = function() {
                return r.apply(this, arguments)
            }
        }
        i.extend(n, r, e);
        n.prototype = i.create(r.prototype, t);
        n.prototype.constructor = n;
        n.__super__ = r.prototype;
        return n
    };
    y.extend = x.extend = $.extend = k.extend = N.extend = q;
    var F = function() {
        throw new Error('A "url" property or function must be specified')
    };
    var B = function(t, e) {
        var i = e.error;
        e.error = function(r) {
            if (i)
                i.call(e.context, t, r, e);
            t.trigger("error", t, r, e)
        }
    };
    return e
});

;window.wp = window.wp || {},
function(a) {
    var b = "undefined" == typeof _wpUtilSettings ? {} : _wpUtilSettings;
    wp.template = _.memoize(function(b) {
        var c, d = {
            evaluate: /<#([\s\S]+?)#>/g,
            interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
            escape: /\{\{([^\}]+?)\}\}(?!\})/g,
            variable: "data"
        };
        return function(e) {
            return (c = c || _.template(a("#tmpl-" + b).html(), d))(e)
        }
    }),
    wp.ajax = {
        settings: b.ajax || {},
        post: function(a, b) {
            return wp.ajax.send({
                data: _.isObject(a) ? a : _.extend(b || {}, {
                    action: a
                })
            })
        },
        send: function(b, c) {
            var d, e;
            return _.isObject(b) ? c = b : (c = c || {},
            c.data = _.extend(c.data || {}, {
                action: b
            })),
            c = _.defaults(c || {}, {
                type: "POST",
                url: wp.ajax.settings.url,
                context: this
            }),
            e = a.Deferred(function(b) {
                c.success && b.done(c.success),
                c.error && b.fail(c.error),
                delete c.success,
                delete c.error,
                b.jqXHR = a.ajax(c).done(function(a) {
                    "1" !== a && 1 !== a || (a = {
                        success: !0
                    }),
                    _.isObject(a) && !_.isUndefined(a.success) ? b[a.success ? "resolveWith" : "rejectWith"](this, [a.data]) : b.rejectWith(this, [a])
                }).fail(function() {
                    b.rejectWith(this, arguments)
                })
            }),
            d = e.promise(),
            d.abort = function() {
                return e.jqXHR.abort(),
                this
            }
            ,
            d
        }
    }
}(jQuery);
;window.wp = window.wp || {},
function(a) {
    wp.Backbone = {},
    wp.Backbone.Subviews = function(a, b) {
        this.view = a,
        this._views = _.isArray(b) ? {
            "": b
        } : b || {}
    }
    ,
    wp.Backbone.Subviews.extend = Backbone.Model.extend,
    _.extend(wp.Backbone.Subviews.prototype, {
        all: function() {
            return _.flatten(_.values(this._views))
        },
        get: function(a) {
            return a = a || "",
            this._views[a]
        },
        first: function(a) {
            var b = this.get(a);
            return b && b.length ? b[0] : null
        },
        set: function(a, b, c) {
            var d, e;
            return _.isString(a) || (c = b,
            b = a,
            a = ""),
            c = c || {},
            b = _.isArray(b) ? b : [b],
            d = this.get(a),
            e = b,
            d && (c.add ? _.isUndefined(c.at) ? e = d.concat(b) : (e = d,
            e.splice.apply(e, [c.at, 0].concat(b))) : (_.each(e, function(a) {
                a.__detach = !0
            }),
            _.each(d, function(a) {
                a.__detach ? a.$el.detach() : a.remove()
            }),
            _.each(e, function(a) {
                delete a.__detach
            }))),
            this._views[a] = e,
            _.each(b, function(b) {
                var c = b.Views || wp.Backbone.Subviews
                  , d = b.views = b.views || new c(b);
                d.parent = this.view,
                d.selector = a
            }, this),
            c.silent || this._attach(a, b, _.extend({
                ready: this._isReady()
            }, c)),
            this
        },
        add: function(a, b, c) {
            return _.isString(a) || (c = b,
            b = a,
            a = ""),
            this.set(a, b, _.extend({
                add: !0
            }, c))
        },
        unset: function(a, b, c) {
            var d;
            return _.isString(a) || (c = b,
            b = a,
            a = ""),
            b = b || [],
            (d = this.get(a)) && (b = _.isArray(b) ? b : [b],
            this._views[a] = b.length ? _.difference(d, b) : []),
            c && c.silent || _.invoke(b, "remove"),
            this
        },
        detach: function() {
            return a(_.pluck(this.all(), "el")).detach(),
            this
        },
        render: function() {
            var a = {
                ready: this._isReady()
            };
            return _.each(this._views, function(b, c) {
                this._attach(c, b, a)
            }, this),
            this.rendered = !0,
            this
        },
        remove: function(a) {
            return a && a.silent || (this.parent && this.parent.views && this.parent.views.unset(this.selector, this.view, {
                silent: !0
            }),
            delete this.parent,
            delete this.selector),
            _.invoke(this.all(), "remove"),
            this._views = [],
            this
        },
        replace: function(a, b) {
            return a.html(b),
            this
        },
        insert: function(a, b, c) {
            var d, e = c && c.at;
            return _.isNumber(e) && (d = a.children()).length > e ? d.eq(e).before(b) : a.append(b),
            this
        },
        ready: function() {
            this.view.trigger("ready"),
            _.chain(this.all()).map(function(a) {
                return a.views
            }).flatten().where({
                attached: !0
            }).invoke("ready")
        },
        _attach: function(a, b, c) {
            var d, e = a ? this.view.$(a) : this.view.$el;
            return e.length ? (d = _.chain(b).pluck("views").flatten().value(),
            _.each(d, function(a) {
                a.rendered || (a.view.render(),
                a.rendered = !0)
            }, this),
            this[c.add ? "insert" : "replace"](e, _.pluck(b, "el"), c),
            _.each(d, function(a) {
                a.attached = !0,
                c.ready && a.ready()
            }, this),
            this) : this
        },
        _isReady: function() {
            for (var a = this.view.el; a; ) {
                if (a === document.body)
                    return !0;
                a = a.parentNode
            }
            return !1
        }
    }),
    wp.Backbone.View = Backbone.View.extend({
        Subviews: wp.Backbone.Subviews,
        constructor: function(a) {
            this.views = new this.Subviews(this,this.views),
            this.on("ready", this.ready, this),
            this.options = a || {},
            Backbone.View.apply(this, arguments)
        },
        remove: function() {
            var a = Backbone.View.prototype.remove.apply(this, arguments);
            return this.views && this.views.remove(),
            a
        },
        render: function() {
            var a;
            return this.prepare && (a = this.prepare()),
            this.views.detach(),
            this.template && (a = a || {},
            this.trigger("prepare", a),
            this.$el.html(this.template(a))),
            this.views.render(),
            this
        },
        prepare: function() {
            return this.options
        },
        ready: function() {}
    })
}(jQuery);
;!function(a) {
    function b(d) {
        if (c[d])
            return c[d].exports;
        var e = c[d] = {
            i: d,
            l: !1,
            exports: {}
        };
        return a[d].call(e.exports, e, e.exports, b),
        e.l = !0,
        e.exports
    }
    var c = {};
    return b.m = a,
    b.c = c,
    b.d = function(a, c, d) {
        b.o(a, c) || Object.defineProperty(a, c, {
            configurable: !1,
            enumerable: !0,
            get: d
        })
    }
    ,
    b.n = function(a) {
        var c = a && a.__esModule ? function() {
            return a["default"]
        }
        : function() {
            return a
        }
        ;
        return b.d(c, "a", c),
        c
    }
    ,
    b.o = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    ,
    b.p = "",
    b(b.s = 20)
}({
    20: function(a, b, c) {
        var d, e, f, g, h = jQuery;
        window.wp = window.wp || {},
        g = wp.media = function(a) {
            var b, c = g.view.MediaFrame;
            if (c)
                return a = _.defaults(a || {}, {
                    frame: "select"
                }),
                "select" === a.frame && c.Select ? b = new c.Select(a) : "post" === a.frame && c.Post ? b = new c.Post(a) : "manage" === a.frame && c.Manage ? b = new c.Manage(a) : "image" === a.frame && c.ImageDetails ? b = new c.ImageDetails(a) : "audio" === a.frame && c.AudioDetails ? b = new c.AudioDetails(a) : "video" === a.frame && c.VideoDetails ? b = new c.VideoDetails(a) : "edit-attachments" === a.frame && c.EditAttachments && (b = new c.EditAttachments(a)),
                delete a.frame,
                g.frame = b,
                b
        }
        ,
        _.extend(g, {
            model: {},
            view: {},
            controller: {},
            frames: {}
        }),
        f = g.model.l10n = window._wpMediaModelsL10n || {},
        g.model.settings = f.settings || {},
        delete f.settings,
        d = g.model.Attachment = c(21),
        e = g.model.Attachments = c(22),
        g.model.Query = c(23),
        g.model.PostImage = c(24),
        g.model.Selection = c(25),
        g.compare = function(a, b, c, d) {
            return _.isEqual(a, b) ? c === d ? 0 : c > d ? -1 : 1 : a > b ? -1 : 1
        }
        ,
        _.extend(g, {
            template: wp.template,
            post: wp.ajax.post,
            ajax: wp.ajax.send,
            fit: function(a) {
                var b, c = a.width, d = a.height, e = a.maxWidth, f = a.maxHeight;
                return _.isUndefined(e) || _.isUndefined(f) ? _.isUndefined(f) ? b = "width" : _.isUndefined(e) && d > f && (b = "height") : b = c / d > e / f ? "width" : "height",
                "width" === b && c > e ? {
                    width: e,
                    height: Math.round(e * d / c)
                } : "height" === b && d > f ? {
                    width: Math.round(f * c / d),
                    height: f
                } : {
                    width: c,
                    height: d
                }
            },
            truncate: function(a, b, c) {
                return b = b || 30,
                c = c || "&hellip;",
                a.length <= b ? a : a.substr(0, b / 2) + c + a.substr(-1 * b / 2)
            }
        }),
        g.attachment = function(a) {
            return d.get(a)
        }
        ,
        e.all = new e,
        g.query = function(a) {
            return new e(null,{
                props: _.extend(_.defaults(a || {}, {
                    orderby: "date"
                }), {
                    query: !0
                })
            })
        }
        ,
        h(window).on("unload", function() {
            window.wp = null
        })
    },
    21: function(a, b) {
        var c, d = Backbone.$;
        c = Backbone.Model.extend({
            sync: function(a, b, c) {
                return _.isUndefined(this.id) ? d.Deferred().rejectWith(this).promise() : "read" === a ? (c = c || {},
                c.context = this,
                c.data = _.extend(c.data || {}, {
                    action: "get-attachment",
                    id: this.id
                }),
                wp.media.ajax(c)) : "update" === a ? this.get("nonces") && this.get("nonces").update ? (c = c || {},
                c.context = this,
                c.data = _.extend(c.data || {}, {
                    action: "save-attachment",
                    id: this.id,
                    nonce: this.get("nonces").update,
                    post_id: wp.media.model.settings.post.id
                }),
                b.hasChanged() && (c.data.changes = {},
                _.each(b.changed, function(a, b) {
                    c.data.changes[b] = this.get(b)
                }, this)),
                wp.media.ajax(c)) : d.Deferred().rejectWith(this).promise() : "delete" === a ? (c = c || {},
                c.wait || (this.destroyed = !0),
                c.context = this,
                c.data = _.extend(c.data || {}, {
                    action: "delete-post",
                    id: this.id,
                    _wpnonce: this.get("nonces")["delete"]
                }),
                wp.media.ajax(c).done(function() {
                    this.destroyed = !0
                }).fail(function() {
                    this.destroyed = !1
                })) : Backbone.Model.prototype.sync.apply(this, arguments)
            },
            parse: function(a) {
                return a ? (a.date = new Date(a.date),
                a.modified = new Date(a.modified),
                a) : a
            },
            saveCompat: function(a, b) {
                var c = this;
                return this.get("nonces") && this.get("nonces").update ? wp.media.post("save-attachment-compat", _.defaults({
                    id: this.id,
                    nonce: this.get("nonces").update,
                    post_id: wp.media.model.settings.post.id
                }, a)).done(function(a, d, e) {
                    c.set(c.parse(a, e), b)
                }) : d.Deferred().rejectWith(this).promise()
            }
        }, {
            create: function(a) {
                var b = wp.media.model.Attachments;
                return b.all.push(a)
            },
            get: _.memoize(function(a, b) {
                var c = wp.media.model.Attachments;
                return c.all.push(b || {
                    id: a
                })
            })
        }),
        a.exports = c
    },
    22: function(a, b) {
        var c = Backbone.Collection.extend({
            model: wp.media.model.Attachment,
            initialize: function(a, b) {
                b = b || {},
                this.props = new Backbone.Model,
                this.filters = b.filters || {},
                this.props.on("change", this._changeFilteredProps, this),
                this.props.on("change:order", this._changeOrder, this),
                this.props.on("change:orderby", this._changeOrderby, this),
                this.props.on("change:query", this._changeQuery, this),
                this.props.set(_.defaults(b.props || {})),
                b.observe && this.observe(b.observe)
            },
            _changeOrder: function() {
                this.comparator && this.sort()
            },
            _changeOrderby: function(a, b) {
                this.comparator && this.comparator !== c.comparator || (b && "post__in" !== b ? this.comparator = c.comparator : delete this.comparator)
            },
            _changeQuery: function(a, b) {
                b ? (this.props.on("change", this._requery, this),
                this._requery()) : this.props.off("change", this._requery, this)
            },
            _changeFilteredProps: function(a) {
                if (!this.props.get("query")) {
                    var b = _.chain(a.changed).map(function(b, d) {
                        var e = c.filters[d]
                          , f = a.get(d);
                        if (e) {
                            if (f && !this.filters[d])
                                this.filters[d] = e;
                            else {
                                if (f || this.filters[d] !== e)
                                    return;
                                delete this.filters[d]
                            }
                            return !0
                        }
                    }, this).any().value();
                    b && (this._source || (this._source = new c(this.models)),
                    this.reset(this._source.filter(this.validator, this)))
                }
            },
            validateDestroyed: !1,
            validator: function(a) {
                return !(!_.isUndefined(a.attributes.context) && "" !== a.attributes.context) && (!(!this.validateDestroyed && a.destroyed) && _.all(this.filters, function(b) {
                    return !!b.call(this, a)
                }, this))
            },
            validate: function(a, b) {
                var c = this.validator(a)
                  , d = !!this.get(a.cid);
                return !c && d ? this.remove(a, b) : c && !d && this.add(a, b),
                this
            },
            validateAll: function(a, b) {
                return b = b || {},
                _.each(a.models, function(a) {
                    this.validate(a, {
                        silent: !0
                    })
                }, this),
                b.silent || this.trigger("reset", this, b),
                this
            },
            observe: function(a) {
                return this.observers = this.observers || [],
                this.observers.push(a),
                a.on("add change remove", this._validateHandler, this),
                a.on("reset", this._validateAllHandler, this),
                this.validateAll(a),
                this
            },
            unobserve: function(a) {
                return a ? (a.off(null, null, this),
                this.observers = _.without(this.observers, a)) : (_.each(this.observers, function(a) {
                    a.off(null, null, this)
                }, this),
                delete this.observers),
                this
            },
            _validateHandler: function(a, b, c) {
                return c = b === this.mirroring ? c : {
                    silent: c && c.silent
                },
                this.validate(a, c)
            },
            _validateAllHandler: function(a, b) {
                return this.validateAll(a, b)
            },
            mirror: function(a) {
                return this.mirroring && this.mirroring === a ? this : (this.unmirror(),
                this.mirroring = a,
                this.reset([], {
                    silent: !0
                }),
                this.observe(a),
                this)
            },
            unmirror: function() {
                this.mirroring && (this.unobserve(this.mirroring),
                delete this.mirroring)
            },
            more: function(a) {
                var b = jQuery.Deferred()
                  , c = this.mirroring
                  , d = this;
                return c && c.more ? (c.more(a).done(function() {
                    this === d.mirroring && b.resolveWith(this)
                }),
                b.promise()) : b.resolveWith(this).promise()
            },
            hasMore: function() {
                return !!this.mirroring && this.mirroring.hasMore()
            },
            parse: function(a, b) {
                return _.isArray(a) || (a = [a]),
                _.map(a, function(a) {
                    var c, d, e;
                    return a instanceof Backbone.Model ? (c = a.get("id"),
                    a = a.attributes) : c = a.id,
                    d = wp.media.model.Attachment.get(c),
                    e = d.parse(a, b),
                    _.isEqual(d.attributes, e) || d.set(e),
                    d
                })
            },
            _requery: function(a) {
                var b;
                this.props.get("query") && (b = this.props.toJSON(),
                b.cache = !0 !== a,
                this.mirror(wp.media.model.Query.get(b)))
            },
            saveMenuOrder: function() {
                if ("menuOrder" === this.props.get("orderby")) {
                    var a = this.chain().filter(function(a) {
                        return !_.isUndefined(a.id)
                    }).map(function(a, b) {
                        return b += 1,
                        a.set("menuOrder", b),
                        [a.id, b]
                    }).object().value();
                    if (!_.isEmpty(a))
                        return wp.media.post("save-attachment-order", {
                            nonce: wp.media.model.settings.post.nonce,
                            post_id: wp.media.model.settings.post.id,
                            attachments: a
                        })
                }
            }
        }, {
            comparator: function(a, b, c) {
                var d = this.props.get("orderby")
                  , e = this.props.get("order") || "DESC"
                  , f = a.cid
                  , g = b.cid;
                return a = a.get(d),
                b = b.get(d),
                "date" !== d && "modified" !== d || (a = a || new Date,
                b = b || new Date),
                c && c.ties && (f = g = null),
                "DESC" === e ? wp.media.compare(a, b, f, g) : wp.media.compare(b, a, g, f)
            },
            filters: {
                search: function(a) {
                    return !this.props.get("search") || _.any(["title", "filename", "description", "caption", "name"], function(b) {
                        var c = a.get(b);
                        return c && -1 !== c.search(this.props.get("search"))
                    }, this)
                },
                type: function(a) {
                    var b, c, d = this.props.get("type"), e = a.toJSON();
                    return !(d && (!_.isArray(d) || d.length)) || (b = e.mime || e.file && e.file.type || "",
                    c = _.isArray(d) ? _.find(d, function(a) {
                        return -1 !== b.indexOf(a)
                    }) : -1 !== b.indexOf(d))
                },
                uploadedTo: function(a) {
                    var b = this.props.get("uploadedTo");
                    return !!_.isUndefined(b) || b === a.get("uploadedTo")
                },
                status: function(a) {
                    var b = this.props.get("status");
                    return !!_.isUndefined(b) || b === a.get("status")
                }
            }
        });
        a.exports = c
    },
    23: function(a, b) {
        var c, d = wp.media.model.Attachments;
        c = d.extend({
            initialize: function(a, b) {
                var c;
                b = b || {},
                d.prototype.initialize.apply(this, arguments),
                this.args = b.args,
                this._hasMore = !0,
                this.created = new Date,
                this.filters.order = function(a) {
                    var b = this.props.get("orderby")
                      , c = this.props.get("order");
                    return !this.comparator || (this.length ? 1 !== this.comparator(a, this.last(), {
                        ties: !0
                    }) : "DESC" !== c || "date" !== b && "modified" !== b ? "ASC" === c && "menuOrder" === b && 0 === a.get(b) : a.get(b) >= this.created)
                }
                ,
                c = ["s", "order", "orderby", "posts_per_page", "post_mime_type", "post_parent", "author"],
                wp.Uploader && _(this.args).chain().keys().difference(c).isEmpty().value() && this.observe(wp.Uploader.queue)
            },
            hasMore: function() {
                return this._hasMore
            },
            more: function(a) {
                var b = this;
                return this._more && "pending" === this._more.state() ? this._more : this.hasMore() ? (a = a || {},
                a.remove = !1,
                this._more = this.fetch(a).done(function(a) {
                    (_.isEmpty(a) || -1 === this.args.posts_per_page || a.length < this.args.posts_per_page) && (b._hasMore = !1)
                })) : jQuery.Deferred().resolveWith(this).promise()
            },
            sync: function(a, b, c) {
                var e, f;
                return "read" === a ? (c = c || {},
                c.context = this,
                c.data = _.extend(c.data || {}, {
                    action: "query-attachments",
                    post_id: wp.media.model.settings.post.id
                }),
                e = _.clone(this.args),
                -1 !== e.posts_per_page && (e.paged = Math.round(this.length / e.posts_per_page) + 1),
                c.data.query = e,
                wp.media.ajax(c)) : (f = d.prototype.sync ? d.prototype : Backbone,
                f.sync.apply(this, arguments))
            }
        }, {
            defaultProps: {
                orderby: "date",
                order: "DESC"
            },
            defaultArgs: {
                posts_per_page: 40
            },
            orderby: {
                allowed: ["name", "author", "date", "title", "modified", "uploadedTo", "id", "post__in", "menuOrder"],
                valuemap: {
                    id: "ID",
                    uploadedTo: "parent",
                    menuOrder: "menu_order ID"
                }
            },
            propmap: {
                search: "s",
                type: "post_mime_type",
                perPage: "posts_per_page",
                menuOrder: "menu_order",
                uploadedTo: "post_parent",
                status: "post_status",
                include: "post__in",
                exclude: "post__not_in",
                author: "author"
            },
            get: function() {
                var a = [];
                return function(b, d) {
                    var e, f = {}, g = c.orderby, h = c.defaultProps, i = !!b.cache || _.isUndefined(b.cache);
                    return delete b.query,
                    delete b.cache,
                    _.defaults(b, h),
                    b.order = b.order.toUpperCase(),
                    "DESC" !== b.order && "ASC" !== b.order && (b.order = h.order.toUpperCase()),
                    _.contains(g.allowed, b.orderby) || (b.orderby = h.orderby),
                    _.each(["include", "exclude"], function(a) {
                        b[a] && !_.isArray(b[a]) && (b[a] = [b[a]])
                    }),
                    _.each(b, function(a, b) {
                        _.isNull(a) || (f[c.propmap[b] || b] = a)
                    }),
                    _.defaults(f, c.defaultArgs),
                    f.orderby = g.valuemap[b.orderby] || b.orderby,
                    i ? e = _.find(a, function(a) {
                        return _.isEqual(a.args, f)
                    }) : a = [],
                    e || (e = new c([],_.extend(d || {}, {
                        props: b,
                        args: f
                    })),
                    a.push(e)),
                    e
                }
            }()
        }),
        a.exports = c
    },
    24: function(a, b) {
        var c = Backbone.Model.extend({
            initialize: function(a) {
                var b = wp.media.model.Attachment;
                this.attachment = !1,
                a.attachment_id && (this.attachment = b.get(a.attachment_id),
                this.attachment.get("url") ? (this.dfd = jQuery.Deferred(),
                this.dfd.resolve()) : this.dfd = this.attachment.fetch(),
                this.bindAttachmentListeners()),
                this.on("change:link", this.updateLinkUrl, this),
                this.on("change:size", this.updateSize, this),
                this.setLinkTypeFromUrl(),
                this.setAspectRatio(),
                this.set("originalUrl", a.url)
            },
            bindAttachmentListeners: function() {
                this.listenTo(this.attachment, "sync", this.setLinkTypeFromUrl),
                this.listenTo(this.attachment, "sync", this.setAspectRatio),
                this.listenTo(this.attachment, "change", this.updateSize)
            },
            changeAttachment: function(a, b) {
                this.stopListening(this.attachment),
                this.attachment = a,
                this.bindAttachmentListeners(),
                this.set("attachment_id", this.attachment.get("id")),
                this.set("caption", this.attachment.get("caption")),
                this.set("alt", this.attachment.get("alt")),
                this.set("size", b.get("size")),
                this.set("align", b.get("align")),
                this.set("link", b.get("link")),
                this.updateLinkUrl(),
                this.updateSize()
            },
            setLinkTypeFromUrl: function() {
                var a, b = this.get("linkUrl");
                return b ? (a = "custom",
                this.attachment ? this.attachment.get("url") === b ? a = "file" : this.attachment.get("link") === b && (a = "post") : this.get("url") === b && (a = "file"),
                void this.set("link", a)) : void this.set("link", "none")
            },
            updateLinkUrl: function() {
                var a, b = this.get("link");
                switch (b) {
                case "file":
                    a = this.attachment ? this.attachment.get("url") : this.get("url"),
                    this.set("linkUrl", a);
                    break;
                case "post":
                    this.set("linkUrl", this.attachment.get("link"));
                    break;
                case "none":
                    this.set("linkUrl", "")
                }
            },
            updateSize: function() {
                var a;
                if (this.attachment) {
                    if ("custom" === this.get("size"))
                        return this.set("width", this.get("customWidth")),
                        this.set("height", this.get("customHeight")),
                        void this.set("url", this.get("originalUrl"));
                    a = this.attachment.get("sizes")[this.get("size")],
                    a && (this.set("url", a.url),
                    this.set("width", a.width),
                    this.set("height", a.height))
                }
            },
            setAspectRatio: function() {
                var a;
                return this.attachment && this.attachment.get("sizes") && (a = this.attachment.get("sizes").full) ? void this.set("aspectRatio", a.width / a.height) : void this.set("aspectRatio", this.get("customWidth") / this.get("customHeight"))
            }
        });
        a.exports = c
    },
    25: function(a, b) {
        var c, d = wp.media.model.Attachments;
        c = d.extend({
            initialize: function(a, b) {
                d.prototype.initialize.apply(this, arguments),
                this.multiple = b && b.multiple,
                this.on("add remove reset", _.bind(this.single, this, !1))
            },
            add: function(a, b) {
                return this.multiple || this.remove(this.models),
                d.prototype.add.call(this, a, b)
            },
            single: function(a) {
                var b = this._single;
                return a && (this._single = a),
                this._single && !this.get(this._single.cid) && delete this._single,
                this._single = this._single || this.last(),
                this._single !== b && (b && (b.trigger("selection:unsingle", b, this),
                this.get(b.cid) || this.trigger("selection:unsingle", b, this)),
                this._single && this._single.trigger("selection:single", this._single, this)),
                this._single
            }
        }),
        a.exports = c
    }
});
