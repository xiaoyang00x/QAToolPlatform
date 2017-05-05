
angular.module('myApp', []).controller('getAllPCUITask', function($scope,$http) {
   var url = 'http://10.0.1.167:3000/jenkins4pcui/getAllPCUITask';// URL where the Node.js server is running 
    $http.get(url).success(function(data) {
       $scope.lists  = data
       console.log("data-------------------:"+data);
    });
});


$(function(){


    //get current time
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    }






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
      jqTds[7].innerHTML = '<a class="edit save" href="#">Run</a><a class="delete" href="#">Delete</a>';
    };

    function saveRow (oTable02, nRow){
      var jqInputs = $('input', nRow);
      oTable02.fnUpdate( jqInputs[0].value, nRow, 0, false );
      oTable02.fnUpdate( jqInputs[1].value, nRow, 1, false );
      oTable02.fnUpdate( '<a class="edit" href="#">Rerun</a><a class="delete" href="#">Delete</a>', nRow, 7, false );

      console.log($(nRow).find('td')[1].innerHTML);
      console.log(nRow);
      var TestName = $(nRow).find('td')[0].innerHTML;
      var Broswertype = $(nRow).find('td')[1].innerHTML;
      var AssociationID = Date.parse(new Date());
      var Status = 'Running';
      var Time = getNowFormatDate();
      console.log(TestName);
      console.log(Broswertype);
      console.log('PC'+AssociationID);
      console.log(Status);
      console.log(Time);
      if(Broswertype==0){
        alert("Broswertype不能为空！！！！！！！！");
        $(".refresh").click();
        return;
      }

      $.ajax({
      cache: true,
              type: "POST",
              url:"http://10.0.1.167:3000/jenkins4pcui",
              data:{'TestName':TestName,"Broswertype":Broswertype,"AssociationID":'PC'+AssociationID,"Status":Status,"Time":Time},// 你的formid
              async: false,
              error: function(request) {
                  alert("Connection error");
              },
              success: function(data) {
                  window.location.reload();
              }          
      })
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
    var addRowLink = '<a href="#" id="addRow" class="btn btn-default btn-xs add-row">Add Task</a>'
    $('#inlineEditDataTable_wrapper').append(addRowLink);

    var nEditing = null;

    // Add row initialize
    $('#addRow').click( function (e) {
      e.preventDefault();

      // Only allow a new row when not currently editing
      if ( nEditing !== null ) {
        return;
      }
      
      var aiNew = oTable02.fnAddData([ '', '', '', '', '', '','','<a class="edit" href="">Rerun</a>', '<a class="delete" href="">Delete</a>' ]);
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
      else if (nEditing == nRow && this.innerHTML == "Run") {
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


    
    function editRow (oTable02, nRow){
      var aData = oTable02.fnGetData(nRow);
      var jqTds = $('>td', nRow);
      jqTds[0].innerHTML = '<input type="text" value="'+aData[0]+'">';
      jqTds[1].innerHTML = '<input type="text" value="'+aData[1]+'">';
      jqTds[7].innerHTML = '<a class="edit save" href="#">Run</a><a class="delete" href="#">Delete</a>';
    };

    function initTable(oTable02){

      $.ajax({
      cache: true,
              type: "GET",
              url:"http://10.0.1.167:3000/jenkins4pcui/getAllPCUITask",
              async: false,
              error: function(request) {
                  alert("Connection error");
              },
              success: function(data) {
                //data[i].testname,data[i].broswertype,data[i].associationID,data[i].pass,data[i].fail,data[i].status,data[i].createtime,
                  for(var i=0;i<data.length;i++){
                    if(data[i].testname==""){
                      data[i].testname="All";
                    }
                    var aiNew = oTable02.fnAddData([data[i].testname,data[i].broswertype,data[i].associationID,data[i].pass,data[i].fail,data[i].status,data[i].createtime,'<a class="edit" href="">Rerun</a>', '<a class="delete" href="">Delete</a>' ]);
                    var nRow = oTable02.fnGetNodes(aiNew[0]);
                    oTable02.fnUpdate( '<a class="edit" href="#">Rerun</a><a class="delete" href="#">Delete</a>', nRow, 7, false );
                    $(nRow).find('td:last-child').addClass('actions text-center'); 
                  }    
              }          
         })
    };

    initTable(oTable02);

  })

