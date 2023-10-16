<template>
    <div class="container position-relative">
        <div class="row">
            <div class="col-lg-12">
                <!-- carousel -->
                <div class="row  justify-content-center align-items-center banner-container bg-white mt-3 rounded">
                    <div class="col-lg-7 banner-item order-lg-first order-last mt-lg-0">
                        <div class="banner-text">
                            <h2 class="mb-5 banner-text fw-bolder" id="hero-title">
                                YOUR FIRST STEP IN REACHING YOUR MARITIME DREAM!
                            </h2>
                        </div>
                        <p>Reach your maritime dream right now. 🚢</p>
                        <span class="ellipse">
                            <svg width="79" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse rx="38.7296" ry="38.7296"
                                    transform="matrix(0.938441 0.345441 -0.345486 0.938424 39.7266 39.7235)"
                                    fill="#FDDA5F" />
                            </svg>
                        </span>
                        <span class="ellipse1">
                            <svg width="35" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse rx="38.7296" ry="38.7296"
                                    transform="matrix(0.938441 0.345441 -0.345486 0.938424 39.7266 39.7235)"
                                    fill="#FDDA5F" />
                            </svg>
                        </span>

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
                    <!-- <div class="col-lg-5 banner-img">
                        <div class="img text-end" id="hero-img">
                            <img src="@/assets/resources/banner/BANNER2.png" class="img-fluid bg-img" alt="banner">
                        </div>
                    </div> -->
                </div>
                <!-- carousel -->
            </div>

        </div>
    </div>
    <div class="editors position-relative">
        <div class="container" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0" data-iq-trigger="scroll"
            data-iq-ease="power.out" data-iq-opacity="0">
            <div class="row">
                <section class="editors mar-top mar-bot">
                    <div class="header-title d-flex justify-content-between">
                        <h4 class="title-bt fw-bolder fs-1">Our Services</h4>
                    </div>

                    <span class="ellipse3">
                        <svg width="45" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse rx="38.7296" ry="38.7296"
                                transform="matrix(0.938441 0.345441 -0.345486 0.938424 39.7266 39.7235)" fill="#FDDA5F" />
                        </svg>
                    </span>
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 list-inline">
                        <div class="col">
                            <div class="card bg-white iq-service-card">
                                <!-- <router-link :to="{ name: 'app-layout.admission', query: { course: '2' } }" id="Admission"
                                    data-title="Admission" @click="changename('Admission')"> -->
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
                                <!-- <router-link :to="{ name: 'app-layout.admission', query: { course: '1' } }" id="Admission"
                                    data-title="Admission" @click="changename('Admission')"> -->
                                <div class="iq-image position-relative">
                                    <div class="img">
                                        <img src="@/assets/resources/banner/BSMARE.png" alt="image"
                                            class="img-fluid height1 radius-our w-100">
                                    </div>
                                    <!-- <div class="app badge-2 btn btn-sm btn-primary">$2000</div> -->
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
                                <!-- <router-link :to="{ name: 'app-layout.admission', query: { course: '3' } }" id="Admission"
                                    data-title="Admission" @click="changename('Admission')"> -->
                                <div class="iq-image position-relative">
                                    <div class="img">
                                        <img src="@/assets/resources/banner/SHS.png" alt="image"
                                            class="img-fluid height1 radius-our w-100">
                                    </div>
                                    <!-- <div class="app badge-2 btn btn-sm btn-primary">$2000</div> -->
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
                                <!-- </router-link> -->
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h4 class="title-bt fw-bolder fs-1">More Info</h4>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="card mb-2">
                                <div class="row no-gutters">
                                    <div class="col-md-6 col-lg-4 mt-3">
                                        <img src="@/assets/resources/banner/BANNER2.png" class="card-img" alt="#">
                                    </div>
                                    <div class="col-md-6 col-lg-8">
                                        <div class="card-body">
                                            <h4 class="card-title">Learn more About Us</h4>
                                            <p class="card-text">Baliwag Maritime Academy, Inc. (BMA) is a maritime
                                                institution that is affiliated with BALIWAG NAVIGATION, INC...</p>
                                            <p class="card-text"><small class="text-success"><a href="#/AboutUs">Learn
                                                        More...
                                                    </a></small>
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
                                            <h4 class="card-title">Facilities</h4>
                                            <p class="card-text">
                                                Baliwag Maritime Academy, Inc. (BMA) is a renowned maritime institution
                                                that boasts a range of state-of-the-art facilities geared towards providing
                                                top-notch education and practical training to aspiring mariners...</p>
                                            <p class="card-text"><small class="text-success"><a href="#/Facilities">Click
                                                        Here</a></small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <iframe
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FBaliwagMaritimeAcademyOfficial&tabs=timeline&width=1000&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                                width="10000" height="800" style="border:none;overflow:hidden" scrolling="no"
                                frameborder="0" allowfullscreen="true"
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                            </iframe>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HomePage'
}

</script>