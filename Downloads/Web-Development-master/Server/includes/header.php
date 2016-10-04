<?php
function curPageName() {
 return substr($_SERVER["SCRIPT_NAME"],strrpos($_SERVER["SCRIPT_NAME"],"/")+1);
}
?>
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="index.php"><span class="color-highlight">P</span>thread</a>
          <div class="nav-collapse">
            <ul class="nav pull-right">
							<?php if(curPageName()=="index.php"){ ?>
              	<li class="active"><a href="index.php">Home</a></li>
							<?php } else{ ?>
								<li><a href="index.php">Home</a></li>
							<?php }?>

							<?php if(curPageName()=="services.php"){ ?>
              	<li class="active"><a href="services.php">Services</a></li>
							<?php } else{ ?>
								<li><a href="services.php">Services</a></li>
							<?php }?>

							<?php if(curPageName()=="portfolio.php"){ ?>
              	<li class="active"><a href="portfolio.php">Portfolio</a></li>
							<?php } else{ ?>
								<li><a href="portfolio.php">Portfolio</a></li>
							<?php }?>

							<?php if(curPageName()=="contact.php"){ ?>
              	<li class="active"><a href="contact.php">Contact</a></li>
							<?php } else{ ?>
								<li><a href="contact.php">Contact</a></li>
							<?php }?>

							<?php if(curPageName()=="about.php"){ ?>
              	<li class="active"><a href="about.php">About</a></li>
							<?php } else{ ?>
								<li><a href="about.php">About</a></li>
							<?php }?>

            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
	<div class="container">

