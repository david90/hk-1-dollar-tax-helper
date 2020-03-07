// Usage:
// 1. Fill the <SETUP YOUR INFO> section first
// 2. Go to "PP支付平台"下的"繳付帳單"
// 3. Run this in Google Chrome or Firefox console...by yourself after each refresh...

// <SETUP YOUR INFO>

var __YOUR_TAX_ID__="00721831101";

// Bank Account or Credit Card Payment Method Code
var __YOUR_DEBITACCT_CODE__ = "0"; 
// How to get the code?
// Please select from ui once, then copy value from running this line in console:
// document.querySelector("input[id$=_DebitAcctList-value]").value

// </SETUP YOUR INFO>

// CODE STARTS...Do not modify scripts below
var step = 0;
var stepFunc = [];
stepFunc[0] = () => { 
setPayeeRadioFocus(1);
document.querySelector("input[id$=MerchantList-value]").value="0008";
document.querySelector("input[name$=_BillAcct]").value=__YOUR_TAX_ID__;
document.querySelector("input[name$=_PaymentAmt]").value=1;
document.querySelector("input[id$=_DebitAcctList-value]").value = __YOUR_DEBITACCT_CODE__;
refreshAccount();
}
stepFunc[1] = () => { document.querySelector("input[id$=_BillTypeList-value]").value="01";
document.querySelector("a[id=okBtn]").click();
 };
stepFunc[2] = () => {
document.querySelector("div[class=btn-grn-1]").querySelector("a[onclick^=execute]").click();
}
stepFunc[3] = () => {
goToRegPayeeListPage();
}

var stepFuncSelectors = [
()=> { var e = document.querySelector("input[id$=MerchantList-value]"); return utag_data.page_name_en.endsWith(":start") && (e != null) && (e.value!="0008"); },
()=> { var e = document.querySelector("input[id$=_BillTypeList-value]"); return utag_data.page_name_en.endsWith(":start") && (e != null) && (e.value!="01"); },
()=> { return utag_data.page_name_en.endsWith(":confirm"); },
()=> { return utag_data.page_name_en.endsWith(":acknowledgement"); },
];

for (var f of stepFuncSelectors) {
 if (f()) { break; } 
 step++;
};
stepFunc[step]();
