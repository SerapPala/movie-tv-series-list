import {  Montserrat } from "next/font/google";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";

//#region font definitions

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-montserrat",
});

//#endregion

//#region metadata

export const metadata = {
    title: "Movies",
    description: "Movies Application",
};

//#endregion

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
             <div className={"container"}>
                 {children}
                 <Footer/>
             </div>
      </body>
    </html>
  );
}
