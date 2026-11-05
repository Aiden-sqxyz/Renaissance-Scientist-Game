// All paths are original drawings. No downloaded artwork or icon dependencies.
export function mark() {
  return `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="18"/><ellipse cx="24" cy="24" rx="8" ry="22" transform="rotate(32 24 24)"/><path d="M3 24h42M24 3v42M9 9l30 30"/><circle cx="24" cy="24" r="3" class="solid"/></svg>`;
}
export function icon(key) {
  const paths = {
    money: '<ellipse cx="12" cy="7" rx="8" ry="3"/><path d="M4 7v10c0 4 16 4 16 0V7M4 12c0 4 16 4 16 0"/>',
    research: '<path d="M4 5c3-1 5 0 8 2 3-2 5-3 8-2v14c-3-1-5 0-8 2-3-2-5-3-8-2V5Zm8 2v14M7 9l2 1m-2 3 2 1m6-4 2-1m-2 5 2-1"/>',
    reputation: '<path d="m12 3 2.5 5.2 5.7.8-4.1 4 .9 5.7-5-2.7-5 2.7.9-5.7-4.1-4 5.7-.8L12 3Z"/>',
    safety: '<path d="m12 3 8 3v6c0 5-5 8-8 10-3-2-8-5-8-10V6l8-3Z"/><path d="m8 12 3 3 5-6"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[key]}</svg>`;
}
export function heavens() {
  const ticks = Array.from({length:72},(_,i)=>{ const a=i*Math.PI/36, r=i%6===0?167:173; return `<path d="M${250+r*Math.cos(a)} ${223+r*Math.sin(a)}L${250+180*Math.cos(a)} ${223+180*Math.sin(a)}"/>`; }).join('');
  const hatches=Array.from({length:17},(_,i)=>`<path d="M${211+i*3} ${380-i*.23}l-10 24"/>`).join('');
  return `<svg class="heavens" viewBox="0 0 500 490" role="img" aria-label="Original drawing of an armillary sphere: intersecting astronomical rings above a turned pedestal. Decorative, not a scientific model.">
    <defs><radialGradient id="rs-glow"><stop stop-color="#b08b48" stop-opacity=".13"/><stop offset="1" stop-color="#b08b48" stop-opacity="0"/></radialGradient><linearGradient id="rs-metal"><stop stop-color="#d9bf81"/><stop offset=".5" stop-color="#816639"/><stop offset="1" stop-color="#c4a967"/></linearGradient></defs>
    <circle cx="250" cy="223" r="240" fill="url(#rs-glow)" stroke="none"/>
    <g fill="none" stroke="currentColor" stroke-width=".65" opacity=".27"><path d="M250 8v421M25 223h450M71 44l358 358M71 402 429 44"/><circle cx="250" cy="223" r="206" stroke-dasharray="2 7"/><circle cx="250" cy="223" r="192"/><path d="M39 12v26M26 25h26M445 394v24M433 406h24"/></g>
    <g fill="none" stroke="url(#rs-metal)" stroke-width="1.1">${ticks}<circle cx="250" cy="223" r="180"/><circle cx="250" cy="223" r="165"/><circle cx="250" cy="223" r="160"/><ellipse cx="250" cy="223" rx="66" ry="160" transform="rotate(-24 250 223)"/><ellipse cx="250" cy="223" rx="72" ry="165" transform="rotate(-24 250 223)"/><ellipse cx="250" cy="223" rx="163" ry="51" transform="rotate(17 250 223)"/><ellipse cx="250" cy="223" rx="169" ry="57" transform="rotate(17 250 223)"/><ellipse cx="250" cy="223" rx="160" ry="83" transform="rotate(-44 250 223)"/><path d="m174 54 152 338M168 56l152 338M89 224c93-69 232-67 323 0M89 222c90 62 232 68 323 0"/>
    <circle cx="250" cy="223" r="25" fill="#22221c"/><ellipse cx="250" cy="223" rx="11" ry="25"/><path d="M225 223h50m-46-13q21-10 42 0m-42 26q21 10 42 0"/><path d="M240 403v13l-12 9v7h44v-7l-12-9v-13M228 432l-30 18h104l-30-18M192 455h116v6H192z"/>${hatches}</g>
    <g fill="currentColor" opacity=".6" font-family="Georgia, serif" font-size="10" letter-spacing="2"><text x="245" y="28">N</text><text x="246" y="428">S</text><text x="36" y="227">O</text><text x="455" y="227">E</text><text x="153" y="486">FIG. I · THE UNCERTAIN HEAVENS</text></g>
    <g fill="currentColor" opacity=".65"><circle cx="434" cy="87" r="2"/><circle cx="67" cy="356" r="1.5"/><circle cx="403" cy="393" r="1"/><path d="m84 75 2-6 2 6 6 2-6 2-2 6-2-6-6-2Z"/><path d="m428 345 1.5-5 1.5 5 5 1.5-5 1.5-1.5 5-1.5-5-5-1.5Z"/></g></svg>`;
}
