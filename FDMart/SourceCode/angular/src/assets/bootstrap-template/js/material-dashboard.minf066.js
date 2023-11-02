isWindows = -1 < navigator.platform.indexOf("Win"), isWindows ? ($(".sidebar .sidebar-wrapper, .main-panel").perfectScrollbar(), $("html").addClass("perfect-scrollbar-on")) : $("html").addClass("perfect-scrollbar-off");
var breakCards = !0,
    searchVisible = 0,
    transparent = !0,
    transparentDemo = !0,
    fixedTop = !1,
    mobile_menu_visible = 0,
    mobile_menu_initialized = !1,
    toggle_initialized = !1,
    bootstrap_nav_initialized = !1,
    seq = 0,
    delays = 80,
    durations = 500,
    seq2 = 0,
    delays2 = 80,
    durations2 = 500;
var EditPageState = {
    add: "Add",
    edit: "Edit",
    view: "View",
    viewDetail: "ViewDetail",
    delete: "Delete",
    save: "Save",
    search: "Search"
}
var _listOpption = {}

function debounce(t, n, i) {
    var r;
    return function() {
        var e = this,
            a = arguments;
        clearTimeout(r), r = setTimeout(function() { r = null, i || t.apply(e, a) }, n), i && !r && t.apply(e, a)
    }
}
$(document).ready(function() {

        $sidebar = $(".sidebar"), window_width = $(window).width(), $("body").bootstrapMaterialDesign({ autofill: !1 }), md.initSidebarsCheck(), window_width = $(window).width(), md.checkSidebarImage(), md.initMinimizeSidebar(), $(".dropdown-menu a.dropdown-toggle").on("click", function(e) {
                var a = $(this),
                    t = $(this).offsetParent(".dropdown-menu");
                return $(this).next().hasClass("show") || $(this).parents(".dropdown-menu").first().find(".show").removeClass("show"), $(this).next(".dropdown-menu").toggleClass("show"), $(this).closest("a").toggleClass("open"), $(this).parents("a.dropdown-item.dropdown.show").on("hidden.bs.dropdown", function(e) { $(".dropdown-menu .show").removeClass("show") }), t.parent().hasClass("navbar-nav") || a.next().css({ top: a[0].offsetTop, left: t.outerWidth() - 4 }), !1
            }), 0 !=
            $(".selectpicker").length &&
            $(".selectpicker").selectpicker(),
            $('[rel="tooltip"]').tooltip(), $('[data-toggle="popover"]').popover();
        var e = $(".tagsinput").data("color");
        0 != $(".tagsinput").length && $(".tagsinput").tagsinput(), $(".bootstrap-tagsinput").addClass(e + "-badge"), $(".select").dropdown({ dropdownClass: "dropdown-menu", optionClass: "" }), $(".form-control").on("focus", function() { $(this).parent(".input-group").addClass("input-group-focus") }).on("blur", function() { $(this).parent(".input-group").removeClass("input-group-focus") }), 1 == breakCards && $('[data-header-animation="true"]').each(function() {
            $(this);
            var a = $(this).parent(".card");
            a.find(".fix-broken-card").click(function() {
                console.log(this);
                var e = $(this).parent().parent().siblings(".card-header, .card-header-image");
                e.removeClass("hinge").addClass("fadeInDown"), a.attr("data-count", 0), setTimeout(function() { e.removeClass("fadeInDown animate") }, 480)
            }), a.mouseenter(function() {
                var e = $(this);
                hover_count = parseInt(e.attr("data-count"), 10) + 1 || 0, e.attr("data-count", hover_count), 20 <= hover_count && $(this).children(".card-header, .card-header-image").addClass("hinge animated")
            })
        }), $('input[type="checkbox"][required="true"], input[type="radio"][required="true"]').on("click", function() { $(this).hasClass("error") && $(this).closest("div").removeClass("has-error") })

    }),
    $(document).on("click", ".navbar-toggler", function() {
        if ($toggle = $(this), 1 == mobile_menu_visible) $("html").removeClass("nav-open"), $(".close-layer").remove(), setTimeout(function() { $toggle.removeClass("toggled") }, 400), mobile_menu_visible = 0;
        else {
            setTimeout(function() { $toggle.addClass("toggled") }, 430);
            var e = $('<div class="close-layer"></div>');
            0 != $("body").find(".main-panel").length ? e.appendTo(".main-panel") : $("body").hasClass("off-canvas-sidebar") && e.appendTo(".wrapper-full-page"), setTimeout(function() { e.addClass("visible") }, 100), e.click(function() { $("html").removeClass("nav-open"), mobile_menu_visible = 0, e.removeClass("visible"), setTimeout(function() { e.remove(), $toggle.removeClass("toggled") }, 400) }), $("html").addClass("nav-open"), mobile_menu_visible = 1
        }
    }), $(window).resize(function() { md.initSidebarsCheck(), seq = seq2 = 0, setTimeout(function() { md.initDashboardPageCharts() }, 500) }), md = {
        misc: { navbar_menu_visible: 0, active_collapse: !0, disabled_collapse_init: 0 },
        checkSidebarImage: function() { $sidebar = $(".sidebar"), image_src = $sidebar.data("image"), void 0 !== image_src && (sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>', $sidebar.append(sidebar_container)) },
        showNotification: function(e, a, t, m) {
            type = ["", "info", "danger", "success", "warning", "rose", "primary"],
                color = Math.floor(6 * Math.random() + 1),
                $.notify({ icon: "add_alert", message: m }, {
                    type: type[t],
                    timer: 10 * 1000,
                    placement: { from: e, align: a },
                })
            setTimeout(() => {
                $('.fadeInDown').addClass('fadeOutDown')
            }, 1 * 1000);
        },
        initDocumentationCharts: function() {
            if (0 != $("#dailySalesChart").length && 0 != $("#websiteViewsChart").length) {
                dataDailySalesChart = {
                    labels: ["M", "T", "W", "T", "F", "S", "S"],
                    series: [
                        [12, 17, 7, 17, 23, 18, 38]
                    ]
                }, optionsDailySalesChart = { lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }), low: 0, high: 50, chartPadding: { top: 0, right: 0, bottom: 0, left: 0 } };
                new Chartist.Line("#dailySalesChart", dataDailySalesChart, optionsDailySalesChart), new Chartist.Line("#websiteViewsChart", dataDailySalesChart, optionsDailySalesChart)
            }
        },
        initFormExtendedDatetimepickers: function() {
            $(".datetimepicker").datetimepicker({
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-chevron-up",
                    down: "fa fa-chevron-down",
                    previous: "fa fa-chevron-left",
                    next: "fa fa-chevron-right",
                    today: "fa fa-screenshot",
                    clear: "fa fa-trash",
                    close: "fa fa-remove"
                }
            }), $(".datepicker").datetimepicker({
                format: "MM/DD/YYYY",
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-chevron-up",
                    down: "fa fa-chevron-down",
                    previous: "fa fa-chevron-left",
                    next: "fa fa-chevron-right",
                    today: "fa fa-screenshot",
                    clear: "fa fa-trash",
                    close: "fa fa-remove"
                }
            }), $(".timepicker").datetimepicker({
                format: "h:mm A",
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-chevron-up",
                    down: "fa fa-chevron-down",
                    previous: "fa fa-chevron-left",
                    next: "fa fa-chevron-right",
                    today: "fa fa-screenshot",
                    clear: "fa fa-trash",
                    close: "fa fa-remove"
                }
            })
        },
        initSliders: function() {
            var e = document.getElementById("sliderRegular");
            noUiSlider.create(e, { start: 40, connect: [!0, !1], range: { min: 0, max: 100 } });
            var a = document.getElementById("sliderDouble");
            noUiSlider.create(a, { start: [20, 60], connect: !0, range: { min: 0, max: 100 } })
        },
        initSidebarsCheck: function() { $(window).width() <= 991 && 0 != $sidebar.length && md.initRightMenu() },
        checkFullPageBackgroundImage: function() { $page = $(".full-page"), image_src = $page.data("image"), void 0 !== image_src && (image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>', $page.append(image_container)) },
        initDashboardPageCharts: function() {
            if (0 != $("#dailySalesChart").length || 0 != $("#completedTasksChart").length || 0 != $("#websiteViewsChart").length) {
                dataDailySalesChart = {
                    labels: ["M", "T", "W", "T", "F", "S", "S"],
                    series: [
                        [12, 17, 7, 17, 23, 18, 38]
                    ]
                }, optionsDailySalesChart = { lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }), low: 0, high: 50, chartPadding: { top: 0, right: 0, bottom: 0, left: 0 } };
                var e = new Chartist.Line("#dailySalesChart", dataDailySalesChart, optionsDailySalesChart);
                md.startAnimationForLineChart(e), dataCompletedTasksChart = {
                    labels: ["12p", "3p", "6p", "9p", "12p", "3a", "6a", "9a"],
                    series: [
                        [230, 750, 450, 300, 280, 240, 200, 190]
                    ]
                }, optionsCompletedTasksChart = { lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }), low: 0, high: 1e3, chartPadding: { top: 0, right: 0, bottom: 0, left: 0 } };
                var a = new Chartist.Line("#completedTasksChart", dataCompletedTasksChart, optionsCompletedTasksChart);
                md.startAnimationForLineChart(a);
                var t = Chartist.Bar("#websiteViewsChart", {
                    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                    series: [
                        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
                    ]
                }, { axisX: { showGrid: !1 }, low: 0, high: 1e3, chartPadding: { top: 0, right: 5, bottom: 0, left: 0 } }, [
                    ["screen and (max-width: 640px)", { seriesBarDistance: 5, axisX: { labelInterpolationFnc: function(e) { return e[0] } } }]
                ]);
                md.startAnimationForBarChart(t)
            }
        },
        initMinimizeSidebar: function() {
            $("#minimizeSidebar").click(function() {
                $(this);
                1 == md.misc.sidebar_mini_active ? ($("body").removeClass("sidebar-mini"), md.misc.sidebar_mini_active = !1) : ($("body").addClass("sidebar-mini"), md.misc.sidebar_mini_active = !0);
                var e = setInterval(function() { window.dispatchEvent(new Event("resize")) }, 180);
                setTimeout(function() { clearInterval(e) }, 1e3)
            })
        },
        checkScrollForTransparentNavbar: debounce(function() { 260 < $(document).scrollTop() ? transparent && (transparent = !1, $(".navbar-color-on-scroll").removeClass("navbar-transparent")) : transparent || (transparent = !0, $(".navbar-color-on-scroll").addClass("navbar-transparent")) }, 17),
        initRightMenu: debounce(function() { $sidebar_wrapper = $(".sidebar-wrapper"), mobile_menu_initialized ? 991 < $(window).width() && ($sidebar_wrapper.find(".navbar-form").remove(), $sidebar_wrapper.find(".nav-mobile-menu").remove(), mobile_menu_initialized = !1) : ($navbar = $("nav").find(".navbar-collapse").children(".navbar-nav"), mobile_menu_content = "", nav_content = $navbar.html(), nav_content = '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + "</ul>", navbar_form = $("nav").find(".navbar-form").get(0).outerHTML, $sidebar_nav = $sidebar_wrapper.find(" > .nav"), $nav_content = $(nav_content), $navbar_form = $(navbar_form), $nav_content.insertBefore($sidebar_nav), $navbar_form.insertBefore($nav_content), $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function(e) { e.stopPropagation() }), window.dispatchEvent(new Event("resize")), mobile_menu_initialized = !0) }, 200),
        startAnimationForLineChart: function(e) { e.on("draw", function(e) { "line" === e.type || "area" === e.type ? e.element.animate({ d: { begin: 600, dur: 700, from: e.path.clone().scale(1, 0).translate(0, e.chartRect.height()).stringify(), to: e.path.clone().stringify(), easing: Chartist.Svg.Easing.easeOutQuint } }) : "point" === e.type && (seq++, e.element.animate({ opacity: { begin: seq * delays, dur: durations, from: 0, to: 1, easing: "ease" } })) }), seq = 0 },
        startAnimationForBarChart: function(e) { e.on("draw", function(e) { "bar" === e.type && (seq2++, e.element.animate({ opacity: { begin: seq2 * delays2, dur: durations2, from: 0, to: 1, easing: "ease" } })) }), seq2 = 0 },
        initFullCalendar: function() {
            $calendar = $("#fullCalendar"), today = new Date, y = today.getFullYear(), m = today.getMonth(), d = today.getDate(),
                $calendar.fullCalendar({
                    viewRender: function(e, a) { "month" != e.name && $(a).find(".fc-scroller").perfectScrollbar() },
                    header: { left: "title", center: "month,agendaWeek,agendaDay", right: "prev,next,today" },
                    defaultDate: today,
                    selectable: !0,
                    selectHelper: !0,
                    views: { month: { titleFormat: "MMMM YYYY" }, week: { titleFormat: " MMMM D YYYY" }, day: { titleFormat: "D MMM, YYYY" } },
                    select: function(t, n) {
                        swal({ title: "Create an Event", html: '<div class="form-group"><input class="form-control" placeholder="Event Title" id="input-field"></div>', showCancelButton: !0, confirmButtonClass: "btn btn-success", cancelButtonClass: "btn btn-danger", buttonsStyling: !1 }).then(function(e) {
                            var a;
                            event_title = $("#input-field").val(), event_title && (a = { title: event_title, start: t, end: n }, $calendar.fullCalendar("renderEvent", a, !0)), $calendar.fullCalendar("unselect")
                        }).catch(swal.noop)
                    },
                    editable: !0,
                    eventLimit: !0,
                    events: [{ title: "All Day Event", start: new Date(y, m, 1), className: "event-default" }, { id: 999, title: "Repeating Event", start: new Date(y, m, d - 4, 6, 0), allDay: !1, className: "event-rose" }, { id: 999, title: "Repeating Event", start: new Date(y, m, d + 3, 6, 0), allDay: !1, className: "event-rose" }, { title: "Meeting", start: new Date(y, m, d - 1, 10, 30), allDay: !1, className: "event-green" }, { title: "Lunch", start: new Date(y, m, d + 7, 12, 0), end: new Date(y, m, d + 7, 14, 0), allDay: !1, className: "event-red" }, { title: "Md-pro Launch", start: new Date(y, m, d - 2, 12, 0), allDay: !0, className: "event-azure" }, { title: "Birthday Party", start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: !1, className: "event-azure" }, { title: "Click for Creative OSoft", start: new Date(y, m, 21), end: new Date(y, m, 22), url: "http://OSoft.vn/", className: "event-orange" }, { title: "Click for Google", start: new Date(y, m, 21), end: new Date(y, m, 22), url: "http://OSoft.vn/", className: "event-orange" }]
                })
        },
        initVectorMap: function() { $("#worldMap").vectorMap({ map: "world_mill_en", backgroundColor: "transparent", zoomOnScroll: !1, regionStyle: { initial: { fill: "#e4e4e4", "fill-opacity": .9, stroke: "none", "stroke-width": 0, "stroke-opacity": 0 } }, series: { regions: [{ values: { AU: 760, BR: 550, CA: 120, DE: 1300, FR: 540, GB: 690, GE: 200, IN: 200, RO: 600, RU: 300, US: 2920 }, scale: ["#AAAAAA", "#444444"], normalizeFunction: "polynomial" }] } }) }
    };

function getMondays(d) {
    var month = d.getMonth(),
        mondays = [];

    d.setDate(1);

    // Get the first Monday in the month
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
        mondays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }

    return mondays;
}
var _days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ 5', 'Thứ 6', 'Thứ bảy'],
    _data_month;
let _listEnployee = [],
    _listWorking = [];
let data_update_timesheet = {
    idCalendar: null,
    description: null,
    percent_done: null
}
let _data_comment = {
    key_calendar: null,
    code: null,
    content: null,
    account_create: null,
    hrm_workspace_comment_images: [],
    hRM_Workspace_Comment_Files: []
};
let dataCalendar1 = [],
    employeeSelected, workingSelected, base_domain, action;

function get_current_month() {
    return _data_month;
}

function set_list_working(data) {
    _listWorking = data;
}

function getdata_update_timesheet() {
    return data_update_timesheet;
}

function setbase_domain(v) {
    base_domain = v;
}

function getdata_comment() {
    return _data_comment;
}

function setSelecteEmployee(data) {
    employeeSelected = data;
}

function setAllEmployee(data) {
    _listEnployee = data;
}

function getAllEmployee() {
    return _listEnployee;
}

function setSelecteWorking(data) {
    workingSelected = data;
}

function setDataCalendar1(data) {
    dataCalendar1 = data;
}
async function renderTimeWokingEmployee(data) {
    try {
        _listEnployee.forEach(e => {
            var idEmp = e.code,
                listWsp = data.filter(wsp => wsp.idEmployee == idEmp);
            e['constHour'] = e.workingHourOnMonth;
            e['TimeWorking'] = 0;
            if (listWsp.length > 0) {
                var msgTotal = listWsp.reduce(function(prev, cur) {
                    return prev + cur.wkHour;
                }, 0);
                var TimeWorking = msgTotal,
                    constHour = listWsp[0].constHour,
                    OverTime = TimeWorking - constHour;
                if (OverTime < 0) OverTime = 0;

                if (!e['TimeWorking']) e['TimeWorking'] = 0;
                e['TimeWorking'] = TimeWorking;

                if (!e['OverTime']) e['OverTime'] = 0;
                e['OverTime'] = OverTime;

                e['constHour'] = constHour;
            }
        })
        setAllEmployee(_listEnployee);
    } catch {}
}
async function renderAndSetDataCalendar(data) {
    try {
        await renderTimeWokingEmployee(data);
        if (data.length == 0) return;
        let dataTemp = {},
            key = data[0].key;
        while (data.length > 0) {
            let t = data.filter(e => e.key == key);
            dataTemp[key] = t;
            t = data.filter(e => e.key != key);
            data = t;
            if (data.length > 0)
                key = data[0].key;
        }
        setDataCalendar1(dataTemp);
    } catch {}
}

function getDataCalendar1() {
    return dataCalendar1;
}

function showError(message) {
    swal({
        title: "Lỗi",
        html: '<div class="form-group"><label class="form-control" placeholder="Error">' + message + '</label></div>',
        showCancelButton: !0,
        confirmButtonClass: "btn btn-success",
        // cancelButtonClass: "btn btn-danger",
        buttonsStyling: !1,
        showCancelButton: false
    }).then(function(e) {

    }).catch(swal.noop)
}

function refresh_calendar(source) {
    $calendar = $("#fullCalendar");
    $calendar.fullCalendar('removeEvents')
    $calendar.fullCalendar('addEventSource', convertToFomat(source))
}

function initFullCalendar1(today, data, isEditable = true, action = '') {
    today = new Date(today);
    _data_month = today;
    renderAndSetDataCalendar(data);
    let list_events = convertToFomat(data);
    $calendar = $("#fullCalendar"), y = today.getFullYear(), m = today.getMonth(), d = today.getDate(), $calendar.fullCalendar('refetchEvents');
    $calendar.fullCalendar({
        locale: 'vi',
        viewRender: function(e, a) {
            "month" != e.name && $(a).find(".fc-scroller").perfectScrollbar();
        },
        header: { left: "title", center: "month,agendaWeek,agendaDay", right: "Action removeAll prev,next,today" },
        defaultDate: today,
        weekNumbers: false,
        default: 1,
        selectable: !0,
        selectHelper: !0,
        editable: isEditable,
        eventLimit: !0,
        views: {
            month: {
                titleFormat: "MMMM YYYY"
            },
            week: { titleFormat: " MMMM D YYYY" },
            day: { titleFormat: "D MMM, YYYY" }
        },
        events: list_events,
        select: async function(t, n) {
            var d = t._d,
                year = d.getFullYear(),
                month = d.getMonth() + 1,
                day = d.getDate(),
                todays = [],
                hourWK = 0;

            if (month != (today.getMonth() + 1)) {
                swal({
                        title: "Lỗi",
                        html: '<div class="form-group"><label class="form-control" placeholder="Error">Bạn đang tạo lịch cho tháng ' + (today.getMonth() + 1) + '/' + today.getFullYear() + '</label><br/><label>Vui lòng chọn ngày trong tháng</label></div>',
                        showDenyButton: true,
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        confirmButtonClass: "btn btn-success",
                        cancelButtonClass: "btn btn-danger",
                        buttonsStyling: !1,
                        showCancelButton: true
                    }).then(function(e) {

                    }).catch(swal.noop)
                    // showError('Vui lòng chọn trong tháng ' + (n._d.getMonth() + 1) + '/' + n._d.getFullYear()); return 
            } else {
                if (year != today.getFullYear()) { showError('Vui lòng chọn trong tháng ' + (n._d.getMonth() + 1) + '/' + n._d.getFullYear()); return }
                if ($('.selectpicker-filter-working').val() == '') { showError('Vui lòng chọn ca trực '); return }
                if ($('input[name="EmployeeRadios"]:checked').val() == undefined) { showError('Vui lòng chọn nhân viên'); return }
                d.setDate(day);
                let listWkTemp = {},
                    listdayChange = '';
                if ($('.check-automatic')[0].checked) {
                    hourWK += Number(workingSelected['hour']);
                    while ((d.getMonth() + 1) === month) {
                        var dw = new Date(d.getTime()),
                            key = dw.getDate().toString() + '_' + (dw.getMonth() + 1).toString() + '_' + dw.getFullYear().toString();
                        dw.setHours(21);

                        let listEmployeeToday = dataCalendar1[key];
                        let wkEmpleees;
                        if (listEmployeeToday != undefined) wkEmpleees = listEmployeeToday.find(e => e['id'] == employeeSelected['id']);
                        else listEmployeeToday = [];

                        if (wkEmpleees != undefined) { //nhân viên đã được phân công ngày này
                            var idCalendar = key + '_' + employeeSelected['id'] + '_' + workingSelected['id'];
                            if (listEmployeeToday.filter(e => e['idCalendar'] == idCalendar).length == 0) //trùng ca trực
                            {
                                listdayChange += '<br /><b>' + _days[dw.getDay()] + ' ' + dw.getDate() + '/' + (dw.getMonth() + 1) + '/' + dw.getFullYear() +
                                    '</b> từ (' + wkEmpleees['wkName'] +
                                    ') thành (' + workingSelected['name'] + ')';
                                listWkTemp[key] = {
                                    employeeSelected: employeeSelected,
                                    workingSelected: workingSelected,
                                    wkEmpleees: wkEmpleees,
                                    dw: dw,
                                    listEmployeeToday: listEmployeeToday,
                                    key: key
                                }
                            }
                        }
                        //1 nhân viên không thể trực 1 ca 2 chi nhánh
                        else {
                            if (isEditable) await AddEvent(employeeSelected, workingSelected, dw, listEmployeeToday, key);
                        }

                        todays.push(new Date(d.getTime()));
                        d.setDate(d.getDate() + 7);
                    }
                    if (listdayChange != '') {
                        await ComfirmWorking(listWkTemp, listdayChange);
                    }
                } else {
                    var dw = new Date(d.getTime()),
                        key = dw.getDate().toString() + '_' + (dw.getMonth() + 1).toString() + '_' + dw.getFullYear().toString();
                    let listEmployeeToday = dataCalendar1[key];
                    hourWK += Number(workingSelected['hour'])
                    dw.setHours(21);
                    let wkEmpleees;
                    if (listEmployeeToday != undefined) wkEmpleees = listEmployeeToday.find(e => e['idEmployee'] == employeeSelected['code']);
                    else listEmployeeToday = [];

                    if (wkEmpleees != undefined) { //nhân viên đã được phân công ngày này
                        var idCalendar = key + '_' + employeeSelected['id'] + '_' + workingSelected['id'];
                        if (listEmployeeToday.filter(e => e['idCalendar'] == idCalendar).length == 0) //trùng ca trực
                        {
                            listdayChange += '<br /><b>' + _days[dw.getDay()] + ' ' + dw.getDate() + '/' + (dw.getMonth() + 1) + '/' + dw.getFullYear() +
                                '</b> từ (' + wkEmpleees['wkName'] +
                                ') thành (' + workingSelected['name'] + ') ';
                            listWkTemp[key] = {
                                employeeSelected: employeeSelected,
                                workingSelected: workingSelected,
                                wkEmpleees: wkEmpleees,
                                dw: dw,
                                listEmployeeToday: listEmployeeToday,
                                key: key
                            }
                            await ComfirmWorking(listWkTemp, listdayChange);
                        }
                    } else {
                        if (isEditable) await AddEvent(employeeSelected, workingSelected, dw, listEmployeeToday, key);
                    }

                    todays.push(new Date(d.getTime()));
                    d.setDate(d.getDate() + 7);
                }
                $('#setTimeSheet').val(hourWK);
                $('#setTimeSheet').click();
            }
        },
        eventClick: function(info) {
            _data_comment.key_calendar = info.id;
            if (action == 'Add') {
                swal({
                    title: info.title,
                    showCancelButton: !0,
                    showDenyButton: true,
                    showDeleteButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Delete',
                    confirmButtonClass: "btn btn-success",
                    cancelButtonClass: "btn btn-danger",
                    buttonsStyling: !1,
                    width: '800px'
                }).then(function(e) {
                    if (e.dismiss == 'cancel') {
                        $calendar.fullCalendar('removeEvents', info.id);
                        dataCalendar1[info.key] = dataCalendar1[info.key].filter(e => e['idCalendar'] != info.id);
                        _listEnployee.forEach(emp => {
                            if (emp.id == Number(info.id.split('_')[3])) {
                                emp.TimeWorking = emp.TimeWorking - info.wkHour;
                                var ot = emp.TimeWorking - emp.constHour;
                                if (ot > 0) emp.OverTime = ot;
                                else emp.OverTime = 0;
                            }
                        })
                        $('.refresh-timesheet')[0].click();
                    }
                }).catch(swal.noop)
            } else if (action == 'Edit') {
                $('.load-timesheet-detail')[0].value = info.id + '-3';
                $('.load-timesheet-detail')[0].click();
            }
            // swalShowEventDetail(info);
        },
        eventDragStop: function(info) {
            setTimeout(function() {
                onLeaveEvent(info, $calendar.fullCalendar("clientEvents", info['id'])[0].start);
            }, 50)
        },
        eventDidMount: function(info, e) {
            console.log(info.start._d)
        },
        customButtons: {
            removeAll: {
                text: 'Remove all',
                click: function() {
                    swal({
                        title: "Lỗi",
                        html: '<div class="form-group"><label class="form-control" placeholder="Error">Bạn có chắc chắn muốn xóa tất cả công việc?</label></div>',
                        showDenyButton: true,
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        confirmButtonClass: "btn btn-success",
                        cancelButtonClass: "btn btn-danger",
                        buttonsStyling: !1,
                        showCancelButton: true
                    }).then(function(e) {
                        if (e.value) {
                            dataCalendar1 = [];
                            refresh_calendar(dataCalendar1);
                        }
                    }).catch(swal.noop)

                }
            },
            Action: {
                text: 'Action',
                click: function() {
                    if (document.getElementById('mySidenav').style.width != '375px')
                        document.getElementById('mySidenav').style.width = '375px'
                    else
                        document.getElementById('mySidenav').style.width = '0'
                }
            }
        }
    })
}
let initFullCalendar2_data;
var calendar;

function initFullCalendar2(today, data, isEditable = false, action = '') {
    //debugger
    $calendar = document.getElementById("fullCalendar");

    var y, m, d;
    try { y = today.getFullYear() } catch { y = today.year() }
    try { m = today.getMonth() } catch { m = today.month() }
    try { d = today.getDate() } catch { d = today.date() }
    today = new Date(y, m, d);
    if (calendar) {
        calendar.gotoDate(today);
        data.forEach(source => {
                var f = initFullCalendar2_data.find(e => e.id == source.id);
                var ev = calendar.getEventById(source.id);
                if (!f) {
                    source.className = 'fc-h-event';

                    if (ev) calendar.getEventById(source.id).remove();
                    calendar.unselect();
                }
                if (!f && source.id < 0) {
                    source.className = 'event-orange';
                    calendar.addEvent(source);
                    calendar.render();
                    initFullCalendar2_data.push
                }
            })
            // initFullCalendar2_data.forEach(source => {
            //     if (!data.find(e => e.id == source.id)) {
            //         var ev = calendar.getEventById(source.id);
            //         if (ev) calendar.getEventById(source.id).remove();
            //         calendar.unselect();
            //     }
            // })

        initFullCalendar2_data = data;
    } else {
        // console.log(data)
        initFullCalendar2_data = data;
        calendar = new FullCalendar5.Calendar($calendar, {
            dayMaxEvents: true, // allow "more" link when too many events
            locale: 'vi',
            viewRender: function(e, a) { "month" != e.name && $(a).find(".fc-scroller").perfectScrollbar() },
            header: { left: "title", center: "month,agendaWeek,agendaDay", right: "Action removeAll prev,next,today" },
            initialDate: today,
            weekNumbers: false,
            default: 1,
            selectable: !0,
            selectHelper: !0,
            editable: isEditable,
            droppable: false,
            disableDragging: false,
            eventLimit: !0,
            nowIndicator: true,
            events: data,
            select: async function(t, n) {
                var d = t._d,
                    year = d.getFullYear(),
                    month = d.getMonth() + 1,
                    day = d.getDate(),
                    todays = [],
                    hourWK = 0;

                if (month != (today.getMonth() + 1)) {
                    swal({
                            title: "Lỗi",
                            html: '<div class="form-group"><label class="form-control" placeholder="Error">Bạn đang tạo lịch cho tháng ' + (today.getMonth() + 1) + '/' + today.getFullYear() + '</label><br/><label>Vui lòng chọn ngày trong tháng</label></div>',
                            showDenyButton: true,
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Cancel',
                            confirmButtonClass: "btn btn-success",
                            cancelButtonClass: "btn btn-danger",
                            buttonsStyling: !1,
                            showCancelButton: true
                        }).then(function(e) {

                        }).catch(swal.noop)
                        // showError('Vui lòng chọn trong tháng ' + (n._d.getMonth() + 1) + '/' + n._d.getFullYear()); return 
                } else {
                    if (year != today.getFullYear()) { showError('Vui lòng chọn trong tháng ' + (n._d.getMonth() + 1) + '/' + n._d.getFullYear()); return }
                    if ($('.selectpicker-filter-working').val() == '') { showError('Vui lòng chọn ca trực '); return }
                    if ($('input[name="EmployeeRadios"]:checked').val() == undefined) { showError('Vui lòng chọn nhân viên'); return }
                    d.setDate(day);
                    let listWkTemp = {},
                        listdayChange = '';
                    if ($('.check-automatic')[0].checked) {
                        hourWK += Number(workingSelected['hour']);
                        while ((d.getMonth() + 1) === month) {
                            var dw = new Date(d.getTime()),
                                key = dw.getDate().toString() + '_' + (dw.getMonth() + 1).toString() + '_' + dw.getFullYear().toString();
                            dw.setHours(21);

                            let listEmployeeToday = dataCalendar1[key];
                            let wkEmpleees;
                            if (listEmployeeToday != undefined) wkEmpleees = listEmployeeToday.find(e => e['id'] == employeeSelected['id']);
                            else listEmployeeToday = [];

                            if (wkEmpleees != undefined) { //nhân viên đã được phân công ngày này
                                var idCalendar = key + '_' + employeeSelected['id'] + '_' + workingSelected['id'];
                                if (listEmployeeToday.filter(e => e['idCalendar'] == idCalendar).length == 0) //trùng ca trực
                                {
                                    listdayChange += '<br /><b>' + _days[dw.getDay()] + ' ' + dw.getDate() + '/' + (dw.getMonth() + 1) + '/' + dw.getFullYear() +
                                        '</b> từ (' + wkEmpleees['wkName'] +
                                        ') thành (' + workingSelected['name'] + ')';
                                    listWkTemp[key] = {
                                        employeeSelected: employeeSelected,
                                        workingSelected: workingSelected,
                                        wkEmpleees: wkEmpleees,
                                        dw: dw,
                                        listEmployeeToday: listEmployeeToday,
                                        key: key
                                    }
                                }
                            }
                            //1 nhân viên không thể trực 1 ca 2 chi nhánh
                            else {
                                if (isEditable) await AddEvent(employeeSelected, workingSelected, dw, listEmployeeToday, key);
                            }

                            todays.push(new Date(d.getTime()));
                            d.setDate(d.getDate() + 7);
                        }
                        if (listdayChange != '') {
                            await ComfirmWorking(listWkTemp, listdayChange);
                        }
                    } else {
                        var dw = new Date(d.getTime()),
                            key = dw.getDate().toString() + '_' + (dw.getMonth() + 1).toString() + '_' + dw.getFullYear().toString();
                        let listEmployeeToday = dataCalendar1[key];
                        hourWK += Number(workingSelected['hour'])
                        dw.setHours(21);
                        let wkEmpleees;
                        if (listEmployeeToday != undefined) wkEmpleees = listEmployeeToday.find(e => e['idEmployee'] == employeeSelected['code']);
                        else listEmployeeToday = [];

                        if (wkEmpleees != undefined) { //nhân viên đã được phân công ngày này
                            var idCalendar = key + '_' + employeeSelected['id'] + '_' + workingSelected['id'];
                            if (listEmployeeToday.filter(e => e['idCalendar'] == idCalendar).length == 0) //trùng ca trực
                            {
                                listdayChange += '<br /><b>' + _days[dw.getDay()] + ' ' + dw.getDate() + '/' + (dw.getMonth() + 1) + '/' + dw.getFullYear() +
                                    '</b> từ (' + wkEmpleees['wkName'] +
                                    ') thành (' + workingSelected['name'] + ') ';
                                listWkTemp[key] = {
                                    employeeSelected: employeeSelected,
                                    workingSelected: workingSelected,
                                    wkEmpleees: wkEmpleees,
                                    dw: dw,
                                    listEmployeeToday: listEmployeeToday,
                                    key: key
                                }
                                await ComfirmWorking(listWkTemp, listdayChange);
                            }
                        } else {
                            if (isEditable) await AddEvent(employeeSelected, workingSelected, dw, listEmployeeToday, key);
                        }

                        todays.push(new Date(d.getTime()));
                        d.setDate(d.getDate() + 7);
                    }
                    $('#setTimeSheet').val(hourWK);
                    $('#setTimeSheet').click();
                }
            },
            eventClick: function(info) {
                _data_comment.key_calendar = info.id;
                if (action == 'Add') {
                    swal({
                        title: info.title,
                        showCancelButton: !0,
                        showDenyButton: true,
                        showDeleteButton: true,
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Delete',
                        confirmButtonClass: "btn btn-success",
                        cancelButtonClass: "btn btn-danger",
                        buttonsStyling: !1,
                        width: '800px'
                    }).then(function(e) {
                        if (e.dismiss == 'cancel') {
                            $calendar.fullCalendar('removeEvents', info.id);
                            dataCalendar1[info.key] = dataCalendar1[info.key].filter(e => e['idCalendar'] != info.id);
                            _listEnployee.forEach(emp => {
                                if (emp.id == Number(info.id.split('_')[3])) {
                                    emp.TimeWorking = emp.TimeWorking - info.wkHour;
                                    var ot = emp.TimeWorking - emp.constHour;
                                    if (ot > 0) emp.OverTime = ot;
                                    else emp.OverTime = 0;
                                }
                            })
                            $('.refresh-timesheet')[0].click();
                        }
                    }).catch(swal.noop)
                } else if (action == 'Edit') {
                    $('.load-timesheet-detail')[0].value = info.id + '-3';
                    $('.load-timesheet-detail')[0].click();
                }
                // swalShowEventDetail(info);
            },
            eventDragStop: function(info) {
                setTimeout(function() {
                    onLeaveEvent(info, $calendar.fullCalendar("clientEvents", info['id'])[0].start);
                }, 50)
            },
            customButtons: {
                removeAll: {
                    text: 'Xóa tất cả',
                    click: function() {
                        swal({
                            title: "Lỗi",
                            html: '<div class="form-group"><label class="form-control" placeholder="Error">Bạn có chắc chắn muốn xóa tất cả công việc?</label></div>',
                            showDenyButton: true,
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Cancel',
                            confirmButtonClass: "btn btn-success",
                            cancelButtonClass: "btn btn-danger",
                            buttonsStyling: !1,
                            showCancelButton: true
                        }).then(function(e) {
                            if (e.value) {
                                dataCalendar1 = [];
                                refresh_calendar(dataCalendar1);
                            }
                        }).catch(swal.noop)

                    }
                },
                // Action: {
                //     text: 'Chi tiết',
                //     click: function() {
                //         $('.onclick-edit-timesheet').click()
                //     }
                // }
            }
        })
        calendar.render();
        // $calendar.fullCalendar({
        //     locale: 'vi',
        //     viewRender: function(e, a) { "month" != e.name && $(a).find(".fc-scroller").perfectScrollbar() },
        //     header: { left: "title", center: "month,agendaWeek,agendaDay", right: "Action removeAll prev,next,today" },
        //     defaultDate: today,
        //     weekNumbers: false,
        //     default: 1,
        //     selectable: !0,
        //     selectHelper: !0,
        //     editable: isEditable,
        //     droppable: false,
        //     disableDragging: false,
        //     eventLimit: !0,
        //     views: {
        //         month: {
        //             titleFormat: "MMMM YYYY"
        //         },
        //         week: { titleFormat: " MMMM D YYYY" },
        //         day: { titleFormat: "D MMM, YYYY" }
        //     },
        //     nowIndicator: true,
        //     events: data,
        //     select: async function(t, n) {
        //         var d = t._d,
        //             year = d.getFullYear(),
        //             month = d.getMonth() + 1,
        //             day = d.getDate(),
        //             todays = [],
        //             hourWK = 0;

        //         if (month != (today.getMonth() + 1)) {
        //             swal({
        //                     title: "Lỗi",
        //                     html: '<div class="form-group"><label class="form-control" placeholder="Error">Bạn đang tạo lịch cho tháng ' + (today.getMonth() + 1) + '/' + today.getFullYear() + '</label><br/><label>Vui lòng chọn ngày trong tháng</label></div>',
        //                     showDenyButton: true,
        //                     confirmButtonText: 'OK',
        //                     cancelButtonText: 'Cancel',
        //                     confirmButtonClass: "btn btn-success",
        //                     cancelButtonClass: "btn btn-danger",
        //                     buttonsStyling: !1,
        //                     showCancelButton: true
        //                 }).then(function(e) {

        //                 }).catch(swal.noop)
        //                 // showError('Vui lòng chọn trong tháng ' + (n._d.getMonth() + 1) + '/' + n._d.getFullYear()); return 
        //         } else {
        //             if (year != today.getFullYear()) { showError('Vui lòng chọn trong tháng ' + (n._d.getMonth() + 1) + '/' + n._d.getFullYear()); return }
        //             if ($('.selectpicker-filter-working').val() == '') { showError('Vui lòng chọn ca trực '); return }
        //             if ($('input[name="EmployeeRadios"]:checked').val() == undefined) { showError('Vui lòng chọn nhân viên'); return }
        //             d.setDate(day);
        //             let listWkTemp = {},
        //                 listdayChange = '';
        //             if ($('.check-automatic')[0].checked) {
        //                 hourWK += Number(workingSelected['hour']);
        //                 while ((d.getMonth() + 1) === month) {
        //                     var dw = new Date(d.getTime()),
        //                         key = dw.getDate().toString() + '_' + (dw.getMonth() + 1).toString() + '_' + dw.getFullYear().toString();
        //                     dw.setHours(21);

        //                     let listEmployeeToday = dataCalendar1[key];
        //                     let wkEmpleees;
        //                     if (listEmployeeToday != undefined) wkEmpleees = listEmployeeToday.find(e => e['id'] == employeeSelected['id']);
        //                     else listEmployeeToday = [];

        //                     if (wkEmpleees != undefined) { //nhân viên đã được phân công ngày này
        //                         var idCalendar = key + '_' + employeeSelected['id'] + '_' + workingSelected['id'];
        //                         if (listEmployeeToday.filter(e => e['idCalendar'] == idCalendar).length == 0) //trùng ca trực
        //                         {
        //                             listdayChange += '<br /><b>' + _days[dw.getDay()] + ' ' + dw.getDate() + '/' + (dw.getMonth() + 1) + '/' + dw.getFullYear() +
        //                                 '</b> từ (' + wkEmpleees['wkName'] +
        //                                 ') thành (' + workingSelected['name'] + ')';
        //                             listWkTemp[key] = {
        //                                 employeeSelected: employeeSelected,
        //                                 workingSelected: workingSelected,
        //                                 wkEmpleees: wkEmpleees,
        //                                 dw: dw,
        //                                 listEmployeeToday: listEmployeeToday,
        //                                 key: key
        //                             }
        //                         }
        //                     }
        //                     //1 nhân viên không thể trực 1 ca 2 chi nhánh
        //                     else {
        //                         if (isEditable) await AddEvent(employeeSelected, workingSelected, dw, listEmployeeToday, key);
        //                     }

        //                     todays.push(new Date(d.getTime()));
        //                     d.setDate(d.getDate() + 7);
        //                 }
        //                 if (listdayChange != '') {
        //                     await ComfirmWorking(listWkTemp, listdayChange);
        //                 }
        //             } else {
        //                 var dw = new Date(d.getTime()),
        //                     key = dw.getDate().toString() + '_' + (dw.getMonth() + 1).toString() + '_' + dw.getFullYear().toString();
        //                 let listEmployeeToday = dataCalendar1[key];
        //                 hourWK += Number(workingSelected['hour'])
        //                 dw.setHours(21);
        //                 let wkEmpleees;
        //                 if (listEmployeeToday != undefined) wkEmpleees = listEmployeeToday.find(e => e['idEmployee'] == employeeSelected['code']);
        //                 else listEmployeeToday = [];

        //                 if (wkEmpleees != undefined) { //nhân viên đã được phân công ngày này
        //                     var idCalendar = key + '_' + employeeSelected['id'] + '_' + workingSelected['id'];
        //                     if (listEmployeeToday.filter(e => e['idCalendar'] == idCalendar).length == 0) //trùng ca trực
        //                     {
        //                         listdayChange += '<br /><b>' + _days[dw.getDay()] + ' ' + dw.getDate() + '/' + (dw.getMonth() + 1) + '/' + dw.getFullYear() +
        //                             '</b> từ (' + wkEmpleees['wkName'] +
        //                             ') thành (' + workingSelected['name'] + ') ';
        //                         listWkTemp[key] = {
        //                             employeeSelected: employeeSelected,
        //                             workingSelected: workingSelected,
        //                             wkEmpleees: wkEmpleees,
        //                             dw: dw,
        //                             listEmployeeToday: listEmployeeToday,
        //                             key: key
        //                         }
        //                         await ComfirmWorking(listWkTemp, listdayChange);
        //                     }
        //                 } else {
        //                     if (isEditable) await AddEvent(employeeSelected, workingSelected, dw, listEmployeeToday, key);
        //                 }

        //                 todays.push(new Date(d.getTime()));
        //                 d.setDate(d.getDate() + 7);
        //             }
        //             $('#setTimeSheet').val(hourWK);
        //             $('#setTimeSheet').click();
        //         }
        //     },
        //     eventClick: function(info) {
        //         _data_comment.key_calendar = info.id;
        //         if (action == 'Add') {
        //             swal({
        //                 title: info.title,
        //                 showCancelButton: !0,
        //                 showDenyButton: true,
        //                 showDeleteButton: true,
        //                 confirmButtonText: 'OK',
        //                 cancelButtonText: 'Delete',
        //                 confirmButtonClass: "btn btn-success",
        //                 cancelButtonClass: "btn btn-danger",
        //                 buttonsStyling: !1,
        //                 width: '800px'
        //             }).then(function(e) {
        //                 if (e.dismiss == 'cancel') {
        //                     $calendar.fullCalendar('removeEvents', info.id);
        //                     dataCalendar1[info.key] = dataCalendar1[info.key].filter(e => e['idCalendar'] != info.id);
        //                     _listEnployee.forEach(emp => {
        //                         if (emp.id == Number(info.id.split('_')[3])) {
        //                             emp.TimeWorking = emp.TimeWorking - info.wkHour;
        //                             var ot = emp.TimeWorking - emp.constHour;
        //                             if (ot > 0) emp.OverTime = ot;
        //                             else emp.OverTime = 0;
        //                         }
        //                     })
        //                     $('.refresh-timesheet')[0].click();
        //                 }
        //             }).catch(swal.noop)
        //         } else if (action == 'Edit') {
        //             $('.load-timesheet-detail')[0].value = info.id + '-3';
        //             $('.load-timesheet-detail')[0].click();
        //         }
        //         // swalShowEventDetail(info);
        //     },
        //     eventDragStop: function(info) {
        //         setTimeout(function() {
        //             onLeaveEvent(info, $calendar.fullCalendar("clientEvents", info['id'])[0].start);
        //         }, 50)
        //     },
        //     eventDidMount: function(info, e) {
        //         console.log(info.start._d)
        //     },
        //     customButtons: {
        //         removeAll: {
        //             text: 'Xóa tất cả',
        //             click: function() {
        //                 swal({
        //                     title: "Lỗi",
        //                     html: '<div class="form-group"><label class="form-control" placeholder="Error">Bạn có chắc chắn muốn xóa tất cả công việc?</label></div>',
        //                     showDenyButton: true,
        //                     confirmButtonText: 'OK',
        //                     cancelButtonText: 'Cancel',
        //                     confirmButtonClass: "btn btn-success",
        //                     cancelButtonClass: "btn btn-danger",
        //                     buttonsStyling: !1,
        //                     showCancelButton: true
        //                 }).then(function(e) {
        //                     if (e.value) {
        //                         dataCalendar1 = [];
        //                         refresh_calendar(dataCalendar1);
        //                     }
        //                 }).catch(swal.noop)

        //             }
        //         },
        //         Action: {
        //             text: 'Chi tiết',
        //             click: function() {
        //                 $('.onclick-edit-timesheet').click()
        //             }
        //         }
        //     }
        // })
    }

}
let initFullCalendar3_data;
var calendar3;

function removeCalender3() {
    calendar3 = undefined;
}

function initFullCalendar3(today, data, isEditable = false, action = '') {
    //debugger
    $calendar = document.getElementById("fullCalendar");

    var y, m, d;
    try { y = today.getFullYear() } catch { y = today.year() }
    try { m = today.getMonth() } catch { m = today.month() }
    try { d = today.getDate() } catch { d = today.date() }
    today = new Date(y, m, d, 12, 0, 0);
    if (calendar3) {
        // calendar3.gotoDate(today);
        if (initFullCalendar3_data.length > 0 && data.length > 0 && (new Date(initFullCalendar3_data[0].start).getMonth()) != (new Date(data[0].start).getMonth())) {
            initFullCalendar3_data.forEach(source => {
                calendar3.getEventById(source.id).remove();
                calendar3.unselect();
            })
            data.forEach(source => {
                source.className = source.source;
                calendar3.addEvent(source);
                calendar3.render();
            })
        } else {
            data.forEach(source => {
                var f = initFullCalendar3_data.find(e => e.id == source.id);
                var ev = calendar3.getEventById(source.id);
                if (!f) {
                    if (ev) calendar3.getEventById(source.id).remove();
                    calendar3.unselect();
                }
                if (!f && source.id < 0) {
                    //debugger
                    // source.className = 'event-orange';
                    calendar3.addEvent(source);
                    calendar3.render();
                }
            })
        }

        initFullCalendar3_data = data;
    } else {
        initFullCalendar3_data = data;
        calendar3 = new FullCalendar5.Calendar($calendar, {
            dayMaxEvents: true, // allow "more" link when too many events
            timeZone: 'UTC',
            locale: 'vi',
            viewRender: function(e, a) { "month" != e.name && $(a).find(".fc-scroller").perfectScrollbar() },
            headerToolbar: { left: "title", center: 'dayGridMonth,timeGridWeek', right: "checkin prev,next" },
            initialView: 'timeGridWeek',
            initialDate: today,
            weekNumbers: false,
            default: 1,
            selectable: !0,
            selectHelper: !0,
            editable: isEditable,
            droppable: false,
            disableDragging: false,
            eventLimit: !0,
            nowIndicator: false,
            events: data,
            displayEventTime: false,
            stickyHeaderDates: false,
            customButtons: {
                prev: {
                    click: function(e) {
                        calendar3.prev();
                        // calendar3.gotoDate(new Date(calendar3.getDate().getFullYear(), calendar3.getDate().getMonth() - 1, 15));
                        console.log(calendar3.getDate());
                        $('.change-date')[0].click();
                        // calendar3.fullCalendar('gotoDate', moment(calendar3.getDate(), 'MM/DD/YYYY HH:mm').set('date', 15));
                        console.log(calendar3.getDate());
                    }
                },
                next: {
                    click: function(e) {
                        calendar3.next();
                        // calendar3.gotoDate(new Date(calendar3.getDate().getFullYear(), calendar3.getDate().getMonth() + 1, 15));
                        console.log(calendar3.getDate());
                        $('.change-date')[0].click();

                        console.log(calendar3.getDate());
                    }
                },
                todays: {
                    text: 'Hôm nay',
                    click: function(e) {
                        calendar3.today();
                        if (calendar3.getDate().getMonth() == (new Date()).getMonth()) return;
                        console.log(calendar3.getDate())
                        $('.change-date')[0].click();
                    }
                },
                checkin: {
                    text: 'Chấm công',
                    click: function(e) {
                        location.href = '/check-in-out'
                    }
                }
            },
        })
        calendar3.render();
        // $('.fc-dayGridMonth-button')[0].innerText = 'Tháng';
        // $('.fc-timeGridWeek-button')[0].innerText = 'Tuần';
    }

}

function convertToFomat(data) {
    let rs = [];
    data.forEach(e => {
        rs.push({
            id: e['idCalendar'],
            key: e['key'],
            title: e['title'],
            TimeWorking: e['TimeWorking'],
            wkHour: e['wkHour'],
            wkName: e['wkName'],
            idCalendar: e['idCalendar'],
            start: new Date(e['start']),
            className: e['className'],
            color: e['color']
        })
    })
    return rs;
}

function onLeaveEvent(info, startNew) {
    var keyold = info['id'].split('_')[0] + '_' + info['id'].split('_')[1] + '_' + info['id'].split('_')[2],
        keynew = startNew._i[2] + '_' + (startNew._i[1] + 1) + '_' + startNew._i[0],
        idCalendar = keynew + '_' + info['id'].split('_')[3] + '_' + info['id'].split('_')[4];
    if ((startNew._i[1] + 1) != (info.start._i.getMonth() + 1)) {
        swal({
            title: "Lỗi",
            html: '<div class="form-group"><label class="form-control" placeholder="Error">Bạn đang tạo lịch cho tháng ' + (info.start._i.getMonth() + 1) + '/' + info.start._i.getFullYear() + '</label><br/><label>Bạn có muốn chuyển tất cả công việc qua tháng ' + (startNew._i[1] + 1) + '/' + startNew._i[0] + ' không?</label></div>',
            showDenyButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            buttonsStyling: !1,
            showCancelButton: true
        }).then(function(e) {
            if (e.dismiss == 'cancel') {
                revert_event(idCalendar, keynew, keyold, info, startNew);
            } else if (e.value) {
                move_all_envent_to_new_month(startNew);
            }
        }).catch(swal.noop)
    } else {
        let t = {
            id: employeeSelected['id'],
            idEmployee: employeeSelected['code'],
            title: info['title'],
            start: startNew,
            allDay: !1,
            wkName: info['wkName'],
            wkHour: info['wkHour'],
            className: "event-green",
            idEmployee: info['idEmployee'],
            idCalendar: idCalendar
        }
        if (!dataCalendar1[keynew]) dataCalendar1[keynew] = [];
        if (dataCalendar1[keynew].filter(e => e['idCalendar'] == t['idCalendar']).length > 0 || check_working_employee(keynew, info['idEmployee'], info['wkName'], info['wkHour'])) {
            swal({
                title: "Lỗi",
                html: '<div class="form-group"><label class="form-control" placeholder="Error">Một nhân viên không được phép trực quá một ca ở một thời điểm.</label></div>',
                showCancelButton: !0,
                confirmButtonClass: "btn btn-success",
                buttonsStyling: !1,
                showCancelButton: false
            }).then(function(e) {
                var a = {
                    id: info['id'],
                    title: info['title'],
                    start: info['start'],
                    wkName: info['wkName'],
                    wkHour: info['wkHour'],
                    idEmployee: info['idEmployee'],
                    end: info['start'],
                    key: info['info'],
                    idCalendar: info['id']
                };
                $calendar.fullCalendar('removeEvents', info['id']); //xóa ca cũ
                $calendar.fullCalendar("renderEvent", a, !0);
                $calendar.fullCalendar("unselect");
                // dataCalendar1[keyold] = listEmployeeToday.filter(e => e['idCalendar'] != info['id']); // loại bỏ dữ liệu từ ngày cũ
                // dataCalendar1[keynew].push(t); //Chuyển dữ liệu qua ngày mới
            }).catch(swal.noop);
        } else {
            //revert_event(idCalendar, keynew, keyold, info, startNew);
            var a = {
                id: idCalendar,
                title: info['title'],
                start: startNew,
                wkName: info['wkName'],
                wkHour: info['wkHour'],
                idEmployee: info['idEmployee'],
                end: startNew,
                key: keynew,
                idCalendar: idCalendar
            };
            $calendar.fullCalendar('removeEvents', info['id']); //xóa ca cũ
            $calendar.fullCalendar("renderEvent", a, !0);
            $calendar.fullCalendar("unselect");
            dataCalendar1[keyold] = dataCalendar1[keyold].filter(e => e['idCalendar'] != info['id']); // loại bỏ dữ liệu từ ngày cũ
            dataCalendar1[keynew].push(t); //Chuyển dữ liệu qua ngày mới
        }
    }
}

function check_working_employee(key, code_emp, name_wk, hour_wk) {
    var s1, e1, s2, e2, result = false;
    var t = _listWorking.find(e => e.hour == hour_wk && e.name == name_wk);
    s1 = t.start._d.getUTCHours(), e1 = t.end._d.getUTCHours();
    var list_wk_of_emp = dataCalendar1[key].filter(e => e['idEmployee'] == code_emp);
    list_wk_of_emp.forEach(e => {
        t = _listWorking.find(e2 => e2.hour == e['wkHour'] && e2.name == e['wkName']);
        s2 = t.start._d.getUTCHours(), e2 = t.end._d.getUTCHours();
        if ((s2 <= s1 && s1 < e2) || (s2 < e1 && e1 <= e2))
            result = true;
    })
    return result;
}

function move_all_envent_to_new_month(to_date) {
    if (!to_date) return;
    _data_month = to_date._d;
    var all_day_in_month = getDaysInMonth(to_date._i[1], to_date._i[0]),
        data_revert = {},
        data_new = [];
    for (const [key, value] of Object.entries(dataCalendar1)) {
        var day = key.split('_')[0],
            month = key.split('_')[1],
            year = key.split('_')[2],
            today = all_day_in_month[Number(day) - 1];
        if (today) {
            var keynew = today.getDate() + '_' + today.getMonth() + '_' + today.getFullYear();
            value.forEach(v => {
                v['start'] = today;
                v['end'] = today;
            })
            data_revert[keynew] = value;
            var t = data_new.concat(value);
            data_new = t;
        }
    }
    dataCalendar1 = data_revert;
    refresh_calendar(data_new);
}

function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function revert_event(idCalendar, keynew, keyold, info, startNew) {
    let listEmployeeToday = dataCalendar1[keyold];
    var a = {
        id: info['id'],
        title: info['title'],
        start: startNew,
        wkName: info['wkName'],
        wkHour: info['wkHour'],
        idEmployee: info['idEmployee'],
        end: startNew,
        key: keynew,
        idCalendar: idCalendar
    };
    $calendar.fullCalendar('removeEvents', info['id']); //xóa ca cũ
    $calendar.fullCalendar("renderEvent", info, !0);
    $calendar.fullCalendar("unselect");

    dataCalendar1[keyold] = listEmployeeToday.filter(e => e['idCalendar'] != info['id']); // loại bỏ dữ liệu từ ngày cũ
    dataCalendar1[keynew].push(t); //Chuyển dữ liệu qua ngày mới
}
async function AddEvent(employeeSelected, workingSelected, dw, listEmployeeToday, key) {
    var title = '(' + workingSelected['name'] + ") " + employeeSelected['firstName'] + " " + employeeSelected['lastName'];
    var idCalendar = key + '_' + employeeSelected['id'] + '_' + workingSelected['id'];
    let t = {
        id: employeeSelected['id'],
        idEmployee: employeeSelected['code'],
        title: title,
        start: dw,
        allDay: !1,
        wkName: workingSelected['name'],
        wkHour: workingSelected['hour'],
        className: "event-green",
        idCalendar: idCalendar,
        key: key
    }
    listEmployeeToday.push(t);
    dataCalendar1[key] = listEmployeeToday;
    var h = 0;
    if (!employeeSelected['TimeWorking']) employeeSelected['TimeWorking'] = 0;
    h = employeeSelected['TimeWorking'] + Number(workingSelected['hour']);
    updateTime(employeeSelected['code'], h);
    var a = {
        id: idCalendar,
        title: title,
        start: dw,
        wkName: workingSelected['name'],
        wkHour: workingSelected['hour'],
        idEmployee: employeeSelected['code'],
        end: dw,
        editable: true,
        key: key
    };
    $calendar.fullCalendar("renderEvent", a, !0);
    $calendar.fullCalendar("unselect");
}
async function ComfirmWorking(listWkChange, titleWarn) {
    var message = 'Bạn có muốn đổi ca của <b>' +
        employeeSelected['firstName'] + " " +
        employeeSelected['lastName'] +
        '</b> không?<br />' + titleWarn;
    swal({
        title: 'Xác nhận',
        html: `<div class="form-group">
            <label class="form-control" style="padding: 0 0 50px 0px;background-image: linear-gradient( 0deg, #ffffff 1px, hsla(0, 0%, 82%, 0) 0), linear-gradient( 0deg, #ffffff 1px, hsla(0, 0%, 82%, 0) 0) !important;" placeholder="Error">` + message + `<br /><br /></label>
        </div>`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No'
    }).then((result) => {
        if (result['value']) {
            for (const [key, value] of Object.entries(listWkChange)) {
                var title = '(' + value['workingSelected']['name'] + ") " + value['employeeSelected']['firstName'] + " " + value['employeeSelected']['lastName'];
                var idCalendar = key + '_' + value['employeeSelected']['id'] + '_' + value['workingSelected']['id'];
                //cập nhật ca mới
                value['listEmployeeToday'].forEach(e => {
                    if (e['id'] == value['employeeSelected']['id']) {

                        $calendar.fullCalendar('removeEvents', e['idCalendar']); //xóa ca cũ

                        if (!value['employeeSelected']['TimeWorking']) value['employeeSelected']['TimeWorking'] = 0;
                        var h = (value['employeeSelected']['TimeWorking'] - e['wkHour']) + Number(workingSelected['hour']);
                        updateTime(value['employeeSelected']['code'], h);

                        e['title'] = title;
                        e['start'] = value['dw'];
                        e['wkName'] = value['workingSelected']['name'];
                        e['wkHour'] = value['workingSelected']['hour'];
                        e['className'] = "event-green";
                        e['idCalendar'] = idCalendar;
                        e['idEmployee'] = value['employeeSelected']['code'];

                        var a = {
                            id: idCalendar,
                            title: title,
                            start: value['dw'],
                            wkName: value['workingSelected']['name'],
                            wkHour: value['workingSelected']['hour'],
                            end: value['dw'],
                            key: key
                        };
                        dataCalendar1[key] = value['listEmployeeToday'];
                        $calendar.fullCalendar("renderEvent", a, !0);
                        $calendar.fullCalendar("unselect");
                    }
                });
            }
        }
    })
    $('.swal2-content').css("height", "120px")
}

function CallSelectPickerByClass(cl, disabled) {
    if ($("." + cl).length > 0) {
        if (disabled) $("." + cl).selectpicker().attr('disabled');
        else $("." + cl).selectpicker();
    }
}

function GetValueSelectPickerByClass(cl) {
    let v = '';
    let arr = $('.' + cl + ' option:selected');
    for (var i = 0; i < arr.length; i++) {
        if (v != '') v += ';';
        v += arr[i].value;
    }
    return v;
}

function updateTime(idEmp, time) {
    _listEnployee.forEach(e => {
        if (e['code'] == idEmp) {
            if (!e['TimeWorking']) e['TimeWorking'] = 0;
            e['TimeWorking'] = time;
            if (e['TimeWorking'] > e['constHour']) { //tăng ca
                if (!e['OverTime']) e['OverTime'] = 0;
                e['OverTime'] = (e['TimeWorking'] - e['constHour']);
            } else e['OverTime'] = 0 //không tăng ca
        }
    })
    setAllEmployee(_listEnployee);
}

function removeEvent(id) {
    var key = id.split('_')[0] + '_' + id.split('_')[1] + '_' + id.split('_')[2];
    var h = 0,
        et = dataCalendar1[key].find(e => e['idCalendar'] == id),
        employee = _listEnployee.find(e => e.code == et.idEmployee);

    h = employee['TimeWorking'] - Number(et['wkHour']);
    updateTime(employee.code, h);
    dataCalendar1[key] = dataCalendar1[key].filter(e => e['idCalendar'] != id);
    $calendar.fullCalendar('removeEvents', id);
    $('.swal2-cancel').click()
}

var eclick, token_add;

function ShowEventDetail(id, title, html) {
    token_add = Date.now();
    swal({
        title: title,
        html: html,
        showCancelButton: !0,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'OK',
        denyButtonText: `Don't save`,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: !1,
        width: '800px'
    }).then(function(e) {
        if (e['value']) {
            var conetnt_work = $('.content-work').val(),
                percent_done = Number($('.percent-done').val());
            data_update_timesheet.idCalendar = id;
            data_update_timesheet.percent_done = percent_done;
            data_update_timesheet.description = conetnt_work;
            $('.update-timesheet')[0].click();
        }
    }).catch(swal.noop)
}

function postComment() {
    _data_comment.content = $('.content-comment')[0].value;
    $('.post-comment')[0].click();
}

function onChangeUploadFile(element, id) {
    var files = element.files;
    var key = id.split('_')[0] + '_' + id.split('_')[1] + '_' + id.split('_')[2];
    for (var i = 0; i < files.length; i++) {
        var f = files[i];
        $(".tbody-item-upload").append(
            `<tr class="` + f.lastModified + `">
                <th scope="row" style="padding: 3px 8px !important;">` + f.name + `</th>
                <td style="padding: 3px 8px !important;">
                <a href="javascript:;"><span class="material-icons" 
                onclick="removeFileUploadComment('file','` + key + `','` + id + `','` + f.lastModified + `');$('.` + f.lastModified + `').remove()" style="font-size: 20px; color: red;">close</span></a></td>
            </tr>`
        );
        if (!_data_comment.hRM_Workspace_Comment_Files) _data_comment.hRM_Workspace_Comment_Files = [];

        _data_comment.hRM_Workspace_Comment_Files.push({
            id: f.lastModified,
            value: f,
            name: f.name,
            size: f.size
        });
    }
}

function encodeImgtoBase64(element, id) {
    var img = element.files[0];
    var key = id.split('_')[0] + '_' + id.split('_')[1] + '_' + id.split('_')[2];

    $(".tbody-item-upload").append(
        `<tr class="` + img.lastModified + `">
            <th scope="row" style="padding: 3px 8px !important;">` + img.name + `</th>
            <td style="padding: 3px 8px !important;"><a href="javascript:;"><span class="material-icons" onclick="removeFileUploadComment('img','` + key + `','` + id + `','` + img.lastModified + `');$('.` + img.lastModified + `').remove()" style="font-size: 20px; color: red;">close</span></a></td>
        </tr>`
    );
    var reader = new FileReader();
    reader['key'] = key;
    reader['id'] = id;
    reader.onloadend = function(key, id) {
        if (!_data_comment.hrm_workspace_comment_images) _data_comment.hrm_workspace_comment_images = [];
        _data_comment.hrm_workspace_comment_images.push({
            id: img.lastModified,
            value: reader.result,
            length: img.length,
            name: img.name
        });
    }
    reader.readAsDataURL(img);
}

function removeFileUploadComment(type, key, id, idfile) {
    var lisEvents = dataCalendar1[key];
    if (type == 'img') {
        _data_comment.hrm_workspace_comment_images = _data_comment.hRM_Workspace_Comment_Files.filter(e => e['id'] != idfile);
    } else if (type == 'file') {
        _data_comment.hRM_Workspace_Comment_Files = _data_comment.hRM_Workspace_Comment_Files.filter(e => e['id'] != idfile);
    }
    lisEvents.forEach(e => {
        if (e['idCalendar'] == id) {

        }
    })
}

function download_byUrl(url) {
    window.open(base_domain + '/Download/DownloadDocument?filePath=' + url, '_blank')
    setTimeout(() => {
        this.close();
    }, 100);
}

function download_img_by_base64(name, ImageBase64) {
    var a = document.createElement("a"); //Create <a>
    a.href = ImageBase64; //Image Base64 Goes here
    a.download = name; //File name Here
    a.click(); //Downloaded file
}

function showNotification(e, a, t, m) {
    type = ["", "info", "danger", "success", "warning", "rose", "primary"],
        color = Math.floor(6 * Math.random() + 1),
        $.notify({ icon: "add_alert", message: m }, {
            type: type[t],
            timer: 10 * 1000,
            placement: { from: e, align: a },
        })
    setTimeout(() => {
        $('.fadeInDown').addClass('fadeOutDown')
        $('.fadeOutDown').remove();
    }, 10 * 1000);
};

function refresh_data() {
    _listEnployee = [];
    data_update_timesheet = {
        idCalendar: null,
        description: null,
        percent_done: null
    }
    _data_comment = {
        key_calendar: null,
        code: null,
        content: null,
        account_create: null,
        hrm_workspace_comment_images: [],
        hRM_Workspace_Comment_Files: []
    };
    dataCalendar1 = [];
    $('.content-comment')[0].value = '';
    $('.tbody-item-upload').html('');
}

function show_comment_hide(idCalendar) {
    $('.load-timesheet-detail')[0].value = idCalendar + '-1000';
    $('.load-timesheet-detail')[0].click();
}

function showBannerCompany() {
    $(".owl-carousel").owlCarousel({
        items: 1
    });
}

function ShowNotification(title, icon, message, redirect) {
    // var notification = new Notification(title, {
    //     icon: ,
    //     body: message,
    // });
    // // close the notification after 10 seconds
    // setTimeout(() => {
    //     notification.close();
    // }, 10 * 1000);

    // // navigate to a URL
    // notification.addEventListener('click', () => {
    //     window.open('/messenger');
    // });
    var audio = new Audio('https://api.erp.osoft.vn/mixkit-modern-classic-door-bell-sound-113.wav');
    audio.play();
    if (!Notification) {
        return;
    }

    if (Notification.permission !== 'granted')
        Notification.requestPermission();

    if (Notification.permission !== 'granted')
        Notification.requestPermission();
    else {
        var notification = new Notification(title, {
            icon: icon,
            body: message,
        });
        notification.onclick = function() {
            window.open(redirect);
        };
    }
}

function outAnnounce() {
    if ($('#Announce').scrollTop() + $('#Announce').innerHeight() >= $('#Announce')[0].scrollHeight - 5) {
        return true;
    }
}

function datetimepicker(id) {
    if ($("#" + id).length == 0) {
        setTimeout(() => {
            datetimepicker(id)
        }, 50);
    } else {
        $("#" + id).datetimepicker({
            format: "DD/MM/YYYY HH:mm", //h:mm A
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: "fa fa-chevron-left",
                next: "fa fa-chevron-right",
                today: "fa fa-screenshot",
                clear: "fa fa-trash",
                close: "fa fa-remove"
            }
        }).on("dp.change", function() {
            try {
                $("#input-" + id)[0].value = new Date(Number(this.value.split(' ')[0].split('/')[2]), Number(this.value.split(' ')[0].split('/')[1]) - 1, Number(this.value.split(' ')[0].split('/')[0]), Number(this.value.split(' ')[1].split(':')[0]), Number(this.value.split(' ')[1].split(':')[1]), 0, 0);;
            } catch {
                $("#" + id).trigger('clearDate');
                $("#input-" + id)[0].value = "";
            }
            $("#input-" + id)[0].click();
        }).trigger("dp.change");
    }
}

