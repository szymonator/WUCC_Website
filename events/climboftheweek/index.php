<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Title -->
    <title>Climb of the Week | Warwick University Climbing Club</title>

    <!-- Favicon -->
    <link rel="icon" href="/img/core-img/wucc_logo_white.png">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="/style.css?v=2">

</head>

<body>
    <!-- Preloader -->
    <div id="preloader">
        <div class="loader"></div>
    </div>
    <!-- /Preloader -->

    <!-- Header Area Start -->
    <?php $path = $_SERVER['DOCUMENT_ROOT'];
    $path .= "/navbar.php";
    include $path; ?>
    <!-- Header Area End -->

    <!-- Breadcrumb Area Start -->
    <section class="breadcrumb-area bg-img bg-overlay jarallax" style="background-image: url(/img/bg-img/cover_cotw.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <div class="breadcrumb-content text-center">
                        <h2 class="page-title">Climb of the Week</h2>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb justify-content-center">
                                <li class="breadcrumb-item"><a href="/"><i class="icon_house_alt"></i> Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Climb of the Week</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Breadcrumb Area End -->

    <!-- About Us Area Start -->
    <div class="about-us-area section-padding-80-0 clearfix">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12">
                    <div class="about-us-content mb-80">
                        <h3 class="wow fadeInUp" data-wow-delay="100ms">What is Climb of the Week?</h3>
                        <div class="line wow fadeInUp" data-wow-delay="200ms"></div>
                        <p class="wow fadeInUp" data-wow-delay="300ms">Each week, a section of the wall at Warwick Sport is reset alternating between bouldering and roped climbing which includes top rope, auto-belays and lead walls. On the day of each reset, we choose two or three of the new problems, varying in style and grade – some of which may include competition holds owned by the club. These climbs are indicated by a tag labelled ‘CotW’ and pictures are uploaded to the <a href="https://www.facebook.com/groups/warwickuniversityclimbingclub/" target="_blank">Facebook page</a>.</p>
                        <p class="wow fadeInUp" data-wow-delay="300ms">For every climb you complete during club hours, your name will be submitted into a random prize draw. The more climbs you complete, the higher your chances of winning! To enter, all you have to do is message one of us telling us which routes you've done before <b>exactly 7 days after each Facebook post.</b> If you particularly enjoy a route feel free to take some shots and send them our way too, we might stick some of them on the club insta or whatever. </p>
                        <p class="wow fadeInUp" data-wow-delay="300ms">The aim of Climb of the Week is to encourage club members to attempt climbs they wouldn’t normally look at and to give climbers the opportunity to work on routes together in an encouraging and inclusive atmosphere.</p>
                        <p class="wow fadeInUp" data-wow-delay="300ms">Best of luck from the creators of CotW and ex-presidents,<br><b>Jasper and Ollie</b></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- About Us Area End -->

    <!-- Footer Area Start -->
    <?php $path = $_SERVER['DOCUMENT_ROOT'];
    $path .= "/footer.php";
    include $path; ?>
    <!-- Footer Area End -->

</body>

</html>