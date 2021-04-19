<?php
require 'vendor/autoload.php';
require 'config.php';

use GuzzleHttp\Client;
$client = new Client([
    'timeout'  => 2.0,
    'verify' => __DIR__ . '/cacert.pem'
]);
try {
    $response = $client->request('GET', 'https://wbsapi.withings.net/v2/oauth2');
    $discoveryJSON = json_decode((string)$response->getBody());
    $tokenEndpoint = $discoveryJSON->token_endpoint;
    $userinfoEndpoint = $discoveryJSON->userinfo_endpoint;
    $response = $client->request('POST', $tokenEndpoint, [
        'form_params' => [
            'action' => $_GET['requesttoken'],
            'code' => $_GET['code'],
            'client_id' => WITHINGS_ID,
            'client_secret' => WITHINGS_SECRET,
            'redirect_uri' => 'http://localhost:8000/cn.php',
            'grant_type' => 'authorization_code'
        ]
    ]);
    $accessToken = json_decode($response->getBody())->access_token;
    $response = $client->request('GET', $userinfoEndpoint, [
        'headers' => [
            'Authorization' => 'Bearer ' . $accessToken
        ]
    ]);
    $response = json_decode($response->getBody());
    if ($response->userid === true) {
        session_start();
        $_SESSION['userid'] = $response->userid;
        header('Location: /secret.php');
        exit();
    }

} catch (\GuzzleHttp\Exception\ClientException $exception) {
    dd($exception->getMessage());
}
dd((string)$response->getBody());
?>