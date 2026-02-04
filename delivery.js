async function checkOrder() {
  const hash = document.getElementById("orderHash").value.trim();
  const card = document.getElementById("orderCard");

  if (!hash) {
    alert("Please paste an Order Hash!");
    return;
  }

  try {
    const res = await fetch("/order/" + hash);

    if (!res.ok) {
      card.innerHTML = "❌ Order not found!";
      return;
    }

    const order = await res.json();

    card.innerHTML = `
      <h3>📦 Order Details</h3>
      <p><b>Student:</b> ${order.studentName}</p>
      <p><b>Food:</b> ${order.foodItems.join(", ")}</p>
      <p><b>Quantity:</b> ${order.quantity}</p>
      <p><b>Time:</b> ${order.time}</p>
    `;
  } catch (err) {
    console.error(err);
    card.innerHTML = "❌ Server error!";
  }
}
