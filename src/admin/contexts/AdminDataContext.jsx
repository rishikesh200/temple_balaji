import React, { createContext, useContext, useState, useCallback } from 'react';
import { dailyPoojas, specialSevas, nerthikadans } from '../../data/poojaData';
import { darshanTypes as defaultDarshanTypes } from '../../data/darshanTypes';
import { donationCauses as defaultDonationCauses } from '../../data/donationCauses';

const AdminDataContext = createContext(null);
const STORAGE_KEY = 'temple_admin_config_v2';

function loadStorage() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}
function saveStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// bookingType:
//   'payment' → Razorpay only
//   'free'    → walk-in / no payment
//   'both'    → user chooses at booking time

function augmentPoojas(items, category) {
  return items.map((item, i) => ({
    ...item,
    category,
    active: true,
    showInHome: i < 4,                                    // first 4 per category shown on home
    bookingType: (item.price || 0) > 0 ? 'payment' : 'free',
  }));
}

function augmentDarshan(items) {
  return items.map(item => ({
    ...item,
    active: true,
    showInHome: true,
    bookingType: item.badge === 'FREE' ? 'free' : 'payment',  // FREE darshan = no payment; paid = online by default
    price: item.priceLabel === 'FREE'
      ? 0
      : parseInt((item.priceLabel || '0').replace(/[^0-9]/g, ''), 10) || 0,
  }));
}

function augmentDonations(items) {
  return items.map(item => ({ ...item, active: true }));
}

// ── Default Events ────────────────────────────────────────────
export const DEFAULT_EVENTS = [
  {
    id: 'ev-1', title: 'Vaikunta Ekadashi', category: 'upcoming',
    date: 'May 22, 2026', time: '05:00 AM - 09:00 PM',
    location: 'Main Sanctum Sanctorum & Temple Hall',
    participants: 'Open for all devotees',
    details: 'Grand annual anniversary with Sahasra Kalashabhishekam performed by chief Vedic priests, followed by cultural recitals, bhajans, and full-day Prasadam distribution.',
    imageKey: 'festival', imageUrl: '',
    ctaText: 'Sponsor Annadanam', ctaLink: '/donate',
    active: true, showInHome: true,
  },
  {
    id: 'ev-2', title: 'Panguni Uthiram', category: 'upcoming',
    date: 'Jun 10, 2026', time: '07:30 AM - 10:00 AM',
    location: 'Temple Outer Praharam & Corridors',
    participants: 'Free Participation',
    details: 'Sacred festival celebrating the divine union. Guided walk explores stone inscriptions, Gopuram carvings, and the historical records of the deity.',
    imageKey: 'gopuram', imageUrl: '',
    ctaText: 'Register Interest', ctaLink: '/contact',
    active: true, showInHome: true,
  },
  {
    id: 'ev-3', title: 'Rath Yatra', category: 'upcoming',
    date: 'Jun 27, 2026', time: '04:00 PM - 08:00 PM',
    location: 'Avadi Chariot Road Path & Environs',
    participants: 'Volunteer registrations active (Age 18+)',
    details: 'Spectacular procession of Lord Balaji riding His golden chariot through the streets. Thousands of devotees gather to pull the holy ropes chanting Vedic mantras.',
    imageKey: 'gallery1', imageUrl: '',
    ctaText: 'Register as Volunteer', ctaLink: '/contact',
    active: true, showInHome: true,
  },
  {
    id: 'ev-4', title: 'Aadi Pooram', category: 'community',
    date: 'Jul 12, 2026', time: '11:30 AM - 03:00 PM',
    location: 'Temple Annadanam Seva Hall',
    participants: 'Sponsors & Seva volunteers needed',
    details: 'Sacred act of feeding others through our monthly community food drive. Fresh traditional meals served to local residents, pilgrims, and the needy.',
    imageKey: 'darshan', imageUrl: '',
    ctaText: 'Sponsor Groceries', ctaLink: '/donate',
    active: true, showInHome: true,
  },
];

