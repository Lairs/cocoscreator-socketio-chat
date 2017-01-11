require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ChatConnector":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b9236Inu89Bi7b34OU2fLCw', 'ChatConnector');
// Script/ChatConnector.js

cc.Class({
    'extends': cc.Component,

    properties: {
        account: {
            'default': null,
            type: cc.EditBox
        },
        password: {
            'default': null,
            type: cc.EditBox
        },

        sio: {
            'default': null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);

        //test
        //var sio = io.connect("http://rareslab.ddns.net:3030");
        var self = this;
        this.sio = io.connect("http://localhost:3000");
        console.log(this.sio);
        this.sio.on('chat message', function (data) {
            console.log('this is chat message.');
            console.log(data);
        });

        this.sio.on('connect', function (any) {
            //pure event, no more thing.
            console.log("connected to localhost.");
            console.log(any);
        });

        this.sio.on('disconnect', function (any) {
            //pure event, no more thing.
            console.log("this is disconnect to localhost.");
            console.log(any);
        });

        //login events
        this.sio.on('login_success', function (any) {
            //pure event, no more thing.
            console.log("login success, do something.");
            console.log(any);
            self.sio.emit("chat message", "hello chat room");
        });
        this.sio.on('login_fail', function (any) {
            //pure event, no more thing.
            console.log("login fail, do something.");
            console.log(any);
        });

        //cc.eventManager.dispatchCustomEvent("logIn",{acc:"123",pw:"456"});
        cc.eventManager.addCustomListener("logIn", this.onRequestLogIn.bind(this));
    },

    onRequestLogIn: function onRequestLogIn(event) {
        console.log("ready to logIn, sending info:");
        console.log(event.detail);
        //console.log(this);
        this.sio.emit('clientLogIn', event.detail);
    },

    onEnable: function onEnable() {
        //if switch scene, will be call
        console.log("on enable");
        //find edit box
        //Path: Canvas/InputLayer/UserNameInput, UUID: 102a2Wlc7lCWq/gpWOtdR5h
        console.log(cc.director.getScene());

        //if default scene, will be empty string?
        console.log(cc.director.getScene().getName());
        //this.account = cc.director.getScene().getChildByName('Canvas/InputLayer/UserNameInput');

        // this.account = cc.find('Canvas/InputLayer/UserNameInput');

        // //this.password = cc.director.getScene().getChildByName('Canvas/InputLayer/PasswordInput');
        // this.password = cc.find('Canvas/InputLayer/PasswordInput');
        // if(null === this.account)
        // {
        //     return;
        // }

        // this.account = this.account.getComponent(cc.EditBox);
        // this.password = this.password.getComponent(cc.EditBox);

        // try {
        //     console.log(this.account.string);
        //     console.log(this.password.string);

        // } catch (e)
        // {
        //     console.log("Error on enable");
        //     console.log(e);
        // }
    },

    onDisable: function onDisable() {
        //if switch scene, will be call
        console.log("on disable");
        // if(null === this.account)
        // {
        //     return;
        // }
        // try {
        //     console.log(this.account.string);
        //     console.log(this.password.string);

        // } catch (e)
        // {
        //     console.log("Error on disable");
        //     console.log(e);
        // }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    /*
    update ( )
    如果该组件启用，则每帧调用 update。
    lateUpdate ( )
    如果该组件启用，则每帧调用 LateUpdate。
    onLoad ( )
    当附加到一个激活的节点上或者其节点第一次激活时候调用。
    start ( )
    如果该组件第一次启用，则在所有组件的 update 之前调用。
    onEnable ( )
    当该组件被启用，并且它的节点也激活时。
    onDisable ( )
    当该组件被禁用或节点变为无效时调用。
    onDestroy ( )
    当该组件被销毁时调用*/
});

cc._RFpop();
},{}],"HelloWorld":[function(require,module,exports){
"use strict";
cc._RFpush(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script/HelloWorld.js

cc.Class({
    'extends': cc.Component,

    properties: {
        label: {
            'default': null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.label.string = this.text;
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{}],"SceneSwitcher":[function(require,module,exports){
"use strict";
cc._RFpush(module, '8750eWLFfZPrZ1t50dJsMDV', 'SceneSwitcher');
// Script/SceneSwitcher.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        SceneName: ""

    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    switchScene: function switchScene() {
        cc.director.loadScene(this.SceneName);
    }
});

cc._RFpop();
},{}],"UI_ClickEvent":[function(require,module,exports){
"use strict";
cc._RFpush(module, '77885GMmydLCK8IEiTLEEhs', 'UI_ClickEvent');
// Script/UI_ClickEvent.js

var uiEvetnType = cc.Enum({
    logIn: 0
});

cc.Class({
    "extends": cc.Component,

    properties: {

        eventType: {
            "default": uiEvetnType.logIn,
            type: uiEvetnType
        }

    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    onClickEvent: function onClickEvent(e) {
        switch (this.eventType) {
            case uiEvetnType.logIn:
                // code
                console.log("Dispatch custom event");
                //collect input event? or send event and let information collect by others?
                cc.eventManager.dispatchCustomEvent("logIn", {
                    acc: cc.find('Canvas/InputLayer/UserNameInput').getComponent(cc.EditBox).string,
                    pw: cc.find('Canvas/InputLayer/PasswordInput').getComponent(cc.EditBox).string });
                break;
            default:
                // code
                console.log("unknow event");
        }
    }
});

cc._RFpop();
},{}]},{},["HelloWorld","UI_ClickEvent","SceneSwitcher","ChatConnector"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL1NjcmlwdC9DaGF0Q29ubmVjdG9yLmpzIiwiYXNzZXRzL1NjcmlwdC9IZWxsb1dvcmxkLmpzIiwiYXNzZXRzL1NjcmlwdC9TY2VuZVN3aXRjaGVyLmpzIiwiYXNzZXRzL1NjcmlwdC9VSV9DbGlja0V2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYjkyMzZJbnU4OUJpN2IzNE9VMmZMQ3cnLCAnQ2hhdENvbm5lY3RvcicpO1xuLy8gU2NyaXB0L0NoYXRDb25uZWN0b3IuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBhY2NvdW50OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94XG4gICAgICAgIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2lvOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcblxuICAgICAgICAvL3Rlc3RcbiAgICAgICAgLy92YXIgc2lvID0gaW8uY29ubmVjdChcImh0dHA6Ly9yYXJlc2xhYi5kZG5zLm5ldDozMDMwXCIpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuc2lvID0gaW8uY29ubmVjdChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zaW8pO1xuICAgICAgICB0aGlzLnNpby5vbignY2hhdCBtZXNzYWdlJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIGNoYXQgbWVzc2FnZS4nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNpby5vbignY29ubmVjdCcsIGZ1bmN0aW9uIChhbnkpIHtcbiAgICAgICAgICAgIC8vcHVyZSBldmVudCwgbm8gbW9yZSB0aGluZy5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGVkIHRvIGxvY2FsaG9zdC5cIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbnkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNpby5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uIChhbnkpIHtcbiAgICAgICAgICAgIC8vcHVyZSBldmVudCwgbm8gbW9yZSB0aGluZy5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcyBpcyBkaXNjb25uZWN0IHRvIGxvY2FsaG9zdC5cIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbnkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL2xvZ2luIGV2ZW50c1xuICAgICAgICB0aGlzLnNpby5vbignbG9naW5fc3VjY2VzcycsIGZ1bmN0aW9uIChhbnkpIHtcbiAgICAgICAgICAgIC8vcHVyZSBldmVudCwgbm8gbW9yZSB0aGluZy5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW4gc3VjY2VzcywgZG8gc29tZXRoaW5nLlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFueSk7XG4gICAgICAgICAgICBzZWxmLnNpby5lbWl0KFwiY2hhdCBtZXNzYWdlXCIsIFwiaGVsbG8gY2hhdCByb29tXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zaW8ub24oJ2xvZ2luX2ZhaWwnLCBmdW5jdGlvbiAoYW55KSB7XG4gICAgICAgICAgICAvL3B1cmUgZXZlbnQsIG5vIG1vcmUgdGhpbmcuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luIGZhaWwsIGRvIHNvbWV0aGluZy5cIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbnkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL2NjLmV2ZW50TWFuYWdlci5kaXNwYXRjaEN1c3RvbUV2ZW50KFwibG9nSW5cIix7YWNjOlwiMTIzXCIscHc6XCI0NTZcIn0pO1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoXCJsb2dJblwiLCB0aGlzLm9uUmVxdWVzdExvZ0luLmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICBvblJlcXVlc3RMb2dJbjogZnVuY3Rpb24gb25SZXF1ZXN0TG9nSW4oZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJyZWFkeSB0byBsb2dJbiwgc2VuZGluZyBpbmZvOlwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQuZGV0YWlsKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgdGhpcy5zaW8uZW1pdCgnY2xpZW50TG9nSW4nLCBldmVudC5kZXRhaWwpO1xuICAgIH0sXG5cbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gb25FbmFibGUoKSB7XG4gICAgICAgIC8vaWYgc3dpdGNoIHNjZW5lLCB3aWxsIGJlIGNhbGxcbiAgICAgICAgY29uc29sZS5sb2coXCJvbiBlbmFibGVcIik7XG4gICAgICAgIC8vZmluZCBlZGl0IGJveFxuICAgICAgICAvL1BhdGg6IENhbnZhcy9JbnB1dExheWVyL1VzZXJOYW1lSW5wdXQsIFVVSUQ6IDEwMmEyV2xjN2xDV3EvZ3BXT3RkUjVoXG4gICAgICAgIGNvbnNvbGUubG9nKGNjLmRpcmVjdG9yLmdldFNjZW5lKCkpO1xuXG4gICAgICAgIC8vaWYgZGVmYXVsdCBzY2VuZSwgd2lsbCBiZSBlbXB0eSBzdHJpbmc/XG4gICAgICAgIGNvbnNvbGUubG9nKGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0TmFtZSgpKTtcbiAgICAgICAgLy90aGlzLmFjY291bnQgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMvSW5wdXRMYXllci9Vc2VyTmFtZUlucHV0Jyk7XG5cbiAgICAgICAgLy8gdGhpcy5hY2NvdW50ID0gY2MuZmluZCgnQ2FudmFzL0lucHV0TGF5ZXIvVXNlck5hbWVJbnB1dCcpO1xuXG4gICAgICAgIC8vIC8vdGhpcy5wYXNzd29yZCA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcy9JbnB1dExheWVyL1Bhc3N3b3JkSW5wdXQnKTtcbiAgICAgICAgLy8gdGhpcy5wYXNzd29yZCA9IGNjLmZpbmQoJ0NhbnZhcy9JbnB1dExheWVyL1Bhc3N3b3JkSW5wdXQnKTtcbiAgICAgICAgLy8gaWYobnVsbCA9PT0gdGhpcy5hY2NvdW50KVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyB0aGlzLmFjY291bnQgPSB0aGlzLmFjY291bnQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpO1xuICAgICAgICAvLyB0aGlzLnBhc3N3b3JkID0gdGhpcy5wYXNzd29yZC5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XG5cbiAgICAgICAgLy8gdHJ5IHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHRoaXMuYWNjb3VudC5zdHJpbmcpO1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5wYXNzd29yZC5zdHJpbmcpO1xuXG4gICAgICAgIC8vIH0gY2F0Y2ggKGUpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb24gZW5hYmxlXCIpO1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiBvbkRpc2FibGUoKSB7XG4gICAgICAgIC8vaWYgc3dpdGNoIHNjZW5lLCB3aWxsIGJlIGNhbGxcbiAgICAgICAgY29uc29sZS5sb2coXCJvbiBkaXNhYmxlXCIpO1xuICAgICAgICAvLyBpZihudWxsID09PSB0aGlzLmFjY291bnQpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB0cnkge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2codGhpcy5hY2NvdW50LnN0cmluZyk7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyh0aGlzLnBhc3N3b3JkLnN0cmluZyk7XG5cbiAgICAgICAgLy8gfSBjYXRjaCAoZSlcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJFcnJvciBvbiBkaXNhYmxlXCIpO1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxuXG4gICAgLypcbiAgICB1cGRhdGUgKCApXG4gICAg5aaC5p6c6K+l57uE5Lu25ZCv55So77yM5YiZ5q+P5bin6LCD55SoIHVwZGF0ZeOAglxuICAgIGxhdGVVcGRhdGUgKCApXG4gICAg5aaC5p6c6K+l57uE5Lu25ZCv55So77yM5YiZ5q+P5bin6LCD55SoIExhdGVVcGRhdGXjgIJcbiAgICBvbkxvYWQgKCApXG4gICAg5b2T6ZmE5Yqg5Yiw5LiA5Liq5r+A5rS755qE6IqC54K55LiK5oiW6ICF5YW26IqC54K556ys5LiA5qyh5r+A5rS75pe25YCZ6LCD55So44CCXG4gICAgc3RhcnQgKCApXG4gICAg5aaC5p6c6K+l57uE5Lu256ys5LiA5qyh5ZCv55So77yM5YiZ5Zyo5omA5pyJ57uE5Lu255qEIHVwZGF0ZSDkuYvliY3osIPnlKjjgIJcbiAgICBvbkVuYWJsZSAoIClcbiAgICDlvZPor6Xnu4Tku7booqvlkK/nlKjvvIzlubbkuJTlroPnmoToioLngrnkuZ/mv4DmtLvml7bjgIJcbiAgICBvbkRpc2FibGUgKCApXG4gICAg5b2T6K+l57uE5Lu26KKr56aB55So5oiW6IqC54K55Y+Y5Li65peg5pWI5pe26LCD55So44CCXG4gICAgb25EZXN0cm95ICggKVxuICAgIOW9k+ivpee7hOS7tuiiq+mUgOavgeaXtuiwg+eUqCovXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzI4MGMzcnNaSkpLblo5UnFiQUxWd3RLJywgJ0hlbGxvV29ybGQnKTtcbi8vIFNjcmlwdC9IZWxsb1dvcmxkLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIGRlZmF1bHRzLCBzZXQgdmlzdWFsbHkgd2hlbiBhdHRhY2hpbmcgdGhpcyBzY3JpcHQgdG8gdGhlIENhbnZhc1xuICAgICAgICB0ZXh0OiAnSGVsbG8sIFdvcmxkISdcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gdGhpcy50ZXh0O1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge31cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnODc1MGVXTEZmWlByWjF0NTBkSnNNRFYnLCAnU2NlbmVTd2l0Y2hlcicpO1xuLy8gU2NyaXB0L1NjZW5lU3dpdGNoZXIuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLCAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIFNjZW5lTmFtZTogXCJcIlxuXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxuXG4gICAgc3dpdGNoU2NlbmU6IGZ1bmN0aW9uIHN3aXRjaFNjZW5lKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUodGhpcy5TY2VuZU5hbWUpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNzc4ODVHTW15ZExDSzhJRWlUTEVFaHMnLCAnVUlfQ2xpY2tFdmVudCcpO1xuLy8gU2NyaXB0L1VJX0NsaWNrRXZlbnQuanNcblxudmFyIHVpRXZldG5UeXBlID0gY2MuRW51bSh7XG4gICAgbG9nSW46IDBcbn0pO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICBldmVudFR5cGU6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiB1aUV2ZXRuVHlwZS5sb2dJbixcbiAgICAgICAgICAgIHR5cGU6IHVpRXZldG5UeXBlXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbiAgICBvbkNsaWNrRXZlbnQ6IGZ1bmN0aW9uIG9uQ2xpY2tFdmVudChlKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5ldmVudFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdWlFdmV0blR5cGUubG9nSW46XG4gICAgICAgICAgICAgICAgLy8gY29kZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlzcGF0Y2ggY3VzdG9tIGV2ZW50XCIpO1xuICAgICAgICAgICAgICAgIC8vY29sbGVjdCBpbnB1dCBldmVudD8gb3Igc2VuZCBldmVudCBhbmQgbGV0IGluZm9ybWF0aW9uIGNvbGxlY3QgYnkgb3RoZXJzP1xuICAgICAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5kaXNwYXRjaEN1c3RvbUV2ZW50KFwibG9nSW5cIiwge1xuICAgICAgICAgICAgICAgICAgICBhY2M6IGNjLmZpbmQoJ0NhbnZhcy9JbnB1dExheWVyL1VzZXJOYW1lSW5wdXQnKS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCkuc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBwdzogY2MuZmluZCgnQ2FudmFzL0lucHV0TGF5ZXIvUGFzc3dvcmRJbnB1dCcpLmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5zdHJpbmcgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIGNvZGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVua25vdyBldmVudFwiKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiXX0=
