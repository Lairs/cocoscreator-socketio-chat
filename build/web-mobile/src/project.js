require=function e(t,n,c){function o(i,s){if(!n[i]){if(!t[i]){var u="function"==typeof require&&require;if(!s&&u)return u(i,!0);if(r)return r(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var a=n[i]={exports:{}};t[i][0].call(a.exports,function(e){var n=t[i][1][e];return o(n?n:e)},a,a.exports,e,t,n,c)}return n[i].exports}for(var r="function"==typeof require&&require,i=0;i<c.length;i++)o(c[i]);return o}({ChatConnector:[function(e,t,n){"use strict";cc._RFpush(t,"b9236Inu89Bi7b34OU2fLCw","ChatConnector"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){cc.game.addPersistRootNode(this.node)}}),cc._RFpop()},{}],HelloWorld:[function(e,t,n){"use strict";cc._RFpush(t,"280c3rsZJJKnZ9RqbALVwtK","HelloWorld"),cc.Class({"extends":cc.Component,properties:{label:{"default":null,type:cc.Label},text:"Hello, World!"},onLoad:function(){this.label.string=this.text},update:function(e){}}),cc._RFpop()},{}],SceneSwitcher:[function(e,t,n){"use strict";cc._RFpush(t,"8750eWLFfZPrZ1t50dJsMDV","SceneSwitcher"),cc.Class({"extends":cc.Component,properties:{SceneName:""},onLoad:function(){},switchScene:function(){cc.director.loadScene(SceneName)}}),cc._RFpop()},{}]},{},["HelloWorld","SceneSwitcher","ChatConnector"]);