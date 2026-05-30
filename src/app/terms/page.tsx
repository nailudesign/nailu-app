import React from 'react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#EDD9BE] text-[#C59FBE] font-[family-name:var(--font-noto-sans-jp)] py-20 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-[32px] p-8 md:p-16 shadow-lg border border-[#EDD9BE]">
                <h1 className="text-3xl font-bold mb-10 text-center border-b border-[#FAC1B5] pb-6">利用規約</h1>

                <div className="space-y-8 text-sm md:text-base leading-relaxed text-[#8C7B75]">
                    <section>
                        <h2 className="text-xl font-bold text-[#C59FBE] mb-4">第1条（適用）</h2>
                        <p>
                            本規約は、NAILU（以下「当サービス」）の利用に関する条件を定めるものです。
                            ユーザーは、当サービスの利用にあたり、本規約に同意したものとみなされます。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#C59FBE] mb-4">第2条（サービスの提供）</h2>
                        <p>
                            当サービスは、AI技術を用いたネイルデザインの提案およびシミュレーション機能を提供します。
                            生成されたデザインは参考イメージであり、実際の施術結果を保証するものではありません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#C59FBE] mb-4">第3条（禁止事項）</h2>
                        <p>ユーザーは、以下の行為を行ってはなりません。</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>法令または公序良俗に違反する行為</li>
                            <li>犯罪行為に関連する行為</li>
                            <li>当サービスのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                            <li>当サービスのサービスの運営を妨害するおそれのある行為</li>
                            <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#C59FBE] mb-4">第4条（免責事項）</h2>
                        <p>
                            当サービスは、ユーザーに対し、当サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                        </p>
                    </section>
                </div>

                <div className="mt-12 text-center">
                    <a href="/" className="inline-block px-8 py-3 bg-[#FAC1B5] text-white rounded-full font-bold hover:bg-[#C9A098] transition-colors">
                        トップページへ戻る
                    </a>
                </div>
            </div>
        </div>
    );
}
