import React from "react";
import { Home, Grid2X2, Heart, ShoppingCart, UserRound } from "lucide-react";

interface MobileBottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  cartCount?: number;
  wishlistCount?: number;
}

const navItems = [
  { label: "Home", screen: "home", Icon: Home },
  { label: "Category", screen: "categories", Icon: Grid2X2 },
  { label: "Wishlist", screen: "wishlist", Icon: Heart },
  { label: "Cart", screen: "cart", Icon: ShoppingCart },
  { label: "Profile", screen: "profile", Icon: UserRound },
];

export default function MobileBottomNav({
  currentScreen,
  onNavigate,
  cartCount = 0,
  wishlistCount = 0,
}: MobileBottomNavProps) {
  return (
    <nav className="mobile-bottom-nav">
      {navItems.map(({ label, screen, Icon }) => {
        const active = currentScreen === screen;
        const count =
          screen === "cart"
            ? cartCount
            : screen === "wishlist"
            ? wishlistCount
            : 0;

        return (
          <button
            key={screen}
            type="button"
            className={`mobile-nav-item ${active ? "active" : ""}`}
            onClick={() => onNavigate(screen)}
            aria-label={label}
          >
            <span className="mobile-nav-icon">
              <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
              {count > 0 && (
                <span className="mobile-nav-badge">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </span>
            <span className="mobile-nav-label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
