// default responsive renderer for DataTables

function renderDefaultTable(api, rowIdx, columns) {
    var data = $.map(columns, function (col, i) {
        var thisRow = '';
        if (col.hidden) {
            thisRow = '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                '<td><strong>' + col.title + '</strong></td>' +
                '<td class="wrap-normal">' + col.data + '</td>' +
                '</tr>';
        }
        return thisRow;
    }).join('');

    return data ?
        $('<table/>').append(data) :
        false;
}

// show messages that fade in and out using an element with the given id or all .toaster elements
// the alertType should match Bootstrap/custom themes (info, success, danger, warning, etc.)
// the "toaster" element should be empty

function showToastAlertMessage(message, toasterId = '', alertType = 'info') {
    console.log(message, alertType, toasterId);

    var toaster;

    if (toasterId != '') {
        toaster = $('#' + toasterId);
    }
    else {
        toaster = $('.toaster');
    }

    if (toaster.find('.alert').length) {
        toaster.empty();
    }

    var alert = $('<div class="alert alert-'+ alertType +' mb-0 border-0 py-2 text-center" role="alert"></alert>');

    alert
        .html(message)
        .appendTo(toaster);

    toaster.fadeIn(500).delay(2000).fadeOut(500, function () { $(this).empty() });
}

// jQuery plugin to re-adjust DataTables columns and recalcualte responsive breakpoints when going from hidden to shown

(function ($) {
    $.fn.showDataTable = function () {

        var dt;

        $(this).show();

        if ($.fn.dataTable.isDataTable(this)) {
            //console.log('%cshowDataTable() applied to element', 'color: green; font-weight: bold;', this.get(0));
            dt = this;
        }
        else if ($.fn.dataTable.isDataTable(this.find('table').first())) {
            //console.log('%cshowDataTable() applied to parent', 'color: green; font-weight: bold;', this.get(0));
            dt = this.find('table').first();
        }
        else {
            console.log('%cshowDataTable() applied to element or parent of an element that is not a DataTable', 'color: orange; font-weight: bold;', this.get(0));            
            return this;
        }

        dt.DataTable()
            .columns
            .adjust()
            .responsive
            .recalc();

        return this;
    }
}(jQuery));