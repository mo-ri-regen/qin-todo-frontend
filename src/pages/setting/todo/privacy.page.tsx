import { ChevronLeftIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const SettingPrivacy: NextPage = () => {
  const router = useRouter();
  const handleClickReturn = () => {
    return router.back();
  };

  return (
    <div className="mx-3 sm:mx-auto max-w-xl">
      <div className="flex items-center pb-6">
        <button
          type="button"
          onClick={handleClickReturn}
          className="grid place-items-center w-10 h-10 font-bold hover:bg-blue-50 dark:hover:bg-opacity-10 dark:focus-visible:bg-opacity-10 rounded-full focus-visible:ring-2 transition duration-200 ease-in-out focus:outline-none"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
        </button>
        <div className="flex flex-1 justify-center px-2">
          <div className="text-xl font-bold">プライバシーポリシー</div>
        </div>
        <div className="w-5" />
      </div>
      <div className="flex flex-col mx-5 sm:mx-auto">
        <div className="mx-auto dark:text-gray-300 prose prose-blue">
          <p>
            合同会社Qin（以下「弊社」とします）は、個人情報が人格尊重の理念の下に慎重に取扱われるべきものであることに鑑み、個人情報を保護することが弊社の事業活動の基本であり、社会的責務であると認識し、以下の方針に基づき個人情報の保護に努めます。
          </p>

          <h4 className="dark:text-gray-300">個人情報に関する法令などの遵守</h4>
          <p>
            弊社は個人情報の保護に関する法令・ガイドラインを遵守して、ユーザーの個人情報を取扱います。
          </p>

          <h4 className="dark:text-gray-300">個人情報の収集、利用目的</h4>
          <p>
            弊社はユーザーのお名前、メールアドレスなどの個人情報を以下の目的で収集・利用いたします。なお、弊社は収集時の目的の範囲を超えて個人情報を利用する必要が生じた場合には、利用に先立ち、新たな目的をお知らせするものとします。
          </p>
          <ul>
            <li>本人確認のため</li>
            <li>サービスの提供のため</li>
            <li>ユーザーに対する必要事項の通知のため</li>
            <li>各種お問い合わせ対応、ユーザーサポートのため</li>
          </ul>

          <h4 className="dark:text-gray-300">個人情報の適正管理</h4>
          <p>
            弊社は個人情報への不正アクセス、個人情報の紛失・破壊・改ざん・漏えいなどを防止するため、合理的な安全対策を講じると共に、必要な是正措置を講じます。
          </p>

          <h4 className="dark:text-gray-300">個人情報の提供や委託について</h4>
          <p>
            弊社は、ユーザーの個人情報を、以下のいずれかに該当する場合又はこのプライバシーポリシーに定める場合を除き、第三者に開示･提供することはありません｡
          </p>
          <ul>
            <li>ユーザーに事前の同意を得た場合</li>
            <li>
              弊社の業務の一部を受託した業務委託会社に対し、当該委託業務遂行のために必要な範囲で提供、開示する場合
            </li>
            <li>法令により開示を求められた場合</li>
            <li>裁判所、警察等の公的機関から開示を求められた場合</li>
          </ul>
          <p>
            なお、これらに該当した結果、ユーザーの個人情報を第三者に開示・提供することになった場合、弊社と第三者との間で、個人情報の管理、秘密保持、再提供の禁止等、ユーザーの個人情報の漏洩等を防止するために必要な事項を取り決め、適切な管理を実施させます。
          </p>

          <h4 className="dark:text-gray-300">
            個人情報の開示・訂正・利用停止・苦情・問い合わせ
          </h4>
          <p>
            ユーザーの個人情報の開示・訂正・利用停止などの手続き、及び、苦情・問い合わせなどにつきましては、お手数ですが下記のお問い合わせ窓口までご連絡下さい。
          </p>
          <p>窓口： Qin 運営チーム（support@qin.salon）</p>

          <h4 className="dark:text-gray-300">プライバシーポリシーの改定等</h4>
          <p>
            弊社は、ユーザーへの事前通知することなく、このプライバシーポリシーを変更、修正または改定できるものとします。変更、修正または改定後のプライバシーポリシーは、弊社サイト又はサービスへの掲載をもって発効するものとします。
          </p>

          <time>2022 年 3 月 10 日 改定</time>
        </div>
      </div>
    </div>
  );
};

export default SettingPrivacy;