function datepicker(id, format = "DD/MM/YYYY") {
    if ($("#" + id).length == 0) {
        setTimeout(() => {
            datepicker(id, format);
        }, 50);
    } else {
        $("#" + id).datetimepicker({
            format: format,
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: "fa fa-chevron-left",
                next: "fa fa-chevron-right",
                today: "fa fa-screenshot",
                clear: "fa fa-trash",
                close: "fa fa-remove"
            }
        }).on("dp.change", function() {
            if (this.value.split('/').length == 3) { //dd/mm/yyy
                try {
                    $("#input-" + id)[0].value = new Date(Number(this.value.split('/')[2]), Number(this.value.split('/')[1]) - 1, Number(this.value.split('/')[0]), 0, 0, 0);
                } catch {}
            } else if (this.value.split('/').length == 2) { //mm/yyy
                $("#input-" + id)[0].value = new Date(Number(this.value.split('/')[1]), Number(this.value.split('/')[0]), 1, 0, 0, 0);
            } else if (this.value.split('/').length == 1) { //yyyy
                $("#input-" + id)[0].value = new Date(Number(this.value.split('/')[0]), 1, 1, 0, 0, 0);
            } else {
                $("#" + id).trigger('clearDate');
                $("#input-" + id)[0].value = '';
            }
            $("#input-" + id)[0].click();
        })
    }
}

