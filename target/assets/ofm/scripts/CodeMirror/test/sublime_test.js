(function(){"use strict";function t(t){var n=Array.prototype.slice.call(arguments,1);testCM(t,function(t){for(var r=0;r<n.length;r++){var i=n[r];if(typeof i=="string"&&r==0)t.setValue(i);else if(typeof i=="string")t.execCommand(i);else if(i instanceof e)t.setCursor(i);else i(t)}})}function n(t,n,r){return function(i){eq(i.listSelections().length,1);eqPos(i.getCursor("head"),e(t,n),r);eqPos(i.getCursor("anchor"),e(t,n),r)}}function r(e,t){return function(n){eq(n.getValue(),e,t)}}function i(t){if(t.length%4)throw new Error("Wrong number of arguments for ranges.");var n=[];for(var r=0;r<t.length;r+=4)n.push({anchor:e(t[r],t[r+1]),head:e(t[r+2],t[r+3])});return n}function s(){var e=i(arguments);return function(t){t.setSelections(e,0)}}function o(){var e=i(arguments);return function(t){var n=t.listSelections();if(n.length!=e.length)throw new Failure("Expected "+e.length+" selections, but found "+n.length);for(var r=0;r<n.length;r++){eqPos(n[r].anchor,e[r].anchor,"anchor "+r);eqPos(n[r].head,e[r].head,"head "+r)}}}var e=CodeMirror.Pos;namespace="sublime_";t("bySubword","the foo_bar DooDahBah \n a","goSubwordLeft",n(0,0),"goSubwordRight",n(0,3),"goSubwordRight",n(0,7),"goSubwordRight",n(0,11),"goSubwordRight",n(0,15),"goSubwordRight",n(0,18),"goSubwordRight",n(0,21),"goSubwordRight",n(0,22),"goSubwordRight",n(1,0),"goSubwordRight",n(1,2),"goSubwordRight",n(1,2),"goSubwordLeft",n(1,1),"goSubwordLeft",n(1,0),"goSubwordLeft",n(0,22),"goSubwordLeft",n(0,18),"goSubwordLeft",n(0,15),"goSubwordLeft",n(0,12),"goSubwordLeft",n(0,8),"goSubwordLeft",n(0,4),"goSubwordLeft",n(0,0));t("splitSelectionByLine","abc\ndef\nghi",s(0,1,2,2),"splitSelectionByLine",o(0,1,0,3,1,0,1,3,2,0,2,2));t("splitSelectionByLineMulti","abc\ndef\nghi\njkl",s(0,1,1,1,1,2,3,2,3,3,3,3),"splitSelectionByLine",o(0,1,0,3,1,0,1,1,1,2,1,3,2,0,2,3,3,0,3,2,3,3,3,3));t("selectLine","abc\ndef\nghi",s(0,1,0,1,2,0,2,1),"selectLine",o(0,0,1,0,2,0,2,3),s(0,1,1,0),"selectLine",o(0,0,2,0));t("insertLineAfter","abcde\nfghijkl\nmn",s(0,1,0,1,0,3,0,3,1,2,1,2,1,3,1,5),"insertLineAfter",o(1,0,1,0,3,0,3,0),r("abcde\n\nfghijkl\n\nmn"));t("insertLineBefore","abcde\nfghijkl\nmn",s(0,1,0,1,0,3,0,3,1,2,1,2,1,3,1,5),"insertLineBefore",o(0,0,0,0,2,0,2,0),r("\nabcde\n\nfghijkl\nmn"));t("selectNextOccurrence","a foo bar\nfoobar foo",s(0,2,0,5),"selectNextOccurrence",o(0,2,0,5,1,0,1,3),"selectNextOccurrence",o(0,2,0,5,1,0,1,3,1,7,1,10),"selectNextOccurrence",o(0,2,0,5,1,0,1,3,1,7,1,10),e(0,3),"selectNextOccurrence",o(0,2,0,5),"selectNextOccurrence",o(0,2,0,5,1,7,1,10),s(0,6,0,9),"selectNextOccurrence",o(0,6,0,9,1,3,1,6));t("selectScope","foo(a) {\n  bar[1, 2];\n}","selectScope",o(0,0,2,1),e(0,4),"selectScope",o(0,4,0,5),e(0,5),"selectScope",o(0,4,0,5),e(0,6),"selectScope",o(0,0,2,1),e(0,8),"selectScope",o(0,8,2,0),e(1,2),"selectScope",o(0,8,2,0),e(1,6),"selectScope",o(1,6,1,10),e(1,9),"selectScope",o(1,6,1,10));t("goToBracket","foo(a) {\n  bar[1, 2];\n}",e(0,0),"goToBracket",n(0,0),e(0,4),"goToBracket",n(0,5),"goToBracket",n(0,4),e(0,8),"goToBracket",n(2,0),"goToBracket",n(0,8),e(1,2),"goToBracket",n(2,0),e(1,7),"goToBracket",n(1,10),"goToBracket",n(1,6));t("swapLine","1\n2\n3---\n4\n5","swapLineDown",r("2\n1\n3---\n4\n5"),"swapLineUp",r("1\n2\n3---\n4\n5"),"swapLineUp",r("1\n2\n3---\n4\n5"),e(4,1),"swapLineDown",r("1\n2\n3---\n4\n5"),s(0,1,0,1,1,0,2,0,2,2,2,2),"swapLineDown",r("4\n1\n2\n3---\n5"),o(1,1,1,1,2,0,3,0,3,2,3,2),"swapLineUp",r("1\n2\n3---\n4\n5"),o(0,1,0,1,1,0,2,0,2,2,2,2));t("swapLineUpFromEnd","a\nb\nc",e(2,1),"swapLineUp",o(1,1,1,1),r("a\nc\nb"));t("joinLines","abc\ndef\nghi\njkl","joinLines",r("abc def\nghi\njkl"),n(0,4),"undo",s(0,2,1,1),"joinLines",r("abc def ghi\njkl"),o(0,2,0,8),"undo",s(0,1,0,1,1,1,1,1,3,1,3,1),"joinLines",r("abc def ghi\njkl"),o(0,4,0,4,0,8,0,8,1,3,1,3));t("duplicateLine","abc\ndef\nghi",e(1,0),"duplicateLine",r("abc\ndef\ndef\nghi"),n(2,0),"undo",s(0,1,0,1,1,1,1,1,2,1,2,1),"duplicateLine",r("abc\nabc\ndef\ndef\nghi\nghi"),o(1,1,1,1,3,1,3,1,5,1,5,1));t("duplicateLineSelection","abcdef",s(0,1,0,1,0,2,0,4,0,5,0,5),"duplicateLine",r("abcdef\nabcdcdef\nabcdcdef"),o(2,1,2,1,2,4,2,6,2,7,2,7));t("selectLinesUpward","123\n345\n789\n012",s(0,1,0,1,1,1,1,3,2,0,2,0,3,0,3,0),"selectLinesUpward",o(0,1,0,1,0,3,0,3,1,0,1,0,1,1,1,3,2,0,2,0,3,0,3,0));t("selectLinesDownward","123\n345\n789\n012",s(0,1,0,1,1,1,1,3,2,0,2,0,3,0,3,0),"selectLinesDownward",o(0,1,0,1,1,1,1,3,2,0,2,0,2,3,2,3,3,0,3,0));t("sortLines","c\nb\na\nC\nB\nA","sortLines",r("A\nB\nC\na\nb\nc"),"undo",s(0,0,2,0,3,0,5,0),"sortLines",r("a\nb\nc\nA\nB\nC"),o(0,0,2,1,3,0,5,1),"undo",s(1,0,4,0),"sortLinesInsensitive",r("c\na\nB\nb\nC\nA"));t("bookmarks","abc\ndef\nghi\njkl",e(0,1),"toggleBookmark",s(1,1,1,2),"toggleBookmark",s(2,1,2,2),"toggleBookmark","nextBookmark",o(0,1,0,1),"nextBookmark",o(1,1,1,2),"nextBookmark",o(2,1,2,2),"prevBookmark",o(1,1,1,2),"prevBookmark",o(0,1,0,1),"prevBookmark",o(2,1,2,2),"prevBookmark",o(1,1,1,2),"toggleBookmark","prevBookmark",o(2,1,2,2),"prevBookmark",o(0,1,0,1),"selectBookmarks",o(0,1,0,1,2,1,2,2),"clearBookmarks",e(0,0),"selectBookmarks",n(0,0));t("upAndDowncaseAtCursor","abc\ndef  x\nghI",s(0,1,0,3,1,1,1,1,1,4,1,4),"upcaseAtCursor",r("aBC\nDEF  x\nghI"),o(0,1,0,3,1,3,1,3,1,4,1,4),"downcaseAtCursor",r("abc\ndef  x\nghI"),o(0,1,0,3,1,3,1,3,1,4,1,4));t("mark","abc\ndef\nghi",e(1,1),"setSublimeMark",e(2,1),"selectToSublimeMark",o(2,1,1,1),e(0,1),"swapWithSublimeMark",n(1,1),"swapWithSublimeMark",n(0,1),"deleteToSublimeMark",r("aef\nghi"),"sublimeYank",r("abc\ndef\nghi"),n(1,1));t("findUnder","foo foobar  a","findUnder",o(0,4,0,7),"findUnder",o(0,0,0,3),"findUnderPrevious",o(0,4,0,7),"findUnderPrevious",o(0,0,0,3),e(0,4),"findUnder",o(0,4,0,10),e(0,11),"findUnder",o(0,11,0,11))})()