/* !
FullCalendar Core Package v4.3.1
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/

// Creating
// ----------------------------------------------------------------------------------------------------------------
const elementPropHash = {
    className: true,
    colSpan: true,
    rowSpan: true
}
const containerTagHash = {
    '<tr': 'tbody',
    '<td': 'tr'
}
function createElement(tagName, attrs, content) {
    const el = document.createElement(tagName)
    if (attrs) {
        for (const attrName in attrs) {
            if (attrName === 'style') {
                applyStyle(el, attrs[attrName])
            } else if (elementPropHash[attrName]) {
                el[attrName] = attrs[attrName]
            } else {
                el.setAttribute(attrName, attrs[attrName])
            }
        }
    }
    if (typeof content === 'string') {
        el.innerHTML = content // shortcut. no need to process HTML in any way
    } else if (content != null) {
        appendToElement(el, content)
    }
    return el
}
function htmlToElement(html) {
    html = html.trim()
    const container = document.createElement(computeContainerTag(html))
    container.innerHTML = html
    return container.firstChild
}
function htmlToElements(html) {
    return Array.prototype.slice.call(htmlToNodeList(html))
}
function htmlToNodeList(html) {
    html = html.trim()
    const container = document.createElement(computeContainerTag(html))
    container.innerHTML = html
    return container.childNodes
}
// assumes html already trimmed and tag names are lowercase
function computeContainerTag(html) {
    return containerTagHash[html.substr(0, 3) // faster than using regex
    ] || 'div'
}
function appendToElement(el, content) {
    const childNodes = normalizeContent(content)
    for (let i = 0; i < childNodes.length; i++) {
        el.appendChild(childNodes[i])
    }
}
function prependToElement(parent, content) {
    const newEls = normalizeContent(content)
    const afterEl = parent.firstChild || null // if no firstChild, will append to end, but that's okay, b/c there were no children
    for (let i = 0; i < newEls.length; i++) {
        parent.insertBefore(newEls[i], afterEl)
    }
}
function insertAfterElement(refEl, content) {
    const newEls = normalizeContent(content)
    const afterEl = refEl.nextSibling || null
    for (let i = 0; i < newEls.length; i++) {
        refEl.parentNode.insertBefore(newEls[i], afterEl)
    }
}
function normalizeContent(content) {
    let els
    if (typeof content === 'string') {
        els = htmlToElements(content)
    } else if (content instanceof Node) {
        els = [content]
    } else { // Node[] or NodeList
        els = Array.prototype.slice.call(content)
    }
    return els
}
function removeElement(el) {
    if (el.parentNode) {
        el.parentNode.removeChild(el)
    }
}
// Querying
// ----------------------------------------------------------------------------------------------------------------
// from https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
const matchesMethod = Element.prototype.matches ||
    Element.prototype.matchesSelector ||
    Element.prototype.msMatchesSelector
const closestMethod = Element.prototype.closest || function (selector) {
    // polyfill
    let el = this
    if (!document.documentElement.contains(el)) {
        return null
    }
    do {
        if (elementMatches(el, selector)) {
            return el
        }
        el = el.parentElement || el.parentNode
    } while (el !== null && el.nodeType === 1)
    return null
}
function elementClosest(el, selector) {
    return closestMethod.call(el, selector)
}
function elementMatches(el, selector) {
    return matchesMethod.call(el, selector)
}
// accepts multiple subject els
// returns a real array. good for methods like forEach
function findElements(container, selector) {
    const containers = container instanceof HTMLElement ? [container] : container
    const allMatches = []
    for (let i = 0; i < containers.length; i++) {
        const matches = containers[i].querySelectorAll(selector)
        for (let j = 0; j < matches.length; j++) {
            allMatches.push(matches[j])
        }
    }
    return allMatches
}
// accepts multiple subject els
// only queries direct child elements
function findChildren(parent, selector) {
    const parents = parent instanceof HTMLElement ? [parent] : parent
    const allMatches = []
    for (let i = 0; i < parents.length; i++) {
        const childNodes = parents[i].children // only ever elements
        for (let j = 0; j < childNodes.length; j++) {
            const childNode = childNodes[j]
            if (!selector || elementMatches(childNode, selector)) {
                allMatches.push(childNode)
            }
        }
    }
    return allMatches
}
// Attributes
// ----------------------------------------------------------------------------------------------------------------
function forceClassName(el, className, bool) {
    if (bool) {
        el.classList.add(className)
    } else {
        el.classList.remove(className)
    }
}
// Style
// ----------------------------------------------------------------------------------------------------------------
const PIXEL_PROP_RE = /(top|left|right|bottom|width|height)$/i
function applyStyle(el, props) {
    for (const propName in props) {
        applyStyleProp(el, propName, props[propName])
    }
}
function applyStyleProp(el, name, val) {
    if (val == null) {
        el.style[name] = ''
    } else if (typeof val === 'number' && PIXEL_PROP_RE.test(name)) {
        el.style[name] = val + 'px'
    } else {
        el.style[name] = val
    }
}

function pointInsideRect(point, rect) {
    return point.left >= rect.left &&
        point.left < rect.right &&
        point.top >= rect.top &&
        point.top < rect.bottom
}
// Returns a new rectangle that is the intersection of the two rectangles. If they don't intersect, returns false
function intersectRects(rect1, rect2) {
    const res = {
        left: Math.max(rect1.left, rect2.left),
        right: Math.min(rect1.right, rect2.right),
        top: Math.max(rect1.top, rect2.top),
        bottom: Math.min(rect1.bottom, rect2.bottom)
    }
    if (res.left < res.right && res.top < res.bottom) {
        return res
    }
    return false
}
function translateRect(rect, deltaX, deltaY) {
    return {
        left: rect.left + deltaX,
        right: rect.right + deltaX,
        top: rect.top + deltaY,
        bottom: rect.bottom + deltaY
    }
}
// Returns a new point that will have been moved to reside within the given rectangle
function constrainPoint(point, rect) {
    return {
        left: Math.min(Math.max(point.left, rect.left), rect.right),
        top: Math.min(Math.max(point.top, rect.top), rect.bottom)
    }
}
// Returns a point that is the center of the given rectangle
function getRectCenter(rect) {
    return {
        left: (rect.left + rect.right) / 2,
        top: (rect.top + rect.bottom) / 2
    }
}
// Subtracts point2's coordinates from point1's coordinates, returning a delta
function diffPoints(point1, point2) {
    return {
        left: point1.left - point2.left,
        top: point1.top - point2.top
    }
}

// Logic for determining if, when the element is right-to-left, the scrollbar appears on the left side
let isRtlScrollbarOnLeft = null
function getIsRtlScrollbarOnLeft() {
    if (isRtlScrollbarOnLeft === null) {
        isRtlScrollbarOnLeft = computeIsRtlScrollbarOnLeft()
    }
    return isRtlScrollbarOnLeft
}
function computeIsRtlScrollbarOnLeft() {
    const outerEl = createElement('div', {
        style: {
            position: 'absolute',
            top: -1000,
            left: 0,
            border: 0,
            padding: 0,
            overflow: 'scroll',
            direction: 'rtl'
        }
    }, '<div></div>')
    document.body.appendChild(outerEl)
    const innerEl = outerEl.firstChild
    const res = innerEl.getBoundingClientRect().left > outerEl.getBoundingClientRect().left
    removeElement(outerEl)
    return res
}
// The scrollbar width computations in computeEdges are sometimes flawed when it comes to
// retina displays, rounding, and IE11. Massage them into a usable value.
function sanitizeScrollbarWidth(width) {
    width = Math.max(0, width) // no negatives
    width = Math.round(width)
    return width
}

function computeEdges(el, getPadding) {
    if (getPadding === void 0) { getPadding = false }
    const computedStyle = window.getComputedStyle(el)
    const borderLeft = parseInt(computedStyle.borderLeftWidth, 10) || 0
    const borderRight = parseInt(computedStyle.borderRightWidth, 10) || 0
    const borderTop = parseInt(computedStyle.borderTopWidth, 10) || 0
    const borderBottom = parseInt(computedStyle.borderBottomWidth, 10) || 0
    // must use offset(Width|Height) because compatible with client(Width|Height)
    const scrollbarLeftRight = sanitizeScrollbarWidth(el.offsetWidth - el.clientWidth - borderLeft - borderRight)
    const scrollbarBottom = sanitizeScrollbarWidth(el.offsetHeight - el.clientHeight - borderTop - borderBottom)
    const res = {
        borderLeft,
        borderRight,
        borderTop,
        borderBottom,
        scrollbarBottom,
        scrollbarLeft: 0,
        scrollbarRight: 0
    }
    if (getIsRtlScrollbarOnLeft() && computedStyle.direction === 'rtl') { // is the scrollbar on the left side?
        res.scrollbarLeft = scrollbarLeftRight
    } else {
        res.scrollbarRight = scrollbarLeftRight
    }
    if (getPadding) {
        res.paddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0
        res.paddingRight = parseInt(computedStyle.paddingRight, 10) || 0
        res.paddingTop = parseInt(computedStyle.paddingTop, 10) || 0
        res.paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0
    }
    return res
}
function computeInnerRect(el, goWithinPadding) {
    if (goWithinPadding === void 0) { goWithinPadding = false }
    const outerRect = computeRect(el)
    const edges = computeEdges(el, goWithinPadding)
    const res = {
        left: outerRect.left + edges.borderLeft + edges.scrollbarLeft,
        right: outerRect.right - edges.borderRight - edges.scrollbarRight,
        top: outerRect.top + edges.borderTop,
        bottom: outerRect.bottom - edges.borderBottom - edges.scrollbarBottom
    }
    if (goWithinPadding) {
        res.left += edges.paddingLeft
        res.right -= edges.paddingRight
        res.top += edges.paddingTop
        res.bottom -= edges.paddingBottom
    }
    return res
}
function computeRect(el) {
    const rect = el.getBoundingClientRect()
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        right: rect.right + window.pageXOffset,
        bottom: rect.bottom + window.pageYOffset
    }
}
function computeViewportRect() {
    return {
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        top: window.pageYOffset,
        bottom: window.pageYOffset + document.documentElement.clientHeight
    }
}
function computeHeightAndMargins(el) {
    return el.getBoundingClientRect().height + computeVMargins(el)
}
function computeVMargins(el) {
    const computed = window.getComputedStyle(el)
    return parseInt(computed.marginTop, 10) +
        parseInt(computed.marginBottom, 10)
}
// does not return window
function getClippingParents(el) {
    const parents = []
    while (el instanceof HTMLElement) { // will stop when gets to document or null
        const computedStyle = window.getComputedStyle(el)
        if (computedStyle.position === 'fixed') {
            break
        }
        if ((/(auto|scroll)/).test(computedStyle.overflow + computedStyle.overflowY + computedStyle.overflowX)) {
            parents.push(el)
        }
        el = el.parentNode
    }
    return parents
}
function computeClippingRect(el) {
    return getClippingParents(el)
        .map(function (el) {
        return computeInnerRect(el)
    })
        .concat(computeViewportRect())
        .reduce(function (rect0, rect1) {
        return intersectRects(rect0, rect1) || rect1 // should always intersect
    })
}

// Stops a mouse/touch event from doing it's native browser action
function preventDefault(ev) {
    ev.preventDefault()
}
// Event Delegation
// ----------------------------------------------------------------------------------------------------------------
function listenBySelector(container, eventType, selector, handler) {
    function realHandler(ev) {
        const matchedChild = elementClosest(ev.target, selector)
        if (matchedChild) {
            handler.call(matchedChild, ev, matchedChild)
        }
    }
    container.addEventListener(eventType, realHandler)
    return function () {
        container.removeEventListener(eventType, realHandler)
    }
}
function listenToHoverBySelector(container, selector, onMouseEnter, onMouseLeave) {
    let currentMatchedChild
    return listenBySelector(container, 'mouseover', selector, function (ev, matchedChild) {
        if (matchedChild !== currentMatchedChild) {
            currentMatchedChild = matchedChild
            onMouseEnter(ev, matchedChild)
            var realOnMouseLeave_1 = function (ev) {
                currentMatchedChild = null
                onMouseLeave(ev, matchedChild)
                matchedChild.removeEventListener('mouseleave', realOnMouseLeave_1)
            }
            // listen to the next mouseleave, and then unattach
            matchedChild.addEventListener('mouseleave', realOnMouseLeave_1)
        }
    })
}
// Animation
// ----------------------------------------------------------------------------------------------------------------
const transitionEventNames = [
    'webkitTransitionEnd',
    'otransitionend',
    'oTransitionEnd',
    'msTransitionEnd',
    'transitionend'
]
// triggered only when the next single subsequent transition finishes
function whenTransitionDone(el, callback) {
    var realCallback = function (ev) {
        callback(ev)
        transitionEventNames.forEach(function (eventName) {
            el.removeEventListener(eventName, realCallback)
        })
    }
    transitionEventNames.forEach(function (eventName) {
        el.addEventListener(eventName, realCallback) // cross-browser way to determine when the transition finishes
    })
}

const DAY_IDS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
// Adding
function addWeeks(m, n) {
    const a = dateToUtcArray(m)
    a[2] += n * 7
    return arrayToUtcDate(a)
}
function addDays(m, n) {
    const a = dateToUtcArray(m)
    a[2] += n
    return arrayToUtcDate(a)
}
function addMs(m, n) {
    const a = dateToUtcArray(m)
    a[6] += n
    return arrayToUtcDate(a)
}
// Diffing (all return floats)
function diffWeeks(m0, m1) {
    return diffDays(m0, m1) / 7
}
function diffDays(m0, m1) {
    return (m1.valueOf() - m0.valueOf()) / (1000 * 60 * 60 * 24)
}
function diffHours(m0, m1) {
    return (m1.valueOf() - m0.valueOf()) / (1000 * 60 * 60)
}
function diffMinutes(m0, m1) {
    return (m1.valueOf() - m0.valueOf()) / (1000 * 60)
}
function diffSeconds(m0, m1) {
    return (m1.valueOf() - m0.valueOf()) / 1000
}
function diffDayAndTime(m0, m1) {
    const m0day = startOfDay(m0)
    const m1day = startOfDay(m1)
    return {
        years: 0,
        months: 0,
        days: Math.round(diffDays(m0day, m1day)),
        milliseconds: (m1.valueOf() - m1day.valueOf()) - (m0.valueOf() - m0day.valueOf())
    }
}
// Diffing Whole Units
function diffWholeWeeks(m0, m1) {
    const d = diffWholeDays(m0, m1)
    if (d !== null && d % 7 === 0) {
        return d / 7
    }
    return null
}
function diffWholeDays(m0, m1) {
    if (timeAsMs(m0) === timeAsMs(m1)) {
        return Math.round(diffDays(m0, m1))
    }
    return null
}
// Start-Of
function startOfDay(m) {
    return arrayToUtcDate([
        m.getUTCFullYear(),
        m.getUTCMonth(),
        m.getUTCDate()
    ])
}
function startOfHour(m) {
    return arrayToUtcDate([
        m.getUTCFullYear(),
        m.getUTCMonth(),
        m.getUTCDate(),
        m.getUTCHours()
    ])
}
function startOfMinute(m) {
    return arrayToUtcDate([
        m.getUTCFullYear(),
        m.getUTCMonth(),
        m.getUTCDate(),
        m.getUTCHours(),
        m.getUTCMinutes()
    ])
}
function startOfSecond(m) {
    return arrayToUtcDate([
        m.getUTCFullYear(),
        m.getUTCMonth(),
        m.getUTCDate(),
        m.getUTCHours(),
        m.getUTCMinutes(),
        m.getUTCSeconds()
    ])
}
// Week Computation
function weekOfYear(marker, dow, doy) {
    const y = marker.getUTCFullYear()
    const w = weekOfGivenYear(marker, y, dow, doy)
    if (w < 1) {
        return weekOfGivenYear(marker, y - 1, dow, doy)
    }
    const nextW = weekOfGivenYear(marker, y + 1, dow, doy)
    if (nextW >= 1) {
        return Math.min(w, nextW)
    }
    return w
}
function weekOfGivenYear(marker, year, dow, doy) {
    const firstWeekStart = arrayToUtcDate([year, 0, 1 + firstWeekOffset(year, dow, doy)])
    const dayStart = startOfDay(marker)
    const days = Math.round(diffDays(firstWeekStart, dayStart))
    return Math.floor(days / 7) + 1 // zero-indexed
}
// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    const fwd = 7 + dow - doy
    // first-week day local weekday -- which local weekday is fwd
    const fwdlw = (7 + arrayToUtcDate([year, 0, fwd]).getUTCDay() - dow) % 7
    return -fwdlw + fwd - 1
}
// Array Conversion
function dateToLocalArray(date) {
    return [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ]
}
function arrayToLocalDate(a) {
    return new Date(a[0], a[1] || 0, a[2] == null ? 1 : a[2], // day of month
    a[3] || 0, a[4] || 0, a[5] || 0)
}
function dateToUtcArray(date) {
    return [
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds()
    ]
}
function arrayToUtcDate(a) {
    // according to web standards (and Safari), a month index is required.
    // massage if only given a year.
    if (a.length === 1) {
        a = a.concat([0])
    }
    return new Date(Date.UTC.apply(Date, a))
}
// Other Utils
function isValidDate(m) {
    return !isNaN(m.valueOf())
}
function timeAsMs(m) {
    return m.getUTCHours() * 1000 * 60 * 60 +
        m.getUTCMinutes() * 1000 * 60 +
        m.getUTCSeconds() * 1000 +
        m.getUTCMilliseconds()
}

const INTERNAL_UNITS = ['years', 'months', 'days', 'milliseconds']
const PARSE_RE = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/
// Parsing and Creation
function createDuration(input, unit) {
    let _a
    if (typeof input === 'string') {
        return parseString(input)
    } else if (typeof input === 'object' && input) { // non-null object
        return normalizeObject(input)
    } else if (typeof input === 'number') {
        return normalizeObject((_a = {}, _a[unit || 'milliseconds'] = input, _a))
    } else {
        return null
    }
}
function parseString(s) {
    const m = PARSE_RE.exec(s)
    if (m) {
        const sign = m[1] ? -1 : 1
        return {
            years: 0,
            months: 0,
            days: sign * (m[2] ? parseInt(m[2], 10) : 0),
            milliseconds: sign * ((m[3] ? parseInt(m[3], 10) : 0) * 60 * 60 * 1000 + // hours
                (m[4] ? parseInt(m[4], 10) : 0) * 60 * 1000 + // minutes
                (m[5] ? parseInt(m[5], 10) : 0) * 1000 + // seconds
                (m[6] ? parseInt(m[6], 10) : 0) // ms
            )
        }
    }
    return null
}
function normalizeObject(obj) {
    return {
        years: obj.years || obj.year || 0,
        months: obj.months || obj.month || 0,
        days: (obj.days || obj.day || 0) +
            getWeeksFromInput(obj) * 7,
        milliseconds: (obj.hours || obj.hour || 0) * 60 * 60 * 1000 + // hours
            (obj.minutes || obj.minute || 0) * 60 * 1000 + // minutes
            (obj.seconds || obj.second || 0) * 1000 + // seconds
            (obj.milliseconds || obj.millisecond || obj.ms || 0) // ms
    }
}
function getWeeksFromInput(obj) {
    return obj.weeks || obj.week || 0
}
// Equality
function durationsEqual(d0, d1) {
    return d0.years === d1.years &&
        d0.months === d1.months &&
        d0.days === d1.days &&
        d0.milliseconds === d1.milliseconds
}
function isSingleDay(dur) {
    return dur.years === 0 && dur.months === 0 && dur.days === 1 && dur.milliseconds === 0
}
// Simple Math
function addDurations(d0, d1) {
    return {
        years: d0.years + d1.years,
        months: d0.months + d1.months,
        days: d0.days + d1.days,
        milliseconds: d0.milliseconds + d1.milliseconds
    }
}
function subtractDurations(d1, d0) {
    return {
        years: d1.years - d0.years,
        months: d1.months - d0.months,
        days: d1.days - d0.days,
        milliseconds: d1.milliseconds - d0.milliseconds
    }
}
function multiplyDuration(d, n) {
    return {
        years: d.years * n,
        months: d.months * n,
        days: d.days * n,
        milliseconds: d.milliseconds * n
    }
}
// Conversions
// "Rough" because they are based on average-case Gregorian months/years
function asRoughYears(dur) {
    return asRoughDays(dur) / 365
}
function asRoughMonths(dur) {
    return asRoughDays(dur) / 30
}
function asRoughDays(dur) {
    return asRoughMs(dur) / 864e5
}
function asRoughMinutes(dur) {
    return asRoughMs(dur) / (1000 * 60)
}
function asRoughSeconds(dur) {
    return asRoughMs(dur) / 1000
}
function asRoughMs(dur) {
    return dur.years * (365 * 864e5) +
        dur.months * (30 * 864e5) +
        dur.days * 864e5 +
        dur.milliseconds
}
// Advanced Math
function wholeDivideDurations(numerator, denominator) {
    let res = null
    for (let i = 0; i < INTERNAL_UNITS.length; i++) {
        const unit = INTERNAL_UNITS[i]
        if (denominator[unit]) {
            const localRes = numerator[unit] / denominator[unit]
            if (!isInt(localRes) || (res !== null && res !== localRes)) {
                return null
            }
            res = localRes
        } else if (numerator[unit]) {
            // needs to divide by something but can't!
            return null
        }
    }
    return res
}
function greatestDurationDenominator(dur, dontReturnWeeks) {
    const ms = dur.milliseconds
    if (ms) {
        if (ms % 1000 !== 0) {
            return { unit: 'millisecond', value: ms }
        }
        if (ms % (1000 * 60) !== 0) {
            return { unit: 'second', value: ms / 1000 }
        }
        if (ms % (1000 * 60 * 60) !== 0) {
            return { unit: 'minute', value: ms / (1000 * 60) }
        }
        if (ms) {
            return { unit: 'hour', value: ms / (1000 * 60 * 60) }
        }
    }
    if (dur.days) {
        if (!dontReturnWeeks && dur.days % 7 === 0) {
            return { unit: 'week', value: dur.days / 7 }
        }
        return { unit: 'day', value: dur.days }
    }
    if (dur.months) {
        return { unit: 'month', value: dur.months }
    }
    if (dur.years) {
        return { unit: 'year', value: dur.years }
    }
    return { unit: 'millisecond', value: 0 }
}

/* FullCalendar-specific DOM Utilities
----------------------------------------------------------------------------------------------------------------------*/
// Given the scrollbar widths of some other container, create borders/margins on rowEls in order to match the left
// and right space that was offset by the scrollbars. A 1-pixel border first, then margin beyond that.
function compensateScroll(rowEl, scrollbarWidths) {
    if (scrollbarWidths.left) {
        applyStyle(rowEl, {
            borderLeftWidth: 1,
            marginLeft: scrollbarWidths.left - 1
        })
    }
    if (scrollbarWidths.right) {
        applyStyle(rowEl, {
            borderRightWidth: 1,
            marginRight: scrollbarWidths.right - 1
        })
    }
}
// Undoes compensateScroll and restores all borders/margins
function uncompensateScroll(rowEl) {
    applyStyle(rowEl, {
        marginLeft: '',
        marginRight: '',
        borderLeftWidth: '',
        borderRightWidth: ''
    })
}
// Make the mouse cursor express that an event is not allowed in the current area
function disableCursor() {
    document.body.classList.add('fc-not-allowed')
}
// Returns the mouse cursor to its original look
function enableCursor() {
    document.body.classList.remove('fc-not-allowed')
}
// Given a total available height to fill, have `els` (essentially child rows) expand to accomodate.
// By default, all elements that are shorter than the recommended height are expanded uniformly, not considering
// any other els that are already too tall. if `shouldRedistribute` is on, it considers these tall rows and
// reduces the available height.
function distributeHeight(els, availableHeight, shouldRedistribute) {
    // *FLOORING NOTE*: we floor in certain places because zoom can give inaccurate floating-point dimensions,
    // and it is better to be shorter than taller, to avoid creating unnecessary scrollbars.
    let minOffset1 = Math.floor(availableHeight / els.length) // for non-last element
    let minOffset2 = Math.floor(availableHeight - minOffset1 * (els.length - 1)) // for last element *FLOORING NOTE*
    const flexEls = [] // elements that are allowed to expand. array of DOM nodes
    const flexOffsets = [] // amount of vertical space it takes up
    const flexHeights = [] // actual css height
    let usedHeight = 0
    undistributeHeight(els) // give all elements their natural height
    // find elements that are below the recommended height (expandable).
    // important to query for heights in a single first pass (to avoid reflow oscillation).
    els.forEach(function (el, i) {
        const minOffset = i === els.length - 1 ? minOffset2 : minOffset1
        const naturalHeight = el.getBoundingClientRect().height
        const naturalOffset = naturalHeight + computeVMargins(el)
        if (naturalOffset < minOffset) {
            flexEls.push(el)
            flexOffsets.push(naturalOffset)
            flexHeights.push(naturalHeight)
        } else {
            // this element stretches past recommended height (non-expandable). mark the space as occupied.
            usedHeight += naturalOffset
        }
    })
    // readjust the recommended height to only consider the height available to non-maxed-out rows.
    if (shouldRedistribute) {
        availableHeight -= usedHeight
        minOffset1 = Math.floor(availableHeight / flexEls.length)
        minOffset2 = Math.floor(availableHeight - minOffset1 * (flexEls.length - 1)) // *FLOORING NOTE*
    }
    // assign heights to all expandable elements
    flexEls.forEach(function (el, i) {
        const minOffset = i === flexEls.length - 1 ? minOffset2 : minOffset1
        const naturalOffset = flexOffsets[i]
        const naturalHeight = flexHeights[i]
        const newHeight = minOffset - (naturalOffset - naturalHeight) // subtract the margin/padding
        if (naturalOffset < minOffset) { // we check this again because redistribution might have changed things
            el.style.height = newHeight + 'px'
        }
    })
}
// Undoes distrubuteHeight, restoring all els to their natural height
function undistributeHeight(els) {
    els.forEach(function (el) {
        el.style.height = ''
    })
}
// Given `els`, a set of <td> cells, find the cell with the largest natural width and set the widths of all the
// cells to be that width.
// PREREQUISITE: if you want a cell to take up width, it needs to have a single inner element w/ display:inline
function matchCellWidths(els) {
    let maxInnerWidth = 0
    els.forEach(function (el) {
        const innerEl = el.firstChild // hopefully an element
        if (innerEl instanceof HTMLElement) {
            const innerWidth_1 = innerEl.getBoundingClientRect().width
            if (innerWidth_1 > maxInnerWidth) {
                maxInnerWidth = innerWidth_1
            }
        }
    })
    maxInnerWidth++ // sometimes not accurate of width the text needs to stay on one line. insurance
    els.forEach(function (el) {
        el.style.width = maxInnerWidth + 'px'
    })
    return maxInnerWidth
}
// Given one element that resides inside another,
// Subtracts the height of the inner element from the outer element.
function subtractInnerElHeight(outerEl, innerEl) {
    // effin' IE8/9/10/11 sometimes returns 0 for dimensions. this weird hack was the only thing that worked
    const reflowStyleProps = {
        position: 'relative',
        left: -1 // ensure reflow in case the el was already relative. negative is less likely to cause new scroll
    }
    applyStyle(outerEl, reflowStyleProps)
    applyStyle(innerEl, reflowStyleProps)
    const diff = // grab the dimensions
     outerEl.getBoundingClientRect().height -
        innerEl.getBoundingClientRect().height
    // undo hack
    const resetStyleProps = { position: '', left: '' }
    applyStyle(outerEl, resetStyleProps)
    applyStyle(innerEl, resetStyleProps)
    return diff
}
/* Selection
----------------------------------------------------------------------------------------------------------------------*/
function preventSelection(el) {
    el.classList.add('fc-unselectable')
    el.addEventListener('selectstart', preventDefault)
}
function allowSelection(el) {
    el.classList.remove('fc-unselectable')
    el.removeEventListener('selectstart', preventDefault)
}
/* Context Menu
----------------------------------------------------------------------------------------------------------------------*/
function preventContextMenu(el) {
    el.addEventListener('contextmenu', preventDefault)
}
function allowContextMenu(el) {
    el.removeEventListener('contextmenu', preventDefault)
}
/* Object Ordering by Field
----------------------------------------------------------------------------------------------------------------------*/
function parseFieldSpecs(input) {
    const specs = []
    let tokens = []
    let i
    let token
    if (typeof input === 'string') {
        tokens = input.split(/\s*,\s*/)
    } else if (typeof input === 'function') {
        tokens = [input]
    } else if (Array.isArray(input)) {
        tokens = input
    }
    for (i = 0; i < tokens.length; i++) {
        token = tokens[i]
        if (typeof token === 'string') {
            specs.push(token.charAt(0) === '-'
                ? { field: token.substring(1), order: -1 }
                : { field: token, order: 1 })
        } else if (typeof token === 'function') {
            specs.push({ func: token })
        }
    }
    return specs
}
function compareByFieldSpecs(obj0, obj1, fieldSpecs) {
    let i
    let cmp
    for (i = 0; i < fieldSpecs.length; i++) {
        cmp = compareByFieldSpec(obj0, obj1, fieldSpecs[i])
        if (cmp) {
            return cmp
        }
    }
    return 0
}
function compareByFieldSpec(obj0, obj1, fieldSpec) {
    if (fieldSpec.func) {
        return fieldSpec.func(obj0, obj1)
    }
    return flexibleCompare(obj0[fieldSpec.field], obj1[fieldSpec.field]) *
        (fieldSpec.order || 1)
}
function flexibleCompare(a, b) {
    if (!a && !b) {
        return 0
    }
    if (b == null) {
        return -1
    }
    if (a == null) {
        return 1
    }
    if (typeof a === 'string' || typeof b === 'string') {
        return String(a).localeCompare(String(b))
    }
    return a - b
}
/* String Utilities
----------------------------------------------------------------------------------------------------------------------*/
function capitaliseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
function padStart(val, len) {
    const s = String(val)
    return '000'.substr(0, len - s.length) + s
}
/* Number Utilities
----------------------------------------------------------------------------------------------------------------------*/
function compareNumbers(a, b) {
    return a - b
}
function isInt(n) {
    return n % 1 === 0
}
/* Weird Utilities
----------------------------------------------------------------------------------------------------------------------*/
function applyAll(functions, thisObj, args) {
    if (typeof functions === 'function') { // supplied a single function
        functions = [functions]
    }
    if (functions) {
        let i = void 0
        let ret = void 0
        for (i = 0; i < functions.length; i++) {
            ret = functions[i].apply(thisObj, args) || ret
        }
        return ret
    }
}
function firstDefined() {
    const args = []
    for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i]
    }
    for (let i = 0; i < args.length; i++) {
        if (args[i] !== undefined) {
            return args[i]
        }
    }
}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// https://github.com/jashkenas/underscore/blob/1.6.0/underscore.js#L714
function debounce(func, wait) {
    let timeout
    let args
    let context
    let timestamp
    let result
    var later = function () {
        const last = new Date().valueOf() - timestamp
        if (last < wait) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            result = func.apply(context, args)
            context = args = null
        }
    }
    return function () {
        context = this
        args = arguments
        timestamp = new Date().valueOf()
        if (!timeout) {
            timeout = setTimeout(later, wait)
        }
        return result
    }
}
// Number and Boolean are only types that defaults or not computed for
// TODO: write more comments
function refineProps(rawProps, processors, defaults, leftoverProps) {
    if (defaults === void 0) { defaults = {} }
    const refined = {}
    for (var key in processors) {
        const processor = processors[key]
        if (rawProps[key] !== undefined) {
            // found
            if (processor === Function) {
                refined[key] = typeof rawProps[key] === 'function' ? rawProps[key] : null
            } else if (processor) { // a refining function?
                refined[key] = processor(rawProps[key])
            } else {
                refined[key] = rawProps[key]
            }
        } else if (defaults[key] !== undefined) {
            // there's an explicit default
            refined[key] = defaults[key]
        } else {
            // must compute a default
            if (processor === String) {
                refined[key] = '' // empty string is default for String
            } else if (!processor || processor === Number || processor === Boolean || processor === Function) {
                refined[key] = null // assign null for other non-custom processor funcs
            } else {
                refined[key] = processor(null) // run the custom processor func
            }
        }
    }
    if (leftoverProps) {
        for (var key in rawProps) {
            if (processors[key] === undefined) {
                leftoverProps[key] = rawProps[key]
            }
        }
    }
    return refined
}
/* Date stuff that doesn't belong in datelib core
----------------------------------------------------------------------------------------------------------------------*/
// given a timed range, computes an all-day range that has the same exact duration,
// but whose start time is aligned with the start of the day.
function computeAlignedDayRange(timedRange) {
    const dayCnt = Math.floor(diffDays(timedRange.start, timedRange.end)) || 1
    const start = startOfDay(timedRange.start)
    const end = addDays(start, dayCnt)
    return { start, end }
}
// given a timed range, computes an all-day range based on how for the end date bleeds into the next day
// TODO: give nextDayThreshold a default arg
function computeVisibleDayRange(timedRange, nextDayThreshold) {
    if (nextDayThreshold === void 0) { nextDayThreshold = createDuration(0) }
    let startDay = null
    let endDay = null
    if (timedRange.end) {
        endDay = startOfDay(timedRange.end)
        const endTimeMS = timedRange.end.valueOf() - endDay.valueOf() // # of milliseconds into `endDay`
        // If the end time is actually inclusively part of the next day and is equal to or
        // beyond the next day threshold, adjust the end to be the exclusive end of `endDay`.
        // Otherwise, leaving it as inclusive will cause it to exclude `endDay`.
        if (endTimeMS && endTimeMS >= asRoughMs(nextDayThreshold)) {
            endDay = addDays(endDay, 1)
        }
    }
    if (timedRange.start) {
        startDay = startOfDay(timedRange.start) // the beginning of the day the range starts
        // If end is within `startDay` but not past nextDayThreshold, assign the default duration of one day.
        if (endDay && endDay <= startDay) {
            endDay = addDays(startDay, 1)
        }
    }
    return { start: startDay, end: endDay }
}
// spans from one day into another?
function isMultiDayRange(range) {
    const visibleRange = computeVisibleDayRange(range)
    return diffDays(visibleRange.start, visibleRange.end) > 1
}
function diffDates(date0, date1, dateEnv, largeUnit) {
    if (largeUnit === 'year') {
        return createDuration(dateEnv.diffWholeYears(date0, date1), 'year')
    } else if (largeUnit === 'month') {
        return createDuration(dateEnv.diffWholeMonths(date0, date1), 'month')
    } else {
        return diffDayAndTime(date0, date1) // returns a duration
    }
}

/* ! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b }) ||
        function (d, b) { for (const p in b) if (b.hasOwnProperty(p)) d[p] = b[p] }
    return extendStatics(d, b)
}

function __extends(d, b) {
    extendStatics(d, b)
    function __() { this.constructor = d }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __())
}

var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
    }
    return __assign.apply(this, arguments)
}

function parseRecurring(eventInput, allDayDefault, dateEnv, recurringTypes, leftovers) {
    for (let i = 0; i < recurringTypes.length; i++) {
        const localLeftovers = {}
        const parsed = recurringTypes[i].parse(eventInput, localLeftovers, dateEnv)
        if (parsed) {
            let allDay = localLeftovers.allDay
            delete localLeftovers.allDay // remove from leftovers
            if (allDay == null) {
                allDay = allDayDefault
                if (allDay == null) {
                    allDay = parsed.allDayGuess
                    if (allDay == null) {
                        allDay = false
                    }
                }
            }
            __assign(leftovers, localLeftovers)
            return {
                allDay,
                duration: parsed.duration,
                typeData: parsed.typeData,
                typeId: i
            }
        }
    }
    return null
}
/*
Event MUST have a recurringDef
*/
function expandRecurringRanges(eventDef, duration, framingRange, dateEnv, recurringTypes) {
    const typeDef = recurringTypes[eventDef.recurringDef.typeId]
    let markers = typeDef.expand(eventDef.recurringDef.typeData, {
        start: dateEnv.subtract(framingRange.start, duration),
        end: framingRange.end
    }, dateEnv)
    // the recurrence plugins don't guarantee that all-day events are start-of-day, so we have to
    if (eventDef.allDay) {
        markers = markers.map(startOfDay)
    }
    return markers
}

