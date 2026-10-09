'use client';

import React from 'react';
import { Sparkles, X, Check, Clock, Zap, TrendingUp } from 'lucide-react';

const AppStoreBadge = ({ href }: { href: string }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-black hover:bg-black/90 active:scale-95 text-white px-5 py-2.5 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 font-sans group relative overflow-hidden shrink-0 animate-scale-in"
        >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

            <svg viewBox="0 0 384 512" className="w-5 h-5 fill-white transition-transform duration-300 group-hover:scale-110">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48-20.7-77.5-20.7-39.3 0-75.1 22-95.6 57.5-42.2 72.9-10.8 181.9 29.8 240.2 20 28.8 43.4 60.8 74.3 59.6 30.2-1.2 41.7-19.3 78.2-19.3 36.4 0 46.9 19.3 78.2 19.3 31.9-.5 52.3-29.2 72.1-57.9 22.9-33.1 32.4-65 32.9-66.6-.7-.3-64.1-24.6-64.6-98.3zM288.9 105c15.6-19 25.9-45.3 23-71.6-22.6.9-50.2 15-66.4 33.8-14.3 16.5-26.8 43.1-23.4 69.1 25.1 2 51.1-12.3 66.8-31.3z" />
            </svg>
            <div className="flex flex-col items-start leading-none text-left select-none">
                <span className="text-[9px] font-medium text-gray-400 tracking-wider uppercase">Download on the</span>
                <span className="text-base font-semibold text-white tracking-tight mt-0.5 font-[family-name:var(--font-montserrat)]">App Store</span>
            </div>
        </a>
    );
};

export default function ComparisonSection() {
    const appUrl = "https://apps.apple.com/jp/app/id6777699639";
    const comparisons = [
        {
            label: '時間',
            icon: Clock,
            oldValue: '数時間も探して疲れる...',
            newValue: '自分の手で試せる',
            highlight: false,
        },
        {
            label: 'イメージ',
            icon: Sparkles,
            oldValue: '他人の手じゃ想像できない',
            newValue: '自分の手で試せる！',
            highlight: false,
        },
        {
            label: 'オーダー',
            icon: Zap,
            oldValue: '写真見せるだけで不安',
            newValue: '画像を保存して相談',
            highlight: false,
        },
        {
            label: '保存',
            icon: Sparkles,
            oldValue: 'スクショだらけで迷子',
            newValue: 'アプリで一括管理',
            highlight: false,
        },
        {
            label: '似合う色',
            icon: Sparkles,
            oldValue: '自分じゃわからない',
            newValue: '好きな色を選べる',
            highlight: false,
        },
        {
            label: 'トレンド',
            icon: TrendingUp,
            oldValue: '古いデザインかも...',
            newValue: 'スタイルを探せる',
            highlight: false,
        },
    ];

    return (
        <section className="w-full py-20 px-[5%] bg-gradient-to-b from-white to-[#FCF7F4] relative overflow-hidden">

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#DFC4C5] border-2 border-[#DFC4C5] mb-6 shadow-lg">
                        <Sparkles className="w-5 h-5 text-[#9C7378]" />
                        <span className="text-sm font-bold text-[#FCF7F4] tracking-wider">
                            もう迷わない
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#665956] mb-4 font-[family-name:var(--font-noto-sans-jp)] leading-tight">
                        SNS検索で<span className="text-[#9C7378]">疲れてませんか？</span>
                    </h2>

                    <p className="text-xl text-[#665956] font-[family-name:var(--font-noto-sans-jp)] mb-8">
                        NAILUなら、自分の手の写真で気になるネイルを試せます
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {comparisons.map((comparison, index) => (
                        <div
                            key={index}
                            className={`group transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl`}
                        >
                            <div className={`premium-card depth-shadow bg-white/90 backdrop-blur-md rounded-2xl border border-[#9C7378]/30 group-hover:border-[#9C7378]/60 p-6 h-full transition-colors`}>
                                {/* Icon & Label */}
                                <div className="flex items-center gap-3 mb-4">
                                    {React.createElement(comparison.icon, {
                                        className: 'w-7 h-7 text-[#9C7378]',
                                    })}
                                    <div className="text-xl font-bold text-[#665956] font-[family-name:var(--font-noto-sans-jp)]">
                                        {comparison.label}
                                    </div>
                                </div>

                                {/* Old Way - Pain Point */}
                                <div className="flex items-start gap-3 mb-4 pb-4 border-b border-[#9C7378]/20">
                                    <div className="mt-1">
                                        <X className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-[#665956] font-medium mb-1 font-[family-name:var(--font-noto-sans-jp)]">
                                            SNS検索
                                        </div>
                                        <div className="text-sm text-[#665956]/50 font-[family-name:var(--font-noto-sans-jp)] leading-relaxed line-through">
                                            {comparison.oldValue}
                                        </div>
                                    </div>
                                </div>

                                {/* New Way - Solution */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <Check className="w-5 h-5 text-[#9C7378]" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-[#9C7378] font-bold mb-1 font-[family-name:var(--font-noto-sans-jp)]">
                                            NAILU
                                        </div>
                                        <div className="text-base text-[#665956] font-bold font-[family-name:var(--font-noto-sans-jp)] leading-relaxed">
                                            {comparison.newValue}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Strong CTA Section */}
                <div className="text-center bg-gradient-to-br from-white via-[#FCF7F4] to-[#FCF7F4] rounded-3xl p-12 shadow-2xl border border-[#9C7378]/30">
                    <p className="text-2xl md:text-3xl font-bold text-[#665956] mb-4 font-[family-name:var(--font-noto-sans-jp)]">
                        もう何時間も探す必要はありません
                    </p>
                    <p className="text-base text-[#665956]/80 mb-8 font-[family-name:var(--font-noto-sans-jp)]">
                        好きなスタイルを自分の手で試してみよう
                    </p>

                    {/* Amazing Shimmery Button */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-6 w-full sm:w-auto">
                        <div className="relative inline-block group">
                            {/* Glow effect */}
                            <div className="absolute -inset-2 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse" style={{ background: '#9C7378' }}></div>

                            {/* Button */}
                            <a href={appUrl} className="relative px-16 py-6 text-white text-xl md:text-2xl font-bold rounded-full shadow-2xl hover:shadow-[#DFC4C5]/40 hover:scale-105 transition-all duration-300 font-[family-name:var(--font-noto-sans-jp)] overflow-hidden group inline-block" style={{ background: '#9C7378' }}>
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

                                {/* Sparkle effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                                    <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-75"></div>
                                    <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-150"></div>
                                </div>

                                {/* Button content */}
                                <span className="relative flex items-center justify-center gap-3">
                                    💎 App Storeでダウンロード
                                </span>
                            </a>
                        </div>
                        <AppStoreBadge href={appUrl} />
                    </div>

                    <p className="text-xs text-[#665956]/60 mt-6 font-[family-name:var(--font-noto-sans-jp)]">
                        ※ 無料ダウンロード・アプリ内購入あり
                    </p>
                </div>
            </div>
        </section>
    );
}