export const DEFAULT_TEMPLE_SETTINGS = {
  name:      'Sri Venkateswara Temple',
  tagline:   'A place of divine peace and spiritual renewal',
  address:   '123 Temple Road, Chennai, Tamil Nadu - 600001',
  phone:     '+91 44 1234 5678',
  email:     'info@temple.org',
  timings:   'Mon–Sun: 6:00 AM – 12:00 PM, 4:00 PM – 9:00 PM',
  aboutText: 'Sri Venkateswara Temple is a revered Hindu temple dedicated to Lord Vishnu, welcoming all devotees.',
};

const BASE_POOJAS = [
  ...augmentPoojas(dailyPoojas,   'daily'),
  ...augmentPoojas(specialSevas,  'special'),
  ...augmentPoojas(nerthikadans,  'nerthikadan'),
];
const BASE_DARSHAN  = augmentDarshan(defaultDarshanTypes);
const BASE_DONATIONS = augmentDonations(defaultDonationCauses);

function applyPatches(base, patches) {
  return base.map(item => ({ ...item, ...(patches[item.id] || {}) }));
}

export function AdminDataProvider({ children }) {
  const stored = loadStorage();

  const [poojaPatches,    setPoojaPatches]    = useState(stored.poojaPatches    || {});
  const [customPoojas,    setCustomPoojas]    = useState(stored.customPoojas    || []);
  const [darshanPatches,  setDarshanPatches]  = useState(stored.darshanPatches  || {});
  const [customDarshan,   setCustomDarshan]   = useState(stored.customDarshan   || []);
  const [donationPatches, setDonationPatches] = useState(stored.donationPatches || {});
  const [customDonations, setCustomDonations] = useState(stored.customDonations || []);
  const [events,          setEvents]          = useState(stored.events          || DEFAULT_EVENTS);
  const [templeSettings,  setTempleSettings]  = useState(stored.templeSettings  || DEFAULT_TEMPLE_SETTINGS);

  const persist = useCallback((updates) => {
    saveStorage({ ...loadStorage(), ...updates });
  }, []);

  // ── POOJAS ───────────────────────────────────────────────────
  const poojas = [...applyPatches(BASE_POOJAS, poojaPatches), ...customPoojas];

  const updatePooja = useCallback((id, patch) => {
    if (customPoojas.some(p => p.id === id)) {
      const u = customPoojas.map(p => p.id === id ? { ...p, ...patch } : p);
      setCustomPoojas(u); persist({ customPoojas: u });
    } else {
      const u = { ...poojaPatches, [id]: { ...(poojaPatches[id] || {}), ...patch } };
      setPoojaPatches(u); persist({ poojaPatches: u });
    }
  }, [poojaPatches, customPoojas, persist]);

  const addPooja = useCallback((pooja) => {
    const item = { ...pooja, id: `cp-${Date.now()}`, active: true, showInHome: false };
    const u = [...customPoojas, item];
    setCustomPoojas(u); persist({ customPoojas: u });
  }, [customPoojas, persist]);

  const deletePooja = useCallback((id) => {
    if (customPoojas.some(p => p.id === id)) {
      const u = customPoojas.filter(p => p.id !== id);
      setCustomPoojas(u); persist({ customPoojas: u });
    } else {
      updatePooja(id, { active: false, _deleted: true });
    }
  }, [customPoojas, updatePooja]);

  // ── DARSHAN ──────────────────────────────────────────────────
  const darshanItems = [...applyPatches(BASE_DARSHAN, darshanPatches), ...customDarshan];

  const updateDarshan = useCallback((id, patch) => {
    if (customDarshan.some(d => d.id === id)) {
      const u = customDarshan.map(d => d.id === id ? { ...d, ...patch } : d);
      setCustomDarshan(u); persist({ customDarshan: u });
    } else {
      const u = { ...darshanPatches, [id]: { ...(darshanPatches[id] || {}), ...patch } };
      setDarshanPatches(u); persist({ darshanPatches: u });
    }
  }, [darshanPatches, customDarshan, persist]);

  const addDarshan = useCallback((darshan) => {
    const item = { ...darshan, id: `cd-${Date.now()}`, active: true, showInHome: false };
    const u = [...customDarshan, item];
    setCustomDarshan(u); persist({ customDarshan: u });
  }, [customDarshan, persist]);

  const deleteDarshan = useCallback((id) => {
    if (customDarshan.some(d => d.id === id)) {
      const u = customDarshan.filter(d => d.id !== id);
      setCustomDarshan(u); persist({ customDarshan: u });
    } else {
      updateDarshan(id, { active: false, _deleted: true });
    }
  }, [customDarshan, updateDarshan]);

  // ── DONATIONS ─────────────────────────────────────────────────
  const donationItems = [...applyPatches(BASE_DONATIONS, donationPatches), ...customDonations];

  const updateDonation = useCallback((id, patch) => {
    if (customDonations.some(d => d.id === id)) {
      const u = customDonations.map(d => d.id === id ? { ...d, ...patch } : d);
      setCustomDonations(u); persist({ customDonations: u });
    } else {
      const u = { ...donationPatches, [id]: { ...(donationPatches[id] || {}), ...patch } };
      setDonationPatches(u); persist({ donationPatches: u });
    }
  }, [donationPatches, customDonations, persist]);

  const addDonation = useCallback((don) => {
    const item = { ...don, id: `cdn-${Date.now()}`, active: true };
    const u = [...customDonations, item];
    setCustomDonations(u); persist({ customDonations: u });
  }, [customDonations, persist]);

  const deleteDonation = useCallback((id) => {
    if (customDonations.some(d => d.id === id)) {
      const u = customDonations.filter(d => d.id !== id);
      setCustomDonations(u); persist({ customDonations: u });
    } else {
      updateDonation(id, { active: false, _deleted: true });
    }
  }, [customDonations, updateDonation]);

  // ── EVENTS ────────────────────────────────────────────────────
  const updateEvent = useCallback((id, patch) => {
    const u = events.map(e => e.id === id ? { ...e, ...patch } : e);
    setEvents(u); persist({ events: u });
  }, [events, persist]);

  const addEvent = useCallback((ev) => {
    const item = { ...ev, id: `ev-${Date.now()}`, active: true, showInHome: false };
    const u = [...events, item];
    setEvents(u); persist({ events: u });
  }, [events, persist]);

  const deleteEvent = useCallback((id) => {
    const u = events.filter(e => e.id !== id);
    setEvents(u); persist({ events: u });
  }, [events, persist]);

  // ── TEMPLE SETTINGS ──────────────────────────────────────────
  const updateTempleSettings = useCallback((patch) => {
    const u = { ...templeSettings, ...patch };
    setTempleSettings(u); persist({ templeSettings: u });
  }, [templeSettings, persist]);

  // ── DERIVED LISTS ─────────────────────────────────────────────
  const activePoojas        = poojas.filter(p => p.active && !p._deleted);
  const homePoojas          = activePoojas.filter(p => p.showInHome);
  const activeDailyPoojas   = activePoojas.filter(p => p.category === 'daily');
  const activeSpecialSevas  = activePoojas.filter(p => p.category === 'special');
  const activeNerthikadans  = activePoojas.filter(p => p.category === 'nerthikadan');

  const activeDarshan       = darshanItems.filter(d => d.active && !d._deleted);
  const homeDarshan         = activeDarshan.filter(d => d.showInHome);

  const activeDonations     = donationItems.filter(d => d.active && !d._deleted);

  const activeEvents        = events.filter(e => e.active);
  const homeEvents          = activeEvents.filter(e => e.showInHome);

  return (
    <AdminDataContext.Provider value={{
      // Poojas
      poojas, activePoojas, homePoojas,
      activeDailyPoojas, activeSpecialSevas, activeNerthikadans,
      updatePooja, addPooja, deletePooja,
      // Darshan
      darshanItems, activeDarshan, homeDarshan,
      updateDarshan, addDarshan, deleteDarshan,
      // Donations
      donationItems, activeDonations,
      updateDonation, addDonation, deleteDonation,
      // Events
      events, activeEvents, homeEvents,
      updateEvent, addEvent, deleteEvent,
      // Temple
      templeSettings, updateTempleSettings,
    }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export const useAdminData = () => {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error('useAdminData must be inside AdminDataProvider');
  return ctx;
};