function timepicker(id) {
    if ($("#" + id).length == 0) {
        setTimeout(() => {
            timepicker(id)
        }, 50);
    } else
        $("#" + id).datetimepicker({
            format: "HH:mm", //h:mm A
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: "fa fa-chevron-left",
                next: "fa fa-chevron-right",
                today: "fa fa-screenshot",
                clear: "fa fa-trash",
                close: "fa fa-remove"
            }
        }).on("dp.change", function() {
            var today = new Date();
            if (this.value == "") {
                $("#" + id).trigger('clearDate');
                $("#input-" + id)[0].value = '';
            } else
                $("#input-" + id)[0].value = new Date(today.getFullYear(), today.getMonth(), today.getDate(), Number(this.value.split(':')[0]), Number(this.value.split(':')[1]), 0);
            $("#input-" + id)[0].click();
        }).trigger("dp.change");;
}

function pipeTimepicker(v, id) {
    if (!v) return;
    try {
        var today = new Date();
        var h = v.hour();
        var m = v.minute();
        $("#input-" + id)[0].value = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate(), h, m, 0, 0);;
        $("#input-" + id)[0].click();
    } catch {}
}

function pipeDateTimepicker(v, id) {
    if (!v) return;
    try {
        $("#input-" + id)[0].value = new Date(v.getFullYear(), v.getMonth(), v.getDate(), v.hour(), v.minute(), 0, 0);;
    } catch {
        try {
            $("#input-" + id)[0].value = new Date(v.year(), v.month(), v.dates(), v.hour(), v.minute(), 0, 0);;
        } catch {
            $("#" + id).trigger('clearDate');
            $("#input-" + id)[0].value = "";
        }
    }
    $("#input-" + id)[0].click();
}

