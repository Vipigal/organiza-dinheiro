import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";
import Loader from "./Loader";
import WelcomeMessage from "./WelcomeMessage";

function Header() {
  return (
    <header className="bg-gradient-to-b from-orange-700 to-orange-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoading>
            <Loader size="big" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
        </div>
        <WelcomeMessage />
      </div>
    </header>
  );
}

export default Header;
