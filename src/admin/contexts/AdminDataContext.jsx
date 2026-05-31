import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { configAPI, poojasAPI, darshanTypesAPI, donationCausesAPI, eventsAPI, galleryAPI, heroImagesAPI } from '../services/api';

const AdminDataContext = createContext(null);

function getToken() {
  return localStorage.getItem('adminToken');
}

export function AdminDataProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [poojas, setPoojas] = useState([]);
  const [darshanItems, setDarshanItems] = useState([]);
  const [donationItems, setDonationItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [templeSettings, setTempleSettings] = useState({});
  const [liveStream, setLiveStream] = useState({ enabled: false, url: '', title: 'Live Darshan' });

  // ── Load all collections on mount ──────────────────────────────
  useEffect(() => {
    const token = getToken();
    Promise.all([
      poojasAPI.getAll(token),
      darshanTypesAPI.getAll(token),
      donationCausesAPI.getAll(token),
      eventsAPI.getAll(token),
      galleryAPI.getAll(token),
      heroImagesAPI.getAll(token),
      configAPI.getConfig(),
    ])
      .then(([p, d, dc, ev, gal, hero, cfg]) => {
        if (p.success)    setPoojas(p.data);
        if (d.success)    setDarshanItems(d.data);
        if (dc.success)   setDonationItems(dc.data);
        if (ev.success)   setEvents(ev.data);
        if (gal.success)  setGallery(gal.data);
        if (hero.success) setHeroImages(hero.data);
        if (cfg.success) {
          setTempleSettings(cfg.templeSettings ?? {});
          setLiveStream(cfg.liveStream ?? { enabled: false, url: '', title: 'Live Darshan' });
        }
      })
      .catch(err => console.error('Data load failed:', err.message))
      .finally(() => setLoading(false));
  }, []);

  // ── POOJAS ──────────────────────────────────────────────────────
  const updatePooja = useCallback(async (id, patch) => {
    setPoojas(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p));
    await poojasAPI.update(getToken(), id, patch);
  }, []);

  const addPooja = useCallback(async (pooja) => {
    const item = { ...pooja, id: `cp-${Date.now()}`, active: true, showInHome: false };
    const res = await poojasAPI.create(getToken(), item);
    if (res.success) setPoojas(prev => [...prev, res.data]);
  }, []);

  const deletePooja = useCallback(async (id) => {
    setPoojas(prev => prev.filter(p => p.id !== id));
    await poojasAPI.remove(getToken(), id);
  }, []);

  // ── DARSHAN ──────────────────────────────────────────────────────
  const updateDarshan = useCallback(async (id, patch) => {
    setDarshanItems(prev => prev.map(d => d.id === id ? { ...d, ...patch } : d));
    await darshanTypesAPI.update(getToken(), id, patch);
  }, []);

  const addDarshan = useCallback(async (darshan) => {
    const item = { ...darshan, id: `cd-${Date.now()}`, active: true, showInHome: false };
    const res = await darshanTypesAPI.create(getToken(), item);
    if (res.success) setDarshanItems(prev => [...prev, res.data]);
  }, []);

  const deleteDarshan = useCallback(async (id) => {
    setDarshanItems(prev => prev.filter(d => d.id !== id));
    await darshanTypesAPI.remove(getToken(), id);
  }, []);

  // ── DONATIONS ────────────────────────────────────────────────────
  const updateDonation = useCallback(async (id, patch) => {
    setDonationItems(prev => prev.map(d => d.id === id ? { ...d, ...patch } : d));
    await donationCausesAPI.update(getToken(), id, patch);
  }, []);

  const addDonation = useCallback(async (don) => {
    const item = { ...don, id: `cdn-${Date.now()}`, active: true };
    const res = await donationCausesAPI.create(getToken(), item);
    if (res.success) setDonationItems(prev => [...prev, res.data]);
  }, []);

  const deleteDonation = useCallback(async (id) => {
    setDonationItems(prev => prev.filter(d => d.id !== id));
    await donationCausesAPI.remove(getToken(), id);
  }, []);

  // ── EVENTS ───────────────────────────────────────────────────────
  const updateEvent = useCallback(async (id, patch) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e));
    await eventsAPI.update(getToken(), id, patch);
  }, []);

  const addEvent = useCallback(async (ev) => {
    const item = { ...ev, id: `ev-${Date.now()}`, active: true, showInHome: false };
    const res = await eventsAPI.create(getToken(), item);
    if (res.success) setEvents(prev => [...prev, res.data]);
  }, []);

  const deleteEvent = useCallback(async (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    await eventsAPI.remove(getToken(), id);
  }, []);

  // ── HERO IMAGES ──────────────────────────────────────────────────
  const updateHeroImage = useCallback(async (id, patch) => {
    setHeroImages(prev => prev.map(h => h.id === id ? { ...h, ...patch } : h));
    await heroImagesAPI.update(getToken(), id, patch);
  }, []);

  const addHeroImage = useCallback(async (image) => {
    const item = { ...image, id: `hero-${Date.now()}`, isActive: true };
    const res = await heroImagesAPI.create(getToken(), item);
    if (res.success) setHeroImages(prev => [...prev, res.data]);
  }, []);

  const deleteHeroImage = useCallback(async (id) => {
    setHeroImages(prev => prev.filter(h => h.id !== id));
    await heroImagesAPI.remove(getToken(), id);
  }, []);

  // ── GALLERY ──────────────────────────────────────────────────────
  const updateGalleryImage = useCallback(async (id, patch) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...patch } : g));
    await galleryAPI.update(getToken(), id, patch);
  }, []);

  const addGalleryImage = useCallback(async (image) => {
    const item = { ...image, id: `gal-${Date.now()}`, isActive: true };
    const res = await galleryAPI.create(getToken(), item);
    if (res.success) setGallery(prev => [...prev, res.data]);
  }, []);

  const deleteGalleryImage = useCallback(async (id) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    await galleryAPI.remove(getToken(), id);
  }, []);

  // ── LIVE STREAM ──────────────────────────────────────────────────
  const updateLiveStream = useCallback(async (patch) => {
    const updated = { ...liveStream, ...patch };
    setLiveStream(updated);
    await configAPI.updateConfig(getToken(), { liveStream: updated });
  }, [liveStream]);

  // ── TEMPLE SETTINGS ──────────────────────────────────────────────
  const updateTempleSettings = useCallback(async (patch) => {
    const updated = { ...templeSettings, ...patch };
    setTempleSettings(updated);
    await configAPI.updateConfig(getToken(), { templeSettings: updated });
  }, [templeSettings]);

  // ── Derived lists ─────────────────────────────────────────────────
  const activePoojas       = poojas.filter(p => p.active);
  const homePoojas         = activePoojas.filter(p => p.showInHome);
  const activeDailyPoojas  = activePoojas.filter(p => p.category === 'daily');
  const activeSpecialSevas = activePoojas.filter(p => p.category === 'special');
  const activeNerthikadans = activePoojas.filter(p => p.category === 'nerthikadan');

  const activeDarshan = darshanItems.filter(d => d.active);
  const homeDarshan   = activeDarshan.filter(d => d.showInHome);

  const activeDonations = donationItems.filter(d => d.active);

  const activeEvents = events.filter(e => e.active);
  const homeEvents   = activeEvents.filter(e => e.showInHome);

  return (
    <AdminDataContext.Provider value={{
      loading,

      poojas, activePoojas, homePoojas,
      activeDailyPoojas, activeSpecialSevas, activeNerthikadans,
      updatePooja, addPooja, deletePooja,

      darshanItems, activeDarshan, homeDarshan,
      updateDarshan, addDarshan, deleteDarshan,

      donationItems, activeDonations,
      updateDonation, addDonation, deleteDonation,

      events, activeEvents, homeEvents,
      updateEvent, addEvent, deleteEvent,

      heroImages, updateHeroImage, addHeroImage, deleteHeroImage,

      gallery, updateGalleryImage, addGalleryImage, deleteGalleryImage,

      liveStream, updateLiveStream,

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
