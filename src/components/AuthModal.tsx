"use client";

import React, { useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    AuthError,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const clearError = () => setError("");

    const getJapaneseError = (err: AuthError) => {
        switch (err.code) {
            case "auth/user-not-found":
            case "auth/wrong-password":
            case "auth/invalid-credential":
                return "メールアドレスまたはパスワードが正しくありません";
            case "auth/email-already-in-use":
                return "このメールアドレスはすでに登録されています";
            case "auth/weak-password":
                return "パスワードは6文字以上で入力してください";
            case "auth/invalid-email":
                return "有効なメールアドレスを入力してください";
            case "auth/popup-closed-by-user":
                return "";
            case "auth/too-many-requests":
                return "ログイン試行が多すぎます。しばらくしてからお試しください";
            default:
                return "エラーが発生しました。もう一度お試しください";
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        clearError();
        try {
            if (mode === "login") {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            onClose();
        } catch (err) {
            setError(getJapaneseError(err as AuthError));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        clearError();
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            onClose();
        } catch (err) {
            const msg = getJapaneseError(err as AuthError);
            if (msg) setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Blurred overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal panel */}
            <div
                className="relative w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/60 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative top gradient */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#F283AE] via-pink-300 to-[#C6C870]" />

                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-7">
                        <div className="text-3xl mb-2">🌸</div>
                        <h2 className="text-2xl font-bold text-[#C59FBE] font-[family-name:var(--font-montserrat)] tracking-widest">
                            NAILU
                        </h2>
                        <p className="text-sm text-[#FAC1B5] mt-1 font-[family-name:var(--font-noto-sans-jp)]">
                            {mode === "login" ? "ログインしてデザインを楽しもう" : "アカウントを作成しよう"}
                        </p>
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm transition-all duration-200 hover:shadow-md disabled:opacity-60 mb-5"
                    >
                        {/* Google icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Googleでログイン
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400 font-[family-name:var(--font-noto-sans-jp)]">または</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Email / Password Form */}
                    <form onSubmit={handleEmailAuth} className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-[#C59FBE] mb-1 font-[family-name:var(--font-noto-sans-jp)]">
                                メールアドレス
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#F283AE]/30 focus:border-[#F283AE] transition-all"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[#C59FBE] mb-1 font-[family-name:var(--font-noto-sans-jp)]">
                                パスワード
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#F283AE]/30 focus:border-[#F283AE] transition-all"
                                placeholder={mode === "signup" ? "6文字以上" : "••••••••"}
                            />
                        </div>

                        {/* Error message */}
                        {error && (
                            <p className="text-xs text-red-500 text-center font-[family-name:var(--font-noto-sans-jp)] bg-red-50 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F283AE] to-[#C6C870] text-white font-bold text-sm hover:opacity-90 transition-all duration-200 hover:shadow-lg disabled:opacity-60 mt-1 font-[family-name:var(--font-noto-sans-jp)]"
                        >
                            {loading ? "処理中..." : mode === "login" ? "ログイン" : "アカウントを作成"}
                        </button>
                    </form>

                    {/* Toggle login / signup */}
                    <div className="mt-5 text-center">
                        <button
                            onClick={() => { setMode(mode === "login" ? "signup" : "login"); clearError(); }}
                            className="text-xs text-[#F283AE] hover:underline font-[family-name:var(--font-noto-sans-jp)]"
                        >
                            {mode === "login"
                                ? "アカウントをお持ちでない方 → 新規登録"
                                : "すでにアカウントをお持ちの方 → ログイン"}
                        </button>
                    </div>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
