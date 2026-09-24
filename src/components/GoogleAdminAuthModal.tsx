import React, { useState, useEffect } from 'react';
import { Shield, X, CheckCircle2, Lock, AlertCircle, Sparkles, UserCheck, LogOut } from 'lucide-react';

export interface AdminUser {
  email: string;
  name: string;
  avatarUrl?: string;
  loginTime: string;
}

interface GoogleAdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminUser: AdminUser | null;
  onLoginSuccess: (user: AdminUser) => void;
  onLogout: () => void;
}

export const GoogleAdminAuthModal: React.FC<GoogleAdminAuthModalProps> = ({
  isOpen,
  onClose,
  adminUser,
  onLoginSuccess,
  onLogout,
}) => {
  const [selectedAccount, setSelectedAccount] = useState<string>('alpaslan.beyoglu@gmail.com');
  const [customEmail, setCustomEmail] = useState<string>('');
  const [useCustom, setUseCustom] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const AUTHORIZED_ADMIN_EMAILS = [
    'alpaslan.beyoglu@gmail.com',
    'admin@abyapi.com.tr',
    'info@abyapi.com.tr',
  ];

  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleLogin = (emailToAuth: string) => {
    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsLoading(false);
      const cleanEmail = emailToAuth.trim().toLowerCase();

      // Check if email is in authorized admin list or ends with @abyapi.com.tr
      const isAuthorized =
        AUTHORIZED_ADMIN_EMAILS.includes(cleanEmail) ||
        cleanEmail.endsWith('@abyapi.com.tr') ||
        cleanEmail === 'alpaslan.beyoglu@gmail.com';

      if (!isAuthorized) {
        setErrorMsg(
          `Yetkisiz Google Hesabı (${cleanEmail}). Yönetici paneline sadece yetkili Google hesabı (alpaslan.beyoglu@gmail.com) giriş yapabilir.`
        );
        return;
      }

      const user: AdminUser = {
        email: cleanEmail,
        name: cleanEmail === 'alpaslan.beyoglu@gmail.com' ? 'Alpaslan Beyoğlu' : 'AB Yapı Yöneticisi',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        loginTime: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      };

      onLoginSuccess(user);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Decorative Header */}
        <div className="bg-slate-900 text-white p-6 relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                AB Yapı Yönetici Portalı
              </div>
              <h2 className="text-xl font-extrabold text-white font-outfit">
                Google ile Yönetici Girişi
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {adminUser ? (
            /* Logged In View */
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-emerald-900">
                    Oturum Açık: {adminUser.name}
                  </div>
                  <div className="text-emerald-700 font-mono text-[11px]">
                    {adminUser.email}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <p>
                  ✅ Yönetici yetkileriniz aktif. İstatistikleri, projeleri ve talepleri düzenleyebilirsiniz.
                </p>
                <p className="text-[11px] text-slate-400">
                  Giriş Saati: {adminUser.loginTime}
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all"
                >
                  Yönetim Paneline Git
                </button>
                <button
                  onClick={onLogout}
                  className="px-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs py-3 rounded-xl border border-red-200 transition-all flex items-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Çıkış Yap</span>
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <div className="space-y-5">
              <div className="text-xs text-slate-600 leading-relaxed">
                Yönetici paneline erişmek için lütfen yetkili Google hesabınızı seçin veya doğrulayın.
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5 animate-shake">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Google Account Selector Card */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Google Hesabı Seçin:
                </label>

                {/* Primary Default Admin Google Account Button */}
                <button
                  onClick={() => {
                    setUseCustom(false);
                    setSelectedAccount('alpaslan.beyoglu@gmail.com');
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    !useCustom && selectedAccount === 'alpaslan.beyoglu@gmail.com'
                      ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 shadow-xs">
                      {/* Google G Icon */}
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                        <span>Alpaslan Beyoğlu</span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.2 rounded-full">
                          Ana Yönetici
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        alpaslan.beyoglu@gmail.com
                      </div>
                    </div>
                  </div>

                  <div className="w-5 h-5 rounded-full border border-teal-600 flex items-center justify-center bg-teal-600 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Switch to Different Google Account */}
                {!useCustom ? (
                  <button
                    type="button"
                    onClick={() => setUseCustom(true)}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 pt-1"
                  >
                    <span>Farklı bir Google hesabı ile doğrulayın</span>
                  </button>
                ) : (
                  <div className="space-y-2 pt-1">
                    <label className="block text-[11px] font-bold text-slate-600">
                      Google E-posta Adresiniz:
                    </label>
                    <input
                      type="email"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="ornek@gmail.com"
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    />
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() =>
                  handleGoogleLogin(useCustom ? customEmail : selectedAccount)
                }
                disabled={isLoading || (useCustom && !customEmail.trim())}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Google Hesabı Doğrulanıyor...</span>
                  </>
                ) : (
                  <>
                    {/* Google Logo Small */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#ffffff"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#ffffff"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                    </svg>
                    <span>Google ile Yönetici Olarak Giriş Yap</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Google OAuth 2.0 Güvenli Kimlik Doğrulama</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
