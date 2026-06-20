<!DOCTYPE html>
<!URL /newclimbers/>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Title -->
    <title>New Climbers | Warwick University Climbing Club</title>

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
    <section class="breadcrumb-area bg-img bg-overlay jarallax" style="background-image: url(/img/bg-img/cover_newclimbers.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <div class="breadcrumb-content text-center">
                        <h2 class="page-title">New Climbers</h2>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb justify-content-center">
                                <li class="breadcrumb-item"><a href="/"><i class="icon_house_alt"></i> Home</a></li>
                                <!-- <li class="breadcrumb-item" style="color:white"><a href="/about/" class="post-title">About</a></li> -->
                                <li class="breadcrumb-item active" aria-current="page">New Climbers</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Breadcrumb Area End -->

    <!-- New Climbers Area Start -->
    <div class="about-us-area section-padding-80-0 mb-80 clearfix">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12">
                    <div class="about-us-content">
                        <h3 class="wow fadeInUp" data-wow-delay="100ms">Welcome to WUCC!!</h3>
                        <div class="line wow fadeInUp" data-wow-delay="100ms"></div>

                        <div class="wow fadeInUp highlight-box-yellow p-3 mb-5" data-wow-delay="100ms">
                            <p>Before attending club hours or a taster for the first time, you <b>MUST</b> complete an induction with Warwick Sport. You won't be able to climb without doing one first.</p>
                            <p>Follow <b>Step 2</b> below for how to book on to an induction!</p>
                        </div>

                        <h3 class="wow fadeInUp" data-wow-delay="200ms">Joining Steps</h3>
                        <div class="line wow fadeInUp" data-wow-delay="200ms"></div>

                        <p class="wow fadeInUp mb-3" data-wow-delay="200ms">If you've decided you'd like to join the club, here's how!</p>

                        <div class="wow fadeInUp mb-5" data-wow-delay="300ms">
                            <!-- Buy membership toggle -->
                            <div class="collapsible collapsed highlight-box-dark p-0 mb-3">
                                <a class="a-collapsible" data-toggle="collapse" href="#membershipInstructions" aria-expanded="false" aria-controls="membershipInstructions">
                                    <div class="container-fluid">
                                        <div class="row justify-content-start align-items-center">
                                            <div class="col-auto">
                                                <h4>1.</h4>
                                            </div>
                                            <div class="col-auto">
                                                <p>Buy membership</p>
                                            </div>
                                            <div class="col mr-auto">
                                                <i class="fa fa-plus pull-right"></i>
                                                <i class="fa fa-minus pull-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <!-- Buy membership hidden content -->
                            <div id="membershipInstructions" class="collapse">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md mb-3">
                                            <div class="highlight-box-neutral h-100">
                                                <h4>1.</h4>
                                                <p>Head to our <a href="https://www.warwicksu.com/societies-sports/sports-clubs/climbing/">SU page</a>.</p>                                    </div>
                                        </div>

                                        <div class="col-md-8 mb-3">
                                            <div class="highlight-box-neutral h-100">
                                                <h4>2.</h4>
                                                <p>Log in with your ITS account from the top right.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-8 mb-3">
                                            <div class="highlight-box-neutral h-100">
                                                <h4>3.</h4>
                                                <p>Scroll to the bottom, and add to your basket:</p>
                                                <ol>
                                                    <li>Climbing Standard Membership*</li>
                                                    <li>Sports Federation Student Membership</li>
                                                    <li>Club Pass Membership Fee (ON CAMPUS)</li>
                                                </ol>
                                                <img src="/img/bg-img/newclimbersjoin.png">
                                            </div>
                                        </div>
                                        <div class="col-md mb-3">
                                            <div class="highlight-box-neutral h-100">
                                                <h4>4.</h4>
                                                <p>Buy all these items. You've joined!</p>
                                                <p>Next, make sure to complete an induction at the climbing wall.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p><b>* Note:</b> If you are not enrolled at Warwick University, you may need to get the Associate Membership</p>
                                <p>For outdoor trips, you may also need BMC membership (the club offers a partial refund at the end of the year).</p>

                            </div>

                            <!-- Induction signup toggle -->
                            <div class="collapsible collapsed highlight-box-dark p-0 mb-3">
                                <a class="a-collapsible" data-toggle="collapse" href="#inductionInstructions" aria-expanded="false" aria-controls="inductionInstructions">
                                    <div class="container-fluid">
                                        <div class="row justify-content-start align-items-center">
                                            <div class="col-auto">
                                                <h4>2.</h4>
                                            </div>
                                            <div class="col-auto">
                                                <p>Complete an induction</p>
                                            </div>
                                            <div class="col mr-auto">
                                                <i class="fa fa-plus pull-right"></i>
                                                <i class="fa fa-minus pull-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <!-- Induction signup hidden content -->
                            <div id="inductionInstructions" class="collapse">
        
                                <div class="highlight-box-yellow p-3 mb-3">
                                    <p>Please note that <b>everyone</b> (yes even experienced climbers) must complete an induction with Warwick Sport before climbing with or without the club!</p>
                                </div>

                                <p>The induction consists of an instructor showing you how to safely use the autobelays (clipping on and climbing safely) and use of the bouldering wall.</p>
                                <p>If you're an experienced climber, roped climbing competency (top rope/lead) in the centre can also be signed off at this time.</p>
                                <p>Inductions run every 2 hours from 9:15am-7:15pm Mon-Fri, and every 2 hours from 8:30am-6:30pm Sat and Sun.</p>

                                <div class="container-fluid mb-3">
                                    <div class="row">
                                        <div class="col-md mb-3">
                                            <div class="highlight-box-dark h-100">
                                                <h4>Induction Key Info</h4>
                                                <p><b>Duration:</b> 15-20 mins</p>
                                                <p><b>Cost:</b> £12.50 off peak, £15.50 peak</p>
                                                <p><b>Time:</b> Every 2 hours 9:15am-7:15pm Mon-Fri, every 2 hours 8:30am-6:30pm Sat and Sun</p>
                                                <p><b>Equipment hire included?</b> Yes</p>
                                            </div>
                                        </div>
                                        <div class="col-md mb-3">
                                            <div class="highlight-box-neutral h-100">
                                                <h4>1.</h4>
                                                <p>Head to <a href="https://warwick.ac.uk/services/sport/climbing#register">Warwick Sport</a>, and follow the registration instructions.</p>
                                                <img src="/img/newclimbers/warwick-sport-registration.png">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md mb-3">
                                            <div class="highlight-box-neutral">
                                                <h4>2.</h4>
                                                <p>For the last step, book on to an induction though <a href="https://websignon.warwick.ac.uk/origin/plus2/redirect?adetarget=https://sportwarwick.leisurecloud.net/joinathomejhst&sid=WS&payg=new&%5btoken">Warwick Sport's portal</a>.</p>
                                                <p>You can find induction slots by searching for 'Climb registration'.</p>
                                                <img src="/img/newclimbers/warwick-sport-induction-filter.png">
                                            </div>
                                        </div>
                                        <div class="col-md mb-3">
                                            <div class="highlight-box-neutral h-100">
                                                <h4>3.</h4>
                                                <p>Click on the session and confirm your booking! You should get a confirmation email of your session.</p>
                                                <p>Included with the cost of the induction is the hire of shoes and harness if needed, so don't worry if you don't have your own.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>           
                           </div>


                            <!-- Club hours toggle -->
                            <div class="collapsible collapsed highlight-box-dark p-0 mb-3">
                                <a class="a-collapsible" data-toggle="collapse" href="#clubhoursInstructions" aria-expanded="false" aria-controls="clubhoursInstructions">
                                    <div class="container-fluid">
                                        <div class="row justify-content-start align-items-center">
                                            <div class="col-auto">
                                                <h4>3.</h4>
                                            </div>
                                            <div class="col-auto">
                                                <p>Book on to a club hours session and climb with us!</p>
                                            </div>
                                            <div class="col mr-auto">
                                                <i class="fa fa-plus pull-right"></i>
                                                <i class="fa fa-minus pull-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <!-- Club hours hidden content -->
                            <div id="clubhoursInstructions" class="collapse">
                                
                                <p>See the current club hours slots <a href="/events/clubhours/" >here!</a></p>
                                    
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md mb-3">
                                            <div class="highlight-box-neutral h-100">
                                                <h4>1.</h4>
                                                <p>Head over to <a href="https://websignon.warwick.ac.uk/origin/plus2/redirect?adetarget=https://sportwarwick.leisurecloud.net/joinathomejhst&sid=WS&payg=new&%5btoken">Warwick Sport's booking portal</a>, and <b>login</b>.</p>
                                                <p>Note that your login credentials may be different to the ones used for ITS.</p>
                                                <p>Search for <b>"climbing"</b> in the search box.</p>
                                                <p>Club hours are labelled "<b>&lt;Day&gt;</b> Club Training <b>&lt;Time&gt;</b> Climbing" (for example, Friday Club Training 15:15 Climbing).</p>
                                                <p>Select the session you'd like to attend, and click 'Search'.</p>
                                                <img src="/img/newclimbers/warwick-sport-search-oct23.png">
                                            </div>
                                        </div>
                                        <div class="col-md mb-5">
                                            <div class="highlight-box-neutral">
                                                <h4>2.</h4>
                                                <p>Click 'Book now' to confirm your booking! You should get a confirmation email of your session.</p>
                                                <p>If you are prompted to select between 'Adult' and 'Uow Student', select 'Uow student', and follow the prompts on screen.</p>
                                                <img src="/img/newclimbers/warwick-sport-search-result-oct23.png">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>           
                        </div>

                        <h3 class="wow fadeInUp" data-wow-delay="400ms">FAQ</h3>
                        <div class="line wow fadeInUp" data-wow-delay="400ms"></div>

                        <div class="wow fadeInUp mb-5" data-wow-delay="400ms">

                            <div class="collapsible collapsed highlight-box-neutral p-0 mb-3">
                                <a class="a-collapsible" data-toggle="collapse" href="#faq-first-session" aria-expanded="false" aria-controls="faq-first-session">
                                    <div class="container-fluid">
                                        <div class="row justify-content-start align-items-center">
                                            <div class="col-auto">
                                                <h5>What should I bring to a climbing session?</h5>
                                            </div>
                                            <div class="col mr-auto">
                                                <i class="fa fa-plus pull-right"></i>
                                                <i class="fa fa-minus pull-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div id="faq-first-session" class="collapse">
                                <p>Make sure to wear clothes that you feel comfortable exercising in. If it's your first time, just bring yourself, a water bottle and a £1 coin for the lockers - climbing gear can be borrowed!</p>
                            </div>
                        
                            <div class="collapsible collapsed highlight-box-neutral p-0 mb-3">
                                <a class="a-collapsible" data-toggle="collapse" href="#faq-gear" aria-expanded="false" aria-controls="faq-gear">
                                    <div class="container-fluid">
                                        <div class="row justify-content-start align-items-center">
                                            <div class="col-auto">
                                                <h5>Do I need to have my own climbing gear?</h5>
                                            </div>
                                            <div class="col mr-auto">
                                                <i class="fa fa-plus pull-right"></i>
                                                <i class="fa fa-minus pull-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div id="faq-gear" class="collapse">
                                <p>Climbing shoes, harnesses, belay devices, carabiners and rope are all available to borrow for free at club hours for club members.</p>
                                <p>We run a trip to Lockwood’s in Leamington Spa for new climbers wanting to buy gear in Term 1. We get an extra discount when we go, so keep a lookout for the trip if this interests you!</p>
                            </div>


                            <div class="collapsible collapsed highlight-box-neutral p-0 mb-3">
                                <a class="a-collapsible" data-toggle="collapse" href="#faq-induction" aria-expanded="false" aria-controls="faq-induction">
                                    <div class="container-fluid">
                                        <div class="row justify-content-start align-items-center">
                                            <div class="col-auto">
                                                <h5>I'm an experienced climber - do I still need to do an induction?</h5>
                                            </div>
                                            <div class="col mr-auto">
                                                <i class="fa fa-plus pull-right"></i>
                                                <i class="fa fa-minus pull-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div id="faq-induction" class="collapse">
                                <p>Yes - everyone who climbs at the wall must complete an induction. This is required by Warwick Sport.</p>
                            </div>


                            <div class="collapsible collapsed highlight-box-neutral p-0 mb-3">
                                <a class="a-collapsible" data-toggle="collapse" href="#faq-beginner" aria-expanded="false" aria-controls="faq-beginner">
                                    <div class="container-fluid">
                                        <div class="row justify-content-start align-items-center">
                                            <div class="col-auto">
                                                <h5>I'm a complete beginner - where do I start?</h5>
                                            </div>
                                            <div class="col mr-auto">
                                                <i class="fa fa-plus pull-right"></i>
                                                <i class="fa fa-minus pull-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div id="faq-beginner" class="collapse">
                                <p>Congrats! You've picked (with absolutely no bias whatsoever) the best sport offered at Warwick!</p>
                                <p>In all seriousness, bouldering is a great place to begin. Climbs are lower to the ground, with soft matting on the ground in case you fall. There are no ropes; all you need are climbing shoes, which you can rent from the club (and some chalk if you've got sweaty hands!). If you'd like to try out some taller walls, there are several auto belays that can also be used as long as you've got a harness (these too can be rented from the club!).</p>
                                <p>The club runs top rope lessons in Term 1 if you'd like to progress your climbing skills, where you learn how to tie youself in and belay. Lead climbing lessons run in Term 2 for those who want to take things a step further!</p>
                                <p>Feel free to approach any exec member during a club hours session and they will be more than happy to help you!</p>
                            </div>


                            <div class="collapsible collapsed highlight-box-neutral p-0 mb-3">
                                <a class="a-collapsible" data-toggle="collapse" href="#faq-warwick-sport-membership" aria-expanded="false" aria-controls="faq-warwick-sport-membership">
                                    <div class="container-fluid">
                                        <div class="row justify-content-start align-items-center">
                                            <div class="col-auto">
                                                <h5>Do I need to buy a Warwick Sport membership to climb?</h5>
                                            </div>
                                            <div class="col mr-auto">
                                                <i class="fa fa-plus pull-right"></i>
                                                <i class="fa fa-minus pull-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div id="faq-warwick-sport-membership" class="collapse">
                                <p>If you're happy with climbing just during club hours, then no. Club hours can be booked on to for free by any club member.</p>
                                <p>It's important to note that your membership to the climbing club and a Warwick Sport Gym membership are distinct! The climbing club membership will allow you to climb during club hours, and allow you to borrow gear for free from us. A Warwick Sport membership may allow you to climb outside of club hours (subject to the terms of your specific membership plan).</p>
                            </div>
                        </div>

                        

                        <h3 class="wow fadeInUp" data-wow-delay="500ms">The Wall</h3>
                        <div class="line wow fadeInUp" data-wow-delay="500ms"></div>
                        <div class="wow fadeInUp" data-wow-delay="500ms">
                            <p>If you decide that you would like to climb more regularly at the centre you will need to look into either the Climbing (£228) or All Inclusive (£346) Memberships from Warwick Sport. Please note that the All Inclusive Membership only allows climbing during OFF PEAK HOURS, however, our club hours will still count as off peak for our club members. These memberships are NOT REQUIRED to become a member of the club but can be purchased either online or at the reception in the sports centre. Please note, all prices are based on 2023/24. Take a look at the <a href="https://warwick.ac.uk/services/sport/join/student-memberships" target="_blank">Sports Centre website</a> for more information.</p>
                            <p>Before you climb you will need to have an induction session at the wall which you can do during club hours. Please <a href="https://warwick.ac.uk/services/sport/active/climbing/#register" target="_blank">register online first</a> so you can spend more time climbing!</p>
                            <p>If you have any questions about the club feel free to message us on our Facebook, Instagram or send us an email, the links can be found on our <a href="/about/abouttheclub/">about page</a>.</p>
                        </div>
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