$(function(){
    // 分页
    function getPage(){
    	var pageNo = $("#currentPage").val();
    	var totalPage = $("#pages").val();
    	var totalRecords = $("#total").val();
        kkpager.generPageHtml({
            pno: pageNo,
            total: totalPage,
            totalRecords: totalRecords,
            isShowTotalPage: false,
            isShowCurrPage: false,
            isGoPage: false,
            isShowFirstPageBtn: false,
            isShowLastPageBtn: false,
            lang: {
                prePageText: '<',
                nextPageText: '>',
            },
            getLink: function (n) {
            	return "../project/toProjectList?offset="+n;
            }
        });
    }
     getPage()
    //  根据种类搜索
    $('#projectFilter').on('click','li',function(){
        $(this).addClass('cur').siblings().removeClass('cur')
        
        // $.ajax({
        //     type:'POST',
        //     data:data,
        //     url: url,
        //     success:function(){

        //     },
        //     error:function(){

        //     }
        // })
    })
})