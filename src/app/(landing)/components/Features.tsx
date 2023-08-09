import {Bot, Newspaper} from "lucide-react";

const Features = () => {
    return (
        <div className="container mx-auto mt-20 mb-20">
            <div className="text-center">
                    <h2 className="animate-gradient-xy bg-clip-text bg-gradient-to-br font-extrabold from-[#FFD89B] jsx-bbe7df302f14d4d5   leading-[1.2em]  text-3xl  text-transparent to-[#19547B] tracking-[0.em] uppercase  z-10">What You&apos;ll Get</h2>
                    <p className="mx-auto md:w-1/2 text-md text-gray-600 mt-5 leading-0.5">Our platform is designed to help you create and maintain your website with ease. We offer a wide range of features that will help you create a website that is both beautiful and functional.</p>
            </div>
            <div className="flex flex-wrap justify-center pt-10">
                <div className="md:w-1/4 p-5">
                    <div className="mb-2"><Bot/></div>
                    <h2 className="uppercase font-bold text-gray-600 mb-2">AI-Powered</h2>
                    <p className="text-sm">With AI at its core, LIKHO streamlines the website creation process, making it quicker and more intuitive than ever before. No need to worry about design complexities; our intelligent algorithms will take care of that for you.</p>
                </div>
                <div className="md:w-1/4 p-5">
                    <div className="mb-2"><Newspaper/></div>
                    <h2 className="uppercase font-bold text-gray-600 mb-2">Notion styled - WYSIWYG</h2>
                    <p className="text-sm"> If you love Notion&apos;s simplicity and ease of use, you&apos;ll fall in love with LIKHO. Our interface is designed to be familiar and user-friendly, making it accessible to beginners and professionals alike.</p>
                </div>
                <div className="md:w-1/4 p-5">
                    <div className="mb-2"><Newspaper/></div>
                    <h2 className="uppercase font-bold text-gray-600 mb-2">Free Sub-domain</h2>
                    <p className="text-sm"> LIKHO is perfect for individuals, businesses, agencies, and even developers managing multiple clients. Seamlessly switch between different projects, collaborate with team members, and create stunning websites for various clients within one platform.</p>
                </div>
                <div className="md:w-1/4 p-5">
                    <div className="mb-2"><Newspaper/></div>
                    <h2 className="uppercase font-bold text-gray-600 mb-2">No-Code</h2>
                    <p className="text-sm">Coding skills are no longer a barrier to building a stunning website. LIKHO empowers you to design, customize, and update your website through an intuitive drag-and-drop interface. Say goodbye to manual coding and hello to efficiency!</p>
                </div>
            </div>
        </div>)
}
export default Features;