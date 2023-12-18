<style>
.removepadding {
    margin: 0%;
    padding: 0%;
}

* {
    margin: 0%;
    padding: 0%;
}

.custom-bullets {
    padding-left: 20px;
    /* Space for bullet */
    text-align: left;
    color: black;
}

.custom-bullets li {
    position: relative;
    margin-bottom: 10px;
    /* Adjust as needed */
}

.custom-bullets li:before {
    content: "\2022";
    /* Bullet code */
    position: absolute;
    left: -20px;
    /* Adjust to align the bullet */
}
</style>
<template>
    <div class="position-relative">
        <img src="@/assets/resources/banner/DSC07326.png" class="img-fluid" alt="#" width="100%">
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-soft-primary"></div>
        <div class="position-absolute top-50 start-50 translate-middle text-center text-white">
            <h1 class="mb-1 fw-bold text-white display-4" id="hero-title">
                CHARTING SUCCESS SHAPING MARITIME PROFESSIONAL TO EXCELLENCE
            </h1>
            <p class="text-lg mt-2 text-white">Reach your maritime dream right now. 🚢</p>
            <button class="text-white bg-primary p-2 w-35 border border-primary rounded-start rounded-end">Inquire Now! <svg width="18" viewBox="0 0 24 24"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"></circle>
                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </svg></button>
        </div>
    </div>
    <div class="container">
        <!-- <div class="col-lg-12 imagepadding">
            <div class="row  justify-content-center align-items-center banner-container mt-3 rounded ">
                <div class="col-lg-7 banner-item order-lg-first order-last mt-lg-0">
                    <div class="banner-text">
                        <h2 class="mb-4 banner-text fw-bolder" id="hero-title">
                            CHARTING SUCCESS SHAPING MARITIME PROFESSIONAL TO EXCELENCE
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
                                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active">
                                        </li>
                                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"></li>
                                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"></li>
                                    </ol>
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img src="@/assets/resources/banner/1.png" class="d-block" alt="#" width="500"
                                                height="380">
                                        </div>
                                        <div class="carousel-item">
                                            <img src="@/assets/resources/banner/2.png" class="d-block" alt="#" width="500"
                                                height="380">
                                        </div>
                                        <div class="carousel-item">
                                            <img src="@/assets/resources/banner/3.png" class="d-block" alt="#" width="500"
                                                height="380">
                                        </div>
                                        <div class="carousel-item">
                                            <img src="@/assets/resources/banner/4.png" class="d-block" alt="#" width="500"
                                                height="380">
                                        </div>
                                        <div class="carousel-item">
                                            <img src="@/assets/resources/banner/5.png" class="d-block" alt="#" width="500"
                                                height="380">
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
        </div> -->
        <div class="editors position-relative">
            <div class="container" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0"
                data-iq-trigger="scroll" data-iq-ease="power.out" data-iq-opacity="0">
                <div class="row">
                    <section class="editors  mar-bot">
                        <div class="card text-center mt-5 ">
                            <h4 class="fw-bolder fs-1 text-primary mb-2 mt-1">WELCOME TO THE BALIWAG MARITIME ACADEMY</h4>
                            <p class="m-3 text-black">At Baliwag Maritime Academy. we are dedicated to nurturing the next
                                generation of maritime proffessionals through comprehensive education and practical
                                training. As one of the leading institution in the maritime industry, we take pride in
                                offering
                                world-clas programs designed to equip our students with the skills,knowledge, and expertise
                                required for a successful career at sea.
                            </p>
                        </div>
                        <div class="container">
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
                                        <p class="m-3 text-black justify-content-between"> The Baliwag Maritime Academy
                                            as
                                            one of the leading
                                            Maritime Higher Educational
                                            Institution
                                            visualizes itself
                                            as
                                            a producer of highly competent marine officers who will excel in the
                                            practice of
                                            the seafaring profession in
                                            both domestic and international shipping, and as competent maritime
                                            educators.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row text-center">
                            <div class="card">
                                <h2 class="mt-3 title-bt fw-bolder fs-1">CORE VALUES</h2>
                                <div class="row">
                                    <div class="col-sm">
                                        <h3 class="text-info fw-bolder">KNOWLEDGE</h3><br>
                                        <p class="text-black">
                                            being consistently honest and trustworthy in work even without supervision thus
                                            gaining
                                            trust and respect of clients and stakeholders with open and transparent decision
                                            making
                                            processes.</p>
                                    </div>
                                    <div class="col-sm">
                                        <h3 class="text-danger fw-bolder">DISCIPLINE</h3><br>
                                        <p class="text-black">
                                            ability to motivate oneself regardless emotional state leading towards hard work
                                            and
                                            persistence to get ones' job done.</p>
                                    </div>
                                    <div class="col-sm">
                                        <h3 class="text-warning fw-bolder">EXCELLENCE</h3><br>
                                        <p class="text-black">
                                            Striving for the highest personal and institutional achievement in all aspects
                                            of
                                            work,
                                            individual and community action and life-long learning.</p>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="header-title d-flex justify-content-between">
                                <h4 class="fw-bolder fs-1 ">OUR PROGRAMS</h4>
                            </div>
                            <div class="text-start text-black">
                                <p>Explore our range of specialize programs tailored to meet the diverse needs of aspiring
                                    maritime professionals:</p>
                            </div>
                            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 list-inline">
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
                                                <h5 class="mb-3 fw-bolder">Senior High School: Pre-Baccaureate Maritime
                                                    Specialization</h5>
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
                                                <h5 class="mb-3 fw-bolder">BS in Marine Engineering</h5>
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
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card bg-white iq-service-card">
                                        <div class="iq-image position-relative">
                                            <div class="img">
                                                <img src="@/assets/resources/banner/BSMT.png" alt="image"
                                                    class="img-fluid height1 radius-our w-100">
                                            </div>
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
                                    </div>
                                </div>
                            </div>
                            <p class="text-black">Our curriculum is thoughtfully crafted to blend theoretical learning with
                                hands-on
                                experience, ensuring that our
                                graduates are well-prepared to excel in the dynamic maritime sector.
                            </p>
                            <!-- <div class="col-md-6 col-lg-6">
                                <div class="card mb-2">
                                    <div class="row no-gutters">
                                        <div class="col-md-6 col-lg-4 mt-3">
                                            <img src="@/assets/resources/banner/BANNER2.png" class="card-img" alt="#">
                                        </div>
                                        <div class="col-md-6 col-lg-8">
                                            <div class="card-body">
                                                <h4 class="card-title">Learn more About Facilities</h4>
                                                <p class="card-text">
                                                    Baliwag Maritime Academy, Inc. (BMA) is a renowned maritime
                                                    institution
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
                                                    Baliwag Maritime Academy, Inc. (BMA) is a renowned maritime
                                                    institution
                                                    that boasts a range of state-of-the-art facilities...</p>
                                                <p class="card-text"><small class="text-success"><a
                                                            href="#/Facilities">Learn
                                                            More...</a></small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <div class="text-center">
        <h2 class="fw-bolder fs-1">STATE OF THE ART FACILITIES</h2>
        <p class="text-black">We provide access to modern facilities and cutting-edge resources that
            facilitate effective
            learning and practicaltraining. Our campus offer advanced simulation labs. full-equipped
            workshops, and comprehensive libraries to support our students' academic endeavors.</p>
        <hr>
        <h4 class="fw-bolder fs-1 ">EXPERIENCED FACULTY</h4>
        <p class="text-black">Our faculty comprises experienced industry professionals and dedicated
            educators committed to
            delivering
            high-quality education. They mentor and guide students, forstering an environment of
            academic excellence and professional growth.
        </p>
        <hr>
        <h4 class="fw-bolder fs-1 ">CAREER OPPORTUNITIES</h4>
        <p class="text-black">Upon Graduation, our students are wel-positioned to embark on
            rewarding careers in the maritime industry.
            We provide career guidance and support, connecting our graduates with promising
            employment opportunities worldwide.
        </p>
        <hr>
        <h4 class="fw-bolder fs-1 ">WHY CHOOSE BALIWAG MARITIME ACADEMY?</h4>
        <div class="row justify-content-center mt-1">
            <div class="col-6">
                <ul class="list-unstyled custom-bullets">
                    <li>Accredited programs ensuring quality education</li>
                    <li>Strong industry partnerships and networking opportunities</li>
                    <li>Holistic approach to student development</li>
                    <li>Commitment to safety, innovation, and sustainability in maritime practices
                    </li>
                </ul>
            </div>
        </div>
        <hr>
        <h4 class="mt-6 fw-bolder fs-1">GET IN TOUCH</h4>
        <p class="text-black">
            Ready to begin your journey toward a fulfilling maritime career? Contact us to learn more
            about our programs, admission process, and campus life. We look forward to welcoming you to
            the Baliwag Maritime Academy family!
        </p>
    </div>
    <hr>
</template>
<script>
export default {
    name: 'HomePage'
}
</script>