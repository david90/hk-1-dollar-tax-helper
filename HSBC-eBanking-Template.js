var __FROM_ACCOUNT__ = "0721-0831-1001-1111";
var __FROM_ACCOUNT_EXTRA__ = ""; //Not required, except you choose e.g "港元往來", "澳元儲蓄"
var __TAX_ACCOUNT__ = "00721831101"

var paidAmount = 0;

function main() {

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
	var __TAX_TYPE__ = "01";
	taxTypeDropDownBoxMenu.querySelector("tr[aria-label^='"+ __TAX_TYPE__ +"']").click();

	setTimeout(function() {
		var taxAccInputBox = payeeSection.querySelector("div[id$=NewCompanyPayee_1_merchantAccountNumber]").querySelector(".dijitInputField > input[type=text]");
		taxAccInputBox.dispatchEvent(new Event("focus"));
		taxAccInputBox.value = __TAX_ACCOUNT__

		var amountInputBox = document.querySelector("div[id$=_CurrencyTextBox]").querySelector(".dijitInputField > input[type=text]");
		amountInputBox.closest(".dijitTextBox").dispatchEvent(new Event("focus"));
		amountInputBox.value = "1";
		
		taxAccInputBox.dispatchEvent(new Event("focus"));

		var continueBtn = document.querySelector("[data-dojo-attach-point=_continueButton]");
		continueBtn.click();
		
		setTimeout(function() {
			var confirmBtn = document.querySelector("[data-dojo-attach-point=_confirmTxn]");
			confirmBtn.click();
			
			setTimeout(function() {
				var nextBtn = document.querySelector("[data-dojo-attach-point=_makeAnotherTxn]");
				nextBtn.click();
				
				console.log("You paid $" + ++paidAmount);
				
				setTimeout(function() {
					main();
				}, 6000);
				
			}, 3000);
			
		}, 3000);
		
	} , 1000)

}

main();

