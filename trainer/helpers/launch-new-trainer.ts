export const LaunchNewTrainer=function(title,content){
    let win = window.open("", "trainer","width=300, height=500, directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no");

    win['content']=content;
    win['title']=title;
    win['$']=require('jquery');



    let html = `<html>
    <head>
        <title>Inline Trainer</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    </head>
    <body>
        <div class="container" style="margin-top:10px">
            <h1 class="h4" id="title"></h1>
            <div id="trainer"></div>
            <hr>
            <a href='javascript:window.close()'>Close window</a>
        </div>
       
        

       <script type="text/javascript">
       $('body').hide();
       if(Array.isArray(content)){
           var el = document.getElementById('trainer');
           el.innerHTML="<ul>";
           for(var i=0; i<content.length; i++){
               el.innerHTML+="<li>"+content[i]+"</li>";
           }
           el.innerHTML+="</ul>";
       }
       else{
           document.getElementById('trainer').innerHTML="<p>"+content+"</p>";
       }
       
       document.getElementById('title').innerText=title;

    </script>
    </body>
    </html>`;

        win.document.open();
        win.document.write(html);
        win.document.close();
}