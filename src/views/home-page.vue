<template>
    <div class="container position-relative">
        <div class="row">
            <div class="col-lg-12">
                <div class="row  justify-content-center align-items-center banner-container bg-white mt-3 rounded">
                    <div class="col-lg-6 banner-item order-lg-first order-last mt-lg-0">
                        <div class="banner-text">
                            <h2 class="mb-5 banner-text fw-bolder" id="hero-title">
                                YOUR FIRST STEP IN REACHING YOUR MARITIME DREAM!
                            </h2>
                        </div>
                        <p>Reach your maritime dream right now. 🚢</p>
                        <div class="d-flex hero-serch flex-wrap" id="hero-row">
                            <router-link :to="{ name: 'app-layout.admission' }" class="btn btn-primary" id="Admission"
                                data-title="Admission" @click="changename('Admission')"> Inquire Now
                                <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round"></circle>
                                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </router-link>
                        </div>
                    </div>
                    <div class="col-lg-5 banner-img mt-5">
                        <div class="img text-end" id="hero-img">
                            <div class="col-sm-12 col-lg-15">
                                <div class="card">
                                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                                        <ol class="carousel-indicators">
                                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                                class="active">
                                            </li>
                                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"></li>
                                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"></li>
                                        </ol>
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img src="@/assets/resources/banner/1.png" class="d-block" alt="#"
                                                    width="500" height="380">
                                            </div>
                                            <div class="carousel-item">
                                                <img src="@/assets/resources/banner/2.png" class="d-block" alt="#"
                                                    width="500" height="380">
                                            </div>
                                            <div class="carousel-item">
                                                <img src="@/assets/resources/banner/3.png" class="d-block" alt="#"
                                                    width="500" height="380">
                                            </div>
                                            <div class="carousel-item">
                                                <img src="@/assets/resources/banner/4.png" class="d-block" alt="#"
                                                    width="500" height="380">
                                            </div>
                                            <div class="carousel-item">
                                                <img src="@/assets/resources/banner/5.png" class="d-block" alt="#"
                                                    width="500" height="380">
                                            </div>
                                        </div>
                                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                                            data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button"
                                            data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="editors position-relative">
            <div class="container" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0"
                data-iq-trigger="scroll" data-iq-ease="power.out" data-iq-opacity="0">
                <div class="row">
                    <section class="editors  mar-bot">
                        <hr>
                        <div class="card text-center mt-5 ">
                            <h4 class="fw-bolder fs-1 text-primary">BALIWAG MARITIME ACADEMY, INC.</h4>
                            <p class="text-info">"operates a management system that has been assessed as conforming to :"
                            </p>
                            <h4 class="mb-3">ISO 9001:2015</h4>
                            <h5>for the scope of activities:</h5>
                            <p>Provision of maritime education and training in accordance with STCW"95, As Amended and CHED
                                Rules including
                                design and developement</p>
                            <div class="text-center">
                                <img src="@/assets/resources/image/iso-logo.png" class="card-img height1 w-50" alt="#">
                            </div>
                        </div>
                        <div class="container">
                            <div class="card">
                                <h4 class="fw-bolder fs-1 text-center text-primary"> ABOUT BMA</h4>
                                <p class="m-3 text-black">Baliwag Maritime Academy, Inc. (BMA) is a maritime institution
                                    that is affiliated with
                                    BALIWAG
                                    NAVIGATION,
                                    INC., (BNI) one of the leading ship management and crewing companies in the Philippines
                                    with it’s shipping
                                    department Westwind line. The Academy is a reliable source of competent marine
                                    professionals for BNI Westwind
                                    line and its foreign principals since 1994 building maritime achievers.

                                    The Academy has its accreditation with CHED-MARINA for BSMT and BSMARE Program and
                                    certified by ISO 9001:2015
                                    accrediting bodies.</p>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="card mt-3">
                                        <h4 class="fw-bolder fs-1 text-center text-primary">MISSION</h4>
                                        <p class="m-3 text-black justify-content-between"> The Baliwag Maritime Academy
                                            shall offer its
                                            students a
                                            competency based Maritime
                                            Education &
                                            Training
                                            Program
                                            to
                                            produce competent marine officers with an adequate knowledge, attitudes, &
                                            leadership skills necessary in
                                            pursuing
                                            their respective professional maritime career which complies to national and
                                            international standards.</p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card mt-3">
                                        <h4 class="fw-bolder fs-1 text-center text-primary">VISION</h4>
                                        <p class="m-3 text-black justify-content-between"> The Baliwag Maritime Academy as
                                            one of the leading
                                            Maritime Higher Educational
                                            Institution
                                            visualizes itself
                                            as
                                            a producer of highly competent marine officers who will excel in the practice of
                                            the seafaring profession in
                                            both domestic and international shipping, and as competent maritime educators.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row text-center">
                            <div class="card">
                                <h2 class="mt-3 title-bt fw-bolder fs-1">Core Values</h2>
                                <div class="row">
                                    <div class="col-sm">
                                        <h3 class="text-info">KNOWLEDGE</h3><br>
                                        being consistently honest and trustworthy in work even without supervision thus
                                        gaining
                                        trust and respect of clients and stakeholders with open and transparent decision
                                        making
                                        processes.
                                    </div>
                                    <div class="col-sm">
                                        <h3 class="text-danger">SELF-DISCIPLINE</h3><br>
                                        ability to motivate oneself regardless emotional state leading towards hard work and
                                        persistence to get ones' job done.
                                    </div>
                                    <div class="col-sm">
                                        <h3 class="text-warning">EXCELLENCE</h3><br>
                                        Striving for the highest personal and institutional achievement in all aspects of
                                        work,
                                        individual and community action and life-long learning.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 mt-5">
                                <hr>
                                <h4 class="title-bt fw-bolder fs-1">More Info</h4>
                            </div>
                            <div class="header-title d-flex justify-content-between">
                                <h4 class="fw-bolder fs-1 ">Our Courses</h4>
                            </div>
                            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 list-inline">
                                <div class="col">
                                    <div class="card bg-white iq-service-card">
                                        <div class="iq-image position-relative">
                                            <div class="img">
                                                <img src="@/assets/resources/banner/BSMT.png" alt="image"
                                                    class="img-fluid height1 radius-our w-100">
                                            </div>
                                            <!-- <div class="app badge-2 btn btn-sm btn-primary">$2000</div> -->
                                            <div class="app badge-1 btn btn-sm btn-primary">COLLEGE</div>
                                            <div class="app badge-3 ms-3 btn btn-sm text-white btn-info">BSMT</div>
                                        </div>
                                        <div class="card-body pb-3">
                                            <div class="border-bottom mt-3">
                                                <h5 class=" mb-3 fw-bolder">BS in Marine Transportation</h5>
                                            </div>
                                            <div class="d-flex justify-content-between flex-wrap mt-3">
                                                <div>
                                                    <span class="text-dark ms-2">BS Marine Transportation - is a
                                                        maritime education program that covers the mandatory education
                                                        and training for a Navigational Watch required under Regulation
                                                        II/I of the STCW Convention, 1978, as amended.
                                                    </span>
                                                    <a href="#/bsmt" class="text-primary-emphasis">Read More.</a>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- </router-link> -->
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card bg-white iq-service-card">
                                        <div class="iq-image position-relative">
                                            <div class="img">
                                                <img src="@/assets/resources/banner/BSMARE.png" alt="image"
                                                    class="img-fluid height1 radius-our w-100">
                                            </div>
                                            <div class="app badge-1 btn btn-sm btn-primary">COLLEGE</div>
                                            <div class="app badge-3 ms-3 btn btn-sm text-white btn-info">BSMARE</div>
                                        </div>
                                        <div class="card-body pb-3">
                                            <div class="border-bottom mt-3">
                                                <h5 class="mb-3 fw-bolder">BS in Marine ENGINEERING</h5>
                                            </div>
                                            <div class="d-flex justify-content-between flex-wrap mt-3">
                                                <div>

                                                    <span class="text-dark ms-2">BS Marine Engineering - is a maritime
                                                        education program that covers the mandatory education and
                                                        training for Officers in Charge of an Engineering Watch required
                                                        under Regulation III/I of the STCW Convention, 1978, as amended

                                                    </span>
                                                    <a href="#/Bsme" class="text-primary-emphasis">Read More.</a>
                                                </div>

                                            </div>
                                        </div>
                                        <!-- </router-link> -->
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card bg-white iq-service-card">
                                        <div class="iq-image position-relative">
                                            <div class="img">
                                                <img src="@/assets/resources/banner/SHS.png" alt="image"
                                                    class="img-fluid height1 radius-our w-100">
                                            </div>
                                            <div class="app badge-1 btn btn-sm btn-primary ">SENIOR HIGHSCHOOL</div>
                                        </div>
                                        <div class="card-body pb-3">
                                            <div class="border-bottom mt-3">
                                                <h5 class="mb-3 fw-bolder">Pre-Baccalaureate Maritime</h5>
                                            </div>
                                            <div class="d-flex justify-content-between flex-wrap mt-3">
                                                <div>
                                                    <span class="text-dark ms-2">Senior High School - covers the
                                                        mandatory education for the last two years of the K to 12
                                                        Program and includes Grade 11 and 12 required by the Department
                                                        of Education and Marina.
                                                    </span>
                                                    <a href="#/shs" class="text-primary-emphasis">Read More.</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="col-md-6 col-lg-6">
                                <div class="card mb-2">
                                    <div class="row no-gutters">
                                        <div class="col-md-6 col-lg-4 mt-3">
                                            <img src="@/assets/resources/banner/BANNER2.png" class="card-img" alt="#">
                                        </div>
                                        <div class="col-md-6 col-lg-8">
                                            <div class="card-body">
                                                <h4 class="card-title">Learn more About Facilities</h4>
                                                <p class="card-text">
                                                    Baliwag Maritime Academy, Inc. (BMA) is a renowned maritime institution
                                                    that boasts a range of state-of-the-art facilities...</p>
                                                <p class="card-text"><small class="text-success"><a
                                                            href="#/Facilities">Learn
                                                            More...</a></small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <div class="card mb-2">
                                    <div class="row no-gutters">
                                        <div class="col-md-6 col-lg-4 mt-3">
                                            <img src="@/assets/resources/banner/BANNER2.png" class="card-img" alt="#">
                                        </div>
                                        <div class="col-md-6 col-lg-8">
                                            <div class="card-body">
                                                <h4 class="card-title">Learn more About Facilities</h4>
                                                <p class="card-text">
                                                    Baliwag Maritime Academy, Inc. (BMA) is a renowned maritime institution
                                                    that boasts a range of state-of-the-art facilities...</p>
                                                <p class="card-text"><small class="text-success"><a
                                                            href="#/Facilities">Learn
                                                            More...</a></small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6 mt-5">
                                <div class="card mb-2">
                                    <div class="row no-gutters m-5">
                                        <h4 class="title-bt fw-bolder fs-1">News</h4>
                                        <iframe
                                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FBaliwagMaritimeAcademyOfficial&tabs=timeline&width=1000&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                                            height="770" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                                            allowfullscreen="true"
                                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6 mt-5">
                                <div class="card mb-2">
                                    <div class="row no-gutters m-5">
                                        <h4 class="title-bt fw-bolder fs-1">Event</h4>
                                        <div class="overflow-auto" style="height: 770px;">
                                            <a href="#">
                                                <h4 class="text-start text-primary">Maritime Academy of Asia and the
                                                    Pacific
                                                    (MAAP)
                                                    and Kongsberg Digital signs
                                                    key simulation contract</h4>
                                            </a>
                                            <p class="text-start">VADM Eduardo Ma R Santos, MAAP President together with
                                                Engr. Gerardo Ramon S.
                                                Galang, MIITD Director attended the Kongsberg Digital Maritime Simulation
                                                User Conference 2022 held in Horten, Norway last November 9-11, 2022</p>
                                            <a href="#">
                                                <h4 class="text-start text-primary">Maritime Academy of Asia and the Pacific
                                                    (MAAP)
                                                    and Kongsberg Digital signs
                                                    key simulation contract</h4>
                                            </a>
                                            <p class="text-start">VADM Eduardo Ma R Santos, MAAP President together with
                                                Engr. Gerardo Ramon S.
                                                Galang, MIITD Director attended the Kongsberg Digital Maritime Simulation
                                                User Conference 2022 held in Horten, Norway last November 9-11, 2022</p>
                                            <a href="#">
                                                <h4 class="text-start text-primary">Maritime Academy of Asia and the Pacific
                                                    (MAAP)
                                                    and Kongsberg Digital signs
                                                    key simulation contract</h4>
                                            </a>
                                            <p class="text-start">VADM Eduardo Ma R Santos, MAAP President together with
                                                Engr. Gerardo Ramon S.
                                                Galang, MIITD Director attended the Kongsberg Digital Maritime Simulation
                                                User Conference 2022 held in Horten, Norway last November 9-11, 2022</p>
                                            <a href="#">
                                                <h4 class="text-start text-primary">Maritime Academy of Asia and the Pacific
                                                    (MAAP)
                                                    and Kongsberg Digital signs
                                                    key simulation contract</h4>
                                            </a>
                                            <p class="text-start">VADM Eduardo Ma R Santos, MAAP President together with
                                                Engr. Gerardo Ramon S.
                                                Galang, MIITD Director attended the Kongsberg Digital Maritime Simulation
                                                User Conference 2022 held in Horten, Norway last November 9-11, 2022</p>
                                            <a href="#">
                                                <h4 class="text-start text-primary">Maritime Academy of Asia and the Pacific
                                                    (MAAP)
                                                    and Kongsberg Digital signs
                                                    key simulation contract</h4>
                                            </a>
                                            <p class="text-start">VADM Eduardo Ma R Santos, MAAP President together with
                                                Engr. Gerardo Ramon S.
                                                Galang, MIITD Director attended the Kongsberg Digital Maritime Simulation
                                                User Conference 2022 held in Horten, Norway last November 9-11, 2022</p>
                                            <a href="#">
                                                <h4 class="text-start text-primary">Maritime Academy of Asia and the Pacific
                                                    (MAAP)
                                                    and Kongsberg Digital signs
                                                    key simulation contract</h4>
                                            </a>
                                            <p class="text-start">VADM Eduardo Ma R Santos, MAAP President together with
                                                Engr. Gerardo Ramon S.
                                                Galang, MIITD Director attended the Kongsberg Digital Maritime Simulation
                                                User Conference 2022 held in Horten, Norway last November 9-11, 2022</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HomePage'
}
</script>