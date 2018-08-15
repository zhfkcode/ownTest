 var area_pro = 0
 var area_city = 0
 if (typeof RegisterProvince != 'undefined') {
 	area_pro = RegisterProvince
 }
 if (typeof RegisterCity != 'undefined') {
 	area_pro = RegisterCity
 }
 var options = {
 	data: data_area
 }
 var loc = new multi_select(options);
 loc.bind('.province', area_pro);
 loc.bind('.city', area_city);
 $(".province option").eq(0).text("- 省份 -");
 $(".city option").eq(0).text("- 城市 -");
 var settings = {
 	elem: '#periodvalidity',
 	format: 'YYYY-MM-DD hh:mm:ss',
 	istime: true,
 	istoday: false
 }
 laydate(settings)
 $(function () {
 	$('#reg-form').validate({
 		rules: {
 			companyname: {
 				require: true
 			},
 			businesslicense: {
 				require: true
 			},
 			periodvalidity: {
 				require: true
 			},
 			IDtype: {
 				require: true
 			},
 			creditname: {
 				require: true
 			},
 			regCity: {
 				required: true,
 				gt: true
 			},
 			companyaddre: {
 				require: true
 			},
 			companylegal: {
 				require: true
 			},
 			legalphone: {
 				require: true
 			}
 		},
 		messages: {
 			companyname: {
 				require: "请输入企业名称"
 			},
 			businesslicense: {
 				require: "若为三证合一的证件，请输入社会信用代码"
 			},
 			periodvalidity: {
 				require: "长期有效可不填"
 			},
 			IDtype: {
 				require: "请选择证件类型"
 			},
 			creditname: {
 				require:"请输入证件号码"
 			},
 			regCity: {
 				required: '请选择注册地址',
 				gt: '请选择注册地址'
 			},
 			companyaddre: {
 				require: "请输入企业法人姓名"
 			},
 			companylegal: {
 				require: "请输入企业名称"
 			},
 			legalphone: {
 				require: "请输入法人手机号"
 			}
		 },
		 submitHandler: function(form){
			$("#regArea").val($(".province option:selected").text()+" "+$(".city option:selected").text());
			form.submit();
		}
 	})
 })