// Usage:
// 1. Fill the <SETUP YOUR INFO> section first
// 2. Go to "PP支付平台"下的"繳付帳單"
// 3. Run this in Google Chrome (Tested) or Firefox (Not tested) console...

// <SETUP YOUR INFO>

var __YOUR_TAX_ID__="00721831101";

// Bank Account or Credit Card Payment Method Code
var __YOUR_DEBITACCT_CODE__ = "0"; 
// How to get the code?
// Please select from ui once, then copy value from running this line in console:
// document.querySelector("input[id$=_DebitAcctList-value]").value

// </SETUP YOUR INFO>

// CODE STARTS...Do not modify scripts below
var oDocRoot = document.removeChild(document.children[0]);
var ifr = document.createElement("iframe");
ifr.width = "100%"; 
ifr.height = "100%"; 
ifr.frameBorder = 0;
document.appendChild(ifr);
ifr.src = window.location;
var contentWindow = ifr.contentWindow;

function main() {

	var step = 0;
	var stepFunc = [];
	stepFunc[0] = () => { 
	contentWindow.setPayeeRadioFocus(1);
	contentWindow.document.querySelector("input[id$=MerchantList-value]").value="0008";
	contentWindow.document.querySelector("input[name$=_BillAcct]").value=__YOUR_TAX_ID__;
	contentWindow.document.querySelector("input[name$=_PaymentAmt]").value=1;
	contentWindow.document.querySelector("input[id$=_DebitAcctList-value]").value = __YOUR_DEBITACCT_CODE__;
	contentWindow.refreshAccount();
	}
	stepFunc[1] = () => { contentWindow.document.querySelector("input[id$=_BillTypeList-value]").value="01";
	contentWindow.document.querySelector("a[id=okBtn]").click();
	 };
	stepFunc[2] = () => {
	contentWindow.document.querySelector("div[class=btn-grn-1]").querySelector("a[onclick^=execute]").click();
	}
	stepFunc[3] = () => {
	contentWindow.goToRegPayeeListPage();
	}

	var stepFuncSelectors = [
	()=> { var e = contentWindow.document.querySelector("input[id$=MerchantList-value]"); return contentWindow.utag_data.page_name_en.endsWith(":start") && (e != null) && (e.value!="0008"); },
	()=> { var e = contentWindow.document.querySelector("input[id$=_BillTypeList-value]"); return contentWindow.utag_data.page_name_en.endsWith(":start") && (e != null) && (e.value!="01"); },
	()=> { return contentWindow.utag_data.page_name_en.endsWith(":confirm"); },
	()=> { return contentWindow.utag_data.page_name_en.endsWith(":acknowledgement"); },
	];

	for (var f of stepFuncSelectors) {
	 if (f()) { break; } 
	 step++;
	};
	if (step >= stepFunc.length)
		console.error("Step cannot be determined."); 
	else 
		stepFunc[step]();
}

ifr.onload = main;
