var EditPageState = {
    add: "Add",
    edit: "Edit",
    view: "View",
    viewDetail: "ViewDetail",
    delete: "Delete",
    save: "Save",
    search: "Search"
}
let list_col_model = {}
let list_data_add = {}

function conver_width(input, min_width) {
    let padding = 0.03;
    var total = 0;
    min_width = min_width > $('.card-component').width() ? min_width : $('.card-component').width()
    input.forEach(element => {
        if (!element.hidden) {
            total += element.width;
        }
    });
    if (total > 100) total = 100;
    input.forEach(element => {
        let w = ((element.width / total)) * min_width;
        element.width = parseInt(w - (w * padding));
    });
    return input;
}

function setData(gridData, table, col_model, footerrow = false, timeout = 0) {
    setTimeout(() => {
        list_col_model[table] = col_model;
        list_data_add[table] = gridData;
        var id = "#jqGrid_" + table;
        jQuery(id).jqGrid('clearGridData');
        $(id).jqGrid('setGridParam', { data: gridData }).trigger('reloadGrid');
        if (footerrow) LoadFooter(gridData, col_model, table);
    }, timeout);
}

function render_jqgrid(data, col_model, table, min_width = $('.card-component').width(), grouping = false, rowNum = 20, groupField = []) {
    var id = "#jqGrid_" + table,
        Pager = "#jqGridPager_" + table;
    $(id.trim()).jqGrid({
        data: data,
        styleUI: 'Bootstrap',
        datatype: "local",
        colModel: conver_width(col_model, min_width),
        viewrecords: true,
        height: 450,
        width: $('.card-component').width() * 0.995,
        rowNum: rowNum,
        pager: Pager.trim(),
        rowList: [20, 30, 50, 100, 200, 500, 1000],
        rownumbers: true,
        rownumWidth: 40,
        shrinkToFit: false,
        multiselect: false,
        grouping: grouping,
        groupingView: {
            groupField: groupField,
            groupColumnShow: [true],
            groupText: ["<b style='font-weight:bold'>{0}</b>"],
            groupOrder: ["asc"],
            groupSummary: [true],
            groupCollapse: false
        },
        onSelectRow: function(a, b, c) {
            $('.jqgrow.ui-row-ltr').removeClass('success');
            $('#' + a).addClass('success')
            $('.id-selected-' + table)[0].value = a;
            $('.id-selected-' + table)[0].click();
            if (this.p.selarrrow.length === currids.length) {
                $('#cb_' + $.jgrid.jqID(this.p.id), this.grid.hDiv)[this.p.useProp ? 'prop' : 'attr']("checked", false);
            }
        },
        gridComplete: function() {
            currids = $(this).jqGrid('getDataIDs');
            $('.glyphicon-forward').html('fast_forward');
            $('.glyphicon-step-forward').html('skip_next');
            $('.glyphicon-backward').html('fast_rewind');
            $('.glyphicon-step-backward').html('skip_previous');
            FncAfterloadComplete_List(data, col_model, table);
            var colModel = conver_width(col_model);
            $(window).on('resize', function() {
                // if ($('.router-outlet-content').width() < $(id.trim()).width())
                //     $(id.trim()).jqGrid('setGridWidth', $(id.trim()).width(), true);
            })

        }
    });

}

function hideGroupHeaders(grid) {
    var i, names = grid.p.groupingView.groups,
        l = names.length,
        $grp, j;
    for (i = 0; i < l; i++) {
        $grp = $('#' + grid.id + "ghead_0_" + i);
        if (names[i].value === '') {
            $grp.hide();
        } else {
            // hide the grouping row
            $(grid).jqGrid('groupingToggle', grid.id + "ghead_0_" + i);
            for (j = 0; j < names[i].cnt; j++) {
                $(grid.rows[$grp[0].rowIndex + 1 + j]).addClass("grouppedRows");
            }
        }
    }
}

function getSelectedRows(table) {
    var grid = $("#jqGrid_" + table);
    return grid.getGridParam("selarrrow");
}


//begin edit ==========================================================================================================

