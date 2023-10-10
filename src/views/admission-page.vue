<template>
    <h2 class="text-primary text-center home-title fw-bolder">SCHOOL ADMISSION</h2>
    <div class="alert alert-left alert-success alert-dismissible fade show mt-5" role="alert">
        <span class="fw-bolder">REMINDERS TO ALL APPLICANTS:</span>

        <p class="mt-3">
            • Applicants with Tattoos are not allowed.
            <br>
            • All application documents submitted online that met the pre-qualifying requirements shall be allowed to
            take
            the entrance examination but will be subjected for further verification to prove its authenticity validity.
            Application documents that are proven fraudulent after verification shall be invalidated and will not be
            allowed
            to enroll in the Academy.
        </p>
    </div>
    <div class="card">
        <div class="card-body">
            <div class="row mt-5 ">
                <div class="col-md-8">
                    <h4 class="fw-bolder">SENIOR HIGH SCHOOL ADMISSION REQUIREMENTS</h4>
                    <ul class="contact-details text-danger">
                        <li> Grade 10 Report Card with Grades in English, Math,
                            Science and General Average of 80%</li>
                        <li>Certificate of Good Moral Conduct</li>
                        <li>PSA Birth Certificate (not over 19 yrs. Old)</li>
                        <li>Height Requirements: at least 5'2"</li>
                    </ul>
                    <h4 class="fw-bolder">COLLEGE ADMISSION REQUIREMENTS</h4>
                    <ul class="contact-details text-danger">
                        <li> Grade 11 & 12 Card with Grades in English, Math,
                            Science and General Average of 80%
                        </li>
                        <li> Certificate of Good Moral Conduct</li>
                        <li> PSA Birth Certificate (not over 22 yrs. Old)</li>
                        <li> Barangay Clearance</li>
                        <li> Height Requirements: at least 5'4"</li>
                    </ul>
                    <h4 class="fw-bolder">Have Questions?</h4>
                    <p>Please feel free to call or email us,

                        or use our contact form to get in touch with us.

                        <br>We look forward to hearing from you!
                    </p>
                    <h4 class="fw-bolder">Call Us</h4>
                    <p>(044) 766 1263</p>
                    <h4 class="fw-bolder">Send Us Mail</h4>
                    <p>www.bma.edu.ph</p>
                    <h4 class="fw-bolder">Find Maritime Academy, inc.</h4>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3854.28456140621!2d120.92091487511337!3d14.976900785555266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33970046b15ff159%3A0xfb2580b7ac123830!2sBaliwag%20Maritime%20Foundation%2C%20Incorporated!5e0!3m2!1sen!2sph!4v1696818800804!5m2!1sen!2sph"
                            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <div class="col-md-4">
                    <h4 class="fw-bolder">APPLICATION FORM</h4>
                    <div v-if="errors.message" class="alert alert-left alert-danger alert-dismissible fade show mt-5"
                        role="alert">
                        <span class="fw-bolder">REGISTRATION FAILED:</span>
                        <p class="mt-3">
                            {{ errors.message }}
                        </p>
                    </div>
                    <div v-if="networkError.code" class="alert alert-left alert-danger alert-dismissible fade show mt-5"
                        role="alert">
                        <span class="fw-bolder">{{ networkError.code }}</span>
                        <p class="mt-3">
                            {{ networkError.message }}
                        </p>
                    </div>
                    <div class="contact-form mt-3">
                        <form @submit.prevent="applicantRegister" method="post">
                            <div class="col-md-12">
                                <input-component label="First Name" v-model:value="formData.firstName"
                                    :error="errors.firstName" />
                            </div>
                            <div class="col-md-12">
                                <input-component label="last Name" v-model:value="formData.lastName"
                                    :error="errors.lastName" />
                            </div>
                            <div class="col-md-12">
                                <input-component label="email" v-model:value="formData.email" :error="errors.email" />
                            </div>
                            <div class="col-md-12">
                                <input-component-v2 type="date" label="birthday" v-model:value="formData.birthday"
                                    :error="errors.birthday" />
                            </div>
                            <div class="col-md-12">
                                <input-component label="Contact number" v-model:value="formData.contactNumber"
                                    :error="errors.contactNumber" />
                            </div>
                            <div class="col-md-12 position-relative">
                                <small for="validationTooltip04" class="form-label fw-bolder">COURSE <sup
                                        class="text-danger fw-bolder">*</sup></small>
                                <select class="form-select form-select-sm border border-primary" v-model="formData.course">
                                    <option selected="" disabled="" value="">Choose...</option>
                                    <option value="1">BS MARINE ENGINEERING - COLLEGE</option>
                                    <option value="2">BS MARINE TRANSPORTATION - COLLEGE</option>
                                    <option value="3">PRE-BACCALAUREATE - SENIOR HIGHSCHOOL</option>

                                </select>
                                <span class="badge bg-danger mt-2" v-if="errors.course">{{
                                    errors.course[0] }}</span>
                            </div>

                            <div class="col-12">
                                <div class="form-check mt-2">
                                    <input class="form-check-input" type="checkbox" v-model="formData.agreement"
                                        id="invalidCheck">
                                    <label class="form-check-label" for="invalidCheck">
                                        Agree to terms and conditions
                                    </label>
                                    <span class="badge bg-danger mt-2" v-if="errors.agreement">{{
                                        errors.agreement[0] }}</span>
                                    <label class="text-primary mt-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Read terms and conditions
                                    </label>
                                </div>
                            </div>
                            <!--    <vue-recaptcha ref="recaptcha" sitekey="6Lch4wckAAAAAIv3KzDuN0M82UOeWJLWa7L_2Zva" /> -->
                            <div class="col-12">
                                <button class="btn btn-primary rounded w-100 mb-5" type="submit">APPLY
                                    NOW</button>
                                <router-link :to="{ name: 'app-layout.applicant-login' }"
                                    class="btn btn-info text-white w-100">ALREADY
                                    REGISTERED</router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal id="exampleModal" :tabindex="-1" role="dialog" mainClass="bd-example-modal-xl" ariaLabelled="exampleModalLabel"
        :ariaHidden="true" contentrole="document">
        <model-header :dismissable="true">
            <h5 class="modal-title text-primary fw-bolder" id="exampleModalScrollableTitle">TERMS & AGREEMENT
            </h5>
        </model-header>
        <model-body>
            <div class="">
                <label for="" class="h2 fw-bolder text-primary">Terms and Conditions</label>

                <p>Welcome to BMA Portal / BMA Website!</p>

                <p>These terms and conditions outline the rules and regulations for the use of BALIWAG MARITIME
                    ACADEMY's Website, located at bma.edu.ph.</p>

                <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use
                    BMA
                    Portal / BMA Website if you do not agree to take all of the terms and conditions stated on this
                    page.</p>

                <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer
                    Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this
                    website
                    and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and
                    "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and
                    ourselves.
                    All terms refer to the offer, acceptance and consideration of payment necessary to undertake the
                    process of our assistance to the Client in the most appropriate manner for the express purpose
                    of
                    meeting the Client’s needs in respect of provision of the Company’s stated services, in
                    accordance
                    with and subject to, prevailing law of Netherlands. Any use of the above terminology or other
                    words
                    in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and
                    therefore as referring to same.</p>

                <label for="" class="h3 fw-bolder text-primary">Cookies</label>

                <p>We employ the use of cookies. By accessing BMA Portal / BMA Website, you agreed to use cookies in
                    agreement with the BALIWAG MARITIME ACADEMY's Privacy Policy. </p>

                <p>Most interactive websites use cookies to let us retrieve the user’s details for each visit.
                    Cookies
                    are used by our website to enable the functionality of certain areas to make it easier for
                    people
                    visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>
                <label for="" class="h3 fw-bolder text-primary">License</label>

                <p>Unless otherwise stated, BALIWAG MARITIME ACADEMY and/or its licensors own the intellectual
                    property
                    rights for all material on BMA Portal / BMA Website. All intellectual property rights are
                    reserved.
                    You may access this from BMA Portal / BMA Website for your own personal use subjected to
                    restrictions set in these terms and conditions.</p>

                <p>You must not:</p>
                <ul>
                    <li>Republish material from BMA Portal / BMA Website</li>
                    <li>Sell, rent or sub-license material from BMA Portal / BMA Website</li>
                    <li>Reproduce, duplicate or copy material from BMA Portal / BMA Website</li>
                    <li>Redistribute content from BMA Portal / BMA Website</li>
                </ul>

                <p>This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the
                    help of
                    the <a href="https://www.privacypolicies.com/blog/sample-terms-conditions-template/">Terms And
                        Conditions Template</a>.</p>

                <p>Parts of this website offer an opportunity for users to post and exchange opinions and
                    information in
                    certain areas of the website. BALIWAG MARITIME ACADEMY does not filter, edit, publish or review
                    Comments prior to their presence on the website. Comments do not reflect the views and opinions
                    of
                    BALIWAG MARITIME ACADEMY,its agents and/or affiliates. Comments reflect the views and opinions
                    of
                    the person who post their views and opinions. To the extent permitted by applicable laws,
                    BALIWAG
                    MARITIME ACADEMY shall not be liable for the Comments or for any liability, damages or expenses
                    caused and/or suffered as a result of any use of and/or posting of and/or appearance of the
                    Comments
                    on this website.</p>

                <p>BALIWAG MARITIME ACADEMY reserves the right to monitor all Comments and to remove any Comments
                    which
                    can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

                <p>You warrant and represent that:</p>

                <ul>
                    <li>You are entitled to post the Comments on our website and have all necessary licenses and
                        consents to do so;</li>
                    <li>The Comments do not invade any intellectual property right, including without limitation
                        copyright, patent or trademark of any third party;</li>
                    <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise
                        unlawful
                        material which is an invasion of privacy</li>
                    <li>The Comments will not be used to solicit or promote business or custom or present commercial
                        activities or unlawful activity.</li>
                </ul>

                <p>You hereby grant BALIWAG MARITIME ACADEMY a non-exclusive license to use, reproduce, edit and
                    authorize others to use, reproduce and edit any of your Comments in any and all forms, formats
                    or
                    media.</p>

                <label for="" class="h3 fw-bolder text-primary">Hyperlinking to our Content</label>


                <p>The following organizations may link to our Website without prior written approval:</p>

                <ul>
                    <li>Government agencies;</li>
                    <li>Search engines;</li>
                    <li>News organizations;</li>
                    <li>Online directory distributors may link to our Website in the same manner as they hyperlink
                        to
                        the Websites of other listed businesses; and</li>
                    <li>System wide Accredited Businesses except soliciting non-profit organizations, charity
                        shopping
                        malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                </ul>

                <p>These organizations may link to our home page, to publications or to other Website information so
                    long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship,
                    endorsement or approval of the linking party and its products and/or services; and (c) fits
                    within
                    the context of the linking party’s site.</p>

                <p>We may consider and approve other link requests from the following types of organizations:</p>

                <ul>
                    <li>commonly-known consumer and/or business information sources;</li>
                    <li>dot.com community sites;</li>
                    <li>associations or other groups representing charities;</li>
                    <li>online directory distributors;</li>
                    <li>internet portals;</li>
                    <li>accounting, law and consulting firms; and</li>
                    <li>educational institutions and trade associations.</li>
                </ul>

                <p>We will approve link requests from these organizations if we decide that: (a) the link would not
                    make
                    us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not
                    have
                    any negative records with us; (c) the benefit to us from the visibility of the hyperlink
                    compensates
                    the absence of BALIWAG MARITIME ACADEMY; and (d) the link is in the context of general resource
                    information.</p>

                <p>These organizations may link to our home page so long as the link: (a) is not in any way
                    deceptive;
                    (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its
                    products or services; and (c) fits within the context of the linking party’s site.</p>

                <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to
                    our
                    website, you must inform us by sending an e-mail to BALIWAG MARITIME ACADEMY. Please include
                    your
                    name, your organization name, contact information as well as the URL of your site, a list of any
                    URLs from which you intend to link to our Website, and a list of the URLs on our site to which
                    you
                    would like to link. Wait 2-3 weeks for a response.</p>

                <p>Approved organizations may hyperlink to our Website as follows:</p>

                <ul>
                    <li>By use of our corporate name; or</li>
                    <li>By use of the uniform resource locator being linked to; or</li>
                    <li>By use of any other description of our Website being linked to that makes sense within the
                        context and format of content on the linking party’s site.</li>
                </ul>

                <p>No use of BALIWAG MARITIME ACADEMY's logo or other artwork will be allowed for linking absent a
                    trademark license agreement.</p>

                <label for="" class="h3 fw-bolder text-primary">IFrames</label>
                <p>Without prior approval and written permission, you may not create frames around our Webpages that
                    alter in any way the visual presentation or appearance of our Website.</p>

                <label for="" class="h3 fw-bolder text-primary">Content Liability</label>

                <p>We shall not be hold responsible for any content that appears on your Website. You agree to
                    protect
                    and defend us against all claims that is rising on your Website. No link(s) should appear on any
                    Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise
                    violates, or advocates the infringement or other violation of, any third party rights.</p>

                <label for="" class="h3 fw-bolder text-primary">Your Privacy</label>
                <p>Please read Privacy Policy <a href="{{ route('website.privacy-policy') }}">click here</a></p>

                <label for="" class="h3 fw-bolder text-primary">Reservation of Rights</label>

                <p>We reserve the right to request that you remove all links or any particular link to our Website.
                    You
                    approve to immediately remove all links to our Website upon request. We also reserve the right
                    to
                    amen these terms and conditions and it’s linking policy at any time. By continuously linking to
                    our
                    Website, you agree to be bound to and follow these linking terms and conditions.</p>


                <label for="" class="h3 fw-bolder text-primary">Removal of links from our website</label>


                <p>If you find any link on our Website that is offensive for any reason, you are free to contact and
                    inform us any moment. We will consider requests to remove links but we are not obligated to or
                    so or
                    to respond to you directly.</p>

                <p>We do not ensure that the information on this website is correct, we do not warrant its
                    completeness
                    or accuracy; nor do we promise to ensure that the website remains available or that the material
                    on
                    the website is kept up to date.</p>

                <label for="" class="h3 fw-bolder text-primary">Disclaimer</label>


                <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and
                    conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                </p>

                <ul>
                    <li>limit or exclude our or your liability for death or personal injury;</li>
                    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                    <li>limit any of our or your liabilities in any way that is not permitted under applicable law;
                        or
                    </li>
                    <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                </ul>

                <p>The limitations and prohibitions of liability set in this Section and elsewhere in this
                    disclaimer:
                    (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the
                    disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
                </p>

                <p>As long as the website and the information and services on the website are provided free of
                    charge,
                    we will not be liable for any loss or damage of any nature.</p>
            </div>
        </model-body>
        <model-footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </model-footer>

    </modal>
</template>
<script>
/* import { VueRecaptcha } from 'vue-recaptcha'; */
import modal from '@/components/bootstrap/modal/modal.vue'
import { SHOW_LOADING_MUTATION, APPLICANT_REGISTRATION_ACTION } from '@/store/storeConstants.js'
import inputComponent from '@/components/main-layouts/components/widgets/input-component.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import { mapMutations, mapActions } from 'vuex'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
export default {
    name: 'AdmissionPage',
    components: { modal, inputComponent, inputComponentV2 },
    data() {
        const formData = {
            firstName: '',
            lastName: '',
            email: '',
            course: '',
            contactNumber: '',
            birthday: '',
            agreement: '',
            message: 'Check you Email for your Password'
        }
        return {
            errors: [],
            networkError: [],
            validateClass: '',
            formData
        }
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        ...mapActions('alert', {
            successAlert: SUCCESS_ALERT,
            infoAlert: INFO_ALERT,
            errorAlert: ERROR_ALERT,
            encrypt: ENCRYPT_DATA
        }),
        ...mapActions('auth', {
            registration: APPLICANT_REGISTRATION_ACTION
        }),
        async applicantRegister() {
            this.showLoading(true)
            this.networkError = []
            this.errors = []
            try {
                await this.registration(this.formData).then(response => {
                    const message = btoa(response.data.message)
                    this.$router.push({ path: '/applicant/login', query: { _m: message } })
                })
            } catch (error) {
                this.errorMessage = error
                if (error.code === 'ERR_NETWORK') {
                    this.networkError = error
                    this.errorAlert(error)
                } else {
                    if (error.response) {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors
                        }
                    }
                }
                this.showLoading(false)
            }
            this.showLoading(false)
        }
        /* async applicantRegister() {
            this.showLoading(true)
            axios.post('applicant/register', this.formData).then((response) => {
                console.log(response)
                this.showLoading(false)
                this.$router.push({ path: '/applicant/login', query: { message: 'Check you Email for your Passowrd' } })
            }).catch((error) => {
                console.error(error)
                if (error.code === 'ERR_NETWORK') {
                    this.networkError = error
                } else {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors
                        console.log(this.errors)
                    }
                }

                this.showLoading(false)
            })
        } */
    }
}

</script>