const hasOwnProperty = Object.prototype.hasOwnProperty
// Merges an array of objects into a single object.
// The second argument allows for an array of property names who's object values will be merged together.
function mergeProps(propObjs, complexProps) {
    const dest = {}
    let i
    let name
    let complexObjs
    let j
    let val
    let props
    if (complexProps) {
        for (i = 0; i < complexProps.length; i++) {
            name = complexProps[i]
            complexObjs = []
            // collect the trailing object values, stopping when a non-object is discovered
            for (j = propObjs.length - 1; j >= 0; j--) {
                val = propObjs[j][name]
                if (typeof val === 'object' && val) { // non-null object
                    complexObjs.unshift(val)
                } else if (val !== undefined) {
                    dest[name] = val // if there were no objects, this value will be used
                    break
                }
            }
            // if the trailing values were objects, use the merged value
            if (complexObjs.length) {
                dest[name] = mergeProps(complexObjs)
            }
        }
    }
    // copy values into the destination, going from last to first
    for (i = propObjs.length - 1; i >= 0; i--) {
        props = propObjs[i]
        for (name in props) {
            if (!(name in dest)) { // if already assigned by previous props or complex props, don't reassign
                dest[name] = props[name]
            }
        }
    }
    return dest
}
function filterHash(hash, func) {
    const filtered = {}
    for (const key in hash) {
        if (func(hash[key], key)) {
            filtered[key] = hash[key]
        }
    }
    return filtered
}
function mapHash(hash, func) {
    const newHash = {}
    for (const key in hash) {
        newHash[key] = func(hash[key], key)
    }
    return newHash
}
function arrayToHash(a) {
    const hash = {}
    for (let _i = 0, a_1 = a; _i < a_1.length; _i++) {
        const item = a_1[_i]
        hash[item] = true
    }
    return hash
}
function hashValuesToArray(obj) {
    const a = []
    for (const key in obj) {
        a.push(obj[key])
    }
    return a
}
function isPropsEqual(obj0, obj1) {
    for (var key in obj0) {
        if (hasOwnProperty.call(obj0, key)) {
            if (!(key in obj1)) {
                return false
            }
        }
    }
    for (var key in obj1) {
        if (hasOwnProperty.call(obj1, key)) {
            if (obj0[key] !== obj1[key]) {
                return false
            }
        }
    }
    return true
}

function parseEvents(rawEvents, sourceId, calendar, allowOpenRange) {
    const eventStore = createEmptyEventStore()
    for (let _i = 0, rawEvents_1 = rawEvents; _i < rawEvents_1.length; _i++) {
        const rawEvent = rawEvents_1[_i]
        const tuple = parseEvent(rawEvent, sourceId, calendar, allowOpenRange)
        if (tuple) {
            eventTupleToStore(tuple, eventStore)
        }
    }
    return eventStore
}
function eventTupleToStore(tuple, eventStore) {
    if (eventStore === void 0) { eventStore = createEmptyEventStore() }
    eventStore.defs[tuple.def.defId] = tuple.def
    if (tuple.instance) {
        eventStore.instances[tuple.instance.instanceId] = tuple.instance
    }
    return eventStore
}
function expandRecurring(eventStore, framingRange, calendar) {
    const dateEnv = calendar.dateEnv
    const defs = eventStore.defs; let instances = eventStore.instances
    // remove existing recurring instances
    instances = filterHash(instances, function (instance) {
        return !defs[instance.defId].recurringDef
    })
    for (const defId in defs) {
        const def = defs[defId]
        if (def.recurringDef) {
            let duration = def.recurringDef.duration
            if (!duration) {
                duration = def.allDay
                    ? calendar.defaultAllDayEventDuration
                    : calendar.defaultTimedEventDuration
            }
            const starts = expandRecurringRanges(def, duration, framingRange, calendar.dateEnv, calendar.pluginSystem.hooks.recurringTypes)
            for (let _i = 0, starts_1 = starts; _i < starts_1.length; _i++) {
                const start = starts_1[_i]
                const instance = createEventInstance(defId, {
                    start,
                    end: dateEnv.add(start, duration)
                })
                instances[instance.instanceId] = instance
            }
        }
    }
    return { defs, instances }
}
// retrieves events that have the same groupId as the instance specified by `instanceId`
// or they are the same as the instance.
// why might instanceId not be in the store? an event from another calendar?
function getRelevantEvents(eventStore, instanceId) {
    const instance = eventStore.instances[instanceId]
    if (instance) {
        const def_1 = eventStore.defs[instance.defId]
        // get events/instances with same group
        const newStore = filterEventStoreDefs(eventStore, function (lookDef) {
            return isEventDefsGrouped(def_1, lookDef)
        })
        // add the original
        // TODO: wish we could use eventTupleToStore or something like it
        newStore.defs[def_1.defId] = def_1
        newStore.instances[instance.instanceId] = instance
        return newStore
    }
    return createEmptyEventStore()
}
function isEventDefsGrouped(def0, def1) {
    return Boolean(def0.groupId && def0.groupId === def1.groupId)
}
function transformRawEvents(rawEvents, eventSource, calendar) {
    const calEachTransform = calendar.opt('eventDataTransform')
    const sourceEachTransform = eventSource ? eventSource.eventDataTransform : null
    if (sourceEachTransform) {
        rawEvents = transformEachRawEvent(rawEvents, sourceEachTransform)
    }
    if (calEachTransform) {
        rawEvents = transformEachRawEvent(rawEvents, calEachTransform)
    }
    return rawEvents
}
function transformEachRawEvent(rawEvents, func) {
    let refinedEvents
    if (!func) {
        refinedEvents = rawEvents
    } else {
        refinedEvents = []
        for (let _i = 0, rawEvents_2 = rawEvents; _i < rawEvents_2.length; _i++) {
            const rawEvent = rawEvents_2[_i]
            const refinedEvent = func(rawEvent)
            if (refinedEvent) {
                refinedEvents.push(refinedEvent)
            } else if (refinedEvent == null) {
                refinedEvents.push(rawEvent)
            } // if a different falsy value, do nothing
        }
    }
    return refinedEvents
}
function createEmptyEventStore() {
    return { defs: {}, instances: {} }
}
function mergeEventStores(store0, store1) {
    return {
        defs: __assign({}, store0.defs, store1.defs),
        instances: __assign({}, store0.instances, store1.instances)
    }
}
function filterEventStoreDefs(eventStore, filterFunc) {
    const defs = filterHash(eventStore.defs, filterFunc)
    const instances = filterHash(eventStore.instances, function (instance) {
        return defs[instance.defId] // still exists?
    })
    return { defs, instances }
}

function parseRange(input, dateEnv) {
    let start = null
    let end = null
    if (input.start) {
        start = dateEnv.createMarker(input.start)
    }
    if (input.end) {
        end = dateEnv.createMarker(input.end)
    }
    if (!start && !end) {
        return null
    }
    if (start && end && end < start) {
        return null
    }
    return { start, end }
}
// SIDE-EFFECT: will mutate ranges.
// Will return a new array result.
function invertRanges(ranges, constraintRange) {
    const invertedRanges = []
    let start = constraintRange.start // the end of the previous range. the start of the new range
    let i
    let dateRange
    // ranges need to be in order. required for our date-walking algorithm
    ranges.sort(compareRanges)
    for (i = 0; i < ranges.length; i++) {
        dateRange = ranges[i]
        // add the span of time before the event (if there is any)
        if (dateRange.start > start) { // compare millisecond time (skip any ambig logic)
            invertedRanges.push({ start, end: dateRange.start })
        }
        if (dateRange.end > start) {
            start = dateRange.end
        }
    }
    // add the span of time after the last event (if there is any)
    if (start < constraintRange.end) { // compare millisecond time (skip any ambig logic)
        invertedRanges.push({ start, end: constraintRange.end })
    }
    return invertedRanges
}
function compareRanges(range0, range1) {
    return range0.start.valueOf() - range1.start.valueOf() // earlier ranges go first
}
function intersectRanges(range0, range1) {
    let start = range0.start
    let end = range0.end
    let newRange = null
    if (range1.start !== null) {
        if (start === null) {
            start = range1.start
        } else {
            start = new Date(Math.max(start.valueOf(), range1.start.valueOf()))
        }
    }
    if (range1.end != null) {
        if (end === null) {
            end = range1.end
        } else {
            end = new Date(Math.min(end.valueOf(), range1.end.valueOf()))
        }
    }
    if (start === null || end === null || start < end) {
        newRange = { start, end }
    }
    return newRange
}
function rangesEqual(range0, range1) {
    return (range0.start === null ? null : range0.start.valueOf()) === (range1.start === null ? null : range1.start.valueOf()) &&
        (range0.end === null ? null : range0.end.valueOf()) === (range1.end === null ? null : range1.end.valueOf())
}
function rangesIntersect(range0, range1) {
    return (range0.end === null || range1.start === null || range0.end > range1.start) &&
        (range0.start === null || range1.end === null || range0.start < range1.end)
}
function rangeContainsRange(outerRange, innerRange) {
    return (outerRange.start === null || (innerRange.start !== null && innerRange.start >= outerRange.start)) &&
        (outerRange.end === null || (innerRange.end !== null && innerRange.end <= outerRange.end))
}
function rangeContainsMarker(range, date) {
    return (range.start === null || date >= range.start) &&
        (range.end === null || date < range.end)
}
// If the given date is not within the given range, move it inside.
// (If it's past the end, make it one millisecond before the end).
function constrainMarkerToRange(date, range) {
    if (range.start != null && date < range.start) {
        return range.start
    }
    if (range.end != null && date >= range.end) {
        return new Date(range.end.valueOf() - 1)
    }
    return date
}

function removeExact(array, exactVal) {
    let removeCnt = 0
    let i = 0
    while (i < array.length) {
        if (array[i] === exactVal) {
            array.splice(i, 1)
            removeCnt++
        } else {
            i++
        }
    }
    return removeCnt
}
function isArraysEqual(a0, a1) {
    const len = a0.length
    let i
    if (len !== a1.length) { // not array? or not same length?
        return false
    }
    for (i = 0; i < len; i++) {
        if (a0[i] !== a1[i]) {
            return false
        }
    }
    return true
}

function memoize(workerFunc) {
    let args
    let res
    return function () {
        if (!args || !isArraysEqual(args, arguments)) {
            args = arguments
            res = workerFunc.apply(this, arguments)
        }
        return res
    }
}
/*
always executes the workerFunc, but if the result is equal to the previous result,
return the previous result instead.
*/
function memoizeOutput(workerFunc, equalityFunc) {
    let cachedRes = null
    return function () {
        const newRes = workerFunc.apply(this, arguments)
        if (cachedRes === null || !(cachedRes === newRes || equalityFunc(cachedRes, newRes))) {
            cachedRes = newRes
        }
        return cachedRes
    }
}

const EXTENDED_SETTINGS_AND_SEVERITIES = {
    week: 3,
    separator: 0,
    omitZeroMinute: 0,
    meridiem: 0,
    omitCommas: 0
}
const STANDARD_DATE_PROP_SEVERITIES = {
    timeZoneName: 7,
    era: 6,
    year: 5,
    month: 4,
    day: 2,
    weekday: 2,
    hour: 1,
    minute: 1,
    second: 1
}
const MERIDIEM_RE = /\s*([ap])\.?m\.?/i // eats up leading spaces too
const COMMA_RE = /,/g // we need re for globalness
const MULTI_SPACE_RE = /\s+/g
const LTR_RE = /\u200e/g // control character
const UTC_RE = /UTC|GMT/
const NativeFormatter = /** @class */ (function () {
    function NativeFormatter(formatSettings) {
        const standardDateProps = {}
        const extendedSettings = {}
        let severity = 0
        for (const name_1 in formatSettings) {
            if (name_1 in EXTENDED_SETTINGS_AND_SEVERITIES) {
                extendedSettings[name_1] = formatSettings[name_1]
                severity = Math.max(EXTENDED_SETTINGS_AND_SEVERITIES[name_1], severity)
            } else {
                standardDateProps[name_1] = formatSettings[name_1]
                if (name_1 in STANDARD_DATE_PROP_SEVERITIES) {
                    severity = Math.max(STANDARD_DATE_PROP_SEVERITIES[name_1], severity)
                }
            }
        }
        this.standardDateProps = standardDateProps
        this.extendedSettings = extendedSettings
        this.severity = severity
        this.buildFormattingFunc = memoize(buildFormattingFunc)
    }
    NativeFormatter.prototype.format = function (date, context) {
        return this.buildFormattingFunc(this.standardDateProps, this.extendedSettings, context)(date)
    }
    NativeFormatter.prototype.formatRange = function (start, end, context) {
        const _a = this; const standardDateProps = _a.standardDateProps; const extendedSettings = _a.extendedSettings
        const diffSeverity = computeMarkerDiffSeverity(start.marker, end.marker, context.calendarSystem)
        if (!diffSeverity) {
            return this.format(start, context)
        }
        let biggestUnitForPartial = diffSeverity
        if (biggestUnitForPartial > 1 && // the two dates are different in a way that's larger scale than time
            (standardDateProps.year === 'numeric' || standardDateProps.year === '2-digit') &&
            (standardDateProps.month === 'numeric' || standardDateProps.month === '2-digit') &&
            (standardDateProps.day === 'numeric' || standardDateProps.day === '2-digit')) {
            biggestUnitForPartial = 1 // make it look like the dates are only different in terms of time
        }
        const full0 = this.format(start, context)
        const full1 = this.format(end, context)
        if (full0 === full1) {
            return full0
        }
        const partialDateProps = computePartialFormattingOptions(standardDateProps, biggestUnitForPartial)
        const partialFormattingFunc = buildFormattingFunc(partialDateProps, extendedSettings, context)
        const partial0 = partialFormattingFunc(start)
        const partial1 = partialFormattingFunc(end)
        const insertion = findCommonInsertion(full0, partial0, full1, partial1)
        const separator = extendedSettings.separator || ''
        if (insertion) {
            return insertion.before + partial0 + separator + partial1 + insertion.after
        }
        return full0 + separator + full1
    }
    NativeFormatter.prototype.getLargestUnit = function () {
        switch (this.severity) {
            case 7:
            case 6:
            case 5:
                return 'year'
            case 4:
                return 'month'
            case 3:
                return 'week'
            default:
                return 'day'
        }
    }
    return NativeFormatter
}())
function buildFormattingFunc(standardDateProps, extendedSettings, context) {
    const standardDatePropCnt = Object.keys(standardDateProps).length
    if (standardDatePropCnt === 1 && standardDateProps.timeZoneName === 'short') {
        return function (date) {
            return formatTimeZoneOffset(date.timeZoneOffset)
        }
    }
    if (standardDatePropCnt === 0 && extendedSettings.week) {
        return function (date) {
            return formatWeekNumber(context.computeWeekNumber(date.marker), context.weekLabel, context.locale, extendedSettings.week)
        }
    }
    return buildNativeFormattingFunc(standardDateProps, extendedSettings, context)
}
function buildNativeFormattingFunc(standardDateProps, extendedSettings, context) {
    standardDateProps = __assign({}, standardDateProps) // copy
    extendedSettings = __assign({}, extendedSettings) // copy
    sanitizeSettings(standardDateProps, extendedSettings)
    standardDateProps.timeZone = 'UTC' // we leverage the only guaranteed timeZone for our UTC markers
    const normalFormat = new Intl.DateTimeFormat(context.locale.codes, standardDateProps)
    let zeroFormat // needed?
    if (extendedSettings.omitZeroMinute) {
        const zeroProps = __assign({}, standardDateProps)
        delete zeroProps.minute // seconds and ms were already considered in sanitizeSettings
        zeroFormat = new Intl.DateTimeFormat(context.locale.codes, zeroProps)
    }
    return function (date) {
        const marker = date.marker
        let format
        if (zeroFormat && !marker.getUTCMinutes()) {
            format = zeroFormat
        } else {
            format = normalFormat
        }
        const s = format.format(marker)
        return postProcess(s, date, standardDateProps, extendedSettings, context)
    }
}
function sanitizeSettings(standardDateProps, extendedSettings) {
    // deal with a browser inconsistency where formatting the timezone
    // requires that the hour/minute be present.
    if (standardDateProps.timeZoneName) {
        if (!standardDateProps.hour) {
            standardDateProps.hour = '2-digit'
        }
        if (!standardDateProps.minute) {
            standardDateProps.minute = '2-digit'
        }
    }
    // only support short timezone names
    if (standardDateProps.timeZoneName === 'long') {
        standardDateProps.timeZoneName = 'short'
    }
    // if requesting to display seconds, MUST display minutes
    if (extendedSettings.omitZeroMinute && (standardDateProps.second || standardDateProps.millisecond)) {
        delete extendedSettings.omitZeroMinute
    }
}
function postProcess(s, date, standardDateProps, extendedSettings, context) {
    s = s.replace(LTR_RE, '') // remove left-to-right control chars. do first. good for other regexes
    if (standardDateProps.timeZoneName === 'short') {
        s = injectTzoStr(s, (context.timeZone === 'UTC' || date.timeZoneOffset == null)
            ? 'UTC' // important to normalize for IE, which does "GMT"
            : formatTimeZoneOffset(date.timeZoneOffset))
    }
    if (extendedSettings.omitCommas) {
        s = s.replace(COMMA_RE, '').trim()
    }
    if (extendedSettings.omitZeroMinute) {
        s = s.replace(':00', '') // zeroFormat doesn't always achieve this
    }
    // ^ do anything that might create adjacent spaces before this point,
    // because MERIDIEM_RE likes to eat up loading spaces
    if (extendedSettings.meridiem === false) {
        s = s.replace(MERIDIEM_RE, '').trim()
    } else if (extendedSettings.meridiem === 'narrow') { // a/p
        s = s.replace(MERIDIEM_RE, function (m0, m1) {
            return m1.toLocaleLowerCase()
        })
    } else if (extendedSettings.meridiem === 'short') { // am/pm
        s = s.replace(MERIDIEM_RE, function (m0, m1) {
            return m1.toLocaleLowerCase() + 'm'
        })
    } else if (extendedSettings.meridiem === 'lowercase') { // other meridiem transformers already converted to lowercase
        s = s.replace(MERIDIEM_RE, function (m0) {
            return m0.toLocaleLowerCase()
        })
    }
    s = s.replace(MULTI_SPACE_RE, ' ')
    s = s.trim()
    return s
}
function injectTzoStr(s, tzoStr) {
    let replaced = false
    s = s.replace(UTC_RE, function () {
        replaced = true
        return tzoStr
    })
    // IE11 doesn't include UTC/GMT in the original string, so append to end
    if (!replaced) {
        s += ' ' + tzoStr
    }
    return s
}
function formatWeekNumber(num, weekLabel, locale, display) {
    const parts = []
    if (display === 'narrow') {
        parts.push(weekLabel)
    } else if (display === 'short') {
        parts.push(weekLabel, ' ')
    }
    // otherwise, considered 'numeric'
    parts.push(locale.simpleNumberFormat.format(num))
    if (locale.options.isRtl) { // TODO: use control characters instead?
        parts.reverse()
    }
    return parts.join('')
}
// Range Formatting Utils
// 0 = exactly the same
// 1 = different by time
// and bigger
function computeMarkerDiffSeverity(d0, d1, ca) {
    if (ca.getMarkerYear(d0) !== ca.getMarkerYear(d1)) {
        return 5
    }
    if (ca.getMarkerMonth(d0) !== ca.getMarkerMonth(d1)) {
        return 4
    }
    if (ca.getMarkerDay(d0) !== ca.getMarkerDay(d1)) {
        return 2
    }
    if (timeAsMs(d0) !== timeAsMs(d1)) {
        return 1
    }
    return 0
}
function computePartialFormattingOptions(options, biggestUnit) {
    const partialOptions = {}
    for (const name_2 in options) {
        if (!(name_2 in STANDARD_DATE_PROP_SEVERITIES) || // not a date part prop (like timeZone)
            STANDARD_DATE_PROP_SEVERITIES[name_2] <= biggestUnit) {
            partialOptions[name_2] = options[name_2]
        }
    }
    return partialOptions
}
function findCommonInsertion(full0, partial0, full1, partial1) {
    let i0 = 0
    while (i0 < full0.length) {
        const found0 = full0.indexOf(partial0, i0)
        if (found0 === -1) {
            break
        }
        const before0 = full0.substr(0, found0)
        i0 = found0 + partial0.length
        const after0 = full0.substr(i0)
        let i1 = 0
        while (i1 < full1.length) {
            const found1 = full1.indexOf(partial1, i1)
            if (found1 === -1) {
                break
            }
            const before1 = full1.substr(0, found1)
            i1 = found1 + partial1.length
            const after1 = full1.substr(i1)
            if (before0 === before1 && after0 === after1) {
                return {
                    before: before0,
                    after: after0
                }
            }
        }
    }
    return null
}

/*
TODO: fix the terminology of "formatter" vs "formatting func"
*/
/*
At the time of instantiation, this object does not know which cmd-formatting system it will use.
It receives this at the time of formatting, as a setting.
*/
const CmdFormatter = /** @class */ (function () {
    function CmdFormatter(cmdStr, separator) {
        this.cmdStr = cmdStr
        this.separator = separator
    }
    CmdFormatter.prototype.format = function (date, context) {
        return context.cmdFormatter(this.cmdStr, createVerboseFormattingArg(date, null, context, this.separator))
    }
    CmdFormatter.prototype.formatRange = function (start, end, context) {
        return context.cmdFormatter(this.cmdStr, createVerboseFormattingArg(start, end, context, this.separator))
    }
    return CmdFormatter
}())

const FuncFormatter = /** @class */ (function () {
    function FuncFormatter(func) {
        this.func = func
    }
    FuncFormatter.prototype.format = function (date, context) {
        return this.func(createVerboseFormattingArg(date, null, context))
    }
    FuncFormatter.prototype.formatRange = function (start, end, context) {
        return this.func(createVerboseFormattingArg(start, end, context))
    }
    return FuncFormatter
}())

// Formatter Object Creation
function createFormatter(input, defaultSeparator) {
    if (typeof input === 'object' && input) { // non-null object
        if (typeof defaultSeparator === 'string') {
            input = __assign({ separator: defaultSeparator }, input)
        }
        return new NativeFormatter(input)
    } else if (typeof input === 'string') {
        return new CmdFormatter(input, defaultSeparator)
    } else if (typeof input === 'function') {
        return new FuncFormatter(input)
    }
}
// String Utils
// timeZoneOffset is in minutes
function buildIsoString(marker, timeZoneOffset, stripZeroTime) {
    if (stripZeroTime === void 0) { stripZeroTime = false }
    let s = marker.toISOString()
    s = s.replace('.000', '')
    if (stripZeroTime) {
        s = s.replace('T00:00:00Z', '')
    }
    if (s.length > 10) { // time part wasn't stripped, can add timezone info
        if (timeZoneOffset == null) {
            s = s.replace('Z', '')
        } else if (timeZoneOffset !== 0) {
            s = s.replace('Z', formatTimeZoneOffset(timeZoneOffset, true))
        }
        // otherwise, its UTC-0 and we want to keep the Z
    }
    return s
}
function formatIsoTimeString(marker) {
    return padStart(marker.getUTCHours(), 2) + ':' +
        padStart(marker.getUTCMinutes(), 2) + ':' +
        padStart(marker.getUTCSeconds(), 2)
}
function formatTimeZoneOffset(minutes, doIso) {
    if (doIso === void 0) { doIso = false }
    const sign = minutes < 0 ? '-' : '+'
    const abs = Math.abs(minutes)
    const hours = Math.floor(abs / 60)
    const mins = Math.round(abs % 60)
    if (doIso) {
        return sign + padStart(hours, 2) + ':' + padStart(mins, 2)
    } else {
        return 'GMT' + sign + hours + (mins ? ':' + padStart(mins, 2) : '')
    }
}
// Arg Utils
function createVerboseFormattingArg(start, end, context, separator) {
    const startInfo = expandZonedMarker(start, context.calendarSystem)
    const endInfo = end ? expandZonedMarker(end, context.calendarSystem) : null
    return {
        date: startInfo,
        start: startInfo,
        end: endInfo,
        timeZone: context.timeZone,
        localeCodes: context.locale.codes,
        separator
    }
}
function expandZonedMarker(dateInfo, calendarSystem) {
    const a = calendarSystem.markerToArray(dateInfo.marker)
    return {
        marker: dateInfo.marker,
        timeZoneOffset: dateInfo.timeZoneOffset,
        array: a,
        year: a[0],
        month: a[1],
        day: a[2],
        hour: a[3],
        minute: a[4],
        second: a[5],
        millisecond: a[6]
    }
}

