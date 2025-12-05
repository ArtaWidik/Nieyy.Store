// SIMPAN RIWAYAT PEMBELIAN
function saveHistory() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  let total = 0;
  const items = cart.map((i) => {
    total += i.price * i.qty;
    return `${i.qty}x ${i.name} (Rp ${numberFormat(i.price * i.qty)})`;
  });

  const entry = {
    id: Date.now(),
    items,
    total,
    date: new Date().toLocaleString(),
    status: "Menunggu Bukti",
  };

  history.push(entry);
  localStorage.setItem("history", JSON.stringify(history));
}

// TAMPILKAN RIWAYAT
function openHistory() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  const box = document.getElementById("historyList");

  if (history.length === 0) {
    box.innerHTML = `<p style="text-align:center; opacity:0.7;">Belum ada riwayat.</p>`;
  } else {
    box.innerHTML = history
      .reverse()
      .map(
        (h) => `
      <div class="history-item">
        <b>Waktu:</b> ${h.date}<br>
        <b>Item:</b><br>${h.items.join("<br>")}
        <br><b>Total: Rp ${numberFormat(h.total)}</b><br>
        <b>Status:</b> ${h.status}
      </div>
    `
      )
      .join("");
  }

  document.getElementById("historyModal").style.display = "flex";
}

function closeHistory() {
  document.getElementById("historyModal").style.display = "none";
}

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang kosong");
    return;
  }

  saveHistory(); // <--- TAMBAHKAN INI

  document.getElementById("qrisModal").style.display = "flex";
}
