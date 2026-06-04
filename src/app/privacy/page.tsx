import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#EDD9BE] text-[#5e3e53] font-[family-name:var(--font-noto-sans-jp)] py-20 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-[32px] p-8 md:p-16 shadow-lg border border-[#EDD9BE]">
                <h1 className="text-3xl font-bold mb-10 text-center border-b border-[#FAC1B5] pb-6">プライバシーポリシー</h1>

                <div className="space-y-8 text-sm md:text-base leading-relaxed text-[#7a5a6c]">
                    <section>
                        <h2 className="text-xl font-bold text-[#5e3e53] mb-4">1. 個人情報の収集について</h2>
                        <p>
                            NAILU（以下「当サービス」）は、ユーザーが当サービスを利用する際に、
                            アップロードされた画像データや利用履歴などの情報を収集する場合があります。
                            収集した情報は、サービスの提供および改善のためにのみ使用されます。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#5e3e53] mb-4">2. 画像データの取り扱い</h2>
                        <p>
                            ユーザーがアップロードした手やネイルの画像データは、AIによる解析およびデザイン生成の目的でのみ使用されます。
                            ユーザーの同意なく、これらの画像を第三者に提供したり、公開したりすることはありません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#5e3e53] mb-4">3. 個人情報の第三者提供</h2>
                        <p>
                            当サービスは、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。
                            ただし、法令に基づく場合や、人の生命・身体・財産の保護のために必要がある場合を除きます。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#5e3e53] mb-4">4. プライバシーポリシーの変更</h2>
                        <p>
                            本ポリシーの内容は、ユーザーに通知することなく変更することができるものとします。
                            当サービスが別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#5e3e53] mb-4">5. お問い合わせ</h2>
                        <p>
                            本ポリシーに関するお問い合わせは、当サービスの運営者までお願いいたします。
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
