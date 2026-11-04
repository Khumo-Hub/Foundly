// Editorial demonstration data only. No products or stores are live.
export const categories = [
  { id: 'fashion', name: 'Fashion & accessories', short: 'Fashion', image: 'assets/images/fashion.webp', note: 'Pieces with personality', count: '01' },
  { id: 'home', name: 'Homeware & décor', short: 'Home', image: 'assets/images/homeware.webp', note: 'Objects to live with', count: '02' },
  { id: 'beauty', name: 'Beauty accessories', short: 'Beauty', image: 'assets/images/beauty.webp', note: 'Everyday rituals, elevated', count: '03' },
];

export const stores = [
  { id: 'form-and-fold', name: 'Form & Fold', category: 'Fashion & accessories', location: 'Johannesburg', initials: 'F/F', intro: 'Considered accessories for the everyday.', image: 'assets/images/fashion.webp' },
  { id: 'object-house', name: 'Object House', category: 'Homeware & décor', location: 'Pretoria', initials: 'OH', intro: 'Warm, tactile pieces for rooms that feel like you.', image: 'assets/images/homeware.webp' },
  { id: 'soft-hour', name: 'Soft Hour', category: 'Beauty accessories', location: 'Midrand', initials: 'SH', intro: 'Little rituals that make the ordinary feel special.', image: 'assets/images/beauty.webp' },
];

export const products = [
  { id: 'everyday-arc-bag', name: 'Everyday Arc Bag', category: 'fashion', price: 890, store: 'form-and-fold', image: 'assets/images/everyday-arc-bag.webp', tag: 'Editor’s pick', description: 'A timeless everyday silhouette with a soft, sculptural shape. Designed for light days and long weekends.' },
  { id: 'sculptural-hoops', name: 'Sculptural Hoops', category: 'fashion', price: 320, store: 'form-and-fold', image: 'assets/images/sculptural-hoops.webp', tag: 'New find', description: 'A subtle statement for your daily rotation. Polished, minimal, and easy to style.' },
  { id: 'woven-mini-tote', name: 'Woven Mini Tote', category: 'fashion', price: 590, store: 'form-and-fold', image: 'assets/images/woven-mini-tote.webp', tag: '', description: 'Textural charm in a compact form, for the essentials that go everywhere with you.' },
  { id: 'earth-stoneware-vase', name: 'Earth Stoneware Vase', category: 'home', price: 540, store: 'object-house', image: 'assets/images/earth-stoneware-vase.webp', tag: 'Editor’s pick', description: 'An organically shaped vessel that brings a grounded, natural feeling to any space.' },
  { id: 'handwoven-basket', name: 'Handwoven Basket', category: 'home', price: 425, store: 'object-house', image: 'assets/images/handwoven-basket.webp', tag: 'Popular style', description: 'A beautiful home for the little things, with natural texture and a quietly useful shape.' },
  { id: 'soft-linen-cushion', name: 'Soft Linen Cushion', category: 'home', price: 395, store: 'object-house', image: 'assets/images/soft-linen-cushion.webp', tag: '', description: 'A warm finishing touch with relaxed texture and an inviting look.' },
  { id: 'daily-ritual-set', name: 'Daily Ritual Set', category: 'beauty', price: 360, store: 'soft-hour', image: 'assets/images/daily-ritual-set.webp', tag: 'New find', description: 'Thoughtful little essentials to bring ease and intention into your daily routine.' },
  { id: 'satin-hair-wrap', name: 'Satin Hair Wrap', category: 'beauty', price: 220, store: 'soft-hour', image: 'assets/images/satin-hair-wrap.webp', tag: '', description: 'An easy, beautifully soft accessory for slow mornings and restful evenings.' },
  { id: 'the-essentials-pouch', name: 'The Essentials Pouch', category: 'beauty', price: 280, store: 'soft-hour', image: 'assets/images/essentials-pouch.webp', tag: 'Editor’s pick', description: 'Your on-the-go little luxuries, gathered in one minimal carry-all.' },
];

export const rand = (amount) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(amount);
export const storeFor = (id) => stores.find((store) => store.id === id);
