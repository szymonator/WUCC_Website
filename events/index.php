<!DOCTYPE html>
<!URL /events/>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="description" content="">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Title -->
        <title>Events | Warwick University Climbing Club</title>

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
        <!-- Header Area End -->

        <!-- Breadcrumb Area Start -->
        <section class="breadcrumb-area bg-img bg-overlay jarallax" style="background-image: url(/img/bg-img/cover_events.jpg);">
            <div class="container h-100">
                <div class="row h-100 align-items-center">
                    <div class="col-12">
                        <div class="breadcrumb-content text-center">
                            <h2 class="page-title">What's On</h2>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb justify-content-center">
                                    <li class="breadcrumb-item"><a href="/"><i class="icon_house_alt"></i> Home</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">What's On</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Breadcrumb Area End -->

        <!-- Gallery Area Start -->
        <div class="alime-portfolio-area section-padding-80 clearfix">
            <div class="container-fluid">
                <!-- <div class="row">
                <div class="col-12">
                    <div class="alime-projects-menu wow fadeInUp" data-wow-delay="100ms">
                        <div class="portfolio-menu text-center">
                            <button class="btn active" data-filter="*">All Events</h4></button>
                            <button class="btn" data-filter=".term1">Term 1</button>
                            <button class="btn" data-filter=".term2">Term 2</h4></button>
                            <button class="btn" data-filter=".term3">Term 3</h4></button>
                            <button class="btn" data-filter=".trips">Trips</h4></button>
                            <button class="btn" data-filter=".comps">Comps</h4></button>
                        </div>
                    </div>
                </div>
            </div> -->

                <div id="google-calendar" class="center-divs">
                    <!-- <div class="col-12 single_gallery_item term1 mb-15 wow fadeInUp" data-wow-delay="100ms">
                    <div class="single-portfolio-content events">
                        <div>
                            <p><b>Week 1 &nbsp;|&nbsp; Mon 30th Sep<b></p>
                            <p>Taster Session &nbsp;|&nbsp; 4 - 6 pm &nbsp;|&nbsp; Warwick Sports & Wellness Hub</p>
                        </div>
                    </div>
                </div> -->
                </div>
            </div>
        </div>
        <!-- Gallery Area End -->

        <!-- Footer Area Start -->
        <?php $path = $_SERVER['DOCUMENT_ROOT'];
        $path .= "/footer.php";
        include $path; ?>
        <!-- Footer Area End -->

        <!-- For google calendar integration -->
        <script src="https://cdn.jsdelivr.net/npm/moment@2/moment.min.js"></script>
        <script src="https://apis.google.com/js/api.js"></script>

        <script>
            const REPEATED_EVENTS = ["Club Hours"];
            const TERM_STARTS = [

                '05/10/2020', '11/01/2021', '26/04/2021', // 2020 - 2021
                '04/10/2021', '10/01/2022', '25/04/2022', // 2021 - 2022
                '03/10/2022', '09/01/2023', '24/04/2023', // 2022 - 2023
                '02/10/2023', '08/01/2024', '23/04/2024', // 2023 - 2024
                '30/09/2024', '06/01/2025', '21/04/2025', // 2024 - 2025

            ].map(d => moment(d, "DD/MM/YYYY", true).subtract(7, 'days')).reverse(); // adjust so dates stored are actually week 0

            function displayEvents(weeks) {
                // displays the sorted events
                var html = "";

                for (const week of weeks) {
                    html += '<div class="col-12 single_gallery_item term1 mb-15 wow fadeInUp" data-wow-delay="100ms"> \
                    <div class="single-portfolio-content events"> \
                        <div> \
                            <p><b> Week ' + week.weekNumber + '&nbsp;|&nbsp;' + week.startOfWeek + '</b></p>'


                    for (const event of week.events) {
                        if (REPEATED_EVENTS.includes(event.name)) {
                            html += '<p style="color: grey">';
                        } else {
                            html += '<p>';
                        }

                        html += event.time + '&nbsp;|&nbsp; ' + event.name + '&nbsp;' + event.location

                        if (event.description) {
                            html += '<br><span style="font-size: 0.9rem; color: grey;">' + event.description + "</span>"
                        }

                        html += "</p>"
                    }
                    html += '</div></div></div>'
                }

                $('#google-calendar').html(html);
            }

            function processEvents(events) {
                // sort events into weeks

                const weekEvents = [];
                var previousWeek = "";

                for (const event of events) {
                    const eventStart = moment(event.start.dateTime);
                    const eventEnd = moment(event.end.dateTime);

                    var eventWeek = moment(event.start.dateTime).startOf("isoWeek").format("Do MMM");

                    if (eventWeek !== previousWeek) {
                        const startOfTerm = TERM_STARTS.find(termStart => moment(event.start.dateTime).isAfter(termStart));
                        console.log(eventStart, startOfTerm);

                        weekEvents.push({
                            startOfWeek: eventWeek,
                            weekNumber: eventStart.isoWeek() - startOfTerm.isoWeek(),
                            events: []
                        });

                        previousWeek = eventWeek;
                    }

                    weekEvents[weekEvents.length - 1].events.push({
                        name: event.summary,
                        time: eventStart.format("ddd Do MMM") === eventEnd.format("ddd Do MMM") ?
                            eventStart.format("ddd LT") + " - " + eventEnd.format("LT") :
                            eventStart.format("ddd LT") + " - " + eventEnd.format("ddd LT"),
                        location: !event.location ? "" : "|&nbsp; " + event.location.split(",")[0],
                        description: event.description,
                    });
                }
                displayEvents(weekEvents);
            }

            function printCalendar() {
                // gets events from google calendar api

                var calendarId = 'warwickclimbing@gmail.com';
                var apiKey = 'AIzaSyCCm_tn8UVDt69ooYL9qIayAZUO183n2ns';
                var userTimeZone = "Europe/London";

                gapi.client.init({
                    'apiKey': apiKey,
                    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
                }).then(function() {
                    // Use Google's "apis-explorer" for research: https://developers.google.com/apis-explorer/#s/calendar/v3/
                    // Events: list API docs: https://developers.google.com/calendar/v3/reference/events/list
                    return gapi.client.calendar.events.list({
                        'calendarId': calendarId,
                        'timeZone': userTimeZone,
                        'singleEvents': true,
                        'timeMin': (new Date()).toISOString(), //gathers only events not happened yet
                        'maxResults': 250,
                        'orderBy': 'startTime'
                    });
                }).then(function(response) {
                    if (response.result.items) {
                        processEvents(response.result.items);
                    }
                }, function(reason) {
                    console.log('Error: ' + reason.result.error.message);
                });
            };

            gapi.load('client', printCalendar);
        </script>

    </body>

    </html>