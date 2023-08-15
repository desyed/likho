import Link from "next/link";
import Image from "next/image";

const Technologies = () => {
    return (<div className="container mx-auto mt-20 mb-20">
        <div className="flex justify-center pb-10">
            <iframe className="max-w-full" width="530" height="295" src="https://www.youtube.com/embed/EH4mOMF_FxY" title="LIKHO - Multi-tenant Blogging  Platform" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div className="text-center">
            <h2 className=" font-extrabold  leading-[1.2em]  text-3xl   uppercase  z-10">Built with 🔥 Technologies</h2>
            <div className="flex justify-center items-center gap-5 mt-14">
                <Link target="_blank" href="https://grafbase.com"><Image src="/gbase.png" height={100} width={200} alt="grafbase" /></Link>
                <Link target="_blank" href="https://nextjs.com"><Image src="/next.png" height={50} width={50} alt="nextjs" /></Link>
                <Link target="_blank" href="https://tailwindcss.com"><Image src="/tailwind.png" height={100} width={180} alt="tailwind" /></Link>
                <Link target="_blank" href="https://typescript.com"><Image src="/ts.png" height={100} width={180} alt="ts" /></Link>
                <Link target="_blank" href="https://novel.sh"><Image src="/novel.png" height={80} width={150} alt="novel" /></Link>
            </div>
        </div>
    </div>)
}
export default Technologies;