const EventSourceApi = /** @class */ (function () {
    function EventSourceApi(calendar, internalEventSource) {
        this.calendar = calendar
        this.internalEventSource = internalEventSource
    }
    EventSourceApi.prototype.remove = function () {
        this.calendar.dispatch({
            type: 'REMOVE_EVENT_SOURCE',
            sourceId: this.internalEventSource.sourceId
        })
    }
    EventSourceApi.prototype.refetch = function () {
        this.calendar.dispatch({
            type: 'FETCH_EVENT_SOURCES',
            sourceIds: [this.internalEventSource.sourceId]
        })
    }
    Object.defineProperty(EventSourceApi.prototype, 'id', {
        get: function () {
            return this.internalEventSource.publicId
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventSourceApi.prototype, 'url', {
        // only relevant to json-feed event sources
        get: function () {
            return this.internalEventSource.meta.url
        },
        enumerable: true,
        configurable: true
    })
    return EventSourceApi
}())

const EventApi = /** @class */ (function () {
    function EventApi(calendar, def, instance) {
        this._calendar = calendar
        this._def = def
        this._instance = instance || null
    }
    /*
    TODO: make event struct more responsible for this
    */
    EventApi.prototype.setProp = function (name, val) {
        let _a, _b
        if (name in DATE_PROPS) ;
        else if (name in NON_DATE_PROPS) {
            if (typeof NON_DATE_PROPS[name] === 'function') {
                val = NON_DATE_PROPS[name](val)
            }
            this.mutate({
                standardProps: (_a = {}, _a[name] = val, _a)
            })
        } else if (name in UNSCOPED_EVENT_UI_PROPS) {
            let ui = void 0
            if (typeof UNSCOPED_EVENT_UI_PROPS[name] === 'function') {
                val = UNSCOPED_EVENT_UI_PROPS[name](val)
            }
            if (name === 'color') {
                ui = { backgroundColor: val, borderColor: val }
            } else if (name === 'editable') {
                ui = { startEditable: val, durationEditable: val }
            } else {
                ui = (_b = {}, _b[name] = val, _b)
            }
            this.mutate({
                standardProps: { ui }
            })
        }
    }
    EventApi.prototype.setExtendedProp = function (name, val) {
        let _a
        this.mutate({
            extendedProps: (_a = {}, _a[name] = val, _a)
        })
    }
    EventApi.prototype.setStart = function (startInput, options) {
        if (options === void 0) { options = {} }
        const dateEnv = this._calendar.dateEnv
        const start = dateEnv.createMarker(startInput)
        if (start && this._instance) { // TODO: warning if parsed bad
            const instanceRange = this._instance.range
            const startDelta = diffDates(instanceRange.start, start, dateEnv, options.granularity) // what if parsed bad!?
            if (options.maintainDuration) {
                this.mutate({ datesDelta: startDelta })
            } else {
                this.mutate({ startDelta })
            }
        }
    }
    EventApi.prototype.setEnd = function (endInput, options) {
        if (options === void 0) { options = {} }
        const dateEnv = this._calendar.dateEnv
        let end
        if (endInput != null) {
            end = dateEnv.createMarker(endInput)
            if (!end) {
                return // TODO: warning if parsed bad
            }
        }
        if (this._instance) {
            if (end) {
                const endDelta = diffDates(this._instance.range.end, end, dateEnv, options.granularity)
                this.mutate({ endDelta })
            } else {
                this.mutate({ standardProps: { hasEnd: false } })
            }
        }
    }
    EventApi.prototype.setDates = function (startInput, endInput, options) {
        if (options === void 0) { options = {} }
        const dateEnv = this._calendar.dateEnv
        const standardProps = { allDay: options.allDay }
        const start = dateEnv.createMarker(startInput)
        let end
        if (!start) {
            return // TODO: warning if parsed bad
        }
        if (endInput != null) {
            end = dateEnv.createMarker(endInput)
            if (!end) { // TODO: warning if parsed bad
                return
            }
        }
        if (this._instance) {
            let instanceRange = this._instance.range
            // when computing the diff for an event being converted to all-day,
            // compute diff off of the all-day values the way event-mutation does.
            if (options.allDay === true) {
                instanceRange = computeAlignedDayRange(instanceRange)
            }
            const startDelta = diffDates(instanceRange.start, start, dateEnv, options.granularity)
            if (end) {
                const endDelta = diffDates(instanceRange.end, end, dateEnv, options.granularity)
                if (durationsEqual(startDelta, endDelta)) {
                    this.mutate({ datesDelta: startDelta, standardProps })
                } else {
                    this.mutate({ startDelta, endDelta, standardProps })
                }
            } else { // means "clear the end"
                standardProps.hasEnd = false
                this.mutate({ datesDelta: startDelta, standardProps })
            }
        }
    }
    EventApi.prototype.moveStart = function (deltaInput) {
        const delta = createDuration(deltaInput)
        if (delta) { // TODO: warning if parsed bad
            this.mutate({ startDelta: delta })
        }
    }
    EventApi.prototype.moveEnd = function (deltaInput) {
        const delta = createDuration(deltaInput)
        if (delta) { // TODO: warning if parsed bad
            this.mutate({ endDelta: delta })
        }
    }
    EventApi.prototype.moveDates = function (deltaInput) {
        const delta = createDuration(deltaInput)
        if (delta) { // TODO: warning if parsed bad
            this.mutate({ datesDelta: delta })
        }
    }
    EventApi.prototype.setAllDay = function (allDay, options) {
        if (options === void 0) { options = {} }
        const standardProps = { allDay }
        let maintainDuration = options.maintainDuration
        if (maintainDuration == null) {
            maintainDuration = this._calendar.opt('allDayMaintainDuration')
        }
        if (this._def.allDay !== allDay) {
            standardProps.hasEnd = maintainDuration
        }
        this.mutate({ standardProps })
    }
    EventApi.prototype.formatRange = function (formatInput) {
        const dateEnv = this._calendar.dateEnv
        const instance = this._instance
        const formatter = createFormatter(formatInput, this._calendar.opt('defaultRangeSeparator'))
        if (this._def.hasEnd) {
            return dateEnv.formatRange(instance.range.start, instance.range.end, formatter, {
                forcedStartTzo: instance.forcedStartTzo,
                forcedEndTzo: instance.forcedEndTzo
            })
        } else {
            return dateEnv.format(instance.range.start, formatter, {
                forcedTzo: instance.forcedStartTzo
            })
        }
    }
    EventApi.prototype.mutate = function (mutation) {
        const def = this._def
        const instance = this._instance
        if (instance) {
            this._calendar.dispatch({
                type: 'MUTATE_EVENTS',
                instanceId: instance.instanceId,
                mutation,
                fromApi: true
            })
            const eventStore = this._calendar.state.eventStore
            this._def = eventStore.defs[def.defId]
            this._instance = eventStore.instances[instance.instanceId]
        }
    }
    EventApi.prototype.remove = function () {
        this._calendar.dispatch({
            type: 'REMOVE_EVENT_DEF',
            defId: this._def.defId
        })
    }
    Object.defineProperty(EventApi.prototype, 'source', {
        get: function () {
            const sourceId = this._def.sourceId
            if (sourceId) {
                return new EventSourceApi(this._calendar, this._calendar.state.eventSources[sourceId])
            }
            return null
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'start', {
        get: function () {
            return this._instance
                ? this._calendar.dateEnv.toDate(this._instance.range.start)
                : null
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'end', {
        get: function () {
            return (this._instance && this._def.hasEnd)
                ? this._calendar.dateEnv.toDate(this._instance.range.end)
                : null
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'id', {
        // computable props that all access the def
        // TODO: find a TypeScript-compatible way to do this at scale
        get: function () { return this._def.publicId },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'groupId', {
        get: function () { return this._def.groupId },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'allDay', {
        get: function () { return this._def.allDay },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'title', {
        get: function () { return this._def.title },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'url', {
        get: function () { return this._def.url },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'rendering', {
        get: function () { return this._def.rendering },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'startEditable', {
        get: function () { return this._def.ui.startEditable },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'durationEditable', {
        get: function () { return this._def.ui.durationEditable },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'constraint', {
        get: function () { return this._def.ui.constraints[0] || null },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'overlap', {
        get: function () { return this._def.ui.overlap },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'allow', {
        get: function () { return this._def.ui.allows[0] || null },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'backgroundColor', {
        get: function () { return this._def.ui.backgroundColor },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'borderColor', {
        get: function () { return this._def.ui.borderColor },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'textColor', {
        get: function () { return this._def.ui.textColor },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'classNames', {
        // NOTE: user can't modify these because Object.freeze was called in event-def parsing
        get: function () { return this._def.ui.classNames },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(EventApi.prototype, 'extendedProps', {
        get: function () { return this._def.extendedProps },
        enumerable: true,
        configurable: true
    })
    return EventApi
}())

/*
Specifying nextDayThreshold signals that all-day ranges should be sliced.
*/
function sliceEventStore(eventStore, eventUiBases, framingRange, nextDayThreshold) {
    const inverseBgByGroupId = {}
    const inverseBgByDefId = {}
    const defByGroupId = {}
    const bgRanges = []
    const fgRanges = []
    const eventUis = compileEventUis(eventStore.defs, eventUiBases)
    for (var defId in eventStore.defs) {
        var def = eventStore.defs[defId]
        if (def.rendering === 'inverse-background') {
            if (def.groupId) {
                inverseBgByGroupId[def.groupId] = []
                if (!defByGroupId[def.groupId]) {
                    defByGroupId[def.groupId] = def
                }
            } else {
                inverseBgByDefId[defId] = []
            }
        }
    }
    for (const instanceId in eventStore.instances) {
        const instance = eventStore.instances[instanceId]
        var def = eventStore.defs[instance.defId]
        var ui = eventUis[def.defId]
        const origRange = instance.range
        const normalRange = (!def.allDay && nextDayThreshold)
            ? computeVisibleDayRange(origRange, nextDayThreshold)
            : origRange
        const slicedRange = intersectRanges(normalRange, framingRange)
        if (slicedRange) {
            if (def.rendering === 'inverse-background') {
                if (def.groupId) {
                    inverseBgByGroupId[def.groupId].push(slicedRange)
                } else {
                    inverseBgByDefId[instance.defId].push(slicedRange)
                }
            } else {
                (def.rendering === 'background' ? bgRanges : fgRanges).push({
                    def,
                    ui,
                    instance,
                    range: slicedRange,
                    isStart: normalRange.start && normalRange.start.valueOf() === slicedRange.start.valueOf(),
                    isEnd: normalRange.end && normalRange.end.valueOf() === slicedRange.end.valueOf()
                })
            }
        }
    }
    for (const groupId in inverseBgByGroupId) { // BY GROUP
        var ranges = inverseBgByGroupId[groupId]
        var invertedRanges = invertRanges(ranges, framingRange)
        for (let _i = 0, invertedRanges_1 = invertedRanges; _i < invertedRanges_1.length; _i++) {
            var invertedRange = invertedRanges_1[_i]
            var def = defByGroupId[groupId]
            var ui = eventUis[def.defId]
            bgRanges.push({
                def,
                ui,
                instance: null,
                range: invertedRange,
                isStart: false,
                isEnd: false
            })
        }
    }
    for (var defId in inverseBgByDefId) {
        var ranges = inverseBgByDefId[defId]
        var invertedRanges = invertRanges(ranges, framingRange)
        for (let _a = 0, invertedRanges_2 = invertedRanges; _a < invertedRanges_2.length; _a++) {
            var invertedRange = invertedRanges_2[_a]
            bgRanges.push({
                def: eventStore.defs[defId],
                ui: eventUis[defId],
                instance: null,
                range: invertedRange,
                isStart: false,
                isEnd: false
            })
        }
    }
    return { bg: bgRanges, fg: fgRanges }
}
function hasBgRendering(def) {
    return def.rendering === 'background' || def.rendering === 'inverse-background'
}
function filterSegsViaEls(view, segs, isMirror) {
    if (view.hasPublicHandlers('eventRender')) {
        segs = segs.filter(function (seg) {
            const custom = view.publiclyTrigger('eventRender', [
                {
                    event: new EventApi(view.calendar, seg.eventRange.def, seg.eventRange.instance),
                    isMirror,
                    isStart: seg.isStart,
                    isEnd: seg.isEnd,
                    // TODO: include seg.range once all components consistently generate it
                    el: seg.el,
                    view
                }
            ])
            if (custom === false) { // means don't render at all
                return false
            } else if (custom && custom !== true) {
                seg.el = custom
            }
            return true
        })
    }
    for (let _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
        const seg = segs_1[_i]
        setElSeg(seg.el, seg)
    }
    return segs
}
function setElSeg(el, seg) {
    el.fcSeg = seg
}
function getElSeg(el) {
    return el.fcSeg || null
}
// event ui computation
function compileEventUis(eventDefs, eventUiBases) {
    return mapHash(eventDefs, function (eventDef) {
        return compileEventUi(eventDef, eventUiBases)
    })
}
function compileEventUi(eventDef, eventUiBases) {
    const uis = []
    if (eventUiBases['']) {
        uis.push(eventUiBases[''])
    }
    if (eventUiBases[eventDef.defId]) {
        uis.push(eventUiBases[eventDef.defId])
    }
    uis.push(eventDef.ui)
    return combineEventUis(uis)
}

// applies the mutation to ALL defs/instances within the event store
function applyMutationToEventStore(eventStore, eventConfigBase, mutation, calendar) {
    const eventConfigs = compileEventUis(eventStore.defs, eventConfigBase)
    const dest = createEmptyEventStore()
    for (const defId in eventStore.defs) {
        var def = eventStore.defs[defId]
        dest.defs[defId] = applyMutationToEventDef(def, eventConfigs[defId], mutation, calendar.pluginSystem.hooks.eventDefMutationAppliers, calendar)
    }
    for (const instanceId in eventStore.instances) {
        const instance = eventStore.instances[instanceId]
        var def = dest.defs[instance.defId] // important to grab the newly modified def
        dest.instances[instanceId] = applyMutationToEventInstance(instance, def, eventConfigs[instance.defId], mutation, calendar)
    }
    return dest
}
function applyMutationToEventDef(eventDef, eventConfig, mutation, appliers, calendar) {
    const standardProps = mutation.standardProps || {}
    // if hasEnd has not been specified, guess a good value based on deltas.
    // if duration will change, there's no way the default duration will persist,
    // and thus, we need to mark the event as having a real end
    if (standardProps.hasEnd == null &&
        eventConfig.durationEditable &&
        (mutation.startDelta || mutation.endDelta)) {
        standardProps.hasEnd = true // TODO: is this mutation okay?
    }
    const copy = __assign({}, eventDef, standardProps, { ui: __assign({}, eventDef.ui, standardProps.ui) })
    if (mutation.extendedProps) {
        copy.extendedProps = __assign({}, copy.extendedProps, mutation.extendedProps)
    }
    for (let _i = 0, appliers_1 = appliers; _i < appliers_1.length; _i++) {
        const applier = appliers_1[_i]
        applier(copy, mutation, calendar)
    }
    if (!copy.hasEnd && calendar.opt('forceEventDuration')) {
        copy.hasEnd = true
    }
    return copy
}
function applyMutationToEventInstance(eventInstance, eventDef, // must first be modified by applyMutationToEventDef
eventConfig, mutation, calendar) {
    const dateEnv = calendar.dateEnv
    const forceAllDay = mutation.standardProps && mutation.standardProps.allDay === true
    const clearEnd = mutation.standardProps && mutation.standardProps.hasEnd === false
    const copy = __assign({}, eventInstance)
    if (forceAllDay) {
        copy.range = computeAlignedDayRange(copy.range)
    }
    if (mutation.datesDelta && eventConfig.startEditable) {
        copy.range = {
            start: dateEnv.add(copy.range.start, mutation.datesDelta),
            end: dateEnv.add(copy.range.end, mutation.datesDelta)
        }
    }
    if (mutation.startDelta && eventConfig.durationEditable) {
        copy.range = {
            start: dateEnv.add(copy.range.start, mutation.startDelta),
            end: copy.range.end
        }
    }
    if (mutation.endDelta && eventConfig.durationEditable) {
        copy.range = {
            start: copy.range.start,
            end: dateEnv.add(copy.range.end, mutation.endDelta)
        }
    }
    if (clearEnd) {
        copy.range = {
            start: copy.range.start,
            end: calendar.getDefaultEventEnd(eventDef.allDay, copy.range.start)
        }
    }
    // in case event was all-day but the supplied deltas were not
    // better util for this?
    if (eventDef.allDay) {
        copy.range = {
            start: startOfDay(copy.range.start),
            end: startOfDay(copy.range.end)
        }
    }
    // handle invalid durations
    if (copy.range.end < copy.range.start) {
        copy.range.end = calendar.getDefaultEventEnd(eventDef.allDay, copy.range.start)
    }
    return copy
}

function reduceEventStore(eventStore, action, eventSources, dateProfile, calendar) {
    switch (action.type) {
        case 'RECEIVE_EVENTS': // raw
            return receiveRawEvents(eventStore, eventSources[action.sourceId], action.fetchId, action.fetchRange, action.rawEvents, calendar)
        case 'ADD_EVENTS': // already parsed, but not expanded
            return addEvent(eventStore, action.eventStore, // new ones
            dateProfile ? dateProfile.activeRange : null, calendar)
        case 'MERGE_EVENTS': // already parsed and expanded
            return mergeEventStores(eventStore, action.eventStore)
        case 'PREV': // TODO: how do we track all actions that affect dateProfile :(
        case 'NEXT':
        case 'SET_DATE':
        case 'SET_VIEW_TYPE':
            if (dateProfile) {
                return expandRecurring(eventStore, dateProfile.activeRange, calendar)
            } else {
                return eventStore
            }
        case 'CHANGE_TIMEZONE':
            return rezoneDates(eventStore, action.oldDateEnv, calendar.dateEnv)
        case 'MUTATE_EVENTS':
            return applyMutationToRelated(eventStore, action.instanceId, action.mutation, action.fromApi, calendar)
        case 'REMOVE_EVENT_INSTANCES':
            return excludeInstances(eventStore, action.instances)
        case 'REMOVE_EVENT_DEF':
            return filterEventStoreDefs(eventStore, function (eventDef) {
                return eventDef.defId !== action.defId
            })
        case 'REMOVE_EVENT_SOURCE':
            return excludeEventsBySourceId(eventStore, action.sourceId)
        case 'REMOVE_ALL_EVENT_SOURCES':
            return filterEventStoreDefs(eventStore, function (eventDef) {
                return !eventDef.sourceId // only keep events with no source id
            })
        case 'REMOVE_ALL_EVENTS':
            return createEmptyEventStore()
        case 'RESET_EVENTS':
            return {
                defs: eventStore.defs,
                instances: eventStore.instances
            }
        default:
            return eventStore
    }
}
function receiveRawEvents(eventStore, eventSource, fetchId, fetchRange, rawEvents, calendar) {
    if (eventSource && // not already removed
        fetchId === eventSource.latestFetchId // TODO: wish this logic was always in event-sources
    ) {
        let subset = parseEvents(transformRawEvents(rawEvents, eventSource, calendar), eventSource.sourceId, calendar)
        if (fetchRange) {
            subset = expandRecurring(subset, fetchRange, calendar)
        }
        return mergeEventStores(excludeEventsBySourceId(eventStore, eventSource.sourceId), subset)
    }
    return eventStore
}
function addEvent(eventStore, subset, expandRange, calendar) {
    if (expandRange) {
        subset = expandRecurring(subset, expandRange, calendar)
    }
    return mergeEventStores(eventStore, subset)
}
function rezoneDates(eventStore, oldDateEnv, newDateEnv) {
    const defs = eventStore.defs
    const instances = mapHash(eventStore.instances, function (instance) {
        const def = defs[instance.defId]
        if (def.allDay || def.recurringDef) {
            return instance // isn't dependent on timezone
        } else {
            return __assign({}, instance, {
 range: {
                    start: newDateEnv.createMarker(oldDateEnv.toDate(instance.range.start, instance.forcedStartTzo)),
                    end: newDateEnv.createMarker(oldDateEnv.toDate(instance.range.end, instance.forcedEndTzo))
                },
forcedStartTzo: newDateEnv.canComputeOffset ? null : instance.forcedStartTzo,
forcedEndTzo: newDateEnv.canComputeOffset ? null : instance.forcedEndTzo
})
        }
    })
    return { defs, instances }
}
function applyMutationToRelated(eventStore, instanceId, mutation, fromApi, calendar) {
    let relevant = getRelevantEvents(eventStore, instanceId)
    const eventConfigBase = fromApi
        ? {
 '': {
                startEditable: true,
                durationEditable: true,
                constraints: [],
                overlap: null,
                allows: [],
                backgroundColor: '',
                borderColor: '',
                textColor: '',
                classNames: []
            }
}
        : calendar.eventUiBases
    relevant = applyMutationToEventStore(relevant, eventConfigBase, mutation, calendar)
    return mergeEventStores(eventStore, relevant)
}
function excludeEventsBySourceId(eventStore, sourceId) {
    return filterEventStoreDefs(eventStore, function (eventDef) {
        return eventDef.sourceId !== sourceId
    })
}
// QUESTION: why not just return instances? do a general object-property-exclusion util
function excludeInstances(eventStore, removals) {
    return {
        defs: eventStore.defs,
        instances: filterHash(eventStore.instances, function (instance) {
            return !removals[instance.instanceId]
        })
    }
}

// high-level segmenting-aware tester functions
// ------------------------------------------------------------------------------------------------------------------------
function isInteractionValid(interaction, calendar) {
    return isNewPropsValid({ eventDrag: interaction }, calendar) // HACK: the eventDrag props is used for ALL interactions
}
function isDateSelectionValid(dateSelection, calendar) {
    return isNewPropsValid({ dateSelection }, calendar)
}
function isNewPropsValid(newProps, calendar) {
    const view = calendar.view
    const props = __assign({ businessHours: view ? view.props.businessHours : createEmptyEventStore(), dateSelection: '', eventStore: calendar.state.eventStore, eventUiBases: calendar.eventUiBases, eventSelection: '', eventDrag: null, eventResize: null }, newProps)
    return (calendar.pluginSystem.hooks.isPropsValid || isPropsValid)(props, calendar)
}
function isPropsValid(state, calendar, dateSpanMeta, filterConfig) {
    if (dateSpanMeta === void 0) { dateSpanMeta = {} }
    if (state.eventDrag && !isInteractionPropsValid(state, calendar, dateSpanMeta, filterConfig)) {
        return false
    }
    if (state.dateSelection && !isDateSelectionPropsValid(state, calendar, dateSpanMeta, filterConfig)) {
        return false
    }
    return true
}
// Moving Event Validation
// ------------------------------------------------------------------------------------------------------------------------
function isInteractionPropsValid(state, calendar, dateSpanMeta, filterConfig) {
    const interaction = state.eventDrag // HACK: the eventDrag props is used for ALL interactions
    const subjectEventStore = interaction.mutatedEvents
    const subjectDefs = subjectEventStore.defs
    const subjectInstances = subjectEventStore.instances
    let subjectConfigs = compileEventUis(subjectDefs, interaction.isEvent
        ? state.eventUiBases
        : { '': calendar.selectionConfig } // if not a real event, validate as a selection
    )
    if (filterConfig) {
        subjectConfigs = mapHash(subjectConfigs, filterConfig)
    }
    const otherEventStore = excludeInstances(state.eventStore, interaction.affectedEvents.instances) // exclude the subject events. TODO: exclude defs too?
    const otherDefs = otherEventStore.defs
    const otherInstances = otherEventStore.instances
    const otherConfigs = compileEventUis(otherDefs, state.eventUiBases)
    for (const subjectInstanceId in subjectInstances) {
        const subjectInstance = subjectInstances[subjectInstanceId]
        const subjectRange = subjectInstance.range
        const subjectConfig = subjectConfigs[subjectInstance.defId]
        const subjectDef = subjectDefs[subjectInstance.defId]
        // constraint
        if (!allConstraintsPass(subjectConfig.constraints, subjectRange, otherEventStore, state.businessHours, calendar)) {
            return false
        }
        // overlap
        let overlapFunc = calendar.opt('eventOverlap')
        if (typeof overlapFunc !== 'function') {
            overlapFunc = null
        }
        for (const otherInstanceId in otherInstances) {
            const otherInstance = otherInstances[otherInstanceId]
            // intersect! evaluate
            if (rangesIntersect(subjectRange, otherInstance.range)) {
                const otherOverlap = otherConfigs[otherInstance.defId].overlap
                // consider the other event's overlap. only do this if the subject event is a "real" event
                if (otherOverlap === false && interaction.isEvent) {
                    return false
                }
                if (subjectConfig.overlap === false) {
                    return false
                }
                if (overlapFunc && !overlapFunc(new EventApi(calendar, otherDefs[otherInstance.defId], otherInstance), // still event
                new EventApi(calendar, subjectDef, subjectInstance) // moving event
                )) {
                    return false
                }
            }
        }
        // allow (a function)
        const calendarEventStore = calendar.state.eventStore // need global-to-calendar, not local to component (splittable)state
        for (let _i = 0, _a = subjectConfig.allows; _i < _a.length; _i++) {
            const subjectAllow = _a[_i]
            const subjectDateSpan = __assign({}, dateSpanMeta, { range: subjectInstance.range, allDay: subjectDef.allDay })
            const origDef = calendarEventStore.defs[subjectDef.defId]
            const origInstance = calendarEventStore.instances[subjectInstanceId]
            let eventApi = void 0
            if (origDef) { // was previously in the calendar
                eventApi = new EventApi(calendar, origDef, origInstance)
            } else { // was an external event
                eventApi = new EventApi(calendar, subjectDef) // no instance, because had no dates
            }
            if (!subjectAllow(calendar.buildDateSpanApi(subjectDateSpan), eventApi)) {
                return false
            }
        }
    }
    return true
}
// Date Selection Validation
// ------------------------------------------------------------------------------------------------------------------------
function isDateSelectionPropsValid(state, calendar, dateSpanMeta, filterConfig) {
    const relevantEventStore = state.eventStore
    const relevantDefs = relevantEventStore.defs
    const relevantInstances = relevantEventStore.instances
    const selection = state.dateSelection
    const selectionRange = selection.range
    let selectionConfig = calendar.selectionConfig
    if (filterConfig) {
        selectionConfig = filterConfig(selectionConfig)
    }
    // constraint
    if (!allConstraintsPass(selectionConfig.constraints, selectionRange, relevantEventStore, state.businessHours, calendar)) {
        return false
    }
    // overlap
    let overlapFunc = calendar.opt('selectOverlap')
    if (typeof overlapFunc !== 'function') {
        overlapFunc = null
    }
    for (const relevantInstanceId in relevantInstances) {
        const relevantInstance = relevantInstances[relevantInstanceId]
        // intersect! evaluate
        if (rangesIntersect(selectionRange, relevantInstance.range)) {
            if (selectionConfig.overlap === false) {
                return false
            }
            if (overlapFunc && !overlapFunc(new EventApi(calendar, relevantDefs[relevantInstance.defId], relevantInstance))) {
                return false
            }
        }
    }
    // allow (a function)
    for (let _i = 0, _a = selectionConfig.allows; _i < _a.length; _i++) {
        const selectionAllow = _a[_i]
        const fullDateSpan = __assign({}, dateSpanMeta, selection)
        if (!selectionAllow(calendar.buildDateSpanApi(fullDateSpan), null)) {
            return false
        }
    }
    return true
}
// Constraint Utils
// ------------------------------------------------------------------------------------------------------------------------
function allConstraintsPass(constraints, subjectRange, otherEventStore, businessHoursUnexpanded, calendar) {
    for (let _i = 0, constraints_1 = constraints; _i < constraints_1.length; _i++) {
        const constraint = constraints_1[_i]
        if (!anyRangesContainRange(constraintToRanges(constraint, subjectRange, otherEventStore, businessHoursUnexpanded, calendar), subjectRange)) {
            return false
        }
    }
    return true
}
function constraintToRanges(constraint, subjectRange, // for expanding a recurring constraint, or expanding business hours
otherEventStore, // for if constraint is an even group ID
businessHoursUnexpanded, // for if constraint is 'businessHours'
calendar // for expanding businesshours
) {
    if (constraint === 'businessHours') {
        return eventStoreToRanges(expandRecurring(businessHoursUnexpanded, subjectRange, calendar))
    } else if (typeof constraint === 'string') { // an group ID
        return eventStoreToRanges(filterEventStoreDefs(otherEventStore, function (eventDef) {
            return eventDef.groupId === constraint
        }))
    } else if (typeof constraint === 'object' && constraint) { // non-null object
        return eventStoreToRanges(expandRecurring(constraint, subjectRange, calendar))
    }
    return [] // if it's false
}
// TODO: move to event-store file?
function eventStoreToRanges(eventStore) {
    const instances = eventStore.instances
    const ranges = []
    for (const instanceId in instances) {
        ranges.push(instances[instanceId].range)
    }
    return ranges
}
// TODO: move to geom file?
function anyRangesContainRange(outerRanges, innerRange) {
    for (let _i = 0, outerRanges_1 = outerRanges; _i < outerRanges_1.length; _i++) {
        const outerRange = outerRanges_1[_i]
        if (rangeContainsRange(outerRange, innerRange)) {
            return true
        }
    }
    return false
}
// Parsing
// ------------------------------------------------------------------------------------------------------------------------
function normalizeConstraint(input, calendar) {
    if (Array.isArray(input)) {
        return parseEvents(input, '', calendar, true) // allowOpenRange=true
    } else if (typeof input === 'object' && input) { // non-null object
        return parseEvents([input], '', calendar, true) // allowOpenRange=true
    } else if (input != null) {
        return String(input)
    } else {
        return null
    }
}

function htmlEscape(s) {
    return (s + '').replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#039;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br />')
}
// Given a hash of CSS properties, returns a string of CSS.
// Uses property names as-is (no camel-case conversion). Will not make statements for null/undefined values.
function cssToStr(cssProps) {
    const statements = []
    for (const name_1 in cssProps) {
        const val = cssProps[name_1]
        if (val != null && val !== '') {
            statements.push(name_1 + ':' + val)
        }
    }
    return statements.join(';')
}
// Given an object hash of HTML attribute names to values,
// generates a string that can be injected between < > in HTML
function attrsToStr(attrs) {
    const parts = []
    for (const name_2 in attrs) {
        const val = attrs[name_2]
        if (val != null) {
            parts.push(name_2 + '="' + htmlEscape(val) + '"')
        }
    }
    return parts.join(' ')
}
function parseClassName(raw) {
    if (Array.isArray(raw)) {
        return raw
    } else if (typeof raw === 'string') {
        return raw.split(/\s+/)
    } else {
        return []
    }
}

var UNSCOPED_EVENT_UI_PROPS = {
    editable: Boolean,
    startEditable: Boolean,
    durationEditable: Boolean,
    constraint: null,
    overlap: null,
    allow: null,
    className: parseClassName,
    classNames: parseClassName,
    color: String,
    backgroundColor: String,
    borderColor: String,
    textColor: String
}
function processUnscopedUiProps(rawProps, calendar, leftovers) {
    const props = refineProps(rawProps, UNSCOPED_EVENT_UI_PROPS, {}, leftovers)
    const constraint = normalizeConstraint(props.constraint, calendar)
    return {
        startEditable: props.startEditable != null ? props.startEditable : props.editable,
        durationEditable: props.durationEditable != null ? props.durationEditable : props.editable,
        constraints: constraint != null ? [constraint] : [],
        overlap: props.overlap,
        allows: props.allow != null ? [props.allow] : [],
        backgroundColor: props.backgroundColor || props.color,
        borderColor: props.borderColor || props.color,
        textColor: props.textColor,
        classNames: props.classNames.concat(props.className)
    }
}
function processScopedUiProps(prefix, rawScoped, calendar, leftovers) {
    const rawUnscoped = {}
    const wasFound = {}
    for (var key in UNSCOPED_EVENT_UI_PROPS) {
        const scopedKey = prefix + capitaliseFirstLetter(key)
        rawUnscoped[key] = rawScoped[scopedKey]
        wasFound[scopedKey] = true
    }
    if (prefix === 'event') {
        rawUnscoped.editable = rawScoped.editable // special case. there is no 'eventEditable', just 'editable'
    }
    if (leftovers) {
        for (var key in rawScoped) {
            if (!wasFound[key]) {
                leftovers[key] = rawScoped[key]
            }
        }
    }
    return processUnscopedUiProps(rawUnscoped, calendar)
}
const EMPTY_EVENT_UI = {
    startEditable: null,
    durationEditable: null,
    constraints: [],
    overlap: null,
    allows: [],
    backgroundColor: '',
    borderColor: '',
    textColor: '',
    classNames: []
}
// prevent against problems with <2 args!
function combineEventUis(uis) {
    return uis.reduce(combineTwoEventUis, EMPTY_EVENT_UI)
}
function combineTwoEventUis(item0, item1) {
    return {
        startEditable: item1.startEditable != null ? item1.startEditable : item0.startEditable,
        durationEditable: item1.durationEditable != null ? item1.durationEditable : item0.durationEditable,
        constraints: item0.constraints.concat(item1.constraints),
        overlap: typeof item1.overlap === 'boolean' ? item1.overlap : item0.overlap,
        allows: item0.allows.concat(item1.allows),
        backgroundColor: item1.backgroundColor || item0.backgroundColor,
        borderColor: item1.borderColor || item0.borderColor,
        textColor: item1.textColor || item0.textColor,
        classNames: item0.classNames.concat(item1.classNames)
    }
}

var NON_DATE_PROPS = {
    id: String,
    groupId: String,
    title: String,
    url: String,
    rendering: String,
    extendedProps: null
}
var DATE_PROPS = {
    start: null,
    date: null,
    end: null,
    allDay: null
}
let uid = 0
function parseEvent(raw, sourceId, calendar, allowOpenRange) {
    const allDayDefault = computeIsAllDayDefault(sourceId, calendar)
    const leftovers0 = {}
    const recurringRes = parseRecurring(raw, // raw, but with single-event stuff stripped out
    allDayDefault, calendar.dateEnv, calendar.pluginSystem.hooks.recurringTypes, leftovers0 // will populate with non-recurring props
    )
    if (recurringRes) {
        var def = parseEventDef(leftovers0, sourceId, recurringRes.allDay, Boolean(recurringRes.duration), calendar)
        def.recurringDef = {
            typeId: recurringRes.typeId,
            typeData: recurringRes.typeData,
            duration: recurringRes.duration
        }
        return { def, instance: null }
    } else {
        const leftovers1 = {}
        const singleRes = parseSingle(raw, allDayDefault, calendar, leftovers1, allowOpenRange)
        if (singleRes) {
            var def = parseEventDef(leftovers1, sourceId, singleRes.allDay, singleRes.hasEnd, calendar)
            const instance = createEventInstance(def.defId, singleRes.range, singleRes.forcedStartTzo, singleRes.forcedEndTzo)
            return { def, instance }
        }
    }
    return null
}
/*
Will NOT populate extendedProps with the leftover properties.
Will NOT populate date-related props.
The EventNonDateInput has been normalized (id => publicId, etc).
*/
function parseEventDef(raw, sourceId, allDay, hasEnd, calendar) {
    let leftovers = {}
    const def = pluckNonDateProps(raw, calendar, leftovers)
    def.defId = String(uid++)
    def.sourceId = sourceId
    def.allDay = allDay
    def.hasEnd = hasEnd
    for (let _i = 0, _a = calendar.pluginSystem.hooks.eventDefParsers; _i < _a.length; _i++) {
        const eventDefParser = _a[_i]
        const newLeftovers = {}
        eventDefParser(def, leftovers, newLeftovers)
        leftovers = newLeftovers
    }
    def.extendedProps = __assign(leftovers, def.extendedProps || {})
    // help out EventApi from having user modify props
    Object.freeze(def.ui.classNames)
    Object.freeze(def.extendedProps)
    return def
}
function createEventInstance(defId, range, forcedStartTzo, forcedEndTzo) {
    return {
        instanceId: String(uid++),
        defId,
        range,
        forcedStartTzo: forcedStartTzo == null ? null : forcedStartTzo,
        forcedEndTzo: forcedEndTzo == null ? null : forcedEndTzo
    }
}
function parseSingle(raw, allDayDefault, calendar, leftovers, allowOpenRange) {
    const props = pluckDateProps(raw, leftovers)
    let allDay = props.allDay
    let startMeta
    let startMarker = null
    let hasEnd = false
    let endMeta
    let endMarker = null
    startMeta = calendar.dateEnv.createMarkerMeta(props.start)
    if (startMeta) {
        startMarker = startMeta.marker
    } else if (!allowOpenRange) {
        return null
    }
    if (props.end != null) {
        endMeta = calendar.dateEnv.createMarkerMeta(props.end)
    }
    if (allDay == null) {
        if (allDayDefault != null) {
            allDay = allDayDefault
        } else {
            // fall back to the date props LAST
            allDay = (!startMeta || startMeta.isTimeUnspecified) &&
                (!endMeta || endMeta.isTimeUnspecified)
        }
    }
    if (allDay && startMarker) {
        startMarker = startOfDay(startMarker)
    }
    if (endMeta) {
        endMarker = endMeta.marker
        if (allDay) {
            endMarker = startOfDay(endMarker)
        }
        if (startMarker && endMarker <= startMarker) {
            endMarker = null
        }
    }
    if (endMarker) {
        hasEnd = true
    } else if (!allowOpenRange) {
        hasEnd = calendar.opt('forceEventDuration') || false
        endMarker = calendar.dateEnv.add(startMarker, allDay
            ? calendar.defaultAllDayEventDuration
            : calendar.defaultTimedEventDuration)
    }
    return {
        allDay,
        hasEnd,
        range: { start: startMarker, end: endMarker },
        forcedStartTzo: startMeta ? startMeta.forcedTzo : null,
        forcedEndTzo: endMeta ? endMeta.forcedTzo : null
    }
}
function pluckDateProps(raw, leftovers) {
    const props = refineProps(raw, DATE_PROPS, {}, leftovers)
    props.start = (props.start !== null) ? props.start : props.date
    delete props.date
    return props
}
function pluckNonDateProps(raw, calendar, leftovers) {
    const preLeftovers = {}
    const props = refineProps(raw, NON_DATE_PROPS, {}, preLeftovers)
    const ui = processUnscopedUiProps(preLeftovers, calendar, leftovers)
    props.publicId = props.id
    delete props.id
    props.ui = ui
    return props
}
function computeIsAllDayDefault(sourceId, calendar) {
    let res = null
    if (sourceId) {
        const source = calendar.state.eventSources[sourceId]
        res = source.allDayDefault
    }
    if (res == null) {
        res = calendar.opt('allDayDefault')
    }
    return res
}

const DEF_DEFAULTS = {
    startTime: '09:00',
    endTime: '17:00',
    daysOfWeek: [1, 2, 3, 4, 5],
    rendering: 'inverse-background',
    classNames: 'fc-nonbusiness',
    groupId: '_businessHours' // so multiple defs get grouped
}
/*
TODO: pass around as EventDefHash!!!
*/
function parseBusinessHours(input, calendar) {
    return parseEvents(refineInputs(input), '', calendar)
}
function refineInputs(input) {
    let rawDefs
    if (input === true) {
        rawDefs = [{}] // will get DEF_DEFAULTS verbatim
    } else if (Array.isArray(input)) {
        // if specifying an array, every sub-definition NEEDS a day-of-week
        rawDefs = input.filter(function (rawDef) {
            return rawDef.daysOfWeek
        })
    } else if (typeof input === 'object' && input) { // non-null object
        rawDefs = [input]
    } else { // is probably false
        rawDefs = []
    }
    rawDefs = rawDefs.map(function (rawDef) {
        return __assign({}, DEF_DEFAULTS, rawDef)
    })
    return rawDefs
}

function memoizeRendering(renderFunc, unrenderFunc, dependencies) {
    if (dependencies === void 0) { dependencies = [] }
    const dependents = []
    let thisContext
    let prevArgs
    function unrender() {
        if (prevArgs) {
            for (let _i = 0, dependents_1 = dependents; _i < dependents_1.length; _i++) {
                const dependent = dependents_1[_i]
                dependent.unrender()
            }
            if (unrenderFunc) {
                unrenderFunc.apply(thisContext, prevArgs)
            }
            prevArgs = null
        }
    }
    function res() {
        if (!prevArgs || !isArraysEqual(prevArgs, arguments)) {
            unrender()
            thisContext = this
            prevArgs = arguments
            renderFunc.apply(this, arguments)
        }
    }
    res.dependents = dependents
    res.unrender = unrender
    for (let _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
        const dependency = dependencies_1[_i]
        dependency.dependents.push(res)
    }
    return res
}

const EMPTY_EVENT_STORE = createEmptyEventStore() // for purecomponents. TODO: keep elsewhere
const Splitter = /** @class */ (function () {
    function Splitter() {
        this.getKeysForEventDefs = memoize(this._getKeysForEventDefs)
        this.splitDateSelection = memoize(this._splitDateSpan)
        this.splitEventStore = memoize(this._splitEventStore)
        this.splitIndividualUi = memoize(this._splitIndividualUi)
        this.splitEventDrag = memoize(this._splitInteraction)
        this.splitEventResize = memoize(this._splitInteraction)
        this.eventUiBuilders = {} // TODO: typescript protection
    }
    Splitter.prototype.splitProps = function (props) {
        const _this = this
        const keyInfos = this.getKeyInfo(props)
        const defKeys = this.getKeysForEventDefs(props.eventStore)
        const dateSelections = this.splitDateSelection(props.dateSelection)
        const individualUi = this.splitIndividualUi(props.eventUiBases, defKeys) // the individual *bases*
        const eventStores = this.splitEventStore(props.eventStore, defKeys)
        const eventDrags = this.splitEventDrag(props.eventDrag)
        const eventResizes = this.splitEventResize(props.eventResize)
        const splitProps = {}
        this.eventUiBuilders = mapHash(keyInfos, function (info, key) {
            return _this.eventUiBuilders[key] || memoize(buildEventUiForKey)
        })
        for (const key in keyInfos) {
            const keyInfo = keyInfos[key]
            const eventStore = eventStores[key] || EMPTY_EVENT_STORE
            const buildEventUi = this.eventUiBuilders[key]
            splitProps[key] = {
                businessHours: keyInfo.businessHours || props.businessHours,
                dateSelection: dateSelections[key] || null,
                eventStore,
                eventUiBases: buildEventUi(props.eventUiBases[''], keyInfo.ui, individualUi[key]),
                eventSelection: eventStore.instances[props.eventSelection] ? props.eventSelection : '',
                eventDrag: eventDrags[key] || null,
                eventResize: eventResizes[key] || null
            }
        }
        return splitProps
    }
    Splitter.prototype._splitDateSpan = function (dateSpan) {
        const dateSpans = {}
        if (dateSpan) {
            const keys = this.getKeysForDateSpan(dateSpan)
            for (let _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                const key = keys_1[_i]
                dateSpans[key] = dateSpan
            }
        }
        return dateSpans
    }
    Splitter.prototype._getKeysForEventDefs = function (eventStore) {
        const _this = this
        return mapHash(eventStore.defs, function (eventDef) {
            return _this.getKeysForEventDef(eventDef)
        })
    }
    Splitter.prototype._splitEventStore = function (eventStore, defKeys) {
        const defs = eventStore.defs; const instances = eventStore.instances
        const splitStores = {}
        for (const defId in defs) {
            for (let _i = 0, _a = defKeys[defId]; _i < _a.length; _i++) {
                var key = _a[_i]
                if (!splitStores[key]) {
                    splitStores[key] = createEmptyEventStore()
                }
                splitStores[key].defs[defId] = defs[defId]
            }
        }
        for (const instanceId in instances) {
            const instance = instances[instanceId]
            for (let _b = 0, _c = defKeys[instance.defId]; _b < _c.length; _b++) {
                var key = _c[_b]
                if (splitStores[key]) { // must have already been created
                    splitStores[key].instances[instanceId] = instance
                }
            }
        }
        return splitStores
    }
    Splitter.prototype._splitIndividualUi = function (eventUiBases, defKeys) {
        const splitHashes = {}
        for (const defId in eventUiBases) {
            if (defId) { // not the '' key
                for (let _i = 0, _a = defKeys[defId]; _i < _a.length; _i++) {
                    const key = _a[_i]
                    if (!splitHashes[key]) {
                        splitHashes[key] = {}
                    }
                    splitHashes[key][defId] = eventUiBases[defId]
                }
            }
        }
        return splitHashes
    }
    Splitter.prototype._splitInteraction = function (interaction) {
        const splitStates = {}
        if (interaction) {
            const affectedStores_1 = this._splitEventStore(interaction.affectedEvents, this._getKeysForEventDefs(interaction.affectedEvents) // can't use cached. might be events from other calendar
            )
            // can't rely on defKeys because event data is mutated
            const mutatedKeysByDefId = this._getKeysForEventDefs(interaction.mutatedEvents)
            const mutatedStores_1 = this._splitEventStore(interaction.mutatedEvents, mutatedKeysByDefId)
            const populate = function (key) {
                if (!splitStates[key]) {
                    splitStates[key] = {
                        affectedEvents: affectedStores_1[key] || EMPTY_EVENT_STORE,
                        mutatedEvents: mutatedStores_1[key] || EMPTY_EVENT_STORE,
                        isEvent: interaction.isEvent,
                        origSeg: interaction.origSeg
                    }
                }
            }
            for (var key in affectedStores_1) {
                populate(key)
            }
            for (var key in mutatedStores_1) {
                populate(key)
            }
        }
        return splitStates
    }
    return Splitter
}())
function buildEventUiForKey(allUi, eventUiForKey, individualUi) {
    const baseParts = []
    if (allUi) {
        baseParts.push(allUi)
    }
    if (eventUiForKey) {
        baseParts.push(eventUiForKey)
    }
    const stuff = {
        '': combineEventUis(baseParts)
    }
    if (individualUi) {
        __assign(stuff, individualUi)
    }
    return stuff
}

// Generates HTML for an anchor to another view into the calendar.
// Will either generate an <a> tag or a non-clickable <span> tag, depending on enabled settings.
// `gotoOptions` can either be a DateMarker, or an object with the form:
// { date, type, forceOff }
// `type` is a view-type like "day" or "week". default value is "day".
// `attrs` and `innerHtml` are use to generate the rest of the HTML tag.
function buildGotoAnchorHtml(component, gotoOptions, attrs, innerHtml) {
    const dateEnv = component.dateEnv
    let date
    let type
    let forceOff
    let finalOptions
    if (gotoOptions instanceof Date) {
        date = gotoOptions // a single date-like input
    } else {
        date = gotoOptions.date
        type = gotoOptions.type
        forceOff = gotoOptions.forceOff
    }
    finalOptions = {
        date: dateEnv.formatIso(date, { omitTime: true }),
        type: type || 'day'
    }
    if (typeof attrs === 'string') {
        innerHtml = attrs
        attrs = null
    }
    attrs = attrs ? ' ' + attrsToStr(attrs) : '' // will have a leading space
    innerHtml = innerHtml || ''
    if (!forceOff && component.opt('navLinks')) {
        return '<a' + attrs +
            ' data-goto="' + htmlEscape(JSON.stringify(finalOptions)) + '">' +
            innerHtml +
            '</a>'
    } else {
        return '<span' + attrs + '>' +
            innerHtml +
            '</span>'
    }
}
function getAllDayHtml(component) {
    return component.opt('allDayHtml') || htmlEscape(component.opt('allDayText'))
}
// Computes HTML classNames for a single-day element
function getDayClasses(date, dateProfile, context, noThemeHighlight) {
    const calendar = context.calendar; const view = context.view; const theme = context.theme; const dateEnv = context.dateEnv
    const classes = []
    let todayStart
    let todayEnd
    if (!rangeContainsMarker(dateProfile.activeRange, date)) {
        classes.push('fc-disabled-day')
    } else {
        classes.push('fc-' + DAY_IDS[date.getUTCDay()])
        if (view.opt('monthMode') &&
            dateEnv.getMonth(date) !== dateEnv.getMonth(dateProfile.currentRange.start)) {
            classes.push('fc-other-month')
        }
        todayStart = startOfDay(calendar.getNow())
        todayEnd = addDays(todayStart, 1)
        if (date < todayStart) {
            classes.push('fc-past')
        } else if (date >= todayEnd) {
            classes.push('fc-future')
        } else {
            classes.push('fc-today')
            if (noThemeHighlight !== true) {
                classes.push(theme.getClass('today'))
            }
        }
    }
    return classes
}

// given a function that resolves a result asynchronously.
// the function can either call passed-in success and failure callbacks,
// or it can return a promise.
// if you need to pass additional params to func, bind them first.
function unpromisify(func, success, failure) {
    // guard against success/failure callbacks being called more than once
    // and guard against a promise AND callback being used together.
    let isResolved = false
    const wrappedSuccess = function () {
        if (!isResolved) {
            isResolved = true
            success.apply(this, arguments)
        }
    }
    const wrappedFailure = function () {
        if (!isResolved) {
            isResolved = true
            if (failure) {
                failure.apply(this, arguments)
            }
        }
    }
    const res = func(wrappedSuccess, wrappedFailure)
    if (res && typeof res.then === 'function') {
        res.then(wrappedSuccess, wrappedFailure)
    }
}

const Mixin = /** @class */ (function () {
    function Mixin() {
    }
    // mix into a CLASS
    Mixin.mixInto = function (destClass) {
        this.mixIntoObj(destClass.prototype)
    }
    // mix into ANY object
    Mixin.mixIntoObj = function (destObj) {
        const _this = this
        Object.getOwnPropertyNames(this.prototype).forEach(function (name) {
            if (!destObj[name]) { // if destination doesn't already define it
                destObj[name] = _this.prototype[name]
            }
        })
    }
    /*
    will override existing methods
    TODO: remove! not used anymore
    */
    Mixin.mixOver = function (destClass) {
        const _this = this
        Object.getOwnPropertyNames(this.prototype).forEach(function (name) {
            destClass.prototype[name] = _this.prototype[name]
        })
    }
    return Mixin
}())

/*
USAGE:
  import { default as EmitterMixin, EmitterInterface } from './EmitterMixin'
in class:
  on: EmitterInterface['on']
  one: EmitterInterface['one']
  off: EmitterInterface['off']
  trigger: EmitterInterface['trigger']
  triggerWith: EmitterInterface['triggerWith']
  hasHandlers: EmitterInterface['hasHandlers']
after class:
  EmitterMixin.mixInto(TheClass)
*/
const EmitterMixin = /** @class */ (function (_super) {
    __extends(EmitterMixin, _super)
    function EmitterMixin() {
        return _super !== null && _super.apply(this, arguments) || this
    }
    EmitterMixin.prototype.on = function (type, handler) {
        addToHash(this._handlers || (this._handlers = {}), type, handler)
        return this // for chaining
    }
    // todo: add comments
    EmitterMixin.prototype.one = function (type, handler) {
        addToHash(this._oneHandlers || (this._oneHandlers = {}), type, handler)
        return this // for chaining
    }
    EmitterMixin.prototype.off = function (type, handler) {
        if (this._handlers) {
            removeFromHash(this._handlers, type, handler)
        }
        if (this._oneHandlers) {
            removeFromHash(this._oneHandlers, type, handler)
        }
        return this // for chaining
    }
    EmitterMixin.prototype.trigger = function (type) {
        const args = []
        for (let _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i]
        }
        this.triggerWith(type, this, args)
        return this // for chaining
    }
    EmitterMixin.prototype.triggerWith = function (type, context, args) {
        if (this._handlers) {
            applyAll(this._handlers[type], context, args)
        }
        if (this._oneHandlers) {
            applyAll(this._oneHandlers[type], context, args)
            delete this._oneHandlers[type] // will never fire again
        }
        return this // for chaining
    }
    EmitterMixin.prototype.hasHandlers = function (type) {
        return (this._handlers && this._handlers[type] && this._handlers[type].length) ||
            (this._oneHandlers && this._oneHandlers[type] && this._oneHandlers[type].length)
    }
    return EmitterMixin
}(Mixin))
function addToHash(hash, type, handler) {
    (hash[type] || (hash[type] = []))
        .push(handler)
}
function removeFromHash(hash, type, handler) {
    if (handler) {
        if (hash[type]) {
            hash[type] = hash[type].filter(function (func) {
                return func !== handler
            })
        }
    } else {
        delete hash[type] // remove all handler funcs for this type
    }
}

/*
Records offset information for a set of elements, relative to an origin element.
Can record the left/right OR the top/bottom OR both.
Provides methods for querying the cache by position.
*/
const PositionCache = /** @class */ (function () {
    function PositionCache(originEl, els, isHorizontal, isVertical) {
        this.originEl = originEl
        this.els = els
        this.isHorizontal = isHorizontal
        this.isVertical = isVertical
    }
    // Queries the els for coordinates and stores them.
    // Call this method before using and of the get* methods below.
    PositionCache.prototype.build = function () {
        const originEl = this.originEl
        const originClientRect = this.originClientRect =
            originEl.getBoundingClientRect() // relative to viewport top-left
        if (this.isHorizontal) {
            this.buildElHorizontals(originClientRect.left)
        }
        if (this.isVertical) {
            this.buildElVerticals(originClientRect.top)
        }
    }
    // Populates the left/right internal coordinate arrays
    PositionCache.prototype.buildElHorizontals = function (originClientLeft) {
        const lefts = []
        const rights = []
        for (let _i = 0, _a = this.els; _i < _a.length; _i++) {
            const el = _a[_i]
            const rect = el.getBoundingClientRect()
            lefts.push(rect.left - originClientLeft)
            rights.push(rect.right - originClientLeft)
        }
        this.lefts = lefts
        this.rights = rights
    }
    // Populates the top/bottom internal coordinate arrays
    PositionCache.prototype.buildElVerticals = function (originClientTop) {
        const tops = []
        const bottoms = []
        for (let _i = 0, _a = this.els; _i < _a.length; _i++) {
            const el = _a[_i]
            const rect = el.getBoundingClientRect()
            tops.push(rect.top - originClientTop)
            bottoms.push(rect.bottom - originClientTop)
        }
        this.tops = tops
        this.bottoms = bottoms
    }
    // Given a left offset (from document left), returns the index of the el that it horizontally intersects.
    // If no intersection is made, returns undefined.
    PositionCache.prototype.leftToIndex = function (leftPosition) {
        const lefts = this.lefts
        const rights = this.rights
        const len = lefts.length
        let i
        for (i = 0; i < len; i++) {
            if (leftPosition >= lefts[i] && leftPosition < rights[i]) {
                return i
            }
        }
    }
    // Given a top offset (from document top), returns the index of the el that it vertically intersects.
    // If no intersection is made, returns undefined.
    PositionCache.prototype.topToIndex = function (topPosition) {
        const tops = this.tops
        const bottoms = this.bottoms
        const len = tops.length
        let i
        for (i = 0; i < len; i++) {
            if (topPosition >= tops[i] && topPosition < bottoms[i]) {
                return i
            }
        }
    }
    // Gets the width of the element at the given index
    PositionCache.prototype.getWidth = function (leftIndex) {
        return this.rights[leftIndex] - this.lefts[leftIndex]
    }
    // Gets the height of the element at the given index
    PositionCache.prototype.getHeight = function (topIndex) {
        return this.bottoms[topIndex] - this.tops[topIndex]
    }
    return PositionCache
}())

/*
An object for getting/setting scroll-related information for an element.
Internally, this is done very differently for window versus DOM element,
so this object serves as a common interface.
*/
const ScrollController = /** @class */ (function () {
    function ScrollController() {
    }
    ScrollController.prototype.getMaxScrollTop = function () {
        return this.getScrollHeight() - this.getClientHeight()
    }
    ScrollController.prototype.getMaxScrollLeft = function () {
        return this.getScrollWidth() - this.getClientWidth()
    }
    ScrollController.prototype.canScrollVertically = function () {
        return this.getMaxScrollTop() > 0
    }
    ScrollController.prototype.canScrollHorizontally = function () {
        return this.getMaxScrollLeft() > 0
    }
    ScrollController.prototype.canScrollUp = function () {
        return this.getScrollTop() > 0
    }
    ScrollController.prototype.canScrollDown = function () {
        return this.getScrollTop() < this.getMaxScrollTop()
    }
    ScrollController.prototype.canScrollLeft = function () {
        return this.getScrollLeft() > 0
    }
    ScrollController.prototype.canScrollRight = function () {
        return this.getScrollLeft() < this.getMaxScrollLeft()
    }
    return ScrollController
}())
const ElementScrollController = /** @class */ (function (_super) {
    __extends(ElementScrollController, _super)
    function ElementScrollController(el) {
        const _this = _super.call(this) || this
        _this.el = el
        return _this
    }
    ElementScrollController.prototype.getScrollTop = function () {
        return this.el.scrollTop
    }
    ElementScrollController.prototype.getScrollLeft = function () {
        return this.el.scrollLeft
    }
    ElementScrollController.prototype.setScrollTop = function (top) {
        this.el.scrollTop = top
    }
    ElementScrollController.prototype.setScrollLeft = function (left) {
        this.el.scrollLeft = left
    }
    ElementScrollController.prototype.getScrollWidth = function () {
        return this.el.scrollWidth
    }
    ElementScrollController.prototype.getScrollHeight = function () {
        return this.el.scrollHeight
    }
    ElementScrollController.prototype.getClientHeight = function () {
        return this.el.clientHeight
    }
    ElementScrollController.prototype.getClientWidth = function () {
        return this.el.clientWidth
    }
    return ElementScrollController
}(ScrollController))
const WindowScrollController = /** @class */ (function (_super) {
    __extends(WindowScrollController, _super)
    function WindowScrollController() {
        return _super !== null && _super.apply(this, arguments) || this
    }
    WindowScrollController.prototype.getScrollTop = function () {
        return window.pageYOffset
    }
    WindowScrollController.prototype.getScrollLeft = function () {
        return window.pageXOffset
    }
    WindowScrollController.prototype.setScrollTop = function (n) {
        window.scroll(window.pageXOffset, n)
    }
    WindowScrollController.prototype.setScrollLeft = function (n) {
        window.scroll(n, window.pageYOffset)
    }
    WindowScrollController.prototype.getScrollWidth = function () {
        return document.documentElement.scrollWidth
    }
    WindowScrollController.prototype.getScrollHeight = function () {
        return document.documentElement.scrollHeight
    }
    WindowScrollController.prototype.getClientHeight = function () {
        return document.documentElement.clientHeight
    }
    WindowScrollController.prototype.getClientWidth = function () {
        return document.documentElement.clientWidth
    }
    return WindowScrollController
}(ScrollController))

/*
Embodies a div that has potential scrollbars
*/
const ScrollComponent = /** @class */ (function (_super) {
    __extends(ScrollComponent, _super)
    function ScrollComponent(overflowX, overflowY) {
        const _this = _super.call(this, createElement('div', {
            className: 'fc-scroller'
        })) || this
        _this.overflowX = overflowX
        _this.overflowY = overflowY
        _this.applyOverflow()
        return _this
    }
    // sets to natural height, unlocks overflow
    ScrollComponent.prototype.clear = function () {
        this.setHeight('auto')
        this.applyOverflow()
    }
    ScrollComponent.prototype.destroy = function () {
        removeElement(this.el)
    }
    // Overflow
    // -----------------------------------------------------------------------------------------------------------------
    ScrollComponent.prototype.applyOverflow = function () {
        applyStyle(this.el, {
            overflowX: this.overflowX,
            overflowY: this.overflowY
        })
    }
    // Causes any 'auto' overflow values to resolves to 'scroll' or 'hidden'.
    // Useful for preserving scrollbar widths regardless of future resizes.
    // Can pass in scrollbarWidths for optimization.
    ScrollComponent.prototype.lockOverflow = function (scrollbarWidths) {
        let overflowX = this.overflowX
        let overflowY = this.overflowY
        scrollbarWidths = scrollbarWidths || this.getScrollbarWidths()
        if (overflowX === 'auto') {
            overflowX = (scrollbarWidths.bottom || // horizontal scrollbars?
                this.canScrollHorizontally() // OR scrolling pane with massless scrollbars?
            ) ? 'scroll' : 'hidden'
        }
        if (overflowY === 'auto') {
            overflowY = (scrollbarWidths.left || scrollbarWidths.right || // horizontal scrollbars?
                this.canScrollVertically() // OR scrolling pane with massless scrollbars?
            ) ? 'scroll' : 'hidden'
        }
        applyStyle(this.el, { overflowX, overflowY })
    }
    ScrollComponent.prototype.setHeight = function (height) {
        applyStyleProp(this.el, 'height', height)
    }
    ScrollComponent.prototype.getScrollbarWidths = function () {
        const edges = computeEdges(this.el)
        return {
            left: edges.scrollbarLeft,
            right: edges.scrollbarRight,
            bottom: edges.scrollbarBottom
        }
    }
    return ScrollComponent
}(ElementScrollController))

const Theme = /** @class */ (function () {
    function Theme(calendarOptions) {
        this.calendarOptions = calendarOptions
        this.processIconOverride()
    }
    Theme.prototype.processIconOverride = function () {
        if (this.iconOverrideOption) {
            this.setIconOverride(this.calendarOptions[this.iconOverrideOption])
        }
    }
    Theme.prototype.setIconOverride = function (iconOverrideHash) {
        let iconClassesCopy
        let buttonName
        if (typeof iconOverrideHash === 'object' && iconOverrideHash) { // non-null object
            iconClassesCopy = __assign({}, this.iconClasses)
            for (buttonName in iconOverrideHash) {
                iconClassesCopy[buttonName] = this.applyIconOverridePrefix(iconOverrideHash[buttonName])
            }
            this.iconClasses = iconClassesCopy
        } else if (iconOverrideHash === false) {
            this.iconClasses = {}
        }
    }
    Theme.prototype.applyIconOverridePrefix = function (className) {
        const prefix = this.iconOverridePrefix
        if (prefix && className.indexOf(prefix) !== 0) { // if not already present
            className = prefix + className
        }
        return className
    }
    Theme.prototype.getClass = function (key) {
        return this.classes[key] || ''
    }
    Theme.prototype.getIconClass = function (buttonName) {
        const className = this.iconClasses[buttonName]
        if (className) {
            return this.baseIconClass + ' ' + className
        }
        return ''
    }
    Theme.prototype.getCustomButtonIconClass = function (customButtonProps) {
        let className
        if (this.iconOverrideCustomButtonOption) {
            className = customButtonProps[this.iconOverrideCustomButtonOption]
            if (className) {
                return this.baseIconClass + ' ' + this.applyIconOverridePrefix(className)
            }
        }
        return ''
    }
    return Theme
}())
Theme.prototype.classes = {}
Theme.prototype.iconClasses = {}
Theme.prototype.baseIconClass = ''
Theme.prototype.iconOverridePrefix = ''

let guid = 0
const Component = /** @class */ (function () {
    function Component(context, isView) {
        // HACK to populate view at top of component instantiation call chain
        if (isView) {
            context.view = this
        }
        this.uid = String(guid++)
        this.context = context
        this.dateEnv = context.dateEnv
        this.theme = context.theme
        this.view = context.view
        this.calendar = context.calendar
        this.isRtl = this.opt('dir') === 'rtl'
    }
    Component.addEqualityFuncs = function (newFuncs) {
        this.prototype.equalityFuncs = __assign({}, this.prototype.equalityFuncs, newFuncs)
    }
    Component.prototype.opt = function (name) {
        return this.context.options[name]
    }
    Component.prototype.receiveProps = function (props) {
        const _a = recycleProps(this.props || {}, props, this.equalityFuncs); const anyChanges = _a.anyChanges; const comboProps = _a.comboProps
        this.props = comboProps
        if (anyChanges) {
            this.render(comboProps)
        }
    }
    Component.prototype.render = function (props) {
    }
    // after destroy is called, this component won't ever be used again
    Component.prototype.destroy = function () {
    }
    return Component
}())
Component.prototype.equalityFuncs = {}
/*
Reuses old values when equal. If anything is unequal, returns newProps as-is.
Great for PureComponent, but won't be feasible with React, so just eliminate and use React's DOM diffing.
*/
function recycleProps(oldProps, newProps, equalityFuncs) {
    const comboProps = {} // some old, some new
    let anyChanges = false
    for (var key in newProps) {
        if (key in oldProps && (oldProps[key] === newProps[key] ||
            (equalityFuncs[key] && equalityFuncs[key](oldProps[key], newProps[key])))) {
            // equal to old? use old prop
            comboProps[key] = oldProps[key]
        } else {
            comboProps[key] = newProps[key]
            anyChanges = true
        }
    }
    for (var key in oldProps) {
        if (!(key in newProps)) {
            anyChanges = true
            break
        }
    }
    return { anyChanges, comboProps }
}

/*
PURPOSES:
- hook up to fg, fill, and mirror renderers
- interface for dragging and hits
*/
const DateComponent = /** @class */ (function (_super) {
    __extends(DateComponent, _super)
    function DateComponent(context, el, isView) {
        const _this = _super.call(this, context, isView) || this
        _this.el = el
        return _this
    }
    DateComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this)
        removeElement(this.el)
    }
    // TODO: WHAT ABOUT (sourceSeg && sourceSeg.component.doesDragMirror)
    //
    // Event Drag-n-Drop Rendering (for both events and external elements)
    // ---------------------------------------------------------------------------------------------------------------
    /*
    renderEventDragSegs(state: EventSegUiInteractionState) {
      if (state) {
        let { isEvent, segs, sourceSeg } = state

        if (this.eventRenderer) {
          this.eventRenderer.hideByHash(state.affectedInstances)
        }

        // if the user is dragging something that is considered an event with real event data,
        // and this component likes to do drag mirrors OR the component where the seg came from
        // likes to do drag mirrors, then render a drag mirror.
        if (isEvent && (this.doesDragMirror || sourceSeg && sourceSeg.component.doesDragMirror)) {
          if (this.mirrorRenderer) {
            this.mirrorRenderer.renderSegs(segs, { isDragging: true, sourceSeg })
          }
        }

        // if it would be impossible to render a drag mirror OR this component likes to render
        // highlights, then render a highlight.
        if (!isEvent || this.doesDragHighlight) {
          if (this.fillRenderer) {
            this.fillRenderer.renderSegs('highlight', segs)
          }
        }
      }
    }
    */
    // Hit System
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.buildPositionCaches = function () {
    }
    DateComponent.prototype.queryHit = function (positionLeft, positionTop, elWidth, elHeight) {
        return null // this should be abstract
    }
    // Validation
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.isInteractionValid = function (interaction) {
        const calendar = this.calendar
        const dateProfile = this.props.dateProfile // HACK
        const instances = interaction.mutatedEvents.instances
        if (dateProfile) { // HACK for DayTile
            for (const instanceId in instances) {
                if (!rangeContainsRange(dateProfile.validRange, instances[instanceId].range)) {
                    return false
                }
            }
        }
        return isInteractionValid(interaction, calendar)
    }
    DateComponent.prototype.isDateSelectionValid = function (selection) {
        const dateProfile = this.props.dateProfile // HACK
        if (dateProfile && // HACK for DayTile
            !rangeContainsRange(dateProfile.validRange, selection.range)) {
            return false
        }
        return isDateSelectionValid(selection, this.calendar)
    }
    // Triggering
    // -----------------------------------------------------------------------------------------------------------------
    // TODO: move to Calendar
    DateComponent.prototype.publiclyTrigger = function (name, args) {
        const calendar = this.calendar
        return calendar.publiclyTrigger(name, args)
    }
    DateComponent.prototype.publiclyTriggerAfterSizing = function (name, args) {
        const calendar = this.calendar
        return calendar.publiclyTriggerAfterSizing(name, args)
    }
    DateComponent.prototype.hasPublicHandlers = function (name) {
        const calendar = this.calendar
        return calendar.hasPublicHandlers(name)
    }
    DateComponent.prototype.triggerRenderedSegs = function (segs, isMirrors) {
        const calendar = this.calendar
        if (this.hasPublicHandlers('eventPositioned')) {
            for (let _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
                const seg = segs_1[_i]
                this.publiclyTriggerAfterSizing('eventPositioned', [
                    {
                        event: new EventApi(calendar, seg.eventRange.def, seg.eventRange.instance),
                        isMirror: isMirrors,
                        isStart: seg.isStart,
                        isEnd: seg.isEnd,
                        el: seg.el,
                        view: this // safe to cast because this method is only called on context.view
                    }
                ])
            }
        }
        if (!calendar.state.loadingLevel) { // avoid initial empty state while pending
            calendar.afterSizingTriggers._eventsPositioned = [null] // fire once
        }
    }
    DateComponent.prototype.triggerWillRemoveSegs = function (segs, isMirrors) {
        const calendar = this.calendar
        for (let _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
            var seg = segs_2[_i]
            calendar.trigger('eventElRemove', seg.el)
        }
        if (this.hasPublicHandlers('eventDestroy')) {
            for (let _a = 0, segs_3 = segs; _a < segs_3.length; _a++) {
                var seg = segs_3[_a]
                this.publiclyTrigger('eventDestroy', [
                    {
                        event: new EventApi(calendar, seg.eventRange.def, seg.eventRange.instance),
                        isMirror: isMirrors,
                        el: seg.el,
                        view: this // safe to cast because this method is only called on context.view
                    }
                ])
            }
        }
    }
    // Pointer Interaction Utils
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.isValidSegDownEl = function (el) {
        return !this.props.eventDrag && // HACK
            !this.props.eventResize && // HACK
            !elementClosest(el, '.fc-mirror') &&
            (this.isPopover() || !this.isInPopover(el))
        // ^above line ensures we don't detect a seg interaction within a nested component.
        // it's a HACK because it only supports a popover as the nested component.
    }
    DateComponent.prototype.isValidDateDownEl = function (el) {
        const segEl = elementClosest(el, this.fgSegSelector)
        return (!segEl || segEl.classList.contains('fc-mirror')) &&
            !elementClosest(el, '.fc-more') && // a "more.." link
            !elementClosest(el, 'a[data-goto]') && // a clickable nav link
            !this.isInPopover(el)
    }
    DateComponent.prototype.isPopover = function () {
        return this.el.classList.contains('fc-popover')
    }
    DateComponent.prototype.isInPopover = function (el) {
        return Boolean(elementClosest(el, '.fc-popover'))
    }
    return DateComponent
}(Component))
DateComponent.prototype.fgSegSelector = '.fc-event-container > *'
DateComponent.prototype.bgSegSelector = '.fc-bgevent:not(.fc-nonbusiness)'

let uid$1 = 0
function createPlugin(input) {
    return {
        id: String(uid$1++),
        deps: input.deps || [],
        reducers: input.reducers || [],
        eventDefParsers: input.eventDefParsers || [],
        isDraggableTransformers: input.isDraggableTransformers || [],
        eventDragMutationMassagers: input.eventDragMutationMassagers || [],
        eventDefMutationAppliers: input.eventDefMutationAppliers || [],
        dateSelectionTransformers: input.dateSelectionTransformers || [],
        datePointTransforms: input.datePointTransforms || [],
        dateSpanTransforms: input.dateSpanTransforms || [],
        views: input.views || {},
        viewPropsTransformers: input.viewPropsTransformers || [],
        isPropsValid: input.isPropsValid || null,
        externalDefTransforms: input.externalDefTransforms || [],
        eventResizeJoinTransforms: input.eventResizeJoinTransforms || [],
        viewContainerModifiers: input.viewContainerModifiers || [],
        eventDropTransformers: input.eventDropTransformers || [],
        componentInteractions: input.componentInteractions || [],
        calendarInteractions: input.calendarInteractions || [],
        themeClasses: input.themeClasses || {},
        eventSourceDefs: input.eventSourceDefs || [],
        cmdFormatter: input.cmdFormatter,
        recurringTypes: input.recurringTypes || [],
        namedTimeZonedImpl: input.namedTimeZonedImpl,
        defaultView: input.defaultView || '',
        elementDraggingImpl: input.elementDraggingImpl,
        optionChangeHandlers: input.optionChangeHandlers || {}
    }
}
const PluginSystem = /** @class */ (function () {
    function PluginSystem() {
        this.hooks = {
            reducers: [],
            eventDefParsers: [],
            isDraggableTransformers: [],
            eventDragMutationMassagers: [],
            eventDefMutationAppliers: [],
            dateSelectionTransformers: [],
            datePointTransforms: [],
            dateSpanTransforms: [],
            views: {},
            viewPropsTransformers: [],
            isPropsValid: null,
            externalDefTransforms: [],
            eventResizeJoinTransforms: [],
            viewContainerModifiers: [],
            eventDropTransformers: [],
            componentInteractions: [],
            calendarInteractions: [],
            themeClasses: {},
            eventSourceDefs: [],
            cmdFormatter: null,
            recurringTypes: [],
            namedTimeZonedImpl: null,
            defaultView: '',
            elementDraggingImpl: null,
            optionChangeHandlers: {}
        }
        this.addedHash = {}
    }
    PluginSystem.prototype.add = function (plugin) {
        if (!this.addedHash[plugin.id]) {
            this.addedHash[plugin.id] = true
            for (let _i = 0, _a = plugin.deps; _i < _a.length; _i++) {
                const dep = _a[_i]
                this.add(dep)
            }
            this.hooks = combineHooks(this.hooks, plugin)
        }
    }
    return PluginSystem
}())
function combineHooks(hooks0, hooks1) {
    return {
        reducers: hooks0.reducers.concat(hooks1.reducers),
        eventDefParsers: hooks0.eventDefParsers.concat(hooks1.eventDefParsers),
        isDraggableTransformers: hooks0.isDraggableTransformers.concat(hooks1.isDraggableTransformers),
        eventDragMutationMassagers: hooks0.eventDragMutationMassagers.concat(hooks1.eventDragMutationMassagers),
        eventDefMutationAppliers: hooks0.eventDefMutationAppliers.concat(hooks1.eventDefMutationAppliers),
        dateSelectionTransformers: hooks0.dateSelectionTransformers.concat(hooks1.dateSelectionTransformers),
        datePointTransforms: hooks0.datePointTransforms.concat(hooks1.datePointTransforms),
        dateSpanTransforms: hooks0.dateSpanTransforms.concat(hooks1.dateSpanTransforms),
        views: __assign({}, hooks0.views, hooks1.views),
        viewPropsTransformers: hooks0.viewPropsTransformers.concat(hooks1.viewPropsTransformers),
        isPropsValid: hooks1.isPropsValid || hooks0.isPropsValid,
        externalDefTransforms: hooks0.externalDefTransforms.concat(hooks1.externalDefTransforms),
        eventResizeJoinTransforms: hooks0.eventResizeJoinTransforms.concat(hooks1.eventResizeJoinTransforms),
        viewContainerModifiers: hooks0.viewContainerModifiers.concat(hooks1.viewContainerModifiers),
        eventDropTransformers: hooks0.eventDropTransformers.concat(hooks1.eventDropTransformers),
        calendarInteractions: hooks0.calendarInteractions.concat(hooks1.calendarInteractions),
        componentInteractions: hooks0.componentInteractions.concat(hooks1.componentInteractions),
        themeClasses: __assign({}, hooks0.themeClasses, hooks1.themeClasses),
        eventSourceDefs: hooks0.eventSourceDefs.concat(hooks1.eventSourceDefs),
        cmdFormatter: hooks1.cmdFormatter || hooks0.cmdFormatter,
        recurringTypes: hooks0.recurringTypes.concat(hooks1.recurringTypes),
        namedTimeZonedImpl: hooks1.namedTimeZonedImpl || hooks0.namedTimeZonedImpl,
        defaultView: hooks0.defaultView || hooks1.defaultView,
        elementDraggingImpl: hooks0.elementDraggingImpl || hooks1.elementDraggingImpl,
        optionChangeHandlers: __assign({}, hooks0.optionChangeHandlers, hooks1.optionChangeHandlers)
    }
}

const eventSourceDef = {
    ignoreRange: true,
    parseMeta: function (raw) {
        if (Array.isArray(raw)) { // short form
            return raw
        } else if (Array.isArray(raw.events)) {
            return raw.events
        }
        return null
    },
    fetch: function (arg, success) {
        success({
            rawEvents: arg.eventSource.meta
        })
    }
}
const ArrayEventSourcePlugin = createPlugin({
    eventSourceDefs: [eventSourceDef]
})

const eventSourceDef$1 = {
    parseMeta: function (raw) {
        if (typeof raw === 'function') { // short form
            return raw
        } else if (typeof raw.events === 'function') {
            return raw.events
        }
        return null
    },
    fetch: function (arg, success, failure) {
        const dateEnv = arg.calendar.dateEnv
        const func = arg.eventSource.meta
        unpromisify(func.bind(null, {
            start: dateEnv.toDate(arg.range.start),
            end: dateEnv.toDate(arg.range.end),
            startStr: dateEnv.formatIso(arg.range.start),
            endStr: dateEnv.formatIso(arg.range.end),
            timeZone: dateEnv.timeZone
        }), function (rawEvents) {
            success({ rawEvents }) // needs an object response
        }, failure // send errorObj directly to failure callback
        )
    }
}
const FuncEventSourcePlugin = createPlugin({
    eventSourceDefs: [eventSourceDef$1]
})

function requestJson(method, url, params, successCallback, failureCallback) {
    method = method.toUpperCase()
    let body = null
    if (method === 'GET') {
        url = injectQueryStringParams(url, params)
    } else {
        body = encodeParams(params)
    }
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    if (method !== 'GET') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    }
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            try {
                const res = JSON.parse(xhr.responseText)
                successCallback(res, xhr)
            } catch (err) {
                failureCallback('Failure parsing JSON', xhr)
            }
        } else {
            failureCallback('Request failed', xhr)
        }
    }
    xhr.onerror = function () {
        failureCallback('Request failed', xhr)
    }
    xhr.send(body)
}
function injectQueryStringParams(url, params) {
    return url +
        (url.indexOf('?') === -1 ? '?' : '&') +
        encodeParams(params)
}
function encodeParams(params) {
    const parts = []
    for (const key in params) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    }
    return parts.join('&')
}

const eventSourceDef$2 = {
    parseMeta: function (raw) {
        if (typeof raw === 'string') { // short form
            raw = { url: raw }
        } else if (!raw || typeof raw !== 'object' || !raw.url) {
            return null
        }
        return {
            url: raw.url,
            method: (raw.method || 'GET').toUpperCase(),
            extraParams: raw.extraParams,
            startParam: raw.startParam,
            endParam: raw.endParam,
            timeZoneParam: raw.timeZoneParam
        }
    },
    fetch: function (arg, success, failure) {
        const meta = arg.eventSource.meta
        const requestParams = buildRequestParams(meta, arg.range, arg.calendar)
        requestJson(meta.method, meta.url, requestParams, function (rawEvents, xhr) {
            success({ rawEvents, xhr })
        }, function (errorMessage, xhr) {
            failure({ message: errorMessage, xhr })
        })
    }
}
const JsonFeedEventSourcePlugin = createPlugin({
    eventSourceDefs: [eventSourceDef$2]
})
function buildRequestParams(meta, range, calendar) {
    const dateEnv = calendar.dateEnv
    let startParam
    let endParam
    let timeZoneParam
    let customRequestParams
    const params = {}
    startParam = meta.startParam
    if (startParam == null) {
        startParam = calendar.opt('startParam')
    }
    endParam = meta.endParam
    if (endParam == null) {
        endParam = calendar.opt('endParam')
    }
    timeZoneParam = meta.timeZoneParam
    if (timeZoneParam == null) {
        timeZoneParam = calendar.opt('timeZoneParam')
    }
    // retrieve any outbound GET/POST data from the options
    if (typeof meta.extraParams === 'function') {
        // supplied as a function that returns a key/value object
        customRequestParams = meta.extraParams()
    } else {
        // probably supplied as a straight key/value object
        customRequestParams = meta.extraParams || {}
    }
    __assign(params, customRequestParams)
    params[startParam] = dateEnv.formatIso(range.start)
    params[endParam] = dateEnv.formatIso(range.end)
    if (dateEnv.timeZone !== 'local') {
        params[timeZoneParam] = dateEnv.timeZone
    }
    return params
}

const recurring = {
    parse: function (rawEvent, leftoverProps, dateEnv) {
        const createMarker = dateEnv.createMarker.bind(dateEnv)
        const processors = {
            daysOfWeek: null,
            startTime: createDuration,
            endTime: createDuration,
            startRecur: createMarker,
            endRecur: createMarker
        }
        const props = refineProps(rawEvent, processors, {}, leftoverProps)
        let anyValid = false
        for (const propName in props) {
            if (props[propName] != null) {
                anyValid = true
                break
            }
        }
        if (anyValid) {
            let duration = null
            if ('duration' in leftoverProps) {
                duration = createDuration(leftoverProps.duration)
                delete leftoverProps.duration
            }
            if (!duration && props.startTime && props.endTime) {
                duration = subtractDurations(props.endTime, props.startTime)
            }
            return {
                allDayGuess: Boolean(!props.startTime && !props.endTime),
                duration,
                typeData: props // doesn't need endTime anymore but oh well
            }
        }
        return null
    },
    expand: function (typeData, framingRange, dateEnv) {
        const clippedFramingRange = intersectRanges(framingRange, { start: typeData.startRecur, end: typeData.endRecur })
        if (clippedFramingRange) {
            return expandRanges(typeData.daysOfWeek, typeData.startTime, clippedFramingRange, dateEnv)
        } else {
            return []
        }
    }
}
const SimpleRecurrencePlugin = createPlugin({
    recurringTypes: [recurring]
})
function expandRanges(daysOfWeek, startTime, framingRange, dateEnv) {
    const dowHash = daysOfWeek ? arrayToHash(daysOfWeek) : null
    let dayMarker = startOfDay(framingRange.start)
    const endMarker = framingRange.end
    const instanceStarts = []
    while (dayMarker < endMarker) {
        let instanceStart =
        // if everyday, or this particular day-of-week
        void 0
        // if everyday, or this particular day-of-week
        if (!dowHash || dowHash[dayMarker.getUTCDay()]) {
            if (startTime) {
                instanceStart = dateEnv.add(dayMarker, startTime)
            } else {
                instanceStart = dayMarker
            }
            instanceStarts.push(instanceStart)
        }
        dayMarker = addDays(dayMarker, 1)
    }
    return instanceStarts
}

const DefaultOptionChangeHandlers = createPlugin({
    optionChangeHandlers: {
        events: function (events, calendar, deepEqual) {
            handleEventSources([events], calendar, deepEqual)
        },
        eventSources: handleEventSources,
        plugins: handlePlugins
    }
})
function handleEventSources(inputs, calendar, deepEqual) {
    const unfoundSources = hashValuesToArray(calendar.state.eventSources)
    const newInputs = []
    for (let _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        const input = inputs_1[_i]
        let inputFound = false
        for (let i = 0; i < unfoundSources.length; i++) {
            if (deepEqual(unfoundSources[i]._raw, input)) {
                unfoundSources.splice(i, 1) // delete
                inputFound = true
                break
            }
        }
        if (!inputFound) {
            newInputs.push(input)
        }
    }
    for (let _a = 0, unfoundSources_1 = unfoundSources; _a < unfoundSources_1.length; _a++) {
        const unfoundSource = unfoundSources_1[_a]
        calendar.dispatch({
            type: 'REMOVE_EVENT_SOURCE',
            sourceId: unfoundSource.sourceId
        })
    }
    for (let _b = 0, newInputs_1 = newInputs; _b < newInputs_1.length; _b++) {
        const newInput = newInputs_1[_b]
        calendar.addEventSource(newInput)
    }
}
// shortcoming: won't remove plugins
function handlePlugins(inputs, calendar) {
    calendar.addPluginInputs(inputs) // will gracefully handle duplicates
}

const config = {} // TODO: make these options
const globalDefaults = {
    defaultRangeSeparator: ' - ',
    titleRangeSeparator: ' \u2013 ',
    defaultTimedEventDuration: '01:00:00',
    defaultAllDayEventDuration: { day: 1 },
    forceEventDuration: false,
    nextDayThreshold: '00:00:00',
    // display
    columnHeader: true,
    defaultView: '',
    aspectRatio: 1.35,
    header: {
        left: 'title',
        center: '',
        right: 'today prev,next'
    },
    weekends: true,
    weekNumbers: false,
    weekNumberCalculation: 'local',
    editable: false,
    // nowIndicator: false,
    scrollTime: '06:00:00',
    minTime: '00:00:00',
    maxTime: '24:00:00',
    showNonCurrentDates: true,
    // event ajax
    lazyFetching: true,
    startParam: 'start',
    endParam: 'end',
    timeZoneParam: 'timeZone',
    timeZone: 'local',
    // allDayDefault: undefined,
    // locale
    locales: [],
    locale: '',
    // dir: will get this from the default locale
    // buttonIcons: null,
    // allows setting a min-height to the event segment to prevent short events overlapping each other
    timeGridEventMinHeight: 0,
    themeSystem: 'standard',
    // eventResizableFromStart: false,
    dragRevertDuration: 500,
    dragScroll: true,
    allDayMaintainDuration: false,
    // selectable: false,
    unselectAuto: true,
    // selectMinDistance: 0,
    dropAccept: '*',
    eventOrder: 'start,-duration,allDay,title',
    // ^ if start tie, longer events go before shorter. final tie-breaker is title text
    // rerenderDelay: null,
    eventLimit: false,
    eventLimitClick: 'popover',
    dayPopoverFormat: { month: 'long', day: 'numeric', year: 'numeric' },
    handleWindowResize: true,
    windowResizeDelay: 100,
    longPressDelay: 1000,
    eventDragMinDistance: 5 // only applies to mouse
}
const rtlDefaults = {
    header: {
        left: 'next,prev today',
        center: '',
        right: 'title'
    },
    buttonIcons: {
        // TODO: make RTL support the responibility of the theme
        prev: 'fc-icon-chevron-right',
        next: 'fc-icon-chevron-left',
        prevYear: 'fc-icon-chevrons-right',
        nextYear: 'fc-icon-chevrons-left'
    }
}
const complexOptions = [
    'header',
    'footer',
    'buttonText',
    'buttonIcons'
]
// Merges an array of option objects into a single object
function mergeOptions(optionObjs) {
    return mergeProps(optionObjs, complexOptions)
}
// TODO: move this stuff to a "plugin"-related file...
const INTERNAL_PLUGINS = [
    ArrayEventSourcePlugin,
    FuncEventSourcePlugin,
    JsonFeedEventSourcePlugin,
    SimpleRecurrencePlugin,
    DefaultOptionChangeHandlers
]
function refinePluginDefs(pluginInputs) {
    const plugins = []
    for (let _i = 0, pluginInputs_1 = pluginInputs; _i < pluginInputs_1.length; _i++) {
        const pluginInput = pluginInputs_1[_i]
        if (typeof pluginInput === 'string') {
            const globalName = 'FullCalendar' + capitaliseFirstLetter(pluginInput)
            if (!window[globalName]) {
                console.warn('Plugin file not loaded for ' + pluginInput)
            } else {
                plugins.push(window[globalName].default) // is an ES6 module
            }
        } else {
            plugins.push(pluginInput)
        }
    }
    return INTERNAL_PLUGINS.concat(plugins)
}

const RAW_EN_LOCALE = {
    code: 'en',
    week: {
        dow: 0,
        doy: 4 // 4 days need to be within the year to be considered the first week
    },
    dir: 'ltr',
    buttonText: {
        prev: 'prev',
        next: 'next',
        prevYear: 'prev year',
        nextYear: 'next year',
        year: 'year',
        today: 'today',
        month: 'month',
        week: 'week',
        day: 'day',
        list: 'list'
    },
    weekLabel: 'W',
    allDayText: 'all-day',
    eventLimitText: 'more',
    noEventsMessage: 'No events to display'
}
function parseRawLocales(explicitRawLocales) {
    const defaultCode = explicitRawLocales.length > 0 ? explicitRawLocales[0].code : 'en'
    const globalArray = window.FullCalendarLocalesAll || [] // from locales-all.js
    const globalObject = window.FullCalendarLocales || {} // from locales/*.js. keys are meaningless
    const allRawLocales = globalArray.concat(// globalArray is low prio
    hashValuesToArray(globalObject), // medium prio
    explicitRawLocales // highest prio
    )
    const rawLocaleMap = {
        en: RAW_EN_LOCALE // necessary?
    }
    for (let _i = 0, allRawLocales_1 = allRawLocales; _i < allRawLocales_1.length; _i++) {
        const rawLocale = allRawLocales_1[_i]
        rawLocaleMap[rawLocale.code] = rawLocale
    }
    return {
        map: rawLocaleMap,
        defaultCode
    }
}
function buildLocale(inputSingular, available) {
    if (typeof inputSingular === 'object' && !Array.isArray(inputSingular)) {
        return parseLocale(inputSingular.code, [inputSingular.code], inputSingular)
    } else {
        return queryLocale(inputSingular, available)
    }
}
function queryLocale(codeArg, available) {
    const codes = [].concat(codeArg || []) // will convert to array
    const raw = queryRawLocale(codes, available) || RAW_EN_LOCALE
    return parseLocale(codeArg, codes, raw)
}
function queryRawLocale(codes, available) {
    for (let i = 0; i < codes.length; i++) {
        const parts = codes[i].toLocaleLowerCase().split('-')
        for (let j = parts.length; j > 0; j--) {
            const simpleId = parts.slice(0, j).join('-')
            if (available[simpleId]) {
                return available[simpleId]
            }
        }
    }
    return null
}
function parseLocale(codeArg, codes, raw) {
    const merged = mergeProps([RAW_EN_LOCALE, raw], ['buttonText'])
    delete merged.code // don't want this part of the options
    const week = merged.week
    delete merged.week
    return {
        codeArg,
        codes,
        week,
        simpleNumberFormat: new Intl.NumberFormat(codeArg),
        options: merged
    }
}

const OptionsManager = /** @class */ (function () {
    function OptionsManager(overrides) {
        this.overrides = __assign({}, overrides) // make a copy
        this.dynamicOverrides = {}
        this.compute()
    }
    OptionsManager.prototype.mutate = function (updates, removals, isDynamic) {
        const overrideHash = isDynamic ? this.dynamicOverrides : this.overrides
        __assign(overrideHash, updates)
        for (let _i = 0, removals_1 = removals; _i < removals_1.length; _i++) {
            const propName = removals_1[_i]
            delete overrideHash[propName]
        }
        this.compute()
    }
    // Computes the flattened options hash for the calendar and assigns to `this.options`.
    // Assumes this.overrides and this.dynamicOverrides have already been initialized.
    OptionsManager.prototype.compute = function () {
        // TODO: not a very efficient system
        const locales = firstDefined(// explicit locale option given?
        this.dynamicOverrides.locales, this.overrides.locales, globalDefaults.locales)
        const locale = firstDefined(// explicit locales option given?
        this.dynamicOverrides.locale, this.overrides.locale, globalDefaults.locale)
        const available = parseRawLocales(locales)
        const localeDefaults = buildLocale(locale || available.defaultCode, available.map).options
        const dir = firstDefined(// based on options computed so far, is direction RTL?
        this.dynamicOverrides.dir, this.overrides.dir, localeDefaults.dir)
        const dirDefaults = dir === 'rtl' ? rtlDefaults : {}
        this.dirDefaults = dirDefaults
        this.localeDefaults = localeDefaults
        this.computed = mergeOptions([
            globalDefaults,
            dirDefaults,
            localeDefaults,
            this.overrides,
            this.dynamicOverrides
        ])
    }
    return OptionsManager
}())

const calendarSystemClassMap = {}
function registerCalendarSystem(name, theClass) {
    calendarSystemClassMap[name] = theClass
}
function createCalendarSystem(name) {
    return new calendarSystemClassMap[name]()
}
const GregorianCalendarSystem = /** @class */ (function () {
    function GregorianCalendarSystem() {
    }
    GregorianCalendarSystem.prototype.getMarkerYear = function (d) {
        return d.getUTCFullYear()
    }
    GregorianCalendarSystem.prototype.getMarkerMonth = function (d) {
        return d.getUTCMonth()
    }
    GregorianCalendarSystem.prototype.getMarkerDay = function (d) {
        return d.getUTCDate()
    }
    GregorianCalendarSystem.prototype.arrayToMarker = function (arr) {
        return arrayToUtcDate(arr)
    }
    GregorianCalendarSystem.prototype.markerToArray = function (marker) {
        return dateToUtcArray(marker)
    }
    return GregorianCalendarSystem
}())
registerCalendarSystem('gregory', GregorianCalendarSystem)

const ISO_RE = /^\s*(\d{4})(-(\d{2})(-(\d{2})([T ](\d{2}):(\d{2})(:(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/
function parse(str) {
    const m = ISO_RE.exec(str)
    if (m) {
        const marker = new Date(Date.UTC(Number(m[1]), m[3] ? Number(m[3]) - 1 : 0, Number(m[5] || 1), Number(m[7] || 0), Number(m[8] || 0), Number(m[10] || 0), m[12] ? Number('0.' + m[12]) * 1000 : 0))
        if (isValidDate(marker)) {
            let timeZoneOffset = null
            if (m[13]) {
                timeZoneOffset = (m[15] === '-' ? -1 : 1) * (Number(m[16] || 0) * 60 +
                    Number(m[18] || 0))
            }
            return {
                marker,
                isTimeUnspecified: !m[6],
                timeZoneOffset
            }
        }
    }
    return null
}

const DateEnv = /** @class */ (function () {
    function DateEnv(settings) {
        const timeZone = this.timeZone = settings.timeZone
        const isNamedTimeZone = timeZone !== 'local' && timeZone !== 'UTC'
        if (settings.namedTimeZoneImpl && isNamedTimeZone) {
            this.namedTimeZoneImpl = new settings.namedTimeZoneImpl(timeZone)
        }
        this.canComputeOffset = Boolean(!isNamedTimeZone || this.namedTimeZoneImpl)
        this.calendarSystem = createCalendarSystem(settings.calendarSystem)
        this.locale = settings.locale
        this.weekDow = settings.locale.week.dow
        this.weekDoy = settings.locale.week.doy
        if (settings.weekNumberCalculation === 'ISO') {
            this.weekDow = 1
            this.weekDoy = 4
        }
        if (typeof settings.firstDay === 'number') {
            this.weekDow = settings.firstDay
        }
        if (typeof settings.weekNumberCalculation === 'function') {
            this.weekNumberFunc = settings.weekNumberCalculation
        }
        this.weekLabel = settings.weekLabel != null ? settings.weekLabel : settings.locale.options.weekLabel
        this.cmdFormatter = settings.cmdFormatter
    }
    // Creating / Parsing
    DateEnv.prototype.createMarker = function (input) {
        const meta = this.createMarkerMeta(input)
        if (meta === null) {
            return null
        }
        return meta.marker
    }
    DateEnv.prototype.createNowMarker = function () {
        if (this.canComputeOffset) {
            return this.timestampToMarker(new Date().valueOf())
        } else {
            // if we can't compute the current date val for a timezone,
            // better to give the current local date vals than UTC
            return arrayToUtcDate(dateToLocalArray(new Date()))
        }
    }
    DateEnv.prototype.createMarkerMeta = function (input) {
        if (typeof input === 'string') {
            return this.parse(input)
        }
        let marker = null
        if (typeof input === 'number') {
            marker = this.timestampToMarker(input)
        } else if (input instanceof Date) {
            input = input.valueOf()
            if (!isNaN(input)) {
                marker = this.timestampToMarker(input)
            }
        } else if (Array.isArray(input)) {
            marker = arrayToUtcDate(input)
        }
        if (marker === null || !isValidDate(marker)) {
            return null
        }
        return { marker, isTimeUnspecified: false, forcedTzo: null }
    }
    DateEnv.prototype.parse = function (s) {
        const parts = parse(s)
        if (parts === null) {
            return null
        }
        let marker = parts.marker
        let forcedTzo = null
        if (parts.timeZoneOffset !== null) {
            if (this.canComputeOffset) {
                marker = this.timestampToMarker(marker.valueOf() - parts.timeZoneOffset * 60 * 1000)
            } else {
                forcedTzo = parts.timeZoneOffset
            }
        }
        return { marker, isTimeUnspecified: parts.isTimeUnspecified, forcedTzo }
    }
    // Accessors
    DateEnv.prototype.getYear = function (marker) {
        return this.calendarSystem.getMarkerYear(marker)
    }
    DateEnv.prototype.getMonth = function (marker) {
        return this.calendarSystem.getMarkerMonth(marker)
    }
    // Adding / Subtracting
    DateEnv.prototype.add = function (marker, dur) {
        const a = this.calendarSystem.markerToArray(marker)
        a[0] += dur.years
        a[1] += dur.months
        a[2] += dur.days
        a[6] += dur.milliseconds
        return this.calendarSystem.arrayToMarker(a)
    }
    DateEnv.prototype.subtract = function (marker, dur) {
        const a = this.calendarSystem.markerToArray(marker)
        a[0] -= dur.years
        a[1] -= dur.months
        a[2] -= dur.days
        a[6] -= dur.milliseconds
        return this.calendarSystem.arrayToMarker(a)
    }
    DateEnv.prototype.addYears = function (marker, n) {
        const a = this.calendarSystem.markerToArray(marker)
        a[0] += n
        return this.calendarSystem.arrayToMarker(a)
    }
    DateEnv.prototype.addMonths = function (marker, n) {
        const a = this.calendarSystem.markerToArray(marker)
        a[1] += n
        return this.calendarSystem.arrayToMarker(a)
    }
    // Diffing Whole Units
    DateEnv.prototype.diffWholeYears = function (m0, m1) {
        const calendarSystem = this.calendarSystem
        if (timeAsMs(m0) === timeAsMs(m1) &&
            calendarSystem.getMarkerDay(m0) === calendarSystem.getMarkerDay(m1) &&
            calendarSystem.getMarkerMonth(m0) === calendarSystem.getMarkerMonth(m1)) {
            return calendarSystem.getMarkerYear(m1) - calendarSystem.getMarkerYear(m0)
        }
        return null
    }
    DateEnv.prototype.diffWholeMonths = function (m0, m1) {
        const calendarSystem = this.calendarSystem
        if (timeAsMs(m0) === timeAsMs(m1) &&
            calendarSystem.getMarkerDay(m0) === calendarSystem.getMarkerDay(m1)) {
            return (calendarSystem.getMarkerMonth(m1) - calendarSystem.getMarkerMonth(m0)) +
                (calendarSystem.getMarkerYear(m1) - calendarSystem.getMarkerYear(m0)) * 12
        }
        return null
    }
    // Range / Duration
    DateEnv.prototype.greatestWholeUnit = function (m0, m1) {
        let n = this.diffWholeYears(m0, m1)
        if (n !== null) {
            return { unit: 'year', value: n }
        }
        n = this.diffWholeMonths(m0, m1)
        if (n !== null) {
            return { unit: 'month', value: n }
        }
        n = diffWholeWeeks(m0, m1)
        if (n !== null) {
            return { unit: 'week', value: n }
        }
        n = diffWholeDays(m0, m1)
        if (n !== null) {
            return { unit: 'day', value: n }
        }
        n = diffHours(m0, m1)
        if (isInt(n)) {
            return { unit: 'hour', value: n }
        }
        n = diffMinutes(m0, m1)
        if (isInt(n)) {
            return { unit: 'minute', value: n }
        }
        n = diffSeconds(m0, m1)
        if (isInt(n)) {
            return { unit: 'second', value: n }
        }
        return { unit: 'millisecond', value: m1.valueOf() - m0.valueOf() }
    }
    DateEnv.prototype.countDurationsBetween = function (m0, m1, d) {
        // TODO: can use greatestWholeUnit
        let diff
        if (d.years) {
            diff = this.diffWholeYears(m0, m1)
            if (diff !== null) {
                return diff / asRoughYears(d)
            }
        }
        if (d.months) {
            diff = this.diffWholeMonths(m0, m1)
            if (diff !== null) {
                return diff / asRoughMonths(d)
            }
        }
        if (d.days) {
            diff = diffWholeDays(m0, m1)
            if (diff !== null) {
                return diff / asRoughDays(d)
            }
        }
        return (m1.valueOf() - m0.valueOf()) / asRoughMs(d)
    }
    // Start-Of
    DateEnv.prototype.startOf = function (m, unit) {
        if (unit === 'year') {
            return this.startOfYear(m)
        } else if (unit === 'month') {
            return this.startOfMonth(m)
        } else if (unit === 'week') {
            return this.startOfWeek(m)
        } else if (unit === 'day') {
            return startOfDay(m)
        } else if (unit === 'hour') {
            return startOfHour(m)
        } else if (unit === 'minute') {
            return startOfMinute(m)
        } else if (unit === 'second') {
            return startOfSecond(m)
        }
    }
    DateEnv.prototype.startOfYear = function (m) {
        return this.calendarSystem.arrayToMarker([
            this.calendarSystem.getMarkerYear(m)
        ])
    }
    DateEnv.prototype.startOfMonth = function (m) {
        return this.calendarSystem.arrayToMarker([
            this.calendarSystem.getMarkerYear(m),
            this.calendarSystem.getMarkerMonth(m)
        ])
    }
    DateEnv.prototype.startOfWeek = function (m) {
        return this.calendarSystem.arrayToMarker([
            this.calendarSystem.getMarkerYear(m),
            this.calendarSystem.getMarkerMonth(m),
            m.getUTCDate() - ((m.getUTCDay() - this.weekDow + 7) % 7)
        ])
    }
    // Week Number
    DateEnv.prototype.computeWeekNumber = function (marker) {
        if (this.weekNumberFunc) {
            return this.weekNumberFunc(this.toDate(marker))
        } else {
            return weekOfYear(marker, this.weekDow, this.weekDoy)
        }
    }
    // TODO: choke on timeZoneName: long
    DateEnv.prototype.format = function (marker, formatter, dateOptions) {
        if (dateOptions === void 0) { dateOptions = {} }
        return formatter.format({
            marker,
            timeZoneOffset: dateOptions.forcedTzo != null
                ? dateOptions.forcedTzo
                : this.offsetForMarker(marker)
        }, this)
    }
    DateEnv.prototype.formatRange = function (start, end, formatter, dateOptions) {
        if (dateOptions === void 0) { dateOptions = {} }
        if (dateOptions.isEndExclusive) {
            end = addMs(end, -1)
        }
        return formatter.formatRange({
            marker: start,
            timeZoneOffset: dateOptions.forcedStartTzo != null
                ? dateOptions.forcedStartTzo
                : this.offsetForMarker(start)
        }, {
            marker: end,
            timeZoneOffset: dateOptions.forcedEndTzo != null
                ? dateOptions.forcedEndTzo
                : this.offsetForMarker(end)
        }, this)
    }
    DateEnv.prototype.formatIso = function (marker, extraOptions) {
        if (extraOptions === void 0) { extraOptions = {} }
        let timeZoneOffset = null
        if (!extraOptions.omitTimeZoneOffset) {
            if (extraOptions.forcedTzo != null) {
                timeZoneOffset = extraOptions.forcedTzo
            } else {
                timeZoneOffset = this.offsetForMarker(marker)
            }
        }
        return buildIsoString(marker, timeZoneOffset, extraOptions.omitTime)
    }
    // TimeZone
    DateEnv.prototype.timestampToMarker = function (ms) {
        if (this.timeZone === 'local') {
            return arrayToUtcDate(dateToLocalArray(new Date(ms)))
        } else if (this.timeZone === 'UTC' || !this.namedTimeZoneImpl) {
            return new Date(ms)
        } else {
            return arrayToUtcDate(this.namedTimeZoneImpl.timestampToArray(ms))
        }
    }
    DateEnv.prototype.offsetForMarker = function (m) {
        if (this.timeZone === 'local') {
            return -arrayToLocalDate(dateToUtcArray(m)).getTimezoneOffset() // convert "inverse" offset to "normal" offset
        } else if (this.timeZone === 'UTC') {
            return 0
        } else if (this.namedTimeZoneImpl) {
            return this.namedTimeZoneImpl.offsetForArray(dateToUtcArray(m))
        }
        return null
    }
    // Conversion
    DateEnv.prototype.toDate = function (m, forcedTzo) {
        if (this.timeZone === 'local') {
            return arrayToLocalDate(dateToUtcArray(m))
        } else if (this.timeZone === 'UTC') {
            return new Date(m.valueOf()) // make sure it's a copy
        } else if (!this.namedTimeZoneImpl) {
            return new Date(m.valueOf() - (forcedTzo || 0))
        } else {
            return new Date(m.valueOf() -
                this.namedTimeZoneImpl.offsetForArray(dateToUtcArray(m)) * 1000 * 60 // convert minutes -> ms
            )
        }
    }
    return DateEnv
}())

const SIMPLE_SOURCE_PROPS = {
    id: String,
    allDayDefault: Boolean,
    eventDataTransform: Function,
    success: Function,
    failure: Function
}
let uid$2 = 0
function doesSourceNeedRange(eventSource, calendar) {
    const defs = calendar.pluginSystem.hooks.eventSourceDefs
    return !defs[eventSource.sourceDefId].ignoreRange
}
function parseEventSource(raw, calendar) {
    const defs = calendar.pluginSystem.hooks.eventSourceDefs
    for (let i = defs.length - 1; i >= 0; i--) { // later-added plugins take precedence
        const def = defs[i]
        const meta = def.parseMeta(raw)
        if (meta) {
            const res = parseEventSourceProps(typeof raw === 'object' ? raw : {}, meta, i, calendar)
            res._raw = raw
            return res
        }
    }
    return null
}
function parseEventSourceProps(raw, meta, sourceDefId, calendar) {
    const leftovers0 = {}
    const props = refineProps(raw, SIMPLE_SOURCE_PROPS, {}, leftovers0)
    const leftovers1 = {}
    const ui = processUnscopedUiProps(leftovers0, calendar, leftovers1)
    props.isFetching = false
    props.latestFetchId = ''
    props.fetchRange = null
    props.publicId = String(raw.id || '')
    props.sourceId = String(uid$2++)
    props.sourceDefId = sourceDefId
    props.meta = meta
    props.ui = ui
    props.extendedProps = leftovers1
    return props
}

function reduceEventSources(eventSources, action, dateProfile, calendar) {
    switch (action.type) {
        case 'ADD_EVENT_SOURCES': // already parsed
            return addSources(eventSources, action.sources, dateProfile ? dateProfile.activeRange : null, calendar)
        case 'REMOVE_EVENT_SOURCE':
            return removeSource(eventSources, action.sourceId)
        case 'PREV': // TODO: how do we track all actions that affect dateProfile :(
        case 'NEXT':
        case 'SET_DATE':
        case 'SET_VIEW_TYPE':
            if (dateProfile) {
                return fetchDirtySources(eventSources, dateProfile.activeRange, calendar)
            } else {
                return eventSources
            }
        case 'FETCH_EVENT_SOURCES':
        case 'CHANGE_TIMEZONE':
            return fetchSourcesByIds(eventSources, action.sourceIds
                ? arrayToHash(action.sourceIds)
                : excludeStaticSources(eventSources, calendar), dateProfile ? dateProfile.activeRange : null, calendar)
        case 'RECEIVE_EVENTS':
        case 'RECEIVE_EVENT_ERROR':
            return receiveResponse(eventSources, action.sourceId, action.fetchId, action.fetchRange)
        case 'REMOVE_ALL_EVENT_SOURCES':
            return {}
        default:
            return eventSources
    }
}
let uid$3 = 0
function addSources(eventSourceHash, sources, fetchRange, calendar) {
    let hash = {}
    for (let _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
        const source = sources_1[_i]
        hash[source.sourceId] = source
    }
    if (fetchRange) {
        hash = fetchDirtySources(hash, fetchRange, calendar)
    }
    return __assign({}, eventSourceHash, hash)
}
function removeSource(eventSourceHash, sourceId) {
    return filterHash(eventSourceHash, function (eventSource) {
        return eventSource.sourceId !== sourceId
    })
}
function fetchDirtySources(sourceHash, fetchRange, calendar) {
    return fetchSourcesByIds(sourceHash, filterHash(sourceHash, function (eventSource) {
        return isSourceDirty(eventSource, fetchRange, calendar)
    }), fetchRange, calendar)
}
function isSourceDirty(eventSource, fetchRange, calendar) {
    if (!doesSourceNeedRange(eventSource, calendar)) {
        return !eventSource.latestFetchId
    } else {
        return !calendar.opt('lazyFetching') ||
            !eventSource.fetchRange ||
            fetchRange.start < eventSource.fetchRange.start ||
            fetchRange.end > eventSource.fetchRange.end
    }
}
function fetchSourcesByIds(prevSources, sourceIdHash, fetchRange, calendar) {
    const nextSources = {}
    for (const sourceId in prevSources) {
        const source = prevSources[sourceId]
        if (sourceIdHash[sourceId]) {
            nextSources[sourceId] = fetchSource(source, fetchRange, calendar)
        } else {
            nextSources[sourceId] = source
        }
    }
    return nextSources
}
function fetchSource(eventSource, fetchRange, calendar) {
    const sourceDef = calendar.pluginSystem.hooks.eventSourceDefs[eventSource.sourceDefId]
    const fetchId = String(uid$3++)
    sourceDef.fetch({
        eventSource,
        calendar,
        range: fetchRange
    }, function (res) {
        let rawEvents = res.rawEvents
        const calSuccess = calendar.opt('eventSourceSuccess')
        let calSuccessRes
        let sourceSuccessRes
        if (eventSource.success) {
            sourceSuccessRes = eventSource.success(rawEvents, res.xhr)
        }
        if (calSuccess) {
            calSuccessRes = calSuccess(rawEvents, res.xhr)
        }
        rawEvents = sourceSuccessRes || calSuccessRes || rawEvents
        calendar.dispatch({
            type: 'RECEIVE_EVENTS',
            sourceId: eventSource.sourceId,
            fetchId,
            fetchRange,
            rawEvents
        })
    }, function (error) {
        const callFailure = calendar.opt('eventSourceFailure')
        console.warn(error.message, error)
        if (eventSource.failure) {
            eventSource.failure(error)
        }
        if (callFailure) {
            callFailure(error)
        }
        calendar.dispatch({
            type: 'RECEIVE_EVENT_ERROR',
            sourceId: eventSource.sourceId,
            fetchId,
            fetchRange,
            error
        })
    })
    return __assign({}, eventSource, { isFetching: true, latestFetchId: fetchId })
}
function receiveResponse(sourceHash, sourceId, fetchId, fetchRange) {
    let _a
    const eventSource = sourceHash[sourceId]
    if (eventSource && // not already removed
        fetchId === eventSource.latestFetchId) {
        return __assign({}, sourceHash, (_a = {}, _a[sourceId] = __assign({}, eventSource, { isFetching: false, fetchRange }), _a))
    }
    return sourceHash
}
function excludeStaticSources(eventSources, calendar) {
    return filterHash(eventSources, function (eventSource) {
        return doesSourceNeedRange(eventSource, calendar)
    })
}

const DateProfileGenerator = /** @class */ (function () {
    function DateProfileGenerator(viewSpec, calendar) {
        this.viewSpec = viewSpec
        this.options = viewSpec.options
        this.dateEnv = calendar.dateEnv
        this.calendar = calendar
        this.initHiddenDays()
    }
    /* Date Range Computation
    ------------------------------------------------------------------------------------------------------------------*/
    // Builds a structure with info about what the dates/ranges will be for the "prev" view.
    DateProfileGenerator.prototype.buildPrev = function (currentDateProfile, currentDate) {
        const dateEnv = this.dateEnv
        const prevDate = dateEnv.subtract(dateEnv.startOf(currentDate, currentDateProfile.currentRangeUnit), // important for start-of-month
        currentDateProfile.dateIncrement)
        return this.build(prevDate, -1)
    }
    // Builds a structure with info about what the dates/ranges will be for the "next" view.
    DateProfileGenerator.prototype.buildNext = function (currentDateProfile, currentDate) {
        const dateEnv = this.dateEnv
        const nextDate = dateEnv.add(dateEnv.startOf(currentDate, currentDateProfile.currentRangeUnit), // important for start-of-month
        currentDateProfile.dateIncrement)
        return this.build(nextDate, 1)
    }
    // Builds a structure holding dates/ranges for rendering around the given date.
    // Optional direction param indicates whether the date is being incremented/decremented
    // from its previous value. decremented = -1, incremented = 1 (default).
    DateProfileGenerator.prototype.build = function (currentDate, direction, forceToValid) {
        if (forceToValid === void 0) { forceToValid = false }
        let validRange
        let minTime = null
        let maxTime = null
        let currentInfo
        let isRangeAllDay
        let renderRange
        let activeRange
        let isValid
        validRange = this.buildValidRange()
        validRange = this.trimHiddenDays(validRange)
        if (forceToValid) {
            currentDate = constrainMarkerToRange(currentDate, validRange)
        }
        currentInfo = this.buildCurrentRangeInfo(currentDate, direction)
        isRangeAllDay = /^(year|month|week|day)$/.test(currentInfo.unit)
        renderRange = this.buildRenderRange(this.trimHiddenDays(currentInfo.range), currentInfo.unit, isRangeAllDay)
        renderRange = this.trimHiddenDays(renderRange)
        activeRange = renderRange
        if (!this.options.showNonCurrentDates) {
            activeRange = intersectRanges(activeRange, currentInfo.range)
        }
        minTime = createDuration(this.options.minTime)
        maxTime = createDuration(this.options.maxTime)
        activeRange = this.adjustActiveRange(activeRange, minTime, maxTime)
        activeRange = intersectRanges(activeRange, validRange) // might return null
        // it's invalid if the originally requested date is not contained,
        // or if the range is completely outside of the valid range.
        isValid = rangesIntersect(currentInfo.range, validRange)
        return {
            // constraint for where prev/next operations can go and where events can be dragged/resized to.
            // an object with optional start and end properties.
            validRange,
            // range the view is formally responsible for.
            // for example, a month view might have 1st-31st, excluding padded dates
            currentRange: currentInfo.range,
            // name of largest unit being displayed, like "month" or "week"
            currentRangeUnit: currentInfo.unit,
            isRangeAllDay,
            // dates that display events and accept drag-n-drop
            // will be `null` if no dates accept events
            activeRange,
            // date range with a rendered skeleton
            // includes not-active days that need some sort of DOM
            renderRange,
            // Duration object that denotes the first visible time of any given day
            minTime,
            // Duration object that denotes the exclusive visible end time of any given day
            maxTime,
            isValid,
            // how far the current date will move for a prev/next operation
            dateIncrement: this.buildDateIncrement(currentInfo.duration)
            // pass a fallback (might be null) ^
        }
    }
    // Builds an object with optional start/end properties.
    // Indicates the minimum/maximum dates to display.
    // not responsible for trimming hidden days.
    DateProfileGenerator.prototype.buildValidRange = function () {
        return this.getRangeOption('validRange', this.calendar.getNow()) ||
            { start: null, end: null } // completely open-ended
    }
    // Builds a structure with info about the "current" range, the range that is
    // highlighted as being the current month for example.
    // See build() for a description of `direction`.
    // Guaranteed to have `range` and `unit` properties. `duration` is optional.
    DateProfileGenerator.prototype.buildCurrentRangeInfo = function (date, direction) {
        const _a = this; const viewSpec = _a.viewSpec; const dateEnv = _a.dateEnv
        let duration = null
        let unit = null
        let range = null
        let dayCount
        if (viewSpec.duration) {
            duration = viewSpec.duration
            unit = viewSpec.durationUnit
            range = this.buildRangeFromDuration(date, direction, duration, unit)
        } else if ((dayCount = this.options.dayCount)) {
            unit = 'day'
            range = this.buildRangeFromDayCount(date, direction, dayCount)
        } else if ((range = this.buildCustomVisibleRange(date))) {
            unit = dateEnv.greatestWholeUnit(range.start, range.end).unit
        } else {
            duration = this.getFallbackDuration()
            unit = greatestDurationDenominator(duration).unit
            range = this.buildRangeFromDuration(date, direction, duration, unit)
        }
        return { duration, unit, range }
    }
    DateProfileGenerator.prototype.getFallbackDuration = function () {
        return createDuration({ day: 1 })
    }
    // Returns a new activeRange to have time values (un-ambiguate)
    // minTime or maxTime causes the range to expand.
    DateProfileGenerator.prototype.adjustActiveRange = function (range, minTime, maxTime) {
        const dateEnv = this.dateEnv
        let start = range.start
        let end = range.end
        if (this.viewSpec.class.prototype.usesMinMaxTime) {
            // expand active range if minTime is negative (why not when positive?)
            if (asRoughDays(minTime) < 0) {
                start = startOfDay(start) // necessary?
                start = dateEnv.add(start, minTime)
            }
            // expand active range if maxTime is beyond one day (why not when positive?)
            if (asRoughDays(maxTime) > 1) {
                end = startOfDay(end) // necessary?
                end = addDays(end, -1)
                end = dateEnv.add(end, maxTime)
            }
        }
        return { start, end }
    }
    // Builds the "current" range when it is specified as an explicit duration.
    // `unit` is the already-computed greatestDurationDenominator unit of duration.
    DateProfileGenerator.prototype.buildRangeFromDuration = function (date, direction, duration, unit) {
        const dateEnv = this.dateEnv
        let alignment = this.options.dateAlignment
        let dateIncrementInput
        let dateIncrementDuration
        let start
        let end
        let res
        // compute what the alignment should be
        if (!alignment) {
            dateIncrementInput = this.options.dateIncrement
            if (dateIncrementInput) {
                dateIncrementDuration = createDuration(dateIncrementInput)
                // use the smaller of the two units
                if (asRoughMs(dateIncrementDuration) < asRoughMs(duration)) {
                    alignment = greatestDurationDenominator(dateIncrementDuration, !getWeeksFromInput(dateIncrementInput)).unit
                } else {
                    alignment = unit
                }
            } else {
                alignment = unit
            }
        }
        // if the view displays a single day or smaller
        if (asRoughDays(duration) <= 1) {
            if (this.isHiddenDay(start)) {
                start = this.skipHiddenDays(start, direction)
                start = startOfDay(start)
            }
        }
        function computeRes() {
            start = dateEnv.startOf(date, alignment)
            end = dateEnv.add(start, duration)
            res = { start, end }
        }
        computeRes()
        // if range is completely enveloped by hidden days, go past the hidden days
        if (!this.trimHiddenDays(res)) {
            date = this.skipHiddenDays(date, direction)
            computeRes()
        }
        return res
    }
    // Builds the "current" range when a dayCount is specified.
    DateProfileGenerator.prototype.buildRangeFromDayCount = function (date, direction, dayCount) {
        const dateEnv = this.dateEnv
        const customAlignment = this.options.dateAlignment
        let runningCount = 0
        let start = date
        let end
        if (customAlignment) {
            start = dateEnv.startOf(start, customAlignment)
        }
        start = startOfDay(start)
        start = this.skipHiddenDays(start, direction)
        end = start
        do {
            end = addDays(end, 1)
            if (!this.isHiddenDay(end)) {
                runningCount++
            }
        } while (runningCount < dayCount)
        return { start, end }
    }
    // Builds a normalized range object for the "visible" range,
    // which is a way to define the currentRange and activeRange at the same time.
    DateProfileGenerator.prototype.buildCustomVisibleRange = function (date) {
        const dateEnv = this.dateEnv
        const visibleRange = this.getRangeOption('visibleRange', dateEnv.toDate(date))
        if (visibleRange && (visibleRange.start == null || visibleRange.end == null)) {
            return null
        }
        return visibleRange
    }
    // Computes the range that will represent the element/cells for *rendering*,
    // but which may have voided days/times.
    // not responsible for trimming hidden days.
    DateProfileGenerator.prototype.buildRenderRange = function (currentRange, currentRangeUnit, isRangeAllDay) {
        return currentRange
    }
    // Compute the duration value that should be added/substracted to the current date
    // when a prev/next operation happens.
    DateProfileGenerator.prototype.buildDateIncrement = function (fallback) {
        const dateIncrementInput = this.options.dateIncrement
        let customAlignment
        if (dateIncrementInput) {
            return createDuration(dateIncrementInput)
        } else if ((customAlignment = this.options.dateAlignment)) {
            return createDuration(1, customAlignment)
        } else if (fallback) {
            return fallback
        } else {
            return createDuration({ days: 1 })
        }
    }
    // Arguments after name will be forwarded to a hypothetical function value
    // WARNING: passed-in arguments will be given to generator functions as-is and can cause side-effects.
    // Always clone your objects if you fear mutation.
    DateProfileGenerator.prototype.getRangeOption = function (name) {
        const otherArgs = []
        for (let _i = 1; _i < arguments.length; _i++) {
            otherArgs[_i - 1] = arguments[_i]
        }
        let val = this.options[name]
        if (typeof val === 'function') {
            val = val.apply(null, otherArgs)
        }
        if (val) {
            val = parseRange(val, this.dateEnv)
        }
        if (val) {
            val = computeVisibleDayRange(val)
        }
        return val
    }
    /* Hidden Days
    ------------------------------------------------------------------------------------------------------------------*/
    // Initializes internal variables related to calculating hidden days-of-week
    DateProfileGenerator.prototype.initHiddenDays = function () {
        const hiddenDays = this.options.hiddenDays || [] // array of day-of-week indices that are hidden
        const isHiddenDayHash = [] // is the day-of-week hidden? (hash with day-of-week-index -> bool)
        let dayCnt = 0
        let i
        if (this.options.weekends === false) {
            hiddenDays.push(0, 6) // 0=sunday, 6=saturday
        }
        for (i = 0; i < 7; i++) {
            if (!(isHiddenDayHash[i] = hiddenDays.indexOf(i) !== -1)) {
                dayCnt++
            }
        }
        if (!dayCnt) {
            throw new Error('invalid hiddenDays') // all days were hidden? bad.
        }
        this.isHiddenDayHash = isHiddenDayHash
    }
    // Remove days from the beginning and end of the range that are computed as hidden.
    // If the whole range is trimmed off, returns null
    DateProfileGenerator.prototype.trimHiddenDays = function (range) {
        let start = range.start
        let end = range.end
        if (start) {
            start = this.skipHiddenDays(start)
        }
        if (end) {
            end = this.skipHiddenDays(end, -1, true)
        }
        if (start == null || end == null || start < end) {
            return { start, end }
        }
        return null
    }
    // Is the current day hidden?
    // `day` is a day-of-week index (0-6), or a Date (used for UTC)
    DateProfileGenerator.prototype.isHiddenDay = function (day) {
        if (day instanceof Date) {
            day = day.getUTCDay()
        }
        return this.isHiddenDayHash[day]
    }
    // Incrementing the current day until it is no longer a hidden day, returning a copy.
    // DOES NOT CONSIDER validRange!
    // If the initial value of `date` is not a hidden day, don't do anything.
    // Pass `isExclusive` as `true` if you are dealing with an end date.
    // `inc` defaults to `1` (increment one day forward each time)
    DateProfileGenerator.prototype.skipHiddenDays = function (date, inc, isExclusive) {
        if (inc === void 0) { inc = 1 }
        if (isExclusive === void 0) { isExclusive = false }
        while (this.isHiddenDayHash[(date.getUTCDay() + (isExclusive ? inc : 0) + 7) % 7]) {
            date = addDays(date, inc)
        }
        return date
    }
    return DateProfileGenerator
}())
// TODO: find a way to avoid comparing DateProfiles. it's tedious
function isDateProfilesEqual(p0, p1) {
    return rangesEqual(p0.validRange, p1.validRange) &&
        rangesEqual(p0.activeRange, p1.activeRange) &&
        rangesEqual(p0.renderRange, p1.renderRange) &&
        durationsEqual(p0.minTime, p1.minTime) &&
        durationsEqual(p0.maxTime, p1.maxTime)
    /*
    TODO: compare more?
      currentRange: DateRange
      currentRangeUnit: string
      isRangeAllDay: boolean
      isValid: boolean
      dateIncrement: Duration
    */
}

function reduce(state, action, calendar) {
    const viewType = reduceViewType(state.viewType, action)
    const dateProfile = reduceDateProfile(state.dateProfile, action, state.currentDate, viewType, calendar)
    const eventSources = reduceEventSources(state.eventSources, action, dateProfile, calendar)
    let nextState = __assign({}, state, {
 viewType,
        dateProfile,
currentDate: reduceCurrentDate(state.currentDate, action, dateProfile),
eventSources,
eventStore: reduceEventStore(state.eventStore, action, eventSources, dateProfile, calendar),
dateSelection: reduceDateSelection(state.dateSelection, action, calendar),
eventSelection: reduceSelectedEvent(state.eventSelection, action),
eventDrag: reduceEventDrag(state.eventDrag, action, eventSources, calendar),
eventResize: reduceEventResize(state.eventResize, action, eventSources, calendar),
eventSourceLoadingLevel: computeLoadingLevel(eventSources),
loadingLevel: computeLoadingLevel(eventSources)
})
    for (let _i = 0, _a = calendar.pluginSystem.hooks.reducers; _i < _a.length; _i++) {
        const reducerFunc = _a[_i]
        nextState = reducerFunc(nextState, action, calendar)
    }
    // console.log(action.type, nextState)
    return nextState
}
function reduceViewType(currentViewType, action) {
    switch (action.type) {
        case 'SET_VIEW_TYPE':
            return action.viewType
        default:
            return currentViewType
    }
}
function reduceDateProfile(currentDateProfile, action, currentDate, viewType, calendar) {
    let newDateProfile
    switch (action.type) {
        case 'PREV':
            newDateProfile = calendar.dateProfileGenerators[viewType].buildPrev(currentDateProfile, currentDate)
            break
        case 'NEXT':
            newDateProfile = calendar.dateProfileGenerators[viewType].buildNext(currentDateProfile, currentDate)
            break
        case 'SET_DATE':
            if (!currentDateProfile.activeRange ||
                !rangeContainsMarker(currentDateProfile.currentRange, action.dateMarker)) {
                newDateProfile = calendar.dateProfileGenerators[viewType].build(action.dateMarker, undefined, true // forceToValid
                )
            }
            break
        case 'SET_VIEW_TYPE':
            var generator = calendar.dateProfileGenerators[viewType]
            if (!generator) {
                throw new Error(viewType
                    ? 'The FullCalendar view "' + viewType + '" does not exist. Make sure your plugins are loaded correctly.'
                    : 'No available FullCalendar view plugins.')
            }
            newDateProfile = generator.build(action.dateMarker || currentDate, undefined, true // forceToValid
            )
            break
    }
    if (newDateProfile &&
        newDateProfile.isValid &&
        !(currentDateProfile && isDateProfilesEqual(currentDateProfile, newDateProfile))) {
        return newDateProfile
    } else {
        return currentDateProfile
    }
}
function reduceCurrentDate(currentDate, action, dateProfile) {
    switch (action.type) {
        case 'PREV':
        case 'NEXT':
            if (!rangeContainsMarker(dateProfile.currentRange, currentDate)) {
                return dateProfile.currentRange.start
            } else {
                return currentDate
            }
        case 'SET_DATE':
        case 'SET_VIEW_TYPE':
            var newDate = action.dateMarker || currentDate
            if (dateProfile.activeRange && !rangeContainsMarker(dateProfile.activeRange, newDate)) {
                return dateProfile.currentRange.start
            } else {
                return newDate
            }
        default:
            return currentDate
    }
}
function reduceDateSelection(currentSelection, action, calendar) {
    switch (action.type) {
        case 'SELECT_DATES':
            return action.selection
        case 'UNSELECT_DATES':
            return null
        default:
            return currentSelection
    }
}
function reduceSelectedEvent(currentInstanceId, action) {
    switch (action.type) {
        case 'SELECT_EVENT':
            return action.eventInstanceId
        case 'UNSELECT_EVENT':
            return ''
        default:
            return currentInstanceId
    }
}
function reduceEventDrag(currentDrag, action, sources, calendar) {
    switch (action.type) {
        case 'SET_EVENT_DRAG':
            var newDrag = action.state
            return {
                affectedEvents: newDrag.affectedEvents,
                mutatedEvents: newDrag.mutatedEvents,
                isEvent: newDrag.isEvent,
                origSeg: newDrag.origSeg
            }
        case 'UNSET_EVENT_DRAG':
            return null
        default:
            return currentDrag
    }
}
function reduceEventResize(currentResize, action, sources, calendar) {
    switch (action.type) {
        case 'SET_EVENT_RESIZE':
            var newResize = action.state
            return {
                affectedEvents: newResize.affectedEvents,
                mutatedEvents: newResize.mutatedEvents,
                isEvent: newResize.isEvent,
                origSeg: newResize.origSeg
            }
        case 'UNSET_EVENT_RESIZE':
            return null
        default:
            return currentResize
    }
}
function computeLoadingLevel(eventSources) {
    let cnt = 0
    for (const sourceId in eventSources) {
        if (eventSources[sourceId].isFetching) {
            cnt++
        }
    }
    return cnt
}

const STANDARD_PROPS = {
    start: null,
    end: null,
    allDay: Boolean
}
function parseDateSpan(raw, dateEnv, defaultDuration) {
    const span = parseOpenDateSpan(raw, dateEnv)
    const range = span.range
    if (!range.start) {
        return null
    }
    if (!range.end) {
        if (defaultDuration == null) {
            return null
        } else {
            range.end = dateEnv.add(range.start, defaultDuration)
        }
    }
    return span
}
/*
TODO: somehow combine with parseRange?
Will return null if the start/end props were present but parsed invalidly.
*/
function parseOpenDateSpan(raw, dateEnv) {
    const leftovers = {}
    const standardProps = refineProps(raw, STANDARD_PROPS, {}, leftovers)
    const startMeta = standardProps.start ? dateEnv.createMarkerMeta(standardProps.start) : null
    const endMeta = standardProps.end ? dateEnv.createMarkerMeta(standardProps.end) : null
    let allDay = standardProps.allDay
    if (allDay == null) {
        allDay = (startMeta && startMeta.isTimeUnspecified) &&
            (!endMeta || endMeta.isTimeUnspecified)
    }
    // use this leftover object as the selection object
    leftovers.range = {
        start: startMeta ? startMeta.marker : null,
        end: endMeta ? endMeta.marker : null
    }
    leftovers.allDay = allDay
    return leftovers
}
function isDateSpansEqual(span0, span1) {
    return rangesEqual(span0.range, span1.range) &&
        span0.allDay === span1.allDay &&
        isSpanPropsEqual(span0, span1)
}
// the NON-DATE-RELATED props
function isSpanPropsEqual(span0, span1) {
    for (var propName in span1) {
        if (propName !== 'range' && propName !== 'allDay') {
            if (span0[propName] !== span1[propName]) {
                return false
            }
        }
    }
    // are there any props that span0 has that span1 DOESN'T have?
    // both have range/allDay, so no need to special-case.
    for (var propName in span0) {
        if (!(propName in span1)) {
            return false
        }
    }
    return true
}
function buildDateSpanApi(span, dateEnv) {
    return {
        start: dateEnv.toDate(span.range.start),
        end: dateEnv.toDate(span.range.end),
        startStr: dateEnv.formatIso(span.range.start, { omitTime: span.allDay }),
        endStr: dateEnv.formatIso(span.range.end, { omitTime: span.allDay }),
        allDay: span.allDay
    }
}
function buildDatePointApi(span, dateEnv) {
    return {
        date: dateEnv.toDate(span.range.start),
        dateStr: dateEnv.formatIso(span.range.start, { omitTime: span.allDay }),
        allDay: span.allDay
    }
}
function fabricateEventRange(dateSpan, eventUiBases, calendar) {
    const def = parseEventDef({ editable: false }, '', // sourceId
    dateSpan.allDay, true, // hasEnd
    calendar)
    return {
        def,
        ui: compileEventUi(def, eventUiBases),
        instance: createEventInstance(def.defId, dateSpan.range),
        range: dateSpan.range,
        isStart: true,
        isEnd: true
    }
}

function compileViewDefs(defaultConfigs, overrideConfigs) {
    const hash = {}
    let viewType
    for (viewType in defaultConfigs) {
        ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs)
    }
    for (viewType in overrideConfigs) {
        ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs)
    }
    return hash
}
function ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs) {
    if (hash[viewType]) {
        return hash[viewType]
    }
    const viewDef = buildViewDef(viewType, hash, defaultConfigs, overrideConfigs)
    if (viewDef) {
        hash[viewType] = viewDef
    }
    return viewDef
}
function buildViewDef(viewType, hash, defaultConfigs, overrideConfigs) {
    const defaultConfig = defaultConfigs[viewType]
    const overrideConfig = overrideConfigs[viewType]
    const queryProp = function (name) {
        return (defaultConfig && defaultConfig[name] !== null)
? defaultConfig[name]
            : ((overrideConfig && overrideConfig[name] !== null) ? overrideConfig[name] : null)
    }
    let theClass = queryProp('class')
    let superType = queryProp('superType')
    if (!superType && theClass) {
        superType =
            findViewNameBySubclass(theClass, overrideConfigs) ||
                findViewNameBySubclass(theClass, defaultConfigs)
    }
    let superDef = null
    if (superType) {
        if (superType === viewType) {
            throw new Error('Can\'t have a custom view type that references itself')
        }
        superDef = ensureViewDef(superType, hash, defaultConfigs, overrideConfigs)
    }
    if (!theClass && superDef) {
        theClass = superDef.class
    }
    if (!theClass) {
        return null // don't throw a warning, might be settings for a single-unit view
    }
    return {
        type: viewType,
        class: theClass,
        defaults: __assign({}, (superDef ? superDef.defaults : {}), (defaultConfig ? defaultConfig.options : {})),
        overrides: __assign({}, (superDef ? superDef.overrides : {}), (overrideConfig ? overrideConfig.options : {}))
    }
}
function findViewNameBySubclass(viewSubclass, configs) {
    const superProto = Object.getPrototypeOf(viewSubclass.prototype)
    for (const viewType in configs) {
        const parsed = configs[viewType]
        // need DIRECT subclass, so instanceof won't do it
        if (parsed.class && parsed.class.prototype === superProto) {
            return viewType
        }
    }
    return ''
}

function parseViewConfigs(inputs) {
    return mapHash(inputs, parseViewConfig)
}
const VIEW_DEF_PROPS = {
    type: String,
    class: null
}
function parseViewConfig(input) {
    if (typeof input === 'function') {
        input = { class: input }
    }
    const options = {}
    const props = refineProps(input, VIEW_DEF_PROPS, {}, options)
    return {
        superType: props.type,
        class: props.class,
        options
    }
}

function buildViewSpecs(defaultInputs, optionsManager) {
    const defaultConfigs = parseViewConfigs(defaultInputs)
    const overrideConfigs = parseViewConfigs(optionsManager.overrides.views)
    const viewDefs = compileViewDefs(defaultConfigs, overrideConfigs)
    return mapHash(viewDefs, function (viewDef) {
        return buildViewSpec(viewDef, overrideConfigs, optionsManager)
    })
}
function buildViewSpec(viewDef, overrideConfigs, optionsManager) {
    const durationInput = viewDef.overrides.duration ||
        viewDef.defaults.duration ||
        optionsManager.dynamicOverrides.duration ||
        optionsManager.overrides.duration
    let duration = null
    let durationUnit = ''
    let singleUnit = ''
    let singleUnitOverrides = {}
    if (durationInput) {
        duration = createDuration(durationInput)
        if (duration) { // valid?
            const denom = greatestDurationDenominator(duration, !getWeeksFromInput(durationInput))
            durationUnit = denom.unit
            if (denom.value === 1) {
                singleUnit = durationUnit
                singleUnitOverrides = overrideConfigs[durationUnit] ? overrideConfigs[durationUnit].options : {}
            }
        }
    }
    const queryButtonText = function (options) {
        const buttonTextMap = options.buttonText || {}
        const buttonTextKey = viewDef.defaults.buttonTextKey
        if (buttonTextKey != null && buttonTextMap[buttonTextKey] != null) {
            return buttonTextMap[buttonTextKey]
        }
        if (buttonTextMap[viewDef.type] != null) {
            return buttonTextMap[viewDef.type]
        }
        if (buttonTextMap[singleUnit] != null) {
            return buttonTextMap[singleUnit]
        }
    }
    return {
        type: viewDef.type,
        class: viewDef.class,
        duration,
        durationUnit,
        singleUnit,
        options: __assign({}, globalDefaults, viewDef.defaults, optionsManager.dirDefaults, optionsManager.localeDefaults, optionsManager.overrides, singleUnitOverrides, viewDef.overrides, optionsManager.dynamicOverrides),
        buttonTextOverride: queryButtonText(optionsManager.dynamicOverrides) ||
            queryButtonText(optionsManager.overrides) || // constructor-specified buttonText lookup hash takes precedence
            viewDef.overrides.buttonText,
        buttonTextDefault: queryButtonText(optionsManager.localeDefaults) ||
            queryButtonText(optionsManager.dirDefaults) ||
            viewDef.defaults.buttonText ||
            queryButtonText(globalDefaults) ||
            viewDef.type // fall back to given view name
    }
}

const Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super)
    function Toolbar(context, extraClassName) {
        const _this = _super.call(this, context) || this
        _this._renderLayout = memoizeRendering(_this.renderLayout, _this.unrenderLayout)
        _this._updateTitle = memoizeRendering(_this.updateTitle, null, [_this._renderLayout])
        _this._updateActiveButton = memoizeRendering(_this.updateActiveButton, null, [_this._renderLayout])
        _this._updateToday = memoizeRendering(_this.updateToday, null, [_this._renderLayout])
        _this._updatePrev = memoizeRendering(_this.updatePrev, null, [_this._renderLayout])
        _this._updateNext = memoizeRendering(_this.updateNext, null, [_this._renderLayout])
        _this.el = createElement('div', { className: 'fc-toolbar ' + extraClassName })
        return _this
    }
    Toolbar.prototype.destroy = function () {
        _super.prototype.destroy.call(this)
        this._renderLayout.unrender() // should unrender everything else
        removeElement(this.el)
    }
    Toolbar.prototype.render = function (props) {
        this._renderLayout(props.layout)
        this._updateTitle(props.title)
        this._updateActiveButton(props.activeButton)
        this._updateToday(props.isTodayEnabled)
        this._updatePrev(props.isPrevEnabled)
        this._updateNext(props.isNextEnabled)
    }
    Toolbar.prototype.renderLayout = function (layout) {
        const el = this.el
        this.viewsWithButtons = []
        appendToElement(el, this.renderSection('left', layout.left))
        appendToElement(el, this.renderSection('center', layout.center))
        appendToElement(el, this.renderSection('right', layout.right))
    }
    Toolbar.prototype.unrenderLayout = function () {
        this.el.innerHTML = ''
    }
    Toolbar.prototype.renderSection = function (position, buttonStr) {
        const _this = this
        const _a = this; const theme = _a.theme; const calendar = _a.calendar
        const optionsManager = calendar.optionsManager
        const viewSpecs = calendar.viewSpecs
        const sectionEl = createElement('div', { className: 'fc-' + position })
        const calendarCustomButtons = optionsManager.computed.customButtons || {}
        const calendarButtonTextOverrides = optionsManager.overrides.buttonText || {}
        const calendarButtonText = optionsManager.computed.buttonText || {}
        if (buttonStr) {
            buttonStr.split(' ').forEach(function (buttonGroupStr, i) {
                const groupChildren = []
                let isOnlyButtons = true
                let groupEl
                buttonGroupStr.split(',').forEach(function (buttonName, j) {
                    let customButtonProps
                    let viewSpec
                    let buttonClick
                    let buttonIcon // only one of these will be set
                    let buttonText // "
                    let buttonInnerHtml
                    let buttonClasses
                    let buttonEl
                    let buttonAriaAttr
                    if (buttonName === 'title') {
                        groupChildren.push(htmlToElement('<h2>&nbsp;</h2>')) // we always want it to take up height
                        isOnlyButtons = false
                    } else {
                        if ((customButtonProps = calendarCustomButtons[buttonName])) {
                            buttonClick = function (ev) {
                                if (customButtonProps.click) {
                                    customButtonProps.click.call(buttonEl, ev)
                                }
                            };
                            (buttonIcon = theme.getCustomButtonIconClass(customButtonProps)) ||
                                (buttonIcon = theme.getIconClass(buttonName)) ||
                                (buttonText = customButtonProps.text)
                        } else if ((viewSpec = viewSpecs[buttonName])) {
                            _this.viewsWithButtons.push(buttonName)
                            buttonClick = function () {
                                calendar.changeView(buttonName)
                            };
                            (buttonText = viewSpec.buttonTextOverride) ||
                                (buttonIcon = theme.getIconClass(buttonName)) ||
                                (buttonText = viewSpec.buttonTextDefault)
                        } else if (calendar[buttonName]) { // a calendar method
                            buttonClick = function () {
                                calendar[buttonName]()
                            };
                            (buttonText = calendarButtonTextOverrides[buttonName]) ||
                                (buttonIcon = theme.getIconClass(buttonName)) ||
                                (buttonText = calendarButtonText[buttonName])
                            //            ^ everything else is considered default
                        }
                        if (buttonClick) {
                            buttonClasses = [
                                'fc-' + buttonName + '-button',
                                theme.getClass('button')
                            ]
                            if (buttonText) {
                                buttonInnerHtml = htmlEscape(buttonText)
                                buttonAriaAttr = ''
                            } else if (buttonIcon) {
                                buttonInnerHtml = "<span class='" + buttonIcon + "'></span>"
                                buttonAriaAttr = ' aria-label="' + buttonName + '"'
                            }
                            buttonEl = htmlToElement(// type="button" so that it doesn't submit a form
                            '<button type="button" class="' + buttonClasses.join(' ') + '"' +
                                buttonAriaAttr +
                                '>' + buttonInnerHtml + '</button>')
                            buttonEl.addEventListener('click', buttonClick)
                            groupChildren.push(buttonEl)
                        }
                    }
                })
                if (groupChildren.length > 1) {
                    groupEl = document.createElement('div')
                    const buttonGroupClassName = theme.getClass('buttonGroup')
                    if (isOnlyButtons && buttonGroupClassName) {
                        groupEl.classList.add(buttonGroupClassName)
                    }
                    appendToElement(groupEl, groupChildren)
                    sectionEl.appendChild(groupEl)
                } else {
                    appendToElement(sectionEl, groupChildren) // 1 or 0 children
                }
            })
        }
        return sectionEl
    }
    Toolbar.prototype.updateToday = function (isTodayEnabled) {
        this.toggleButtonEnabled('today', isTodayEnabled)
    }
    Toolbar.prototype.updatePrev = function (isPrevEnabled) {
        this.toggleButtonEnabled('prev', isPrevEnabled)
    }
    Toolbar.prototype.updateNext = function (isNextEnabled) {
        this.toggleButtonEnabled('next', isNextEnabled)
    }
    Toolbar.prototype.updateTitle = function (text) {
        findElements(this.el, 'h2').forEach(function (titleEl) {
            titleEl.innerText = text
        })
    }
    Toolbar.prototype.updateActiveButton = function (buttonName) {
        const className = this.theme.getClass('buttonActive')
        findElements(this.el, 'button').forEach(function (buttonEl) {
            if (buttonName && buttonEl.classList.contains('fc-' + buttonName + '-button')) {
                buttonEl.classList.add(className)
            } else {
                buttonEl.classList.remove(className)
            }
        })
    }
    Toolbar.prototype.toggleButtonEnabled = function (buttonName, bool) {
        findElements(this.el, '.fc-' + buttonName + '-button').forEach(function (buttonEl) {
            buttonEl.disabled = !bool
        })
    }
    return Toolbar
}(Component))

const CalendarComponent = /** @class */ (function (_super) {
    __extends(CalendarComponent, _super)
    function CalendarComponent(context, el) {
        const _this = _super.call(this, context) || this
        _this._renderToolbars = memoizeRendering(_this.renderToolbars)
        _this.buildViewPropTransformers = memoize(buildViewPropTransformers)
        _this.el = el
        prependToElement(el, _this.contentEl = createElement('div', { className: 'fc-view-container' }))
        const calendar = _this.calendar
        for (let _i = 0, _a = calendar.pluginSystem.hooks.viewContainerModifiers; _i < _a.length; _i++) {
            const modifyViewContainer = _a[_i]
            modifyViewContainer(_this.contentEl, calendar)
        }
        _this.toggleElClassNames(true)
        _this.computeTitle = memoize(computeTitle)
        _this.parseBusinessHours = memoize(function (input) {
            return parseBusinessHours(input, _this.calendar)
        })
        return _this
    }
    CalendarComponent.prototype.destroy = function () {
        if (this.header) {
            this.header.destroy()
        }
        if (this.footer) {
            this.footer.destroy()
        }
        if (this.view) {
            this.view.destroy()
        }
        removeElement(this.contentEl)
        this.toggleElClassNames(false)
        _super.prototype.destroy.call(this)
    }
    CalendarComponent.prototype.toggleElClassNames = function (bool) {
        const classList = this.el.classList
        const dirClassName = 'fc-' + this.opt('dir')
        const themeClassName = this.theme.getClass('widget')
        if (bool) {
            classList.add('fc')
            classList.add(dirClassName)
            classList.add(themeClassName)
        } else {
            classList.remove('fc')
            classList.remove(dirClassName)
            classList.remove(themeClassName)
        }
    }
    CalendarComponent.prototype.render = function (props) {
        this.freezeHeight()
        const title = this.computeTitle(props.dateProfile, props.viewSpec.options)
        this._renderToolbars(props.viewSpec, props.dateProfile, props.currentDate, props.dateProfileGenerator, title)
        this.renderView(props, title)
        this.updateSize()
        this.thawHeight()
    }
    CalendarComponent.prototype.renderToolbars = function (viewSpec, dateProfile, currentDate, dateProfileGenerator, title) {
        const headerLayout = this.opt('header')
        const footerLayout = this.opt('footer')
        const now = this.calendar.getNow()
        const todayInfo = dateProfileGenerator.build(now)
        const prevInfo = dateProfileGenerator.buildPrev(dateProfile, currentDate)
        const nextInfo = dateProfileGenerator.buildNext(dateProfile, currentDate)
        const toolbarProps = {
            title,
            activeButton: viewSpec.type,
            isTodayEnabled: todayInfo.isValid && !rangeContainsMarker(dateProfile.currentRange, now),
            isPrevEnabled: prevInfo.isValid,
            isNextEnabled: nextInfo.isValid
        }
        if (headerLayout) {
            if (!this.header) {
                this.header = new Toolbar(this.context, 'fc-header-toolbar')
                prependToElement(this.el, this.header.el)
            }
            this.header.receiveProps(__assign({ layout: headerLayout }, toolbarProps))
        } else if (this.header) {
            this.header.destroy()
            this.header = null
        }
        if (footerLayout) {
            if (!this.footer) {
                this.footer = new Toolbar(this.context, 'fc-footer-toolbar')
                appendToElement(this.el, this.footer.el)
            }
            this.footer.receiveProps(__assign({ layout: footerLayout }, toolbarProps))
        } else if (this.footer) {
            this.footer.destroy()
            this.footer = null
        }
    }
    CalendarComponent.prototype.renderView = function (props, title) {
        let view = this.view
        const viewSpec = props.viewSpec; const dateProfileGenerator = props.dateProfileGenerator
        if (!view || view.viewSpec !== viewSpec) {
            if (view) {
                view.destroy()
            }
            view = this.view = new viewSpec.class({
                calendar: this.calendar,
                view: null,
                dateEnv: this.dateEnv,
                theme: this.theme,
                options: viewSpec.options
            }, viewSpec, dateProfileGenerator, this.contentEl)
        } else {
            view.addScroll(view.queryScroll())
        }
        view.title = title // for the API
        const viewProps = {
            dateProfile: props.dateProfile,
            businessHours: this.parseBusinessHours(viewSpec.options.businessHours),
            eventStore: props.eventStore,
            eventUiBases: props.eventUiBases,
            dateSelection: props.dateSelection,
            eventSelection: props.eventSelection,
            eventDrag: props.eventDrag,
            eventResize: props.eventResize
        }
        const transformers = this.buildViewPropTransformers(this.calendar.pluginSystem.hooks.viewPropsTransformers)
        for (let _i = 0, transformers_1 = transformers; _i < transformers_1.length; _i++) {
            const transformer = transformers_1[_i]
            __assign(viewProps, transformer.transform(viewProps, viewSpec, props, view))
        }
        view.receiveProps(viewProps)
    }
    // Sizing
    // -----------------------------------------------------------------------------------------------------------------
    CalendarComponent.prototype.updateSize = function (isResize) {
        if (isResize === void 0) { isResize = false }
        const view = this.view
        if (isResize) {
            view.addScroll(view.queryScroll())
        }
        if (isResize || this.isHeightAuto == null) {
            this.computeHeightVars()
        }
        view.updateSize(isResize, this.viewHeight, this.isHeightAuto)
        view.updateNowIndicator() // we need to guarantee this will run after updateSize
        view.popScroll(isResize)
    }
    CalendarComponent.prototype.computeHeightVars = function () {
        const calendar = this.calendar // yuck. need to handle dynamic options
        const heightInput = calendar.opt('height')
        const contentHeightInput = calendar.opt('contentHeight')
        this.isHeightAuto = heightInput === 'auto' || contentHeightInput === 'auto'
        if (typeof contentHeightInput === 'number') { // exists and not 'auto'
            this.viewHeight = contentHeightInput
        } else if (typeof contentHeightInput === 'function') { // exists and is a function
            this.viewHeight = contentHeightInput()
        } else if (typeof heightInput === 'number') { // exists and not 'auto'
            this.viewHeight = heightInput - this.queryToolbarsHeight()
        } else if (typeof heightInput === 'function') { // exists and is a function
            this.viewHeight = heightInput() - this.queryToolbarsHeight()
        } else if (heightInput === 'parent') { // set to height of parent element
            const parentEl = this.el.parentNode
            this.viewHeight = parentEl.getBoundingClientRect().height - this.queryToolbarsHeight()
        } else {
            this.viewHeight = Math.round(this.contentEl.getBoundingClientRect().width /
                Math.max(calendar.opt('aspectRatio'), 0.5))
        }
    }
    CalendarComponent.prototype.queryToolbarsHeight = function () {
        let height = 0
        if (this.header) {
            height += computeHeightAndMargins(this.header.el)
        }
        if (this.footer) {
            height += computeHeightAndMargins(this.footer.el)
        }
        return height
    }
    // Height "Freezing"
    // -----------------------------------------------------------------------------------------------------------------
    CalendarComponent.prototype.freezeHeight = function () {
        applyStyle(this.el, {
            height: this.el.getBoundingClientRect().height,
            overflow: 'hidden'
        })
    }
    CalendarComponent.prototype.thawHeight = function () {
        applyStyle(this.el, {
            height: '',
            overflow: ''
        })
    }
    return CalendarComponent
}(Component))
// Title and Date Formatting
// -----------------------------------------------------------------------------------------------------------------
// Computes what the title at the top of the calendar should be for this view
function computeTitle(dateProfile, viewOptions) {
    let range
    // for views that span a large unit of time, show the proper interval, ignoring stray days before and after
    if (/^(year|month)$/.test(dateProfile.currentRangeUnit)) {
        range = dateProfile.currentRange
    } else { // for day units or smaller, use the actual day range
        range = dateProfile.activeRange
    }
    return this.dateEnv.formatRange(range.start, range.end, createFormatter(viewOptions.titleFormat || computeTitleFormat(dateProfile), viewOptions.titleRangeSeparator), { isEndExclusive: dateProfile.isRangeAllDay })
}
// Generates the format string that should be used to generate the title for the current date range.
// Attempts to compute the most appropriate format if not explicitly specified with `titleFormat`.
function computeTitleFormat(dateProfile) {
    const currentRangeUnit = dateProfile.currentRangeUnit
    if (currentRangeUnit === 'year') {
        return { year: 'numeric' }
    } else if (currentRangeUnit === 'month') {
        return { year: 'numeric', month: 'long' } // like "September 2014"
    } else {
        const days = diffWholeDays(dateProfile.currentRange.start, dateProfile.currentRange.end)
        if (days !== null && days > 1) {
            // multi-day range. shorter, like "Sep 9 - 10 2014"
            return { year: 'numeric', month: 'short', day: 'numeric' }
        } else {
            // one day. longer, like "September 9 2014"
            return { year: 'numeric', month: 'long', day: 'numeric' }
        }
    }
}
// Plugin
// -----------------------------------------------------------------------------------------------------------------
function buildViewPropTransformers(theClasses) {
    return theClasses.map(function (theClass) {
        return new theClass()
    })
}

const Interaction = /** @class */ (function () {
    function Interaction(settings) {
        this.component = settings.component
    }
    Interaction.prototype.destroy = function () {
    }
    return Interaction
}())
function parseInteractionSettings(component, input) {
    return {
        component,
        el: input.el,
        useEventCenter: input.useEventCenter != null ? input.useEventCenter : true
    }
}
function interactionSettingsToStore(settings) {
    let _a
    return _a = {},
        _a[settings.component.uid] = settings,
        _a
}
// global state
const interactionSettingsStore = {}

/*
Detects when the user clicks on an event within a DateComponent
*/
const EventClicking = /** @class */ (function (_super) {
    __extends(EventClicking, _super)
    function EventClicking(settings) {
        const _this = _super.call(this, settings) || this
        _this.handleSegClick = function (ev, segEl) {
            const component = _this.component
            const seg = getElSeg(segEl)
            if (seg && // might be the <div> surrounding the more link
                component.isValidSegDownEl(ev.target)) {
                // our way to simulate a link click for elements that can't be <a> tags
                // grab before trigger fired in case trigger trashes DOM thru rerendering
                const hasUrlContainer = elementClosest(ev.target, '.fc-has-url')
                const url = hasUrlContainer ? hasUrlContainer.querySelector('a[href]').href : ''
                component.publiclyTrigger('eventClick', [
                    {
                        el: segEl,
                        event: new EventApi(component.calendar, seg.eventRange.def, seg.eventRange.instance),
                        jsEvent: ev,
                        view: component.view
                    }
                ])
                if (url && !ev.defaultPrevented) {
                    window.location.href = url
                }
            }
        }
        const component = settings.component
        _this.destroy = listenBySelector(component.el, 'click', component.fgSegSelector + ',' + component.bgSegSelector, _this.handleSegClick)
        return _this
    }
    return EventClicking
}(Interaction))

/*
Triggers events and adds/removes core classNames when the user's pointer
enters/leaves event-elements of a component.
*/
const EventHovering = /** @class */ (function (_super) {
    __extends(EventHovering, _super)
    function EventHovering(settings) {
        const _this = _super.call(this, settings) || this
        // for simulating an eventMouseLeave when the event el is destroyed while mouse is over it
        _this.handleEventElRemove = function (el) {
            if (el === _this.currentSegEl) {
                _this.handleSegLeave(null, _this.currentSegEl)
            }
        }
        _this.handleSegEnter = function (ev, segEl) {
            if (getElSeg(segEl)) { // TODO: better way to make sure not hovering over more+ link or its wrapper
                segEl.classList.add('fc-allow-mouse-resize')
                _this.currentSegEl = segEl
                _this.triggerEvent('eventMouseEnter', ev, segEl)
            }
        }
        _this.handleSegLeave = function (ev, segEl) {
            if (_this.currentSegEl) {
                segEl.classList.remove('fc-allow-mouse-resize')
                _this.currentSegEl = null
                _this.triggerEvent('eventMouseLeave', ev, segEl)
            }
        }
        const component = settings.component
        _this.removeHoverListeners = listenToHoverBySelector(component.el, component.fgSegSelector + ',' + component.bgSegSelector, _this.handleSegEnter, _this.handleSegLeave)
        component.calendar.on('eventElRemove', _this.handleEventElRemove)
        return _this
    }
    EventHovering.prototype.destroy = function () {
        this.removeHoverListeners()
        this.component.calendar.off('eventElRemove', this.handleEventElRemove)
    }
    EventHovering.prototype.triggerEvent = function (publicEvName, ev, segEl) {
        const component = this.component
        const seg = getElSeg(segEl)
        if (!ev || component.isValidSegDownEl(ev.target)) {
            component.publiclyTrigger(publicEvName, [
                {
                    el: segEl,
                    event: new EventApi(this.component.calendar, seg.eventRange.def, seg.eventRange.instance),
                    jsEvent: ev,
                    view: component.view
                }
            ])
        }
    }
    return EventHovering
}(Interaction))

const StandardTheme = /** @class */ (function (_super) {
    __extends(StandardTheme, _super)
    function StandardTheme() {
        return _super !== null && _super.apply(this, arguments) || this
    }
    return StandardTheme
}(Theme))
StandardTheme.prototype.classes = {
    widget: 'fc-unthemed',
    widgetHeader: 'fc-widget-header',
    widgetContent: 'fc-widget-content',
    buttonGroup: 'fc-button-group',
    button: 'fc-button fc-button-primary',
    buttonActive: 'fc-button-active',
    popoverHeader: 'fc-widget-header',
    popoverContent: 'fc-widget-content',
    // day grid
    headerRow: 'fc-widget-header',
    dayRow: 'fc-widget-content',
    // list view
    listView: 'fc-widget-content'
}
StandardTheme.prototype.baseIconClass = 'fc-icon'
StandardTheme.prototype.iconClasses = {
    close: 'fc-icon-x',
    prev: 'fc-icon-chevron-left',
    next: 'fc-icon-chevron-right',
    prevYear: 'fc-icon-chevrons-left',
    nextYear: 'fc-icon-chevrons-right'
}
StandardTheme.prototype.iconOverrideOption = 'buttonIcons'
StandardTheme.prototype.iconOverrideCustomButtonOption = 'icon'
StandardTheme.prototype.iconOverridePrefix = 'fc-icon-'

const Calendar = /** @class */ (function () {
    function Calendar(el, overrides) {
        const _this = this
        this.parseRawLocales = memoize(parseRawLocales)
        this.buildLocale = memoize(buildLocale)
        this.buildDateEnv = memoize(buildDateEnv)
        this.buildTheme = memoize(buildTheme)
        this.buildEventUiSingleBase = memoize(this._buildEventUiSingleBase)
        this.buildSelectionConfig = memoize(this._buildSelectionConfig)
        this.buildEventUiBySource = memoizeOutput(buildEventUiBySource, isPropsEqual)
        this.buildEventUiBases = memoize(buildEventUiBases)
        this.interactionsStore = {}
        this.actionQueue = []
        this.isReducing = false
        // isDisplaying: boolean = false // installed in DOM? accepting renders?
        this.needsRerender = false // needs a render?
        this.needsFullRerender = false
        this.isRendering = false // currently in the executeRender function?
        this.renderingPauseDepth = 0
        this.buildDelayedRerender = memoize(buildDelayedRerender)
        this.afterSizingTriggers = {}
        this.isViewUpdated = false
        this.isDatesUpdated = false
        this.isEventsUpdated = false
        this.el = el
        this.optionsManager = new OptionsManager(overrides || {})
        this.pluginSystem = new PluginSystem()
        // only do once. don't do in handleOptions. because can't remove plugins
        this.addPluginInputs(this.optionsManager.computed.plugins || [])
        this.handleOptions(this.optionsManager.computed)
        this.publiclyTrigger('_init') // for tests
        this.hydrate()
        this.calendarInteractions = this.pluginSystem.hooks.calendarInteractions
            .map(function (calendarInteractionClass) {
            return new calendarInteractionClass(_this)
        })
    }
    Calendar.prototype.addPluginInputs = function (pluginInputs) {
        const pluginDefs = refinePluginDefs(pluginInputs)
        for (let _i = 0, pluginDefs_1 = pluginDefs; _i < pluginDefs_1.length; _i++) {
            const pluginDef = pluginDefs_1[_i]
            this.pluginSystem.add(pluginDef)
        }
    }
    Object.defineProperty(Calendar.prototype, 'view', {
        // public API
        get: function () {
            return this.component ? this.component.view : null
        },
        enumerable: true,
        configurable: true
    })
    // Public API for rendering
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.render = function () {
        if (!this.component) {
            this.renderableEventStore = createEmptyEventStore()
            this.bindHandlers()
            this.executeRender()
        } else {
            this.requestRerender(true)
        }
    }
    Calendar.prototype.destroy = function () {
        if (this.component) {
            this.unbindHandlers()
            this.component.destroy() // don't null-out. in case API needs access
            this.component = null // umm ???
            for (let _i = 0, _a = this.calendarInteractions; _i < _a.length; _i++) {
                const interaction = _a[_i]
                interaction.destroy()
            }
            this.publiclyTrigger('_destroyed')
        }
    }
    // Handlers
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.bindHandlers = function () {
        const _this = this
        // event delegation for nav links
        this.removeNavLinkListener = listenBySelector(this.el, 'click', 'a[data-goto]', function (ev, anchorEl) {
            let gotoOptions = anchorEl.getAttribute('data-goto')
            gotoOptions = gotoOptions ? JSON.parse(gotoOptions) : {}
            const dateEnv = _this.dateEnv
            const dateMarker = dateEnv.createMarker(gotoOptions.date)
            let viewType = gotoOptions.type
            // property like "navLinkDayClick". might be a string or a function
            const customAction = _this.viewOpt('navLink' + capitaliseFirstLetter(viewType) + 'Click')
            if (typeof customAction === 'function') {
                customAction(dateEnv.toDate(dateMarker), ev)
            } else {
                if (typeof customAction === 'string') {
                    viewType = customAction
                }
                _this.zoomTo(dateMarker, viewType)
            }
        })
        if (this.opt('handleWindowResize')) {
            window.addEventListener('resize', this.windowResizeProxy = debounce(// prevents rapid calls
            this.windowResize.bind(this), this.opt('windowResizeDelay')))
        }
    }
    Calendar.prototype.unbindHandlers = function () {
        this.removeNavLinkListener()
        if (this.windowResizeProxy) {
            window.removeEventListener('resize', this.windowResizeProxy)
            this.windowResizeProxy = null
        }
    }
    // Dispatcher
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.hydrate = function () {
        const _this = this
        this.state = this.buildInitialState()
        const rawSources = this.opt('eventSources') || []
        const singleRawSource = this.opt('events')
        const sources = [] // parsed
        if (singleRawSource) {
            rawSources.unshift(singleRawSource)
        }
        for (let _i = 0, rawSources_1 = rawSources; _i < rawSources_1.length; _i++) {
            const rawSource = rawSources_1[_i]
            const source = parseEventSource(rawSource, this)
            if (source) {
                sources.push(source)
            }
        }
        this.batchRendering(function () {
            _this.dispatch({ type: 'INIT' }) // pass in sources here?
            _this.dispatch({ type: 'ADD_EVENT_SOURCES', sources })
            _this.dispatch({
                type: 'SET_VIEW_TYPE',
                viewType: _this.opt('defaultView') || _this.pluginSystem.hooks.defaultView
            })
        })
    }
    Calendar.prototype.buildInitialState = function () {
        return {
            viewType: null,
            loadingLevel: 0,
            eventSourceLoadingLevel: 0,
            currentDate: this.getInitialDate(),
            dateProfile: null,
            eventSources: {},
            eventStore: createEmptyEventStore(),
            dateSelection: null,
            eventSelection: '',
            eventDrag: null,
            eventResize: null
        }
    }
    Calendar.prototype.dispatch = function (action) {
        this.actionQueue.push(action)
        if (!this.isReducing) {
            this.isReducing = true
            const oldState = this.state
            while (this.actionQueue.length) {
                this.state = this.reduce(this.state, this.actionQueue.shift(), this)
            }
            const newState = this.state
            this.isReducing = false
            if (!oldState.loadingLevel && newState.loadingLevel) {
                this.publiclyTrigger('loading', [true])
            } else if (oldState.loadingLevel && !newState.loadingLevel) {
                this.publiclyTrigger('loading', [false])
            }
            const view = this.component && this.component.view
            if (oldState.eventStore !== newState.eventStore || this.needsFullRerender) {
                if (oldState.eventStore) {
                    this.isEventsUpdated = true
                }
            }
            if (oldState.dateProfile !== newState.dateProfile || this.needsFullRerender) {
                if (oldState.dateProfile && view) { // why would view be null!?
                    this.publiclyTrigger('datesDestroy', [
                        {
                            view,
                            el: view.el
                        }
                    ])
                }
                this.isDatesUpdated = true
            }
            if (oldState.viewType !== newState.viewType || this.needsFullRerender) {
                if (oldState.viewType && view) { // why would view be null!?
                    this.publiclyTrigger('viewSkeletonDestroy', [
                        {
                            view,
                            el: view.el
                        }
                    ])
                }
                this.isViewUpdated = true
            }
            this.requestRerender()
        }
    }
    Calendar.prototype.reduce = function (state, action, calendar) {
        return reduce(state, action, calendar)
    }
    // Render Queue
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.requestRerender = function (needsFull) {
        if (needsFull === void 0) { needsFull = false }
        this.needsRerender = true
        this.needsFullRerender = this.needsFullRerender || needsFull
        this.delayedRerender() // will call a debounced-version of tryRerender
    }
    Calendar.prototype.tryRerender = function () {
        if (this.component && // must be accepting renders
            this.needsRerender && // indicates that a rerender was requested
            !this.renderingPauseDepth && // not paused
            !this.isRendering // not currently in the render loop
        ) {
            this.executeRender()
        }
    }
    Calendar.prototype.batchRendering = function (func) {
        this.renderingPauseDepth++
        func()
        this.renderingPauseDepth--
        if (this.needsRerender) {
            this.requestRerender()
        }
    }
    // Rendering
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.executeRender = function () {
        const needsFullRerender = this.needsFullRerender // save before clearing
        // clear these BEFORE the render so that new values will accumulate during render
        this.needsRerender = false
        this.needsFullRerender = false
        this.isRendering = true
        this.renderComponent(needsFullRerender)
        this.isRendering = false
        // received a rerender request while rendering
        if (this.needsRerender) {
            this.delayedRerender()
        }
    }
    /*
    don't call this directly. use executeRender instead
    */
    Calendar.prototype.renderComponent = function (needsFull) {
        const _a = this; const state = _a.state; let component = _a.component
        const viewType = state.viewType
        const viewSpec = this.viewSpecs[viewType]
        const savedScroll = (needsFull && component) ? component.view.queryScroll() : null
        if (!viewSpec) {
            throw new Error('View type "' + viewType + '" is not valid')
        }
        // if event sources are still loading and progressive rendering hasn't been enabled,
        // keep rendering the last fully loaded set of events
        const renderableEventStore = this.renderableEventStore =
            (state.eventSourceLoadingLevel && !this.opt('progressiveEventRendering'))
                ? this.renderableEventStore
                : state.eventStore
        const eventUiSingleBase = this.buildEventUiSingleBase(viewSpec.options)
        const eventUiBySource = this.buildEventUiBySource(state.eventSources)
        const eventUiBases = this.eventUiBases = this.buildEventUiBases(renderableEventStore.defs, eventUiSingleBase, eventUiBySource)
        if (needsFull || !component) {
            if (component) {
                component.freezeHeight() // next component will unfreeze it
                component.destroy()
            }
            component = this.component = new CalendarComponent({
                calendar: this,
                view: null,
                dateEnv: this.dateEnv,
                theme: this.theme,
                options: this.optionsManager.computed
            }, this.el)
            this.isViewUpdated = true
            this.isDatesUpdated = true
            this.isEventsUpdated = true
        }
        component.receiveProps(__assign({}, state, { viewSpec, dateProfile: state.dateProfile, dateProfileGenerator: this.dateProfileGenerators[viewType], eventStore: renderableEventStore, eventUiBases, dateSelection: state.dateSelection, eventSelection: state.eventSelection, eventDrag: state.eventDrag, eventResize: state.eventResize }))
        if (savedScroll) {
            component.view.applyScroll(savedScroll, false)
        }
        if (this.isViewUpdated) {
            this.isViewUpdated = false
            this.publiclyTrigger('viewSkeletonRender', [
                {
                    view: component.view,
                    el: component.view.el
                }
            ])
        }
        if (this.isDatesUpdated) {
            this.isDatesUpdated = false
            this.publiclyTrigger('datesRender', [
                {
                    view: component.view,
                    el: component.view.el
                }
            ])
        }
        if (this.isEventsUpdated) {
            this.isEventsUpdated = false
        }
        this.releaseAfterSizingTriggers()
    }
    // Options
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.setOption = function (name, val) {
        let _a
        this.mutateOptions((_a = {}, _a[name] = val, _a), [], true)
    }
    Calendar.prototype.getOption = function (name) {
        return this.optionsManager.computed[name]
    }
    Calendar.prototype.opt = function (name) {
        return this.optionsManager.computed[name]
    }
    Calendar.prototype.viewOpt = function (name) {
        return this.viewOpts()[name]
    }
    Calendar.prototype.viewOpts = function () {
        return this.viewSpecs[this.state.viewType].options
    }
    /*
    handles option changes (like a diff)
    */
    Calendar.prototype.mutateOptions = function (updates, removals, isDynamic, deepEqual) {
        const _this = this
        const changeHandlers = this.pluginSystem.hooks.optionChangeHandlers
        const normalUpdates = {}
        const specialUpdates = {}
        const oldDateEnv = this.dateEnv // do this before handleOptions
        let isTimeZoneDirty = false
        let isSizeDirty = false
        let anyDifficultOptions = Boolean(removals.length)
        for (const name_1 in updates) {
            if (changeHandlers[name_1]) {
                specialUpdates[name_1] = updates[name_1]
            } else {
                normalUpdates[name_1] = updates[name_1]
            }
        }
        for (const name_2 in normalUpdates) {
            if (/^(height|contentHeight|aspectRatio)$/.test(name_2)) {
                isSizeDirty = true
            } else if (/^(defaultDate|defaultView)$/.test(name_2)) ;
            else {
                anyDifficultOptions = true
                if (name_2 === 'timeZone') {
                    isTimeZoneDirty = true
                }
            }
        }
        this.optionsManager.mutate(normalUpdates, removals, isDynamic)
        if (anyDifficultOptions) {
            this.handleOptions(this.optionsManager.computed)
            this.needsFullRerender = true
        }
        this.batchRendering(function () {
            if (anyDifficultOptions) {
                if (isTimeZoneDirty) {
                    _this.dispatch({
                        type: 'CHANGE_TIMEZONE',
                        oldDateEnv
                    })
                }
                /* HACK
                has the same effect as calling this.requestRerender(true)
                but recomputes the state's dateProfile
                */
                _this.dispatch({
                    type: 'SET_VIEW_TYPE',
                    viewType: _this.state.viewType
                })
            } else if (isSizeDirty) {
                _this.updateSize()
            }
            // special updates
            if (deepEqual) {
                for (const name_3 in specialUpdates) {
                    changeHandlers[name_3](specialUpdates[name_3], _this, deepEqual)
                }
            }
        })
    }
    /*
    rebuilds things based off of a complete set of refined options
    */
    Calendar.prototype.handleOptions = function (options) {
        const _this = this
        const pluginHooks = this.pluginSystem.hooks
        this.defaultAllDayEventDuration = createDuration(options.defaultAllDayEventDuration)
        this.defaultTimedEventDuration = createDuration(options.defaultTimedEventDuration)
        this.delayedRerender = this.buildDelayedRerender(options.rerenderDelay)
        this.theme = this.buildTheme(options)
        const available = this.parseRawLocales(options.locales)
        this.availableRawLocales = available.map
        const locale = this.buildLocale(options.locale || available.defaultCode, available.map)
        this.dateEnv = this.buildDateEnv(locale, options.timeZone, pluginHooks.namedTimeZonedImpl, options.firstDay, options.weekNumberCalculation, options.weekLabel, pluginHooks.cmdFormatter)
        this.selectionConfig = this.buildSelectionConfig(options) // needs dateEnv. do after :(
        // ineffecient to do every time?
        this.viewSpecs = buildViewSpecs(pluginHooks.views, this.optionsManager)
        // ineffecient to do every time?
        this.dateProfileGenerators = mapHash(this.viewSpecs, function (viewSpec) {
            return new viewSpec.class.prototype.dateProfileGeneratorClass(viewSpec, _this)
        })
    }
    Calendar.prototype.getAvailableLocaleCodes = function () {
        return Object.keys(this.availableRawLocales)
    }
    Calendar.prototype._buildSelectionConfig = function (rawOpts) {
        return processScopedUiProps('select', rawOpts, this)
    }
    Calendar.prototype._buildEventUiSingleBase = function (rawOpts) {
        if (rawOpts.editable) { // so 'editable' affected events
            rawOpts = __assign({}, rawOpts, { eventEditable: true })
        }
        return processScopedUiProps('event', rawOpts, this)
    }
    // Trigger
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.hasPublicHandlers = function (name) {
        return this.hasHandlers(name) ||
            this.opt(name) // handler specified in options
    }
    Calendar.prototype.publiclyTrigger = function (name, args) {
        const optHandler = this.opt(name)
        this.triggerWith(name, this, args)
        if (optHandler) {
            return optHandler.apply(this, args)
        }
    }
    Calendar.prototype.publiclyTriggerAfterSizing = function (name, args) {
        const afterSizingTriggers = this.afterSizingTriggers;
        (afterSizingTriggers[name] || (afterSizingTriggers[name] = [])).push(args)
    }
    Calendar.prototype.releaseAfterSizingTriggers = function () {
        const afterSizingTriggers = this.afterSizingTriggers
        for (const name_4 in afterSizingTriggers) {
            for (let _i = 0, _a = afterSizingTriggers[name_4]; _i < _a.length; _i++) {
                const args = _a[_i]
                this.publiclyTrigger(name_4, args)
            }
        }
        this.afterSizingTriggers = {}
    }
    // View
    // -----------------------------------------------------------------------------------------------------------------
    // Returns a boolean about whether the view is okay to instantiate at some point
    Calendar.prototype.isValidViewType = function (viewType) {
        return Boolean(this.viewSpecs[viewType])
    }
    Calendar.prototype.changeView = function (viewType, dateOrRange) {
        let dateMarker = null
        if (dateOrRange) {
            if (dateOrRange.start && dateOrRange.end) { // a range
                this.optionsManager.mutate({ visibleRange: dateOrRange }, []) // will not rerender
                this.handleOptions(this.optionsManager.computed) // ...but yuck
            } else { // a date
                dateMarker = this.dateEnv.createMarker(dateOrRange) // just like gotoDate
            }
        }
        this.unselect()
        this.dispatch({
            type: 'SET_VIEW_TYPE',
            viewType,
            dateMarker
        })
    }
    // Forces navigation to a view for the given date.
    // `viewType` can be a specific view name or a generic one like "week" or "day".
    // needs to change
    Calendar.prototype.zoomTo = function (dateMarker, viewType) {
        let spec
        viewType = viewType || 'day' // day is default zoom
        spec = this.viewSpecs[viewType] ||
            this.getUnitViewSpec(viewType)
        this.unselect()
        if (spec) {
            this.dispatch({
                type: 'SET_VIEW_TYPE',
                viewType: spec.type,
                dateMarker
            })
        } else {
            this.dispatch({
                type: 'SET_DATE',
                dateMarker
            })
        }
    }
    // Given a duration singular unit, like "week" or "day", finds a matching view spec.
    // Preference is given to views that have corresponding buttons.
    Calendar.prototype.getUnitViewSpec = function (unit) {
        const component = this.component
        const viewTypes = []
        let i
        let spec
        // put views that have buttons first. there will be duplicates, but oh
        if (component.header) {
            viewTypes.push.apply(viewTypes, component.header.viewsWithButtons)
        }
        if (component.footer) {
            viewTypes.push.apply(viewTypes, component.footer.viewsWithButtons)
        }
        for (const viewType in this.viewSpecs) {
            viewTypes.push(viewType)
        }
        for (i = 0; i < viewTypes.length; i++) {
            spec = this.viewSpecs[viewTypes[i]]
            if (spec) {
                if (spec.singleUnit === unit) {
                    return spec
                }
            }
        }
    }
    // Current Date
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.getInitialDate = function () {
        const defaultDateInput = this.opt('defaultDate')
        // compute the initial ambig-timezone date
        if (defaultDateInput != null) {
            return this.dateEnv.createMarker(defaultDateInput)
        } else {
            return this.getNow() // getNow already returns unzoned
        }
    }
    Calendar.prototype.prev = function () {
        this.unselect()
        this.dispatch({ type: 'PREV' })
    }
    Calendar.prototype.next = function () {
        this.unselect()
        this.dispatch({ type: 'NEXT' })
    }
    Calendar.prototype.prevYear = function () {
        this.unselect()
        this.dispatch({
            type: 'SET_DATE',
            dateMarker: this.dateEnv.addYears(this.state.currentDate, -1)
        })
    }
    Calendar.prototype.nextYear = function () {
        this.unselect()
        this.dispatch({
            type: 'SET_DATE',
            dateMarker: this.dateEnv.addYears(this.state.currentDate, 1)
        })
    }
    Calendar.prototype.today = function () {
        this.unselect()
        this.dispatch({
            type: 'SET_DATE',
            dateMarker: this.getNow()
        })
    }
    Calendar.prototype.gotoDate = function (zonedDateInput) {
        this.unselect()
        this.dispatch({
            type: 'SET_DATE',
            dateMarker: this.dateEnv.createMarker(zonedDateInput)
        })
    }
    Calendar.prototype.incrementDate = function (deltaInput) {
        const delta = createDuration(deltaInput)
        if (delta) { // else, warn about invalid input?
            this.unselect()
            this.dispatch({
                type: 'SET_DATE',
                dateMarker: this.dateEnv.add(this.state.currentDate, delta)
            })
        }
    }
    // for external API
    Calendar.prototype.getDate = function () {
        return this.dateEnv.toDate(this.state.currentDate)
    }
    // Date Formatting Utils
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.formatDate = function (d, formatter) {
        const dateEnv = this.dateEnv
        return dateEnv.format(dateEnv.createMarker(d), createFormatter(formatter))
    }
    // `settings` is for formatter AND isEndExclusive
    Calendar.prototype.formatRange = function (d0, d1, settings) {
        const dateEnv = this.dateEnv
        return dateEnv.formatRange(dateEnv.createMarker(d0), dateEnv.createMarker(d1), createFormatter(settings, this.opt('defaultRangeSeparator')), settings)
    }
    Calendar.prototype.formatIso = function (d, omitTime) {
        const dateEnv = this.dateEnv
        return dateEnv.formatIso(dateEnv.createMarker(d), { omitTime })
    }
    // Sizing
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.windowResize = function (ev) {
        if (!this.isHandlingWindowResize &&
            this.component && // why?
            ev.target === window // not a jqui resize event
        ) {
            this.isHandlingWindowResize = true
            this.updateSize()
            this.publiclyTrigger('windowResize', [this.view])
            this.isHandlingWindowResize = false
        }
    }
    Calendar.prototype.updateSize = function () {
        if (this.component) { // when?
            this.component.updateSize(true)
        }
    }
    // Component Registration
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.registerInteractiveComponent = function (component, settingsInput) {
        const settings = parseInteractionSettings(component, settingsInput)
        const DEFAULT_INTERACTIONS = [
            EventClicking,
            EventHovering
        ]
        const interactionClasses = DEFAULT_INTERACTIONS.concat(this.pluginSystem.hooks.componentInteractions)
        const interactions = interactionClasses.map(function (interactionClass) {
            return new interactionClass(settings)
        })
        this.interactionsStore[component.uid] = interactions
        interactionSettingsStore[component.uid] = settings
    }
    Calendar.prototype.unregisterInteractiveComponent = function (component) {
        for (let _i = 0, _a = this.interactionsStore[component.uid]; _i < _a.length; _i++) {
            const listener = _a[_i]
            listener.destroy()
        }
        delete this.interactionsStore[component.uid]
        delete interactionSettingsStore[component.uid]
    }
    // Date Selection / Event Selection / DayClick
    // -----------------------------------------------------------------------------------------------------------------
    // this public method receives start/end dates in any format, with any timezone
    // NOTE: args were changed from v3
    Calendar.prototype.select = function (dateOrObj, endDate) {
        let selectionInput
        if (endDate == null) {
            if (dateOrObj.start != null) {
                selectionInput = dateOrObj
            } else {
                selectionInput = {
                    start: dateOrObj,
                    end: null
                }
            }
        } else {
            selectionInput = {
                start: dateOrObj,
                end: endDate
            }
        }
        const selection = parseDateSpan(selectionInput, this.dateEnv, createDuration({ days: 1 }) // TODO: cache this?
        )
        if (selection) { // throw parse error otherwise?
            this.dispatch({ type: 'SELECT_DATES', selection })
            this.triggerDateSelect(selection)
        }
    }
    // public method
    Calendar.prototype.unselect = function (pev) {
        if (this.state.dateSelection) {
            this.dispatch({ type: 'UNSELECT_DATES' })
            this.triggerDateUnselect(pev)
        }
    }
    Calendar.prototype.triggerDateSelect = function (selection, pev) {
        const arg = __assign({}, this.buildDateSpanApi(selection), { jsEvent: pev ? pev.origEvent : null, view: this.view })
        this.publiclyTrigger('select', [arg])
    }
    Calendar.prototype.triggerDateUnselect = function (pev) {
        this.publiclyTrigger('unselect', [
            {
                jsEvent: pev ? pev.origEvent : null,
                view: this.view
            }
        ])
    }
    // TODO: receive pev?
    Calendar.prototype.triggerDateClick = function (dateSpan, dayEl, view, ev) {
        const arg = __assign({}, this.buildDatePointApi(dateSpan), {
 dayEl,
jsEvent: ev, // Is this always a mouse event? See #4655
            view
})
        this.publiclyTrigger('dateClick', [arg])
    }
    Calendar.prototype.buildDatePointApi = function (dateSpan) {
        const props = {}
        for (let _i = 0, _a = this.pluginSystem.hooks.datePointTransforms; _i < _a.length; _i++) {
            const transform = _a[_i]
            __assign(props, transform(dateSpan, this))
        }
        __assign(props, buildDatePointApi(dateSpan, this.dateEnv))
        return props
    }
    Calendar.prototype.buildDateSpanApi = function (dateSpan) {
        const props = {}
        for (let _i = 0, _a = this.pluginSystem.hooks.dateSpanTransforms; _i < _a.length; _i++) {
            const transform = _a[_i]
            __assign(props, transform(dateSpan, this))
        }
        __assign(props, buildDateSpanApi(dateSpan, this.dateEnv))
        return props
    }
    // Date Utils
    // -----------------------------------------------------------------------------------------------------------------
    // Returns a DateMarker for the current date, as defined by the client's computer or from the `now` option
    Calendar.prototype.getNow = function () {
        let now = this.opt('now')
        if (typeof now === 'function') {
            now = now()
        }
        if (now == null) {
            return this.dateEnv.createNowMarker()
        }
        return this.dateEnv.createMarker(now)
    }
    // Event-Date Utilities
    // -----------------------------------------------------------------------------------------------------------------
    // Given an event's allDay status and start date, return what its fallback end date should be.
    // TODO: rename to computeDefaultEventEnd
    Calendar.prototype.getDefaultEventEnd = function (allDay, marker) {
        let end = marker
        if (allDay) {
            end = startOfDay(end)
            end = this.dateEnv.add(end, this.defaultAllDayEventDuration)
        } else {
            end = this.dateEnv.add(end, this.defaultTimedEventDuration)
        }
        return end
    }
    // Public Events API
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.addEvent = function (eventInput, sourceInput) {
        if (eventInput instanceof EventApi) {
            const def = eventInput._def
            const instance = eventInput._instance
            // not already present? don't want to add an old snapshot
            if (!this.state.eventStore.defs[def.defId]) {
                this.dispatch({
                    type: 'ADD_EVENTS',
                    eventStore: eventTupleToStore({ def, instance }) // TODO: better util for two args?
                })
            }
            return eventInput
        }
        let sourceId
        if (sourceInput instanceof EventSourceApi) {
            sourceId = sourceInput.internalEventSource.sourceId
        } else if (sourceInput != null) {
            const sourceApi = this.getEventSourceById(sourceInput) // TODO: use an internal function
            if (!sourceApi) {
                console.warn('Could not find an event source with ID "' + sourceInput + '"') // TODO: test
                return null
            } else {
                sourceId = sourceApi.internalEventSource.sourceId
            }
        }
        const tuple = parseEvent(eventInput, sourceId, this)
        if (tuple) {
            this.dispatch({
                type: 'ADD_EVENTS',
                eventStore: eventTupleToStore(tuple)
            })
            return new EventApi(this, tuple.def, tuple.def.recurringDef ? null : tuple.instance)
        }
        return null
    }
    // TODO: optimize
    Calendar.prototype.getEventById = function (id) {
        const _a = this.state.eventStore; const defs = _a.defs; const instances = _a.instances
        id = String(id)
        for (const defId in defs) {
            const def = defs[defId]
            if (def.publicId === id) {
                if (def.recurringDef) {
                    return new EventApi(this, def, null)
                } else {
                    for (const instanceId in instances) {
                        const instance = instances[instanceId]
                        if (instance.defId === def.defId) {
                            return new EventApi(this, def, instance)
                        }
                    }
                }
            }
        }
        return null
    }
    Calendar.prototype.getEvents = function () {
        const _a = this.state.eventStore; const defs = _a.defs; const instances = _a.instances
        const eventApis = []
        for (const id in instances) {
            const instance = instances[id]
            const def = defs[instance.defId]
            eventApis.push(new EventApi(this, def, instance))
        }
        return eventApis
    }
    Calendar.prototype.removeAllEvents = function () {
        this.dispatch({ type: 'REMOVE_ALL_EVENTS' })
    }
    Calendar.prototype.rerenderEvents = function () {
        this.dispatch({ type: 'RESET_EVENTS' })
    }
    // Public Event Sources API
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.getEventSources = function () {
        const sourceHash = this.state.eventSources
        const sourceApis = []
        for (const internalId in sourceHash) {
            sourceApis.push(new EventSourceApi(this, sourceHash[internalId]))
        }
        return sourceApis
    }
    Calendar.prototype.getEventSourceById = function (id) {
        const sourceHash = this.state.eventSources
        id = String(id)
        for (const sourceId in sourceHash) {
            if (sourceHash[sourceId].publicId === id) {
                return new EventSourceApi(this, sourceHash[sourceId])
            }
        }
        return null
    }
    Calendar.prototype.addEventSource = function (sourceInput) {
        if (sourceInput instanceof EventSourceApi) {
            // not already present? don't want to add an old snapshot
            if (!this.state.eventSources[sourceInput.internalEventSource.sourceId]) {
                this.dispatch({
                    type: 'ADD_EVENT_SOURCES',
                    sources: [sourceInput.internalEventSource]
                })
            }
            return sourceInput
        }
        const eventSource = parseEventSource(sourceInput, this)
        if (eventSource) { // TODO: error otherwise?
            this.dispatch({ type: 'ADD_EVENT_SOURCES', sources: [eventSource] })
            return new EventSourceApi(this, eventSource)
        }
        return null
    }
    Calendar.prototype.removeAllEventSources = function () {
        this.dispatch({ type: 'REMOVE_ALL_EVENT_SOURCES' })
    }
    Calendar.prototype.refetchEvents = function () {
        this.dispatch({ type: 'FETCH_EVENT_SOURCES' })
    }
    // Scroll
    // -----------------------------------------------------------------------------------------------------------------
    Calendar.prototype.scrollToTime = function (timeInput) {
        const duration = createDuration(timeInput)
        if (duration) {
            this.component.view.scrollToDuration(duration)
        }
    }
    return Calendar
}())
EmitterMixin.mixInto(Calendar)
// for memoizers
// -----------------------------------------------------------------------------------------------------------------
function buildDateEnv(locale, timeZone, namedTimeZoneImpl, firstDay, weekNumberCalculation, weekLabel, cmdFormatter) {
    return new DateEnv({
        calendarSystem: 'gregory',
        timeZone,
        namedTimeZoneImpl,
        locale,
        weekNumberCalculation,
        firstDay,
        weekLabel,
        cmdFormatter
    })
}
function buildTheme(calendarOptions) {
    const themeClass = this.pluginSystem.hooks.themeClasses[calendarOptions.themeSystem] || StandardTheme
    return new themeClass(calendarOptions)
}
function buildDelayedRerender(wait) {
    let func = this.tryRerender.bind(this)
    if (wait != null) {
        func = debounce(func, wait)
    }
    return func
}
function buildEventUiBySource(eventSources) {
    return mapHash(eventSources, function (eventSource) {
        return eventSource.ui
    })
}
function buildEventUiBases(eventDefs, eventUiSingleBase, eventUiBySource) {
    const eventUiBases = { '': eventUiSingleBase }
    for (const defId in eventDefs) {
        const def = eventDefs[defId]
        if (def.sourceId && eventUiBySource[def.sourceId]) {
            eventUiBases[defId] = eventUiBySource[def.sourceId]
        }
    }
    return eventUiBases
}

const View = /** @class */ (function (_super) {
    __extends(View, _super)
    function View(context, viewSpec, dateProfileGenerator, parentEl) {
        const _this = _super.call(this, context, createElement('div', { className: 'fc-view fc-' + viewSpec.type + '-view' }), true // isView (HACK)
        ) || this
        _this.renderDatesMem = memoizeRendering(_this.renderDatesWrap, _this.unrenderDatesWrap)
        _this.renderBusinessHoursMem = memoizeRendering(_this.renderBusinessHours, _this.unrenderBusinessHours, [_this.renderDatesMem])
        _this.renderDateSelectionMem = memoizeRendering(_this.renderDateSelectionWrap, _this.unrenderDateSelectionWrap, [_this.renderDatesMem])
        _this.renderEventsMem = memoizeRendering(_this.renderEvents, _this.unrenderEvents, [_this.renderDatesMem])
        _this.renderEventSelectionMem = memoizeRendering(_this.renderEventSelectionWrap, _this.unrenderEventSelectionWrap, [_this.renderEventsMem])
        _this.renderEventDragMem = memoizeRendering(_this.renderEventDragWrap, _this.unrenderEventDragWrap, [_this.renderDatesMem])
        _this.renderEventResizeMem = memoizeRendering(_this.renderEventResizeWrap, _this.unrenderEventResizeWrap, [_this.renderDatesMem])
        _this.viewSpec = viewSpec
        _this.dateProfileGenerator = dateProfileGenerator
        _this.type = viewSpec.type
        _this.eventOrderSpecs = parseFieldSpecs(_this.opt('eventOrder'))
        _this.nextDayThreshold = createDuration(_this.opt('nextDayThreshold'))
        parentEl.appendChild(_this.el)
        _this.initialize()
        return _this
    }
    View.prototype.initialize = function () {
    }
    Object.defineProperty(View.prototype, 'activeStart', {
        // Date Setting/Unsetting
        // -----------------------------------------------------------------------------------------------------------------
        get: function () {
            return this.dateEnv.toDate(this.props.dateProfile.activeRange.start)
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(View.prototype, 'activeEnd', {
        get: function () {
            return this.dateEnv.toDate(this.props.dateProfile.activeRange.end)
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(View.prototype, 'currentStart', {
        get: function () {
            return this.dateEnv.toDate(this.props.dateProfile.currentRange.start)
        },
        enumerable: true,
        configurable: true
    })
    Object.defineProperty(View.prototype, 'currentEnd', {
        get: function () {
            return this.dateEnv.toDate(this.props.dateProfile.currentRange.end)
        },
        enumerable: true,
        configurable: true
    })
    // General Rendering
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.render = function (props) {
        this.renderDatesMem(props.dateProfile)
        this.renderBusinessHoursMem(props.businessHours)
        this.renderDateSelectionMem(props.dateSelection)
        this.renderEventsMem(props.eventStore)
        this.renderEventSelectionMem(props.eventSelection)
        this.renderEventDragMem(props.eventDrag)
        this.renderEventResizeMem(props.eventResize)
    }
    View.prototype.destroy = function () {
        _super.prototype.destroy.call(this)
        this.renderDatesMem.unrender() // should unrender everything else
    }
    // Sizing
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.updateSize = function (isResize, viewHeight, isAuto) {
        const calendar = this.calendar
        if (isResize || // HACKS...
            calendar.isViewUpdated ||
            calendar.isDatesUpdated ||
            calendar.isEventsUpdated) {
            // sort of the catch-all sizing
            // anything that might cause dimension changes
            this.updateBaseSize(isResize, viewHeight, isAuto)
        }
    }
    View.prototype.updateBaseSize = function (isResize, viewHeight, isAuto) {
    }
    // Date Rendering
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.renderDatesWrap = function (dateProfile) {
        this.renderDates(dateProfile)
        this.addScroll({
            duration: createDuration(this.opt('scrollTime'))
        })
        this.startNowIndicator(dateProfile) // shouldn't render yet because updateSize will be called soon
    }
    View.prototype.unrenderDatesWrap = function () {
        this.stopNowIndicator()
        this.unrenderDates()
    }
    View.prototype.renderDates = function (dateProfile) { }
    View.prototype.unrenderDates = function () { }
    // Business Hours
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.renderBusinessHours = function (businessHours) { }
    View.prototype.unrenderBusinessHours = function () { }
    // Date Selection
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.renderDateSelectionWrap = function (selection) {
        if (selection) {
            this.renderDateSelection(selection)
        }
    }
    View.prototype.unrenderDateSelectionWrap = function (selection) {
        if (selection) {
            this.unrenderDateSelection(selection)
        }
    }
    View.prototype.renderDateSelection = function (selection) { }
    View.prototype.unrenderDateSelection = function (selection) { }
    // Event Rendering
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.renderEvents = function (eventStore) { }
    View.prototype.unrenderEvents = function () { }
    // util for subclasses
    View.prototype.sliceEvents = function (eventStore, allDay) {
        const props = this.props
        return sliceEventStore(eventStore, props.eventUiBases, props.dateProfile.activeRange, allDay ? this.nextDayThreshold : null).fg
    }
    View.prototype.computeEventDraggable = function (eventDef, eventUi) {
        const transformers = this.calendar.pluginSystem.hooks.isDraggableTransformers
        let val = eventUi.startEditable
        for (let _i = 0, transformers_1 = transformers; _i < transformers_1.length; _i++) {
            const transformer = transformers_1[_i]
            val = transformer(val, eventDef, eventUi, this)
        }
        return val
    }
    View.prototype.computeEventStartResizable = function (eventDef, eventUi) {
        return eventUi.durationEditable && this.opt('eventResizableFromStart')
    }
    View.prototype.computeEventEndResizable = function (eventDef, eventUi) {
        return eventUi.durationEditable
    }
    // Event Selection
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.renderEventSelectionWrap = function (instanceId) {
        if (instanceId) {
            this.renderEventSelection(instanceId)
        }
    }
    View.prototype.unrenderEventSelectionWrap = function (instanceId) {
        if (instanceId) {
            this.unrenderEventSelection(instanceId)
        }
    }
    View.prototype.renderEventSelection = function (instanceId) { }
    View.prototype.unrenderEventSelection = function (instanceId) { }
    // Event Drag
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.renderEventDragWrap = function (state) {
        if (state) {
            this.renderEventDrag(state)
        }
    }
    View.prototype.unrenderEventDragWrap = function (state) {
        if (state) {
            this.unrenderEventDrag(state)
        }
    }
    View.prototype.renderEventDrag = function (state) { }
    View.prototype.unrenderEventDrag = function (state) { }
    // Event Resize
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.renderEventResizeWrap = function (state) {
        if (state) {
            this.renderEventResize(state)
        }
    }
    View.prototype.unrenderEventResizeWrap = function (state) {
        if (state) {
            this.unrenderEventResize(state)
        }
    }
    View.prototype.renderEventResize = function (state) { }
    View.prototype.unrenderEventResize = function (state) { }
    /* Now Indicator
    ------------------------------------------------------------------------------------------------------------------*/
    // Immediately render the current time indicator and begins re-rendering it at an interval,
    // which is defined by this.getNowIndicatorUnit().
    // TODO: somehow do this for the current whole day's background too
    View.prototype.startNowIndicator = function (dateProfile) {
        const _this = this
        const dateEnv = this.dateEnv
        let unit
        let update
        let delay // ms wait value
        if (this.opt('nowIndicator')) {
            unit = this.getNowIndicatorUnit(dateProfile)
            if (unit) {
                update = this.updateNowIndicator.bind(this)
                this.initialNowDate = this.calendar.getNow()
                this.initialNowQueriedMs = new Date().valueOf()
                // wait until the beginning of the next interval
                delay = dateEnv.add(dateEnv.startOf(this.initialNowDate, unit), createDuration(1, unit)).valueOf() - this.initialNowDate.valueOf()
                // TODO: maybe always use setTimeout, waiting until start of next unit
                this.nowIndicatorTimeoutID = setTimeout(function () {
                    _this.nowIndicatorTimeoutID = null
                    update()
                    if (unit === 'second') {
                        delay = 1000 // every second
                    } else {
                        delay = 1000 * 60 // otherwise, every minute
                    }
                    _this.nowIndicatorIntervalID = setInterval(update, delay) // update every interval
                }, delay)
            }
            // rendering will be initiated in updateSize
        }
    }
    // rerenders the now indicator, computing the new current time from the amount of time that has passed
    // since the initial getNow call.
    View.prototype.updateNowIndicator = function () {
        if (this.props.dateProfile && // a way to determine if dates were rendered yet
            this.initialNowDate // activated before?
        ) {
            this.unrenderNowIndicator() // won't unrender if unnecessary
            this.renderNowIndicator(addMs(this.initialNowDate, new Date().valueOf() - this.initialNowQueriedMs))
            this.isNowIndicatorRendered = true
        }
    }
    // Immediately unrenders the view's current time indicator and stops any re-rendering timers.
    // Won't cause side effects if indicator isn't rendered.
    View.prototype.stopNowIndicator = function () {
        if (this.isNowIndicatorRendered) {
            if (this.nowIndicatorTimeoutID) {
                clearTimeout(this.nowIndicatorTimeoutID)
                this.nowIndicatorTimeoutID = null
            }
            if (this.nowIndicatorIntervalID) {
                clearInterval(this.nowIndicatorIntervalID)
                this.nowIndicatorIntervalID = null
            }
            this.unrenderNowIndicator()
            this.isNowIndicatorRendered = false
        }
    }
    View.prototype.getNowIndicatorUnit = function (dateProfile) {
        // subclasses should implement
    }
    // Renders a current time indicator at the given datetime
    View.prototype.renderNowIndicator = function (date) {
        // SUBCLASSES MUST PASS TO CHILDREN!
    }
    // Undoes the rendering actions from renderNowIndicator
    View.prototype.unrenderNowIndicator = function () {
        // SUBCLASSES MUST PASS TO CHILDREN!
    }
    /* Scroller
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.addScroll = function (scroll) {
        const queuedScroll = this.queuedScroll || (this.queuedScroll = {})
        __assign(queuedScroll, scroll)
    }
    View.prototype.popScroll = function (isResize) {
        this.applyQueuedScroll(isResize)
        this.queuedScroll = null
    }
    View.prototype.applyQueuedScroll = function (isResize) {
        this.applyScroll(this.queuedScroll || {}, isResize)
    }
    View.prototype.queryScroll = function () {
        const scroll = {}
        if (this.props.dateProfile) { // dates rendered yet?
            __assign(scroll, this.queryDateScroll())
        }
        return scroll
    }
    View.prototype.applyScroll = function (scroll, isResize) {
        const duration = scroll.duration
        if (duration != null) {
            delete scroll.duration
            if (this.props.dateProfile) { // dates rendered yet?
                __assign(scroll, this.computeDateScroll(duration))
            }
        }
        if (this.props.dateProfile) { // dates rendered yet?
            this.applyDateScroll(scroll)
        }
    }
    View.prototype.computeDateScroll = function (duration) {
        return {} // subclasses must implement
    }
    View.prototype.queryDateScroll = function () {
        return {} // subclasses must implement
    }
    View.prototype.applyDateScroll = function (scroll) {
        // subclasses must implement
    }
    // for API
    View.prototype.scrollToDuration = function (duration) {
        this.applyScroll({ duration }, false)
    }
    return View
}(DateComponent))
EmitterMixin.mixInto(View)
View.prototype.usesMinMaxTime = false
View.prototype.dateProfileGeneratorClass = DateProfileGenerator

const FgEventRenderer = /** @class */ (function () {
    function FgEventRenderer(context) {
        this.segs = []
        this.isSizeDirty = false
        this.context = context
    }
    FgEventRenderer.prototype.renderSegs = function (segs, mirrorInfo) {
        this.rangeUpdated() // called too frequently :(
        // render an `.el` on each seg
        // returns a subset of the segs. segs that were actually rendered
        segs = this.renderSegEls(segs, mirrorInfo)
        this.segs = segs
        this.attachSegs(segs, mirrorInfo)
        this.isSizeDirty = true
        this.context.view.triggerRenderedSegs(this.segs, Boolean(mirrorInfo))
    }
    FgEventRenderer.prototype.unrender = function (_segs, mirrorInfo) {
        this.context.view.triggerWillRemoveSegs(this.segs, Boolean(mirrorInfo))
        this.detachSegs(this.segs)
        this.segs = []
    }
    // Updates values that rely on options and also relate to range
    FgEventRenderer.prototype.rangeUpdated = function () {
        const options = this.context.options
        let displayEventTime
        let displayEventEnd
        this.eventTimeFormat = createFormatter(options.eventTimeFormat || this.computeEventTimeFormat(), options.defaultRangeSeparator)
        displayEventTime = options.displayEventTime
        if (displayEventTime == null) {
            displayEventTime = this.computeDisplayEventTime() // might be based off of range
        }
        displayEventEnd = options.displayEventEnd
        if (displayEventEnd == null) {
            displayEventEnd = this.computeDisplayEventEnd() // might be based off of range
        }
        this.displayEventTime = displayEventTime
        this.displayEventEnd = displayEventEnd
    }
    // Renders and assigns an `el` property for each foreground event segment.
    // Only returns segments that successfully rendered.
    FgEventRenderer.prototype.renderSegEls = function (segs, mirrorInfo) {
        let html = ''
        let i
        if (segs.length) { // don't build an empty html string
            // build a large concatenation of event segment HTML
            for (i = 0; i < segs.length; i++) {
                html += this.renderSegHtml(segs[i], mirrorInfo)
            }
            // Grab individual elements from the combined HTML string. Use each as the default rendering.
            // Then, compute the 'el' for each segment. An el might be null if the eventRender callback returned false.
            htmlToElements(html).forEach(function (el, i) {
                const seg = segs[i]
                if (el) {
                    seg.el = el
                }
            })
            segs = filterSegsViaEls(this.context.view, segs, Boolean(mirrorInfo))
        }
        return segs
    }
    // Generic utility for generating the HTML classNames for an event segment's element
    FgEventRenderer.prototype.getSegClasses = function (seg, isDraggable, isResizable, mirrorInfo) {
        const classes = [
            'fc-event',
            seg.isStart ? 'fc-start' : 'fc-not-start',
            seg.isEnd ? 'fc-end' : 'fc-not-end'
        ].concat(seg.eventRange.ui.classNames)
        if (isDraggable) {
            classes.push('fc-draggable')
        }
        if (isResizable) {
            classes.push('fc-resizable')
        }
        if (mirrorInfo) {
            classes.push('fc-mirror')
            if (mirrorInfo.isDragging) {
                classes.push('fc-dragging')
            }
            if (mirrorInfo.isResizing) {
                classes.push('fc-resizing')
            }
        }
        return classes
    }
    // Compute the text that should be displayed on an event's element.
    // `range` can be the Event object itself, or something range-like, with at least a `start`.
    // If event times are disabled, or the event has no time, will return a blank string.
    // If not specified, formatter will default to the eventTimeFormat setting,
    // and displayEnd will default to the displayEventEnd setting.
    FgEventRenderer.prototype.getTimeText = function (eventRange, formatter, displayEnd) {
        const def = eventRange.def; const instance = eventRange.instance
        return this._getTimeText(instance.range.start, def.hasEnd ? instance.range.end : null, def.allDay, formatter, displayEnd, instance.forcedStartTzo, instance.forcedEndTzo)
    }
    FgEventRenderer.prototype._getTimeText = function (start, end, allDay, formatter, displayEnd, forcedStartTzo, forcedEndTzo) {
        const dateEnv = this.context.dateEnv
        if (formatter == null) {
            formatter = this.eventTimeFormat
        }
        if (displayEnd == null) {
            displayEnd = this.displayEventEnd
        }
        if (this.displayEventTime && !allDay) {
            if (displayEnd && end) {
                return dateEnv.formatRange(start, end, formatter, {
                    forcedStartTzo,
                    forcedEndTzo
                })
            } else {
                return dateEnv.format(start, formatter, {
                    forcedTzo: forcedStartTzo
                })
            }
        }
        return ''
    }
    FgEventRenderer.prototype.computeEventTimeFormat = function () {
        return {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: true
        }
    }
    FgEventRenderer.prototype.computeDisplayEventTime = function () {
        return true
    }
    FgEventRenderer.prototype.computeDisplayEventEnd = function () {
        return true
    }
    // Utility for generating event skin-related CSS properties
    FgEventRenderer.prototype.getSkinCss = function (ui) {
        return {
            'background-color': ui.backgroundColor,
            'border-color': ui.borderColor,
            color: ui.textColor
        }
    }
    FgEventRenderer.prototype.sortEventSegs = function (segs) {
        const specs = this.context.view.eventOrderSpecs
        const objs = segs.map(buildSegCompareObj)
        objs.sort(function (obj0, obj1) {
            return compareByFieldSpecs(obj0, obj1, specs)
        })
        return objs.map(function (c) {
            return c._seg
        })
    }
    FgEventRenderer.prototype.computeSizes = function (force) {
        if (force || this.isSizeDirty) {
            this.computeSegSizes(this.segs)
        }
    }
    FgEventRenderer.prototype.assignSizes = function (force) {
        if (force || this.isSizeDirty) {
            this.assignSegSizes(this.segs)
            this.isSizeDirty = false
        }
    }
    FgEventRenderer.prototype.computeSegSizes = function (segs) {
    }
    FgEventRenderer.prototype.assignSegSizes = function (segs) {
    }
    // Manipulation on rendered segs
    FgEventRenderer.prototype.hideByHash = function (hash) {
        if (hash) {
            for (let _i = 0, _a = this.segs; _i < _a.length; _i++) {
                const seg = _a[_i]
                if (hash[seg.eventRange.instance.instanceId]) {
                    seg.el.style.visibility = 'hidden'
                }
            }
        }
    }
    FgEventRenderer.prototype.showByHash = function (hash) {
        if (hash) {
            for (let _i = 0, _a = this.segs; _i < _a.length; _i++) {
                const seg = _a[_i]
                if (hash[seg.eventRange.instance.instanceId]) {
                    seg.el.style.visibility = ''
                }
            }
        }
    }
    FgEventRenderer.prototype.selectByInstanceId = function (instanceId) {
        if (instanceId) {
            for (let _i = 0, _a = this.segs; _i < _a.length; _i++) {
                const seg = _a[_i]
                const eventInstance = seg.eventRange.instance
                if (eventInstance && eventInstance.instanceId === instanceId &&
                    seg.el // necessary?
                ) {
                    seg.el.classList.add('fc-selected')
                }
            }
        }
    }
    FgEventRenderer.prototype.unselectByInstanceId = function (instanceId) {
        if (instanceId) {
            for (let _i = 0, _a = this.segs; _i < _a.length; _i++) {
                const seg = _a[_i]
                if (seg.el) { // necessary?
                    seg.el.classList.remove('fc-selected')
                }
            }
        }
    }
    return FgEventRenderer
}())
// returns a object with all primitive props that can be compared
function buildSegCompareObj(seg) {
    const eventDef = seg.eventRange.def
    const range = seg.eventRange.instance.range
    const start = range.start ? range.start.valueOf() : 0 // TODO: better support for open-range events
    const end = range.end ? range.end.valueOf() : 0 // "
    return __assign({}, eventDef.extendedProps, eventDef, {
 id: eventDef.publicId,
start,
        end,
duration: end - start,
allDay: Number(eventDef.allDay),
_seg: seg // for later retrieval
     })
}

const FillRenderer = /** @class */ (function () {
    function FillRenderer(context) {
        this.fillSegTag = 'div'
        this.dirtySizeFlags = {}
        this.context = context
        this.containerElsByType = {}
        this.segsByType = {}
    }
    FillRenderer.prototype.getSegsByType = function (type) {
        return this.segsByType[type] || []
    }
    FillRenderer.prototype.renderSegs = function (type, segs) {
        let _a
        const renderedSegs = this.renderSegEls(type, segs) // assignes `.el` to each seg. returns successfully rendered segs
        const containerEls = this.attachSegs(type, renderedSegs)
        if (containerEls) {
            (_a = (this.containerElsByType[type] || (this.containerElsByType[type] = []))).push.apply(_a, containerEls)
        }
        this.segsByType[type] = renderedSegs
        if (type === 'bgEvent') {
            this.context.view.triggerRenderedSegs(renderedSegs, false) // isMirror=false
        }
        this.dirtySizeFlags[type] = true
    }
    // Unrenders a specific type of fill that is currently rendered on the grid
    FillRenderer.prototype.unrender = function (type) {
        const segs = this.segsByType[type]
        if (segs) {
            if (type === 'bgEvent') {
                this.context.view.triggerWillRemoveSegs(segs, false) // isMirror=false
            }
            this.detachSegs(type, segs)
        }
    }
    // Renders and assigns an `el` property for each fill segment. Generic enough to work with different types.
    // Only returns segments that successfully rendered.
    FillRenderer.prototype.renderSegEls = function (type, segs) {
        const _this = this
        let html = ''
        let i
        if (segs.length) {
            // build a large concatenation of segment HTML
            for (i = 0; i < segs.length; i++) {
                html += this.renderSegHtml(type, segs[i])
            }
            // Grab individual elements from the combined HTML string. Use each as the default rendering.
            // Then, compute the 'el' for each segment.
            htmlToElements(html).forEach(function (el, i) {
                const seg = segs[i]
                if (el) {
                    seg.el = el
                }
            })
            if (type === 'bgEvent') {
                segs = filterSegsViaEls(this.context.view, segs, false // isMirror. background events can never be mirror elements
                )
            }
            // correct element type? (would be bad if a non-TD were inserted into a table for example)
            segs = segs.filter(function (seg) {
                return elementMatches(seg.el, _this.fillSegTag)
            })
        }
        return segs
    }
    // Builds the HTML needed for one fill segment. Generic enough to work with different types.
    FillRenderer.prototype.renderSegHtml = function (type, seg) {
        let css = null
        let classNames = []
        if (type !== 'highlight' && type !== 'businessHours') {
            css = {
                'background-color': seg.eventRange.ui.backgroundColor
            }
        }
        if (type !== 'highlight') {
            classNames = classNames.concat(seg.eventRange.ui.classNames)
        }
        if (type === 'businessHours') {
            classNames.push('fc-bgevent')
        } else {
            classNames.push('fc-' + type.toLowerCase())
        }
        return '<' + this.fillSegTag +
            (classNames.length ? ' class="' + classNames.join(' ') + '"' : '') +
            (css ? ' style="' + cssToStr(css) + '"' : '') +
            '></' + this.fillSegTag + '>'
    }
    FillRenderer.prototype.detachSegs = function (type, segs) {
        const containerEls = this.containerElsByType[type]
        if (containerEls) {
            containerEls.forEach(removeElement)
            delete this.containerElsByType[type]
        }
    }
    FillRenderer.prototype.computeSizes = function (force) {
        for (const type in this.segsByType) {
            if (force || this.dirtySizeFlags[type]) {
                this.computeSegSizes(this.segsByType[type])
            }
        }
    }
    FillRenderer.prototype.assignSizes = function (force) {
        for (const type in this.segsByType) {
            if (force || this.dirtySizeFlags[type]) {
                this.assignSegSizes(this.segsByType[type])
            }
        }
        this.dirtySizeFlags = {}
    }
    FillRenderer.prototype.computeSegSizes = function (segs) {
    }
    FillRenderer.prototype.assignSegSizes = function (segs) {
    }
    return FillRenderer
}())

const NamedTimeZoneImpl = /** @class */ (function () {
    function NamedTimeZoneImpl(timeZoneName) {
        this.timeZoneName = timeZoneName
    }
    return NamedTimeZoneImpl
}())

/*
An abstraction for a dragging interaction originating on an event.
Does higher-level things than PointerDragger, such as possibly:
- a "mirror" that moves with the pointer
- a minimum number of pixels or other criteria for a true drag to begin

subclasses must emit:
- pointerdown
- dragstart
- dragmove
- pointerup
- dragend
*/
const ElementDragging = /** @class */ (function () {
    function ElementDragging(el) {
        this.emitter = new EmitterMixin()
    }
    ElementDragging.prototype.destroy = function () {
    }
    ElementDragging.prototype.setMirrorIsVisible = function (bool) {
        // optional if subclass doesn't want to support a mirror
    }
    ElementDragging.prototype.setMirrorNeedsRevert = function (bool) {
        // optional if subclass doesn't want to support a mirror
    }
    ElementDragging.prototype.setAutoScrollEnabled = function (bool) {
        // optional
    }
    return ElementDragging
}())

function formatDate(dateInput, settings) {
    if (settings === void 0) { settings = {} }
    const dateEnv = buildDateEnv$1(settings)
    const formatter = createFormatter(settings)
    const dateMeta = dateEnv.createMarkerMeta(dateInput)
    if (!dateMeta) { // TODO: warning?
        return ''
    }
    return dateEnv.format(dateMeta.marker, formatter, {
        forcedTzo: dateMeta.forcedTzo
    })
}
function formatRange(startInput, endInput, settings // mixture of env and formatter settings
) {
    const dateEnv = buildDateEnv$1(typeof settings === 'object' && settings ? settings : {}) // pass in if non-null object
    const formatter = createFormatter(settings, globalDefaults.defaultRangeSeparator)
    const startMeta = dateEnv.createMarkerMeta(startInput)
    const endMeta = dateEnv.createMarkerMeta(endInput)
    if (!startMeta || !endMeta) { // TODO: warning?
        return ''
    }
    return dateEnv.formatRange(startMeta.marker, endMeta.marker, formatter, {
        forcedStartTzo: startMeta.forcedTzo,
        forcedEndTzo: endMeta.forcedTzo,
        isEndExclusive: settings.isEndExclusive
    })
}
// TODO: more DRY and optimized
function buildDateEnv$1(settings) {
    const locale = buildLocale(settings.locale || 'en', parseRawLocales([]).map) // TODO: don't hardcode 'en' everywhere
    // ensure required settings
    settings = __assign({ timeZone: globalDefaults.timeZone, calendarSystem: 'gregory' }, settings, { locale })
    return new DateEnv(settings)
}

const DRAG_META_PROPS = {
    startTime: createDuration,
    duration: createDuration,
    create: Boolean,
    sourceId: String
}
const DRAG_META_DEFAULTS = {
    create: true
}
function parseDragMeta(raw) {
    const leftoverProps = {}
    const refined = refineProps(raw, DRAG_META_PROPS, DRAG_META_DEFAULTS, leftoverProps)
    refined.leftoverProps = leftoverProps
    return refined
}

// Computes a default column header formatting string if `colFormat` is not explicitly defined
function computeFallbackHeaderFormat(datesRepDistinctDays, dayCnt) {
    // if more than one week row, or if there are a lot of columns with not much space,
    // put just the day numbers will be in each cell
    if (!datesRepDistinctDays || dayCnt > 10) {
        return { weekday: 'short' } // "Sat"
    } else if (dayCnt > 1) {
        return { weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true } // "Sat 11/12"
    } else {
        return { weekday: 'long' } // "Saturday"
    }
}
function renderDateCell(dateMarker, dateProfile, datesRepDistinctDays, colCnt, colHeadFormat, context, colspan, otherAttrs) {
    const view = context.view; const dateEnv = context.dateEnv; const theme = context.theme; const options = context.options
    const isDateValid = rangeContainsMarker(dateProfile.activeRange, dateMarker) // TODO: called too frequently. cache somehow.
    let classNames = [
        'fc-day-header',
        theme.getClass('widgetHeader')
    ]
    let innerHtml
    if (typeof options.columnHeaderHtml === 'function') {
        innerHtml = options.columnHeaderHtml(dateEnv.toDate(dateMarker))
    } else if (typeof options.columnHeaderText === 'function') {
        innerHtml = htmlEscape(options.columnHeaderText(dateEnv.toDate(dateMarker)))
    } else {
        innerHtml = htmlEscape(dateEnv.format(dateMarker, colHeadFormat))
    }
    // if only one row of days, the classNames on the header can represent the specific days beneath
    if (datesRepDistinctDays) {
        classNames = classNames.concat(
        // includes the day-of-week class
        // noThemeHighlight=true (don't highlight the header)
        getDayClasses(dateMarker, dateProfile, context, true))
    } else {
        classNames.push('fc-' + DAY_IDS[dateMarker.getUTCDay()]) // only add the day-of-week class
    }
    return '' +
        '<th class="' + classNames.join(' ') + '"' +
        ((isDateValid && datesRepDistinctDays)
            ? ' data-date="' + dateEnv.formatIso(dateMarker, { omitTime: true }) + '"'
            : '') +
        (colspan > 1
            ? ' colspan="' + colspan + '"'
            : '') +
        (otherAttrs
            ? ' ' + otherAttrs
            : '') +
        '>' +
        (isDateValid
            // don't make a link if the heading could represent multiple days, or if there's only one day (forceOff)
            ? buildGotoAnchorHtml(view, { date: dateMarker, forceOff: !datesRepDistinctDays || colCnt === 1 }, innerHtml)
            // if not valid, display text, but no link
            : innerHtml) +
        '</th>'
}

const DayHeader = /** @class */ (function (_super) {
    __extends(DayHeader, _super)
    function DayHeader(context, parentEl) {
        const _this = _super.call(this, context) || this
        parentEl.innerHTML = '' // because might be nbsp
        parentEl.appendChild(_this.el = htmlToElement('<div class="fc-row ' + _this.theme.getClass('headerRow') + '">' +
            '<table class="' + _this.theme.getClass('tableGrid') + '">' +
            '<thead></thead>' +
            '</table>' +
            '</div>'))
        _this.thead = _this.el.querySelector('thead')
        return _this
    }
    DayHeader.prototype.destroy = function () {
        removeElement(this.el)
    }
    DayHeader.prototype.render = function (props) {
        const dates = props.dates; const datesRepDistinctDays = props.datesRepDistinctDays
        const parts = []
        if (props.renderIntroHtml) {
            parts.push(props.renderIntroHtml())
        }
        const colHeadFormat = createFormatter(this.opt('columnHeaderFormat') ||
            computeFallbackHeaderFormat(datesRepDistinctDays, dates.length))
        for (let _i = 0, dates_1 = dates; _i < dates_1.length; _i++) {
            const date = dates_1[_i]
            parts.push(renderDateCell(date, props.dateProfile, datesRepDistinctDays, dates.length, colHeadFormat, this.context))
        }
        if (this.isRtl) {
            parts.reverse()
        }
        this.thead.innerHTML = '<tr>' + parts.join('') + '</tr>'
    }
    return DayHeader
}(Component))

const DaySeries = /** @class */ (function () {
    function DaySeries(range, dateProfileGenerator) {
        let date = range.start
        const end = range.end
        const indices = []
        const dates = []
        let dayIndex = -1
        while (date < end) { // loop each day from start to end
            if (dateProfileGenerator.isHiddenDay(date)) {
                indices.push(dayIndex + 0.5) // mark that it's between indices
            } else {
                dayIndex++
                indices.push(dayIndex)
                dates.push(date)
            }
            date = addDays(date, 1)
        }
        this.dates = dates
        this.indices = indices
        this.cnt = dates.length
    }
    DaySeries.prototype.sliceRange = function (range) {
        const firstIndex = this.getDateDayIndex(range.start) // inclusive first index
        const lastIndex = this.getDateDayIndex(addDays(range.end, -1)) // inclusive last index
        let clippedFirstIndex = Math.max(0, firstIndex)
        let clippedLastIndex = Math.min(this.cnt - 1, lastIndex)
        // deal with in-between indices
        clippedFirstIndex = Math.ceil(clippedFirstIndex) // in-between starts round to next cell
        clippedLastIndex = Math.floor(clippedLastIndex) // in-between ends round to prev cell
        if (clippedFirstIndex <= clippedLastIndex) {
            return {
                firstIndex: clippedFirstIndex,
                lastIndex: clippedLastIndex,
                isStart: firstIndex === clippedFirstIndex,
                isEnd: lastIndex === clippedLastIndex
            }
        } else {
            return null
        }
    }
    // Given a date, returns its chronolocial cell-index from the first cell of the grid.
    // If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
    // If before the first offset, returns a negative number.
    // If after the last offset, returns an offset past the last cell offset.
    // Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
    DaySeries.prototype.getDateDayIndex = function (date) {
        const indices = this.indices
        const dayOffset = Math.floor(diffDays(this.dates[0], date))
        if (dayOffset < 0) {
            return indices[0] - 1
        } else if (dayOffset >= indices.length) {
            return indices[indices.length - 1] + 1
        } else {
            return indices[dayOffset]
        }
    }
    return DaySeries
}())

const DayTable = /** @class */ (function () {
    function DayTable(daySeries, breakOnWeeks) {
        const dates = daySeries.dates
        let daysPerRow
        let firstDay
        let rowCnt
        if (breakOnWeeks) {
            // count columns until the day-of-week repeats
            firstDay = dates[0].getUTCDay()
            for (daysPerRow = 1; daysPerRow < dates.length; daysPerRow++) {
                if (dates[daysPerRow].getUTCDay() === firstDay) {
                    break
                }
            }
            rowCnt = Math.ceil(dates.length / daysPerRow)
        } else {
            rowCnt = 1
            daysPerRow = dates.length
        }
        this.rowCnt = rowCnt
        this.colCnt = daysPerRow
        this.daySeries = daySeries
        this.cells = this.buildCells()
        this.headerDates = this.buildHeaderDates()
    }
    DayTable.prototype.buildCells = function () {
        const rows = []
        for (let row = 0; row < this.rowCnt; row++) {
            const cells = []
            for (let col = 0; col < this.colCnt; col++) {
                cells.push(this.buildCell(row, col))
            }
            rows.push(cells)
        }
        return rows
    }
    DayTable.prototype.buildCell = function (row, col) {
        return {
            date: this.daySeries.dates[row * this.colCnt + col]
        }
    }
    DayTable.prototype.buildHeaderDates = function () {
        const dates = []
        for (let col = 0; col < this.colCnt; col++) {
            dates.push(this.cells[0][col].date)
        }
        return dates
    }
    DayTable.prototype.sliceRange = function (range) {
        const colCnt = this.colCnt
        const seriesSeg = this.daySeries.sliceRange(range)
        const segs = []
        if (seriesSeg) {
            const firstIndex = seriesSeg.firstIndex; const lastIndex = seriesSeg.lastIndex
            let index = firstIndex
            while (index <= lastIndex) {
                const row = Math.floor(index / colCnt)
                const nextIndex = Math.min((row + 1) * colCnt, lastIndex + 1)
                segs.push({
                    row,
                    firstCol: index % colCnt,
                    lastCol: (nextIndex - 1) % colCnt,
                    isStart: seriesSeg.isStart && index === firstIndex,
                    isEnd: seriesSeg.isEnd && (nextIndex - 1) === lastIndex
                })
                index = nextIndex
            }
        }
        return segs
    }
    return DayTable
}())

const Slicer = /** @class */ (function () {
    function Slicer() {
        this.sliceBusinessHours = memoize(this._sliceBusinessHours)
        this.sliceDateSelection = memoize(this._sliceDateSpan)
        this.sliceEventStore = memoize(this._sliceEventStore)
        this.sliceEventDrag = memoize(this._sliceInteraction)
        this.sliceEventResize = memoize(this._sliceInteraction)
    }
    Slicer.prototype.sliceProps = function (props, dateProfile, nextDayThreshold, component) {
        const extraArgs = []
        for (let _i = 4; _i < arguments.length; _i++) {
            extraArgs[_i - 4] = arguments[_i]
        }
        const eventUiBases = props.eventUiBases
        const eventSegs = this.sliceEventStore.apply(this, [props.eventStore, eventUiBases, dateProfile, nextDayThreshold, component].concat(extraArgs))
        return {
            dateSelectionSegs: this.sliceDateSelection.apply(this, [props.dateSelection, eventUiBases, component].concat(extraArgs)),
            businessHourSegs: this.sliceBusinessHours.apply(this, [props.businessHours, dateProfile, nextDayThreshold, component].concat(extraArgs)),
            fgEventSegs: eventSegs.fg,
            bgEventSegs: eventSegs.bg,
            eventDrag: this.sliceEventDrag.apply(this, [props.eventDrag, eventUiBases, dateProfile, nextDayThreshold, component].concat(extraArgs)),
            eventResize: this.sliceEventResize.apply(this, [props.eventResize, eventUiBases, dateProfile, nextDayThreshold, component].concat(extraArgs)),
            eventSelection: props.eventSelection
        } // TODO: give interactionSegs?
    }
    Slicer.prototype.sliceNowDate = function (// does not memoize
    date, component) {
        const extraArgs = []
        for (let _i = 2; _i < arguments.length; _i++) {
            extraArgs[_i - 2] = arguments[_i]
        }
        return this._sliceDateSpan.apply(this, [{ range: { start: date, end: addMs(date, 1) }, allDay: false },
            {},
            component].concat(extraArgs))
    }
    Slicer.prototype._sliceBusinessHours = function (businessHours, dateProfile, nextDayThreshold, component) {
        const extraArgs = []
        for (let _i = 4; _i < arguments.length; _i++) {
            extraArgs[_i - 4] = arguments[_i]
        }
        if (!businessHours) {
            return []
        }
        return this._sliceEventStore.apply(this, [expandRecurring(businessHours, computeActiveRange(dateProfile, Boolean(nextDayThreshold)), component.calendar),
            {},
            dateProfile,
            nextDayThreshold,
            component].concat(extraArgs)).bg
    }
    Slicer.prototype._sliceEventStore = function (eventStore, eventUiBases, dateProfile, nextDayThreshold, component) {
        const extraArgs = []
        for (let _i = 5; _i < arguments.length; _i++) {
            extraArgs[_i - 5] = arguments[_i]
        }
        if (eventStore) {
            const rangeRes = sliceEventStore(eventStore, eventUiBases, computeActiveRange(dateProfile, Boolean(nextDayThreshold)), nextDayThreshold)
            return {
                bg: this.sliceEventRanges(rangeRes.bg, component, extraArgs),
                fg: this.sliceEventRanges(rangeRes.fg, component, extraArgs)
            }
        } else {
            return { bg: [], fg: [] }
        }
    }
    Slicer.prototype._sliceInteraction = function (interaction, eventUiBases, dateProfile, nextDayThreshold, component) {
        const extraArgs = []
        for (let _i = 5; _i < arguments.length; _i++) {
            extraArgs[_i - 5] = arguments[_i]
        }
        if (!interaction) {
            return null
        }
        const rangeRes = sliceEventStore(interaction.mutatedEvents, eventUiBases, computeActiveRange(dateProfile, Boolean(nextDayThreshold)), nextDayThreshold)
        return {
            segs: this.sliceEventRanges(rangeRes.fg, component, extraArgs),
            affectedInstances: interaction.affectedEvents.instances,
            isEvent: interaction.isEvent,
            sourceSeg: interaction.origSeg
        }
    }
    Slicer.prototype._sliceDateSpan = function (dateSpan, eventUiBases, component) {
        const extraArgs = []
        for (let _i = 3; _i < arguments.length; _i++) {
            extraArgs[_i - 3] = arguments[_i]
        }
        if (!dateSpan) {
            return []
        }
        const eventRange = fabricateEventRange(dateSpan, eventUiBases, component.calendar)
        const segs = this.sliceRange.apply(this, [dateSpan.range].concat(extraArgs))
        for (let _a = 0, segs_1 = segs; _a < segs_1.length; _a++) {
            const seg = segs_1[_a]
            seg.component = component
            seg.eventRange = eventRange
        }
        return segs
    }
    /*
    "complete" seg means it has component and eventRange
    */
    Slicer.prototype.sliceEventRanges = function (eventRanges, component, // TODO: kill
    extraArgs) {
        const segs = []
        for (let _i = 0, eventRanges_1 = eventRanges; _i < eventRanges_1.length; _i++) {
            const eventRange = eventRanges_1[_i]
            segs.push.apply(segs, this.sliceEventRange(eventRange, component, extraArgs))
        }
        return segs
    }
    /*
    "complete" seg means it has component and eventRange
    */
    Slicer.prototype.sliceEventRange = function (eventRange, component, // TODO: kill
    extraArgs) {
        const segs = this.sliceRange.apply(this, [eventRange.range].concat(extraArgs))
        for (let _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
            const seg = segs_2[_i]
            seg.component = component
            seg.eventRange = eventRange
            seg.isStart = eventRange.isStart && seg.isStart
            seg.isEnd = eventRange.isEnd && seg.isEnd
        }
        return segs
    }
    return Slicer
}())
/*
for incorporating minTime/maxTime if appropriate
TODO: should be part of DateProfile!
TimelineDateProfile already does this btw
*/
function computeActiveRange(dateProfile, isComponentAllDay) {
    const range = dateProfile.activeRange
    if (isComponentAllDay) {
        return range
    }
    return {
        start: addMs(range.start, dateProfile.minTime.milliseconds),
        end: addMs(range.end, dateProfile.maxTime.milliseconds - 864e5) // 864e5 = ms in a day
    }
}

// exports
// --------------------------------------------------------------------------------------------------
const version = '4.3.1'

export { Calendar, Component, DateComponent, DateEnv, DateProfileGenerator, DayHeader, DaySeries, DayTable, ElementDragging, ElementScrollController, EmitterMixin, EventApi, FgEventRenderer, FillRenderer, Interaction, Mixin, NamedTimeZoneImpl, PositionCache, ScrollComponent, ScrollController, Slicer, Splitter, Theme, View, WindowScrollController, addDays, addDurations, addMs, addWeeks, allowContextMenu, allowSelection, appendToElement, applyAll, applyMutationToEventStore, applyStyle, applyStyleProp, asRoughMinutes, asRoughMs, asRoughSeconds, buildGotoAnchorHtml, buildSegCompareObj, capitaliseFirstLetter, combineEventUis, compareByFieldSpec, compareByFieldSpecs, compareNumbers, compensateScroll, computeClippingRect, computeEdges, computeFallbackHeaderFormat, computeHeightAndMargins, computeInnerRect, computeRect, computeVisibleDayRange, config, constrainPoint, createDuration, createElement, createEmptyEventStore, createEventInstance, createFormatter, createPlugin, cssToStr, debounce, diffDates, diffDayAndTime, diffDays, diffPoints, diffWeeks, diffWholeDays, diffWholeWeeks, disableCursor, distributeHeight, elementClosest, elementMatches, enableCursor, eventTupleToStore, filterEventStoreDefs, filterHash, findChildren, findElements, flexibleCompare, forceClassName, formatDate, formatIsoTimeString, formatRange, getAllDayHtml, getClippingParents, getDayClasses, getElSeg, getRectCenter, getRelevantEvents, globalDefaults, greatestDurationDenominator, hasBgRendering, htmlEscape, htmlToElement, insertAfterElement, interactionSettingsStore, interactionSettingsToStore, intersectRanges, intersectRects, isArraysEqual, isDateSpansEqual, isInt, isInteractionValid, isMultiDayRange, isPropsEqual, isPropsValid, isSingleDay, isValidDate, listenBySelector, mapHash, matchCellWidths, memoize, memoizeOutput, memoizeRendering, mergeEventStores, multiplyDuration, padStart, parseBusinessHours, parseDragMeta, parseEventDef, parseFieldSpecs, parse as parseMarker, pointInsideRect, prependToElement, preventContextMenu, preventDefault, preventSelection, processScopedUiProps, rangeContainsMarker, rangeContainsRange, rangesEqual, rangesIntersect, refineProps, removeElement, removeExact, renderDateCell, requestJson, sliceEventStore, startOfDay, subtractInnerElHeight, translateRect, uncompensateScroll, undistributeHeight, unpromisify, version, whenTransitionDone, wholeDivideDurations }
