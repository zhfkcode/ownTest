/******* 扩展验证规则 *****/
//邮箱 
jQuery.validator.addMethod("mail", function (value, element) {
	var mail = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/;
	return this.optional(element) || (mail.test(value));
}, "邮箱格式不对");

//电话验证规则
jQuery.validator.addMethod("phone", function (value, element) {
    var phone = /^0\d{2,3}-\d{7,8}$/;
    return this.optional(element) || (phone.test(value));
}, "电话格式如：0371-68787027");

//区号验证规则  
jQuery.validator.addMethod("ac", function (value, element) {
    var ac = /^0\d{2,3}$/;
    return this.optional(element) || (ac.test(value));
}, "区号如：010或0371");

//无区号电话验证规则  
jQuery.validator.addMethod("noactel", function (value, element) {
    var noactel = /^\d{7,8}$/;
    return this.optional(element) || (noactel.test(value));
}, "电话格式如：68787027");

//手机验证规则  
jQuery.validator.addMethod("mobile", function (value, element) {
    var mobile = /^1[3-9]\d{9}$/;
	return this.optional(element) || (mobile.test(value));
}, "手机号格式不对");

//邮箱或手机验证规则  
jQuery.validator.addMethod("mm", function (value, element) {
    var mm = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/;
	return this.optional(element) || (mm.test(value));
}, "格式不对");

//电话或手机验证规则  
jQuery.validator.addMethod("tm", function (value, element) {
    var tm=/(^1[3|4|5|7|8]\d{9}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)|(^\d{3,4}-\d{7,8}-\d{1,4}$)|(^\d{7,8}-\d{1,4}$)/;
    return this.optional(element) || (tm.test(value));
}, "格式不对");

//传真
jQuery.validator.addMethod("fax",function(value,element){
    var fax = /^(\d{3,4})?[-]?\d{7,8}$/;
    return this.optional(element) || (fax.test(value));
},"传真格式如：0371-68787027");

//验证当前值和目标val的值相等 相等返回为 false
jQuery.validator.addMethod("equalTo2",function(value, element){
    var returnVal = true;
    var id = $(element).attr("data-rule-equalto2");
    var targetVal = $(id).val();
    if(value === targetVal){
        returnVal = false;
    }
    return returnVal;
},"不能和原始密码相同");

//大于指定数
jQuery.validator.addMethod("gt",function(value, element){
    var returnVal = false;
    var gt = $(element).data("gt");
    if(value > gt && value != ""){
        returnVal = true;
    }
    return returnVal;
},"不能小于0 或空");

//汉字
jQuery.validator.addMethod("chinese", function (value, element) {
    var chinese = /^[\u4E00-\u9FFF]+$/;
    return this.optional(element) || (chinese.test(value));
}, "格式不对");

//指定数字的整数倍
jQuery.validator.addMethod("times", function (value, element) {
    var returnVal = true;
    var base=$(element).attr('data-rule-times');
    if(value%base!=0){
        returnVal=false;
    }
    return returnVal;
}, "必须是整数倍");

//身份证
jQuery.validator.addMethod("idCard", function (value, element) {
    var isIDCard=/(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//(17,18位)
    return this.optional(element) || (isIDCard.test(value));
}, "身份证号格式不对");

//身份证(前6位区号验证)
jQuery.validator.addMethod("idCard2", function (value, element) {
    var isIDCard=/(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//(17,18位)
    // return this.optional(element) || (isIDCard.test(value))&&!idCardAreaCheck(value);
    return this.optional(element) || (isIDCard.test(value));
}, "身份证号格式不对");

//根据身份证判断是否为20周岁
jQuery.validator.addMethod("age", function (value, element) {
    return this.optional(element) || !checkAge(value);
}, "基于国家对互联网金融的监管规定，平台不向20周岁以下，60周岁以上的用户，以及现役军职人员出售具有风险的产品。敬请理解！");

//银行卡
jQuery.validator.addMethod("bank", function (value, element) {
    var isBank=/^\d{16,19}$/;
    return this.optional(element) || (isBank.test(value));
}, "银行卡号格式不对");

//银行开户账号
jQuery.validator.addMethod("bank2", function (value, element) {
    var isBank=/^\d{8,24}$/;
    return this.optional(element) || (isBank.test(value));
}, "银行开户账号格式不对");

//密码
jQuery.validator.addMethod("pwd", function (value, element) {
    var isPassword=/[^\u4E00-\u9FA0]{6,16}$/;//密码正则;
    return this.optional(element) || (isPassword.test(value));
}, "密码格式不对，由6到16位字符组成");

//6位数字的交易密码
jQuery.validator.addMethod("paypwd", function (value, element) {
    var isPassword=/^\d{6}$/;//密码正则;
    return this.optional(element) || (isPassword.test(value));
}, "格式不对，密码须为6位阿拉伯数字");