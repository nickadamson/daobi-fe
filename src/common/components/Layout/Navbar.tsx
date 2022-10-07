import Wallet from "./Wallet";

const Navbar = (): JSX.Element => (
  <div className="flex justify-between place-items-center px-4 w-full h-24 border-b">
    <p>DAObi</p>
    <Wallet />
  </div>
);

export default Navbar;
