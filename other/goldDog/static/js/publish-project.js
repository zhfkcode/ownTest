// 发布项目-项目介绍
var pubProIntro = {
	flag:false,
	pubProValidate:function(Type){
		var jsonData={
			projectId:"",
			projectName:"",
			biddingTime:"",
			provinceName:"",
			cityName:"",
			addDetails:"",
			area:"",
			projectDescription:"",
			projectIntroduction:"",
		}
		jsonData.projectName=$("#projectName").val();
		jsonData.biddingTime=$("#auctionPeriod").val();
		jsonData.provinceName=$(".province option:selected").text();
		jsonData.cityName=$(".city option:selected").text();
		jsonData.addDetails=$("#address").val();
		jsonData.projectDescription=$("#projectDescribe").val();
		jsonData.projectIntroduction=$("#projectIntroduce").val();
        jsonData.projectId=$("#projectId").val();
		$(".error").text("");
		if(!jsonData.projectName){
			$(".projectName_error").text("请输入项目名称");
			return false;
		}else if(!jsonData.biddingTime){
			$(".auctionPeriod_error").text("请输入竞标周期");
			return false;
		}else if($(".city option").html()=='- 城市 -'){
			$(".area_error").text("请选择项目地址");
			return false;
		}else if(!jsonData.addDetails){
			$(".area_error").text("请输入具体门牌号");
			return false;
		}else if(!jsonData.projectDescription){
			$(".projectDescribe_error").text("请简述项目的重点内容");
			return false;
		}else if(!jsonData.projectIntroduction){
			$(".projectIntroduce_error").text("请详细介绍项目的具体内容");
			return false;
		}else{
			if(Type==0){  //下一步
				$('#publish_project_1').submit();
			}else{ // 保存
				if(!this.flag){
					this.flag=true;
					$.post("../project/saveProject",jsonData,function(data){
						pubProIntro.flag=false;
						if(data.data>0){
							dialog({
								desc:"保存成功！"
							});
						}else{
							dialog({
								desc:data.err
							});
						}
					});
				}
			}
		}
	}
}

