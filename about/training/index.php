<!DOCTYPE html>
<!URL /about/training>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="description" content="">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Title -->
        <title>Training | Warwick University Climbing Club</title>

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
        <section class="breadcrumb-area bg-img bg-overlay jarallax" style="background-image: url(/img/bg-img/cover_training.jpg);">
            <div class="container h-100">
                <div class="row h-100 align-items-center">
                    <div class="col-12">
                        <div class="breadcrumb-content text-center">
                            <h2 class="page-title">Training</h2>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb justify-content-center">
                                    <li class="breadcrumb-item"><a href="/"><i class="icon_house_alt"></i> Home</a></li>
                                    <li class="breadcrumb-item" style="color:white">About</li>
                                    <li class="breadcrumb-item active" aria-current="page">Training</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Breadcrumb Area End -->

        <!-- Blog Area Start -->
        <div class="alime-blog-area section-padding-80-0 mb-70">
            <div class="container">
                <div class="row">

                    <!-- Training Board -->
                    <div class="col-12 col-lg-6">
                        <div class="single-post-area wow fadeInUpBig" data-wow-delay="100ms">
                            <!-- Post Thumbnail -->
                            <a href="#" class="post-thumbnail"><img src="/img/training/training_board/preview.jpg" alt=""></a>
                            <!-- Post Conetent -->
                            <div class="post-content">
                                <div class="post-meta">
                                    <a href="#">September 28, 2019</a>
                                    <a href="#">Sidney Sherborne</a>
                                </div>
                                <a href="/about/training/theboard/" class="post-title">The Training Board</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- Blog Area End -->

        <!-- Footer Area Start -->
        <?php $path = $_SERVER['DOCUMENT_ROOT'];
        $path .= "/footer.php";
        include $path; ?>
        <!-- Footer Area End -->

    </body>

    </html>