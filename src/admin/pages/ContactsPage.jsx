import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useConfirm } from '../components/ConfirmDialog';
import { useToast } from '../components/Toast';
import { contactMessagesAPI } from '../services/api';

const STATUS_STYLES = {
  new:     'bg-blue-100 text-blue-700',
  read:    'bg-gray-100 text-gray-600',
  replied: 'bg-green-100 text-green-700',
};

const STATUS_LABELS = { new: '🔵 New', read: '⚪ Read', replied: '✅ Replied' };

function getToken() { return localStorage.getItem('adminToken'); }

function MessageDrawer({ msg, onClose, onUpdate }) {
  const [note, setNote] = useState(msg.adminNote || '');
  const [status, setStatus] = useState(msg.status);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const handleSave = async () => {
    setSaving(true);
    const res = await contactMessagesAPI.update(getToken(), msg._id, { status, adminNote: note });
    setSaving(false);
    if (res.success) { toast.success('Updated!'); onUpdate(res.data); onClose(); }
    else toast.error('Update failed.');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-lg h-full overflow-y-auto flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-bold text-gray-900">Message Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        <div className="flex-1 p-6 space-y-5">
          {/* Sender info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-maroon text-white flex items-center justify-center font-bold text-sm shrink-0">
                {msg.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{msg.name}</p>
                <p className="text-sm text-gray-500">{msg.email}</p>
              </div>
            </div>
            {msg.phone && <p className="text-sm text-gray-500">📞 {msg.phone}</p>}
            <p className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString('en-IN')}</p>
          </div>

          {/* Message */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Message</p>
            <div className="bg-white border rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {msg.message}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</p>
            <div className="flex gap-2">
              {['new', 'read', 'replied'].map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    status === s ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}>
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Admin note */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Admin Note (internal)</p>
            <textarea rows={3} value={note} onChange={e => setNote(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-orange-300 outline-none"
              placeholder="Add internal note about this enquiry…" />
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 disabled:opacity-50">
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContactsPage() {
  const confirm = useConfirm();
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = filterStatus !== 'all' ? { status: filterStatus } : {};
    const res = await contactMessagesAPI.getAll(getToken(), params);
    if (res.success) setMessages(res.data);
    setLoading(false);
  }, [filterStatus]);

  useEffect(() => { load(); }, [load]);

  const handleOpen = async (msg) => {
    setSelected(msg);
    // Auto-mark as read when opened
    if (msg.status === 'new') {
      const res = await contactMessagesAPI.update(getToken(), msg._id, { status: 'read', adminNote: msg.adminNote });
      if (res.success) setMessages(prev => prev.map(m => m._id === msg._id ? res.data : m));
    }
  };

  const handleUpdate = (updated) => {
    setMessages(prev => prev.map(m => m._id === updated._id ? updated : m));
  };

  const handleDelete = async (msg) => {
    if (!(await confirm(`Delete message from "${msg.name}"?`))) return;
    const res = await contactMessagesAPI.remove(getToken(), msg._id);
    if (res.success) { setMessages(prev => prev.filter(m => m._id !== msg._id)); toast.success('Deleted.'); }
    else toast.error('Delete failed.');
  };

  const counts = {
    all:     messages.length,
    new:     messages.filter(m => m.status === 'new').length,
    read:    messages.filter(m => m.status === 'read').length,
    replied: messages.filter(m => m.status === 'replied').length,
  };

  const filtered = filterStatus === 'all' ? messages : messages.filter(m => m.status === filterStatus);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
          <p className="text-sm text-gray-500 mt-1">Messages submitted via the contact form</p>
        </div>
        <button onClick={load} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
          🔄 Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total',   value: counts.all,     color: 'text-gray-700' },
          { label: 'New',     value: counts.new,      color: 'text-blue-600' },
          { label: 'Read',    value: counts.read,     color: 'text-gray-500' },
          { label: 'Replied', value: counts.replied,  color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border p-4 text-center shadow-sm">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-5 border-b">
        {[
          { key: 'all',     label: 'All' },
          { key: 'new',     label: `🔵 New (${counts.new})` },
          { key: 'read',    label: `⚪ Read` },
          { key: 'replied', label: `✅ Replied` },
        ].map(tab => (
          <button key={tab.key} onClick={() => setFilterStatus(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              filterStatus === tab.key
                ? 'border-orange-600 text-orange-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-400">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <p className="text-3xl mb-2">📭</p>
            <p>No messages yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Devotee</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Message</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(msg => (
                <tr key={msg._id}
                  className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${msg.status === 'new' ? 'bg-blue-50/40' : ''}`}
                  onClick={() => handleOpen(msg)}>
                  <td className="px-4 py-3">
                    <p className={`text-sm font-semibold ${msg.status === 'new' ? 'text-gray-900' : 'text-gray-700'}`}>
                      {msg.status === 'new' && <span className="w-2 h-2 bg-blue-500 rounded-full inline-block mr-1.5 mb-0.5" />}
                      {msg.name}
                    </p>
                    <p className="text-xs text-gray-400">{msg.email}</p>
                    {msg.phone && <p className="text-xs text-gray-400">{msg.phone}</p>}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell max-w-xs">
                    <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-xs text-gray-400 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${STATUS_STYLES[msg.status]}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={e => { e.stopPropagation(); handleDelete(msg); }}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <MessageDrawer msg={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} />
      )}
    </AdminLayout>
  );
}
