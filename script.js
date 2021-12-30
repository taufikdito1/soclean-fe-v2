// Script Untuk Sidebar
let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e)=>{
 let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
 arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");


// ==========================================================================================================

// Script Untuk Fetch Data
const tampilData = document.querySelector('.tampil-data');

const url = 'http://soclean.vincentmoel.com/public/api/transaction';

let output = '';
let statusNow = ''
let sisaStatus = ''

const renderData = (posts) => {
  
  
  let tampil = posts.data;
  tampil.forEach(data => {
    if (data.status === 'Proses Cuci') {
      statusNow = 'Proses Cuci'
      sisaStatus = 'Dapat Diambil'
    } else {
        statusNow = 'Dapat Diambil'
        sisaStatus = 'Proses Cuci'

    }
    output += `
      <tr>
        <td>${data.name}</td>
        <td>${data.member}</td>
        <td>${data.kode_pesanan}</td>
        <td>${data.layanan}</td>
        <td>${data.paket}</td>
        <td>${data.berat}</td>
        <td>${data.tgl_masuk}</td>
        <td>${data.tgl_estimasi}</td>
        <td class="select">
            <select id="kolom-status">
              <option value="${statusNow}">${statusNow}</option>
              <option value="${sisaStatus}">${sisaStatus}</option>
            </select>
        </td>
        <td>${data.harga}</td>
        <td>
          <button class="button is-danger" onClick="editData(${data.id})">Edit</button>
        </td>
      </tr>
    `;
    tampilData.innerHTML = output;
  })
  
}

fetch(url)
  .then(res => res.json())
  .then(data => renderData(data))

// =====================================================================================================

// Script POST Data
const kolomNama = document.querySelector('#kolom-nama')
const kolomMember = document.querySelector('#kolom-member')
const kolomLayanan = document.querySelector('#kolom-layanan')
const kolomPaket = document.querySelector('#kolom-paket')
const kolomBerat = document.querySelector('#kolom-berat')
const kolomMasuk = document.querySelector('#kolom-masuk')
const kolomEstimasi = document.querySelector('#kolom-estimasi')

function tambahData() {
  let kolomPesanan = "SC" + Math.floor(1000 + Math.random() * 9000).toString();
  let kolomHarga = '';
  let kolomTotal = '';
  if (kolomLayanan.value === "Cuci Kering") {
      kolomHarga = 3000;
      if (kolomPaket.value === "Reguler") {
          kolomTotal = (kolomHarga + 1000) * kolomBerat.value
      } else {
          kolomTotal = (kolomHarga + 2000) * kolomBerat.value
      }
  } else if (kolomLayanan.value === "Cuci Kering + Setrika") {
      kolomHarga = 4000
      if (kolomPaket.value === "Reguler") {
          kolomTotal = (kolomHarga + 1000) * kolomBerat.value
      } else {
          kolomTotal = (kolomHarga + 2000) * kolomBerat.value
      }
  } else {
      kolomHarga = 2000
      if (kolomPaket.value === "Reguler") {
          kolomTotal = (kolomHarga + 1000) * kolomBerat.value
      } else {
          kolomTotal = (kolomHarga + 2000) * kolomBerat.value
      }
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: kolomNama.value,
      member: kolomMember.value,
      kode_pesanan: kolomPesanan,
      layanan: kolomLayanan.value,
      paket: kolomPaket.value,
      berat: kolomBerat.value,
      tgl_masuk: kolomMasuk.value,
      tgl_estimasi: kolomEstimasi.value,
      status: "Proses Cuci",
      harga: kolomTotal
    })
  })

  window.location.href="admin.html";
}

// ===============================================================================

// Script untuk Edit Data
function editData(kode){
  window.location.reload(true);
  fetch(`${url}/${kode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: sisaStatus,
      _method: 'PUT'
    })
  })
  console.log(sisaStatus);
}