// ULAB laboratory controls: 24px grid, 1.65px stroke, rounded terminals.
// Keep labels on the owning button; these SVGs are decorative and inherit state color.
const paths = Object.freeze({
  catalog: '<rect x="3.5" y="4" width="5.5" height="5.5" rx="1.25"/><rect x="3.5" y="14.5" width="5.5" height="5.5" rx="1.25"/><path d="M13 5.5h7.5M13 8h5M13 16h7.5M13 18.5h5"/>',
  explode: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  xray: '<path d="M7 3H4a1 1 0 0 0-1 1v3m14-4h3a1 1 0 0 1 1 1v3M3 17v3a1 1 0 0 0 1 1h3m10 0h3a1 1 0 0 0 1-1v-3"/><path d="m12 6.5 5 2.75v5.5l-5 2.75-5-2.75v-5.5L12 6.5Zm-5 2.75 5 2.75 5-2.75M12 12v5.5"/>',
  motion: '<path d="M12 2.5v5m-2.5-2.5L12 7.5 14.5 5"/><path d="M7.5 10.5h9l3 7.5a1.5 1.5 0 0 1-1.4 2H5.9a1.5 1.5 0 0 1-1.4-2l3-7.5Z"/><path d="m7.5 10.5 1 5h7l1-5"/>',
  camera: '<path d="M8 7 9.5 4.5h5L16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3Z"/><circle cx="12" cy="13.5" r="3.5"/><path d="M17.5 10h.5"/>',
  lighting: '<path d="M9 17v-1c0-1.5-3-3-3-6.5a6 6 0 0 1 12 0c0 3.5-3 5-3 6.5v1H9ZM9.5 20h5M11 22h2"/><path d="m9.5 10 2.5 2.5 2.5-2.5M12 12.5V17"/>',
  moon: '<path d="M20.5 13.1A8.75 8.75 0 0 1 10.9 3.5a8.75 8.75 0 1 0 9.6 9.6Z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.75 8.25-2 5.5-5.5 2 2-5.5 5.5-2Z"/><path d="m10.25 10.25 3.5 3.5"/>',
  panel: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M15.5 4v16"/><path class="environment-handle-arrow" d="m7.5 9 3 3-3 3"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.75-2.5 2-2.5 3.75"/><circle cx="12" cy="16" r=".9" fill="currentColor" stroke="none"/>',
  close: '<path d="m6.5 6.5 11 11m0-11-11 11"/>',
  chevronDown: '<path d="m7 9.5 5 5 5-5"/>',
  arrowUpRight: '<path d="M7 17 17 7M7 7h10v10"/>',
  plus: '<path d="M5.5 12h13M12 5.5v13"/>',
  minus: '<path d="M5.5 12h13"/>'
});

export function labIcon(name, size = 22) {
  const shape = paths[name];
  if (!shape) throw new Error('Unknown laboratory icon: ' + name);
  return `<svg xmlns="http://www.w3.org/2000/svg" class="lab-icon" data-lab-icon="${name}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${shape}</svg>`;
}