// 发布项目-物资描述
var pubProDesc={
	flag:false,
	sortEq:0,
	rowEq:0,
	CFSTxt:"请选择",
	CFSTxt0:"其它",
	classifyFirOptionArr:[],
	otherFirDisnone:"disnone",
	otherSecDisnone:"disnone",
	init:function(){ //初始化
		$(".pro_desc_cont").html("");
		var _initTxt=$("input[name='descClassifyValue']").val();
		this.classifyFirOptionPostFun();
		//是否有保存数据
		if(!!_initTxt){
			this.descClassifyValue(_initTxt);
		}else{
			this.descClassifyAdd();
		}
	},
	descClassifyValue:function(initTxt){ //遍历初始页面保存数据展示
		//字符串转JSON
		var _initTxt=JSON.parse(initTxt);
		//数据长度
		var _initTxtLen=_initTxt.length;

		for(var i=0;i<_initTxtLen;i++){
			var cHtml=pubProDesc.descClassifyHtml(i,0,_initTxt[i].categoryFir,_initTxt[i].categorySec,_initTxt[i].order,_initTxt[i].categoryFirOther,_initTxt[i].categorySecOther);

			$(".pro_desc_cont").append(cHtml);
			pubProDesc.sortEq++;
		}
	},
	descClassifyHtml:function(s,r,ft,st,rowArr,selFirOtherTxt,selSecOtherTxt){ //模块HTML s:模块索引，r：订单索引,ft：一级选项选中项,st：二级选项选中项，rowArr:[订单五项内容],selFirOtherTxt:一级类其它，selSecOtherTxt：二级类其它
		//输入框类，（显示或隐藏）。。。在下列方法获取一级选项、二级选项中有做判断更新
		this.otherFirDisnone="disnone";
		this.otherSecDisnone="disnone";
		//获取订单初始列表
		var rHtml=this.descRowHtml(s,r,rowArr);
		//获取一级选项
		var cfHtml=this.classifyFirSelect(ft,s,selFirOtherTxt);
		//获取二级选项
		var csHtml=this.classifySecOptionPostFun(ft,st);

		//判断"其它"输入框是否显示，输入框展示或隐藏及填充内容
		var _selFirOtherTxt=this.otherFirDisnone==""?selFirOtherTxt:"";
		var _selSecOtherTxt=this.otherSecDisnone==""?selSecOtherTxt:"";
		//拼接模块
		var classifyHtml='<div class="desc_classify" data-sorteq="'+s+'" data-roweq="'+r+'">'+
							'<div class="desc_rank">'+
								'<div class="desc_rk_wrap clearfix">'+
									'<div class="desc_rk_box">'+
										'<span>一级分类：</span>'+
										'<select class="ipt_select ipt_w128 classifySelect classifyFir" name="classifyFir_'+s+'" id="classifyFir_'+s+'">'+cfHtml+'</select>'+
										'<input type="text" class="ipt_txt ml_18 ipt_w106 classifySelectRemark classifyFirOther '+this.otherFirDisnone+'" name="classifyFirOther_'+s+'" id="classifyFirOther_'+s+'" value="'+_selFirOtherTxt+'">'+
									'</div>'+
									'<div class="desc_rk_box">'+
										'<span>二级分类：</span>'+
										'<select class="ipt_select ipt_w128 classifySelect classifySec" name="classifySec_'+s+'" id="classifySec_'+s+'">'+csHtml+'</select>'+
										'<input type="text" class="ipt_txt ml_18 ipt_w106 classifySelectRemark classifySecOther '+this.otherSecDisnone+'" name="classifySecOther_'+s+'" id="classifySecOther_'+s+'" value="'+_selSecOtherTxt+'">'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="desc_cont">'+
								'<div class="desc_cont_tit clearfix">'+
									'<span class="col col_1">规格描述</span>'+
									'<span class="col col_2">交付时间</span>'+
									'<span class="col col_3">计量单位</span>'+
									'<span class="col col_4">采购数量</span>'+
									'<span class="col col_5">采购价格</span>'+
								'</div>'+
								'<div class="desc_cont_list desc_cont_list_'+s+'">'+rHtml+'</div>'+
							'</div>'+
							'<span class="desc_close">×</span>'+
						'</div>';
		return classifyHtml;
	},
	descRowHtml:function(s,r,rowArr){ //订单HTML s:模块索引，r：描述索引 ,rowArr:[{订单五项内容}]
		var rowHtml="";
		var rowArrLen=rowArr.length;
		var mOrder=[{desc:"",deliveryTime:"",units:"",amount:"",price:""}];
		var descRowArr=rowArrLen==0?mOrder:rowArr;
		var descRowArrLen=descRowArr.length;

		for(var i=0;i<descRowArrLen;i++){
			var ir=i+r;
			var rowBtn='';
				if(r==0&&descRowArrLen==1){
					rowBtn='<a class="desc_btn sub_btn sub_btn_disnone"></a><a class="desc_btn add_btn"></a>';
				}else{
					rowBtn='<a class="desc_btn sub_btn"></a><a class="desc_btn add_btn"></a>';
				}
			rowHtml+='<div class="desc_row clearfix">'+
							'<span class="col col_1">'+
								'<input type="text" class="ipt_txt materialsType" placeholder="可输入物资的型号" name="materialsType_'+s+'_'+ir+'" id="materialsType_'+s+'_'+ir+'" value="'+descRowArr[i].desc+'">'+
							'</span>'+
							'<span class="col col_2">'+
								'<input type="text" class="ipt_txt deliveryDate" name="deliveryDate_'+s+'_'+ir+'" id="deliveryDate_'+s+'_'+ir+'" value="'+descRowArr[i].deliveryTime+'">'+
							'</span>'+
							'<span class="col col_3">'+
								'<input type="text" class="ipt_txt measureUnit" placeholder="件/米等" name="measureUnit_'+s+'_'+ir+'" id="measureUnit_'+s+'_'+ir+'" value="'+descRowArr[i].units+'">'+
							'</span>'+
							'<span class="col col_4">'+
								'<input type="text" class="ipt_txt purchaseAmount" name="purchaseAmount_'+s+'_'+ir+'" id="purchaseAmount_'+s+'_'+ir+'" value="'+descRowArr[i].amount+'">'+
							'</span>'+
							'<span class="col col_5">'+
								'<input type="text" class="ipt_txt purchasePrice" placeholder="请输入价格" name="purchasePrice_'+s+'_'+ir+'" id="purchasePrice_'+s+'_'+ir+'" value="'+descRowArr[i].price+'">'+
							'</span>'+rowBtn+
						'</div>';
		}
		return rowHtml
	},
	descClassifyAdd:function(){	//模块添加
		// (模块索引, 订单索引, 一级选项选中选项内容, [订单五项内容])
		var cHtml=this.descClassifyHtml(this.sortEq,0,"","",[],"",""); 

		$(".pro_desc_cont").append(cHtml);
		this.sortEq++;
	},
	orderAdd:function($this,$parent){ //订单添加  $this:当前点击标签，$parent：当前订单列表父级 类名“.desc_cont_list”
		var _parent=$this.parents(".desc_classify");
		// 获取当前模块索引
		var sortEqCurr=_parent.data("sorteq");
		// 获取当前模块，订单索引。添加列表，索引加1
		this.rowEq=_parent.data("roweq");
		this.rowEq++;

		// 获取新订单列表HTML，添加到列表
		var rHtml=this.descRowHtml(sortEqCurr,this.rowEq,[])
		$parent.append(rHtml);

		// 重置描述列表索引
		_parent.data("roweq",this.rowEq);
		// 当前模块订单第一条，删除按钮显示隐藏
		this.orderFirSub($parent);
	},
	orderFirSub:function($parent){ //订单第一条，删除按钮显示隐藏
		var rowLen=$parent.find(".desc_row").length;
		// 描述列表长度大于1，第一条删除按钮显示， 小于等于1，第一条删除按钮隐藏
		if(rowLen>1){
			$parent.find(".desc_row").eq(0).find(".sub_btn").show();
		}else{
			$parent.find(".desc_row").eq(0).find(".sub_btn").hide();
		}
	},
	classifyFirOptionPostFun:function(){ // 获取一级分类选项数组
		$.get("../material/materialClassifyChid?parentId=0",function(data){
			// var data={
			// 	state:1,
			// 	optionVal:["专用建材","临建、劳保、易耗材","五金","布艺"]
			// }
			if(data.state==1){
				pubProDesc.classifyFirOptionArr=data.optionVal;
			}
		});
	},
	classifyFirSelect:function(selectedVal,selectFirId,selectFirOtherTxt){ // 一级选项遍历(一级选中，当前模块索引，一级其它文案)
		var CFOHtml='<option value="-1">'+this.CFSTxt+'</option>';
		var len=pubProDesc.classifyFirOptionArr.length;
		// 遍历一级选项
		for(var i=0;i<len;i++){
			if(pubProDesc.classifyFirOptionArr[i]===selectedVal){
				CFOHtml+='<option value="'+(i+1)+'" selected="true">'+pubProDesc.classifyFirOptionArr[i]+'</option>';
			}else{
				CFOHtml+='<option value="'+(i+1)+'">'+pubProDesc.classifyFirOptionArr[i]+'</option>';
			}
		}
		// 一级选中选项 == 其它
		if(selectedVal===this.CFSTxt0){
			CFOHtml+='<option value="0" selected="true">'+this.CFSTxt0+'</option>';
			pubProDesc.otherFirDisnone="";
		}else{
			CFOHtml+='<option value="0">'+this.CFSTxt0+'</option>';
		}

		return CFOHtml
	},
	classifySecOptionPostFun:function(classifyFirVal,classifySecVal){ // 输出二级选项目录 classifyFirVal：一级目录选中内容,classifySecVal:二级目录需显示类内容
		var CSOHtml='<option value="-1">'+this.CFSTxt+'</option>';
		if(!!classifyFirVal){
			if(classifyFirVal===this.CFSTxt){
				return CSOHtml;
			}else if(classifyFirVal===this.CFSTxt0){
				CSOHtml='<option value="0">'+this.CFSTxt0+'</option>';
				pubProDesc.otherSecDisnone="";
				return CSOHtml;
			}else{
				$.post("",{classifyFirVal:classifyFirVal},function(data){
					// var data={
					// 	state:1,
					// 	optionVal:["保温&隔热材料","变形缝装置","密封&防腐材料"]
					// }
					if(data.state==1){
						var len=data.optionVal.length;
						for(var i=0;i<len;i++){
							if(data.optionVal[i]===classifySecVal){
								CSOHtml+='<option value="'+(i+1)+'" selected="true">'+data.optionVal[i]+'</option>';
							}else{
								CSOHtml+='<option value="'+(i+1)+'">'+data.optionVal[i]+'</option>';
							}
						}
						if(classifySecVal===pubProDesc.CFSTxt0){
							CSOHtml+='<option value="0" selected="true">'+pubProDesc.CFSTxt0+'</option>';
							pubProDesc.otherSecDisnone="";
						}else{
							CSOHtml+='<option value="0">'+pubProDesc.CFSTxt0+'</option>';
						}

						return CSOHtml;
					}
				});	
			}
		}else{
			return CSOHtml;
		}
	},
	classifySavePost:function(descStr){ //保存 post请求
		$.post("",{descStr:descStr},function(data){
			if(data.state==1){
				dialog({
					desc:"保存成功！"
				});
			}else{
				dialog({
					desc:data.err
				});
			}
		});
	},
	classifyIssuePost:function(descStr){ //发布 post请求
		if(!this.flag){
			this.flag=true;
			$.post("",{descStr:descStr},function(data){
				pubProDesc.flag=false;
				if(data.state==1){
					// 跳转发布成功/失败页面
					window.location.href="";
				}else{
					dialog({
						desc:data.err
					});
				}
			});	
		}
		
	},
	classifyDescExtract:function(st){ //模块内容是否已填写提示，提取已填写内容拼接成字符串 st=0:保存，st=1发布项目
		var cdStr=[];
		var cdStrLen=0;
		var descClassifyLen=$(".desc_classify").length;

		$(".desc_classify").each(function(){
			var _this= $(this);
			var _descClassifyIdx=_this.index();
			//物资数据格式
			var materialsDesc={
				categoryFir:"",
				categoryFirOther:"",
				categorySec:"",
				categorySecOther:"",
				order:[]
			}

			materialsDesc.categoryFir=_this.find(".classifyFir option:selected").text();
			materialsDesc.categorySec=_this.find(".classifySec option:selected").text();
			var _claFirRem=_this.find(".classifyFirOther").val();
			var _claSecRem=_this.find(".classifySecOther").val();

			if(materialsDesc.categoryFir===pubProDesc.CFSTxt||materialsDesc.categorySec===pubProDesc.CFSTxt){
				dialog({
					desc:"物资分类未选择！"
				});
				return false;
			}
			if(materialsDesc.categoryFir===pubProDesc.CFSTxt0){
				if(!_claFirRem){
					dialog({
						desc:"物资分类未填写！"
					});
					return false;
				}
				materialsDesc.categoryFirOther=_claFirRem;
			}
			if(materialsDesc.categorySec===pubProDesc.CFSTxt0){
				if(!_claSecRem){
					dialog({
						desc:"物资分类未填写！"
					});
					return false;
				}
				materialsDesc.categorySecOther=_claSecRem
			}

			//获取订单列表数据
			var rowStr=[];
			var _descRow=_this.find(".desc_row");
			var _rowLen=_descRow.length;
			for(var i=0;i<_rowLen;i++){
				var thisrow=_descRow.eq(i);
				var _desc=thisrow.find(".materialsType").val();
				var _delTime=thisrow.find(".deliveryDate").val();
				var _meaUnit=thisrow.find(".measureUnit").val();
				var _purAmount=thisrow.find(".purchaseAmount").val();
				var _purPrice=thisrow.find(".purchasePrice").val();

				if(!_desc||!_delTime||!_meaUnit||!_purAmount||!_purPrice){
					dialog({
						desc:"物资订单未填写完！"
					});
					return false;
				}else{
					var _orderObj={
							desc:_desc,
							deliveryTime:_delTime,
							units:_meaUnit,
							amount:_purAmount,
							price:_purPrice
						}
						materialsDesc.order.push(_orderObj);
				}
			}

			cdStr.push(materialsDesc);
			cdStrLen++;
		});
		//console.log(JSON.stringify(cdStr));
		if(cdStrLen==descClassifyLen){
			$(".descClassifyValue").val(JSON.stringify(cdStr));
			if(st===0){
				pubProDesc.classifySavePost(JSON.stringify(cdStr));
			}else if(st===1){
				pubProDesc.classifyIssuePost(JSON.stringify(cdStr));
			}
		}
	},
	agreementFun:function(){ // 协议同意判断
		var _this=$("input[name='agreement']");
		var _agrVal=_this.val();
		if(_agrVal==0){
			dialog({
				desc:"需预读并同意搜材狗发布协议！"
			});
			return false;
		}
		return true;
	}
}


