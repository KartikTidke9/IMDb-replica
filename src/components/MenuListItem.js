import { IconButton } from "@mui/material";
import style from "../css/MenuList.module.css"

function MenuListItem({ item }) {
  return (
    <div className={style.list_container}>
      <div className={style.header}>
        <IconButton color="primary">{item.header_icon}</IconButton>
        <h2>{item.header}</h2>
      </div>
      <ul className={style.list_content}>
        {item.listItem.map((list) => {
          return <li className={style.list_item} key={list}>{list}</li>;
        })}
      </ul>
    </div>
  );
}

export default MenuListItem;
