$(function(){


    //  获取url参数  console.log($_GET.AssociationID); 

    var $_GET = (function(){
        var url = window.document.location.href.toString();
        var u = url.split("?");
        if(typeof(u[1]) == "string"){
            u = u[1].split("&");
            var get = {};
            for(var i in u){
                var j = u[i].split("=");
                get[j[0]] = j[1];
            }
            return get;
        } else {
            return {};
        }
    })();



    // Add custom class to pagination div
    $.fn.dataTableExt.oStdClasses.sPaging = 'dataTables_paginate paging_bootstrap paging_custom';


    /*******************************************************/
    /**************** INLINE EDIT DATATABLE ****************/
    /*******************************************************/


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



    //initialize chosen
    $('.dataTables_length select').chosen({disable_search_threshold: 10});



    function initTable(oTable02){
      $.ajax({
      cache: true,
              type: "POST",
              url:"http://10.0.1.167:3000/autotask/getAutotaskByID",
              async: false,
              data:{"AssociationID":$_GET.AssociationID},
              error: function(request) {
                  alert("Connection error");
              },
              success: function(data) {
                  for(var i=0;i<data.length;i++){
                    console.log(data[i].stackheap==undefined);
                    if(data[i].stackheap!=undefined)
                      oTable02.fnAddData([data[i].associationID,data[i].testcaseName,data[i].status,data[i].stackheap]);
                    else
                      oTable02.fnAddData([data[i].associationID,data[i].testcaseName,data[i].status,"无"]);
                  }    
              }          
         })
    };

    initTable(oTable02);
  })

