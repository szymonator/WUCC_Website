<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Title -->
    <title>Freshers Trip 2019</title>

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
    <section class="breadcrumb-area bg-img bg-overlay jarallax" style="background-image: url(/img/trips/freshers_19/cover.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <div class="breadcrumb-content text-center">
                        <h2 class="page-title">Freshers Trip<br>2019</h2>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb justify-content-center">
                                <li class="breadcrumb-item"><a href="/"><i class="icon_house_alt"></i> Home</a></li>
                                <li class="breadcrumb-item" style="color:white">Adventure Log</li>
                                <li class="breadcrumb-item" style="color:white"><a href="/adventures/tripsandtours/" class="post-title">Trips and Tours</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Freshers Trip - 2019</li>
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
                    <div class="about-us-content">
                        <h3 class="wow fadeInUp" data-wow-delay="100ms">Freshers Trip - 2019</h3>
                        <div class="line wow fadeInUp" data-wow-delay="200ms"></div>
                        <p class="wow fadeInUp" data-wow-delay="250ms" style="color:#A7A7A7">November 16, 2019 | Vickie Snow</p>
                        <p class="wow fadeInUp" data-wow-delay="300ms"><b>Dates:</b> 8th November - 10th November, 2016</p>
                        <p class="wow fadeInUp" data-wow-delay="300ms"><b>Location:</b>Peak District</p>
                        <p class="wow fadeInUp" data-wow-delay="300ms">Another year, another Freshers Trip. A chance for new and old climbers to come together and get climbing on real rock. Freshers get the chance to put what they learnt in lessons to use and experience some top roping and bouldering outdoors, whilst experienced members can sport, trad and boulder as much (or as little) as they like. The trip was a great success, despite the freezing temperatures.</p>
                        <p class="wow fadeInUp" data-wow-delay="300ms">Unfortunately I didn't climb much due to injury so I made a little video instead, check it out below:.</p>
                    </div>
                </div>

                <!-- Video -->
                <div class="col-12 mb-30">
                    <div class="video-container">
                        <div class="about-video-areawow fadeInUp" data-wow-delay="100ms" style="margin-top:20px; margin-bottom:40px;">
                            <iframe width="1120" height="630" src="https://www.youtube.com/embed/q4d7n6EAQhU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>

                <!-- Gallery Items -->

                <!-- Single Gallery Item -->
                <div class="col-12 single_gallery_item mb-30 wow fadeInUp" data-wow-delay="300ms">
                    <div class="single-portfolio-content">
                        <img src="/img/trips/freshers_19/1.jpg" alt="">
                        <div class="hover-content">
                            <a href="/img/trips/freshers_19/1.jpg" class="portfolio-img">+</a>
                        </div>
                    </div>
                </div>

                <?php
                for ($x = 2; $x < 17; $x++) {
                    echo
                    '<div class="col-12 col-sm-6 col-lg-4 single_gallery_item mb-30 wow fadeInUp" data-wow-delay="300ms">
                            <div class="single-portfolio-content">
                                <img src="/img/trips/freshers_19/' . $x . '.jpg" alt="">
                                <div class="hover-content">
                                    <a href="/img/trips/freshers_19/' . $x . '.jpg" class="portfolio-img">+</a>
                                </div>
                            </div>
                        </div>';
                }
                ?>

                <div class="col-12">
                    <div class="about-us-content" style="text-align:center;">
                        <p class="wow fadeInUp" data-wow-delay="300ms">Photos courtesy of Vickie Snow.</p>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div style="height:100px;"></div>
    <!-- About Us Area End -->

    <!-- Footer Area Start -->
    <?php $path = $_SERVER['DOCUMENT_ROOT'];
    $path .= "/footer.php";
    include $path; ?>
    <!-- Footer Area End -->

</body>

</html>