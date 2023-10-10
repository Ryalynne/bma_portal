/* !
FullCalendar List View Plugin v4.3.0
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/

import { getAllDayHtml, isMultiDayRange, htmlEscape, FgEventRenderer, memoize, memoizeRendering, ScrollComponent, subtractInnerElHeight, sliceEventStore, intersectRanges, htmlToElement, createFormatter, createElement, buildGotoAnchorHtml, View, startOfDay, addDays, createPlugin } from '@fullcalendar/core'

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

const ListEventRenderer = /** @class */ (function (_super) {
    __extends(ListEventRenderer, _super)
    function ListEventRenderer(listView) {
        const _this = _super.call(this, listView.context) || this
        _this.listView = listView
        return _this
    }
    ListEventRenderer.prototype.attachSegs = function (segs) {
        if (!segs.length) {
            this.listView.renderEmptyMessage()
        } else {
            this.listView.renderSegList(segs)
        }
    }
    ListEventRenderer.prototype.detachSegs = function () {
    }
    // generates the HTML for a single event row
    ListEventRenderer.prototype.renderSegHtml = function (seg) {
        const _a = this.context; const view = _a.view; const theme = _a.theme
        const eventRange = seg.eventRange
        const eventDef = eventRange.def
        const eventInstance = eventRange.instance
        const eventUi = eventRange.ui
        const url = eventDef.url
        const classes = ['fc-list-item'].concat(eventUi.classNames)
        const bgColor = eventUi.backgroundColor
        let timeHtml
        if (eventDef.allDay) {
            timeHtml = getAllDayHtml(view)
        } else if (isMultiDayRange(eventRange.range)) {
            if (seg.isStart) {
                timeHtml = htmlEscape(this._getTimeText(eventInstance.range.start, seg.end, false // allDay
                ))
            } else if (seg.isEnd) {
                timeHtml = htmlEscape(this._getTimeText(seg.start, eventInstance.range.end, false // allDay
                ))
            } else { // inner segment that lasts the whole day
                timeHtml = getAllDayHtml(view)
            }
        } else {
            // Display the normal time text for the *event's* times
            timeHtml = htmlEscape(this.getTimeText(eventRange))
        }
        if (url) {
            classes.push('fc-has-url')
        }
        return '<tr class="' + classes.join(' ') + '">' +
            (this.displayEventTime
                ? '<td class="fc-list-item-time ' + theme.getClass('widgetContent') + '">' +
                    (timeHtml || '') +
                    '</td>'
                : '') +
            '<td class="fc-list-item-marker ' + theme.getClass('widgetContent') + '">' +
            '<span class="fc-event-dot"' +
            (bgColor
                ? ' style="background-color:' + bgColor + '"'
                : '') +
            '></span>' +
            '</td>' +
            '<td class="fc-list-item-title ' + theme.getClass('widgetContent') + '">' +
            '<a' + (url ? ' href="' + htmlEscape(url) + '"' : '') + '>' +
            htmlEscape(eventDef.title || '') +
            '</a>' +
            '</td>' +
            '</tr>'
    }
    // like "4:00am"
    ListEventRenderer.prototype.computeEventTimeFormat = function () {
        return {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
        }
    }
    return ListEventRenderer
}(FgEventRenderer))

