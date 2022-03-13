import { ChevronRightIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";

export const SettingQinTodo: NextPage = () => {
  return (
    <main className="px-4 mx-auto w-full max-w-screen-sm">
      <div className="my-4 text-xl font-bold text-center">
        <h1>設定</h1>
      </div>
      <ul className="space-y-8">
        <li>
          <div className="space-y-1">
            <div className="text-sm font-bold text-gray-400">設定</div>
            <ul>
              <li>
                <a
                  className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none"
                  href="/setting/qin/user/edit"
                >
                  プロフィール
                  <div className="w-5 h-5">
                    <ChevronRightIcon />
                  </div>
                </a>
              </li>
              <li>
                <a
                  className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none"
                  href="/setting/qin/account"
                >
                  アカウント
                  <div className="w-5 h-5">
                    <ChevronRightIcon />
                  </div>
                </a>
              </li>
              <li>
                <a
                  className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none"
                  href="/setting/qin/theme"
                >
                  テーマ
                  <div className="w-5 h-5">
                    <ChevronRightIcon />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="space-y-1">
            <div className="text-sm font-bold text-gray-400">サポート</div>
            <ul>
              <li>
                <a
                  className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none"
                  href="/setting/todo/privacy"
                >
                  プライバシーポリシー
                  <div className="w-5 h-5">
                    <ChevronRightIcon />
                  </div>
                </a>
              </li>
              <li>
                <a
                  className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none"
                  href="/setting/todo/terms"
                >
                  利用規約
                  <div className="w-5 h-5">
                    <ChevronRightIcon />
                  </div>
                </a>
              </li>
              <li>
                <a
                  className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/pNNUdFnf3YmYpqhJ6"
                >
                  オープンソースライセンス
                  <div className="w-5 h-5">
                    <ExternalLinkIcon />
                  </div>
                </a>
              </li>
              <li>お問い合わせ</li>
              <li>
                <div className="flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none">
                  バージョン
                  <div>1.0.0</div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </main>
  );
};

export default SettingQinTodo;
