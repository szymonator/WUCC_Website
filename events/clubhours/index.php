<!DOCTYPE html>
<!URL /about/clubhours>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Title -->
    <title>Club Hours | Warwick University Climbing Club</title>

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

    <?php $path = $_SERVER['DOCUMENT_ROOT'];
    $path .= "/navbar.php";
    include $path; ?>

    <!-- Breadcrumb Area Start -->
    <section class="breadcrumb-area bg-img bg-overlay jarallax" style="background-image: url(/img/bg-img/cover_clubhours.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <div class="breadcrumb-content text-center">
                        <h2 class="page-title">About Club Hours</h2>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb justify-content-center">
                                <li class="breadcrumb-item"><a href="/"><i class="icon_house_alt"></i> Home</a></li>
                                <!-- <li class="breadcrumb-item" style="color:white"><a href="/about/" class="post-title">About</a></li> -->
                                <li class="breadcrumb-item" style="color:white">What's On</li>
                                <li class="breadcrumb-item active" aria-current="page">Club Hours</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Breadcrumb Area End -->

    <!-- Club Hours Area Start -->
    <div class="about-us-area section-padding-80-0 clearfix">
        <div class="container">
            <div class="row align-items-center">

                <div class="about-us-content mx-3">
                    <h4 class="wow fadeInUp" data-wow-delay="100ms">What are Club Hours?</h4>
                    <div class="line wow fadeInUp" data-wow-delay="200ms"></div>
                    <p class="wow fadeInUp" data-wow-delay="300ms">
                        Club hours are the twelve hours a week during which a member of the Climbing Club can climb for free at the Sports Hub. At all club hours sessions (except for Tuesdays), members can hire gear (shoes, harness, belay device, etc.) from the club for free.
                    </p>

                    <div class="container mb-3 club-hours wow fadeInUp" data-wow-delay="300ms"> 
                        <div class="row">
                            <div class="col-sm align-self-center">
                                <h6>Monday</h6>
                            </div>
                            <div class="col-sm align-self-center">
                                <p>15:15-17:15</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm align-self-center">
                                <h6>Tuesday (Advanced Club Hours: No gear rental)</h6>
                            </div>
                            <div class="col-sm align-self-center">
                                <p>12:30-14:30</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm align-self-center">
                                <h6>Wednesday</h6>
                            </div>
                            <div class="col-sm align-self-center">
                                <p>13:00-15:00</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm align-self-center">
                                <h6>Thursday</h6>
                            </div>
                            <div class="col-sm align-self-center">
                                <p>11:00-13:00</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm align-self-center">
                                <h6>Thursday (Postgrads Only)</h6>
                            </div>
                            <div class="col-sm align-self-center">
                                <p>20:00-22:00</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm align-self-center">
                                <h6>Friday</h6>
                            </div>
                            <div class="col-sm align-self-center">
                                <p>15:15-17:15</p>
                            </div>
                        </div>
                    </div>

                    <p class="wow fadeInUp" data-wow-delay="330ms">
                        Unlike most sport clubs, club hours don't have a formal program, we just turn up and climb. The entire club is very friendly and if you look lost enough someone will most likely come over and say hi. Of course you can always come and say hi first!
                    </p>
                    <p class="wow fadeInUp" data-wow-delay="420ms">To climb during club hours, book on the Warwick Sport website, there are instructions for this on our <a href="/newclimbers/">new climbers page</a>.</p>
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