"use client";

import React, { useRef, useEffect, useState } from "react";
import ComparisonSection from "@/components/ComparisonSection";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";


export default function Home() {
    const heroRef = useRef<HTMLElement>(null);
    const galleryRef = useRef<HTMLElement>(null);
    const recommendedRef = useRef<HTMLElement>(null);
    const situationRef = useRef<HTMLElement>(null);
    const howItWorksRef = useRef<HTMLElement>(null);
    const designMakerRef = useRef<HTMLElement>(null);
    const faqRef = useRef<HTMLElement>(null);
    const [visibleGalleryCount, setVisibleGalleryCount] = React.useState(6);
    const [showcaseFocus, setShowcaseFocus] = React.useState<'before' | 'after'>('after');
    const [sparkleActive, setSparkleActive] = React.useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const { user, signOut } = useAuth();

    const [selectedTrendIndex, setSelectedTrendIndex] = React.useState(0);

    // After nail styles - all generated from same ribbon base image so hand/background are identical
    const trendStyles = [
        { name: "Ribbon", img: "/hero-after-ribbon-perfect.png", label: "リボン" },
        { name: "Y2K", img: "/hero-nail-y2k.png", label: "Y2K" },
        { name: "Cheek", img: "/hero-nail-cheek.png", label: "チーク" },
        { name: "Glass French", img: "/hero-nail-french.png", label: "フレンチ" },
        { name: "Magnet", img: "/hero-nail-magnet.png", label: "マグネット" },
        { name: "Nuance", img: "/hero-nail-nuance.png", label: "ニュアンス" },
        { name: "Pearl Ivory", img: "/hero-nail-pearl.png", label: "パール" },
    ];


    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedTrend, setSelectedTrend] = React.useState<null | {
        id: string;
        title: string;
        description: string;
        images: string[];
    }>(null);

    const eventCategories = [
        {
            id: "wedding",
            title: "Wedding",
            titleJp: "ブライダル・お呼ばれ",
            keywords: ["結婚式", "けっこんしき", "ウェディング", "ブライダル", "披露宴", "ドレス", "お呼ばれ"],
            description: "人生の特別な日に。ドレスに合わせた上品で華やかなホワイト・パール・ストーン系の王道ブライダルネイル。",
            icon: "💍",
            color: "bg-[#EDD9BE]",
            image: "/situation-wedding-1.png"
        },
        {
            id: "office",
            title: "Office",
            titleJp: "就活・オフィスネイル",
            keywords: ["就活", "しゅうかつ", "面接", "めんせつ", "オフィス", "仕事", "ナチュラル", "清潔感", "スキンカラー", "学校", "スクール", "学生"],
            description: "面接やオフィスで好印象。清潔感あふれるナチュラルなミルクベージュやグレージュの好感度ネイル。",
            icon: "💼",
            color: "bg-[#EDD9BE]",
            image: "/situation-office-1.png"
        },
        {
            id: "subculture",
            title: "Subculture",
            titleJp: "地雷系・量産型ネイル",
            keywords: ["地雷系", "じらいけい", "量産型", "りょうさんがた", "ブラック", "リボン", "推し活"],
            description: "自分らしさを表現。ブラックやピンクにリボンやパールをあしらった、華やかでドーリーな個性派デザイン。",
            icon: "🖤",
            color: "bg-[#EDD9BE]",
            image: "/situation-subculture-1.png"
        },
        {
            id: "adult",
            title: "Coming of Age",
            titleJp: "成人式・振袖ネイル",
            keywords: ["成人式", "せいじんしき", "振袖", "ふりそで", "前撮り", "和装", "豪華", "和柄"],
            description: "一生に一度の記念日に。振袖の柄や色味に合わせた、水引や金箔をあしらった豪華な和装デザイン。",
            icon: "👘",
            color: "bg-[#EDD9BE]",
            image: "/situation-adult-1.png"
        },
        {
            id: "trend",
            title: "Trend",
            titleJp: "ワンホン・韓国ネイル",
            keywords: ["ワンホン", "わんほん", "韓国ネイル", "ちゅるん", "チーク", "キラキラ"],
            description: "SNSで話題沸騰中。透明感のあるベースに蝶々パーツやチークをのせた、韓国発の最新トレンド。",
            icon: "🎀",
            color: "bg-[#EDD9BE]",
            image: "/wanghong-beige-heart-gems.png",
            extraImages: ["/wanghong-beige-heart-gems.png", "/wanghong-silver-glitter.png"]
        },
        {
            id: "nuance",
            title: "Nuance",
            titleJp: "ニュアンス・もやもや",
            keywords: ["ニュアンス", "にゅあんす", "もやもや", "天然石", "マーブル", "絶妙"],
            description: "アーティスティックな指先に。絶妙な色の混ざり合いと凹凸を楽しむ、大人っぽい抜け感フルデザイン。",
            icon: "🎨",
            color: "bg-[#EDD9BE]",
            image: "/nuance-pink-marble-gold.png",
            extraImages: ["/nuance-pink-marble-gold.png", "/nuance-celestial-mint-hand.png", "/nuance-celestial-mint.png"]
        }
    ];

    // State for Situation Popup
    const [selectedSituation, setSelectedSituation] = React.useState<typeof eventCategories[0] | null>(null);

    // State for Social Media Coming Soon Popup
    const [showSocialPopup, setShowSocialPopup] = React.useState(false);

    const handleSocialClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowSocialPopup(true);
    };

    const filteredEvents = eventCategories.filter(cat =>
        searchQuery === "" ||
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.titleJp.includes(searchQuery) ||
        cat.keywords.some(k => k.includes(searchQuery))
    );

    const trendDetails: Record<string, { id: string; title: string; description: string; images: string[] }> = {
        cheek: {
            id: "cheek",
            title: "Cheek Nail",
            description: "じゅわっとした血色感が可愛い、内側の柔らかいグラデーションが特徴の人気スタイルです。",
            images: ["/gallery-cheek-skinny-french.png", "/gallery-cheek-pearl.png", "/gallery-cheek-heart.png", "/gallery-cheek-lifestyle.png"]
        },
        glass: {
            id: "glass",
            title: "Glass French",
            description: "先端がガラスや鏡のように輝くシルバーのフレンチネイル。ベースカラーは自由で、エッジの輝きが特徴です。",
            images: ["/hero-after-glass-french-inpainted.png", "/gallery-glass-french-ribbon.png", "/gallery-glass-french-sunlight.png", "/gallery-glass-french-2.png"]
        },
        nuance: {
            id: "nuance",
            title: "Nuance",
            description: "柔らかく淡い色を複数混ぜ合わせた、優しいアートネイル。強い色は使わず、水彩画のような繊細さが魅力です。",
            images: ["/nuance-pink-marble-gold.png", "/nuance-celestial-mint-hand.png", "/nuance-celestial-mint.png", "/gallery-nuance-marble.png"]
        },
        ribbon: {
            id: "ribbon",
            title: "Ribbon",
            description: "ガーリーなリボンパーツがアクセント。韓国ネイルでも不動の人気を誇るスタイルです。",
            images: ["/gallery-ribbon-pink.png", "/gallery-ribbon-baby-pink-pearls.png", "/gallery-ribbon-lavender-crystals.png", "/gallery-glass-french-ribbon.png"]
        },
        magnet: {
            id: "magnet",
            title: "Magnet",
            description: "奥行きのある不思議な輝きが魅力のマグネットネイル。光の当たり方で表情が変わる、幻想的なスタイルです。",
            images: ["/trend-magnet-more.png", "/gallery-burgundy-magnetic.png", "/gallery-magnetic-aurora-gold.png", "/gallery-magnetic-burgundy-cat-eye.png"]
        },
        chrome: {
            id: "chrome",
            title: "Chrome",
            description: "鏡のような反射とメタリックな質感がクールなクロムネイル。都会的で洗練された指先を演出します。",
            images: ["/trend-chrome-more.png", "/gallery-mirror-chrome.png", "/gallery-mirror-chrome-rose-gold.png", "/gallery-mirror-chrome-holographic.png"]
        },
        y2k: {
            id: "y2k",
            title: "Y2K Cyber",
            description: "2000年代のレトロフューチャーな雰囲気を現代風にアレンジ。立体的なパーツやネオンカラーが特徴の個性派デザインです。",
            images: ["/trend-y2k-more.png", "/gallery-y2k-cyber-butterfly-chrome.png", "/gallery-y2k-jirai-black-hearts.png", "/gallery-y2k-chrome.png"]
        }
    };

    // 1. Featured Premium Gallery (Top Priority)
    const featuredGalleryImages = [
        { src: "/wanghong-beige-heart-gems.png", alt: "Wanghong nail art with crystal heart gem and 3D bow charms - Premium AI creation", likes: 1456 },
        { src: "/wanghong-silver-glitter.png", alt: "Wanghong silver glitter nails with 3D rose and rhinestone charms - Premium AI creation", likes: 1389 },
        { src: "/nuance-pink-marble-gold.png", alt: "Nuance nail art with pink marble and gold foil lines - Premium AI creation", likes: 1312 },
        { src: "/nuance-celestial-mint-hand.png", alt: "Nuance celestial mint nail art with moon and star charms - Premium AI creation", likes: 1278 },
        { src: "/hero-after-magnet-perfect.png", alt: "Deep magnetic 'cat eye' nail design in galactic purple - Premium AI creation", likes: 1245 },
        { src: "/hero-after-y2k-perfect.png", alt: "Mirror chrome metallic silver nails - Futuristc AI creation", likes: 1102 },
        { src: "/hero-after-y2k-perfect.png", alt: "Y2K Cyber style nails with 3D chrome butterfly charms - Trendy AI creation", likes: 1356 },
        { src: "/situation-wedding-1.png", alt: "Elegant white lace bridal nails - Wedding AI inspiration", likes: 982 },
        { src: "/situation-wedding-3.png", alt: "Sophisticated 3D flower and crystal wedding nails", likes: 876 },
        { src: "/trend-chrome-more.png", alt: "Collection of futuristic rose gold and holographic chrome designs", likes: 945 },
        { src: "/trend-magnet-more.png", alt: "Showcase of deep emerald and sapphire magnetic gel nails", likes: 1023 },
        { src: "/trend-y2k-more.png", alt: "Vibrant Harajuku style Y2K nail art collection", likes: 1189 },
        { src: "/gallery-ribbon-pink.png", alt: "Ribbon nail design with sheer pink base and 3D ribbon charms", likes: 1123 },
        { src: "/gallery-cheek-heart.png", alt: "Cheek nail with holographic heart accent", likes: 1056 },
        { src: "/gallery-glass-french-ribbon.png", alt: "Glass French nails with delicate ribbon charm accent", likes: 989 },
        { src: "/gallery-nuance-marble.png", alt: "AI generated nuance marble nail design with milky beige and brown swirls", likes: 856 },
    ];

    // 2. Comprehensive Base Gallery (Incl. all gallery-* assets)
    const baseGalleryImages = [
        { src: "/hero-after-glass-french-inpainted.png", alt: "Glass French with holographic shattered glass tips", likes: 892 },
        { src: "/gallery-glass-french-sunlight.png", alt: "Holographic glass french tips reflecting sunlight", likes: 834 },
        { src: "/gallery-glass-french-fur.png", alt: "Winter style glass french with subtle texture", likes: 756 },
        { src: "/gallery-glass-french-milky-pink.png", alt: "Soft pink base glass french nails", likes: 845 },
        { src: "/gallery-milky-gold-foil.png", alt: "Milky white nails with delicate gold foil accents", likes: 678 },
        { src: "/gallery-kawaii-hearts.png", alt: "Kawaii nail art with lavender base and 3D heart charms", likes: 945 },
        { src: "/gallery-dried-flower.png", alt: "Nude ombre nails with dried flower embeds", likes: 689 },
        { src: "/gallery-modern-french.png", alt: "Modern French manicure with pink base and gold line accent", likes: 734 },
        { src: "/gallery-terracotta-nuance.png", alt: "Terracotta nuance nails with gold flakes", likes: 698 },
        { src: "/gallery-mirror-chrome.png", alt: "Mirror chrome nails in silver - ultra detailed reflection", likes: 743 },
        { src: "/gallery-mirror-chrome-rose-gold.png", alt: "Rose gold chrome metallic finish", likes: 812 },
        { src: "/gallery-mirror-chrome-holographic.png", alt: "Holographic chrome with rainbow reflection", likes: 867 },
        { src: "/gallery-baby-blue-glitter.png", alt: "Baby blue nails with delicate silver glitter gradient", likes: 756 },
        { src: "/gallery-flower-2.png", alt: "Sheer pink nails with dried flower wreath", likes: 920 },
        { src: "/gallery-flower-3.png", alt: "Mimosa inspired yellow flower nail art", likes: 780 },
        { src: "/gallery-flower-5.png", alt: "Antique bouquet style flower nail art", likes: 810 },
        { src: "/gallery-cheek-lifestyle.png", alt: "Natural cheek nail lifestyle shot", likes: 723 },
        { src: "/gallery-ribbon-baby-pink-pearls.png", alt: "Baby pink ribbon nails with tiny pearls", likes: 945 },
        { src: "/gallery-ribbon-lavender-crystals.png", alt: "Lavender ribbon nails with shimmering crystals", likes: 867 },
        { src: "/gallery-y2k-chrome.png", alt: "Y2K style chrome and charm design", likes: 912 },
        { src: "/gallery-y2k-cyber-butterfly-chrome.png", alt: "Cyber aesthetic butterfly charm chrome", likes: 1023 },
        { src: "/gallery-y2k-jirai-black-hearts.png", alt: "Gothic/Jirai style black hearts and charms", likes: 987 },
        { src: "/gallery-magnetic-burgundy-cat-eye.png", alt: "Deep burgundy magnetic cat eye", likes: 834 },
        { src: "/gallery-magnetic-aurora-gold.png", alt: "Aurora magnetic gold shimmering line", likes: 756 },
        { src: "/gallery-burgundy-magnetic.png", alt: "Classic burgundy magnetic design", likes: 689 },
        { src: "/gallery-aurora-glass.png", alt: "Aurora glass nails with iridescent shine", likes: 912 },
        { src: "/gallery-aurora-holographic-pink.png", alt: "Holographic pink aurora effect", likes: 845 },
        { src: "/gallery-aurora-glass-milky-white.png", alt: "Milky white aurora glass nails", likes: 723 },
        { src: "/gallery-autumn-leaves-terracotta.png", alt: "Autumn themed terracotta designs", likes: 656 },
        { src: "/gallery-bridal-white-lace-crystal.png", alt: "Intricate bridal white lace design", likes: 934 },
        { src: "/gallery-christmas-burgundy-gold.png", alt: "Holiday themed burgundy and gold", likes: 712 },
        { src: "/gallery-constellation-midnight-gold.png", alt: "Midnight blue constellation design", likes: 867 },
        { src: "/gallery-galaxy-navy-purple.png", alt: "Nebula style galaxy nail art", likes: 845 },
        { src: "/gallery-glossy-vinyl-black.png", alt: "High-shine glossy vinyl black", likes: 789 },
        { src: "/gallery-hydrangea-blue-purple.png", alt: "Hydrangea floral blue-purple blend", likes: 756 },
        { src: "/gallery-idol-pink-crown.png", alt: "Idol style pink with crown charms", likes: 912 },
        { src: "/gallery-ivory-aurora.png", alt: "Soft ivory with aurora reflection", likes: 678 },
        { src: "/gallery-jelly-clear-gold-flowers.png", alt: "Clear jelly base with gold flowers", likes: 823 },
        { src: "/gallery-knit-sweater-winter.png", alt: "3D knit sweater texture for winter", likes: 745 },
        { src: "/gallery-lilac-purple-silver-stars.png", alt: "Lilac purple with tiny silver stars", likes: 834 },
        { src: "/gallery-minimalist-gold.png", alt: "Clean minimalist gold line art", likes: 671 },
        { src: "/gallery-mint-green-cloud.png", alt: "Mint green with fluffy cloud art", likes: 723 },
        { src: "/gallery-nuance-greige-watercolor.png", alt: "Watercolor style nuance greige", likes: 656 },
        { src: "/gallery-ombre-pink-white.png", alt: "Classic pink and white ombre", likes: 812 },
        { src: "/gallery-oshikatsu-member-color.png", alt: "Fan-style member color designs", likes: 867 },
        { src: "/gallery-plump-gel-dried-flowers.png", alt: "3D plump gel with dried flowers", likes: 734 },
        { src: "/gallery-plump-pink-gradient-pearl.png", alt: "Plump pink with delicate pearls", likes: 845 },
        { src: "/gallery-pressed-flower-pink-gold.png", alt: "Pressed flowers on pink and gold", likes: 756 },
        { src: "/gallery-sakura-cherry-blossom.png", alt: "Spring sakura cherry blossom art", likes: 912 },
        { src: "/gallery-sakura-pink-ombre.png", alt: "Soft sakura pink ombre gradient", likes: 834 },
        { src: "/gallery-sanrio-rainbow-bow.png", alt: "Sanrio inspired cute rainbow bows", likes: 987 },
        { src: "/gallery-satin-dusty-rose.png", alt: "Satin finish dusty rose elegance", likes: 723 },
        { src: "/gallery-stained-glass-colorful.png", alt: "Vibrant stained glass patterns", likes: 689 },
        { src: "/gallery-stone-marble.png", alt: "Realistic stone marble texture", likes: 756 },
        { src: "/gallery-stone-holographic-gems.png", alt: "Large gems on holographic base", likes: 845 },
        { src: "/gallery-sugar-texture-white.png", alt: "Sparkling sugar texture white", likes: 634 },
        { src: "/gallery-syrup-cherry-red.png", alt: "Glossy syrup finish cherry red", likes: 867 },
        { src: "/gallery-syrup-lavender-aurora.png", alt: "Syrup lavender with aurora glow", likes: 745 },
        { src: "/gallery-syrup-peach.png", alt: "Juicy syrup peach natural look", likes: 812 },
        { src: "/gallery-tie-dye-pastel-rainbow.png", alt: "Pastel rainbow tie-dye swirl", likes: 723 },
        { src: "/gallery-valentine-red-hearts.png", alt: "Romantic red hearts for Valentines", likes: 845 },
        { src: "/gallery-velvet-matte-dusty-rose.png", alt: "Velvet texture matte dusty rose", likes: 756 },
        { src: "/gallery-velvet-mauve.png", alt: "Dusty mauve velvet finish", likes: 712 },
        { src: "/gallery-watermelon-summer-kawaii.png", alt: "Fruity summer watermelon art", likes: 689 },
        { src: "/gallery-anime-kawaii-character.png", alt: "Anime character themed kawaii art", likes: 912 },
    ];

    // 3. Transformation & Diagnosis Assets
    const afterAndDiagnosisImages = [
        { src: "/hero-after-cheek-perfect.png", alt: "Transformation: Before to Cheek Nail", likes: 545 },
        { src: "/hero-after-glass-french-inpainted.png", alt: "Transformation: Before to Glass French", likes: 612 },
        { src: "/hero-after-beige.png", alt: "Transformation: Before to Milky Beige", likes: 489 },
        { src: "/hero-after-nuance-perfect.png", alt: "Transformation: Before to Nuance", likes: 523 },
        { src: "/hero-after-ivory.png", alt: "Transformation: Before to Pearl Ivory", likes: 456 },
        { src: "/hero-after-ribbon-perfect.png", alt: "Transformation: Before to Ribbon", likes: 678 },
        { src: "/hero-after-pink.png", alt: "Transformation: Before to Sakura Pink", likes: 589 },
        { src: "/diagnosis-cool-1.png", alt: "Cool Personal Color Recommendation 1", likes: 412 },
        { src: "/diagnosis-girly-1.png", alt: "Girly Personal Color Recommendation 1", likes: 567 },
        { src: "/diagnosis-girly-3.png", alt: "Girly Personal Color Recommendation 3", likes: 512 },
        { src: "/diagnosis-sheer-2.png", alt: "Sheer Personal Color Recommendation 2", likes: 434 },
        { src: "/diagnosis-sheer-3.png", alt: "Sheer Personal Color Recommendation 3", likes: 467 },
    ];

    // 4. Situation Images (All categories)
    const situationImagesList = eventCategories.flatMap(cat =>
        Array.from({ length: 5 }, (_, i) => ({
            src: `/situation-${cat.id}-${i + 1}.png`,
            alt: `${cat.titleJp} - Design Pattern ${i + 1}`,
            likes: 300 + Math.floor(Math.random() * 300)
        }))
    ).filter(img => ![
        "/situation-wedding-1.png",
        "/situation-wedding-3.png"
    ].includes(img.src));

    // Final consolidated gallery - Optimized Order
    const galleryImages = [
        ...featuredGalleryImages,
        ...baseGalleryImages.sort((a, b) => b.likes - a.likes),
        ...situationImagesList,
        ...afterAndDiagnosisImages
    ];

    // Scroll Animation Logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        const animatedElements = document.querySelectorAll(".animate-on-scroll");
        animatedElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const appUrl = "#"; // Placeholder URL for the separate web app

    return (
        <div className="min-h-screen bg-transparent text-[#C59FBE]">
            {/* HEADER */}
            <header className="fixed top-0 w-full flex justify-between items-center z-50 bg-[#FAC1B5] backdrop-blur-md animate-fade-in-up" style={{ padding: '1rem 5%' }}>
                <div
                    className="logo font-[family-name:var(--font-montserrat)] text-2xl font-semibold tracking-widest text-[#C59FBE] cursor-pointer"
                    onClick={() => scrollToSection(heroRef)}
                >
                    NAILU
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 text-sm text-[#FAC1B5] items-center font-[family-name:var(--font-noto-sans-jp)]">
                    <button className="nav-item hover:text-[#F283AE] transition-colors" onClick={() => scrollToSection(heroRef)}>トップ</button>
                    <button className="nav-item hover:text-[#F283AE] transition-colors" onClick={() => scrollToSection(situationRef)}>シチュエーション</button>
                    <button className="nav-item hover:text-[#F283AE] transition-colors" onClick={() => scrollToSection(howItWorksRef)}>使い方</button>
                    <button className="nav-item hover:text-[#F283AE] transition-colors" onClick={() => scrollToSection(designMakerRef)}>デザイン</button>
                    <button className="nav-item hover:text-[#F283AE] transition-colors" onClick={() => scrollToSection(galleryRef)}>ギャラリー</button>
                    <button className="nav-item hover:text-[#F283AE] transition-colors" onClick={() => scrollToSection(faqRef)}>よくある質問</button>
                </nav>

                {/* Action Area: Points + USE APP Button */}
                <div className="flex items-center gap-4">
                    {/* Points Display - Hidden for now (User Management pending) 
                    <div className="hidden md:block bg-[#EDD9BE] px-3 py-1 rounded-full border border-[#EDD9BE]">
                        <span className="text-xs text-[#FAC1B5]">Points:</span>
                        <span className="text-sm ml-1 font-bold bg-gradient-to-br from-[#F283AE] to-[#C6C870] bg-clip-text text-transparent">
                            0 pt
                        </span>
                    </div>
                    */}

                    {/* Amazing Shimmery Pink Gradient Button */}
                    <div className="relative group">
                        {/* Glow effect with pulse animation */}
                        <div className="absolute -inset-1 rounded-full blur-md opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse" style={{ background: 'linear-gradient(90deg, #F283AE, #F283AE, #C59FBE, #98B8B9)' }}></div>

                        {/* Button */}
                        <a
                            href={appUrl}
                            className="relative px-6 py-2.5 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-[#C59FBE]/40 hover:scale-105 transition-all duration-300 font-[family-name:var(--font-noto-sans-jp)] overflow-hidden flex items-center gap-2 group"
                            style={{ background: 'linear-gradient(90deg, #F283AE, #F283AE, #C59FBE, #98B8B9)' }}
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>

                            {/* Button content */}
                            <span className="relative flex items-center gap-2">
                                <span className="text-base">💎</span>
                                アプリを起動
                            </span>
                        </a>
                    </div>

                    {/* Auth Button */}
                    {user ? (
                        <button
                            onClick={signOut}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-pink-100 hover:bg-pink-50 transition-all text-sm text-[#C59FBE] font-medium font-[family-name:var(--font-noto-sans-jp)]"
                            title="ログアウト"
                        >
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="avatar" className="w-6 h-6 rounded-full" />
                            ) : (
                                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F283AE] to-[#C6C870] flex items-center justify-center text-white text-xs">
                                    {user.email?.[0]?.toUpperCase() ?? "U"}
                                </span>
                            )}
                            <span className="hidden md:inline">ログアウト</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => setAuthModalOpen(true)}
                            className="px-5 py-2 rounded-full border border-[#F283AE] text-[#F283AE] text-sm font-bold hover:bg-[#F283AE] hover:text-white transition-all duration-200 font-[family-name:var(--font-noto-sans-jp)]"
                        >
                            ログイン
                        </button>
                    )}

                    <div className="md:hidden text-gray-600 text-2xl cursor-pointer">≡</div>
                </div>
            </header>

            {/* Auth Modal */}
            <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

            <main className="pt-20">
                {/* SECTION: HERO - Two Column Layout */}
                <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-visible px-6 md:px-12 py-20 pb-40 md:pb-48">
                    {/* Background Elements - Light Pink to White Gradient */}
                    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-gradient-to-b from-pink-100 via-pink-50/50 to-white">
                    </div>

                    {/* Content Container - Transparent to show salon background */}
                    <div className="relative z-10 max-w-7xl mx-auto w-full rounded-[4rem] overflow-hidden p-8 md:p-16 lg:p-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-[85vh]">
                            {/* Left Column - Text Content */}
                            <div className="order-1 relative group bg-transparent lg:pr-10 flex flex-col justify-center">
                                {/* Subtle inner glow with seamless transition */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none"></div>

                                {/* Badge */}
                                <div className="opacity-0-start animate-fade-in-up delay-100 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md holographic border border-white/40 shadow-sm mb-8 hover:scale-105 transition-transform duration-300 cursor-default w-fit">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F283AE] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F283AE]"></span>
                                    </span>
                                    <span className="text-xs md:text-sm text-[#C59FBE] font-bold tracking-widest uppercase font-[family-name:var(--font-montserrat)]">✨ Premium AI Service</span>
                                </div>

                                {/* Title */}
                                <h1 className="opacity-0-start animate-fade-in-up delay-200 leading-[1.1] mb-6 tracking-tight">
                                    <span className="block text-xl md:text-2xl font-bold text-[#C59FBE] mb-3 tracking-widest text-glow">✨ 指先に、新しい魔法を。 ✨</span>
                                    <span className="relative inline-block text-[5.5rem] md:text-[7rem] lg:text-[8rem] text-elegant-gold py-2 leading-none font-black">
                                        NAILU
                                    </span>
                                </h1>

                                {/* Subtitle / Description */}
                                <p className="opacity-0-start animate-fade-in-up delay-300 text-lg md:text-xl text-[#C59FBE] font-medium mb-10 leading-loose font-[family-name:var(--font-noto-sans-jp)] max-w-lg drop-shadow-sm">
                                    たった1枚の写真から、あなたに似合うネイルデザインを提案。<br className="hidden md:block" />
                                    トレンドの韓国ネイルやニュアンスデザインも、<br className="hidden md:block" />
                                    まるで魔法のように一瞬で試着できます。
                                </p>

                                {/* CTA Area */}
                                <div className="opacity-0-start animate-scale-in delay-500 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                                    <a
                                        href={appUrl}
                                        className="group relative inline-flex items-center justify-center cursor-pointer"
                                    >
                                        <div className="absolute -inset-2 rounded-full blur-lg opacity-50 group-hover:opacity-80 animate-gradient transition duration-500" style={{ background: 'linear-gradient(90deg, #F283AE, #F283AE, #C59FBE, #98B8B9)' }}></div>
                                        <button className="btn-ultra relative px-12 py-5 text-white rounded-full text-lg font-bold shadow-2xl flex items-center gap-3">
                                            <span>💎 今すぐデザインを作る</span>
                                            <span className="bg-white/20 rounded-full p-1.5 transition-transform group-hover:rotate-45 group-hover:scale-110">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </button>
                                    </a>
                                </div>

                                {/* Social Proof / Trust Badge */}
                                <div className="opacity-0-start animate-fade-in-up delay-700 mt-12 flex items-center gap-4 border-t border-[#F283AE]/20 pt-6 max-w-sm">
                                    <div className="flex -space-x-3">
                                        <div className="w-8 h-8 rounded-full border-2 border-white bg-[#F283AE] shadow-sm"></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-white bg-[#EDD9BE] shadow-sm"></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-white bg-[#EDD9BE] shadow-sm"></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] text-[#FAC1B5] font-bold shadow-sm">+99</div>
                                    </div>
                                    <div className="text-xs text-[#FAC1B5] leading-tight">
                                        <span className="font-bold text-[#C59FBE] text-base block mb-0.5">10,000+ Designs</span>
                                        Generated by AI
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Large Cloud-Framed Image + Style Selector */}
                            <div className="opacity-0-start animate-scale-in delay-700 relative order-2 flex flex-col items-center justify-center gap-5 mt-8 lg:mt-0">

                                {/* Cloud-shaped (もくもく) Image Frame */}
                                <div className="relative w-full flex items-center justify-center">
                                    {/* Cloud blob SVG clip wrapper */}
                                    <div
                                        className="relative w-full max-w-[600px] aspect-square cursor-pointer"
                                        onClick={() => {
                                            setSparkleActive(true);
                                            setTimeout(() => setSparkleActive(false), 1500);
                                        }}
                                        style={{
                                            filter: 'drop-shadow(0 25px 50px rgba(178,92,105,0.35)) drop-shadow(0 8px 20px rgba(0,0,0,0.2))',
                                        }}
                                    >
                                        {/* SVG clip mask definition */}
                                        <svg width="0" height="0" className="absolute">
                                            <defs>
                                                <clipPath id="cloudClip" clipPathUnits="objectBoundingBox">
                                                    <path d="M 0.9582,0.5000 L 0.9625,0.5048 L 0.9666,0.5098 L 0.9705,0.5148 L 0.9740,0.5199 L 0.9774,0.5250 L 0.9805,0.5302 L 0.9834,0.5355 L 0.9861,0.5408 L 0.9886,0.5462 L 0.9908,0.5516 L 0.9929,0.5570 L 0.9947,0.5625 L 0.9964,0.5680 L 0.9978,0.5735 L 0.9991,0.5790 L 1.0001,0.5846 L 1.0010,0.5901 L 1.0016,0.5957 L 1.0021,0.6012 L 1.0024,0.6068 L 1.0025,0.6123 L 1.0024,0.6178 L 1.0021,0.6233 L 1.0017,0.6288 L 1.0011,0.6343 L 1.0002,0.6397 L 0.9993,0.6450 L 0.9981,0.6504 L 0.9968,0.6557 L 0.9952,0.6609 L 0.9936,0.6661 L 0.9917,0.6712 L 0.9897,0.6763 L 0.9875,0.6813 L 0.9851,0.6862 L 0.9826,0.6911 L 0.9799,0.6958 L 0.9771,0.7005 L 0.9740,0.7051 L 0.9709,0.7096 L 0.9675,0.7141 L 0.9641,0.7184 L 0.9604,0.7226 L 0.9622,0.7294 L 0.9704,0.7397 L 0.9770,0.7494 L 0.9825,0.7587 L 0.9870,0.7677 L 0.9908,0.7766 L 0.9940,0.7852 L 0.9966,0.7937 L 0.9986,0.8020 L 1.0002,0.8101 L 1.0014,0.8182 L 1.0021,0.8261 L 1.0025,0.8338 L 1.0025,0.8415 L 1.0021,0.8490 L 1.0014,0.8563 L 1.0004,0.8636 L 0.9991,0.8707 L 0.9975,0.8777 L 0.9957,0.8845 L 0.9935,0.8912 L 0.9911,0.8977 L 0.9885,0.9041 L 0.9856,0.9103 L 0.9824,0.9164 L 0.9790,0.9223 L 0.9754,0.9281 L 0.9716,0.9336 L 0.9675,0.9391 L 0.9633,0.9443 L 0.9588,0.9493 L 0.9542,0.9542 L 0.9493,0.9588 L 0.9443,0.9633 L 0.9391,0.9675 L 0.9336,0.9716 L 0.9281,0.9754 L 0.9223,0.9790 L 0.9164,0.9824 L 0.9103,0.9856 L 0.9041,0.9885 L 0.8977,0.9911 L 0.8912,0.9935 L 0.8845,0.9957 L 0.8777,0.9975 L 0.8707,0.9991 L 0.8636,1.0004 L 0.8563,1.0014 L 0.8490,1.0021 L 0.8415,1.0025 L 0.8338,1.0025 L 0.8261,1.0021 L 0.8182,1.0014 L 0.8101,1.0002 L 0.8020,0.9986 L 0.7937,0.9966 L 0.7852,0.9940 L 0.7766,0.9908 L 0.7677,0.9870 L 0.7587,0.9825 L 0.7494,0.9770 L 0.7397,0.9704 L 0.7294,0.9622 L 0.7226,0.9604 L 0.7184,0.9641 L 0.7141,0.9675 L 0.7096,0.9709 L 0.7051,0.9740 L 0.7005,0.9771 L 0.6958,0.9799 L 0.6911,0.9826 L 0.6862,0.9851 L 0.6813,0.9875 L 0.6763,0.9897 L 0.6712,0.9917 L 0.6661,0.9936 L 0.6609,0.9952 L 0.6557,0.9968 L 0.6504,0.9981 L 0.6450,0.9993 L 0.6397,1.0002 L 0.6343,1.0011 L 0.6288,1.0017 L 0.6233,1.0021 L 0.6178,1.0024 L 0.6123,1.0025 L 0.6068,1.0024 L 0.6012,1.0021 L 0.5957,1.0016 L 0.5901,1.0010 L 0.5846,1.0001 L 0.5790,0.9991 L 0.5735,0.9978 L 0.5680,0.9964 L 0.5625,0.9947 L 0.5570,0.9929 L 0.5516,0.9908 L 0.5462,0.9886 L 0.5408,0.9861 L 0.5355,0.9834 L 0.5302,0.9805 L 0.5250,0.9774 L 0.5199,0.9740 L 0.5148,0.9705 L 0.5098,0.9666 L 0.5048,0.9625 L 0.5000,0.9582 L 0.4952,0.9625 L 0.4902,0.9666 L 0.4852,0.9705 L 0.4801,0.9740 L 0.4750,0.9774 L 0.4698,0.9805 L 0.4645,0.9834 L 0.4592,0.9861 L 0.4538,0.9886 L 0.4484,0.9908 L 0.4430,0.9929 L 0.4375,0.9947 L 0.4320,0.9964 L 0.4265,0.9978 L 0.4210,0.9991 L 0.4154,1.0001 L 0.4099,1.0010 L 0.4043,1.0016 L 0.3988,1.0021 L 0.3932,1.0024 L 0.3877,1.0025 L 0.3822,1.0024 L 0.3767,1.0021 L 0.3712,1.0017 L 0.3657,1.0011 L 0.3603,1.0002 L 0.3550,0.9993 L 0.3496,0.9981 L 0.3443,0.9968 L 0.3391,0.9952 L 0.3339,0.9936 L 0.3288,0.9917 L 0.3237,0.9897 L 0.3187,0.9875 L 0.3138,0.9851 L 0.3089,0.9826 L 0.3042,0.9799 L 0.2995,0.9771 L 0.2949,0.9740 L 0.2904,0.9709 L 0.2859,0.9675 L 0.2816,0.9641 L 0.2774,0.9604 L 0.2706,0.9622 L 0.2603,0.9704 L 0.2506,0.9770 L 0.2413,0.9825 L 0.2323,0.9870 L 0.2234,0.9908 L 0.2148,0.9940 L 0.2063,0.9966 L 0.1980,0.9986 L 0.1899,1.0002 L 0.1818,1.0014 L 0.1739,1.0021 L 0.1662,1.0025 L 0.1585,1.0025 L 0.1510,1.0021 L 0.1437,1.0014 L 0.1364,1.0004 L 0.1293,0.9991 L 0.1223,0.9975 L 0.1155,0.9957 L 0.1088,0.9935 L 0.1023,0.9911 L 0.0959,0.9885 L 0.0897,0.9856 L 0.0836,0.9824 L 0.0777,0.9790 L 0.0719,0.9754 L 0.0664,0.9716 L 0.0609,0.9675 L 0.0557,0.9633 L 0.0507,0.9588 L 0.0458,0.9542 L 0.0412,0.9493 L 0.0367,0.9443 L 0.0325,0.9391 L 0.0284,0.9336 L 0.0246,0.9281 L 0.0210,0.9223 L 0.0176,0.9164 L 0.0144,0.9103 L 0.0115,0.9041 L 0.0089,0.8977 L 0.0065,0.8912 L 0.0043,0.8845 L 0.0025,0.8777 L 0.0009,0.8707 L -0.0004,0.8636 L -0.0014,0.8563 L -0.0021,0.8490 L -0.0025,0.8415 L -0.0025,0.8338 L -0.0021,0.8261 L -0.0014,0.8182 L -0.0002,0.8101 L 0.0014,0.8020 L 0.0034,0.7937 L 0.0060,0.7852 L 0.0092,0.7766 L 0.0130,0.7677 L 0.0175,0.7587 L 0.0230,0.7494 L 0.0296,0.7397 L 0.0378,0.7294 L 0.0396,0.7226 L 0.0359,0.7184 L 0.0325,0.7141 L 0.0291,0.7096 L 0.0260,0.7051 L 0.0229,0.7005 L 0.0201,0.6958 L 0.0174,0.6911 L 0.0149,0.6862 L 0.0125,0.6813 L 0.0103,0.6763 L 0.0083,0.6712 L 0.0064,0.6661 L 0.0048,0.6609 L 0.0032,0.6557 L 0.0019,0.6504 L 0.0007,0.6450 L -0.0002,0.6397 L -0.0011,0.6343 L -0.0017,0.6288 L -0.0021,0.6233 L -0.0024,0.6178 L -0.0025,0.6123 L -0.0024,0.6068 L -0.0021,0.6012 L -0.0016,0.5957 L -0.0010,0.5901 L -0.0001,0.5846 L 0.0009,0.5790 L 0.0022,0.5735 L 0.0036,0.5680 L 0.0053,0.5625 L 0.0071,0.5570 L 0.0092,0.5516 L 0.0114,0.5462 L 0.0139,0.5408 L 0.0166,0.5355 L 0.0195,0.5302 L 0.0226,0.5250 L 0.0260,0.5199 L 0.0295,0.5148 L 0.0334,0.5098 L 0.0375,0.5048 L 0.0418,0.5000 L 0.0375,0.4952 L 0.0334,0.4902 L 0.0295,0.4852 L 0.0260,0.4801 L 0.0226,0.4750 L 0.0195,0.4698 L 0.0166,0.4645 L 0.0139,0.4592 L 0.0114,0.4538 L 0.0092,0.4484 L 0.0071,0.4430 L 0.0053,0.4375 L 0.0036,0.4320 L 0.0022,0.4265 L 0.0009,0.4210 L -0.0001,0.4154 L -0.0010,0.4099 L -0.0016,0.4043 L -0.0021,0.3988 L -0.0024,0.3932 L -0.0025,0.3877 L -0.0024,0.3822 L -0.0021,0.3767 L -0.0017,0.3712 L -0.0011,0.3657 L -0.0002,0.3603 L 0.0007,0.3550 L 0.0019,0.3496 L 0.0032,0.3443 L 0.0048,0.3391 L 0.0064,0.3339 L 0.0083,0.3288 L 0.0103,0.3237 L 0.0125,0.3187 L 0.0149,0.3138 L 0.0174,0.3089 L 0.0201,0.3042 L 0.0229,0.2995 L 0.0260,0.2949 L 0.0291,0.2904 L 0.0325,0.2859 L 0.0359,0.2816 L 0.0396,0.2774 L 0.0378,0.2706 L 0.0296,0.2603 L 0.0230,0.2506 L 0.0175,0.2413 L 0.0130,0.2323 L 0.0092,0.2234 L 0.0060,0.2148 L 0.0034,0.2063 L 0.0014,0.1980 L -0.0002,0.1899 L -0.0014,0.1818 L -0.0021,0.1739 L -0.0025,0.1662 L -0.0025,0.1585 L -0.0021,0.1510 L -0.0014,0.1437 L -0.0004,0.1364 L 0.0009,0.1293 L 0.0025,0.1223 L 0.0043,0.1155 L 0.0065,0.1088 L 0.0089,0.1023 L 0.0115,0.0959 L 0.0144,0.0897 L 0.0176,0.0836 L 0.0210,0.0777 L 0.0246,0.0719 L 0.0284,0.0664 L 0.0325,0.0609 L 0.0367,0.0557 L 0.0412,0.0507 L 0.0458,0.0458 L 0.0507,0.0412 L 0.0557,0.0367 L 0.0609,0.0325 L 0.0664,0.0284 L 0.0719,0.0246 L 0.0777,0.0210 L 0.0836,0.0176 L 0.0897,0.0144 L 0.0959,0.0115 L 0.1023,0.0089 L 0.1088,0.0065 L 0.1155,0.0043 L 0.1223,0.0025 L 0.1293,0.0009 L 0.1364,-0.0004 L 0.1437,-0.0014 L 0.1510,-0.0021 L 0.1585,-0.0025 L 0.1662,-0.0025 L 0.1739,-0.0021 L 0.1818,-0.0014 L 0.1899,-0.0002 L 0.1980,0.0014 L 0.2063,0.0034 L 0.2148,0.0060 L 0.2234,0.0092 L 0.2323,0.0130 L 0.2413,0.0175 L 0.2506,0.0230 L 0.2603,0.0296 L 0.2706,0.0378 L 0.2774,0.0396 L 0.2816,0.0359 L 0.2859,0.0325 L 0.2904,0.0291 L 0.2949,0.0260 L 0.2995,0.0229 L 0.3042,0.0201 L 0.3089,0.0174 L 0.3138,0.0149 L 0.3187,0.0125 L 0.3237,0.0103 L 0.3288,0.0083 L 0.3339,0.0064 L 0.3391,0.0048 L 0.3443,0.0032 L 0.3496,0.0019 L 0.3550,0.0007 L 0.3603,-0.0002 L 0.3657,-0.0011 L 0.3712,-0.0017 L 0.3767,-0.0021 L 0.3822,-0.0024 L 0.3877,-0.0025 L 0.3932,-0.0024 L 0.3988,-0.0021 L 0.4043,-0.0016 L 0.4099,-0.0010 L 0.4154,-0.0001 L 0.4210,0.0009 L 0.4265,0.0022 L 0.4320,0.0036 L 0.4375,0.0053 L 0.4430,0.0071 L 0.4484,0.0092 L 0.4538,0.0114 L 0.4592,0.0139 L 0.4645,0.0166 L 0.4698,0.0195 L 0.4750,0.0226 L 0.4801,0.0260 L 0.4852,0.0295 L 0.4902,0.0334 L 0.4952,0.0375 L 0.5000,0.0418 L 0.5048,0.0375 L 0.5098,0.0334 L 0.5148,0.0295 L 0.5199,0.0260 L 0.5250,0.0226 L 0.5302,0.0195 L 0.5355,0.0166 L 0.5408,0.0139 L 0.5462,0.0114 L 0.5516,0.0092 L 0.5570,0.0071 L 0.5625,0.0053 L 0.5680,0.0036 L 0.5735,0.0022 L 0.5790,0.0009 L 0.5846,-0.0001 L 0.5901,-0.0010 L 0.5957,-0.0016 L 0.6012,-0.0021 L 0.6068,-0.0024 L 0.6123,-0.0025 L 0.6178,-0.0024 L 0.6233,-0.0021 L 0.6288,-0.0017 L 0.6343,-0.0011 L 0.6397,-0.0002 L 0.6450,0.0007 L 0.6504,0.0019 L 0.6557,0.0032 L 0.6609,0.0048 L 0.6661,0.0064 L 0.6712,0.0083 L 0.6763,0.0103 L 0.6813,0.0125 L 0.6862,0.0149 L 0.6911,0.0174 L 0.6958,0.0201 L 0.7005,0.0229 L 0.7051,0.0260 L 0.7096,0.0291 L 0.7141,0.0325 L 0.7184,0.0359 L 0.7226,0.0396 L 0.7294,0.0378 L 0.7397,0.0296 L 0.7494,0.0230 L 0.7587,0.0175 L 0.7677,0.0130 L 0.7766,0.0092 L 0.7852,0.0060 L 0.7937,0.0034 L 0.8020,0.0014 L 0.8101,-0.0002 L 0.8182,-0.0014 L 0.8261,-0.0021 L 0.8338,-0.0025 L 0.8415,-0.0025 L 0.8490,-0.0021 L 0.8563,-0.0014 L 0.8636,-0.0004 L 0.8707,0.0009 L 0.8777,0.0025 L 0.8845,0.0043 L 0.8912,0.0065 L 0.8977,0.0089 L 0.9041,0.0115 L 0.9103,0.0144 L 0.9164,0.0176 L 0.9223,0.0210 L 0.9281,0.0246 L 0.9336,0.0284 L 0.9391,0.0325 L 0.9443,0.0367 L 0.9493,0.0412 L 0.9542,0.0458 L 0.9588,0.0507 L 0.9633,0.0557 L 0.9675,0.0609 L 0.9716,0.0664 L 0.9754,0.0719 L 0.9790,0.0777 L 0.9824,0.0836 L 0.9856,0.0897 L 0.9885,0.0959 L 0.9911,0.1023 L 0.9935,0.1088 L 0.9957,0.1155 L 0.9975,0.1223 L 0.9991,0.1293 L 1.0004,0.1364 L 1.0014,0.1437 L 1.0021,0.1510 L 1.0025,0.1585 L 1.0025,0.1662 L 1.0021,0.1739 L 1.0014,0.1818 L 1.0002,0.1899 L 0.9986,0.1980 L 0.9966,0.2063 L 0.9940,0.2148 L 0.9908,0.2234 L 0.9870,0.2323 L 0.9825,0.2413 L 0.9770,0.2506 L 0.9704,0.2603 L 0.9622,0.2706 L 0.9604,0.2774 L 0.9641,0.2816 L 0.9675,0.2859 L 0.9709,0.2904 L 0.9740,0.2949 L 0.9771,0.2995 L 0.9799,0.3042 L 0.9826,0.3089 L 0.9851,0.3138 L 0.9875,0.3187 L 0.9897,0.3237 L 0.9917,0.3288 L 0.9936,0.3339 L 0.9952,0.3391 L 0.9968,0.3443 L 0.9981,0.3496 L 0.9993,0.3550 L 1.0002,0.3603 L 1.0011,0.3657 L 1.0017,0.3712 L 1.0021,0.3767 L 1.0024,0.3822 L 1.0025,0.3877 L 1.0024,0.3932 L 1.0021,0.3988 L 1.0016,0.4043 L 1.0010,0.4099 L 1.0001,0.4154 L 0.9991,0.4210 L 0.9978,0.4265 L 0.9964,0.4320 L 0.9947,0.4375 L 0.9929,0.4430 L 0.9908,0.4484 L 0.9886,0.4538 L 0.9861,0.4592 L 0.9834,0.4645 L 0.9805,0.4698 L 0.9774,0.4750 L 0.9740,0.4801 L 0.9705,0.4852 L 0.9666,0.4902 L 0.9625,0.4952 L 0.9582,0.5000 Z" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        {/* Gold border cloud shape */}
                                        <div className="absolute inset-0"
                                            style={{
                                                clipPath: 'url(#cloudClip)',
                                                background: 'linear-gradient(135deg, #C6C870 0%, #C6C870 40%, #C6C870 70%, #C6C870 100%)',
                                                padding: '4px',
                                            }}
                                        />

                                        {/* Inner image container with cloud clip */}
                                        <div className="absolute inset-[5px]"
                                            style={{ clipPath: 'url(#cloudClip)' }}
                                        >
                                            {trendStyles.map((style, i) => (
                                                <img
                                                    key={style.name}
                                                    src={style.img}
                                                    alt={style.label}
                                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                                                    style={{ opacity: selectedTrendIndex === i ? 1 : 0 }}
                                                />
                                            ))}

                                            {/* Sparkles */}
                                            {sparkleActive && (
                                                <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
                                                    {[...Array(12)].map((_, i) => (
                                                        <div key={i} className="absolute text-2xl animate-sparkle-once opacity-0"
                                                            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 0.5}s` }}>
                                                            ✨
                                                        </div>
                                                    ))}
                                                    <div className="absolute inset-0 bg-white/20 animate-flash-white pointer-events-none"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Style Selector - horizontal row beneath image */}
                                <div className="flex flex-row flex-wrap justify-center gap-2 w-full max-w-[600px] px-2">
                                    <p className="w-full text-center text-[10px] font-bold text-[#FAC1B5] tracking-widest uppercase mb-1 font-[family-name:var(--font-montserrat)]">デザインを選ぶ</p>
                                    {trendStyles.map((style, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setSelectedTrendIndex(i);
                                                setShowcaseFocus('after');
                                                setSparkleActive(true);
                                                setTimeout(() => setSparkleActive(false), 1200);
                                            }}
                                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 font-[family-name:var(--font-noto-sans-jp)] ${selectedTrendIndex === i
                                                ? 'bg-gradient-to-r from-[#F283AE] to-[#C6C870] text-white shadow-md scale-105'
                                                : 'bg-white/80 text-[#C59FBE] border border-white/60 backdrop-blur-sm hover:bg-pink-50 hover:border-[#F283AE]/40'
                                                }`}
                                        >
                                            {selectedTrendIndex === i && <span className="text-xs mr-1">✨</span>}
                                            {style.label}
                                        </button>
                                    ))}
                                </div>

                            </div>

                        </div>
                    </div>
                </section>

                <ComparisonSection />

                {/* SECTION: DESIGN FROM INSPIRATION (New Feature Showcase) */}
                <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-[#EDD9BE] to-white">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-20 animate-on-scroll">
                            <span className="text-[#F283AE] font-bold tracking-[0.2em] text-xs uppercase mb-4 block font-[family-name:var(--font-montserrat)]">Creative AI Feature</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#C59FBE] mb-6 font-[family-name:var(--font-noto-sans-jp)] leading-tight">
                                日常の「ときめき」を、<br className="md:hidden" />
                                そのままネイルに。
                            </h2>
                            <p className="text-[#FAC1B5] text-lg max-w-2xl mx-auto font-[family-name:var(--font-noto-sans-jp)] leading-loose">
                                お気に入りのリボン、大好きな服の柄、心惹かれるテクスチャ。<br className="hidden md:block" />
                                イメージ画像を送るだけで、AIがそのエッセンスを抽出して<br className="hidden md:block" />
                                あなただけの特別なデザインを創り出します。
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                            {/* Card 1: Ribbon */}
                            <div className="group animate-on-scroll bg-white rounded-3xl shadow-xl border border-pink-50 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500" style={{ transitionDelay: '100ms' }}>
                                <div className="flex relative">
                                    {/* Source Image */}
                                    <div className="flex-1 relative overflow-hidden">
                                        <div className="absolute top-3 left-3 z-10 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full leading-none">元画像</div>
                                        <img src="/inspiration_ribbon_source_1771336138345.png" alt="Ribbon inspiration" className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>

                                    {/* Result Image */}
                                    <div className="flex-1 relative overflow-hidden">
                                        <div className="absolute top-3 right-3 z-10 bg-[#F283AE]/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full leading-none">AI生成</div>
                                        <img src="/nail_design_ribbon_result_1771336207172.png" alt="Ribbon nail result" className="w-full h-52 object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F283AE]/8 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="px-5 py-4 flex items-center gap-3 border-t border-pink-50">
                                    <span className="text-xl">🎀</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#C59FBE] font-[family-name:var(--font-montserrat)] tracking-wide">Ribbon Essence</p>
                                        <p className="text-xs text-[#FAC1B5] font-[family-name:var(--font-noto-sans-jp)] mt-0.5">シルクの光沢とリボンの立体感を指先に再現</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Check */}
                            <div className="group animate-on-scroll bg-white rounded-3xl shadow-xl border border-pink-50 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500" style={{ transitionDelay: '200ms' }}>
                                <div className="flex relative">
                                    <div className="flex-1 relative overflow-hidden">
                                        <div className="absolute top-3 left-3 z-10 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full leading-none">元画像</div>
                                        <img src="/inspiration_check_source_1771336351525.png" alt="Check inspiration" className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-gradient-to-br from-[#F283AE] to-[#C6C870] flex items-center justify-center shadow-lg border-2 border-white">
                                        <span className="text-white text-[11px] font-black tracking-wider">AI</span>
                                    </div>
                                    <div className="flex-1 relative overflow-hidden">
                                        <div className="absolute top-3 right-3 z-10 bg-[#F283AE]/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full leading-none">AI生成</div>
                                        <img src="/nail_design_check_result_1771336430638.png" alt="Check nail result" className="w-full h-52 object-cover" />
                                    </div>
                                </div>
                                <div className="px-5 py-4 flex items-center gap-3 border-t border-pink-50">
                                    <span className="text-xl">🧣</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#C59FBE] font-[family-name:var(--font-montserrat)] tracking-wide">Modern Check</p>
                                        <p className="text-xs text-[#FAC1B5] font-[family-name:var(--font-noto-sans-jp)] mt-0.5">高級感のあるテキスタイル模様を繊細な筆致で昇華</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Flower */}
                            <div className="group animate-on-scroll bg-white rounded-3xl shadow-xl border border-pink-50 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500" style={{ transitionDelay: '300ms' }}>
                                <div className="flex relative">
                                    <div className="flex-1 relative overflow-hidden">
                                        <div className="absolute top-3 left-3 z-10 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full leading-none">元画像</div>
                                        <img src="/inspiration_flower_source.png" alt="Flower inspiration" className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-gradient-to-br from-[#F283AE] to-[#C6C870] flex items-center justify-center shadow-lg border-2 border-white">
                                        <span className="text-white text-[11px] font-black tracking-wider">AI</span>
                                    </div>
                                    <div className="flex-1 relative overflow-hidden">
                                        <div className="absolute top-3 right-3 z-10 bg-[#F283AE]/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full leading-none">AI生成</div>
                                        <img src="/nail_design_flower_result.png" alt="Flower nail result" className="w-full h-52 object-cover" />
                                    </div>
                                </div>
                                <div className="px-5 py-4 flex items-center gap-3 border-t border-pink-50">
                                    <span className="text-xl">🌿</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#C59FBE] font-[family-name:var(--font-montserrat)] tracking-wide">Botanical Garden</p>
                                        <p className="text-xs text-[#FAC1B5] font-[family-name:var(--font-noto-sans-jp)] mt-0.5">押し花の繊細な美しさをクリアジェルの中に閉じ込めて</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: Marble */}
                            <div className="group animate-on-scroll bg-white rounded-3xl shadow-xl border border-pink-50 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500" style={{ transitionDelay: '400ms' }}>
                                <div className="flex relative">
                                    <div className="flex-1 relative overflow-hidden">
                                        <div className="absolute top-3 left-3 z-10 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full leading-none">元画像</div>
                                        <img src="/inspiration_marble_source.png" alt="Marble inspiration" className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-gradient-to-br from-[#F283AE] to-[#C6C870] flex items-center justify-center shadow-lg border-2 border-white">
                                        <span className="text-white text-[11px] font-black tracking-wider">AI</span>
                                    </div>
                                    <div className="flex-1 relative overflow-hidden">
                                        <div className="absolute top-3 right-3 z-10 bg-[#F283AE]/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full leading-none">AI生成</div>
                                        <img src="/nail_design_marble_result.png" alt="Marble nail result" className="w-full h-52 object-cover" />
                                    </div>
                                </div>
                                <div className="px-5 py-4 flex items-center gap-3 border-t border-pink-50">
                                    <span className="text-xl">🪨</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#C59FBE] font-[family-name:var(--font-montserrat)] tracking-wide">Luxury Marble</p>
                                        <p className="text-xs text-[#FAC1B5] font-[family-name:var(--font-noto-sans-jp)] mt-0.5">大理石の気品と金箔の輝きを纏った指先</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* CTA / Action */}
                        <div className="mt-20 text-center animate-on-scroll">
                            <a href={appUrl} className="group inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-[family-name:var(--font-noto-sans-jp)]" style={{ background: 'linear-gradient(90deg, #F283AE, #F283AE, #C59FBE, #98B8B9)' }}>
                                <span>💎 好きな画像からデザインを作る</span>
                            </a>
                        </div>
                    </div>


                    {/* Decorative Background Elements */}
                    <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-pink-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none"></div>
                    <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-[#EDD9BE] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none"></div>
                </section>

                {/* SECTION: CREATE YOUR OWN DESIGN (Explanation) */}
                <section ref={designMakerRef} className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-white to-[#EDD9BE]" >
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                        {/* Left: Image */}
                        <div className="flex-1 relative">
                            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl gloss-effect ring-8 ring-white/40 transform hover:scale-[1.02] transition-transform duration-500">
                                <img src="/app-interface.png" alt="AI Nail Design App Interface" className="w-full h-auto" />
                            </div>
                            {/* Decorative Background for Image */}
                            <div className="absolute top-[-20%] right-[-20%] w-[120%] h-[120%] bg-[#F283AE] rounded-full mix-blend-multiply filter blur-[80px] opacity-10 pointer-events-none"></div>
                        </div>

                        {/* Right: Text Content */}
                        <div className="flex-1 space-y-8">
                            <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-[#F283AE]/30 shadow-sm">
                                <span className="text-[#F283AE] font-bold tracking-widest text-xs uppercase font-[family-name:var(--font-montserrat)]">NEW FEATURE</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)] leading-tight">
                                あなただけの<br />
                                オリジナルデザインを。<br />
                                <span className="text-2xl md:text-3xl mt-2 block opacity-80">AIが想いをカタチにします</span>
                            </h2>

                            <p className="text-[#FAC1B5] text-lg leading-relaxed font-[family-name:var(--font-noto-sans-jp)]">
                                「こんなネイルがしたい」というイメージを伝えるだけで、世界に一つだけのデザインが完成します。
                                難しい操作は一切不要。まるで専属のネイリストとお話しするような感覚で、理想の指先を見つけましょう。
                            </p>

                            {/* Features List */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl border border-white/60 shadow-sm hover:bg-white/80 transition-colors">
                                    <div className="w-10 h-10 bg-[#F283AE] rounded-full flex items-center justify-center text-xl shrink-0">🎨</div>
                                    <div>
                                        <h4 className="font-bold text-[#C59FBE] mb-1 font-[family-name:var(--font-noto-sans-jp)]">直感的な操作</h4>
                                        <p className="text-sm text-[#FAC1B5] font-[family-name:var(--font-noto-sans-jp)]">
                                            「かわいい」「クール」などの気分や、好きな色を選ぶだけ。専門用語は必要ありません。
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl border border-white/60 shadow-sm hover:bg-white/80 transition-colors">
                                    <div className="w-10 h-10 bg-[#EDD9BE] rounded-full flex items-center justify-center text-xl shrink-0">🤖</div>
                                    <div>
                                        <h4 className="font-bold text-[#C59FBE] mb-1 font-[family-name:var(--font-noto-sans-jp)]">無限のバリエーション</h4>
                                        <p className="text-sm text-[#FAC1B5] font-[family-name:var(--font-noto-sans-jp)]">
                                            AIが数秒で数パターンのデザインをご提案。気に入るまで何度でも作り直せます。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <a href={appUrl} className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all font-[family-name:var(--font-noto-sans-jp)]">
                                    <span>💎 無料でデザインを作る</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION: POPULAR STYLES */}
                <section className="py-24 px-6 overflow-hidden bg-[#F283AE]/10" >
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#C59FBE] mb-4 font-[family-name:var(--font-noto-sans-jp)]">人気のトレンドスタイル</h2>
                            <p className="text-[#FAC1B5] font-[family-name:var(--font-noto-sans-jp)]">韓国・日本の最新トレンドをAIが学習しています</p>
                        </div>

                        {/* Style Carousel */}
                        <div className="relative group">
                            <div
                                id="trend-carousel"
                                className="carousel-container px-[5%]"
                            >
                                {/* Card 1: Cheek */}
                                <div
                                    onClick={() => setSelectedTrend(trendDetails.cheek)}
                                    className="carousel-item relative aspect-[3/4] rounded-[30px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 gloss-effect flex-shrink-0"
                                >
                                    <img src="/trend-cheek.png" alt="Cheek Nail" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                                        <span className="text-white font-bold text-lg drop-shadow-md font-[family-name:var(--font-montserrat)]">Cheek Nail</span>
                                        <span className="block text-white/90 text-xs font-[family-name:var(--font-noto-sans-jp)] mt-1">じゅわっと血色感</span>
                                    </div>
                                </div>

                                {/* Card 2: Glass French */}
                                <div
                                    onClick={() => setSelectedTrend(trendDetails.glass)}
                                    className="carousel-item relative aspect-[3/4] rounded-[30px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 gloss-effect flex-shrink-0"
                                >
                                    <img src="/trend-glass.png" alt="Glass French" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute top-4 right-4 text-2xl animate-pulse">✨</div>
                                    <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                                        <span className="text-white font-bold text-lg drop-shadow-md font-[family-name:var(--font-montserrat)]">Glass French</span>
                                        <span className="block text-white/90 text-xs font-[family-name:var(--font-noto-sans-jp)] mt-1">ガラスのような輝き</span>
                                    </div>
                                </div>

                                {/* Card 3: Nuance */}
                                <div
                                    onClick={() => setSelectedTrend(trendDetails.nuance)}
                                    className="carousel-item relative aspect-[3/4] rounded-[30px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 gloss-effect flex-shrink-0"
                                >
                                    <img src="/trend-nuance.png" alt="Nuance" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                                        <span className="text-white font-bold text-lg drop-shadow-md font-[family-name:var(--font-montserrat)]">Nuance</span>
                                        <span className="block text-white/90 text-xs font-[family-name:var(--font-noto-sans-jp)] mt-1">大人っぽい抜け感</span>
                                    </div>
                                </div>

                                {/* Card 4: Trendy (Ribbon) */}
                                <div
                                    onClick={() => setSelectedTrend(trendDetails.ribbon)}
                                    className="carousel-item relative aspect-[3/4] rounded-[30px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 gloss-effect flex-shrink-0"
                                >
                                    <img src="/trend-ribbon.png" alt="Ribbon Nail" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                                        <span className="text-white font-bold text-lg drop-shadow-md font-[family-name:var(--font-montserrat)]">Ribbon</span>
                                        <span className="block text-white/90 text-xs font-[family-name:var(--font-noto-sans-jp)] mt-1">ガーリーなリボン</span>
                                    </div>
                                </div>

                                {/* Card 5: Magnet */}
                                <div
                                    onClick={() => setSelectedTrend(trendDetails.magnet)}
                                    className="carousel-item relative aspect-[3/4] rounded-[30px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 gloss-effect flex-shrink-0"
                                >
                                    <img src="/trend-magnet-more.png" alt="Magnet Nail" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                                        <span className="text-white font-bold text-lg drop-shadow-md font-[family-name:var(--font-montserrat)]">Magnet</span>
                                        <span className="block text-white/90 text-xs font-[family-name:var(--font-noto-sans-jp)] mt-1">奥行きのある神秘的な輝き</span>
                                    </div>
                                </div>

                                {/* Card 6: Chrome */}
                                <div
                                    onClick={() => setSelectedTrend(trendDetails.chrome)}
                                    className="carousel-item relative aspect-[3/4] rounded-[30px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 gloss-effect flex-shrink-0"
                                >
                                    <img src="/trend-chrome-more.png" alt="Chrome Nail" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                                        <span className="text-white font-bold text-lg drop-shadow-md font-[family-name:var(--font-montserrat)]">Chrome</span>
                                        <span className="block text-white/90 text-xs font-[family-name:var(--font-noto-sans-jp)] mt-1">鏡のようなメタリックな質感</span>
                                    </div>
                                </div>

                                {/* Card 7: Y2K Cyber */}
                                <div
                                    onClick={() => setSelectedTrend(trendDetails.y2k)}
                                    className="carousel-item relative aspect-[3/4] rounded-[30px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 gloss-effect flex-shrink-0"
                                >
                                    <img src="/trend-y2k-more.png" alt="Y2K Cyber Nail" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                                        <span className="text-white font-bold text-lg drop-shadow-md font-[family-name:var(--font-montserrat)]">Y2K Cyber</span>
                                        <span className="block text-white/90 text-xs font-[family-name:var(--font-noto-sans-jp)] mt-1">個性的なレトロフューチャー</span>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel Controls */}
                            <button
                                onClick={() => {
                                    const el = document.getElementById('trend-carousel');
                                    if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-[#C59FBE] opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            </button>
                            <button
                                onClick={() => {
                                    const el = document.getElementById('trend-carousel');
                                    if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-[#C59FBE] opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Popular Keywords Cloud */}
                    <div className="max-w-4xl mx-auto mt-16 text-center">
                        <p className="text-sm text-[#FAC1B5] mb-6 font-[family-name:var(--font-noto-sans-jp)] tracking-widest opacity-80">POPULAR TAGS</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                "オフィスネイル", "シンプルネイル", "ガラスフレンチ", "フレンチネイル", "ドットネイル",
                                "春ネイル", "秋ネイル", "夏ネイル", "冬ネイル", "キティちゃんネイル",
                                "ニュアンスネイル", "もやもやネイル", "大人可愛い", "韓国ネイル", "チークネイル",
                                "マグネットネイル", "ワンカラー", "粘膜リップ", "血色感", "ミラーネイル",
                                "クロムネイル", "マットネイル", "シアーネイル", "マーブルネイル", "ビジューネイル",
                                "パーツネイル", "リボンネイル", "パールネイル", "キラキラネイル", "ワンホンネイル",
                                "グラデーションネイル", "うるうるネイル", "地雷系ネイル", "ゴスロリネイル",
                                "Y2Kネイル", "サイバーネイル", "推し活ネイル", "概念ネイル", "量産型ネイル",
                                "フレンチガーリー", "バレエコア", "マメクロネイル", "ちゅるんネイル",
                                "ぷっくりネイル", "囲みグラデ", "オーロラネイル", "氷ネイル", "インクネイル",
                                "落書きネイル", "ショートネイル", "ロングネイル", "自爪風"
                            ].map((tag, index) => (
                                <span key={index} className="px-4 py-2 bg-white/40 backdrop-blur-sm border border-white/60 rounded-full text-xs md:text-sm text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)] hover:bg-white hover:scale-105 transition-all duration-300 cursor-default shadow-sm text-nowrap">
                                    # {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section ref={situationRef} className="py-24 px-6 bg-gradient-to-b from-white/50 to-transparent">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                            <div className="text-left">
                                <span className="text-[#F283AE] font-bold tracking-widest text-xs uppercase mb-3 block">SITUATION FINDER</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)] leading-tight">
                                    今のあなたに、<br className="md:hidden" />ぴったりのデザインを。
                                </h2>
                            </div>

                            {/* Japanese Search Bar */}
                            <div className="w-full md:w-96 relative group">
                                <input
                                    type="text"
                                    placeholder="結婚式, 就活, 推し活..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-[#EDD9BE] outline-none focus:border-[#F283AE] transition-all text-sm font-[family-name:var(--font-noto-sans-jp)] shadow-sm pr-12 group-hover:shadow-md"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F283AE]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                                    <span className="text-[#FAC1B5]">例:</span>
                                    {["結婚式", "オフィス", "地雷系", "推し活", "デート", "成人式", "ワンホン", "Y2K"].map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => setSearchQuery(tag)}
                                            className="text-[#F283AE] hover:underline cursor-pointer font-bold"
                                        >
                                            #{tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((cat) => (
                                    <div
                                        key={cat.id}
                                        onClick={() => setSelectedSituation(cat)}
                                        className={`animate-on-scroll group rounded-[40px] border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center cursor-pointer hover:-translate-y-2 overflow-hidden bg-white`}
                                    >
                                        <div className="w-full h-64 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all z-10" />
                                            <img
                                                src={cat.image}
                                                alt={cat.titleJp}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xl shadow-sm z-20">
                                                {cat.icon}
                                            </div>
                                        </div>

                                        <div className="p-8 flex flex-col items-center flex-grow w-full">
                                            <h3 className="text-xl font-bold text-[#C59FBE] mb-2 font-[family-name:var(--font-noto-sans-jp)]">{cat.titleJp}</h3>
                                            <p className="text-xs text-[#F283AE] font-bold mb-4 tracking-widest uppercase font-[family-name:var(--font-montserrat)]">{cat.title}</p>
                                            <p className="text-[#FAC1B5] text-sm leading-relaxed font-[family-name:var(--font-noto-sans-jp)] mb-6 line-clamp-3">
                                                {cat.description}
                                            </p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedSituation(cat);
                                                }}
                                                className="mt-auto px-6 py-2 rounded-full border border-[#F283AE] text-[#F283AE] text-xs font-bold bg-white group-hover:bg-[#F283AE] group-hover:text-white transition-all"
                                            >
                                                デザインを見る
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center">
                                    <p className="text-[#FAC1B5] font-[family-name:var(--font-noto-sans-jp)]">
                                        「{searchQuery}」に一致するシチュエーションが見つかりませんでした。
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* SITUATION POPUP MODAL */}
                {selectedSituation && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                            onClick={() => setSelectedSituation(null)}
                        ></div>
                        <div className="relative bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-scale-in">
                            {/* Header */}
                            <div className={`p-8 ${selectedSituation.color} flex justify-between items-start shrink-0`}>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-3xl">{selectedSituation.icon}</span>
                                        <h3 className="text-2xl font-bold text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)]">
                                            {selectedSituation.titleJp}
                                        </h3>
                                    </div>
                                    <p className="text-[#F283AE] text-sm font-bold tracking-widest uppercase mb-2">
                                        {selectedSituation.title}
                                    </p>
                                    <p className="text-[#FAC1B5] text-sm font-[family-name:var(--font-noto-sans-jp)]">
                                        {selectedSituation.description}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedSituation(null)}
                                    className="p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C59FBE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6 6 18" /><path d="m6 6 18 18" />
                                    </svg>
                                </button>
                            </div>

                            {/* Gallery Content */}
                            <div className="p-8 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {/* Extra curated images first */}
                                    {(selectedSituation.extraImages ?? []).map((src: string, i: number) => (
                                        <div key={`extra-${i}`} className="aspect-[3/4] rounded-2xl overflow-hidden group relative">
                                            <img
                                                src={src}
                                                alt={`${selectedSituation.title} featured design ${i + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button className="bg-white/90 text-[#C59FBE] px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                                                    このデザインにする
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Standard situation images */}
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden group relative">
                                            <img
                                                src={`/situation-${selectedSituation.id}-${i}.png`}
                                                alt={`${selectedSituation.title} design ${i}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button className="bg-white/90 text-[#C59FBE] px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                                                    このデザインにする
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* SECTION: RECOMMENDED FOR */}
                <section ref={recommendedRef} className="py-20 px-6 relative z-10 bg-white/30 backdrop-blur-sm">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-[#F283AE] font-bold tracking-widest text-xs uppercase mb-3 block">RECOMMENDED</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)]">こんな方におすすめ</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="animate-on-scroll bg-white/60 backdrop-blur-md rounded-[32px] border border-white/80 shadow-lg overflow-hidden hover-lift group">
                                <div className="h-48 overflow-hidden">
                                    <img src="/recommended-salon.png" alt="Before Salon" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <div className="p-8 text-center">
                                    <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-300">💅</div>
                                    <h3 className="text-lg font-bold mb-3 text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)]">失敗したくない！<br />サロン前のリハに</h3>
                                    <p className="text-[#FAC1B5] text-sm leading-relaxed font-[family-name:var(--font-noto-sans-jp)]">
                                        「イメージと違った...」を防ぐために。<br />納得いくまでシミュレーション♡
                                    </p>
                                </div>
                            </div>
                            <div className="animate-on-scroll bg-white/60 backdrop-blur-md rounded-[32px] border border-white/80 shadow-lg overflow-hidden hover-lift group delay-200">
                                <div className="h-48 overflow-hidden">
                                    <img src="/recommended-trends.png" alt="Try Trends" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <div className="p-8 text-center">
                                    <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-300">🎀</div>
                                    <h3 className="text-lg font-bold mb-3 text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)]">流行りの韓国ネイルも<br />試してみたい</h3>
                                    <p className="text-[#FAC1B5] text-sm leading-relaxed font-[family-name:var(--font-noto-sans-jp)]">
                                        話題のワンホンネイルやチークネイル。<br />似合うかどうか、まずはアプリでcheck✨
                                    </p>
                                </div>
                            </div>
                            <div className="animate-on-scroll bg-white/60 backdrop-blur-md rounded-[32px] border border-white/80 shadow-lg overflow-hidden hover-lift group delay-400">
                                <div className="h-48 overflow-hidden">
                                    <img src="/recommended-share.png" alt="Share on SNS" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <div className="p-8 text-center">
                                    <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-300">📸</div>
                                    <h3 className="text-lg font-bold mb-3 text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)]">「これ可愛い♡」を<br />みんなにシェア</h3>
                                    <p className="text-[#FAC1B5] text-sm leading-relaxed font-[family-name:var(--font-noto-sans-jp)]">
                                        お気に入りのデザインができたら保存。<br />インスタやTikTokで自慢しちゃおう！
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION: PERSONAL COLOR DIAGNOSIS */}
                <section className="py-24 px-6 bg-white/50 relative overflow-hidden" >
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8 animate-on-scroll">
                            <div className="inline-block px-4 py-2 bg-[#F283AE]/10 rounded-full border border-[#F283AE]/30">
                                <span className="text-[#F283AE] font-bold tracking-widest text-xs uppercase">AI DIAGNOSIS</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)] leading-tight">
                                自分に似合うネイルデザインの<br />見つけ方、知りたくない？
                            </h2>
                            <p className="text-[#FAC1B5] text-lg leading-relaxed font-[family-name:var(--font-noto-sans-jp)]">
                                NAILUのAIは、高度な画像解析であなたの肌色を瞬時に判別。<br />
                                <strong>イエベ（イエローベース）</strong>か<strong>ブルベ（ブルーベース）</strong>かを診断し、肌を最高に美しく見せるパーソナルカラーに合ったネイルを提案します。
                            </p>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="p-6 bg-[#EDD9BE] rounded-[30px] border border-white/50 text-center shadow-lg">
                                    <span className="text-sm font-bold text-[#F283AE] block mb-2">Yellow Base</span>
                                    <h3 className="text-xl font-bold text-[#C59FBE] mb-2 font-[family-name:var(--font-noto-sans-jp)]">イエベ春・秋</h3>
                                    <p className="text-xs text-[#FAC1B5]">暖かみのあるベージュやテラコッタ、コーラル系が映えます。</p>
                                </div>
                                <div className="p-6 bg-[#F5F8FD] rounded-[30px] border border-white/50 text-center shadow-lg">
                                    <span className="text-sm font-bold text-[#8FBAC8] block mb-2">Blue Base</span>
                                    <h3 className="text-xl font-bold text-[#C59FBE] mb-2 font-[family-name:var(--font-noto-sans-jp)]">ブルベ夏・冬</h3>
                                    <p className="text-xs text-[#FAC1B5]">透明感を出すローズ、アイボリー、グレージュ系が得意です。</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative animate-on-scroll delay-200">
                            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl glass-card">
                                <img
                                    src="/recommended-trends.png"
                                    alt="イエベ・ブルベ肌色診断に基づいたパーソナルカラーネイル提案。AIネイル診断プロセスの可視化。"
                                    className="w-full h-auto opacity-90 transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#C59FBE]/60 to-transparent flex items-end p-8">
                                    <p className="text-white font-bold text-lg">AIによる高精度な肌色・美肌解析</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION: HOW IT WORKS */}
                <section ref={howItWorksRef} className="py-20 px-6" >
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-[#F283AE] font-bold tracking-widest text-xs uppercase mb-3 block">HOW TO USE</span>
                            <h2 className="text-3xl md:text-3xl font-bold text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)]">使い方はとっても簡単♡</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-[64px] left-[15%] right-[15%] h-0.5 overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-r from-[#F283AE]/30 via-[#F283AE] to-[#F283AE]/30 animate-line-draw"></div>
                            </div>

                            {/* Step 1 */}
                            <div className="animate-on-scroll relative z-10 flex flex-col items-center text-center group">
                                <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center overflow-hidden mb-6 border-4 border-[#EDD9BE] group-hover:scale-110 transition-transform duration-300">
                                    <img src="/how-it-works-step1.png" alt="Step 1" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-white/20 flex items-center justify-center text-3xl">📷</div>
                                </div>
                                <div className="bg-[#C59FBE] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 font-[family-name:var(--font-montserrat)] scale-100 group-hover:scale-110 transition-transform">STEP 1</div>
                                <h3 className="text-xl font-bold mb-2 text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)]">パシャっと撮影</h3>
                                <p className="text-[#FAC1B5] text-sm font-[family-name:var(--font-noto-sans-jp)] text-center w-full">
                                    自分の手をスマホで撮影。<br />今のネイルのままでもOK！
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="animate-on-scroll delay-200 relative z-10 flex flex-col items-center text-center group">
                                <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center overflow-hidden mb-6 border-4 border-[#EDD9BE] group-hover:scale-110 transition-transform duration-300">
                                    <img src="/how-it-works-step2.png" alt="Step 2" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-white/20 flex items-center justify-center text-4xl animate-sparkle">✨</div>
                                </div>
                                <div className="bg-[#C59FBE] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 font-[family-name:var(--font-montserrat)] scale-100 group-hover:scale-110 transition-transform">STEP 2</div>
                                <h3 className="text-xl font-bold mb-2 text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)]">わくわくAI生成</h3>
                                <p className="text-[#FAC1B5] text-sm font-[family-name:var(--font-noto-sans-jp)] text-center w-full">
                                    好きな雰囲気を選ぶだけ。<br />魔法のように一瞬で変身します。
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="animate-on-scroll delay-400 relative z-10 flex flex-col items-center text-center group">
                                <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center overflow-hidden mb-6 border-4 border-[#EDD9BE] group-hover:scale-110 transition-transform duration-300">
                                    <img src="/recommended-share.png" alt="Step 3" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-white/20 flex items-center justify-center text-3xl">💖</div>
                                </div>
                                <div className="bg-[#C59FBE] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 font-[family-name:var(--font-montserrat)] scale-100 group-hover:scale-110 transition-transform">STEP 3</div>
                                <h3 className="text-xl font-bold mb-2 text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)]">みんなに自慢</h3>
                                <p className="text-[#FAC1B5] text-sm font-[family-name:var(--font-noto-sans-jp)] text-center w-full">
                                    お気に入りは保存して<br />SNSやサロンでシェアしてね♡
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION: MOCHIKOMI (SALON) GUIDE */}
                <section className="py-24 px-6 bg-[#EDD9BE]/20" >
                    <div className="max-w-5xl mx-auto text-center animate-on-scroll">
                        <span className="text-[#F283AE] font-bold tracking-widest text-xs uppercase mb-3 block">SALON GUIDE</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#C59FBE] mb-6 font-[family-name:var(--font-noto-sans-jp)]">
                            ネイルサロンへの<br className="md:hidden" />「持ち込みデザイン」もスムーズに
                        </h2>
                        <p className="text-[#FAC1B5] text-lg leading-relaxed max-w-3xl mx-auto mb-16 font-[family-name:var(--font-noto-sans-jp)]">
                            AIで作成した理想のデザインは、そのままネイルサロンで「持ち込みデザイン」としてオーダー可能です。ネイリストさんにイメージが正確に伝わるので、理想通りの仕上がりに。
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { step: "01", title: "保存(Save)", desc: "AIで生成したお気に入りの画像を保存。スクリーンショットでもOK。" },
                                { step: "02", title: "相談(Consult)", desc: "サロン予約時に「持ち込み可」を確認し、カウンセリング時に画像を見せます。" },
                                { step: "03", title: "施術(Art)", desc: "オーダー方法に迷う必要はなし。AI画像があなたの意思を正確に伝えます。" },
                            ].map((item, i) => (
                                <div key={i} className="p-8 bg-white/60 backdrop-blur-md rounded-[32px] shadow-lg border border-white/80 transition-all hover:shadow-xl group">
                                    <div className="text-4xl font-black text-[#F283AE]/20 mb-4 group-hover:text-[#F283AE]/40 transition-colors">{item.step}</div>
                                    <h4 className="text-xl font-bold text-[#C59FBE] mb-3 font-[family-name:var(--font-noto-sans-jp)]">{item.title}</h4>
                                    <p className="text-sm text-[#FAC1B5] font-[family-name:var(--font-noto-sans-jp)]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* SECTION: BEFORE & AFTER VISUAL CONTEXT */}
                <section className="py-20 px-6" >
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 order-2 md:order-1">
                            <div className="p-8 glass-card rounded-[40px] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className="flex gap-4 items-center mb-6">
                                        <div className="w-14 h-14 bg-[#C59FBE] rounded-full flex items-center justify-center text-xs font-bold text-white font-[family-name:var(--font-montserrat)]">Before</div>
                                        <div className="text-2xl text-[#F283AE]">➡</div>
                                        <div className="w-14 h-14 bg-gradient-to-br from-[#F283AE] to-[#C6C870] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg font-[family-name:var(--font-montserrat)]">After</div>
                                    </div>
                                    <h3 className="text-[#C59FBE] font-bold text-xl mb-3 font-[family-name:var(--font-noto-sans-jp)]">サロンクオリティの仕上がり</h3>
                                    <p className="text-[#FAC1B5] text-sm leading-relaxed font-[family-name:var(--font-noto-sans-jp)]">
                                        AIが爪の形、肌の色、光の当たり方を高度に分析。まるで本当にネイルを塗っているかのような、違和感のないリアルな試着体験を実現しました。
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 order-1 md:order-2 text-left">
                            <span className="text-[#F283AE] font-bold tracking-widest text-xs uppercase mb-3 block font-[family-name:var(--font-montserrat)]">REALISTIC</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#C59FBE] mb-6 font-[family-name:var(--font-noto-sans-jp)]">驚くほど自然な<br />バーチャル試着</h2>
                            <p className="text-[#FAC1B5] leading-relaxed font-[family-name:var(--font-noto-sans-jp)] text-lg">
                                「イメージと違った...」を防ぎます。<br />
                                自分の手に合わせて色味やデザインのバランスを確認できるので、失敗のないネイル選びが可能に。
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION: FEATURES */}
                <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" >
                    <div className="relative z-10 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Feature Card 2: Trend Auto Reflection (Restored) */}
                            <div className="glass-card rounded-[40px] p-8 hover:scale-[1.02] transition-all duration-500 shadow-xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#F283AE] to-[#C6C870] rounded-2xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">✨</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 font-[family-name:var(--font-noto-sans-jp)]">トレンド自動反映</h3>
                                <p className="text-[#FAC1B5] leading-relaxed text-sm font-[family-name:var(--font-noto-sans-jp)]">
                                    韓国、日本、世界中の最新トレンドを常時学習。今一番人気のデザインをリアルタイムで提案。
                                </p>
                            </div>

                            {/* Feature Card 3: Customization */}
                            <div className="glass-card rounded-[40px] p-8 hover:scale-[1.02] transition-all duration-500 shadow-xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#C6C870] to-[#F283AE] rounded-2xl flex items-center justify-center mb-6">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
                                        <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 font-[family-name:var(--font-noto-sans-jp)]">自由なカスタマイズ</h3>
                                <p className="text-[#FAC1B5] leading-relaxed text-sm font-[family-name:var(--font-noto-sans-jp)]">
                                    色、パターン、装飾を自由に変更。AIが提案したデザインをベースに、あなただけのアレンジが可能。
                                </p>
                            </div>

                            {/* Feature Card 4: Instant Generation */}
                            <div className="glass-card rounded-[40px] p-8 hover:scale-[1.02] transition-all duration-500 shadow-xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#F283AE] to-[#EDD9BE] rounded-2xl flex items-center justify-center mb-6">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 font-[family-name:var(--font-noto-sans-jp)]">一瞬で生成</h3>
                                <p className="text-[#FAC1B5] leading-relaxed text-sm font-[family-name:var(--font-noto-sans-jp)]">
                                    待ち時間はわずか数秒。高品質なデザインを複数パターン同時生成し、お気に入りを選べます。
                                </p>
                            </div>

                            {/* Feature Card 5: Save & Share */}
                            <div className="glass-card rounded-[40px] p-8 hover:scale-[1.02] transition-all duration-500 shadow-xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#EDD9BE] to-[#F283AE] rounded-2xl flex items-center justify-center mb-6">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 8L12 4M12 4L8 8M12 4L12 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 font-[family-name:var(--font-noto-sans-jp)]">保存＆シェア</h3>
                                <p className="text-[#FAC1B5] leading-relaxed text-sm font-[family-name:var(--font-noto-sans-jp)]">
                                    お気に入りのデザインを保存して、サロンで見せたり、SNSでシェアして友達と共有できます。
                                </p>
                            </div>

                            {/* Feature Card 6: Salon Ready */}
                            <div className="glass-card rounded-[40px] p-8 hover:scale-[1.02] transition-all duration-500 shadow-xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#C6C870] to-[#EDD9BE] rounded-2xl flex items-center justify-center mb-6">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 font-[family-name:var(--font-noto-sans-jp)]">サロン対応</h3>
                                <p className="text-[#FAC1B5] leading-relaxed text-sm font-[family-name:var(--font-noto-sans-jp)]">
                                    デザインをネイリストに見せるだけ。イメージの共有がスムーズになり、理想通りの仕上がりに。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION: TECH AUTHORITY */}
                <section className="py-24 px-6 border-t border-[#EDD9BE]/50" >
                    <div className="max-w-4xl mx-auto animate-on-scroll">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="w-24 h-24 shrink-0 bg-[#C59FBE] rounded-full flex items-center justify-center text-white text-3xl shadow-xl">
                                🦾
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#C59FBE] mb-4 font-[family-name:var(--font-noto-sans-jp)]">
                                    2026年最新トレンドを学習した「ネイル特化型AI」
                                </h2>
                                <p className="text-[#FAC1B5] leading-loose font-[family-name:var(--font-noto-sans-jp)]">
                                    NAILUのAIは、日本国内の主要ネイルサロンの最新データと2026年のトレンド予測を学習しています。<br />
                                    「クラウドダンサー（ミルキーホワイト）」や「微細パール」など、最先端のカラーや質感を忠実に再現。プロのネイリストも参考にするレベルのデザインを、無料で体験できます。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION: COMMUNITY GALLERY (Showcase Only) */}
                <section ref={galleryRef} className="min-h-screen pt-24 pb-24 px-5 max-w-5xl mx-auto relative overflow-hidden" >
                    {/* Gallery Background Elements */}
                    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none" >
                        <div className="floating-form top-[10%] right-[10%] w-[400px] h-[400px] bg-[#F283AE] opacity-30 animate-blob"></div>
                        <div className="floating-form bottom-[10%] left-[5%] w-[300px] h-[300px] bg-[#EDD9BE] opacity-20 animate-blob" style={{ animationDelay: "3s" }}></div>
                    </div>

                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4 text-[#C59FBE] tracking-tight">Community Gallery</h2>
                        <p className="text-[#FAC1B5] font-medium tracking-wide">AIと創り上げた、最新のデザインたち</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                        {galleryImages.slice(0, visibleGalleryCount).map((img, index) => (
                            <div key={index} className="aspect-[4/5] glass-card rounded-[40px] relative overflow-hidden group hover:scale-[1.03] transition-all duration-500 shadow-xl gloss-effect">
                                <img src={img.src} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" alt={img.alt} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <span className="text-white text-sm font-bold backdrop-blur-xl px-4 py-2 rounded-2xl bg-white/20 border border-white/30">♥ {img.likes}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {
                        visibleGalleryCount < galleryImages.length && (
                            <div className="mt-16 text-center">
                                <button
                                    onClick={() => setVisibleGalleryCount(prev => prev + 6)}
                                    className="px-10 py-4 bg-white/50 backdrop-blur-md border border-[#F283AE]/30 rounded-full text-[#C59FBE] font-bold hover:bg-[#C59FBE] hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group"
                                >
                                    <span className="mr-2">More View</span>
                                    <span className="inline-block transition-transform group-hover:translate-y-1">↓</span>
                                </button>
                            </div>
                        )
                    }
                </section>

                {/* SECTION: NAIL STYLE GLOSSARY (SEO) */}
                <section className="py-24 px-6 bg-[#FEFAF6] relative overflow-hidden" >
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                        <div className="absolute top-10 left-[10%] w-64 h-64 bg-[#F283AE]/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-[10%] w-96 h-96 bg-[#EDD9BE]/20 rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="text-center mb-16 animate-on-scroll">
                            <span className="text-[#F283AE] font-bold tracking-[0.3em] text-xs uppercase mb-4 block">NAIL DICTIONARY</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)] tracking-tight">ネイルデザイン用語集</h2>
                            <div className="w-20 h-1 bg-[#F283AE] mx-auto mt-6 rounded-full opacity-60"></div>
                            <p className="mt-8 text-[#FAC1B5] text-base font-medium max-w-xl mx-auto leading-relaxed">最新のトレンドから定番まで、理想の指先を叶えるためのキーワードをAIが詳しく解説。</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "ニュアンスネイル", eng: "Nuance Nail", img: "/nuance-pink-marble-gold.png", desc: "曖昧な色使いやボカシ、複数の色を混ぜ合わせた奥行きのあるデザイン。決まった形がなく、絶妙な『抜け感』が大人女子に大人気です。" },
                                { title: "ワンホンネイル", eng: "Wanghong Nail", img: "/wanghong-beige-heart-gems.png", desc: "中国のインフルエンサー（網紅）から広まったトレンド。透明感のあるベースに、デコラティブなパーツやチークを組み合わせた華やかなスタイル。" },
                                { title: "マグネットネイル", eng: "Magnet Nail", img: "/magnet-aurora-nail-art.png", desc: "鉄粉入りのポリッシュを使い、磁石で模様を作る技法。奥行きのある独特な輝きと、光の当たり方で変わる表情が特徴です。" },
                                { title: "チークネイル", eng: "Cheek Nail", img: "/hero-after-cheek-perfect.png", desc: "爪の中央からじゅわっと色が滲み出たようなデザイン。頬紅（チーク）のような血色感があり、指先を可憐で健康的に見せてくれます。" },
                                { title: "ガラスフレンチ", eng: "Glass French", img: "/hero-after-glass-french-inpainted.png", desc: "フレンチネイルの先端に乱切りのホログラムやラメを敷き詰めたデザイン。ガラスの破片のような鋭い輝きが、指先を細長く上品に見せます。" },
                                { title: "うるうるネイル", eng: "Uru-Uru Nail", img: "/gallery-aurora-glass.png", desc: "オーロラフィルムや氷のような質感を閉じ込めた、透明感たっぷりのデザイン。韓国発のトレンドで、キャンディのような質感が魅力。" },
                            ].map((item, idx) => (
                                <div key={idx} className="group overflow-hidden bg-white/40 hover:bg-white/80 backdrop-blur-sm rounded-[40px] border border-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col">
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="p-8 pb-10">
                                        <div className={`w-12 h-1 bg-gradient-to-r from-transparent via-[#F283AE] to-transparent mb-6 transition-all duration-500 group-hover:w-full group-hover:via-[#F283AE]`}></div>
                                        <span className="text-[10px] font-bold text-[#F283AE] tracking-widest uppercase mb-2 block">{item.eng}</span>
                                        <h3 className="text-2xl font-bold text-[#C59FBE] mb-4 font-[family-name:var(--font-noto-sans-jp)]">{item.title}</h3>
                                        <p className="text-[#FAC1B5] text-sm leading-loose font-[family-name:var(--font-noto-sans-jp)] opacity-90">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION: 2026 SEASONAL TRENDS (SEO) */}
                <section className="py-32 px-6 bg-white relative" >
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20 animate-on-scroll">
                            <span className="text-[#F283AE] font-bold tracking-[0.4em] text-xs uppercase mb-4 block">2026 TREND FORECAST</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)] tracking-tight">2026年 季節のトレンド予報</h2>
                            <p className="mt-8 text-[#FAC1B5] text-lg font-light">移り変わる季節に、AIが提案する最高の彩りを。</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { season: "SPRING", theme: "Peach & Sakura", color: "bg-[#EDD9BE]", border: "border-[#C6C870]", text: "text-[#F283AE]", desc: "多幸感あふれるピーチカラーや、桜の花びらのようなシアーな質感が主役。AI診断では『イエベ春』の方に特におすすめのデザインが豊富です。", img: "/gallery-sakura-cherry-blossom.png" },
                                { season: "SUMMER", theme: "Sea Glass", color: "bg-[#EDD9BE]", border: "border-[#FAC1B5]", text: "text-[#FAC1B5]", desc: "磨りガラスのようなマットな透明感と、水面のような波紋模様。涼しげなブルーやミントカラーのニュアンスが『ブルベ夏』の白肌を引き立てます。", img: "/gallery-aurora-glass.png" },
                                { season: "AUTUMN", theme: "Rich Amber", color: "bg-[#EDD9BE]", border: "border-[#C6C870]", text: "text-[#C6C870]", desc: "深みのある琥珀色やテラコッタ。重厚感のあるマグネットや、べっ甲柄の進化系がトレンド。温かみのあるカラーが『イエベ秋』の肌に馴染みます。", img: "/gallery-autumn-leaves-terracotta.png" },
                                { season: "WINTER", theme: "Frozen Pearl", color: "bg-[#EDD9BE]", border: "border-[#FAC1B5]", text: "text-[#FAC1B5]", desc: "氷の結晶のような微細なパールと、冬の静寂を感じさせるアイボリー。クリアな煌めきが『ブルベ冬』のコントラストの効いた肌色を輝かせます。", img: "/gallery-ivory-aurora.png" },
                            ].map((item, idx) => (
                                <div key={idx} className={`relative rounded-[50px] ${item.color} border ${item.border} overflow-hidden group transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col`}>
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img src={item.img} alt={item.theme} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="p-8 relative flex-1">
                                        <div className="absolute top-4 right-6 text-6xl font-black text-white/40 group-hover:scale-110 transition-transform duration-700">{item.season[0]}</div>
                                        <div className="relative z-10">
                                            <span className={`text-xs font-black tracking-[0.2em] ${item.text} mb-3 block`}>{item.season}</span>
                                            <h3 className="text-xl font-bold text-[#C59FBE] mb-4 font-[family-name:var(--font-noto-sans-jp)]">{item.theme}</h3>
                                            <p className="text-[#FAC1B5] text-sm leading-loose font-[family-name:var(--font-noto-sans-jp)] opacity-80">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION: CARE & MAINTENANCE (SEO) */}
                <section className="py-24 px-6" >
                    <div className="max-w-5xl mx-auto">
                        <div className="glass-card rounded-[60px] p-12 md:p-20 relative overflow-hidden border border-white/60 shadow-2xl">
                            {/* Animated Background Blob */}
                            <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#F283AE] opacity-10 rounded-full blur-[100px] animate-pulse"></div>

                            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
                                <div className="w-full lg:w-2/5 text-center lg:text-left">
                                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white/40 backdrop-blur-md rounded-full mb-8 shadow-inner text-4xl">🧴</div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-[#C59FBE] mb-6 font-[family-name:var(--font-noto-sans-jp)] tracking-tight">美爪のための<br className="hidden md:block" />メンテナンス習慣</h2>
                                    <p className="inline-block px-4 py-2 bg-[#F283AE] text-white text-[10px] font-bold tracking-[0.3em] uppercase rounded-full shadow-lg shadow-[#F283AE]/20">Care & Maintenance</p>
                                </div>
                                <div className="w-full lg:w-3/5 space-y-8 text-[#FAC1B5] text-base leading-loose font-[family-name:var(--font-noto-sans-jp)]">
                                    <p className="font-medium text-[#C59FBE]/70">AI診断で最高の結果を得るためには、土台となる自爪のケアが欠かせません。プロが実践する3つの秘訣をご紹介します。</p>
                                    <div className="grid grid-cols-1 gap-6">
                                        {[
                                            { icon: "✨", title: "徹底した保湿", text: "ネイルオイルを爪の根元（ルースキューティクル）に1日3回塗ることで、乾燥による欠けやささくれを徹底防御。" },
                                            { icon: "📸", title: "撮影前の準備", text: "ハンドクリームを薄く馴染ませると肌のトーンが均一になり、AI診断の正確性が飛躍的に向上します。" },
                                            { icon: "🌿", title: "定期的な休息", text: "オフ後は1〜2週間ほど強化剤（ベースコート）で保護。健康な爪を育てることで次のデザインも美しく映えます。" },
                                        ].map((tip, i) => (
                                            <div key={i} className="flex gap-6 items-start p-6 bg-white/30 rounded-3xl hover:bg-white/50 transition-colors">
                                                <span className="text-2xl mt-1">{tip.icon}</span>
                                                <div>
                                                    <h4 className="font-bold text-[#C59FBE] mb-2">{tip.title}</h4>
                                                    <p className="text-sm opacity-90">{tip.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION: SAFETY & TRUST */}
                <section className="py-20 px-6 bg-white/40 backdrop-blur-sm" >
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block p-5 rounded-full bg-[#EDD9BE]/30 mb-6">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C59FBE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[#C59FBE] mb-6 font-[family-name:var(--font-noto-sans-jp)]">安心・安全への取り組み</h2>
                        <p className="text-[#FAC1B5] text-sm leading-relaxed max-w-2xl mx-auto font-[family-name:var(--font-noto-sans-jp)]">
                            NAILUでは、お客様のプライバシーを最優先に考えています。<br />
                            アップロードされた写真はデザイン生成のみに使用され、許可なく保存・公開されることはありません。<br />
                            生成された画像もお好きなタイミングで削除可能です。
                        </p>
                    </div>
                </section>

                {/* SECTION: FAQ */}
                <section ref={faqRef} className="py-24 px-6 max-w-3xl mx-auto" >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)]">よくあるご質問</h2>
                    </div>
                    <div className="space-y-4">
                        <details className="group glass-card rounded-[20px] open:bg-white transition-all duration-300">
                            <summary className="flex justify-between items-center cursor-pointer p-6 font-bold text-[#C59FBE] list-none select-none">
                                <span className="font-[family-name:var(--font-noto-sans-jp)]">Q. 本当に無料で使えますか？</span>
                                <span className="transition-transform duration-300 group-open:rotate-180">▼</span>
                            </summary>
                            <div className="px-6 pb-6 text-[#FAC1B5] text-sm leading-relaxed font-[family-name:var(--font-noto-sans-jp)]">
                                はい、基本的なデザイン生成機能はすべて無料でお使いいただけます。
                            </div>
                        </details>
                        <details className="group glass-card rounded-[20px] open:bg-white transition-all duration-300">
                            <summary className="flex justify-between items-center cursor-pointer p-6 font-bold text-[#C59FBE] list-none select-none">
                                <span className="font-[family-name:var(--font-noto-sans-jp)]">Q. スマホでも使えますか？</span>
                                <span className="transition-transform duration-300 group-open:rotate-180">▼</span>
                            </summary>
                            <div className="px-6 pb-6 text-[#FAC1B5] text-sm leading-relaxed font-[family-name:var(--font-noto-sans-jp)]">
                                はい、スマートフォンに完全対応しています。アプリのインストール不要で、ブラウザからそのままご利用いただけます。
                            </div>
                        </details>
                        <details className="group glass-card rounded-[20px] open:bg-white transition-all duration-300">
                            <summary className="flex justify-between items-center cursor-pointer p-6 font-bold text-[#C59FBE] list-none select-none">
                                <span className="font-[family-name:var(--font-noto-sans-jp)]">Q. 作った画像をネイルサロンで見せてもいいですか？</span>
                                <span className="transition-transform duration-300 group-open:rotate-180">▼</span>
                            </summary>
                            <div className="px-6 pb-6 text-[#FAC1B5] text-sm leading-relaxed font-[family-name:var(--font-noto-sans-jp)]">
                                もちろんです！「サロン対応」機能で生成された画像は、ネイリストさんにイメージを伝えるのに最適です。ぜひご活用ください。
                            </div>
                        </details>
                    </div>
                    {/* Additional FAQs */}
                    <div className="space-y-4 mt-4">
                        <details className="group glass-card rounded-[20px] open:bg-white transition-all duration-300">
                            <summary className="flex justify-between items-center cursor-pointer p-6 font-bold text-[#C59FBE] list-none select-none">
                                <span className="font-[family-name:var(--font-noto-sans-jp)]">Q. 今のネイルをオフする必要はありますか？</span>
                                <span className="transition-transform duration-300 group-open:rotate-180">▼</span>
                            </summary>
                            <div className="px-6 pb-6 text-[#FAC1B5] text-sm leading-relaxed font-[family-name:var(--font-noto-sans-jp)]">
                                いいえ、必要ありません！今のネイルの上からAIが新しいデザインを重ねて生成するので、オフなしでいろんなデザインを試着できます。
                            </div>
                        </details>
                        <details className="group glass-card rounded-[20px] open:bg-white transition-all duration-300">
                            <summary className="flex justify-between items-center cursor-pointer p-6 font-bold text-[#C59FBE] list-none select-none">
                                <span className="font-[family-name:var(--font-noto-sans-jp)]">Q. 写真はどこかに保存されますか？</span>
                                <span className="transition-transform duration-300 group-open:rotate-180">▼</span>
                            </summary>
                            <div className="px-6 pb-6 text-[#FAC1B5] text-sm leading-relaxed font-[family-name:var(--font-noto-sans-jp)]">
                                アップロードされた写真はデザイン生成のみに使用され、サーバーには保存されませんのでご安心ください。プライバシーは厳重に保護されます。
                            </div>
                        </details>
                        <details className="group glass-card rounded-[20px] open:bg-white transition-all duration-300">
                            <summary className="flex justify-between items-center cursor-pointer p-6 font-bold text-[#C59FBE] list-none select-none">
                                <span className="font-[family-name:var(--font-noto-sans-jp)]">Q. 会員登録は必要ですか？</span>
                                <span className="transition-transform duration-300 group-open:rotate-180">▼</span>
                            </summary>
                            <div className="px-6 pb-6 text-[#FAC1B5] text-sm leading-relaxed font-[family-name:var(--font-noto-sans-jp)]">
                                いいえ、登録なしで今すぐお使いいただけます。「今すぐデザインを作る」ボタンから、魔法のようなネイル体験をお楽しみください♡
                            </div>
                        </details>
                    </div>
                </section>

                {/* SECTION: FINAL CTA */}
                <section className="py-32 px-6 text-center relative overflow-hidden" >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F283AE]/10 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#C59FBE] mb-8 leading-tight font-[family-name:var(--font-noto-sans-jp)]">
                            指先から、<br />新しい私へ。
                        </h2>
                        <p className="text-[#FAC1B5] text-lg mb-12 font-[family-name:var(--font-noto-sans-jp)]">
                            まずは1枚、写真を撮って試してみませんか？<br />
                            あなたの指先にぴったりのデザインが待っています。
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                            <a href={appUrl} className="btn-diamond-app px-12 py-5 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition-transform flex items-center gap-3">
                                <span>💎</span> デザインを作ってみる
                            </a>
                        </div>
                        <p className="mt-6 text-xs text-[#FAC1B5] opacity-70 font-[family-name:var(--font-noto-sans-jp)]">※ 登録不要・完全無料</p>
                    </div>
                </section>
            </main>

            {/* COMPARISON SECTION - SNS vs NAILU */}

            {/* FOOTER */}
            <footer className="bg-[#C59FBE] text-[#EDD9BE] py-16 px-6 relative overflow-hidden" >
                {/* Decorative Background Elements */}
                <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-[#F283AE] rounded-full mix-blend-overlay opacity-10 blur-3xl pointer-events-none" ></div>
                <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] bg-[#EDD9BE] rounded-full mix-blend-overlay opacity-10 blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
                        {/* 1. Brand */}
                        <div className="col-span-1 md:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-3xl font-bold font-[family-name:var(--font-montserrat)] tracking-widest mb-2 text-[#EDD9BE]">NAILU</h3>
                                <p className="text-xs tracking-[0.2em] text-[#F283AE] uppercase">AI Nail Design Assistant</p>
                            </div>
                            <p className="text-sm text-[#EDD9BE]/80 leading-loose max-w-sm font-[family-name:var(--font-noto-sans-jp)]">
                                指先から、新しい私へ。<br />
                                最先端のAI技術とトレンドデザインで、<br />
                                あなただけのネイル体験をお届けします。
                            </p>
                        </div>

                        {/* 2. Links */}
                        <div className="space-y-6">
                            <h4 className="font-bold text-sm tracking-widest font-[family-name:var(--font-montserrat)] text-[#F283AE] border-b border-[#F283AE]/30 pb-2 inline-block">LINKS</h4>
                            <ul className="space-y-4 text-sm font-[family-name:var(--font-noto-sans-jp)] text-[#EDD9BE]/80">
                                <li>
                                    <button onClick={() => scrollToSection(heroRef)} className="hover:text-[#F283AE] hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                                        <span className="text-[10px]">▶</span> トップページ
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => scrollToSection(galleryRef)} className="hover:text-[#F283AE] hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                                        <span className="text-[10px]">▶</span> ギャラリー
                                    </button>
                                </li>
                                <li>
                                    <a href="/terms" className="hover:text-[#F283AE] hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                                        <span className="text-[10px]">▶</span> 利用規約
                                    </a>
                                </li>
                                <li>
                                    <a href="/privacy" className="hover:text-[#F283AE] hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                                        <span className="text-[10px]">▶</span> プライバシーポリシー
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* 3. Social */}
                        <div className="space-y-6">
                            <h4 className="font-bold text-sm tracking-widest font-[family-name:var(--font-montserrat)] text-[#F283AE] border-b border-[#F283AE]/30 pb-2 inline-block">FOLLOW US</h4>
                            <div className="flex gap-4">
                                <a href="#" onClick={handleSocialClick} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F283AE] hover:border-[#F283AE] hover:text-[#C59FBE] transition-all duration-300 group">
                                    {/* Instagram */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a href="#" onClick={handleSocialClick} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F283AE] hover:border-[#F283AE] hover:text-[#C59FBE] transition-all duration-300 group">
                                    {/* X (Twitter) */}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href="#" onClick={handleSocialClick} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F283AE] hover:border-[#F283AE] hover:text-[#C59FBE] transition-all duration-300 group">
                                    {/* TikTok */}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </a>
                                <a href="#" onClick={handleSocialClick} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F283AE] hover:border-[#F283AE] hover:text-[#C59FBE] transition-all duration-300 group">
                                    {/* Pinterest */}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                                        <path d="M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2a10 10 0 0 0-10 10c0 4.25 2.67 7.9 6.44 9.34-.09-.8-.16-2.02.03-2.88l.82-3.46s-.2-.42-.2-1.05c0-.98.57-1.7 1.28-1.7.6 0 .89.45.89 1 0 .6-.38 1.5-.58 2.34-.17.7.35 1.27 1.04 1.27 1.25 0 2.21-1.32 2.21-3.22 0-1.68-1.21-2.85-2.93-2.85-2.14 0-3.39 1.6-3.39 3.26 0 .64.25 1.33.56 1.7.06.07.07.13.05.2l-.21.87c-.03.13-.1.16-.24.1-1.07-.5-1.74-1.83-1.74-2.94 0-2.39 1.74-4.59 5.01-4.59 2.64 0 4.69 1.88 4.69 4.39 0 2.62-1.65 4.73-3.95 4.73-.77 0-1.49-.4-1.74-.87 0 0-.4 1.56-.5 1.94-.18.66-.67 1.49-1 2 .75.22 1.55.34 2.37.34z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#EDD9BE]/40 font-[family-name:var(--font-montserrat)]">
                        <p>© 2026 NAILU. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Social Media Coming Soon Popup */}
            {
                showSocialPopup && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                            onClick={() => setShowSocialPopup(false)}
                        ></div>
                        <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-scale-in">
                            <div className="w-16 h-16 bg-[#EDD9BE] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                🙏
                            </div>
                            <h3 className="text-xl font-bold text-[#C59FBE] mb-2 font-[family-name:var(--font-noto-sans-jp)]">
                                Coming Soon
                            </h3>
                            <p className="text-[#FAC1B5] text-sm mb-6 font-[family-name:var(--font-noto-sans-jp)]">
                                SNSアカウントは現在準備中です。<br />
                                公開までもう少々お待ちください。
                            </p>
                            <button
                                onClick={() => setShowSocialPopup(false)}
                                className="bg-[#F283AE] text-white px-6 py-2 rounded-full font-bold hover:bg-[#C9A098] transition-colors text-sm"
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                )
            }


            {/* TREND DETAIL MODAL */}
            {
                selectedTrend && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                            onClick={() => setSelectedTrend(null)}
                        ></div>

                        {/* Modal Content */}
                        <div className="relative z-10 bg-white/90 backdrop-blur-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl animate-scale-in border border-white/50">
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedTrend(null)}
                                className="absolute top-6 right-6 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-[#C59FBE] transition-colors z-20"
                            >
                                ✕
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="mb-10">
                                    <span className="text-[#F283AE] font-bold tracking-widest text-xs uppercase mb-3 block font-[family-name:var(--font-montserrat)]">Trend Featured</span>
                                    <h2 className="text-3xl md:text-5xl font-bold text-[#C59FBE] mb-4 font-[family-name:var(--font-noto-sans-jp)]">{selectedTrend.title}</h2>
                                    <p className="text-[#FAC1B5] text-lg font-[family-name:var(--font-noto-sans-jp)]">{selectedTrend.description}</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                                    {selectedTrend.images.map((src, idx) => (
                                        <div key={idx} className={`relative overflow-hidden rounded-[30px] shadow-lg group ${idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square md:aspect-[4/3]'}`}>
                                            <img src={src} alt={selectedTrend.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 text-center">
                                    <a
                                        href={appUrl}
                                        className="inline-flex items-center gap-2 px-10 py-4 bg-[#C59FBE] text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                                    >
                                        <span>このスタイルで作成する</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
