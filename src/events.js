(
    function(exports){
        const NodeEvents = (typeof require === 'undefined' ? null : require('events'));
        class Factory{
            constructor(){
                const Factory = (NodeEvents ? new NodeEvents() : document.createDocumentFragment());
                this.addEventListener = this.addListener = this.on = ("on" in Factory? Factory.on.bind(Factory): Factory.addEventListener.bind(Factory));
                this.removeEventListener = this.removeListener = ("removeListener" in Factory? Factory.removeListener.bind(Factory): Factory.removeEventListener.bind(Factory));
                this.dispatchEvent = this.emit = function(){
                    if(typeof CustomEvent === 'undefined'){
                        Factory.emit(...arguments);
                    }
                    else{
                        Factory.dispatchEvent(new CustomEvent(...arguments));
                    }
                }
                this.once = ("once" in Factory? Factory.once.bind(Factory): function(event, func){
                    const onceFunction = function(){
                        func();
                        this.removeEventListener(event, onceFunction);
                    }
                    this.addEventListener(event, onceFunction);
                });
            }
        }
        exports.Factory = Factory;
    }
)(typeof exports === 'undefined'? this['Events']={}: exports)
