async function checkOrder() {
    const orderHash = document.getElementById('orderHash').value;
    const res = await fetch(`/order/${orderHash}`);
    if (res.status === 404) {
        document.getElementById('result').innerText = "Order not found!";
        return;
    }
    const order = await res.json();
    document.getElementById('result').innerText = JSON.stringify(order, null, 2);
}