function pipeDatepicker(v, id) {
    if (!v) {
        try { $("#" + id)[0].value = ''; } catch {}
        return;
    };
    try {
        $("#input-" + id)[0].value = new Date(v.year(), v.month(), v.dates(), 12, 0, 0, 0);
        $("#input-" + id)[0].click();
    } catch {}
}
let _selectpickerTimeout;

function selectpicker(id, value, disabled) {
    $('#' + id).select2({
        theme: "classic",
        tags: true,
        matcher: function matchCustom(params, data) {
            // If there are no search terms, return all of the data
            if ($.trim(params.term) === '') {
                return data;
            }

            if (_selectpickerTimeout) clearTimeout(_selectpickerTimeout);
            _selectpickerTimeout = setTimeout(() => {
                $('.input-textSearchselectpicker-' + id)[0].value = $.trim(params.term);
                $('.input-textSearchselectpicker-' + id)[0].click()
            }, 500);

            // Do not display the item if there is no 'text' property
            if (typeof data.text === 'undefined') {
                return null;
            }

            // `params.term` should be the term that is used for searching
            // `data.text` is the text that is displayed for the data object
            if (data.text.toUpperCase().indexOf(params.term.toUpperCase()) > -1) {
                var modifiedData = $.extend({}, data, true);
                modifiedData.text += '';

                // You can return modified objects from here
                // This includes matching the `children` how you want in nested data sets
                return modifiedData;
            }

            // Return `null` if the term should not be displayed
            return null;
        }
    }).val(value).prop('disabled', disabled).trigger('change');
    $('#' + id).on("change", function(e) {
        $('.input-' + id)[0].value = this.value;
        $('.input-' + id)[0].click();
    });
}

