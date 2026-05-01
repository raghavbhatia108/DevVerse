import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <nav>
        {/* Logo */}
        <Link href="/" className="logo" aria-label="DevVerse home">
          <Image
            src="/icons/DevVerseLogo.png"
            alt="DevVerse"
            width={130}
            height={40}
            loading="eager"
            style={{ width: "auto", height: "36px" }}
          />
        </Link>

        {/* Nav links */}
        <ul>
          <li className="list-none">
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="list-none">
            <Link href="/#events" className="nav-link">
              Events
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