function render_jqgrid_edit(data, col_model, table, footerrow = false, minHiehgt, rowNum = 20) {
    var footer = footerrow;
    if ($('.form-jqgrid-edit').width() == 0) {
        setTimeout(() => {
            render_jqgrid_edit(data, col_model, table, footer, minHiehgt);
        }, 500);
    } else {
        list_col_model[table] = col_model;
        var id = "#jqGrid_" + table,
            Pager = "#jqGridPager_" + table;
        $(id.trim()).jqGrid({
            data: data,
            styleUI: 'Bootstrap',
            datatype: "local",
            colModel: conver_width_edit(col_model),
            viewrecords: true,
            height: minHiehgt,
            width: Math.abs($('.form-jqgrid-edit').width()),
            shrinkToFit: false,
            footerrow: footerrow,
            userDataOnFooter: footerrow,
            rowNum: rowNum,
            pager: Pager.trim(),
            rowList: [20, 30, 50, 100, 200, 500, 1000],
            rownumbers: true,
            rownumWidth: 40,
            multiselect: true,
            loadComplete: function() {
                addNavButtonAdd(table);
                var $this = $(this),
                    ids = $this.jqGrid('getDataIDs'),
                    i, l = ids.length;
                $this.hide();
                for (i = l - 1; i > -1; i--) {
                    $this.jqGrid('editRow', ids[i], true);
                    updateTypeInput2(table, ids[i])
                }
                $this.show();
                FncAfterloadComplete_Edit(data, col_model, table);
            },
            onSelectRow: function(a, b, c) {
                $('.id-selected-' + table)[0].value = a;
                $('.id-selected-' + table)[0].click();
                if (this.p.selarrrow.length === currids.length) {
                    $('#cb_' + $.jgrid.jqID(this.p.id), this.grid.hDiv)[this.p.useProp ? 'prop' : 'attr']("checked", true);
                }
                $(id).jqGrid('editRow', a, { keys: true });
                updateTypeInput2(table, a)
            },
            gridComplete: function() {
                currids = $(this).jqGrid('getDataIDs');
                $('.glyphicon-forward').html('fast_forward');
                $('.glyphicon-step-forward').html('skip_next');
                $('.glyphicon-backward').html('fast_rewind');
                $('.glyphicon-step-backward').html('skip_previous');
            }
        });
    }
}

function FncAfterloadComplete_List(data, col_model, table) {
    // if (table == 'HRM_Project_Management_Task') {
    //     customField_HRM_Project_Management_Task();
    // }
}

function FncAfterloadComplete_Edit(data, col_model, table) {
    if (table == 'HRM_Project_Management_Task_LogTime_Detail') {
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail', 'mo');
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail', 'tu');
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail', 'we');
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail', 'th');
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail', 'fr');
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail', 'sa');
        refreshFooter('HRM_Project_Management_Task_LogTime_Detail', 'su');
    }
}

function refreshFooter(table, colName) {
    var t = 0,
        total = 0;
    // $('td[aria-describedby="jqGrid_' + table + '_' + colName + '"] input').each(function() {
    //     t += parseFloat($(this).val() == "" ? "0" : $(this).val());
    // });
    // $('.footrow td[aria-describedby="jqGrid_' + table.trim() + '_' + colName + '"]').html(t);
    var colModel = list_col_model[table];
    colModel.forEach(col => {
        if (col['summaryType'] == 'sum') {
            var t = 0;
            $('td[aria-describedby="jqGrid_' + table + '_' + col['name'] + '"] input').each(function() {
                t += parseFloat($(this).val() == "" ? "0" : $(this).val());
            });
            total += t;
            $('.footrow td[aria-describedby="jqGrid_' + table.trim() + '_' + col['name'] + '"]').html(t);
        }
    })
    $('.footrow td[aria-describedby="jqGrid_' + table.trim() + '_task_code"]').html('Total: ' + total);
}

function LoadFooter(data, col_model, table) {
    var obj = {};
    var total = 0;
    col_model.forEach(col => {
        if (col['summaryType'] == 'sum') {
            if (data.length == 0) obj[col['name']] = 0;
            else {
                var t = 0;
                $('td[aria-describedby="jqGrid_' + table + '_' + col['name'] + '"] input').each(function() {
                    t += parseFloat($(this).val() == "" ? "0" : $(this).val());
                });
                total += t;
                $('.footrow td[aria-describedby="jqGrid_' + table.trim() + '_' + col['name'] + '"]').html(t);
            }
        }
    })
    $('.footrow td[aria-describedby="jqGrid_' + table.trim() + '_task_code"]').html('Total: ' + total);
    // $("#jqGrid_" + table.trim()).jqGrid("footerData", "set", {
    //     obj
    // });
}