function selectIMGpicker(id, value, disabled, FieldValue, FieldIMG, textSmall) {
    $('#' + id).select2({
        theme: "classic",
        tags: true,
        templateResult: function formatState(state) {
            if (!state.id) {
                return state.text;
            }
            var opption = _listOpption[id].find(e => e[FieldValue] == state.id);
            var baseUrl = opption[FieldIMG];
            var small = '';
            if (textSmall) small = `<small> - ` + opption[textSmall] + `</small>`;
            var $state = $(
                `<span><img src="` + baseUrl + `" class="img-flag img-selectpicker" />` + state.text + `</span>
                ` + small + `
                `
            );
            return $state;
        }
    }).val(value).prop('disabled', disabled).trigger('change');
    $('#' + id).on("change", function(e) {
        $('.input-' + id)[0].value = this.value;
        $('.input-' + id)[0].click();
    });
}

function setOpptionSelectpicker(id, value, disabled, listOpption, isMulti) {
    $('#' + id).empty();
    if (listOpption != undefined && listOpption.length > 0) {
        $('#' + id).append(new Option('---Chọn---', '', true, false));
        for (var i = 0; i < listOpption.length; i++) {
            var selected = (listOpption[i].id == value);
            if (isMulti && value)
                selected = (value.split(';').filter(e => e == listOpption[i].id).length > 0)
            var newOption = new Option(listOpption[i].text, listOpption[i].id, false, listOpption[i].id == value || selected);
            $('#' + id).append(newOption).trigger('change');
        }
    } else $('#' + id).append(new Option('No data', '', true, false));
    $('#' + id).prop('disabled', disabled).trigger('change');
}

