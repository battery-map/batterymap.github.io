<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(!empty($_POST['contactname']) && !empty($_POST['contactemail']) && !empty($_POST['contactmessage'])) {
		$to = 'gigabytetheone@gmail.com'; // Replace with your email.
		$body = "Имя: {$_POST['contactname']}\n\nEmail: {$_POST['contactemail']}\n\nСообщение:\n\n {$_POST['contactmessage']}";
	
		$url = 'https://api.sendgrid.com/api/mail.send.json';
		$user = 'azure_c6c9355158321572406a74a0ccea61c1@azure.com';
		$pass = 'A1qvnFVxOfdI28u'; 
		
		$params = array(
		  'api_user' => $user,
		  'api_key' => $pass,
		  'to' => $to,
		  'subject' => "Форма обратной связи battery-map.ru",
		  'text' => $body,
		  'from' => 'info@battery-map.ru',
		  'reply-to' => $_POST['contactemail']
		);
		
		$options = array(
		    'http' => array(
		        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
		        'method'  => 'POST',
		        'content' => http_build_query($params),
		    ),
		);
		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);
		var_dump($result);
	}
}
?>