var a = new String("abc");
console.log(typeof a)   //object
console.log(a)         //[String:"abc"]


//自行封装基本类型值，使用Object()函数
var b = "abc";
var c = Object(b);
console.log(c);//"object"


//强势转换
var a = 42;
var b = a + "";    //隐式强制转换，"42"
var c = String(a); //显示强制转换


//字符串和数字之间的显示转换——String(),Number()


// 解析数字字符串：parseInt():解析从左到右的顺序，遇到非数字字符就停止