$(function(){
	$("#cname").html($("#companyName").val());
	// 企业-我的项目发布
	$('.btn_submit').click(function(){
		pubProIntro.pubProValidate(0);
	});
	$('.btn_save').click(function(){
		pubProIntro.pubProValidate(1);
	});

	// 企业-物资描述
	if($("#publish_project_2").length>0){
		pubProDesc.init();
	}

	// 保存
	$(".classify_save").click(function(){
		if(pubProDesc.agreementFun()){
			pubProDesc.classifyDescExtract(0);
		}
	});
	// 发布项目
	$(".classify_issue").click(function(){
		if(pubProDesc.agreementFun()){
			pubProDesc.classifyDescExtract(1);
		}
	});

	//模块添加
	$(".classify_add").click(function(){
		pubProDesc.descClassifyAdd();
	});

	// 分类选择
	//一级选项
	$(document).on("change",".classifyFir",function(){ 
		var _this=$(this);
		var _parentEq=_this.parents(".desc_classify").data("sorteq");
		var _optionTxt=_this.find("option:selected").text();
		var _siblingsInput=_this.siblings("input");

		if(_optionTxt===pubProDesc.CFSTxt0){
			_siblingsInput.show();
			_this.parents(".desc_rk_box").siblings().find(".classifySecOther").show();
		}else{
			_siblingsInput.hide();
		}
		var csoHtml=pubProDesc.classifySecOptionPostFun(_optionTxt,"",);
		_this.parents(".desc_rk_box").siblings().find(".classifySec").html(csoHtml);
		if(_optionTxt===pubProDesc.CFSTxt){
			_this.parents(".desc_rk_box").siblings().find(".classifySecOther").hide();
		}
	});
	//二级选项
	$(document).on("change",".classifySec",function(){
		var _this=$(this);
		var _optionTxt=_this.find("option:selected").text();
		var _siblingsInput=_this.siblings("input");

		if(_optionTxt===pubProDesc.CFSTxt0){
			_siblingsInput.show();
		}else{
			_siblingsInput.hide();
		}
	});

	// 模块删除按钮显示/隐藏
	$(document).on("mouseover",".desc_classify",function(){
		var _this=$(this);
		var _Len=$(".desc_classify").length;
		if(_Len>1){
			_this.find(".desc_close").show();
		}
	}).on("mouseout",".desc_classify",function(){
		var _this=$(this);
		_this.find(".desc_close").hide();
	});

	// 模块删除
	$(document).on("click",".desc_close",function(){
		var _this=$(this);
		_this.parents(".desc_classify").remove();
	});
	
	// 订单添加/删除
	$(document).on("click",".sub_btn",function(){
		var _this=$(this);
		var _parent=_this.parents(".desc_cont_list");

		_this.parents(".desc_row").remove();
		pubProDesc.orderFirSub(_parent);
	});
	$(document).on("click",".add_btn",function(){
		var _this=$(this);
		var _parent=_this.parents(".desc_cont_list");
		
		pubProDesc.orderAdd(_this,_parent);
	});

	// 协议
	$(".agmt_checket").click(function(){
		var _this=$(this);
		var agreementVal=_this.siblings(".agreement").val();
		if(agreementVal==1){
			_this.removeClass("agmt_checket_on");
			//$(".classify_issue,.classify_save").addClass("classify_grey");
			agreementVal=0;
		}else{
			_this.addClass("agmt_checket_on");
			//$(".classify_issue,.classify_save").removeClass("classify_grey");
			agreementVal=1;
		}
		_this.siblings(".agreement").val(agreementVal);
	});
});