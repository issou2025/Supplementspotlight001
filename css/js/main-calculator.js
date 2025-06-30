document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calorie-calculator');
    const resultsDiv = document.getElementById('results');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get values
        const age = parseInt(document.getElementById('age').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseInt(document.getElementById('height').value);
        const activity = parseFloat(document.getElementById('activity').value);
        const goal = parseInt(document.getElementById('goal').value);

        // Validate
        if (isNaN(age) || isNaN(weight) || isNaN(height)) {
            resultsDiv.innerHTML = `<p style="color: red; text-align: center;">Please fill in all fields with valid numbers.</p>`;
            resultsDiv.style.display = 'block';
            return;
        }

        // Calculate BMR (Mifflin-St Jeor Equation)
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Calculate TDEE
        const tdee = bmr * activity;

        // Calculate Final Calories
        const finalCalories = tdee + goal;

        // Calculate Macros
        // Protein: 2g per kg of bodyweight
        const proteinGrams = Math.round(weight * 2);
        const proteinCalories = proteinGrams * 4;
        
        // Fat: 25% of total calories
        const fatCalories = finalCalories * 0.25;
        const fatGrams = Math.round(fatCalories / 9);

        // Carbs: The rest
        const carbCalories = finalCalories - proteinCalories - fatCalories;
        const carbGrams = Math.round(carbCalories / 4);

        // Display results
        resultsDiv.innerHTML = `
            <h2>Your Estimated Results</h2>
            <p style="text-align:center; color: #555;">These are estimates to be used as a starting point. Adjust based on your results.</p>
            <div class="results-grid" style="margin-top: 2rem;">
                 <div class="result-item" style="background-color: #e9f5db; padding: 1rem; border-radius: 8px;">
                    <h3>Maintenance Calories</h3>
                    <p>${Math.round(tdee)} <span>kcal/day</span></p>
                </div>
                 <div class="result-item" style="background-color: #cfe1b9; padding: 1rem; border-radius: 8px;">
                    <h3>Your Goal Calories</h3>
                    <p>${Math.round(finalCalories)} <span>kcal/day</span></p>
                </div>
            </div>
            <h3 style="text-align:center; margin-top: 2.5rem;">Daily Macronutrient Split</h3>
             <div class="results-grid">
                <div class="result-item">
                    <h3>Protein</h3>
                    <p>${proteinGrams}<span>g</span></p>
                </div>
                <div class="result-item">
                    <h3>Carbs</h3>
                    <p>${carbGrams}<span>g</span></p>
                </div>
                <div class="result-item">
                    <h3>Fat</h3>
                    <p>${fatGrams}<span>g</span></p>
                </div>
            </div>
        `;
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    });
});