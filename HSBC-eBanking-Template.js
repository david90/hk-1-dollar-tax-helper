// Usage:
// 1. Fill the <SETUP YOUR INFO> section first
// 2. Go to "我的銀行" -> "轉帳"下的"繳交稅款"
// 3. Run this in Google Chrome or Firefox (?) console
// 4. If you want to stop, refresh the page

// <SETUP YOUR INFO>

var __FROM_ACCOUNT__ = "0721-0831-1001-1111";
var __FROM_ACCOUNT_EXTRA__ = ""; //Not required, except you choose e.g "港元往來", "澳元儲蓄"
var __TAX_ACCOUNT__ = "00721831101"

// </SETUP YOUR INFO>

// CODE STARTS...Do not modify scripts below
var __AMOUNT_PER_PAYMENT__ = 1; 
var paidAmount = 0;

var __TAX_TYPE__ = "01";
	
var StepControl = function() {
	
	var selectPaymentStartPageFunc = 
	()=> {
		var checkPaymentStartPageFunc = ()=> {
			if (utag.data.page_url.endsWith("move-money/new-transaction/1/configure/")) {
				var loaderNode = document.querySelector('div[id="_loaderNode"]');
				if (loaderNode) {
					return loaderNode.style.opacity == 0 && loaderNode.style.display == "none";
				}
			}
			return false;
		};
		
		if (checkPaymentStartPageFunc()) {
			var isStep_1 = true;
			var s = document.querySelector('[data-dojo-attach-point="_fromAccountSpan"]').innerText;
			if (s.includes(__FROM_ACCOUNT__) && s.includes(__FROM_ACCOUNT_EXTRA__))
				isStep_1 &= true;
			
			s = document.querySelector('div[id$="1_newDomesticPayeeAccountType"] > [data-dojo-attach-point="_BillTypeselected"]').innerText;
			if (s.startsWith(__TAX_TYPE__))
				isStep_1 &= true;
			
			return isStep_1 ? 1 : 0;
		}
		return -1;
	};
	
	var stepFuncSelectors = [
	()=> {
		return selectPaymentStartPageFunc() == 0;
	},
	()=> {
		return selectPaymentStartPageFunc() == 1;
	},
	()=> {
		return utag.data.page_url.endsWith("move-money/newtransaction/verify/m2nmn/now");
	},
	()=> {
		return utag.data.page_url.endsWith("move-money/newtransaction/confirm/m2nmn/now");
	},
	];
	
	var stepFunc = 
	[
		()=> {
			var fromAccDropDownBox = document.querySelector("div[id$=_fromAccount]").querySelector("div .selectDropDown").querySelector("table");
			fromAccDropDownBox.dispatchEvent(new Event('pointerdown'));

			var fromAccCandidate = [];

			var fromAccExtraCandidate = [];

			var fromAccDropDownBoxMenu = document.querySelector("[id=" + fromAccDropDownBox.id + "_menu]");
			for (var elem of fromAccDropDownBoxMenu.querySelectorAll('.accountDetailsactSlOption')) {
			  if (elem.innerText == __FROM_ACCOUNT__) {
				var tdElem = elem.closest("td");
				
				if (tdElem.classList.contains("parentSection")) {
				  tdElem = null;
				} else if (tdElem.classList.contains("childSection")) {
				  var accExtra = tdElem.querySelector("span.optionItem.childInner").querySelector(".title").innerText;
				  fromAccExtraCandidate.push(accExtra);
				  if (__FROM_ACCOUNT_EXTRA__.length > 0 && __FROM_ACCOUNT_EXTRA__ != accExtra) {
					tdElem = null
				  }
				}
				
				if (tdElem)
				  fromAccCandidate.push(tdElem);
			  }
			}

			if (fromAccCandidate.length == 0) {
			  var err = "No choice matches " + __FROM_ACCOUNT__;
			  alert(err);
			  throw new Error(err);
			} 
			if (fromAccCandidate.length > 1 && fromAccExtraCandidate.length > 1) {
			  var err = "You have to fill __FROM_ACCOUNT_EXTRA__ with one of the following choices: " + fromAccExtraCandidate;
			  alert(err);
			  throw new Error(err);
			}

			fromAccCandidate[0].click()

			var payeeSection = document.querySelector("div[id$=_NewCompanyPayee_1]");
			var taxTypeDropDownBox = payeeSection.querySelector(".newDomesticPayeeAccount").querySelector("table");

			taxTypeDropDownBox.dispatchEvent(new Event("pointerdown"));
			var taxTypeDropDownBoxMenu = document.querySelector("[id=" + taxTypeDropDownBox.id + "_menu]");
			taxTypeDropDownBoxMenu.querySelector("tr[aria-label^='"+ __TAX_TYPE__ +"']").click();
		},
		()=> {
			var payeeSection = document.querySelector("div[id$=_NewCompanyPayee_1]");
			var taxAccInputBox = payeeSection.querySelector("div[id$=NewCompanyPayee_1_merchantAccountNumber]").querySelector(".dijitInputField > input[type=text]");
			taxAccInputBox.dispatchEvent(new Event("focus"));
			taxAccInputBox.value = __TAX_ACCOUNT__

			var amountInputBox = document.querySelector("div[id$=_CurrencyTextBox]").querySelector(".dijitInputField > input[type=text]");
			amountInputBox.closest(".dijitTextBox").dispatchEvent(new Event("focus"));
			amountInputBox.value = __AMOUNT_PER_PAYMENT__.toString();
			
			taxAccInputBox.dispatchEvent(new Event("focus"));

			var continueBtn = document.querySelector("[data-dojo-attach-point=_continueButton]");
			continueBtn.click();
		},
		()=> {
			var confirmBtn = document.querySelector("[data-dojo-attach-point=_confirmTxn]");
			confirmBtn.click();
		},
		()=> {
			var nextBtn = document.querySelector("[data-dojo-attach-point=_makeAnotherTxn]");
			nextBtn.click();
			
			paidAmount += __AMOUNT_PER_PAYMENT__;
			console.log("You paid $" + paidAmount.toString());
			
			document.dispatchEvent(new Event("mousemove"));
		},
	];
	
	return {
		start: ()=> {
			setInterval(()=> {
				var step = 0;
				for (var f of stepFuncSelectors) {
					if (f()) { break; } 
					step++;
				};
				if (step >= stepFunc.length)
					console.error("Step cannot be determined."); 
				else 
					stepFunc[step]();
			}, 100);
		},		
	};
}();

StepControl.start();
