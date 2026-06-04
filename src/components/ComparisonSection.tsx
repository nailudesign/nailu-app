'use client';

import React from 'react';
import { Sparkles, X, Check, Clock, Zap, TrendingUp } from 'lucide-react';

export default function ComparisonSection() {
    const comparisons = [
        {
            label: '時間',
            icon: Clock,
            oldValue: '数時間も探して疲れる...',
            newValue: 'たった10秒で完成！',
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
            newValue: 'レシピ付きで安心',
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
            newValue: 'AIが診断してくれる',
            highlight: false,
        },
        {
            label: 'トレンド',
            icon: TrendingUp,
            oldValue: '古いデザインかも...',
            newValue: '最新2026年版！',
            highlight: false,
        },
    ];

    return (
        <section className="w-full py-20 px-[5%] bg-gradient-to-b from-white to-[#EDD9BE] relative overflow-hidden">

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C59FBE] border-2 border-[#C59FBE] mb-6 shadow-lg">
                        <Sparkles className="w-5 h-5 text-[#F283AE]" />
                        <span className="text-sm font-bold text-[#EDD9BE] tracking-wider">
                            もう迷わない
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#5e3e53] mb-4 font-[family-name:var(--font-noto-sans-jp)] leading-tight">
                        SNS検索で<span className="text-[#F283AE]">疲れてませんか？</span>
                    </h2>

                    <p className="text-xl text-[#5e3e53] font-[family-name:var(--font-noto-sans-jp)] mb-8">
                        NAILUなら、理想のネイルが<span className="text-[#F283AE] font-bold">10秒</span>で見つかります
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {comparisons.map((comparison, index) => (
                        <div
                            key={index}
                            className={`group transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl`}
                        >
                            <div className={`premium-card depth-shadow bg-white/90 backdrop-blur-md rounded-2xl border border-[#F283AE]/30 group-hover:border-[#F283AE]/60 p-6 h-full transition-colors`}>
                                {/* Icon & Label */}
                                <div className="flex items-center gap-3 mb-4">
                                    {React.createElement(comparison.icon, {
                                        className: 'w-7 h-7 text-[#F283AE]',
                                    })}
                                    <div className="text-xl font-bold text-[#5e3e53] font-[family-name:var(--font-noto-sans-jp)]">
                                        {comparison.label}
                                    </div>
                                </div>

                                {/* Old Way - Pain Point */}
                                <div className="flex items-start gap-3 mb-4 pb-4 border-b border-[#F283AE]/20">
                                    <div className="mt-1">
                                        <X className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-[#5e3e53] font-medium mb-1 font-[family-name:var(--font-noto-sans-jp)]">
                                            SNS検索
                                        </div>
                                        <div className="text-sm text-[#5e3e53]/50 font-[family-name:var(--font-noto-sans-jp)] leading-relaxed line-through">
                                            {comparison.oldValue}
                                        </div>
                                    </div>
                                </div>

                                {/* New Way - Solution */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <Check className="w-5 h-5 text-[#F283AE]" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-[#F283AE] font-bold mb-1 font-[family-name:var(--font-noto-sans-jp)]">
                                            NAILU
                                        </div>
                                        <div className="text-base text-[#5e3e53] font-bold font-[family-name:var(--font-noto-sans-jp)] leading-relaxed">
                                            {comparison.newValue}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Strong CTA Section */}
                <div className="text-center bg-gradient-to-br from-white via-[#EDD9BE] to-[#EDD9BE] rounded-3xl p-12 shadow-2xl border border-[#F283AE]/30">
                    <p className="text-2xl md:text-3xl font-bold text-[#5e3e53] mb-4 font-[family-name:var(--font-noto-sans-jp)]">
                        もう何時間も探す必要はありません
                    </p>
                    <p className="text-base text-[#5e3e53]/80 mb-8 font-[family-name:var(--font-noto-sans-jp)]">
                        10秒で理想のネイルが見つかる体験を、今すぐ
                    </p>

                    {/* Amazing Shimmery Button */}
                    <div className="relative inline-block group mt-6">
                        {/* Glow effect */}
                        <div className="absolute -inset-2 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse" style={{ background: 'linear-gradient(90deg, #F283AE, #F283AE, #C59FBE, #98B8B9)' }}></div>

                        {/* Button */}
                        <a href="http://app.nailu.jp/" className="relative px-16 py-6 text-white text-xl md:text-2xl font-bold rounded-full shadow-2xl hover:shadow-[#C59FBE]/40 hover:scale-105 transition-all duration-300 font-[family-name:var(--font-noto-sans-jp)] overflow-hidden group inline-block" style={{ background: 'linear-gradient(90deg, #F283AE, #F283AE, #C59FBE, #98B8B9)' }}>
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
                                💎 無料で今すぐ試す
                            </span>
                        </a>
                    </div>

                    <p className="text-xs text-[#5e3e53]/60 mt-6 font-[family-name:var(--font-noto-sans-jp)]">
                        ※ 登録不要・完全無料
                    </p>
                </div>
            </div>
        </section>
    );
}