function appendOpptionSelectpicker(id, value, disabled, listOpption, isMulti, textSearch = '') {
    $('#' + id).select2("close");
    $('#' + id).empty();
    if (listOpption != undefined && listOpption.length > 0) {
        $('#' + id).append(new Option('---Chọn---', '', true, false));
        for (var i = 0; i < listOpption.length; i++) {
            var selected = (listOpption[i].id == value);
            if (isMulti && value)
                selected = (value.split(';').filter(e => e == listOpption[i].id).length > 0)
            var newOption = new Option(listOpption[i].text, listOpption[i].id, false, listOpption[i].id == value || selected);
            $('#' + id).append(newOption).trigger('change');
        }
    } else $('#' + id).append(new Option('No data', '', true, false));
    $('#' + id).select2("open");
    $('input.select2-search__field').val(textSearch)
        // $('#' + id).prop('disabled', disabled).trigger('change');
}

function appendOpptionSelectpickerByClass(clas, value, disabled, listOpption, isMulti, textSearch = '') {
    $('.' + clas).select2("close");
    $('.' + clas).empty();
    if (listOpption != undefined && listOpption.length > 0) {
        $('.' + clas).append(new Option('---Chọn---', '', true, false));
        for (var i = 0; i < listOpption.length; i++) {
            var selected = (listOpption[i].id == value);
            if (isMulti && value)
                selected = (value.split(';').filter(e => e == listOpption[i].id).length > 0)
            var newOption = new Option(listOpption[i].text, listOpption[i].id, false, listOpption[i].id == value || selected);
            $('.' + clas).append(newOption).trigger('change');
        }
    } else $('.' + clas).append(new Option('No data', '', true, false));
    $('.' + clas).select2("open");
    $('input.select2-search__field').val(textSearch);

}

