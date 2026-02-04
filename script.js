async function placeOrder() {
  const studentName = document.getElementById("studentName").value.trim();
  const foodInput = document.getElementById("foodItems").value.trim();
  const quantity = document.getElementById("quantity").value || 1;

  if (!studentName || !foodInput) {
    alert("Fill all fields!");
    return;
  }

  const foodItems = foodInput.split(",");

  const res = await fetch("/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentName, foodItems, quantity })
  });

  const data = await res.json();

  document.getElementById("result").innerText =
    "Order placed! Your Order ID (Hash): " + data.orderHash;
}
