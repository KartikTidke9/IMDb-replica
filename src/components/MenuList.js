import MenuListItem from "./MenuListItem";

function MenuList({ items }) {
  return items.map((item) => <MenuListItem item={item} key={item.header} />);
}

export default MenuList;
