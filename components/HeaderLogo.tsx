import Image from "next/image";
import Link from "next/link";
import logo_outer from "../public/logo-outer.png";
import logo_orange from "../public/logo-orange.png";

function HeaderLogo() {
  return (
    <Link href={"/"}>
      <div className="lg:flex items-center hidden">
        <Image src={logo_orange} alt="logo outer" width={28} height={28} />
        <span className="font-semibold text-white text-2xl ml-2.5">
          Organiza Dinheiro
        </span>
      </div>
    </Link>
  );
}

export default HeaderLogo;
