import Link from "next/link";
import { useRouter } from "next/router";
import { RefObject, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useOnClickOutside from "use-onclickoutside";

import type { RootState } from "@/store";

import Logo from "../../assets/icons/logo";

type HeaderType = {
  isErrorPage?: boolean;
};

const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const arrayPaths = ["/"];

  const [onTop, setOnTop] = useState(
    !(!arrayPaths.includes(router.pathname) || isErrorPage),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLButtonElement | null>(null);

  const headerClass = () => {
    if (window.scrollY === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  
    useOnClickOutside(navRef as RefObject<HTMLElement>, closeMenu);

  
    useOnClickOutside(searchRef as RefObject<HTMLElement>, closeSearch);

  

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <h1 className="site-logo">
            <Logo />
            D-sacs
          </h1>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/products">Produits</Link>
          <Link href="/products">Inspiration</Link>
          <Link href="/products">Sacs</Link>
          <button className="site-nav__btn">
            <p>Compte</p>
          </button>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef as RefObject<HTMLButtonElement>}
            className={`search-form-wrapper ${searchOpen ? "search-form--active" : ""}`}
          >
            <form className="search-form">
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              />
              <input
                type="text"
                name="search"
                placeholder="Entrez le produit que vous recherchez"
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            />
          </button>
          <Link href="/cart" legacyBehavior>
            <button className="btn-cart">
              <i className="icon-cart" />
              {cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link>
          <Link href="/login" legacyBehavior>
            <button className="site-header__btn-avatar">
              <i className="icon-avatar" />
            </button>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span />
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
