function flyToTarget(sourceEl: HTMLElement, targetId: string, bumpFn: () => void) {
  const target = document.getElementById(targetId);
  if (!sourceEl || !target) return;

  const imgRect = sourceEl.getBoundingClientRect();
  const tRect = target.getBoundingClientRect();

  const clone = sourceEl.cloneNode(true) as HTMLElement;
  clone.style.position = 'fixed';
  clone.style.left = imgRect.left + 'px';
  clone.style.top = imgRect.top + 'px';
  clone.style.width = imgRect.width + 'px';
  clone.style.height = imgRect.height + 'px';
  clone.style.pointerEvents = 'none';
  clone.style.transition = 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease';
  clone.style.zIndex = '9999';
  document.body.appendChild(clone);

  const translateX = tRect.left + tRect.width / 2 - (imgRect.left + imgRect.width / 2);
  const translateY = tRect.top + tRect.height / 2 - (imgRect.top + imgRect.height / 2);

  requestAnimationFrame(() => {
    clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.1)`;
    clone.style.opacity = '0.2';
  });

  const cleanup = () => {
    clone.removeEventListener('transitionend', cleanup);
    clone.remove();
    bumpFn();
  };
  clone.addEventListener('transitionend', cleanup);
}

export function bump(targetId: string) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.classList.remove('animate-cart-bump');
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  (el as any).offsetWidth;
  el.classList.add('animate-cart-bump');
}

export function flyToCart(sourceEl: HTMLElement) {
  flyToTarget(sourceEl, 'cart-icon', bumpCart);
}
export function bumpCart() { bump('cart-icon'); }

export function flyToFavorites(sourceEl: HTMLElement) {
  flyToTarget(sourceEl, 'favorites-icon', bumpFavorites);
}
export function bumpFavorites() { bump('favorites-icon'); }

export function flyToCompare(sourceEl: HTMLElement) {
  flyToTarget(sourceEl, 'compare-icon', bumpCompare);
}
export function bumpCompare() { bump('compare-icon'); }
