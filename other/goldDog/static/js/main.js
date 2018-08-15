$(function(){
    projectListInit();
    materialListInit();
    getAdsList(1,1);
    if($(".banner .bd li").length>1){
		$('.banner').slide({
			titCell:".hd ul",
			mainCell:".bd ul",
			effect:"fold",
			autoPlay:true,
			autoPage:true,
			trigger:"mouseover",
			interTime: 3000
		});
	}
 });
 
 function getAdsList(adsPosition,adsPlatform) {
    
    $.ajax({
        url : "../commons/ads/getAds",
        data : {
        "adsPosition" : adsPosition,
        "adsPlatform" : adsPlatform
        },
        type : "post",
        success : function(data) {
           var obj = data.data;
           var html = "" ;
            $.each(obj, function(key, val) {
             html +='<img src="'+val.adsImg+'" alt="">';
            });
            $("#ads").html(html);
        }
    });
    
}

function projectListInit() {
    $.ajax({
        url : "../project/projectList",
        data : {
        "type" : 2,
        "size" : 7
        },
        type : "post",
        success : function(data) {
           var obj = data.data.results;
            $.each(obj, function(key, val) {
            createProjectUlPag(val);
            });
        }
    });
}

function materialListInit(){
    $.ajax({
            url : "../material/materialList",
            data : {
            "type" : 2,
            "size" : 7
            },
            type : "post",
            success : function(data) {
               var obj = data.data.results;
                $.each(obj, function(key, val) {
                createMaterialUlPag(val);
                });
            }
        });
}

//项目数据填充
function createProjectUlPag(obj){

   var li = '<a href="../project/toProjectDetail?projectId='+obj.projectId+'"><li><ul class="ulist" ><li class="fir">' +obj.projectName+ '</li>';
       li+= '<li class="sec">' +obj.projectDescription+ '</li>';
       li+= '<li class="thr">' +timeStamp2String(obj.auditTime).substring(0,10)+ '</li>';
       li+= '<li class="fou">' +obj.provinceName+obj.provinceName +'</li></ul></li></a>';
   $("#projectList").append(li);
}

//物资数据填充
function createMaterialUlPag(obj){
   var li = '<a href="../material/toMaterialDetail?materialId='+obj.materialId+'"><li><ul class="ulist" ><li class="fir">' +obj.twoClassifyName+ '</li>';
       li+= '<li class="sec">' +obj.specDescription+ '</li>';
       li+= '<li class="thr">' +timeStamp2String(obj.auditTime).substring(0,10)+ '</li>';
       li+= '<li class="fou">' +obj.provinceName+obj.provinceName +'</li></ul></li></a>';
   $("#materialList").append(li);
}