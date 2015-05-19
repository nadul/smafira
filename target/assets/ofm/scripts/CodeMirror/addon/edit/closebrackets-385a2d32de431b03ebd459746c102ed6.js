(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){function s(e,t){var n=e.getRange(i(t.line,t.ch-1),i(t.line,t.ch+1));return n.length==2?n:null}function o(t){var n={name:"autoCloseBrackets",Backspace:function(n){if(n.getOption("disableInput"))return e.Pass;var r=n.listSelections();for(var o=0;o<r.length;o++){if(!r[o].empty())return e.Pass;var u=s(n,r[o].head);if(!u||t.indexOf(u)%2!=0)return e.Pass}for(var o=r.length-1;o>=0;o--){var a=r[o].head;n.replaceRange("",i(a.line,a.ch-1),i(a.line,a.ch+1))}}};var o="";for(var u=0;u<t.length;u+=2)(function(t,s){if(t!=s)o+=s;n["'"+t+"'"]=function(n){if(n.getOption("disableInput"))return e.Pass;var u=n.listSelections(),a,f;for(var l=0;l<u.length;l++){var c=u[l],h=c.head,p;if(t=="'"&&n.getTokenTypeAt(h)=="comment")return e.Pass;var f=n.getRange(h,i(h.line,h.ch+1));if(!c.empty())p="surround";else if(t==s&&f==s){if(n.getRange(h,i(h.line,h.ch+3))==t+t+t)p="skipThree";else p="skip"}else if(t==s&&h.ch>1&&n.getRange(i(h.line,h.ch-2),h)==t+t)p="addFour";else if(t==s&&e.isWordChar(f))return e.Pass;else if(n.getLine(h.line).length==h.ch||o.indexOf(f)>=0||r.test(f))p="both";else return e.Pass;if(!a)a=p;else if(a!=p)return e.Pass}n.operation(function(){if(a=="skip"){n.execCommand("goCharRight")}else if(a=="skipThree"){for(var e=0;e<3;e++)n.execCommand("goCharRight")}else if(a=="surround"){var r=n.getSelections();for(var e=0;e<r.length;e++)r[e]=t+r[e]+s;n.replaceSelections(r,"around")}else if(a=="both"){n.replaceSelection(t+s,null);n.execCommand("goCharLeft")}else if(a=="addFour"){n.replaceSelection(t+t+t+t,"before");n.execCommand("goCharRight")}})};if(t!=s)n["'"+s+"'"]=function(t){var n=t.listSelections();for(var r=0;r<n.length;r++){var o=n[r];if(!o.empty()||t.getRange(o.head,i(o.head.line,o.head.ch+1))!=s)return e.Pass}t.execCommand("goCharRight")}})(t.charAt(u),t.charAt(u+1));return n}function u(t){return function(n){if(n.getOption("disableInput"))return e.Pass;var r=n.listSelections();for(var i=0;i<r.length;i++){if(!r[i].empty())return e.Pass;var o=s(n,r[i].head);if(!o||t.indexOf(o)%2!=0)return e.Pass}n.operation(function(){n.replaceSelection("\n\n",null);n.execCommand("goCharLeft");r=n.listSelections();for(var e=0;e<r.length;e++){var t=r[e].head.line;n.indentLine(t,null,true);n.indentLine(t+1,null,true)}})}}var t="()[]{}''\"\"";var n="[]{}";var r=/\s/;var i=e.Pos;e.defineOption("autoCloseBrackets",false,function(r,i,s){if(s!=e.Init&&s)r.removeKeyMap("autoCloseBrackets");if(!i)return;var a=t,f=n;if(typeof i=="string")a=i;else if(typeof i=="object"){if(i.pairs!=null)a=i.pairs;if(i.explode!=null)f=i.explode}var l=o(a);if(f)l.Enter=u(f);r.addKeyMap(l)})})