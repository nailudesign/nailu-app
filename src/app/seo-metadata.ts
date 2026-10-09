export const SITE_METADATA = {
    title: "NAILU | 自分の手で試せるAIネイルデザインアプリ",
    description: "自分の手の写真でネイルデザインを試せるiOSアプリ。スタイル・色・爪の形を選んでAIで仕上がりを確認。App Storeから無料でダウンロードできます（アプリ内購入あり）。",
    keywords: [
        "AIネイル",
        "ネイルデザイン 生成",
        "ネイル 試着 アプリ",
        "自分の手 ネイル AI",
        "ネイル カラー シミュレーション",
        "ネイル デザイン アプリ",
        "持ち込みデザイン ネイルサロン",
        "就活ネイル おすすめ",
        "オフィスネイル シンプル",
        "地雷系ネイル デザイン",
        "ワンホンネイル 2026",
        "成人式ネイル 振袖",
        "ブライダルネイル 種類",
        "最新トレンドネイル 2026",
        "ジェルネイルデザイン AI",
        "オーダー方法 ネイル",
        "ネイル 形 選ぶ アプリ",
        "セルフネイル 初心者",
        "ネイルケア やり方",
        "ニュアンスネイル とは",
        "マグネットネイル やり方",
        "2026 春 ネイル トレンド"
    ],
    ogTitle: "NAILU | 指先に、新しい魔法を。AIネイルデザインアプリ",
    ogDescription: "自分の手の写真でネイルを試せるAIアプリ。App Storeからダウンロード。",
};

export const JSON_LD = {
    softwareApplication: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "NAILU",
        "operatingSystem": "iOS",
        "applicationCategory": "DesignApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "JPY"
        }
    },
    howTo: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "NAILUでネイルデザインを試す方法",
        "step": [
            {
                "@type": "HowToStep",
                "text": "スマホで自分の手の写真を撮影します。",
                "name": "写真を撮る"
            },
            {
                "@type": "HowToStep",
                "text": "好みのスタイル、色、爪の形を選びます。",
                "name": "スタイルを選ぶ"
            },
            {
                "@type": "HowToStep",
                "text": "AIが自分の手の写真にネイルデザインを生成します。",
                "name": "デザイン生成"
            },
            {
                "@type": "HowToStep",
                "text": "生成された画像をネイルサロンのネイリストに見せてオーダーします。",
                "name": "サロンでオーダー"
            }
        ]
    }
};

export const ALT_TEXTS = {
    heroBefore: "自爪の状態の手の写真。ネイルを試す前の画像。",
    heroAfterPink: "ピンク系ニュアンスネイルのデザイン例。",
    heroAfterBeige: "就活やオフィスに最適な、清潔感のあるミルクベージュのワンカラーネイル。",
    heroAfterIvory: "アイボリーホワイトのパールネイルのデザイン例。",
    personalColorDiag: "ネイルデザインのイメージ画像。",
    mochikomiGuide: "スマホに表示されたAIネイルデザインをネイリストに見せている様子。サロンでのオーダー方法の例。",
    trendAmber: "アンバー（琥珀）カラーの奥行きのあるニュアンスネイル。大人っぽい落ち着いたデザイン。",
    glossarySection: "人気のネイルデザイン用語（ニュアンス、ワンホン、マグネットなど）を解説する辞書セクション。",
    seasonalTrends: "2026年の春夏秋冬別のネイルトレンド予測。各季節に合わせたカラーとデザインの提案。",
    nailCareTips: "ネイルケアと撮影前の準備についてのヒント。",
};
