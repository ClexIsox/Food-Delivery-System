async function placeOrder() {
    const studentName = document.getElementById('studentName').value.trim();
    const foodInput = document.getElementById('foodItems').value.trim();
    const quantity = document.getElementById('quantity').value || 1;

    if (!studentName || !foodInput) {
        alert("Please enter your name and food items!");
        return;
    }

    const foodItems = foodInput.split(',');

    try {
        const res = await fetch('/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentName, foodItems, quantity })
        });

        const data = await res.json();

        if (data.orderHash) {
            document.getElementById('result').innerText =
                "Order placed! Your Order ID: " + data.orderHash;
        } else {
            document.getElementById('result').innerText =
                "❌ Hash not generated!";
        }

    } catch (err) {
        console.error(err);
        document.getElementById('result').innerText =
            "❌ Server error!";
    }
}