function setOpptionSelectIMGpicker(id, value, disabled, listOpption, isMulti) {
    $('#' + id).empty();
    $('#' + id).append(new Option('---Chọn---', '', true, false));
    if (listOpption != undefined && listOpption.length > 0) {
        _listOpption[id] = listOpption;
        for (var i = 0; i < listOpption.length; i++) {
            var selected = (listOpption[i].id == value);
            if (isMulti && value)
                selected = (value.split(';').filter(e => e == listOpption[i].id).length > 0)
            var newOption = new Option(listOpption[i].text, listOpption[i].id, false, listOpption[i].id == value || selected);
            $('#' + id).append(newOption).trigger('change');
        }
    }
    $('#' + id).prop('disabled', disabled).trigger('change');
}


let _multiselectpickerTimeout;

function multiselectpicker(id, value, disabled) {
    $('.' + id).select2({
        theme: "classic",
        matcher: function matchCustom(params, data) {
            // If there are no search terms, return all of the data
            if ($.trim(params.term) === '') {
                return data;
            }
            if (_multiselectpickerTimeout) clearTimeout(_multiselectpickerTimeout);
            _multiselectpickerTimeout = setTimeout(() => {
                $('.input-multiselectpicker-' + id)[0].value = $(this).val().join(';');
                $('.input-multiselectpicker-' + id)[0].click()
            }, 500);

            // Do not display the item if there is no 'text' property
            if (typeof data.text === 'undefined') {
                return null;
            }

            // `params.term` should be the term that is used for searching
            // `data.text` is the text that is displayed for the data object
            if (data.text.toUpperCase().indexOf(params.term.toUpperCase()) > -1) {
                var modifiedData = $.extend({}, data, true);
                modifiedData.text += '';

                // You can return modified objects from here
                // This includes matching the `children` how you want in nested data sets
                return modifiedData;
            }

            // Return `null` if the term should not be displayed
            return null;
        }
    }).prop('disabled', disabled).trigger('change');
    $('#' + id).on("change", function(e) {
        $('.input-' + id)[0].value = $(this).val().join(';');
        $('.input-' + id)[0].click()
    });
}

function multiselectIMGpicker(id, value, disabled, FieldValue, FieldIMG, textSmall) {
    $('.' + id).select2({
        theme: "classic",
        templateResult: function formatState(state) {
            if (!state.id) {
                return state.text;
            }
            var opption = _listOpption[id].find(e => e[FieldValue] == state.id);
            var baseUrl = opption[FieldIMG];
            var small = '';
            if (textSmall) small = `<small> - ` + opption[textSmall] + `</small>`;
            var $state = $(
                `<span><img src="` + baseUrl + `" class="img-flag img-selectpicker" />` + state.text + `</span>
                ` + small + `
                `
            );
            return $state;
        }
    }).prop('disabled', disabled).trigger('change');
    $('#' + id).on("change", function(e) {
        $('.input-' + id)[0].value = $(this).val().join(';');
        $('.input-' + id)[0].click()
    });
}

function renderTreeFy_byid(id, data) {
    var t = '';
    for (var i = 0; i < data.length; i++) {
        t += `<tr data-node="treetable-` + data[i]['lv'] +
            `" data-pnode="` + treetable_parent(data[i]['parents']) + `">
            <td><a href="javascript:;" onclick=edittask('` + data[i]['task_code'] + `')>#` + data[i]['key_task'] + `</a></td>
            <td>` + data[i]['title'] + `</td>
            <td style='width: 5%;text-align: center;'>` + data[i]['create_user'] + ` </td>
            <td style='width: 5%;text-align: center;'>` + data[i]['progress'] + `</td>
            <td><a href="javascript:;" onclick="clickAddNewTask('` + data[i]['task_code'] + `')">Thêm</a></td>
        </tr>`
    }
    document.getElementsByClassName('div-striped')[0].innerHTML = `<table class="table table-striped" id="` + id + `">
                <thead>
                    <tr style="text-align: center;">
                        <th style='width: 15%;'>Mã</th>
                        <th style='width: 55%;'>Vấn đề</th>
                        <th style='width: 15%;'>Người thực hiện</th>
                        <th style='width: 10%;'>Tiến độ</th>
                        <th style='width: 5%;'></th>
                    </tr>
                </thead>
                <tbody>` + t + `
                </tbody>
            </table>`
    setTimeout(() => {
        try {
            $("#" + id).treeFy({
                treeColumn: 0
            }).trigger();
        } catch {}
    }, 500);
}

function clickAddNewTask(in_task) {
    $('#add-new-task')[0].value = in_task;
    $('#add-new-task')[0].click();
}

function edittask(code) {
    $('#edit-task')[0].value = code;
    $('#edit-task')[0].click();
}

function renderTreeFy_byclass(c) {
    $(function() {
        $("." + id).treeFy({
            treeColumn: 0
        });
    });
}

function treetable_parent(lv) {
    if (lv > 0)
        return 'treetable-parent-' + lv;
    else
        return '';
}

function renderBarChart(dataJSON, options, idDIV) {
    google.charts.load('current', {
        packages: ['corechart', 'bar']
    });
    google.charts.setOnLoadCallback(function(e) {
        var data = google.visualization.arrayToDataTable(dataJSON);
        var chart = new google.visualization.BarChart(document.getElementById(idDIV));
        chart.draw(data, options);
    });
}

function renderColumnChart(dataJSON, options, idDIV, pie) {
    google.charts.load('current', {
        packages: ['corechart', 'bar']
    });
    google.charts.setOnLoadCallback(function(e) {
        var data = google.visualization.arrayToDataTable(dataJSON);

        var chart = new google.visualization.ColumnChart(document.getElementById(idDIV));

        chart.draw(data, options);

        // Add our selection handler.
        google.visualization.events.addListener(chart, 'select', function(dt = dataJSON, id = idDIV) {
            if (id != 'chart_div_dep') return;
            var selection = chart.getSelection();
            console.log('length', selection.length);
            if (selection.length > 0) {
                document.getElementsByClassName('span-title-department')[1].innerHTML = 'Tiến độ dự án [' + pie['dataJson'][selection[0].row + 1][0] +
                    '] của phòng ban [' + dataJSON[0][selection[0].column] + ']'
                renderPieChart(pie['dataJson'][selection[0].row + 1][selection[0].column], pie['opption'], pie['id'], pie['table'][selection[0].row][selection[0].column]);
            }
            $('#div_Proj_Dep').show('slow')
        });
    });
}

function renderLineChart(dataJSON, options, idDIV) {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(function(e) {
        var data = google.visualization.arrayToDataTable(dataJSON);
        var chart = new google.visualization.LineChart(document.getElementById(idDIV));
        chart.draw(data, options);
    });
}

function renderColumnchart_material(dataJSON, options, idDIV) {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(function(e) {
        var data = google.visualization.arrayToDataTable(dataJSON);
        var chart = new google.charts.Bar(document.getElementById(idDIV));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    });
}

function renderPieChart(dataJSON, options, idDIV, table) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(function(e) {
        var data = google.visualization.arrayToDataTable(dataJSON);
        var chart = new google.visualization.PieChart(document.getElementById(idDIV));
        chart.draw(data, options);
        document.getElementById('tbody-status').innerHTML = table[0] + table[1] + table[2];
        // Add our selection handler.
        google.visualization.events.addListener(chart, 'select', function(dt = dataJSON, id = idDIV, tb = table) {
            var selection = chart.getSelection();
            if (selection.length > 0) {
                document.getElementById('tbody-status').innerHTML = table[selection[0].row];
                console.log(dataJSON)
            }
            $('#div_Proj_Dep').show('slow')
        });
    });
}

var app;

function chooseApp(key) {
    app = key;
    $('#input-app-current')[0].value = app;
    $('#input-app-current').click();
}

function onClickshowSwalApp() {
    $('.div-show-app')[0].click();
}

