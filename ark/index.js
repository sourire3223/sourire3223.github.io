(() => {
	function calculate(event) {
		var adva = parseInt(document.getElementById('adva').value);
		var inte = parseInt(document.getElementById('inte').value);
		var prim = parseInt(document.getElementById('prim').value);
		var fund = parseInt(document.getElementById('fund').value);
		var money = parseInt(document.getElementById('money').value);
		var exp = 2000 * adva + 1000 * inte + 400 * prim + 200 * fund;

		var res = money / exp;
		var ref = 1334796 / 1111400;

		var common_text = `reference money / exp ratio: ${ref.toFixed(5)}, get: ${res.toFixed(5)} (${money} / ${exp})`
		if (money / exp > ref) {
			document.getElementById('out').innerHTML = "money too much.<br>" + common_text;
		}
		else {
			document.getElementById('out').innerHTML = "exp too much.<br>" + common_text;
		}
	}
	for (let element of document.getElementsByTagName("input")) {
		element.addEventListener("input", calculate)
	}


})();


