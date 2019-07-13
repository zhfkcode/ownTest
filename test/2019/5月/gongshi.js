














/hotsearch.json?orderBy=uvIndex&indexCode=uvIndex%2CseIpvUvHits%2CtradeInde
/hotpurpose.json?orderBy=cartHits&indexCode=cltHits%2CcartHits%2CtradeIndex
/hotsale.json?orderBy=tradeIndex&indexCode=tradeIndex%2CtradeGrowthRange%2CpayRateIndex

https: //sycm.taobao.com/mc/mq/mkt/rank/item/hotsale.json?dateRange=2019-07-05|2019-07-11&dateType=recent7&pageSize=10&page=1&order=desc&orderBy=tradeIndex&cateId=50013204&device=0&sellerType=-1&indexCode=cateRankId%2CtradeIndex%2CtradeGrowthRange%2CpayRateIndex
https: //sycm.taobao.com/mc/mq/mkt/rank/item/hotsale.json?dateRange=2019-07-05|2019-07-11&dateType=recent7&pageSize=10&page=1&order=desc&orderBy=tradeIndex&cateId=50010728&device=0&sellerType=-1&indexCode=tradeIndex%2CtradeGrowthRange%2CpayRateIndex


https: //sycm.taobao.com/mc/mq/mkt/rank/item/hotsale.json?dateRange=2019-07-05|2019-07-11&dateType=recent7&pageSize=10&page=1&order=desc&orderBy=tradeIndex&cateId=50013204&device=0&sellerType=-1&indexCode=cateRankId%2CtradeIndex%2CtradeGrowthRange%2CpayRateIndex
https: //sycm.taobao.com/mc/mq/mkt/rank/item/hotsale.json?dateRange=2019-07-05%7C2019-07-11&dateType=recent7&pageSize=10&page=1&order=desc&orderBy=tradeIndex&cateId=50010728&device=0&sellerType=-1&indexCode=tradeIndex%2CtradeGrowthRange%2CpayRateIndex&_=1562899496037&token=ebed79d4c











