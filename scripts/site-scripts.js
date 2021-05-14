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

function 

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