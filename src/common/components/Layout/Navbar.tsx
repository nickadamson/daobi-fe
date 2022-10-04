import Wallet from "./Wallet";

const Navbar = (): JSX.Element => (
  <div className="w-full h-16 flex justify-between place-items-center border-b px-4">
    <p>Create-Next-Dapp</p>
    <Wallet />
  </div>
);

export default Navbar;
