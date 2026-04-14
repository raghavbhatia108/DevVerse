import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/">
          <Image
            src="/icons/DevVerseLogo.png"
            alt="DevHub Logo"
            width={150}
            height={200}
            loading="eager"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <ul>
          <Link href="/">Home</Link>
          <Link href="/">Events</Link>
          <Link href="/">Create Event</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
