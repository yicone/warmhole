"use strict";!function(){function e(e){for(var t=window.location.search.substring(1),s=t.split("&"),n=0;n<s.length;n++){var a=s[n].split("=");if(decodeURIComponent(a[0])==e)return decodeURIComponent(a[1])}console.log("Query variable %s not found",e)}function t(){this.ENGINES=[]}var s={enginePair:["Ask","搜狗"],autoSO:!0,show_side:2,sync_mode:0};t.prototype.exists=function(e){return this.ENGINES.some(function(t){return t.name==e})},t.prototype.get=function(e){return this.ENGINES.find(function(t){return t.name==e})};var n={_state:{},_enginesConfig:new t,_set_url:[],_set_top:[0,0],_set_left:[0,0],_set_foot:[0,0],$soinput:$(".soinput"),$progress:$("div.progress>div"),$iframe:$("iframe.search_window"),$a:$("#a"),$b:$("#b"),initState:function(){if(void 0!==localStorage.allso_state){var e=localStorage.allso_state;n._state=JSON.parse(e)}n._state=$.extend({},s,n._state),console.log("launch engines:",n._state.enginePair)},resizePanel:function(){var e=$("body").width(),t=$(window).height(),s=$("nav.navbar").height(),a=e/2;console.log("app._state.show_side on resizePanel",n._state.show_side),2==n._state.show_side?(n.$a.fadeIn("fast").animate({"margin-left":n._set_left[0],width:a-n._set_left[0]},"fast"),n.$b.fadeIn("fast").animate({"margin-left":a+n._set_left[1],width:a-n._set_left[1]},"fast"),n.$progress[0].style.width="50%",n.$progress[1].style.width="50%"):0==n._state.show_side?(n.$a.fadeIn("fast").animate({"margin-left":n._set_left[0],width:e-n._set_left[0]},"fast"),n.$b.fadeOut("fast"),n.$progress[0].style.width="75%",n.$progress[1].style.width="25%"):(n.$a.fadeOut("fast"),n.$b.fadeIn("fast").animate({"margin-left":n._set_left[1],width:e-n._set_left[0]},"fast"),n.$progress[0].style.width="25%",n.$progress[1].style.width="75%"),n.$a.animate({"margin-top":n._set_top[0]+s,height:t-n._set_top[0]-s+n._set_foot[0]},"fast"),n.$b.animate({"margin-top":n._set_top[1]+s,height:t-n._set_top[1]-s+n._set_foot[1]},"fast")},saveState:function(){localStorage.allso_state=JSON.stringify(n._state)},onEngineSelected:function(e,t){window.electronFlag||localStorage["X-Frame-Options"]||["Google","微博","Evernote"].indexOf(t)>=0&&$("#myModal").modal("show"),n._enginesConfig.exists(t)?(n._state.enginePair[e]=t,n.saveState()):t=n._state.enginePair[e],console.log("engine_key",t);var s=n._enginesConfig.get(t);if(!s)throw new Error("no engine selected");n._set_url[e]=s.url,n._set_top[e]=s.offset.top,n._set_left[e]=s.offset.left,n._set_foot[e]=s.offset.bottom,$(".engine-brand img").eq(e).attr("src",s.logo),n.resizePanel(),n.startSearch(e)},getUrl:function(e){var t=$.trim(n.$soinput[e].value),s=n._set_url[e].replace("${k}",encodeURIComponent(t));return"Evernote"==n._state.enginePair[e]&&(s+="&"),s},doubleSearch:function(e){n.$a[0].src=n.getUrl(0);var t=$(n.$soinput[0]).val(),s=$(n.$soinput[1]).val();if(t||s){var a,i;if(1==n._state.sync_mode)a="en",i="zh-CN";else{if(2!=n._state.sync_mode)return 0!=e&&s||$(n.$soinput[1]).val(t),void(n.$b[0].src=n.getUrl(1));a="zh-CN",i="en"}var o="https://whitehole.gadn.in/.netlify/functions/gtrans?sl="+a+"&tl="+i+"&dt=t&q="+keywords;$.ajax({url:o,dataType:"text",success:function(e){console.log("translate result:",e),$(n.$soinput[1]).val(e),n.$b[0].src=n.getUrl(1)},error:function(e,t,s){console.error(e,t,s),$(n.$soinput[1]).val(keywords),n.$b[0].src=n.getUrl(1)}})}},searchLoading:function(e){var t=2==e?n.$progress:$(n.$progress[e]);t.addClass("progress-bar-striped active"),window.setTimeout(function(){t.removeClass("progress-bar-striped active")},2e3),2==e?e=2==n._state.show_side?0:n._state.show_side:3==e&&(e=0);var s=$.trim(n.$soinput[e].value);if(!s)return void(window.document.title="虫洞搜索 - 享受搜索的乐趣");window.document.title=s+" - 虫洞搜索"},startSearch:function(e){3==e?e=0:2==e&&(e=2==n._state.show_side?0:n._state.show_side),console.log("start search: side",e),2!=n._state.show_side?e!=n._state.show_side?(n._state.show_side=2,n.saveState(),n.resizePanel(),n.searchLoading(2),n.doubleSearch(e)):0==e?(n.$a[0].src=n.getUrl(e),n.searchLoading(0)):(console.assert(1==e,"用例4 side should be 1",e),n.$b[0].src=n.getUrl(e),n.searchLoading(1)):0==e?(n.doubleSearch(e),n.searchLoading(2)):(console.assert(1==e,"用例2 side should be 1",e),n.$b[0].src=n.getUrl(e),n.searchLoading(1))},expandPanel:function(e){2==n._state.show_side?(n._state.show_side=e,n._set_left[e]=0,n.resizePanel(),n.startSearch(e)):(n._state.show_side=2,n.startSearch(2)),n.saveState()}};$(function(){n.initState(),$.get("https://whitehole.gadn.in/.netlify/functions/engines-get-all",function(t){var s="string"==typeof t?JSON.parse(t):t;n._enginesConfig.ENGINES=s.sort(function(e,t){return e.group-t.group}),$(".engines").each(function(e){for(var t in n._enginesConfig.ENGINES){var s=n._enginesConfig.ENGINES[t],a=e,i=s.name;if(t-1>=0){var o=n._enginesConfig.ENGINES[t-1];s.group>o.group&&$(this).append('<li role="separator" class="divider"></li>')}var r='<li><div><img src="'+s.logo+'" style="margin:5px;width:32px;height:32px"/><a href="#" data-side="'+a+'" data-engine-key="'+i+'">'+i+"</a></div></li>";$(this).append(r)}}),$(".engines a").click(function(e){var t=$(this).attr("data-side"),s=$(this).attr("data-engine-key");n.onEngineSelected(t,s)}),window.addEventListener("resize",function(){n.resizePanel(),n.startSearch(2)});for(var a in n._state.enginePair){var i=n._state.enginePair[a];n.onEngineSelected(a,i),$("div.loading").fadeOut("fast")}if(location.search){var o=e("q");o&&(o=o.replace(/\+/g," ").replace(/%20/g," "),n.$soinput.val(o),n.startSearch(2))}}).fail(function(e){console.error("获取引擎列表错误",e)}),$($(".sync-mode>a")[n._state.sync_mode]).addClass("btn-danger"),$($(".modal-footer>button").get(1)).click(function(){localStorage["X-Frame-Options"]=!0,$("#myModal").modal("hide")}),n.$soinput.each(function(e){$(this).on("input",function(){n._state.autoSO&&n.startSearch(e)}),$(this).bind("enterKey",function(t){var s=$(this).val();location=location.origin+"?q="+s,0==e&&n.startSearch(e)}),$(this).keyup(function(e){13==e.keyCode&&$(this).trigger("enterKey")})}),$("#jdt1").click(function(){n.expandPanel(0)}),$("#jdt2").click(function(){n.expandPanel(1)}),$(".sync-mode>a").each(function(e){$(this).click({index:e},function(t){$(".sync-mode>a").removeClass("btn-danger"),$(this).addClass("btn-danger"),n._state.sync_mode=e,n.saveState(),n.startSearch(3)})})})}();
//# sourceMappingURL=main.js.map
