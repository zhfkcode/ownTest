 $.ajax({
     url: 'http://www.zhishuchacha.com/getdata.php',
     type: 'POST',
     data: {
         type: "ssrq",
         val: [4000]
     },
     success: function (res) {
         console.log(res)
     }
 })