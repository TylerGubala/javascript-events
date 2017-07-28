(
    function(exports){
        const NodeEvents = (typeof require === 'undefined' ? null : require('events'));
        class Factory{
            constructor(){
                const Factory = (NodeEvents ? new NodeEvents() : document.createDocumentFragment());
                this.addEventListener = this.addListener = this.on = Factory.on || Factory.addEventListener;
                this.removeEventListener = this.removeListener = Factory.removeListener || Factory.removeEventListener;
                this.dispatchEvent = this.emit = function(){
                    if(typeof CustomEvent === 'undefined'){
                        Factory.emit(...arguments);
                    }
                    else{
                        Factory.dispatchEvent(new CustomEvent(...arguments));
                    }
                }
                this.once = Factory.once || function(event, func){
                    const onceFunction = function(){
                        func();
                        this.removeEventListener(event, onceFunction);
                    }
                    this.addEventListener(event, onceFunction);
                };
            }
        }
        exports.Factory = Factory;
    }
)(typeof exports === 'undefined'? this['Events']={}: exports)
