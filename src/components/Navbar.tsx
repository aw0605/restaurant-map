import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { MdMenu, MdClose } from "react-icons/md";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();
  return (
    <>
      <div className="navbar">
        <Link href="/" className="navbar__logo">
          RestaurantMap
        </Link>
        <div className="navbar__list">
          <Link
            href="/stores"
            className="navbar__list--item"
            onClick={() => setIsOpen(false)}
          >
            맛집 목록
          </Link>
          <Link
            href="/stores/new"
            className="navbar__list--item"
            onClick={() => setIsOpen(false)}
          >
            맛집 등록
          </Link>
          <Link
            href="/users/likes"
            className="navbar__list--item"
            onClick={() => setIsOpen(false)}
          >
            찜한 맛집
          </Link>
          <Link
            href="/users/mypage"
            className="navbar__list--item"
            onClick={() => setIsOpen(false)}
          >
            마이페이지
          </Link>
          {status === "authenticated" ? (
            <button
              type="button"
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
            >
              로그아웃
            </button>
          ) : (
            <Link
              href="/api/auth/signin"
              className="navbar__list--item"
              onClick={() => setIsOpen(false)}
            >
              로그인
            </Link>
          )}
        </div>
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <MdClose /> : <MdMenu />}
        </div>
      </div>
      {/* mobile navbar */}
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link href="/stores" className="navbar__list--item--mobile">
              맛집 목록
            </Link>
            <Link href="/stores/new" className="navbar__list--item--mobile">
              맛집 등록
            </Link>
            <Link href="/users/likes" className="navbar__list--item--mobile">
              찜한 맛집
            </Link>
            <Link href="/users/mypage" className="navbar__list--item--mobile">
              마이페이지
            </Link>
            {status === "authenticated" ? (
              <button
                type="button"
                onClick={() => signOut()}
                className="navbar__list--item--mobile text-left"
              >
                로그아웃
              </button>
            ) : (
              <Link
                href="/api/auth/signin"
                className="navbar__list--item--mobile"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