var indexTrans = {
  findType: function (num) {
    if (num == undefined) {
      return 0
    }
    if (num >= 0 && num < 3000) {
      return indexTrans.rang1(num)
    } else if (num >= 3000 && num < 20000) {
      return indexTrans.rang2(num)
    } else if (num >= 20000 && num < 50000) {
      return indexTrans.rang3(num)
    } else if (num >= 50000 && num < 100000) {
      return indexTrans.rang4(num)
    } else if (num >= 100000 && num < 200000) {
      return indexTrans.rang5(num)
    } else if (num >= 200000 && num < 300000) {
      return indexTrans.rang6(num)
    } else if (num >= 300000 && num < 500000) {
      return indexTrans.rang7(num)
    } else if (num >= 500000 && num < 800000) {
      return indexTrans.rang8(num)
    } else if (num >= 800000 && num < 1000000) {
      return indexTrans.rang9(num)
    } else if (num >= 1000000 && num < 2000000) {
      return indexTrans.rang10(num)
    } else if (num >= 2000000 && num < 5000000) {
      return indexTrans.rang11(num)
    } else if (num >= 50000000 && num < 80000000) {
      return indexTrans.rang12(num)
    } else if (num >= 80000000 && num < 120000000) {
      return indexTrans.rang13(num)
    } else if (num >= 120000000 && num < 17000000) {
      return indexTrans.rang14(num)
    } else {
      return '超出范围'
    }
  },
  findRateType: function (num) {
    if (num == undefined) {
      return 0
    }
    if (num >= 0 && num < 23) {
      return indexTrans.rangRate1(num)
    } else if (num >= 23 && num < 70) {
      return indexTrans.rangRate2(num)
    } else if (num >= 70 && num < 100) {
      return indexTrans.rangRate3(num)
    } else if (num >= 100 && num < 3693) {
      return indexTrans.rangRate4(num)
    } else {
      return '超出范围'
    }
  },
  rang1: function (x) {
    return 2.85032440023E-19 * Math.pow(x, 6) - 3.26733299167131E-15 * Math.pow(x, 5) + 1.56488163015261E-11 * Math.pow(x, 4) - 4.33751859674971E-08 * Math.pow(x, 3) + 0.000143677524953538 * Math.pow(x, 2) + 0.0426669903534544 * x - 1.17347128162112;
  },
  rang2: function (x) {
    return 2.6361693E-23 * Math.pow(x, 6) - 2.305291293498E-18 * Math.pow(x, 5) + 8.76700064327854E-14 * Math.pow(x, 4) - 2.05828554084245E-09 * Math.pow(x, 3) + 0.0000727213988444307 * Math.pow(x, 2) + 0.126991314453936 * x - 56.4039982262882;
  },
  rang3: function (x) {
    return 1.10199E-25 * Math.pow(x, 6) - 3.2284892498E-20 * Math.pow(x, 5) + 4.2439923457579E-15 * Math.pow(x, 4) - 3.58616335129325E-10 * Math.pow(x, 3) + 0.0000518530019341748 * Math.pow(x, 2) + 0.277193063913089 * x - 555.674398971899;
  },
  rang4: function (x) {
    return 8.454E-27 * Math.pow(x, 6) - 4.636470035E-21 * Math.pow(x, 5) + 1.12750813204514E-15 * Math.pow(x, 4) - 1.73450632416443E-10 * Math.pow(x, 3) + 0.0000458199713387622 * Math.pow(x, 2) + 0.376508286240507 * x - 1157.16452820911;
  },
  rang5: function (x) {
    return -6.1343545E-23 * Math.pow(x, 5) + 6.8771145208903E-17 * Math.pow(x, 4) - 3.78097694140952E-11 * Math.pow(x, 3) + 0.000035566490066202 * Math.pow(x, 2) + 0.812733493327658 * x - 9309.08526054004;
  },
  rang6: function (x) {
    return -9.921835E-24 * Math.pow(x, 5) + 1.937505297447E-17 * Math.pow(x, 4) - 1.86442674482995E-11 * Math.pow(x, 3) + 0.0000318094595744882 * Math.pow(x, 2) + 1.1849180217423 * x - 24209.7551876062;
  },
  rang7: function (x) {
    return -3.449782E-24 * Math.pow(x, 5) + 9.307994247519E-18 * Math.pow(x, 4) - 1.23946227430043E-11 * Math.pow(x, 3) + 0.0000298760415237449 * Math.pow(x, 2) + 1.48275058356596 * x - 42476.8535347282;
  },
  rang8: function (x) {
    return -3.34135E-25 * Math.pow(x, 5) + 1.857997381456E-18 * Math.pow(x, 4) - 5.09063423342014E-12 * Math.pow(x, 3) + 0.0000261974390300692 * Math.pow(x, 2) + 2.43509528826424 * x - 143734.812525108;
  },
  rang9: function (x) {
    return -3.34135E-25 * Math.pow(x, 5) + 1.857997381456E-18 * Math.pow(x, 4) - 5.09063423342014E-12 * Math.pow(x, 3) + 0.0000261974390300692 * Math.pow(x, 2) + 2.43509528826424 * x - 143734.812525108;
  },
  rang10: function (x) {
    return -3.4957E-26 * Math.pow(x, 5) + 3.90026460982E-19 * Math.pow(x, 4) - 2.15062266440996E-12 * Math.pow(x, 3) + 0.0000231851131049988 * Math.pow(x, 2) + 4.01611672970563 * x - 483648.680995591;
  },
  rang11: function (x) {
    return -3.223E-27 * Math.pow(x, 5) + 7.6032423132E-20 * Math.pow(x, 4) - 8.80678160840188E-13 * Math.pow(x, 3) + 0.0000205555297155039 * Math.pow(x, 2) + 6.8042707843411 * x - 1692703.6365919;
  },
  rang12: function (x) {
    return 4.745220879E-21 * Math.pow(x, 4) - 2.2534536331068E-13 * Math.pow(x, 3) + 0.0000174075334242049 * Math.pow(x, 2) + 14.7202956322245 * x - 10003418.7550595;
  },
  rang13: function (x) {
    return 1.88173071E-21 * Math.pow(x, 4) - 1.35986059338809E-13 * Math.pow(x, 3) + 0.0000163532517979465 * Math.pow(x, 2) + 20.2954054532331 * x - 21153280.4884378;

  },
  rang14: function (x) {
    return 7.96482453E-22 * Math.pow(x, 4) - 8.51492731921746E-14 * Math.pow(x, 3) + 0.0000154538934795292 * Math.pow(x, 2) + 27.4181492568135 * x - 42460659.1147964;

  },
  rangRate1: function (x) {
    return 0

  },
  rangRate2: function (x) {
    return 0.0779253447760533 - 0.0131900303435961 * x + 0.00093015655979144 * Math.pow(x, 2) -
      3.54157386665521E-05 * Math.pow(x, 3) + 7.87448131414697E-07 * Math.pow(x, 4) - 1.02361136114077E-08 * Math.pow(x,
        5) + 7.2128868872547E-11 * Math.pow(x, 6) - 2.12844187739757E-13 * Math.pow(x, 7);

  },
  rangRate3: function (x) {
    return 1.15159043287822 - 0.0877250643847525 * x + 0.00281297037078605 * Math.pow(x, 2) -
      4.92030942670029E-05 * Math.pow(x, 3) + 5.0709236128221E-07 * Math.pow(x, 4) - 3.07976848571464E-09 * Math.pow(x,
        5) + 1.0209885402886E-11 * Math.pow(x, 6) - 1.42597929843806E-14 * Math.pow(x, 7);

  },
  rangRate4: function (x) {
    return -1.17509656E-22 * Math.pow(x, 6) + 1.244978219333E-18 * Math.pow(x, 5) - 3.41752276522394E-15 * Math.pow(x, 4) - 1.08611167104575E-11 * Math.pow(x, 3) + 1.19973853575719E-07 * Math.pow(x, 2) - 3.04110364623966E-06 * x + 0.000344332464464969;

  },
}