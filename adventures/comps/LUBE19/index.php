<!DOCTYPE html>
<!URL /adventures/comps/LUBE19/>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="description" content="">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Title -->
        <title>LUBE 2018-2019</title>

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
        <section class="breadcrumb-area bg-img bg-overlay jarallax" style="background-image: url(/img/competitions/LUBE_18-19/cover.jpg);">
            <div class="container h-100">
                <div class="row h-100 align-items-center">
                    <div class="col-12">
                        <div class="breadcrumb-content text-center">
                            <h2 class="page-title">LUBE 2018/19</h2>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb justify-content-center">
                                    <li class="breadcrumb-item"><a href="/"><i class="icon_house_alt"></i> Home</a></li>
                                    <li class="breadcrumb-item" style="color:white">Adventure Log</li>
                                    <li class="breadcrumb-item" style="color:white"><a href="/competitions/" class="post-title">Competitions</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">LUBE 2018/19</li>
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
                            <h3 class="wow fadeInUp" data-wow-delay="100ms">LUBE 2018/19</h3>
                            <div class="line wow fadeInUp" data-wow-delay="200ms"></div>
                            <p class="wow fadeInUp" data-wow-delay="250ms" style="color:#A7A7A7">August 1, 2019</p>
                            <p class="wow fadeInUp" data-wow-delay="300ms">Lead by captains Niamh Gibson, James Mabon and Edward Jordan, the WUCC comp squad had an amazing run at the London University Bouldering Event - the student run national bouldering competition. The four rounds take place at various London venues throughout the academic year.</p>
                            <p class="wow fadeInUp" data-wow-delay="400ms">The first round took place at Stronghold UK and WUCC placed 4th in the team rankings with half the team achieving top 10 individual scores!</p>
                        </div>
                    </div>

                    <!-- Single Gallery Item -->
                    <div class="col-12 col-sm-6 col-lg-6 single_gallery_item mb-30 wow fadeInUp" data-wow-delay="300ms">
                        <div class="single-portfolio-content">
                            <img src="/img/competitions/LUBE_18-19/1.jpg" alt="">
                            <div class="hover-content">
                                <a href="/img/competitions/LUBE_18-19/1.jpg" class="portfolio-img">+</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="about-us-content mb-40 mt-10">
                            <p class="wow fadeInUp" data-wow-delay="400ms">Round 2 was at The Reach Climbing Wall and WUCC was the highest scoring team of the day which pushed them up to first place in the overall combined score rankings. To top it off, every female member of the squad placed in the top 10 and captain James Mabon won the men's final!</p>
                            <p class="wow fadeInUp" data-wow-delay="400ms">The third round had the team travel to a brand new venue, Yonder - a "climbing, co-working, yoga, cafe-bar & event space". WUCC managed to maintain their spot at the top of the overall rankings and captain James had another great performance, placing 3rd in the men's individual scorings.</p>
                            <p class="wow fadeInUp" data-wow-delay="400ms">The final round took place at none other than the UK's largest bouldering centre - HarroWall. The team gave an incredible performance and landed a solid victory as the overall winners of the competition. James Mabon, Sylvan Chouhan, Man Yuan Lam and Edward Jordan all placed within the top 10 of the male individual scores and captain Niamh Gibson placed 3rd in the overall female individual scores. A massive congratulations to the team and the three captains, all their hard work really paid off!</p>
                        </div>
                    </div>

                    <!-- Gallery Items -->
                    <?php
                    for ($x = 1; $x < 12; $x++) {
                        echo
                        '<div class="col-12 col-sm-6 col-lg-3 single_gallery_item mb-30 wow fadeInUp" data-wow-delay="300ms">
                            <div class="single-portfolio-content">
                                <img src="/img/competitions/LUBE_18-19/' . $x . '.jpg" alt="">
                                <div class="hover-content">
                                    <a href="/img/competitions/LUBE_18-19/' . $x . '.jpg" class="portfolio-img">+</a>
                                </div>
                            </div>
                        </div>';
                    }
                    ?>

                    <!-- Single Gallery Item -->
                    <div class="col-12 col-sm-6 col-lg-3 single_gallery_item video human mb-30 wow fadeInUp" data-wow-delay="300ms">
                        <div class="single-portfolio-content">
                            <img src="/img/competitions/LUBE_18-19/preview.jpg" alt="">
                            <div class="hover-content">
                                <a href="/img/competitions/LUBE_18-19/preview.jpg" class="portfolio-img">+</a>
                            </div>
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