/*
Responsible for the scroller, and forwarding event-related actions into the "grid".
*/
const ListView = /** @class */ (function (_super) {
    __extends(ListView, _super)
    function ListView(context, viewSpec, dateProfileGenerator, parentEl) {
        const _this = _super.call(this, context, viewSpec, dateProfileGenerator, parentEl) || this
        _this.computeDateVars = memoize(computeDateVars)
        _this.eventStoreToSegs = memoize(_this._eventStoreToSegs)
        const eventRenderer = _this.eventRenderer = new ListEventRenderer(_this)
        _this.renderContent = memoizeRendering(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer))
        _this.el.classList.add('fc-list-view')
        const listViewClassNames = (_this.theme.getClass('listView') || '').split(' ') // wish we didn't have to do this
        for (let _i = 0, listViewClassNames_1 = listViewClassNames; _i < listViewClassNames_1.length; _i++) {
            const listViewClassName = listViewClassNames_1[_i]
            if (listViewClassName) { // in case input was empty string
                _this.el.classList.add(listViewClassName)
            }
        }
        _this.scroller = new ScrollComponent('hidden', // overflow x
        'auto' // overflow y
        )
        _this.el.appendChild(_this.scroller.el)
        _this.contentEl = _this.scroller.el // shortcut
        context.calendar.registerInteractiveComponent(_this, {
            el: _this.el
            // TODO: make aware that it doesn't do Hits
        })
        return _this
    }
    ListView.prototype.render = function (props) {
        const _a = this.computeDateVars(props.dateProfile); const dayDates = _a.dayDates; const dayRanges = _a.dayRanges
        this.dayDates = dayDates
        this.renderContent(this.eventStoreToSegs(props.eventStore, props.eventUiBases, dayRanges))
    }
    ListView.prototype.destroy = function () {
        _super.prototype.destroy.call(this)
        this.renderContent.unrender()
        this.scroller.destroy() // will remove the Grid too
        this.calendar.unregisterInteractiveComponent(this)
    }
    ListView.prototype.updateSize = function (isResize, viewHeight, isAuto) {
        _super.prototype.updateSize.call(this, isResize, viewHeight, isAuto)
        this.eventRenderer.computeSizes(isResize)
        this.eventRenderer.assignSizes(isResize)
        this.scroller.clear() // sets height to 'auto' and clears overflow
        if (!isAuto) {
            this.scroller.setHeight(this.computeScrollerHeight(viewHeight))
        }
    }
    ListView.prototype.computeScrollerHeight = function (viewHeight) {
        return viewHeight -
            subtractInnerElHeight(this.el, this.scroller.el) // everything that's NOT the scroller
    }
    ListView.prototype._eventStoreToSegs = function (eventStore, eventUiBases, dayRanges) {
        return this.eventRangesToSegs(sliceEventStore(eventStore, eventUiBases, this.props.dateProfile.activeRange, this.nextDayThreshold).fg, dayRanges)
    }
    ListView.prototype.eventRangesToSegs = function (eventRanges, dayRanges) {
        const segs = []
        for (let _i = 0, eventRanges_1 = eventRanges; _i < eventRanges_1.length; _i++) {
            const eventRange = eventRanges_1[_i]
            segs.push.apply(segs, this.eventRangeToSegs(eventRange, dayRanges))
        }
        return segs
    }
    ListView.prototype.eventRangeToSegs = function (eventRange, dayRanges) {
        const _a = this; const dateEnv = _a.dateEnv; const nextDayThreshold = _a.nextDayThreshold
        const range = eventRange.range
        const allDay = eventRange.def.allDay
        let dayIndex
        let segRange
        let seg
        const segs = []
        for (dayIndex = 0; dayIndex < dayRanges.length; dayIndex++) {
            segRange = intersectRanges(range, dayRanges[dayIndex])
            if (segRange) {
                seg = {
                    component: this,
                    eventRange,
                    start: segRange.start,
                    end: segRange.end,
                    isStart: eventRange.isStart && segRange.start.valueOf() === range.start.valueOf(),
                    isEnd: eventRange.isEnd && segRange.end.valueOf() === range.end.valueOf(),
                    dayIndex
                }
                segs.push(seg)
                // detect when range won't go fully into the next day,
                // and mutate the latest seg to the be the end.
                if (!seg.isEnd && !allDay &&
                    dayIndex + 1 < dayRanges.length &&
                    range.end <
                        dateEnv.add(dayRanges[dayIndex + 1].start, nextDayThreshold)) {
                    seg.end = range.end
                    seg.isEnd = true
                    break
                }
            }
        }
        return segs
    }
    ListView.prototype.renderEmptyMessage = function () {
        this.contentEl.innerHTML =
            '<div class="fc-list-empty-wrap2">' + // TODO: try less wraps
                '<div class="fc-list-empty-wrap1">' +
                '<div class="fc-list-empty">' +
                htmlEscape(this.opt('noEventsMessage')) +
                '</div>' +
                '</div>' +
                '</div>'
    }
    // called by ListEventRenderer
    ListView.prototype.renderSegList = function (allSegs) {
        const segsByDay = this.groupSegsByDay(allSegs) // sparse array
        let dayIndex
        let daySegs
        let i
        const tableEl = htmlToElement('<table class="fc-list-table ' + this.calendar.theme.getClass('tableList') + '"><tbody></tbody></table>')
        const tbodyEl = tableEl.querySelector('tbody')
        for (dayIndex = 0; dayIndex < segsByDay.length; dayIndex++) {
            daySegs = segsByDay[dayIndex]
            if (daySegs) { // sparse array, so might be undefined
                // append a day header
                tbodyEl.appendChild(this.buildDayHeaderRow(this.dayDates[dayIndex]))
                daySegs = this.eventRenderer.sortEventSegs(daySegs)
                for (i = 0; i < daySegs.length; i++) {
                    tbodyEl.appendChild(daySegs[i].el) // append event row
                }
            }
        }
        this.contentEl.innerHTML = ''
        this.contentEl.appendChild(tableEl)
    }
    // Returns a sparse array of arrays, segs grouped by their dayIndex
    ListView.prototype.groupSegsByDay = function (segs) {
        const segsByDay = [] // sparse array
        let i
        let seg
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            (segsByDay[seg.dayIndex] || (segsByDay[seg.dayIndex] = []))
                .push(seg)
        }
        return segsByDay
    }
    // generates the HTML for the day headers that live amongst the event rows
    ListView.prototype.buildDayHeaderRow = function (dayDate) {
        const dateEnv = this.dateEnv
        const mainFormat = createFormatter(this.opt('listDayFormat')) // TODO: cache
        const altFormat = createFormatter(this.opt('listDayAltFormat')) // TODO: cache
        return createElement('tr', {
            className: 'fc-list-heading',
            'data-date': dateEnv.formatIso(dayDate, { omitTime: true })
        }, '<td class="' + (this.calendar.theme.getClass('tableListHeading') ||
            this.calendar.theme.getClass('widgetHeader')) + '" colspan="3">' +
            (mainFormat
                ? buildGotoAnchorHtml(this, dayDate, { class: 'fc-list-heading-main' }, htmlEscape(dateEnv.format(dayDate, mainFormat)) // inner HTML
                )
                : '') +
            (altFormat
                ? buildGotoAnchorHtml(this, dayDate, { class: 'fc-list-heading-alt' }, htmlEscape(dateEnv.format(dayDate, altFormat)) // inner HTML
                )
                : '') +
            '</td>')
    }
    return ListView
}(View))
ListView.prototype.fgSegSelector = '.fc-list-item' // which elements accept event actions
function computeDateVars(dateProfile) {
    let dayStart = startOfDay(dateProfile.renderRange.start)
    const viewEnd = dateProfile.renderRange.end
    const dayDates = []
    const dayRanges = []
    while (dayStart < viewEnd) {
        dayDates.push(dayStart)
        dayRanges.push({
            start: dayStart,
            end: addDays(dayStart, 1)
        })
        dayStart = addDays(dayStart, 1)
    }
    return { dayDates, dayRanges }
}

const main = createPlugin({
    views: {
        list: {
            class: ListView,
            buttonTextKey: 'list',
            listDayFormat: { month: 'long', day: 'numeric', year: 'numeric' } // like "January 1, 2016"
        },
        listDay: {
            type: 'list',
            duration: { days: 1 },
            listDayFormat: { weekday: 'long' } // day-of-week is all we need. full date is probably in header
        },
        listWeek: {
            type: 'list',
            duration: { weeks: 1 },
            listDayFormat: { weekday: 'long' },
            listDayAltFormat: { month: 'long', day: 'numeric', year: 'numeric' }
        },
        listMonth: {
            type: 'list',
            duration: { month: 1 },
            listDayAltFormat: { weekday: 'long' } // day-of-week is nice-to-have
        },
        listYear: {
            type: 'list',
            duration: { year: 1 },
            listDayAltFormat: { weekday: 'long' } // day-of-week is nice-to-have
        }
    }
})

export default main
export { ListView }
