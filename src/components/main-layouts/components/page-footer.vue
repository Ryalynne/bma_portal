<template>
    <footer class="footer py-3 border-top">
        <div class="container-fluid">
            <!-- <div class="row align-items-center bg-white"> -->
                <!-- <div class="col-sm-7 ">
                    <div class=""> -->
                        <!-- <h2 class="">BALIWAG MARITIME ACADEMY</h2> -->
                    <!-- </div> -->
                    <!-- <div class="right-panel"> -->
                    <!-- ©  by <a target="_blank" href="https://iqonic.design/">SIERADATA IT SOLUTIONS</a>. -->
                <!-- </div> -->
            <!-- </div> -->
            <div class="col-sm-7">
                <ul class="list-group list-group-horizontal list-group-flush">
                    <li class="list-inline">
                        <a href="javascript:void(0)">
                            <img src="@/assets/images/brands/gm.svg" alt="gm">
                            <span class="brand-text">www.bma.edu.ph</span>
                        </a>
                    </li>
                    <li class="list-inline">
                        <a href="javascript:void(0)">
                            <img src="@/assets/images/brands/fb.svg" alt="fb">
                            <span class="brand-text">BaliwagMaritimeAcademyOfficial</span>
                        </a>
                    </li>
                    <li class="list-inline">
                        <a href="javascript:void(0)">
                            <img src="@/assets/images/brands/im.svg" alt="im">
                            <span class="brand-text">IM Text</span>
                        </a>
                    </li>
                    <li class="list-inline">
                        <a href="javascript:void(0)">
                            <img src="@/assets/images/brands/li.svg" alt="li">
                            <span class="brand-text">LI Text</span>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- </div> -->
        </div>
    </footer>
</template>
<script>
export default {
    name: 'page-footer'

}
</script>
<style>
.brand-text {
    display: none;
}

/* Show the brand text on hover */
.list-inline:hover .brand-text {
    display: inline;
}

</style>