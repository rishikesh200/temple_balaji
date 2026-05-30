/**
 * getT — bilingual field resolver
 *
 * Returns the Tamil value for `field` when lang === 'ta' AND a Tamil
 * value exists on the item; otherwise falls back to the English value.
 *
 * Usage:
 *   getT(pooja, 'name', lang)        // pooja.name_ta || pooja.name
 *   getT(event, 'details', lang)     // event.details_ta || event.details
 */
export const getT = (item, field, lang) => {
  if (!item) return '';
  if (lang === 'ta') {
    const ta = item[`${field}_ta`];
    if (ta && ta.trim()) return ta;
  }
  return item[field] || '';
};

/**
 * t — static translation lookup (for UI strings not tied to a data item)
 *
 * Usage:
 *   t(TRANSLATIONS.viewAll, lang)   // returns en or ta string
 */
export const t = (obj, lang) => {
  if (!obj) return '';
  return (lang === 'ta' && obj.ta) ? obj.ta : (obj.en || '');
};
