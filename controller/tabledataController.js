  $(function(){

      // Add custom class to pagination div
      $.fn.dataTableExt.oStdClasses.sPaging = 'dataTables_paginate paging_bootstrap paging_custom';


      /*******************************************************/
      /**************** INLINE EDIT DATATABLE ****************/
      /*******************************************************/

      function restoreRow (oTable02, nRow){
        var aData = oTable02.fnGetData(nRow);
        var jqTds = $('>td', nRow);
        
        for ( var i=0, iLen=jqTds.length ; i<iLen ; i++ ) {
          oTable02.fnUpdate( aData[i], nRow, i, false );
        }
        
        oTable02.fnDraw();
      };

      function editRow (oTable02, nRow){
        var aData = oTable02.fnGetData(nRow);
        var jqTds = $('>td', nRow);
        jqTds[0].innerHTML = '<input type="text" value="'+aData[0]+'">';
        jqTds[1].innerHTML = '<input type="text" value="'+aData[1]+'">';
        //jqTds[2].innerHTML = '<input type="text" value="'+aData[2]+'">';
        //jqTds[3].innerHTML = '<input type="text" value="'+aData[3]+'">';
        //jqTds[4].innerHTML = '<input type="text" value="'+aData[4]+'">';
        //jqTds[5].innerHTML = '<input type="text" value="'+aData[5]+'">';
        jqTds[6].innerHTML = '<a class="edit save" href="#">Save</a><a class="delete" href="#">Delete</a>';
      };

      function saveRow (oTable02, nRow){
        var jqInputs = $('input', nRow);
        oTable02.fnUpdate( jqInputs[0].value, nRow, 0, false );
        oTable02.fnUpdate( jqInputs[1].value, nRow, 1, false );
        //oTable02.fnUpdate( jqInputs[2].value, nRow, 2, false );
        //oTable02.fnUpdate( jqInputs[3].value, nRow, 3, false );
        //oTable02.fnUpdate( jqInputs[4].value, nRow, 4, false );
        //oTable02.fnUpdate( jqInputs[5].value, nRow, 5, false );
        oTable02.fnUpdate( '<a class="edit" href="#">Edit</a><a class="delete" href="#">Delete</a>', nRow, 6, false );
        oTable02.fnDraw();
      };



      var oTable02 = $('#inlineEditDataTable').dataTable({
        "sDom":
          "R<'row'<'col-md-6'l><'col-md-6'f>r>"+
          "t"+
          "<'row'<'col-md-4 sm-center'i><'col-md-4'><'col-md-4 text-right sm-center'p>>",
        "oLanguage": {
          "sSearch": ""
        },
        "aoColumnDefs": [
          { 'bSortable': false, 'aTargets': [ "no-sort" ] }
        ],
        "fnInitComplete": function(oSettings, json) { 
          $('.dataTables_filter input').attr("placeholder", "Search");
        }
      });





      //------------
      // Append add row button to table
      var addRowLink = '<a href="#" id="addRow" class="btn btn-default btn-xs add-row">Add row</a>'
      $('#inlineEditDataTable_wrapper').append(addRowLink);

      var nEditing = null;

      // Add row initialize
      $('#addRow').click( function (e) {
        e.preventDefault();

        // Only allow a new row when not currently editing
        if ( nEditing !== null ) {
          return;
        }
        
        var aiNew = oTable02.fnAddData([ '', '', '', '', '', '','<a class="edit" href="">Edit</a>', '<a class="delete" href="">Delete</a>' ]);
        var nRow = oTable02.fnGetNodes(aiNew[0]);
        editRow(oTable02, nRow);
        nEditing = nRow;

        $(nRow).find('td:last-child').addClass('actions text-center');
      });

      // Delete row initialize
      $(document).on( "click", "#inlineEditDataTable a.delete", function(e) {
        e.preventDefault();
        
        var nRow = $(this).parents('tr')[0];
        oTable02.fnDeleteRow( nRow );
      });

      // Edit row initialize
      $(document).on( "click", "#inlineEditDataTable a.edit", function(e) {
        e.preventDefault();
         
        /* Get the row as a parent of the link that was clicked on */
        var nRow = $(this).parents('tr')[0];
         
        if (nEditing !== null && nEditing != nRow){
          /* A different row is being edited - the edit should be cancelled and this row edited */
          restoreRow(oTable02, nEditing);
          editRow(oTable02, nRow);
          nEditing = nRow;
        }
        else if (nEditing == nRow && this.innerHTML == "Save") {
          /* This row is being edited and should be saved */
          saveRow(oTable02, nEditing);
          nEditing = null;
        }
        else {
          /* No row currently being edited */
          editRow(oTable02, nRow);
          nEditing = nRow;
        }
      });

      //initialize chosen
       $('.dataTables_length select').chosen({disable_search_threshold: 10});
      
    })