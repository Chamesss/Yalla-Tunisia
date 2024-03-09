import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import IconThreeBars16 from "../icons/ThreeBars";

interface HeaderDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderDrawer({ isOpen, setIsOpen }: HeaderDrawerProps) {
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <IconThreeBars16
        onClick={toggleDrawer}
        className="text-3xl cursor-pointer"
      />
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla"
      >
        <div>Hello World</div>
      </Drawer>
    </>
  );
}
