import { useEffect, useState } from "react";
import { getSiteSettings } from "../api/endpoints";
import "./footer.css";

export default function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <h3 className="site-footer__brand">Roziy xalqaro maktabi</h3>
          <p className="site-footer__tagline">
            {settings?.tagline ??
              "Bilim va tarbiya - bizning yo'limiz, rozi ota-ona va baxtli o'quvchi - natijamiz!"}
          </p>
        </div>

        <div>
          <h4>Aloqa</h4>
          <p>
            {settings?.district ?? "Shovot tumani"}, {settings?.region ?? "Xorazm viloyati"}
            <br />
            {settings?.address_note ?? "Today ta'lim markazi yonida"}
          </p>
          <p>
            <a href={`tel:${settings?.phone ?? "+998977510065"}`}>
              {settings?.phone ?? "+998 97 751 00 65"}
            </a>
          </p>
        </div>

        <div>
          <h4>Ijtimoiy tarmoq</h4>
          <p>
            <a href={settings?.instagram_url ?? "https://www.instagram.com/roziy_maktabi/"} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </p>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>
          &copy; {new Date().getFullYear()} Roziy xalqaro maktabi. Barcha huquqlar himoyalangan.
        </span>
        {settings?.license_number && (
          <span>Litsenziya №{settings.license_number}</span>
        )}
      </div>
    </footer>
  );
}
