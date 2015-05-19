(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";function n(e,n,i,s){this.atOccurrence=false;this.doc=e;if(s==null&&typeof n=="string")s=false;i=i?e.clipPos(i):t(0,0);this.pos={from:i,to:i};if(typeof n!="string"){if(!n.global)n=new RegExp(n.source,n.ignoreCase?"ig":"g");this.matches=function(r,i){if(r){n.lastIndex=0;var s=e.getLine(i.line).slice(0,i.ch),o=0,u,a;for(;;){n.lastIndex=o;var f=n.exec(s);if(!f)break;u=f;a=u.index;o=u.index+(u[0].length||1);if(o==s.length)break}var l=u&&u[0].length||0;if(!l){if(a==0&&s.length==0){u=undefined}else if(a!=e.getLine(i.line).length){l++}}}else{n.lastIndex=i.ch;var s=e.getLine(i.line),u=n.exec(s);var l=u&&u[0].length||0;var a=u&&u.index;if(a+l!=s.length&&!l)l=1}if(u&&l)return{from:t(i.line,a),to:t(i.line,a+l),match:u}}}else{var o=n;if(s)n=n.toLowerCase();var u=s?function(e){return e.toLowerCase()}:function(e){return e};var a=n.split("\n");if(a.length==1){if(!n.length){this.matches=function(){}}else{this.matches=function(i,s){if(i){var a=e.getLine(s.line).slice(0,s.ch),f=u(a);var l=f.lastIndexOf(n);if(l>-1){l=r(a,f,l);return{from:t(s.line,l),to:t(s.line,l+o.length)}}}else{var a=e.getLine(s.line).slice(s.ch),f=u(a);var l=f.indexOf(n);if(l>-1){l=r(a,f,l)+s.ch;return{from:t(s.line,l),to:t(s.line,l+o.length)}}}}}}else{var f=o.split("\n");this.matches=function(n,r){var i=a.length-1;if(n){if(r.line-(a.length-1)<e.firstLine())return;if(u(e.getLine(r.line).slice(0,f[i].length))!=a[a.length-1])return;var s=t(r.line,f[i].length);for(var o=r.line-1,l=i-1;l>=1;--l,--o)if(a[l]!=u(e.getLine(o)))return;var c=e.getLine(o),h=c.length-f[0].length;if(u(c.slice(h))!=a[0])return;return{from:t(o,h),to:s}}else{if(r.line+(a.length-1)>e.lastLine())return;var c=e.getLine(r.line),h=c.length-f[0].length;if(u(c.slice(h))!=a[0])return;var p=t(r.line,h);for(var o=r.line+1,l=1;l<i;++l,++o)if(a[l]!=u(e.getLine(o)))return;if(e.getLine(o).slice(0,f[i].length)!=a[i])return;return{from:p,to:t(o,f[i].length)}}}}}}function r(e,t,n){if(e.length==t.length)return n;for(var r=Math.min(n,e.length);;){var i=e.slice(0,r).toLowerCase().length;if(i<n)++r;else if(i>n)--r;else return r}}var t=e.Pos;n.prototype={findNext:function(){return this.find(false)},findPrevious:function(){return this.find(true)},find:function(e){function i(e){var r=t(e,0);n.pos={from:r,to:r};n.atOccurrence=false;return false}var n=this,r=this.doc.clipPos(e?this.pos.from:this.pos.to);for(;;){if(this.pos=this.matches(e,r)){this.atOccurrence=true;return this.pos.match||true}if(e){if(!r.line)return i(0);r=t(r.line-1,this.doc.getLine(r.line-1).length)}else{var s=this.doc.lineCount();if(r.line==s-1)return i(s);r=t(r.line+1,0)}}},from:function(){if(this.atOccurrence)return this.pos.from},to:function(){if(this.atOccurrence)return this.pos.to},replace:function(n){if(!this.atOccurrence)return;var r=e.splitLines(n);this.doc.replaceRange(r,this.pos.from,this.pos.to);this.pos.to=t(this.pos.from.line+r.length-1,r[r.length-1].length+(r.length==1?this.pos.from.ch:0))}};e.defineExtension("getSearchCursor",function(e,t,r){return new n(this.doc,e,t,r)});e.defineDocExtension("getSearchCursor",function(e,t,r){return new n(this,e,t,r)});e.defineExtension("selectMatches",function(t,n){var r=[],i;var s=this.getSearchCursor(t,this.getCursor("from"),n);while(i=s.findNext()){if(e.cmpPos(s.to(),this.getCursor("to"))>0)break;r.push({anchor:s.from(),head:s.to()})}if(r.length)this.setSelections(r,0)})})