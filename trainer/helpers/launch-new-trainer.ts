export const LaunchNewTrainer=function(title,content){
    const URL = require('url');
    const width = 300;
    const height = 500;
    let win = window.open("", "trainer",`width=${width}, height=${height}, directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no`);




    if(content.hasOwnProperty('video') && content['video']!=null){
        const videoURL = URL.parse(content.video,true);
        const videoID = videoURL.query['v'];
        const videoWidth = width * 0.6;
        const videoHeight = videoWidth * 9/16;
        content.video = `<iframe src="https://www.youtube.com/embed/${videoID}?rel=0&showinfo=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>`;

    }

    win['content']=content;
    win['title']=title;



    let html = `<html>
    <head>
        <title>Inline Trainer</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    </head>
    <body>
        <div class="container" style="margin-top:10px">
            <h1 class="h4" id="title"></h1>
            <div id="video"></div>
            <div id="trainer"></div>
            
            <hr>
            <a href='javascript:window.close()'>Close window</a>
        </div>
       
        <style type="text/css">
            iframe{
                position:absolute;
                top: 0;
                   left: 0;
                   bottom: 0;
                   right: 0;
                   width:100%;
                   height:100%;
            }
            #video{
            position:relative;
            width:100%;
            padding-top: 56.25%;
            margin-bottom:10px;
            margin-left:auto;
            margin-right:auto;
            }
        </style>

       <script type="text/javascript">
       if(content.hasOwnProperty('text') && Array.isArray(content.text)){
           var el = document.getElementById('trainer');
           el.innerHTML="<ul>";
           for(var i=0; i<content.text.length; i++){
               el.innerHTML+="<li>"+content.text[i]+"</li>";
           }
           el.innerHTML+="</ul>";
       }
       else if (content.hasOwnProperty('text') && content['text']!=null){
           document.getElementById('trainer').innerHTML="<p>"+content.text+"</p>";
       }
       
       if(content.hasOwnProperty('video') && content['video']!=null){
           document.getElementById('video').innerHTML=content.video;
       }
       else{
           document.getElementById('video').remove();
       }
       
       document.getElementById('title').innerText=title;

    </script>
    </body>
    </html>`;

        win.document.open();
        win.document.write(html);
        win.document.close();

        return win;
}