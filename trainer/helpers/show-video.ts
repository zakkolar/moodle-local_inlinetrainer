export const ShowVideo=function(urlString, options={}){
    const $ = require('jquery');
    const URL = require('url');
    const videoURL = URL.parse(urlString,true);
    const videoID = videoURL.query['v'];
    const playerID = 'zk_inline_trainer_video';

    const width = $(window).width() * 0.6;
    const height = width * 9/16;

    const embedHTML = `<iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${videoID}?rel=0&showinfo=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>`;


    const container = $(`<div id="${playerID}"></div>`);

    const closeVideo=function(){
        container.remove();
        $(document).off('keyup.' + playerID);
        if(options.hasOwnProperty('afterClose')){
            options['afterClose']();
        }
    };

    const background = $('<div></div>').css({
        'background-color':'rgba(0,0,0,0.5)',
        'position':'fixed',
        'top':'0',
        'left':'0',
        'bottom':'0',
        'right':'0',
        'z-index':20000
    }).click(closeVideo);

    const keyframes = $('<style></style>').html(`
    @keyframes zk_inlinetrainer_spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
    `);

    const loader = $('<div></div>').css({
        'border': `13px solid #f3f3f3`,
        'border-radius': '50%',
        'border-top':'13px solid #3498db',
        'width': '80px',
        'height': '80px',
        'animation': 'zk_inlinetrainer_spin 2s linear infinite',
        'z-index':20001,
        'position':'fixed',
        'top':'50%',
        'left':'50%',
        'margin-left':'-40px',
        'margin-top':'-40px'

    });



    const player = $(embedHTML).css({
        'position':'fixed',
        'top':'50%',
        'left':'50%',
        'transform':'translate(-50%, -50%)',
        'z-index':20002,

    }).on('load',function(){
        loader.remove();
        close.show();
        player.css({
            'box-shadow':'5px 5px 15px rgba(0, 0, 0, 0.2)'
        })
    });

    const close = $('<div>x</div>').css({
        'z-index':20003,
        'background-color':'white',
        'border-radius':'50%',
        'text-align':'center',
        'font-size':'15px',
        'width':'22px',
        'height':'22px',
        'position':'fixed',
        'top':'50%',
        'left':'50%',
        'margin-left':(width/2)-11,
        'margin-top':(height/-2)-11,
        'cursor':'pointer',
        'border-style':'solid',
        'border-color':'#333333',
        'border-width':'4px',
        'box-shadow':'5px 5px 15px rgba(0, 0, 0, 0.2)'
    })
        .click(closeVideo)
        .hide();

    container.append(background)
        .append(keyframes)
        .append(loader)
        .append(player)
        .append(close);

    $(document).on('keyup.' + playerID,function(e) {
        if (e.keyCode === 27) {
            closeVideo();
        }
    });


    $('body').append(container);



};