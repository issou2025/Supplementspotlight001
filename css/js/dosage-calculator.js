document.addEventListener('DOMContentLoaded', () => {
    const calculatorForm = document.getElementById('dosage-calculator-form');
    const resultDiv = document.getElementById('calculator-result');

    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const weight = parseFloat(document.getElementById('weight').value);
            const unit = document.getElementById('unit').value;
            const activity = parseFloat(document.getElementById('activity').value);
            
            if (isNaN(weight) || weight <= 0) {
                resultDiv.innerHTML = `<p style="color: red;">Please enter a valid weight.</p>`;
                return;
            }

            // Convert weight to kg if it's in lbs
            const weightInKg = (unit === 'lbs') ? weight * 0.453592 : weight;

            // Simple calculation: weight in kg * activity multiplier
            const proteinIntake = (weightInKg * activity).toFixed(1);
            
            resultDiv.innerHTML = `
                <h3>Your Estimated Daily Protein Intake:</h3>
                <p class="rating" style="margin-bottom: 0;">${proteinIntake} <span>grams</span></p>
                <small>This is an estimate. Consult with a healthcare professional for personalized advice.</small>
            `;
            resultDiv.style.display = 'block';
        });
    }
});