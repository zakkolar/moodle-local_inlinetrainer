import {GUID} from '../helpers/guid';
export const HINT = function(selector){

    const $ = require('jquery');



    const el =$(selector);
    const hintID = 'zk-hint-' + GUID();
    const animationSpeed = 300;
    const padding = 5;

    const overlayClass = 'local_inlinetrainer_overlay';

    const removeOverlay = function(){
        $('.' + overlayClass).fadeOut(animationSpeed, function(){
            $(this).remove();
        });
        $(document).off('keyup.' + hintID);
        el.off('click.' + hintID);
    };
    removeOverlay();

    const directions = ['left', 'right', 'top', 'bottom'];
    for (let i = 0; i < directions.length; i++) {
        const overlay = $('<div class="' + overlayClass + '"></div>').hide();
        switch (directions[i]) {
            case 'top':
                overlay.css({
                    top:0,
                    left:0,
                    right:0,
                    height: el.offset().top - padding,
                });
                break;
            case 'left':
                overlay.css({
                    top: el.offset().top - padding,
                    width: el.offset().left - padding,
                    left: 0,
                    height: el.outerHeight() + (padding * 2)
                });
                break;
            case 'right':
                overlay.css({
                    top: el.offset().top - padding,
                    left: el.offset().left + el.outerWidth() + padding,
                    right: 0,
                    height: el.outerHeight() + (padding * 2)
                });
                break;
            case 'bottom':
                overlay.css({
                    top: el.offset().top + el.outerHeight() + padding,
                    left:0,
                    right:0,
                    bottom: 0
                });
                break;
        }
        $('body').append(overlay).css('position', 'relative');
    }

    //since this element will be deleted, we don't need to worry about namespacing the click event
    $('.' + overlayClass).fadeIn(animationSpeed).click(function(){
        removeOverlay();
    });

    el.on('click.' + hintID, function(){
        removeOverlay();
    });
    $(document).on('keyup.' + hintID,function(e) {
        if (e.keyCode === 27) {
            removeOverlay();
        }
    });






};
