(function (jQuery) {
    'use strict'
    /* ---------------------------------------------------------------------
        Fieldset
    -----------------------------------------------------------------------*/

    $(document).ready(function () {
        let e; let t; let a; let n; let o = 1
            const r = $('fieldset').length

        function i(e) {
            let t = parseFloat(100 / r) * e
            t = t.toFixed(), $('.progress-bar').css('width', t + '%')
        }
        i(o), $('.next').click(function () {
            e = $(this).parent(), t = $(this).parent().next(), $('#top-tab-list li').eq($('fieldset').index(t)).addClass('active'), $('#top-tab-list li').eq($('fieldset').index(e)).addClass('done'), t.show(), e.animate({
                opacity: 0
            }, {
                step: function (a) {
                    n = 1 - a, e.css({
                        display: 'none',
                        position: 'relative'
                    }), t.css({
                        opacity: n
                    })
                },
                duration: 500
            }), i(++o)
        }), $('.previous').click(function () {
            e = $(this).parent(), a = $(this).parent().prev(), $('#top-tab-list li').eq($('fieldset').index(e)).removeClass('active'), $('#top-tab-list li').eq($('fieldset').index(a)).removeClass('done'), a.show(), e.animate({
                opacity: 0
            }, {
                step: function (t) {
                    n = 1 - t, e.css({
                        display: 'none',
                        position: 'relative'
                    }), a.css({
                        opacity: n
                    })
                },
                duration: 500
            }), i(--o)
        }), $('.submit').click(function () {
            return !1
        })
    }), $(document).ready(function () {
        const e = $('div.setup-panel div a')
            const t = $('.setup-content')
            const a = $('.nextBtn')
        t.hide(), e.click(function (a) {
            a.preventDefault()
            const n = $($(this).attr('href'))
                const o = $(this)
            o.hasClass('disabled') || (e.addClass('active'), o.parent().addClass('active'), t.hide(), n.show(), n.find('input:eq(0)').focus())
        }), a.click(function () {
            const e = $(this).closest('.setup-content')
                const t = e.attr('id')
                const a = $('div.setup-panel div a[href="#' + t + '"]').parent().next().children('a')
                const n = e.find("input[type='text'],input[type='email'],input[type='password'],input[type='url'],textarea")
                let o = !0
            $('.form-group').removeClass('has-error')
            for (let r = 0; r < n.length; r++) n[r].validity.valid || (o = !1, $(n[r]).closest('.form-group').addClass('has-error'))
            o && a.removeAttr('disabled').trigger('click')
        }), $('div.setup-panel div a.active').trigger('click')
    }), $(document).ready(function () {
        let e; let t; let a; let n; let o = 1
            const r = $('fieldset').length

        function i(e) {
            let t = parseFloat(100 / r) * e
            t = t.toFixed(), $('.progress-bar').css('width', t + '%')
        }
        i(o), $('.next').click(function () {
            e = $(this).parent(), t = $(this).parent().next(), $('#top-tabbar-vertical li').eq($('fieldset').index(t)).addClass('active'), t.show(), e.animate({
                opacity: 0
            }, {
                step: function (a) {
                    n = 1 - a, e.css({
                        display: 'none',
                        position: 'relative'
                    }), t.css({
                        opacity: n
                    })
                },
                duration: 500
            }), i(++o)
        }), $('.previous').click(function () {
            e = $(this).parent(), a = $(this).parent().prev(), $('#top-tabbar-vertical li').eq($('fieldset').index(e)).removeClass('active'), a.show(), e.animate({
                opacity: 0
            }, {
                step: function (t) {
                    n = 1 - t, e.css({
                        display: 'none',
                        position: 'relative'
                    }), a.css({
                        opacity: n
                    })
                },
                duration: 500
            }), i(--o)
        }), $('.submit').click(function () {
            return !1
        })
    }), $(document).ready(function () {
        $('.file-upload').on('change', function () {
            !(function (e) {
                if (e.files && e.files[0]) {
                    const t = new FileReader()
                    t.onload = function (e) {
                        $('.profile-pic').attr('src', e.target.result)
                    }, t.readAsDataURL(e.files[0])
                }
            }(this))
        }), $('.upload-button').on('click', function () {
            $('.file-upload').click()
        })
    }), $(function () {
        function e(e) {
            return e / 100 * 360
        }
        $('.progress-round').each(function () {
            const t = $(this).attr('data-value')
                const a = $(this).find('.progress-left .progress-bar')
                const n = $(this).find('.progress-right .progress-bar')
            t > 0 && (t <= 50 ? n.css('transform', 'rotate(' + e(t) + 'deg)') : (n.css('transform', 'rotate(180deg)'), a.css('transform', 'rotate(' + e(t - 50) + 'deg)')))
        })
    })
})(jQuery)