function showSwalApp(list_apps) {
    let nav_item = '',
        tab_pane = '';
    for (var i = 0; i < list_apps.length; i++) {
        nav_item += `
            <li class="nav-item">
                <a class="nav-link ` + (list_apps[i].key_app == $('#input-app-current')[0].value ? 'active show' : '') + `" onclick="chooseApp('` + list_apps[i].key_app + `')" data-toggle="tab" href="#link` + i + `" role="tablist">
                    <img width="50" src="` + list_apps[i].icon + `" />` + list_apps[i].name + `
                </a>
            </li>
        `
        tab_pane += `<div class="tab-pane ` + (list_apps[i].key_app == $('#input-app-current')[0].value ? 'active show' : '') + `" id="link` + i + `">
                        <div class="card">
                            <div class="card-body">
                            ` + list_apps[i].description + `
                            </div>
                        </div>
                    </div>`
    }
    swal({
        title: 'Danh sách app',
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        html: `<div class="page-categories">
        <ul class="nav nav-pills nav-pills-success nav-pills-icons justify-content-center" role="tablist">
            ` + nav_item + `
        </ul>
        <div class="tab-content tab-space tab-subcategories">
            ` + tab_pane + `
        </div>
    </div>`
    }).catch(swal.noop).then((result) => {
        if (app) location.href = '/';
    });
}

function initCharts() {
    if ($('#roundedLineChart').length != 0 && $('#straightLinesChart').length != 0 && $('#colouredBarsChart').length != 0 && $('#simpleBarChart').length != 0) {
        /* ----------==========    Rounded Line Chart initialization    ==========---------- */


        dataColouredRoundedLineChart = {
            labels: ['\'06', '\'07', '\'08', '\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
            series: [
                [287, 480, 290, 554, 690, 690, 500, 752, 650, 900, 944]
            ]
        };

        optionsColouredRoundedLineChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 10
            }),
            axisY: {
                showGrid: true,
                offset: 40
            },
            axisX: {
                showGrid: false,
            },
            low: 0,
            high: 1000,
            showPoint: true,
            height: '300px'
        };


        var colouredRoundedLineChart = new Chartist.Line('#colouredRoundedLineChart', dataColouredRoundedLineChart, optionsColouredRoundedLineChart);

        md.startAnimationForLineChart(colouredRoundedLineChart);




        var multipleBarsChart = Chartist.Bar('#multipleBarsChart', dataMultipleBarsChart, optionsMultipleBarsChart, responsiveOptionsMultipleBarsChart);

        //start animation for the Emails Subscription Chart
        md.startAnimationForBarChart(multipleBarsChart);
    }

}

function renderStraightLinesChart(labels, series) {
    /*  **************** Straight Lines Chart - single line with points ******************** */
    let high = 50;
    if (Math.max(series) + 20 > high) high = Math.max(series) + 20;
    dataStraightLinesChart = {
        labels: labels,
        series: [
            series
        ]
    };

    optionsStraightLinesChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: high, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        classNames: {
            point: 'ct-point ct-white',
            line: 'ct-line ct-white'
        }
    }

    var straightLinesChart = new Chartist.Line('#straightLinesChart', dataStraightLinesChart, optionsStraightLinesChart);

    md.startAnimationForLineChart(straightLinesChart);

    /*  **************** Coloured Rounded Line Chart - Line Chart ******************** */
}

function renderRoundedLineChart(labels, series) {
    let serie = [series.mo, series.tu, series.we, series.th, series.fr, series.sa, series.su];
    let high = 50;
    if (Math.max(serie) + 20 > high) high = Math.max(serie) + 20;
    dataRoundedLineChart = {
        labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        series: [
            serie
        ]
    };

    optionsRoundedLineChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 10
        }),
        axisX: {
            showGrid: false,
        },
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        showPoint: false
    }

    var RoundedLineChart = new Chartist.Line('#roundedLineChart', dataRoundedLineChart, optionsRoundedLineChart);

    md.startAnimationForLineChart(RoundedLineChart);
}

function renderSimpleBarChart(labels, series) {
    let serie = [series.jan, series.feb, series.mar, series.apr, series.mai, series.jun, series.jul, series.aug, series.sep, series.oct, series.nov, series.dec]
    let high = 50;
    if (Math.max(serie) + 20 > high) high = Math.max(serie) + 20;
    var dataSimpleBarChart = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            serie
        ]
    };

    var optionsSimpleBarChart = {
        seriesBarDistance: 10,
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 50,
    };

    var responsiveOptionsSimpleBarChart = [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value[0];
                }
            }
        }]
    ];

    var simpleBarChart = Chartist.Bar('#simpleBarChart', dataSimpleBarChart, optionsSimpleBarChart, responsiveOptionsSimpleBarChart);

    //start animation for the Emails Subscription Chart
    md.startAnimationForBarChart(simpleBarChart);

}

function renderColouredBarsChart(data) {
    /*  **************** Coloured Rounded Line Chart - Line Chart ******************** */
    var high = 50;
    if (Math.max(data.series[0]) + 35 > high) high = Math.max(data.series[0]) + 35;
    if (Math.max(data.series[1]) + 35 > high) high = Math.max(data.series[1]) + 35;
    if (Math.max(data.series[2]) + 35 > high) high = Math.max(data.series[2]) + 35;
    if (Math.max(data.series[3]) + 35 > high) high = Math.max(data.series[3]) + 35;
    if (Math.max(data.series[4]) + 35 > high) high = Math.max(data.series[4]) + 35;
    if (Math.max(data.series[5]) + 35 > high) high = Math.max(data.series[5]) + 35;
    if (Math.max(data.series[6]) + 35 > high) high = Math.max(data.series[6]) + 35;
    if (Math.max(data.series[7]) + 35 > high) high = Math.max(data.series[7]) + 35;
    if (Math.max(data.series[8]) + 35 > high) high = Math.max(data.series[8]) + 35;
    if (Math.max(data.series[9]) + 35 > high) high = Math.max(data.series[9]) + 35;
    if (Math.max(data.series[10]) + 35 > high) high = Math.max(data.series[10]) + 35;
    if (Math.max(data.series[11]) + 35 > high) high = Math.max(data.series[11]) + 35;
    let serie = [];
    if (data.series[0]) serie.push(data.series[0])
    if (data.series[1]) serie.push(data.series[1])
    if (data.series[2]) serie.push(data.series[2])
    if (data.series[3]) serie.push(data.series[3])
    if (data.series[4]) serie.push(data.series[4])
    if (data.series[5]) serie.push(data.series[5])
    if (data.series[6]) serie.push(data.series[6])
    if (data.series[7]) serie.push(data.series[7])
    if (data.series[8]) serie.push(data.series[8])
    if (data.series[9]) serie.push(data.series[9])
    if (data.series[10]) serie.push(data.series[10])
    if (data.series[11]) serie.push(data.series[11])
    dataColouredBarsChart = {
        labels: data.labels,
        series: serie
    };

    optionsColouredBarsChart = {
        lineSmooth: false,
        axisY: {
            showGrid: true,
            offset: 40
        },
        axisX: {
            showGrid: false,
        },
        stackBars: true,
        low: 0,
        high: high,
        showPoint: true,
        height: '350px'
    };

    var colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart, optionsColouredBarsChart);

    md.startAnimationForLineChart(colouredBarsChart);
}

function renderSalesBarsChart(labels, series) {
    /*  **************** Coloured Rounded Line Chart - Line Chart ******************** */

    dataColouredBarsChart = {
        labels: labels, // ['\'06', '\'07', '\'08', '\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
        series: [
            series //[287, 480, 290, 554, 690, 690, 500, 752, 650, 900, 944]
        ]
    };

    optionsColouredBarsChart = {
        lineSmooth: false,
        axisY: {
            showGrid: true,
            offset: 40
        },
        axisX: {
            showGrid: false,
        },
        stackBars: true,
        low: 0,
        high: 50,
        showPoint: true,
        height: '350px'
    };

    var colouredBarsChart = new Chartist.Line('#salesBarsChart', dataColouredBarsChart, optionsColouredBarsChart);

    md.startAnimationForLineChart(colouredBarsChart);
}

function renderPieChartProject(labels, series) {

    /*  **************** Public Preferences - Pie Chart ******************** */
    var dataPreferences = {
        labels: labels, //['62%', '32%', '6%'],
        series: series, //[62, 32, 6]
        color: ["#ff9800", "#4caf50", "#00bcd4"]
    };

    var optionsPreferences = {
        height: '287px'
    };

    Chartist.Pie('#PieChartProject', dataPreferences, optionsPreferences);

    /*  **************** Simple Bar Chart - barchart ******************** */
}

function renderPieChartSales(labels, series) {

    /*  **************** Public Preferences - Pie Chart ******************** */
    var dataPreferences = {
        labels: labels, //,['62%', '32%', '6%']
        series: series, //[62, 32, 6]
        color: ["#ff9800", "#4caf50"]
    };

    var optionsPreferences = {
        height: '287px'
    };

    Chartist.Pie('#PieChartSales', dataPreferences, optionsPreferences);

    /*  **************** Simple Bar Chart - barchart ******************** */
}

function renderPieChartTask(data) {
    /*  **************** Public Preferences - Pie Chart ******************** */
    var dataPreferences = {
        // labels: ['62%', '32%', '6%'],
        // series: [62, 32, 6]  
        labels: data.labels,
        series: data.series
    };

    var optionsPreferences = {
        height: '287px',
        color: ['#FF721C', '#FFEE1C', '#BEFF1C', '#23FF1C', '#1CFFBE', '#1CFFF1', '#1CC1FF', '#1F1CFF', '#6B1CFF', '#9F1CFF', '#FF1CCB', '#FF1C2A', '#922B21', '#4A235A', '#1B4F72', '#0E6251', '#145A32', '#7D6608', '#784212', '#7B7D7D', '#17202A', '#17202A']
    };

    Chartist.Pie('#PieChartTask', dataPreferences, optionsPreferences);

    /*  **************** Simple Bar Chart - barchart ******************** */
}

function RenderDataTableDashboardWorkFlow() {
    $('#datatables').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [
            [5, 10, 25, 50, -1],
            [5, 10, 25, 50, "All"]
        ],
        responsive: true,
        searching: false,
        bLengthChange: false,
        paging: true
    });

    var table = $('#datatable').DataTable();

    // Edit record
    table.on('click', '.edit', function() {
        $tr = $(this).closest('tr');
        var data = table.row($tr).data();
        alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
    });

    // Delete a record
    table.on('click', '.remove', function(e) {
        $tr = $(this).closest('tr');
        table.row($tr).remove().draw();
        e.preventDefault();
    });

    //Like record
    table.on('click', '.like', function() {
        alert('You clicked on Like button');
    });
}

function setFormValidation(id) {
    $(id).validate({
        highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
            $(element).closest('.form-check').removeClass('has-success').addClass('has-danger');
        },
        success: function(element) {
            $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
            $(element).closest('.form-check').removeClass('has-danger').addClass('has-success');
        },
        errorPlacement: function(error, element) {
            $(element).closest('.form-group').append(error);
        },
    });
}

function openNewtag(url) {
    window.open(url, '_blank');
}
var _history_checkin_employee_code, _history_checkin_day

function LoadHistoryCheckin(employee_code, day) {
    _history_checkin_employee_code = employee_code;
    _history_checkin_day = day;
    $('#history_checkin')[0].click()
}

function exportTable2excel(tableID, name = '') {
    $('#' + tableID).table2excel({
        exclude: ".noExl",
        name: name,
        filename: name + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".xls",
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        preserveColors: true
    });
}

function exportTableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}

function onClickWT(param) {
    $('#wt-param').val(param);
    setTimeout(() => {
        $('#wt-param')[0].click();
    }, 10);
}

function renderChartWT(data) {
    try {
        google.charts.load('current', {
            'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(drawVisualization(data));
    } catch {}
}

function drawVisualization(data) {
    // Some raw data (not necessarily accurate)
    try {
        let arr = [
            ['Day', 'Thời gian logtime', 'Công chuẩn (9h)']
        ].concat(data)
        var data = google.visualization.arrayToDataTable(arr);
        var options = {
            title: 'Năng suất nhân viên theo ngày',

            seriesType: 'bars',
            series: {
                1: {
                    type: 'line'
                }
            },
            legend: {
                position: 'top'
            }
        };


        var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    } catch {}
}