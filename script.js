const API_KEY = 'a1effa07dd3b0d83ffd88d17';
const currencyOne = document.querySelector('#currency-one');
const amountOne = document.querySelector('.amount-one');
const currencyTwo = document.querySelector('#currency-two');
const amountTwo = document.querySelector('.amount-two');
const swapBtn = document.querySelector('.swap');
const rateInfo = document.querySelector('.rate-info');
const updateDate = document.querySelector('.update-date');

const calculate = () => {
	fetch(
		`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${currencyOne.value}/${currencyTwo.value}/${amountOne.value}`
	)
		.then(res => res.json())
		.then(data => {
			const currency1 = currencyOne.value;
			const currency2 = currencyTwo.value;

			const rate = data.conversion_rate;
			rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(4)} ${currency2}`;
			amountTwo.value = (amountOne.value * rate).toFixed(2);
			const updateDateInfo = data.time_last_update_utc;
			updateDate.textContent = updateDateInfo.slice(0, -14);
		});
};
calculate();

swapBtn.addEventListener('click', calculate);
document.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		calculate();
	}
});
currencyTwo.addEventListener('change', calculate);
