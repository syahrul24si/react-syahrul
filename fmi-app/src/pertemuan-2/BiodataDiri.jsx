import React from 'react';
import './custom.css'; 
import Deskripsi from './Deskripsi';
import Nama from './Nama';
import NIM from './NIM';
import ProgramStudi from './ProgramStudi';
import Kelas from './Kelas';
import Hobi from './Hobi';

function BiodataDiri() {
  return (
    <div className="wadah-utama">
      <div className="bagian-atas">
        <Deskripsi />
        {/* Pastikan gambar1.jpg sudah ada di folder public/img/ */}
        <img src="/img/profpic.jpeg" alt="Profile" className="gambar-bulat" />
      </div>

      <div className="judul-biodata">Biodata</div>
      <hr className="garis-pemisah" />

      <div className="daftar-data">
        <Nama />
        <NIM />
        <ProgramStudi />
        <Kelas />
        <Hobi />
      </div>
    </div>
  );
}

export default BiodataDiri;