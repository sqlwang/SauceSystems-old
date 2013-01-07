<html>
<head>
    <title>酱油</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">

    #loading-mask{
        background-color:white;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        width:100%;
        z-index:20000;
    }
    #loading{
        height:auto;
        position:absolute;
        left:45%;
        top:40%;
        padding:2px;
        z-index:20001;
    }
    #loading a {
        color:#225588;
    }
    #loading .loading-indicator{
        background:white;
        color:#444;
        font:bold 13px Helvetica, Arial, sans-serif;
        height:auto;
        margin:0;
        padding:10px;
    }
    #loading-msg {
        font-size: 10px;
        font-weight: normal;
    }

    </style>
</head>
<body class="x-border-layout-ct">
    <div id="loading-mask" style=""></div>
    <div id="loading">
        <div class="loading-indicator">
            <br /><span id="loading-msg">Carregando estilos e imagens...</span>
        </div>
    </div>

    <div id="viewport">
            <link rel="stylesheet" type="text/css" href="../ext-4.0.7-gpl/resources/css/ext-all.css" />
    		<link rel="stylesheet" type="text/css" href="app/css/app.css">

            <script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Carregando API...';</script>
            <script type="text/javascript" src="../ext-4.0.7-gpl/ext-all-debug.js"></script>
            <script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Carregando Componenetes...';</script>
            <script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Inicializando...';</script>

            <!-- App.js contains Ext.App, a simple, re-usable Application component -->
            <script type="text/javascript" src="app/app.js"></script>
    </div><!-- end viewport -->

</body>
</html>