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