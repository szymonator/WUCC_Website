<!DOCTYPE html>
<!URL /adventures/comps/fresherscomp19/>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="description" content="">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Title -->
        <title>Freshers Comp 2019</title>

        <!-- Favicon -->
        <link rel="icon" href="/img/core-img/wucc_logo_white.png">

        <!-- Stylesheet -->
        <link rel="stylesheet" href="/style.css">

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
        <section class="breadcrumb-area bg-img bg-overlay jarallax" style="background-image: url(/img/competitions/freshers_19/cover.jpg);">
            <div class="container h-100">
                <div class="row h-100 align-items-center">
                    <div class="col-12">
                        <div class="breadcrumb-content text-center">
                            <h2 class="page-title">Simon Turner-Bottomley<br>Freshers Comp 2019</h2>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb justify-content-center">
                                    <li class="breadcrumb-item"><a href="/"><i class="icon_house_alt"></i> Home</a></li>
                                    <li class="breadcrumb-item" style="color:white">Adventure Log</li>
                                    <li class="breadcrumb-item" style="color:white"><a href="/competitions" class="post-title">Competitions</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Simon Turner-Bottomley Freshers Comp 2019</li>
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
                    <div class="col-12 col-lg-6">
                        <div class="about-us-content">
                            <h3 class="wow fadeInUp" data-wow-delay="100ms">Simon Turner-Bottomley Freshers Comp 2019</h3>
                            <div class="line wow fadeInUp" data-wow-delay="200ms"></div>
                            <p class="wow fadeInUp" data-wow-delay="250ms" style="color:#A7A7A7">March 15, 2019 | WUCC</p>
                            <p class="wow fadeInUp" data-wow-delay="300ms">Similar to the WUCC open competition, the freshers competition consists of two rounds - a bouldering round and a lead climbing round. The bouldering round consists of 20 problems of varying difficulty and style with a maximum of three attempts. The lead round consists of 3 routes for male and female competitors with only one attempt to get as far as possible without resting or falling.</p>
                            <div class="col-6 mb-30" style="padding-left:0px;padding-right:0px;float:left;">
                                <p class="wow fadeInUp" data-wow-delay="300ms"><b>Results:</b><br>Male 1st: Ryan Farnes<br>Male 2nd: Alban Luffman<br>Male 3rd: Bernd Faveere</p>
                            </div>
                            <div class="col-6 mb-30" style="padding-left:15px;padding-right:0px;float:right;">
                                <p class="wow fadeInUp" data-wow-delay="300ms"><br>Female 1st: Pooja Galaiya<br>Female 2nd: Elfreda Kenneison<br>Female 3rd: Clarissa O'Neill</p>
                            </div>
                        </div>
                    </div>

                    <!-- Single Gallery Item -->
                    <div class="col-12 col-sm-6 col-lg-6 single_gallery_item mt-40 mb-30 wow fadeInUp" data-wow-delay="300ms">
                        <div class="single-portfolio-content">
                            <img src="/img/competitions/freshers_19/1.jpg" alt="">
                            <div class="hover-content">
                                <a href="/img/competitions/freshers_19/1.jpg" class="portfolio-img">+</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- About Us Area End -->

        <!-- Gallery Area Start -->
        <div class="alime-portfolio-area clearfix">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <!-- Projects Menu -->
                        <div class="alime-projects-menu wow fadeInUp" data-wow-delay="100ms">
                            <div class="portfolio-menu text-center">
                                <button class="btn active" data-filter="*">All Photos</button>
                                <button class="btn" data-filter=".boulder">Bouldering Round</button>
                                <button class="btn" data-filter=".lead">Lead Round</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row alime-portfolio">

                    <!-- Gallery Items -->
                    <?php
                    // Bouldering Photos
                    for ($x = 2; $x < 8; $x++) {
                        echo
                        '<div class="col-12 col-sm-6 col-lg-4 single_gallery_item boulder mb-30 wow fadeInUp" data-wow-delay="300ms">
                            <div class="single-portfolio-content">
                                <img src="/img/competitions/freshers_19/' . $x . '.jpg" alt="">
                                <div class="hover-content">
                                    <a href="/img/competitions/freshers_19/' . $x . '.jpg" class="portfolio-img">+</a>
                                </div>
                            </div>
                        </div>';
                    }

                    // Lead Photos
                    for ($x = 17; $x < 29; $x++) {
                        echo
                        '<div class="col-12 col-sm-6 col-lg-4 single_gallery_item lead mb-30 wow fadeInUp" data-wow-delay="300ms">
                            <div class="single-portfolio-content">
                                <img src="/img/competitions/freshers_19/' . $x . '.jpg" alt="">
                                <div class="hover-content">
                                    <a href="/img/competitions/freshers_19/' . $x . '.jpg" class="portfolio-img">+</a>
                                </div>
                            </div>
                        </div>';
                    }
                    ?>

                </div>
            </div>
            <div class="col-12">
                <div class="about-us-content" style="text-align:center;">
                    <p class="wow fadeInUp" data-wow-delay="300ms">Photos courtesy of Niamh Gibson.</p>
                </div>
            </div>
            <div style="height:100px;"></div>
        </div>
        <!-- Gallery Area End -->

        <!-- Footer Area Start -->
        <?php $path = $_SERVER['DOCUMENT_ROOT'];
        $path .= "/footer.php";
        include $path; ?>
        <!-- Footer Area End -->

    </body>

    </html>