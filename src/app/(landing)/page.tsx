import Herosection from "@/app/(landing)/components/herosection";
import Features from "@/app/(landing)/components/Features";
import Howitworks from "@/app/(landing)/components/howitworks";
import Footer from "@/app/(landing)/components/footer";
import Technologies from "@/app/(landing)/components/Technologies";
import {headers} from "next/headers";

export default function Home() {
    // console.log(headers().get('host'))
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
        {/*  hero section*/}
        <Herosection/>
        {/*  how it works section*/}
        {/*<Howitworks/>*/}
        {/*  features section*/}
        <Features/>
        {/*    technologies section*/}
        <Technologies/>
        {/*    footer */}
        <Footer/>


    </div>
  )
}
