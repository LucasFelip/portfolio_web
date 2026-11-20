import React from 'react';

// Foto opcional: coloque `foto-lucas.jpg` (ou .png/.webp) em src/assets e ela aparece no hero. O glob é resolvido
// no build; sem o arquivo, o avatar mostra as iniciais no estilo terminal (sem requisição que dê 404).
const photos = import.meta.glob('/src/assets/foto-lucas.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });
const photoUrl = Object.values(photos)[0];

const ProfileAvatar = ({ className = '' }) => (
  <div
    className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/50 bg-primary/10 font-mono text-xl font-bold text-primary-text shadow-lg shadow-black/40 ${className}`}
    aria-hidden="true"
  >
    {photoUrl ? <img src={photoUrl} alt="" className="h-full w-full object-cover" /> : <span>LF</span>}
  </div>
);

export default ProfileAvatar;
