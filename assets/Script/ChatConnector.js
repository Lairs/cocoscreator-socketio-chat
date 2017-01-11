cc.Class({
    extends: cc.Component,

    properties: {
        account: {
            default: null,
            type: cc.EditBox
        },
        password: {
            default: null,
            type: cc.EditBox
        },
        
        sio:{
            default:null
        }
    },
    

    // use this for initialization
    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
        
        //test
        //var sio = io.connect("http://rareslab.ddns.net:3030");
        var self = this;
        this.sio = io.connect("http://localhost:3000");
        console.log(this.sio);
        this.sio.on('chat message',function(data){
            console.log('this is chat message.');
            console.log(data);
        });
        
        this.sio.on('connect',function(any){
            //pure event, no more thing.
           console.log("connected to localhost."); 
           console.log(any);
        });
        
        this.sio.on('disconnect',function(any){
            //pure event, no more thing.
           console.log("this is disconnect to localhost."); 
           console.log(any);
        });
        
        //login events
        this.sio.on('login_success',function(any){
            //pure event, no more thing.
           console.log("login success, do something."); 
           console.log(any);
           self.sio.emit("chat message","hello chat room");
        });
        this.sio.on('login_fail',function(any){
            //pure event, no more thing.
           console.log("login fail, do something."); 
           console.log(any);
        });
        
        //cc.eventManager.dispatchCustomEvent("logIn",{acc:"123",pw:"456"});
        cc.eventManager.addCustomListener("logIn",this.onRequestLogIn.bind(this));
    },
    
    onRequestLogIn:function(event)
    {
        console.log("ready to logIn, sending info:");
        console.log(event.detail);
        //console.log(this);
        this.sio.emit('clientLogIn', event.detail);
    },
    
    onEnable: function () 
    {
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
    
    onDisable: function () 
    {
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
