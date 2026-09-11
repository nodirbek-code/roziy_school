import { useEffect, useState } from "react";
import { getWeeklyMenu } from "../api/endpoints";
import "./meals.css";

export default function Meals() {
  const [menu, setMenu] = useState(null);
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    getWeeklyMenu().then(setMenu).catch(() => {});
  }, []);

  if (!menu) return <div className="container section">Yuklanmoqda...</div>;

  const day = menu.days.find((d) => d.day_number === activeDay) ?? menu.days[0];
  const lunchAddons = menu.addons.filter((a) => a.category === "lunch");
  const snackAddons = menu.addons.filter((a) => a.category === "snack");

  return (
    <div className="container section">
      <span className="eyebrow">Haftalik menyu</span>
      <h1>Taomnoma</h1>
      <p>Har hafta bir xil tartibda takrorlanadigan besh kunlik ovqatlanish jadvali.</p>

      <div className="menu-tabs">
        {menu.days.map((d) => (
          <button
            key={d.id}
            className={"menu-tabs__btn" + (d.day_number === activeDay ? " is-active" : "")}
            onClick={() => setActiveDay(d.day_number)}
          >
            {d.day_label}
          </button>
        ))}
      </div>

      {day && (
        <div className="menu-day">
          <div>
            <h3>Tushlik</h3>
            {day.lunch_items.map((item) => (
              <div className="menu-item" key={item.id}>
                {item.image && <img src={item.image} alt={item.name} />}
                <span>{item.order}. {item.name}</span>
              </div>
            ))}
          </div>
          <div>
            <h3>Choy vaqti</h3>
            {day.snack_items.map((item) => (
              <div className="menu-item" key={item.id}>
                {item.image && <img src={item.image} alt={item.name} />}
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="menu-addons">
        <div>
          <h4>Tushlik uchun qo'shimcha beriladi</h4>
          <ul>{lunchAddons.map((a) => <li key={a.id}>{a.text}</li>)}</ul>
        </div>
        <div>
          <h4>Choy vaqti uchun qo'shimcha beriladi</h4>
          <ul>{snackAddons.map((a) => <li key={a.id}>{a.text}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
