<?php

// if the url field is empty
if(isset($_POST['url']) && $_POST['url'] == ''){

	// put your email address here
	$youremail = 'vethoxco_hellonearth@hotmail.com';

	// prepare a "pretty" version of the message
	// Important: if you added any form fields to the HTML, you will need to add them here also
	$body = "This is the form that was just submitted:
	Name:  $_POST[name]
	E-Mail: $_POST[email]
	Message: $_POST[message]";

	// Use the submitters email if they supplied one
	// (and it isn't trying to hack your form).
	// Otherwise send from your email address.
	if( $_POST['email'] && !preg_match( "/[\r\n]/", $_POST['email']) ) {
	  $headers = "From: $_POST[email]";
	} else {
	  $headers = "From: $youremail";
	}

	// finally, send the message
	mail($youremail, 'Contact Form', $body, $headers );

}

// otherwise, let the spammer think that they got their message through

?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>RHDZ Inc. - Contact</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/prefixfree.min.js"></script>
  </head>

  <body>

  <div class="overlay"></div>
	<div class="scanline"></div>
  <div class="wrapper">
  <div class="content clearfix">

		<header class="site clearfix">
		<div class="col one">
      <img src="rhdzinc.png" alt="RHDZ Inc." width="740" height="729" id="logo-v" />
		</div>
			<div class="col two">
				<h4>RHDZ Inc. (tm) <br /> <b>R</b>esponsive <b>U</b>nit <b>F</b>riend <b>E</b>perating <b>S</b>ystem (RUFES)</h4>
				<p>----------------------------------------</p>
				<p>RUFES v 1.0.1</p>
				<p>(c)2016 RHDZ Inc.</p>
			</div>
		</header>

		<nav class="site clear">
			<ul>
        <li><a href="index.html" title="">Return Home</a></li>
				<li><a href="intel.html" title="">Intel</a></li>
				<li><a href="hacks.html" title="">Hacks</a></li>
				<li><a href="contact.html" title="">Contact</a></li>
			</ul>
		</nav>

		<p class="clear"><br /></p>

    </form>

	</div>
</div>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src='http://static.tumblr.com/maopbtg/oimmiw86r/jquery.autosize-min.js'></script>

        <script src="js/index.js"></script>




  </body>
</html>