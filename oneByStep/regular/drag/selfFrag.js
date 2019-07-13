$(function(){
    var _self ={
      disX:0,
      disY:0,
      _start:false,
      hasSet: false
    }
    var ele = $('.drag')
    ele.on('mousedown', function (ev) {
        _self._start = true;
        var oEvent = ev || event;
        _self.disX = oEvent.clientX - ele.offset().left;
        _self.disY = oEvent.clientY - ele.offset().top;
        console.log(_self.disX, _self.disY)
        if(_self.hasSet){return;}
        _self.hasSet = true;
         $(document).on("mousemove", function (ev) {
             if (_self._start != true) {
                 return false
             }
             console.log('move')
             //  if (obj != self.moved) {
             //      return false
             //  }
             //  self._move = true;
             var oEvent1 = ev || event;
             var l = oEvent1.clientX - _self.disX;
             var t = oEvent1.clientY - _self.disY;
             ele.css({
                 'left': l,
                 top: t
             })
         });
          $(document).on("mouseup", function (ev) {
             if (_self._start != true) {
                 return false
             }
            //  ele.unbind("onmousemove");
            //  ele.unbind("onmouseup");
             _self._start = false;
         });
    })
  
})