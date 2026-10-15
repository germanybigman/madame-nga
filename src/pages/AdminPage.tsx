import { useState, useEffect, useCallback } from 'react';
import { supabase, authLinkType } from '@/lib/supabase';
import { fetchMenuData } from '@/lib/menuApi';
import type { MenuCategory, MenuItem, MenuItemOption } from '@/lib/types';
import {
  LogOut,
  Plus,
  Trash2,
  Pencil,
  X,
  ChevronDown,
  ChevronRight,
  Save,
  Loader2,
  UtensilsCrossed,
  Lock,
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export default function AdminPage({ onNavigate }: AdminPageProps) {
  const [session, setSession] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const [mustSetPassword, setMustSetPassword] = useState(
    authLinkType === 'invite' || authLinkType === 'recovery'
  );
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, sess) => {
      setSession(!!sess);
      if (event === 'PASSWORD_RECOVERY') setMustSetPassword(true);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    setInfo(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLoginError(
        error.message === 'Invalid login credentials'
          ? 'E-Mail oder Passwort ist falsch.'
          : error.message
      );
      setLoginLoading(false);
    }
  };

  const handleForgot = async () => {
    setInfo(null);
    if (!email) {
      setLoginError('Bitte geben Sie oben Ihre E-Mail-Adresse ein.');
      return;
    }
    setLoginError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    if (error) {
      setLoginError(error.message);
    } else {
      setInfo('Wir haben Ihnen eine E-Mail mit einem Link zum Zurücksetzen geschickt.');
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (newPassword.length < 8) {
      setLoginError('Das Passwort muss mindestens 8 Zeichen lang sein.');
      return;
    }
    if (newPassword !== newPassword2) {
      setLoginError('Die beiden Passwörter stimmen nicht überein.');
      return;
    }
    setLoginLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoginLoading(false);
    if (error) {
      setLoginError(error.message);
      return;
    }
    setNewPassword('');
    setNewPassword2('');
    setMustSetPassword(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (session === null) {
    return (
      <div className="bg-cream pt-28 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-forest animate-spin" />
      </div>
    );
  }

  if (session && mustSetPassword) {
    return (
      <div className="bg-cream pt-28 min-h-screen flex items-center justify-center px-6">
        <div className="bg-cream-light rounded-2xl shadow-lg border border-stone-200/50 p-8 md:p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest/10 mb-4">
              <Lock className="w-6 h-6 text-forest" />
            </div>
            <h1 className="font-serif text-3xl text-forest">Passwort festlegen</h1>
            <p className="text-stone-500 text-sm mt-2">
              Willkommen! Bitte wählen Sie jetzt Ihr persönliches Passwort für den Admin-Bereich.
            </p>
          </div>

          <form onSubmit={handleSetPassword} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1.5">
                Neues Passwort (mindestens 8 Zeichen)
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-cream-light text-stone-700 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1.5">
                Passwort wiederholen
              </label>
              <input
                type="password"
                value={newPassword2}
                onChange={(e) => setNewPassword2(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-cream-light text-stone-700 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all"
              />
            </div>

            {loginError && (
              <p className="text-terracotta-dark text-sm bg-terracotta/10 rounded-lg px-4 py-2.5">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-forest text-cream py-3 rounded-lg font-medium uppercase tracking-wider text-sm hover:bg-forest-light transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Passwort speichern'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-cream pt-28 min-h-screen flex items-center justify-center px-6">
        <div className="bg-cream-light rounded-2xl shadow-lg border border-stone-200/50 p-8 md:p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest/10 mb-4">
              <Lock className="w-6 h-6 text-forest" />
            </div>
            <h1 className="font-serif text-3xl text-forest">Admin-Bereich</h1>
            <p className="text-stone-500 text-sm mt-2">
              Melden Sie sich an, um die Speisekarte zu bearbeiten.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1.5">
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-cream-light text-stone-700 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1.5">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-cream-light text-stone-700 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all"
                placeholder="••••••••"
              />
            </div>

            {loginError && (
              <p className="text-terracotta-dark text-sm bg-terracotta/10 rounded-lg px-4 py-2.5">
                {loginError}
              </p>
            )}
            {info && (
              <p className="text-forest text-sm bg-forest/10 rounded-lg px-4 py-2.5">{info}</p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-forest text-cream py-3 rounded-lg font-medium uppercase tracking-wider text-sm hover:bg-forest-light transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Anmelden'
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleForgot}
              className="text-stone-400 hover:text-forest text-sm transition-colors"
            >
              Passwort vergessen?
            </button>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="w-full mt-3 text-stone-400 hover:text-forest text-sm transition-colors"
          >
            Zurück zur Website
          </button>
        </div>
      </div>
    );
  }

  return <AdminPanel onLogout={handleLogout} onNavigate={onNavigate} />;
}

interface AdminPanelProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

function AdminPanel({ onLogout, onNavigate }: AdminPanelProps) {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<
    | { type: 'category'; data: Partial<MenuCategory> }
    | { type: 'item'; data: Partial<MenuItem>; categoryId: string }
    | { type: 'option'; data: Partial<MenuItemOption>; itemId: string }
    | null
  >(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMenuData();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleCat = (id: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = async (updatedData?: Record<string, unknown>) => {
    if (!editing) return;
    const d = { ...editing.data, ...updatedData };

    try {
      if (editing.type === 'category') {
        if (d.id) {
          const { error } = await supabase
            .from('menu_categories')
            .update({
              title: d.title,
              subtitle: d.subtitle,
              slug: d.slug,
              sort_order: d.sort_order,
            })
            .eq('id', d.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('menu_categories').insert({
            title: d.title,
            subtitle: d.subtitle,
            slug: d.slug,
            sort_order: d.sort_order ?? 0,
          });
          if (error) throw error;
        }
      } else if (editing.type === 'item') {
        if (d.id) {
          const { error } = await supabase
            .from('menu_items')
            .update({
              name: d.name,
              description: d.description,
              price: d.price,
              sort_order: d.sort_order,
            })
            .eq('id', d.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('menu_items').insert({
            category_id: editing.categoryId,
            name: d.name,
            description: d.description,
            price: d.price,
            sort_order: d.sort_order ?? 0,
          });
          if (error) throw error;
        }
      } else if (editing.type === 'option') {
        if (d.id) {
          const { error } = await supabase
            .from('menu_item_options')
            .update({
              name: d.name,
              price: d.price,
              sort_order: d.sort_order,
            })
            .eq('id', d.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('menu_item_options').insert({
            menu_item_id: editing.itemId,
            name: d.name,
            price: d.price,
            sort_order: d.sort_order ?? 0,
          });
          if (error) throw error;
        }
      }

      setEditing(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Speichern');
    }
  };

  const handleDelete = async (
    type: 'category' | 'item' | 'option',
    id: string
  ) => {
    const table =
      type === 'category'
        ? 'menu_categories'
        : type === 'item'
          ? 'menu_items'
          : 'menu_item_options';

    const confirmMsg =
      type === 'category'
        ? 'Diese Kategorie und alle darin enthaltenen Gerichte werden gelöscht. Wirklich fortfahren?'
        : type === 'item'
          ? 'Dieses Gericht wird gelöscht. Wirklich fortfahren?'
          : 'Diese Option wird gelöscht. Wirklich fortfahren?';

    if (!window.confirm(confirmMsg)) return;

    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Löschen');
    }
  };

  if (loading) {
    return (
      <div className="bg-cream pt-28 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-forest animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-cream pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="w-7 h-7 text-forest" />
            <div>
              <h1 className="font-serif text-3xl text-forest">Speisekarte verwalten</h1>
              <p className="text-stone-500 text-sm">Bearbeiten Sie Kategorien, Gerichte und Optionen.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('speisekarte')}
              className="text-sm text-forest hover:text-terracotta transition-colors px-4 py-2 border border-stone-300 rounded-lg hover:border-terracotta"
            >
              Speisekarte ansehen
            </button>
            <button
              onClick={onLogout}
              className="text-sm text-terracotta hover:text-terracotta-dark transition-colors px-4 py-2 border border-terracotta/40 rounded-lg hover:bg-terracotta/10 flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              Abmelden
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-terracotta/10 text-terracotta-dark rounded-lg px-4 py-3 mb-6 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl text-forest">Kategorien</h2>
          <button
            onClick={() =>
              setEditing({
                type: 'category',
                data: { title: '', subtitle: null, slug: '', sort_order: categories.length },
              })
            }
            className="inline-flex items-center gap-1.5 text-sm bg-forest text-cream px-4 py-2 rounded-lg hover:bg-forest-light transition-colors"
          >
            <Plus className="w-4 h-4" />
            Neue Kategorie
          </button>
        </div>

        <div className="space-y-3">
          {categories.map((cat) => {
            const isExpanded = expandedCats.has(cat.id);
            return (
              <div
                key={cat.id}
                className="bg-cream-light rounded-xl border border-stone-200/50 overflow-hidden"
              >
                <div className="flex items-center gap-3 p-4">
                  <button
                    onClick={() => toggleCat(cat.id)}
                    className="text-forest hover:text-terracotta transition-colors shrink-0"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg text-forest truncate">
                      {cat.title}
                    </h3>
                    <p className="text-stone-400 text-xs">
                      {cat.items?.length || 0} Gerichte
                      {cat.subtitle ? ` · ${cat.subtitle}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() =>
                        setEditing({
                          type: 'category',
                          data: { ...cat },
                        })
                      }
                      className="p-2 text-stone-400 hover:text-forest hover:bg-cream-dark rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('category', cat.id)}
                      className="p-2 text-stone-400 hover:text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-stone-200/50 p-4 space-y-2 bg-cream-dark/20">
                    {cat.items?.map((item) => {
                      const itemExpanded = expandedItems.has(item.id);
                      return (
                        <div
                          key={item.id}
                          className="bg-cream-light rounded-lg border border-stone-200/40"
                        >
                          <div className="flex items-center gap-2 p-3">
                            <button
                              onClick={() => toggleItem(item.id)}
                              className="text-forest hover:text-terracotta transition-colors shrink-0"
                            >
                              {itemExpanded ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <span className="text-stone-700 text-sm font-medium">
                                {item.name}
                              </span>
                              <span className="text-terracotta text-sm ml-2">
                                {item.price}
                              </span>
                              {item.options && item.options.length > 0 && (
                                <span className="text-stone-400 text-xs ml-2">
                                  ({item.options.length} Optionen)
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() =>
                                setEditing({
                                  type: 'item',
                                  data: { ...item },
                                  categoryId: cat.id,
                                })
                              }
                              className="p-1.5 text-stone-400 hover:text-forest hover:bg-cream-dark rounded-lg transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete('item', item.id)}
                              className="p-1.5 text-stone-400 hover:text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {itemExpanded && (
                            <div className="border-t border-stone-200/40 p-3 space-y-1.5 bg-cream-dark/10">
                              {item.options?.map((opt) => (
                                <div
                                  key={opt.id}
                                  className="flex items-center gap-2 bg-cream-light rounded-lg px-3 py-2"
                                >
                                  <div className="flex-1 min-w-0">
                                    <span className="text-stone-600 text-xs">
                                      {opt.name}
                                    </span>
                                    <span className="text-terracotta text-xs ml-2">
                                      {opt.price}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() =>
                                      setEditing({
                                        type: 'option',
                                        data: { ...opt },
                                        itemId: item.id,
                                      })
                                    }
                                    className="p-1 text-stone-400 hover:text-forest transition-colors"
                                  >
                                    <Pencil className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDelete('option', opt.id)
                                    }
                                    className="p-1 text-stone-400 hover:text-terracotta transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() =>
                                  setEditing({
                                    type: 'option',
                                    data: {
                                      name: '',
                                      price: '',
                                      sort_order: item.options?.length || 0,
                                    },
                                    itemId: item.id,
                                  })
                                }
                                className="text-xs text-forest hover:text-terracotta transition-colors flex items-center gap-1 mt-1"
                              >
                                <Plus className="w-3 h-3" />
                                Option hinzufügen
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    <button
                      onClick={() =>
                        setEditing({
                          type: 'item',
                          data: {
                            name: '',
                            description: null,
                            price: '',
                            sort_order: cat.items?.length || 0,
                          },
                          categoryId: cat.id,
                        })
                      }
                      className="text-sm text-forest hover:text-terracotta transition-colors flex items-center gap-1.5 mt-2"
                    >
                      <Plus className="w-4 h-4" />
                      Gericht hinzufügen
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {editing && (
        <EditModal
          editing={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

interface EditModalProps {
  editing:
    | { type: 'category'; data: Partial<MenuCategory> }
    | { type: 'item'; data: Partial<MenuItem>; categoryId: string }
    | { type: 'option'; data: Partial<MenuItemOption>; itemId: string };
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
}

function EditModal({ editing, onClose, onSave }: EditModalProps) {
  const [data, setData] = useState(editing.data);
  const [saving, setSaving] = useState(false);

  const title =
    editing.type === 'category'
      ? data.id
        ? 'Kategorie bearbeiten'
        : 'Neue Kategorie'
      : editing.type === 'item'
        ? data.id
          ? 'Gericht bearbeiten'
          : 'Neues Gericht'
        : data.id
          ? 'Option bearbeiten'
          : 'Neue Option';

  return (
    <div
      className="fixed inset-0 z-50 bg-forest-dark/60 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-cream-light rounded-2xl shadow-2xl border border-stone-200/50 max-w-lg w-full p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-forest">{title}</h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-terracotta transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {editing.type === 'category' && (
            <>
              <Field label="Titel">
                <input
                  type="text"
                  value={data.title || ''}
                  onChange={(e) =>
                    setData({ ...data, title: e.target.value })
                  }
                  className={inputClass}
                  placeholder="z.B. Vorspeisen"
                />
              </Field>
              <Field label="Untertitel (optional)">
                <input
                  type="text"
                  value={data.subtitle || ''}
                  onChange={(e) =>
                    setData({ ...data, subtitle: e.target.value || null })
                  }
                  className={inputClass}
                  placeholder="z.B. Der perfekte Start"
                />
              </Field>
              <Field label="Slug (URL-Kennung)">
                <input
                  type="text"
                  value={data.slug || ''}
                  onChange={(e) =>
                    setData({ ...data, slug: e.target.value })
                  }
                  className={inputClass}
                  placeholder="z.B. vorspeisen"
                />
              </Field>
              <Field label="Sortierung">
                <input
                  type="number"
                  value={data.sort_order ?? 0}
                  onChange={(e) =>
                    setData({ ...data, sort_order: parseInt(e.target.value) || 0 })
                  }
                  className={inputClass}
                />
              </Field>
            </>
          )}

          {editing.type === 'item' && (
            <>
              <Field label="Name">
                <input
                  type="text"
                  value={data.name || ''}
                  onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                  }
                  className={inputClass}
                  placeholder="z.B. Pho Ha Noi"
                />
              </Field>
              <Field label="Beschreibung (optional)">
                <textarea
                  value={data.description || ''}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value || null })
                  }
                  className={`${inputClass} min-h-[80px] resize-y`}
                  placeholder="z.B. Traditionelle vietnamesische Reisbandnudelsuppe..."
                />
              </Field>
              <Field label="Preis">
                <input
                  type="text"
                  value={data.price || ''}
                  onChange={(e) =>
                    setData({ ...data, price: e.target.value })
                  }
                  className={inputClass}
                  placeholder="z.B. 13,90 €"
                />
              </Field>
              <Field label="Sortierung">
                <input
                  type="number"
                  value={data.sort_order ?? 0}
                  onChange={(e) =>
                    setData({ ...data, sort_order: parseInt(e.target.value) || 0 })
                  }
                  className={inputClass}
                />
              </Field>
            </>
          )}

          {editing.type === 'option' && (
            <>
              <Field label="Name">
                <input
                  type="text"
                  value={data.name || ''}
                  onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                  }
                  className={inputClass}
                  placeholder="z.B. Rindfleisch"
                />
              </Field>
              <Field label="Preis">
                <input
                  type="text"
                  value={data.price || ''}
                  onChange={(e) =>
                    setData({ ...data, price: e.target.value })
                  }
                  className={inputClass}
                  placeholder="z.B. 13,90 €"
                />
              </Field>
              <Field label="Sortierung">
                <input
                  type="number"
                  value={data.sort_order ?? 0}
                  onChange={(e) =>
                    setData({ ...data, sort_order: parseInt(e.target.value) || 0 })
                  }
                  className={inputClass}
                />
              </Field>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={async () => {
              setSaving(true);
              await onSave(data as Record<string, unknown>);
              setSaving(false);
            }}
            disabled={saving}
            className="flex-1 bg-forest text-cream py-3 rounded-lg font-medium uppercase tracking-wider text-sm hover:bg-forest-light transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                Speichern
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 text-stone-500 hover:text-terracotta text-sm uppercase tracking-wider transition-colors"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-cream-light text-stone-700 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all text-sm';

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
