$(function(){
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
    	        return "../material/toMaterialList?offset="+n+"&oneClassifyName=" + $("#oneClassifyName").val();
    	    }
        });
    	
        //  根据种类搜索
        $('#materailFilter').on('click', 'li', function () {
            $(this).addClass('cur').siblings().removeClass('cur')
             $.ajax({
                 type: 'POST',
                 data: {
                 },
                 url: "../material/materialList",
                 success: function (data) {

                 },
                error: function () {

                }
             })
        })
})

