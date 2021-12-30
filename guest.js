const kolomNama = document.querySelector('#kolom-nama')
const kolomMember = document.querySelector('#kolom-member')
const kolomLayanan = document.querySelector('#kolom-layanan')
const kolomPaket = document.querySelector('#kolom-paket')
const kolomBerat = document.querySelector('#kolom-berat')
const kolomMasuk = document.querySelector('#kolom-masuk')
const kolomEstimasi = document.querySelector('#kolom-estimasi')
const kolomStatus = document.querySelector('#kolom-status')
const kolomCek = document.querySelector('#kolom-cek')

let urlunik = localStorage.getItem("kodepesan");
let url = `http://soclean.vincentmoel.com/public/api/transaction/${urlunik}`;

function cekOrder() {
  localStorage.setItem("kodepesan", kolomCek.value);
  window.location.href="guest.html";
}



  const renderData = (posts) => {
    let tampil = posts.data;
    console.log(tampil);
  
    kolomNama.innerHTML = tampil.name
    kolomMember.innerHTML = tampil.member
    kolomLayanan.innerHTML = tampil.layanan
    kolomPaket.innerHTML = tampil.paket
    kolomBerat.innerHTML = tampil.berat
    kolomMasuk.innerHTML = tampil.tgl_masuk
    kolomEstimasi.innerHTML = tampil.tgl_estimasi
    kolomStatus.innerHTML = tampil.status
    
  }
  
  fetch(url)
    .then(res => res.json())
    .then(data => renderData(data))

