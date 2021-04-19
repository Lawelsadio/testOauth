<?php 
require('config.php')
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mon site</title>
</head>
<body>
    <h1>Se connecter</h1>
    <p>
        <a href="http://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=<?=WITHINGS_ID?>&state=a_random_value&scope=user.info,user.metrics,user.activity&redirect_uri=<?= urlencode('http://localhost:8000/cn.php') ?>&mode=demo">se connecter avec WITHINGS</a>
    </p>
</body>
</html>