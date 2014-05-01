if (!hs) {
	var hs = {
		lang: {
			cssDirection: "ltr",
			loadingText: "Loading...",
			loadingTitle: "Click to cancel",
			focusTitle: "Click to bring to front",
			fullExpandTitle: "Expand to actual size (f)",
			creditsText: "",
			creditsTitle: "Go to the Highslide JS homepage",
			restoreTitle: "Click to close image, click and drag to move. Use arrow keys for next and previous."
		},
		graphicsDir: "highslide/graphics/",
		expandCursor: "zoomin.cur",
		restoreCursor: "zoomout.cur",
		expandDuration: 250,
		restoreDuration: 250,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 15,
		marginBottom: 15,
		zIndexCounter: 1001,
		loadingOpacity: .75,
		allowMultipleInstances: !0,
		numberOfImagesToPreload: 5,
		outlineWhileAnimating: 2,
		outlineStartOffset: 3,
		padToMinWidth: !1,
		fullExpandPosition: "bottom right",
		fullExpandOpacity: 1,
		showCredits: !0,
		creditsHref: "http://highslide.com/",
		creditsTarget: "_self",
		enableKeyListener: !0,
		openerTagNames: ["a"],
		dragByHeading: !0,
		minWidth: 200,
		minHeight: 200,
		allowSizeReduction: !0,
		outlineType: "drop-shadow",
		preloadTheseImages: [],
		continuePreloading: !0,
		expanders: [],
		overrides: ["allowSizeReduction", "useBox", "outlineType", "outlineWhileAnimating", "captionId", "captionText", "captionEval", "captionOverlay", "headingId", "headingText", "headingEval", "headingOverlay", "creditsPosition", "dragByHeading", "width", "height", "wrapperClassName", "minWidth", "minHeight", "maxWidth", "maxHeight", "pageOrigin", "slideshowGroup", "easing", "easingClose", "fadeInOut", "src"],
		overlays: [],
		idCounter: 0,
		oPos: {
			x: ["leftpanel", "left", "center", "right", "rightpanel"],
			y: ["above", "top", "middle", "bottom", "below"]
		},
		mouse: {},
		headingOverlay: {},
		captionOverlay: {},
		timers: [],
		pendingOutlines: {},
		clones: {},
		onReady: [],
		uaVersion: /Trident\/4\.0/.test(navigator.userAgent) ? 8 : parseFloat((navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1]),
		ie: document.all && !window.opera,
		safari: /Safari/.test(navigator.userAgent),
		geckoMac: /Macintosh.+rv:1\.[0-8].+Gecko/.test(navigator.userAgent),
		$: function(a) {
			return a ? document.getElementById(a) : void 0
		},
		push: function(a, b) {
			a[a.length] = b
		},
		createElement: function(a, b, c, d, e) {
			var f = document.createElement(a);
			return b && hs.extend(f, b), e && hs.setStyles(f, {
				padding: 0,
				border: "none",
				margin: 0
			}), c && hs.setStyles(f, c), d && d.appendChild(f), f
		},
		extend: function(a, b) {
			for (var c in b) a[c] = b[c];
			return a
		},
		setStyles: function(a, b) {
			for (var c in b) hs.ieLt9 && "opacity" == c ? b[c] > .99 ? a.style.removeAttribute("filter") : a.style.filter = "alpha(opacity=" + 100 * b[c] + ")" : a.style[c] = b[c]
		},
		animate: function(a, b, c) {
			var d, e, f;
			if ("object" != typeof c || null === c) {
				var g = arguments;
				c = {
					duration: g[2],
					easing: g[3],
					complete: g[4]
				}
			}
			"number" != typeof c.duration && (c.duration = 250), c.easing = Math[c.easing] || Math.easeInQuad, c.curAnim = hs.extend({}, b);
			for (var h in b) {
				var i = new hs.fx(a, c, h);
				d = parseFloat(hs.css(a, h)) || 0, e = parseFloat(b[h]), f = "opacity" != h ? "px" : "", i.custom(d, e, f)
			}
		},
		css: function(a, b) {
			if (a.style[b]) return a.style[b];
			if (document.defaultView) return document.defaultView.getComputedStyle(a, null).getPropertyValue(b);
			"opacity" == b && (b = "filter");
			var c = a.currentStyle[b.replace(/\-(\w)/g, function(a, b) {
				return b.toUpperCase()
			})];
			return "filter" == b && (c = c.replace(/alpha\(opacity=([0-9]+)\)/, function(a, b) {
				return b / 100
			})), "" === c ? 1 : c
		},
		getPageSize: function() {
			var a = document,
				c = a.compatMode && "BackCompat" != a.compatMode ? a.documentElement : a.body,
				d = hs.ie && (hs.uaVersion < 9 || "undefined" == typeof pageXOffset),
				e = d ? c.clientWidth : a.documentElement.clientWidth || self.innerWidth,
				f = d ? c.clientHeight : self.innerHeight;
			return hs.page = {
				width: e,
				height: f,
				scrollLeft: d ? c.scrollLeft : pageXOffset,
				scrollTop: d ? c.scrollTop : pageYOffset
			}, hs.page
		},
		getPosition: function(a) {
			for (var b = {
				x: a.offsetLeft,
				y: a.offsetTop
			}; a.offsetParent;) a = a.offsetParent, b.x += a.offsetLeft, b.y += a.offsetTop, a != document.body && a != document.documentElement && (b.x -= a.scrollLeft, b.y -= a.scrollTop);
			return b
		},
		expand: function(a, b, c) {
			if (a || (a = hs.createElement("a", null, {
				display: "none"
			}, hs.container)), "function" == typeof a.getParams) return b;
			try {
				return new hs.Expander(a, b, c), !1
			} catch (e) {
				return !0
			}
		},
		focusTopmost: function() {
			for (var d, e, a = 0, b = -1, c = hs.expanders, f = 0; f < c.length; f++) d = c[f], d && (e = d.wrapper.style.zIndex, e && e > a && (a = e, b = f)); - 1 == b ? hs.focusKey = -1 : c[b].focus()
		},
		getParam: function(a, b) {
			a.getParams = a.onclick;
			var c = a.getParams ? a.getParams() : null;
			return a.getParams = null, c && "undefined" != typeof c[b] ? c[b] : "undefined" != typeof hs[b] ? hs[b] : null
		},
		getSrc: function(a) {
			var b = hs.getParam(a, "src");
			return b ? b : a.href
		},
		getNode: function(a) {
			var b = hs.$(a),
				c = hs.clones[a];
			return b || c ? c ? c.cloneNode(!0) : (c = b.cloneNode(!0), c.id = "", hs.clones[a] = c, b) : null
		},
		discardElement: function(a) {
			a && hs.garbageBin.appendChild(a), hs.garbageBin.innerHTML = ""
		},
		transit: function(a, b) {
			var c = b || hs.getExpander();
			if (b = c, hs.upcoming) return !1;
			hs.last = c, hs.removeEventListener(document, window.opera ? "keypress" : "keydown", hs.keyHandler);
			try {
				hs.upcoming = a, a.onclick()
			} catch (d) {
				hs.last = hs.upcoming = null
			}
			try {
				b.close()
			} catch (d) {}
			return !1
		},
		previousOrNext: function(a, b) {
			var c = hs.getExpander(a);
			return c ? hs.transit(c.getAdjacentAnchor(b), c) : !1
		},
		previous: function(a) {
			return hs.previousOrNext(a, -1)
		},
		next: function(a) {
			return hs.previousOrNext(a, 1)
		},
		keyHandler: function(a) {
			if (a || (a = window.event), a.target || (a.target = a.srcElement), "undefined" != typeof a.target.form) return !0;
			var b = hs.getExpander(),
				c = null;
			switch (a.keyCode) {
				case 70:
					return b && b.doFullExpand(), !0;
				case 32:
				case 34:
				case 39:
				case 40:
					c = 1;
					break;
				case 8:
				case 33:
				case 37:
				case 38:
					c = -1;
					break;
				case 27:
				case 13:
					c = 0
			}
			if (null !== c) {
				if (hs.removeEventListener(document, window.opera ? "keypress" : "keydown", hs.keyHandler), !hs.enableKeyListener) return !0;
				if (a.preventDefault ? a.preventDefault() : a.returnValue = !1, b) return 0 == c ? b.close() : hs.previousOrNext(b.key, c), !1
			}
			return !0
		},
		registerOverlay: function(a) {
			hs.push(hs.overlays, hs.extend(a, {
				hsId: "hsId" + hs.idCounter++
			}))
		},
		getWrapperKey: function(a, b) {
			var c, d = /^highslide-wrapper-([0-9]+)$/;
			for (c = a; c.parentNode;) {
				if (c.id && d.test(c.id)) return c.id.replace(d, "$1");
				c = c.parentNode
			}
			if (!b)
				for (c = a; c.parentNode;) {
					if (c.tagName && hs.isHsAnchor(c))
						for (var e = 0; e < hs.expanders.length; e++) {
							var f = hs.expanders[e];
							if (f && f.a == c) return e
						}
					c = c.parentNode
				}
			return null
		},
		getExpander: function(a, b) {
			return "undefined" == typeof a ? hs.expanders[hs.focusKey] || null : "number" == typeof a ? hs.expanders[a] || null : ("string" == typeof a && (a = hs.$(a)), hs.expanders[hs.getWrapperKey(a, b)] || null)
		},
		isHsAnchor: function(a) {
			return a.onclick && a.onclick.toString().replace(/\s/g, " ").match(/hs.(htmlE|e)xpand/)
		},
		reOrder: function() {
			for (var a = 0; a < hs.expanders.length; a++) hs.expanders[a] && hs.expanders[a].isExpanded && hs.focusTopmost()
		},
		mouseClickHandler: function(a) {
			if (a || (a = window.event), a.button > 1) return !0;
			a.target || (a.target = a.srcElement);
			for (var b = a.target; b.parentNode && !/highslide-(image|move|html|resize)/.test(b.className);) b = b.parentNode;
			var c = hs.getExpander(b);
			if (c && (c.isClosing || !c.isExpanded)) return !0;
			if (c && "mousedown" == a.type) {
				if (a.target.form) return !0;
				var d = b.className.match(/highslide-(image|move|resize)/);
				if (d) return hs.dragArgs = {
					exp: c,
					type: d[1],
					left: c.x.pos,
					width: c.x.size,
					top: c.y.pos,
					height: c.y.size,
					clickX: a.clientX,
					clickY: a.clientY
				}, hs.addEventListener(document, "mousemove", hs.dragHandler), a.preventDefault && a.preventDefault(), /highslide-(image|html)-blur/.test(c.content.className) && (c.focus(), hs.hasFocused = !0), !1
			} else if ("mouseup" == a.type)
				if (hs.removeEventListener(document, "mousemove", hs.dragHandler), hs.dragArgs) {
					hs.styleRestoreCursor && "image" == hs.dragArgs.type && (hs.dragArgs.exp.content.style.cursor = hs.styleRestoreCursor);
					var e = hs.dragArgs.hasDragged;
					e || hs.hasFocused || /(move|resize)/.test(hs.dragArgs.type) ? (e || !e && hs.hasHtmlExpanders) && hs.dragArgs.exp.doShowHide("hidden") : c.close(), hs.hasFocused = !1, hs.dragArgs = null
				} else /highslide-image-blur/.test(b.className) && (b.style.cursor = hs.styleRestoreCursor);
			return !1
		},
		dragHandler: function(a) {
			if (!hs.dragArgs) return !0;
			a || (a = window.event);
			var b = hs.dragArgs,
				c = b.exp;
			b.dX = a.clientX - b.clickX, b.dY = a.clientY - b.clickY;
			var d = Math.sqrt(Math.pow(b.dX, 2) + Math.pow(b.dY, 2));
			return b.hasDragged || (b.hasDragged = "image" != b.type && d > 0 || d > (hs.dragSensitivity || 5)), b.hasDragged && a.clientX > 5 && a.clientY > 5 && ("resize" == b.type ? c.resize(b) : (c.moveTo(b.left + b.dX, b.top + b.dY), "image" == b.type && (c.content.style.cursor = "move"))), !1
		},
		wrapperMouseHandler: function(a) {
			try {
				a || (a = window.event);
				var b = /mouseover/i.test(a.type);
				a.target || (a.target = a.srcElement), a.relatedTarget || (a.relatedTarget = b ? a.fromElement : a.toElement);
				var c = hs.getExpander(a.target);
				if (!c.isExpanded) return;
				if (!c || !a.relatedTarget || hs.getExpander(a.relatedTarget, !0) == c || hs.dragArgs) return;
				for (var d = 0; d < c.overlays.length; d++)! function() {
					var a = hs.$("hsId" + c.overlays[d]);
					a && a.hideOnMouseOut && (b && hs.setStyles(a, {
						visibility: "visible",
						display: ""
					}), hs.animate(a, {
						opacity: b ? a.opacity : 0
					}, a.dur))
				}()
			} catch (a) {}
		},
		addEventListener: function(a, b, c) {
			a == document && "ready" == b && hs.push(hs.onReady, c);
			try {
				a.addEventListener(b, c, !1)
			} catch (d) {
				try {
					a.detachEvent("on" + b, c), a.attachEvent("on" + b, c)
				} catch (d) {
					a["on" + b] = c
				}
			}
		},
		removeEventListener: function(a, b, c) {
			try {
				a.removeEventListener(b, c, !1)
			} catch (d) {
				try {
					a.detachEvent("on" + b, c)
				} catch (d) {
					a["on" + b] = null
				}
			}
		},
		preloadFullImage: function(a) {
			if (hs.continuePreloading && hs.preloadTheseImages[a] && "undefined" != hs.preloadTheseImages[a]) {
				var b = document.createElement("img");
				b.onload = function() {
					b = null, hs.preloadFullImage(a + 1)
				}, b.src = hs.preloadTheseImages[a]
			}
		},
		preloadImages: function(a) {
			a && "object" != typeof a && (hs.numberOfImagesToPreload = a);
			for (var b = hs.getAnchors(), c = 0; c < b.images.length && c < hs.numberOfImagesToPreload; c++) hs.push(hs.preloadTheseImages, hs.getSrc(b.images[c]));
			hs.outlineType ? new hs.Outline(hs.outlineType, function() {
				hs.preloadFullImage(0)
			}) : hs.preloadFullImage(0), hs.restoreCursor && hs.createElement("img", {
				src: hs.graphicsDir + hs.restoreCursor
			})
		},
		init: function() {
			if (!hs.container) {
				hs.ieLt7 = hs.ie && hs.uaVersion < 7, hs.ieLt9 = hs.ie && hs.uaVersion < 9, hs.getPageSize();
				for (var a in hs.langDefaults) "undefined" != typeof hs[a] ? hs.lang[a] = hs[a] : "undefined" == typeof hs.lang[a] && "undefined" != typeof hs.langDefaults[a] && (hs.lang[a] = hs.langDefaults[a]);
				hs.container = hs.createElement("div", {
					className: "highslide-container"
				}, {
					position: "absolute",
					left: 0,
					top: 0,
					width: "100%",
					zIndex: hs.zIndexCounter,
					direction: "ltr"
				}, document.body, !0), hs.loading = hs.createElement("a", {
					className: "highslide-loading",
					title: hs.lang.loadingTitle,
					innerHTML: hs.lang.loadingText,
					href: "javascript:;"
				}, {
					position: "absolute",
					top: "-9999px",
					opacity: hs.loadingOpacity,
					zIndex: 1
				}, hs.container), hs.garbageBin = hs.createElement("div", null, {
					display: "none"
				}, hs.container), Math.linearTween = function(a, b, c, d) {
					return c * a / d + b
				}, Math.easeInQuad = function(a, b, c, d) {
					return c * (a /= d) * a + b
				}, hs.hideSelects = hs.ieLt7, hs.hideIframes = window.opera && hs.uaVersion < 9 || "KDE" == navigator.vendor || hs.ieLt7 && hs.uaVersion < 5.5
			}
		},
		ready: function() {
			if (!hs.isReady) {
				hs.isReady = !0;
				for (var a = 0; a < hs.onReady.length; a++) hs.onReady[a]()
			}
		},
		updateAnchors: function() {
			for (var a, b, f, c = [], d = [], e = {}, g = 0; g < hs.openerTagNames.length; g++) {
				b = document.getElementsByTagName(hs.openerTagNames[g]);
				for (var h = 0; h < b.length; h++)
					if (a = b[h], f = hs.isHsAnchor(a)) {
						hs.push(c, a), "hs.expand" == f[0] && hs.push(d, a);
						var i = hs.getParam(a, "slideshowGroup") || "none";
						e[i] || (e[i] = []), hs.push(e[i], a)
					}
			}
			return hs.anchors = {
				all: c,
				groups: e,
				images: d
			}, hs.anchors
		},
		getAnchors: function() {
			return hs.anchors || hs.updateAnchors()
		},
		close: function(a) {
			var b = hs.getExpander(a);
			return b && b.close(), !1
		}
	};
	hs.fx = function(a, b, c) {
		this.options = b, this.elem = a, this.prop = c, b.orig || (b.orig = {})
	}, hs.fx.prototype = {
		update: function() {
			(hs.fx.step[this.prop] || hs.fx.step._default)(this), this.options.step && this.options.step.call(this.elem, this.now, this)
		},
		custom: function(a, b, c) {
			function e(a) {
				return d.step(a)
			}
			this.startTime = (new Date).getTime(), this.start = a, this.end = b, this.unit = c, this.now = this.start, this.pos = this.state = 0;
			var d = this;
			e.elem = this.elem, e() && 1 == hs.timers.push(e) && (hs.timerId = setInterval(function() {
				for (var a = hs.timers, b = 0; b < a.length; b++) a[b]() || a.splice(b--, 1);
				a.length || clearInterval(hs.timerId)
			}, 13))
		},
		step: function(a) {
			var b = (new Date).getTime();
			if (a || b >= this.options.duration + this.startTime) {
				this.now = this.end, this.pos = this.state = 1, this.update(), this.options.curAnim[this.prop] = !0;
				var c = !0;
				for (var d in this.options.curAnim) this.options.curAnim[d] !== !0 && (c = !1);
				return c && this.options.complete && this.options.complete.call(this.elem), !1
			}
			var e = b - this.startTime;
			return this.state = e / this.options.duration, this.pos = this.options.easing(e, 0, 1, this.options.duration), this.now = this.start + (this.end - this.start) * this.pos, this.update(), !0
		}
	}, hs.extend(hs.fx, {
		step: {
			opacity: function(a) {
				hs.setStyles(a.elem, {
					opacity: a.now
				})
			},
			_default: function(a) {
				try {
					a.elem.style && null != a.elem.style[a.prop] ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
				} catch (b) {}
			}
		}
	}), hs.Outline = function(a, b) {
		this.onLoad = b, this.outlineType = a;
		var d;
		if (hs.uaVersion, this.hasAlphaImageLoader = hs.ie && hs.uaVersion < 7, !a) return b && b(), void 0;
		hs.init(), this.table = hs.createElement("table", {
			cellSpacing: 0
		}, {
			visibility: "hidden",
			position: "absolute",
			borderCollapse: "collapse",
			width: 0
		}, hs.container, !0);
		var e = hs.createElement("tbody", null, null, this.table, 1);
		this.td = [];
		for (var f = 0; 8 >= f; f++) {
			0 == f % 3 && (d = hs.createElement("tr", null, {
				height: "auto"
			}, e, !0)), this.td[f] = hs.createElement("td", null, null, d, !0);
			var g = 4 != f ? {
				lineHeight: 0,
				fontSize: 0
			} : {
				position: "relative"
			};
			hs.setStyles(this.td[f], g)
		}
		this.td[4].className = a + " highslide-outline", this.preloadGraphic()
	}, hs.Outline.prototype = {
		preloadGraphic: function() {
			var a = hs.graphicsDir + (hs.outlinesDir || "outlines/") + this.outlineType + ".png",
				b = hs.safari && hs.uaVersion < 525 ? hs.container : null;
			this.graphic = hs.createElement("img", null, {
				position: "absolute",
				top: "-9999px"
			}, b, !0);
			var c = this;
			this.graphic.onload = function() {
				c.onGraphicLoad()
			}, this.graphic.src = a
		},
		onGraphicLoad: function() {
			for (var a = this.offset = this.graphic.width / 4, b = [
					[0, 0],
					[0, -4],
					[-2, 0],
					[0, -8], 0, [-2, -8],
					[0, -2],
					[0, -6],
					[-2, -2]
				], c = {
					height: 2 * a + "px",
					width: 2 * a + "px"
				}, d = 0; 8 >= d; d++)
				if (b[d]) {
					if (this.hasAlphaImageLoader) {
						var e = 1 == d || 7 == d ? "100%" : this.graphic.width + "px",
							f = hs.createElement("div", null, {
								width: "100%",
								height: "100%",
								position: "relative",
								overflow: "hidden"
							}, this.td[d], !0);
						hs.createElement("div", null, {
							filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale, src='" + this.graphic.src + "')",
							position: "absolute",
							width: e,
							height: this.graphic.height + "px",
							left: b[d][0] * a + "px",
							top: b[d][1] * a + "px"
						}, f, !0)
					} else hs.setStyles(this.td[d], {
						background: "url(" + this.graphic.src + ") " + b[d][0] * a + "px " + b[d][1] * a + "px"
					});
					!window.opera || 3 != d && 5 != d || hs.createElement("div", null, c, this.td[d], !0), hs.setStyles(this.td[d], c)
				}
			this.graphic = null, hs.pendingOutlines[this.outlineType] && hs.pendingOutlines[this.outlineType].destroy(), hs.pendingOutlines[this.outlineType] = this, this.onLoad && this.onLoad()
		},
		setPosition: function(a, b, c) {
			var f = this.exp,
				b = (f.wrapper.style, b || 0),
				a = a || {
					x: f.x.pos + b,
					y: f.y.pos + b,
					w: f.x.get("wsize") - 2 * b,
					h: f.y.get("wsize") - 2 * b
				};
			c && (this.table.style.visibility = a.h >= 4 * this.offset ? "visible" : "hidden"), hs.setStyles(this.table, {
				left: a.x - this.offset + "px",
				top: a.y - this.offset + "px",
				width: a.w + 2 * this.offset + "px"
			}), a.w -= 2 * this.offset, a.h -= 2 * this.offset, hs.setStyles(this.td[4], {
				width: a.w >= 0 ? a.w + "px" : 0,
				height: a.h >= 0 ? a.h + "px" : 0
			}), this.hasAlphaImageLoader && (this.td[3].style.height = this.td[5].style.height = this.td[4].style.height)
		},
		destroy: function(a) {
			a ? this.table.style.visibility = "hidden" : hs.discardElement(this.table)
		}
	}, hs.Dimension = function(a, b) {
		this.exp = a, this.dim = b, this.ucwh = "x" == b ? "Width" : "Height", this.wh = this.ucwh.toLowerCase(), this.uclt = "x" == b ? "Left" : "Top", this.lt = this.uclt.toLowerCase(), this.ucrb = "x" == b ? "Right" : "Bottom", this.rb = this.ucrb.toLowerCase(), this.p1 = this.p2 = 0
	}, hs.Dimension.prototype = {
		get: function(a) {
			switch (a) {
				case "loadingPos":
					return this.tpos + this.tb + (this.t - hs.loading["offset" + this.ucwh]) / 2;
				case "wsize":
					return this.size + 2 * this.cb + this.p1 + this.p2;
				case "fitsize":
					return this.clientSize - this.marginMin - this.marginMax;
				case "maxsize":
					return this.get("fitsize") - 2 * this.cb - this.p1 - this.p2;
				case "opos":
					return this.pos - (this.exp.outline ? this.exp.outline.offset : 0);
				case "osize":
					return this.get("wsize") + (this.exp.outline ? 2 * this.exp.outline.offset : 0);
				case "imgPad":
					return this.imgSize ? Math.round((this.size - this.imgSize) / 2) : 0
			}
		},
		calcBorders: function() {
			this.cb = (this.exp.content["offset" + this.ucwh] - this.t) / 2, this.marginMax = hs["margin" + this.ucrb]
		},
		calcThumb: function() {
			this.t = this.exp.el[this.wh] ? parseInt(this.exp.el[this.wh]) : this.exp.el["offset" + this.ucwh], this.tpos = this.exp.tpos[this.dim], this.tb = (this.exp.el["offset" + this.ucwh] - this.t) / 2, (0 == this.tpos || -1 == this.tpos) && (this.tpos = hs.page[this.wh] / 2 + hs.page["scroll" + this.uclt])
		},
		calcExpanded: function() {
			var a = this.exp;
			this.justify = "auto", this.pos = this.tpos - this.cb + this.tb, this.maxHeight && "x" == this.dim && (a.maxWidth = Math.min(a.maxWidth || this.full, a.maxHeight * this.full / a.y.full)), this.size = Math.min(this.full, a["max" + this.ucwh] || this.full), this.minSize = a.allowSizeReduction ? Math.min(a["min" + this.ucwh], this.full) : this.full, a.isImage && a.useBox && (this.size = a[this.wh], this.imgSize = this.full), "x" == this.dim && hs.padToMinWidth && (this.minSize = a.minWidth), this.marginMin = hs["margin" + this.uclt], this.scroll = hs.page["scroll" + this.uclt], this.clientSize = hs.page[this.wh]
		},
		setSize: function(a) {
			var b = this.exp;
			b.isImage && (b.useBox || hs.padToMinWidth) ? (this.imgSize = a, this.size = Math.max(this.size, this.imgSize), b.content.style[this.lt] = this.get("imgPad") + "px") : this.size = a, b.content.style[this.wh] = a + "px", b.wrapper.style[this.wh] = this.get("wsize") + "px", b.outline && b.outline.setPosition(), "x" == this.dim && b.overlayBox && b.sizeOverlayBox(!0)
		},
		setPos: function(a) {
			this.pos = a, this.exp.wrapper.style[this.lt] = a + "px", this.exp.outline && this.exp.outline.setPosition()
		}
	}, hs.Expander = function(a, b, c, d) {
		if (document.readyState && hs.ie && !hs.isReady) return hs.addEventListener(document, "ready", function() {
			new hs.Expander(a, b, c, d)
		}), void 0;
		this.a = a, this.custom = c, this.contentType = d || "image", this.isImage = !this.isHtml, hs.continuePreloading = !1, this.overlays = [], hs.init();
		for (var e = this.key = hs.expanders.length, f = 0; f < hs.overrides.length; f++) {
			var g = hs.overrides[f];
			this[g] = b && "undefined" != typeof b[g] ? b[g] : hs[g]
		}
		this.src || (this.src = a.href);
		var h = b && b.thumbnailId ? hs.$(b.thumbnailId) : a;
		h = this.thumb = h.getElementsByTagName("img")[0] || h, this.thumbsUserSetId = h.id || a.id;
		for (var f = 0; f < hs.expanders.length; f++)
			if (hs.expanders[f] && hs.expanders[f].a == a) return hs.expanders[f].focus(), !1;
		if (!hs.allowSimultaneousLoading)
			for (var f = 0; f < hs.expanders.length; f++) hs.expanders[f] && hs.expanders[f].thumb != h && !hs.expanders[f].onLoadStarted && hs.expanders[f].cancelLoading();
		hs.expanders[e] = this, hs.allowMultipleInstances || hs.upcoming || (hs.expanders[e - 1] && hs.expanders[e - 1].close(), "undefined" != typeof hs.focusKey && hs.expanders[hs.focusKey] && hs.expanders[hs.focusKey].close()), this.el = h, this.tpos = this.pageOrigin || hs.getPosition(h), hs.getPageSize();
		var i = this.x = new hs.Dimension(this, "x");
		i.calcThumb();
		var j = this.y = new hs.Dimension(this, "y");
		if (j.calcThumb(), this.wrapper = hs.createElement("div", {
			id: "highslide-wrapper-" + this.key,
			className: "highslide-wrapper " + this.wrapperClassName
		}, {
			visibility: "hidden",
			position: "absolute",
			zIndex: hs.zIndexCounter += 2
		}, null, !0), this.wrapper.onmouseover = this.wrapper.onmouseout = hs.wrapperMouseHandler, "image" == this.contentType && 2 == this.outlineWhileAnimating && (this.outlineWhileAnimating = 0), this.outlineType)
			if (hs.pendingOutlines[this.outlineType]) this.connectOutline(), this[this.contentType + "Create"]();
			else {
				this.showLoading();
				var k = this;
				new hs.Outline(this.outlineType, function() {
					k.connectOutline(), k[k.contentType + "Create"]()
				})
			} else this[this.contentType + "Create"]();
		return !0
	}, hs.Expander.prototype = {
		error: function(a) {
			hs.debug ? alert("Line " + a.lineNumber + ": " + a.message) : window.location.href = this.src
		},
		connectOutline: function() {
			var a = this.outline = hs.pendingOutlines[this.outlineType];
			a.exp = this, a.table.style.zIndex = this.wrapper.style.zIndex - 1, hs.pendingOutlines[this.outlineType] = null
		},
		showLoading: function() {
			if (!this.onLoadStarted && !this.loading) {
				this.loading = hs.loading;
				var a = this;
				this.loading.onclick = function() {
					a.cancelLoading()
				};
				var a = this,
					b = this.x.get("loadingPos") + "px",
					c = this.y.get("loadingPos") + "px";
				setTimeout(function() {
					a.loading && hs.setStyles(a.loading, {
						left: b,
						top: c,
						zIndex: hs.zIndexCounter++
					})
				}, 100)
			}
		},
		imageCreate: function() {
			var a = this,
				b = document.createElement("img");
			this.content = b, b.onload = function() {
				hs.expanders[a.key] && a.contentLoaded()
			}, hs.blockRightClick && (b.oncontextmenu = function() {
				return !1
			}), b.className = "highslide-image", hs.setStyles(b, {
				visibility: "hidden",
				display: "block",
				position: "absolute",
				maxWidth: "9999px",
				zIndex: 3
			}), b.title = hs.lang.restoreTitle, hs.safari && hs.uaVersion < 525 && hs.container.appendChild(b), hs.ie && hs.flushImgSize && (b.src = null), b.src = this.src, this.showLoading()
		},
		contentLoaded: function() {
			try {
				if (!this.content) return;
				if (this.content.onload = null, this.onLoadStarted) return;
				this.onLoadStarted = !0;
				var a = this.x,
					b = this.y;
				this.loading && (hs.setStyles(this.loading, {
					top: "-9999px"
				}), this.loading = null), a.full = this.content.width, b.full = this.content.height, hs.setStyles(this.content, {
					width: a.t + "px",
					height: b.t + "px"
				}), this.wrapper.appendChild(this.content), hs.container.appendChild(this.wrapper), a.calcBorders(), b.calcBorders(), hs.setStyles(this.wrapper, {
					left: a.tpos + a.tb - a.cb + "px",
					top: b.tpos + a.tb - b.cb + "px"
				}), this.getOverlays();
				var c = a.full / b.full;
				a.calcExpanded(), this.justify(a), b.calcExpanded(), this.justify(b), this.overlayBox && this.sizeOverlayBox(0, 1), this.allowSizeReduction && (this.correctRatio(c), this.isImage && this.x.full > (this.x.imgSize || this.x.size) && (this.createFullExpand(), 1 == this.overlays.length && this.sizeOverlayBox())), this.show()
			} catch (d) {
				this.error(d)
			}
		},
		justify: function(a, b) {
			var e = (a.target, a == this.x ? "x" : "y"),
				f = !1,
				g = a.exp.allowSizeReduction;
			if (a.pos = Math.round(a.pos - (a.get("wsize") - a.t) / 2), a.pos < a.scroll + a.marginMin && (a.pos = a.scroll + a.marginMin, f = !0), !b && a.size < a.minSize && (a.size = a.minSize, g = !1), a.pos + a.get("wsize") > a.scroll + a.clientSize - a.marginMax && (!b && f && g ? a.size = Math.min(a.size, a.get("y" == e ? "fitsize" : "maxsize")) : a.get("wsize") < a.get("fitsize") ? a.pos = a.scroll + a.clientSize - a.marginMax - a.get("wsize") : (a.pos = a.scroll + a.marginMin, !b && g && (a.size = a.get("y" == e ? "fitsize" : "maxsize")))), !b && a.size < a.minSize && (a.size = a.minSize, g = !1), a.pos < a.marginMin) {
				var h = a.pos;
				a.pos = a.marginMin, g && !b && (a.size = a.size - (a.pos - h))
			}
		},
		correctRatio: function(a) {
			var b = this.x,
				c = this.y,
				d = !1,
				e = Math.min(b.full, b.size),
				f = Math.min(c.full, c.size),
				g = this.useBox || hs.padToMinWidth;
			e / f > a ? (e = f * a, e < b.minSize && (e = b.minSize, f = e / a), d = !0) : a > e / f && (f = e / a, d = !0), hs.padToMinWidth && b.full < b.minSize ? (b.imgSize = b.full, c.size = c.imgSize = c.full) : this.useBox ? (b.imgSize = e, c.imgSize = f) : (b.size = e, c.size = f), d = this.fitOverlayBox(this.useBox ? null : a, d), g && c.size < c.imgSize && (c.imgSize = c.size, b.imgSize = c.size * a), (d || g) && (b.pos = b.tpos - b.cb + b.tb, b.minSize = b.size, this.justify(b, !0), c.pos = c.tpos - c.cb + c.tb, c.minSize = c.size, this.justify(c, !0), this.overlayBox && this.sizeOverlayBox())
		},
		fitOverlayBox: function(a, b) {
			var c = this.x,
				d = this.y;
			if (this.overlayBox)
				for (; d.size > this.minHeight && c.size > this.minWidth && d.get("wsize") > d.get("fitsize");) d.size -= 10, a && (c.size = d.size * a), this.sizeOverlayBox(0, 1), b = !0;
			return b
		},
		show: function() {
			var a = this.x,
				b = this.y;
			this.doShowHide("hidden"), this.changeSize(1, {
				wrapper: {
					width: a.get("wsize"),
					height: b.get("wsize"),
					left: a.pos,
					top: b.pos
				},
				content: {
					left: a.p1 + a.get("imgPad"),
					top: b.p1 + b.get("imgPad"),
					width: a.imgSize || a.size,
					height: b.imgSize || b.size
				}
			}, hs.expandDuration)
		},
		changeSize: function(a, b, c) {
			this.outline && !this.outlineWhileAnimating && (a ? this.outline.setPosition() : this.outline.destroy()), a || this.destroyOverlays();
			var d = this,
				e = d.x,
				f = d.y,
				g = this.easing;
			a || (g = this.easingClose || g);
			var h = a ? function() {
					d.outline && (d.outline.table.style.visibility = "visible"), setTimeout(function() {
						d.afterExpand()
					}, 50)
				} : function() {
					d.afterClose()
				};
			a && hs.setStyles(this.wrapper, {
				width: e.t + "px",
				height: f.t + "px"
			}), this.fadeInOut && (hs.setStyles(this.wrapper, {
				opacity: a ? 0 : 1
			}), hs.extend(b.wrapper, {
				opacity: a
			})), hs.animate(this.wrapper, b.wrapper, {
				duration: c,
				easing: g,
				step: function(b, c) {
					if (d.outline && d.outlineWhileAnimating && "top" == c.prop) {
						var g = a ? c.pos : 1 - c.pos,
							h = {
								w: e.t + (e.get("wsize") - e.t) * g,
								h: f.t + (f.get("wsize") - f.t) * g,
								x: e.tpos + (e.pos - e.tpos) * g,
								y: f.tpos + (f.pos - f.tpos) * g
							};
						d.outline.setPosition(h, 0, 1)
					}
				}
			}), hs.animate(this.content, b.content, c, g, h), a && (this.wrapper.style.visibility = "visible", this.content.style.visibility = "visible", this.a.className += " highslide-active-anchor")
		},
		afterExpand: function() {
			this.isExpanded = !0, this.focus(), hs.upcoming && hs.upcoming == this.a && (hs.upcoming = null), this.prepareNextOutline();
			var a = hs.page,
				b = hs.mouse.x + a.scrollLeft,
				c = hs.mouse.y + a.scrollTop;
			this.mouseIsOver = this.x.pos < b && b < this.x.pos + this.x.get("wsize") && this.y.pos < c && c < this.y.pos + this.y.get("wsize"), this.overlayBox && this.showOverlays()
		},
		prepareNextOutline: function() {
			var a = this.key,
				b = this.outlineType;
			new hs.Outline(b, function() {
				try {
					hs.expanders[a].preloadNext()
				} catch (b) {}
			})
		},
		preloadNext: function() {
			var a = this.getAdjacentAnchor(1);
			a && a.onclick.toString().match(/hs\.expand/) && hs.createElement("img", {
				src: hs.getSrc(a)
			})
		},
		getAdjacentAnchor: function(a) {
			var b = this.getAnchorIndex(),
				c = hs.anchors.groups[this.slideshowGroup || "none"];
			return c && c[b + a] || null
		},
		getAnchorIndex: function() {
			var a = hs.getAnchors().groups[this.slideshowGroup || "none"];
			if (a)
				for (var b = 0; b < a.length; b++)
					if (a[b] == this.a) return b;
			return null
		},
		cancelLoading: function() {
			hs.discardElement(this.wrapper), hs.expanders[this.key] = null, this.loading && (hs.loading.style.left = "-9999px")
		},
		writeCredits: function() {
			this.credits = hs.createElement("a", {
				href: hs.creditsHref,
				target: hs.creditsTarget,
				className: "highslide-credits",
				innerHTML: hs.lang.creditsText,
				title: hs.lang.creditsTitle
			}), this.createOverlay({
				overlayId: this.credits,
				position: this.creditsPosition || "top left"
			})
		},
		getInline: function(types, addOverlay) {
			for (var i = 0; i < types.length; i++) {
				var type = types[i],
					s = null;
				if (!this[type + "Id"] && this.thumbsUserSetId && (this[type + "Id"] = type + "-for-" + this.thumbsUserSetId), this[type + "Id"] && (this[type] = hs.getNode(this[type + "Id"])), !this[type] && !this[type + "Text"] && this[type + "Eval"]) try {
					s = eval(this[type + "Eval"])
				} catch (e) {}
				if (!this[type] && this[type + "Text"] && (s = this[type + "Text"]), !this[type] && !s && (this[type] = hs.getNode(this.a["_" + type + "Id"]), !this[type]))
					for (var next = this.a.nextSibling; next && !hs.isHsAnchor(next);) {
						if (new RegExp("highslide-" + type).test(next.className || null)) {
							next.id || (this.a["_" + type + "Id"] = next.id = "hsId" + hs.idCounter++), this[type] = hs.getNode(next.id);
							break
						}
						next = next.nextSibling
					}
				if (!this[type] && s && (this[type] = hs.createElement("div", {
					className: "highslide-" + type,
					innerHTML: s
				})), addOverlay && this[type]) {
					var o = {
						position: "heading" == type ? "above" : "below"
					};
					for (var x in this[type + "Overlay"]) o[x] = this[type + "Overlay"][x];
					o.overlayId = this[type], this.createOverlay(o)
				}
			}
		},
		doShowHide: function(a) {
			hs.hideSelects && this.showHideElements("SELECT", a), hs.hideIframes && this.showHideElements("IFRAME", a), hs.geckoMac && this.showHideElements("*", a)
		},
		showHideElements: function(a, b) {
			for (var c = document.getElementsByTagName(a), d = "*" == a ? "overflow" : "visibility", e = 0; e < c.length; e++)
				if ("visibility" == d || "auto" == document.defaultView.getComputedStyle(c[e], "").getPropertyValue("overflow") || null != c[e].getAttribute("hidden-by")) {
					var f = c[e].getAttribute("hidden-by");
					if ("visible" == b && f) f = f.replace("[" + this.key + "]", ""), c[e].setAttribute("hidden-by", f), f || (c[e].style[d] = c[e].origProp);
					else if ("hidden" == b) {
						var g = hs.getPosition(c[e]);
						g.w = c[e].offsetWidth, g.h = c[e].offsetHeight;
						var h = g.x + g.w < this.x.get("opos") || g.x > this.x.get("opos") + this.x.get("osize"),
							i = g.y + g.h < this.y.get("opos") || g.y > this.y.get("opos") + this.y.get("osize"),
							j = hs.getWrapperKey(c[e]);
						h || i || j == this.key ? f != "[" + this.key + "]" && hs.focusKey != j || j == this.key ? f && f.indexOf("[" + this.key + "]") > -1 && c[e].setAttribute("hidden-by", f.replace("[" + this.key + "]", "")) : (c[e].setAttribute("hidden-by", ""), c[e].style[d] = c[e].origProp || "") : f ? -1 == f.indexOf("[" + this.key + "]") && c[e].setAttribute("hidden-by", f + "[" + this.key + "]") : (c[e].setAttribute("hidden-by", "[" + this.key + "]"), c[e].origProp = c[e].style[d], c[e].style[d] = "hidden")
					}
				}
		},
		focus: function() {
			this.wrapper.style.zIndex = hs.zIndexCounter += 2;
			for (var a = 0; a < hs.expanders.length; a++)
				if (hs.expanders[a] && a == hs.focusKey) {
					var b = hs.expanders[a];
					b.content.className += " highslide-" + b.contentType + "-blur", b.content.style.cursor = hs.ieLt7 ? "hand" : "pointer", b.content.title = hs.lang.focusTitle
				}
			this.outline && (this.outline.table.style.zIndex = this.wrapper.style.zIndex - 1), this.content.className = "highslide-" + this.contentType, this.content.title = hs.lang.restoreTitle, hs.restoreCursor && (hs.styleRestoreCursor = window.opera ? "pointer" : "url(" + hs.graphicsDir + hs.restoreCursor + "), pointer", hs.ieLt7 && hs.uaVersion < 6 && (hs.styleRestoreCursor = "hand"), this.content.style.cursor = hs.styleRestoreCursor), hs.focusKey = this.key, hs.addEventListener(document, window.opera ? "keypress" : "keydown", hs.keyHandler)
		},
		moveTo: function(a, b) {
			this.x.setPos(a), this.y.setPos(b)
		},
		resize: function(a) {
			var b, c, d = a.width / a.height;
			b = Math.max(a.width + a.dX, Math.min(this.minWidth, this.x.full)), this.isImage && Math.abs(b - this.x.full) < 12 && (b = this.x.full), c = b / d, c < Math.min(this.minHeight, this.y.full) && (c = Math.min(this.minHeight, this.y.full), this.isImage && (b = c * d)), this.resizeTo(b, c)
		},
		resizeTo: function(a, b) {
			this.y.setSize(b), this.x.setSize(a), this.wrapper.style.height = this.y.get("wsize") + "px"
		},
		close: function() {
			if (!this.isClosing && this.isExpanded) {
				this.isClosing = !0, hs.removeEventListener(document, window.opera ? "keypress" : "keydown", hs.keyHandler);
				try {
					this.content.style.cursor = "default", this.changeSize(0, {
						wrapper: {
							width: this.x.t,
							height: this.y.t,
							left: this.x.tpos - this.x.cb + this.x.tb,
							top: this.y.tpos - this.y.cb + this.y.tb
						},
						content: {
							left: 0,
							top: 0,
							width: this.x.t,
							height: this.y.t
						}
					}, hs.restoreDuration)
				} catch (a) {
					this.afterClose()
				}
			}
		},
		createOverlay: function(a) {
			var b = a.overlayId;
			if ("string" == typeof b && (b = hs.getNode(b)), a.html && (b = hs.createElement("div", {
				innerHTML: a.html
			})), b && "string" != typeof b) {
				b.style.display = "block", this.genOverlayBox();
				var c = a.width && /^[0-9]+(px|%)$/.test(a.width) ? a.width : "auto";
				/^(left|right)panel$/.test(a.position) && !/^[0-9]+px$/.test(a.width) && (c = "200px");
				var d = hs.createElement("div", {
					id: "hsId" + hs.idCounter++,
					hsId: a.hsId
				}, {
					position: "absolute",
					visibility: "hidden",
					width: c,
					direction: hs.lang.cssDirection || "",
					opacity: 0
				}, this.overlayBox, !0);
				d.appendChild(b), hs.extend(d, {
					opacity: 1,
					offsetX: 0,
					offsetY: 0,
					dur: 0 === a.fade || a.fade === !1 || 2 == a.fade && hs.ie ? 0 : 250
				}), hs.extend(d, a), this.gotOverlays && (this.positionOverlay(d), (!d.hideOnMouseOut || this.mouseIsOver) && hs.animate(d, {
					opacity: d.opacity
				}, d.dur)), hs.push(this.overlays, hs.idCounter - 1)
			}
		},
		positionOverlay: function(a) {
			var b = a.position || "middle center",
				c = a.offsetX,
				d = a.offsetY;
			a.parentNode != this.overlayBox && this.overlayBox.appendChild(a), /left$/.test(b) && (a.style.left = c + "px"), /center$/.test(b) && hs.setStyles(a, {
				left: "50%",
				marginLeft: c - Math.round(a.offsetWidth / 2) + "px"
			}), /right$/.test(b) && (a.style.right = -c + "px"), /^leftpanel$/.test(b) ? (hs.setStyles(a, {
				right: "100%",
				marginRight: this.x.cb + "px",
				top: -this.y.cb + "px",
				bottom: -this.y.cb + "px",
				overflow: "auto"
			}), this.x.p1 = a.offsetWidth) : /^rightpanel$/.test(b) && (hs.setStyles(a, {
				left: "100%",
				marginLeft: this.x.cb + "px",
				top: -this.y.cb + "px",
				bottom: -this.y.cb + "px",
				overflow: "auto"
			}), this.x.p2 = a.offsetWidth), /^top/.test(b) && (a.style.top = d + "px"), /^middle/.test(b) && hs.setStyles(a, {
				top: "50%",
				marginTop: d - Math.round(a.offsetHeight / 2) + "px"
			}), /^bottom/.test(b) && (a.style.bottom = -d + "px"), /^above$/.test(b) ? (hs.setStyles(a, {
				left: -this.x.p1 - this.x.cb + "px",
				right: -this.x.p2 - this.x.cb + "px",
				bottom: "100%",
				marginBottom: this.y.cb + "px",
				width: "auto"
			}), this.y.p1 = a.offsetHeight) : /^below$/.test(b) && (hs.setStyles(a, {
				position: "relative",
				left: -this.x.p1 - this.x.cb + "px",
				right: -this.x.p2 - this.x.cb + "px",
				top: "100%",
				marginTop: this.y.cb + "px",
				width: "auto"
			}), this.y.p2 = a.offsetHeight, a.style.position = "absolute")
		},
		getOverlays: function() {
			this.getInline(["heading", "caption"], !0), this.heading && this.dragByHeading && (this.heading.className += " highslide-move"), hs.showCredits && this.writeCredits();
			for (var a = 0; a < hs.overlays.length; a++) {
				var b = hs.overlays[a],
					c = b.thumbnailId,
					d = b.slideshowGroup;
				(!c && !d || c && c == this.thumbsUserSetId || d && d === this.slideshowGroup) && this.createOverlay(b)
			}
			for (var e = [], a = 0; a < this.overlays.length; a++) {
				var b = hs.$("hsId" + this.overlays[a]);
				/panel$/.test(b.position) ? this.positionOverlay(b) : hs.push(e, b)
			}
			for (var a = 0; a < e.length; a++) this.positionOverlay(e[a]);
			this.gotOverlays = !0
		},
		genOverlayBox: function() {
			this.overlayBox || (this.overlayBox = hs.createElement("div", {
				className: this.wrapperClassName
			}, {
				position: "absolute",
				width: (this.x.size || (this.useBox ? this.width : null) || this.x.full) + "px",
				height: (this.y.size || this.y.full) + "px",
				visibility: "hidden",
				overflow: "hidden",
				zIndex: hs.ie ? 4 : "auto"
			}, hs.container, !0))
		},
		sizeOverlayBox: function(a, b) {
			var c = this.overlayBox,
				d = this.x,
				e = this.y;
			if (hs.setStyles(c, {
				width: d.size + "px",
				height: e.size + "px"
			}), a || b)
				for (var f = 0; f < this.overlays.length; f++) {
					var g = hs.$("hsId" + this.overlays[f]),
						h = hs.ieLt7 || "BackCompat" == document.compatMode;
					g && /^(above|below)$/.test(g.position) && (h && (g.style.width = c.offsetWidth + 2 * d.cb + d.p1 + d.p2 + "px"), e["above" == g.position ? "p1" : "p2"] = g.offsetHeight), g && h && /^(left|right)panel$/.test(g.position) && (g.style.height = c.offsetHeight + 2 * e.cb + "px")
				}
			a && (hs.setStyles(this.content, {
				top: e.p1 + "px"
			}), hs.setStyles(c, {
				top: e.p1 + e.cb + "px"
			}))
		},
		showOverlays: function() {
			var a = this.overlayBox;
			a.className = "", hs.setStyles(a, {
				top: this.y.p1 + this.y.cb + "px",
				left: this.x.p1 + this.x.cb + "px",
				overflow: "visible"
			}), hs.safari && (a.style.visibility = "visible"), this.wrapper.appendChild(a);
			for (var b = 0; b < this.overlays.length; b++) {
				var c = hs.$("hsId" + this.overlays[b]);
				c.style.zIndex = c.zIndex || 4, (!c.hideOnMouseOut || this.mouseIsOver) && (c.style.visibility = "visible", hs.setStyles(c, {
					visibility: "visible",
					display: ""
				}), hs.animate(c, {
					opacity: c.opacity
				}, c.dur))
			}
		},
		destroyOverlays: function() {
			this.overlays.length && hs.discardElement(this.overlayBox)
		},
		createFullExpand: function() {
			this.fullExpandLabel = hs.createElement("a", {
				href: "javascript:hs.expanders[" + this.key + "].doFullExpand();",
				title: hs.lang.fullExpandTitle,
				className: "highslide-full-expand"
			}), this.createOverlay({
				overlayId: this.fullExpandLabel,
				position: hs.fullExpandPosition,
				hideOnMouseOut: !0,
				opacity: hs.fullExpandOpacity
			})
		},
		doFullExpand: function() {
			try {
				this.fullExpandLabel && hs.discardElement(this.fullExpandLabel), this.focus();
				var a = this.x.size,
					b = this.y.size;
				this.resizeTo(this.x.full, this.y.full);
				var c = this.x.pos - (this.x.size - a) / 2;
				c < hs.marginLeft && (c = hs.marginLeft);
				var d = this.y.pos - (this.y.size - b) / 2;
				d < hs.marginTop && (d = hs.marginTop), this.moveTo(c, d), this.doShowHide("hidden")
			} catch (e) {
				this.error(e)
			}
		},
		afterClose: function() {
			this.a.className = this.a.className.replace("highslide-active-anchor", ""), this.doShowHide("visible"), this.outline && this.outlineWhileAnimating && this.outline.destroy(), hs.discardElement(this.wrapper), hs.expanders[this.key] = null, hs.reOrder()
		}
	}, hs.langDefaults = hs.lang;
	var HsExpander = hs.Expander;
	hs.ie && window == window.top && function() {
		try {
			document.documentElement.doScroll("left")
		} catch (a) {
			return setTimeout(arguments.callee, 50), void 0
		}
		hs.ready()
	}(), hs.addEventListener(document, "DOMContentLoaded", hs.ready), hs.addEventListener(window, "load", hs.ready), hs.addEventListener(document, "ready", function() {
		function c(c, d) {
			if (hs.ie && (hs.uaVersion < 9 || b)) {
				var e = document.styleSheets[document.styleSheets.length - 1];
				"object" == typeof e.addRule && e.addRule(c, d)
			} else a.appendChild(document.createTextNode(c + " {" + d + "}"))
		}
		if (hs.expandCursor) {
			var a = hs.createElement("style", {
				type: "text/css"
			}, null, document.getElementsByTagName("HEAD")[0]),
				b = "BackCompat" == document.compatMode;
			hs.expandCursor && c(".highslide img", "cursor: url(" + hs.graphicsDir + hs.expandCursor + "), pointer !important;")
		}
	}), hs.addEventListener(window, "resize", function() {
		hs.getPageSize()
	}), hs.addEventListener(document, "mousemove", function(a) {
		hs.mouse = {
			x: a.clientX,
			y: a.clientY
		}
	}), hs.addEventListener(document, "mousedown", hs.mouseClickHandler), hs.addEventListener(document, "mouseup", hs.mouseClickHandler), hs.addEventListener(document, "ready", hs.getAnchors), hs.addEventListener(window, "load", hs.preloadImages)
}