function updateTypeInput(table, id) {
    // var colModel = $("#jqGrid_" + table.trim()).jqGrid('getGridParam', 'colModel');
    var colModel = list_col_model[table];
    var disabled = (getCurrentForm() == EditPageState.viewDetail);
    colModel.forEach(col => {
        var _id = '#' + id + '_' + col.name;
        if (col.sorttype) {
            switch (col.sorttype) {
                case 'int':
                    $(_id)[0].type = 'number';
                    break;
                case 'checkbox':
                    var v = false;
                    try {
                        v = $(_id)[0].value;
                        $(_id)[0].type = 'checkbox';
                    } catch {}

                    if (v == 'true') $(_id)[0].checked = true;
                    break;
                case 'select':
                    if ($('select.' + _id.replace('#', '') + '-basic-multiple').length > 0) return;
                    var v = '',
                        opption = '<option value="" >---Chọn---</option>';
                    try {
                        v = $(_id)[0].value;
                    } catch {}
                    if (col.editoptions.value != null) {
                        col.editoptions.value.forEach(o => {
                            var s = '';
                            if (v == o[col.editoptions['fieldvalue'] ? col.editoptions['fieldvalue'] : 'code']) s = 'selected';
                            opption += '<option value="' + (o[col.editoptions['fieldvalue'] ? col.editoptions['fieldvalue'] : 'code']) + '" ' + s + '>' + o[col.editoptions['fielddisplay'] ? col.editoptions['fielddisplay'] : 'name'] + '</option>'
                        })
                    }
                    $('#' + id + ' td[aria-describedby="jqGrid_' + table + '_' + col.name + '"]').html(`<select id="` + _id.replace('#', '') + `" class="` + _id.replace('#', '') + `-basic-multiple ` + _id.replace('#', '') + `" name="` + col.name + `">
                    ` + opption + `
                    </select>`);
                    $('.' + _id.replace('#', '') + '-basic-multiple').select2({ theme: "classic" });
                    break;
                case 'multiselect':
                    if ($('select.' + _id.replace('#', '') + '-basic-multiple').length > 0) return;
                    var v = [''],
                        opption = '';
                    try {
                        v = $(_id)[0].value.split(';');
                    } catch {}
                    if (col.editoptions.value != null) {
                        col.editoptions.value.forEach(o => {
                            var s = '';
                            // if (v.includes(o.code)) s = 'selected';
                            opption += '<option value="' + (o[col.editoptions['fieldvalue'] ? col.editoptions['fieldvalue'] : 'code']) + '" ' + s + '>' + o[col.editoptions['fielddisplay'] ? col.editoptions['fielddisplay'] : 'name'] + '</option>'
                        })
                    }
                    $('#' + id + ' td[aria-describedby="jqGrid_' + table + '_' + col.name + '"]').html(`<select id="` + _id.replace('#', '') + `" class="` + _id.replace('#', '') + `-basic-multiple ` + _id.replace('#', '') + `" name="` + col.name + `" multiple="multiple">
                    ` + opption + `
                    </select>`);
                    // $('.' + _id.replace('#', '') + '-basic-multiple').select2({ theme: "classic" });
                    $('.' + _id.replace('#', '') + '-basic-multiple').select2({ theme: "classic" }).trigger('change');;
                    $('.' + _id.replace('#', '') + '-basic-multiple').val(v);
                    $('.' + _id.replace('#', '') + '-basic-multiple').trigger('change');
                    break;
                case 'date':
                    if ($('.' + _id.replace('#', '') + '-datepicker').length > 0) return;
                    var v = null;
                    try {
                        var t = new Date($(_id)[0].value);
                        v = t.getDate() + '/' + (t.getMonth() + 1) + '/' + t.getFullYear();
                    } catch {}
                    $('#' + id + ' td[aria-describedby="jqGrid_' + table + '_' + col.name + '"]').
                    html(`<input id="` + _id.replace('#', '') + `" type="text" name="` + col.name + `" class="form-group form-control datepicker ` + _id.replace('#', '') + `-datepicker ` + _id.replace('#', '') + `"  value="` + v + `">`);
                    $('.' + _id.replace('#', '') + '-datepicker').datetimepicker({
                        format: "DD/MM/YYYY",
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
                    break;
                case 'datetime':
                    if ($('.' + _id.replace('#', '') + '-datepicker').length > 0) return;
                    var v = null;
                    try {
                        var t = new Date($(_id)[0].value);
                        v = t.getDate() + '/' + (t.getMonth() + 1) + '/' + t.getFullYear();
                    } catch {}
                    $('#' + id + ' td[aria-describedby="jqGrid_' + table + '_' + col.name + '"]').
                    html(`<input id="` + _id.replace('#', '') + `" type="text" name="` + col.name + `" class="form-group form-control datepicker ` + _id.replace('#', '') + `-datepicker ` + _id.replace('#', '') + `"  value="` + v + `">`);
                    $('.' + _id.replace('#', '') + '-datepicker').datetimepicker({
                        format: "DD/MM/YYYY",
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
                    break;
                case 'time':
                    if ($('.' + _id.replace('#', '') + '-datepicker').length > 0) return;
                    var v = null;
                    try {
                        var t = new Date($(_id)[0].value);
                        v = t.getDate() + '/' + (t.getMonth() + 1) + '/' + t.getFullYear();
                    } catch {}
                    $('#' + id + ' td[aria-describedby="jqGrid_' + table + '_' + col.name + '"]').
                    html(`<input id="` + _id.replace('#', '') + `" type="text" name="` + col.name + `" class="form-group form-control datepicker ` + _id.replace('#', '') + `-datepicker ` + _id.replace('#', '') + `"  value="` + v + `">`);
                    $('.' + _id.replace('#', '') + '-datepicker').datetimepicker({
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
                    break;
                case 'money':
                    $(_id).addClass('money')
                    var options = {
                        reverse: true
                    };
                    $(_id).mask('#,##0', options);
                    $(_id).on('change', function(e) {
                        $('#' + e.currentTarget.id).val($('#' + e.currentTarget.id).masked($('#' + e.currentTarget.id).val()));
                    });
                    break;
            }
        }
        $(_id).attr('disabled', disabled);
    })
}

function updateTypeInput2(table, id) {
    // var colModel = $("#jqGrid_" + table.trim()).jqGrid('getGridParam', 'colModel');
    var colModel = list_col_model[table];
    var disabled = (getCurrentForm() == EditPageState.viewDetail);
    colModel.forEach(col => {
        var _id = '#' + id + '_' + col.name;
        var checkType = false;
        if (col.sorttype) {
            switch (col.sorttype) {
                case 'int':
                    $(_id)[0].type = 'number';
                    $(_id).on("change", function() {
                        UpdateDataGrid(table, this, 'int');
                        debugger;
                    })
                    checkType = true;
                    break;
                case 'checkbox':
                    var v = false;
                    try {
                        v = $(_id)[0].value;
                        $(_id)[0].type = 'checkbox';
                    } catch {}

                    if (v == 'true') $(_id)[0].checked = true;
                    $(_id).on("change", function() {
                        UpdateDataGrid(table, this, 'checkbox');
                        debugger;
                    })
                    checkType = true;
                    break;
                case 'select':
                    if ($('select.' + _id.replace('#', '') + '-basic-multiple').length > 0) return;
                    var v = '',
                        opption = '<option value="" >---Chọn---</option>';
                    try {
                        v = $(_id)[0].value;
                    } catch {}
                    if (col.editoptions.value != null) {
                        col.editoptions.value.forEach(o => {
                            var s = '';
                            if (v == o[col.editoptions['fieldvalue'] ? col.editoptions['fieldvalue'] : 'code']) s = 'selected';
                            opption += '<option value="' + (o[col.editoptions['fieldvalue'] ? col.editoptions['fieldvalue'] : 'code']) + '" ' + s + '>' + o[col.editoptions['fielddisplay'] ? col.editoptions['fielddisplay'] : 'name'] + '</option>'
                        })
                    }
                    $('#' + id + ' td[aria-describedby="jqGrid_' + table + '_' + col.name + '"]').html(`<select id="` + _id.replace('#', '') + `" class="` + _id.replace('#', '') + `-basic-multiple ` + _id.replace('#', '') + `" name="` + col.name + `">
                    ` + opption + `
                    </select>`);
                    $('.' + _id.replace('#', '') + '-basic-multiple').select2({ theme: "classic" });
                    $('.' + _id.replace('#', '') + '-basic-multiple').on("change", function() {
                        UpdateDataGrid(table, this, 'select');
                        debugger;
                    })
                    checkType = true;
                    break;
                case 'multiselect':
                    if ($('select.' + _id.replace('#', '') + '-basic-multiple').length > 0) return;
                    var v = [''],
                        opption = '';
                    try {
                        v = $(_id)[0].value.split(';');
                    } catch {}
                    if (col.editoptions.value != null) {
                        col.editoptions.value.forEach(o => {
                            var s = '';
                            // if (v.includes(o.code)) s = 'selected';
                            opption += '<option value="' + (o[col.editoptions['fieldvalue'] ? col.editoptions['fieldvalue'] : 'code']) + '" ' + s + '>' + o[col.editoptions['fielddisplay'] ? col.editoptions['fielddisplay'] : 'name'] + '</option>'
                        })
                    }
                    $('#' + id + ' td[aria-describedby="jqGrid_' + table + '_' + col.name + '"]').html(`<select id="` + _id.replace('#', '') + `" class="` + _id.replace('#', '') + `-basic-multiple ` + _id.replace('#', '') + `" name="` + col.name + `" multiple="multiple">
                    ` + opption + `
                    </select>`);
                    // $('.' + _id.replace('#', '') + '-basic-multiple').select2({ theme: "classic" });
                    $('.' + _id.replace('#', '') + '-basic-multiple').select2({ theme: "classic" }).trigger('change');;
                    $('.' + _id.replace('#', '') + '-basic-multiple').val(v);
                    $('.' + _id.replace('#', '') + '-basic-multiple').trigger('change');
                    $('.' + _id.replace('#', '') + '-basic-multiple').on("change", function() {
                        UpdateDataGrid(table, this, 'multiselect');
                        debugger;
                    })
                    checkType = true;
                    break;
                case 'date':
                    if ($('.' + _id.replace('#', '') + '-datepicker').length > 0) return;
                    var v = null;
                    try {
                        var t = new Date($(_id)[0].value);
                        v = t.getDate() + '/' + (t.getMonth() + 1) + '/' + t.getFullYear();
                    } catch {}
                    $('#' + id + ' td[aria-describedby="jqGrid_' + table + '_' + col.name + '"]').
                    html(`<input id="` + _id.replace('#', '') + `" type="text" name="` + col.name + `" class="form-group form-control datepicker ` + _id.replace('#', '') + `-datepicker ` + _id.replace('#', '') + `"  value="` + v + `">`);
                    $('.' + _id.replace('#', '') + '-datepicker').datetimepicker({
                        format: "DD/MM/YYYY",
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
                        UpdateDataGrid(table, this, 'date');
                        debugger;
                    })
                    checkType = true;
                    break;
                case 'datetime':
                    if ($('.' + _id.replace('#', '') + '-datepicker').length > 0) return;
                    var v = null;
                    try {
                        var t = new Date($(_id)[0].value);
                        v = t.getDate() + '/' + (t.getMonth() + 1) + '/' + t.getFullYear();
                    } catch {}
                    $('#' + id + ' td[aria-describedby="jqGrid_' + table + '_' + col.name + '"]').
                    html(`<input id="` + _id.replace('#', '') + `" type="text" name="` + col.name + `" class="form-group form-control datepicker ` + _id.replace('#', '') + `-datepicker ` + _id.replace('#', '') + `"  value="` + v + `">`);
                    $('.' + _id.replace('#', '') + '-datepicker').datetimepicker({
                        format: "DD/MM/YYYY",
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
                        UpdateDataGrid(table, this, 'datetime');
                        debugger;
                    });
                    checkType = true;
                    break;
                case 'time':
                    if ($('.' + _id.replace('#', '') + '-datepicker').length > 0) return;
                    var v = null;
                    try {
                        var t = new Date($(_id)[0].value);
                        v = t.getDate() + '/' + (t.getMonth() + 1) + '/' + t.getFullYear();
                    } catch {}
                    $('#' + id + ' td[aria-describedby="jqGrid_' + table + '_' + col.name + '"]').
                    html(`<input id="` + _id.replace('#', '') + `" type="text" name="` + col.name + `" class="form-group form-control datepicker ` + _id.replace('#', '') + `-datepicker ` + _id.replace('#', '') + `"  value="` + v + `">`);
                    $('.' + _id.replace('#', '') + '-datepicker').datetimepicker({
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
                    }).on("dp.change", function() {
                        UpdateDataGrid(table, this, 'time');
                        debugger;
                    })
                    checkType = true;
                    break;
                case 'money':
                    $(_id).addClass('money')
                    var options = {
                        reverse: true
                    };
                    $(_id).mask('#,##0', options);
                    $(_id).on('change', function(e) {
                        $('#' + e.currentTarget.id).val($('#' + e.currentTarget.id).masked($('#' + e.currentTarget.id).val()));
                        UpdateDataGrid(table, this, 'money');
                    });
                    checkType = true;
                    break;
            }
        }
        if (!checkType) {
            $(_id).on("change", function() {
                UpdateDataGrid(table, this, '');
                debugger;
            })
        }
        $(_id).attr('disabled', disabled);
    })
}

function UpdateDataGrid(table, event, sorttype) {
    var value;
    switch (sorttype) {
        case 'select':
            value = event.value;
            break;
        case 'multiselect':
            value = $(event).val().join(';');
            break;
        case 'checkbox':
            value = event.checked
            break;
        case 'int':
            if (event.value == "")
                value = 0;
            else
                value = Number(event.value);
            break;
        case 'datetime':
            if (event.value == "")
                value = undefined;
            break;
        case 'date':
            if (event.value == "")
                value = undefined;
            else {
                var v = event.value;
                value = new Date(Number(v.split('/')[2]), Number(v.split('/')[1]) - 1, Number(v.split('/')[0]), 0, 0, 0, 0);
            }
            break;
        case 'time':
            if (event.value == "")
                value = undefined;
            break;
        case 'money':
            if (event.value == "")
                value = 0;
            else
                value = Number(event.value.replaceAll(',', ''));
            break;
        default:
            value = event.value;
            break;
    }
    var code = event.id.replace('_' + event.name, '');
    var index = list_data_add[table].findIndex(e => e.code == code)
    if (index >= 0)
        list_data_add[table][index][event.name] = value
    else {
        var colModel = list_col_model[table];
        var obj = {};
        colModel.forEach(col => {
            obj[col['name']] = undefined;
        })
        obj[event.name] = value;
        obj['code'] = code;
        obj['id'] = -1;
        list_data_add[table].push(obj);
    }
}

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        console.log(collapse);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos);
}

function editRow(id) {
    if (id && id !== lastSelection) {
        var grid = $("#jqGrid");
        grid.jqGrid('restoreRow', lastSelection);
        grid.jqGrid('editRow', id, { keys: true });
        lastSelection = id;
    }
}

function conver_width_edit(input) {
    if ($('.form-jqgrid-edit').width() == 0) {
        setTimeout(() => {
            conver_width_edit(input);
        }, 500);
    } else {
        let width_screem = $('.form-jqgrid-edit').width(),
            padding = 0.0225;
        var total = 0;
        input.forEach(element => {
            if (!element.hidden) {
                total += element.width;
            }
            // element.editable ? element.editable = (getCurrentForm() != EditPageState.viewDetail) : element.editable = element.editable
        });
        if (total > 100) total = 100;
        input.forEach(element => {
            let w = (element.width / total) * width_screem;
            element.width = parseInt(w - (w * padding));
        });
    }

    return input;
}

function getCurrentForm() {
    return $('#inputCurrentForm').val();
}

function addNavButtonAdd(table) {
    if (getCurrentForm() != EditPageState.viewDetail) {
        $('#jqGridPager_' + table.trim() + '_left').html(`<div>
                <a style="padding: 5px 5px;" href="javascript:addRowData('` + table + `');"><span class="material-icons"> add </span>Thêm</a> 
                <a style="padding: 5px 5px;" href="javascript:;"><span class="material-icons"> edit </span>Sửa</a>
                <a style="padding: 5px 5px;" href="javascript:deleteData('` + table + `');"><span class="material-icons"> delete </span>Xóa</a>
                <a style="padding: 5px 5px;" href="javascript:;"><span class="material-icons"> file_copy </span>Copy</a>
            </div>`)
            // $('#jqGridPager_' + table.trim() + '_left').html(`<div>
            //     <button class="btn btn-success" style="padding: 5px 5px;" onclick="addRowData('` + table + `')"><span class="material-icons"> add </span>Thêm</button> 
            //     <button class="btn btn-warning" style="padding: 5px 5px;"><span class="material-icons"> edit </span>Sửa</button>
            //     <button class="btn btn-danger" style="padding: 5px 5px;" onclick="$('#div-delete-` + table + `').click()"><span class="material-icons"> delete </span>Xóa</button>
            //     <button class="btn btn-info" style="padding: 5px 5px;"><span class="material-icons"> file_copy </span>Copy</button>
            // </div>`)
    } else
        $('#jqGridPager_' + table.trim() + '_left').html('')
}

function getAllData(table) {
    var colModel = list_col_model[table];
    var list_tr = $('#jqGrid_' + table.trim() + ' tbody tr'); //1->n
    var result = [];
    for (var i = 1; i < list_tr.length; i++) {
        var list_td = list_tr[i].children,
            data = {};
        if (list_td.length) {
            for (var j = 3; j < list_td.length; j++) {
                // if (list_td[j].children.length == 0) break;
                if (!data['code']) data['code'] = list_tr[i].id;
                var colName = '';
                if (list_td[j].children[0]) colName = list_td[j].children[0].name;
                if (colName != '' && colModel.find(e => e['name'] == colName) && colModel.find(e => e['name'] == colName)['editable'] && !colModel.find(e => e['name'] == colName)['hidden']) {
                    var sorttype = colModel.find(e => e['name'] == colName)['sorttype'];
                    switch (sorttype) {
                        case 'select':
                            data[list_td[j].children[0].name] = $('#' + list_td[j].children[0].id).val();
                            break;
                        case 'multiselect':
                            data[list_td[j].children[0].name] = $('#' + list_td[j].children[0].id).val().join(';');
                            break;
                        case 'checkbox':
                            data[list_td[j].children[0].name] = list_td[j].children[0].checked
                            break;
                        case 'int':
                            if (list_td[j].children[0].value == "")
                                data[list_td[j].children[0].name] = 0;
                            else
                                data[list_td[j].children[0].name] = Number(list_td[j].children[0].value);
                            break;
                        case 'datetime':
                            if (list_td[j].children[0].value == "")
                                data[list_td[j].children[0].name] = undefined;
                            break;
                        case 'date':
                            if (list_td[j].children[0].value == "")
                                data[list_td[j].children[0].name] = undefined;
                            else {
                                var v = $('#' + list_td[j].children[0].id).val();
                                data[list_td[j].children[0].name] = new Date(Number(v.split('/')[2]), Number(v.split('/')[1]) - 1, Number(v.split('/')[0]), 0, 0, 0, 0);
                                // data[list_td[j].children[0].name] = Date.UTC(Number(v.split('/')[2]), Number(v.split('/')[1]) - 1, Number(v.split('/')[0]), 0, 0, 0, 0);
                            }
                            break;
                        case 'time':
                            if (list_td[j].children[0].value == "")
                                data[list_td[j].children[0].name] = undefined;
                            break;
                        case 'money':
                            if (list_td[j].children[0].value == "")
                                data[list_td[j].children[0].name] = 0;
                            else
                                data[list_td[j].children[0].name] = Number(list_td[j].children[0].value.replaceAll(',', ''));
                            break;
                        default:
                            data[list_td[j].children[0].name] = list_td[j].children[0].value;
                            break;
                    }
                }
            }
            result.push(data);
        }
    }
    return result;
}

function getAllData2(table) {
    return list_data_add[table];
    var colModel = list_col_model[table];
    var allData = list_data_add[table]; //1->n
    var result = [];
    for (var i = 1; i < allData.length; i++) {
        var row = allData[i],
            data = {};
        if (list_td.length) {
            for (var j = 3; j < list_td.length; j++) {
                if (!data['code']) data['code'] = allData[i].id;
                var colName = '';
                if (list_td[j].children[0]) colName = list_td[j].children[0].name;
                if (colName != '' && colModel.find(e => e['name'] == colName) && colModel.find(e => e['name'] == colName)['editable'] && !colModel.find(e => e['name'] == colName)['hidden']) {
                    var sorttype = colModel.find(e => e['name'] == colName)['sorttype'];
                    switch (sorttype) {
                        case 'select':
                            data[list_td[j].children[0].name] = $('#' + list_td[j].children[0].id).val();
                            break;
                        case 'multiselect':
                            data[list_td[j].children[0].name] = $('#' + list_td[j].children[0].id).val().join(';');
                            break;
                        case 'checkbox':
                            data[list_td[j].children[0].name] = list_td[j].children[0].checked
                            break;
                        case 'int':
                            if (list_td[j].children[0].value == "")
                                data[list_td[j].children[0].name] = 0;
                            else
                                data[list_td[j].children[0].name] = Number(list_td[j].children[0].value);
                            break;
                        case 'datetime':
                            if (list_td[j].children[0].value == "")
                                data[list_td[j].children[0].name] = undefined;
                            break;
                        case 'date':
                            if (list_td[j].children[0].value == "")
                                data[list_td[j].children[0].name] = undefined;
                            else {
                                var v = $('#' + list_td[j].children[0].id).val();
                                data[list_td[j].children[0].name] = new Date(Number(v.split('/')[2]), Number(v.split('/')[1]) - 1, Number(v.split('/')[0]), 0, 0, 0, 0);
                                // data[list_td[j].children[0].name] = Date.UTC(Number(v.split('/')[2]), Number(v.split('/')[1]) - 1, Number(v.split('/')[0]), 0, 0, 0, 0);
                            }
                            break;
                        case 'time':
                            if (list_td[j].children[0].value == "")
                                data[list_td[j].children[0].name] = undefined;
                            break;
                        case 'money':
                            if (list_td[j].children[0].value == "")
                                data[list_td[j].children[0].name] = 0;
                            else
                                data[list_td[j].children[0].name] = Number(list_td[j].children[0].value.replaceAll(',', ''));
                            break;
                        default:
                            data[list_td[j].children[0].name] = list_td[j].children[0].value;
                            break;
                    }
                }
            }
            result.push(data);
        }
    }
    return result;
}

function checkClassDatePicker(classList) {
    var check = false;
    classList.forEach(e => {
        switch (e) {
            case 'datepicker':
                check = true;
                break;
            case 'datetimepicker':
                check = true;
                break;
            case 'timepicker':
                check = true;
                break;
        }
    })
    return check;
}

function DeleteRowData(table) {
    var list_tr = $('#jqGrid_' + table.trim() + ' tbody tr'); //1->n
    var listIdDel = [];
    for (var i = 1; i < list_tr.length; i++) {
        var list_td = list_tr[i].children;
        if (list_td.length) {
            if (list_td[1].children[0].checked) {
                var rowid = list_tr[i].id;
                listIdDel.push(rowid);
                $("#jqGrid_" + table).jqGrid('delRowData', rowid);
            }
        }
    }
    return listIdDel;
}

function addRowData(table) {
    var colModel = $("#jqGrid_" + table.trim()).jqGrid('getGridParam', 'colModel'),
        empty_data = {};

    colModel.forEach(col => {
        if (col.name == 'code') empty_data[col.name] = 'addnew';
        else empty_data[col.name] = '';
    })
    $("#jqGrid_" + table.trim()).jqGrid('addRowData', 10, [empty_data]);
}

function deleteData(table) {
    debugger;
    var selRowIds = $('#jqGrid_' + table.trim()).jqGrid('getGridParam', 'selarrrow');
    for (var i = 0; i < selRowIds.length; i++) {
        var rowData = $('#jqGrid_' + table.trim()).jqGrid('getRowData', selRowIds[i]);
        list_data_add[table] = list_data_add[table].filter(e => e.code != rowData.code);
    }
    $('#div-delete-' + table).click()
}

function referencceValue(e, tbName, colSet, ca) {
    var code = e.currentTarget.id.split('_')[0];
    var t = ca.replaceAll('+', '#').replaceAll('-', '#').replaceAll('*', '#').replaceAll('/', '#'),
        arr = t.split('#');
    arr.forEach(a => {
        var v = $('#' + code + '_' + a).val().replaceAll('.', '');
        ca = ca.replaceAll(a, v)
    })
    var rs = eval(ca);
    $('#' + code + '_' + colSet).val(rs).trigger("change");
}
//end edit ==========================================================================================================
var delay = false;

function customField_HRM_Project_Management_Task() {
    var tds = document.getElementById('jqGrid_HRM_Project_Management_Task').getElementsByTagName('tr');
    for (var i = 1; i < tds.length; i++) {
        try {
            var a = "<a href='/task-manage-list;" + tds[i].children[3].innerHTML + "' target='_blank'>" + tds[i].children[3].innerHTML + "</a>"
            tds[i].children[3].innerHTML = a;
        } catch {}
    }
}