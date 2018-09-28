(function(d) {
    var p = {}, e, a, h = document, i = window, f = h.documentElement, j = d.expando;
    d.event.special.inview = {
        add: function(a) {
            p[a.guid + "-" + this[j]] = {
                data: a,
                $element: d(this)
            }
        },
        remove: function(a) {
            try {
                delete p[a.guid + "-" + this[j]]
            } catch (d) {}
        }
    };
    d(i).bind("scroll resize", function() {
        e = a = null
    });
    !f.addEventListener && f.attachEvent && f.attachEvent("onfocusin", function() {
        a = null
    });
    setInterval(function() {
        var k = d(), j, n = 0;
        d.each(p, function(a, b) {
            var c = b.data.selector
              , d = b.$element;
            k = k.add(c ? d.find(c) : d)
        });
        if (j = k.length) {
            var b;
            if (!(b = e)) {
                var g = {
                    height: i.innerHeight,
                    width: i.innerWidth
                };
                if (!g.height && ((b = h.compatMode) || !d.support.boxModel))
                    b = "CSS1Compat" === b ? f : h.body,
                    g = {
                        height: b.clientHeight,
                        width: b.clientWidth
                    };
                b = g
            }
            e = b;
            for (a = a || {
                top: i.pageYOffset || f.scrollTop || h.body.scrollTop,
                left: i.pageXOffset || f.scrollLeft || h.body.scrollLeft
            }; n < j; n++)
                if (d.contains(f, k[n])) {
                    b = d(k[n]);
                    var l = b.height()
                      , m = b.width()
                      , c = b.offset()
                      , g = b.data("inview");
                    if (!a || !e)
                        break;
                    c.top + l > a.top && c.top < a.top + e.height && c.left + m > a.left && c.left < a.left + e.width ? (m = a.left > c.left ? "right" : a.left + e.width < c.left + m ? "left" : "both",
                    l = a.top > c.top ? "bottom" : a.top + e.height < c.top + l ? "top" : "both",
                    c = m + "-" + l,
                    (!g || g !== c) && b.data("inview", c).trigger("inview", [!0, m, l])) : g && b.data("inview", !1).trigger("inview", [!1])
                }
        }
    }, 250)
}
)(jQuery);
jQuery.fn.tag = function(e) {
    var t = {
        seperator: ",",
        unique: !0,
        addOnEnter: !0,
        style: {
            list: "taglist",
            item: "tag",
            input: "input",
            remove: "delete"
        }
    };
    e = jQuery.extend(t, e),
    jQuery(this).each(function() {
        "" != (seperator = jQuery(this).attr("data-seperator")) && (e.seperator = seperator);
        var t = function(t) {
            var r = t.replace(/^\s+|\s+$/g, "");
            if ("" != r) {
                var i = jQuery("<li/>").addClass(e.style.item)
                  , a = jQuery("<span/>")
                  , l = jQuery("<span/>").html("[X]")
                  , u = jQuery("<a/>", {
                    tabindex: "-1"
                }).addClass(e.style.remove).append(l).click(function() {
                    jQuery(this).closest("li").remove(),
                    s()
                });
                if (!(e.unique && jQuery.inArray(r, y) > -1))
                    return y.push(r),
                    a.html(r),
                    i.append(a).append(" ").append(u),
                    i
            }
        }
          , r = function(r) {
            if ("" != jQuery(r).val()) {
                var i = t(jQuery(r).val());
                i ? (jQuery(r).closest("li").before(i),
                jQuery(r).val(jQuery(r).val().replace(e.seperator, "")),
                jQuery(r).width(8).val("").focus()) : (jQuery(r).val(""),
                jQuery(r).width(8)),
                s(),
                o.html("")
            }
        }
          , s = function() {
            var t = [];
            jQuery("li." + e.style.item + " > span", a).each(function() {
                t.push(jQuery(this).html())
            }),
            y = t,
            jQuery(i).val(t.join(e.seperator))
        }
          , i = jQuery(this);
        if (i.is(":input")) {
            i.hide();
            var a = jQuery("<ul/>").addClass(e.style.list).click(function() {
                jQuery(this).find("input").focus()
            })
              , l = jQuery("<input/>", {
                type: "text"
            })
              , u = i.val().split(e.seperator)
              , y = [];
            for (index in u) {
                var d = t(u[index]);
                a.append(d)
            }
            s(),
            i.after(a);
            var n = jQuery("<li/>").addClass(e.style.input)
              , o = jQuery("<span/>");
            o.hide(),
            n.append(l),
            l.after(o),
            a.append(n);
            var h = function(e) {
                o.html(jQuery(e).val().replace(/\s/g, "&nbsp;"));
                var t = "" == jQuery(e).val() ? 8 : 10;
                jQuery(e).width(o.width() + t)
            };
            l.bind("keyup", function() {
                h(this)
            }).bind("keydown", function(e) {
                h(this);
                var t = e.keyCode || e.which;
                if ("" == jQuery(this).val() && (8 == t || 46 == t)) {
                    switch (jQuery(this).width("" != jQuery(this).val() ? o.width() + 5 : 8),
                    t) {
                    case 8:
                        jQuery(this).closest("li").prev().is(".ready-to-delete") ? (jQuery(".ready-to-delete").removeClass("ready-to-delete"),
                        jQuery(this).closest("li").prev().remove()) : (jQuery(".ready-to-delete").removeClass("ready-to-delete"),
                        jQuery(this).closest("li").prev().addClass("ready-to-delete"));
                        break;
                    case 46:
                        jQuery(this).closest("li").next().is(".ready-to-delete") ? (jQuery(".ready-to-delete").removeClass("ready-to-delete"),
                        jQuery(this).closest("li").next().remove()) : (jQuery(".ready-to-delete").removeClass("ready-to-delete"),
                        jQuery(this).closest("li").next().addClass("ready-to-delete"))
                    }
                    return s(),
                    e.preventDefault(),
                    !1
                }
                jQuery(".ready-to-delete").removeClass("ready-to-delete"),
                "" == jQuery(this).val() && ((37 == t || 38 == t) && (jQuery(this).width("" != jQuery(this).val() ? o.width() + 5 : 8),
                jQuery(this).closest("li").prev().before(jQuery(this).closest("li")),
                jQuery(this).focus()),
                (39 == t || 40 == t) && (jQuery(this).width("" != jQuery(this).val() ? o.width() + 5 : 8),
                jQuery(this).closest("li").next().after(jQuery(this).closest("li")),
                jQuery(this).focus()))
            }).bind("keypress", function(t) {
                h(this);
                var s = t.keyCode || t.which;
                return e.seperator == String.fromCharCode(s) || e.seperator == s || e.addOnEnter && 13 == s ? (r(this),
                t.preventDefault(),
                !1) : void 0
            }).bind("blur", function() {
                r(this),
                jQuery(this).closest("ul").append(jQuery(this).closest("li"))
            })
        }
    })
}
;
;/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    function b(b, d) {
        var e, f, g, h = b.nodeName.toLowerCase();
        return "area" === h ? (e = b.parentNode,
        f = e.name,
        !(!b.href || !f || "map" !== e.nodeName.toLowerCase()) && (g = a("img[usemap='#" + f + "']")[0],
        !!g && c(g))) : (/^(input|select|textarea|button|object)$/.test(h) ? !b.disabled : "a" === h ? b.href || d : d) && c(b)
    }
    function c(b) {
        return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {
            return "hidden" === a.css(this, "visibility")
        }).length
    }
    a.ui = a.ui || {},
    a.extend(a.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }),
    a.fn.extend({
        scrollParent: function(b) {
            var c = this.css("position")
              , d = "absolute" === c
              , e = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/
              , f = this.parents().filter(function() {
                var b = a(this);
                return (!d || "static" !== b.css("position")) && e.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"))
            }).eq(0);
            return "fixed" !== c && f.length ? f : a(this[0].ownerDocument || document)
        },
        uniqueId: function() {
            var a = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++a)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")
            })
        }
    }),
    a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
            return function(c) {
                return !!a.data(c, b)
            }
        }) : function(b, c, d) {
            return !!a.data(b, d[3])
        }
        ,
        focusable: function(c) {
            return b(c, !isNaN(a.attr(c, "tabindex")))
        },
        tabbable: function(c) {
            var d = a.attr(c, "tabindex")
              , e = isNaN(d);
            return (e || d >= 0) && b(c, !e)
        }
    }),
    a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(b, c) {
        function d(b, c, d, f) {
            return a.each(e, function() {
                c -= parseFloat(a.css(b, "padding" + this)) || 0,
                d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0),
                f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
            }),
            c
        }
        var e = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"]
          , f = c.toLowerCase()
          , g = {
            innerWidth: a.fn.innerWidth,
            innerHeight: a.fn.innerHeight,
            outerWidth: a.fn.outerWidth,
            outerHeight: a.fn.outerHeight
        };
        a.fn["inner" + c] = function(b) {
            return void 0 === b ? g["inner" + c].call(this) : this.each(function() {
                a(this).css(f, d(this, b) + "px")
            })
        }
        ,
        a.fn["outer" + c] = function(b, e) {
            return "number" != typeof b ? g["outer" + c].call(this, b) : this.each(function() {
                a(this).css(f, d(this, b, !0, e) + "px")
            })
        }
    }),
    a.fn.addBack || (a.fn.addBack = function(a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }
    ),
    a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(b) {
        return function(c) {
            return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
        }
    }(a.fn.removeData)),
    a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
    a.fn.extend({
        focus: function(b) {
            return function(c, d) {
                return "number" == typeof c ? this.each(function() {
                    var b = this;
                    setTimeout(function() {
                        a(b).focus(),
                        d && d.call(b)
                    }, c)
                }) : b.apply(this, arguments)
            }
        }(a.fn.focus),
        disableSelection: function() {
            var a = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(a + ".ui-disableSelection", function(a) {
                    a.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(b) {
            if (void 0 !== b)
                return this.css("zIndex", b);
            if (this.length)
                for (var c, d, e = a(this[0]); e.length && e[0] !== document; ) {
                    if (c = e.css("position"),
                    ("absolute" === c || "relative" === c || "fixed" === c) && (d = parseInt(e.css("zIndex"), 10),
                    !isNaN(d) && 0 !== d))
                        return d;
                    e = e.parent()
                }
            return 0
        }
    }),
    a.ui.plugin = {
        add: function(b, c, d) {
            var e, f = a.ui[b].prototype;
            for (e in d)
                f.plugins[e] = f.plugins[e] || [],
                f.plugins[e].push([c, d[e]])
        },
        call: function(a, b, c, d) {
            var e, f = a.plugins[b];
            if (f && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))
                for (e = 0; e < f.length; e++)
                    a.options[f[e][0]] && f[e][1].apply(a.element, c)
        }
    }
});
;/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    var b = 0
      , c = Array.prototype.slice;
    return a.cleanData = function(b) {
        return function(c) {
            var d, e, f;
            for (f = 0; null != (e = c[f]); f++)
                try {
                    d = a._data(e, "events"),
                    d && d.remove && a(e).triggerHandler("remove")
                } catch (g) {}
            b(c)
        }
    }(a.cleanData),
    a.widget = function(b, c, d) {
        var e, f, g, h, i = {}, j = b.split(".")[0];
        return b = b.split(".")[1],
        e = j + "-" + b,
        d || (d = c,
        c = a.Widget),
        a.expr[":"][e.toLowerCase()] = function(b) {
            return !!a.data(b, e)
        }
        ,
        a[j] = a[j] || {},
        f = a[j][b],
        g = a[j][b] = function(a, b) {
            return this._createWidget ? void (arguments.length && this._createWidget(a, b)) : new g(a,b)
        }
        ,
        a.extend(g, f, {
            version: d.version,
            _proto: a.extend({}, d),
            _childConstructors: []
        }),
        h = new c,
        h.options = a.widget.extend({}, h.options),
        a.each(d, function(b, d) {
            return a.isFunction(d) ? void (i[b] = function() {
                var a = function() {
                    return c.prototype[b].apply(this, arguments)
                }
                  , e = function(a) {
                    return c.prototype[b].apply(this, a)
                };
                return function() {
                    var b, c = this._super, f = this._superApply;
                    return this._super = a,
                    this._superApply = e,
                    b = d.apply(this, arguments),
                    this._super = c,
                    this._superApply = f,
                    b
                }
            }()) : void (i[b] = d)
        }),
        g.prototype = a.widget.extend(h, {
            widgetEventPrefix: f ? h.widgetEventPrefix || b : b
        }, i, {
            constructor: g,
            namespace: j,
            widgetName: b,
            widgetFullName: e
        }),
        f ? (a.each(f._childConstructors, function(b, c) {
            var d = c.prototype;
            a.widget(d.namespace + "." + d.widgetName, g, c._proto)
        }),
        delete f._childConstructors) : c._childConstructors.push(g),
        a.widget.bridge(b, g),
        g
    }
    ,
    a.widget.extend = function(b) {
        for (var d, e, f = c.call(arguments, 1), g = 0, h = f.length; g < h; g++)
            for (d in f[g])
                e = f[g][d],
                f[g].hasOwnProperty(d) && void 0 !== e && (a.isPlainObject(e) ? b[d] = a.isPlainObject(b[d]) ? a.widget.extend({}, b[d], e) : a.widget.extend({}, e) : b[d] = e);
        return b
    }
    ,
    a.widget.bridge = function(b, d) {
        var e = d.prototype.widgetFullName || b;
        a.fn[b] = function(f) {
            var g = "string" == typeof f
              , h = c.call(arguments, 1)
              , i = this;
            return g ? this.each(function() {
                var c, d = a.data(this, e);
                return "instance" === f ? (i = d,
                !1) : d ? a.isFunction(d[f]) && "_" !== f.charAt(0) ? (c = d[f].apply(d, h),
                c !== d && void 0 !== c ? (i = c && c.jquery ? i.pushStack(c.get()) : c,
                !1) : void 0) : a.error("no such method '" + f + "' for " + b + " widget instance") : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + f + "'")
            }) : (h.length && (f = a.widget.extend.apply(null, [f].concat(h))),
            this.each(function() {
                var b = a.data(this, e);
                b ? (b.option(f || {}),
                b._init && b._init()) : a.data(this, e, new d(f,this))
            })),
            i
        }
    }
    ,
    a.Widget = function() {}
    ,
    a.Widget._childConstructors = [],
    a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(c, d) {
            d = a(d || this.defaultElement || this)[0],
            this.element = a(d),
            this.uuid = b++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.bindings = a(),
            this.hoverable = a(),
            this.focusable = a(),
            d !== this && (a.data(d, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function(a) {
                    a.target === d && this.destroy()
                }
            }),
            this.document = a(d.style ? d.ownerDocument : d.document || d),
            this.window = a(this.document[0].defaultView || this.document[0].parentWindow)),
            this.options = a.widget.extend({}, this.options, this._getCreateOptions(), c),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: a.noop,
        _getCreateEventData: a.noop,
        _create: a.noop,
        _init: a.noop,
        destroy: function() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: a.noop,
        widget: function() {
            return this.element
        },
        option: function(b, c) {
            var d, e, f, g = b;
            if (0 === arguments.length)
                return a.widget.extend({}, this.options);
            if ("string" == typeof b)
                if (g = {},
                d = b.split("."),
                b = d.shift(),
                d.length) {
                    for (e = g[b] = a.widget.extend({}, this.options[b]),
                    f = 0; f < d.length - 1; f++)
                        e[d[f]] = e[d[f]] || {},
                        e = e[d[f]];
                    if (b = d.pop(),
                    1 === arguments.length)
                        return void 0 === e[b] ? null : e[b];
                    e[b] = c
                } else {
                    if (1 === arguments.length)
                        return void 0 === this.options[b] ? null : this.options[b];
                    g[b] = c
                }
            return this._setOptions(g),
            this
        },
        _setOptions: function(a) {
            var b;
            for (b in a)
                this._setOption(b, a[b]);
            return this
        },
        _setOption: function(a, b) {
            return this.options[a] = b,
            "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!b),
            b && (this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus"))),
            this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(b, c, d) {
            var e, f = this;
            "boolean" != typeof b && (d = c,
            c = b,
            b = !1),
            d ? (c = e = a(c),
            this.bindings = this.bindings.add(c)) : (d = c,
            c = this.element,
            e = this.widget()),
            a.each(d, function(d, g) {
                function h() {
                    if (b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled"))
                        return ("string" == typeof g ? f[g] : g).apply(f, arguments)
                }
                "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
                var i = d.match(/^([\w:-]*)\s*(.*)$/)
                  , j = i[1] + f.eventNamespace
                  , k = i[2];
                k ? e.delegate(k, j, h) : c.bind(j, h)
            })
        },
        _off: function(b, c) {
            c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            b.unbind(c).undelegate(c),
            this.bindings = a(this.bindings.not(b).get()),
            this.focusable = a(this.focusable.not(b).get()),
            this.hoverable = a(this.hoverable.not(b).get())
        },
        _delay: function(a, b) {
            function c() {
                return ("string" == typeof a ? d[a] : a).apply(d, arguments)
            }
            var d = this;
            return setTimeout(c, b || 0)
        },
        _hoverable: function(b) {
            this.hoverable = this.hoverable.add(b),
            this._on(b, {
                mouseenter: function(b) {
                    a(b.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(b) {
                    a(b.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(b) {
            this.focusable = this.focusable.add(b),
            this._on(b, {
                focusin: function(b) {
                    a(b.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(b) {
                    a(b.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(b, c, d) {
            var e, f, g = this.options[b];
            if (d = d || {},
            c = a.Event(c),
            c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(),
            c.target = this.element[0],
            f = c.originalEvent)
                for (e in f)
                    e in c || (c[e] = f[e]);
            return this.element.trigger(c, d),
            !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
        }
    },
    a.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(b, c) {
        a.Widget.prototype["_" + b] = function(d, e, f) {
            "string" == typeof e && (e = {
                effect: e
            });
            var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
            e = e || {},
            "number" == typeof e && (e = {
                duration: e
            }),
            g = !a.isEmptyObject(e),
            e.complete = f,
            e.delay && d.delay(e.delay),
            g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {
                a(this)[b](),
                f && f.call(d[0]),
                c()
            })
        }
    }),
    a.widget
});
;/*!
 * jQuery UI Mouse 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery", "./widget"], a) : a(jQuery)
}(function(a) {
    var b = !1;
    return a(document).mouseup(function() {
        b = !1
    }),
    a.widget("ui.mouse", {
        version: "1.11.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function(a) {
                return b._mouseDown(a)
            }).bind("click." + this.widgetName, function(c) {
                if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent"))
                    return a.removeData(c.target, b.widgetName + ".preventClickEvent"),
                    c.stopImmediatePropagation(),
                    !1
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(c) {
            if (!b) {
                this._mouseMoved = !1,
                this._mouseStarted && this._mouseUp(c),
                this._mouseDownEvent = c;
                var d = this
                  , e = 1 === c.which
                  , f = !("string" != typeof this.options.cancel || !c.target.nodeName) && a(c.target).closest(this.options.cancel).length;
                return !(e && !f && this._mouseCapture(c)) || (this.mouseDelayMet = !this.options.delay,
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    d.mouseDelayMet = !0
                }, this.options.delay)),
                this._mouseDistanceMet(c) && this._mouseDelayMet(c) && (this._mouseStarted = this._mouseStart(c) !== !1,
                !this._mouseStarted) ? (c.preventDefault(),
                !0) : (!0 === a.data(c.target, this.widgetName + ".preventClickEvent") && a.removeData(c.target, this.widgetName + ".preventClickEvent"),
                this._mouseMoveDelegate = function(a) {
                    return d._mouseMove(a)
                }
                ,
                this._mouseUpDelegate = function(a) {
                    return d._mouseUp(a)
                }
                ,
                this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                c.preventDefault(),
                b = !0,
                !0))
            }
        },
        _mouseMove: function(b) {
            if (this._mouseMoved) {
                if (a.ui.ie && (!document.documentMode || document.documentMode < 9) && !b.button)
                    return this._mouseUp(b);
                if (!b.which)
                    return this._mouseUp(b)
            }
            return (b.which || b.button) && (this._mouseMoved = !0),
            this._mouseStarted ? (this._mouseDrag(b),
            b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1,
            this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)),
            !this._mouseStarted)
        },
        _mouseUp: function(c) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1,
            c.target === this._mouseDownEvent.target && a.data(c.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(c)),
            b = !1,
            !1
        },
        _mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
});
;/*!
 * jQuery UI Sortable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 */
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./mouse", "./widget"], a) : a(jQuery)
}(function(a) {
    return a.widget("ui.sortable", a.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function(a, b, c) {
            return a >= b && a < b + c
        },
        _isFloating: function(a) {
            return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"))
        },
        _create: function() {
            this.containerCache = {},
            this.element.addClass("ui-sortable"),
            this.refresh(),
            this.offset = this.element.offset(),
            this._mouseInit(),
            this._setHandleClassName(),
            this.ready = !0
        },
        _setOption: function(a, b) {
            this._super(a, b),
            "handle" === a && this._setHandleClassName()
        },
        _setHandleClassName: function() {
            this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"),
            a.each(this.items, function() {
                (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
            })
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"),
            this._mouseDestroy();
            for (var a = this.items.length - 1; a >= 0; a--)
                this.items[a].item.removeData(this.widgetName + "-item");
            return this
        },
        _mouseCapture: function(b, c) {
            var d = null
              , e = !1
              , f = this;
            return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(b),
            a(b.target).parents().each(function() {
                if (a.data(this, f.widgetName + "-item") === f)
                    return d = a(this),
                    !1
            }),
            a.data(b.target, f.widgetName + "-item") === f && (d = a(b.target)),
            !!d && (!(this.options.handle && !c && (a(this.options.handle, d).find("*").addBack().each(function() {
                this === b.target && (e = !0)
            }),
            !e)) && (this.currentItem = d,
            this._removeCurrentsFromItems(),
            !0))))
        },
        _mouseStart: function(b, c, d) {
            var e, f, g = this.options;
            if (this.currentContainer = this,
            this.refreshPositions(),
            this.helper = this._createHelper(b),
            this._cacheHelperProportions(),
            this._cacheMargins(),
            this.scrollParent = this.helper.scrollParent(),
            this.offset = this.currentItem.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.helper.css("position", "absolute"),
            this.cssPosition = this.helper.css("position"),
            this.originalPosition = this._generatePosition(b),
            this.originalPageX = b.pageX,
            this.originalPageY = b.pageY,
            g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt),
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            },
            this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
            this._createPlaceholder(),
            g.containment && this._setContainment(),
            g.cursor && "auto" !== g.cursor && (f = this.document.find("body"),
            this.storedCursor = f.css("cursor"),
            f.css("cursor", g.cursor),
            this.storedStylesheet = a("<style>*{ cursor: " + g.cursor + " !important; }</style>").appendTo(f)),
            g.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", g.opacity)),
            g.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", g.zIndex)),
            this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()),
            this._trigger("start", b, this._uiHash()),
            this._preserveHelperProportions || this._cacheHelperProportions(),
            !d)
                for (e = this.containers.length - 1; e >= 0; e--)
                    this.containers[e]._trigger("activate", b, this._uiHash(this));
            return a.ui.ddmanager && (a.ui.ddmanager.current = this),
            a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b),
            this.dragging = !0,
            this.helper.addClass("ui-sortable-helper"),
            this._mouseDrag(b),
            !0
        },
        _mouseDrag: function(b) {
            var c, d, e, f, g = this.options, h = !1;
            for (this.position = this._generatePosition(b),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < g.scrollSensitivity ? this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop + g.scrollSpeed : b.pageY - this.overflowOffset.top < g.scrollSensitivity && (this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop - g.scrollSpeed),
            this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < g.scrollSensitivity ? this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft + g.scrollSpeed : b.pageX - this.overflowOffset.left < g.scrollSensitivity && (this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft - g.scrollSpeed)) : (b.pageY - this.document.scrollTop() < g.scrollSensitivity ? h = this.document.scrollTop(this.document.scrollTop() - g.scrollSpeed) : this.window.height() - (b.pageY - this.document.scrollTop()) < g.scrollSensitivity && (h = this.document.scrollTop(this.document.scrollTop() + g.scrollSpeed)),
            b.pageX - this.document.scrollLeft() < g.scrollSensitivity ? h = this.document.scrollLeft(this.document.scrollLeft() - g.scrollSpeed) : this.window.width() - (b.pageX - this.document.scrollLeft()) < g.scrollSensitivity && (h = this.document.scrollLeft(this.document.scrollLeft() + g.scrollSpeed))),
            h !== !1 && a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"),
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"),
            c = this.items.length - 1; c >= 0; c--)
                if (d = this.items[c],
                e = d.item[0],
                f = this._intersectsWithPointer(d),
                f && d.instance === this.currentContainer && !(e === this.currentItem[0] || this.placeholder[1 === f ? "next" : "prev"]()[0] === e || a.contains(this.placeholder[0], e) || "semi-dynamic" === this.options.type && a.contains(this.element[0], e))) {
                    if (this.direction = 1 === f ? "down" : "up",
                    "pointer" !== this.options.tolerance && !this._intersectsWithSides(d))
                        break;
                    this._rearrange(b, d),
                    this._trigger("change", b, this._uiHash());
                    break
                }
            return this._contactContainers(b),
            a.ui.ddmanager && a.ui.ddmanager.drag(this, b),
            this._trigger("sort", b, this._uiHash()),
            this.lastPositionAbs = this.positionAbs,
            !1
        },
        _mouseStop: function(b, c) {
            if (b) {
                if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b),
                this.options.revert) {
                    var d = this
                      , e = this.placeholder.offset()
                      , f = this.options.axis
                      , g = {};
                    f && "x" !== f || (g.left = e.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)),
                    f && "y" !== f || (g.top = e.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)),
                    this.reverting = !0,
                    a(this.helper).animate(g, parseInt(this.options.revert, 10) || 500, function() {
                        d._clear(b)
                    })
                } else
                    this._clear(b, c);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }),
                "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var b = this.containers.length - 1; b >= 0; b--)
                    this.containers[b]._trigger("deactivate", null, this._uiHash(this)),
                    this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)),
                    this.containers[b].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(),
            a.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }),
            this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)),
            this
        },
        serialize: function(b) {
            var c = this._getItemsAsjQuery(b && b.connected)
              , d = [];
            return b = b || {},
            a(c).each(function() {
                var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[\-=_](.+)/);
                c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
            }),
            !d.length && b.key && d.push(b.key + "="),
            d.join("&")
        },
        toArray: function(b) {
            var c = this._getItemsAsjQuery(b && b.connected)
              , d = [];
            return b = b || {},
            c.each(function() {
                d.push(a(b.item || this).attr(b.attribute || "id") || "")
            }),
            d
        },
        _intersectsWith: function(a) {
            var b = this.positionAbs.left
              , c = b + this.helperProportions.width
              , d = this.positionAbs.top
              , e = d + this.helperProportions.height
              , f = a.left
              , g = f + a.width
              , h = a.top
              , i = h + a.height
              , j = this.offset.click.top
              , k = this.offset.click.left
              , l = "x" === this.options.axis || d + j > h && d + j < i
              , m = "y" === this.options.axis || b + k > f && b + k < g
              , n = l && m;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? n : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
        },
        _intersectsWithPointer: function(a) {
            var b = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top, a.height)
              , c = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left, a.width)
              , d = b && c
              , e = this._getDragVerticalDirection()
              , f = this._getDragHorizontalDirection();
            return !!d && (this.floating ? f && "right" === f || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1))
        },
        _intersectsWithSides: function(a) {
            var b = this._isOverAxis(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height)
              , c = this._isOverAxis(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width)
              , d = this._getDragVerticalDirection()
              , e = this._getDragHorizontalDirection();
            return this.floating && e ? "right" === e && c || "left" === e && !c : d && ("down" === d && b || "up" === d && !b)
        },
        _getDragVerticalDirection: function() {
            var a = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== a && (a > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== a && (a > 0 ? "right" : "left")
        },
        refresh: function(a) {
            return this._refreshItems(a),
            this._setHandleClassName(),
            this.refreshPositions(),
            this
        },
        _connectWith: function() {
            var a = this.options;
            return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith
        },
        _getItemsAsjQuery: function(b) {
            function c() {
                h.push(this)
            }
            var d, e, f, g, h = [], i = [], j = this._connectWith();
            if (j && b)
                for (d = j.length - 1; d >= 0; d--)
                    for (f = a(j[d], this.document[0]),
                    e = f.length - 1; e >= 0; e--)
                        g = a.data(f[e], this.widgetFullName),
                        g && g !== this && !g.options.disabled && i.push([a.isFunction(g.options.items) ? g.options.items.call(g.element) : a(g.options.items, g.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), g]);
            for (i.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]),
            d = i.length - 1; d >= 0; d--)
                i[d][0].each(c);
            return a(h)
        },
        _removeCurrentsFromItems: function() {
            var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = a.grep(this.items, function(a) {
                for (var c = 0; c < b.length; c++)
                    if (b[c] === a.item[0])
                        return !1;
                return !0
            })
        },
        _refreshItems: function(b) {
            this.items = [],
            this.containers = [this];
            var c, d, e, f, g, h, i, j, k = this.items, l = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
                item: this.currentItem
            }) : a(this.options.items, this.element), this]], m = this._connectWith();
            if (m && this.ready)
                for (c = m.length - 1; c >= 0; c--)
                    for (e = a(m[c], this.document[0]),
                    d = e.length - 1; d >= 0; d--)
                        f = a.data(e[d], this.widgetFullName),
                        f && f !== this && !f.options.disabled && (l.push([a.isFunction(f.options.items) ? f.options.items.call(f.element[0], b, {
                            item: this.currentItem
                        }) : a(f.options.items, f.element), f]),
                        this.containers.push(f));
            for (c = l.length - 1; c >= 0; c--)
                for (g = l[c][1],
                h = l[c][0],
                d = 0,
                j = h.length; d < j; d++)
                    i = a(h[d]),
                    i.data(this.widgetName + "-item", g),
                    k.push({
                        item: i,
                        instance: g,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
        },
        refreshPositions: function(b) {
            this.floating = !!this.items.length && ("x" === this.options.axis || this._isFloating(this.items[0].item)),
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var c, d, e, f;
            for (c = this.items.length - 1; c >= 0; c--)
                d = this.items[c],
                d.instance !== this.currentContainer && this.currentContainer && d.item[0] !== this.currentItem[0] || (e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item,
                b || (d.width = e.outerWidth(),
                d.height = e.outerHeight()),
                f = e.offset(),
                d.left = f.left,
                d.top = f.top);
            if (this.options.custom && this.options.custom.refreshContainers)
                this.options.custom.refreshContainers.call(this);
            else
                for (c = this.containers.length - 1; c >= 0; c--)
                    f = this.containers[c].element.offset(),
                    this.containers[c].containerCache.left = f.left,
                    this.containers[c].containerCache.top = f.top,
                    this.containers[c].containerCache.width = this.containers[c].element.outerWidth(),
                    this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
            return this
        },
        _createPlaceholder: function(b) {
            b = b || this;
            var c, d = b.options;
            d.placeholder && d.placeholder.constructor !== String || (c = d.placeholder,
            d.placeholder = {
                element: function() {
                    var d = b.currentItem[0].nodeName.toLowerCase()
                      , e = a("<" + d + ">", b.document[0]).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tbody" === d ? b._createTrPlaceholder(b.currentItem.find("tr").eq(0), a("<tr>", b.document[0]).appendTo(e)) : "tr" === d ? b._createTrPlaceholder(b.currentItem, e) : "img" === d && e.attr("src", b.currentItem.attr("src")),
                    c || e.css("visibility", "hidden"),
                    e
                },
                update: function(a, e) {
                    c && !d.forcePlaceholderSize || (e.height() || e.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)),
                    e.width() || e.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10)))
                }
            }),
            b.placeholder = a(d.placeholder.element.call(b.element, b.currentItem)),
            b.currentItem.after(b.placeholder),
            d.placeholder.update(b, b.placeholder)
        },
        _createTrPlaceholder: function(b, c) {
            var d = this;
            b.children().each(function() {
                a("<td>&#160;</td>", d.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(c)
            })
        },
        _contactContainers: function(b) {
            var c, d, e, f, g, h, i, j, k, l, m = null, n = null;
            for (c = this.containers.length - 1; c >= 0; c--)
                if (!a.contains(this.currentItem[0], this.containers[c].element[0]))
                    if (this._intersectsWith(this.containers[c].containerCache)) {
                        if (m && a.contains(this.containers[c].element[0], m.element[0]))
                            continue;
                        m = this.containers[c],
                        n = c
                    } else
                        this.containers[c].containerCache.over && (this.containers[c]._trigger("out", b, this._uiHash(this)),
                        this.containers[c].containerCache.over = 0);
            if (m)
                if (1 === this.containers.length)
                    this.containers[n].containerCache.over || (this.containers[n]._trigger("over", b, this._uiHash(this)),
                    this.containers[n].containerCache.over = 1);
                else {
                    for (e = 1e4,
                    f = null,
                    k = m.floating || this._isFloating(this.currentItem),
                    g = k ? "left" : "top",
                    h = k ? "width" : "height",
                    l = k ? "clientX" : "clientY",
                    d = this.items.length - 1; d >= 0; d--)
                        a.contains(this.containers[n].element[0], this.items[d].item[0]) && this.items[d].item[0] !== this.currentItem[0] && (i = this.items[d].item.offset()[g],
                        j = !1,
                        b[l] - i > this.items[d][h] / 2 && (j = !0),
                        Math.abs(b[l] - i) < e && (e = Math.abs(b[l] - i),
                        f = this.items[d],
                        this.direction = j ? "up" : "down"));
                    if (!f && !this.options.dropOnEmpty)
                        return;
                    if (this.currentContainer === this.containers[n])
                        return void (this.currentContainer.containerCache.over || (this.containers[n]._trigger("over", b, this._uiHash()),
                        this.currentContainer.containerCache.over = 1));
                    f ? this._rearrange(b, f, null, !0) : this._rearrange(b, null, this.containers[n].element, !0),
                    this._trigger("change", b, this._uiHash()),
                    this.containers[n]._trigger("change", b, this._uiHash(this)),
                    this.currentContainer = this.containers[n],
                    this.options.placeholder.update(this.currentContainer, this.placeholder),
                    this.containers[n]._trigger("over", b, this._uiHash(this)),
                    this.containers[n].containerCache.over = 1
                }
        },
        _createHelper: function(b) {
            var c = this.options
              , d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : "clone" === c.helper ? this.currentItem.clone() : this.currentItem;
            return d.parents("body").length || a("parent" !== c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]),
            d[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }),
            d[0].style.width && !c.forceHelperSize || d.width(this.currentItem.width()),
            d[0].style.height && !c.forceHelperSize || d.height(this.currentItem.height()),
            d
        },
        _adjustOffsetFromHelper: function(b) {
            "string" == typeof b && (b = b.split(" ")),
            a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] || 0
            }),
            "left"in b && (this.offset.click.left = b.left + this.margins.left),
            "right"in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left),
            "top"in b && (this.offset.click.top = b.top + this.margins.top),
            "bottom"in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(),
            b.top += this.scrollParent.scrollTop()),
            (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
                top: 0,
                left: 0
            }),
            {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var a = this.currentItem.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var b, c, d, e = this.options;
            "parent" === e.containment && (e.containment = this.helper[0].parentNode),
            "document" !== e.containment && "window" !== e.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === e.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === e.containment ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]),
            /^(document|window|parent)$/.test(e.containment) || (b = a(e.containment)[0],
            c = a(e.containment).offset(),
            d = "hidden" !== a(b).css("overflow"),
            this.containment = [c.left + (parseInt(a(b).css("borderLeftWidth"), 10) || 0) + (parseInt(a(b).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(b).css("borderTopWidth"), 10) || 0) + (parseInt(a(b).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (d ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(a(b).css("borderLeftWidth"), 10) || 0) - (parseInt(a(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (d ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(a(b).css("borderTopWidth"), 10) || 0) - (parseInt(a(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = "absolute" === b ? 1 : -1
              , e = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent
              , f = /(html|body)/i.test(e[0].tagName);
            return {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * d,
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * d
            }
        },
        _generatePosition: function(b) {
            var c, d, e = this.options, f = b.pageX, g = b.pageY, h = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, i = /(html|body)/i.test(h[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()),
            this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left),
            b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top),
            b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left),
            b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top)),
            e.grid && (c = this.originalPageY + Math.round((g - this.originalPageY) / e.grid[1]) * e.grid[1],
            g = this.containment ? c - this.offset.click.top >= this.containment[1] && c - this.offset.click.top <= this.containment[3] ? c : c - this.offset.click.top >= this.containment[1] ? c - e.grid[1] : c + e.grid[1] : c,
            d = this.originalPageX + Math.round((f - this.originalPageX) / e.grid[0]) * e.grid[0],
            f = this.containment ? d - this.offset.click.left >= this.containment[0] && d - this.offset.click.left <= this.containment[2] ? d : d - this.offset.click.left >= this.containment[0] ? d - e.grid[0] : d + e.grid[0] : d)),
            {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : i ? 0 : h.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : i ? 0 : h.scrollLeft())
            }
        },
        _rearrange: function(a, b, c, d) {
            c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? b.item[0] : b.item[0].nextSibling),
            this.counter = this.counter ? ++this.counter : 1;
            var e = this.counter;
            this._delay(function() {
                e === this.counter && this.refreshPositions(!d)
            })
        },
        _clear: function(a, b) {
            function c(a, b, c) {
                return function(d) {
                    c._trigger(a, d, b._uiHash(b))
                }
            }
            this.reverting = !1;
            var d, e = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem),
            this._noFinalSort = null,
            this.helper[0] === this.currentItem[0]) {
                for (d in this._storedCSS)
                    "auto" !== this._storedCSS[d] && "static" !== this._storedCSS[d] || (this._storedCSS[d] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else
                this.currentItem.show();
            for (this.fromOutside && !b && e.push(function(a) {
                this._trigger("receive", a, this._uiHash(this.fromOutside))
            }),
            !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || b || e.push(function(a) {
                this._trigger("update", a, this._uiHash())
            }),
            this !== this.currentContainer && (b || (e.push(function(a) {
                this._trigger("remove", a, this._uiHash())
            }),
            e.push(function(a) {
                return function(b) {
                    a._trigger("receive", b, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)),
            e.push(function(a) {
                return function(b) {
                    a._trigger("update", b, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)))),
            d = this.containers.length - 1; d >= 0; d--)
                b || e.push(c("deactivate", this, this.containers[d])),
                this.containers[d].containerCache.over && (e.push(c("out", this, this.containers[d])),
                this.containers[d].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove()),
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity),
            this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex),
            this.dragging = !1,
            b || this._trigger("beforeStop", a, this._uiHash()),
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            this.helper = null),
            !b) {
                for (d = 0; d < e.length; d++)
                    e[d].call(this, a);
                this._trigger("stop", a, this._uiHash())
            }
            return this.fromOutside = !1,
            !this.cancelHelperRemoval
        },
        _trigger: function() {
            a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(b) {
            var c = b || this;
            return {
                helper: c.helper,
                placeholder: c.placeholder || a([]),
                position: c.position,
                originalPosition: c.originalPosition,
                offset: c.positionAbs,
                item: c.currentItem,
                sender: b ? b.element : null
            }
        }
    })
});
;/*!
 * jQuery UI Datepicker 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/datepicker/
 */
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery", "./core"], a) : a(jQuery)
}(function(a) {
    function b(a) {
        for (var b, c; a.length && a[0] !== document; ) {
            if (b = a.css("position"),
            ("absolute" === b || "relative" === b || "fixed" === b) && (c = parseInt(a.css("zIndex"), 10),
            !isNaN(c) && 0 !== c))
                return c;
            a = a.parent()
        }
        return 0
    }
    function c() {
        this._curInst = null,
        this._keyEvent = !1,
        this._disabledInputs = [],
        this._datepickerShowing = !1,
        this._inDialog = !1,
        this._mainDivId = "ui-datepicker-div",
        this._inlineClass = "ui-datepicker-inline",
        this._appendClass = "ui-datepicker-append",
        this._triggerClass = "ui-datepicker-trigger",
        this._dialogClass = "ui-datepicker-dialog",
        this._disableClass = "ui-datepicker-disabled",
        this._unselectableClass = "ui-datepicker-unselectable",
        this._currentClass = "ui-datepicker-current-day",
        this._dayOverClass = "ui-datepicker-days-cell-over",
        this.regional = [],
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        },
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        },
        a.extend(this._defaults, this.regional[""]),
        this.regional.en = a.extend(!0, {}, this.regional[""]),
        this.regional["en-US"] = a.extend(!0, {}, this.regional.en),
        this.dpDiv = d(a("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    function d(b) {
        var c = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return b.delegate(c, "mouseout", function() {
            a(this).removeClass("ui-state-hover"),
            this.className.indexOf("ui-datepicker-prev") !== -1 && a(this).removeClass("ui-datepicker-prev-hover"),
            this.className.indexOf("ui-datepicker-next") !== -1 && a(this).removeClass("ui-datepicker-next-hover")
        }).delegate(c, "mouseover", e)
    }
    function e() {
        a.datepicker._isDisabledDatepicker(g.inline ? g.dpDiv.parent()[0] : g.input[0]) || (a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
        a(this).addClass("ui-state-hover"),
        this.className.indexOf("ui-datepicker-prev") !== -1 && a(this).addClass("ui-datepicker-prev-hover"),
        this.className.indexOf("ui-datepicker-next") !== -1 && a(this).addClass("ui-datepicker-next-hover"))
    }
    function f(b, c) {
        a.extend(b, c);
        for (var d in c)
            null == c[d] && (b[d] = c[d]);
        return b
    }
    a.extend(a.ui, {
        datepicker: {
            version: "1.11.4"
        }
    });
    var g;
    return a.extend(c.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(a) {
            return f(this._defaults, a || {}),
            this
        },
        _attachDatepicker: function(b, c) {
            var d, e, f;
            d = b.nodeName.toLowerCase(),
            e = "div" === d || "span" === d,
            b.id || (this.uuid += 1,
            b.id = "dp" + this.uuid),
            f = this._newInst(a(b), e),
            f.settings = a.extend({}, c || {}),
            "input" === d ? this._connectDatepicker(b, f) : e && this._inlineDatepicker(b, f)
        },
        _newInst: function(b, c) {
            var e = b[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: e,
                input: b,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: c,
                dpDiv: c ? d(a("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(b, c) {
            var d = a(b);
            c.append = a([]),
            c.trigger = a([]),
            d.hasClass(this.markerClassName) || (this._attachments(d, c),
            d.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),
            this._autoSize(c),
            a.data(b, "datepicker", c),
            c.settings.disabled && this._disableDatepicker(b))
        },
        _attachments: function(b, c) {
            var d, e, f, g = this._get(c, "appendText"), h = this._get(c, "isRTL");
            c.append && c.append.remove(),
            g && (c.append = a("<span class='" + this._appendClass + "'>" + g + "</span>"),
            b[h ? "before" : "after"](c.append)),
            b.unbind("focus", this._showDatepicker),
            c.trigger && c.trigger.remove(),
            d = this._get(c, "showOn"),
            "focus" !== d && "both" !== d || b.focus(this._showDatepicker),
            "button" !== d && "both" !== d || (e = this._get(c, "buttonText"),
            f = this._get(c, "buttonImage"),
            c.trigger = a(this._get(c, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
                src: f,
                alt: e,
                title: e
            }) : a("<button type='button'></button>").addClass(this._triggerClass).html(f ? a("<img/>").attr({
                src: f,
                alt: e,
                title: e
            }) : e)),
            b[h ? "before" : "after"](c.trigger),
            c.trigger.click(function() {
                return a.datepicker._datepickerShowing && a.datepicker._lastInput === b[0] ? a.datepicker._hideDatepicker() : a.datepicker._datepickerShowing && a.datepicker._lastInput !== b[0] ? (a.datepicker._hideDatepicker(),
                a.datepicker._showDatepicker(b[0])) : a.datepicker._showDatepicker(b[0]),
                !1
            }))
        },
        _autoSize: function(a) {
            if (this._get(a, "autoSize") && !a.inline) {
                var b, c, d, e, f = new Date(2009,11,20), g = this._get(a, "dateFormat");
                g.match(/[DM]/) && (b = function(a) {
                    for (c = 0,
                    d = 0,
                    e = 0; e < a.length; e++)
                        a[e].length > c && (c = a[e].length,
                        d = e);
                    return d
                }
                ,
                f.setMonth(b(this._get(a, g.match(/MM/) ? "monthNames" : "monthNamesShort"))),
                f.setDate(b(this._get(a, g.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay())),
                a.input.attr("size", this._formatDate(a, f).length)
            }
        },
        _inlineDatepicker: function(b, c) {
            var d = a(b);
            d.hasClass(this.markerClassName) || (d.addClass(this.markerClassName).append(c.dpDiv),
            a.data(b, "datepicker", c),
            this._setDate(c, this._getDefaultDate(c), !0),
            this._updateDatepicker(c),
            this._updateAlternate(c),
            c.settings.disabled && this._disableDatepicker(b),
            c.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(b, c, d, e, g) {
            var h, i, j, k, l, m = this._dialogInst;
            return m || (this.uuid += 1,
            h = "dp" + this.uuid,
            this._dialogInput = a("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"),
            this._dialogInput.keydown(this._doKeyDown),
            a("body").append(this._dialogInput),
            m = this._dialogInst = this._newInst(this._dialogInput, !1),
            m.settings = {},
            a.data(this._dialogInput[0], "datepicker", m)),
            f(m.settings, e || {}),
            c = c && c.constructor === Date ? this._formatDate(m, c) : c,
            this._dialogInput.val(c),
            this._pos = g ? g.length ? g : [g.pageX, g.pageY] : null,
            this._pos || (i = document.documentElement.clientWidth,
            j = document.documentElement.clientHeight,
            k = document.documentElement.scrollLeft || document.body.scrollLeft,
            l = document.documentElement.scrollTop || document.body.scrollTop,
            this._pos = [i / 2 - 100 + k, j / 2 - 150 + l]),
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
            m.settings.onSelect = d,
            this._inDialog = !0,
            this.dpDiv.addClass(this._dialogClass),
            this._showDatepicker(this._dialogInput[0]),
            a.blockUI && a.blockUI(this.dpDiv),
            a.data(this._dialogInput[0], "datepicker", m),
            this
        },
        _destroyDatepicker: function(b) {
            var c, d = a(b), e = a.data(b, "datepicker");
            d.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(),
            a.removeData(b, "datepicker"),
            "input" === c ? (e.append.remove(),
            e.trigger.remove(),
            d.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : "div" !== c && "span" !== c || d.removeClass(this.markerClassName).empty(),
            g === e && (g = null))
        },
        _enableDatepicker: function(b) {
            var c, d, e = a(b), f = a.data(b, "datepicker");
            e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(),
            "input" === c ? (b.disabled = !1,
            f.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : "div" !== c && "span" !== c || (d = e.children("." + this._inlineClass),
            d.children().removeClass("ui-state-disabled"),
            d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)),
            this._disabledInputs = a.map(this._disabledInputs, function(a) {
                return a === b ? null : a
            }))
        },
        _disableDatepicker: function(b) {
            var c, d, e = a(b), f = a.data(b, "datepicker");
            e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(),
            "input" === c ? (b.disabled = !0,
            f.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : "div" !== c && "span" !== c || (d = e.children("." + this._inlineClass),
            d.children().addClass("ui-state-disabled"),
            d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
            this._disabledInputs = a.map(this._disabledInputs, function(a) {
                return a === b ? null : a
            }),
            this._disabledInputs[this._disabledInputs.length] = b)
        },
        _isDisabledDatepicker: function(a) {
            if (!a)
                return !1;
            for (var b = 0; b < this._disabledInputs.length; b++)
                if (this._disabledInputs[b] === a)
                    return !0;
            return !1
        },
        _getInst: function(b) {
            try {
                return a.data(b, "datepicker")
            } catch (c) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(b, c, d) {
            var e, g, h, i, j = this._getInst(b);
            return 2 === arguments.length && "string" == typeof c ? "defaults" === c ? a.extend({}, a.datepicker._defaults) : j ? "all" === c ? a.extend({}, j.settings) : this._get(j, c) : null : (e = c || {},
            "string" == typeof c && (e = {},
            e[c] = d),
            void (j && (this._curInst === j && this._hideDatepicker(),
            g = this._getDateDatepicker(b, !0),
            h = this._getMinMaxDate(j, "min"),
            i = this._getMinMaxDate(j, "max"),
            f(j.settings, e),
            null !== h && void 0 !== e.dateFormat && void 0 === e.minDate && (j.settings.minDate = this._formatDate(j, h)),
            null !== i && void 0 !== e.dateFormat && void 0 === e.maxDate && (j.settings.maxDate = this._formatDate(j, i)),
            "disabled"in e && (e.disabled ? this._disableDatepicker(b) : this._enableDatepicker(b)),
            this._attachments(a(b), j),
            this._autoSize(j),
            this._setDate(j, g),
            this._updateAlternate(j),
            this._updateDatepicker(j))))
        },
        _changeDatepicker: function(a, b, c) {
            this._optionDatepicker(a, b, c)
        },
        _refreshDatepicker: function(a) {
            var b = this._getInst(a);
            b && this._updateDatepicker(b)
        },
        _setDateDatepicker: function(a, b) {
            var c = this._getInst(a);
            c && (this._setDate(c, b),
            this._updateDatepicker(c),
            this._updateAlternate(c))
        },
        _getDateDatepicker: function(a, b) {
            var c = this._getInst(a);
            return c && !c.inline && this._setDateFromField(c, b),
            c ? this._getDate(c) : null
        },
        _doKeyDown: function(b) {
            var c, d, e, f = a.datepicker._getInst(b.target), g = !0, h = f.dpDiv.is(".ui-datepicker-rtl");
            if (f._keyEvent = !0,
            a.datepicker._datepickerShowing)
                switch (b.keyCode) {
                case 9:
                    a.datepicker._hideDatepicker(),
                    g = !1;
                    break;
                case 13:
                    return e = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", f.dpDiv),
                    e[0] && a.datepicker._selectDay(b.target, f.selectedMonth, f.selectedYear, e[0]),
                    c = a.datepicker._get(f, "onSelect"),
                    c ? (d = a.datepicker._formatDate(f),
                    c.apply(f.input ? f.input[0] : null, [d, f])) : a.datepicker._hideDatepicker(),
                    !1;
                case 27:
                    a.datepicker._hideDatepicker();
                    break;
                case 33:
                    a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                    break;
                case 34:
                    a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                    break;
                case 35:
                    (b.ctrlKey || b.metaKey) && a.datepicker._clearDate(b.target),
                    g = b.ctrlKey || b.metaKey;
                    break;
                case 36:
                    (b.ctrlKey || b.metaKey) && a.datepicker._gotoToday(b.target),
                    g = b.ctrlKey || b.metaKey;
                    break;
                case 37:
                    (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? 1 : -1, "D"),
                    g = b.ctrlKey || b.metaKey,
                    b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                    break;
                case 38:
                    (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, -7, "D"),
                    g = b.ctrlKey || b.metaKey;
                    break;
                case 39:
                    (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? -1 : 1, "D"),
                    g = b.ctrlKey || b.metaKey,
                    b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                    break;
                case 40:
                    (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, 7, "D"),
                    g = b.ctrlKey || b.metaKey;
                    break;
                default:
                    g = !1
                }
            else
                36 === b.keyCode && b.ctrlKey ? a.datepicker._showDatepicker(this) : g = !1;
            g && (b.preventDefault(),
            b.stopPropagation())
        },
        _doKeyPress: function(b) {
            var c, d, e = a.datepicker._getInst(b.target);
            if (a.datepicker._get(e, "constrainInput"))
                return c = a.datepicker._possibleChars(a.datepicker._get(e, "dateFormat")),
                d = String.fromCharCode(null == b.charCode ? b.keyCode : b.charCode),
                b.ctrlKey || b.metaKey || d < " " || !c || c.indexOf(d) > -1
        },
        _doKeyUp: function(b) {
            var c, d = a.datepicker._getInst(b.target);
            if (d.input.val() !== d.lastVal)
                try {
                    c = a.datepicker.parseDate(a.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, a.datepicker._getFormatConfig(d)),
                    c && (a.datepicker._setDateFromField(d),
                    a.datepicker._updateAlternate(d),
                    a.datepicker._updateDatepicker(d))
                } catch (e) {}
            return !0
        },
        _showDatepicker: function(c) {
            if (c = c.target || c,
            "input" !== c.nodeName.toLowerCase() && (c = a("input", c.parentNode)[0]),
            !a.datepicker._isDisabledDatepicker(c) && a.datepicker._lastInput !== c) {
                var d, e, g, h, i, j, k;
                d = a.datepicker._getInst(c),
                a.datepicker._curInst && a.datepicker._curInst !== d && (a.datepicker._curInst.dpDiv.stop(!0, !0),
                d && a.datepicker._datepickerShowing && a.datepicker._hideDatepicker(a.datepicker._curInst.input[0])),
                e = a.datepicker._get(d, "beforeShow"),
                g = e ? e.apply(c, [c, d]) : {},
                g !== !1 && (f(d.settings, g),
                d.lastVal = null,
                a.datepicker._lastInput = c,
                a.datepicker._setDateFromField(d),
                a.datepicker._inDialog && (c.value = ""),
                a.datepicker._pos || (a.datepicker._pos = a.datepicker._findPos(c),
                a.datepicker._pos[1] += c.offsetHeight),
                h = !1,
                a(c).parents().each(function() {
                    return h |= "fixed" === a(this).css("position"),
                    !h
                }),
                i = {
                    left: a.datepicker._pos[0],
                    top: a.datepicker._pos[1]
                },
                a.datepicker._pos = null,
                d.dpDiv.empty(),
                d.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }),
                a.datepicker._updateDatepicker(d),
                i = a.datepicker._checkOffset(d, i, h),
                d.dpDiv.css({
                    position: a.datepicker._inDialog && a.blockUI ? "static" : h ? "fixed" : "absolute",
                    display: "none",
                    left: i.left + "px",
                    top: i.top + "px"
                }),
                d.inline || (j = a.datepicker._get(d, "showAnim"),
                k = a.datepicker._get(d, "duration"),
                d.dpDiv.css("z-index", b(a(c)) + 1),
                a.datepicker._datepickerShowing = !0,
                a.effects && a.effects.effect[j] ? d.dpDiv.show(j, a.datepicker._get(d, "showOptions"), k) : d.dpDiv[j || "show"](j ? k : null),
                a.datepicker._shouldFocusInput(d) && d.input.focus(),
                a.datepicker._curInst = d))
            }
        },
        _updateDatepicker: function(b) {
            this.maxRows = 4,
            g = b,
            b.dpDiv.empty().append(this._generateHTML(b)),
            this._attachHandlers(b);
            var c, d = this._getNumberOfMonths(b), f = d[1], h = 17, i = b.dpDiv.find("." + this._dayOverClass + " a");
            i.length > 0 && e.apply(i.get(0)),
            b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
            f > 1 && b.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", h * f + "em"),
            b.dpDiv[(1 !== d[0] || 1 !== d[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
            b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
            b === a.datepicker._curInst && a.datepicker._datepickerShowing && a.datepicker._shouldFocusInput(b) && b.input.focus(),
            b.yearshtml && (c = b.yearshtml,
            setTimeout(function() {
                c === b.yearshtml && b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml),
                c = b.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function(a) {
            return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus")
        },
        _checkOffset: function(b, c, d) {
            var e = b.dpDiv.outerWidth()
              , f = b.dpDiv.outerHeight()
              , g = b.input ? b.input.outerWidth() : 0
              , h = b.input ? b.input.outerHeight() : 0
              , i = document.documentElement.clientWidth + (d ? 0 : a(document).scrollLeft())
              , j = document.documentElement.clientHeight + (d ? 0 : a(document).scrollTop());
            return c.left -= this._get(b, "isRTL") ? e - g : 0,
            c.left -= d && c.left === b.input.offset().left ? a(document).scrollLeft() : 0,
            c.top -= d && c.top === b.input.offset().top + h ? a(document).scrollTop() : 0,
            c.left -= Math.min(c.left, c.left + e > i && i > e ? Math.abs(c.left + e - i) : 0),
            c.top -= Math.min(c.top, c.top + f > j && j > f ? Math.abs(f + h) : 0),
            c
        },
        _findPos: function(b) {
            for (var c, d = this._getInst(b), e = this._get(d, "isRTL"); b && ("hidden" === b.type || 1 !== b.nodeType || a.expr.filters.hidden(b)); )
                b = b[e ? "previousSibling" : "nextSibling"];
            return c = a(b).offset(),
            [c.left, c.top]
        },
        _hideDatepicker: function(b) {
            var c, d, e, f, g = this._curInst;
            !g || b && g !== a.data(b, "datepicker") || this._datepickerShowing && (c = this._get(g, "showAnim"),
            d = this._get(g, "duration"),
            e = function() {
                a.datepicker._tidyDialog(g)
            }
            ,
            a.effects && (a.effects.effect[c] || a.effects[c]) ? g.dpDiv.hide(c, a.datepicker._get(g, "showOptions"), d, e) : g.dpDiv["slideDown" === c ? "slideUp" : "fadeIn" === c ? "fadeOut" : "hide"](c ? d : null, e),
            c || e(),
            this._datepickerShowing = !1,
            f = this._get(g, "onClose"),
            f && f.apply(g.input ? g.input[0] : null, [g.input ? g.input.val() : "", g]),
            this._lastInput = null,
            this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }),
            a.blockUI && (a.unblockUI(),
            a("body").append(this.dpDiv))),
            this._inDialog = !1)
        },
        _tidyDialog: function(a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(b) {
            if (a.datepicker._curInst) {
                var c = a(b.target)
                  , d = a.datepicker._getInst(c[0]);
                (c[0].id === a.datepicker._mainDivId || 0 !== c.parents("#" + a.datepicker._mainDivId).length || c.hasClass(a.datepicker.markerClassName) || c.closest("." + a.datepicker._triggerClass).length || !a.datepicker._datepickerShowing || a.datepicker._inDialog && a.blockUI) && (!c.hasClass(a.datepicker.markerClassName) || a.datepicker._curInst === d) || a.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(b, c, d) {
            var e = a(b)
              , f = this._getInst(e[0]);
            this._isDisabledDatepicker(e[0]) || (this._adjustInstDate(f, c + ("M" === d ? this._get(f, "showCurrentAtPos") : 0), d),
            this._updateDatepicker(f))
        },
        _gotoToday: function(b) {
            var c, d = a(b), e = this._getInst(d[0]);
            this._get(e, "gotoCurrent") && e.currentDay ? (e.selectedDay = e.currentDay,
            e.drawMonth = e.selectedMonth = e.currentMonth,
            e.drawYear = e.selectedYear = e.currentYear) : (c = new Date,
            e.selectedDay = c.getDate(),
            e.drawMonth = e.selectedMonth = c.getMonth(),
            e.drawYear = e.selectedYear = c.getFullYear()),
            this._notifyChange(e),
            this._adjustDate(d)
        },
        _selectMonthYear: function(b, c, d) {
            var e = a(b)
              , f = this._getInst(e[0]);
            f["selected" + ("M" === d ? "Month" : "Year")] = f["draw" + ("M" === d ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10),
            this._notifyChange(f),
            this._adjustDate(e)
        },
        _selectDay: function(b, c, d, e) {
            var f, g = a(b);
            a(e).hasClass(this._unselectableClass) || this._isDisabledDatepicker(g[0]) || (f = this._getInst(g[0]),
            f.selectedDay = f.currentDay = a("a", e).html(),
            f.selectedMonth = f.currentMonth = c,
            f.selectedYear = f.currentYear = d,
            this._selectDate(b, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
        },
        _clearDate: function(b) {
            var c = a(b);
            this._selectDate(c, "")
        },
        _selectDate: function(b, c) {
            var d, e = a(b), f = this._getInst(e[0]);
            c = null != c ? c : this._formatDate(f),
            f.input && f.input.val(c),
            this._updateAlternate(f),
            d = this._get(f, "onSelect"),
            d ? d.apply(f.input ? f.input[0] : null, [c, f]) : f.input && f.input.trigger("change"),
            f.inline ? this._updateDatepicker(f) : (this._hideDatepicker(),
            this._lastInput = f.input[0],
            "object" != typeof f.input[0] && f.input.focus(),
            this._lastInput = null)
        },
        _updateAlternate: function(b) {
            var c, d, e, f = this._get(b, "altField");
            f && (c = this._get(b, "altFormat") || this._get(b, "dateFormat"),
            d = this._getDate(b),
            e = this.formatDate(c, d, this._getFormatConfig(b)),
            a(f).each(function() {
                a(this).val(e)
            }))
        },
        noWeekends: function(a) {
            var b = a.getDay();
            return [b > 0 && b < 6, ""]
        },
        iso8601Week: function(a) {
            var b, c = new Date(a.getTime());
            return c.setDate(c.getDate() + 4 - (c.getDay() || 7)),
            b = c.getTime(),
            c.setMonth(0),
            c.setDate(1),
            Math.floor(Math.round((b - c) / 864e5) / 7) + 1
        },
        parseDate: function(b, c, d) {
            if (null == b || null == c)
                throw "Invalid arguments";
            if (c = "object" == typeof c ? c.toString() : c + "",
            "" === c)
                return null;
            var e, f, g, h, i = 0, j = (d ? d.shortYearCutoff : null) || this._defaults.shortYearCutoff, k = "string" != typeof j ? j : (new Date).getFullYear() % 100 + parseInt(j, 10), l = (d ? d.dayNamesShort : null) || this._defaults.dayNamesShort, m = (d ? d.dayNames : null) || this._defaults.dayNames, n = (d ? d.monthNamesShort : null) || this._defaults.monthNamesShort, o = (d ? d.monthNames : null) || this._defaults.monthNames, p = -1, q = -1, r = -1, s = -1, t = !1, u = function(a) {
                var c = e + 1 < b.length && b.charAt(e + 1) === a;
                return c && e++,
                c
            }, v = function(a) {
                var b = u(a)
                  , d = "@" === a ? 14 : "!" === a ? 20 : "y" === a && b ? 4 : "o" === a ? 3 : 2
                  , e = "y" === a ? d : 1
                  , f = new RegExp("^\\d{" + e + "," + d + "}")
                  , g = c.substring(i).match(f);
                if (!g)
                    throw "Missing number at position " + i;
                return i += g[0].length,
                parseInt(g[0], 10)
            }, w = function(b, d, e) {
                var f = -1
                  , g = a.map(u(b) ? e : d, function(a, b) {
                    return [[b, a]]
                }).sort(function(a, b) {
                    return -(a[1].length - b[1].length)
                });
                if (a.each(g, function(a, b) {
                    var d = b[1];
                    if (c.substr(i, d.length).toLowerCase() === d.toLowerCase())
                        return f = b[0],
                        i += d.length,
                        !1
                }),
                f !== -1)
                    return f + 1;
                throw "Unknown name at position " + i
            }, x = function() {
                if (c.charAt(i) !== b.charAt(e))
                    throw "Unexpected literal at position " + i;
                i++
            };
            for (e = 0; e < b.length; e++)
                if (t)
                    "'" !== b.charAt(e) || u("'") ? x() : t = !1;
                else
                    switch (b.charAt(e)) {
                    case "d":
                        r = v("d");
                        break;
                    case "D":
                        w("D", l, m);
                        break;
                    case "o":
                        s = v("o");
                        break;
                    case "m":
                        q = v("m");
                        break;
                    case "M":
                        q = w("M", n, o);
                        break;
                    case "y":
                        p = v("y");
                        break;
                    case "@":
                        h = new Date(v("@")),
                        p = h.getFullYear(),
                        q = h.getMonth() + 1,
                        r = h.getDate();
                        break;
                    case "!":
                        h = new Date((v("!") - this._ticksTo1970) / 1e4),
                        p = h.getFullYear(),
                        q = h.getMonth() + 1,
                        r = h.getDate();
                        break;
                    case "'":
                        u("'") ? x() : t = !0;
                        break;
                    default:
                        x()
                    }
            if (i < c.length && (g = c.substr(i),
            !/^\s+/.test(g)))
                throw "Extra/unparsed characters found in date: " + g;
            if (p === -1 ? p = (new Date).getFullYear() : p < 100 && (p += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (p <= k ? 0 : -100)),
            s > -1)
                for (q = 1,
                r = s; ; ) {
                    if (f = this._getDaysInMonth(p, q - 1),
                    r <= f)
                        break;
                    q++,
                    r -= f
                }
            if (h = this._daylightSavingAdjust(new Date(p,q - 1,r)),
            h.getFullYear() !== p || h.getMonth() + 1 !== q || h.getDate() !== r)
                throw "Invalid date";
            return h
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function(a, b, c) {
            if (!b)
                return "";
            var d, e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, f = (c ? c.dayNames : null) || this._defaults.dayNames, g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, h = (c ? c.monthNames : null) || this._defaults.monthNames, i = function(b) {
                var c = d + 1 < a.length && a.charAt(d + 1) === b;
                return c && d++,
                c
            }, j = function(a, b, c) {
                var d = "" + b;
                if (i(a))
                    for (; d.length < c; )
                        d = "0" + d;
                return d
            }, k = function(a, b, c, d) {
                return i(a) ? d[b] : c[b]
            }, l = "", m = !1;
            if (b)
                for (d = 0; d < a.length; d++)
                    if (m)
                        "'" !== a.charAt(d) || i("'") ? l += a.charAt(d) : m = !1;
                    else
                        switch (a.charAt(d)) {
                        case "d":
                            l += j("d", b.getDate(), 2);
                            break;
                        case "D":
                            l += k("D", b.getDay(), e, f);
                            break;
                        case "o":
                            l += j("o", Math.round((new Date(b.getFullYear(),b.getMonth(),b.getDate()).getTime() - new Date(b.getFullYear(),0,0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            l += j("m", b.getMonth() + 1, 2);
                            break;
                        case "M":
                            l += k("M", b.getMonth(), g, h);
                            break;
                        case "y":
                            l += i("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
                            break;
                        case "@":
                            l += b.getTime();
                            break;
                        case "!":
                            l += 1e4 * b.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            i("'") ? l += "'" : m = !0;
                            break;
                        default:
                            l += a.charAt(d)
                        }
            return l
        },
        _possibleChars: function(a) {
            var b, c = "", d = !1, e = function(c) {
                var d = b + 1 < a.length && a.charAt(b + 1) === c;
                return d && b++,
                d
            };
            for (b = 0; b < a.length; b++)
                if (d)
                    "'" !== a.charAt(b) || e("'") ? c += a.charAt(b) : d = !1;
                else
                    switch (a.charAt(b)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        c += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        e("'") ? c += "'" : d = !0;
                        break;
                    default:
                        c += a.charAt(b)
                    }
            return c
        },
        _get: function(a, b) {
            return void 0 !== a.settings[b] ? a.settings[b] : this._defaults[b]
        },
        _setDateFromField: function(a, b) {
            if (a.input.val() !== a.lastVal) {
                var c = this._get(a, "dateFormat")
                  , d = a.lastVal = a.input ? a.input.val() : null
                  , e = this._getDefaultDate(a)
                  , f = e
                  , g = this._getFormatConfig(a);
                try {
                    f = this.parseDate(c, d, g) || e
                } catch (h) {
                    d = b ? "" : d
                }
                a.selectedDay = f.getDate(),
                a.drawMonth = a.selectedMonth = f.getMonth(),
                a.drawYear = a.selectedYear = f.getFullYear(),
                a.currentDay = d ? f.getDate() : 0,
                a.currentMonth = d ? f.getMonth() : 0,
                a.currentYear = d ? f.getFullYear() : 0,
                this._adjustInstDate(a)
            }
        },
        _getDefaultDate: function(a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
        },
        _determineDate: function(b, c, d) {
            var e = function(a) {
                var b = new Date;
                return b.setDate(b.getDate() + a),
                b
            }
              , f = function(c) {
                try {
                    return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), c, a.datepicker._getFormatConfig(b))
                } catch (d) {}
                for (var e = (c.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date, f = e.getFullYear(), g = e.getMonth(), h = e.getDate(), i = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, j = i.exec(c); j; ) {
                    switch (j[2] || "d") {
                    case "d":
                    case "D":
                        h += parseInt(j[1], 10);
                        break;
                    case "w":
                    case "W":
                        h += 7 * parseInt(j[1], 10);
                        break;
                    case "m":
                    case "M":
                        g += parseInt(j[1], 10),
                        h = Math.min(h, a.datepicker._getDaysInMonth(f, g));
                        break;
                    case "y":
                    case "Y":
                        f += parseInt(j[1], 10),
                        h = Math.min(h, a.datepicker._getDaysInMonth(f, g))
                    }
                    j = i.exec(c)
                }
                return new Date(f,g,h)
            }
              , g = null == c || "" === c ? d : "string" == typeof c ? f(c) : "number" == typeof c ? isNaN(c) ? d : e(c) : new Date(c.getTime());
            return g = g && "Invalid Date" === g.toString() ? d : g,
            g && (g.setHours(0),
            g.setMinutes(0),
            g.setSeconds(0),
            g.setMilliseconds(0)),
            this._daylightSavingAdjust(g)
        },
        _daylightSavingAdjust: function(a) {
            return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0),
            a) : null
        },
        _setDate: function(a, b, c) {
            var d = !b
              , e = a.selectedMonth
              , f = a.selectedYear
              , g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
            a.selectedDay = a.currentDay = g.getDate(),
            a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(),
            a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(),
            e === a.selectedMonth && f === a.selectedYear || c || this._notifyChange(a),
            this._adjustInstDate(a),
            a.input && a.input.val(d ? "" : this._formatDate(a))
        },
        _getDate: function(a) {
            var b = !a.currentYear || a.input && "" === a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));
            return b
        },
        _attachHandlers: function(b) {
            var c = this._get(b, "stepMonths")
              , d = "#" + b.id.replace(/\\\\/g, "\\");
            b.dpDiv.find("[data-handler]").map(function() {
                var b = {
                    prev: function() {
                        a.datepicker._adjustDate(d, -c, "M")
                    },
                    next: function() {
                        a.datepicker._adjustDate(d, +c, "M")
                    },
                    hide: function() {
                        a.datepicker._hideDatepicker()
                    },
                    today: function() {
                        a.datepicker._gotoToday(d)
                    },
                    selectDay: function() {
                        return a.datepicker._selectDay(d, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this),
                        !1
                    },
                    selectMonth: function() {
                        return a.datepicker._selectMonthYear(d, this, "M"),
                        !1
                    },
                    selectYear: function() {
                        return a.datepicker._selectMonthYear(d, this, "Y"),
                        !1
                    }
                };
                a(this).bind(this.getAttribute("data-event"), b[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = new Date, P = this._daylightSavingAdjust(new Date(O.getFullYear(),O.getMonth(),O.getDate())), Q = this._get(a, "isRTL"), R = this._get(a, "showButtonPanel"), S = this._get(a, "hideIfNoPrevNext"), T = this._get(a, "navigationAsDateFormat"), U = this._getNumberOfMonths(a), V = this._get(a, "showCurrentAtPos"), W = this._get(a, "stepMonths"), X = 1 !== U[0] || 1 !== U[1], Y = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear,a.currentMonth,a.currentDay) : new Date(9999,9,9)), Z = this._getMinMaxDate(a, "min"), $ = this._getMinMaxDate(a, "max"), _ = a.drawMonth - V, aa = a.drawYear;
            if (_ < 0 && (_ += 12,
            aa--),
            $)
                for (b = this._daylightSavingAdjust(new Date($.getFullYear(),$.getMonth() - U[0] * U[1] + 1,$.getDate())),
                b = Z && b < Z ? Z : b; this._daylightSavingAdjust(new Date(aa,_,1)) > b; )
                    _--,
                    _ < 0 && (_ = 11,
                    aa--);
            for (a.drawMonth = _,
            a.drawYear = aa,
            c = this._get(a, "prevText"),
            c = T ? this.formatDate(c, this._daylightSavingAdjust(new Date(aa,_ - W,1)), this._getFormatConfig(a)) : c,
            d = this._canAdjustMonth(a, -1, aa, _) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>" : S ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>",
            e = this._get(a, "nextText"),
            e = T ? this.formatDate(e, this._daylightSavingAdjust(new Date(aa,_ + W,1)), this._getFormatConfig(a)) : e,
            f = this._canAdjustMonth(a, 1, aa, _) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>" : S ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>",
            g = this._get(a, "currentText"),
            h = this._get(a, "gotoCurrent") && a.currentDay ? Y : P,
            g = T ? this.formatDate(g, h, this._getFormatConfig(a)) : g,
            i = a.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(a, "closeText") + "</button>",
            j = R ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Q ? i : "") + (this._isInRange(a, h) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + g + "</button>" : "") + (Q ? "" : i) + "</div>" : "",
            k = parseInt(this._get(a, "firstDay"), 10),
            k = isNaN(k) ? 0 : k,
            l = this._get(a, "showWeek"),
            m = this._get(a, "dayNames"),
            n = this._get(a, "dayNamesMin"),
            o = this._get(a, "monthNames"),
            p = this._get(a, "monthNamesShort"),
            q = this._get(a, "beforeShowDay"),
            r = this._get(a, "showOtherMonths"),
            s = this._get(a, "selectOtherMonths"),
            t = this._getDefaultDate(a),
            u = "",
            w = 0; w < U[0]; w++) {
                for (x = "",
                this.maxRows = 4,
                y = 0; y < U[1]; y++) {
                    if (z = this._daylightSavingAdjust(new Date(aa,_,a.selectedDay)),
                    A = " ui-corner-all",
                    B = "",
                    X) {
                        if (B += "<div class='ui-datepicker-group",
                        U[1] > 1)
                            switch (y) {
                            case 0:
                                B += " ui-datepicker-group-first",
                                A = " ui-corner-" + (Q ? "right" : "left");
                                break;
                            case U[1] - 1:
                                B += " ui-datepicker-group-last",
                                A = " ui-corner-" + (Q ? "left" : "right");
                                break;
                            default:
                                B += " ui-datepicker-group-middle",
                                A = ""
                            }
                        B += "'>"
                    }
                    for (B += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + A + "'>" + (/all|left/.test(A) && 0 === w ? Q ? f : d : "") + (/all|right/.test(A) && 0 === w ? Q ? d : f : "") + this._generateMonthYearHeader(a, _, aa, Z, $, w > 0 || y > 0, o, p) + "</div><table class='ui-datepicker-calendar'><thead><tr>",
                    C = l ? "<th class='ui-datepicker-week-col'>" + this._get(a, "weekHeader") + "</th>" : "",
                    v = 0; v < 7; v++)
                        D = (v + k) % 7,
                        C += "<th scope='col'" + ((v + k + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + m[D] + "'>" + n[D] + "</span></th>";
                    for (B += C + "</tr></thead><tbody>",
                    E = this._getDaysInMonth(aa, _),
                    aa === a.selectedYear && _ === a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, E)),
                    F = (this._getFirstDayOfMonth(aa, _) - k + 7) % 7,
                    G = Math.ceil((F + E) / 7),
                    H = X && this.maxRows > G ? this.maxRows : G,
                    this.maxRows = H,
                    I = this._daylightSavingAdjust(new Date(aa,_,1 - F)),
                    J = 0; J < H; J++) {
                        for (B += "<tr>",
                        K = l ? "<td class='ui-datepicker-week-col'>" + this._get(a, "calculateWeek")(I) + "</td>" : "",
                        v = 0; v < 7; v++)
                            L = q ? q.apply(a.input ? a.input[0] : null, [I]) : [!0, ""],
                            M = I.getMonth() !== _,
                            N = M && !s || !L[0] || Z && I < Z || $ && I > $,
                            K += "<td class='" + ((v + k + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (M ? " ui-datepicker-other-month" : "") + (I.getTime() === z.getTime() && _ === a.selectedMonth && a._keyEvent || t.getTime() === I.getTime() && t.getTime() === z.getTime() ? " " + this._dayOverClass : "") + (N ? " " + this._unselectableClass + " ui-state-disabled" : "") + (M && !r ? "" : " " + L[1] + (I.getTime() === Y.getTime() ? " " + this._currentClass : "") + (I.getTime() === P.getTime() ? " ui-datepicker-today" : "")) + "'" + (M && !r || !L[2] ? "" : " title='" + L[2].replace(/'/g, "&#39;") + "'") + (N ? "" : " data-handler='selectDay' data-event='click' data-month='" + I.getMonth() + "' data-year='" + I.getFullYear() + "'") + ">" + (M && !r ? "&#xa0;" : N ? "<span class='ui-state-default'>" + I.getDate() + "</span>" : "<a class='ui-state-default" + (I.getTime() === P.getTime() ? " ui-state-highlight" : "") + (I.getTime() === Y.getTime() ? " ui-state-active" : "") + (M ? " ui-priority-secondary" : "") + "' href='#'>" + I.getDate() + "</a>") + "</td>",
                            I.setDate(I.getDate() + 1),
                            I = this._daylightSavingAdjust(I);
                        B += K + "</tr>"
                    }
                    _++,
                    _ > 11 && (_ = 0,
                    aa++),
                    B += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && y === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""),
                    x += B
                }
                u += x
            }
            return u += j,
            a._keyEvent = !1,
            u
        },
        _generateMonthYearHeader: function(a, b, c, d, e, f, g, h) {
            var i, j, k, l, m, n, o, p, q = this._get(a, "changeMonth"), r = this._get(a, "changeYear"), s = this._get(a, "showMonthAfterYear"), t = "<div class='ui-datepicker-title'>", u = "";
            if (f || !q)
                u += "<span class='ui-datepicker-month'>" + g[b] + "</span>";
            else {
                for (i = d && d.getFullYear() === c,
                j = e && e.getFullYear() === c,
                u += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
                k = 0; k < 12; k++)
                    (!i || k >= d.getMonth()) && (!j || k <= e.getMonth()) && (u += "<option value='" + k + "'" + (k === b ? " selected='selected'" : "") + ">" + h[k] + "</option>");
                u += "</select>"
            }
            if (s || (t += u + (!f && q && r ? "" : "&#xa0;")),
            !a.yearshtml)
                if (a.yearshtml = "",
                f || !r)
                    t += "<span class='ui-datepicker-year'>" + c + "</span>";
                else {
                    for (l = this._get(a, "yearRange").split(":"),
                    m = (new Date).getFullYear(),
                    n = function(a) {
                        var b = a.match(/c[+\-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? m + parseInt(a, 10) : parseInt(a, 10);
                        return isNaN(b) ? m : b
                    }
                    ,
                    o = n(l[0]),
                    p = Math.max(o, n(l[1] || "")),
                    o = d ? Math.max(o, d.getFullYear()) : o,
                    p = e ? Math.min(p, e.getFullYear()) : p,
                    a.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; o <= p; o++)
                        a.yearshtml += "<option value='" + o + "'" + (o === c ? " selected='selected'" : "") + ">" + o + "</option>";
                    a.yearshtml += "</select>",
                    t += a.yearshtml,
                    a.yearshtml = null
                }
            return t += this._get(a, "yearSuffix"),
            s && (t += (!f && q && r ? "" : "&#xa0;") + u),
            t += "</div>"
        },
        _adjustInstDate: function(a, b, c) {
            var d = a.drawYear + ("Y" === c ? b : 0)
              , e = a.drawMonth + ("M" === c ? b : 0)
              , f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + ("D" === c ? b : 0)
              , g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d,e,f)));
            a.selectedDay = g.getDate(),
            a.drawMonth = a.selectedMonth = g.getMonth(),
            a.drawYear = a.selectedYear = g.getFullYear(),
            "M" !== c && "Y" !== c || this._notifyChange(a)
        },
        _restrictMinMax: function(a, b) {
            var c = this._getMinMaxDate(a, "min")
              , d = this._getMinMaxDate(a, "max")
              , e = c && b < c ? c : b;
            return d && e > d ? d : e
        },
        _notifyChange: function(a) {
            var b = this._get(a, "onChangeMonthYear");
            b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
        },
        _getNumberOfMonths: function(a) {
            var b = this._get(a, "numberOfMonths");
            return null == b ? [1, 1] : "number" == typeof b ? [1, b] : b
        },
        _getMinMaxDate: function(a, b) {
            return this._determineDate(a, this._get(a, b + "Date"), null)
        },
        _getDaysInMonth: function(a, b) {
            return 32 - this._daylightSavingAdjust(new Date(a,b,32)).getDate()
        },
        _getFirstDayOfMonth: function(a, b) {
            return new Date(a,b,1).getDay()
        },
        _canAdjustMonth: function(a, b, c, d) {
            var e = this._getNumberOfMonths(a)
              , f = this._daylightSavingAdjust(new Date(c,d + (b < 0 ? b : e[0] * e[1]),1));
            return b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())),
            this._isInRange(a, f)
        },
        _isInRange: function(a, b) {
            var c, d, e = this._getMinMaxDate(a, "min"), f = this._getMinMaxDate(a, "max"), g = null, h = null, i = this._get(a, "yearRange");
            return i && (c = i.split(":"),
            d = (new Date).getFullYear(),
            g = parseInt(c[0], 10),
            h = parseInt(c[1], 10),
            c[0].match(/[+\-].*/) && (g += d),
            c[1].match(/[+\-].*/) && (h += d)),
            (!e || b.getTime() >= e.getTime()) && (!f || b.getTime() <= f.getTime()) && (!g || b.getFullYear() >= g) && (!h || b.getFullYear() <= h)
        },
        _getFormatConfig: function(a) {
            var b = this._get(a, "shortYearCutoff");
            return b = "string" != typeof b ? b : (new Date).getFullYear() % 100 + parseInt(b, 10),
            {
                shortYearCutoff: b,
                dayNamesShort: this._get(a, "dayNamesShort"),
                dayNames: this._get(a, "dayNames"),
                monthNamesShort: this._get(a, "monthNamesShort"),
                monthNames: this._get(a, "monthNames")
            }
        },
        _formatDate: function(a, b, c, d) {
            b || (a.currentDay = a.selectedDay,
            a.currentMonth = a.selectedMonth,
            a.currentYear = a.selectedYear);
            var e = b ? "object" == typeof b ? b : this._daylightSavingAdjust(new Date(d,c,b)) : this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));
            return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
        }
    }),
    a.fn.datepicker = function(b) {
        if (!this.length)
            return this;
        a.datepicker.initialized || (a(document).mousedown(a.datepicker._checkExternalClick),
        a.datepicker.initialized = !0),
        0 === a("#" + a.datepicker._mainDivId).length && a("body").append(a.datepicker.dpDiv);
        var c = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof b || "isDisabled" !== b && "getDate" !== b && "widget" !== b ? "option" === b && 2 === arguments.length && "string" == typeof arguments[1] ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c)) : this.each(function() {
            "string" == typeof b ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this].concat(c)) : a.datepicker._attachDatepicker(this, b)
        }) : a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c))
    }
    ,
    a.datepicker = new c,
    a.datepicker.initialized = !1,
    a.datepicker.uuid = (new Date).getTime(),
    a.datepicker.version = "1.11.4",
    a.datepicker
});
;(function($) {
    "use strict";
    if (jQuery(".fileinputs").length) {
        jQuery(".fileinputs input[type='file']").change(function() {
            var file_fake = jQuery(this);
            file_fake.parent().find("button").text(file_fake.val());
        });
    }
    if (jQuery(".fakefile").length) {
        jQuery(".fakefile").on("click", function() {
            jQuery(this).parent().find("input[type='file']").click();
        });
    }
    if (jQuery(".question_tags,.post_tag").length) {
        jQuery('.question_tags,.post_tag').tag();
    }
    if (jQuery(".poll_options").length) {
        jQuery(".poll_options").each(function() {
            var poll_this = jQuery(this);
            var question_poll = poll_this.parent().find(".question_poll").is(":checked");
            if (question_poll == 1) {
                poll_this.slideDown(200);
            } else {
                poll_this.slideUp(200);
            }
            poll_this.parent().find(".question_poll").on("click", function() {
                var question_poll_c = poll_this.parent().find(".question_poll").is(":checked");
                if (question_poll_c == 1) {
                    poll_this.slideDown(200);
                } else {
                    poll_this.slideUp(200);
                }
            });
        });
    }
    if (jQuery(".question_polls_item,.question_upload_item").length) {
        jQuery(".question_polls_item,.question_upload_item").sortable({
            placeholder: "ui-state-highlight"
        });
    }
    if (jQuery(".add_poll_button_js").length) {
        jQuery(".add_poll_button_js").on("click", function() {
            var add_poll = jQuery(this).parent().find(".question_items > li").length;
            if (add_poll > 0) {
                var i_count = 0;
                while (i_count < add_poll) {
                    if (jQuery(this).parent().find(".question_items > #poll_li_" + add_poll).length) {
                        add_poll++;
                    }
                    i_count++;
                }
            } else {
                add_poll++;
            }
            jQuery(this).parent().find('.question_items').append('<li id="poll_li_' + add_poll + '"><div class="poll-li"><p><input class="ask" name="ask[' + add_poll + '][title]" value="" type="text"><i class="icon-comment"></i></p><input name="ask[' + add_poll + '][id]" value="' + add_poll + '" type="hidden"><div class="del-item-li"><i class="icon-cancel"></i></div><div class="move-poll-li"><i class="icon-menu"></i></div></div></li>');
            jQuery('#poll_li_' + add_poll).hide().fadeIn();
            jQuery(".del-item-li").on("click", function() {
                jQuery(this).parent().parent().addClass('removered').fadeOut(function() {
                    jQuery(this).remove();
                });
            });
            return false;
        });
    }
    if (jQuery(".del-item-li").length) {
        jQuery(".del-item-li").on("click", function() {
            jQuery(this).parent().parent().addClass('removered').fadeOut(function() {
                jQuery(this).remove();
            });
        });
    }
    if (jQuery(".video_description_input,.video_description").length) {
        jQuery(".video_description").each(function() {
            var video_this = jQuery(this);
            var video_description = video_this.parent().find(".video_description_input").is(":checked");
            if (video_description == 1) {
                video_this.slideDown(200);
            } else {
                video_this.slideUp(200);
            }
            video_this.parent().find(".video_description_input").on("click", function() {
                var video_description_c = video_this.parent().find(".video_description_input").is(":checked");
                if (video_description_c == 1) {
                    video_this.slideDown(200);
                } else {
                    video_this.slideUp(200);
                }
            });
        });
    }
    if (jQuery(".add_upload_button_js").length) {
        jQuery(".add_upload_button_js").on("click", function() {
            var add_attach = jQuery(this).parent().find(".question_items > li").length;
            if (add_attach > 0) {
                var i_count = 0;
                while (i_count < add_attach) {
                    if (jQuery(this).parent().find(".question_items > #attach_li_" + add_attach).length) {
                        add_attach++;
                    }
                    i_count++;
                }
            } else {
                add_attach++;
            }
            jQuery(this).parent().find('.question_items').append('<li id="attach_li_' + add_attach + '"><div class="attach-li"><div class="fileinputs"><input type="file" class="file" name="attachment_m[' + add_attach + '][file_url]" id="attachment_m[' + add_attach + '][file_url]"><i class="icon-camera"></i><div class="fakefile"><button type="button">' + wpqa_js.select_file + '</button><span><i class="icon-arrow-up"></i>' + wpqa_js.browse + '</span></div><div class="del-item-li"><i class="icon-cancel"></i></div><div class="move-poll-li"><i class="icon-menu"></i></div></div></div></li>');
            jQuery(".fileinputs input[type='file']").change(function() {
                var file_fake = jQuery(this);
                file_fake.parent().find("button").text(file_fake.val());
            });
            jQuery(".fakefile").on("click", function() {
                jQuery(this).parent().find("input[type='file']").click();
            });
            jQuery('#attach_li_' + add_attach).hide().fadeIn();
            jQuery(".del-item-li").on("click", function() {
                jQuery(this).parent().parent().parent().fadeOut(function() {
                    jQuery(this).remove();
                });
            });
            return false;
        });
    }
    if (jQuery(".the-details").length) {
        jQuery("#wp-question-details-wrap").appendTo(".the-details");
        jQuery("#wp-post-details-wrap").appendTo(".the-details");
    }
    if (jQuery(".panel-pop > i").length) {
        jQuery(".panel-pop > i").on("click", function() {
            jQuery.when(jQuery(this).parent().fadeOut(200)).done(function() {
                jQuery(this).css({
                    "top": "-100%",
                    "display": "none"
                });
                jQuery("#wpqa-message .the-title").val("");
                jQuery(".wrap-pop").remove();
            });
        });
    }
    un_login_panel("#signup-panel", ".signup-panel-un");
    un_login_panel("#lost-password", ".discy_users_only .reset-password,.lost-password-login");
    un_login_panel("#lost-password", ".lost-passwords", "no", ".discy_users_only");
    un_login_panel("#login-panel", ".login-panel-un");
    function un_login_panel(whatId, whatClass, whatFrom, bodyClass) {
        jQuery((whatFrom == "no" ? (bodyClass != "" ? bodyClass + " " : "") + ".wpqa_form," : "") + whatClass).on("click", (whatFrom == "no" ? whatClass : ""), function() {
            var data_width = jQuery(whatId).attr("data-width");
            jQuery(".panel-un-login").hide(10);
            jQuery(whatId).animate({
                opacity: 'show',
                height: 'show'
            }, 400);
            return false;
        });
    }
    panel_pop("#signup-panel", ".signup-panel,.button-sign-up,.login-links-r a");
    panel_pop("#lost-password", ".lost-password,.discy_for_all .reset-password");
    panel_pop("#lost-password", ".lost-passwords", "no", ".discy_for_all");
    panel_pop("#login-panel", ".login-panel,.button-sign-in,.sign-in-lock,.comment-reply-login");
    panel_pop("#wpqa-question", ".wpqa-question");
    panel_pop("#wpqa-question-user", ".ask-question-user");
    panel_pop("#wpqa-post", ".wpqa-post");
    panel_pop("#wpqa-message", ".wpqa-message,.message-reply a");
    panel_pop("#wpqa-report", ".report_c,.report_q");
    function panel_pop(whatId, whatClass, whatFrom, bodyClass) {
        if (jQuery(whatId).length) {
            jQuery((whatFrom == "no" ? (bodyClass != "" ? bodyClass + " " : "") + ".wpqa_form," : "") + whatClass).on("click", (whatFrom == "no" ? whatClass : ""), function() {
                if (jQuery(whatClass).parent().hasClass("message-reply")) {
                    var user_id = jQuery(this).attr("data-user-id");
                    var message_id = jQuery(this).attr("data-id");
                    if (message_id !== undefined && message_id !== false) {
                        jQuery.ajax({
                            url: wpqa_js.admin_url,
                            type: "POST",
                            data: {
                                action: 'wpqa_message_reply',
                                message_id: message_id
                            },
                            success: function(data) {
                                jQuery("#wpqa-message .the-title").val(data);
                            }
                        });
                    }
                    if (user_id !== undefined && user_id !== false) {
                        if (jQuery(".message_user_id").length) {
                            jQuery(".message_user_id").attr("value", user_id);
                        } else {
                            jQuery("#wpqa-message .send-message").after('<input type="hidden" name="user_id" class="message_user_id" value="' + user_id + '">');
                        }
                    }
                }
                var data_width = jQuery(whatId).attr("data-width");
                jQuery(".panel-pop").css({
                    "top": "-100%",
                    "display": "none"
                });
                jQuery(".wrap-pop").remove();
                var is_RTL = jQuery('body').hasClass('rtl') ? true : false;
                var cssMargin = (is_RTL == true ? "margin-right" : "margin-left");
                var cssValue = "-" + (data_width !== undefined && data_width !== false ? data_width / 2 : "") + "px";
                jQuery(whatId).css("width", (data_width !== undefined && data_width !== false ? data_width : "") + "px").css(cssMargin, cssValue).show().animate({
                    "top": "7%"
                }, 200);
                jQuery("html,body").animate({
                    scrollTop: 0
                }, 200);
                jQuery("body").prepend("<div class='wrap-pop'></div>");
                wrap_pop();
                return false;
            });
        }
    }
    function wrap_pop() {
        jQuery(".wrap-pop").on("click", function() {
            jQuery.when(jQuery(".panel-pop").fadeOut(200)).done(function() {
                jQuery(this).css({
                    "top": "-100%",
                    "display": "none"
                });
                jQuery("#wpqa-message .the-title").val("");
                jQuery(".wrap-pop").remove();
            });
        });
    }
    if (jQuery(".message-delete a").length) {
        jQuery(".message-delete a").live("click", function() {
            if (confirm(wpqa_js.sure_delete_message)) {
                return true;
            } else {
                return false;
            }
        });
    }
    if (jQuery(".view-message").length) {
        jQuery(".view-message").live("click", function() {
            var view_message = jQuery(this);
            var message_id = view_message.attr("data-id");
            var message_content = view_message.parent().parent().find(".message-content");
            view_message.find(".message-open-close").removeClass("icon-minus").addClass("icon-plus");
            if (view_message.hasClass("view-message-open")) {
                message_content.slideUp(300);
                view_message.removeClass("view-message-open");
            } else {
                if (message_content.find(" > div").length) {
                    message_content.slideDown(300);
                    view_message.addClass("view-message-open").find(".message-open-close").removeClass("icon-plus").addClass("icon-minus");
                } else {
                    view_message.addClass("view-message-open").parent().parent().find(".small_loader").addClass("small_loader_display");
                    jQuery.ajax({
                        url: wpqa_js.admin_url,
                        type: "POST",
                        data: {
                            action: 'wpqa_message_view',
                            message_id: message_id
                        },
                        success: function(data) {
                            view_message.parent().find(".message-new").removeClass("message-new");
                            view_message.parent().parent().find(".small_loader").removeClass("small_loader_display");
                            view_message.find(".message-open-close").removeClass("icon-plus").addClass("icon-minus");
                            message_content.html(data).slideDown(300);
                            view_message.find(".message-new").removeClass("message-new");
                        }
                    });
                }
            }
            return false;
        });
    }
    if (jQuery(".block_message").length) {
        jQuery(".block_message").live("click", function() {
            var block_message = jQuery(this);
            var user_id = block_message.attr("data-id");
            jQuery(".block_message_" + user_id).hide();
            jQuery.ajax({
                url: wpqa_js.admin_url,
                type: "POST",
                data: {
                    action: (block_message.hasClass("unblock_message") ? 'wpqa_unblock_message' : 'wpqa_block_message'),
                    user_id: user_id
                },
                success: function(data) {
                    if (block_message.hasClass("unblock_message")) {
                        jQuery(".block_message_" + user_id).removeClass("unblock_message").text(wpqa_js.block_message_text).show();
                    } else {
                        jQuery(".block_message_" + user_id).addClass("unblock_message").text(wpqa_js.unblock_message_text).show();
                    }
                }
            });
            return false;
        });
    }
    if (jQuery(".post-delete,.question-delete").length) {
        jQuery(".post-delete,.question-delete").on("click", function() {
            var var_delete = (jQuery(".post-delete").length ? wpqa_js.sure_delete_post : wpqa_js.sure_delete);
            if (confirm(var_delete)) {
                return true;
            } else {
                return false;
            }
        });
    }
    if (jQuery(".question-follow a").length) {
        jQuery(".question-follow a").on("click", function() {
            var question_follow = jQuery(this);
            var question_class = question_follow.closest(".article-question.article-post.question");
            var post_id = question_class.attr('id').replace("post-", "");
            question_follow.hide();
            question_follow.parent().find(".loader_2").show();
            jQuery.ajax({
                url: wpqa_js.admin_url,
                type: "POST",
                data: {
                    action: 'wpqa_question_' + (question_follow.hasClass("unfollow-question") ? "unfollow" : "follow"),
                    post_id: post_id
                },
                success: function(data) {
                    if (question_follow.hasClass("unfollow-question")) {
                        question_follow.removeClass("unfollow-question").parent().removeClass("li-follow-question").find("i").addClass("icon-plus").removeClass("icon-minus");
                    } else {
                        question_follow.addClass("unfollow-question").parent().addClass("li-follow-question").find("i").removeClass("icon-plus").addClass("icon-minus");
                    }
                    question_follow.attr("original-title", (question_follow.hasClass("unfollow-question") ? wpqa_js.follow_question_attr : wpqa_js.unfollow_question_attr)).show().parent().find(".loader_2").hide().parent().parent().find(".question-followers span").text(data);
                }
            });
            return false;
        });
    }
    question_stats("close");
    question_stats("open");
    function question_stats(stats) {
        if (jQuery(".question-" + stats).length) {
            jQuery(".question-" + stats).on("click", function() {
                var question_stats = jQuery(this);
                var question_class = question_stats.closest(".article-question.article-post.question");
                var post_id = question_class.attr('id').replace("post-", "");
                question_stats.hide();
                jQuery.ajax({
                    url: wpqa_js.admin_url,
                    type: "POST",
                    data: {
                        action: 'wpqa_question_' + stats,
                        post_id: post_id
                    },
                    success: function(data) {
                        location.reload();
                    }
                });
                return false;
            });
        }
    }
    if (jQuery(".paid-question-area").length) {
        jQuery(".paid-details").click(function() {
            jQuery(".paid-question-area").slideToggle(400);
            return false;
        });
    }
    if (jQuery(".pay-to-sticky").length) {
        jQuery(".pay-to-sticky").click(function() {
            jQuery(".pay-to-sticky-area").slideToggle(400);
            jQuery(".pumb-question-area").slideUp(400);
            return false;
        });
    }
    if (jQuery(".pumb-question").length) {
        jQuery(".pumb-question").click(function() {
            jQuery(".pumb-question-area").slideToggle(400);
            jQuery(".pay-to-sticky-area").slideUp(400);
            return false;
        });
    }
    if (jQuery("li.comment").length) {
        wpqa_best_answer("best_answer_re");
        wpqa_best_answer("best_answer_a");
        function wpqa_best_answer(type) {
            jQuery("li.comment").on("click", "." + type, function() {
                jQuery("#comments .wpqa_error").slideUp(200);
                var best_answer = jQuery(this);
                var comment_id = best_answer.parent().parent().parent().parent().parent().attr('id').replace("comment-", "");
                jQuery("." + type).hide();
                jQuery.ajax({
                    url: wpqa_js.admin_url,
                    type: "POST",
                    data: {
                        action: 'wpqa_' + type,
                        comment_id: comment_id
                    },
                    success: function(result) {
                        if (result == "best") {
                            if (type == "best_answer_a") {
                                jQuery("#comment-" + comment_id).addClass(".comment-best-answer");
                                jQuery("#comment-" + comment_id + " .comment-meta").before('<div class="best-answer">' + wpqa_js.best_answer + '</div>');
                                jQuery("#comment-" + comment_id + " .comment-reply").append('<li><a class="best_answer_re" href="#" title="' + wpqa_js.cancel_best_answer + '"><i class="icon-cancel"></i>' + wpqa_js.cancel_best_answer + '</a></li>');
                            } else {
                                jQuery(".commentlist .comment-reply").append('<li><a class="best_answer_a" href="#" title="' + wpqa_js.choose_best_answer + '"><i class="icon-check"></i>' + wpqa_js.choose_best_answer + '</a></li>');
                                jQuery(".best-answer").remove();
                                jQuery(".comment-best-answer").removeClass("comment-best-answer");
                            }
                        } else if (result == "remove_best") {
                            jQuery(".commentlist .comment-reply").append('<li><a class="best_answer_a" href="#" title="' + wpqa_js.choose_best_answer + '"><i class="icon-check"></i>' + wpqa_js.choose_best_answer + '</a></li>');
                            jQuery(".best-answer").remove();
                            jQuery(".comment-best-answer").removeClass("comment-best-answer");
                        } else {
                            jQuery("#comment-" + result).addClass(".comment-best-answer").find(".wpqa_error").text(wpqa_js.best_answer_selected).slideDown(200);
                            jQuery("#comment-" + result + " .comment-meta").before('<div class="best-answer">' + wpqa_js.best_answer + '</div>');
                            jQuery("#comment-" + result + " .comment-reply").append('<li><a class="best_answer_re" href="#" title="' + wpqa_js.cancel_best_answer + '"><i class="icon-cancel"></i>' + wpqa_js.cancel_best_answer + '</a></li>');
                            jQuery("html,body").animate({
                                scrollTop: jQuery("#comment-" + result).offset().top - 35
                            }, "slow");
                        }
                        jQuery("." + type).parent().remove();
                    }
                });
                return false;
            });
        }
    }
    if (jQuery(".single-question .comment-best-answer").length) {
        jQuery(".comment-best-answer").prependTo("ol.commentlist");
        jQuery(".comment-best-answer").hide;
    }
    if (jQuery("#respond").length) {
        if (window.location.hash == "#respond") {
            jQuery(".show-answer-form").remove();
            jQuery(".comment-form-hide,.comment-form-hide").show();
        }
        jQuery(".meta-answer").live("click", function() {
            jQuery(".show-answer-form").remove();
            jQuery(".comment-form-hide,.comment-form-hide").show();
            jQuery("html,body").animate({
                scrollTop: jQuery("#respond").offset().top - 35
            }, "slow");
        });
        jQuery(".wpqa-reply-link").live("click", function() {
            jQuery(".show-answer-form").remove();
            jQuery(".comment-form-hide,.comment-form-hide").show();
            var reply_link = jQuery(this);
            jQuery(".wpqa-cancel-link").remove();
            jQuery("html,body").animate({
                scrollTop: jQuery("#respond").offset().top - 35
            }, "slow");
            jQuery("#respond #comment_parent").val(reply_link.attr("data-id"));
            jQuery("#respond .section-title").append('<div class="wpqa-cancel-link cancel-comment-reply"><a rel="nofollow" id="cancel-comment-reply-link" href="#respond">' + wpqa_js.cancel_reply + '</a></div>');
            return false;
        });
        jQuery(".wpqa-cancel-link a").live("click", function() {
            jQuery(".wpqa-cancel-link").remove();
            jQuery("#respond #comment_parent").val(0);
            return false;
        });
        var check_email = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        jQuery("#respond #submit").on("click", function() {
            if (wpqa_js.comment_editor == "comment_editor") {
                if (jQuery(".wp-editor-wrap").hasClass("tmce-active")) {
                    var comment_ifr = jQuery("#respond #comment_ifr").contents().find("body").html();
                } else {
                    var comment_ifr = jQuery("#respond .wp-editor-area").val();
                }
            } else {
                var comment_ifr = jQuery("#respond #comment").val();
            }
            var comment_name = (jQuery("#respond #comment_name").length ? jQuery("#respond #comment_name").val() : "not_empty");
            var comment_email = (jQuery("#respond #comment_email").length ? jQuery("#respond #comment_email").val() : "not_empty");
            if ((wpqa_js.require_name_email == 'require_name_email' && comment_email != 'not_empty' && !check_email.test(comment_email)) || (wpqa_js.require_name_email == 'require_name_email' && (comment_name == '' || comment_email == '')) || comment_ifr == '' || comment_ifr == '<p><br data-mce-bogus="1"></p>' || comment_ifr == '<p><br></p>' || comment_ifr == '<p></p>') {
                if (wpqa_js.require_name_email == 'require_name_email') {
                    if (comment_name == '') {
                        var wpqa_error_text = wpqa_js.wpqa_error_name;
                    } else if (comment_email == '') {
                        var wpqa_error_text = wpqa_js.wpqa_error_email;
                    } else if (comment_email != 'not_empty' && !check_email.test(comment_email)) {
                        var wpqa_error_text = wpqa_js.wpqa_valid_email;
                    } else {
                        var wpqa_error_text = wpqa_js.wpqa_error_comment;
                    }
                }
                jQuery(".wpqa_error").animate({
                    opacity: 'hide',
                    height: 'hide'
                }, 400).remove();
                jQuery("#respond .comment-form").prepend('<div class="wpqa_error">' + wpqa_error_text + '</div>');
                jQuery(".wpqa_error").animate({
                    opacity: 'show',
                    height: 'show'
                }, 400);
                return false;
            }
        });
    }
    function vote_message(vote) {
        vote.find(".vote_result").show();
        vote.find(".li_loader").hide();
    }
    jQuery(".wpqa_vote").live("click", function() {
        var this_vote = jQuery(this);
        var type = this_vote.attr("data-type");
        var vote_type = this_vote.attr("data-vote-type");
        this_vote.parent().parent().addClass("active-vote");
        if (type == "question") {
            var vote_parent = this_vote.parent().parent().parent().parent();
        } else {
            var vote_parent = this_vote.parent().parent();
        }
        vote_parent.find(".vote_result").hide();
        vote_parent.find(".li_loader").show();
        vote_parent.parent().parent().find(".wpqa_error").slideUp(200);
        if (this_vote.hasClass("vote_not_user")) {
            vote_parent.parent().parent().find(".wpqa_error").text(wpqa_js.no_vote_user).slideDown(200);
            vote_message(vote_parent);
            this_vote.parent().parent().removeClass("active-vote");
        } else if (this_vote.hasClass("vote_not_allow")) {
            vote_parent.parent().parent().find(".wpqa_error").text((type == "question" ? wpqa_js.no_vote_question : wpqa_js.no_vote_answer)).slideDown(200);
            vote_message(vote_parent);
            this_vote.parent().parent().removeClass("active-vote");
        } else if (this_vote.hasClass("vote_allow")) {
            var id = this_vote.attr('id').replace(type + '_vote_' + vote_type + '-', "");
            jQuery.ajax({
                url: wpqa_js.admin_url,
                type: "POST",
                data: {
                    action: 'wpqa_' + (type == "comment" ? "comment" : "question") + '_vote_' + vote_type,
                    id: id
                },
                success: function(data) {
                    if (Math.floor(data) == data && jQuery.isNumeric(data)) {
                        if (data > 0) {
                            vote_parent.find(".vote_result").removeClass("vote_red");
                        } else if (data == 0) {
                            vote_parent.find(".vote_result").removeClass("vote_red");
                        } else if (data < 0) {
                            vote_parent.find(".vote_result").addClass("vote_red");
                        }
                    } else {
                        data = data.replace("no_vote_more", "");
                        vote_parent.parent().parent().find(".wpqa_error").text((type == "question" ? wpqa_js.no_vote_more : wpqa_js.no_vote_more_answer)).slideDown(200);
                    }
                    vote_parent.find(".vote_result").html(data);
                    vote_message(vote_parent);
                    this_vote.parent().parent().removeClass("active-vote");
                }
            });
        }
        return false;
    });
    wpqa_report();
    function wpqa_report() {
        if (jQuery(".report_q,.report_c").length) {
            var report_type = "";
            jQuery(".report_q,.report_c").on("click", function() {
                report_type = jQuery(this).attr("class");
                if (jQuery(".report_id").length) {
                    jQuery(".report_id").remove();
                }
                if (report_type == "report_c") {
                    var report_v = jQuery(this);
                    var report_id = report_v.attr("href");
                    jQuery(".submit-report").append('<input type="hidden" class="report_id" name="report_id" value="' + report_id + '">');
                }
                return false;
            });
            jQuery(".submit-report").submit(function() {
                var report_v = jQuery(this);
                var explain = report_v.find("textarea");
                jQuery('input[type="submit"]', report_v).hide();
                jQuery('.load_span', report_v).show().css({
                    "display": "block"
                });
                if (explain.val() == '') {
                    explain.css("border-color", "#e1e2e3");
                    if (explain.val() == '') {
                        explain.css("border-color", "#F00");
                    }
                    jQuery(".wpqa_error", report_v).html('<span class="required-error">' + wpqa_js.wpqa_error_text + '</span>').animate({
                        opacity: 'show',
                        height: 'show'
                    }, 400).delay(1200).animate({
                        opacity: 'hide',
                        height: 'hide'
                    }, 400);
                } else {
                    var fromSerialize = report_v.serialize();
                    var fromWithAction = fromSerialize + "&action=wpqa_" + report_type;
                    jQuery.post(wpqa_js.admin_url, fromWithAction, function(data) {
                        if (data == "deleted_report") {
                            if (report_type == "report_c") {
                                location.reload();
                            } else {
                                window.location.href = wpqa_js.home_url;
                            }
                        } else {
                            explain.val("").css("border-color", "#e1e2e3");
                            jQuery(".wpqa_success", report_v).text(wpqa_js.reported).animate({
                                opacity: 'show',
                                height: 'show'
                            }, 400).delay(1200).animate({
                                opacity: 'hide',
                                height: 'hide'
                            }, 400);
                        }
                    });
                }
                jQuery('.load_span', report_v).hide().css({
                    "display": "none"
                });
                jQuery('input[type="submit"]', report_v).show();
                return false;
            });
        }
    }
    if (jQuery(".poll_results").length) {
        jQuery(".poll_results").on("click", function() {
            jQuery(".poll_2").fadeOut(200);
            jQuery(".poll_1").delay(500).slideDown(200);
            return false;
        });
    }
    if (jQuery(".poll_polls").length) {
        jQuery(".poll_polls").on("click", function() {
            jQuery(".poll_1").fadeOut(200);
            jQuery(".poll_2").delay(500).slideDown(200);
            return false;
        });
    }
    if (jQuery(".poll-submit").length) {
        jQuery(".poll-submit").on("click", function() {
            var question_poll = jQuery(this);
            var poll_val = question_poll.parent().find('.required-item:checked');
            jQuery(question_poll).parent().find("input,label").hide().parent().find(".load_span").show();
            if (poll_val.length == 0) {
                jQuery(question_poll).parent().find("input,label").show().parent().find(".load_span").hide();
                question_poll.parent().parent().parent().parent().parent().parent().find(".wpqa_error").text(wpqa_js.wpqa_error_text).slideDown(200).delay(1200).slideUp(200);
            } else {
                var poll_id = poll_val.val().replace('poll_', "");
                var poll_title = poll_val.attr("data-rel").replace('poll_', "");
                var question_class = question_poll.closest(".article-question.article-post.question");
                var post_id = question_class.attr("id").replace('post-', "");
                jQuery.ajax({
                    url: wpqa_js.admin_url,
                    type: "POST",
                    data: {
                        action: 'wpqa_question_poll',
                        poll_id: poll_id,
                        poll_title: poll_title,
                        post_id: post_id
                    },
                    success: function(data) {
                        if (data == "no_poll") {
                            question_poll.parent().parent().parent().parent().parent().parent().find(".wpqa_error").text(wpqa_js.no_poll_more).slideDown(200).delay(1200).slideUp(200);
                            jQuery(question_poll).parent().find("input,label").show().parent().find(".load_span").hide();
                        }
                        location.reload();
                    }
                });
            }
            return false;
        });
    }
    if (jQuery(".ask_anonymously").length) {
        var wpqa_setting = jQuery(".ask_anonymously:checked").length;
        if (wpqa_setting == 1) {
            jQuery(".ask_named").hide(10);
            jQuery(".ask_none").show(10);
        } else {
            jQuery(".ask_named").show(10);
            jQuery(".ask_none").hide(10);
        }
        jQuery(".ask_anonymously").click(function() {
            var wpqa_setting = jQuery(".ask_anonymously:checked").length;
            if (wpqa_setting == 1) {
                jQuery(".ask_named").hide(10);
                jQuery(".ask_none").show(10);
            } else {
                jQuery(".ask_named").show(10);
                jQuery(".ask_none").hide(10);
            }
        });
    }
    wpqa_favorite("add_favorite");
    wpqa_favorite("remove_favorite");
    function wpqa_favorite(favorite_type) {
        if (jQuery("." + favorite_type).length) {
            jQuery("." + favorite_type).on("click", function() {
                var var_favorite = jQuery(this);
                var question_class = var_favorite.closest(".article-question.article-post.question");
                var post_id = question_class.attr("id").replace('post-', "");
                var_favorite.hide();
                var_favorite.parent().find(".loader_2").show();
                jQuery.ajax({
                    url: wpqa_js.admin_url,
                    type: "POST",
                    data: {
                        action: 'wpqa_' + var_favorite.attr("class"),
                        post_id: post_id
                    },
                    success: function(data) {
                        var_favorite.find("span").text(data);
                        if (var_favorite.parent().hasClass("active-favorite")) {
                            var_favorite.addClass("add_favorite").removeClass("remove_favorite").attr("title", wpqa_js.add_favorite).parent().removeClass("active-favorite");
                        } else {
                            var_favorite.addClass("remove_favorite").removeClass("add_favorite").attr("title", wpqa_js.remove_favorite).parent().addClass("active-favorite");
                        }
                        var_favorite.show();
                        var_favorite.parent().find(".loader_2").hide();
                    }
                });
                return false;
            });
        }
    }
    if (jQuery(".progressbar-percent").length) {
        jQuery(".progressbar-percent").each(function() {
            var $this = jQuery(this);
            var percent = $this.attr("attr-percent");
            $this.bind("inview", function(event, isInView, visiblePartX, visiblePartY) {
                if (isInView) {
                    $this.animate({
                        "width": percent + "%"
                    }, 700);
                }
            });
        });
    }
    if (jQuery(".categories-toggle-accordion").length) {
        jQuery(".categories-toggle-accordion .accordion-title").each(function() {
            jQuery(this).find(" > a > i").click(function() {
                var categories = jQuery(this);
                categories.toggleClass("wpqa-minus");
                categories.parent().parent().next().slideToggle(300);
                return false;
            });
        });
    }
    if (jQuery(".following_not,.following_you").length) {
        wpqa_follow("following_not", "following_you");
        wpqa_follow("following_you", "following_not");
        function wpqa_follow(follow, next_follow) {
            jQuery("." + follow).live("click", function() {
                var following_var = jQuery(this);
                var following_var_id = following_var.attr("data-rel");
                following_var.hide();
                following_var.parent().addClass("user_follow_active");
                jQuery.ajax({
                    url: wpqa_js.admin_url,
                    type: "POST",
                    data: {
                        action: 'wpqa_' + follow,
                        following_var_id: following_var_id
                    },
                    success: function(result) {
                        if (following_var.parent().hasClass("user_follow_2") || following_var.parent().hasClass("user_follow_3")) {
                            if (following_var.find(".follow-count").length) {
                                following_var.find(".follow-count").text(result);
                            }
                            following_var.addClass(next_follow).removeClass(follow).attr("title", (follow == "following_not" ? wpqa_js.follow_question : wpqa_js.unfollow_question)).show().parent().removeClass("user_follow_active");
                            if (follow == "following_not") {
                                following_var.parent().removeClass("user_follow_yes").find(".follow-value").text((follow == "following_not" ? wpqa_js.follow_question : wpqa_js.unfollow_question));
                            } else {
                                following_var.parent().addClass("user_follow_yes").find(".follow-value").text((follow == "following_not" ? wpqa_js.follow_question : wpqa_js.unfollow_question));
                            }
                        } else {
                            following_var.addClass(next_follow).removeClass(follow).attr("title", (follow == "following_not" ? wpqa_js.follow_question : wpqa_js.unfollow_question)).show().parent().removeClass("user_follow_active");
                            if (follow == "following_not") {
                                following_var.parent().removeClass("user_follow_yes").find("i").removeClass("icon-minus").addClass("icon-plus");
                            } else {
                                following_var.parent().addClass("user_follow_yes").find("i").removeClass("icon-plus").addClass("icon-minus");
                            }
                        }
                    }
                });
                return false;
            });
        }
    }
    if (jQuery(".pumb-question-area a").length) {
        jQuery(".pumb-question-area a").on("click", function() {
            var point_a = jQuery(this);
            var input_add = jQuery("#input-add-point");
            var input_add_point = input_add.val();
            var question_class = point_a.closest(".article-question.article-post.question");
            var question_content = point_a.closest(".question-content");
            var post_id = question_class.attr("id").replace('post-', "");
            point_a.hide();
            question_content.find(".load_span").show();
            jQuery.ajax({
                url: wpqa_js.admin_url,
                type: "POST",
                data: {
                    action: 'wpqa_add_point',
                    input_add_point: input_add_point,
                    post_id: post_id
                },
                success: function(data) {
                    question_content.find(".wpqa_error").hide(10).text(data).slideDown(200).delay(1200).slideUp(200);
                    point_a.show();
                    question_content.find(".load_span").hide();
                    input_add.val("");
                }
            });
            return false;
        });
    }
    wpqa_forms(".login-form", "login");
    wpqa_forms(".wpqa-lost-password", "password");
    wpqa_forms(".signup_form", "signup");
    function wpqa_forms(whatClass, whatAction) {
        if (jQuery(whatClass).length) {
            jQuery(whatClass).submit(function() {
                var thisform = jQuery(this);
                jQuery('input[type="submit"]', thisform).hide();
                jQuery('.load_span', thisform).show().css({
                    "display": "block"
                });
                jQuery('.required-item', thisform).each(function() {
                    var required = jQuery(this);
                    required.css("border-color", "#e1e2e3");
                    if (required.val() == '' && required.attr("type") != "file") {
                        required.css("border-color", "#F00");
                        return false;
                    }
                });
                if (jQuery('.wpqa_captcha', thisform).length) {
                    var wpqa_captcha = jQuery('.wpqa_captcha', thisform);
                    var url = wpqa_js.wpqa_dir + "captcha/captcha.php";
                    var postStr = wpqa_captcha.attr("name") + "=" + encodeURIComponent(wpqa_captcha.val());
                    wpqa_captcha.css("border-color", "#e1e2e3");
                    if (wpqa_captcha.val() == "") {
                        jQuery(".wpqa_error", thisform).html('<span class="required-error required-error-c">' + wpqa_js.wpqa_error_text + '</span>').animate({
                            opacity: 'show',
                            height: 'show'
                        }, 400).delay(1200).animate({
                            opacity: 'hide',
                            height: 'hide'
                        }, 400);
                        wpqa_captcha.css("border-color", "#F00");
                        jQuery('.load_span', thisform).hide().css({
                            "display": "none"
                        });
                        jQuery('input[type="submit"]', thisform).show();
                        return false;
                    } else if (wpqa_captcha.hasClass("captcha_answer")) {
                        if (wpqa_captcha.val() != wpqa_js.captcha_answer) {
                            jQuery(".wpqa_error", thisform).html('<span class="required-error required-error-c">' + wpqa_js.wpqa_error_captcha + '</span>').animate({
                                opacity: 'show',
                                height: 'show'
                            }, 400).delay(1200).animate({
                                opacity: 'hide',
                                height: 'hide'
                            }, 400);
                            wpqa_captcha.css("border-color", "#F00");
                            jQuery('.load_span', thisform).hide().css({
                                "display": "none"
                            });
                            jQuery('input[type="submit"]', thisform).show();
                            return false;
                        }
                    } else {
                        var message = "";
                        jQuery.ajax({
                            url: url,
                            type: "POST",
                            data: postStr,
                            async: false,
                            success: function(data) {
                                message = data;
                            }
                        });
                        if (message == "wpqa_captcha_0") {
                            jQuery(".wpqa_error", thisform).html('<span class="required-error required-error-c">' + wpqa_js.wpqa_error_captcha + '</span>').animate({
                                opacity: 'show',
                                height: 'show'
                            }, 400).delay(1200).animate({
                                opacity: 'hide',
                                height: 'hide'
                            }, 400);
                            wpqa_captcha.css("border-color", "#F00");
                            jQuery('.load_span', thisform).hide().css({
                                "display": "none"
                            });
                            jQuery('input[type="submit"]', thisform).show();
                            return false;
                        }
                    }
                }
                var fromSerialize = thisform.serialize();
                var fromWithAction = fromSerialize + "&action=wpqa_ajax_" + whatAction + "_process";
                jQuery.post(wpqa_js.admin_url, fromWithAction, function(response) {
                    var result = jQuery.parseJSON(response);
                    if (result.success == 1) {
                        if (whatAction == "password") {
                            jQuery('input[type="email"]', thisform).val("");
                            jQuery(".wpqa_success", thisform).html(result.done).animate({
                                opacity: 'show',
                                height: 'show'
                            }, 400).delay(1200).animate({
                                opacity: 'hide',
                                height: 'hide'
                            }, 400);
                        } else {
                            window.location = result.redirect;
                        }
                    } else if (result.error) {
                        jQuery(".wpqa_error", thisform).html('<span class="required-error">' + result.error + '</span>').animate({
                            opacity: 'show',
                            height: 'show'
                        }, 400).delay(1200).animate({
                            opacity: 'hide',
                            height: 'hide'
                        }, 400);
                    } else {
                        return true;
                    }
                    jQuery('.load_span', thisform).hide().css({
                        "display": "none"
                    });
                    jQuery('input[type="submit"]', thisform).show();
                });
                return false;
            });
        }
    }
    if (jQuery(".notifications-click").length) {
        jQuery(".notifications-click").on("click", function() {
            if (!jQuery(this).hasClass("messages-click")) {
                jQuery(".user-messages").removeClass("user-notifications-seen").find(" > div").slideUp(200);
                jQuery(".user-login-click").removeClass("user-click-open").find(" > ul").slideUp(200);
                jQuery(this).parent().toggleClass("user-notifications-seen").find(" > div").slideToggle(200).parent().find(" > .notifications-number").remove();
                jQuery.post(wpqa_js.admin_url, {
                    action: "wpqa_update_notifications"
                });
            }
        });
    }
    if (jQuery(".messages-click").length) {
        jQuery(".messages-click").on("click", function() {
            jQuery(".notifications-area").removeClass("user-notifications-seen").find(" > div").slideUp(200);
            jQuery(".user-login-click").removeClass("user-click-open").find(" > ul").slideUp(200);
            jQuery(this).parent().toggleClass("user-notifications-seen").find(" > div").slideToggle(200).parent().find(" > .notifications-number").remove();
        });
    }
    if (jQuery(".age-datepicker").length) {
        jQuery(".age-datepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "-90:+00",
            dateFormat: "yy-mm-dd"
        });
    }
    if (jQuery("#commentform").length) {
        jQuery("#commentform").attr((wpqa_js.attachment_answer == "on" ? "enctype" : "data-empty"), (wpqa_js.attachment_answer == "on" ? "multipart/form-data" : "none")).submit(function() {
            var thisform = jQuery(this);
            jQuery('.required-error', thisform).remove();
            if (jQuery('.wpqa_captcha', thisform).length) {
                var wpqa_captcha = jQuery('.wpqa_captcha', thisform).parent().find("input");
                var url = wpqa_js.wpqa_dir + "captcha/captcha.php";
                var postStr = wpqa_captcha.attr("name") + "=" + encodeURIComponent(wpqa_captcha.val());
                wpqa_captcha.css("border-color", "#e1e2e3");
                if (wpqa_captcha.val() == "") {
                    wpqa_captcha.css("border-color", "#F00").parent().parent().parent().find(".wpqa_error").html('<span class="required-error required-error-c">' + wpqa_js.wpqa_error_captcha + '</span>').animate({
                        opacity: 'show',
                        height: 'show'
                    }, 400).delay(1200).animate({
                        opacity: 'hide',
                        height: 'hide'
                    }, 400);
                    ;return false;
                } else if (wpqa_captcha.hasClass("captcha_answer")) {
                    if (wpqa_captcha.val() != wpqa_js.captcha_answer) {
                        wpqa_captcha.css("border-color", "#F00").parent().parent().parent().find(".wpqa_error").html('<span class="required-error required-error-c">' + wpqa_js.wpqa_error_captcha + '</span>').animate({
                            opacity: 'show',
                            height: 'show'
                        }, 400).delay(1200).animate({
                            opacity: 'hide',
                            height: 'hide'
                        }, 400);
                        ;return false;
                    } else {
                        return true;
                    }
                } else {
                    var message = "";
                    jQuery.ajax({
                        url: url,
                        type: "POST",
                        data: postStr,
                        async: false,
                        success: function(data) {
                            message = data;
                        }
                    });
                    if (message == "wpqa_captcha_0") {
                        wpqa_captcha.css("border-color", "#F00").parent().parent().parent().find(".wpqa_error").html('<span class="required-error required-error-c">' + wpqa_js.wpqa_error_captcha + '</span>').animate({
                            opacity: 'show',
                            height: 'show'
                        }, 400).delay(1200).animate({
                            opacity: 'hide',
                            height: 'hide'
                        }, 400);
                        ;return false;
                    } else {
                        return true;
                    }
                }
            }
        });
    }
    if (jQuery(".delete-comment").length) {
        jQuery(".delete-comment").on("click", function() {
            var var_delete = (jQuery(".delete-answer").length ? wpqa_js.sure_delete_answer : wpqa_js.sure_delete_comment);
            if (confirm(var_delete)) {
                return true;
            } else {
                return false;
            }
        });
    }
}
)(jQuery);
function wpqa_get_captcha(captcha_file, captcha_id) {
    jQuery("#" + captcha_id).attr("src", captcha_file + '&' + Math.random()).parent().find(".wpqa_captcha").val("");
}
;(function($) {
    'use strict';
    if (typeof wpcf7 === 'undefined' || wpcf7 === null) {
        return;
    }
    wpcf7 = $.extend({
        cached: 0,
        inputs: []
    }, wpcf7);
    $(function() {
        wpcf7.supportHtml5 = (function() {
            var features = {};
            var input = document.createElement('input');
            features.placeholder = 'placeholder'in input;
            var inputTypes = ['email', 'url', 'tel', 'number', 'range', 'date'];
            $.each(inputTypes, function(index, value) {
                input.setAttribute('type', value);
                features[value] = input.type !== 'text';
            });
            return features;
        }
        )();
        $('div.wpcf7 > form').each(function() {
            var $form = $(this);
            wpcf7.initForm($form);
            if (wpcf7.cached) {
                wpcf7.refill($form);
            }
        });
    });
    wpcf7.getId = function(form) {
        return parseInt($('input[name="_wpcf7"]', form).val(), 10);
    }
    ;
    wpcf7.initForm = function(form) {
        var $form = $(form);
        $form.submit(function(event) {
            if (!wpcf7.supportHtml5.placeholder) {
                $('[placeholder].placeheld', $form).each(function(i, n) {
                    $(n).val('').removeClass('placeheld');
                });
            }
            if (typeof window.FormData === 'function') {
                wpcf7.submit($form);
                event.preventDefault();
            }
        });
        $('.wpcf7-submit', $form).after('<span class="ajax-loader"></span>');
        wpcf7.toggleSubmit($form);
        $form.on('click', '.wpcf7-acceptance', function() {
            wpcf7.toggleSubmit($form);
        });
        $('.wpcf7-exclusive-checkbox', $form).on('click', 'input:checkbox', function() {
            var name = $(this).attr('name');
            $form.find('input:checkbox[name="' + name + '"]').not(this).prop('checked', false);
        });
        $('.wpcf7-list-item.has-free-text', $form).each(function() {
            var $freetext = $(':input.wpcf7-free-text', this);
            var $wrap = $(this).closest('.wpcf7-form-control');
            if ($(':checkbox, :radio', this).is(':checked')) {
                $freetext.prop('disabled', false);
            } else {
                $freetext.prop('disabled', true);
            }
            $wrap.on('change', ':checkbox, :radio', function() {
                var $cb = $('.has-free-text', $wrap).find(':checkbox, :radio');
                if ($cb.is(':checked')) {
                    $freetext.prop('disabled', false).focus();
                } else {
                    $freetext.prop('disabled', true);
                }
            });
        });
        if (!wpcf7.supportHtml5.placeholder) {
            $('[placeholder]', $form).each(function() {
                $(this).val($(this).attr('placeholder'));
                $(this).addClass('placeheld');
                $(this).focus(function() {
                    if ($(this).hasClass('placeheld')) {
                        $(this).val('').removeClass('placeheld');
                    }
                });
                $(this).blur(function() {
                    if ('' === $(this).val()) {
                        $(this).val($(this).attr('placeholder'));
                        $(this).addClass('placeheld');
                    }
                });
            });
        }
        if (wpcf7.jqueryUi && !wpcf7.supportHtml5.date) {
            $form.find('input.wpcf7-date[type="date"]').each(function() {
                $(this).datepicker({
                    dateFormat: 'yy-mm-dd',
                    minDate: new Date($(this).attr('min')),
                    maxDate: new Date($(this).attr('max'))
                });
            });
        }
        if (wpcf7.jqueryUi && !wpcf7.supportHtml5.number) {
            $form.find('input.wpcf7-number[type="number"]').each(function() {
                $(this).spinner({
                    min: $(this).attr('min'),
                    max: $(this).attr('max'),
                    step: $(this).attr('step')
                });
            });
        }
        $('.wpcf7-character-count', $form).each(function() {
            var $count = $(this);
            var name = $count.attr('data-target-name');
            var down = $count.hasClass('down');
            var starting = parseInt($count.attr('data-starting-value'), 10);
            var maximum = parseInt($count.attr('data-maximum-value'), 10);
            var minimum = parseInt($count.attr('data-minimum-value'), 10);
            var updateCount = function(target) {
                var $target = $(target);
                var length = $target.val().length;
                var count = down ? starting - length : length;
                $count.attr('data-current-value', count);
                $count.text(count);
                if (maximum && maximum < length) {
                    $count.addClass('too-long');
                } else {
                    $count.removeClass('too-long');
                }
                if (minimum && length < minimum) {
                    $count.addClass('too-short');
                } else {
                    $count.removeClass('too-short');
                }
            };
            $(':input[name="' + name + '"]', $form).each(function() {
                updateCount(this);
                $(this).keyup(function() {
                    updateCount(this);
                });
            });
        });
        $form.on('change', '.wpcf7-validates-as-url', function() {
            var val = $.trim($(this).val());
            if (val && !val.match(/^[a-z][a-z0-9.+-]*:/i) && -1 !== val.indexOf('.')) {
                val = val.replace(/^\/+/, '');
                val = 'http://' + val;
            }
            $(this).val(val);
        });
    }
    ;
    wpcf7.submit = function(form) {
        if (typeof window.FormData !== 'function') {
            return;
        }
        var $form = $(form);
        $('.ajax-loader', $form).addClass('is-active');
        wpcf7.clearResponse($form);
        var formData = new FormData($form.get(0));
        var detail = {
            id: $form.closest('div.wpcf7').attr('id'),
            status: 'init',
            inputs: [],
            formData: formData
        };
        $.each($form.serializeArray(), function(i, field) {
            if ('_wpcf7' == field.name) {
                detail.contactFormId = field.value;
            } else if ('_wpcf7_version' == field.name) {
                detail.pluginVersion = field.value;
            } else if ('_wpcf7_locale' == field.name) {
                detail.contactFormLocale = field.value;
            } else if ('_wpcf7_unit_tag' == field.name) {
                detail.unitTag = field.value;
            } else if ('_wpcf7_container_post' == field.name) {
                detail.containerPostId = field.value;
            } else if (field.name.match(/^_wpcf7_\w+_free_text_/)) {
                var owner = field.name.replace(/^_wpcf7_\w+_free_text_/, '');
                detail.inputs.push({
                    name: owner + '-free-text',
                    value: field.value
                });
            } else if (field.name.match(/^_/)) {} else {
                detail.inputs.push(field);
            }
        });
        wpcf7.triggerEvent($form.closest('div.wpcf7'), 'beforesubmit', detail);
        var ajaxSuccess = function(data, status, xhr, $form) {
            detail.id = $(data.into).attr('id');
            detail.status = data.status;
            detail.apiResponse = data;
            var $message = $('.wpcf7-response-output', $form);
            switch (data.status) {
            case 'validation_failed':
                $.each(data.invalidFields, function(i, n) {
                    $(n.into, $form).each(function() {
                        wpcf7.notValidTip(this, n.message);
                        $('.wpcf7-form-control', this).addClass('wpcf7-not-valid');
                        $('[aria-invalid]', this).attr('aria-invalid', 'true');
                    });
                });
                $message.addClass('wpcf7-validation-errors');
                $form.addClass('invalid');
                wpcf7.triggerEvent(data.into, 'invalid', detail);
                break;
            case 'acceptance_missing':
                $message.addClass('wpcf7-acceptance-missing');
                $form.addClass('unaccepted');
                wpcf7.triggerEvent(data.into, 'unaccepted', detail);
                break;
            case 'spam':
                $message.addClass('wpcf7-spam-blocked');
                $form.addClass('spam');
                $('[name="g-recaptcha-response"]', $form).each(function() {
                    if ('' === $(this).val()) {
                        var $recaptcha = $(this).closest('.wpcf7-form-control-wrap');
                        wpcf7.notValidTip($recaptcha, wpcf7.recaptcha.messages.empty);
                    }
                });
                wpcf7.triggerEvent(data.into, 'spam', detail);
                break;
            case 'aborted':
                $message.addClass('wpcf7-aborted');
                $form.addClass('aborted');
                wpcf7.triggerEvent(data.into, 'aborted', detail);
                break;
            case 'mail_sent':
                $message.addClass('wpcf7-mail-sent-ok');
                $form.addClass('sent');
                wpcf7.triggerEvent(data.into, 'mailsent', detail);
                break;
            case 'mail_failed':
                $message.addClass('wpcf7-mail-sent-ng');
                $form.addClass('failed');
                wpcf7.triggerEvent(data.into, 'mailfailed', detail);
                break;
            default:
                var customStatusClass = 'custom-' + data.status.replace(/[^0-9a-z]+/i, '-');
                $message.addClass('wpcf7-' + customStatusClass);
                $form.addClass(customStatusClass);
            }
            wpcf7.refill($form, data);
            wpcf7.triggerEvent(data.into, 'submit', detail);
            if ('mail_sent' == data.status) {
                $form.each(function() {
                    this.reset();
                });
                wpcf7.toggleSubmit($form);
            }
            if (!wpcf7.supportHtml5.placeholder) {
                $form.find('[placeholder].placeheld').each(function(i, n) {
                    $(n).val($(n).attr('placeholder'));
                });
            }
            $message.html('').append(data.message).slideDown('fast');
            $message.attr('role', 'alert');
            $('.screen-reader-response', $form.closest('.wpcf7')).each(function() {
                var $response = $(this);
                $response.html('').attr('role', '').append(data.message);
                if (data.invalidFields) {
                    var $invalids = $('<ul></ul>');
                    $.each(data.invalidFields, function(i, n) {
                        if (n.idref) {
                            var $li = $('<li></li>').append($('<a></a>').attr('href', '#' + n.idref).append(n.message));
                        } else {
                            var $li = $('<li></li>').append(n.message);
                        }
                        $invalids.append($li);
                    });
                    $response.append($invalids);
                }
                $response.attr('role', 'alert').focus();
            });
        };
        $.ajax({
            type: 'POST',
            url: wpcf7.apiSettings.getRoute('/contact-forms/' + wpcf7.getId($form) + '/feedback'),
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        }).done(function(data, status, xhr) {
            ajaxSuccess(data, status, xhr, $form);
            $('.ajax-loader', $form).removeClass('is-active');
        }).fail(function(xhr, status, error) {
            var $e = $('<div class="ajax-error"></div>').text(error.message);
            $form.after($e);
        });
    }
    ;
    wpcf7.triggerEvent = function(target, name, detail) {
        var $target = $(target);
        var event = new CustomEvent('wpcf7' + name,{
            bubbles: true,
            detail: detail
        });
        $target.get(0).dispatchEvent(event);
        $target.trigger('wpcf7:' + name, detail);
        $target.trigger(name + '.wpcf7', detail);
    }
    ;
    wpcf7.toggleSubmit = function(form, state) {
        var $form = $(form);
        var $submit = $('input:submit', $form);
        if (typeof state !== 'undefined') {
            $submit.prop('disabled', !state);
            return;
        }
        if ($form.hasClass('wpcf7-acceptance-as-validation')) {
            return;
        }
        $submit.prop('disabled', false);
        $('.wpcf7-acceptance', $form).each(function() {
            var $span = $(this);
            var $input = $('input:checkbox', $span);
            if (!$span.hasClass('optional')) {
                if ($span.hasClass('invert') && $input.is(':checked') || !$span.hasClass('invert') && !$input.is(':checked')) {
                    $submit.prop('disabled', true);
                    return false;
                }
            }
        });
    }
    ;
    wpcf7.notValidTip = function(target, message) {
        var $target = $(target);
        $('.wpcf7-not-valid-tip', $target).remove();
        $('<span role="alert" class="wpcf7-not-valid-tip"></span>').text(message).appendTo($target);
        if ($target.is('.use-floating-validation-tip *')) {
            var fadeOut = function(target) {
                $(target).not(':hidden').animate({
                    opacity: 0
                }, 'fast', function() {
                    $(this).css({
                        'z-index': -100
                    });
                });
            };
            $target.on('mouseover', '.wpcf7-not-valid-tip', function() {
                fadeOut(this);
            });
            $target.on('focus', ':input', function() {
                fadeOut($('.wpcf7-not-valid-tip', $target));
            });
        }
    }
    ;
    wpcf7.refill = function(form, data) {
        var $form = $(form);
        var refillCaptcha = function($form, items) {
            $.each(items, function(i, n) {
                $form.find(':input[name="' + i + '"]').val('');
                $form.find('img.wpcf7-captcha-' + i).attr('src', n);
                var match = /([0-9]+)\.(png|gif|jpeg)$/.exec(n);
                $form.find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]').attr('value', match[1]);
            });
        };
        var refillQuiz = function($form, items) {
            $.each(items, function(i, n) {
                $form.find(':input[name="' + i + '"]').val('');
                $form.find(':input[name="' + i + '"]').siblings('span.wpcf7-quiz-label').text(n[0]);
                $form.find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]').attr('value', n[1]);
            });
        };
        if (typeof data === 'undefined') {
            $.ajax({
                type: 'GET',
                url: wpcf7.apiSettings.getRoute('/contact-forms/' + wpcf7.getId($form) + '/refill'),
                beforeSend: function(xhr) {
                    var nonce = $form.find(':input[name="_wpnonce"]').val();
                    if (nonce) {
                        xhr.setRequestHeader('X-WP-Nonce', nonce);
                    }
                },
                dataType: 'json'
            }).done(function(data, status, xhr) {
                if (data.captcha) {
                    refillCaptcha($form, data.captcha);
                }
                if (data.quiz) {
                    refillQuiz($form, data.quiz);
                }
            });
        } else {
            if (data.captcha) {
                refillCaptcha($form, data.captcha);
            }
            if (data.quiz) {
                refillQuiz($form, data.quiz);
            }
        }
    }
    ;
    wpcf7.clearResponse = function(form) {
        var $form = $(form);
        $form.removeClass('invalid spam sent failed');
        $form.siblings('.screen-reader-response').html('').attr('role', '');
        $('.wpcf7-not-valid-tip', $form).remove();
        $('[aria-invalid]', $form).attr('aria-invalid', 'false');
        $('.wpcf7-form-control', $form).removeClass('wpcf7-not-valid');
        $('.wpcf7-response-output', $form).hide().empty().removeAttr('role').removeClass('wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked');
    }
    ;
    wpcf7.apiSettings.getRoute = function(path) {
        var url = wpcf7.apiSettings.root;
        url = url.replace(wpcf7.apiSettings.namespace, wpcf7.apiSettings.namespace + path);
        return url;
    }
    ;
}
)(jQuery);
(function() {
    if (typeof window.CustomEvent === "function")
        return false;
    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
}
)();
;/*! HTML5 Shiv vpre3.6 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
  Uncompressed source: https://github.com/aFarkas/html5shiv  */
(function(a, b) {
    function h(a, b) {
        var c = a.createElement("p")
          , d = a.getElementsByTagName("head")[0] || a.documentElement;
        return c.innerHTML = "x<style>" + b + "</style>",
        d.insertBefore(c.lastChild, d.firstChild)
    }
    function i() {
        var a = l.elements;
        return typeof a == "string" ? a.split(" ") : a
    }
    function j(a) {
        var b = {}
          , c = a.createElement
          , f = a.createDocumentFragment
          , g = f();
        a.createElement = function(a) {
            if (!l.shivMethods)
                return c(a);
            var f;
            return b[a] ? f = b[a].cloneNode() : e.test(a) ? f = (b[a] = c(a)).cloneNode() : f = c(a),
            f.canHaveChildren && !d.test(a) ? g.appendChild(f) : f
        }
        ,
        a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/\w+/g, function(a) {
            return c(a),
            g.createElement(a),
            'c("' + a + '")'
        }) + ");return n}")(l, g)
    }
    function k(a) {
        var b;
        return a.documentShived ? a : (l.shivCSS && !f && (b = !!h(a, "article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")),
        g || (b = !j(a)),
        b && (a.documentShived = b),
        a)
    }
    var c = a.html5 || {}, d = /^<|^(?:button|form|map|select|textarea|object|iframe|option|optgroup)$/i, e = /^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i, f, g;
    (function() {
        var c = b.createElement("a");
        c.innerHTML = "<xyz></xyz>",
        f = "hidden"in c,
        f && typeof injectElementWithStyles == "function" && injectElementWithStyles("#modernizr{}", function(b) {
            b.hidden = !0,
            f = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle).display == "none"
        }),
        g = c.childNodes.length == 1 || function() {
            try {
                b.createElement("a")
            } catch (a) {
                return !0
            }
            var c = b.createDocumentFragment();
            return typeof c.cloneNode == "undefined" || typeof c.createDocumentFragment == "undefined" || typeof c.createElement == "undefined"
        }()
    }
    )();
    var l = {
        elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
        shivCSS: c.shivCSS !== !1,
        shivMethods: c.shivMethods !== !1,
        type: "default",
        shivDocument: k
    };
    a.html5 = l,
    k(b)
}
)(this, document);
/*!
 * Modernizr v2.6.2
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */
window.Modernizr = (function(window, document, undefined) {
    var version = '2.6.2', Modernizr = {}, enableClasses = true, docElement = document.documentElement, mod = 'modernizr', modElem = document.createElement(mod), mStyle = modElem.style, inputElem = document.createElement('input'), smile = ':)', toString = {}.toString, prefixes = ' -webkit- -moz- -o- -ms- '.split(' '), omPrefixes = 'Webkit Moz O ms', cssomPrefixes = omPrefixes.split(' '), domPrefixes = omPrefixes.toLowerCase().split(' '), ns = {
        'svg': 'http://www.w3.org/2000/svg'
    }, tests = {}, inputs = {}, attrs = {}, classes = [], slice = classes.slice, featureName, injectElementWithStyles = function(rule, callback, nodes, testnames) {
        var style, ret, node, docOverflow, div = document.createElement('div'), body = document.body, fakeBody = body || document.createElement('body');
        if (parseInt(nodes, 10)) {
            while (nodes--) {
                node = document.createElement('div');
                node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                div.appendChild(node);
            }
        }
        style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
        div.id = mod;
        (body ? div : fakeBody).innerHTML += style;
        fakeBody.appendChild(div);
        if (!body) {
            fakeBody.style.background = '';
            fakeBody.style.overflow = 'hidden';
            docOverflow = docElement.style.overflow;
            docElement.style.overflow = 'hidden';
            docElement.appendChild(fakeBody);
        }
        ret = callback(div, rule);
        if (!body) {
            fakeBody.parentNode.removeChild(fakeBody);
            docElement.style.overflow = docOverflow;
        } else {
            div.parentNode.removeChild(div);
        }
        return !!ret;
    }, testMediaQuery = function(mq) {
        var matchMedia = window.matchMedia || window.msMatchMedia;
        if (matchMedia) {
            return matchMedia(mq).matches;
        }
        var bool;
        injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function(node) {
            bool = (window.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle)['position'] == 'absolute';
        });
        return bool;
    }, isEventSupported = (function() {
        var TAGNAMES = {
            'select': 'input',
            'change': 'input',
            'submit': 'form',
            'reset': 'form',
            'error': 'img',
            'load': 'img',
            'abort': 'img'
        };
        function isEventSupported(eventName, element) {
            element = element || document.createElement(TAGNAMES[eventName] || 'div');
            eventName = 'on' + eventName;
            var isSupported = eventName in element;
            if (!isSupported) {
                if (!element.setAttribute) {
                    element = document.createElement('div');
                }
                if (element.setAttribute && element.removeAttribute) {
                    element.setAttribute(eventName, '');
                    isSupported = is(element[eventName], 'function');
                    if (!is(element[eventName], 'undefined')) {
                        element[eventName] = undefined;
                    }
                    element.removeAttribute(eventName);
                }
            }
            element = null;
            return isSupported;
        }
        return isEventSupported;
    }
    )(), _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;
    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
        hasOwnProp = function(object, property) {
            return _hasOwnProperty.call(object, property);
        }
        ;
    } else {
        hasOwnProp = function(object, property) {
            return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
        }
        ;
    }
    if (!Function.prototype.bind) {
        Function.prototype.bind = function bind(that) {
            var target = this;
            if (typeof target != "function") {
                throw new TypeError();
            }
            var args = slice.call(arguments, 1)
              , bound = function() {
                if (this instanceof bound) {
                    var F = function() {};
                    F.prototype = target.prototype;
                    var self = new F();
                    var result = target.apply(self, args.concat(slice.call(arguments)));
                    if (Object(result) === result) {
                        return result;
                    }
                    return self;
                } else {
                    return target.apply(that, args.concat(slice.call(arguments)));
                }
            };
            return bound;
        }
        ;
    }
    function setCss(str) {
        mStyle.cssText = str;
    }
    function setCssAll(str1, str2) {
        return setCss(prefixes.join(str1 + ';') + (str2 || ''));
    }
    function is(obj, type) {
        return typeof obj === type;
    }
    function contains(str, substr) {
        return !!~('' + str).indexOf(substr);
    }
    function testProps(props, prefixed) {
        for (var i in props) {
            var prop = props[i];
            if (!contains(prop, "-") && mStyle[prop] !== undefined) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    function testDOMProps(props, obj, elem) {
        for (var i in props) {
            var item = obj[props[i]];
            if (item !== undefined) {
                if (elem === false)
                    return props[i];
                if (is(item, 'function')) {
                    return item.bind(elem || obj);
                }
                return item;
            }
        }
        return false;
    }
    function testPropsAll(prop, prefixed, elem) {
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1)
          , props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');
        if (is(prefixed, "string") || is(prefixed, "undefined")) {
            return testProps(props, prefixed);
        } else {
            props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
            return testDOMProps(props, prefixed, elem);
        }
    }
    tests['flexbox'] = function() {
        return testPropsAll('flexWrap');
    }
    ;
    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    }
    ;
    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }
    ;
    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    }
    ;
    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    }
    ;
    tests['touch'] = function() {
        var bool;
        if (('ontouchstart'in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            bool = true;
        } else {
            injectElementWithStyles(['@media (', prefixes.join('touch-enabled),('), mod, ')', '{#modernizr{top:9px;position:absolute}}'].join(''), function(node) {
                bool = node.offsetTop === 9;
            });
        }
        return bool;
    }
    ;
    tests['geolocation'] = function() {
        return 'geolocation'in navigator;
    }
    ;
    tests['postmessage'] = function() {
        return !!window.postMessage;
    }
    ;
    tests['websqldatabase'] = function() {
        return !!window.openDatabase;
    }
    ;
    tests['indexedDB'] = function() {
        return !!testPropsAll("indexedDB", window);
    }
    ;
    tests['hashchange'] = function() {
        return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    }
    ;
    tests['history'] = function() {
        return !!(window.history && history.pushState);
    }
    ;
    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable'in div) || ('ondragstart'in div && 'ondrop'in div);
    }
    ;
    tests['websockets'] = function() {
        return 'WebSocket'in window || 'MozWebSocket'in window;
    }
    ;
    tests['rgba'] = function() {
        setCss('background-color:rgba(150,255,150,.5)');
        return contains(mStyle.backgroundColor, 'rgba');
    }
    ;
    tests['hsla'] = function() {
        setCss('background-color:hsla(120,40%,100%,.5)');
        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    }
    ;
    tests['multiplebgs'] = function() {
        setCss('background:url(https://),url(https://),red url(https://)');
        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    }
    ;
    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    }
    ;
    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    }
    ;
    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    }
    ;
    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    }
    ;
    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    }
    ;
    tests['opacity'] = function() {
        setCssAll('opacity:.55');
        return (/^0.55$/).test(mStyle.opacity);
    }
    ;
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    }
    ;
    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    }
    ;
    tests['cssgradients'] = function() {
        var str1 = 'background-image:'
          , str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));'
          , str3 = 'linear-gradient(left top,#9f9, white);';
        setCss((str1 + '-webkit- '.split(' ').join(str2 + str1) + prefixes.join(str3 + str1)).slice(0, -str1.length));
        return contains(mStyle.backgroundImage, 'gradient');
    }
    ;
    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    }
    ;
    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    }
    ;
    tests['csstransforms3d'] = function() {
        var ret = !!testPropsAll('perspective');
        if (ret && 'webkitPerspective'in docElement.style) {
            injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function(node, rule) {
                ret = node.offsetLeft === 9 && node.offsetHeight === 3;
            });
        }
        return ret;
    }
    ;
    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    }
    ;
    tests['fontface'] = function() {
        var bool;
        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function(node, rule) {
            var style = document.getElementById('smodernizr')
              , sheet = style.sheet || style.styleSheet
              , cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';
            bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });
        return bool;
    }
    ;
    tests['generatedcontent'] = function() {
        var bool;
        injectElementWithStyles(['#', mod, '{font:0/0 a}#', mod, ':after{content:"', smile, '";visibility:hidden;font:3px/1 a}'].join(''), function(node) {
            bool = node.offsetHeight >= 3;
        });
        return bool;
    }
    ;
    tests['video'] = function() {
        var elem = document.createElement('video')
          , bool = false;
        try {
            if (bool = !!elem.canPlayType) {
                bool = new Boolean(bool);
                bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');
                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');
            }
        } catch (e) {}
        return bool;
    }
    ;
    tests['audio'] = function() {
        var elem = document.createElement('audio')
          , bool = false;
        try {
            if (bool = !!elem.canPlayType) {
                bool = new Boolean(bool);
                bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '');
                bool.mp3 = elem.canPlayType('audio/mpeg;').replace(/^no$/, '');
                bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '');
                bool.m4a = (elem.canPlayType('audio/x-m4a;') || elem.canPlayType('audio/aac;')).replace(/^no$/, '');
            }
        } catch (e) {}
        return bool;
    }
    ;
    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    }
    ;
    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    }
    ;
    tests['webworkers'] = function() {
        return !!window.Worker;
    }
    ;
    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    }
    ;
    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    }
    ;
    tests['inlinesvg'] = function() {
        var div = document.createElement('div');
        div.innerHTML = '<svg/>';
        return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    }
    ;
    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    }
    ;
    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    }
    ;
    function webforms() {
        Modernizr['input'] = (function(props) {
            for (var i = 0, len = props.length; i < len; i++) {
                attrs[props[i]] = !!(props[i]in inputElem);
            }
            if (attrs.list) {
                attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        }
        )('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        Modernizr['inputtypes'] = (function(props) {
            for (var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++) {
                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';
                if (bool) {
                    inputElem.value = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';
                    if (/^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined) {
                        docElement.appendChild(inputElem);
                        defaultView = document.defaultView;
                        bool = defaultView.getComputedStyle && defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' && (inputElem.offsetHeight !== 0);
                        docElement.removeChild(inputElem);
                    } else if (/^(search|tel)$/.test(inputElemType)) {} else if (/^(url|email)$/.test(inputElemType)) {
                        bool = inputElem.checkValidity && inputElem.checkValidity() === false;
                    } else {
                        bool = inputElem.value != smile;
                    }
                }
                inputs[props[i]] = !!bool;
            }
            return inputs;
        }
        )('search tel url email datetime date month week time datetime-local number range color'.split(' '));
    }
    for (var feature in tests) {
        if (hasOwnProp(tests, feature)) {
            featureName = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();
            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }
    Modernizr.input || webforms();
    Modernizr.addTest = function(feature, test) {
        if (typeof feature == 'object') {
            for (var key in feature) {
                if (hasOwnProp(feature, key)) {
                    Modernizr.addTest(key, feature[key]);
                }
            }
        } else {
            feature = feature.toLowerCase();
            if (Modernizr[feature] !== undefined) {
                return Modernizr;
            }
            test = typeof test == 'function' ? test() : test;
            if (typeof enableClasses !== "undefined" && enableClasses) {
                docElement.className += ' ' + (test ? '' : 'no-') + feature;
            }
            Modernizr[feature] = test;
        }
        return Modernizr;
    }
    ;
    setCss('');
    modElem = inputElem = null;
    /*! HTML5 Shiv v3.6.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed */
    ;(function(window, document) {
        var options = window.html5 || {};
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;
        var supportsHtml5Styles;
        var expando = '_html5shiv';
        var expanID = 0;
        var expandoData = {};
        var supportsUnknownElements;
        (function() {
            try {
                var a = document.createElement('a');
                a.innerHTML = '<xyz></xyz>';
                supportsHtml5Styles = ('hidden'in a);
                supportsUnknownElements = a.childNodes.length == 1 || (function() {
                    (document.createElement)('a');
                    var frag = document.createDocumentFragment();
                    return (typeof frag.cloneNode == 'undefined' || typeof frag.createDocumentFragment == 'undefined' || typeof frag.createElement == 'undefined');
                }());
            } catch (e) {
                supportsHtml5Styles = true;
                supportsUnknownElements = true;
            }
        }());
        function addStyleSheet(ownerDocument, cssText) {
            var p = ownerDocument.createElement('p')
              , parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;
            p.innerHTML = 'x<style>' + cssText + '</style>';
            return parent.insertBefore(p.lastChild, parent.firstChild);
        }
        function getElements() {
            var elements = html5.elements;
            return typeof elements == 'string' ? elements.split(' ') : elements;
        }
        function getExpandoData(ownerDocument) {
            var data = expandoData[ownerDocument[expando]];
            if (!data) {
                data = {};
                expanID++;
                ownerDocument[expando] = expanID;
                expandoData[expanID] = data;
            }
            return data;
        }
        function createElement(nodeName, ownerDocument, data) {
            if (!ownerDocument) {
                ownerDocument = document;
            }
            if (supportsUnknownElements) {
                return ownerDocument.createElement(nodeName);
            }
            if (!data) {
                data = getExpandoData(ownerDocument);
            }
            var node;
            if (data.cache[nodeName]) {
                node = data.cache[nodeName].cloneNode();
            } else if (saveClones.test(nodeName)) {
                node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
            } else {
                node = data.createElem(nodeName);
            }
            return node.canHaveChildren && !reSkip.test(nodeName) ? data.frag.appendChild(node) : node;
        }
        function createDocumentFragment(ownerDocument, data) {
            if (!ownerDocument) {
                ownerDocument = document;
            }
            if (supportsUnknownElements) {
                return ownerDocument.createDocumentFragment();
            }
            data = data || getExpandoData(ownerDocument);
            var clone = data.frag.cloneNode()
              , i = 0
              , elems = getElements()
              , l = elems.length;
            for (; i < l; i++) {
                clone.createElement(elems[i]);
            }
            return clone;
        }
        function shivMethods(ownerDocument, data) {
            if (!data.cache) {
                data.cache = {};
                data.createElem = ownerDocument.createElement;
                data.createFrag = ownerDocument.createDocumentFragment;
                data.frag = data.createFrag();
            }
            ownerDocument.createElement = function(nodeName) {
                if (!html5.shivMethods) {
                    return data.createElem(nodeName);
                }
                return createElement(nodeName, ownerDocument, data);
            }
            ;
            ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' + 'var n=f.cloneNode(),c=n.createElement;' + 'h.shivMethods&&(' + getElements().join().replace(/\w+/g, function(nodeName) {
                data.createElem(nodeName);
                data.frag.createElement(nodeName);
                return 'c("' + nodeName + '")';
            }) + ');return n}')(html5, data.frag);
        }
        function shivDocument(ownerDocument) {
            if (!ownerDocument) {
                ownerDocument = document;
            }
            var data = getExpandoData(ownerDocument);
            if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
                data.hasCSS = !!addStyleSheet(ownerDocument, 'article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}' + 'mark{background:#FF0;color:#000}');
            }
            if (!supportsUnknownElements) {
                shivMethods(ownerDocument, data);
            }
            return ownerDocument;
        }
        var html5 = {
            'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video',
            'shivCSS': (options.shivCSS !== false),
            'supportsUnknownElements': supportsUnknownElements,
            'shivMethods': (options.shivMethods !== false),
            'type': 'default',
            'shivDocument': shivDocument,
            createElement: createElement,
            createDocumentFragment: createDocumentFragment
        };
        window.html5 = html5;
        shivDocument(document);
    }(this, document));
    Modernizr._version = version;
    Modernizr._prefixes = prefixes;
    Modernizr._domPrefixes = domPrefixes;
    Modernizr._cssomPrefixes = cssomPrefixes;
    Modernizr.mq = testMediaQuery;
    Modernizr.hasEvent = isEventSupported;
    Modernizr.testProp = function(prop) {
        return testProps([prop]);
    }
    ;
    Modernizr.testAllProps = testPropsAll;
    Modernizr.testStyles = injectElementWithStyles;
    Modernizr.prefixed = function(prop, obj, elem) {
        if (!obj) {
            return testPropsAll(prop, 'pfx');
        } else {
            return testPropsAll(prop, obj, elem);
        }
    }
    ;
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') + (enableClasses ? ' js ' + classes.join(' ') : '');
    return Modernizr;
}
)(this, this.document);
